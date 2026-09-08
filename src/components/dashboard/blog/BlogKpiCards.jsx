import React from 'react';
import { 
    Article, 
    Clock, 
    FileText, 
    MagnifyingGlass, 
    ArrowUpRight, 
    Sparkle,
    Users
} from '@phosphor-icons/react';

export const BlogKpiCards = ({ kpis, loading }) => {
    if (!kpis) return null;

    return (
        <div className="dash-kpi-grid">
            {/* Card 1: Pageviews Totais do Blog */}
            <div className={`dash-kpi-card ${loading ? 'dash-skeleton' : ''}`}>
                <div className="dash-kpi-header">
                    <div className="dash-kpi-icon icon-cyan">
                        <Article weight="duotone" size={24} />
                    </div>
                    <span className="dash-kpi-badge badge-positive">
                        <ArrowUpRight weight="bold" size={13} />
                        {kpis.viewsDiff}
                    </span>
                </div>
                <div className="dash-kpi-body">
                    <span className="dash-kpi-label">Leituras Totais do Blog</span>
                    <div className="dash-kpi-value-row">
                        <span className="dash-kpi-value">{kpis.totalViews?.toLocaleString('pt-BR')}</span>
                        <span className="dash-kpi-unit">pageviews</span>
                    </div>
                    <p className="dash-kpi-subtext">
                        <Users weight="bold" size={12} />
                        <strong>{kpis.uniqueReaders?.toLocaleString('pt-BR')}</strong> leitores únicos interessados em logística
                    </p>
                </div>
            </div>

            {/* Card 2: Tempo Médio de Leitura */}
            <div className={`dash-kpi-card ${loading ? 'dash-skeleton' : ''}`}>
                <div className="dash-kpi-header">
                    <div className="dash-kpi-icon icon-sky">
                        <Clock weight="duotone" size={24} />
                    </div>
                    <span className="dash-kpi-badge badge-positive">
                        <ArrowUpRight weight="bold" size={13} />
                        {kpis.readTimeDiff}
                    </span>
                </div>
                <div className="dash-kpi-body">
                    <span className="dash-kpi-label">Tempo Médio no Artigo</span>
                    <div className="dash-kpi-value-row">
                        <span className="dash-kpi-value">{kpis.avgReadTime}</span>
                        <span className="dash-kpi-unit">min / post</span>
                    </div>
                    <p className="dash-kpi-subtext">
                        Alta retenção e profundidade em guias de frete
                    </p>
                </div>
            </div>

            {/* Card 3: Cotações Inbound Geradas via Blog */}
            <div className={`dash-kpi-card ${loading ? 'dash-skeleton' : ''}`}>
                <div className="dash-kpi-header">
                    <div className="dash-kpi-icon icon-green">
                        <FileText weight="duotone" size={24} />
                    </div>
                    <span className="dash-kpi-badge badge-positive">
                        <ArrowUpRight weight="bold" size={13} />
                        {kpis.quotesDiff}
                    </span>
                </div>
                <div className="dash-kpi-body">
                    <span className="dash-kpi-label">Cotações via Artigos</span>
                    <div className="dash-kpi-value-row">
                        <span className="dash-kpi-value">{kpis.inboundQuotes}</span>
                        <span className="dash-kpi-unit">leads FTL</span>
                    </div>
                    <p className="dash-kpi-subtext">
                        <Sparkle weight="fill" size={12} color="#10B981" />
                        Iniciadas a partir de CTAs de rodapé dos posts
                    </p>
                </div>
            </div>

            {/* Card 4: Tráfego Orgânico Google SEO */}
            <div className={`dash-kpi-card ${loading ? 'dash-skeleton' : ''}`}>
                <div className="dash-kpi-header">
                    <div className="dash-kpi-icon icon-navy">
                        <MagnifyingGlass weight="duotone" size={24} />
                    </div>
                    <span className="dash-kpi-badge badge-success">
                        {kpis.organicDiff}
                    </span>
                </div>
                <div className="dash-kpi-body">
                    <span className="dash-kpi-label">Busca Orgânica Google</span>
                    <div className="dash-kpi-value-row">
                        <span className="dash-kpi-value">{kpis.organicShare}</span>
                        <span className="dash-kpi-unit">SEO puro</span>
                    </div>
                    <p className="dash-kpi-subtext">
                        Custo de aquisição de tráfego zero (inbound)
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BlogKpiCards;
