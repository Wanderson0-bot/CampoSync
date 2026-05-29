import nodemailer from 'nodemailer';
import { env, isProduction } from '../config/env.js';
import { AppError } from './errors.js';

let transporterPromise = null;

function isMailConfigured() {
  return Boolean(env.smtpHost && env.smtpPort && env.smtpFromEmail);
}

function ensureMailConfigured() {
  if (!isMailConfigured()) {
    throw new AppError(
      503,
      'Envio de e-mail nao configurado. Defina SMTP_HOST, SMTP_PORT, SMTP_FROM_EMAIL, SMTP_USER e SMTP_PASS.'
    );
  }
}

async function getTransporter() {
  if (transporterPromise) {
    return transporterPromise;
  }

  ensureMailConfigured();

  transporterPromise = Promise.resolve(
    nodemailer.createTransport({
      host: env.smtpHost,
      port: env.smtpPort,
      secure: env.smtpSecure,
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 15000,
      auth: env.smtpUser || env.smtpPass
        ? {
            user: env.smtpUser,
            pass: env.smtpPass
          }
        : undefined
    })
  );

  return transporterPromise;
}

export async function sendMail({ to, subject, html, text }) {
  if (!isMailConfigured() && !isProduction) {
    console.warn(`Envio de e-mail nao configurado. E-mail simulado para ${to}: ${subject}`);
    return {
      accepted: [to],
      rejected: [],
      skipped: true
    };
  }

  const transporter = await getTransporter();
  try {
    return await transporter.sendMail({
      from: `"${env.smtpFromName}" <${env.smtpFromEmail}>`,
      to,
      subject,
      text,
      html
    });
  } catch (error) {
    if (isProduction) {
      throw error;
    }

    console.warn(`Falha ao enviar e-mail em ambiente local. E-mail simulado para ${to}: ${error.message}`);
    return {
      accepted: [to],
      rejected: [],
      skipped: true,
      error: error.message
    };
  }
}
