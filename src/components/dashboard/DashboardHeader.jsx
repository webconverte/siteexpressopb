import React from 'react';
import { Link } from 'react-router-dom';
import { 
    ArrowLeft, 
    ArrowClockwise, 
    Gear, 
    ChartLineUp, 
    CheckCircle, 
    WarningCircle,
    Sun,
    Moon,
    Broadcast
} from '@phosphor-icons/react';
import logo from '../../assets/logo fundo escuro.svg';

const periods = [
    { key: '7d', label: '7 dias' },
    { key: '14d', label: '14 dias' },
    { key: '30d', label: '30 dias' },
    { key: '90d', label: '90 dias' }
];

export const DashboardHeader = ({ 
    period, 
    onPeriodChange, 
    onRefresh, 
    loading, 
    isLive, 
    onOpenConfig,
    theme = 'dark',
    onToggleTheme
}) => {
    return (
        <header className="dash-header">
            <div className="dash-header-container">
                {/* Lado Esquerdo: Voltar ao Site + Logo Expresso PB + Título com Kicker */}
                <div className="dash-header-left">
                    <Link to="/" className="dash-back-btn" title="Retornar ao site institucional da Expresso PB">
                        <ArrowLeft weight="bold" size={15} />
                        <span>Voltar ao Site</span>
                    </Link>

                    <div className="dash-divider-v hide-mobile"></div>

                    <div className="dash-brand-group">
                        <div className="dash-logo-box">
                            <img src={logo} alt="Expresso PB Logística" className="dash-logo" />
                            <span className="dash-radar-pulse" title="Telemetria Satelital Ativa"></span>
                        </div>
                        <div className="dash-title-group hide-mobile">
                            <span className="dash-badge-hub">
                                <Broadcast weight="bold" size={13} className="dash-pulse-icon" /> 
                                TORRE DE CONTROLE B2B • GA4 & GTM
                            </span>
                            <h1 className="dash-title">Painel Executivo de Inteligência Logística</h1>
                        </div>
                    </div>
                </div>

                {/* Lado Direito: Status GA4 + Seletor de Período + Alternador de Tema + Ações */}
                <div className="dash-header-right">
                    {/* Badge de Status GA4 com Radar */}
                    <div 
                        className={`dash-status-badge ${isLive ? 'status-live' : 'status-demo'}`}
                        onClick={onOpenConfig}
                        role="button"
                        tabIndex={0}
                        title={isLive ? "Conectado ao Google Analytics 4" : "Clique para conectar suas credenciais do GA4"}
                    >
                        <span className={`status-dot ${isLive ? 'live' : 'demo'}`}></span>
                        {isLive ? (
                            <>
                                <CheckCircle weight="fill" size={14} />
                                <span className="dash-status-text">GA4 Conectado</span>
                            </>
                        ) : (
                            <>
                                <WarningCircle weight="fill" size={14} />
                                <span className="dash-status-text">Modo Demonstração</span>
                            </>
                        )}
                    </div>

                    {/* Seletor de Período Temporal */}
                    <div className="dash-period-selector" role="group" aria-label="Seletor de período temporal">
                        {periods.map(p => (
                            <button
                                key={p.key}
                                type="button"
                                className={`dash-period-btn ${period === p.key ? 'active' : ''}`}
                                onClick={() => onPeriodChange(p.key)}
                                disabled={loading}
                            >
                                {p.label}
                            </button>
                        ))}
                    </div>

                    {/* Alternador de Tema (Torre de Controle Dark / Executivo Light) */}
                    <button
                        type="button"
                        className="dash-theme-btn"
                        onClick={onToggleTheme}
                        title={theme === 'dark' ? "Mudar para Modo Claro Executivo" : "Mudar para Modo Torre de Controle (Dark)"}
                        aria-label="Alternar tema visual"
                    >
                        {theme === 'dark' ? (
                            <Sun weight="duotone" size={18} />
                        ) : (
                            <Moon weight="duotone" size={18} />
                        )}
                    </button>

                    {/* Botão de Atualização Manual com Spin */}
                    <button 
                        type="button"
                        className="dash-icon-btn" 
                        onClick={onRefresh}
                        title="Atualizar dados de telemetria"
                        disabled={loading}
                        aria-label="Atualizar dados"
                    >
                        <ArrowClockwise weight="bold" size={17} className={loading ? 'dash-spin' : ''} />
                    </button>

                    {/* Botão de Conexão com GA4 */}
                    <button 
                        type="button"
                        className="dash-config-btn"
                        onClick={onOpenConfig}
                        title="Configurações de Conexão com Google Analytics 4"
                    >
                        <Gear weight="bold" size={16} />
                        <span className="hide-mobile">Conectar GA4</span>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default DashboardHeader;
