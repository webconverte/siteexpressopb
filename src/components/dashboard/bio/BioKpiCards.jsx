import React from 'react';
import { 
    CursorClick, 
    WhatsappLogo, 
    InstagramLogo, 
    DeviceMobile, 
    ArrowUpRight,
    Users
} from '@phosphor-icons/react';

export const BioKpiCards = ({ kpis, loading }) => {
    if (!kpis) return null;

    return (
        <div className="dash-kpi-grid">
            {/* Card 1: Cliques Totais no Link da Bio */}
            <div className={`dash-kpi-card ${loading ? 'dash-skeleton' : ''}`}>
                <div className="dash-kpi-header">
                    <div className="dash-kpi-icon icon-cyan">
                        <CursorClick weight="duotone" size={24} />
                    </div>
                    <span className="dash-kpi-badge badge-positive">
                        <ArrowUpRight weight="bold" size={13} />
                        {kpis.clicksDiff}
                    </span>
                </div>
                <div className="dash-kpi-body">
                    <span className="dash-kpi-label">Cliques Totais no Link</span>
                    <div className="dash-kpi-value-row">
                        <span className="dash-kpi-value">{kpis.totalClicks?.toLocaleString('pt-BR')}</span>
                        <span className="dash-kpi-unit">toques</span>
                    </div>
                    <p className="dash-kpi-subtext">
                        <Users weight="bold" size={12} />
                        <strong>{kpis.uniqueUsers?.toLocaleString('pt-BR')}</strong> visitantes únicos alcançados
                    </p>
                </div>
            </div>

            {/* Card 2: CTR Conversão Direta para WhatsApp */}
            <div className={`dash-kpi-card ${loading ? 'dash-skeleton' : ''}`}>
                <div className="dash-kpi-header">
                    <div className="dash-kpi-icon icon-green">
                        <WhatsappLogo weight="duotone" size={24} />
                    </div>
                    <span className="dash-kpi-badge badge-positive">
                        <ArrowUpRight weight="bold" size={13} />
                        {kpis.whatsappCtrDiff}
                    </span>
                </div>
                <div className="dash-kpi-body">
                    <span className="dash-kpi-label">CTR p/ WhatsApp Comercial</span>
                    <div className="dash-kpi-value-row">
                        <span className="dash-kpi-value">{kpis.whatsappCtr}</span>
                        <span className="dash-kpi-unit">conversão</span>
                    </div>
                    <div className="dash-progress-bar">
                        <div 
                            className="dash-progress-fill" 
                            style={{ width: kpis.whatsappCtr, background: 'linear-gradient(90deg, #10B981, #059669)' }}
                        />
                    </div>
                    <p className="dash-kpi-subtext">
                        Direto para atendimento comercial de frete
                    </p>
                </div>
            </div>

            {/* Card 3: Origem Social Predominante */}
            <div className={`dash-kpi-card ${loading ? 'dash-skeleton' : ''}`}>
                <div className="dash-kpi-header">
                    <div className="dash-kpi-icon icon-sky">
                        <InstagramLogo weight="duotone" size={24} />
                    </div>
                    <span className="dash-kpi-badge badge-success">
                        {kpis.topSourceShare}
                    </span>
                </div>
                <div className="dash-kpi-body">
                    <span className="dash-kpi-label">Origem Social Líder</span>
                    <div className="dash-kpi-value-row">
                        <span className="dash-kpi-value text-compact">{kpis.topSocialSource}</span>
                    </div>
                    <p className="dash-kpi-subtext">
                        Maior volume de cliques qualificados para FTL
                    </p>
                </div>
            </div>

            {/* Card 4: Tráfego Mobile */}
            <div className={`dash-kpi-card ${loading ? 'dash-skeleton' : ''}`}>
                <div className="dash-kpi-header">
                    <div className="dash-kpi-icon icon-navy">
                        <DeviceMobile weight="duotone" size={24} />
                    </div>
                    <span className="dash-kpi-badge badge-neutral">
                        Mobile First
                    </span>
                </div>
                <div className="dash-kpi-body">
                    <span className="dash-kpi-label">Acessos em Smartphones</span>
                    <div className="dash-kpi-value-row">
                        <span className="dash-kpi-value">{kpis.mobileShare}</span>
                        <span className="dash-kpi-unit">mobile</span>
                    </div>
                    <p className="dash-kpi-subtext">
                        Taxa de rejeição do micro-link: <strong>{kpis.bounceRate}</strong>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BioKpiCards;
