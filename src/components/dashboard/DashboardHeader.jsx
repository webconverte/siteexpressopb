import React from 'react';
import { Link } from 'react-router-dom';
import { 
    ArrowLeft, 
    Gear, 
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
                {/* Lado Esquerdo: Identidade da Marca + Título Executivo + Badge */}
                <div className="dash-header-left">
                    <Link to="/" className="dash-brand-link" title="Expresso PB Logística - Página Inicial">
                        <img src={logo} alt="Expresso PB Logística" className="dash-logo" />
                    </Link>

                    <div className="dash-divider-v hide-mobile"></div>

                    <div className="dash-title-group">
                        <div className="dash-title-main-row">
                            <h1 className="dash-title">Painel de Performance B2B</h1>
                            <span className="dash-tag-hub hide-mobile">
                                <span className="dash-tag-dot"></span>
                                B2B Intelligence Hub
                            </span>
                        </div>
                        <p className="dash-subtitle hide-mobile">
                            Telemetria comercial GA4, rotas operacionais e conversão de fretes
                        </p>
                    </div>
                </div>

                {/* Lado Direito: Status da Conexão, Botão de Integração e Retorno */}
                <div className="dash-header-right">
                    {/* Badge / Botão de Status da Telemetria */}
                    <button 
                        type="button"
                        className={`dash-status-pill ${isLive ? 'status-live' : 'status-demo'}`}
                        onClick={onOpenConfig}
                        title={isLive ? "Conexão GA4 ativa em tempo real. Clique para gerenciar." : "Exibindo dados simulados. Clique para conectar suas credenciais do GA4."}
                    >
                        <span className={`status-pulse-dot ${isLive ? 'dot-live' : 'dot-demo'}`}></span>
                        <span className="dash-status-text">
                            {isLive ? 'GA4 Conectado' : 'Modo Demonstração'}
                        </span>
                    </button>

                    {/* Botão de Conexão com GA4 */}
                    <button 
                        type="button"
                        className="dash-btn-config"
                        onClick={onOpenConfig}
                        title="Configurações de Conexão com Google Analytics 4"
                    >
                        <Gear weight="bold" size={15} />
                        <span className="hide-mobile">Conectar GA4</span>
                    </button>

                    <div className="dash-divider-v hide-mobile"></div>

                    {/* Link Retornar ao Site */}
                    <Link to="/" className="dash-btn-back" title="Retornar ao site institucional da Expresso PB">
                        <ArrowLeft weight="bold" size={14} />
                        <span className="hide-mobile">Voltar ao Site</span>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default DashboardHeader;
