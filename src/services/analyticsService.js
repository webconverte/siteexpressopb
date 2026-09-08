/**
 * analyticsService.js
 * Camada de serviço de dados analíticos para a Expresso PB Logística.
 * Suporta 3 propriedades analíticas independentes com GA4:
 * 1. Site Institucional (Cotações & FTL)
 * 2. Link da Bio (Redes Sociais & Conversões Rápidas)
 * 3. Blog de Logística (Conteúdo, Inbound & SEO)
 */

const STORAGE_KEY = 'expressopb_ga4_multi_config';

const DEFAULT_CONFIGS = {
    site: {
        propertyId: import.meta.env.VITE_GA4_PROPERTY_ID || '',
        measurementId: 'G-EXPRESSOPB1',
        apiUrl: import.meta.env.VITE_GA4_API_URL || '',
        mode: 'demo',
        name: 'Site Institucional'
    },
    bio: {
        propertyId: '',
        measurementId: 'G-EXPBIO2026',
        apiUrl: '',
        mode: 'demo',
        name: 'Link da Bio'
    },
    blog: {
        propertyId: '',
        measurementId: 'G-EXPBLOG026',
        apiUrl: '',
        mode: 'demo',
        name: 'Blog de Logística'
    }
};

export const getAllSavedConfigs = () => {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            const parsed = JSON.parse(saved);
            return {
                site: { ...DEFAULT_CONFIGS.site, ...(parsed.site || {}) },
                bio: { ...DEFAULT_CONFIGS.bio, ...(parsed.bio || {}) },
                blog: { ...DEFAULT_CONFIGS.blog, ...(parsed.blog || {}) }
            };
        }
    } catch (e) {
        console.warn('Erro ao carregar configurações multi-GA4:', e);
    }
    return DEFAULT_CONFIGS;
};

export const getSavedConfig = (property = 'site') => {
    const all = getAllSavedConfigs();
    return all[property] || all.site;
};

export const saveAllConfigs = (configs) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(configs));
    } catch (e) {
        console.error('Erro ao salvar configurações multi-GA4:', e);
    }
};

export const saveConfig = (property, newConfig) => {
    // Suporte para chamada antiga com 1 argumento (default para 'site')
    if (typeof property === 'object' && property !== null) {
        newConfig = property;
        property = 'site';
    }
    const current = getAllSavedConfigs();
    current[property] = { ...current[property], ...newConfig };
    saveAllConfigs(current);
};

