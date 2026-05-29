import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { initDatabase } from './config/database.js';
import { env } from './config/env.js';
import { asyncHandler } from './lib/http.js';
import { errorHandler } from './middlewares/error-handler.js';
import { notFoundHandler } from './middlewares/not-found.js';
import { applySecurityHeaders } from './middlewares/security.js';
import actionsRoutes from './routes/actions.js';
import auditLogsRoutes from './routes/audit-logs.js';
import assistantRoutes from './routes/assistant.js';
import authRoutes from './routes/auth.js';
import consumptionsRoutes from './routes/consumptions.js';
import dailyUnitActivitiesRoutes from './routes/daily-unit-activities.js';
import locationsRoutes from './routes/locations.js';
import lifecycleAnimalsRoutes from './routes/lifecycle-animals.js';
import lifecycleDeathsRoutes from './routes/lifecycle-deaths.js';
import lifecycleEventsRoutes from './routes/lifecycle-events.js';
import materialsRoutes from './routes/materials.js';
import notificationsRoutes from './routes/notifications.js';
import purchasesRoutes from './routes/purchases.js';
import salesRoutes from './routes/sales.js';
import suppliesRoutes from './routes/suprimentos.js';
import unitsRoutes from './routes/units.js';
import { rateLimit } from './middlewares/rate-limit.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const frontendDir = path.resolve(__dirname, '../../frontend');

function registerFrontendPageRoutes(application, directory) {
  const htmlFiles = fs
    .readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith('.html'))
    .map((entry) => entry.name);

  htmlFiles.forEach((fileName) => {
    const pageName = fileName.replace(/\.html$/i, '');
    const aliases = pageName === 'index'
      ? ['/', '/index', '/index.html']
      : [`/${pageName}`, `/${fileName}`];

    application.get(aliases, (_req, res) => {
      res.sendFile(path.join(directory, fileName));
    });
  });
}

// Ordem dos middlewares:
// 1. segurança
// 2. limite de taxa
// 3. parser de corpo
// 4. rotas
app.set('trust proxy', true);
app.disable('etag');
app.use(applySecurityHeaders);
app.use(express.json({ limit: env.bodyLimit }));
app.use((req, res, next) => {
  if (/\.(html|css|js)$/i.test(req.path)) {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
  }

  next();
});

app.get(['/login', '/login.html'], (req, res, next) => {
  const hasGoogleOauthParams = req.query?.code || req.query?.state || req.query?.error;
  if (!hasGoogleOauthParams) {
    return res.sendFile(path.join(frontendDir, 'login.html'));
  }

  const target = new URL('/api/auth/google/callback', env.appBaseUrl);
  for (const [key, value] of Object.entries(req.query)) {
    if (Array.isArray(value)) {
      value.forEach((item) => target.searchParams.append(key, String(item)));
    } else if (value != null) {
      target.searchParams.set(key, String(value));
    }
  }

  res.redirect(target.toString());
});

app.get(['/cadastro', '/cadastro.html'], (_req, res) => {
  res.sendFile(path.join(frontendDir, 'cadastro.html'));
});

app.get(['/recuperar-senha', '/recuperar-senha.html'], (_req, res) => {
  res.sendFile(path.join(frontendDir, 'recuperar-senha.html'));
});

registerFrontendPageRoutes(app, frontendDir);

app.use(express.static(frontendDir, { etag: false, lastModified: false }));

app.get(
  '/health',
  asyncHandler(async (_req, res) => {
    res.json({
      status: 'ok',
      service: 'CampoSync API',
      environment: env.nodeEnv,
      timestamp: new Date().toISOString()
    });
  })
);

app.get('/auth/google', (_req, res) => {
  const requestBaseUrl = `${_req.protocol}://${_req.get('host')}`;
  const target = new URL('/api/auth/google/start', requestBaseUrl);
  for (const paramName of ['frontend_origin', 'frontend_return_url']) {
    const paramValue = _req.query?.[paramName];
    if (paramValue) {
      target.searchParams.set(paramName, String(paramValue));
    }
  }
  res.redirect(target.toString());
});

app.use('/api/auth', rateLimit({

  scope: 'auth',

  max: env.authRateLimitMax

}));

// ↑ usa bucket separado, limite = 15
app.use('/api/auth', authRoutes);
app.use('/api/notifications', notificationsRoutes);
app.use('/api/audit-logs', auditLogsRoutes);
app.use('/api/purchases', purchasesRoutes);
app.use('/api/sales', salesRoutes);
app.use('/api/consumptions', consumptionsRoutes);
app.use('/api/actions', actionsRoutes);
app.use('/api/daily-unit-activities', dailyUnitActivitiesRoutes);
app.use('/api/supplies', suppliesRoutes);
app.use('/api/materials', materialsRoutes);
app.use('/api/units/custom', unitsRoutes);
app.use('/api/assistant', assistantRoutes);
app.use('/api/locations', locationsRoutes);
app.use('/api/lifecycle/animals', lifecycleAnimalsRoutes);
app.use('/api/lifecycle/events', lifecycleEventsRoutes);
app.use('/api/lifecycle/deaths', lifecycleDeathsRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

// Exportamos o app para permitir testes futuros sem abrir a porta toda vez.
export async function startServer() {
  await initDatabase();

  return app.listen(env.port, '0.0.0.0', () => {
    console.log(`CampoSync API rodando em http://localhost:${env.port}`);
  });
}

if (process.env.NODE_ENV !== 'test') {
  startServer().catch((error) => {
    console.error('Falha ao iniciar o servidor:', error);
    process.exit(1);
  });
}

export default app;
