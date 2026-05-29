import mysql from 'mysql2/promise';

const BASE_URL = process.env.TEST_BASE_URL || 'http://127.0.0.1:5000';
const DB_CONFIG = {
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '123456',
  database: process.env.DB_NAME || 'CampoSync'
};

const uniqueTag = `lifecycle-${Date.now()}`;

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

async function request(method, route, { token, body, expectedStatus } = {}) {
  const response = await fetch(`${BASE_URL}${route}`, {
    method,
    headers: {
      ...(body ? { 'Content-Type': 'application/json' } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    body: body ? JSON.stringify(body) : undefined
  });

  const payload = await response.json();
  if (expectedStatus != null && response.status !== expectedStatus) {
    throw new Error(`${method} ${route} retornou ${response.status}, esperado ${expectedStatus}. Resposta: ${JSON.stringify(payload)}`);
  }

  return payload;
}

async function main() {
  const db = await mysql.createConnection(DB_CONFIG);

  try {
    const email = `${uniqueTag}@camposync.local`;
    const password = 'SenhaTeste123!';

    await request('POST', '/api/auth/register', {
      expectedStatus: 201,
      body: {
        name: `Teste ${uniqueTag}`,
        email,
        password
      }
    });

    const login = await request('POST', '/api/auth/login', {
      expectedStatus: 200,
      body: { email, password }
    });

    const token = login.token;
    assert(token, 'Login não retornou token.');

    const animal = await request('POST', '/api/lifecycle/animals', {
      expectedStatus: 201,
      token,
      body: {
        unitId: '',
        unitSlug: 'horticultura',
        unitName: 'Horticultura',
        category: 'planta',
        codigo_animal: `HT-${Date.now()}`,
        data_nascimento: '2026-05-15',
        codigo_mae: 'Lote A',
        codigo_pai: 'Setor 01',
        raca: 'Alface',
        sexo: '',
        fase: 'Plantio',
        baia: 'Canteiro 3',
        status: 'Ativo',
        observacoes: 'registro de teste',
        rawFields: {
          codigo_canteiro: `HT-${Date.now()}`,
          data_plantio: '2026-05-15',
          tipo_cultivo: 'Alface',
          area_canteiro: '20',
          observacoes: 'registro de teste'
        }
      }
    });

    const [[animalRow]] = await db.query('SELECT codigo_animal, raca FROM cs_lifecycle_animals WHERE id = ?', [animal.id]);
    assert(animalRow?.codigo_animal === animal.codigo_animal, 'Animal não foi salvo no banco.');

    const updatedAnimal = await request('PUT', `/api/lifecycle/animals/${animal.id}`, {
      expectedStatus: 200,
      token,
      body: {
        ...animal,
        raca: 'Alface americana',
        observacoes: 'registro editado'
      }
    });

    const [[updatedAnimalRow]] = await db.query('SELECT raca, observacoes FROM cs_lifecycle_animals WHERE id = ?', [animal.id]);
    assert(updatedAnimalRow?.raca === 'Alface americana', 'Edição do animal não foi persistida no banco.');

    const eventRecord = await request('POST', '/api/lifecycle/events', {
      expectedStatus: 201,
      token,
      body: {
        unitId: '',
        unitSlug: 'horticultura',
        unitName: 'Horticultura',
        category: 'planta',
        animal_id: updatedAnimal.id,
        animal_codigo: updatedAnimal.codigo_animal,
        data_evento: '2026-05-16',
        tipo_evento: 'Irrigação',
        fase_vida: 'Manejo',
        descricao_evento: 'evento de teste',
        rawFields: {
          data_evento: '2026-05-16',
          tipo_evento: 'Irrigação',
          descricao_evento: 'evento de teste'
        }
      }
    });

    const [[eventRow]] = await db.query('SELECT tipo_evento FROM cs_lifecycle_events WHERE id = ?', [eventRecord.id]);
    assert(eventRow?.tipo_evento === 'Irrigação', 'Evento não foi salvo no banco.');

    await request('DELETE', `/api/lifecycle/events/${eventRecord.id}`, {
      expectedStatus: 200,
      token
    });

    const [[eventCountRow]] = await db.query('SELECT COUNT(*) AS total FROM cs_lifecycle_events WHERE id = ?', [eventRecord.id]);
    assert(Number(eventCountRow.total) === 0, 'Exclusão do evento não refletiu no banco.');

    await request('DELETE', `/api/lifecycle/animals/${animal.id}`, {
      expectedStatus: 200,
      token
    });

    const [[animalCountRow]] = await db.query('SELECT COUNT(*) AS total FROM cs_lifecycle_animals WHERE id = ?', [animal.id]);
    assert(Number(animalCountRow.total) === 0, 'Exclusão do animal não refletiu no banco.');

    console.log('Persistencia de ciclo de vida validada com sucesso.');
  } finally {
    await db.end();
  }
}

main().catch((error) => {
  console.error(error.stack || error.message || error);
  process.exit(1);
});
