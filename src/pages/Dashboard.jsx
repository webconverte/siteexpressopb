import React, { useState, useMemo } from 'react';
import useAnalyticsData from '../hooks/useAnalyticsData';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import PropertyTabBar from '../components/dashboard/PropertyTabBar';
import DashboardFilterBar from '../components/dashboard/DashboardFilterBar';

// Componentes do Site Institucional
import KpiCardsGrid from '../components/dashboard/KpiCardsGrid';
import ChartsSection from '../components/dashboard/ChartsSection';
import TablesSection from '../components/dashboard/TablesSection';

// Componentes do Link da Bio
import BioKpiCards from '../components/dashboard/bio/BioKpiCards';
import BioChartsSection from '../components/dashboard/bio/BioChartsSection';
import BioTablesSection from '../components/dashboard/bio/BioTablesSection';

// Componentes do Blog de Logística
import BlogKpiCards from '../components/dashboard/blog/BlogKpiCards';
import BlogChartsSection from '../components/dashboard/blog/BlogChartsSection';
import BlogTablesSection from '../components/dashboard/blog/BlogTablesSection';

import Ga4ConfigModal from '../components/dashboard/Ga4ConfigModal';
import { WarningCircle } from '@phosphor-icons/react';

export const Dashboard = () => {
    const { 
        property,
        setProperty,
        period, 
        setPeriod, 
        data, 
        loading, 
        error, 
        refresh, 
        config, 
        allConfigs,
        updateConfig 
    } = useAnalyticsData('30d', 'site');

    const [isConfigOpen, setIsConfigOpen] = useState(false);

    // Estados dos filtros analíticos do Site Institucional
    const [segmentFilter, setSegmentFilter] = useState('all');
    const [channelFilter, setChannelFilter] = useState('all');
    const [regionFilter, setRegionFilter] = useState('all');

    const handleResetFilters = () => {
        setSegmentFilter('all');
        setChannelFilter('all');
        setRegionFilter('all');
    };

    // Dados dinamicamente filtrados para o Site Institucional
    const filteredSiteData = useMemo(() => {
        if (!data || property !== 'site') return null;

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
    }, [data, property, segmentFilter, channelFilter, regionFilter]);

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

                    {/* 2. Seletor de Abas de Propriedade (Site / Link da Bio / Blog) */}
                    <PropertyTabBar
                        activeProperty={property}
                        onSelectProperty={setProperty}
                        allConfigs={allConfigs}
                        loading={loading}
                    />

                    {/* 3. Barra de Filtros Analíticos */}
                    <DashboardFilterBar
                        property={property}
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

                    {/* 4. Conteúdo Dinâmico por Propriedade */}

                    {/* ABA 1: SITE INSTITUCIONAL */}
                    {property === 'site' && (
                        <>
                            <KpiCardsGrid 
                                kpis={filteredSiteData?.kpis} 
                                loading={loading} 
                            />
                            <ChartsSection 
                                timeSeries={filteredSiteData?.timeSeries} 
                                segments={filteredSiteData?.segments} 
                                funnel={filteredSiteData?.funnel} 
                                topGeo={filteredSiteData?.topGeo} 
                                loading={loading} 
                            />
                            <TablesSection 
                                segments={filteredSiteData?.segments} 
                                routes={filteredSiteData?.routes} 
                                ctas={filteredSiteData?.ctas} 
                                loading={loading} 
                            />
                        </>
                    )}

                    {/* ABA 2: LINK DA BIO */}
                    {property === 'bio' && (
                        <>
                            <BioKpiCards 
                                kpis={data?.kpis} 
                                loading={loading} 
                            />
                            <BioChartsSection 
                                timeSeries={data?.timeSeries} 
                                buttons={data?.buttons} 
                                hourlyDistribution={data?.hourlyDistribution} 
                                loading={loading} 
                            />
                            <BioTablesSection 
                                buttons={data?.buttons} 
                                campaigns={data?.campaigns} 
                                devices={data?.devices} 
                                loading={loading} 
                            />
                        </>
                    )}

                    {/* ABA 3: BLOG DE LOGÍSTICA */}
                    {property === 'blog' && (
                        <>
                            <BlogKpiCards 
                                kpis={data?.kpis} 
                                loading={loading} 
                            />
                            <BlogChartsSection 
                                timeSeries={data?.timeSeries} 
                                categories={data?.categories} 
                                funnel={data?.funnel} 
                                loading={loading} 
                            />
                            <BlogTablesSection 
                                articles={data?.articles} 
                                keywords={data?.keywords} 
                                loading={loading} 
                            />
                        </>
                    )}

                    {/* Rodapé do Dashboard */}
                    <footer className="dash-footer">
                        <div className="dash-footer-content">
                            <p>
                                <strong>Expresso PB Logística</strong> • Painel Executivo Multi-Propriedade conectado a Google Analytics 4 (GA4) & GTM.
                            </p>
                            <div className="dash-footer-tags">
                                <span className="dash-footer-tag">
                                    {property === 'site' ? 'Carga Lotação B2B' : property === 'bio' ? 'Social & Mobile CTR' : 'Inbound SEO & Conteúdo'}
                                </span>
                                <span className="dash-footer-tag tag-highlight">
                                    {data?.isLive ? 'GA4 API Conectado' : 'Modo Demonstração Calibrado'}
                                </span>
                            </div>
                        </div>
                    </footer>
                </div>
            </main>

            {/* Modal de Configuração de Credenciais GA4 Multi-Propriedade */}
            <Ga4ConfigModal
                isOpen={isConfigOpen}
                onClose={() => setIsConfigOpen(false)}
                currentConfig={config}
                allConfigs={allConfigs}
                activeProperty={property}
                onSave={updateConfig}
            />
        </div>
    );
};

export default Dashboard;
