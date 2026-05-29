import crypto from 'crypto';
import express from 'express';
import { env, isProduction } from '../config/env.js';
import { db } from '../config/database.js';
import { AppError } from '../lib/errors.js';
import { writeAuditLog } from '../lib/audit.js';
import { asyncHandler } from '../lib/http.js';
import { sendMail } from '../lib/mailer.js';
import { createToken, hashPassword, verifyPassword, verifyToken } from '../lib/security.js';
import { requireEmail, requirePassword, requireString } from '../lib/validators.js';
import { requireAuth } from '../middlewares/auth.js';

const router = express.Router();
const RESET_PASSWORD_TTL_MS = 30 * 60 * 1000;
const GOOGLE_AUTHORIZATION_ENDPOINT = 'https://accounts.google.com/o/oauth2/v2/auth';
const GOOGLE_TOKEN_ENDPOINT = 'https://oauth2.googleapis.com/token';
const GOOGLE_USERINFO_ENDPOINT = 'https://openidconnect.googleapis.com/v1/userinfo';

function sanitizeUser(user) {
  return {
    id: user.id,
    name: user.name || '',
    email: user.email,
    avatarUrl: user.avatarUrl || '',
    createdAt: user.createdAt,
    updatedAt: user.updatedAt || null
  };
}

function sanitizeAvatarDataUrl(value) {
  if (value == null || value === '') {
    return '';
  }

  const avatarUrl = requireString(value, 'avatarUrl', { min: 20, max: 1_500_000 });
  const isHttpsUrl = avatarUrl.startsWith('https://');
  const isImageDataUrl = /^data:image\/(?:png|jpe?g|gif|webp);base64,[a-z0-9+/=]+$/i.test(avatarUrl);

  if (avatarUrl && !isHttpsUrl && !isImageDataUrl) {
    throw new AppError(400, 'Avatar deve ser uma URL HTTPS ou uma imagem em base64.');
  }

  return avatarUrl;
}

function createPasswordResetCode() {
  return String(crypto.randomInt(100000, 1000000));
}

function hashResetCode(code) {
  const normalizedCode = String(code || '').replace(/\D/g, '');
  return crypto.createHash('sha256').update(normalizedCode).digest('hex');
}

function isAllowedFrontendOrigin(origin) {
  if (!origin) return false;
  if (env.corsOrigins.includes(origin)) return true;
  return /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(origin);
}

function resolveFrontendOrigin(candidateOrigin = '') {
  if (isAllowedFrontendOrigin(candidateOrigin)) {
    return candidateOrigin;
  }

  if (isAllowedFrontendOrigin(env.appBaseUrl)) {
    return env.appBaseUrl;
  }

  return `http://localhost:${env.port}`;
}

function resolveFrontendReturnUrl(candidateUrl = '', candidateOrigin = '') {
  try {
    const parsedUrl = new URL(candidateUrl);
    if (isAllowedFrontendOrigin(parsedUrl.origin)) {
      parsedUrl.hash = '';
      parsedUrl.search = '';
      return parsedUrl.toString();
    }
  } catch {
    // Usa fallback abaixo quando a URL vier vazia ou invalida.
  }

  return new URL('/login.html', resolveFrontendOrigin(candidateOrigin)).toString();
}

function buildFrontendRedirect(frontendReturnUrl, params = {}) {
  const targetUrl = new URL(frontendReturnUrl);
  const hashParams = new URLSearchParams(params);
  targetUrl.hash = hashParams.toString();
  return targetUrl.toString();
}

function buildGoogleErrorRedirect(frontendReturnUrl, message) {
  return buildFrontendRedirect(frontendReturnUrl, {
    auth_provider: 'google',
    status: 'error',
    message
  });
}

