import { createCollectionRouter } from './_collection.js';
import {
  optionalString,
  requireDate,
  requireString
} from '../lib/validators.js';

function normalizeTime(value) {
  return String(value || '').trim().slice(0, 5);
}

function normalizeDailyUnitActivity(body, user, current = {}) {
  return {
    unitId: optionalString(body?.unitId ?? current.unitId, { max: 80 }),
    unitSlug: requireString(body?.unitSlug ?? current.unitSlug, 'unitSlug', { max: 120 }),
    unitName: requireString(body?.unitName ?? current.unitName, 'unitName', { max: 190 }),
    category: requireString(body?.category ?? current.category, 'category', { max: 60 }),
    performerName: requireString(body?.performerName ?? current.performerName, 'performerName', { max: 190 }),
    title: requireString(body?.title ?? current.title, 'title', { max: 160 }),
    details: optionalString(body?.details ?? current.details, { max: 800 }),
    activityDate: requireDate(body?.activityDate ?? current.activityDate, 'activityDate'),
    activityTime: requireString(normalizeTime(body?.activityTime ?? current.activityTime), 'activityTime', { min: 4, max: 5 }),
    updatedAt: new Date().toISOString(),
    updatedBy: user.email,
    createdAt: current.createdAt || new Date().toISOString(),
    createdBy: current.createdBy || user.email
  };
}

export default createCollectionRouter({
  collection: 'dailyUnitActivities',
  validateCreate: (body, user) => normalizeDailyUnitActivity(body, user),
  validateUpdate: (body, user, current) => normalizeDailyUnitActivity(body, user, current),
  allowPublicRead: false
});
