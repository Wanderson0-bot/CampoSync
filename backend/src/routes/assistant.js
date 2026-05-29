import express from 'express';
import { env } from '../config/env.js';
import { db } from '../config/database.js';
import { writeAuditLog } from '../lib/audit.js';
import { asyncHandler } from '../lib/http.js';
import { requireString } from '../lib/validators.js';
import { requireAuth } from '../middlewares/auth.js';

const router = express.Router();

const DOMAIN_KEYWORDS = [
  'camposync', 'estoque', 'historico', 'histórico', 'acao', 'ação', 'acoes', 'ações',
  'compra', 'compras', 'venda', 'vendas', 'consumo', 'consumos', 'material', 'materiais',
  'suprimento', 'suprimentos', 'area', 'área', 'areas', 'áreas', 'produtiva', 'produtivas',
  'financeiro', 'financeira', 'gasto', 'gastos', 'receita', 'saldo', 'lucro', 'grafico',
  'gráfico', 'graficos', 'gráficos', 'registro', 'registros', 'alerta', 'alertas',
  'notificacao', 'notificação', 'notificacoes', 'notificações', 'unidade', 'unidades',
  'painel', 'dashboard', 'cynx', 'relatorio', 'relatório', 'relatorios', 'relatórios'
];

function normalizeText(value = '') {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

function includesAny(text, keywords = []) {
  return keywords.some((keyword) => text.includes(normalizeText(keyword)));
}

function formatNumber(value) {
  return Number(value || 0).toLocaleString('pt-BR');
}

function formatCurrency(value) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(Number(value || 0));
}

function formatDateTimeLabel(value) {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  return date.toLocaleString('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short'
  });
}

function formatDateOnlyLabel(value) {
  if (!value) return '-';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  return date.toLocaleDateString('pt-BR');
}

function escapePdfText(value = '') {
  return String(value || '')
    .replaceAll('\\', '\\\\')
    .replaceAll('(', '\\(')
    .replaceAll(')', '\\)');
}

