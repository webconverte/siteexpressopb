import React, { useState, useEffect } from 'react';
import useAnalyticsData from '../hooks/useAnalyticsData';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import ExecutiveInsightBar from '../components/dashboard/ExecutiveInsightBar';
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
    
    // Tema: 'dark' (Torre de Controle) ou 'light' (Executivo Corporativo)
    const [theme, setTheme] = useState(() => {
        try {
            return localStorage.getItem('expresso_dash_theme') || 'dark';
        } catch {
            return 'dark';
        }
    });

    const toggleTheme = () => {
        setTheme(prev => {
            const next = prev === 'dark' ? 'light' : 'dark';
            try {
                localStorage.setItem('expresso_dash_theme', next);
            } catch (e) {
                // Ignore storage errors
            }
            return next;
        });
    };

    return (
        <div className={`dash-layout theme-${theme}`}>
            {/* 1. Header do Dashboard Executivo */}
            <DashboardHeader
                period={period}
                onPeriodChange={setPeriod}
                onRefresh={refresh}
                loading={loading}
                isLive={data?.isLive}
                onOpenConfig={() => setIsConfigOpen(true)}
                theme={theme}
                onToggleTheme={toggleTheme}
            />

            <main className="dash-main-content">
                <div className="dash-container">
                    {/* Alerta de Erro na API (se houver tentativa falha) */}
                    {(error || data?.apiError) && (
                        <div className="dash-alert-banner">
                            <WarningCircle weight="fill" size={20} />
                            <div>
                                <strong>Aviso de Conexão:</strong> Não foi possível obter dados da API externa ({error || data?.apiError}). 
                                Exibindo dados de demonstração calibrados para a frota e operações da Expresso PB.
                            </div>
                        </div>
                    )}

                    {/* 2. Barra de Telemetria e Inteligência B2B Expresso PB */}
                    <ExecutiveInsightBar period={period} />

                    {/* 3. Grid de Cards de KPIs Executivos com tipografia Orbitron */}
                    <KpiCardsGrid 
                        kpis={data?.kpis} 
                        loading={loading} 
                    />

                    {/* 4. Seção de Gráficos (SVG Interativos com Filtro de Canal) */}
                    <ChartsSection 
                        timeSeries={data?.timeSeries} 
                        segments={data?.segments} 
                        funnel={data?.funnel} 
                        topGeo={data?.topGeo} 
                        loading={loading} 
                    />

                    {/* 5. Seção de Tabelas de Inteligência Comercial com Busca e Exportação */}
                    <TablesSection 
                        segments={data?.segments} 
                        routes={data?.routes} 
                        ctas={data?.ctas} 
                        loading={loading} 
                    />

                    {/* Rodapé Interno do Dashboard */}
                    <footer className="dash-footer">
                        <div className="dash-footer-content">
                            <p>
                                <strong>Expresso PB Logística</strong> • Torre de Controle B2B integrada a Google Analytics 4 (GA4) & Google Tag Manager.
                            </p>
                            <div className="dash-footer-tags">
                                <span className="dash-footer-tag">
                                    SLA Operacional: 99.4%
                                </span>
                                <span className="dash-footer-tag tag-highlight">
                                    Zero Pernoite Garantido
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
