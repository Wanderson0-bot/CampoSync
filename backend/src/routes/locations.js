import { createCollectionRouter } from './_collection.js';
import {
  optionalString,
  requireNumber,
  requireString
} from '../lib/validators.js';

function normalizeLocation(body, user, current = {}) {
  const name = requireString(
    body?.name ?? body?.nome ?? current.name ?? current.nome,
    'name'
  );
  const type = requireString(
    body?.type ?? body?.status ?? body?.tipo ?? current.type ?? current.status ?? current.tipo,
    'type'
  );
  const latitude = requireNumber(
    body?.latitude ?? body?.lat ?? current.latitude ?? current.lat,
    'latitude',
    { min: -90, max: 90 }
  );
  const longitude = requireNumber(
    body?.longitude ?? body?.lng ?? current.longitude ?? current.lng,
    'longitude',
    { min: -180, max: 180 }
  );

  return {
    name,
    nome: name,
    type,
    tipo: type,
    status: type,
    latitude,
    longitude,
    lat: latitude,
    lng: longitude,
    coords: [latitude, longitude],
    coors: [latitude, longitude],
    description: optionalString(
      body?.description ?? current.description,
      { max: 400 }
    ),

    updatedAt: new Date().toISOString(),
    updatedBy: user.email,

    createdAt: current.createdAt || new Date().toISOString(),
    createdBy: current.createdBy || user.email
  };
}

export default createCollectionRouter({
  collection: 'locations',
  allowPublicRead: false,

  validateCreate: (body, user) =>
    normalizeLocation(body, user),

  validateUpdate: (body, user, current) =>
    normalizeLocation(body, user, current)
});
