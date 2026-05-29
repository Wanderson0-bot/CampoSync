import crypto from 'crypto';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const backendDir = path.resolve(__dirname, '../..');
const projectRoot = path.resolve(backendDir, '..');
const envPathCandidates = [
  process.env.ENV_FILE,
  path.join(backendDir, '.env'),
  path.join(backendDir, 'backend', '.env'),
  path.join(projectRoot, '.env')
].filter(Boolean);
const envPath = envPathCandidates.find((candidate) => fs.existsSync(candidate));

dotenv.config(envPath ? { path: envPath, quiet: true } : { quiet: true });

const fallbackAppSecret = crypto
  .createHash('sha256')
  .update(`camposync:${backendDir}`)
  .digest('hex');

function readNumber(value, fallback) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function readList(value, fallback) {
  if (!value) return fallback;
  return String(value)
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

function readBoolean(value, fallback = false) {
  if (value == null || value === '') return fallback;
  return ['1', 'true', 'yes', 'on', 'sim'].includes(String(value).trim().toLowerCase());
}

function resolveProjectPath(value, fallback) {
  const rawValue = value || fallback;
  if (path.isAbsolute(rawValue)) {
    return rawValue;
  }

  return path.resolve(backendDir, rawValue.replace(/^backend[\\/]/, ''));
}

// Centraliza toda a configuracao de ambiente para evitar "strings magicas"
// espalhadas pelo projeto e para deixar claro o que precisa ser definido.
export const env = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: readNumber(process.env.PORT, 5000),
  appBaseUrl: process.env.APP_BASE_URL || `http://localhost:${readNumber(process.env.PORT, 5000)}`,
  databaseDriver: process.env.DB_DRIVER || 'json',
  databaseUrl: process.env.DATABASE_URL || '',
  databaseHost: process.env.DB_HOST || 'localhost',
  databasePort: readNumber(process.env.DB_PORT, 3306),
  databaseName: process.env.DB_NAME || 'camposync',
  databaseUser: process.env.DB_USER || '',
  databasePassword: process.env.DB_PASS || '',
  dataFile: resolveProjectPath(process.env.DATA_FILE, './data/camposync.json'),
  corsOrigins: readList(process.env.CORS_ORIGINS, ['http://localhost:5000', 'http://127.0.0.1:5000']),// removido 'null'
  tokenTtlHours: readNumber(process.env.TOKEN_TTL_HOURS, 12),
  requestLimitWindowMs: readNumber(process.env.RATE_LIMIT_WINDOW_MS, 15 * 60 * 1000),
  requestLimitMax: readNumber(process.env.RATE_LIMIT_MAX, 120),
  authRateLimitMax: readNumber(process.env.AUTH_RATE_LIMIT_MAX, 15),
  bodyLimit: process.env.BODY_LIMIT || '5mb',
  auditLogRetentionDays: readNumber(process.env.AUDIT_LOG_RETENTION_DAYS, 90),
  auditLogCleanupIntervalMs: readNumber(process.env.AUDIT_LOG_CLEANUP_INTERVAL_MS, 12 * 60 * 60 * 1000),
  appSecret: process.env.APP_SECRET || process.env.JWT_SECRET || fallbackAppSecret,
  googleClientId: process.env.GOOGLE_CLIENT_ID || '',
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  googleRedirectUri: process.env.GOOGLE_REDIRECT_URI || `${process.env.APP_BASE_URL || `http://localhost:${readNumber(process.env.PORT, 5000)}`}/api/auth/google/callback`,
  smtpHost: process.env.SMTP_HOST || '',
  smtpPort: readNumber(process.env.SMTP_PORT, 587),
  smtpSecure: readBoolean(process.env.SMTP_SECURE, false),
  smtpUser: process.env.SMTP_USER || '',
  smtpPass: process.env.SMTP_PASS || '',
  smtpFromEmail: process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER || '',
  smtpFromName: process.env.SMTP_FROM_NAME || 'CampoSync',
  openAiApiKey: process.env.OPENAI_API_KEY || '',
  openAiTtsModel: process.env.OPENAI_TTS_MODEL || 'gpt-4o-mini-tts',
  openAiTtsVoice: process.env.OPENAI_TTS_VOICE || 'cedar',
  openAiTtsInstructions:
    process.env.OPENAI_TTS_INSTRUCTIONS ||
    'Fale em portugues do Brasil, com voz clara, acolhedora e objetiva, como um assistente digital de apoio operacional.'
};

export const isProduction = env.nodeEnv === 'production';
