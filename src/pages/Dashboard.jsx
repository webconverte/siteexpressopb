import React, { useState, useMemo } from 'react';
import useAnalyticsData from '../hooks/useAnalyticsData';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import DashboardFilterBar from '../components/dashboard/DashboardFilterBar';
import KpiCardsGrid from '../components/dashboard/KpiCardsGrid';
import ChartsSection from '../components/dashboard/ChartsSection';
import TablesSection from '../components/dashboard/TablesSection';
import Ga4ConfigModal from '../components/dashboard/Ga4ConfigModal';
import { WarningCircle } from '@phosphor-icons/react';

export const Dashboard = () => {
    const { 
        period, 
        setPeriod, 
        data, 
        loading, 
        error, 
        refresh, 
        config, 
        updateConfig 
    } = useAnalyticsData('30d');

    const [isConfigOpen, setIsConfigOpen] = useState(false);

    // Estados dos novos filtros analíticos
    const [segmentFilter, setSegmentFilter] = useState('all');
    const [channelFilter, setChannelFilter] = useState('all');
    const [regionFilter, setRegionFilter] = useState('all');

    const handleResetFilters = () => {
        setSegmentFilter('all');
        setChannelFilter('all');
        setRegionFilter('all');
    };

    // Dados dinamicamente filtrados por período, segmento, canal e UF
    const filteredData = useMemo(() => {
        if (!data) return null;

        let kpis = { ...data.kpis };
        let timeSeries = [...data.timeSeries];
        let segments = [...data.segments];
        let routes = [...data.routes];
        let topGeo = [...data.topGeo];
        let funnel = [...data.funnel];

        // 1. Filtrar por Segmento
        if (segmentFilter !== 'all') {
            const segMatch = segments.find(s => s.slug === segmentFilter);
            if (segMatch) {
                kpis.totalLeads = segMatch.totalLeads;
                kpis.leadsWhatsapp = segMatch.wppLeads;
                kpis.leadsForm = segMatch.formLeads;
                kpis.conversionRate = segMatch.convRate;
                kpis.topSegment = segMatch.name;
                kpis.topSegmentShare = `${segMatch.share}%`;
            }
        }

        // 2. Filtrar por Canal
        if (channelFilter === 'whatsapp') {
            kpis.totalLeads = kpis.leadsWhatsapp;
            timeSeries = timeSeries.map(d => ({ ...d, formulario: 0, total: d.whatsapp }));
        } else if (channelFilter === 'formulario') {
            kpis.totalLeads = kpis.leadsForm;
            timeSeries = timeSeries.map(d => ({ ...d, whatsapp: 0, total: d.formulario }));
        }

        // 3. Filtrar por Região / UF
        if (regionFilter !== 'all') {
            const geoFiltered = topGeo.filter(g => g.code === regionFilter);
            if (geoFiltered.length > 0) {
                topGeo = geoFiltered;
                kpis.qualifiedSessions = geoFiltered[0].sessions;
            }
            routes = routes.filter(r => r.origem.includes(regionFilter) || r.destino.includes(regionFilter));
        }

        return {
            ...data,
            kpis,
            timeSeries,
            segments,
            routes,
            topGeo,
            funnel
        };
    }, [data, segmentFilter, channelFilter, regionFilter]);

    return (
        <div className="dash-layout">
            {/* 1. Header do Dashboard (Clean Executive) */}
            <DashboardHeader
                isLive={data?.isLive}
                onOpenConfig={() => setIsConfigOpen(true)}
            />

            <main className="dash-main-content">
                <div className="dash-container">
                    {/* Alerta de Erro na API (se houver tentativa falha) */}
                    {(error || data?.apiError) && (
                        <div className="dash-alert-banner">
                            <WarningCircle weight="fill" size={20} />
                            <div>
                                <strong>Aviso de Conexão:</strong> Não foi possível obter dados da API externa ({error || data?.apiError}). 
                                Exibindo dados de demonstração calibrados para a frota da Expresso PB.
                            </div>
                        </div>
                    )}

                    {/* 2. Barra de Filtros Analíticos (Período, Segmentos, Canais e UFs) */}
                    <DashboardFilterBar
                        period={period}
                        onPeriodChange={setPeriod}
                        segment={segmentFilter}
                        onSegmentChange={setSegmentFilter}
                        channel={channelFilter}
                        onChannelChange={setChannelFilter}
                        region={regionFilter}
                        onRegionChange={setRegionFilter}
                        onResetFilters={handleResetFilters}
                        onRefresh={refresh}
                        loading={loading}
                    />

                    {/* 3. Grid de Cards de KPIs Executivos */}
                    <KpiCardsGrid 
                        kpis={filteredData?.kpis} 
                        loading={loading} 
                    />

                    {/* 4. Seção de Gráficos (SVG Interativos) */}
                    <ChartsSection 
                        timeSeries={filteredData?.timeSeries} 
                        segments={filteredData?.segments} 
                        funnel={filteredData?.funnel} 
                        topGeo={filteredData?.topGeo} 
                        loading={loading} 
                    />

                    {/* 5. Seção de Tabelas de Inteligência Comercial */}
                    <TablesSection 
                        segments={filteredData?.segments} 
                        routes={filteredData?.routes} 
                        ctas={filteredData?.ctas} 
                        loading={loading} 
                    />

                    {/* Rodapé do Dashboard */}
                    <footer className="dash-footer">
                        <div className="dash-footer-content">
                            <p>
                                <strong>Expresso PB Logística</strong> • Painel Executivo B2B conectado a Google Analytics 4 (GA4) & GTM.
                            </p>
                            <div className="dash-footer-tags">
                                <span className="dash-footer-tag">
                                    Carga Lotação B2B
                                </span>
                                <span className="dash-footer-tag tag-highlight">
                                    Integração GA4 Pronta
                                </span>
                            </div>
                        </div>
                    </footer>
                </div>
            </main>

            {/* Modal de Configuração de Credenciais GA4 */}
            <Ga4ConfigModal
                isOpen={isConfigOpen}
                onClose={() => setIsConfigOpen(false)}
                currentConfig={config}
                onSave={updateConfig}
            />
        </div>
    );
};

export default Dashboard;