function buildPasswordResetEmail({ userName, resetCode, expiresAt }) {
  const safeName = String(userName || 'produtor(a)');
  const expiresLabel = new Date(expiresAt).toLocaleString('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short'
  });

  return {
    subject: 'CampoSync | Redefinicao de senha',
    text: [
      `Olá, ${safeName}.`,
      '',
      'Recebemos um pedido para redefinir sua senha no CampoSync.',
      `Use este codigo na tela de recuperacao de senha: ${resetCode}`,
      `Este codigo expira em ${expiresLabel}.`,
      '',
      'Se voce nao solicitou esta alteracao, ignore este e-mail.'
    ].join('\n'),
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #17311f;">
        <h2 style="margin-bottom: 8px;">CampoSync</h2>
        <p>Ola, ${safeName}.</p>
        <p>Recebemos um pedido para redefinir sua senha no CampoSync.</p>
        <p>Digite este codigo na tela de recuperacao de senha:</p>
        <p style="display: inline-block; padding: 12px 18px; background: #eef7f0; color: #17311f; border-radius: 8px; font-size: 24px; font-weight: 700; letter-spacing: 4px;">
          ${resetCode}
        </p>
        <p>Este codigo expira em ${expiresLabel}.</p>
        <p>Se voce nao solicitou esta alteracao, ignore este e-mail.</p>
      </div>
    `
  };
}

function getRequestBaseUrl(req) {
  return `${req.protocol}://${req.get('host')}`;
}

function getGoogleRedirectUri(req) {
  if (env.googleRedirectUri) {
    return env.googleRedirectUri;
  }

  return new URL('/api/auth/google/callback', getRequestBaseUrl(req)).toString();
}

function ensureGoogleOauthConfigured() {
  if (!env.googleClientId || !env.googleClientSecret || !env.googleRedirectUri) {
    throw new AppError(
      500,
      'Google OAuth nao configurado. Defina GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET e GOOGLE_REDIRECT_URI.'
    );
  }
}

async function exchangeGoogleCodeForTokens(code, redirectUri) {
  const response = await fetch(GOOGLE_TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      code,
      client_id: env.googleClientId,
      client_secret: env.googleClientSecret,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code'
    })
  });

  const payload = await response.json();
  if (!response.ok) {
    throw new AppError(502, payload.error_description || payload.error || 'Falha ao trocar o codigo do Google.');
  }

  return payload;
}

