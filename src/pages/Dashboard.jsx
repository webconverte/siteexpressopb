import React, { useState } from 'react';
import useAnalyticsData from '../hooks/useAnalyticsData';
import DashboardHeader from '../components/dashboard/DashboardHeader';
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

    return (
        <div className="dash-layout">
            {/* 1. Header do Dashboard */}
            <DashboardHeader
                period={period}
                onPeriodChange={setPeriod}
                onRefresh={refresh}
                loading={loading}
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
                                Exibindo dados de demonstração calibrados para a Expresso PB.
                            </div>
                        </div>
                    )}

                    {/* 2. Grid de Cards de KPIs Executivos */}
                    <KpiCardsGrid 
                        kpis={data?.kpis} 
                        loading={loading} 
                    />

                    {/* 3. Seção de Gráficos (SVG Interativos) */}
                    <ChartsSection 
                        timeSeries={data?.timeSeries} 
                        segments={data?.segments} 
                        funnel={data?.funnel} 
                        topGeo={data?.topGeo} 
                        loading={loading} 
                    />

                    {/* 4. Seção de Tabelas de Inteligência Comercial */}
                    <TablesSection 
                        segments={data?.segments} 
                        routes={data?.routes} 
                        ctas={data?.ctas} 
                        loading={loading} 
                    />

                    {/* Rodapé Interno do Dashboard */}
                    <footer className="dash-footer">
                        <p>
                            Expresso PB Logística • Painel Executivo B2B conectado ao Google Analytics 4 (GA4) & GTM.
                        </p>
                        <span className="dash-footer-tag">
                            Versão 1.0 • Pronto para Produção
                        </span>
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
