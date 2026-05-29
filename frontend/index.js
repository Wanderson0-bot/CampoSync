/* ==============================
   CONFIGURAÇÃO E DADOS PADRÃO
============================== */
const STORAGE_KEYS = {
  customUnits: "camposync-custom-units",
  removedUnits: "camposync-removed-units",
  editedDefaultUnits: "camposync-edited-default-units",
  purchases: "camposync-purchases",
  consumptions: "camposync-consumptions",
  sales: "camposync-sales",
  supplies: "camposync-supplies",
  materials: "camposync-materials",
  actions: "camposync-actions",
  swineAnimals: "camposync-swine-animals",
  swineLifeEvents: "camposync-swine-life-events",
  swineDeaths: "camposync-swine-deaths",
  notifications: "camposync-notifications",
  theme: "camposync-theme",
  auditLogs: "camposync-audit-logs",
  apiBaseUrl: "camposync-api-base-url",
  authUsers: "camposync-auth-users",
  authSession: "camposync-auth-session",
  authToken: "camposync-auth-token",
  authRemember: "camposync-auth-remember",
  oauthRemember: "camposync-oauth-remember"
};

const APP_CACHE = {
  notifications: [],
  purchases: [],
  consumptions: [],
  sales: [],
  supplies: [],
  materials: [],
  actions: [],
  auditLogs: [],
  customUnits: [],
  swineAnimals: [],
  swineLifeEvents: [],
  swineDeaths: []
};

const CACHE_KEY_MAP = {
  [STORAGE_KEYS.notifications]: "notifications",
  [STORAGE_KEYS.purchases]: "purchases",
  [STORAGE_KEYS.consumptions]: "consumptions",
  [STORAGE_KEYS.sales]: "sales",
  [STORAGE_KEYS.supplies]: "supplies",
  [STORAGE_KEYS.materials]: "materials",
  [STORAGE_KEYS.actions]: "actions",
  [STORAGE_KEYS.auditLogs]: "auditLogs",
  [STORAGE_KEYS.customUnits]: "customUnits",
  [STORAGE_KEYS.swineAnimals]: "swineAnimals",
  [STORAGE_KEYS.swineLifeEvents]: "swineLifeEvents",
  [STORAGE_KEYS.swineDeaths]: "swineDeaths"
};

const UNIT_LIFECYCLE_COPY = {
  suinocultura: {
    summaryEyebrow: "Resumo zootécnico",
    summaryTitle: "Ciclo de vida do rebanho",
    summaryTag: "0 registros",
    registerEyebrow: "Ciclo de vida",
    registerTitle: "Cadastrar animal",
    registerTag: "Nascimento e identificação",
    registerButton: "Cadastrar animal",
    registerCodeLabel: "Código do animal",
    registerCodePlaceholder: "Ex.: SU-001",
    motherLabel: "Código da mãe",
    motherPlaceholder: "Ex.: MAE-014",
    fatherLabel: "Código do pai",
    fatherPlaceholder: "Ex.: PAI-007",
    breedLabel: "Raça",
    breedPlaceholder: "Ex.: Duroc",
    locationLabel: "Baia",
    locationPlaceholder: "Ex.: Baia 03",
    notesPlaceholder: "Ex.: leitão de primeira leitegada, acompanhamento inicial normal.",
    eventEyebrow: "Histórico sanitário e produtivo",
    eventTitle: "Registrar evento",
    eventTag: "Da vida ao descarte",
    eventSubjectLabel: "Animal",
    eventSubjectPlaceholder: "Selecione o animal",
    eventTypePlaceholder: "Ex.: transferência",
    eventDescriptionPlaceholder: "Ex.: transferência para baia 06 após desmame."
  },
  avicultura: {
    summaryEyebrow: "Resumo zootécnico",
    summaryTitle: "Ciclo de vida dos peixes",
    registerEyebrow: "Ciclo de vida",
    registerTitle: "Cadastrar ave",
    registerTag: "Nascimento e identificação",
    registerButton: "Cadastrar ave",
    registerCodeLabel: "Código da ave",
    registerCodePlaceholder: "Ex.: AV-001",
    motherLabel: "Lote da matriz",
    motherPlaceholder: "Ex.: MT-014",
    fatherLabel: "Lote reprodutor",
    fatherPlaceholder: "Ex.: RP-007",
    breedLabel: "Linhagem",
    breedPlaceholder: "Ex.: Caipira Pesadão",
    locationLabel: "Galpão",
    locationPlaceholder: "Ex.: Galpão 03",
    notesPlaceholder: "Ex.: lote com boa adaptação e consumo regular.",
    eventEyebrow: "Histórico sanitário e produtivo",
    eventTitle: "Registrar manejo",
    eventTag: "Do lote à expedição",
    eventSubjectLabel: "Ave",
    eventSubjectPlaceholder: "Selecione a ave",
    eventTypePlaceholder: "Ex.: vacinação",
    eventDescriptionPlaceholder: "Ex.: transferência para o galpão 02 após triagem."
  },
  piscicultura: {
    summaryEyebrow: "Resumo zootécnico",
    summaryTitle: "Ciclo de vida do plantel",
    registerEyebrow: "Ciclo de vida",
    registerTitle: "Cadastrar peixe",
    registerTag: "Alevinagem e identificação",
    registerButton: "Cadastrar peixe",
    registerCodeLabel: "Código do lote",
    registerCodePlaceholder: "Ex.: PC-001",
    motherLabel: "Origem da matriz",
    motherPlaceholder: "Ex.: MT-014",
    fatherLabel: "Origem do reprodutor",
    fatherPlaceholder: "Ex.: RP-007",
    breedLabel: "Espécie",
    breedPlaceholder: "Ex.: Tilápia",
    locationLabel: "Tanque",
    locationPlaceholder: "Ex.: Tanque 03",
    notesPlaceholder: "Ex.: lote em adaptação com boa resposta à ração.",
    eventEyebrow: "Histórico sanitário e produtivo",
    eventTitle: "Registrar manejo",
    eventTag: "Do alevino ao abate",
    eventSubjectLabel: "Peixe",
    eventSubjectPlaceholder: "Selecione o lote",
    eventTypePlaceholder: "Ex.: biometria",
    eventDescriptionPlaceholder: "Ex.: transferência para o tanque 06 após classificação."
  },
  horticultura: {
    summaryEyebrow: "Resumo de cultivo",
    summaryTitle: "Acompanhamento dos cultivos",
    registerEyebrow: "Cadastro de cultivo",
    registerTitle: "Cadastrar cultivo",
    registerTag: "Plantio e identificação",
    registerButton: "Cadastrar cultivo",
    registerCodeLabel: "Código do cultivo",
    registerCodePlaceholder: "Ex.: HT-001",
    motherLabel: "Origem da semente",
    motherPlaceholder: "Ex.: Lote S-014",
    fatherLabel: "Origem da muda",
    fatherPlaceholder: "Ex.: Muda 007",
    breedLabel: "Cultura",
    breedPlaceholder: "Ex.: Alface crespa",
    locationLabel: "Canteiro",
    locationPlaceholder: "Ex.: Canteiro 03",
    notesPlaceholder: "Ex.: plantio com irrigação regular e boa emergência.",
    eventEyebrow: "Histórico sanitário e produtivo",
    eventTitle: "Registrar manejo",
    eventTag: "Do plantio à colheita",
    eventSubjectLabel: "Cultivo",
    eventSubjectPlaceholder: "Selecione o cultivo",
    eventTypePlaceholder: "Ex.: adubação",
    eventDescriptionPlaceholder: "Ex.: reforço de irrigação e cobertura no canteiro 06."
  },
  fruticultura: {
    summaryEyebrow: "Resumo de cultivo",
    summaryTitle: "Acompanhamento do pomar",
    registerEyebrow: "Cadastro do pomar",
    registerTitle: "Cadastrar planta",
    registerTag: "Plantio e identificação",
    registerButton: "Cadastrar planta",
    registerCodeLabel: "Código da planta",
    registerCodePlaceholder: "Ex.: FR-001",
    motherLabel: "Origem da muda",
    motherPlaceholder: "Ex.: Muda 014",
    fatherLabel: "Porta-enxerto",
    fatherPlaceholder: "Ex.: PE-007",
    breedLabel: "Espécie",
    breedPlaceholder: "Ex.: Goiabeira",
    locationLabel: "Talhão",
    locationPlaceholder: "Ex.: Talhão 03",
    notesPlaceholder: "Ex.: muda com bom pegamento e brotação uniforme.",
    eventEyebrow: "Histórico sanitário e produtivo",
    eventTitle: "Registrar manejo",
    eventTag: "Do plantio à colheita",
    eventSubjectLabel: "Planta",
    eventSubjectPlaceholder: "Selecione a planta",
    eventTypePlaceholder: "Ex.: poda",
    eventDescriptionPlaceholder: "Ex.: poda de formação realizada no talhão 02."
  },
  agrofloresta: {
    summaryEyebrow: "Resumo de manejo",
    summaryTitle: "Acompanhamento do sistema",
    registerEyebrow: "Cadastro do sistema",
    registerTitle: "Cadastrar espécie",
    registerTag: "Implantação e identificação",
    registerButton: "Cadastrar espécie",
    registerCodeLabel: "Código da espécie",
    registerCodePlaceholder: "Ex.: AG-001",
    motherLabel: "Origem da muda",
    motherPlaceholder: "Ex.: Muda 014",
    fatherLabel: "Estrato principal",
    fatherPlaceholder: "Ex.: Estrato 007",
    breedLabel: "Espécie",
    breedPlaceholder: "Ex.: Banana",
    locationLabel: "Módulo",
    locationPlaceholder: "Ex.: Módulo 03",
    notesPlaceholder: "Ex.: consórcio em bom desenvolvimento no setor leste.",
    eventEyebrow: "Histórico sanitário e produtivo",
    eventTitle: "Registrar manejo",
    eventTag: "Do plantio à sucessão",
    eventSubjectLabel: "Espécie",
    eventSubjectPlaceholder: "Selecione a espécie",
    eventTypePlaceholder: "Ex.: cobertura morta",
    eventDescriptionPlaceholder: "Ex.: reforço de cobertura e manejo do módulo 04."
  },
  "plantas-forrageiras": {
    summaryEyebrow: "Resumo de manejo",
    summaryTitle: "Acompanhamento da área forrageira",
    registerEyebrow: "Cadastro da área",
    registerTitle: "Cadastrar forrageira",
    registerTag: "Implantação e identificação",
    registerButton: "Cadastrar forrageira",
    registerCodeLabel: "Código da forrageira",
    registerCodePlaceholder: "Ex.: PF-001",
    motherLabel: "Origem da semente",
    motherPlaceholder: "Ex.: Lote 014",
    fatherLabel: "Área de referência",
    fatherPlaceholder: "Ex.: Piquete 007",
    breedLabel: "Forrageira",
    breedPlaceholder: "Ex.: Capim mombaca",
    locationLabel: "Piquete",
    locationPlaceholder: "Ex.: Piquete 03",
    notesPlaceholder: "Ex.: área com rebrote vigoroso e adubação recente.",
    eventEyebrow: "Histórico sanitário e produtivo",
    eventTitle: "Registrar manejo",
    eventTag: "Do plantio ao corte",
    eventSubjectLabel: "Forrageira",
    eventSubjectPlaceholder: "Selecione a área",
    eventTypePlaceholder: "Ex.: corte",
    eventDescriptionPlaceholder: "Ex.: corte programado concluído no piquete 05."
  },
  "cultivos-de-sequeiro": {
    summaryEyebrow: "Resumo de cultivo",
    summaryTitle: "Acompanhamento da lavoura",
    registerEyebrow: "Cadastro da lavoura",
    registerTitle: "Cadastrar talhão",
    registerTag: "Plantio e identificação",
    registerButton: "Cadastrar talhão",
    registerCodeLabel: "Código do talhão",
    registerCodePlaceholder: "Ex.: CS-001",
    motherLabel: "Area plantada",
    motherPlaceholder: "Ex.: 2 ha ou 500 m2",
    fatherLabel: "Sementes utilizadas",
    fatherPlaceholder: "Ex.: Feijão 007",
    breedLabel: "Planta cultivada",
    breedPlaceholder: "Ex.: Milho",
    locationLabel: "Talhão",
    locationPlaceholder: "Ex.: Talhão 03",
    notesPlaceholder: "Ex.: semeadura uniforme com boa umidade inicial.",
    eventEyebrow: "Histórico sanitário e produtivo",
    eventTitle: "Registrar manejo",
    eventTag: "Do plantio à colheita",
    eventSubjectLabel: "Talhão",
    eventSubjectPlaceholder: "Selecione o talhão",
    eventTypePlaceholder: "Ex.: capina",
    eventDescriptionPlaceholder: "Ex.: vistoria de umidade e manejo no talhão 04."
  },
  "plantas-ornamentais": {
    summaryEyebrow: "Resumo de cultivo",
    summaryTitle: "Acompanhamento das mudas",
    registerEyebrow: "Cadastro de mudas",
    registerTitle: "Cadastrar muda",
    registerTag: "Formação e identificação",
    registerButton: "Cadastrar muda",
    registerCodeLabel: "Código da muda",
    registerCodePlaceholder: "Ex.: OR-001",
    motherLabel: "Origem da matriz",
    motherPlaceholder: "Ex.: Matriz 014",
    fatherLabel: "Origem da estaca",
    fatherPlaceholder: "Ex.: Estaca 007",
    breedLabel: "Espécie",
    breedPlaceholder: "Ex.: Antúrio",
    locationLabel: "Bancada",
    locationPlaceholder: "Ex.: Bancada 03",
    notesPlaceholder: "Ex.: lote em acabamento com boa resposta à nebulização.",
    eventEyebrow: "Histórico sanitário e produtivo",
    eventTitle: "Registrar manejo",
    eventTag: "Da propagação à venda",
    eventSubjectLabel: "Muda",
    eventSubjectPlaceholder: "Selecione a muda",
    eventTypePlaceholder: "Ex.: repicagem",
    eventDescriptionPlaceholder: "Ex.: repicagem concluída e lotes separados por porte."
  },
  "plantas-medicinais": {
    summaryEyebrow: "Resumo de cultivo",
    summaryTitle: "Acompanhamento das espécies",
    registerEyebrow: "Cadastro das espécies",
    registerTitle: "Cadastrar espécie",
    registerTag: "Plantio e identificação",
    registerButton: "Cadastrar espécie",
    registerCodeLabel: "Código da espécie",
    registerCodePlaceholder: "Ex.: PM-001",
    motherLabel: "Origem da muda",
    motherPlaceholder: "Ex.: Muda 014",
    fatherLabel: "Origem da matriz",
    fatherPlaceholder: "Ex.: Matriz 007",
    breedLabel: "Espécie",
    breedPlaceholder: "Ex.: Erva-cidreira",
    locationLabel: "Canteiro",
    locationPlaceholder: "Ex.: Canteiro 03",
    notesPlaceholder: "Ex.: espécie em ponto ideal para colheita seletiva.",
    eventEyebrow: "Histórico sanitário e produtivo",
    eventTitle: "Registrar manejo",
    eventTag: "Do plantio à secagem",
    eventSubjectLabel: "Espécie",
    eventSubjectPlaceholder: "Selecione a espécie",
    eventTypePlaceholder: "Ex.: colheita",
    eventDescriptionPlaceholder: "Ex.: colheita seletiva iniciada no canteiro 01."
  },
  "viveiros-de-mudas": {
    summaryEyebrow: "Resumo de viveiro",
    summaryTitle: "Acompanhamento das mudas",
    registerEyebrow: "Cadastro de mudas",
    registerTitle: "Cadastrar muda",
    registerTag: "Formação e identificação",
    registerButton: "Cadastrar muda",
    registerCodeLabel: "Código da muda",
    registerCodePlaceholder: "Ex.: VM-001",
    motherLabel: "Origem da semente",
    motherPlaceholder: "Ex.: Lote 014",
    fatherLabel: "Origem da matriz",
    fatherPlaceholder: "Ex.: Matriz 007",
    breedLabel: "Tipo de muda",
    breedPlaceholder: "Ex.: Muda frutífera",
    locationLabel: "Bancada",
    locationPlaceholder: "Ex.: Bancada 03",
    notesPlaceholder: "Ex.: bandeja em rustificação com boa uniformidade.",
    eventEyebrow: "Histórico sanitário e produtivo",
    eventTitle: "Registrar manejo",
    eventTag: "Da emergência à expedição",
    eventSubjectLabel: "Muda",
    eventSubjectPlaceholder: "Selecione a muda",
    eventTypePlaceholder: "Ex.: rustificação",
    eventDescriptionPlaceholder: "Ex.: ajuste de sombreamento na bancada 09."
  }
};

Object.assign(UNIT_LIFECYCLE_COPY.piscicultura, {
  summaryTitle: "Ciclo de vida dos peixes",
  registerTag: "Alevinagem, crescimento e abate",
  registerCodeLabel: "Codigo do peixe",
  motherLabel: "Origem do lote",
  motherPlaceholder: "Ex.: Alevinagem 014",
  fatherLabel: "Lote reprodutor",
  eventSubjectPlaceholder: "Selecione o peixe"
});

const UNIT_LABELS = {
  suinocultura: "Suinocultura",
  piscicultura: "Piscicultura",
  avicultura: "Avicultura",
  horticultura: "Horticultura",
  fruticultura: "Fruticultura",
  agrofloresta: "Agrofloresta",
  "plantas-forrageiras": "Plantas Forrageiras",
  "cultivos-de-sequeiro": "Cultivos de Sequeiro",
  "plantas-ornamentais": "Plantas Ornamentais",
  "plantas-medicinais": "Plantas Medicinais",
  "viveiros-de-mudas": "Viveiros de Mudas",
  "uso-geral": "Uso geral"
};

const DEFAULT_MATERIAL_CATEGORIES = [
  "Equipamento",
  "Ferramenta",
  "Irrigacao",
  "Protecao"
];

const DEFAULT_MATERIAL_STATUSES = [
  "Disponivel",
  "Em manutencao",
  "Indisponivel"
];

function resolveUnitKey(value = "") {
  const normalizedValue = normalizeUnitLookup(value).replace(/\s+/g, "-");

  return Object.keys(UNIT_LABELS).find((key) => {
    return (
      normalizeUnitLookup(key) === normalizedValue ||
      normalizeUnitLookup(UNIT_LABELS[key]) === normalizedValue
    );
  }) || "";
}

function normalizeUnitLookup(value = "") {
  return String(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function getUnitCategoryLabel(category = "") {
  return String(category).toLowerCase() === "animal" ? "Animal" : "Flora";
}

function getUnitDisplayLabel(value = "") {
  const unitKey = resolveUnitKey(value);
  return UNIT_LABELS[unitKey] || String(value || "").trim() || "Unidade";
}

function getUnitCategoryOptions(values = []) {
  const knownOptions = Object.keys(UNIT_LABELS).map((key) => ({
    value: key,
    label: UNIT_LABELS[key]
  }));

  const dynamicOptions = values
    .map((value) => {
      const rawValue = String(value || "").trim();
      if (!rawValue) {
        return null;
      }

      const resolvedKey = resolveUnitKey(rawValue);
      if (resolvedKey) {
        return {
          value: resolvedKey,
          label: UNIT_LABELS[resolvedKey]
        };
      }

      return {
        value: rawValue,
        label: rawValue
      };
    })
    .filter(Boolean);

  const dedupedOptions = [];
  const seenValues = new Set();

  [...knownOptions, ...dynamicOptions].forEach((option) => {
    const normalizedValue = normalizeUnitLookup(option.value);
    if (!normalizedValue || seenValues.has(normalizedValue)) {
      return;
    }

    seenValues.add(normalizedValue);
    dedupedOptions.push(option);
  });

  return dedupedOptions;
}

function renderSelectOptions(select, config = {}) {
  if (!select) return;

  const {
    placeholderLabel = "",
    placeholderValue = "",
    options = [],
    preserveValue = true
  } = config;

  const previousValue = preserveValue ? String(select.value || "") : "";
  const normalizedOptions = [];

  if (placeholderLabel) {
    normalizedOptions.push({
      value: placeholderValue,
      label: placeholderLabel
    });
  }

  options.forEach((option) => {
    const value = String(option?.value ?? "").trim();
    const label = String(option?.label ?? value).trim();

    if (!value || normalizedOptions.some((item) => item.value === value)) {
      return;
    }

    normalizedOptions.push({ value, label });
  });

  select.innerHTML = normalizedOptions.map((option) => {
    return `<option value="${escapeHtml(option.value)}">${escapeHtml(option.label)}</option>`;
  }).join("");

  if (previousValue && normalizedOptions.some((option) => option.value === previousValue)) {
    select.value = previousValue;
  }
}

function formatActionTime(value = "") {
  const rawValue = String(value || "").trim();
  const match = rawValue.match(/^(\d{2}:\d{2})/);
  return match ? match[1] : (rawValue || "--:--");
}

function getUnitCardImage(unitName = "", unitSlug = "") {
  return "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80";
}

function needsImageFallback(src = "") {
  return !src || /\.hei[cf]$/i.test(src);
}

function applyCardImage(imageElement, unitName = "", unitSlug = "", explicitImage = "") {
  if (!imageElement) return;

  const nextImage = needsImageFallback(explicitImage) ? getUnitCardImage(unitName, unitSlug) : explicitImage;
  imageElement.src = nextImage;
  imageElement.alt = `Imagem da unidade ${unitName}`;
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(String(reader.result || "")));
    reader.addEventListener("error", () => reject(new Error("Não foi possível ler a imagem selecionada.")));
    reader.readAsDataURL(file);
  });
}

function normalizeAssistantText(value = "") {
  return String(value)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function formatAssistantCount(value) {
  return new Intl.NumberFormat("pt-BR").format(Number(value) || 0);
}

function formatAssistantCurrency(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(Number(value) || 0);
}

function formatAssistantDate(value) {
  if (!value) return "sem data";
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  return date.toLocaleDateString("pt-BR");
}

function includesAssistantKeyword(text, keywords = []) {
  return keywords.some((keyword) => text.includes(keyword));
}

function buildAssistantUnitsSnapshot() {
  return APP_CACHE.customUnits.map((unit) => ({
    id: unit.id || unit.slug,
    name: unit.name,
    type: "custom",
    status: unit.slug || slugify(unit.name),
    lat: unit.lat || null,
    lng: unit.lng || null,
    removed: false
  }));
}

function getAssistantSnapshot() {
  return {
    notifications: APP_CACHE.notifications,
    purchases: APP_CACHE.purchases,
    consumptions: APP_CACHE.consumptions,
    sales: APP_CACHE.sales,
    supplies: APP_CACHE.supplies,
    materials: APP_CACHE.materials,
    actions: APP_CACHE.actions,
    auditLogs: APP_CACHE.auditLogs,
    swineAnimals: APP_CACHE.swineAnimals,
    swineLifeEvents: APP_CACHE.swineLifeEvents,
    swineDeaths: APP_CACHE.swineDeaths,
    units: buildAssistantUnitsSnapshot()
  };
}

function tokenizeAssistantQuery(message = "") {
  const stopwords = new Set([
    "a", "o", "os", "as", "de", "da", "do", "das", "dos", "e", "em", "no", "na", "nos", "nas",
    "um", "uma", "uns", "umas", "para", "por", "com", "sem", "sobre", "qual", "quais", "quanto",
    "quantos", "quantas", "tem", "temos", "mostrar", "mostre", "me", "ver", "veja", "quero",
    "preciso", "dados", "dado", "informação", "informações", "detalhe", "detalhes", "está", "estão",
    "ser", "são", "foi", "hoje", "ontem", "amanhã", "tela", "página", "sistema", "camposync"
  ]);

  return normalizeAssistantText(message)
    .split(" ")
    .filter((token) => token.length > 2 && !stopwords.has(token));
}

function summarizeAssistantList(items = [], formatter, maxItems = 3) {
  if (!items.length) return "";
  return items.slice(0, maxItems).map(formatter).join("; ");
}

function buildAssistantSearchIndex(snapshot) {
  return [
    ...snapshot.supplies.map((item) => ({
      type: "supply",
      text: normalizeAssistantText(`${item.product} ${item.domain} ${item.notes} estoque ${item.stock}`),
      record: item
    })),
    ...snapshot.materials.map((item) => ({
      type: "material",
      text: normalizeAssistantText(`${item.material} ${item.categoria} ${item.domínio} ${item.status} ${item.observações}`),
      record: item
    })),
    ...snapshot.purchases.map((item) => ({
      type: "purchase",
      text: normalizeAssistantText(`${item.item} ${item.category} ${item.notes} compra`),
      record: item
    })),
    ...snapshot.sales.map((item) => ({
      type: "sale",
      text: normalizeAssistantText(`${item.categoria} venda ${item.quantidade} ${item.data_venda}`),
      record: item
    })),
    ...snapshot.actions.map((item) => ({
      type: "action",
      text: normalizeAssistantText(`${item.acao} ${item.unidade} ${item.detalhes_acao} ${item.data_acao}`),
      record: item
    })),
    ...snapshot.notifications.map((item) => ({
      type: "notification",
      text: normalizeAssistantText(`${item.title} ${item.message} alerta notificacao ${item.time}`),
      record: item
    })),
    ...snapshot.units.map((item) => ({
      type: "unit",
      text: normalizeAssistantText(`${item.name} ${item.status} unidade área produtiva`),
      record: item
    })),
    ...snapshot.swineAnimals.map((item) => ({
      type: "swine",
      text: normalizeAssistantText(`${item.codigo_animal} ${item.raça} ${item.fase} ${item.baia} ${item.status} ${item.observações}`),
      record: item
    })),
    ...snapshot.swineLifeEvents.map((item) => ({
      type: "swine-event",
      text: normalizeAssistantText(`${item.animal_codigo} ${item.tipo_evento} ${item.fase_vida} ${item.descricao_evento}`),
      record: item
    }))
  ];
}

function searchAssistantRecords(snapshot, message) {
  const tokens = tokenizeAssistantQuery(message);
  if (!tokens.length) return [];

  return buildAssistantSearchIndex(snapshot)
    .map((entry) => ({
      ...entry,
      score: tokens.reduce((total, token) => total + (entry.text.includes(token) ? 1 : 0), 0)
    }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);
}

function buildAssistantSearchAnswer(result) {
  if (!result) return "";

  if (result.type === "supply") {
    const item = result.record;
    return `${item.product} aparece em suprimentos com estoque ${formatAssistantCount(item.stock)} e minimo ${formatAssistantCount(item.minStock)} na categoria ${item.domain}.`;
  }

  if (result.type === "material") {
    const item = result.record;
    return `${item.material} aparece em ferramentas com quantidade ${formatAssistantCount(item.quantidade)}, status ${item.status} e domínio ${item.dominio}.`;
  }

  if (result.type === "purchase") {
    const item = result.record;
    return `${item.item} aparece em compras com ${formatAssistantCount(item.quantity)} unidades, valor unitário ${formatAssistantCurrency(item.unitPrice)} e data ${formatAssistantDate(item.date)}.`;
  }

  if (result.type === "sale") {
    const item = result.record;
    const total = Number(item.quantidade || 0) * Number(item.valor_unitario || 0);
    return `${item.categoria} aparece em vendas com ${formatAssistantCount(item.quantidade)} unidades e total estimado de ${formatAssistantCurrency(total)} em ${formatAssistantDate(item.data_venda)}.`;
  }

  if (result.type === "action") {
    const item = result.record;
    return `Encontrei a ação ${item.acao} na unidade ${item.unidade} para ${formatAssistantDate(item.data_acao)} às ${item.hora_acao || "--:--"}.`;
  }

  if (result.type === "notification") {
    const item = result.record;
    return `Encontrei o alerta ${item.title}: ${item.message}`;
  }

  if (result.type === "unit") {
    const item = result.record;
    return `A unidade ${item.name} está cadastrada no sistema como área produtiva ${item.type === "custom" ? "personalizada" : "padrão"}.`;
  }

  if (result.type === "swine") {
    const item = result.record;
    return `O animal ${item.codigo_animal} está na fase ${item.fase}, com status ${item.status}, na ${item.baia}.`;
  }

  if (result.type === "swine-event") {
    const item = result.record;
    return `Encontrei um registro do animal ${item.animal_codigo}: ${item.tipo_evento} em ${formatAssistantDate(item.data_evento)}.`;
  }

  return "";
}

function createSystemSummaryAnswer(snapshot) {
  const totalSalesValue = snapshot.sales.reduce((total, item) => total + (Number(item.quantidade || 0) * Number(item.valor_unitario || 0)), 0);
  const lowStockSupplies = snapshot.supplies.filter((item) => Number(item.stock || 0) <= Number(item.minStock || 0));
  const unreadNotifications = snapshot.notifications.filter((item) => !item.read);

  return `Resumo atual do CampoSync: ${formatAssistantCount(snapshot.units.length)} unidades cadastradas, ${formatAssistantCount(snapshot.supplies.length)} suprimentos, ${formatAssistantCount(snapshot.materials.length)} ferramentas, ${formatAssistantCount(snapshot.purchases.length)} compras, ${formatAssistantCount(snapshot.sales.length)} vendas e ${formatAssistantCount(unreadNotifications.length)} alertas não lidos. O total estimado de vendas é ${formatAssistantCurrency(totalSalesValue)} e existem ${formatAssistantCount(lowStockSupplies.length)} itens de suprimentos em nível de atenção.`;
}

function createAlertsAnswer(snapshot) {
  const unreadNotifications = snapshot.notifications.filter((item) => !item.read);
  const lowStockSupplies = snapshot.supplies.filter((item) => Number(item.stock || 0) <= Number(item.minStock || 0));

  if (!unreadNotifications.length && !lowStockSupplies.length) {
    return "Não encontrei alertas abertos no momento. Também não há suprimentos abaixo do mínimo cadastrado.";
  }

  const alertsText = unreadNotifications.length
    ? `Alertas não lidos: ${summarizeAssistantList(unreadNotifications, (item) => `${item.title} (${item.time})`, 3)}.`
    : "Não há alertas não lidos cadastrados.";

  const stockText = lowStockSupplies.length
    ? `Itens em atenção: ${summarizeAssistantList(lowStockSupplies, (item) => `${item.product} com estoque ${formatAssistantCount(item.stock)} e mínimo ${formatAssistantCount(item.minStock)}`, 3)}.`
    : "Nenhum suprimento está abaixo do mínimo.";

  return `${alertsText} ${stockText}`.trim();
}

function createSuppliesAnswer(snapshot, text) {
  const totalStock = snapshot.supplies.reduce((total, item) => total + Number(item.stock || 0), 0);
  const lowStockSupplies = snapshot.supplies.filter((item) => Number(item.stock || 0) <= Number(item.minStock || 0));
  const categories = [...new Set(snapshot.supplies.map((item) => item.domain).filter(Boolean))];

  if (includesAssistantKeyword(text, ["baixo", "mínimo", "falta", "faltando", "crítico"])) {
    if (!lowStockSupplies.length) {
      return "Nenhum suprimento está abaixo do estoque mínimo cadastrado.";
    }

    return `Encontrei ${formatAssistantCount(lowStockSupplies.length)} suprimentos em atenção: ${summarizeAssistantList(lowStockSupplies, (item) => `${item.product} (${formatAssistantCount(item.stock)}/${formatAssistantCount(item.minStock)})`, 4)}.`;
  }

  return `O cadastro de suprimentos tem ${formatAssistantCount(snapshot.supplies.length)} itens, estoque total de ${formatAssistantCount(totalStock)} unidades e ${formatAssistantCount(categories.length)} categorias. Principais itens: ${summarizeAssistantList(snapshot.supplies, (item) => `${item.product} (${formatAssistantCount(item.stock)} em estoque)`, 3)}.`;
}

function createMaterialsAnswer(snapshot) {
  const availableMaterials = snapshot.materials.filter((item) => normalizeAssistantText(item.status) === "disponível");
  const maintenanceMaterials = snapshot.materials.filter((item) => normalizeAssistantText(item.status).includes("manutencao"));

  return `Ferramentas cadastradas: ${formatAssistantCount(snapshot.materials.length)}. Disponíveis: ${formatAssistantCount(availableMaterials.length)}. Em manutenção: ${formatAssistantCount(maintenanceMaterials.length)}. Itens em destaque: ${summarizeAssistantList(snapshot.materials, (item) => `${item.material} (${item.status})`, 3)}.`;
}

function createPurchasesAnswer(snapshot) {
  const totalValue = snapshot.purchases.reduce((total, item) => total + (Number(item.quantity || 0) * Number(item.unitPrice || 0)), 0);
  const sorted = [...snapshot.purchases].sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")));

  return `Compras registradas: ${formatAssistantCount(snapshot.purchases.length)} com total estimado de ${formatAssistantCurrency(totalValue)}. Lançamentos recentes: ${summarizeAssistantList(sorted, (item) => `${item.item} em ${formatAssistantDate(item.date)}`, 3)}.`;
}

function createSalesAnswer(snapshot) {
  const totalValue = snapshot.sales.reduce((total, item) => total + (Number(item.quantidade || 0) * Number(item.valor_unitario || 0)), 0);
  const totalUnits = snapshot.sales.reduce((total, item) => total + Number(item.quantidade || 0), 0);
  const topCategories = [...snapshot.sales]
    .sort((a, b) => (Number(b.quantidade || 0) * Number(b.valor_unitario || 0)) - (Number(a.quantidade || 0) * Number(a.valor_unitario || 0)));

  return `Vendas registradas: ${formatAssistantCount(snapshot.sales.length)}. Volume vendido: ${formatAssistantCount(totalUnits)} unidades. Faturamento estimado: ${formatAssistantCurrency(totalValue)}. Maiores registros: ${summarizeAssistantList(topCategories, (item) => `${item.categoria} em ${formatAssistantDate(item.data_venda)}`, 3)}.`;
}

function createHistoryAnswer(snapshot) {
  const auditHistory = (snapshot.auditLogs || []).map((item) => ({
    label: `${item.type}: ${item.title}`,
    date: item.date
  }));
  const history = [
    ...auditHistory,
    ...snapshot.actions.map((item) => ({ label: `Ação: ${item.acao}`, date: item.data_acao })),
    ...snapshot.purchases.map((item) => ({ label: `Compra: ${item.item}`, date: item.date })),
    ...snapshot.consumptions.map((item) => ({ label: `Consumo: ${item.produto}`, date: item.data_consumo })),
    ...snapshot.sales.map((item) => ({ label: `Venda: ${item.categoria}`, date: item.data_venda })),
    ...snapshot.swineLifeEvents.map((item) => ({ label: `Evento animal ${item.animal_codigo}: ${item.tipo_evento}`, date: item.data_evento }))
  ].sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")));

  if (!history.length) {
    return "Não encontrei histórico registrado no sistema.";
  }

  return `Histórico recente do sistema: ${summarizeAssistantList(history, (item) => `${item.label} em ${formatAssistantDate(item.date)}`, 4)}.`;
}

function createUnitsAnswer(snapshot) {
  const defaultCount = snapshot.units.filter((item) => item.type === "default").length;
  const customCount = snapshot.units.filter((item) => item.type === "custom").length;

  return `O sistema possui ${formatAssistantCount(snapshot.units.length)} unidades cadastradas, sendo ${formatAssistantCount(defaultCount)} padrão e ${formatAssistantCount(customCount)} personalizadas. Unidades encontradas: ${summarizeAssistantList(snapshot.units, (item) => item.name, 5)}.`;
}

function createSwineAnswer(snapshot, text) {
  const liveAnimals = snapshot.swineAnimals.filter((item) => normalizeAssistantText(item.status) !== "morto");
  const deaths = snapshot.swineDeaths.length;

  if (includesAssistantKeyword(text, ["obito", "morte", "morto", "mortandade"])) {
    if (!deaths) {
      return "Não há óbitos registrados na suinocultura.";
    }

    return `Há ${formatAssistantCount(deaths)} óbitos registrados. Registros recentes: ${summarizeAssistantList(snapshot.swineDeaths, (item) => `${item.animal_codigo} em ${formatAssistantDate(item.data_obito)} por ${item.causa_obito}`, 3)}.`;
  }

  return `Na suinocultura existem ${formatAssistantCount(snapshot.swineAnimals.length)} animais cadastrados, ${formatAssistantCount(liveAnimals.length)} ativos ou em observacao e ${formatAssistantCount(deaths)} obitos registrados. Exemplos: ${summarizeAssistantList(snapshot.swineAnimals, (item) => `${item.codigo_animal} (${item.fase}, ${item.status})`, 3)}.`;
}

function createAssistantCapabilityAnswer() {
  return "Posso responder perguntas sobre estoque, suprimentos, ferramentas, compras, vendas, alertas, histórico, unidades produtivas e registros da suinocultura. Se a pergunta não fizer parte do CampoSync, eu não devo responder.";
}

function isAssistantSystemQuestion(text, snapshot, searchResults) {
  const systemKeywords = [
    "estoque", "suprimento", "insumo", "produto", "material", "equipamento", "ferramenta",
    "compra", "compras", "venda", "vendas", "faturamento", "receita", "alerta", "alertas",
    "notificacao", "notificacoes", "historico", "registro", "registros", "acao", "acoes",
    "relatorio", "relatorios", "resumo", "dashboard", "unidade", "unidades", "area", "areas",
    "suino", "suinos", "animal", "animais", "baia", "nascimento", "obito", "morte", "cynx"
  ];

  const unitKeywords = snapshot.units.map((item) => normalizeAssistantText(item.name));
  return includesAssistantKeyword(text, [...systemKeywords, ...unitKeywords]) || searchResults.length > 0;
}

function createLocalAssistantAnswer(message) {
  const text = normalizeAssistantText(message);
  const snapshot = getAssistantSnapshot();
  const searchResults = searchAssistantRecords(snapshot, message);

  if (!text) {
    return "Escreva uma pergunta sobre o CampoSync para eu consultar os dados do sistema.";
  }

  if (includesAssistantKeyword(text, ["oi", "ola", "bom dia", "boa tarde", "boa noite"])) {
    return "Olá! Posso consultar dados do CampoSync para você. Pergunte sobre estoque, compras, vendas, alertas, unidades ou registros.";
  }

  if (includesAssistantKeyword(text, ["o que voce faz", "como voce ajuda", "ajuda", "comandos", "capaz"])) {
    return createAssistantCapabilityAnswer();
  }

  if (!isAssistantSystemQuestion(text, snapshot, searchResults)) {
    return "Só posso responder perguntas relacionadas ao CampoSync e aos dados cadastrados no sistema.";
  }

  if (includesAssistantKeyword(text, ["relatorio", "relatorios", "resumo", "dashboard", "visao geral", "panorama"])) {
    return createSystemSummaryAnswer(snapshot);
  }

  if (includesAssistantKeyword(text, ["alerta", "alertas", "notificacao", "notificacoes", "urgente", "pendencia"])) {
    return createAlertsAnswer(snapshot);
  }

  if (includesAssistantKeyword(text, ["compra", "compras", "gasto", "gastos", "fornecedor"])) {
    return createPurchasesAnswer(snapshot);
  }

  if (includesAssistantKeyword(text, ["venda", "vendas", "faturamento", "receita"])) {
    return createSalesAnswer(snapshot);
  }

  if (includesAssistantKeyword(text, ["estoque", "suprimento", "insumo", "produto", "produtos"])) {
    return createSuppliesAnswer(snapshot, text);
  }

  if (includesAssistantKeyword(text, ["material", "materiais", "equipamento", "equipamentos", "ferramenta", "ferramentas"])) {
    return createMaterialsAnswer(snapshot);
  }

  if (includesAssistantKeyword(text, ["historico", "registro", "registros", "movimentacao", "acoes", "acao"])) {
    return createHistoryAnswer(snapshot);
  }

  if (includesAssistantKeyword(text, ["unidade", "unidades", "área", "áreas", "avicultura", "suinocultura", "piscicultura", "horticultura", "fruticultura", "agrofloresta"])) {
    return createUnitsAnswer(snapshot);
  }

  if (includesAssistantKeyword(text, ["suino", "suinos", "animal", "animais", "baia", "nascimento", "obito", "morte"])) {
    return createSwineAnswer(snapshot, text);
  }

  if (searchResults.length) {
    return buildAssistantSearchAnswer(searchResults[0]) || "Encontrei dados relacionados no sistema, mas preciso de uma pergunta mais direta para resumir corretamente.";
  }

  return "Entendi que a pergunta é sobre o CampoSync, mas preciso de um pouco mais de contexto. Você pode perguntar sobre estoque, compras, vendas, alertas, histórico, unidades ou animais.";
}

let chartJsPromise = null;

/* ==============================
   UTILITARIOS GERAIS
============================== */
function safeParse(key, fallback) {
  try {
    const savedValue = localStorage.getItem(key);
    return savedValue ? JSON.parse(savedValue) : fallback;
  } catch {
    return fallback;
  }
}

function safeParseFromStorage(storage, key, fallback) {
  try {
    const savedValue = storage?.getItem(key);
    return savedValue ? JSON.parse(savedValue) : fallback;
  } catch {
    return fallback;
  }
}

function writeStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function readAuthSession() {
  return (
    safeParseFromStorage(localStorage, STORAGE_KEYS.authSession, null) ||
    safeParseFromStorage(sessionStorage, STORAGE_KEYS.authSession, null)
  );
}

function readRememberPreference() {
  return localStorage.getItem(STORAGE_KEYS.authRemember) === "1";
}

function setRememberPreference(remember) {
  localStorage.setItem(STORAGE_KEYS.authRemember, remember ? "1" : "0");
}

function savePendingOAuthRemember(remember) {
  localStorage.setItem(STORAGE_KEYS.oauthRemember, remember ? "1" : "0");
}

function consumePendingOAuthRemember() {
  const rawValue = localStorage.getItem(STORAGE_KEYS.oauthRemember);
  if (rawValue == null) {
    return null;
  }

  localStorage.removeItem(STORAGE_KEYS.oauthRemember);
  return rawValue === "1";
}

function saveAuthSession(session, options = {}) {
  const remember = options.remember ?? session?.remember ?? readRememberPreference();
  const nextSession = {
    ...session,
    remember: Boolean(remember)
  };
  clearAuthSession();
  setRememberPreference(remember);
  const targetStorage = remember ? localStorage : sessionStorage;
  targetStorage.setItem(STORAGE_KEYS.authSession, JSON.stringify(nextSession));
  if (nextSession?.token) {
    targetStorage.setItem(STORAGE_KEYS.authToken, nextSession.token);
  }
}

function clearAuthSession() {
  localStorage.removeItem(STORAGE_KEYS.authSession);
  localStorage.removeItem(STORAGE_KEYS.authToken);
  sessionStorage.removeItem(STORAGE_KEYS.authSession);
  sessionStorage.removeItem(STORAGE_KEYS.authToken);
}

function getAuthToken() {
  const session = readAuthSession();
  return (
    session?.token ||
    sessionStorage.getItem(STORAGE_KEYS.authToken) ||
    localStorage.getItem(STORAGE_KEYS.authToken) ||
    ""
  );
}

function normalizeMaterialStatus(value = "") {
  const simplified = String(value || "")
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  if (simplified === "disponivel") return "Disponivel";
  if (simplified === "em manutencao") return "Em manutencao";
  if (simplified === "quebrado" || simplified === "indisponivel") return "Indisponivel";
  return String(value || "").trim();
}

function consumeExternalAuthResult() {
  const rawHash = window.location.hash.startsWith("#") ? window.location.hash.slice(1) : "";
  if (!rawHash) {
    return null;
  }

  const params = new URLSearchParams(rawHash);
  if (!params.get("auth_provider")) {
    return null;
  }

  const result = {
    provider: params.get("auth_provider") || "",
    status: params.get("status") || "",
    token: params.get("token") || "",
    email: params.get("email") || "",
    name: params.get("name") || "",
    userId: params.get("user_id") || "",
    message: params.get("message") || ""
  };

  window.history.replaceState({}, "", `${window.location.pathname}${window.location.search}`);
  return result;
}

function getCurrentPageName() {
  const currentPath = window.location.pathname.split("/").pop().toLowerCase().trim();
  if (!currentPath) {
    return "index.html";
  }

  if (currentPath.endsWith(".html")) {
    return currentPath;
  }

  if (!currentPath.includes(".")) {
    return `${currentPath}.html`;
  }

  return currentPath;
}

function isPublicPage(pageName = "") {
  return ["login.html", "cadastro.html", "recuperar-senha.html"].includes(pageName);
}

function buildDisplayName(user = {}, fallbackEmail = "") {
  const explicitName = String(user?.name || "").trim();
  if (explicitName) return explicitName;

  const fallbackBase = String(fallbackEmail || "")
    .split("@")[0]
    .replace(/[._-]+/g, " ")
    .trim();

  if (!fallbackBase) return "Produtor CampoSync";

  return fallbackBase
    .split(" ")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function resolveProfileAvatar(user = {}) {
  const avatarUrl = String(user?.avatarUrl || "").trim();
  return avatarUrl || DEFAULT_PROFILE_AVATAR;
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(new Error("Nao foi possivel ler a imagem selecionada."));
    reader.readAsDataURL(file);
  });
}

function clearLegacyLocalData() {
  const exactKeys = [
    STORAGE_KEYS.notifications,
    STORAGE_KEYS.purchases,
    STORAGE_KEYS.consumptions,
    STORAGE_KEYS.sales,
    STORAGE_KEYS.supplies,
    STORAGE_KEYS.materials,
    STORAGE_KEYS.actions,
    STORAGE_KEYS.auditLogs,
    STORAGE_KEYS.customUnits,
    STORAGE_KEYS.removedUnits,
    STORAGE_KEYS.editedDefaultUnits,
    STORAGE_KEYS.swineAnimals,
    STORAGE_KEYS.swineLifeEvents,
    STORAGE_KEYS.swineDeaths,
    STORAGE_KEYS.authUsers,
    STORAGE_KEYS.apiBaseUrl
  ];
  const prefixes = [
    `${STORAGE_KEYS.swineAnimals}-`,
    `${STORAGE_KEYS.swineLifeEvents}-`,
    `${STORAGE_KEYS.swineDeaths}-`
  ];

  try {
    exactKeys.forEach((key) => localStorage.removeItem(key));
    Object.keys(localStorage)
      .filter((key) => prefixes.some((prefix) => key.startsWith(prefix)))
      .forEach((key) => localStorage.removeItem(key));
  } catch (error) {
    reportClientIssue("Nao foi possivel limpar dados locais legados.", error);
  }
}

function formatCurrency(value) {
  return Number(value || 0).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function formatDate(dateString) {
  if (!dateString) return "-";

  if (/^\d{4}-\d{2}$/.test(dateString)) {
    const [year, month] = dateString.split("-");
    return `${month}/${year}`;
  }

  const [year, month, day] = dateString.split("-");
  if (!year || !month || !day) return dateString;
  return `${day}/${month}/${year}`;
}

function formatMonthYear(dateString) {
  if (!dateString) return "-";

  const [year, month] = String(dateString).split("-");
  if (!year || !month) return String(dateString);
  return `${month}/${year}`;
}

function formatCount(value) {
  return Number(value || 0).toLocaleString("pt-BR");
}

function formatTime(value) {
  if (!value) return "--:--";
  return String(value).slice(0, 5);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function slugify(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function nowTimeLabel() {
  return "Agora";
}

function toArray(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.items)) return payload.items;
  if (Array.isArray(payload?.results)) return payload.results;
  return [];
}

function toEntity(payload) {
  if (payload && typeof payload === "object" && payload.data && typeof payload.data === "object") {
    return payload.data;
  }
  return payload;
}

function downloadBase64File(file = {}) {
  const contentBase64 = String(file?.contentBase64 || "").trim();
  const mimeType = String(file?.mimeType || "application/octet-stream");
  const filename = String(file?.filename || "relatorio-camposync.txt");
  if (!contentBase64) {
    return false;
  }

  const binary = window.atob(contentBase64);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  const blob = new Blob([bytes], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  return true;
}

function getRuntimeConfig() {
  const globalConfig = window.CAMPOSYNC_CONFIG || {};
  const bodyConfig = document.body?.dataset || {};
  const urlConfig = new URLSearchParams(window.location.search);
  const urlApiBaseUrl = urlConfig.get("apiBaseUrl") || urlConfig.get("api");
  const savedApiBaseUrl = safeLocalStorageGet(STORAGE_KEYS.apiBaseUrl);
  const pageOrigin = window.location.origin;
  const isHttpPage = /^https?:$/i.test(window.location.protocol);
  const backendOrigin = isHttpPage
    ? `${window.location.protocol}//${window.location.hostname}:5000`
    : "http://localhost:5000";
  const isSeparateFrontendServer = isHttpPage && window.location.port !== "5000";
  const defaultApiBaseUrl = isSeparateFrontendServer
    ? `${backendOrigin}/api`
    : isHttpPage && pageOrigin
      ? `${pageOrigin}/api`
      : "http://localhost:5000/api";
  const apiBaseUrl =
    urlApiBaseUrl ||
    globalConfig.apiBaseUrl ||
    bodyConfig.apiBaseUrl ||
    savedApiBaseUrl ||
    defaultApiBaseUrl;
  const normalizedApiBaseUrl = normalizeApiBaseUrl(apiBaseUrl);
  const defaultGoogleAuthUrl = `${normalizedApiBaseUrl.replace(/\/api$/i, "")}/auth/google`;

  if (urlApiBaseUrl && normalizedApiBaseUrl) {
    safeLocalStorageSet(STORAGE_KEYS.apiBaseUrl, normalizedApiBaseUrl);
  }

  return {
    apiBaseUrl: normalizedApiBaseUrl,
    useBackend: true,
    requestTimeoutMs: Number(globalConfig.requestTimeoutMs || 12000),
    authGoogleUrl: globalConfig.authGoogleUrl || defaultGoogleAuthUrl,
    debug: globalConfig.debug === true || bodyConfig.debug === "true"
  };
}

function safeLocalStorageGet(key) {
  try {
    return localStorage.getItem(key) || "";
  } catch (error) {
    return "";
  }
}

function safeLocalStorageSet(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.warn("Nao foi possivel salvar a URL da API.", error);
  }
}

function normalizeApiBaseUrl(value = "") {
  const cleanValue = String(value || "").trim().replace(/\/+$/, "");
  if (!cleanValue) {
    return "";
  }

  return /\/api$/i.test(cleanValue) ? cleanValue : `${cleanValue}/api`;
}

function reportClientIssue(message, error, level = "warn") {
  const { debug } = getRuntimeConfig();
  if (!debug) {
    return;
  }

  const logger = console[level] || console.warn;
  logger(message, error);
}

/* ==============================
   CLIENTE HTTP
============================== */
async function apiRequest(path, options = {}) {
  const config = getRuntimeConfig();
  if (!config.useBackend || !config.apiBaseUrl) {
    throw new Error("Backend desativado.");
  }

  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), config.requestTimeoutMs);
  const url = `${config.apiBaseUrl}${path}`;
  const token = getAuthToken();

  try {
    const response = await fetch(url, {
      method: options.method || "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(options.headers || {})
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
      signal: controller.signal
    });

    const contentType = response.headers.get("content-type") || "";
    const payload = contentType.includes("application/json")
      ? await response.json()
      : await response.text();

    if (!response.ok) {
      if (response.status === 401 && token) {
        clearAuthSession();
      }

      const errorMessage =
        (typeof payload === "object" && (payload.message || payload.error)) ||
        `Erro HTTP ${response.status}`;
      const httpError = new Error(errorMessage);
      httpError.status = response.status;
      httpError.payload = payload;
      throw httpError;
    }

    return payload;
  } finally {
    window.clearTimeout(timeoutId);
  }
}

