/**
 * analyticsService.js
 * Camada de serviço de dados analíticos para a Expresso PB Logística.
 * Suporta modo demonstração (dados calibrados para carga lotação FTL) e
 * conexão ativa com o Google Analytics 4 (GA4 Data API via proxy/backend).
 */

const STORAGE_KEY = 'expressopb_ga4_config';

export const getSavedConfig = () => {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            return JSON.parse(saved);
        }
    } catch (e) {
        console.warn('Erro ao carregar configurações do GA4:', e);
    }
    return {
        propertyId: import.meta.env.VITE_GA4_PROPERTY_ID || '',
        apiUrl: import.meta.env.VITE_GA4_API_URL || '',
        mode: 'demo', // 'demo' ou 'api'
    };
};

export const saveConfig = (newConfig) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newConfig));
    } catch (e) {
        console.error('Erro ao salvar configuração do GA4:', e);
    }
};

// Gerador de dados de demonstração calibrados por período (7d, 14d, 30d, 90d)
const generateMockData = (period = '30d') => {
    const multipliers = {
        '7d': { days: 7, factor: 0.25, dates: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'] },
        '14d': { days: 14, factor: 0.5, dates: Array.from({ length: 14 }, (_, i) => `D-${14 - i}`) },
        '30d': { days: 30, factor: 1.0, dates: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'] },
        '90d': { days: 90, factor: 2.8, dates: ['Mês 1', 'Mês 2', 'Mês 3'] }
    };

    const currentConfig = multipliers[period] || multipliers['30d'];
    const f = currentConfig.factor;

    const baseLeadsWhatsapp = Math.round(98 * f);
    const baseLeadsForm = Math.round(44 * f);
    const totalCommercialLeads = baseLeadsWhatsapp + baseLeadsForm;
    const totalRhLeads = Math.round(89 * f);
    const totalSessions = Math.round(3740 * f);
    const conversionRate = ((totalCommercialLeads / totalSessions) * 100).toFixed(1);

    // Série temporal de leads diários/semanais
    const timeSeries = currentConfig.dates.map((label, idx) => {
        // Variação orgânica
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
            purityRatio: '61.5%', // 61.5% comercial vs 38.5% rh
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

/**
 * Consulta o dashboard.
 * Se o modo for 'api' e houver URL configurada, envia requisição ao endpoint GA4.
 * Caso contrário, retorna o modelo calibrado de demonstração.
 */
export const fetchAnalyticsData = async (period = '30d') => {
    const config = getSavedConfig();

    if (config.mode === 'api' && config.apiUrl) {
        try {
            const res = await fetch(`${config.apiUrl.replace(/\/$/, '')}/report`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    propertyId: config.propertyId,
                    period
                })
            });

            if (!res.ok) {
                throw new Error(`Falha na API GA4: Status ${res.status}`);
            }

            const data = await res.json();
            return {
                ...data,
                isLive: true
            };
        } catch (error) {
            console.error('Falha ao obter dados da API GA4, ativando fallback demo:', error);
            const fallback = generateMockData(period);
            return {
                ...fallback,
                isLive: false,
                apiError: error.message
            };
        }
    }

    // Simula delay de rede realista de 350ms para UX suave
    await new Promise(resolve => setTimeout(resolve, 350));
    const mock = generateMockData(period);
    return {
        ...mock,
        isLive: false
    };
};
