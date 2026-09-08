import React from 'react';
import { 
    ChatCircleDots, 
    ChartLineUp, 
    Truck, 
    ShieldCheck, 
    ArrowUpRight, 
    WhatsappLogo, 
    FileText,
    UserCirclePlus
} from '@phosphor-icons/react';

export const KpiCardsGrid = ({ kpis, loading }) => {
    if (!kpis) return null;

    return (
        <section className="dash-kpi-grid">
            {/* Card 1: Leads Comerciais B2B */}
            <div className={`dash-kpi-card ${loading ? 'dash-skeleton' : ''}`}>
                <div className="dash-kpi-header">
                    <div className="dash-kpi-icon icon-cyan">
                        <ChatCircleDots weight="duotone" size={24} />
                    </div>
                    <span className="dash-kpi-badge badge-positive">
                        <ArrowUpRight weight="bold" size={13} />
                        {kpis.leadsDiff}
                    </span>
                </div>
                <div className="dash-kpi-body">
                    <span className="dash-kpi-label">Leads Comerciais B2B</span>
                    <div className="dash-kpi-value-row">
                        <span className="dash-kpi-value">{kpis.totalLeads}</span>
                        <span className="dash-kpi-unit">oportunidades</span>
                    </div>
                    <div className="dash-kpi-split">
                        <span className="dash-split-item" title="Conversões diretas no WhatsApp da mesa comercial">
                            <WhatsappLogo weight="fill" size={13} color="#25D366" />
                            <strong>{kpis.leadsWhatsapp}</strong> ({kpis.leadsWhatsappPercent})
                        </span>
                        <span className="dash-split-item" title="Cotações enviadas via formulário do site">
                            <FileText weight="fill" size={13} color="#19A3DF" />
                            <strong>{kpis.leadsForm}</strong> ({kpis.leadsFormPercent})
                        </span>
                    </div>
                </div>
            </div>

            {/* Card 2: Taxa de Conversão B2B */}
            <div className={`dash-kpi-card ${loading ? 'dash-skeleton' : ''}`}>
                <div className="dash-kpi-header">
                    <div className="dash-kpi-icon icon-navy">
                        <ChartLineUp weight="duotone" size={24} />
                    </div>
                    <span className="dash-kpi-badge badge-positive">
                        <ArrowUpRight weight="bold" size={13} />
                        {kpis.conversionRateDiff}
                    </span>
                </div>
                <div className="dash-kpi-body">
                    <span className="dash-kpi-label">Taxa de Conversão B2B</span>
                    <div className="dash-kpi-value-row">
                        <span className="dash-kpi-value">{kpis.conversionRate}</span>
                    </div>
                    <p className="dash-kpi-subtext">
                        Base: <strong>{kpis.qualifiedSessions.toLocaleString('pt-BR')}</strong> sessões qualificadas (&gt;45s)
                    </p>
                </div>
            </div>

            {/* Card 3: Segmento Líder */}
            <div className={`dash-kpi-card ${loading ? 'dash-skeleton' : ''}`}>
                <div className="dash-kpi-header">
                    <div className="dash-kpi-icon icon-sky">
                        <Truck weight="duotone" size={24} />
                    </div>
                    <span className="dash-kpi-badge badge-neutral">
                        {kpis.topSegmentShare} do volume
                    </span>
                </div>
                <div className="dash-kpi-body">
                    <span className="dash-kpi-label">Segmento Líder em Cotações</span>
                    <div className="dash-kpi-value-row">
                        <span className="dash-kpi-value text-compact">{kpis.topSegment}</span>
                    </div>
                    <p className="dash-kpi-subtext">
                        Maior índice de solicitações de carga lotação
                    </p>
                </div>
            </div>

            {/* Card 4: Pureza Comercial vs RH */}
            <div className={`dash-kpi-card ${loading ? 'dash-skeleton' : ''}`}>
                <div className="dash-kpi-header">
                    <div className="dash-kpi-icon icon-green">
                        <ShieldCheck weight="duotone" size={24} />
                    </div>
                    <span className="dash-kpi-badge badge-success">
                        Alta Pureza
                    </span>
                </div>
                <div className="dash-kpi-body">
                    <span className="dash-kpi-label">Índice de Pureza Comercial</span>
                    <div className="dash-kpi-value-row">
                        <span className="dash-kpi-value">{kpis.purityRatio}</span>
                        <span className="dash-kpi-unit">comercial</span>
                    </div>
                    {/* Barra de Proporção Visual */}
                    <div className="dash-progress-bar" title="Verde: Comercial B2B | Cinza: Candidaturas de Motoristas">
                        <div className="dash-progress-fill" style={{ width: kpis.purityRatio }}></div>
                    </div>
                    <p className="dash-kpi-subtext">
                        <UserCirclePlus weight="fill" size={13} />
                        <strong>{kpis.rhLeadsCount}</strong> currículos de RH segregados do time de vendas
                    </p>
                </div>
            </div>
        </section>
    );
};

export default KpiCardsGrid;
