import React, { useState } from 'react';
import { 
    CalendarBlank, 
    FunnelSimple, 
    ChartPie, 
    GlobeHemisphereWest, 
    WhatsappLogo, 
    FileText,
    Buildings,
    CaretRight,
    Sparkle
} from '@phosphor-icons/react';

export const ChartsSection = ({ timeSeries, segments, funnel, topGeo, loading }) => {
    const [activePoint, setActivePoint] = useState(null);
    const [hoveredSegment, setHoveredSegment] = useState(null);
    const [channelFilter, setChannelFilter] = useState('all'); // 'all' | 'wpp' | 'form'

    if (!timeSeries || !segments) return null;

    // --- CÁLCULOS DO GRÁFICO DE LINHA/ÁREA TEMPORAL (SVG) ---
    const chartWidth = 620;
    const chartHeight = 230;
    const padding = { top: 25, right: 20, bottom: 35, left: 35 };
    const innerWidth = chartWidth - padding.left - padding.right;
    const innerHeight = chartHeight - padding.top - padding.bottom;

    const maxVal = Math.max(...timeSeries.map(d => Math.max(d.whatsapp, d.formulario)), 10) * 1.25;

    const getX = (idx) => padding.left + (idx / Math.max(timeSeries.length - 1, 1)) * innerWidth;
    const getY = (val) => padding.top + innerHeight - (val / maxVal) * innerHeight;

    // Gerar paths SVG para WhatsApp e Formulário
    const wppPoints = timeSeries.map((d, i) => `${getX(i)},${getY(d.whatsapp)}`).join(' ');
    const formPoints = timeSeries.map((d, i) => `${getX(i)},${getY(d.formulario)}`).join(' ');

    const wppAreaPath = `M ${getX(0)},${getY(0)} L ${timeSeries.map((d, i) => `${getX(i)},${getY(d.whatsapp)}`).join(' L ')} L ${getX(timeSeries.length - 1)},${getY(0)} Z`;
    const formAreaPath = `M ${getX(0)},${getY(0)} L ${timeSeries.map((d, i) => `${getX(i)},${getY(d.formulario)}`).join(' L ')} L ${getX(timeSeries.length - 1)},${getY(0)} Z`;

    // --- CÁLCULOS DO GRÁFICO DE ROSCA (DONUT SVG) ---
    const donutRadius = 65;
    const circumference = 2 * Math.PI * donutRadius;
    const totalSegmentLeads = segments.reduce((acc, s) => acc + s.totalLeads, 0);

    let cumulativeAngle = 0;
    const donutSlices = segments.map((seg) => {
        const percentage = totalSegmentLeads > 0 ? (seg.totalLeads / totalSegmentLeads) : 0.25;
        const strokeDasharray = `${percentage * circumference} ${circumference}`;
        const strokeDashoffset = -cumulativeAngle * circumference;
        cumulativeAngle += percentage;
        return {
            ...seg,
            strokeDasharray,
            strokeDashoffset,
            percentage: Math.round(percentage * 100)
        };
    });

    const showWpp = channelFilter === 'all' || channelFilter === 'wpp';
    const showForm = channelFilter === 'all' || channelFilter === 'form';

    return (
        <section className={`dash-charts-grid ${loading ? 'dash-skeleton' : ''}`}>
            {/* 1. GRÁFICO TEMPORAL DE EVOLUÇÃO DE LEADS */}
            <div className="dash-card dash-chart-main">
                <div className="dash-card-header">
                    <div className="dash-card-title-group">
                        <CalendarBlank weight="duotone" size={22} className="dash-icon-title" />
                        <div>
                            <h3>Evolução de Cotações & Leads B2B</h3>
                            <p>Volume diário de oportunidades geradas por canal de aquisição</p>
                        </div>
                    </div>

                    {/* Filtros de Canal Interativos */}
                    <div className="dash-chart-filter-group">
                        <button 
                            type="button"
                            className={`dash-chart-pill ${channelFilter === 'all' ? 'active' : ''}`}
                            onClick={() => setChannelFilter('all')}
                        >
                            Todos
                        </button>
                        <button 
                            type="button"
                            className={`dash-chart-pill pill-cyan ${channelFilter === 'wpp' ? 'active' : ''}`}
                            onClick={() => setChannelFilter('wpp')}
                        >
                            <WhatsappLogo weight="fill" size={12} /> WhatsApp
                        </button>
                        <button 
                            type="button"
                            className={`dash-chart-pill pill-navy ${channelFilter === 'form' ? 'active' : ''}`}
                            onClick={() => setChannelFilter('form')}
                        >
                            <FileText weight="fill" size={12} /> Formulário
                        </button>
                    </div>
                </div>

                <div className="dash-svg-container">
                    <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="dash-line-chart">
                        <defs>
                            {/* Gradiente WhatsApp Neon */}
                            <linearGradient id="gradWppNeon" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#19A3DF" stopOpacity="0.45" />
                                <stop offset="100%" stopColor="#19A3DF" stopOpacity="0.0" />
                            </linearGradient>
                            {/* Gradiente Formulário */}
                            <linearGradient id="gradFormNeon" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.30" />
                                <stop offset="100%" stopColor="#000327" stopOpacity="0.0" />
                            </linearGradient>

                            {/* Filtro de Brilho Neon */}
                            <filter id="cyanGlow" x="-20%" y="-20%" width="140%" height="140%">
                                <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#19A3DF" floodOpacity="0.45" />
                            </filter>
                        </defs>

                        {/* Linhas de Grade Horizontal */}
                        {[0, 0.33, 0.66, 1].map((ratio, idx) => {
                            const y = padding.top + innerHeight * (1 - ratio);
                            const valLabel = Math.round(maxVal * ratio);
                            return (
                                <g key={idx} className="dash-grid-line-group">
                                    <line 
                                        x1={padding.left} 
                                        y1={y} 
                                        x2={chartWidth - padding.right} 
                                        y2={y} 
                                        className="dash-grid-line"
                                        strokeDasharray="4 4" 
                                    />
                                    <text 
                                        x={padding.left - 8} 
                                        y={y + 4} 
                                        fontSize="10" 
                                        className="dash-grid-text"
                                        textAnchor="end"
                                    >
                                        {valLabel}
                                    </text>
                                </g>
                            );
                        })}

                        {/* Área Preenchida com Gradiente */}
                        {showWpp && <path d={wppAreaPath} fill="url(#gradWppNeon)" />}
                        {showForm && <path d={formAreaPath} fill="url(#gradFormNeon)" />}

                        {/* Linha do Formulário */}
                        {showForm && (
                            <polyline 
                                fill="none" 
                                stroke="#38BDF8" 
                                strokeWidth="2.5" 
                                points={formPoints} 
                                strokeLinecap="round" 
                                strokeLinejoin="round"
                            />
                        )}

                        {/* Linha do WhatsApp */}
                        {showWpp && (
                            <polyline 
                                fill="none" 
                                stroke="#19A3DF" 
                                strokeWidth="3.2" 
                                points={wppPoints} 
                                strokeLinecap="round" 
                                strokeLinejoin="round"
                                filter="url(#cyanGlow)"
                            />
                        )}

                        {/* Pontos Interativos e Rótulos do Eixo X */}
                        {timeSeries.map((d, i) => {
                            const cx = getX(i);
                            const cyWpp = getY(d.whatsapp);
                            const cyForm = getY(d.formulario);
                            const isHovered = activePoint === i;

                            return (
                                <g key={i} onMouseEnter={() => setActivePoint(i)} onMouseLeave={() => setActivePoint(null)} style={{ cursor: 'pointer' }}>
                                    {/* Linha vertical indicadora no hover */}
                                    {isHovered && (
                                        <line 
                                            x1={cx} 
                                            y1={padding.top} 
                                            x2={cx} 
                                            y2={padding.top + innerHeight} 
                                            stroke="#19A3DF" 
                                            strokeWidth="1.5" 
                                            strokeDasharray="3 3" 
                                        />
                                    )}

                                    {/* Ponto Formulário */}
                                    {showForm && (
                                        <circle 
                                            cx={cx} 
                                            cy={cyForm} 
                                            r={isHovered ? 6 : 3.5} 
                                            className="dash-chart-dot-form"
                                        />
                                    )}
                                    
                                    {/* Ponto WhatsApp */}
                                    {showWpp && (
                                        <circle 
                                            cx={cx} 
                                            cy={cyWpp} 
                                            r={isHovered ? 6.5 : 4.5} 
                                            className="dash-chart-dot-wpp"
                                        />
                                    )}

                                    {/* Rótulo Eixo X */}
                                    <text 
                                        x={cx} 
                                        y={chartHeight - 10} 
                                        fontSize="11" 
                                        className={`dash-axis-text ${isHovered ? 'active' : ''}`}
                                        textAnchor="middle"
                                    >
                                        {d.label}
                                    </text>
                                </g>
                            );
                        })}
                    </svg>

                    {/* Tooltip Dinâmico Flutuante Executivo */}
                    {activePoint !== null && (
                        <div className="dash-tooltip-box">
                            <span className="dash-tooltip-title">
                                <Sparkle weight="fill" size={12} /> {timeSeries[activePoint].label}
                            </span>
                            <div className="dash-tooltip-row">
                                <span className="tooltip-ch-name">
                                    <span className="dot-cyan"></span> WhatsApp:
                                </span>
                                <strong>{timeSeries[activePoint].whatsapp} leads</strong>
                            </div>
                            <div className="dash-tooltip-row">
                                <span className="tooltip-ch-name">
                                    <span className="dot-sky"></span> Formulário:
                                </span>
                                <strong>{timeSeries[activePoint].formulario} cotações</strong>
                            </div>
                            <div className="dash-tooltip-total">
                                <span>Total Gerado:</span>
                                <strong>{timeSeries[activePoint].total} oportunidades</strong>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* 2. GRÁFICO DE DONUT DE SEGMENTOS */}
            <div className="dash-card dash-chart-donut">
                <div className="dash-card-header">
                    <div className="dash-card-title-group">
                        <ChartPie weight="duotone" size={22} className="dash-icon-title" />
                        <div>
                            <h3>Demanda por Segmento</h3>
                            <p>Distribuição de cotações B2B recebidas</p>
                        </div>
                    </div>
                </div>

                <div className="dash-donut-wrapper">
                    <div className="dash-donut-svg-box">
                        <svg viewBox="0 0 160 160" className="dash-donut-svg">
                            {donutSlices.map((slice, i) => (
                                <circle
                                    key={i}
                                    cx="80"
                                    cy="80"
                                    r={donutRadius}
                                    fill="transparent"
                                    stroke={slice.color}
                                    strokeWidth={hoveredSegment === i ? "24" : "18"}
                                    strokeDasharray={slice.strokeDasharray}
                                    strokeDashoffset={slice.strokeDashoffset}
                                    transform="rotate(-90 80 80)"
                                    className={`dash-donut-segment ${hoveredSegment === i ? 'is-active' : ''}`}
                                    onMouseEnter={() => setHoveredSegment(i)}
                                    onMouseLeave={() => setHoveredSegment(null)}
                                />
                            ))}
                        </svg>
                        {/* Centro da Rosca com Número em Orbitron */}
                        <div className="dash-donut-center">
                            <span className="dash-donut-center-num">
                                {hoveredSegment !== null ? donutSlices[hoveredSegment].totalLeads : totalSegmentLeads}
                            </span>
                            <span className="dash-donut-center-label">
                                {hoveredSegment !== null ? donutSlices[hoveredSegment].name.split(' ')[0] : 'Total Leads'}
                            </span>
                        </div>
                    </div>

                    {/* Legenda Customizada com Percentuais */}
                    <div className="dash-donut-legend">
                        {donutSlices.map((slice, i) => (
                            <div 
                                key={i} 
                                className={`dash-donut-legend-row ${hoveredSegment === i ? 'active' : ''}`}
                                onMouseEnter={() => setHoveredSegment(i)}
                                onMouseLeave={() => setHoveredSegment(null)}
                            >
                                <span className="dash-legend-color" style={{ backgroundColor: slice.color }}></span>
                                <span className="dash-legend-name">{slice.name}</span>
                                <span className="dash-legend-pct"><strong>{slice.percentage}%</strong></span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* 3. FUNIL DE CONVERSÃO B2B */}
            <div className="dash-card dash-chart-funnel">
                <div className="dash-card-header">
                    <div className="dash-card-title-group">
                        <FunnelSimple weight="duotone" size={22} className="dash-icon-title" />
                        <div>
                            <h3>Funil de Aquisição de Cargas</h3>
                            <p>Taxa de avanço na jornada do comitê de compras</p>
                        </div>
                    </div>
                </div>

                <div className="dash-funnel-list">
                    {funnel.map((step, idx) => (
                        <div key={idx} className="dash-funnel-item">
                            <div className="dash-funnel-header">
                                <span className="dash-funnel-step-name">
                                    <span className="dash-step-num">{idx + 1}</span> {step.step}
                                </span>
                                <span className="dash-funnel-values">
                                    <strong>{step.value.toLocaleString('pt-BR')}</strong>
                                    <span className="dash-funnel-pct">{step.percentage}%</span>
                                </span>
                            </div>
                            <div className="dash-funnel-track">
                                <div 
                                    className="dash-funnel-fill" 
                                    style={{ 
                                        width: `${Math.max(step.percentage, 5)}%`,
                                        background: `linear-gradient(90deg, #19A3DF 0%, ${step.color} 100%)`
                                    }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 4. DISTRIBUIÇÃO GEOGRÁFICA (TOP UFS) */}
            <div className="dash-card dash-chart-geo">
                <div className="dash-card-header">
                    <div className="dash-card-title-group">
                        <GlobeHemisphereWest weight="duotone" size={22} className="dash-icon-title" />
                        <div>
                            <h3>Demanda Geográfica (Top Origens)</h3>
                            <p>Estados com maior procura por frota dedicada</p>
                        </div>
                    </div>
                </div>

                <div className="dash-geo-list">
                    {topGeo.map((item, idx) => {
                        const maxGeoSessions = topGeo[0].sessions;
                        const pctBar = Math.round((item.sessions / maxGeoSessions) * 100);

                        return (
                            <div key={idx} className="dash-geo-row">
                                <div className="dash-geo-label">
                                    <span className="dash-geo-code">{item.code}</span>
                                    <span className="dash-geo-name">{item.uf}</span>
                                    {item.isBranch && (
                                        <span className="dash-branch-badge" title="Filial física ou matriz da Expresso PB">
                                            <Buildings size={11} weight="fill" /> {item.code === 'PB' ? 'Matriz' : 'Filial'}
                                        </span>
                                    )}
                                </div>
                                <div className="dash-geo-bar-wrapper">
                                    <div className="dash-geo-bar-track">
                                        <div className="dash-geo-bar-fill" style={{ width: `${pctBar}%` }}></div>
                                    </div>
                                    <span className="dash-geo-metric">
                                        <strong>{item.leads}</strong> cotações ({item.sessions} visitas)
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ChartsSection;
