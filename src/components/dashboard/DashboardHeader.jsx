import React from 'react';
import { Link } from 'react-router-dom';
import { 
    ArrowLeft, 
    ArrowClockwise, 
    Gear, 
    ChartLineUp, 
    CheckCircle, 
    WarningCircle 
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
    onOpenConfig 
}) => {
    return (
        <header className="dash-header">
            <div className="dash-header-container">
                {/* Lado Esquerdo: Voltar + Logo + Título */}
                <div className="dash-header-left">
                    <Link to="/" className="dash-back-btn" title="Voltar ao site público">
                        <ArrowLeft weight="bold" size={16} />
                        <span>Voltar ao Site</span>
                    </Link>

                    <div className="dash-divider-v hide-mobile"></div>

                    <div className="dash-brand-group">
                        <img src={logo} alt="Expresso PB Logística" className="dash-logo" />
                        <div className="dash-title-group hide-mobile">
                            <span className="dash-badge-hub">
                                <ChartLineUp weight="bold" size={12} /> B2B Intelligence Hub
                            </span>
                            <h1 className="dash-title">Painel de Performance GA4</h1>
                        </div>
                    </div>
                </div>

                {/* Lado Direito: Status + Períodos + Ações */}
                <div className="dash-header-right">
                    {/* Badge de Status GA4 */}
                    <div 
                        className={`dash-status-badge ${isLive ? 'status-live' : 'status-demo'}`}
                        onClick={onOpenConfig}
                        role="button"
                        tabIndex={0}
                        title={isLive ? "Conectado ao Google Analytics 4" : "Clique para conectar com suas credenciais do GA4"}
                    >
                        {isLive ? (
                            <>
                                <span className="status-dot live"></span>
                                <CheckCircle weight="fill" size={14} />
                                <span>GA4 Conectado</span>
                            </>
                        ) : (
                            <>
                                <span className="status-dot demo"></span>
                                <WarningCircle weight="fill" size={14} />
                                <span>Modo Demonstração</span>
                            </>
                        )}
                    </div>

                    {/* Seletor de Período Temporal */}
                    <div className="dash-period-selector" role="group" aria-label="Seletor de período">
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

                    {/* Botão de Atualização Manual */}
                    <button 
                        type="button"
                        className="dash-icon-btn" 
                        onClick={onRefresh}
                        title="Atualizar dados"
                        disabled={loading}
                        aria-label="Atualizar dados"
                    >
                        <ArrowClockwise weight="bold" size={18} className={loading ? 'dash-spin' : ''} />
                    </button>

                    {/* Botão de Configurações GA4 */}
                    <button 
                        type="button"
                        className="dash-config-btn"
                        onClick={onOpenConfig}
                        title="Configurações de Conexão do GA4"
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
