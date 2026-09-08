import React from 'react';
import { Link } from 'react-router-dom';
import { 
    ArrowLeft, 
    Gear, 
    CheckCircle, 
    WarningCircle,
    ChartLineUp
} from '@phosphor-icons/react';
import logo from '../../assets/logo fundo escuro.svg';

export const DashboardHeader = ({ 
    isLive, 
    onOpenConfig 
}) => {
    return (
        <header className="dash-header">
            <div className="dash-header-container">
                {/* Lado Esquerdo: Voltar ao Site + Logo Expresso PB + Título */}
                <div className="dash-header-left">
                    <Link to="/" className="dash-back-btn" title="Retornar ao site institucional da Expresso PB">
                        <ArrowLeft weight="bold" size={15} />
                        <span>Voltar ao Site</span>
                    </Link>

                    <div className="dash-divider-v hide-mobile"></div>

                    <div className="dash-brand-group">
                        <img src={logo} alt="Expresso PB Logística" className="dash-logo" />
                        <div className="dash-title-group hide-mobile">
                            <span className="dash-badge-hub">
                                <ChartLineUp weight="bold" size={12} /> B2B INTELLIGENCE HUB
                            </span>
                            <h1 className="dash-title">Painel de Performance GA4</h1>
                        </div>
                    </div>
                </div>

                {/* Lado Direito: Status GA4 + Botão Conectar */}
                <div className="dash-header-right">
                    {/* Badge de Status GA4 */}
                    <div 
                        className={`dash-status-badge ${isLive ? 'status-live' : 'status-demo'}`}
                        onClick={onOpenConfig}
                        role="button"
                        tabIndex={0}
                        title={isLive ? "Conectado ao Google Analytics 4" : "Clique para conectar com suas credenciais do GA4"}
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