function buildPdfBuffer(title, lines) {
  const fullReport = [title, ...lines].join('\n');
  const allLines = fullReport.split('\n');
  const wasTruncated = allLines.length > 80;
  const safeLines = allLines.slice(0, 80);
  if (wasTruncated) {
    safeLines.push('', '⚠ Relatorio truncado. Use filtros de periodo para ver mais detalhes.');
  }

  let content = 'BT\n/F1 12 Tf\n50 780 Td\n14 TL\n';
  safeLines.forEach((line, index) => {
    content += `(${escapePdfText(line)}) Tj\n`;
    if (index < safeLines.length - 1) {
      content += 'T*\n';
    }
  });
  content += '\nET';

  const objects = [
    '1 0 obj << /Type /Catalog /Pages 2 0 R >> endobj',
    '2 0 obj << /Type /Pages /Kids [3 0 R] /Count 1 >> endobj',
    '3 0 obj << /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >> endobj',
    `4 0 obj << /Length ${Buffer.byteLength(content, 'latin1')} >> stream\n${content}\nendstream endobj`,
    '5 0 obj << /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >> endobj'
  ];

  let pdf = '%PDF-1.4\n';
  const offsets = [0];

  objects.forEach((object) => {
    offsets.push(Buffer.byteLength(pdf, 'latin1'));
    pdf += `${object}\n`;
  });

  const xrefOffset = Buffer.byteLength(pdf, 'latin1');
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += '0000000000 65535 f \n';
  offsets.slice(1).forEach((offset) => {
    pdf += `${String(offset).padStart(10, '0')} 00000 n \n`;
  });
  pdf += `trailer << /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

  return Buffer.from(pdf, 'latin1');
}

function sumBy(items, projector) {
  return items.reduce((total, item) => total + Number(projector(item) || 0), 0);
}

function groupTotals(items, keySelector, valueSelector) {
  const totals = new Map();

  items.forEach((item) => {
    const key = String(keySelector(item) || 'Sem categoria').trim() || 'Sem categoria';
    const nextValue = Number(valueSelector(item) || 0);
    totals.set(key, (totals.get(key) || 0) + nextValue);
  });

  return [...totals.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);
}

function extractDateValue(item) {
  return String(
    item?.date ||
    item?.data_venda ||
    item?.data_consumo ||
    item?.data_acao ||
    item?.activityDate ||
    item?.ultima_inspecao ||
    item?.createdAt ||
    item?.updatedAt ||
    ''
  ).trim();
}

function parsePeriodFilter(text) {
  const normalized = normalizeText(text);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  if (normalized.includes('hoje')) {
    return {
      label: 'hoje',
      match: (value) => formatDateOnlyLabel(value) === formatDateOnlyLabel(today)
    };
  }

  if (normalized.includes('ontem')) {
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    return {
      label: 'ontem',
      match: (value) => formatDateOnlyLabel(value) === formatDateOnlyLabel(yesterday)
    };
  }

  if (normalized.includes('esta semana') || normalized.includes('essa semana')) {
    const weekStart = new Date(today);
    const day = weekStart.getDay() || 7;
    weekStart.setDate(weekStart.getDate() - day + 1);
    return {
      label: 'esta semana',
      match: (value) => {
        const date = new Date(value);
        return !Number.isNaN(date.getTime()) && date >= weekStart;
      }
    };
  }

  if (normalized.includes('este mes') || normalized.includes('esse mes')) {
    const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    return {
      label: 'este mês',
      match: (value) => {
        const date = new Date(value);
        return !Number.isNaN(date.getTime()) && date >= monthStart;
      }
    };
  }

  const lastDaysMatch = normalized.match(/ultimos?\s+(\d+)\s+dias?/);
  if (lastDaysMatch) {
    const days = Number(lastDaysMatch[1]);
    const start = new Date(today);
    start.setDate(start.getDate() - (days - 1));
    return {
      label: `últimos ${days} dias`,
      match: (value) => {
        const date = new Date(value);
        return !Number.isNaN(date.getTime()) && date >= start;
      }
    };
  }

  return null;
}

function buildReferenceTerms(snapshot) {
  const terms = new Set();
  const collectors = [
    ...snapshot.purchases.map((item) => item.category),
    ...snapshot.sales.map((item) => item.categoria),
    ...snapshot.consumptions.map((item) => item.categoria),
    ...snapshot.materials.map((item) => item.categoria),
    ...snapshot.supplies.map((item) => item.domain),
    ...snapshot.actions.map((item) => item.unidade),
    ...snapshot.customUnits.map((item) => item.name || item.nome || item.slug || item.pageSlug),
    ...snapshot.locations.map((item) => item.nome)
  ];

  collectors.forEach((value) => {
    const label = String(value || '').trim();
    if (label) terms.add(label);
  });

  return [...terms];
}

function parseEntityFilter(text, snapshot) {
  const normalized = normalizeText(text);
  const references = buildReferenceTerms(snapshot);
  const matched = references.find((term) => normalized.includes(normalizeText(term)));

  if (!matched) {
    return null;
  }

  const normalizedTerm = normalizeText(matched);
  return {
    label: matched,
    match: (item) => {
      const fields = [
        item?.category,
        item?.categoria,
        item?.domain,
        item?.dominio,
        item?.unidade,
        item?.unitName,
        item?.unitSlug,
        item?.name,
        item?.nome,
        item?.slug,
        item?.pageSlug
      ].map((value) => normalizeText(value));
      return fields.includes(normalizedTerm);
    }
  };
}

function applyFilters(items, { periodFilter = null, entityFilter = null } = {}) {
  return items.filter((item) => {
    const matchesPeriod = !periodFilter || periodFilter.match(extractDateValue(item));
    const matchesEntity = !entityFilter || entityFilter.match(item);
    return matchesPeriod && matchesEntity;
  });
}

async function loadAssistantSnapshot() {
  const [
    notifications,
    auditLogs,
    purchases,
    consumptions,
    sales,
    supplies,
    materials,
    actions,
    customUnits,
    locations,
    lifecycleAnimals,
    lifecycleEvents,
    lifecycleDeaths
  ] = await Promise.all([
    db.list('notifications'),
    db.list('auditLogs'),
    db.list('purchases'),
    db.list('consumptions'),
    db.list('sales'),
    db.list('supplies'),
    db.list('materials'),
    db.list('actions'),
    db.list('customUnits'),
    db.list('locations'),
    db.list('lifecycleAnimals'),
    db.list('lifecycleEvents'),
    db.list('lifecycleDeaths')
  ]);

  const unreadNotifications = notifications.filter((item) => !item.read);
  const lowStockSupplies = supplies.filter((item) => Number(item.stock || 0) <= Number(item.minStock || 0));
  const unavailableMaterials = materials.filter((item) => normalizeText(item.status) !== 'disponivel');
  const purchaseTotal = sumBy(purchases, (item) => Number(item.quantity || 0) * Number(item.unitPrice || 0));
  const salesTotal = sumBy(sales, (item) => Number(item.quantidade || 0) * Number(item.valor_unitario || 0));
  const consumptionTotal = sumBy(consumptions, (item) => Number(item.estimatedCost || 0));
  const financialBalance = salesTotal - purchaseTotal - consumptionTotal;

  const recentHistory = [
    ...auditLogs.map((item) => ({
      label: item.title || item.type || 'Registro',
      area: item.area || 'Sistema',
      moment: item.createdAt || item.updatedAt || item.date || '',
      details: item.details || ''
    })),
    ...actions.map((item) => ({
      label: item.acao || 'Ação programada',
      area: item.unidade || 'Operação',
      moment: item.updatedAt || item.createdAt || item.data_acao || '',
      details: item.detalhes_acao || ''
    })),
    ...notifications.map((item) => ({
      label: item.title || 'Notificação',
      area: 'Alertas',
      moment: item.time || '',
      details: item.message || ''
    }))
  ]
    .sort((a, b) => String(b.moment || '').localeCompare(String(a.moment || '')))
    .slice(0, 5);

  return {
    notifications,
    unreadNotifications,
    auditLogs,
    purchases,
    consumptions,
    sales,
    supplies,
    lowStockSupplies,
    materials,
    unavailableMaterials,
    actions,
    customUnits,
    locations,
    lifecycleAnimals,
    lifecycleEvents,
    lifecycleDeaths,
    purchaseTotal,
    salesTotal,
    consumptionTotal,
    financialBalance,
    recentHistory,
    purchasesByCategory: groupTotals(purchases, (item) => item.category, (item) => Number(item.quantity || 0) * Number(item.unitPrice || 0)),
    salesByCategory: groupTotals(sales, (item) => item.categoria, (item) => Number(item.quantidade || 0) * Number(item.valor_unitario || 0)),
    consumptionsByCategory: groupTotals(consumptions, (item) => item.categoria, (item) => Number(item.estimatedCost || 0)),
    suppliesByDomain: groupTotals(supplies, (item) => item.domain, (item) => Number(item.stock || 0)),
    materialsByCategory: groupTotals(materials, (item) => item.categoria, () => 1)
  };
}

function createFilteredSnapshot(snapshot, filters = {}) {
  const purchases = applyFilters(snapshot.purchases, filters);
  const consumptions = applyFilters(snapshot.consumptions, filters);
  const sales = applyFilters(snapshot.sales, filters);
  const supplies = applyFilters(snapshot.supplies, filters);
  const materials = applyFilters(snapshot.materials, filters);
  const actions = applyFilters(snapshot.actions, filters);
  const customUnits = applyFilters(snapshot.customUnits, filters);
  const locations = applyFilters(snapshot.locations, filters);
  const auditLogs = applyFilters(snapshot.auditLogs, filters);
  const notifications = applyFilters(snapshot.notifications, filters);
  const lifecycleAnimals = applyFilters(snapshot.lifecycleAnimals, filters);
  const lifecycleEvents = applyFilters(snapshot.lifecycleEvents, filters);
  const lifecycleDeaths = applyFilters(snapshot.lifecycleDeaths, filters);

  const unreadNotifications = notifications.filter((item) => !item.read);
  const lowStockSupplies = supplies.filter((item) => Number(item.stock || 0) <= Number(item.minStock || 0));
  const unavailableMaterials = materials.filter((item) => normalizeText(item.status) !== 'disponivel');
  const purchaseTotal = sumBy(purchases, (item) => Number(item.quantity || 0) * Number(item.unitPrice || 0));
  const salesTotal = sumBy(sales, (item) => Number(item.quantidade || 0) * Number(item.valor_unitario || 0));
  const consumptionTotal = sumBy(consumptions, (item) => Number(item.estimatedCost || 0));
  const financialBalance = salesTotal - purchaseTotal - consumptionTotal;

  const recentHistory = [
    ...auditLogs.map((item) => ({
      label: item.title || item.type || 'Registro',
      area: item.area || 'Sistema',
      moment: item.createdAt || item.updatedAt || item.date || '',
      details: item.details || ''
    })),
    ...actions.map((item) => ({
      label: item.acao || 'Ação programada',
      area: item.unidade || 'Operação',
      moment: item.updatedAt || item.createdAt || item.data_acao || '',
      details: item.detalhes_acao || ''
    })),
    ...notifications.map((item) => ({
      label: item.title || 'Notificação',
      area: 'Alertas',
      moment: item.time || '',
      details: item.message || ''
    }))
  ]
    .sort((a, b) => String(b.moment || '').localeCompare(String(a.moment || '')))
    .slice(0, 5);

  return {
    ...snapshot,
    purchases,
    consumptions,
    sales,
    supplies,
    materials,
    actions,
    customUnits,
    locations,
    auditLogs,
    notifications,
    lifecycleAnimals,
    lifecycleEvents,
    lifecycleDeaths,
    unreadNotifications,
    lowStockSupplies,
    unavailableMaterials,
    purchaseTotal,
    salesTotal,
    consumptionTotal,
    financialBalance,
    recentHistory,
    purchasesByCategory: groupTotals(purchases, (item) => item.category, (item) => Number(item.quantity || 0) * Number(item.unitPrice || 0)),
    salesByCategory: groupTotals(sales, (item) => item.categoria, (item) => Number(item.quantidade || 0) * Number(item.valor_unitario || 0)),
    consumptionsByCategory: groupTotals(consumptions, (item) => item.categoria, (item) => Number(item.estimatedCost || 0)),
    suppliesByDomain: groupTotals(supplies, (item) => item.domain, (item) => Number(item.stock || 0)),
    materialsByCategory: groupTotals(materials, (item) => item.categoria, () => 1)
  };
}

function detectRequestedTopics(text) {
  const normalized = normalizeText(text);
  const topics = [];

  if (includesAny(normalized, ['estoque', 'suprimento', 'suprimentos', 'insumo', 'insumos'])) topics.push('stock');
  if (includesAny(normalized, ['historico', 'histórico', 'registro', 'registros', 'log', 'logs'])) topics.push('history');
  if (includesAny(normalized, ['acao', 'acoes', 'agenda', 'programada', 'programadas'])) topics.push('actions');
  if (includesAny(normalized, ['compra', 'compras'])) topics.push('purchases');
  if (includesAny(normalized, ['venda', 'vendas'])) topics.push('sales');
  if (includesAny(normalized, ['consumo', 'consumos'])) topics.push('consumptions');
  if (includesAny(normalized, ['material', 'materiais'])) topics.push('materials');
  if (includesAny(normalized, ['area produtiva', 'areas produtivas', 'unidade', 'unidades', 'localizacao', 'localizacoes'])) topics.push('areas');
  if (includesAny(normalized, ['financeiro', 'financeira', 'gasto', 'gastos', 'receita', 'saldo', 'lucro'])) topics.push('financial');
  if (includesAny(normalized, ['grafico', 'graficos', 'indicador', 'indicadores', 'dashboard', 'painel'])) topics.push('charts');
  if (includesAny(normalized, ['alerta', 'alertas', 'notificacao', 'notificacoes', 'pendencia', 'pendencias'])) topics.push('alerts');
  if (includesAny(normalized, ['animal', 'animais', 'ciclo de vida', 'zootecnico', 'zootecnica', 'morte', 'mortes'])) topics.push('lifecycle');
  if (includesAny(normalized, ['tudo', 'geral', 'resumo', 'visao geral', 'visao completa', 'todas as categorias'])) topics.push('overview');

  return [...new Set(topics)];
}

function isReportRequest(text) {
  return includesAny(text, ['relatorio', 'relatório', 'relatorios', 'gerar relatorio', 'criar relatorio', 'montar relatorio']);
}

function detectExportFormat(text) {
  if (includesAny(text, ['csv'])) return 'csv';
  if (includesAny(text, ['pdf'])) return 'pdf';
  if (includesAny(text, ['txt', 'texto', 'arquivo texto'])) return 'txt';
  return '';
}

function wantsExport(text) {
  return includesAny(text, ['exporte', 'exportar', 'baixar', 'download', 'arquivo', 'csv', 'pdf', 'txt']);
}

function answerOutOfScope() {
  return 'Eu respondo apenas assuntos do CampoSync, como estoque, histórico, ações, compras, vendas, consumos, ferramentas, áreas produtivas, financeiro, gráficos, alertas e registros do sistema.';
}

function buildOverview(snapshot) {
  return [
    'Visão geral do CampoSync:',
    `${formatNumber(snapshot.supplies.length)} suprimentos cadastrados, com ${formatNumber(snapshot.lowStockSupplies.length)} em estoque baixo.`,
    `${formatNumber(snapshot.materials.length)} ferramentas e ${formatNumber(snapshot.unavailableMaterials.length)} fora de disponibilidade.`,
    `${formatNumber(snapshot.actions.length)} ações registradas e ${formatNumber(snapshot.unreadNotifications.length)} alertas não lidos.`,
    `${formatNumber(snapshot.customUnits.length)} áreas produtivas customizadas e ${formatNumber(snapshot.locations.length)} localizações cadastradas.`,
    `Financeiro atual: receitas em ${formatCurrency(snapshot.salesTotal)}, compras em ${formatCurrency(snapshot.purchaseTotal)}, consumos em ${formatCurrency(snapshot.consumptionTotal)} e saldo de ${formatCurrency(snapshot.financialBalance)}.`
  ].join(' ');
}

function buildStockAnswer(snapshot) {
  const topDomains = snapshot.suppliesByDomain.length
    ? snapshot.suppliesByDomain.map(([domain, total]) => `${domain}: ${formatNumber(total)} unidades`).join('; ')
    : 'sem domínios com estoque registrado.';

  return [
    `Estoque atual: ${formatNumber(snapshot.supplies.length)} suprimentos cadastrados e ${formatNumber(snapshot.lowStockSupplies.length)} em nível crítico ou mínimo.`,
    `Distribuição principal: ${topDomains}`,
    snapshot.lowStockSupplies.length
      ? `Itens com atenção: ${snapshot.lowStockSupplies.slice(0, 3).map((item) => `${item.product || 'item'} (${formatNumber(item.stock)} em estoque, mínimo ${formatNumber(item.minStock)})`).join('; ')}.`
      : 'Nenhum suprimento está abaixo do mínimo no momento.'
  ].join(' ');
}

function buildHistoryAnswer(snapshot) {
  if (!snapshot.recentHistory.length) {
    return 'Ainda não há histórico recente registrado no CampoSync.';
  }

  return `Histórico recente do CampoSync: ${snapshot.recentHistory.map((item) => `${item.label} em ${item.area}${item.moment ? ` (${formatDateTimeLabel(item.moment)})` : ''}`).join('; ')}.`;
}

function buildActionsAnswer(snapshot) {
  if (!snapshot.actions.length) {
    return 'Não há ações cadastradas no momento.';
  }

  const nextActions = snapshot.actions
    .slice()
    .sort((a, b) => `${a.data_acao || ''} ${a.hora_acao || ''}`.localeCompare(`${b.data_acao || ''} ${b.hora_acao || ''}`))
    .slice(0, 3)
    .map((item) => `${item.acao} em ${item.unidade || 'unidade não informada'} no dia ${item.data_acao || '-'} às ${item.hora_acao || '-'}`);

  return `Ações registradas: ${formatNumber(snapshot.actions.length)} no total. Próximas ou mais relevantes: ${nextActions.join('; ')}.`;
}

function buildPurchasesAnswer(snapshot) {
  const topCategories = snapshot.purchasesByCategory.length
    ? snapshot.purchasesByCategory.map(([category, total]) => `${category}: ${formatCurrency(total)}`).join('; ')
    : 'sem categorias de compra registradas.';

  return `Gestão de compras: ${formatNumber(snapshot.purchases.length)} compras registradas, total de ${formatCurrency(snapshot.purchaseTotal)}. Principais categorias: ${topCategories}.`;
}

function buildSalesAnswer(snapshot) {
  const topCategories = snapshot.salesByCategory.length
    ? snapshot.salesByCategory.map(([category, total]) => `${category}: ${formatCurrency(total)}`).join('; ')
    : 'sem categorias de venda registradas.';

  return `Gestão de vendas: ${formatNumber(snapshot.sales.length)} vendas registradas, receita total de ${formatCurrency(snapshot.salesTotal)}. Principais categorias: ${topCategories}.`;
}

function buildConsumptionsAnswer(snapshot) {
  const topCategories = snapshot.consumptionsByCategory.length
    ? snapshot.consumptionsByCategory.map(([category, total]) => `${category}: ${formatCurrency(total)}`).join('; ')
    : 'sem categorias de consumo registradas.';

  return `Consumos: ${formatNumber(snapshot.consumptions.length)} registros, custo estimado acumulado de ${formatCurrency(snapshot.consumptionTotal)}. Destaques por categoria: ${topCategories}.`;
}

function buildMaterialsAnswer(snapshot) {
  const topCategories = snapshot.materialsByCategory.length
    ? snapshot.materialsByCategory.map(([category, total]) => `${category}: ${formatNumber(total)}`).join('; ')
    : 'sem categorias de ferramentas registradas.';

  return `Ferramentas: ${formatNumber(snapshot.materials.length)} itens cadastrados, com ${formatNumber(snapshot.unavailableMaterials.length)} marcados como indisponíveis ou em manutenção. Categorias com mais registros: ${topCategories}.`;
}

function buildAreasAnswer(snapshot) {
  return `Áreas produtivas: ${formatNumber(snapshot.customUnits.length)} unidades customizadas e ${formatNumber(snapshot.locations.length)} localizações cadastradas no sistema. Também há ${formatNumber(snapshot.lifecycleAnimals.length)} animais, ${formatNumber(snapshot.lifecycleEvents.length)} eventos de ciclo de vida e ${formatNumber(snapshot.lifecycleDeaths.length)} mortes registradas nas categorias zootécnicas.`;
}

function buildFinancialAnswer(snapshot) {
  return `Financeiro do CampoSync: compras somam ${formatCurrency(snapshot.purchaseTotal)}, vendas geram ${formatCurrency(snapshot.salesTotal)}, consumos estimados estão em ${formatCurrency(snapshot.consumptionTotal)} e o saldo operacional atual está em ${formatCurrency(snapshot.financialBalance)}.`;
}

function buildChartsAnswer(snapshot) {
  return [
    'Leitura de indicadores do painel:',
    `estoque crítico ${formatNumber(snapshot.lowStockSupplies.length)}`,
    `alertas não lidos ${formatNumber(snapshot.unreadNotifications.length)}`,
    `receita ${formatCurrency(snapshot.salesTotal)}`,
    `compras ${formatCurrency(snapshot.purchaseTotal)}`,
    `consumos ${formatCurrency(snapshot.consumptionTotal)}`,
    `materiais indisponíveis ${formatNumber(snapshot.unavailableMaterials.length)}`
  ].join(', ') + '.';
}

function buildAlertsAnswer(snapshot) {
  const notificationPreview = snapshot.unreadNotifications.length
    ? snapshot.unreadNotifications.slice(0, 3).map((item) => item.title || 'Alerta sem título').join('; ')
    : 'Nenhum alerta pendente no momento.';

  return `Alertas do sistema: ${formatNumber(snapshot.unreadNotifications.length)} não lidos. ${notificationPreview}`;
}

function buildLifecycleAnswer(snapshot) {
  return `Ciclo de vida nas categorias produtivas: ${formatNumber(snapshot.lifecycleAnimals.length)} animais cadastrados, ${formatNumber(snapshot.lifecycleEvents.length)} eventos registrados e ${formatNumber(snapshot.lifecycleDeaths.length)} mortes registradas.`;
}

function buildReportHeader(title) {
  return `Relatório real de ${title}:`;
}

function buildFilterSuffix(filters) {
  const labels = [];
  if (filters.periodFilter?.label) labels.push(`período ${filters.periodFilter.label}`);
  if (filters.entityFilter?.label) labels.push(`filtro ${filters.entityFilter.label}`);
  return labels.length ? ` (${labels.join(' | ')})` : '';
}

function buildOverviewReport(snapshot) {
  return [
    buildReportHeader('panorama do CampoSync'),
    `Suprimentos cadastrados: ${formatNumber(snapshot.supplies.length)}.`,
    `Estoque em atenção: ${formatNumber(snapshot.lowStockSupplies.length)} item(ns).`,
    `Materiais cadastrados: ${formatNumber(snapshot.materials.length)}, sendo ${formatNumber(snapshot.unavailableMaterials.length)} indisponíveis ou em manutenção.`,
    `Ações registradas: ${formatNumber(snapshot.actions.length)}.`,
    `Alertas não lidos: ${formatNumber(snapshot.unreadNotifications.length)}.`,
    `Áreas produtivas customizadas: ${formatNumber(snapshot.customUnits.length)}.`,
    `Financeiro consolidado: compras ${formatCurrency(snapshot.purchaseTotal)}, vendas ${formatCurrency(snapshot.salesTotal)}, consumos ${formatCurrency(snapshot.consumptionTotal)}, saldo ${formatCurrency(snapshot.financialBalance)}.`
  ].join(' ');
}

function buildOverviewReportLines(snapshot) {
  return [
    `Suprimentos cadastrados: ${formatNumber(snapshot.supplies.length)}`,
    `Estoque em atenção: ${formatNumber(snapshot.lowStockSupplies.length)}`,
    `Materiais cadastrados: ${formatNumber(snapshot.materials.length)}`,
    `Materiais indisponíveis ou em manutenção: ${formatNumber(snapshot.unavailableMaterials.length)}`,
    `Ações registradas: ${formatNumber(snapshot.actions.length)}`,
    `Alertas não lidos: ${formatNumber(snapshot.unreadNotifications.length)}`,
    `Áreas produtivas customizadas: ${formatNumber(snapshot.customUnits.length)}`,
    `Compras acumuladas: ${formatCurrency(snapshot.purchaseTotal)}`,
    `Vendas acumuladas: ${formatCurrency(snapshot.salesTotal)}`,
    `Consumos acumulados: ${formatCurrency(snapshot.consumptionTotal)}`,
    `Saldo atual: ${formatCurrency(snapshot.financialBalance)}`
  ];
}

function buildPurchasesReport(snapshot) {
  const latestPurchases = snapshot.purchases
    .slice()
    .sort((a, b) => String(b.createdAt || b.date || '').localeCompare(String(a.createdAt || a.date || '')))
    .slice(0, 3)
    .map((item) => `${item.item} em ${item.category} no dia ${item.date || '-'}: ${formatNumber(item.quantity)} x ${formatCurrency(item.unitPrice)}`);

  return [
    buildReportHeader('compras'),
    `Total de compras registradas: ${formatNumber(snapshot.purchases.length)}.`,
    `Valor acumulado: ${formatCurrency(snapshot.purchaseTotal)}.`,
    `Principais categorias: ${snapshot.purchasesByCategory.length ? snapshot.purchasesByCategory.map(([category, total]) => `${category} com ${formatCurrency(total)}`).join('; ') : 'sem categorias registradas'}.`,
    latestPurchases.length ? `Últimos registros: ${latestPurchases.join('; ')}.` : 'Ainda não há compras registradas.'
  ].join(' ');
}

function buildPurchasesReportLines(snapshot) {
  const lines = [
    `Total de compras registradas: ${formatNumber(snapshot.purchases.length)}`,
    `Valor acumulado: ${formatCurrency(snapshot.purchaseTotal)}`
  ];
  snapshot.purchasesByCategory.forEach(([category, total]) => {
    lines.push(`Categoria ${category}: ${formatCurrency(total)}`);
  });
  snapshot.purchases
    .slice()
    .sort((a, b) => String(b.createdAt || b.date || '').localeCompare(String(a.createdAt || a.date || '')))
    .slice(0, 5)
    .forEach((item) => {
      lines.push(`Compra | ${item.date || '-'} | ${item.category} | ${item.item} | ${formatNumber(item.quantity)} x ${formatCurrency(item.unitPrice)}`);
    });
  return lines;
}

function buildSalesReport(snapshot) {
  const latestSales = snapshot.sales
    .slice()
    .sort((a, b) => String(b.createdAt || b.data_venda || '').localeCompare(String(a.createdAt || a.data_venda || '')))
    .slice(0, 3)
    .map((item) => `${item.produto} em ${item.categoria} no dia ${item.data_venda || '-'}: ${formatNumber(item.quantidade)} x ${formatCurrency(item.valor_unitario)}`);

  return [
    buildReportHeader('vendas'),
    `Total de vendas registradas: ${formatNumber(snapshot.sales.length)}.`,
    `Receita acumulada: ${formatCurrency(snapshot.salesTotal)}.`,
    `Principais categorias: ${snapshot.salesByCategory.length ? snapshot.salesByCategory.map(([category, total]) => `${category} com ${formatCurrency(total)}`).join('; ') : 'sem categorias registradas'}.`,
    latestSales.length ? `Últimos registros: ${latestSales.join('; ')}.` : 'Ainda não há vendas registradas.'
  ].join(' ');
}

function buildSalesReportLines(snapshot) {
  const lines = [
    `Total de vendas registradas: ${formatNumber(snapshot.sales.length)}`,
    `Receita acumulada: ${formatCurrency(snapshot.salesTotal)}`
  ];
  snapshot.salesByCategory.forEach(([category, total]) => {
    lines.push(`Categoria ${category}: ${formatCurrency(total)}`);
  });
  snapshot.sales
    .slice()
    .sort((a, b) => String(b.createdAt || b.data_venda || '').localeCompare(String(a.createdAt || a.data_venda || '')))
    .slice(0, 5)
    .forEach((item) => {
      lines.push(`Venda | ${item.data_venda || '-'} | ${item.categoria} | ${item.produto} | ${formatNumber(item.quantidade)} x ${formatCurrency(item.valor_unitario)}`);
    });
  return lines;
}

function buildConsumptionsReport(snapshot) {
  const latestConsumptions = snapshot.consumptions
    .slice()
    .sort((a, b) => String(b.createdAt || b.data_consumo || '').localeCompare(String(a.createdAt || a.data_consumo || '')))
    .slice(0, 3)
    .map((item) => `${item.produto} em ${item.categoria} no dia ${item.data_consumo || '-'}: ${formatNumber(item.quantidade)} unidade(s), custo estimado ${formatCurrency(item.estimatedCost)}`);

  return [
    buildReportHeader('consumos'),
    `Total de consumos registrados: ${formatNumber(snapshot.consumptions.length)}.`,
    `Custo estimado acumulado: ${formatCurrency(snapshot.consumptionTotal)}.`,
    `Principais categorias: ${snapshot.consumptionsByCategory.length ? snapshot.consumptionsByCategory.map(([category, total]) => `${category} com ${formatCurrency(total)}`).join('; ') : 'sem categorias registradas'}.`,
    latestConsumptions.length ? `Últimos registros: ${latestConsumptions.join('; ')}.` : 'Ainda não há consumos registrados.'
  ].join(' ');
}

function buildConsumptionsReportLines(snapshot) {
  const lines = [
    `Total de consumos registrados: ${formatNumber(snapshot.consumptions.length)}`,
    `Custo estimado acumulado: ${formatCurrency(snapshot.consumptionTotal)}`
  ];
  snapshot.consumptionsByCategory.forEach(([category, total]) => {
    lines.push(`Categoria ${category}: ${formatCurrency(total)}`);
  });
  snapshot.consumptions
    .slice()
    .sort((a, b) => String(b.createdAt || b.data_consumo || '').localeCompare(String(a.createdAt || a.data_consumo || '')))
    .slice(0, 5)
    .forEach((item) => {
      lines.push(`Consumo | ${item.data_consumo || '-'} | ${item.categoria} | ${item.produto} | ${formatNumber(item.quantidade)} | ${formatCurrency(item.estimatedCost)}`);
    });
  return lines;
}

function buildMaterialsReport(snapshot) {
  const latestMaterials = snapshot.materials
    .slice()
    .sort((a, b) => String(b.updatedAt || b.createdAt || '').localeCompare(String(a.updatedAt || a.createdAt || '')))
    .slice(0, 3)
    .map((item) => `${item.material} em ${item.categoria}: ${formatNumber(item.quantidade)} unidade(s), status ${item.status || 'não informado'}`);

  return [
    buildReportHeader('ferramentas'),
    `Total de ferramentas cadastradas: ${formatNumber(snapshot.materials.length)}.`,
    `Ferramentas indisponíveis ou em manutenção: ${formatNumber(snapshot.unavailableMaterials.length)}.`,
    `Categorias com mais registros: ${snapshot.materialsByCategory.length ? snapshot.materialsByCategory.map(([category, total]) => `${category} com ${formatNumber(total)} item(ns)`).join('; ') : 'sem categorias registradas'}.`,
    latestMaterials.length ? `Últimos materiais atualizados: ${latestMaterials.join('; ')}.` : 'Ainda não há ferramentas registradas.'
  ].join(' ');
}

function buildMaterialsReportLines(snapshot) {
  const lines = [
    `Total de ferramentas cadastradas: ${formatNumber(snapshot.materials.length)}`,
    `Ferramentas indisponíveis ou em manutenção: ${formatNumber(snapshot.unavailableMaterials.length)}`
  ];
  snapshot.materialsByCategory.forEach(([category, total]) => {
    lines.push(`Categoria ${category}: ${formatNumber(total)} item(ns)`);
  });
  snapshot.materials
    .slice()
    .sort((a, b) => String(b.updatedAt || b.createdAt || '').localeCompare(String(a.updatedAt || a.createdAt || '')))
    .slice(0, 5)
    .forEach((item) => {
      lines.push(`Ferramenta | ${item.categoria} | ${item.material} | ${formatNumber(item.quantidade)} | ${item.status || '-'}`);
    });
  return lines;
}

function buildFinancialReport(snapshot) {
  return [
    buildReportHeader('financeiro e gastos'),
    `Compras acumuladas: ${formatCurrency(snapshot.purchaseTotal)}.`,
    `Vendas acumuladas: ${formatCurrency(snapshot.salesTotal)}.`,
    `Consumos estimados: ${formatCurrency(snapshot.consumptionTotal)}.`,
    `Gasto operacional consolidado: ${formatCurrency(snapshot.purchaseTotal + snapshot.consumptionTotal)}.`,
    `Saldo atual: ${formatCurrency(snapshot.financialBalance)}.`
  ].join(' ');
}

function buildFinancialReportLines(snapshot) {
  return [
    `Compras acumuladas: ${formatCurrency(snapshot.purchaseTotal)}`,
    `Vendas acumuladas: ${formatCurrency(snapshot.salesTotal)}`,
    `Consumos estimados: ${formatCurrency(snapshot.consumptionTotal)}`,
    `Gasto operacional consolidado: ${formatCurrency(snapshot.purchaseTotal + snapshot.consumptionTotal)}`,
    `Saldo atual: ${formatCurrency(snapshot.financialBalance)}`
  ];
}

function buildReportPayload(title, filters, sections, format) {
  const header = `${title}${buildFilterSuffix(filters)}`;
  const lines = [header];
  sections.forEach((section) => {
    lines.push('');
    lines.push(section.title);
    section.lines.forEach((line) => lines.push(line));
  });

  const textContent = lines.join('\n');
  const fileBase = normalizeText(header).replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'relatorio-camposync';

  if (format === 'csv') {
    const csvLines = ['secao,descricao'];
    sections.forEach((section) => {
      section.lines.forEach((line) => {
        csvLines.push(`"${section.title.replaceAll('"', '""')}","${String(line).replaceAll('"', '""')}"`);
      });
    });
    return {
      filename: `${fileBase}.csv`,
      mimeType: 'text/csv; charset=utf-8',
      contentBase64: Buffer.from(csvLines.join('\n'), 'utf8').toString('base64')
    };
  }

  if (format === 'pdf') {
    return {
      filename: `${fileBase}.pdf`,
      mimeType: 'application/pdf',
      contentBase64: buildPdfBuffer(header, lines.slice(1)).toString('base64')
    };
  }

  return {
    filename: `${fileBase}.txt`,
    mimeType: 'text/plain; charset=utf-8',
    contentBase64: Buffer.from(textContent, 'utf8').toString('base64')
  };
}

function buildReportAnswer(message, snapshot) {
  const normalized = normalizeText(message);
  const periodFilter = parsePeriodFilter(normalized);
  const entityFilter = parseEntityFilter(normalized, snapshot);
  const filteredSnapshot = createFilteredSnapshot(snapshot, { periodFilter, entityFilter });
  const sections = [];
  const prose = [];

  if (includesAny(normalized, ['compra', 'compras'])) {
    prose.push(buildPurchasesReport(filteredSnapshot));
    sections.push({ title: 'Compras', lines: buildPurchasesReportLines(filteredSnapshot) });
  }
  if (includesAny(normalized, ['venda', 'vendas'])) {
    prose.push(buildSalesReport(filteredSnapshot));
    sections.push({ title: 'Vendas', lines: buildSalesReportLines(filteredSnapshot) });
  }
  if (includesAny(normalized, ['consumo', 'consumos'])) {
    prose.push(buildConsumptionsReport(filteredSnapshot));
    sections.push({ title: 'Consumos', lines: buildConsumptionsReportLines(filteredSnapshot) });
  }
  if (includesAny(normalized, ['material', 'materiais'])) {
    prose.push(buildMaterialsReport(filteredSnapshot));
    sections.push({ title: 'Materiais', lines: buildMaterialsReportLines(filteredSnapshot) });
  }
  if (includesAny(normalized, ['financeiro', 'gasto', 'gastos', 'receita', 'saldo', 'lucro'])) {
    prose.push(buildFinancialReport(filteredSnapshot));
    sections.push({ title: 'Financeiro e gastos', lines: buildFinancialReportLines(filteredSnapshot) });
  }
  if (includesAny(normalized, ['area', 'areas', 'unidade', 'unidades', 'estoque', 'suprimento', 'suprimentos', 'geral', 'panorama', 'completo', 'tudo'])) {
    prose.push(buildOverviewReport(filteredSnapshot));
    sections.push({ title: 'Panorama geral', lines: buildOverviewReportLines(filteredSnapshot) });
  }

  if (!sections.length) {
    prose.push(buildOverviewReport(filteredSnapshot));
    sections.push({ title: 'Panorama geral', lines: buildOverviewReportLines(filteredSnapshot) });
  }

  const exportFormat = detectExportFormat(normalized) || 'txt';
  const exportPayload = wantsExport(normalized)
    ? buildReportPayload('Relatório CampoSync', { periodFilter, entityFilter }, sections.slice(0, 4), exportFormat)
    : null;

  return {
    answer: prose.slice(0, 3).join(' '),
    exportPayload
  };
}

function buildAssistantAnswer(message, snapshot) {
  const normalized = normalizeText(message);

  if (!includesAny(normalized, DOMAIN_KEYWORDS)) {
    return { answer: answerOutOfScope(), exportPayload: null };
  }

  if (isReportRequest(normalized)) {
    return buildReportAnswer(normalized, snapshot);
  }

  const topics = detectRequestedTopics(normalized);
  const resolvedTopics = topics.length ? topics.slice(0, 3) : ['overview'];
  const topicAnswers = [];

  resolvedTopics.forEach((topic) => {
    if (topic === 'overview') topicAnswers.push(buildOverview(snapshot));
    if (topic === 'stock') topicAnswers.push(buildStockAnswer(snapshot));
    if (topic === 'history') topicAnswers.push(buildHistoryAnswer(snapshot));
    if (topic === 'actions') topicAnswers.push(buildActionsAnswer(snapshot));
    if (topic === 'purchases') topicAnswers.push(buildPurchasesAnswer(snapshot));
    if (topic === 'sales') topicAnswers.push(buildSalesAnswer(snapshot));
    if (topic === 'consumptions') topicAnswers.push(buildConsumptionsAnswer(snapshot));
    if (topic === 'materials') topicAnswers.push(buildMaterialsAnswer(snapshot));
    if (topic === 'areas') topicAnswers.push(buildAreasAnswer(snapshot));
    if (topic === 'financial') topicAnswers.push(buildFinancialAnswer(snapshot));
    if (topic === 'charts') topicAnswers.push(buildChartsAnswer(snapshot));
    if (topic === 'alerts') topicAnswers.push(buildAlertsAnswer(snapshot));
    if (topic === 'lifecycle') topicAnswers.push(buildLifecycleAnswer(snapshot));
  });

  return {
    answer: topicAnswers.join(' '),
    exportPayload: null
  };
}

router.post(
  '/messages',
  requireAuth,
  asyncHandler(async (req, res) => {
    const message = requireString(req.body?.message, 'message', { max: 1000 });
    const snapshot = await loadAssistantSnapshot();
    const result = buildAssistantAnswer(message, snapshot);
    const answer = result.answer;

    await writeAuditLog({
      type: 'Cynx',
      title: 'Conversa com o Cynx',
      details: `Pergunta: ${message}\nResposta: ${answer}`,
      area: 'Assistente virtual',
      status: 'Concluido',
      source: 'assistant-api',
      entityType: 'assistant_message',
      metadata: {
        question: message,
        answer
      }
    }, req.user.email);

    res.json({
      answer,
      export: result.exportPayload
    });
  })
);

router.post(
  '/speech',
  requireAuth,
  asyncHandler(async (req, res) => {
    const text = requireString(req.body?.text, 'text', { max: 4000 });

    if (!env.openAiApiKey) {
      return res.status(503).json({
        message: 'OPENAI_API_KEY nao configurada no backend para gerar voz do Cynx.'
      });
    }

    const openAiResponse = await fetch('https://api.openai.com/v1/audio/speech', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.openAiApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: env.openAiTtsModel,
        voice: env.openAiTtsVoice,
        input: text,
        instructions: env.openAiTtsInstructions,
        response_format: 'mp3'
      })
    });

    if (!openAiResponse.ok) {
      const errorText = await openAiResponse.text();
      return res.status(openAiResponse.status).json({
        message: 'Nao foi possivel gerar o audio do Cynx.',
        details: errorText
      });
    }

    const audioBuffer = Buffer.from(await openAiResponse.arrayBuffer());
    const contentType = openAiResponse.headers.get('content-type') || 'audio/mpeg';

    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'no-store');
    res.send(audioBuffer);
  })
);

export default router;