async function fetchGoogleUserProfile(accessToken) {
  const response = await fetch(GOOGLE_USERINFO_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  const payload = await response.json();
  if (!response.ok) {
    throw new AppError(502, payload.error_description || payload.error || 'Falha ao obter o perfil do Google.');
  }

  return payload;
}

async function findGoogleUser({ email, googleId }) {
  if (googleId) {
    const byGoogleId = await db.findOne('users', (entry) => entry.googleId === googleId);
    if (byGoogleId) return byGoogleId;
  }

  if (email) {
    return db.findOne('users', (entry) => entry.email === email);
  }

  return null;
}

async function upsertGoogleUser(profile) {
  const email = requireEmail(profile?.email);
  if (!profile?.email_verified) {
    throw new AppError(400, 'Sua conta Google precisa ter um e-mail verificado para entrar no CampoSync.');
  }

  const googleId = requireString(profile?.sub, 'google_sub', { min: 3, max: 255 });
  const normalizedName = String(profile?.name || profile?.given_name || email.split('@')[0]).trim();
  const now = new Date().toISOString();
  const existingUser = await findGoogleUser({ email, googleId });

  if (existingUser) {
    return db.update('users', existingUser.id, () => ({
      name: normalizedName || existingUser.name || '',
      email,
      googleId,
      authProvider: 'google',
      updatedAt: now
    }));
  }

  return db.create('users', {
    name: normalizedName,
    email,
    googleId,
    authProvider: 'google',
    createdAt: now,
    updatedAt: now
  });
}

router.get(
  '/google/start',
  asyncHandler(async (req, res) => {
    ensureGoogleOauthConfigured();

    const requestedOrigin = String(req.query?.frontend_origin || req.headers.origin || '').trim();
    const requestedReturnUrl = String(req.query?.frontend_return_url || '').trim();
    const frontendReturnUrl = resolveFrontendReturnUrl(requestedReturnUrl, requestedOrigin);
    const googleRedirectUri = getGoogleRedirectUri(req);
    const state = createToken({
      flow: 'google-oauth',
      frontendOrigin: resolveFrontendOrigin(requestedOrigin),
      frontendReturnUrl,
      googleRedirectUri
    });

    const authorizationUrl = new URL(GOOGLE_AUTHORIZATION_ENDPOINT);
    authorizationUrl.search = new URLSearchParams({
      client_id: env.googleClientId,
      redirect_uri: googleRedirectUri,
      response_type: 'code',
      scope: 'openid email profile',
      state,
      access_type: 'offline',
      include_granted_scopes: 'true',
      prompt: 'select_account'
    }).toString();

    res.redirect(authorizationUrl.toString());
  })
);

router.get(
  '/google/callback',
  asyncHandler(async (req, res) => {
    let frontendReturnUrl = resolveFrontendReturnUrl(
      String(req.query?.frontend_return_url || '').trim(),
      String(req.query?.frontend_origin || '').trim()
    );

    try {
      ensureGoogleOauthConfigured();

      let statePayload = null;
      const rawState = String(req.query?.state || '').trim();
      if (rawState) {
        try {
          statePayload = verifyToken(rawState);
          if (statePayload?.flow === 'google-oauth') {
            frontendReturnUrl = resolveFrontendReturnUrl(
              String(statePayload.frontendReturnUrl || '').trim(),
              String(statePayload.frontendOrigin || '').trim()
            );
          }
        } catch {
          // A validacao abaixo retorna erro mais claro quando o state for obrigatorio.
        }
      }

      if (req.query?.error) {
        const oauthError = String(req.query.error);
        const oauthErrorDescription = String(req.query.error_description || oauthError);
        throw new AppError(400, `Google OAuth recusado: ${oauthErrorDescription}.`);
      }

      const code = requireString(req.query?.code, 'code', { min: 8, max: 2048 });
      const state = requireString(req.query?.state, 'state', { min: 20, max: 4096 });
      statePayload = statePayload || verifyToken(state);

      if (statePayload?.flow !== 'google-oauth') {
        throw new AppError(400, 'Estado OAuth invalido.');
      }

      frontendReturnUrl = resolveFrontendReturnUrl(
        String(statePayload.frontendReturnUrl || '').trim(),
        String(statePayload.frontendOrigin || '').trim()
      );
      const googleRedirectUri = String(statePayload.googleRedirectUri || getGoogleRedirectUri(req));

      const tokenPayload = await exchangeGoogleCodeForTokens(code, googleRedirectUri);
      const googleProfile = await fetchGoogleUserProfile(tokenPayload.access_token);
      const user = await upsertGoogleUser(googleProfile);
      const appToken = createToken({ sub: user.id, email: user.email });

      res.redirect(buildFrontendRedirect(frontendReturnUrl, {
        auth_provider: 'google',
        status: 'success',
        token: appToken,
        email: user.email,
        name: user.name || '',
        user_id: String(user.id)
      }));
    } catch (error) {
      console.error('Falha no callback OAuth do Google:', error);
      const message = error instanceof AppError
        ? error.message
        : env.nodeEnv === 'development'
          ? error.message || 'Nao foi possivel concluir a autenticacao com o Google.'
          : 'Nao foi possivel concluir a autenticacao com o Google.';
      res.redirect(buildGoogleErrorRedirect(frontendReturnUrl, message));
    }
  })
);

router.post(
  '/register',
  asyncHandler(async (req, res) => {
    const name = requireString(req.body?.name, 'name', { min: 2, max: 120 });
    const email = requireEmail(req.body?.email);
    const password = requirePassword(req.body?.password);

    const existingUser = await db.findOne('users', (user) => user.email === email);
    if (existingUser) {
      throw new AppError(409, 'Ja existe uma conta cadastrada com este e-mail.');
    }

    const user = await db.create('users', {
      name,
      email,
      passwordHash: await hashPassword(password),
      createdAt: new Date().toISOString()
    });

    await writeAuditLog({
      type: 'Autenticacao',
      title: 'Cadastro realizado',
      details: `Nova conta criada para ${email}.`,
      area: 'Autenticacao',
      status: 'Concluido',
      source: 'auth-api',
      entityType: 'user',
      entityId: user.id
    }, email);

    res.status(201).json({
      message: 'Cadastro realizado com sucesso.',
      user: sanitizeUser(user)
    });
  })
);

router.post(
  '/login',
  asyncHandler(async (req, res) => {
    const email = requireEmail(req.body?.email);
    const password = requirePassword(req.body?.password);

    const user = await db.findOne('users', (entry) => entry.email === email);
    const isValid = user ? await verifyPassword(password, user.passwordHash) : false;
    if (!user || !isValid) {
      throw new AppError(401, 'Credenciais invalidas.');
    }

    const token = createToken({ sub: user.id, email: user.email });
    await writeAuditLog({
      type: 'Autenticacao',
      title: 'Login realizado',
      details: `Usuario ${user.email} autenticou no CampoSync.`,
      area: 'Autenticacao',
      status: 'Concluido',
      source: 'auth-api',
      entityType: 'session',
      entityId: user.id
    }, user.email);
    res.json({
      message: 'Login realizado com sucesso.',
      token,
      user: sanitizeUser(user)
    });
  })
);

router.post(
  '/password-recovery-request',
  asyncHandler(async (req, res) => {
    const email = requireEmail(req.body?.email);
    const user = await db.findOne('users', (entry) => entry.email === email);

    if (!user) {
      res.json({
        message: 'Se este e-mail estiver cadastrado, um codigo de redefinicao foi enviado.'
      });
      return;
    }

    const resetCode = createPasswordResetCode();
    const resetCodeHash = hashResetCode(resetCode);
    const resetPasswordExpiresAt = new Date(Date.now() + RESET_PASSWORD_TTL_MS).toISOString();

    await db.update('users', user.id, () => ({
      resetPasswordTokenHash: resetCodeHash,
      resetPasswordExpiresAt,
      updatedAt: new Date().toISOString()
    }));

    const message = buildPasswordResetEmail({
      userName: user.name,
      resetCode,
      expiresAt: resetPasswordExpiresAt
    });

    await sendMail({
      to: user.email,
      subject: message.subject,
      text: message.text,
      html: message.html
    });

    const responsePayload = {
      message: 'Se este e-mail estiver cadastrado, o codigo de redefinicao foi enviado.'
    };

    if (!isProduction) {
      responsePayload.resetCode = resetCode;
    }

    res.json(responsePayload);
  })
);

router.post(
  '/password-reset',
  asyncHandler(async (req, res) => {
    const email = requireEmail(req.body?.email);
    const code = requireString(req.body?.code, 'code', { min: 4, max: 20 });
    const password = requirePassword(req.body?.password);
    const hashedCode = hashResetCode(code);
    const user = await db.findOne(
      'users',
      (entry) => entry.email === email && entry.resetPasswordTokenHash === hashedCode
    );

    if (!user) {
      throw new AppError(400, 'Codigo de redefinicao invalido.');
    }

    if (!user.resetPasswordExpiresAt || new Date(user.resetPasswordExpiresAt).getTime() < Date.now()) {
      await db.update('users', user.id, () => ({
        resetPasswordTokenHash: null,
        resetPasswordExpiresAt: null,
        updatedAt: new Date().toISOString()
      }));
      throw new AppError(400, 'Codigo de redefinicao expirado. Solicite um novo codigo.');
    }

    const passwordHash = await hashPassword(password);

    await db.update('users', user.id, () => ({
      passwordHash,
      resetPasswordTokenHash: null,
      resetPasswordExpiresAt: null,
      updatedAt: new Date().toISOString()
    }));

    await writeAuditLog({
      type: 'Autenticacao',
      title: 'Senha redefinida',
      details: `A senha da conta ${user.email} foi redefinida com sucesso.`,
      area: 'Autenticacao',
      status: 'Concluido',
      source: 'auth-api',
      entityType: 'user',
      entityId: user.id
    }, user.email);

    res.json({
      message: 'Senha redefinida com sucesso.'
    });
  })
);

router.get(
  '/me',
  requireAuth,
  asyncHandler(async (req, res) => {
    res.json({ user: sanitizeUser(req.user) });
  })
);

router.patch(
  '/me',
  requireAuth,
  asyncHandler(async (req, res) => {
    const updatedUser = await db.update('users', req.user.id, (current) => ({
      ...current,
      avatarUrl: sanitizeAvatarDataUrl(req.body?.avatarUrl ?? current.avatarUrl ?? ''),
      updatedAt: new Date().toISOString()
    }));

    await writeAuditLog({
      type: 'Perfil',
      title: 'Foto de perfil atualizada',
      details: `A foto de perfil da conta ${updatedUser.email} foi atualizada.`,
      area: 'Perfil',
      status: 'Concluido',
      source: 'auth-api',
      entityType: 'user',
      entityId: updatedUser.id
    }, updatedUser.email);

    res.json({
      message: 'Perfil atualizado com sucesso.',
      user: sanitizeUser(updatedUser)
    });
  })
);

export default router;