function cacheList(key, items) {
  const cacheKey = CACHE_KEY_MAP[key] || key;
  if (Object.prototype.hasOwnProperty.call(APP_CACHE, cacheKey)) {
    APP_CACHE[cacheKey] = Array.isArray(items) ? items : [];
  }
  return items;
}

function cacheUpsert(key, item, fallback = []) {
  const cacheKey = CACHE_KEY_MAP[key] || key;
  const currentItems = Object.prototype.hasOwnProperty.call(APP_CACHE, cacheKey) ? APP_CACHE[cacheKey] : fallback;
  const remainingItems = currentItems.filter((entry) => String(entry.id) !== String(item.id));
  const nextItems = [item, ...remainingItems];
  if (Object.prototype.hasOwnProperty.call(APP_CACHE, cacheKey)) {
    APP_CACHE[cacheKey] = nextItems;
  }
  return item;
}

function cacheReplace(key, itemId, nextItem, fallback = []) {
  const cacheKey = CACHE_KEY_MAP[key] || key;
  const currentItems = Object.prototype.hasOwnProperty.call(APP_CACHE, cacheKey) ? APP_CACHE[cacheKey] : fallback;
  const nextItems = currentItems.map((entry) => (
    String(entry.id) === String(itemId) ? nextItem : entry
  ));
  if (Object.prototype.hasOwnProperty.call(APP_CACHE, cacheKey)) {
    APP_CACHE[cacheKey] = nextItems;
  }
  return nextItem;
}

function cacheRemove(key, itemId, fallback = []) {
  const cacheKey = CACHE_KEY_MAP[key] || key;
  const currentItems = Object.prototype.hasOwnProperty.call(APP_CACHE, cacheKey) ? APP_CACHE[cacheKey] : fallback;
  const nextItems = currentItems.filter((entry) => String(entry.id) !== String(itemId));
  if (Object.prototype.hasOwnProperty.call(APP_CACHE, cacheKey)) {
    APP_CACHE[cacheKey] = nextItems;
  }
  return true;
}

/* ==============================
   SERVICOS
============================== */
function createAppServices() {
  return {
    notifications: {
      async list() {
        try {
          return cacheList(STORAGE_KEYS.notifications, toArray(await apiRequest("/notifications")));
        } catch (error) {
          reportClientIssue("Failed to load notifications.", error, "error");
          return [];
        }
      },
      async markRead(notificationId) {
        await apiRequest(`/notifications/${notificationId}/read`, { method: "PATCH" });
        return true;
      },
      async markAllRead() {
        await apiRequest("/notifications/read-all", { method: "PATCH" });
        return true;
      },
      prependLocal(notification) {
        const notifications = APP_CACHE.notifications;
        const nextList = [notification, ...notifications];
        APP_CACHE.notifications = nextList;
        return nextList;
      }
    },

    auth: {
      async updateProfile(profile) {
        return apiRequest("/auth/me", { method: "PATCH", body: profile });
      }
    },

    purchases: {
      async list() {
        try {
          return cacheList(STORAGE_KEYS.purchases, toArray(await apiRequest("/purchases")));
        } catch (error) {
          reportClientIssue("Failed to load purchases.", error, "error");
          return [];
        }
      },
      async create(purchase) {
        return cacheUpsert(STORAGE_KEYS.purchases, toEntity(await apiRequest("/purchases", { method: "POST", body: purchase })), []);
      },
      async remove(purchaseId) {
        await apiRequest(`/purchases/${purchaseId}`, { method: "DELETE" });
        cacheRemove(STORAGE_KEYS.purchases, purchaseId, []);
        return true;
      }
    },

    sales: {
      async list() {
        try {
          return cacheList(STORAGE_KEYS.sales, toArray(await apiRequest("/sales")));
        } catch (error) {
          reportClientIssue("Failed to load sales.", error, "error");
          return [];
        }
      },
      async create(sale) {
        return cacheUpsert(STORAGE_KEYS.sales, toEntity(await apiRequest("/sales", { method: "POST", body: sale })), []);
      },
      async remove(saleId) {
        try {
          await apiRequest(`/sales/${saleId}`, { method: "DELETE" });
        } catch (error) {
          if (error?.status !== 404) {
            throw error;
          }
        }
        cacheRemove(STORAGE_KEYS.sales, saleId, []);
        return true;
      }
    },

    consumptions: {
      async list() {
        try {
          return cacheList(STORAGE_KEYS.consumptions, toArray(await apiRequest("/consumptions")));
        } catch (error) {
          reportClientIssue("Failed to load consumptions.", error, "error");
          return [];
        }
      },
      async create(consumption) {
        return cacheUpsert(STORAGE_KEYS.consumptions, toEntity(await apiRequest("/consumptions", { method: "POST", body: consumption })), []);
      }
    },

    actions: {
      async list() {
        try {
          return cacheList(STORAGE_KEYS.actions, toArray(await apiRequest("/actions")));
        } catch (error) {
          reportClientIssue("Failed to load actions.", error, "error");
          return [];
        }
      },
      async create(action) {
        return cacheUpsert(STORAGE_KEYS.actions, toEntity(await apiRequest("/actions", { method: "POST", body: action })), []);
      },
      async update(actionId, action) {
        return cacheReplace(STORAGE_KEYS.actions, actionId, toEntity(await apiRequest(`/actions/${actionId}`, { method: "PUT", body: action })), []);
      },
      async remove(actionId) {
        try {
          await apiRequest(`/actions/${actionId}`, { method: "DELETE" });
        } catch (error) {
          if (error?.status !== 404) {
            throw error;
          }
        }
        cacheRemove(STORAGE_KEYS.actions, actionId, []);
        return true;
      }
    },

    dailyUnitActivities: {
      async list() {
        return toArray(await apiRequest("/daily-unit-activities"));
      },
      async create(payload) {
        return toEntity(await apiRequest("/daily-unit-activities", { method: "POST", body: payload }));
      },
      async update(itemId, payload) {
        return toEntity(await apiRequest(`/daily-unit-activities/${itemId}`, { method: "PUT", body: payload }));
      },
      async remove(itemId) {
        await apiRequest(`/daily-unit-activities/${itemId}`, { method: "DELETE" });
        return true;
      }
    },

    auditLogs: {
      async list() {
        try {
          return cacheList(STORAGE_KEYS.auditLogs, toArray(await apiRequest("/audit-logs")));
        } catch (error) {
          reportClientIssue("Failed to load audit logs.", error, "error");
          return [];
        }
      },
      async create(entry) {
        return cacheUpsert(STORAGE_KEYS.auditLogs, toEntity(await apiRequest("/audit-logs", { method: "POST", body: entry })), []);
      }
    },

    supplies: {
      async list() {
        try {
          return cacheList(STORAGE_KEYS.supplies, toArray(await apiRequest("/supplies")));
        } catch (error) {
          reportClientIssue("Failed to load supplies.", error, "error");
          return [];
        }
      },
      async create(item) {
        return cacheUpsert(STORAGE_KEYS.supplies, toEntity(await apiRequest("/supplies", { method: "POST", body: item })), []);
      }
    },

    materials: {
      async list() {
        try {
          return cacheList(STORAGE_KEYS.materials, toArray(await apiRequest("/materials")));
        } catch (error) {
          reportClientIssue("Failed to load materials.", error, "error");
          return [];
        }
      },
      async create(material) {
        return cacheUpsert(STORAGE_KEYS.materials, toEntity(await apiRequest("/materials", { method: "POST", body: material })), []);
      },
      async update(materialId, material) {
        return cacheReplace(STORAGE_KEYS.materials, materialId, toEntity(await apiRequest(`/materials/${materialId}`, { method: "PUT", body: material })), []);
      },
      async remove(materialId) {
        try {
          await apiRequest(`/materials/${materialId}`, { method: "DELETE" });
        } catch (error) {
          if (error?.status !== 404) {
            throw error;
          }
        }
        cacheRemove(STORAGE_KEYS.materials, materialId, []);
        return true;
      }
    },

    units: {
      async listCustom() {
        return cacheList(STORAGE_KEYS.customUnits, toArray(await apiRequest("/units/custom")));
      },
      async getCustom(unitIdOrSlug) {
        return toEntity(await apiRequest(`/units/custom/${encodeURIComponent(unitIdOrSlug)}`));
      },
      async createCustom(unit) {
        return cacheUpsert(
          STORAGE_KEYS.customUnits,
          toEntity(await apiRequest("/units/custom", { method: "POST", body: unit })),
          []
        );
      },
      async updateCustom(unitId, unit) {
        return cacheReplace(
          STORAGE_KEYS.customUnits,
          unitId,
          toEntity(await apiRequest(`/units/custom/${unitId}`, { method: "PUT", body: unit })),
          []
        );
      },
      async removeCustom(unitId) {
        await apiRequest(`/units/custom/${unitId}`, { method: "DELETE" });
        return cacheRemove(STORAGE_KEYS.customUnits, unitId, []);
      }
    },

    lifecycle: {
      animals: {
        async list() {
          try {
            return cacheList(STORAGE_KEYS.swineAnimals, toArray(await apiRequest("/lifecycle/animals")));
          } catch (error) {
            reportClientIssue("Failed to load lifecycle animals.", error, "error");
            return [];
          }
        },
        async create(payload) {
          return cacheUpsert(STORAGE_KEYS.swineAnimals, toEntity(await apiRequest("/lifecycle/animals", { method: "POST", body: payload })), []);
        },
        async update(itemId, payload) {
          return cacheReplace(STORAGE_KEYS.swineAnimals, itemId, toEntity(await apiRequest(`/lifecycle/animals/${itemId}`, { method: "PUT", body: payload })), []);
        },
        async remove(itemId) {
          await apiRequest(`/lifecycle/animals/${itemId}`, { method: "DELETE" });
          cacheRemove(STORAGE_KEYS.swineAnimals, itemId, []);
          return true;
        }
      },
      events: {
        async list() {
          try {
            return cacheList(STORAGE_KEYS.swineLifeEvents, toArray(await apiRequest("/lifecycle/events")));
          } catch (error) {
            reportClientIssue("Failed to load lifecycle events.", error, "error");
            return [];
          }
        },
        async create(payload) {
          return cacheUpsert(STORAGE_KEYS.swineLifeEvents, toEntity(await apiRequest("/lifecycle/events", { method: "POST", body: payload })), []);
        },
        async update(itemId, payload) {
          return cacheReplace(STORAGE_KEYS.swineLifeEvents, itemId, toEntity(await apiRequest(`/lifecycle/events/${itemId}`, { method: "PUT", body: payload })), []);
        },
        async remove(itemId) {
          await apiRequest(`/lifecycle/events/${itemId}`, { method: "DELETE" });
          cacheRemove(STORAGE_KEYS.swineLifeEvents, itemId, []);
          return true;
        }
      },
      deaths: {
        async list() {
          try {
            return cacheList(STORAGE_KEYS.swineDeaths, toArray(await apiRequest("/lifecycle/deaths")));
          } catch (error) {
            reportClientIssue("Failed to load lifecycle deaths.", error, "error");
            return [];
          }
        },
        async create(payload) {
          return cacheUpsert(STORAGE_KEYS.swineDeaths, toEntity(await apiRequest("/lifecycle/deaths", { method: "POST", body: payload })), []);
        },
        async update(itemId, payload) {
          return cacheReplace(STORAGE_KEYS.swineDeaths, itemId, toEntity(await apiRequest(`/lifecycle/deaths/${itemId}`, { method: "PUT", body: payload })), []);
        },
        async remove(itemId) {
          await apiRequest(`/lifecycle/deaths/${itemId}`, { method: "DELETE" });
          cacheRemove(STORAGE_KEYS.swineDeaths, itemId, []);
          return true;
        }
      }
    },

    assistant: {
      async ask(message) {
        const payload = await apiRequest("/assistant/messages", {
          method: "POST",
          body: { message }
        });
        const data = toEntity(payload);
        const backendAnswer = String(data.answer || data.message || data.text || "").trim();
        return {
          answer: backendAnswer || createLocalAssistantAnswer(message),
          exportFile: data.export || null
        };
      }
    },

    locations: {
      async list() {
        return toArray(await apiRequest("/locations"));
      }
    }
  };
}

const services = createAppServices();

function getAuditTimestampParts() {
  const now = new Date();
  return {
    date: now.toISOString().slice(0, 10),
    time: now.toISOString().slice(11, 16)
  };
}

async function registerAuditLog(entry = {}) {
  const session = readAuthSession();
  if (!session?.token) {
    return null;
  }

  const { date, time } = getAuditTimestampParts();
  const payload = {
    type: entry.type || "Sistema",
    title: entry.title || "Evento registrado",
    details: entry.details || "",
    area: entry.area || "Sistema",
    status: entry.status || "Concluido",
    date: entry.date || date,
    time: entry.time || time,
    user: entry.user || session.user?.email || session.email || "Sistema",
    source: entry.source || "frontend",
    entityType: entry.entityType || "",
    entityId: entry.entityId == null ? "" : String(entry.entityId),
    metadata: entry.metadata && typeof entry.metadata === "object" ? entry.metadata : {}
  };

  try {
    return await services.auditLogs.create(payload);
  } catch (error) {
    reportClientIssue("Nao foi possivel registrar log de auditoria.", error);
    return null;
  }
}

function getPageAuditLabel(pageName = "") {
  const labels = {
    "index.html": "Dashboard",
    "areas_produtivas.html": "Áreas produtivas",
    "gestao_compras.html": "Gestao de compras",
    "gestao_vendas.html": "Gestao de vendas",
    "suprimentos.html": "Suprimentos",
    "consumos.html": "Consumos",
    "ferramentas.html": "Ferramentas",
    "historico.html": "Histórico",
    "perfil.html": "Perfil",
    "unidade_produtiva.html": "Unidade produtiva"
  };

  return labels[pageName] || pageName.replace(/\.html$/i, "").replaceAll("_", " ") || "Página";
}

async function registerPageVisit() {
  const pageName = getCurrentPageName();
  if (isPublicPage(pageName)) {
    return null;
  }

  const pageLabel = getPageAuditLabel(pageName);
  return registerAuditLog({
    type: "Navegação",
    title: "Página acessada",
    details: `A página ${pageLabel} foi acessada.`,
    area: pageLabel,
    status: "Concluído",
    source: "frontend",
    entityType: "page",
    metadata: {
      pageName,
      path: window.location.pathname,
      query: window.location.search
    }
  });
}

async function hydrateAppCacheFromBackend() {
  await Promise.allSettled([
    services.notifications.list(),
    services.auditLogs.list(),
    services.purchases.list(),
    services.consumptions.list(),
    services.sales.list(),
    services.actions.list(),
    services.supplies.list(),
    services.materials.list(),
    services.units.listCustom(),
    services.lifecycle.animals.list(),
    services.lifecycle.events.list(),
    services.lifecycle.deaths.list()
  ]);
}

function startRealtimeRefresh(refresh, label = "dados") {
  let isRefreshing = false;

  async function runRefresh() {
    if (document.hidden || isRefreshing) {
      return;
    }

    isRefreshing = true;
    try {
      await refresh();
    } catch (error) {
      reportClientIssue(`Falha ao atualizar ${label} em tempo real.`, error);
    } finally {
      isRefreshing = false;
    }
  }

  const timerId = window.setInterval(runRefresh, REALTIME_REFRESH_MS);
  window.addEventListener("beforeunload", () => window.clearInterval(timerId), { once: true });
  return timerId;
}

function enhanceResponsiveTable(table) {
  if (!table) return;

  const headers = Array.from(table.querySelectorAll("thead th"))
    .map((header) => header.textContent.trim())
    .filter(Boolean);

  if (!headers.length) return;

  table.querySelectorAll("tbody tr").forEach((row) => {
    const cells = Array.from(row.children).filter((cell) => cell.tagName === "TD");
    const isEmptyRow = cells.length === 1 && Number(cells[0].getAttribute("colspan") || 1) > 1;

    row.classList.toggle("linha-tabela-vazia", isEmptyRow);
    if (isEmptyRow) {
      cells[0].removeAttribute("data-label");
      return;
    }

    cells.forEach((cell, index) => {
      if (headers[index]) {
        cell.dataset.label = headers[index];
      }
    });
  });
}

function enhanceResponsiveTables(root = document) {
  root.querySelectorAll?.(".tabela-compra, .tabela-suprimentos").forEach(enhanceResponsiveTable);
}

function setupResponsiveTables() {
  const scheduleEnhancement = (() => {
    let frameId = 0;

    return () => {
      if (frameId) return;
      frameId = window.requestAnimationFrame(() => {
        frameId = 0;
        enhanceResponsiveTables();
      });
    };
  })();

  enhanceResponsiveTables();

  const observer = new MutationObserver(scheduleEnhancement);
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  document.querySelectorAll(".caixa-tabela, .tabela-compra, .tabela-suprimentos").forEach((target) => {
    observer.observe(target, {
      childList: true,
      subtree: true
    });
  });
}

/* ==============================
   BOOTSTRAP
============================== */
document.addEventListener("DOMContentLoaded", async () => {
  document.body.classList.toggle("modo-escuro", localStorage.getItem(STORAGE_KEYS.theme) === "dark");
  let shouldRevealApp = true;

  try {
    clearLegacyLocalData();
    setupPasswordToggles();
    setupResponsiveSidebar();
    const shouldContinueBootstrap = await setupAuthPages();
    if (!shouldContinueBootstrap) {
      shouldRevealApp = false;
      return;
    }
    await registerPageVisit();
    await setupInterface();
  } catch (error) {
    reportClientIssue("Falha ao iniciar a interface geral do CampoSync.", error, "error");
  } finally {
    if (shouldRevealApp) {
      document.body.classList.add("app-ready");
    }
  }

  setupSearchTriggers();
  setupResponsiveTables();
  setupCynx();
  const shouldBlockForCacheHydration = Boolean(
    document.getElementById("dashboardHeroTag") ||
    document.getElementById("corpoTabelaHistorico")
  );
  const shouldWarmAssistantCache = Boolean(document.getElementById("batePapoCynx"));

  if (shouldBlockForCacheHydration) {
    await hydrateAppCacheFromBackend();
  } else if (shouldWarmAssistantCache) {
    const scheduleHydration = window.requestIdleCallback
      ? window.requestIdleCallback.bind(window)
      : (callback) => window.setTimeout(callback, 120);
    scheduleHydration(() => {
      hydrateAppCacheFromBackend().catch((error) => {
        reportClientIssue("Falha ao aquecer cache inicial do CampoSync.", error);
      });
    });
  }
  const tasks = [];

  if (document.getElementById("dashboardHeroTag")) tasks.push(setupDashboardOverviewPage());
  if (document.getElementById("formAcoesDashboard")) tasks.push(setupDashboardActionsPage());
  if (document.getElementById("formCompra")) tasks.push(setupPurchasesPage());
  if (document.getElementById("formVenda")) tasks.push(setupSalesPage());
  if (document.getElementById("formConsumos")) tasks.push(setupConsumptionsPage());
  if (document.getElementById("formSuprimentos")) tasks.push(setupSuppliesPage());
  if (document.getElementById("formMateriais")) tasks.push(setupMaterialsPage());
  if (document.getElementById("corpoTabelaHistorico")) tasks.push(setupHistoryPage());
  if (document.getElementById("perfilNome")) tasks.push(setupProfilePage());
  if (document.querySelector("main[data-unidade]")) tasks.push(setupUnitDashboardPage());

  const taskResults = await Promise.allSettled(tasks);
  taskResults.forEach((result) => {
    if (result.status === "rejected") {
      reportClientIssue("Uma secao da pagina nao foi carregada corretamente.", result.reason, "error");
    }
  });

  enhanceResponsiveTables();
  setupCardImageFallbacks();
  if (document.getElementById("mapa")) {
    window.setTimeout(() => {
      setupHomeMap().catch((error) => {
        reportClientIssue("Falha ao iniciar o mapa inicial.", error);
      });
    }, 0);
  }
});

function setupResponsiveSidebar() {
  const sidebar = document.querySelector(".menu-lateral");
  if (!sidebar || document.querySelector(".btn-menu-responsivo")) {
    return;
  }

  const button = document.createElement("button");
  button.type = "button";
  button.className = "btn-menu-responsivo";
  button.setAttribute("aria-label", "Abrir menu principal");
  button.setAttribute("aria-expanded", "false");
  button.innerHTML = "<span></span><span></span><span></span>";
  document.body.insertBefore(button, sidebar);

  function setOpen(isOpen) {
    document.body.classList.toggle("menu-mobile-aberto", isOpen);
    button.setAttribute("aria-expanded", isOpen ? "true" : "false");
    button.setAttribute("aria-label", isOpen ? "Fechar menu principal" : "Abrir menu principal");
  }

  button.addEventListener("click", () => {
    setOpen(!document.body.classList.contains("menu-mobile-aberto"));
  });

  sidebar.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setOpen(false));
  });

  document.addEventListener("click", (event) => {
    if (
      document.body.classList.contains("menu-mobile-aberto") &&
      !sidebar.contains(event.target) &&
      !button.contains(event.target)
    ) {
      setOpen(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setOpen(false);
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      setOpen(false);
    }
  });
}

function setupCardImageFallbacks() {
  document.querySelectorAll("img").forEach((image) => {
    if (!image.classList.contains("logo")) {
      image.decoding = "async";
    }
    if (image.classList.contains("midia-card")) {
      image.loading = "lazy";
    }
  });

  document.querySelectorAll(".cards .midia-card").forEach((image) => {
    image.addEventListener("error", () => {
      if (image.dataset.fallbackApplied) {
        return;
      }
      image.dataset.fallbackApplied = "true";
      image.src = "imagens/patativa.png";
      image.alt = image.alt || "Imagem de unidade indisponível";
    });
  });
}

function togglePasswordField(inputId, triggerButton) {
  const targetInput = inputId ? document.getElementById(inputId) : null;
  if (!targetInput) {
    return;
  }

  targetInput.type = targetInput.type === "text" ? "password" : "text";
  updatePasswordToggleState(triggerButton, targetInput);
}

function updatePasswordToggleState(triggerButton, targetInput) {
  if (!triggerButton || !targetInput) {
    return;
  }

  const showingPassword = targetInput.type === "text";
  const toggleText = triggerButton.querySelector(".texto-toggle-senha");
  const toggleIcon = triggerButton.querySelector(".icone-olho");

  triggerButton.classList.toggle("is-password-visible", showingPassword);
  triggerButton.setAttribute("aria-label", showingPassword ? "Ocultar senha" : "Mostrar senha");
  triggerButton.setAttribute("aria-pressed", showingPassword ? "true" : "false");

  if (toggleText) {
    toggleText.textContent = showingPassword ? "Ocultar senha" : "Mostrar senha";
  }

  if (toggleIcon) {
    toggleIcon.src = showingPassword
      ? toggleIcon.dataset.visibleSrc || toggleIcon.src
      : toggleIcon.dataset.hiddenSrc || toggleIcon.src;
  }
}

function setupPasswordToggles() {
  document.querySelectorAll("[data-toggle-password]").forEach((button) => {
    if (button.dataset.toggleReady === "true") {
      return;
    }

    const inputId = button.getAttribute("aria-controls");
    const targetInput = inputId ? document.getElementById(inputId) : null;
    if (!targetInput) {
      return;
    }

    button.dataset.toggleReady = "true";
    updatePasswordToggleState(button, targetInput);
  });
}