// Multiplicadores de período comuns
const getPeriodMultiplier = (period = '30d') => {
    const multipliers = {
        '7d': { days: 7, factor: 0.25, dates: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'] },
        '14d': { days: 14, factor: 0.5, dates: Array.from({ length: 14 }, (_, i) => `D-${14 - i}`) },
        '30d': { days: 30, factor: 1.0, dates: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'] },
        '90d': { days: 90, factor: 2.8, dates: ['Mês 1', 'Mês 2', 'Mês 3'] }
    };
    return multipliers[period] || multipliers['30d'];
};

// 1. DADOS MOCK: SITE INSTITUCIONAL (B2B LEADS & COTAÇÕES)
const generateSiteMockData = (period = '30d') => {
    const currentConfig = getPeriodMultiplier(period);
    const f = currentConfig.factor;

    const baseLeadsWhatsapp = Math.round(98 * f);
    const baseLeadsForm = Math.round(44 * f);
    const totalCommercialLeads = baseLeadsWhatsapp + baseLeadsForm;
    const totalRhLeads = Math.round(89 * f);
    const totalSessions = Math.round(3740 * f);
    const conversionRate = ((totalCommercialLeads / totalSessions) * 100).toFixed(1);

    const timeSeries = currentConfig.dates.map((label, idx) => {
        const seed = (idx + 1) * 3.7;
        const wpp = Math.max(3, Math.round((baseLeadsWhatsapp / currentConfig.dates.length) + Math.sin(seed) * 4));
        const form = Math.max(1, Math.round((baseLeadsForm / currentConfig.dates.length) + Math.cos(seed) * 2));
        return {
            label,
            whatsapp: wpp,
            formulario: form,
            total: wpp + form
        };
    });

    return {
        property: 'site',
        period,
        kpis: {
            totalLeads: totalCommercialLeads,
            leadsDiff: '+18.4%',
            conversionRate: `${conversionRate}%`,
            conversionRateDiff: '+0.6 p.p.',
            leadsWhatsapp: baseLeadsWhatsapp,
            leadsWhatsappPercent: '69%',
            leadsForm: baseLeadsForm,
            leadsFormPercent: '31%',
            topSegment: 'Construção Civil',
            topSegmentShare: '38%',
            qualifiedSessions: totalSessions,
            sessionsDiff: '+12.1%',
            rhLeadsCount: totalRhLeads,
            purityRatio: '61.5%',
        },
        timeSeries,
        segments: [
            { name: 'Construção Civil', slug: 'construcao-civil', color: '#19A3DF', sessions: Math.round(1450 * f), formLeads: Math.round(18 * f), wppLeads: Math.round(41 * f), totalLeads: Math.round(59 * f), convRate: '4.07%', share: 38 },
            { name: 'Alimentos & Bebidas', slug: 'alimentos-bebidas', color: '#38BDF8', sessions: Math.round(1120 * f), formLeads: Math.round(14 * f), wppLeads: Math.round(28 * f), totalLeads: Math.round(42 * f), convRate: '3.75%', share: 29 },
            { name: 'Papel & Celulose', slug: 'papel-celulose', color: '#4ADE80', sessions: Math.round(680 * f), formLeads: Math.round(7 * f), wppLeads: Math.round(19 * f), totalLeads: Math.round(26 * f), convRate: '3.82%', share: 18 },
            { name: 'Maquinário & Metalmecânica', slug: 'maquinario-metalmecanica', color: '#F59E0B', sessions: Math.round(490 * f), formLeads: Math.round(5 * f), wppLeads: Math.round(10 * f), totalLeads: Math.round(15 * f), convRate: '3.06%', share: 15 }
        ],
        routes: [
            { origem: 'João Pessoa / PB', destino: 'São Paulo / SP', count: Math.round(28 * f), share: '24.1%', vehicle: 'Carreta / Rodotrem' },
            { origem: 'Conde / PB', destino: 'Fortaleza / CE', count: Math.round(22 * f), share: '19.0%', vehicle: 'Carreta Sider' },
            { origem: 'Recife / PE', destino: 'Salvador / BA', count: Math.round(17 * f), share: '14.6%', vehicle: 'Bitrem / Carga Seca' },
            { origem: 'Campina Grande / PB', destino: 'Juazeiro do Norte / CE', count: Math.round(11 * f), share: '9.5%', vehicle: 'Truck (2 eixos)' },
            { origem: 'Maceió / AL', destino: 'Natal / RN', count: Math.round(9 * f), share: '7.8%', vehicle: 'Carreta Graneleiro' },
            { origem: 'Outras Rotas B2B', destino: 'Capitais / Interior', count: Math.round(29 * f), share: '25.0%', vehicle: 'Frota Diversificada' }
        ],
        ctas: [
            { location: 'WhatsApp - Header Fixo Desktop', type: 'WhatsApp', count: Math.round(46 * f), share: '32.4%' },
            { location: 'WhatsApp - Botão Flutuante Mobile', type: 'WhatsApp', count: Math.round(31 * f), share: '21.8%' },
            { location: 'Formulário Dedicado (/segmentos/*)', type: 'Formulário', count: Math.round(29 * f), share: '20.4%' },
            { location: 'WhatsApp - Hero Principal da Home', type: 'WhatsApp', count: Math.round(21 * f), share: '14.8%' },
            { location: 'Formulário Geral da Home (#cotacao)', type: 'Formulário', count: Math.round(15 * f), share: '10.6%' }
        ],
        funnel: [
            { step: '1. Visitantes Totais B2B', value: totalSessions, percentage: 100, color: '#000327' },
            { step: '2. Visita a Segmentos ou Frota', value: Math.round(totalSessions * 0.45), percentage: 45, color: '#0A2540' },
            { step: '3. Scroll até Área de Cotação', value: Math.round(totalSessions * 0.22), percentage: 22, color: '#19A3DF' },
            { step: '4. Lead Comercial Gerado (WPP/Form)', value: totalCommercialLeads, percentage: Number(conversionRate), color: '#38BDF8' }
        ],
        topGeo: [
            { uf: 'Paraíba (Matriz)', code: 'PB', sessions: Math.round(1180 * f), leads: Math.round(48 * f), isBranch: true },
            { uf: 'Pernambuco', code: 'PE', sessions: Math.round(760 * f), leads: Math.round(29 * f), isBranch: true },
            { uf: 'Ceará', code: 'CE', sessions: Math.round(620 * f), leads: Math.round(24 * f), isBranch: true },
            { uf: 'São Paulo (Demanda FTL)', code: 'SP', sessions: Math.round(490 * f), leads: Math.round(19 * f), isBranch: false },
            { uf: 'Rio Grande do Norte', code: 'RN', sessions: Math.round(310 * f), leads: Math.round(12 * f), isBranch: true },
            { uf: 'Bahia', code: 'BA', sessions: Math.round(220 * f), leads: Math.round(7 * f), isBranch: true },
            { uf: 'Alagoas', code: 'AL', sessions: Math.round(160 * f), leads: Math.round(3 * f), isBranch: true }
        ]
    };
};

// 2. DADOS MOCK: LINK DA BIO (REDES SOCIAIS & CONVERSÕES MOBILE)
const generateBioMockData = (period = '30d') => {
    const currentConfig = getPeriodMultiplier(period);
    const f = currentConfig.factor;

    const totalClicks = Math.round(3420 * f);
    const wppCommercialClicks = Math.round(2100 * f);
    const formQuotesClicks = Math.round(540 * f);
    const trackingClicks = Math.round(460 * f);
    const rhClicks = Math.round(320 * f);
    const commercialCTR = ((wppCommercialClicks / totalClicks) * 100).toFixed(1);

    const timeSeries = currentConfig.dates.map((label, idx) => {
        const seed = (idx + 1) * 2.9;
        const insta = Math.max(10, Math.round((totalClicks * 0.72 / currentConfig.dates.length) + Math.sin(seed) * 15));
        const linkedin = Math.max(3, Math.round((totalClicks * 0.18 / currentConfig.dates.length) + Math.cos(seed) * 6));
        const direct = Math.max(2, Math.round((totalClicks * 0.10 / currentConfig.dates.length)));
        return {
            label,
            instagram: insta,
            linkedin: linkedin,
            direto: direct,
            total: insta + linkedin + direct
        };
    });

    return {
        property: 'bio',
        period,
        kpis: {
            totalClicks,
            clicksDiff: '+24.6%',
            whatsappCtr: `${commercialCTR}%`,
            whatsappCtrDiff: '+3.2 p.p.',
            topSocialSource: 'Instagram Stories',
            topSourceShare: '48.5%',
            mobileShare: '94.8%',
            mobileDiff: '+1.4%',
            uniqueUsers: Math.round(2890 * f),
            bounceRate: '18.2%'
        },
        timeSeries,
        buttons: [
            { name: 'Mesa Comercial de Fretes (WhatsApp)', destination: 'https://wa.me/5583999999999', clicks: wppCommercialClicks, ctr: '61.4%', tag: 'Comercial Direto', color: '#10B981' },
            { name: 'Solicitar Cotação de Carga Lotação', destination: 'https://expressopb.com/#cotacao', clicks: formQuotesClicks, ctr: '15.8%', tag: 'Formulário FTL', color: '#19A3DF' },
            { name: 'Rastreamento & Central do Cliente', destination: 'https://expressopb.com/rastreamento', clicks: trackingClicks, ctr: '13.5%', tag: 'Operacional', color: '#38BDF8' },
            { name: 'Trabalhe Conosco (Vagas Motoristas)', destination: 'https://expressopb.com/trabalhe-conosco', clicks: rhClicks, ctr: '9.3%', tag: 'RH / Frota', color: '#F59E0B' }
        ],
        campaigns: [
            { source: 'instagram', campaign: 'stories_frota_pesada', medium: 'story_link', clicks: Math.round(1450 * f), wppLeads: Math.round(920 * f), convRate: '63.4%' },
            { source: 'instagram', campaign: 'link_perfil_bio', medium: 'bio_header', clicks: Math.round(1120 * f), wppLeads: Math.round(690 * f), convRate: '61.6%' },
            { source: 'linkedin', campaign: 'post_expansao_nordeste', medium: 'feed_post', clicks: Math.round(480 * f), wppLeads: Math.round(310 * f), convRate: '64.5%' },
            { source: 'direct / qr', campaign: 'adesivo_frota_caminhao', medium: 'qr_code', clicks: Math.round(230 * f), wppLeads: Math.round(120 * f), convRate: '52.1%' },
            { source: 'whatsapp', campaign: 'transmissao_clientes', medium: 'direct_msg', clicks: Math.round(140 * f), wppLeads: Math.round(60 * f), convRate: '42.8%' }
        ],
        hourlyDistribution: [
            { period: 'Manhã (07h às 12h)', percentage: 38, count: Math.round(totalClicks * 0.38), label: 'Decisores Logísticos' },
            { period: 'Tarde (12h às 18h)', percentage: 44, count: Math.round(totalClicks * 0.44), label: 'Pico de Cotações B2B' },
            { period: 'Noite (18h às 23h)', percentage: 18, count: Math.round(totalClicks * 0.18), label: 'Motoristas e Consultas' }
        ],
        devices: [
            { device: 'iPhone (Apple iOS)', share: '58.2%', clicks: Math.round(totalClicks * 0.582) },
            { device: 'Android (Chrome / Samsung)', share: '36.6%', clicks: Math.round(totalClicks * 0.366) },
            { device: 'Desktop / Tablets', share: '5.2%', clicks: Math.round(totalClicks * 0.052) }
        ]
    };
};

// 3. DADOS MOCK: BLOG DE LOGÍSTICA (INBOUND MARKETING & SEO DE FRETE)
const generateBlogMockData = (period = '30d') => {
    const currentConfig = getPeriodMultiplier(period);
    const f = currentConfig.factor;

    const totalViews = Math.round(22800 * f);
    const uniqueReaders = Math.round(16400 * f);
    const inboundQuotes = Math.round(84 * f);
    const organicPct = '71.5%';
    const quoteConvRate = ((inboundQuotes / totalViews) * 100).toFixed(2);

    const timeSeries = currentConfig.dates.map((label, idx) => {
        const seed = (idx + 1) * 3.3;
        const org = Math.max(20, Math.round((totalViews * 0.715 / currentConfig.dates.length) + Math.sin(seed) * 45));
        const dir = Math.max(5, Math.round((totalViews * 0.185 / currentConfig.dates.length) + Math.cos(seed) * 15));
        const soc = Math.max(3, Math.round((totalViews * 0.100 / currentConfig.dates.length)));
        return {
            label,
            organico: org,
            direto: dir,
            social: soc,
            total: org + dir + soc
        };
    });

    return {
        property: 'blog',
        period,
        kpis: {
            totalViews,
            viewsDiff: '+31.2%',
            avgReadTime: '3m 48s',
            readTimeDiff: '+22s',
            inboundQuotes,
            quotesDiff: '+19.0%',
            organicShare: organicPct,
            organicDiff: '+4.8 p.p.',
            uniqueReaders,
            bounceRate: '42.1%'
        },
        timeSeries,
        categories: [
            { name: 'Gestão de Frota & Carga Lotação', slug: 'carga-lotacao', color: '#19A3DF', views: Math.round(9570 * f), leads: Math.round(41 * f), share: 42 },
            { name: 'Legislação, CIOT & Tributação', slug: 'legislacao', color: '#38BDF8', views: Math.round(5930 * f), leads: Math.round(24 * f), share: 26 },
            { name: 'Logística Regional: PB & Nordeste', slug: 'logistica-regional', color: '#10B981', views: Math.round(4100 * f), leads: Math.round(12 * f), share: 18 },
            { name: 'Armazenagem & Cross-Docking', slug: 'armazenagem', color: '#F59E0B', views: Math.round(3200 * f), leads: Math.round(7 * f), share: 14 }
        ],
        articles: [
            { title: 'Tabela de Frete Lotação 2026: Como calcular custo por km rodado no NE', category: 'Gestão de Frota', views: Math.round(5840 * f), avgTime: '4m 12s', ctaClicks: Math.round(28 * f), convRate: '4.8%' },
            { title: 'Carreta Sider vs Baú Carga Seca: Qual o melhor veículo para sua indústria?', category: 'Carga Lotação', views: Math.round(4310 * f), avgTime: '3m 45s', ctaClicks: Math.round(21 * f), convRate: '4.9%' },
            { title: 'Redução de ICMS e Benefícios Fiscais no Transporte na Paraíba', category: 'Legislação', views: Math.round(3790 * f), avgTime: '5m 02s', ctaClicks: Math.round(16 * f), convRate: '4.2%' },
            { title: 'Como evitar avarias no transporte pesado da construção civil', category: 'Gestão de Frota', views: Math.round(2950 * f), avgTime: '3m 15s', ctaClicks: Math.round(11 * f), convRate: '3.7%' },
            { title: 'Rotas estratégicas PB, PE e CE: Otimização de tempo e pedágio', category: 'Logística Regional', views: Math.round(2420 * f), avgTime: '3m 30s', ctaClicks: Math.round(8 * f), convRate: '3.3%' }
        ],
        keywords: [
            { keyword: 'tabela frete carreta paraiba', impressions: Math.round(12400 * f), clicks: Math.round(1840 * f), ctr: '14.8%', position: '1.8' },
            { keyword: 'transporte carga lotacao nordeste', impressions: Math.round(9800 * f), clicks: Math.round(1420 * f), ctr: '14.5%', position: '2.1' },
            { keyword: 'empresa frete industrial conde pb', impressions: Math.round(6500 * f), clicks: Math.round(980 * f), ctr: '15.1%', position: '1.2' },
            { keyword: 'frete sider joao pessoa sao paulo', impressions: Math.round(5100 * f), clicks: Math.round(810 * f), ctr: '15.9%', position: '2.4' },
            { keyword: 'transportadora carga seca campina grande', impressions: Math.round(4300 * f), clicks: Math.round(690 * f), ctr: '16.0%', position: '1.5' }
        ],
        funnel: [
            { step: '1. Leituras Totais do Artigo', value: totalViews, percentage: 100, color: '#000327' },
            { step: '2. Rolagem > 50% do Conteúdo', value: Math.round(totalViews * 0.62), percentage: 62, color: '#0A2540' },
            { step: '3. Exibição do Banner de Cotação', value: Math.round(totalViews * 0.38), percentage: 38, color: '#19A3DF' },
            { step: '4. Clique no Botão "Cotar Frete"', value: Math.round(totalViews * 0.084), percentage: 8.4, color: '#38BDF8' },
            { step: '5. Cotação Salva no CRM', value: inboundQuotes, percentage: Number(quoteConvRate), color: '#10B981' }
        ]
    };
};

/**
 * Consulta de dados analíticos por propriedade ('site' | 'bio' | 'blog').
 * Suporta modo 'api' conectado ao endpoint GA4 ou fallback de demonstração.
 */
export const fetchAnalyticsData = async (property = 'site', period = '30d') => {
    const config = getSavedConfig(property);

    if (config.mode === 'api' && config.apiUrl) {
        try {
            const res = await fetch(`${config.apiUrl.replace(/\/$/, '')}/report`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    propertyId: config.propertyId,
                    measurementId: config.measurementId,
                    property,
                    period
                })
            });

            if (!res.ok) {
                throw new Error(`Falha na API GA4 (${property}): Status ${res.status}`);
            }

            const data = await res.json();
            return {
                ...data,
                property,
                isLive: true
            };
        } catch (error) {
            console.error(`Falha ao obter dados da API GA4 para ${property}:`, error);
            let fallback;
            if (property === 'bio') fallback = generateBioMockData(period);
            else if (property === 'blog') fallback = generateBlogMockData(period);
            else fallback = generateSiteMockData(period);

            return {
                ...fallback,
                property,
                isLive: false,
                apiError: error.message
            };
        }
    }

    // Delay de rede suave de 300ms
    await new Promise(resolve => setTimeout(resolve, 300));
    
    if (property === 'bio') {
        return { ...generateBioMockData(period), isLive: false };
    }
    if (property === 'blog') {
        return { ...generateBlogMockData(period), isLive: false };
    }
    return { ...generateSiteMockData(period), isLive: false };
};