/* ==============================
   RECURSOS COMPARTILHADOS
============================== */
function ensureChartJs() {
  if (typeof Chart !== "undefined") {
    configureChartTheme(Chart);
    return Promise.resolve(Chart);
  }

  if (chartJsPromise) {
    return chartJsPromise;
  }

  chartJsPromise = new Promise((resolve, reject) => {
    const existingScript = document.querySelector('script[data-chartjs-dinamico="true"]');
    if (existingScript) {
      existingScript.addEventListener("load", () => {
        configureChartTheme(window.Chart);
        resolve(window.Chart);
      });
      existingScript.addEventListener("error", reject);
      return;
    }

    const script = document.createElement("script");
    script.src = "vendor/chart.umd.js";
    script.async = true;
    script.dataset.chartjsDinamico = "true";
    script.addEventListener("load", () => {
      configureChartTheme(window.Chart);
      resolve(window.Chart);
    });
    script.addEventListener("error", () => reject(new Error("Não foi possível carregar o Chart.js.")));
    document.head.appendChild(script);
  });

  return chartJsPromise;
}

function configureChartTheme(ChartInstance = window.Chart) {
  if (!ChartInstance?.defaults) return;

  const isDark = document.body?.classList.contains("modo-escuro");
  const textColor = isDark ? "#edf4ee" : "#213126";
  const mutedColor = isDark ? "#c3d2c6" : "#6f7e72";
  const gridColor = isDark ? "rgba(216, 236, 220, 0.14)" : "rgba(47, 107, 59, 0.08)";

  ChartInstance.defaults.color = textColor;
  ChartInstance.defaults.borderColor = gridColor;
  if (ChartInstance.defaults.plugins?.legend?.labels) {
    ChartInstance.defaults.plugins.legend.labels.color = textColor;
  }
  if (ChartInstance.defaults.plugins?.tooltip) {
    ChartInstance.defaults.plugins.tooltip.titleColor = textColor;
    ChartInstance.defaults.plugins.tooltip.bodyColor = textColor;
    ChartInstance.defaults.plugins.tooltip.backgroundColor = isDark ? "#1f2a23" : "rgba(33, 49, 38, 0.92)";
  }

  Object.values(ChartInstance.instances || {}).forEach((chart) => {
    Object.values(chart.options?.scales || {}).forEach((scale) => {
      scale.ticks = { ...(scale.ticks || {}), color: mutedColor };
      scale.grid = { ...(scale.grid || {}), color: gridColor };
      if (scale.title) {
        scale.title = { ...scale.title, color: textColor };
      }
    });
    chart.update();
  });
}

function setupSearchTriggers() {
  const searchButtons = document.querySelectorAll(".search-trigger");

  searchButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const group = button.closest(".search-input-group");
      const input = group?.querySelector("input");
      const container =
        button.closest(".barra-ferramentas, .filtros-gestao-vendas") ||
        group?.parentElement;

      if (input) {
        input.focus();
        input.dispatchEvent(new Event("input", { bubbles: true }));
        input.dispatchEvent(new Event("change", { bubbles: true }));
      }

      const triggerButton = container?.querySelector("#btnAplicarFiltro, #btnFiltrar, .btn-filtrar");
      if (triggerButton && triggerButton !== button) {
        triggerButton.click();
      }
    });
  });
}

function ensureCynxMarkup() {
  const body = document.body;

  if (!body) {
    return;
  }

  if (!document.getElementById("sobreposicao")) {
    const sobreposicao = document.createElement("div");
    sobreposicao.id = "sobreposicao";
    sobreposicao.hidden = true;
    body.appendChild(sobreposicao);
  }

  if (!document.getElementById("modal-cynx")) {
    const modal = document.createElement("section");
    modal.id = "modal-cynx";
    modal.setAttribute("aria-label", "Assistente virtual Cynx");
    modal.setAttribute("aria-hidden", "true");
    modal.innerHTML = `
      <header class="cabecalho-cynx">
        <div class="bloco-info">
          <div class="avatar" aria-hidden="true">
            <span></span>
            <span></span>
          </div>
          <div>
            <strong>Cynx</strong>
            <span>Assistente de apoio do CampoSync</span>
          </div>
        </div>

        <button type="button" class="btn-icone" id="btnFecharCynx" aria-label="Fechar assistente">
          <span>&times;</span>
        </button>
      </header>

      <div class="status-cynx">
        <div>
          <strong>Status</strong>
          <span id="textoStatus">Pronto para ajudar</span>
        </div>
        <button type="button" class="btn-secundario" id="btnResetarCynx">Nova conversa</button>
      </div>

      <div id="batePapoCynx" aria-live="polite"></div>

      <section class="atalhos" aria-label="Atalhos rápidos">
        <button type="button" data-atalho="estoque">Estoque</button>
        <button type="button" data-atalho="alertas">Alertas</button>
        <button type="button" data-atalho="historico">Histórico</button>
        <button type="button" data-atalho="relatorios">Relatórios</button>
      </section>

      <form class="entrada-cynx" id="formCynx">
        <label class="apenas-leitor" for="entradaMsg">Digite sua mensagem</label>
        <input type="text" id="entradaMsg" maxlength="180" autocomplete="off" placeholder="Pergunte sobre estoque, alertas, histórico ou relatórios">
        <button type="submit" aria-label="Enviar mensagem">Enviar</button>
        <button type="button" id="btnMicrofone" aria-pressed="false">Falar</button>
        <button type="button" id="btnAlternarVoz" aria-pressed="true">Voz ligada</button>
      </form>
    `;
    body.appendChild(modal);
  }

  if (!document.getElementById("btnAbrirCynx")) {
    const button = document.createElement("button");
    button.className = "btn-cynx";
    button.id = "btnAbrirCynx";
    button.type = "button";
    button.setAttribute("aria-label", "Abrir assistente Cynx");
    button.innerHTML = `
      <div class="robo" aria-hidden="true">
        <div class="chapeu">
          <div class="aba"></div>
          <div class="topo"></div>
        </div>
        <div class="cabeca">
          <div class="visor">
            <div class="olhos">
              <div class="olho"></div>
              <div class="olho"></div>
            </div>
          </div>
        </div>
      </div>
    `;
    body.appendChild(button);
  }
}

async function setupUnitDashboardPage() {
  const unitPage = document.querySelector("main[data-unidade]");
  if (!unitPage) {
    return;
  }

  let unitKey = unitPage.dataset.unidade;
  let backendUnit = null;
  let unitLookup = unitKey;

  if (unitKey === "custom") {
    const params = new URLSearchParams(window.location.search);
    unitLookup = params.get("id") || params.get("slug") || params.get("unit") || unitKey;
  }

  if (unitLookup && unitLookup !== "custom") {
    try {
      backendUnit = await services.units.getCustom(unitLookup);
    } catch (error) {
      reportClientIssue("Falha ao carregar unidade produtiva. Usando dados locais.", error);
    }
  }

  const fallbackUnit = {
    id: "",
    name: unitLookup === "custom" ? "Unidade produtiva" : getUnitDisplayLabel(unitLookup),
    nome: unitLookup === "custom" ? "Unidade produtiva" : getUnitDisplayLabel(unitLookup),
    slug: unitLookup === "custom" ? "unidade-produtiva" : String(unitLookup || unitKey || "unidade-produtiva"),
    pageSlug: unitKey,
    category: getProductionUnitCategory({ slug: unitLookup || unitKey })
  };
  const dashboardUnit = backendUnit || fallbackUnit;
  unitKey = dashboardUnit.dashboardTemplate || dashboardUnit.pageSlug || dashboardUnit.slug || unitKey;

  const category = getProductionUnitCategory(dashboardUnit || { slug: unitKey });
  const unitScope = {
    unitId: backendUnit?.id ? String(backendUnit.id) : "",
    unitSlug: String(dashboardUnit?.slug || unitKey || ""),
    unitName: String(dashboardUnit?.name || dashboardUnit?.nome || unitKey || "Unidade produtiva"),
    category
  };
  const config = createGenericUnitDashboardConfig(dashboardUnit, category);
  if (!config) {
    return;
  }

  if (unitKey === "piscicultura") {
    config.structureLabel = "Tanques ativos";
    config.structureDescription = "Tanques cadastrados para manejo, biometria e acompanhamento.";
    config.animalsLabel = "Peixes monitorados";
    config.animalsDescription = "Registros do ciclo de vida dos peixes nesta unidade.";
    config.tableTitle = "Ciclo de vida dos peixes";
  }

  const image = document.getElementById("imagemUnidadeProdutiva");
  const summaryList = document.getElementById("listaResumoUnidade");
  const checklistList = document.getElementById("listaChecklistUnidade");
  const indicatorsList = document.getElementById("listaIndicadoresUnidade");
  const eventsList = document.getElementById("listaEventosUnidade");
  const tagAlteracoes = document.getElementById("tagAlteracoesUnidade");
  const tableTitle = document.getElementById("tituloTabelaUnidade");
  const tableHead = document.getElementById("cabecalhoTabelaUnidade");
  const tableBody = document.getElementById("corpoTabelaUnidade");
  const cardsInfoSection = unitPage.querySelector(".cards-info-unidade");

  if (image) {
    image.src = config.image.src;
    image.alt = config.image.alt;
  }

  const cardStructureTitle = document.getElementById("tituloCardEstrutura");
  const cardStructureValue = document.getElementById("valorCardEstrutura");
  const cardStructureDescription = document.getElementById("descricaoCardEstrutura");
  const cardAnimalsTitle = document.getElementById("tituloCardAnimais");
  const cardAnimalsValue = document.getElementById("valorCardAnimais");
  const cardAnimalsDescription = document.getElementById("descricaoCardAnimais");
  const cardFeedTitle = document.querySelector("#valorCardRacao")?.closest(".card-info")?.querySelector("h3");
  const cardFeedValue = document.getElementById("valorCardRacao");
  const cardFeedDescription = document.getElementById("descricaoCardRacao");
  const cardVaccinationValue = document.getElementById("valorCardVacinacao");
  const cardVaccinationDescription = document.getElementById("descricaoCardVacinacao");
  const vaccinationCard = cardVaccinationValue?.closest(".card-info");
  const showVaccination = category === "animal";
  const lifecycleGrid = unitPage.querySelector(".compras-grid-ciclo-vida");

  const pageTitle = document.querySelector(".header-unidades__titulo h2");
  if (pageTitle && backendUnit?.name) {
    pageTitle.textContent = backendUnit.name;
  }

  if (cardStructureTitle) cardStructureTitle.textContent = config.structureLabel;
  if (cardStructureValue) cardStructureValue.textContent = String(config.structureValue);
  if (cardStructureDescription) cardStructureDescription.textContent = config.structureDescription;

  if (cardAnimalsTitle) cardAnimalsTitle.textContent = config.animalsLabel;
  if (cardAnimalsValue) cardAnimalsValue.textContent = Number(config.animalsValue).toLocaleString("pt-BR");
  if (cardAnimalsDescription) cardAnimalsDescription.textContent = config.animalsDescription;

  if (showVaccination) {
    const dailyFeed = config.tableRows.reduce((sum, row) => sum + Number.parseFloat(String(row.values[3]).replace(/[^\d,.-]/g, "").replace(",", ".")), 0);
    if (cardFeedTitle) cardFeedTitle.textContent = "Ração disponível";
    if (cardFeedValue) cardFeedValue.textContent = `${dailyFeed.toLocaleString("pt-BR")} kg`;
    if (cardFeedDescription) cardFeedDescription.textContent = "Estimativa local calculada a partir da tabela da unidade.";
  } else {
    const operationalMetric = config.indicators?.[0];
    if (cardFeedTitle) cardFeedTitle.textContent = operationalMetric?.title || "Indicador operacional";
    if (cardFeedValue) cardFeedValue.textContent = operationalMetric?.value || "--";
    if (cardFeedDescription) {
      cardFeedDescription.textContent = operationalMetric?.description || "Resumo operacional atualizado a partir dos indicadores da unidade.";
    }
  }

  if (showVaccination) {
    if (cardVaccinationValue) cardVaccinationValue.textContent = config.vaccinationValue;
    if (cardVaccinationDescription) cardVaccinationDescription.textContent = config.vaccinationDescription;
    vaccinationCard?.removeAttribute("hidden");
    cardsInfoSection?.classList.remove("sem-vacinacao");
  } else {
    if (vaccinationCard) {
      vaccinationCard.hidden = true;
    }
    cardsInfoSection?.classList.add("sem-vacinacao");
  }

  if (summaryList) {
    summaryList.innerHTML = config.summaryItems.map((item) => `
      <li>
        <strong>${escapeHtml(item.title)}</strong>
        <span>${escapeHtml(item.description)}</span>
      </li>
    `).join("");
  }

  if (checklistList) {
    checklistList.innerHTML = "";
  }

  if (indicatorsList) {
    indicatorsList.innerHTML = config.indicators.map((item) => `
      <div class="metrica-agua">
        <strong>${escapeHtml(item.title)}</strong>
        <b>${escapeHtml(item.value)}</b>
        <span>${escapeHtml(item.description)}</span>
      </div>
    `).join("");
  }

  if (eventsList) {
    eventsList.innerHTML = "";
  }

  if (tagAlteracoes) {
    tagAlteracoes.textContent = "0 atividades";
  }

  if (tableTitle) {
    tableTitle.textContent = config.tableTitle;
  }

  const visibleTableColumns = showVaccination
    ? config.tableColumns
    : config.tableColumns.filter((column) => column !== "Vacinação");

  if (tableHead) {
    tableHead.innerHTML = `<tr>${visibleTableColumns.map((column) => `<th>${escapeHtml(column)}</th>`).join("")}</tr>`;
  }

  if (tableBody) {
    tableBody.innerHTML = config.tableRows.map((row) => {
      const values = showVaccination
        ? row.values
        : row.values.filter((_, index) => index !== 4);

      const formattedValues = values.map((value) => {
        if (value && typeof value === "object") {
          return `<span class="${value.critical ? "selo-status esta-critico" : "selo-status esta-ok"}">${escapeHtml(value.text)}</span>`;
        }
        return escapeHtml(value);
      });

      return `
        <tr>
          <td>
            <strong>${escapeHtml(row.primary)}</strong>
            <small>${escapeHtml(row.secondary)}</small>
          </td>
          ${formattedValues.map((value) => `<td>${value}</td>`).join("")}
        </tr>
      `;
    }).join("");
  }

  applyUnitLifecycleCopy(unitPage, unitKey, category);
  await setupUnitDailyActivities(unitPage, {
    unitScope,
    summaryList,
    checklistList,
    eventsList,
    tagAlteracoes,
    fallbackSummaryItems: config.summaryItems,
    fallbackTimelineEvents: config.events
  });

  if (lifecycleGrid) {
    lifecycleGrid.hidden = false;
  }

  if (category === "animal" && document.getElementById("formObitoSuino")) {
    await setupSwineLifecycleManagement({
      config,
      unitScope,
      summaryList,
      eventsList,
      tagAlteracoes,
      cardAnimalsValue,
      cardAnimalsDescription,
      cardVaccinationValue,
      cardVaccinationDescription
    });
  } else {
    await setupBasicAnimalLifecycleManagement(unitKey, {
      unitScope,
      cardAnimalsValue,
      cardAnimalsDescription,
      eventsList,
      tagAlteracoes
    });
  }
}

async function setupUnitDailyActivities(unitPage, context = {}) {
  if (!unitPage) {
    return;
  }

  const summaryList = context.summaryList;
  const checklistList = context.checklistList;
  const eventsList = context.eventsList;
  const tagAlteracoes = context.tagAlteracoes;
  const unitScope = context.unitScope || {};
  const today = new Date().toISOString().slice(0, 10);
  const routineSection = checklistList?.closest(".painel-compras");
  const historySection = eventsList?.closest(".painel-compras");
  const routineHeader = routineSection?.querySelector(".cabecalho-secao");
  const historyHeader = historySection?.querySelector(".cabecalho-secao");

  if (routineHeader) {
    const eyebrow = routineHeader.querySelector(".sobrelinha-secao");
    const title = routineHeader.querySelector("h3");
    const tag = routineHeader.querySelector(".tag-secao");
    if (eyebrow) eyebrow.textContent = "Rotina prioritaria";
    if (title) title.textContent = "Controle diário de atividades";
    if (tag) tag.textContent = "Formulario";
  }

  if (historyHeader) {
    const eyebrow = historyHeader.querySelector(".sobrelinha-secao");
    const title = historyHeader.querySelector("h3");
    if (eyebrow) eyebrow.textContent = "Historico diario";
    if (title) title.textContent = "Atividades registradas";
  }

  if (checklistList) {
    checklistList.innerHTML = `
      <form class="form-compra" id="formRotinaPrioritariaUnidade">
        <div class="grade-campos">
          <label>
            Nome de quem fez
            <input type="text" name="performerName" maxlength="190" placeholder="Ex.: Maria Silva" required>
          </label>
          <label>
            Atividade realizada
            <input type="text" name="title" maxlength="160" placeholder="Ex.: manejo, limpeza, irrigação, vacinação" required>
          </label>
          <label>
            Data
            <input type="date" name="activityDate" value="${today}" required>
          </label>
          <label>
            Hora
            <input type="time" name="activityTime" value="${new Date().toISOString().slice(11, 16)}" required>
          </label>
        </div>
        <label>
          O que foi feito no dia
          <textarea name="details" rows="4" maxlength="800" placeholder="Descreva a atividade executada na unidade." required></textarea>
        </label>
        <p class="retorno-form" id="retornoRotinaPrioritariaUnidade" aria-live="polite"></p>
        <div class="acoes-compra">
          <button type="reset" class="btn-fantasma">Limpar</button>
          <button type="submit" class="btn-acao-primaria">Salvar atividade</button>
        </div>
      </form>
    `;
  }

  const form = document.getElementById("formRotinaPrioritariaUnidade");
  const feedback = document.getElementById("retornoRotinaPrioritariaUnidade");
  let activities = (await services.dailyUnitActivities.list()).filter((item) => (
    String(item.unitId || "") === String(unitScope.unitId || "") &&
    String(item.unitSlug || "") === String(unitScope.unitSlug || "")
  ));

  function setFeedback(message = "", type = "") {
    if (!feedback) return;
    feedback.textContent = message;
    feedback.dataset.state = type;
  }

  function sortActivities(items = []) {
    return [...items].sort((a, b) => (
      `${String(b.activityDate || "")} ${String(b.activityTime || "")}`.localeCompare(
        `${String(a.activityDate || "")} ${String(a.activityTime || "")}`
      )
    ));
  }

  function renderSummary() {
    if (!summaryList) return;

    const todayActivities = sortActivities(
      activities.filter((item) => String(item.activityDate) === today)
    );

    if (todayActivities.length) {
      summaryList.innerHTML = todayActivities.slice(0, 4).map((item) => `
        <li>
          <strong>${escapeHtml(item.title)}</strong>
          <span>${escapeHtml(item.details || "Atividade registrada.")} • ${escapeHtml(item.activityTime)} • ${escapeHtml(item.performerName || item.createdBy || "Sistema")}</span>
        </li>
      `).join("");
      return;
    }

    summaryList.innerHTML = (context.fallbackSummaryItems || []).map((item) => `
      <li>
        <strong>${escapeHtml(item.title)}</strong>
        <span>${escapeHtml(item.description)}</span>
      </li>
    `).join("");
  }

  function renderHistory() {
    if (!eventsList) return;

    const orderedActivities = sortActivities(activities);
    if (tagAlteracoes) {
      tagAlteracoes.textContent = `${orderedActivities.length} ${orderedActivities.length === 1 ? "atividade" : "atividades"}`;
    }

    if (orderedActivities.length) {
      eventsList.innerHTML = orderedActivities.map((item) => `
        <li>
          <strong>${escapeHtml(item.title)}</strong>
          <span>${escapeHtml(item.details || "Atividade registrada.")} • ${escapeHtml(formatDate(item.activityDate))} às ${escapeHtml(item.activityTime)} • ${escapeHtml(item.performerName || item.createdBy || item.updatedBy || "Sistema")}</span>
        </li>
      `).join("");
      return;
    }

    eventsList.innerHTML = (context.fallbackTimelineEvents || []).map((item) => `
      <li>
        <strong>${escapeHtml(item.title)}</strong>
        <span>${escapeHtml(item.description)} • ${escapeHtml(formatDate(item.date))}</span>
      </li>
    `).join("") || '<li><strong>Sem atividades</strong><span>Nenhuma atividade diária foi registrada para esta unidade ainda.</span></li>';
  }

  form?.addEventListener("submit", async (event) => {
    event.preventDefault();
    setFeedback("", "");
    const formData = new FormData(form);
    const payload = {
      unitId: unitScope.unitId || "",
      unitSlug: unitScope.unitSlug || "",
      unitName: unitScope.unitName || "Unidade produtiva",
      category: unitScope.category || "planta",
      performerName: String(formData.get("performerName") || "").trim(),
      title: String(formData.get("title") || "").trim(),
      details: String(formData.get("details") || "").trim(),
      activityDate: String(formData.get("activityDate") || "").trim(),
      activityTime: String(formData.get("activityTime") || "").trim()
    };

    if (!payload.performerName || !payload.title || !payload.details || !payload.activityDate || !payload.activityTime) {
      setFeedback("Preencha nome, atividade, descrição, data e hora para salvar.", "error");
      return;
    }

    try {
      const created = await services.dailyUnitActivities.create(payload);
      activities = [created, ...activities];
      await registerAuditLog({
        type: "Rotina",
        title: "Atividade diária registrada",
        details: `${payload.title} registrada na unidade ${payload.unitName}.`,
        area: payload.unitName,
        status: "Concluido",
        entityType: "daily-unit-activity",
        entityId: created?.id,
        metadata: payload
      });
      form.reset();
      form.elements.activityDate.value = today;
      form.elements.activityTime.value = new Date().toISOString().slice(11, 16);
      setFeedback("Atividade diária salva com sucesso.", "success");
      renderSummary();
      renderHistory();
    } catch (error) {
      setFeedback(error?.message || "Nao foi possivel salvar a atividade agora.", "error");
    }
  });

  form?.addEventListener("reset", () => {
    window.setTimeout(() => {
      setFeedback("", "");
      if (form.elements.activityDate) {
        form.elements.activityDate.value = today;
      }
      if (form.elements.activityTime) {
        form.elements.activityTime.value = new Date().toISOString().slice(11, 16);
      }
    }, 0);
  });

  renderSummary();
  renderHistory();
}

function getProductionUnitCategory(unit = {}) {
  const explicitCategory = String(unit.category || unit.categoria || unit.tipo || "").toLowerCase();
  if (explicitCategory === "animal" || explicitCategory === "planta") {
    return explicitCategory;
  }

  const slug = String(unit.slug || unit.pageSlug || "").toLowerCase();
  return ["suinocultura", "avicultura", "piscicultura"].includes(slug) ? "animal" : "planta";
}

function createGenericUnitDashboardConfig(unit, category = "planta") {
  if (!unit) return null;

  const unitName = unit.name || unit.nome || "Unidade produtiva";
  const isAnimal = category === "animal";
  return {
    image: {
      src: unit.image || getUnitCardImage(unitName, unit.slug),
      alt: `Imagem da unidade ${unitName}`
    },
    structureLabel: isAnimal ? "Estruturas ativas" : "Áreas ativas",
    structureValue: 0,
    structureDescription: isAnimal ? "Configure baias, galpões, tanques ou piquetes desta unidade." : "Configure canteiros, talhões ou módulos desta unidade.",
    animalsLabel: isAnimal ? "Animais monitorados" : "Cultivos em manejo",
    animalsValue: 0,
    animalsDescription: isAnimal ? "Registros de ciclo de vida cadastrados para esta unidade." : "Registros de cultivo cadastrados para esta unidade.",
    vaccinationValue: "Não",
    vaccinationDescription: "Sem protocolo sanitário informado.",
    tableTitle: isAnimal ? "Monitoramento dos animais" : "Situação dos cultivos",
    summaryItems: [
      {
        title: "Unidade carregada pelo backend",
        description: `${unitName} está cadastrada como categoria ${isAnimal ? "animal" : "flora"}.`
      },
      {
        title: isAnimal ? "Ciclo de vida disponível" : "Manejo produtivo disponível",
        description: isAnimal ? "Use o cadastro de animais para acompanhar nascimento, eventos e histórico." : "Use o cadastro da flora para acompanhar plantio, manejo, produção e histórico."
      }
    ],
    checklist: [
      { done: false, text: "Adicionar os primeiros dados operacionais da unidade." },
      { done: false, text: "Atualizar indicadores e registros recentes." }
    ],
    indicators: [
      {
        title: "Categoria",
        value: getUnitCategoryLabel(category),
        description: isAnimal ? "Monitoramento de ciclo de vida habilitado." : "Monitoramento produtivo habilitado."
      }
    ],
    events: [],
    tableColumns: isAnimal
      ? ["Identificação", "Registro", "Fase", "Status"]
      : ["Área", "Cultivo", "Manejo", "Status"],
    tableRows: []
  };
}

function applyUnitLifecycleCopy(unitPage, unitKey, category = "animal") {
  if (!unitPage) return;
  const copy = UNIT_LIFECYCLE_COPY[unitKey] || UNIT_LIFECYCLE_COPY[category === "animal" ? "suinocultura" : "horticultura"];
  if (!copy) return;
  if (unitKey === "cultivos-de-sequeiro") {
    Object.assign(copy, {
      registerTitle: "Cadastrar plantio",
      registerButton: "Cadastrar plantio",
      registerCodeLabel: "Codigo do plantio",
      motherLabel: "Area plantada",
      motherPlaceholder: "Ex.: 2 ha ou 500 m2",
      fatherLabel: "Sementes utilizadas",
      fatherPlaceholder: "Ex.: 1200",
      breedLabel: "Planta cultivada",
      locationLabel: "Local do plantio",
      eventSubjectLabel: "Plantio",
      eventSubjectPlaceholder: "Selecione o plantio"
    });
  }

  const graphSection = unitPage.querySelector(".grafico-zootecnico");
  if (graphSection) {
    const eyebrow = graphSection.querySelector(".sobrelinha-secao");
    const title = graphSection.querySelector("h3");
    const tag = graphSection.querySelector(".tag-secao");
    if (eyebrow) eyebrow.textContent = copy.summaryEyebrow;
    if (title) title.textContent = copy.summaryTitle;
    if (tag && copy.summaryTag) tag.textContent = copy.summaryTag;
  }

  const animalForm = document.getElementById("formAnimalSuino");
  if (animalForm) {
    const section = animalForm.closest("article");
    const eyebrow = section?.querySelector(".sobrelinha-secao");
    const title = section?.querySelector("h3");
    const tag = section?.querySelector(".tag-secao");
    const submitButton = animalForm.querySelector('button[type="submit"]');

    if (eyebrow) eyebrow.textContent = copy.registerEyebrow;
    if (title) title.textContent = copy.registerTitle;
    if (tag) tag.textContent = copy.registerTag;
    if (submitButton) submitButton.textContent = copy.registerButton;

    updateFormField(animalForm, ["codigo_animal", "codigo_suino", "codigo_canteiro", "codigo_fruta", "codigo_especie", "codigo_muda", "codigo_talhao"], copy.registerCodeLabel, copy.registerCodePlaceholder);
    updateFormField(animalForm, ["codigo_mae", "area_plantada"], copy.motherLabel, copy.motherPlaceholder);
    updateFormField(animalForm, ["codigo_pai", "sementes_utilizadas"], copy.fatherLabel, copy.fatherPlaceholder);
    updateFormField(animalForm, ["raca", "nome_planta"], copy.breedLabel, copy.breedPlaceholder);
    updateFormField(animalForm, ["baia", "local_plantio"], copy.locationLabel, copy.locationPlaceholder);
    updateFormField(animalForm, "observacoes", "Observações", copy.notesPlaceholder);
  }

  const eventForm = document.getElementById("formEventoSuino");
  if (eventForm) {
    const section = eventForm.closest("article");
    const eyebrow = section?.querySelector(".sobrelinha-secao");
    const title = section?.querySelector("h3");
    const tag = section?.querySelector(".tag-secao");
    const submitButton = eventForm.querySelector('button[type="submit"]');

    if (eyebrow) eyebrow.textContent = copy.eventEyebrow;
    if (title) title.textContent = copy.eventTitle;
    if (tag) tag.textContent = copy.eventTag;
    if (submitButton) submitButton.textContent = "Registrar evento";

    updateFormField(eventForm, ["animal_id", "suino_id", "especie_id", "planta_id", "muda_id"], copy.eventSubjectLabel, copy.eventSubjectPlaceholder);
    updateFormField(eventForm, "tipo_evento", "Tipo de evento", copy.eventTypePlaceholder);
    updateFormField(eventForm, "descricao_evento", "Descrição do evento", copy.eventDescriptionPlaceholder);
  }
}

function resolveLifecycleField(form, fieldNames) {
  const names = Array.isArray(fieldNames) ? fieldNames : [fieldNames];
  for (const name of names) {
    const field = form?.elements?.[name];
    if (field) {
      return field;
    }
  }

  return null;
}

function updateFormField(form, fieldNames, labelText, placeholderText = "") {
  if (!form) return;
  const field = resolveLifecycleField(form, fieldNames);
  if (!field) return;
  const label = field.closest("label");
  if (label && label.firstChild?.nodeType === Node.TEXT_NODE) {
    label.firstChild.textContent = `${labelText}\n                            `;
  }
  if ("placeholder" in field && placeholderText) {
    field.placeholder = placeholderText;
  }
  if (field.tagName === "SELECT" && placeholderText && field.options?.length) {
    field.options[0].textContent = placeholderText;
  }
}

function getLifecycleFieldValue(formData, names = []) {
  for (const name of names) {
    const value = formData.get(name);
    if (value != null) {
      return value;
    }
  }

  return "";
}

function ensureLifecycleHiddenField(form, fieldName) {
  if (!form) return null;
  let field = form.querySelector(`input[name="${fieldName}"]`);
  if (!field) {
    field = document.createElement("input");
    field.type = "hidden";
    field.name = fieldName;
    form.appendChild(field);
  }
  return field;
}

function getLifecycleSubmitButton(form) {
  return form?.querySelector('button[type="submit"]') || null;
}

function setLifecycleSubmitBaseText(form, text) {
  const submitButton = getLifecycleSubmitButton(form);
  if (!submitButton) return;
  submitButton.dataset.baseText = text;
  submitButton.textContent = text;
}

function setLifecycleEditingState(form, hiddenField, isEditing) {
  const submitButton = getLifecycleSubmitButton(form);
  if (!submitButton) return;
  const baseText = submitButton.dataset.baseText || submitButton.textContent || "Salvar";
  submitButton.textContent = isEditing ? "Salvar alterações" : baseText;
  if (!isEditing && hiddenField) {
    hiddenField.value = "";
  }
}

function setLifecycleFieldValue(form, fieldNames, value) {
  const field = resolveLifecycleField(form, fieldNames);
  if (!field) return;
  field.value = value == null ? "" : String(value);
}

function serializeLifecycleFormData(formData) {
  const rawFields = {};
  for (const [key, value] of formData.entries()) {
    rawFields[key] = String(value || "");
  }
  return rawFields;
}

function normalizeLifecycleRecord(formData, current = {}) {
  const rawFields = serializeLifecycleFormData(formData);
  return {
    ...current,
    rawFields,
    codigo_animal: String(getLifecycleFieldValue(formData, ["codigo_animal", "codigo_suino", "codigo_canteiro", "codigo_fruta", "codigo_especie", "codigo_muda", "codigo_talhao"]) || "").trim().toUpperCase(),
    data_nascimento: String(getLifecycleFieldValue(formData, ["data_nascimento", "data_plantio", "data_entrada"]) || "").trim(),
    codigo_mae: String(getLifecycleFieldValue(formData, ["codigo_mae", "tipo_cultivo", "tipo", "area_plantada"]) || "").trim(),
    codigo_pai: String(getLifecycleFieldValue(formData, ["codigo_pai", "area_canteiro", "especie", "sementes_utilizadas"]) || "").trim(),
    raca: String(getLifecycleFieldValue(formData, ["raca", "tipo_cultivo", "especie", "tipo", "nome_planta"]) || "").trim(),
    sexo: String(getLifecycleFieldValue(formData, ["sexo"]) || current.sexo || "").trim(),
    fase: String(getLifecycleFieldValue(formData, ["fase", "fase_atual", "fase_vida"]) || current.fase || "").trim() || "Em acompanhamento",
    baia: String(getLifecycleFieldValue(formData, ["baia", "area_canteiro", "local_plantio"]) || current.baia || "").trim(),
    observacoes: String(getLifecycleFieldValue(formData, ["observacoes"]) || "").trim(),
    status: current.status || "Ativo"
  };
}

function fillLifecycleFormFromRecord(form, record = {}) {
  if (!form) return;
  const rawFields = record.rawFields || {};
  Array.from(form.elements || []).forEach((field) => {
    if (!field?.name || ["submit", "reset", "button", "hidden"].includes(field.type)) {
      return;
    }
    field.value = rawFields[field.name] != null ? rawFields[field.name] : "";
  });
}

function ensureLifecycleRecordsPanel(root, panelTitle = "Registros cadastrados") {
  if (!root) return null;
  let panel = document.getElementById("painelRegistrosCicloVida");
  if (panel) return panel;

  panel = document.createElement("article");
  panel.id = "painelRegistrosCicloVida";
  panel.className = "painel-compras painel-registros-ciclo-vida";
  panel.innerHTML = `
    <div class="cabecalho-secao">
      <div>
        <p class="sobrelinha-secao">Cadastros da unidade</p>
        <h3>${escapeHtml(panelTitle)}</h3>
      </div>
      <span class="tag-secao" id="tagRegistrosCicloVida">0 registros</span>
    </div>
    <div class="lista-registros-ciclo-vida" id="listaRegistrosCicloVida"></div>
  `;
  root.appendChild(panel);
  return panel;
}

function getLifecycleRecordLabels(unitKey, fallbackLabel = "registro") {
  const labels = {
    suinocultura: { singular: "suíno", plural: "suínos" },
    avicultura: { singular: "ave", plural: "aves" },
    piscicultura: { singular: "peixe", plural: "peixes" },
    horticultura: { singular: "cultivo", plural: "cultivos" },
    fruticultura: { singular: "planta", plural: "plantas" },
    agrofloresta: { singular: "espécie", plural: "espécies" },
    "plantas-forrageiras": { singular: "forrageira", plural: "forrageiras" },
    "cultivos-de-sequeiro": { singular: "talhão", plural: "talhões" },
    "plantas-ornamentais": { singular: "muda", plural: "mudas" },
    "plantas-medicinais": { singular: "espécie", plural: "espécies" },
    "viveiros-de-mudas": { singular: "muda", plural: "mudas" }
  };

  return labels[unitKey] || {
    singular: String(fallbackLabel || "registro").toLowerCase(),
    plural: `${String(fallbackLabel || "registro").toLowerCase()}s`
  };
}

async function setupBasicAnimalLifecycleManagement(unitKey, context = {}) {
  const animalForm = document.getElementById("formAnimalSuino");
  const eventForm = document.getElementById("formEventoSuino");
  const eventAnimalSelect = document.getElementById("eventoAnimalSelect") || document.getElementById("eventoSuinoSelect") || document.getElementById("eventoMudaSelect");

  if (!animalForm || !eventForm || !eventAnimalSelect) {
    return;
  }

  const copy = UNIT_LIFECYCLE_COPY[unitKey] || {};
  const itemLabel = String(copy.registerTitle || "Cadastrar registro").replace(/^Cadastrar\s+/i, "") || "Registro";
  const itemLabels = getLifecycleRecordLabels(unitKey, itemLabel);
  if (unitKey === "cultivos-de-sequeiro") {
    itemLabels.singular = "plantio";
    itemLabels.plural = "plantios";
  }
  const isAnimalUnit = String(context.unitScope?.category || "") === "animal";
  const isSeedlingUnit = itemLabels.singular === "muda";
  const isDrylandUnit = unitKey === "cultivos-de-sequeiro";
  const lifecycleGrid = animalForm.closest(".compras-grid-ciclo-vida");
  const recordsPanel = ensureLifecycleRecordsPanel(
    lifecycleGrid,
    `${itemLabels.plural.charAt(0).toUpperCase()}${itemLabels.plural.slice(1)}`
  );
  const recordsList = document.getElementById("listaRegistrosCicloVida");
  const recordsTag = document.getElementById("tagRegistrosCicloVida");
  const animalsTableBody = document.getElementById("corpoTabelaAnimaisSuinos") || document.getElementById("corpoTabelaUnidade");
  const animalsTag = document.getElementById("tagAnimaisMonitorados");
  const unitTableHead = document.getElementById("cabecalhoTabelaUnidade");
  const unitTableTitle = document.getElementById("tituloTabelaUnidade");
  const animalIdField = ensureLifecycleHiddenField(animalForm, "registro_id");
  const baseSubmitText = getLifecycleSubmitButton(animalForm)?.textContent || "Cadastrar";
  setLifecycleSubmitBaseText(animalForm, baseSubmitText);

  if (unitTableHead && !isAnimalUnit) {
    unitTableHead.closest("table")?.classList.toggle("tabela-acompanhamento-mudas", isSeedlingUnit);
    unitTableHead.innerHTML = `
      <tr>
        <th>Identificação</th>
        <th>Tipo</th>
        <th>Local</th>
        <th>Último manejo</th>
        <th>Status</th>
        <th>Ações</th>
      </tr>
    `;
    if (isDrylandUnit) {
      unitTableHead.innerHTML = `
        <tr>
          <th>Plantio</th>
          <th>Planta</th>
          <th>Area plantada</th>
          <th>Sementes</th>
          <th>Ultimo manejo</th>
          <th>Status</th>
          <th>Acoes</th>
        </tr>
      `;
    }
    if (isSeedlingUnit) {
      unitTableHead.innerHTML = `
        <tr>
          <th>Codigo</th>
          <th>Especie</th>
          <th>Tipo</th>
          <th>Entrada</th>
          <th>Ultimo manejo</th>
          <th>Status</th>
          <th>Acoes</th>
        </tr>
      `;
    }
  }

  if (unitTableTitle && !isAnimalUnit) {
    unitTableTitle.textContent = `Acompanhamento de ${itemLabels.plural}`;
  }

  if (unitTableTitle && isAnimalUnit) {
    unitTableTitle.textContent = `Ciclo de vida de ${itemLabels.plural}`;
  }

  const animalsTableHeadRow = animalsTableBody?.closest("table")?.querySelector("thead tr");
  if (isAnimalUnit && unitTableHead) {
    unitTableHead.innerHTML = `
      <tr>
        <th>Identificacao</th>
        <th>Entrada</th>
        <th>Fase</th>
        <th>Local</th>
        <th>Status</th>
        <th>Ultimo evento</th>
        <th>Acoes</th>
      </tr>
    `;
  }
  if (isAnimalUnit && animalsTableHeadRow && !animalsTableHeadRow.querySelector("[data-coluna-acoes-ciclo]")) {
    const th = document.createElement("th");
    th.dataset.colunaAcoesCiclo = "true";
    th.textContent = "Ações";
    animalsTableHeadRow.appendChild(th);
  }

  let animals = (await services.lifecycle.animals.list()).filter((item) => (
    String(item.unitId || "") === String(context.unitScope?.unitId || "") &&
    String(item.unitSlug || "") === String(context.unitScope?.unitSlug || "")
  ));
  let lifeEvents = (await services.lifecycle.events.list()).filter((item) => (
    String(item.unitId || "") === String(context.unitScope?.unitId || "") &&
    String(item.unitSlug || "") === String(context.unitScope?.unitSlug || "")
  ));

  function saveAll() {
    APP_CACHE.swineAnimals = animals;
    APP_CACHE.swineLifeEvents = lifeEvents;
  }

  function setFeedback(elementId, message = "", type = "") {
    const element = document.getElementById(elementId);
    if (!element) return;
    element.textContent = message;
    element.dataset.state = type;
  }

  function render() {
    const selectLabel = itemLabels.singular;
    const latestEventByAnimalId = lifeEvents.reduce((accumulator, item) => {
      const key = String(item.animal_id || "");
      const current = accumulator[key];
      const currentStamp = current ? `${current.data_evento || ""} ${current.createdAt || ""}` : "";
      const nextStamp = `${item.data_evento || ""} ${item.createdAt || ""}`;
      if (!current || nextStamp.localeCompare(currentStamp) > 0) {
        accumulator[key] = item;
      }
      return accumulator;
    }, {});

    eventAnimalSelect.innerHTML = `
    <option value="">
      Selecione ${selectLabel}
    </option>`;

    animals.forEach((animal) => {

      const option =
        document.createElement("option");

      option.value = animal.id;

      option.textContent =
        animal.codigo_animal ||
        animal.nome ||
        animal.identificacao ||
        "Registro";

      eventAnimalSelect.appendChild(option);

    });

    if (recordsTag) {
      recordsTag.textContent = `${animals.length} ${animals.length === 1 ? itemLabels.singular : itemLabels.plural}`;
    }

    if (recordsList) {
      recordsList.innerHTML = animals.map((animal) => {
        const latestEvent = latestEventByAnimalId[String(animal.id)];
        const subtitle = [animal.raca, animal.baia].filter(Boolean).join(" • ") || "Sem detalhes complementares.";
        const latestEventText = latestEvent
          ? `${latestEvent.tipo_evento || "Manejo"} em ${formatDate(latestEvent.data_evento)}`
          : "Sem manejo registrado.";

        return `
          <article class="item-lista-registro">
            <div>
              <strong>${escapeHtml(animal.codigo_animal || "Sem código")}</strong>
              <span>${escapeHtml(subtitle)}</span>
              <small>${escapeHtml(latestEventText)}</small>
            </div>
            <div class="acoes-compra">
              <button type="button" class="btn-acao-tabela" data-editar-ciclo="${escapeHtml(animal.id)}">Editar</button>
              <button type="button" class="btn-acao-tabela" data-excluir-ciclo="${escapeHtml(animal.id)}">Excluir</button>
            </div>
          </article>
        `;
      }).join("") || `<p class="estado-vazio">Nenhum ${escapeHtml(itemLabels.singular)} cadastrado ainda.</p>`;
    }

    if (animalsTag) {
      animalsTag.textContent = `${animals.length} ${animals.length === 1 ? itemLabels.singular : itemLabels.plural}`;
    }

    if (context.cardAnimalsValue) {
      context.cardAnimalsValue.textContent = animals.length.toLocaleString("pt-BR");
    }

    if (context.cardAnimalsDescription) {
      context.cardAnimalsDescription.textContent = `${animals.length} ${animals.length === 1 ? itemLabels.singular : itemLabels.plural} registrados nesta unidade.`;
    }

    if (animalsTableBody) {
      if (!animals.length) {
        animalsTableBody.innerHTML = `
          <tr>
            <td colspan="${(isSeedlingUnit || isDrylandUnit) ? 7 : 6}" class="linha-vazia">
              Nenhum ${escapeHtml(itemLabels.singular)} cadastrado.
            </td>
          </tr>
        `;
      } else {
        animalsTableBody.innerHTML = animals.map((animal) => {
          const latestEvent = latestEventByAnimalId[String(animal.id)];
          const statusText = animal.status || "Ativo";
          const statusClass = String(statusText).toLowerCase() === "morto"
            ? "selo-status esta-critico"
            : String(statusText).toLowerCase().includes("observ")
              ? "selo-status esta-alerta"
              : "selo-status esta-ok";

          if (isAnimalUnit) {
            return `
              <tr>
                <td>
                  <strong>${escapeHtml(animal.codigo_animal || "--")}</strong>
                  <small>${escapeHtml(animal.raca || "--")}</small>
                </td>
                <td>${escapeHtml(formatDate(animal.data_nascimento))}</td>
                <td>${escapeHtml(animal.fase || "--")}</td>
                <td>${escapeHtml(animal.baia || "--")}</td>
                <td><span class="${statusClass}">${escapeHtml(statusText)}</span></td>
                <td>${escapeHtml(latestEvent?.tipo_evento || "Sem evento")}</td>
                <td>
                  <div class="acoes-compra">
                    <button type="button" class="btn-acao-tabela" data-editar-ciclo="${escapeHtml(animal.id)}">Editar</button>
                    <button type="button" class="btn-acao-tabela" data-excluir-ciclo="${escapeHtml(animal.id)}">Excluir</button>
                  </div>
                </td>
              </tr>
            `;
          }

          if (isDrylandUnit) {
            const rawFields = animal.rawFields || {};
            const plantedArea = rawFields.area_plantada || animal.codigo_mae || "--";
            const usedSeeds = rawFields.sementes_utilizadas || animal.codigo_pai || "--";
            const plantName = rawFields.nome_planta || animal.raca || "--";
            const latestEventLabel = latestEvent
              ? `${latestEvent.tipo_evento || "Manejo"}${latestEvent.data_evento ? ` em ${formatDate(latestEvent.data_evento)}` : ""}`
              : "Sem manejo";

            return `
              <tr>
                <td>
                  <strong>${escapeHtml(animal.codigo_animal || "--")}</strong>
                  <small>${escapeHtml(formatDate(animal.data_nascimento))}</small>
                </td>
                <td>${escapeHtml(plantName)}</td>
                <td>${escapeHtml(plantedArea)}</td>
                <td>${escapeHtml(usedSeeds)}</td>
                <td>${escapeHtml(latestEventLabel)}</td>
                <td><span class="${statusClass}">${escapeHtml(statusText)}</span></td>
                <td>
                  <div class="acoes-compra acoes-ciclo-vida">
                    <button type="button" class="btn-acao-tabela" data-editar-ciclo="${escapeHtml(animal.id)}">Editar</button>
                    <button type="button" class="btn-acao-tabela" data-excluir-ciclo="${escapeHtml(animal.id)}">Excluir</button>
                  </div>
                </td>
              </tr>
            `;
          }

          if (isSeedlingUnit) {
            const rawFields = animal.rawFields || {};
            const seedlingSpecies = rawFields.especie || animal.codigo_pai || animal.raca || "--";
            const seedlingType = rawFields.tipo || animal.codigo_mae || "--";
            const entryDate = animal.data_nascimento || rawFields.data_entrada;
            const latestEventLabel = latestEvent
              ? `${latestEvent.tipo_evento || "Manejo"}${latestEvent.data_evento ? ` em ${formatDate(latestEvent.data_evento)}` : ""}`
              : "Sem manejo";

            return `
              <tr>
                <td>
                  <strong>${escapeHtml(animal.codigo_animal || "--")}</strong>
                  <small>${escapeHtml(animal.observacoes || "Sem observacoes.")}</small>
                </td>
                <td>${escapeHtml(seedlingSpecies)}</td>
                <td>${escapeHtml(seedlingType)}</td>
                <td>${escapeHtml(formatDate(entryDate))}</td>
                <td>${escapeHtml(latestEventLabel)}</td>
                <td><span class="${statusClass}">${escapeHtml(statusText)}</span></td>
                <td>
                  <div class="acoes-compra acoes-ciclo-vida">
                    <button type="button" class="btn-acao-tabela" data-editar-ciclo="${escapeHtml(animal.id)}">Editar</button>
                    <button type="button" class="btn-acao-tabela" data-excluir-ciclo="${escapeHtml(animal.id)}">Excluir</button>
                  </div>
                </td>
              </tr>
            `;
          }

          return `
            <tr>
              <td>
                <strong>${escapeHtml(animal.codigo_animal || "--")}</strong>
                <small>${escapeHtml(animal.observacoes || "Sem observações.")}</small>
              </td>
              <td>${escapeHtml(animal.raca || animal.codigo_mae || "--")}</td>
              <td>${escapeHtml(animal.baia || "--")}</td>
              <td>${escapeHtml(latestEvent?.tipo_evento || "Sem manejo")}</td>
              <td><span class="${statusClass}">${escapeHtml(statusText)}</span></td>
              <td>
                <div class="acoes-compra">
                  <button type="button" class="btn-acao-tabela" data-editar-ciclo="${escapeHtml(animal.id)}">Editar</button>
                  <button type="button" class="btn-acao-tabela" data-excluir-ciclo="${escapeHtml(animal.id)}">Excluir</button>
                </div>
              </td>
            </tr>
          `;
        }).join("");
      }
    }
  }

    function resetAnimalForm(keepMessage = false) {
      animalForm.reset();
      setLifecycleEditingState(animalForm, animalIdField, false);
      if (!keepMessage) {
        setFeedback("retornoAnimalSuino", "", "");
      }
    }

    function editAnimal(animalId) {
      const animal = animals.find((item) => String(item.id) === String(animalId));
      if (!animal) return;
      fillLifecycleFormFromRecord(animalForm, animal);
      animalIdField.value = animal.id;
      setLifecycleEditingState(animalForm, animalIdField, true);
      setFeedback("retornoAnimalSuino", `${itemLabel} carregado para edição.`, "success");
      const firstField = animalForm.querySelector("input:not([type='hidden']), select, textarea");
      firstField?.focus();
    }

    async function deleteAnimal(animalId) {
      const relatedEvents = lifeEvents.filter((item) => String(item.animal_id) === String(animalId));
      await Promise.all(relatedEvents.map((item) => services.lifecycle.events.remove(item.id)));
      await services.lifecycle.animals.remove(animalId);
      animals = animals.filter((item) => String(item.id) !== String(animalId));
      lifeEvents = lifeEvents.filter((item) => String(item.animal_id) !== String(animalId));
      if (animalIdField.value === String(animalId)) {
        resetAnimalForm(true);
      }
      saveAll();
      render();
      setFeedback("retornoAnimalSuino", `${itemLabel} excluído com sucesso.`, "success");
    }

    animalForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const formData = new FormData(animalForm);
      const editingId = String(animalIdField.value || "");
      const currentAnimal = animals.find((item) => String(item.id) === editingId) || {};
      const normalizedAnimal = normalizeLifecycleRecord(formData, currentAnimal);
      const code = normalizedAnimal.codigo_animal;

      if (!code) {
        setFeedback("retornoAnimalSuino", `Informe o código do ${itemLabel.toLowerCase()}.`, "error");
        return;
      }

      if (animals.some((animal) => String(animal.codigo_animal).toUpperCase() === code && String(animal.id) !== editingId)) {
        setFeedback("retornoAnimalSuino", `Já existe um ${itemLabel.toLowerCase()} com esse código.`, "error");
        return;
      }

      if (editingId) {
        const updatedAnimal = {
          ...normalizedAnimal,
          id: currentAnimal.id,
          unitId: context.unitScope?.unitId || "",
          unitSlug: context.unitScope?.unitSlug || unitKey,
          unitName: context.unitScope?.unitName || unitKey,
          category: context.unitScope?.category || "planta"
        };
        const persistedAnimal = await services.lifecycle.animals.update(editingId, updatedAnimal);
        animals = animals.map((item) => String(item.id) === editingId ? persistedAnimal : item);
        lifeEvents = await Promise.all(lifeEvents.map(async (item) => {
          if (String(item.animal_id) !== editingId) {
            return item;
          }
          return services.lifecycle.events.update(item.id, {
            ...item,
            animal_codigo: persistedAnimal.codigo_animal
          });
        }));
        saveAll();
        render();
        resetAnimalForm(true);
        setFeedback("retornoAnimalSuino", `${itemLabel} atualizado com sucesso.`, "success");
        return;
      }

      const animal = {
        ...normalizedAnimal,
        unitId: context.unitScope?.unitId || "",
        unitSlug: context.unitScope?.unitSlug || unitKey,
        unitName: context.unitScope?.unitName || unitKey,
        category: context.unitScope?.category || "planta"
      };

      const createdAnimal = await services.lifecycle.animals.create(animal);
      animals = [createdAnimal, ...animals];
      saveAll();
      render();
      resetAnimalForm(true);
      setFeedback("retornoAnimalSuino", `${itemLabel} cadastrado com sucesso.`, "success");
    });

    eventForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const formData = new FormData(eventForm);
      const animalId = String(getLifecycleFieldValue(formData, ["animal_id", "suino_id", "especie_id", "planta_id", "muda_id"]) || "");
      const animal = animals.find((item) => String(item.id) === animalId);

      if (!animal) {
        setFeedback("retornoEventoSuino", `Selecione ${itemLabels.singular}.`, "error");
        return;
      }

      const createdEvent = await services.lifecycle.events.create({
        unitId: context.unitScope?.unitId || "",
        unitSlug: context.unitScope?.unitSlug || unitKey,
        unitName: context.unitScope?.unitName || unitKey,
        category: context.unitScope?.category || "planta",
        animal_id: animal.id,
        animal_codigo: animal.codigo_animal,
        data_evento: String(getLifecycleFieldValue(formData, ["data_evento"]) || ""),
        tipo_evento: String(getLifecycleFieldValue(formData, ["tipo_evento"]) || "").trim(),
        fase_vida: String(getLifecycleFieldValue(formData, ["fase_vida", "fase_vida_evento"]) || "").trim(),
        descricao_evento: String(getLifecycleFieldValue(formData, ["descricao_evento"]) || "").trim(),
        rawFields: serializeLifecycleFormData(formData)
      });

      lifeEvents = [createdEvent, ...lifeEvents];

      saveAll();
      render();
      eventForm.reset();
      setFeedback("retornoEventoSuino", isAnimalUnit ? "Evento registrado no ciclo de vida." : "Manejo registrado com sucesso.", "success");
    });

    recordsPanel?.addEventListener("click", async (event) => {
      const editButton = event.target.closest("[data-editar-ciclo]");
      if (editButton) {
        editAnimal(editButton.dataset.editarCiclo);
        return;
      }

      const deleteButton = event.target.closest("[data-excluir-ciclo]");
      if (deleteButton) {
        await deleteAnimal(deleteButton.dataset.excluirCiclo);
      }
    });

    animalsTableBody?.addEventListener("click", async (event) => {
      const editButton = event.target.closest("[data-editar-ciclo]");
      if (editButton) {
        editAnimal(editButton.dataset.editarCiclo);
        return;
      }

      const deleteButton = event.target.closest("[data-excluir-ciclo]");
      if (deleteButton) {
        await deleteAnimal(deleteButton.dataset.excluirCiclo);
      }
    });

    animalForm.addEventListener("reset", () => {
      window.setTimeout(() => resetAnimalForm(), 0);
    });

    render();
  }

  async function setupSwineLifecycleManagement(context = {}) {
    const animalForm = document.getElementById("formAnimalSuino");
    const eventForm = document.getElementById("formEventoSuino");
    const deathForm = document.getElementById("formObitoSuino");

    const eventAnimalSelect =
      document.getElementById("eventoAnimalSelect") ||
      document.getElementById("eventoSuinoSelect");

    const deathAnimalSelect =
      document.getElementById("obitoAnimalSelect") ||
      document.getElementById("obitoSuinoSelect");

    const animalsTableBody =
      document.getElementById("corpoTabelaAnimaisSuinos");

    const deathsTableBody =
      document.getElementById("corpoTabelaObitosSuinos");

    const causesList =
      document.getElementById("listaCausasObito");

    const animalsTag = document.getElementById("tagAnimaisMonitorados");
    const recentDeathsTag = document.getElementById("tagMortesRecentes");
    const totalDeathsTag = document.getElementById("tagTotalObitosPainel");
    const eventsList = context.eventsList;
    const tagAlteracoes = context.tagAlteracoes;

    if (
      !animalForm ||
      !eventForm ||
      !deathForm ||
      !animalsTableBody ||
      !deathsTableBody
    ) {
      return;
    }

    let animals = (
      await services.lifecycle.animals.list()
    ).filter((item) => {
      return (
        String(item.unitId || "") ===
        String(context.unitScope?.unitId || "") &&
        String(item.unitSlug || "") ===
        String(context.unitScope?.unitSlug || "")
      );
    });

    let lifeEvents = (
      await services.lifecycle.events.list()
    ).filter((item) => {
      return (
        String(item.unitId || "") ===
        String(context.unitScope?.unitId || "") &&
        String(item.unitSlug || "") ===
        String(context.unitScope?.unitSlug || "")
      );
    });

    let deaths = (
      await services.lifecycle.deaths.list()
    ).filter((item) => {
      return (
        String(item.unitId || "") ===
        String(context.unitScope?.unitId || "") &&
        String(item.unitSlug || "") ===
        String(context.unitScope?.unitSlug || "")
      );
    });

    function setFeedback(id, message = "", type = "") {
      const element = document.getElementById(id);

      if (!element) return;

      element.textContent = message;
      element.dataset.state = type;
    }

    function getAnimalById(id) {
      return animals.find(
        (animal) => String(animal.id) === String(id)
      );
    }

    function isDeadAnimal(animal) {
      return ["morto", "abatido", "obito", "óbito"].includes(
        String(animal?.status || "").toLowerCase()
      );
    }

    /* =========================================
       RENDERIZAR SELECTS DE ANIMAIS
    ========================================= */
    function renderAnimalSelects() {
      const aliveAnimals = animals.filter(
        (animal) => !isDeadAnimal(animal)
      );

      const allAnimalsOptions = animals
        .map((animal) => {
          return `
          <option value="${escapeHtml(animal.id)}">
            ${escapeHtml(animal.codigo_animal)}
            •
            ${escapeHtml(animal.fase || "Sem fase")}
          </option>
        `;
        })
        .join("");

      const aliveAnimalsOptions = aliveAnimals
        .map((animal) => {
          return `
          <option value="${escapeHtml(animal.id)}">
            ${escapeHtml(animal.codigo_animal)}
            •
            ${escapeHtml(animal.baia || "Sem baia")}
          </option>
        `;
        })
        .join("");

      if (eventAnimalSelect) {
        eventAnimalSelect.innerHTML = `
        <option value="">
          Selecione o suíno
        </option>

        ${allAnimalsOptions}
      `;
      }

      if (deathAnimalSelect) {
        deathAnimalSelect.innerHTML = `
        <option value="">
          Selecione o suíno
        </option>

        ${aliveAnimalsOptions}
      `;
      }
    }

    /* =========================================
       TABELA DE ANIMAIS
    ========================================= */
    function renderAnimalsTable() {
      const latestEventByAnimalId = lifeEvents.reduce((accumulator, item) => {
        const key = String(item.animal_id || "");
        const current = accumulator[key];
        const currentStamp = current ? `${current.data_evento || ""} ${current.createdAt || ""}` : "";
        const nextStamp = `${item.data_evento || ""} ${item.createdAt || ""}`;
        if (!current || nextStamp.localeCompare(currentStamp) > 0) {
          accumulator[key] = item;
        }
        return accumulator;
      }, {});

      if (!animals.length) {
        animalsTableBody.innerHTML = `
        <tr>
          <td colspan="7" class="linha-vazia">
            Nenhum suíno cadastrado.
          </td>
        </tr>
      `;

        return;
      }

      animalsTableBody.innerHTML = animals
        .map((animal) => {
          const latestEvent = latestEventByAnimalId[String(animal.id)];
          return `
          <tr>
            <td>
              <strong>
                ${escapeHtml(animal.codigo_animal)}
              </strong>

              <small>
                ${escapeHtml(animal.raca || "--")}
              </small>
            </td>

            <td>
              ${escapeHtml(
            formatDate(animal.data_nascimento)
          )}
            </td>

            <td>
              ${escapeHtml(animal.fase || "--")}
            </td>

            <td>
              ${escapeHtml(animal.baia || "--")}
            </td>

            <td>
              <span class="
                ${["Morto", "Abatido"].includes(animal.status)
              ? "selo-status esta-critico"
              : animal.status === "Em observação"
                ? "selo-status esta-alerta"
                : "selo-status esta-ok"
            }
              ">
                ${escapeHtml(animal.status || "Ativo")}
              </span>
            </td>

            <td>
              ${escapeHtml(latestEvent?.tipo_evento || "Sem evento")}
            </td>

            <td>
              <div class="acoes-compra">
                <button
                  type="button"
                  class="btn-acao-tabela"
                  data-delete-animal="${animal.id
            }"
                >
                  Excluir
                </button>
              </div>
            </td>
          </tr>
        `;
        })
        .join("");
    }

    /* =========================================
       TABELA DE ÓBITOS
    ========================================= */
    function renderDeathsTable() {
      if (!deaths.length) {
        deathsTableBody.innerHTML = `
        <tr>
          <td colspan="4" class="linha-vazia">
            Nenhum óbito registrado.
          </td>
        </tr>
      `;

        return;
      }

      deathsTableBody.innerHTML = deaths
        .map((item) => {
          return `
          <tr>
            <td>
              <strong>
                ${escapeHtml(item.animal_codigo)}
              </strong>
            </td>

            <td>
              ${escapeHtml(
            formatDate(item.data_obito)
          )}
            </td>

            <td>
              ${escapeHtml(item.causa_obito)}
            </td>

            <td>
              <span class="selo-status esta-critico">
                ${escapeHtml(
            item.categoria_causa
          )}
              </span>
            </td>
          </tr>
        `;
        })
        .join("");
    }

    /* =========================================
       CAUSAS DE ÓBITO
    ========================================= */
    function renderDeathCauses() {
      if (!causesList) return;

      if (!deaths.length) {
        causesList.innerHTML = `
        <p class="estado-vazio">
          Nenhuma causa registrada.
        </p>
      `;

        return;
      }

      const grouped = deaths.reduce(
        (accumulator, item) => {
          const key =
            item.causa_obito || "Não informada";

          accumulator[key] =
            (accumulator[key] || 0) + 1;

          return accumulator;
        },
        {}
      );

      causesList.innerHTML = Object.entries(grouped)
        .map(([cause, total]) => {
          return `
          <article class="item-critico">
            <div>
              <strong>
                ${escapeHtml(cause)}
              </strong>

              <span>
                ${total} ocorrência(s)
              </span>
            </div>

            <div class="metrica-critica">
              <b>${total}</b>
              <small>casos</small>
            </div>
          </article>
        `;
        })
        .join("");
    }

    function renderLifecycleEvents() {
      if (!eventsList) return;

      const eventItems = lifeEvents.map((item) => ({
        date: item.data_evento,
        createdAt: item.createdAt,
        title: item.tipo_evento || "Evento registrado",
        description: [
          item.animal_codigo,
          item.fase_vida,
          item.descricao_evento
        ].filter(Boolean).join(" • ")
      }));

      const deathItems = deaths.filter((item) => {
        return !lifeEvents.some((eventItem) => (
          String(eventItem.rawFields?.deathId || "") === String(item.id) ||
          (
            String(eventItem.animal_id || "") === String(item.animal_id || "") &&
            String(eventItem.data_evento || "") === String(item.data_obito || "") &&
            ["abate", "óbito", "obito"].includes(String(eventItem.tipo_evento || "").toLowerCase())
          )
        ));
      }).map((item) => {
        const isSlaughter = String(item.categoria_causa || "").toLowerCase() === "abate";
        return {
          date: item.data_obito,
          createdAt: item.createdAt,
          title: isSlaughter ? "Abate registrado" : "Óbito registrado",
          description: [
            item.animal_codigo,
            item.causa_obito,
            item.categoria_causa
          ].filter(Boolean).join(" • ")
        };
      });

      const orderedEvents = [...eventItems, ...deathItems].sort((a, b) => (
        `${b.date || ""} ${b.createdAt || ""}`.localeCompare(`${a.date || ""} ${a.createdAt || ""}`)
      ));

      if (tagAlteracoes) {
        tagAlteracoes.textContent = `${orderedEvents.length} ${orderedEvents.length === 1 ? "ocorrência" : "ocorrências"}`;
      }

      eventsList.innerHTML = orderedEvents.map((item) => `
        <li>
          <strong>${escapeHtml(item.title)}</strong>
          <span>${escapeHtml(item.description || "Registro sem detalhes.")} • ${escapeHtml(formatDate(item.date))}</span>
        </li>
      `).join("") || '<li><strong>Sem eventos</strong><span>Nenhum evento do ciclo de vida foi registrado para esta unidade ainda.</span></li>';
    }

    /* =========================================
       RENDERIZAR TUDO
    ========================================= */
    function renderAll() {
      if (animalsTag) {
        animalsTag.textContent = `${animals.length} ${animals.length === 1 ? "animal" : "animais"}`;
      }
      if (recentDeathsTag) {
        recentDeathsTag.textContent = `${deaths.length} ${deaths.length === 1 ? "registro" : "registros"}`;
      }
      if (totalDeathsTag) {
        totalDeathsTag.textContent = `${deaths.length} ${deaths.length === 1 ? "óbito" : "óbitos"}`;
      }
      renderAnimalSelects();
      renderAnimalsTable();
      renderDeathsTable();
      renderDeathCauses();
      renderLifecycleEvents();
    }

    /* =========================================
       CADASTRAR ANIMAL
    ========================================= */
    animalForm.addEventListener(
      "submit",
      async (event) => {
        event.preventDefault();

        const formData = new FormData(animalForm);
        const unitScope = context.unitScope || {};

        const animal = {
          codigo_animal: String(
            formData.get("codigo_animal") ||
            formData.get("codigo_suino") ||
            ""
          )
            .trim()
            .toUpperCase(),

          data_nascimento: String(
            formData.get("data_nascimento") || ""
          ).trim(),

          raca: String(
            formData.get("raca") || ""
          ).trim(),

          sexo: String(
            formData.get("sexo") || ""
          ).trim(),

          fase: String(
            formData.get("fase") ||
            formData.get("fase_atual") ||
            formData.get("fase_vida") ||
            ""
          ).trim(),

          baia: String(
            formData.get("baia") || ""
          ).trim(),

          observacoes: String(
            formData.get("observacoes") || ""
          ).trim(),

          status: "Ativo",

          unitId:
            unitScope.unitId || "",

          unitSlug:
            unitScope.unitSlug ||
            "suinocultura",

          unitName:
            unitScope.unitName ||
            "Suinocultura",

          category:
            unitScope.category ||
            "animal",

          rawFields:
            serializeLifecycleFormData(formData)
        };

        if (
          !animal.codigo_animal ||
          !animal.data_nascimento
        ) {
          setFeedback(
            "retornoAnimalSuino",
            "Preencha os campos obrigatórios.",
            "error"
          );

          return;
        }

        try {
          const created =
            await services.lifecycle.animals.create(
              animal
            );

          animals = [created, ...animals];

          renderAll();

          animalForm.reset();

          setFeedback(
            "retornoAnimalSuino",
            "Animal cadastrado com sucesso.",
            "success"
          );
        } catch (error) {
          setFeedback(
            "retornoAnimalSuino",
            error?.message ||
            "Erro ao cadastrar animal.",
            "error"
          );
        }
      }
    );

    /* =========================================
       REGISTRAR EVENTO
    ========================================= */
    eventForm.addEventListener(
      "submit",
      async (event) => {
        event.preventDefault();

        const formData = new FormData(eventForm);
        const unitScope = context.unitScope || {};

        const animal = getAnimalById(
          formData.get("animal_id") ||
          formData.get("suino_id")
        );

        if (!animal) {
          setFeedback(
            "retornoEventoSuino",
            "Selecione um animal válido.",
            "error"
          );

          return;
        }

        const eventData = {
          animal_id: animal.id,

          animal_codigo:
            animal.codigo_animal,

          data_evento: String(
            formData.get("data_evento") || ""
          ).trim(),

          tipo_evento: String(
            formData.get("tipo_evento") || ""
          ).trim(),

          fase_vida: String(
            formData.get("fase_vida") ||
            formData.get("fase_evento") ||
            formData.get("fase_vida_evento") ||
            ""
          ).trim(),

          descricao_evento: String(
            formData.get(
              "descricao_evento"
            ) || ""
          ).trim(),

          unitId:
            unitScope.unitId || "",

          unitSlug:
            unitScope.unitSlug ||
            "suinocultura",

          unitName:
            unitScope.unitName ||
            "Suinocultura",

          category:
            unitScope.category ||
            "animal",

          rawFields:
            serializeLifecycleFormData(formData)
        };

        try {
          const created =
            await services.lifecycle.events.create(
              eventData
            );

          lifeEvents = [
            created,
            ...lifeEvents
          ];

          renderAll();

          eventForm.reset();

          setFeedback(
            "retornoEventoSuino",
            "Evento registrado com sucesso.",
            "success"
          );
        } catch (error) {
          setFeedback(
            "retornoEventoSuino",
            error?.message ||
            "Erro ao registrar evento.",
            "error"
          );
        }
      }
    );

    /* =========================================
       REGISTRAR ÓBITO
    ========================================= */
    deathForm.addEventListener(
      "submit",
      async (event) => {
        event.preventDefault();

        const formData = new FormData(deathForm);
        const unitScope = context.unitScope || {};

        const animal = getAnimalById(
          formData.get("animal_id_obito") ||
          formData.get("suino_id_obito")
        );

        if (!animal) {
          setFeedback(
            "retornoObitoSuino",
            "Selecione um animal válido.",
            "error"
          );

          return;
        }

        if (isDeadAnimal(animal)) {
          setFeedback(
            "retornoObitoSuino",
            "Esse animal já está marcado como morto.",
            "error"
          );

          return;
        }

        const deathRecord = {
          animal_id: animal.id,

          animal_codigo:
            animal.codigo_animal,

          data_obito: String(
            formData.get("data_obito") || ""
          ).trim(),

          causa_obito: String(
            formData.get("causa_obito") || ""
          ).trim(),

          categoria_causa: String(
            formData.get(
              "categoria_causa"
            ) || ""
          ).trim(),

          observacoes_obito: String(
            formData.get(
              "observacoes_obito"
            ) || ""
          ).trim(),

          unitId:
            unitScope.unitId || "",

          unitSlug:
            unitScope.unitSlug ||
            "suinocultura",

          unitName:
            unitScope.unitName ||
            "Suinocultura",

          category:
            unitScope.category ||
            "animal",

          rawFields:
            serializeLifecycleFormData(formData)
        };

        try {
          const isSlaughter = String(deathRecord.categoria_causa || "").toLowerCase() === "abate";
          const nextStatus = isSlaughter ? "Abatido" : "Morto";
          const nextPhase = isSlaughter ? "Abate" : "Óbito";
          const created =
            await services.lifecycle.deaths.create(
              deathRecord
            );

          const updatedAnimal =
            await services.lifecycle.animals.update(
              animal.id,
              {
                ...animal,
                status: nextStatus,
                fase: nextPhase,
                unitId: unitScope.unitId || animal.unitId || "",
                unitSlug: unitScope.unitSlug || animal.unitSlug || "suinocultura",
                unitName: unitScope.unitName || animal.unitName || "Suinocultura",
                category: unitScope.category || animal.category || "animal"
              }
            );

          const createdEvent =
            await services.lifecycle.events.create({
              unitId: unitScope.unitId || "",
              unitSlug: unitScope.unitSlug || "suinocultura",
              unitName: unitScope.unitName || "Suinocultura",
              category: unitScope.category || "animal",
              animal_id: animal.id,
              animal_codigo: animal.codigo_animal,
              data_evento: deathRecord.data_obito,
              tipo_evento: isSlaughter ? "Abate" : "Óbito",
              fase_vida: nextPhase,
              descricao_evento: [
                deathRecord.causa_obito,
                deathRecord.observacoes_obito
              ].filter(Boolean).join(" • "),
              rawFields: {
                ...deathRecord.rawFields,
                deathId: created.id,
                categoria_causa: deathRecord.categoria_causa
              }
            });

          deaths = [created, ...deaths];
          lifeEvents = [createdEvent, ...lifeEvents];

          animals = animals.map((item) => {
            if (
              String(item.id) ===
              String(animal.id)
            ) {
              return updatedAnimal;
            }

            return item;
          });

          renderAll();

          deathForm.reset();

          setFeedback(
            "retornoObitoSuino",
            "Óbito registrado com sucesso.",
            "success"
          );
        } catch (error) {
          setFeedback(
            "retornoObitoSuino",
            error?.message ||
            "Erro ao registrar óbito.",
            "error"
          );
        }
      }
    );

    /* =========================================
       EXCLUIR ANIMAL
    ========================================= */
    animalsTableBody.addEventListener(
      "click",
      async (event) => {
        const button = event.target.closest(
          "[data-delete-animal]"
        );

        if (!button) return;

        const animalId =
          button.dataset.deleteAnimal;

        try {
          await services.lifecycle.animals.remove(
            animalId
          );

          animals = animals.filter(
            (animal) =>
              String(animal.id) !==
              String(animalId)
          );

          renderAll();

          setFeedback(
            "retornoAnimalSuino",
            "Animal removido com sucesso.",
            "success"
          );
        } catch (error) {
          setFeedback(
            "retornoAnimalSuino",
            error?.message ||
            "Erro ao remover animal.",
            "error"
          );
        }
      }
    );

    /* =========================================
       RESET DOS FORMULÁRIOS
    ========================================= */
    animalForm.addEventListener(
      "reset",
      () => {
        window.setTimeout(() => {
          setFeedback("retornoAnimalSuino");
        }, 0);
      }
    );

    eventForm.addEventListener(
      "reset",
      () => {
        window.setTimeout(() => {
          setFeedback("retornoEventoSuino");
        }, 0);
      }
    );

    deathForm.addEventListener(
      "reset",
      () => {
        window.setTimeout(() => {
          setFeedback("retornoObitoSuino");
        }, 0);
      }
    );

    renderAll();
  }

  async function setupDashboardActionsPage() {
    const form = document.getElementById("formAcoesDashboard");
    const list = document.getElementById("listaAcoesDashboard");
    const feedback = form?.querySelector(".retorno-form");
    const submitButton = document.getElementById("btnSalvarAcao");
    const hiddenId = document.getElementById("acaoIdDashboard");
    const unitSelect = document.getElementById("unitSelect");

    if (!form || !list || !feedback || !submitButton || !hiddenId) {
      return;
    }

    let actions = await services.actions.list();

    function renderUnitOptions() {
      renderSelectOptions(unitSelect, {
        placeholderLabel: "Selecione",
        placeholderValue: "",
        options: getUnitCategoryOptions(
          actions.map((item) => item.unidade)
        )
      });
    }

    function setFeedback(message = "", type = "") {
      feedback.textContent = message;
      feedback.dataset.state = type;
    }

    function resetFormState(options = {}) {
      const { keepMessage = false } = options;
      form.reset();
      hiddenId.value = "";
      submitButton.textContent = "Salvar";
      if (!keepMessage) {
        setFeedback();
      }
    }

    function getUnitLabel(value) {
      return getUnitDisplayLabel(value);
    }

    function sortActions(items) {
      return [...items].sort((a, b) => {
        const dateA = `${a.data_acao || ""} ${formatActionTime(a.hora_acao)}`;
        const dateB = `${b.data_acao || ""} ${formatActionTime(b.hora_acao)}`;
        return dateB.localeCompare(dateA);
      });
    }

    function renderActions() {
      const sortedActions = sortActions(actions);

      if (!sortedActions.length) {
        list.innerHTML = '<p class="estado-vazio">Nenhuma ação cadastrada até o momento.</p>';
        return;
      }

      list.innerHTML = sortedActions.map((item) => `
      <article class="item-critico" data-action-id="${escapeHtml(item.id)}">
        <div>
          <strong>${escapeHtml(item.acao)}</strong>
          <span>${escapeHtml(getUnitLabel(item.unidade))} • ${escapeHtml(formatDate(item.data_acao))} às ${escapeHtml(formatActionTime(item.hora_acao))}</span>
          <small>${escapeHtml(item.detalhes_acao || "Sem observações adicionais.")}</small>
        </div>
        <div class="acoes-compra">
          <button type="button" class="btn-fantasma" data-editar-acao="${escapeHtml(item.id)}">Editar</button>
          <button type="button" class="btn-acao-tabela" data-excluir-acao="${escapeHtml(item.id)}">Excluir</button>
        </div>
      </article>
    `).join("");
    }

    function fillForm(action) {
      form.elements.acao.value = action.acao || "";
      form.elements.unidade.value = action.unidade || "";
      form.elements.data_acao.value = action.data_acao || "";
      form.elements.hora_acao.value = formatActionTime(action.hora_acao);
      form.elements.detalhes_acao.value = action.detalhes_acao || "";
      hiddenId.value = action.id;
      submitButton.textContent = "Salvar alterações";
      setFeedback(`Editando a ação de ${getUnitLabel(action.unidade)}.`, "success");
      form.elements.acao.focus();
    }

    async function handleSubmit(event) {
      event.preventDefault();

      const formData = new FormData(form);

      let hora = String(formData.get("hora_acao") || "").trim();
      if (hora.length === 5) {
        hora += ":00";
      }

      const payload = {
        acao: String(formData.get("acao") || "").trim(),
        unidade: String(formData.get("unidade") || "").trim(),
        data_acao: String(formData.get("data_acao") || "").trim(),
        hora_acao: String(formData.get("hora_acao") || "").trim().substring(0, 5),
        detalhes_acao: String(formData.get("detalhes_acao") || "").trim()
      };

      if (!payload.acao || !payload.unidade || !payload.data_acao || !payload.hora_acao) {
        setFeedback("Preencha ação, unidade, data e hora para continuar.", "error");
        return;
      }

      const editingId = hiddenId.value;

      if (editingId) {
        const updated = await services.actions.update(editingId, payload);
        actions = actions.map((item) =>
          String(item.id) === String(editingId)
            ? updated || { ...item, ...payload }
            : item
        );

        await registerAuditLog({
          type: "Ações",
          title: "Ação atualizada",
          details: `${payload.acao} em ${getUnitLabel(payload.unidade)} atualizada no painel principal.`,
          area: getUnitLabel(payload.unidade),
          status: "Concluído",
          entityType: "action",
          entityId: editingId,
          metadata: payload
        });

        setFeedback("Ação atualizada com sucesso.", "success");
      } else {
        const created = await services.actions.create(payload);

        actions = [created, ...actions];

        await registerAuditLog({
          type: "Ações",
          title: "Ação cadastrada",
          details: `${payload.acao} registrada em ${getUnitLabel(payload.unidade)}.`,
          area: getUnitLabel(payload.unidade),
          status: "Concluído",
          entityType: "action",
          entityId: created?.id,
          metadata: payload
        });

        setFeedback("Ação cadastrada com sucesso.", "success");
      }

      renderActions();
      resetFormState({ keepMessage: true });
    }

    async function handleListClick(event) {
      const editButton = event.target.closest("[data-editar-acao]");
      if (editButton) {
        const actionId = editButton.dataset.editarAcao;
        const action = actions.find((item) => String(item.id) === String(actionId));
        if (action) {
          fillForm(action);
        }
        return;
      }

      const deleteButton = event.target.closest("[data-excluir-acao]");
      if (deleteButton) {
        const actionId = deleteButton.dataset.excluirAcao;
        const action = actions.find((item) => String(item.id) === String(actionId));
        try {
          await services.actions.remove(actionId);
          actions = actions.filter((item) => String(item.id) !== String(actionId));
          await registerAuditLog({
            type: "Ações",
            title: "Ação excluída",
            details: action?.acao ? `${action.acao} removida do painel principal.` : "Ação removida do painel principal.",
            area: getUnitLabel(action?.unidade),
            status: "Concluído",
            entityType: "action",
            entityId: actionId
          });

          if (hiddenId.value === String(actionId)) {
            resetFormState();
          }

          renderActions();
          setFeedback("Ação excluída com sucesso.", "success");
        } catch (error) {
          if (error?.status === 404) {
            actions = actions.filter((item) => String(item.id) !== String(actionId));
            if (hiddenId.value === String(actionId)) {
              resetFormState();
            }
            renderActions();
            setFeedback("A ação já não existia mais no servidor e foi removida da lista local.", "success");
            return;
          }

          setFeedback(error?.message || "Não foi possível excluir a ação.", "error");
        }
      }
    }

    form.addEventListener("submit", handleSubmit);
    form.addEventListener("reset", () => {
      window.setTimeout(() => resetFormState(), 0);
    });
    list.addEventListener("click", handleListClick);

    renderUnitOptions();
    renderActions();
  }

  async function setupUnitActionsPage() {
    const unitPage = document.querySelector("main[data-unidade]");
    if (!unitPage) {
      return;
    }

    let form = document.getElementById("formAcaoUnidade");
    let tableBody = document.getElementById("corpoTabelaAcoesUnidade");
    let tag = document.getElementById("tagAcoesUnidade");
    let feedback = document.getElementById("retornoAcaoUnidade");
    let unitKey = unitPage.dataset.unidade || "";

    if (!form || !tableBody || !feedback) {
      const section = document.createElement("section");
      section.className = "compras-grid compras-grid-piscicultura";
      section.innerHTML = `
      <article class="painel-compras painel-form-compras">
        <div class="cabecalho-secao">
          <div>
            <p class="sobrelinha-secao">Registro de campo</p>
            <h3>Registrar uma ação</h3>
          </div><span class="tag-secao">${escapeHtml(getUnitDisplayLabel(unitKey))}</span>
        </div>

        <form class="form-compra" id="formAcaoUnidade" data-unidade-acao="${escapeHtml(unitKey)}">
          <input type="hidden" name="unidade" value="${escapeHtml(unitKey)}">
          <div class="grade-campos">
            <label>
              Ação realizada
              <input type="text" name="acao" placeholder="Ex.: manejo, vistoria, vacinação, limpeza..." required>
            </label>
            <label>
              Nome de quem fez
              <input type="text" name="performerName" placeholder="Ex.: Maria Silva" required>
            </label>
            <label>
              Data
              <input type="date" name="data_acao" required>
            </label>
            <label>
              Hora
              <input type="time" name="hora_acao" step="60" required>
            </label>
          </div>

          <label>
            Observações
            <textarea name="detalhes_acao" rows="3" placeholder="Descreva a ação planejada ou executada."></textarea>
          </label>

          <p class="retorno-form" id="retornoAcaoUnidade" aria-live="polite"></p>

          <div class="acoes-compra">
            <button type="reset" class="btn-fantasma">Limpar</button>
            <button type="submit" class="btn-acao-primaria">Registrar ação</button>
          </div>
        </form>
      </article>

      <article class="painel-compras">
        <div class="cabecalho-secao">
          <div>
            <p class="sobrelinha-secao">Histórico operacional</p>
            <h3>Ações registradas</h3>
          </div><span class="tag-secao" id="tagAcoesUnidade">0 ações</span>
        </div>
        <div class="caixa-tabela">
          <table class="tabela-compra">
            <thead>
              <tr>
                <th>Ação</th>
                <th>Responsável</th>
                <th>Data</th>
                <th>Hora</th>
                <th>Observações</th>
              </tr>
            </thead>
            <tbody id="corpoTabelaAcoesUnidade"></tbody>
          </table>
        </div>
      </article>
    `;

      const insertionReference = unitPage.querySelector(".tabela-gestao-vendas") || unitPage.lastElementChild;
      if (insertionReference) {
        insertionReference.before(section);
      } else {
        unitPage.appendChild(section);
      }

      form = document.getElementById("formAcaoUnidade");
      tableBody = document.getElementById("corpoTabelaAcoesUnidade");
      tag = document.getElementById("tagAcoesUnidade");
      feedback = document.getElementById("retornoAcaoUnidade");
    }

    if (!form || !tableBody || !feedback) {
      return;
    }

    unitKey = form.dataset.unidadeAcao || form.elements.unidade?.value || unitKey;
    let actions = await services.actions.list();

    function setFeedback(message = "", type = "") {
      feedback.textContent = message;
      feedback.dataset.state = type;
    }

    function sortActions(items) {
      return [...items].sort((a, b) => {
        const dateA = `${a.data_acao || ""} ${formatActionTime(a.hora_acao)}`;
        const dateB = `${b.data_acao || ""} ${formatActionTime(b.hora_acao)}`;
        return dateB.localeCompare(dateA);
      });
    }

    function getUnitActions() {
      return sortActions(actions.filter((item) => item.unidade === unitKey));
    }

    function renderActionsTable() {
      const unitActions = getUnitActions();

      if (tag) {
        tag.textContent = `${unitActions.length} ${unitActions.length === 1 ? "ação" : "ações"}`;
      }

      if (!unitActions.length) {
        tableBody.innerHTML = `
        <tr>
          <td colspan="5" class="linha-vazia">Nenhuma ação registrada para esta unidade.</td>
        </tr>
      `;
        return;
      }

      tableBody.innerHTML = unitActions.map((item) => `
      <tr>
        <td><strong>${escapeHtml(item.acao)}</strong></td>
        <td>${escapeHtml(item.performerName || "Não informado")}</td>
        <td>${escapeHtml(formatDate(item.data_acao))}</td>
        <td>${escapeHtml(formatActionTime(item.hora_acao))}</td>
        <td><small>${escapeHtml(item.detalhes_acao || "Sem observações adicionais.")}</small></td>
      </tr>
    `).join("");
    }

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      const payload = {
        acao: String(formData.get("acao") || "").trim(),
        unidade: unitKey,
        performerName: String(formData.get("performerName") || "").trim(),
        data_acao: String(formData.get("data_acao") || "").trim(),
        hora_acao: String(formData.get("hora_acao") || "").trim(),
        detalhes_acao: String(formData.get("detalhes_acao") || "").trim()
      };

      if (!payload.acao || !payload.performerName || !payload.data_acao || !payload.hora_acao) {
        setFeedback("Preencha ação, responsável, data e hora para registrar.", "error");
        return;
      }

      try {
        const created = await services.actions.create(payload);
        actions = [created, ...actions];
        await registerAuditLog({
          type: "Ações",
          title: "Ação registrada",
          details: `${payload.acao} registrada na unidade ${unitKey}.`,
          area: unitKey,
          status: "Concluído",
          entityType: "action",
          entityId: created?.id,
          metadata: payload
        });
        renderActionsTable();
        form.reset();
        form.elements.unidade.value = unitKey;
        setFeedback("Ação registrada com sucesso.", "success");
      } catch (error) {
        setFeedback(error?.message || "Não foi possível registrar a ação.", "error");
      }
    });

    form.addEventListener("reset", () => {
      window.setTimeout(() => {
        form.elements.unidade.value = unitKey;
        setFeedback();
      }, 0);
    });

    renderActionsTable();
  }

  async function setupDashboardOverviewPage() {
    const heroTag = document.getElementById("dashboardHeroTag");
    const heroText = document.getElementById("dashboardHeroText");
    const heroList = document.getElementById("dashboardHeroList");
    const unitsValue = document.getElementById("dashboardUnitsValue");
    const unitsLabel = document.getElementById("dashboardUnitsLabel");
    const alertsValue = document.getElementById("dashboardAlertsValue");
    const alertsLabel = document.getElementById("dashboardAlertsLabel");
    const ordersValue = document.getElementById("dashboardOrdersValue");
    const ordersLabel = document.getElementById("dashboardOrdersLabel");
    const performanceList = document.getElementById("dashboardPerformanceList");
    const alertsList = document.getElementById("dashboardAlertsList");
    const miniUnits = document.getElementById("dashboardMiniCardUnits");
    const miniAlerts = document.getElementById("dashboardMiniCardAlerts");
    const miniRevenue = document.getElementById("dashboardMiniCardRevenue");

    if (!heroTag || !heroText || !heroList) {
      return;
    }

    const snapshot = getAssistantSnapshot();
    const totalUnits = snapshot.units.length;
    const unreadNotifications = snapshot.notifications.filter((item) => !item.read);
    const totalEvents = snapshot.actions.length + snapshot.purchases.length + snapshot.sales.length;
    const totalRevenue = snapshot.sales.reduce((sum, item) => sum + Number(item.quantidade) * Number(item.valor_unitario), 0);
    const topSupplyRisk = snapshot.supplies
      .filter((item) => Number(item.stock) <= Number(item.minStock))
      .sort((a, b) => Number(a.stock) - Number(b.stock))[0];
    const latestAction = [...snapshot.actions].sort((a, b) => `${b.data_acao} ${formatActionTime(b.hora_acao)}`.localeCompare(`${a.data_acao} ${formatActionTime(a.hora_acao)}`))[0];
    const materialsInMaintenance = snapshot.materials.filter((item) => item.status === "Em manutencao");

    heroTag.textContent = unreadNotifications.length ? "Atenção operacional" : "Operação estável";
    heroText.textContent = `Hoje o CampoSync acompanha ${totalUnits.toLocaleString("pt-BR")} unidades, ${snapshot.supplies.length.toLocaleString("pt-BR")} suprimentos e ${snapshot.materials.length.toLocaleString("pt-BR")} ferramentas com visão centralizada da rotina.`;

    heroList.innerHTML = [
      `${unreadNotifications.length.toLocaleString("pt-BR")} alertas pendentes no painel de notificações.`,
      latestAction ? `Última ação registrada: ${latestAction.acao} em ${formatDate(latestAction.data_acao)} às ${formatActionTime(latestAction.hora_acao)}.` : "Nenhuma ação operacional lançada até o momento.",
      topSupplyRisk ? `Maior risco de estoque no momento: ${topSupplyRisk.product} com ${topSupplyRisk.stock} unidade(s) disponível(is).` : "Sem itens em nível crítico no estoque de suprimentos."
    ].map((text) => `<li><strong>Resumo</strong>${escapeHtml(text)}</li>`).join("");

    if (unitsValue) unitsValue.textContent = String(totalUnits);
    if (unitsLabel) unitsLabel.textContent = `${snapshot.units.filter((item) => item.type === "default").length} padrão e ${snapshot.units.filter((item) => item.type === "custom").length} personalizadas.`;
    if (alertsValue) alertsValue.textContent = String(unreadNotifications.length);
    if (alertsLabel) alertsLabel.textContent = unreadNotifications.length ? "Alertas não lidos e itens críticos em estoque." : "Sem pendências críticas abertas no momento.";
    if (ordersValue) ordersValue.textContent = String(totalEvents);
    if (ordersLabel) ordersLabel.textContent = `${snapshot.purchases.length} compras, ${snapshot.sales.length} vendas e ${snapshot.actions.length} ações lançadas.`;

    if (miniUnits) {
      miniUnits.innerHTML = `<strong>${totalUnits}</strong><p>unidades em operação acompanhadas no painel.</p>`;
    }
    if (miniAlerts) {
      miniAlerts.innerHTML = `<strong>${unreadNotifications.length}</strong><p>alertas não lidos e ${materialsInMaintenance.length} material(is) em manutenção.</p>`;
    }
    if (miniRevenue) {
      miniRevenue.innerHTML = `<strong>${formatCurrency(totalRevenue)}</strong><p>faturamento consolidado a partir das vendas registradas.</p>`;
    }

    if (performanceList) {
      const groupedSales = snapshot.sales.reduce((acc, item) => {
        acc[item.categoria] = (acc[item.categoria] || 0) + Number(item.quantidade);
        return acc;
      }, {});
      const rankedSales = Object.entries(groupedSales).sort((a, b) => b[1] - a[1]).slice(0, 3);

      performanceList.innerHTML = rankedSales.map(([label, total]) => `
      <article class="item-critico">
        <div>
          <strong>${escapeHtml(label)}</strong>
          <span>Categoria com maior saída consolidada nas vendas registradas.</span>
        </div>
        <div class="metrica-critica">
          <b>${escapeHtml(String(total))}</b>
          <small>unidades</small>
        </div>
      </article>
    `).join("");
    }

    if (alertsList) {
      const alertItems = [
        ...unreadNotifications.map((item) => ({
          title: item.title,
          description: item.message,
          metric: item.time || "Hoje"
        })),
        ...snapshot.supplies
          .filter((item) => Number(item.stock) <= Number(item.minStock))
          .map((item) => ({
            title: item.product,
            description: `Estoque em ${item.stock} com mínimo recomendado de ${item.minStock}.`,
            metric: "Estoque"
          }))
      ].slice(0, 4);

      alertsList.innerHTML = alertItems.map((item) => `
      <article class="item-critico">
        <div>
          <strong>${escapeHtml(item.title)}</strong>
          <span>${escapeHtml(item.description)}</span>
        </div>
        <div class="metrica-critica">
          <b>${escapeHtml(item.metric)}</b>
          <small>prioridade</small>
        </div>
      </article>
    `).join("");
    }
  }

  /* ==============================
     INTERFACE GERAL
  ============================== */
  async function setupInterface() {
    const btnSino = document.getElementById("btnSino");
    const painelAlertas = document.getElementById("painelAlertas");
    const listaNotif = document.getElementById("listaNotif");
    const badge = document.getElementById("badge");
    const btnMarcarTudoLido = document.getElementById("btnMarcarTudoLido");
    const btnAlternarTema = document.getElementById("btnAlternarTema");
    const rotuloTema = document.getElementById("rotuloTema");
    const addUnitButton = document.getElementById("btnCadUnd");
    const sobreposicaoUnidade = document.getElementById("sobreposicaoUnidade");
    const modalUnidade = document.getElementById("modalUnidade");
    const formUnidade = document.getElementById("formUnidade");
    const nomeUnidadeInput = document.getElementById("nomeUnidade");
    const categoriaUnidadeInput = document.getElementById("categoriaUnidade");
    const latitudeUnidadeInput = document.getElementById("latitudeUnidade");
    const longitudeUnidadeInput = document.getElementById("longitudeUnidade");
    const mensagemFormUnidade = document.getElementById("mensagemFormUnidade");
    const btnFecharModalUnidadeButton = document.getElementById("btnFecharModalUnidade");
    const btnCancelarModalUnidadeButton = document.getElementById("btnCancelarModalUnidade");
    const modalUnidadeEyebrow = document.querySelector(".sobrelinha-modal-und");
    const tituloModalUnidade = document.getElementById("tituloModalUnidade");
    const unitSubmitButton = formUnidade?.querySelector(".btn-primario-und");
    const cardsContainer = document.querySelector(".cards");
    const imagemUnidade = document.getElementById("imagemUnidade");
    const prevImagem = document.getElementById("prevImagem");

    let notifications = [];
    let customUnits = [];
    let knownUnreadNotificationIds = new Set();
    let notificationAudioAllowed = false;
    let notificationAudioContext = null;
    let isSavingUnit = false;
    const shouldLoadNotifications = Boolean(btnSino || painelAlertas || listaNotif || badge);
    const shouldLoadCustomUnits = Boolean(cardsContainer || addUnitButton || formUnidade);

    function allowNotificationAudio() {
      notificationAudioAllowed = true;
    }

    async function playNotificationSound() {
      if (!notificationAudioAllowed) return;

      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;

      if (!notificationAudioContext) {
        notificationAudioContext = new AudioContextClass();
      }

      if (notificationAudioContext.state === "suspended") {
        await notificationAudioContext.resume();
      }

      const oscillator = notificationAudioContext.createOscillator();
      const gainNode = notificationAudioContext.createGain();
      const now = notificationAudioContext.currentTime;

      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(880, now);
      oscillator.frequency.exponentialRampToValueAtTime(1240, now + 0.18);

      gainNode.gain.setValueAtTime(0.0001, now);
      gainNode.gain.exponentialRampToValueAtTime(0.16, now + 0.03);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + 0.38);

      oscillator.connect(gainNode);
      gainNode.connect(notificationAudioContext.destination);
      oscillator.start(now);
      oscillator.stop(now + 0.4);
    }

    let editingCard = null;

    function setUnitFormMessage(message = "", type = "") {
      if (!mensagemFormUnidade) return;
      mensagemFormUnidade.textContent = message;
      mensagemFormUnidade.dataset.state = type;
    }

    function getUnitActionErrorMessage(error, fallback = "Nao foi possivel concluir a operacao.") {
      if (error?.status === 401) {
        return "Sua sessão expirou. Faça login novamente para continuar.";
      }

      return error?.message || fallback;
    }

    function setUnitFormBusy(isBusy) {
      isSavingUnit = Boolean(isBusy);
      if (unitSubmitButton) {
        unitSubmitButton.disabled = isSavingUnit;
        unitSubmitButton.textContent = isSavingUnit
          ? "Salvando..."
          : (editingCard ? "Salvar alterações" : "Cadastrar");
      }
    }

    function updateBadge() {
      if (!badge) return;
      const unreadCount = notifications.filter((notification) => !notification.read).length;
      badge.textContent = String(unreadCount);
      badge.hidden = unreadCount === 0;
    }

    function renderNotifications() {
      if (!listaNotif) return;
      listaNotif.innerHTML = "";
      const unreadNotifications = notifications.filter((notification) => !notification.read);

      if (!unreadNotifications.length) {
        listaNotif.innerHTML = '<p class="notif-vazia">Nenhum alerta no momento.</p>';
        updateBadge();
        return;
      }

      unreadNotifications.forEach((notification) => {
        const item = document.createElement("article");
        item.className = `item-notif${notification.read ? " esta-lido" : ""}`;
        item.innerHTML = `
        <strong>${escapeHtml(notification.title)}</strong>
        <p>${escapeHtml(notification.message)}</p>
        <small>${escapeHtml(notification.time)}</small>
      `;

        item.addEventListener("click", async () => {
          await services.notifications.markRead(notification.id);
          notifications = notifications.map((entry) => (
            entry.id === notification.id ? { ...entry, read: true } : entry
          ));
          await registerAuditLog({
            type: "Alertas",
            title: "Alerta marcado como lido",
            details: `${notification.title} foi marcado como lido.`,
            area: "Notificações",
            status: "Concluído",
            entityType: "notification",
            entityId: notification.id,
            metadata: {
              title: notification.title,
              time: notification.time
            }
          });
          renderNotifications();
        });

        listaNotif.appendChild(item);
      });

      updateBadge();
    }

    async function refreshNotifications() {
      if (!shouldLoadNotifications) return;
      const nextNotifications = await services.notifications.list();
      const nextUnreadIds = new Set(
        nextNotifications.filter((notification) => !notification.read).map((notification) => String(notification.id))
      );
      const hasNewUnreadNotification = [...nextUnreadIds].some((id) => !knownUnreadNotificationIds.has(id));
      notifications = nextNotifications;
      knownUnreadNotificationIds = nextUnreadIds;
      renderNotifications();
      if (hasNewUnreadNotification) {
        try {
          await playNotificationSound();
        } catch (error) {
          reportClientIssue("Nao foi possivel tocar o som da notificacao.", error);
        }
      }
    }

    async function loadInitialInterfaceData() {
      if (shouldLoadNotifications) {
        notifications = await services.notifications.list();
        knownUnreadNotificationIds = new Set(
          notifications.filter((notification) => !notification.read).map((notification) => String(notification.id))
        );
        renderNotifications();
      }

      if (shouldLoadCustomUnits) {
        try {
          customUnits = await services.units.listCustom();
          if (customUnits.length > 0) {
            renderSavedUnits();
          }
        } catch (error) {
          reportClientIssue("Failed to load units.", error, "warn");
        }
      }
    }

    function prependNotification(title, message) {
      const notification = {
        id: Date.now(),
        title,
        message,
        time: nowTimeLabel(),
        read: false
      };

      notifications = services.notifications.prependLocal(notification);
      renderNotifications();
    }

    function togglePanel(forceOpen) {
      if (!painelAlertas || !btnSino) return;
      const shouldOpen = typeof forceOpen === "boolean" ? forceOpen : !painelAlertas.classList.contains("esta-aberto");
      painelAlertas.classList.toggle("esta-aberto", shouldOpen);
      btnSino.setAttribute("aria-expanded", String(shouldOpen));
    }

    async function markAllAsRead() {
      await services.notifications.markAllRead();
      notifications = notifications.map((notification) => ({ ...notification, read: true }));
      await registerAuditLog({
        type: "Alertas",
        title: "Todos os alertas marcados como lidos",
        details: `${notifications.length} alerta(s) foram marcados como lidos.`,
        area: "Notificações",
        status: "Concluído",
        entityType: "notification_batch"
      });
      renderNotifications();
    }

    function applyTheme(theme) {
      const isDark = theme === "dark";
      document.body.classList.toggle("modo-escuro", isDark);

      if (btnAlternarTema) {
        btnAlternarTema.classList.toggle("esta-ativo", isDark);
        btnAlternarTema.setAttribute("aria-pressed", String(isDark));
      }

      if (rotuloTema) {
        rotuloTema.textContent = isDark ? "Modo Claro" : "Modo Escuro";
      }

      configureChartTheme();
      localStorage.setItem(STORAGE_KEYS.theme, theme);
    }

    function toggleTheme() {
      const nextTheme = document.body.classList.contains("modo-escuro") ? "light" : "dark";
      applyTheme(nextTheme);
    }

    function buildCardActions() {
      return `
      <div class="menu-card-area">
        <button class="btn-menu-card" type="button" aria-label="Mais opções da unidade" aria-expanded="false"></button>
        <div class="acoes-card-area">
          <button type="button" class="btn-editar-und">Editar</button>
          <button type="button" class="btn-remover-und">Remover</button>
        </div>
      </div>
    `;
    }

    function closeCardMenus(exceptMenu = null) {
      if (!cardsContainer) return;

      cardsContainer.querySelectorAll(".menu-card-area").forEach((menu) => {
        const shouldStayOpen = exceptMenu && menu === exceptMenu;
        menu.classList.toggle("esta-aberto", shouldStayOpen);

        const parentCard = menu.closest(".card");
        if (parentCard) {
          parentCard.style.zIndex = shouldStayOpen ? "10" : "";
        }

        const toggleButton = menu.querySelector(".btn-menu-card");
        if (toggleButton) {
          toggleButton.setAttribute("aria-expanded", String(shouldStayOpen));
        }
      });
    }

    function bindCardMenuEvents(card) {
      const editBtn = card.querySelector(".btn-editar-und");
      const removeBtn = card.querySelector(".btn-remover-und");

      editBtn?.addEventListener("click", (event) => {
        event.stopPropagation();
        closeCardMenus();
        openUnitModal(card);
      });

      removeBtn?.addEventListener("click", async (event) => {
        event.stopPropagation();
        await removeUnit(removeBtn);
      });
    }

    cardsContainer?.addEventListener("click", (event) => {
      const menuBtn = event.target.closest(".btn-menu-card");
      if (!menuBtn || !cardsContainer.contains(menuBtn)) return;

      event.preventDefault();
      event.stopPropagation();

      const cardMenu = menuBtn.closest(".menu-card-area");
      const willOpen = cardMenu && !cardMenu.classList.contains("esta-aberto");
      closeCardMenus(willOpen ? cardMenu : null);
    });

    function createUnitCard(unit) {
      const unitName = unit.name || unit.nome || "Unidade produtiva";
      const unitSlug = unit.slug || slugify(unitName);
      const unitCategory = getProductionUnitCategory(unit);
      const pageSlug = unit.pageSlug || (unit.isDefault ? unitSlug : "unidade_produtiva");
      const href = pageSlug === "unidade_produtiva"
        ? `unidade_produtiva.html?id=${encodeURIComponent(unit.id || unitSlug)}`
        : `${pageSlug}.html`;
      const card = document.createElement("div");
      card.className = "card card-areas-produtivas";
      card.dataset.nomeUnidade = unitName.toLowerCase();
      card.dataset.unitType = unit.id ? "managed" : (unit.type || "custom");
      card.dataset.unitId = unit.id || "";
      card.dataset.unitKey = unit.id ? `custom-${unit.id}` : `custom-${unitSlug}`;
      card.dataset.category = unitCategory;
      card.dataset.image = unit.image || "";
      card.dataset.lat = unit.lat ?? unit.latitude ?? "";
      card.dataset.lng = unit.lng ?? unit.longitude ?? "";
      card.dataset.isDefault = unit.isDefault ? "true" : "false";
      card.innerHTML = `
      ${buildCardActions()}
      <img class="midia-card" src="" alt="">
      <div class="conteudo-card">
        <h3 class="titulo-card">${escapeHtml(unitName)}</h3>
        <span class="tag-secao">${getUnitCategoryLabel(unitCategory)}</span>
        <a class="link-acao-card" href="${escapeHtml(href)}">Entrar</a>
      </div>
    `;
      applyCardImage(card.querySelector(".midia-card"), unitName, unitSlug, unit.image || "");
      bindCardMenuEvents(card);
      return card;
    }

    function renderSavedUnits() {
      if (!cardsContainer) return;
      cardsContainer.innerHTML = "";
      customUnits.forEach((unit) => {
        cardsContainer.appendChild(createUnitCard({ ...unit, type: unit.isDefault ? "default" : "custom" }));
      });
    }

    function decorateDefaultCards() {
      if (!cardsContainer) return;

      cardsContainer.querySelectorAll(".card").forEach((card) => {
        const title = card.querySelector("h3");
        if (!title) return;

        card.classList.add("card-areas-produtivas");
        const nomeUnidade = title.textContent.trim();
        const normalizedName = nomeUnidade.toLowerCase();
        const cardLink = card.querySelector(".link-acao-card, a");
        const unitKey = card.dataset.unitKey || cardLink?.getAttribute("href") || normalizedName;

        card.dataset.unitKey = unitKey;
        card.dataset.nomeUnidade = normalizedName;
        card.dataset.unitType = card.dataset.unitType || "default";
        card.dataset.category = card.dataset.category || getProductionUnitCategory({
          name: nomeUnidade,
          slug: String(cardLink?.getAttribute("href") || "").replace(/\.html(?:.*)?$/i, "")
        });
        title.classList.add("titulo-card");

        const image = card.querySelector("img");
        if (image) {
          image.classList.add("midia-card");
          applyCardImage(image, nomeUnidade, cardLink?.getAttribute("href") || "", image.getAttribute("src") || card.dataset.image || "");
        }

        let cardContent = card.querySelector(".conteudo-card");
        if (!cardContent) {
          cardContent = document.createElement("div");
          cardContent.className = "conteudo-card";

          if (image && image.nextSibling) {
            card.insertBefore(cardContent, image.nextSibling);
          } else {
            card.appendChild(cardContent);
          }

          cardContent.appendChild(title);
        }

        if (!card.querySelector(".menu-card-area")) {
          card.insertAdjacentHTML("afterbegin", buildCardActions());
        }
        bindCardMenuEvents(card);
      });
    }

    function unitAlreadyExists(nomeUnidade, ignoredCard = null) {
      if (!cardsContainer) return false;
      const normalizedName = nomeUnidade.trim().toLowerCase();

      return Array.from(cardsContainer.querySelectorAll(".card")).some((card) => {
        if (ignoredCard && card === ignoredCard) return false;
        const title = card.querySelector("h3");
        return title?.textContent.trim().toLowerCase() === normalizedName;
      });
    }

    function readUnitCoordinates() {
      const rawLat = String(latitudeUnidadeInput?.value || "").trim();
      const rawLng = String(longitudeUnidadeInput?.value || "").trim();
      const lat = rawLat ? Number(rawLat) : null;
      const lng = rawLng ? Number(rawLng) : null;

      if ((rawLat && !Number.isFinite(lat)) || (rawLng && !Number.isFinite(lng))) {
        return { error: "Informe coordenadas numericas validas." };
      }

      if ((lat == null) !== (lng == null)) {
        return { error: "Preencha latitude e longitude juntas para aparecer no mapa." };
      }

      if (lat != null && (lat < -90 || lat > 90)) {
        return { error: "Latitude deve ficar entre -90 e 90." };
      }

      if (lng != null && (lng < -180 || lng > 180)) {
        return { error: "Longitude deve ficar entre -180 e 180." };
      }

      return { lat, lng };
    }

    function setUnitModalMode(mode = "create", card = null) {
      editingCard = mode === "edit" ? card : null;

      if (modalUnidadeEyebrow) {
        modalUnidadeEyebrow.textContent = mode === "edit" ? "Editar unidade" : "Nova unidade";
      }

      if (tituloModalUnidade) {
        tituloModalUnidade.textContent = mode === "edit" ? "Editar unidade produtiva" : "Cadastrar unidade produtiva";
      }

      if (unitSubmitButton) {
        unitSubmitButton.textContent = mode === "edit" ? "Salvar alterações" : "Cadastrar";
      }
    }

    function openUnitModal(card = null) {
      if (!sobreposicaoUnidade || !modalUnidade || !nomeUnidadeInput) return;
      setUnitFormMessage();
      setUnitModalMode(card ? "edit" : "create", card);

      formUnidade?.reset();

      if (card) {
        const currentName = card.querySelector("h3")?.textContent.trim() || "";
        nomeUnidadeInput.value = currentName;
        if (categoriaUnidadeInput) {
          categoriaUnidadeInput.value = card.dataset.category || "planta";
        }
        if (latitudeUnidadeInput) {
          latitudeUnidadeInput.value = card.dataset.lat || "";
        }
        if (longitudeUnidadeInput) {
          longitudeUnidadeInput.value = card.dataset.lng || "";
        }
        if (prevImagem) {
          const currentImage = card.querySelector(".midia-card")?.getAttribute("src") || "";
          if (currentImage) {
            prevImagem.src = currentImage;
            prevImagem.style.display = "block";
          }
        }
      }

      if (prevImagem && !card) {
        prevImagem.style.display = "none";
        prevImagem.removeAttribute("src");
      }

      sobreposicaoUnidade.hidden = false;
      modalUnidade.setAttribute("aria-hidden", "false");
      nomeUnidadeInput.focus();
      nomeUnidadeInput.select();
    }

    function closeUnitModal() {
      if (!sobreposicaoUnidade || !modalUnidade || !formUnidade) return;
      sobreposicaoUnidade.hidden = true;
      modalUnidade.setAttribute("aria-hidden", "true");
      formUnidade.reset();
      setUnitFormMessage();
      setUnitModalMode("create");
    }

    window.abrirCadastroUnidadeProdutiva = () => openUnitModal();
    window.abrirEdicaoUnidadeProdutiva = (target) => {
      const card = target?.closest?.(".card") || target;
      if (card?.classList?.contains("card")) {
        openUnitModal(card);
      }
    };
    window.fecharCadastroUnidadeProdutiva = closeUnitModal;

    async function saveEditedUnit(card, nextName) {
      const title = card.querySelector("h3");
      const actionLink = card.querySelector(".link-acao-card");
      const imageElement = card.querySelector(".midia-card");
      const categoryTag = card.querySelector(".tag-secao");
      const previousLabel = title?.textContent.trim() || "Unidade";
      const selectedFile = imagemUnidade?.files?.[0] || null;
      const nextCategory = categoriaUnidadeInput?.value || card.dataset.category || "planta";
      const coordinates = readUnitCoordinates();
      const isDefaultUnit = card.dataset.isDefault === "true";
      let nextImage = card.dataset.image || imageElement?.getAttribute("src") || "";
      let updatedUnit = null;

      if (!title) return;
      if (coordinates.error) {
        setUnitFormMessage(coordinates.error, "error");
        return;
      }

      if (selectedFile) {
        nextImage = await readFileAsDataUrl(selectedFile);
      }

      const unitId = card.dataset.unitId;
      if (unitId) {
        updatedUnit = await services.units.updateCustom(unitId, {
          name: nextName,
          ...(isDefaultUnit ? {} : { slug: slugify(nextName) }),
          category: nextCategory,
          lat: coordinates.lat,
          lng: coordinates.lng,
          latitude: coordinates.lat,
          longitude: coordinates.lng,
          image: nextImage
        });

        if (updatedUnit) {
          title.textContent = updatedUnit.name || updatedUnit.nome || nextName;
          card.dataset.unitId = updatedUnit.id || unitId;
          card.dataset.unitKey = `custom-${updatedUnit.id || updatedUnit.slug}`;
          card.dataset.image = updatedUnit.image || nextImage;
          card.dataset.category = getProductionUnitCategory(updatedUnit);
          card.dataset.lat = updatedUnit.lat ?? updatedUnit.latitude ?? coordinates.lat ?? "";
          card.dataset.lng = updatedUnit.lng ?? updatedUnit.longitude ?? coordinates.lng ?? "";
          card.dataset.nomeUnidade = String(updatedUnit.name || updatedUnit.nome || nextName).trim().toLowerCase();
          if (categoryTag) {
            categoryTag.textContent = getUnitCategoryLabel(card.dataset.category);
          }
          if (actionLink) {
            const href = updatedUnit.pageSlug === "unidade_produtiva"
              ? `unidade_produtiva.html?id=${encodeURIComponent(updatedUnit.id || updatedUnit.slug)}`
              : `${updatedUnit.pageSlug || updatedUnit.slug}.html`;
            actionLink.setAttribute("href", href);
          }
          applyCardImage(imageElement, nextName, `${updatedUnit.slug}.html`, updatedUnit.image || nextImage);
        }
        await registerAuditLog({
          type: "Unidades",
          title: "Unidade atualizada",
          details: `A unidade ${previousLabel} foi atualizada para ${nextName}.`,
          area: "Áreas produtivas",
          status: "Concluído",
          entityType: "unit",
          entityId: updatedUnit?.id || unitId,
          metadata: {
            previousLabel,
            nextName,
            category: nextCategory
          }
        });
      } else {
        title.textContent = nextName;
        card.dataset.nomeUnidade = nextName.trim().toLowerCase();
        card.dataset.category = nextCategory;
        card.dataset.lat = coordinates.lat ?? "";
        card.dataset.lng = coordinates.lng ?? "";
        card.dataset.image = nextImage;
        if (categoryTag) {
          categoryTag.textContent = getUnitCategoryLabel(nextCategory);
        }
        applyCardImage(imageElement, nextName, actionLink?.getAttribute("href") || "", nextImage);
        await registerAuditLog({
          type: "Unidades",
          title: "Unidade atualizada localmente",
          details: `A unidade ${previousLabel} foi atualizada na interface para ${nextName}.`,
          area: "Áreas produtivas",
          status: "Concluído",
          entityType: "unit",
          entityId: card.dataset.unitKey,
          metadata: {
            previousLabel,
            nextName,
            category: nextCategory
          }
        });
      }

      prependNotification("Unidade atualizada", `A unidade ${previousLabel} foi renomeada para ${nextName}.`);
    }

    async function addUnit(event) {
      event.preventDefault();
      if (!nomeUnidadeInput || !cardsContainer || isSavingUnit) return;

      const cleanName = nomeUnidadeInput.value.trim();
      const selectedCategory = categoriaUnidadeInput?.value || "";
      const selectedFile = imagemUnidade?.files?.[0] || null;
      const coordinates = readUnitCoordinates();
      if (!cleanName) {
        setUnitFormMessage("Digite o nome da unidade para continuar.", "error");
        nomeUnidadeInput.focus();
        return;
      }

      if (!["animal", "planta"].includes(selectedCategory)) {
        setUnitFormMessage("Escolha a categoria animal ou flora para continuar.", "error");
        categoriaUnidadeInput?.focus();
        return;
      }

      if (coordinates.error) {
        setUnitFormMessage(coordinates.error, "error");
        return;
      }

      if (unitAlreadyExists(cleanName, editingCard)) {
        setUnitFormMessage("Essa unidade já existe na lista. Escolha outro nome.", "error");
        nomeUnidadeInput.focus();
        nomeUnidadeInput.select();
        return;
      }

      setUnitFormBusy(true);
      setUnitFormMessage(editingCard ? "Salvando alterações..." : "Cadastrando unidade...", "info");

      try {
        if (editingCard) {
          await saveEditedUnit(editingCard, cleanName);
          closeUnitModal();
          return;
        }

        const imageData = selectedFile ? await readFileAsDataUrl(selectedFile) : "";
        const unit = await services.units.createCustom({
          name: cleanName,
          slug: slugify(cleanName),
          pageSlug: "unidade_produtiva",
          category: selectedCategory,
          type: "custom",
          lat: coordinates.lat,
          lng: coordinates.lng,
          latitude: coordinates.lat,
          longitude: coordinates.lng,
          image: imageData
        });

        customUnits = [unit, ...customUnits];
        cardsContainer.appendChild(createUnitCard(unit));
        await registerAuditLog({
          type: "Unidades",
          title: "Unidade criada",
          details: `A unidade ${cleanName} foi criada na categoria ${selectedCategory === "animal" ? "animal" : "flora"}.`,
          area: "Áreas produtivas",
          status: "Concluído",
          entityType: "unit",
          entityId: unit?.id,
          metadata: {
            name: cleanName,
            category: selectedCategory
          }
        });
        prependNotification("Nova unidade criada", `A unidade ${cleanName} foi adicionada a lista de areas produtivas.`);
        closeUnitModal();
      } catch (error) {
        setUnitFormMessage(getUnitActionErrorMessage(error, "Nao foi possivel salvar a unidade."), "error");
      } finally {
        setUnitFormBusy(false);
      }
    }

    async function removeUnit(button) {
      const card = button.closest(".card");
      if (!card) return;

      const unitLabel = card.querySelector("h3")?.textContent.trim() || "Unidade";
      const unitId = card.dataset.unitId;
      const isDefaultUnit = card.dataset.isDefault === "true";

      if (unitId && isDefaultUnit) {
        prependNotification("Operação não permitida", "As unidades padrão não podem ser removidas.");
        closeCardMenus();
        return;
      }

      if (unitId) {
        try {
          await services.units.removeCustom(unitId);
          customUnits = customUnits.filter((unit) => String(unit.id) !== String(unitId));
          await registerAuditLog({
            type: "Unidades",
            title: "Unidade removida",
            details: `A unidade ${unitLabel} foi removida da lista de areas produtivas.`,
            area: "Áreas produtivas",
            status: "Concluído",
            entityType: "unit",
            entityId: unitId
          });
        } catch (error) {
          prependNotification("Falha ao remover unidade", getUnitActionErrorMessage(error, "Nao foi possivel remover a unidade."));
          closeCardMenus();
          return;
        }
      }

      card.remove();
      prependNotification("Unidade removida", `A unidade ${unitLabel} foi removida da lista de areas produtivas.`);
    }

    if (imagemUnidade && prevImagem) {
      imagemUnidade.addEventListener("change", () => {
        const file = imagemUnidade.files?.[0];
        if (!file) {
          prevImagem.style.display = "none";
          prevImagem.removeAttribute("src");
          return;
        }

        const previewUrl = URL.createObjectURL(file);
        prevImagem.src = previewUrl;
        prevImagem.style.display = "block";
      });
    }

    btnSino?.addEventListener("click", () => togglePanel());
    btnMarcarTudoLido?.addEventListener("click", markAllAsRead);
    btnAlternarTema?.addEventListener("click", toggleTheme);
    window.addEventListener("pointerdown", allowNotificationAudio, { once: true });
    window.addEventListener("keydown", allowNotificationAudio, { once: true });
    window.addEventListener("camposync:notifications-changed", refreshNotifications);
    startRealtimeRefresh(refreshNotifications, "notificacoes");
    addUnitButton?.addEventListener("click", () => openUnitModal());
    formUnidade?.addEventListener("submit", addUnit);
    btnFecharModalUnidadeButton?.addEventListener("click", closeUnitModal);
    btnCancelarModalUnidadeButton?.addEventListener("click", closeUnitModal);

    cardsContainer?.addEventListener("click", async (event) => {
      const editButton = event.target.closest(".btn-editar-und");
      if (editButton && cardsContainer.contains(editButton)) {
        event.preventDefault();
        event.stopPropagation();
        closeCardMenus();
        openUnitModal(editButton.closest(".card"));
        return;
      }

      const removeButton = event.target.closest(".btn-remover-und");
      if (removeButton && cardsContainer.contains(removeButton)) {
        event.preventDefault();
        event.stopPropagation();
        await removeUnit(removeButton);
      }
    });

    if (painelAlertas && btnSino) {
      document.addEventListener("click", (event) => {
        if (!painelAlertas.contains(event.target) && !btnSino.contains(event.target)) {
          togglePanel(false);
        }
      });
    }


    document.addEventListener("click", (event) => {
      if (!event.target.closest(".menu-card-area")) {
        closeCardMenus();
      }
    });

    if (sobreposicaoUnidade) {
      sobreposicaoUnidade.hidden = true;
      sobreposicaoUnidade.addEventListener("click", (event) => {
        if (event.target === sobreposicaoUnidade) {
          closeUnitModal();
        }
      });
    }

    modalUnidade?.setAttribute("aria-hidden", "true");

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        togglePanel(false);
        closeCardMenus();
        if (sobreposicaoUnidade && !sobreposicaoUnidade.hidden) {
          closeUnitModal();
        }
      }
    });

    decorateDefaultCards();
    renderNotifications();
    applyTheme(localStorage.getItem(STORAGE_KEYS.theme) || "light");
    loadInitialInterfaceData().catch((error) => {
      reportClientIssue("Falha ao carregar dados iniciais da interface.", error);
    });
  }
  /* ==============================
     ASSISTENTE CYNX
  ============================== */
  function setupCynx() {
    const currentPage = getCurrentPageName();
    if (currentPage === "login.html" || currentPage === "cadastro.html") {
      return;
    }

    ensureCynxMarkup();

    const cynxModal = document.getElementById("modal-cynx");
    const sobreposicao = document.getElementById("sobreposicao");
    const batePapoCynx = document.getElementById("batePapoCynx");
    const input = document.getElementById("entradaMsg");
    const statusText = document.getElementById("textoStatus");
    const btnAlternarVozButton = document.getElementById("btnAlternarVoz");
    const btnMicrofone = document.getElementById("btnMicrofone");
    const formCynx = document.getElementById("formCynx");
    const btnAbrirCynx = document.getElementById("btnAbrirCynx");
    const btnFecharCynx = document.getElementById("btnFecharCynx");
    const btnResetarCynx = document.getElementById("btnResetarCynx");
    const cynxShortcuts = document.querySelectorAll("[data-atalho]");

    if (!cynxModal || !sobreposicao || !batePapoCynx || !input || !statusText || !btnAlternarVozButton || !btnMicrofone) {
      return;
    }

    let conversaIniciada = false;
    let vozAtiva = true;
    let escutando = false;
    let audioAtual = null;
    let audioAtualUrl = "";
    let ttsCooldownUntil = 0;
    let hasWarnedTtsCooldown = false;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || null;
    const recognition = SpeechRecognition ? new SpeechRecognition() : null;

    const atalhos = {
      estoque: "Quero consultar o estoque atual",
      alertas: "Mostre os alertas mais importantes",
      historico: "Quero ver o historico recente",
      relatorios: "Preciso de ajuda com relatórios"
    };

    const respostasLocais = [
      {
        chaves: ["estoque", "material", "insumo", "produto"],
        texto: "Para verificar estoque, acesse a área de Ferramentas e filtre por unidade, item ou quantidade mínima. Se quiser, posso te orientar a montar uma consulta mais objetiva."
      },
      {
        chaves: ["alerta", "alertas", "aviso", "urgente", "pendencia"],
        texto: "Os alertas ajudam a identificar itens com risco de falta, atrasos ou pendencias operacionais. Priorize os que impactam a producao e confira os registros mais recentes no painel."
      },
      {
        chaves: ["historico", "movimentacao", "registro", "log"],
        texto: "No histórico você consegue acompanhar entradas, saídas e alterações por período. Vale usar filtros por data e unidade para encontrar a movimentação com mais rapidez."
      },
      {
        chaves: ["relatorio", "relatorios", "indicador", "resumo"],
        texto: "Para relatórios, o melhor caminho é selecionar período, unidade e categoria antes de exportar. Isso deixa a leitura mais clara e evita dados desnecessários."
      }
    ];

    function atualizarStatus(texto) {
      statusText.textContent = texto;
    }

    function atualizarBotaoMicrofone() {
      btnMicrofone.setAttribute("aria-pressed", String(escutando));
      btnMicrofone.textContent = escutando ? "Ouvindo..." : "Falar";
    }

    function horarioAtual() {
      return new Date().toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit"
      });
    }

    function adicionarMensagem(texto, tipo, autor = "Voce") {
      const msg = document.createElement("article");
      msg.className = `msg ${tipo === "user" ? "msg-user" : tipo === "system" ? "msg-system" : "msg-bot"}`;

      const autorEl = document.createElement("strong");
      autorEl.textContent = autor;

      const textoEl = document.createElement("span");
      textoEl.textContent = texto;

      const horaEl = document.createElement("small");
      horaEl.textContent = horarioAtual();

      msg.appendChild(autorEl);
      msg.appendChild(textoEl);
      msg.appendChild(horaEl);
      batePapoCynx.appendChild(msg);
      batePapoCynx.scrollTop = batePapoCynx.scrollHeight;
    }

    function mostrarDigitando() {
      const indicador = document.createElement("article");
      indicador.className = "msg msg-bot";
      indicador.id = "indicador-digitando";
      indicador.innerHTML = `
      <strong>Cynx</strong>
      <div class="digitando" aria-label="Cynx digitando">
        <span></span>
        <span></span>
        <span></span>
      </div>
    `;
      batePapoCynx.appendChild(indicador);
      batePapoCynx.scrollTop = batePapoCynx.scrollHeight;
    }

    function removerDigitando() {
      document.getElementById("indicador-digitando")?.remove();
    }

    function responderLocalmente(msg) {
      const texto = msg.toLowerCase();
      const resposta = respostasLocais.find(({ chaves }) => chaves.some((chave) => texto.includes(chave)));
      return resposta?.texto || "Consigo responder melhor quando a pergunta estiver ligada ao CampoSync. Tente algo sobre estoque, alertas, historico ou relatorios.";
    }

    function esperar(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }

    function liberarAudioAtual() {
      if (audioAtual) {
        audioAtual.pause();
        audioAtual.src = "";
        audioAtual = null;
      }
      if (audioAtualUrl) {
        URL.revokeObjectURL(audioAtualUrl);
        audioAtualUrl = "";
      }
    }

    async function solicitarAudioCynx(texto) {
      const config = getRuntimeConfig();
      if (!config.useBackend || !config.apiBaseUrl) {
        throw new Error("Backend desativado.");
      }

      const token = getAuthToken();
      const response = await fetch(`${config.apiBaseUrl}/assistant/speech`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ text: texto })
      });

      if (!response.ok) {
        const contentType = response.headers.get("content-type") || "";
        const payload = contentType.includes("application/json")
          ? await response.json()
          : await response.text();
        const message =
          (typeof payload === "object" && (payload.message || payload.error)) ||
          "Nao foi possivel gerar o audio do Cynx.";
        const error = new Error(message);
        error.status = response.status;
        error.payload = payload;
        throw error;
      }

      return response.blob();
    }

    function falarComNavegador(texto) {
      if (!("speechSynthesis" in window)) {
        return false;
      }

      window.speechSynthesis.cancel();

      const fala = new SpeechSynthesisUtterance(texto);
      fala.lang = "pt-BR";
      fala.rate = 1;
      fala.pitch = 1;
      fala.volume = 1;

      window.speechSynthesis.speak(fala);
      return true;
    }

    async function falarResposta(texto) {
      if (!vozAtiva) {
        return;
      }

      liberarAudioAtual();
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }

      if (Date.now() < ttsCooldownUntil) {
        const falouNoNavegador = falarComNavegador(texto);
        atualizarStatus(falouNoNavegador ? "Cynx falando com voz local" : "Resposta pronta");
        return;
      }

      try {
        atualizarStatus("Gerando voz IA do Cynx");
        const audioBlob = await solicitarAudioCynx(texto);
        hasWarnedTtsCooldown = false;
        audioAtualUrl = URL.createObjectURL(audioBlob);
        audioAtual = new Audio(audioAtualUrl);
        audioAtual.addEventListener("ended", () => {
          liberarAudioAtual();
          atualizarStatus("Resposta pronta");
        }, { once: true });
        audioAtual.addEventListener("error", () => {
          liberarAudioAtual();
        }, { once: true });
        await audioAtual.play();
        atualizarStatus("Cynx falando com voz IA");
      } catch (error) {
        if (error?.status === 429) {
          ttsCooldownUntil = Date.now() + 2 * 60 * 1000;
          if (!hasWarnedTtsCooldown) {
            reportClientIssue("Limite de voz IA atingido. Usando voz nativa do navegador temporariamente.", error, "warn");
            hasWarnedTtsCooldown = true;
          }
        } else {
          reportClientIssue("Falha ao gerar TTS do Cynx. Usando voz nativa do navegador.", error);
        }
        const falouNoNavegador = falarComNavegador(texto);
        atualizarStatus(falouNoNavegador ? "Cynx falando com voz local" : "Resposta pronta");
      }
    }

    async function enviarMensagem(event) {
      if (event) {
        event.preventDefault();
      }

      const texto = input.value.trim();
      if (!texto) {
        atualizarStatus("Digite uma mensagem para continuar");
        input.focus();
        return;
      }

      adicionarMensagem(texto, "user");
      input.value = "";
      atualizarStatus("Cynx esta analisando sua mensagem");
      mostrarDigitando();

      await esperar(400);
      const resposta = await services.assistant.ask(texto);
      const respostaTexto = String(resposta?.answer || "").trim() || responderLocalmente(texto);

      removerDigitando();
      adicionarMensagem(respostaTexto, "bot", "Cynx");
      if (resposta?.exportFile) {
        const downloaded = downloadBase64File(resposta.exportFile);
        if (downloaded) {
          adicionarMensagem(`Relatório exportado: ${resposta.exportFile.filename}`, "system", "Sistema");
        }
      }
      atualizarStatus("Resposta pronta");
      falarResposta(respostaTexto);
    }

    async function abrirCynx() {
      cynxModal.style.display = "flex";
      cynxModal.setAttribute("aria-hidden", "false");
      sobreposicao.hidden = false;
      if (!window.matchMedia("(max-width: 768px)").matches) {
        input.focus();
      }

      await registerAuditLog({
        type: "Cynx",
        title: "Assistente aberto",
        details: "O modal do Cynx foi aberto.",
        area: "Assistente virtual",
        status: "Concluído",
        entityType: "assistant_ui"
      });

      if (!conversaIniciada) {
        const saudacao = "Olá! Sou o Cynx. Seu assistente do CampoSync. Como posso te ajudar hoje?";
        adicionarMensagem(saudacao, "bot", "Cynx");
        atualizarStatus("Conversa iniciada");
        falarResposta(saudacao);
        conversaIniciada = true;
      }
    }

    async function fecharCynx() {
      cynxModal.style.display = "none";
      cynxModal.setAttribute("aria-hidden", "true");
      sobreposicao.hidden = true;
      liberarAudioAtual();
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
      atualizarStatus("Assistente fechado");
      await registerAuditLog({
        type: "Cynx",
        title: "Assistente fechado",
        details: "O modal do Cynx foi fechado.",
        area: "Assistente virtual",
        status: "Concluído",
        entityType: "assistant_ui"
      });
    }

    async function limparConversa() {
      batePapoCynx.innerHTML = "";
      conversaIniciada = false;
      atualizarStatus("Conversa reiniciada");
      await registerAuditLog({
        type: "Cynx",
        title: "Conversa reiniciada",
        details: "O histórico visual da conversa com o Cynx foi limpo.",
        area: "Assistente virtual",
        status: "Concluído",
        entityType: "assistant_ui"
      });
      await abrirCynx();
    }

    function alternarVoz() {
      vozAtiva = !vozAtiva;
      btnAlternarVozButton.setAttribute("aria-pressed", String(vozAtiva));
      btnAlternarVozButton.textContent = vozAtiva ? "Voz IA ligada" : "Voz IA desligada";
      if (!vozAtiva) {
        liberarAudioAtual();
        if ("speechSynthesis" in window) {
          window.speechSynthesis.cancel();
        }
      }
      atualizarStatus(vozAtiva ? "Leitura por voz IA ativada" : "Leitura por voz desativada");
    }

    function alternarEscuta() {
      if (!recognition) {
        adicionarMensagem("Seu navegador não oferece suporte nativo ao reconhecimento de voz. Teste no Google Chrome ou Microsoft Edge mais recentes.", "system", "Sistema");
        atualizarStatus("Reconhecimento de voz indisponível");
        return;
      }

      if (escutando) {
        recognition.stop();
        atualizarStatus("Captura de voz encerrada");
        return;
      }

      input.value = "";
      recognition.start();
    }

    async function usarAtalho(tipo) {
      const mensagem = atalhos[tipo];
      if (!mensagem) return;
      await registerAuditLog({
        type: "Cynx",
        title: "Atalho do Cynx utilizado",
        details: `O atalho ${tipo} foi utilizado no Cynx.`,
        area: "Assistente virtual",
        status: "Concluído",
        entityType: "assistant_shortcut",
        metadata: {
          atalho: tipo,
          mensagem
        }
      });
      input.value = mensagem;
      input.focus();
      atualizarStatus(`Atalho selecionado: ${tipo}`);
    }

    if (recognition) {
      recognition.lang = "pt-BR";
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;
      recognition.continuous = false;

      recognition.onstart = () => {
        escutando = true;
        atualizarBotaoMicrofone();
        atualizarStatus("Microfone ativo. Pode falar.");
      };

      recognition.onresult = (event) => {
        const transcricao = Array.from(event.results)
          .map((resultado) => resultado[0].transcript)
          .join("")
          .trim();

        input.value = transcricao;

        const resultadoFinal = event.results[event.results.length - 1];
        if (resultadoFinal?.isFinal && transcricao) {
          atualizarStatus("Fala capturada. Enviando mensagem.");
          enviarMensagem();
        } else {
          atualizarStatus("Captando sua fala...");
        }
      };

      recognition.onerror = (event) => {
        escutando = false;
        atualizarBotaoMicrofone();

        if (event.error === "not-allowed") {
          adicionarMensagem("O acesso ao microfone foi bloqueado. Libere a permissão do navegador para conversar por voz.", "system", "Sistema");
          atualizarStatus("Permissão do microfone negada");
          return;
        }

        if (event.error === "no-speech") {
          atualizarStatus("Não detectei fala. Tente novamente.");
          return;
        }

        adicionarMensagem("Não consegui captar sua voz agora. Tente novamente em um navegador com suporte ao reconhecimento de fala.", "system", "Sistema");
        atualizarStatus("Falha ao usar o microfone");
      };

      recognition.onend = () => {
        escutando = false;
        atualizarBotaoMicrofone();
      };
    }

    btnAbrirCynx?.addEventListener("click", abrirCynx);
    btnFecharCynx?.addEventListener("click", fecharCynx);
    btnResetarCynx?.addEventListener("click", limparConversa);
    formCynx?.addEventListener("submit", enviarMensagem);
    btnMicrofone.addEventListener("click", alternarEscuta);
    btnAlternarVozButton.addEventListener("click", alternarVoz);
    btnAlternarVozButton.textContent = "Voz IA ligada";
    btnAlternarVozButton.title = "A voz do Cynx e gerada por IA";

    cynxShortcuts.forEach((shortcut) => {
      shortcut.addEventListener("click", () => usarAtalho(shortcut.dataset.atalho));
    });

    sobreposicao.addEventListener("click", fecharCynx);

    input.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        fecharCynx();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && cynxModal.style.display === "flex") {
        fecharCynx();
      }
    });
  }
  /* ==============================
     PAGINA: GESTAO DE COMPRAS
  ============================== */
  async function setupPurchasesPage() {

    const formCompra =
      document.getElementById("formCompra");

    const corpoTabelaCompra =
      document.getElementById("corpoTabelaCompra");

    const buscaCompra =
      document.getElementById("buscaCompra");

    const filtroCategoriaCompra =
      document.getElementById("filtroCategoriaCompra");

    const categoriaCompra =
      document.getElementById("categoriaCompra");

    const retornoCompra =
      document.getElementById("retornoCompra");

    const totalGasto =
      document.getElementById("totalGasto");

    const itensComprados =
      document.getElementById("itensComprados");

    const faltasEstoque =
      document.getElementById("faltasEstoque");

    const listaCritica =
      document.getElementById("listaCritica");

    const chartCanvas =
      document.getElementById("graficoGastos");

    const dataCompraInput =
      document.getElementById("dataCompra");

    if (
      !formCompra ||
      !corpoTabelaCompra ||
      !chartCanvas
    ) {
      return;
    }

    function normalizePurchase(purchase) {
      return {
        ...purchase,
        stock: Number(
          purchase.stock ??
          purchase.quantity ??
          0
        ),
        minStock: Number(
          purchase.minStock ?? 0
        ),
        notes: purchase.notes || ""
      };
    }

    let purchases =
      (await services.purchases.list())
        .map(normalizePurchase);

    let chartInstance = null;

    if (
      dataCompraInput &&
      !dataCompraInput.value
    ) {
      dataCompraInput.value =
        new Date()
          .toISOString()
          .slice(0, 10);
    }

    /* =========================================
       RENDERIZAR SELECTS DE CATEGORIA
    ========================================= */

    function renderCategorySelects() {
      const dynamicCategoryOptions =
        getUnitCategoryOptions(
          purchases.map(
            (purchase) =>
              purchase.category
          )
        ).filter((option) => option.value !== "uso-geral");

      const categoryOptions = [
        {
          value: "uso-geral",
          label: getUnitDisplayLabel("uso-geral")
        },
        ...dynamicCategoryOptions
      ];

      /* =========================
         FILTRO
      ========================= */

      if (filtroCategoriaCompra) {

        renderSelectOptions(
          filtroCategoriaCompra,
          {
            placeholderLabel:
              "Todos os destinos",
            placeholderValue: "all",
            options: categoryOptions
          }
        );
      }

      /* =========================
         FORMULARIO
      ========================= */

      if (categoriaCompra) {

        renderSelectOptions(
          categoriaCompra,
          {
            placeholderLabel:
              "Selecione o destino ou uso geral",
            placeholderValue: "",
            options: categoryOptions
          }
        );
      }
    }

    function setFeedback(
      message = "",
      type = ""
    ) {

      if (!retornoCompra) return;

      retornoCompra.textContent =
        message;

      retornoCompra.dataset.state =
        type;
    }

    function getFilteredPurchases() {

      const searchTerm =
        buscaCompra?.value
          .trim()
          .toLowerCase() || "";

      const categoryValue =
        filtroCategoriaCompra?.value ||
        "all";

      return purchases
        .filter((purchase) => {

          const matchesSearch =
            String(
              purchase.item || ""
            )
              .toLowerCase()
              .includes(searchTerm);

          const normalizedCategory =
            String(
              purchase.category || ""
            )
              .trim()
              .toLowerCase();

          const matchesCategory =
            categoryValue === "all" ||
            resolveUnitKey(
              normalizedCategory
            ) === categoryValue;

          return (
            matchesSearch &&
            matchesCategory
          );

        })
        .sort((a, b) =>
          String(b.date).localeCompare(
            String(a.date)
          )
        );
    }

    function updateSummary() {

      const total =
        purchases.reduce(
          (sum, purchase) =>
            sum +
            Number(
              purchase.quantity
            ) *
            Number(
              purchase.unitPrice
            ),
          0
        );

      const totalItems =
        purchases.reduce(
          (sum, purchase) =>
            sum +
            Number(
              purchase.quantity
            ),
          0
        );

      const criticalCount =
        purchases.filter(
          (purchase) =>
            Number(
              purchase.stock
            ) <=
            Number(
              purchase.minStock
            )
        ).length;

      if (totalGasto) {
        totalGasto.textContent =
          formatCurrency(total);
      }

      if (itensComprados) {
        itensComprados.textContent =
          totalItems.toLocaleString(
            "pt-BR"
          );
      }

      if (faltasEstoque) {
        faltasEstoque.textContent =
          String(criticalCount);
      }
    }

    function renderTable() {

      const filteredPurchases =
        getFilteredPurchases();

      if (!filteredPurchases.length) {

        corpoTabelaCompra.innerHTML =
          `
          <tr>
            <td colspan="7"
              class="linha-vazia">

              Nenhuma compra encontrada
              com os filtros atuais.

            </td>
          </tr>
        `;

        return;
      }

      corpoTabelaCompra.innerHTML =
        filteredPurchases
          .map((purchase) => {

            const total =
              Number(
                purchase.quantity
              ) *
              Number(
                purchase.unitPrice
              );

            return `
            <tr>

              <td>
                <strong>
                  ${escapeHtml(
              purchase.item
            )}
                </strong>
              </td>

              <td>
                ${getUnitDisplayLabel(
              purchase.category
            )}
              </td>

              <td>
                ${formatDate(
              purchase.date
            )}
              </td>

              <td>
                ${purchase.quantity}
              </td>

              <td>
                ${formatCurrency(
              total
            )}
              </td>

              <td>
                ${purchase.stock}
              </td>

            </tr>
          `;
          })
          .join("");
    }

    function renderCriticalList() {

      if (!listaCritica) return;

      const criticalItems =
        purchases.filter(
          (purchase) =>
            Number(
              purchase.stock
            ) <=
            Number(
              purchase.minStock
            )
        );

      if (!criticalItems.length) {

        listaCritica.innerHTML =
          `
          <p class="estado-vazio">
            Nenhum item crítico.
          </p>
        `;

        return;
      }

      listaCritica.innerHTML =
        criticalItems
          .map((purchase) => `
          <article
            class="item-critico">

            <strong>
              ${escapeHtml(
            purchase.item
          )}
            </strong>

            <span>
              ${getUnitDisplayLabel(
            purchase.category
          )}
            </span>

          </article>
        `)
          .join("");
    }

    function renderChart() {

      if (
        typeof Chart ===
        "undefined"
      ) {
        return;
      }

      const grouped =
        purchases.reduce(
          (acc, purchase) => {

            const label =
              formatMonthYear(
                purchase.date
              );

            acc[label] =
              (acc[label] || 0) +
              Number(
                purchase.quantity
              ) *
              Number(
                purchase.unitPrice
              );

            return acc;

          },
          {}
        );

      chartInstance?.destroy();

      chartInstance =
        new Chart(
          chartCanvas.getContext("2d"),
          {
            type: "bar",

            data: {
              labels:
                Object.keys(grouped),

              datasets: [
                {
                  label:
                    "Valor gasto",

                  data:
                    Object.values(
                      grouped
                    )
                }
              ]
            },

            options: {
              responsive: true,
              maintainAspectRatio: false
            }
          }
        );
    }

    function renderPurchases() {

      renderCategorySelects();

      updateSummary();

      renderTable();

      renderCriticalList();

      renderChart();
    }

    async function refreshPurchases() {
      purchases = (await services.purchases.list()).map(normalizePurchase);
      renderPurchases();
    }

    formCompra.addEventListener("submit", async (event) => {
      event.preventDefault();
      setFeedback("", "");

      const formData = new FormData(formCompra);
      const quantity = Number(formData.get("quantity") || 0);
      const unitPrice = Number(formData.get("unitPrice") || 0);
      const purchase = {
        item: String(formData.get("item") || "").trim(),
        category: String(formData.get("category") || "").trim(),
        date: String(formData.get("date") || "").trim(),
        quantity,
        unitPrice,
        stock: quantity,
        minStock: 0,
        notes: String(formData.get("notes") || "").trim()
      };

      if (!purchase.item || !purchase.category || !purchase.date || purchase.quantity <= 0 || purchase.unitPrice < 0) {
        setFeedback("Preencha item, destino ou uso geral, data, quantidade e valor unitário com valores válidos.", "error");
        return;
      }

      try {
        const createdPurchase = normalizePurchase(await services.purchases.create(purchase));
        purchases = [createdPurchase, ...purchases];
        await registerAuditLog({
          type: "Compras",
          title: "Compra registrada",
          details: `${purchase.item} registrado em ${getUnitDisplayLabel(purchase.category)} com total de ${formatCurrency(purchase.quantity * purchase.unitPrice)}.`,
          area: getUnitDisplayLabel(purchase.category),
          status: "Concluído",
          entityType: "purchase",
          entityId: createdPurchase?.id,
          metadata: purchase
        });

        formCompra.reset();
        if (dataCompraInput) {
          dataCompraInput.value = new Date().toISOString().slice(0, 10);
        }
        renderPurchases();
        setFeedback("Compra registrada com sucesso.", "success");
      } catch (error) {
        setFeedback(error?.message || "Não foi possível registrar a compra agora.", "error");
      }
    });

    formCompra.addEventListener("reset", () => {
      window.setTimeout(() => {
        setFeedback("", "");
        if (dataCompraInput) {
          dataCompraInput.value = new Date().toISOString().slice(0, 10);
        }
      }, 0);
    });

    buscaCompra?.addEventListener("input", renderTable);
    filtroCategoriaCompra?.addEventListener("change", renderTable);

    try {
      await ensureChartJs();
    } catch (error) {
      chartCanvas.setAttribute("aria-label", "Nao foi possivel carregar o grafico de compras.");
      reportClientIssue("Nao foi possivel carregar o grafico de compras.", error);
    }

    renderPurchases();
    startRealtimeRefresh(refreshPurchases, "compras");
  }

  /* ==============================
     PAGINA: GESTAO DE VENDAS
  ============================== */
  async function setupSalesPage() {
    const canvasPeriodo = document.getElementById("periodoVendas");
    const canvasCategoria = document.getElementById("categoriaVendas");
    const formVenda = document.getElementById("formVenda");
    const retornoVenda = document.getElementById("retornoVenda");
    const productFilter = document.getElementById("filtroProduto");
    const saleCategoryField = formVenda?.elements?.categoria;
    const resumoFaturamento = document.getElementById("resumoFaturamentoVendas");
    const resumoTotalVendas = document.getElementById("resumoTotalVendas");
    const resumoProdutosVendidos = document.getElementById("resumoProdutosVendidos");
    const destaqueMaiorSaidaNome = document.getElementById("destaqueMaiorSaidaNome");
    const destaqueMaiorSaidaValor = document.getElementById("destaqueMaiorSaidaValor");
    const destaqueMenorSaidaNome = document.getElementById("destaqueMenorSaidaNome");
    const destaqueMenorSaidaValor = document.getElementById("destaqueMenorSaidaValor");
    const destaqueMaiorFaturamentoNome = document.getElementById("destaqueMaiorFaturamentoNome");
    const destaqueMaiorFaturamentoValor = document.getElementById("destaqueMaiorFaturamentoValor");
    const corpoTabelaVendas = document.getElementById("corpoTabelaVendas");
    const buscaVenda = document.getElementById("buscaVenda");
    const filtroCategoriaVenda = document.getElementById("filtroCategoriaVenda");
    const filtroClienteVenda = document.getElementById("filtroClienteVenda");

    if (!canvasPeriodo || !canvasCategoria || !corpoTabelaVendas) {
      return;
    }

    let sales = await services.sales.list();
    let supplies = await services.supplies.list();
    let graficoPeriodo = null;
    let graficoCategoria = null;

    function formatCategoryLabel(value = "") {
      return getUnitDisplayLabel(value);
    }

    function normalizeInventoryLookup(value = "") {
      return String(value || "").trim().toLowerCase();
    }

    function findMatchingSupply(product = "", category = "") {
      const normalizedProduct = normalizeInventoryLookup(product);
      const normalizedCategory = normalizeInventoryLookup(category);

      return supplies.find((item) => {
        return (
          normalizeInventoryLookup(item.product) === normalizedProduct &&
          normalizeInventoryLookup(item.domain) === normalizedCategory
        );
      }) || null;
    }

    function renderSalesCategorySelects() {
      const categoryOptions = getUnitCategoryOptions(
        [
          ...sales.map((sale) => sale.categoria),
          ...supplies.map((supply) => supply.domain)
        ]
      );
      const productOptions = [
        ...new Set(
          sales
            .map((sale) => String(sale.produto || "").trim())
            .filter(Boolean)
        )
      ].map((product) => ({
        value: product,
        label: product
      }));

      renderSelectOptions(saleCategoryField, {
        placeholderLabel: "Selecione",
        placeholderValue: "",
        options: categoryOptions
      });

      renderSelectOptions(filtroCategoriaVenda, {
        placeholderLabel: "Todas as categorias",
        placeholderValue: "all",
        options: categoryOptions
      });

      renderSelectOptions(productFilter, {
        placeholderLabel: "Todos os produtos",
        placeholderValue: "all",
        options: productOptions
      });
    }

    function setFeedback(message = "", type = "") {
      if (!retornoVenda) return;
      retornoVenda.textContent = message;
      retornoVenda.dataset.state = type;
    }

    function formatarPeriodoVenda(dataVenda) {
      const data = new Date(`${dataVenda}T00:00:00`);
      const rotulo = data.toLocaleDateString("pt-BR", {
        month: "short",
        year: "2-digit"
      });

      return rotulo.replace(".", "");
    }

    function agruparVendasPorPeriodo() {
      const acumulado = sales.reduce((resultado, venda) => {
        const periodo = formatarPeriodoVenda(venda.data_venda);
        const totalVenda = Number(venda.quantidade) * Number(venda.valor_unitario);

        resultado[periodo] = (resultado[periodo] || 0) + totalVenda;
        return resultado;
      }, {});

      return Object.entries(acumulado).map(([periodo, total]) => ({
        periodo,
        total: Number(total.toFixed(2))
      }));
    }

    function agruparVendasPorCategoria() {
      const acumulado = sales.reduce((resultado, venda) => {
        const totalVenda = Number(venda.quantidade) * Number(venda.valor_unitario);
        const categoryLabel = formatCategoryLabel(venda.categoria);
        resultado[categoryLabel] = (resultado[categoryLabel] || 0) + totalVenda;
        return resultado;
      }, {});

      return Object.entries(acumulado).map(([categoria, total]) => ({
        categoria,
        total: Number(total.toFixed(2))
      }));
    }

    function getFilteredSales() {
      const term = String(buscaVenda?.value || "").trim().toLowerCase();
      const category = String(filtroCategoriaVenda?.value || "all");
      const product = String(productFilter?.value || "all").trim();
      const clientFilter = String(filtroClienteVenda?.value || "").trim().toLowerCase();

      return sales.filter((item) => {
        const matchesTerm = [item.categoria, item.produto, item.cliente, item.observacoes]
          .some((value) => String(value || "").toLowerCase().includes(term));
        const matchesCategory = category === "all" || resolveUnitKey(item.categoria) === category;
        const matchesProduct = product === "all" || String(item.produto || "").trim() === product;
        const matchesClient = !clientFilter || String(item.cliente || "").toLowerCase().includes(clientFilter);
        return matchesTerm && matchesCategory && matchesProduct && matchesClient;
      });
    }

    function renderSummary() {
      const totalRevenue = sales.reduce((sum, item) => sum + Number(item.quantidade) * Number(item.valor_unitario), 0);
      const totalSales = sales.length;
      const totalProducts = sales.reduce((sum, item) => sum + Number(item.quantidade), 0);
      const sortedByQuantity = [...sales].sort((a, b) => Number(b.quantidade) - Number(a.quantidade));
      const sortedByRevenue = [...sales].sort((a, b) => (Number(b.quantidade) * Number(b.valor_unitario)) - (Number(a.quantidade) * Number(a.valor_unitario)));

      if (resumoFaturamento) resumoFaturamento.textContent = formatCurrency(totalRevenue);
      if (resumoTotalVendas) resumoTotalVendas.textContent = String(totalSales);
      if (resumoProdutosVendidos) resumoProdutosVendidos.textContent = totalProducts.toLocaleString("pt-BR");

      const topSale = sortedByQuantity[0];
      const bottomSale = sortedByQuantity[sortedByQuantity.length - 1];
      const bestRevenue = sortedByRevenue[0];

      if (destaqueMaiorSaidaNome) destaqueMaiorSaidaNome.textContent = topSale ? `${formatCategoryLabel(topSale.categoria)} em ${formatDate(topSale.data_venda)}` : "Sem dados registrados";
      if (destaqueMaiorSaidaValor) destaqueMaiorSaidaValor.textContent = topSale ? String(topSale.quantidade) : "0";
      if (destaqueMenorSaidaNome) destaqueMenorSaidaNome.textContent = bottomSale ? `${formatCategoryLabel(bottomSale.categoria)} em ${formatDate(bottomSale.data_venda)}` : "Sem dados registrados";
      if (destaqueMenorSaidaValor) destaqueMenorSaidaValor.textContent = bottomSale ? String(bottomSale.quantidade) : "0";
      if (destaqueMaiorFaturamentoNome) destaqueMaiorFaturamentoNome.textContent = bestRevenue ? `${formatCategoryLabel(bestRevenue.categoria)} com venda direta` : "Sem vendas consolidadas";
      if (destaqueMaiorFaturamentoValor) destaqueMaiorFaturamentoValor.textContent = bestRevenue ? formatCurrency(Number(bestRevenue.quantidade) * Number(bestRevenue.valor_unitario)) : "R$ 0";
    }

    function renderTable() {
      const filteredSales = getFilteredSales().sort((a, b) => String(b.data_venda).localeCompare(String(a.data_venda)));

      if (!filteredSales.length) {
        corpoTabelaVendas.innerHTML = '<tr><td colspan="8" class="linha-vazia">Nenhuma venda encontrada com os filtros atuais.</td></tr>';
        return;
      }

      corpoTabelaVendas.innerHTML = filteredSales.map((item) => {
        const total = Number(item.quantidade) * Number(item.valor_unitario);

        return `
        <tr>
          <td>
            <strong>${escapeHtml(item.produto || item.categoria)}</strong>
            <small>${escapeHtml(item.observacoes || "Sem observacoes")}</small>
          </td>
          <td>${escapeHtml(formatCategoryLabel(item.categoria))}</td>
          <td>${escapeHtml(String(item.quantidade))}</td>
          <td>${formatCurrency(item.valor_unitario)}</td>
          <td>${formatCurrency(total)}</td>
          <td>${escapeHtml(formatDate(item.data_venda))}</td>
          <td>${escapeHtml(item.cliente || "Nao informado")}</td>
          <td>
            <button type="button" class="btn-acao-tabela" data-delete-sale-id="${item.id}">Excluir</button>
          </td>
        </tr>
      `;
      }).join("");
    }

    function renderizarGraficosVendas() {
      const vendasPorPeriodo = agruparVendasPorPeriodo();
      const vendasPorCategoria = agruparVendasPorCategoria();

      graficoPeriodo?.destroy();
      graficoCategoria?.destroy();

      graficoPeriodo = new Chart(canvasPeriodo.getContext("2d"), {
        type: "bar",
        data: {
          labels: vendasPorPeriodo.map((item) => item.periodo),
          datasets: [
            {
              label: "Faturamento por periodo",
              data: vendasPorPeriodo.map((item) => item.total),
              backgroundColor: ["#d59c57", "#c98316", "#8ea654", "#2f6f4f", "#244f39"],
              borderRadius: 12,
              maxBarThickness: 48
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label(context) {
                  return formatCurrency(context.raw);
                }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback(value) {
                  return `R$ ${value}`;
                }
              },
              title: { display: true, text: "Faturamento (R$)" }
            },
            x: {
              title: { display: true, text: "Periodo" }
            }
          }
        }
      });

      if (!canvasCategoria) {
        return;
      }

      graficoCategoria = new Chart(canvasCategoria.getContext("2d"), {
        type: "pie",
        data: {
          labels: vendasPorCategoria.map((item) => item.categoria),
          datasets: [
            {
              label: "Faturamento por categoria",
              data: vendasPorCategoria.map((item) => item.total),
              backgroundColor: ["#2f6f4f", "#8ea654", "#d59c57", "#c98316", "#244f39"],
              borderColor: "#fffdf8",
              borderWidth: 3,
              hoverOffset: 10
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: "bottom" },
            tooltip: {
              callbacks: {
                label(context) {
                  const totalCategoria = vendasPorCategoria.reduce((soma, item) => soma + item.total, 0);
                  const percentual = totalCategoria ? ((context.raw / totalCategoria) * 100).toFixed(1) : "0.0";
                  return `${context.label}: ${formatCurrency(context.raw)} (${percentual}%)`;
                }
              }
            }
          }
        }
      });
    }

    function renderSalesPage() {
      renderSummary();
      renderTable();
      renderizarGraficosVendas();
    }

    async function refreshSales() {
      sales = await services.sales.list();
      supplies = await services.supplies.list();
      renderSalesCategorySelects();
      renderSalesPage();
    }

    formVenda?.addEventListener("submit", async (event) => {
      event.preventDefault();
      const formData = new FormData(formVenda);
      const sale = {
        produto: String(formData.get("produto") || "").trim(),
        categoria: String(formData.get("categoria") || "").trim(),
        data_venda: String(formData.get("data_venda") || "").trim(),
        quantidade: Number(formData.get("quantidade") || 0),
        valor_unitario: Number(formData.get("valor_unitario") || 0),
        cliente: String(formData.get("cliente") || "").trim(),
        observacoes: String(formData.get("observacoes") || "").trim()
      };

      if (!sale.produto || !sale.categoria || !sale.data_venda || sale.quantidade <= 0 || sale.valor_unitario <= 0) {
        setFeedback("Preencha produto, categoria, data, quantidade e valor unitário com valores válidos.", "error");
        return;
      }

      const matchingSupply = findMatchingSupply(sale.produto, sale.categoria);
      if (!matchingSupply) {
        setFeedback("Nao existe suprimento correspondente em estoque para este produto e categoria.", "error");
        return;
      }

      if (Number(sale.quantidade) > Number(matchingSupply.stock || 0)) {
        setFeedback(
          `Estoque insuficiente para ${sale.produto}. Disponivel: ${matchingSupply.stock}. Solicitado: ${sale.quantidade}.`,
          "error"
        );
        return;
      }

      try {
        const createdSale = await services.sales.create(sale);
        sales = [createdSale, ...sales];
        supplies = await services.supplies.list();
        await registerAuditLog({
          type: "Vendas",
          title: "Venda registrada",
          details: `${sale.produto} vendido para ${sale.cliente || "cliente não informado"} com faturamento de ${formatCurrency(Number(sale.quantidade) * Number(sale.valor_unitario))}.`,
          area: formatCategoryLabel(sale.categoria),
          status: "Concluído",
          entityType: "sale",
          entityId: createdSale?.id,
          metadata: sale
        });
        formVenda.reset();
        renderSalesCategorySelects();
        setFeedback("Venda registrada com sucesso.", "success");
        renderSalesPage();
      } catch (error) {
        setFeedback(error?.message || "Não foi possível registrar a venda agora.", "error");
      }
    });

    formVenda?.addEventListener("reset", () => {
      window.setTimeout(() => setFeedback(), 0);
    });

    corpoTabelaVendas.addEventListener("click", async (event) => {
      const deleteButton = event.target.closest("[data-delete-sale-id]");
      if (!deleteButton) return;

      const saleId = Number(deleteButton.dataset.deleteSaleId);
      try {
        const sale = sales.find((entry) => Number(entry.id) === saleId);
        await services.sales.remove(saleId);
        sales = sales.filter((sale) => Number(sale.id) !== saleId);
        await registerAuditLog({
          type: "Vendas",
          title: "Venda removida",
          details: sale?.produto ? `Venda de ${sale.produto} removida do histórico.` : "Venda removida do histórico.",
          area: sale?.categoria || "Vendas",
          status: "Concluído",
          entityType: "sale",
          entityId: saleId
        });
        setFeedback("Venda removida do histórico.", "success");
        renderSalesPage();
      } catch (error) {
        if (error?.status === 404) {
          sales = sales.filter((sale) => Number(sale.id) !== saleId);
          setFeedback("A venda já não existia mais no servidor e foi removida da lista local.", "success");
          renderSalesPage();
          return;
        }
        setFeedback(error?.message || "Não foi possível remover a venda agora.", "error");
      }
    });

    buscaVenda?.addEventListener("input", renderTable);
    productFilter?.addEventListener("change", renderTable);
    filtroCategoriaVenda?.addEventListener("change", renderTable);

    const btnFiltrar = document.querySelector('.filtros-gestao-vendas .btn-filtrar');
    const btnLimpar = document.querySelector('.filtros-gestao-vendas .btn-limpar');

    btnFiltrar?.addEventListener('click', renderTable);

    btnLimpar?.addEventListener('click', () => {
      if (filtroClienteVenda) filtroClienteVenda.value = '';
      if (filtroCategoriaVenda) filtroCategoriaVenda.value = 'all';
      if (productFilter) productFilter.value = 'all';
      renderTable();
    });

    try {
      await ensureChartJs();
      renderSalesCategorySelects();
      renderSalesPage();
    } catch {
      canvasPeriodo.setAttribute("aria-label", "Nao foi possivel carregar o grafico de vendas.");
      renderSalesCategorySelects();
      renderSummary();
      renderTable();
    }

    startRealtimeRefresh(refreshSales, "vendas");
  }

  /* ==============================
     PAGINA: CONSUMOS
  ============================== */
  async function setupConsumptionsPage() {
    const formConsumos = document.getElementById("formConsumos");
    const retornoConsumos = document.getElementById("retornoConsumos");
    const consumptionCategoryField = formConsumos?.elements?.categoria;
    const totalUnits = document.getElementById("unidadesProdutivas");
    const consumoPorMes = document.getElementById("consumoPorMes");
    const ultimos30dias = document.getElementById("ultimos30dias");
    const listaCritica = document.getElementById("listaCritica");
    const corpoTabela = document.getElementById("corpoTabelaConsumos");
    const buscaConsumo = document.getElementById("buscaConsumo");
    const filtroCategoria = document.getElementById("filtroCategoriaConsumo");
    const chartCanvas = document.getElementById("graficoConsumo");

    if (!formConsumos || !corpoTabela || !listaCritica || !chartCanvas) {
      return;
    }

    let consumptions = await services.consumptions.list();
    let supplies = await services.supplies.list();
    let chartInstance = null;

    function formatConsumptionPeriod(dateValue) {
      const date = new Date(`${dateValue}T00:00:00`);

      return date
        .toLocaleDateString("pt-BR", {
          month: "short",
          year: "2-digit"
        })
        .replace(".", "");
    }

    function setFeedback(message = "", type = "") {
      if (!retornoConsumos) return;

      retornoConsumos.textContent = message;
      retornoConsumos.dataset.state = type;
    }

    function getEstimatedUnitCost(category) {
      const unitCosts = {
        suinocultura: 12,
        piscicultura: 10,
        avicultura: 9,
        horticultura: 29,
        fruticultura: 24,
        agrofloresta: 21,
        "plantas-forrageiras": 14,
        "cultivos-de-sequeiro": 18,
        "plantas-ornamentais": 16,
        "plantas-medicinais": 19,
        "viveiros-de-mudas": 24
      };

      return unitCosts[category] || 15;
    }

    function formatConsumptionCategory(value = "") {
      return getUnitDisplayLabel(value);
    }

    function normalizeInventoryLookup(value = "") {
      return String(value || "").trim().toLowerCase();
    }

    function findMatchingSupply(product = "", category = "") {
      const normalizedProduct = normalizeInventoryLookup(product);
      const normalizedCategory = normalizeInventoryLookup(category);

      return supplies.find((item) => (
        normalizeInventoryLookup(item.product) === normalizedProduct &&
        normalizeInventoryLookup(item.domain) === normalizedCategory
      )) || null;
    }

    /* =========================================
       RENDERIZAR CATEGORIAS NO SELECT
    ========================================= */
    function renderConsumptionCategoryFilter() {
      const categoryOptions = getUnitCategoryOptions([
        ...consumptions.map((item) => item.categoria),
        ...supplies.map((item) => item.domain)
      ]);

      renderSelectOptions(consumptionCategoryField, {
        placeholderLabel: "Selecione",
        placeholderValue: "",
        options: categoryOptions
      });

      renderSelectOptions(filtroCategoria, {
        placeholderLabel: "Todas as categorias",
        placeholderValue: "all",
        options: categoryOptions
      });
    }

    function getFilteredConsumptions() {

      const term = String(
        buscaConsumo?.value || ""
      )
        .trim()
        .toLowerCase();

      const category = String(
        filtroCategoria?.value || "all"
      );

      return consumptions.filter((item) => {

        const matchesTerm = [
          item.produto,
          item.categoria,
          item.observacoes
        ].some((value) =>
          String(value || "")
            .toLowerCase()
            .includes(term)
        );

        const matchesCategory =
          category === "all" ||
          resolveUnitKey(
            item.categoria
          ) === category;

        return matchesTerm && matchesCategory;
      });
    }

    function renderSummary() {

      const units = new Set(
        consumptions.map((item) =>
          formatConsumptionCategory(item.categoria)
        )
      ).size;

      const totalCost = consumptions.reduce(
        (sum, item) =>
          sum + Number(item.estimatedCost || 0),
        0
      );

      const now = new Date();

      const last7 = consumptions.filter((item) => {

        const date = new Date(
          `${item.data_consumo}T00:00:00`
        );

        return (now - date) / 86400000 <= 7;

      }).length;

      if (totalUnits)
        totalUnits.textContent = String(units);

      if (consumoPorMes)
        consumoPorMes.textContent =
          formatCurrency(totalCost);

      if (ultimos30dias)
        ultimos30dias.textContent = String(last7);
    }

    function renderCriticalList() {

      const criticalItems = consumptions
        .filter(
          (item) =>
            Number(item.stock) <= 0
        )
        .sort(
          (a, b) =>
            Number(a.stock) - Number(b.stock)
        );

      if (!criticalItems.length) {

        listaCritica.innerHTML =
          '<p class="estado-vazio">Nenhum consumo com estoque em alerta nos últimos 30 dias.</p>';

        return;
      }

      listaCritica.innerHTML = criticalItems
        .map(
          (item) => `
      <article class="item-critico">
        <div>
          <strong>${escapeHtml(item.produto)}</strong>

          <span>
            ${escapeHtml(
            formatConsumptionCategory(
              item.categoria
            )
          )}

            com estoque restante em
            ${item.stock}.
          </span>
        </div>

        <div class="metrica-critica">
          <b>${escapeHtml(String(item.quantidade))}</b>
          <small>consumo</small>
        </div>
      </article>
    `
        )
        .join("");
    }

    function renderTable() {

      const filtered =
        getFilteredConsumptions().sort(
          (a, b) =>
            String(b.data_consumo).localeCompare(
              String(a.data_consumo)
            )
        );

      if (!filtered.length) {

        corpoTabela.innerHTML =
          '<tr><td colspan="4" class="linha-vazia">Nenhum consumo encontrado com os filtros atuais.</td></tr>';

        return;
      }

      corpoTabela.innerHTML = filtered
        .map(
          (item) => `
      <tr>
        <td>
          <strong>
            ${escapeHtml(item.produto)}
          </strong>
        </td>

        <td>
          ${escapeHtml(
            formatConsumptionCategory(
              item.categoria
            )
          )}
        </td>

        <td>
          ${escapeHtml(
            formatDate(item.data_consumo)
          )}
        </td>

        <td>
          ${escapeHtml(
            String(item.quantidade)
          )}
        </td>
      </tr>
    `
        )
        .join("");
    }

    function renderChart() {

      if (typeof Chart === "undefined") {
        return;
      }

      const grouped = consumptions.reduce(
        (acc, item) => {

          const label =
            formatConsumptionPeriod(
              item.data_consumo
            );

          acc[label] =
            (acc[label] || 0) +
            Number(item.estimatedCost || 0);

          return acc;

        },
        {}
      );

      chartInstance?.destroy();

      chartInstance = new Chart(
        chartCanvas.getContext("2d"),
        {
          type: "line",

          data: {
            labels: Object.keys(grouped),

            datasets: [
              {
                label:
                  "Consumo estimado por periodo",

                data: Object.values(grouped),

                borderColor: "#2f6f4f",

                backgroundColor:
                  "rgba(47, 111, 79, 0.18)",

                fill: true,

                tension: 0.35
              }
            ]
          }
        }
      );
    }

    function renderConsumptions() {

      // AQUI
      renderConsumptionCategoryFilter();

      renderSummary();
      renderCriticalList();
      renderTable();
      renderChart();
    }

    formConsumos.addEventListener("submit", async (event) => {
      event.preventDefault();

      const formData = new FormData(formConsumos);
      const consumption = {
        produto: String(formData.get("produto") || "").trim(),
        categoria: String(formData.get("categoria") || "").trim(),
        data_consumo: String(formData.get("data_consumo") || "").trim(),
        quantidade: Number(formData.get("quantidade") || 0),
        observacoes: String(formData.get("observacoes") || "").trim()
      };

      if (!consumption.produto || !consumption.categoria || !consumption.data_consumo || consumption.quantidade <= 0) {
        setFeedback("Preencha produto, categoria, data e quantidade com valores validos.", "error");
        return;
      }

      const matchingSupply = findMatchingSupply(consumption.produto, consumption.categoria);
      if (!matchingSupply) {
        setFeedback("Nao existe suprimento correspondente em estoque para este produto e categoria.", "error");
        return;
      }

      if (Number(consumption.quantidade) > Number(matchingSupply.stock || 0)) {
        setFeedback(
          `Estoque insuficiente para ${consumption.produto}. Disponivel: ${matchingSupply.stock}. Solicitado: ${consumption.quantidade}.`,
          "error"
        );
        return;
      }

      const remainingStock = Number(matchingSupply.stock || 0) - Number(consumption.quantidade || 0);
      const unitCost = Number(matchingSupply.unitPrice || 0) || getEstimatedUnitCost(resolveUnitKey(consumption.categoria));
      const payload = {
        ...consumption,
        stock: remainingStock,
        estimatedCost: Number((Number(consumption.quantidade) * unitCost).toFixed(2))
      };

      try {
        const createdConsumption = await services.consumptions.create(payload);
        consumptions = [createdConsumption, ...consumptions];
        supplies = await services.supplies.list();
        await registerAuditLog({
          type: "Consumos",
          title: "Consumo registrado",
          details: `${consumption.produto} consumido em ${formatConsumptionCategory(consumption.categoria)}. Estoque restante: ${remainingStock}.`,
          area: formatConsumptionCategory(consumption.categoria),
          status: "Concluido",
          entityType: "consumption",
          entityId: createdConsumption?.id,
          metadata: payload
        });
        formConsumos.reset();
        setFeedback("Consumo registrado com sucesso.", "success");
        renderConsumptions();
      } catch (error) {
        setFeedback(error?.message || "Nao foi possivel registrar o consumo agora.", "error");
      }
    });

    formConsumos.addEventListener("reset", () => {
      window.setTimeout(() => setFeedback(), 0);
    });

    try {
      await ensureChartJs();
    } catch (error) {
      chartCanvas.setAttribute("aria-label", "Nao foi possivel carregar o grafico de consumos.");
      reportClientIssue("Nao foi possivel carregar o grafico de consumos.", error);
    }

    renderConsumptions();
  }

  /* ==============================
     PAGINA: SUPRIMENTOS
  ============================== */
  async function setupSuppliesPage() {
    const suppliesTableBody = document.getElementById("corpoTabelaSuprimentos");
    const suppliesSearch = document.getElementById("buscaSuprimentos");
    const suppliesCategoryFilter = document.getElementById("filtroCategoriaSuprimentos");
    const btnAplicarFiltro = document.getElementById("btnAplicarFiltro");
    const formSupplies = document.getElementById("formSuprimentos");
    const suppliesCategoryField = formSupplies?.elements?.categoria;
    const suppliesFeedback = formSupplies?.querySelector(".retorno-form");
    const totalProdutos = document.getElementById("totalProdutos");
    const totalEstoque = document.getElementById("totalEstoque");
    const itensEmFalta = document.getElementById("itensEmFalta");

    if (!suppliesTableBody || !suppliesSearch || !suppliesCategoryFilter) {
      return;
    }

    let supplies = await services.supplies.list();

    function setFeedback(message = "", type = "") {
      if (!suppliesFeedback) return;
      suppliesFeedback.textContent = message;
      suppliesFeedback.dataset.state = type;
    }

    function getStatus(item) {
      if (Number(item.stock) <= Number(item.minStock)) {
        return { label: "Critico", className: "selo-status esta-critico" };
      }

      if (Number(item.stock) <= Number(item.minStock) + 15) {
        return { label: "Atencao", className: "selo-status esta-alerta" };
      }

      return { label: "Regular", className: "selo-status esta-ok" };
    }

    function renderSuppliesCategorySelects() {
      const categoryOptions = getUnitCategoryOptions(
        supplies.map((item) => item.domain)
      );

      renderSelectOptions(suppliesCategoryField, {
        placeholderLabel: "Selecione",
        placeholderValue: "",
        options: categoryOptions
      });

      renderSelectOptions(suppliesCategoryFilter, {
        placeholderLabel: "Todas as categorias",
        placeholderValue: "all",
        options: categoryOptions
      });
    }

    function getFilteredSupplies() {
      const term = suppliesSearch.value.trim().toLowerCase();
      const category = suppliesCategoryFilter.value;

      return supplies.filter((item) => {
        const matchesTerm = String(item.product || "").toLowerCase().includes(term);
        const matchesCategory = category === "all" || resolveUnitKey(item.domain) === category;
        return matchesTerm && matchesCategory;
      });
    }

    function updateSummary() {
      const totalItems = supplies.length;
      const stockSum = supplies.reduce((sum, item) => sum + Number(item.stock), 0);
      const missingCount = supplies.filter((item) => Number(item.stock) <= Number(item.minStock)).length;

      if (totalProdutos) totalProdutos.textContent = String(totalItems);
      if (totalEstoque) totalEstoque.textContent = stockSum.toLocaleString("pt-BR");
      if (itensEmFalta) itensEmFalta.textContent = String(missingCount);
    }

    function renderSupplies() {
      const filteredSupplies = getFilteredSupplies();

      if (!filteredSupplies.length) {
        suppliesTableBody.innerHTML = `
        <tr>
          <td colspan="4" class="linha-vazia">Nenhum suprimento encontrado com os filtros atuais.</td>
        </tr>
      `;
        return;
      }

      suppliesTableBody.innerHTML = filteredSupplies
        .map((item) => {
          const status = getStatus(item);

          return `
          <tr>
            <td>
              <strong>${escapeHtml(item.product)}</strong>
              <small>Minimo recomendado: ${item.minStock}</small>
            </td>
            <td>${escapeHtml(getUnitDisplayLabel(item.domain))}</td>
            <td>${item.stock}</td>
            <td><span class="${status.className}">${status.label}</span></td>
          </tr>
        `;
        })
        .join("");
    }

    async function refreshSupplies() {
      supplies = await services.supplies.list();
      renderSuppliesCategorySelects();
      updateSummary();
      renderSupplies();
    }

    formSupplies?.addEventListener("submit", async (event) => {
      event.preventDefault();
      setFeedback("", "");
      const formData = new FormData(formSupplies);
      const product = String(formData.get("produto") || "").trim();
      const domain = String(formData.get("categoria") || "").trim();
      const stock = Number(formData.get("quantidade") || 0);
      const minStock = Number(formData.get("estoque_minimo") || 0);
      const createdAt = String(formData.get("data_compra") || "").trim();
      const unitPrice = Number(formData.get("valor_unitario") || 0);

      if (!product || !domain || stock <= 0 || minStock < 0) {
        setFeedback("Preencha produto, categoria, quantidade e estoque mínimo com valores válidos.", "error");
        return;
      }

      if (!createdAt) {
        setFeedback("Informe a data da compra para continuar.", "error");
        return;
      }

      if (unitPrice < 0) {
        setFeedback("O valor unitario precisa ser maior ou igual a zero.", "error");
        return;
      }

      try {
        const createdSupply = await services.supplies.create({
          product,
          domain,
          stock,
          minStock,
          createdAt,
          unitPrice,
          notes: String(formData.get("observacoes") || "").trim()
        });

        supplies = [createdSupply, ...supplies];
        await registerAuditLog({
          type: "Suprimentos",
          title: "Suprimento registrado",
          details: `${product} adicionado ao estoque com ${stock} unidades.`,
          area: domain,
          status: "Concluido",
          entityType: "supply",
          entityId: createdSupply?.id,
          metadata: {
            product,
            domain,
            stock,
            minStock,
            createdAt,
            unitPrice
          }
        });
        formSupplies.reset();
        renderSuppliesCategorySelects();
        suppliesCategoryFilter.value = "all";
        setFeedback("Produto de suprimentos registrado com sucesso.", "success");
        updateSummary();
        renderSupplies();
        if (Number(createdSupply.stock) <= Number(createdSupply.minStock)) {
          window.dispatchEvent(new CustomEvent("camposync:notifications-changed"));
        }
      } catch (error) {
        setFeedback(error?.message || "Nao foi possivel salvar o suprimento agora.", "error");
      }
    });

    formSupplies?.addEventListener("reset", () => {
      window.setTimeout(() => {
        setFeedback("", "");
        renderSupplies();
      }, 0);
    });

    btnAplicarFiltro?.addEventListener("click", renderSupplies);
    suppliesSearch.addEventListener("input", renderSupplies);
    suppliesCategoryFilter.addEventListener("change", renderSupplies);

    renderSuppliesCategorySelects();
    updateSummary();
    renderSupplies();
    startRealtimeRefresh(refreshSupplies, "suprimentos");
  }

  /* ==============================
     PAGINA: MATERIAIS
  ============================== */
  async function setupMaterialsPage() {
    const formMaterials = document.getElementById("formMateriais");
    const tableBody = document.getElementById("corpoTabelaMateriais");
    const searchInput = document.getElementById("buscaMaterial");
    const materialCategoryField = document.getElementById("categoriaMaterial");
    const materialStatusField = document.getElementById("filtroStatus");
    const categoryFilter = document.getElementById("filtroCategoriaBusca");
    const statusFilter = document.getElementById("filtroStatusBusca");
    const btnFiltrar = document.getElementById("btnFiltrar");
    const btnLimpar = document.getElementById("btnLimpar");
    const totalMateriais = document.getElementById("totalMateriais");
    const materiaisManutencao = document.getElementById("materiaisManutencao");
    const materiaisDisponiveis = document.getElementById("materiaisDisponiveis");
    const resumoMateriaisPainel = document.getElementById("resumoMateriaisPainel");
    const feedback = formMaterials?.querySelector(".retorno-form");

    if (!formMaterials || !tableBody || !searchInput || !categoryFilter || !statusFilter) {
      return;
    }

    function normalizeMaterialRecord(item) {
      return {
        ...item,
        status: normalizeMaterialStatus(item.status)
      };
    }

    let materials = (await services.materials.list()).map(normalizeMaterialRecord);

    /* =========================================
       RENDERIZAR CATEGORIAS
    ========================================= */
    function renderCategoryFilter() {
      const categorias = [
        ...new Set([
          ...DEFAULT_MATERIAL_CATEGORIES,
          ...materials.map((item) =>
            String(item.categoria || "").trim()
          )
        ])
      ]
        .filter(Boolean)
        .map((categoria) => ({
          value: categoria,
          label: categoria
        }));

      renderSelectOptions(materialCategoryField, {
        placeholderLabel: "Selecione",
        placeholderValue: "",
        options: categorias
      });

      renderSelectOptions(categoryFilter, {
        placeholderLabel: "Todas as categorias",
        placeholderValue: "todos",
        options: categorias
      });

      const statuses = [
        ...new Set([
          ...DEFAULT_MATERIAL_STATUSES,
          ...materials.map((item) =>
            normalizeMaterialStatus(item.status)
          )
        ])
      ]
        .filter(Boolean)
        .map((status) => ({
          value: status,
          label: status
        }));

      renderSelectOptions(materialStatusField, {
        placeholderLabel: "Selecione",
        placeholderValue: "",
        options: statuses
      });

      renderSelectOptions(statusFilter, {
        placeholderLabel: "Todos os status",
        placeholderValue: "todos",
        options: statuses
      });
    }

    const submitButton = formMaterials.querySelector('button[type="submit"]');
    const resetButton = formMaterials.querySelector('button[type="reset"]');
    let editingMaterialId = null;
    let suppressResetFeedback = false;

    function setFeedback(message = "", type = "") {
      if (!feedback) return;

      feedback.textContent = message;
      feedback.dataset.state = type;
    }

    function setEditMode(material = null) {
      editingMaterialId = material?.id || null;
      if (submitButton) {
        submitButton.textContent = material ? "Atualizar ferramenta" : "Salvar ferramenta";
      }
      if (resetButton) {
        resetButton.textContent = material ? "Cancelar" : "Limpar";
      }
      if (!material) {
        return;
      }

      formMaterials.elements.material.value = material.material || "";
      formMaterials.elements.quantidade.value = material.quantidade || "";
      formMaterials.elements.categoria.value = material.categoria || "";
      formMaterials.elements.status.value = material.status || "";
      formMaterials.elements.dominio.value = material.dominio || "";
      formMaterials.elements.ultima_inspecao.value = material.ultima_inspecao || "";
      formMaterials.elements.observacoes.value = material.observacoes || "";
      setFeedback("Modo de edição ativado. Atualize status ou última inspeção e salve.", "info");
    }

    function updateSummary() {
      const total = materials.reduce(
        (sum, item) => sum + Number(item.quantidade || 0),
        0
      );

      const maintenance = materials
        .filter((item) => item.status === "Em manutencao")
        .reduce(
          (sum, item) => sum + Number(item.quantidade || 0),
          0
        );

      const available = materials
        .filter((item) => item.status === "Disponivel")
        .reduce(
          (sum, item) => sum + Number(item.quantidade || 0),
          0
        );

      if (totalMateriais) {
        totalMateriais.textContent = String(total);
      }

      if (materiaisManutencao) {
        materiaisManutencao.textContent = String(maintenance);
      }

      if (materiaisDisponiveis) {
        materiaisDisponiveis.textContent = String(available);
      }
    }

    function getFilteredMaterials() {
      const term = searchInput.value
        .trim()
        .toLowerCase();

      const category = categoryFilter.value;
      const status = statusFilter.value;

      return materials.filter((item) => {

        const matchesTerm = [
          item.material,
          item.dominio,
          item.observacoes
        ].some((value) =>
          String(value || "")
            .toLowerCase()
            .includes(term)
        );

        const matchesCategory =
          category === "todos" ||
          item.categoria === category;

        const matchesStatus =
          status === "todos" ||
          item.status === status;

        return (
          matchesTerm &&
          matchesCategory &&
          matchesStatus
        );
      });
    }

    function renderMaterials() {

      // AQUI
      renderCategoryFilter();

      const filteredMaterials = getFilteredMaterials();

      if (!filteredMaterials.length) {
        tableBody.innerHTML = `
        <tr>
          <td colspan="7" class="linha-vazia">
            Nenhum material encontrado com os filtros atuais.
          </td>
        </tr>
      `;
        return;
      }

      tableBody.innerHTML = filteredMaterials.map((item) => `
      <tr>
        <td>
          <strong>${escapeHtml(item.material)}</strong>
          <small>
            ${escapeHtml(item.observacoes || "Sem observações")}
          </small>
        </td>

        <td>
          ${escapeHtml(item.categoria)}
        </td>

        <td>
          ${escapeHtml(String(item.quantidade))}
        </td>

        <td>
          <span class="${item.status === "Indisponivel"
          ? "selo-status esta-critico"
          : item.status === "Em manutencao"
            ? "selo-status esta-alerta"
            : "selo-status esta-ok"
        }">
            ${escapeHtml(item.status)}
          </span>
        </td>

        <td>
          ${escapeHtml(item.dominio || "--")}
        </td>

        <td>
          ${item.ultima_inspecao
          ? escapeHtml(formatDate(item.ultima_inspecao))
          : "--"
        }
        </td>

        <td class="acoes-tabela">
          <button type="button" class="btn-fantasma btn-editar" data-id="${escapeHtml(item.id)}">Editar</button>
          <button type="button" class="btn-fantasma btn-excluir" data-id="${escapeHtml(item.id)}">Excluir</button>
        </td>
      </tr>
    `).join("");
    }

    function renderPanelSummary() {
      if (!resumoMateriaisPainel) return;

      const maintenanceItems = materials
        .filter((item) =>
          item.status === "Em manutencao" ||
          item.status === "Indisponivel"
        )
        .sort((a, b) =>
          String(a.ultima_inspecao || "")
            .localeCompare(
              String(b.ultima_inspecao || "")
            )
        )
        .slice(0, 3);

      if (!maintenanceItems.length) {
        resumoMateriaisPainel.innerHTML = `
        <p class="estado-vazio">
          Nenhum material com manutenção pendente no momento.
        </p>
      `;
        return;
      }

      resumoMateriaisPainel.innerHTML = maintenanceItems.map((item) => `
      <article class="item-critico">
        <div>
          <strong>
            ${escapeHtml(item.material)}
          </strong>

          <span>
            ${escapeHtml(item.status)}
            em
            ${escapeHtml(
        item.dominio ||
        item.categoria ||
        "operação geral"
      )}
          </span>
        </div>

        <div class="metrica-critica">
          <b>
            ${item.ultima_inspecao
          ? escapeHtml(formatDate(item.ultima_inspecao))
          : "--"
        }
          </b>

          <small>inspeção</small>
        </div>
      </article>
    `).join("");
    }

    async function refreshMaterials() {
      materials = (await services.materials.list())
        .map(normalizeMaterialRecord);

      updateSummary();
      renderMaterials();
      renderPanelSummary();
    }

    formMaterials.addEventListener("submit", async (event) => {
      event.preventDefault();

      setFeedback("", "");

      const formData = new FormData(formMaterials);

      const material = {
        material: String(
          formData.get("material") || ""
        ).trim(),

        categoria: String(
          formData.get("categoria") || ""
        ).trim(),

        quantidade: Number(
          formData.get("quantidade") || 0
        ),

        status: normalizeMaterialStatus(
          formData.get("status")
        ),

        dominio: String(
          formData.get("dominio") || ""
        ).trim(),

        ultima_inspecao: String(
          formData.get("ultima_inspecao") || ""
        ).trim(),

        observacoes: String(
          formData.get("observacoes") || ""
        ).trim()
      };

      if (
        !material.material ||
        !material.categoria ||
        !material.status ||
        material.quantidade <= 0
      ) {
        setFeedback(
          "Preencha material, categoria, quantidade e status com valores válidos.",
          "error"
        );
        return;
      }

      try {
        const savedMaterial = editingMaterialId
          ? await services.materials.update(editingMaterialId, material)
          : await services.materials.create(material);

        if (editingMaterialId) {
          materials = materials.map((item) => (
            String(item.id) === String(savedMaterial.id)
              ? { ...savedMaterial, status: normalizeMaterialStatus(savedMaterial.status) }
              : item
          ));
        } else {
          materials = [
            {
              ...savedMaterial,
              status: normalizeMaterialStatus(savedMaterial.status)
            },
            ...materials
          ];
        }

        await registerAuditLog({
          type: "Materiais",
          title: editingMaterialId ? "Material atualizado" : "Material registrado",
          details: editingMaterialId
            ? `${material.material} atualizado para status ${material.status}.`
            : `${material.material} registrado com status ${material.status}.`,
          area: material.dominio || material.categoria,
          status: "Concluido",
          entityType: "material",
          entityId: savedMaterial?.id,
          metadata: material
        });

        suppressResetFeedback = true;
        formMaterials.reset();
        setEditMode(null);

        categoryFilter.value = "todos";
        statusFilter.value = "todos";

        setFeedback(
          editingMaterialId
            ? "Material atualizado com sucesso."
            : "Material registrado com sucesso.",
          "success"
        );

        updateSummary();
        renderMaterials();
        renderPanelSummary();

      } catch (error) {

        setFeedback(
          error?.message ||
          "Nao foi possivel salvar o material agora.",
          "error"
        );
      }
    });

    formMaterials.addEventListener("reset", () => {
      window.setTimeout(() => {
        setEditMode(null);
        if (!suppressResetFeedback) {
          setFeedback("", "");
        }
        suppressResetFeedback = false;
      }, 0);
    });

    btnFiltrar?.addEventListener(
      "click",
      renderMaterials
    );

    btnLimpar?.addEventListener("click", () => {

      searchInput.value = "";
      categoryFilter.value = "todos";
      statusFilter.value = "todos";

      renderMaterials();
    });

    searchInput.addEventListener(
      "input",
      renderMaterials
    );

    categoryFilter.addEventListener(
      "change",
      renderMaterials
    );

    statusFilter.addEventListener(
      "change",
      renderMaterials
    );

    tableBody.addEventListener("click", async (event) => {
      const target = event.target;
      const editButton = target.closest("button.btn-editar");
      const deleteButton = target.closest("button.btn-excluir");

      if (editButton) {
        const materialId = editButton.dataset.id;
        const material = materials.find((item) => String(item.id) === String(materialId));
        if (!material) {
          setFeedback("Ferramenta não encontrada.", "error");
          return;
        }

        setEditMode(material);
        return;
      }

      if (deleteButton) {
        const materialId = deleteButton.dataset.id;
        const material = materials.find((item) => String(item.id) === String(materialId));
        if (!material) {
          setFeedback("Ferramenta não encontrada.", "error");
          return;
        }

        const confirmation = window.confirm(
          `Excluir a ferramenta ${material.material}? Essa ação não pode ser desfeita.`
        );
        if (!confirmation) {
          return;
        }

        try {
          await services.materials.remove(materialId);
          materials = materials.filter((item) => String(item.id) !== String(materialId));
          if (editingMaterialId && String(editingMaterialId) === String(materialId)) {
            setEditMode(null);
            formMaterials.reset();
          }
          updateSummary();
          renderMaterials();
          renderPanelSummary();
          setFeedback("Ferramenta excluída com sucesso.", "success");
        } catch (error) {
          setFeedback(error?.message || "Não foi possível excluir a ferramenta.", "error");
        }
      }
    });

    updateSummary();
    renderMaterials();
    renderPanelSummary();

    startRealtimeRefresh(
      refreshMaterials,
      "materiais"
    );
  }

  /* ==============================
     PAGINA:PERFIL
  ============================== */
  async function setupProfilePage() {
    const profileName = document.getElementById("perfilNome");
    const profileRole = document.getElementById("perfilCargo");
    const profileStatus = document.getElementById("perfilStatus");
    const profileEmail = document.getElementById("perfilEmail");
    const profileDate = document.getElementById("perfilData");
    const profileAvatarImage = document.getElementById("perfilAvatarImage");
    const profileAvatarInput = document.getElementById("perfilAvatarInput");

    if (!profileName || !profileEmail) {
      return;
    }

    function setProfileStatus(message = "", type = "") {
      if (!profileStatus) return;
      profileStatus.textContent = message;
      profileStatus.dataset.state = type;
    }

    function applyProfileData(user, session) {
      profileName.textContent = buildDisplayName(user, session?.email);
      profileRole.textContent = session?.token ? "Conta autenticada e conectada ao ambiente de gestão." : "Conta sem autenticação ativa.";
      profileEmail.textContent = user?.email || session?.email || "operacao@camposync.app";
      profileDate.textContent = user?.createdAt
        ? new Date(user.createdAt).toLocaleDateString("pt-BR")
        : (session?.loggedAt ? new Date(session.loggedAt).toLocaleDateString("pt-BR") : "-");
      if (profileAvatarImage) {
        profileAvatarImage.src = resolveProfileAvatar(user);
      }
    }

    let session = readAuthSession();
    let user = session?.user || null;

    if (session?.token) {
      try {
        const payload = await apiRequest("/auth/me");
        user = payload?.user || user;
        if (user) {
          session = {
            ...session,
            email: user.email || session.email,
            user
          };
          saveAuthSession(session);
        }
      } catch (error) {
        reportClientIssue("Nao foi possivel sincronizar o perfil com o backend.", error);
      }
    }

    applyProfileData(user, session);

    profileAvatarInput?.addEventListener("change", async (event) => {
      const file = event.target.files?.[0];
      if (!file) return;

      if (!session?.token) {
        setProfileStatus("Entre na conta para salvar uma foto de perfil.", "error");
        event.target.value = "";
        return;
      }

      if (!file.type.startsWith("image/")) {
        setProfileStatus("Selecione uma imagem valida para o perfil.", "error");
        event.target.value = "";
        return;
      }

      if (file.size > PROFILE_AVATAR_MAX_FILE_SIZE) {
        setProfileStatus("A imagem deve ter no maximo 900 KB.", "error");
        event.target.value = "";
        return;
      }

      const previousAvatar = profileAvatarImage?.src || DEFAULT_PROFILE_AVATAR;

      try {
        setProfileStatus("Salvando foto de perfil...", "");
        const avatarUrl = await readFileAsDataUrl(file);
        if (profileAvatarImage) {
          profileAvatarImage.src = avatarUrl;
        }

        const payload = await services.auth.updateProfile({ avatarUrl });
        user = payload?.user || user;
        session = {
          ...session,
          email: user?.email || session?.email,
          user
        };
        saveAuthSession(session, { remember: session?.remember });
        applyProfileData(user, session);
        setProfileStatus("Foto de perfil atualizada com sucesso.", "success");
      } catch (error) {
        if (profileAvatarImage) {
          profileAvatarImage.src = previousAvatar;
        }
        setProfileStatus(error?.message || "Nao foi possivel salvar a foto de perfil agora.", "error");
      } finally {
        event.target.value = "";
      }
    });
  }

  async function logoutUser() {
    const session = readAuthSession();
    if (session?.token) {
      await registerAuditLog({
        type: "Autenticacao",
        title: "Logout realizado",
        details: `Usuario ${session.user?.email || session.email || "desconhecido"} encerrou a sessao.`,
        area: "Autenticacao",
        status: "Concluido",
        source: "frontend",
        entityType: "session"
      });
    }
    clearAuthSession();
    window.location.href = "login.html";
  }

  window.logoutUser = logoutUser;

  /* ==============================
     PAGINA: HISTORICO
  ============================== */
  async function setupHistoryPage() {
    const tableBody = document.getElementById("corpoTabelaHistorico");
    const timeline = document.getElementById("timelineHistorico");
    const summary = document.getElementById("resumoOperacionalHistorico");
    const periodFilter = document.getElementById("filtroPeriodoHistorico");
    const typeFilter = document.getElementById("filtroTipoHistorico");
    const userFilter = document.getElementById("filtroUsuarioHistorico");
    const searchInput = document.getElementById("buscaHistorico");
    const btnFiltrar = document.getElementById("btnFiltrarHistorico");
    const btnLimpar = document.getElementById("btnLimparHistorico");
    const registrosHoje = document.getElementById("resumoHistoricoHoje");
    const alertasResolvidos = document.getElementById("resumoAlertasResolvidos");
    const usuariosAtivos = document.getElementById("resumoUsuariosAtivos");

    if (!tableBody || !timeline || !summary || !periodFilter || !typeFilter || !userFilter || !searchInput) {
      return;
    }

    const [auditLogs, purchases, consumptions, sales, actions, notifications, materials] = await Promise.all([
      services.auditLogs.list(),
      services.purchases.list(),
      services.consumptions.list(),
      services.sales.list(),
      services.actions.list(),
      services.notifications.list(),
      services.materials.list()
    ]);
    const session = readAuthSession();

    const today = new Date().toISOString().slice(0, 10);
    const fallbackRecords = [
      ...purchases.map((item) => ({
        type: "Compras",
        user: item.createdBy || item.updatedBy || session?.email || "Sistema",
        area: item.category,
        date: item.date,
        time: String(item.createdAt || "").slice(11, 16),
        status: Number(item.stock) <= Number(item.minStock) ? "Atenção" : "Concluído",
        title: item.item,
        details: `Compra registrada com total de ${formatCurrency(Number(item.quantity) * Number(item.unitPrice))}.`
      })),
      ...consumptions.map((item) => ({
        type: "Consumos",
        user: item.createdBy || item.updatedBy || session?.email || "Sistema",
        area: item.categoria,
        date: item.data_consumo,
        time: String(item.createdAt || "").slice(11, 16),
        status: Number(item.stock) <= 0 ? "Atencao" : "Concluido",
        title: item.produto,
        details: item.observacoes || `Consumo estimado em ${formatCurrency(Number(item.estimatedCost || 0))}.`
      })),
      ...sales.map((item) => ({
        type: "Vendas",
        user: item.createdBy || item.updatedBy || session?.email || "Sistema",
        area: item.categoria,
        date: item.data_venda,
        time: String(item.createdAt || "").slice(11, 16),
        status: "Concluído",
        title: item.produto || item.categoria,
        details: `Venda consolidada com faturamento de ${formatCurrency(Number(item.quantidade) * Number(item.valor_unitario))}.`
      })),
      ...actions.map((item) => ({
        type: "Ações",
        user: item.createdBy || item.updatedBy || session?.email || "Sistema",
        area: item.unidade,
        date: item.data_acao,
        time: item.hora_acao,
        status: "Concluído",
        title: item.acao,
        details: item.detalhes_acao || "Ação operacional salva."
      })),
      ...notifications.map((item) => ({
        type: "Alertas",
        user: "Sistema",
        area: "Notificações",
        date: today,
        time: item.time || "",
        status: item.read ? "Resolvido" : "Pendente",
        title: item.title,
        details: item.message
      })),
      ...materials.map((item) => ({
        type: "Materiais",
        user: item.createdBy || item.updatedBy || session?.email || "Sistema",
        area: item.dominio || item.categoria,
        date: item.ultima_inspecao || today,
        time: String(item.createdAt || "").slice(11, 16),
        status: item.status,
        title: item.material,
        details: item.observacoes || "Material atualizado."
      }))
    ];

    const auditRecords = auditLogs.map((item) => ({
      type: item.type || "Sistema",
      user: item.user || item.createdBy || "Sistema",
      area: item.area || "Sistema",
      date: item.date || String(item.createdAt || "").slice(0, 10) || today,
      time: item.time || String(item.createdAt || "").slice(11, 16),
      status: item.status || "Concluido",
      title: item.title || "Evento registrado",
      details: item.details || ""
    }));

    const records = (auditRecords.length ? auditRecords : fallbackRecords)
      .sort((a, b) => `${String(b.date)} ${String(b.time || "")}`.localeCompare(`${String(a.date)} ${String(a.time || "")}`));

    const knownTypes = [...new Set(records.map((record) => record.type).filter(Boolean))].sort((a, b) => a.localeCompare(b));
    const knownUsers = [...new Set(records.map((record) => record.user).filter(Boolean))].sort((a, b) => a.localeCompare(b));

    typeFilter.innerHTML = ['<option value="todos">Todos os tipos</option>', ...knownTypes.map((type) => `<option value="${escapeHtml(type)}">${escapeHtml(type)}</option>`)].join("");
    userFilter.innerHTML = ['<option value="todos">Todos os usuários</option>', ...knownUsers.map((user) => `<option value="${escapeHtml(user)}">${escapeHtml(user)}</option>`)].join("");

    function matchesPeriod(date, period) {
      if (period === "todos") return true;
      const target = new Date(`${date}T00:00:00`);
      const now = new Date();
      const diffDays = Math.floor((now - target) / 86400000);
      if (period === "hoje") return date === today;
      if (period === "7dias") return diffDays <= 7;
      if (period === "30dias") return diffDays <= 30;
      return true;
    }

    function getFilteredRecords() {
      const period = periodFilter.value;
      const type = typeFilter.value;
      const user = userFilter.value;
      const term = searchInput.value.trim().toLowerCase();

      return records.filter((record) => {
        const matchesPeriodValue = matchesPeriod(record.date, period);
        const matchesType = type === "todos" || record.type === type;
        const matchesUser = user === "todos" || record.user === user;
        const matchesTerm = [record.title, record.area, record.details, record.user].some((value) => String(value).toLowerCase().includes(term));
        return matchesPeriodValue && matchesType && matchesUser && matchesTerm;
      });
    }

    function renderSummaryCards() {
      if (registrosHoje) registrosHoje.textContent = String(records.filter((record) => record.date === today).length);
      if (alertasResolvidos) alertasResolvidos.textContent = String(notifications.filter((item) => item.read).length);
      if (usuariosAtivos) usuariosAtivos.textContent = String(new Set(records.map((record) => record.user).filter(Boolean)).size);
    }

    function renderHistory() {
      const filtered = getFilteredRecords();

      if (!filtered.length) {
        tableBody.innerHTML = '<tr><td colspan="5" class="linha-vazia">Nenhum registro encontrado com os filtros atuais.</td></tr>';
        timeline.innerHTML = '<p class="estado-vazio">Nenhuma atividade encontrada para os filtros selecionados.</p>';
        summary.innerHTML = '<p class="estado-vazio">Nenhum resumo disponível para os filtros atuais.</p>';
        return;
      }

      tableBody.innerHTML = filtered.map((record) => `
      <tr>
        <td><strong>${escapeHtml(record.title)}</strong><small>${escapeHtml(record.details)}</small></td>
        <td>${escapeHtml(record.user)}</td>
        <td>${escapeHtml(record.area)}</td>
        <td>${escapeHtml(formatDate(record.date))}</td>
        <td><span class="${record.status === "Pendente" || record.status === "Atenção" || record.status === "Quebrado" || record.status === "Indisponivel" ? "selo-status esta-alerta" : "selo-status esta-ok"}">${escapeHtml(record.status)}</span></td>
      </tr>
    `).join("");

      timeline.innerHTML = filtered.slice(0, 6).map((record) => `
      <article class="item-critico">
        <div>
          <strong>${escapeHtml(record.title)}</strong>
          <span>${escapeHtml(record.type)} • ${escapeHtml(record.area)}</span>
          <small>${escapeHtml(record.details)}</small>
        </div>
        <div class="metrica-critica">
          <b>${escapeHtml(formatDate(record.date))}</b>
          <small>${escapeHtml(record.status)}</small>
        </div>
      </article>
    `).join("");

      const grouped = filtered.reduce((acc, record) => {
        acc[record.type] = (acc[record.type] || 0) + 1;
        return acc;
      }, {});

      summary.innerHTML = Object.entries(grouped).map(([label, total]) => `
      <article class="item-critico">
        <div>
          <strong>${escapeHtml(label)}</strong>
          <span>Registros filtrados</span>
        </div>
        <div class="metrica-critica">
          <b>${total}</b>
          <small>itens</small>
        </div>
      </article>
    `).join("");
    }

    btnFiltrar?.addEventListener("click", renderHistory);
    btnLimpar?.addEventListener("click", () => {
      periodFilter.value = "7dias";
      typeFilter.value = "todos";
      userFilter.value = "todos";
      searchInput.value = "";
      renderHistory();
    });
    periodFilter.addEventListener("change", renderHistory);
    typeFilter.addEventListener("change", renderHistory);
    userFilter.addEventListener("change", renderHistory);
    searchInput.addEventListener("input", renderHistory);

    renderSummaryCards();
    renderHistory();
  }

  /* ==============================
     HOME / MAPA
  ============================== */
  async function setupHomeMap() {
    const mapElement = document.getElementById("mapa");
    if (!mapElement) {
      return;
    }

    const [locations, customUnits] = await Promise.all([
      services.locations.list().catch((error) => {
        reportClientIssue("Falha ao carregar localizacoes do mapa.", error);
        return [];
      }),
      services.units.listCustom().catch((error) => {
        reportClientIssue("Falha ao carregar unidades do mapa.", error);
        return [];
      })
    ]);
    const mapLocations = normalizeMapLocations([...locations, ...customUnits]);

    function cor(status) {
      const cores = {
        avicultura: "#808000",
        piscicultura: "#00BFFF",
        agrofloresta: "#8B4513",
        medicinais: "#9370DB",
        fruticultura: "#FF8C00",
        suinocultura: "#FF69B4",
        mudas: "#90EE90",
        sequeiro: "#DAA520",
        horticultura: "#228B22",
        forrageiras: "#556B2F",
        animal: "#2F80ED",
        planta: "#2F6F4F",
        flora: "#2F6F4F"
      };
      return cores[status] || "#050505";
    }

    if (typeof L === "undefined") {
      renderStaticHomeMap(mapElement, mapLocations);
      return;
    }

    try {
      const map = L.map("mapa", {
        maxZoom: 20
      }).setView([-4.377339, -39.456749], 15);
      const transparentTile =
        "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";

      const normalLayer = L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          maxZoom: 20,
          maxNativeZoom: 19,
          attribution: '© OpenStreetMap contributors'
        }
      );

      const satelliteImageryLayer = L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        {
          maxZoom: 20,
          maxNativeZoom: 18,
          errorTileUrl: transparentTile,
          attribution: "Tiles © Esri"
        }
      );

      const baseMaps = {
        "Normal": normalLayer,
        "Satélite": satelliteImageryLayer
      };

      normalLayer.addTo(map);
      L.control.layers(baseMaps, null, { collapsed: true, position: "topright" }).addTo(map);

      const markerGroup = L.featureGroup();

      mapLocations.forEach((local) => {
        L.circleMarker([local.lat, local.lng], {
          color: cor(local.status),
          fillColor: cor(local.status),
          fillOpacity: 0.82,
          radius: 9,
          weight: 3
        })
          .addTo(markerGroup)
          .bindPopup(`
          <b>${escapeHtml(local.nome)}</b><br>
          Categoria: ${escapeHtml(local.categoryLabel || local.status)}
        `);
      });

      markerGroup.addTo(map);

      if (mapLocations.length === 1) {
        map.setView([mapLocations[0].lat, mapLocations[0].lng], 17);
      } else if (mapLocations.length > 1) {
        map.fitBounds(markerGroup.getBounds(), {
          padding: [28, 28],
          maxZoom: 18
        });
      }

      window.requestAnimationFrame(() => {
        map.invalidateSize();
      });
      window.addEventListener("load", () => map.invalidateSize(), { once: true });
    } catch (error) {
      reportClientIssue("Nao foi possivel inicializar o Leaflet. Renderizando mapa local.", error);
      renderStaticHomeMap(mapElement, mapLocations);
    }
  }

  function renderStaticHomeMap(mapElement, locais) {
    if (!mapElement) return;

    const pontos = normalizeMapLocations(locais);
    mapElement.classList.add("mapa--fallback");

    if (!pontos.length) {
      mapElement.innerHTML = `
      <div class="mapa-fallback__sem-dados">
        <strong>Mapa indisponível</strong>
        <span>Não há localizações carregadas no momento.</span>
      </div>
    `;
      return;
    }

    const bounds = getStaticMapBounds(pontos);

    mapElement.innerHTML = `
    <div class="mapa-fallback__camada" aria-hidden="true"></div>
    <div class="mapa-fallback__grade" aria-hidden="true"></div>
    <div class="mapa-fallback__legenda">
      <strong>Mapa das unidades</strong>
      <span>Visualizacao local carregada</span>
    </div>
    <div class="mapa-fallback__pontos" aria-label="Mapa simplificado das unidades produtivas"></div>
  `;

    const pontosContainer = mapElement.querySelector(".mapa-fallback__pontos");
    if (!pontosContainer) return;

    pontos.forEach((local) => {
      const top = normalizeCoordinate(local.lat, bounds.minLat, bounds.maxLat, true);
      const left = normalizeCoordinate(local.lng, bounds.minLng, bounds.maxLng, false);
      const marker = document.createElement("button");
      marker.type = "button";
      marker.className = "mapa-fallback__ponto";
      marker.dataset.status = local.status === "baixo" ? "baixo" : "ok";
      marker.style.top = `${top}%`;
      marker.style.left = `${left}%`;
      marker.setAttribute("aria-label", `${local.nome} - categoria ${local.categoryLabel || local.status}`);
      marker.innerHTML = `
      <span class="mapa-fallback__pulse" aria-hidden="true"></span>
      <span class="mapa-fallback__pin" aria-hidden="true"></span>
      <span class="mapa-fallback__tooltip">
        <strong>${escapeHtml(local.nome)}</strong>
        <small>Categoria: ${escapeHtml(local.categoryLabel || local.status)}</small>
      </span>
    `;
      pontosContainer.appendChild(marker);
    });
  }

  function normalizeMapLocations(locais) {
    if (!Array.isArray(locais)) return [];

    const normalized = locais
      .map((local) => {
        const coordinates = parseMapCoordinates(local?.coors ?? local?.coords);
        const lat = Number(local?.lat ?? local?.latitude ?? coordinates?.[0]);
        const lng = Number(local?.lng ?? local?.longitude ?? coordinates?.[1]);

        if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
          return null;
        }

        const rawStatus = local.status || local.tipo || local.category || local.categoria || local.slug || local.nome || local.name || "ok";

        return {
          ...local,
          nome: local.nome || local.name || local.slug || "Unidade produtiva",
          lat,
          lng,
          status: normalizeMapStatus(rawStatus),
          categoryLabel: getMapCategoryLabel(rawStatus)
        };
      })
      .filter(Boolean);

    const byIdentity = new Map();
    normalized.forEach((local) => {
      const key = String(local.slug || local.id || local.nome || `${local.lat},${local.lng}`).toLowerCase();
      const current = byIdentity.get(key);
      if (!current || !Number.isFinite(Number(current.lat)) || !Number.isFinite(Number(current.lng))) {
        byIdentity.set(key, local);
      }
    });

    return [...byIdentity.values()];
  }

  function parseMapCoordinates(value) {
    if (Array.isArray(value)) {
      return value;
    }

    if (value && typeof value === "object") {
      return [
        value.lat ?? value.latitude ?? value.y ?? value[0],
        value.lng ?? value.longitude ?? value.x ?? value[1]
      ];
    }

    if (typeof value === "string") {
      const trimmed = value.trim();
      if (!trimmed) return null;

      try {
        return parseMapCoordinates(JSON.parse(trimmed));
      } catch (_error) {
        const parts = trimmed.split(/[,\s;]+/).map(Number).filter(Number.isFinite);
        return parts.length >= 2 ? parts : null;
      }
    }

    return null;
  }

  function normalizeMapStatus(value = "") {
    return String(value || "ok")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "-");
  }

  function getMapCategoryLabel(value = "") {
    const status = normalizeMapStatus(value);
    const labels = {
      animal: "Animal",
      planta: "Flora",
      flora: "Flora",
      plantas: "Flora",
      floras: "Flora"
    };

    return labels[status] || String(value || "Unidade").trim();
  }

  function getStaticMapBounds(locais) {
    const latitudes = locais.map((local) => Number(local.lat));
    const longitudes = locais.map((local) => Number(local.lng));
    const minLat = Math.min(...latitudes);
    const maxLat = Math.max(...latitudes);
    const minLng = Math.min(...longitudes);
    const maxLng = Math.max(...longitudes);
    const latPadding = Math.max((maxLat - minLat) * 0.25, 0.0008);
    const lngPadding = Math.max((maxLng - minLng) * 0.25, 0.0008);

    return {
      minLat: minLat - latPadding,
      maxLat: maxLat + latPadding,
      minLng: minLng - lngPadding,
      maxLng: maxLng + lngPadding
    };
  }

  function normalizeCoordinate(value, min, max, invert = false) {
    if (!Number.isFinite(value) || !Number.isFinite(min) || !Number.isFinite(max) || min === max) {
      return 50;
    }

    const percentage = ((value - min) / (max - min)) * 100;
    const limited = Math.min(92, Math.max(8, percentage));
    return invert ? 100 - limited : limited;
  }

  /* ==============================
     LOGIN
  ============================== */
  async function setupAuthPages() {
    const currentPage = getCurrentPageName();
    const formLogin = document.getElementById("formLogin");
    const formRecovery = document.getElementById("formRecuperarSenha");
    const externalAuthResult = consumeExternalAuthResult();

    if (externalAuthResult?.status === "success" && externalAuthResult.token) {
      const rememberFromOAuth = consumePendingOAuthRemember();
      const sessionFromExternalAuth = {
        email: externalAuthResult.email,
        user: {
          id: externalAuthResult.userId ? Number(externalAuthResult.userId) : null,
          email: externalAuthResult.email,
          name: externalAuthResult.name || ""
        },
        token: externalAuthResult.token,
        remember: rememberFromOAuth ?? readRememberPreference(),
        loggedAt: new Date().toISOString()
      };

      saveAuthSession(sessionFromExternalAuth, {
        remember: rememberFromOAuth ?? readRememberPreference()
      });
    }

    const session = readAuthSession();

    if (!isPublicPage(currentPage) && !session?.token) {
      window.location.replace("login.html");
      return false;
    }

    if ((currentPage === "login.html" || currentPage === "cadastro.html") && session?.token) {
      window.location.replace("index.html");
      return false;
    }

    if (formRecovery) {
      const feedback = formRecovery.querySelector(".retorno-form");
      const recoveryDescription = document.getElementById("descricaoRecuperacaoSenha");
      const recoveryButton = document.getElementById("botaoRecuperacaoSenha");
      const resetFields = document.getElementById("camposRedefinicaoSenha");
      let isRecoveryResetMode = false;

      function setRecoveryFeedback(message = "", type = "") {
        if (!feedback) return;
        feedback.textContent = message;
        feedback.dataset.state = type;
      }

      function setRecoveryMode(mode = "request") {
        const isResetMode = mode === "reset";

        if (resetFields) {
          resetFields.hidden = !isResetMode;
        }

        if (recoveryDescription) {
          recoveryDescription.textContent = isResetMode
            ? "Digite o código enviado para seu e-mail e defina uma nova senha."
            : "Informe seu e-mail para receber o código de redefinição de senha.";
        }

        if (recoveryButton) {
          recoveryButton.textContent = isResetMode ? "Redefinir senha" : "Enviar instruções";
        }

        const emailInput = document.getElementById("emailRecuperacao");
        const codeInput = document.getElementById("codigoRecuperacao");
        const passwordInput = document.getElementById("novaSenhaRecuperacao");
        const confirmPasswordInput = document.getElementById("confirmarSenhaRecuperacao");

        if (emailInput) {
          emailInput.required = true;
        }

        if (codeInput) {
          codeInput.required = isResetMode;
        }

        if (passwordInput) {
          passwordInput.required = isResetMode;
        }

        if (confirmPasswordInput) {
          confirmPasswordInput.required = isResetMode;
        }
      }

      setRecoveryMode("request");

      formRecovery.addEventListener("submit", async (event) => {
        event.preventDefault();
        setRecoveryFeedback("", "");

        if (isRecoveryResetMode) {
          const formData = new FormData(formRecovery);
          const email = String(formData.get("email") || "").trim().toLowerCase();
          const code = String(formData.get("code") || "").replace(/\D/g, "");
          const password = String(formData.get("password") || "").trim();
          const confirmPassword = String(formData.get("confirmPassword") || "").trim();

          if (!email || !code) {
            setRecoveryFeedback("Informe o e-mail e o código recebido.", "error");
            return;
          }

          if (!password || !confirmPassword) {
            setRecoveryFeedback("Preencha e confirme a nova senha.", "error");
            return;
          }

          if (password !== confirmPassword) {
            setRecoveryFeedback("As senhas informadas não coincidem.", "error");
            return;
          }

          try {
            await apiRequest("/auth/password-reset", {
              method: "POST",
              body: { email, code, password }
            });

            formRecovery.reset();
            isRecoveryResetMode = false;
            setRecoveryMode("request");
            setRecoveryFeedback("Senha redefinida com sucesso. Você já pode fazer login.", "success");
            window.setTimeout(() => {
              window.location.href = "login.html";
            }, 1200);
          } catch (error) {
            setRecoveryFeedback(error?.message || "Não foi possível redefinir a senha.", "error");
          }

          return;
        }

        const email = String(new FormData(formRecovery).get("email") || "").trim().toLowerCase();
        if (!email) {
          setRecoveryFeedback("Informe um e-mail válido para continuar.", "error");
          return;
        }

        try {
          const payload = await apiRequest("/auth/password-recovery-request", {
            method: "POST",
            body: { email }
          });
          isRecoveryResetMode = true;
          setRecoveryMode("reset");
          setRecoveryFeedback(payload?.message || "Se este e-mail estiver cadastrado, o código de redefinição foi enviado.", "success");
        } catch (error) {
          setRecoveryFeedback(error?.message || "Não foi possível iniciar a recuperação de senha.", "error");
        }
      });
    }

    if (!formLogin) {
      return true;
    }

    const feedback = formLogin.querySelector(".retorno-form");
    const rememberInput = formLogin.querySelector('input[name="lembrar"]');

    if (rememberInput) {
      rememberInput.checked = readRememberPreference();
      rememberInput.addEventListener("change", () => {
        setRememberPreference(Boolean(rememberInput.checked));
      });
    }

    if (externalAuthResult?.status === "error" && feedback) {
      feedback.textContent = externalAuthResult.message || "Não foi possível entrar com o Google.";
      feedback.dataset.state = "error";
    }

    if (currentPage === "cadastro.html") {
      function setFeedback(message = "", type = "") {
        if (!feedback) return;
        feedback.textContent = message;
        feedback.dataset.state = type;
      }

      formLogin.addEventListener("submit", async (event) => {
        event.preventDefault();
        const formData = new FormData(formLogin);
        const name = String(formData.get("name") || "").trim();
        const email = String(formData.get("email") || "").trim().toLowerCase();
        const password = String(formData.get("password") || "").trim();

        if (!name || !email || !password) {
          setFeedback("Preencha nome, e-mail e senha para concluir o cadastro.", "error");
          return;
        }

        try {
          await apiRequest("/auth/register", {
            method: "POST",
            body: { name, email, password }
          });

          clearAuthSession();
          setFeedback("Cadastro realizado com sucesso. Redirecionando para o login...", "success");
          window.setTimeout(() => {
            window.location.assign("login.html");
          }, 700);
        } catch (error) {
          setFeedback(error?.message || "Não foi possivel concluir o cadastro.", "error");
        }
      });
      return true;
    }

    function setFeedback(message = "", type = "") {
      if (!feedback) return;
      feedback.textContent = message;
      feedback.dataset.state = type;
    }

    formLogin.addEventListener("submit", async (event) => {
      event.preventDefault();
      const formData = new FormData(formLogin);
      const email = String(formData.get("email") || "").trim().toLowerCase();
      const password = String(formData.get("password") || "").trim();
      const remember = String(formData.get("lembrar") || "").toLowerCase() === "on";

      if (!email || !password) {
        setFeedback("Preencha e-mail e senha para continuar.", "error");
        return;
      }

      try {
        const payload = await apiRequest("/auth/login", {
          method: "POST",
          body: { email, password }
        });

        const session = {
          email: payload?.user?.email || email,
          user: payload?.user || null,
          token: payload?.token || "",
          remember,
          loggedAt: new Date().toISOString()
        };

        saveAuthSession(session, { remember });
        setFeedback("Login realizado com sucesso. Redirecionando...", "success");
        window.setTimeout(() => {
          window.location.href = "index.html";
        }, 500);
      } catch (error) {
        clearAuthSession();
        setFeedback(error?.message || "Credenciais inválidas. Verifique e tente novamente.", "error");
      }
    });

    return true;
  }

  function loginGoogle() {
    const config = getRuntimeConfig();
    const rememberInput = document.querySelector('#formLogin input[name="lembrar"]');
    const remember = rememberInput ? Boolean(rememberInput.checked) : readRememberPreference();
    setRememberPreference(remember);
    savePendingOAuthRemember(remember);
    const targetUrl = new URL(config.authGoogleUrl, window.location.origin);
    targetUrl.searchParams.set("frontend_origin", window.location.origin);
    targetUrl.searchParams.set("frontend_return_url", window.location.href.split("#")[0]);
    window.location.href = targetUrl.toString();
  }

  window.loginGoogle = loginGoogle;

  // ================================
  // CONFIG PADRÃO
  // ================================
  const configPadrao = {
    texto: "normal",
    contraste: "padrao",
    espacamento: "normal",
    daltonismo: "normal",
    animacao: false,
    foco: true,
    leitor: false
  };

  // ================================
  // SALVAR / CARREGAR
  // ================================
  function salvarConfig(config) {
    localStorage.setItem("acessibilidade", JSON.stringify(config));
  }

  function carregarConfig() {
    try {
      const configSalva = JSON.parse(localStorage.getItem("acessibilidade"));
      return { ...configPadrao, ...(configSalva || {}) };
    } catch (error) {
      return { ...configPadrao };
    }
  }

  let config = carregarConfig();

  if (config.contraste === "padrão") {
    config.contraste = "padrao";
  }

  // ================================
  // LEITOR DE TELA MELHORADO
  // ================================
  let leitorAtivo = false;

  function obterTextoParaLeitura(elemento) {
    if (!elemento) return "";

    const controle = elemento.closest("button, a, input, select, textarea, label, p, h1, h2, h3, h4, li");
    if (!controle) return "";

    if (controle.matches("select")) {
      const label = document.querySelector(`label[for="${controle.id}"]`)?.textContent?.trim() || controle.name || "Seleção";
      const selectedText = controle.options?.[controle.selectedIndex]?.textContent?.trim() || "";
      return selectedText ? `${label}: ${selectedText}` : label;
    }

    if (controle.matches('input[type="checkbox"]')) {
      const label = controle.closest("label")?.textContent?.trim()
        || document.querySelector(`label[for="${controle.id}"]`)?.textContent?.trim()
        || controle.closest(".acessibilidade-toggle-item")?.querySelector("span")?.textContent?.trim()
        || "Opção";
      return `${label}: ${controle.checked ? "ativado" : "desativado"}`;
    }

    if (controle.matches("input, textarea")) {
      const label = document.querySelector(`label[for="${controle.id}"]`)?.textContent?.trim() || controle.name || controle.placeholder || "Campo";
      return controle.value ? `${label}: ${controle.value}` : label;
    }

    return controle.innerText?.trim() || controle.textContent?.trim() || controle.getAttribute("aria-label") || "";
  }

  function falarMensagem(texto) {
    if (!leitorAtivo || !texto || !("speechSynthesis" in window)) return;

    const speech = new SpeechSynthesisUtterance(texto);
    const voices = speechSynthesis.getVoices();
    speech.voice = voices.find((voice) => voice.lang.includes("pt")) || voices[0];
    speech.lang = "pt-BR";

    speechSynthesis.cancel();
    speechSynthesis.speak(speech);
  }

  function falarTexto(e) {
    if (!leitorAtivo) return;
    if (e.target.closest("[data-accessibility-setting] button, [data-accessibility-toggle]")) return;
    if (e.type === "click" && e.target.closest("input, select, textarea")) return;

    falarMensagem(obterTextoParaLeitura(e.target));
  }

  function ativarLeitor() {
    if (!("speechSynthesis" in window)) return;
    leitorAtivo = true;
    document.addEventListener("click", falarTexto);
    document.addEventListener("change", falarTexto);
  }

  function desativarLeitor() {
    leitorAtivo = false;
    document.removeEventListener("click", falarTexto);
    document.removeEventListener("change", falarTexto);
    if ("speechSynthesis" in window) {
      speechSynthesis.cancel();
    }
  }

  // ================================
  // APLICAR CONFIG
  // ================================
  function aplicarConfig() {
    const body = document.body;
    const root = document.documentElement;
    const classesAcessibilidade = [
      "acessibilidade-texto-pequeno",
      "acessibilidade-texto-normal",
      "acessibilidade-texto-grande",
      "acessibilidade-contraste-alto",
      "acessibilidade-contraste-max",
      "acessibilidade-espaco-compacto",
      "acessibilidade-espaco-normal",
      "acessibilidade-espaco-amplo",
      "acessibilidade-daltonismo-deuteranopia",
      "acessibilidade-daltonismo-protanopia",
      "acessibilidade-daltonismo-tritanopia",
      "acessibilidade-sem-animacao",
      "acessibilidade-animacao-reduzida",
      "acessibilidade-foco-visivel"
    ];

    body.classList.remove(...classesAcessibilidade);
    root.classList.remove(
      "acessibilidade-texto-pequeno",
      "acessibilidade-texto-normal",
      "acessibilidade-texto-grande"
    );

    // TEXTO
    root.classList.add("acessibilidade-texto-" + config.texto);
    body.classList.add("acessibilidade-texto-" + config.texto);

    // CONTRASTE
    if (config.contraste !== "padrao") {
      body.classList.add("acessibilidade-contraste-" + config.contraste);
    }

    // ESPAÇAMENTO
    body.classList.add("acessibilidade-espaco-" + config.espacamento);

    // DALTONISMO
    if (config.daltonismo !== "normal") {
      body.classList.add("acessibilidade-daltonismo-" + config.daltonismo);
    }

    // ANIMAÇÃO
    if (config.animacao) {
      body.classList.add("acessibilidade-animacao-reduzida");
    }

    // FOCO
    if (config.foco) {
      body.classList.add("acessibilidade-foco-visivel");
    }

    // LEITOR
    if (config.leitor) {
      ativarLeitor();
    } else {
      desativarLeitor();
    }
  }

  function sincronizarControlesAcessibilidade() {
    document.querySelectorAll("[data-accessibility-setting]").forEach((grupo) => {
      const setting = grupo.dataset.accessibilitySetting;
      const valorAtual = config[setting];

      grupo.querySelectorAll("button").forEach((botao) => {
        const ativo = botao.dataset.accessibilityValue === valorAtual;
        botao.classList.toggle("acessibilidade-opcao-ativa", ativo);
        botao.setAttribute("aria-pressed", ativo ? "true" : "false");
      });
    });

    document.querySelectorAll("[data-accessibility-toggle]").forEach((toggle) => {
      const setting = toggle.dataset.accessibilityToggle;
      toggle.checked = Boolean(config[setting]);
    });
  }

  // ================================
  // EVENTOS
  // ================================
  function ativarEventos() {
    document.querySelectorAll("[data-accessibility-setting] button").forEach((btn) => {
      btn.addEventListener("click", () => {
        const grupo = btn.closest("[data-accessibility-setting]");
        const setting = grupo?.dataset.accessibilitySetting;
        const valor = btn.dataset.accessibilityValue;

        if (!setting || !valor) return;

        config[setting] = valor;
        salvarConfig(config);
        aplicarConfig();
        sincronizarControlesAcessibilidade();
        falarMensagem(`${setting}: ${btn.innerText.trim()} selecionado`);
      });
    });

    document.querySelectorAll("[data-accessibility-toggle]").forEach((toggle) => {
      toggle.addEventListener("change", () => {
        const setting = toggle.dataset.accessibilityToggle;
        if (!setting) return;

        const estavaAtivo = leitorAtivo;
        config[setting] = toggle.checked;
        if (estavaAtivo && !toggle.checked) {
          falarMensagem("Leitor de tela desativado");
        }
        salvarConfig(config);
        aplicarConfig();
        sincronizarControlesAcessibilidade();
        if (toggle.checked) {
          falarMensagem("Leitor de tela ativado");
        }
      });
    });

    document.querySelectorAll(".acessibilidade-link-item").forEach((link) => {
      if (link.innerText.includes("Restaurar")) {
        link.addEventListener("click", () => {
          config = { ...configPadrao };
          salvarConfig(config);
          aplicarConfig();
          sincronizarControlesAcessibilidade();
          falarMensagem("Padrões de acessibilidade restaurados");
        });
      }
    });
  }

  // ================================
  // INICIALIZAÇÃO
  // ================================
  document.addEventListener("DOMContentLoaded", () => {
    aplicarConfig();

    if (document.querySelector(".pagina-acessibilidade")) {
      sincronizarControlesAcessibilidade();
      ativarEventos();
    }
  });
