import React, { useState } from 'react';
import { 
    CalendarBlank, 
    Funnel, 
    ChartPie, 
    GlobeHemisphereWest, 
    WhatsappLogo, 
    FileText,
    Buildings
} from '@phosphor-icons/react';

export const ChartsSection = ({ timeSeries, segments, funnel, topGeo, loading }) => {
    const [activePoint, setActivePoint] = useState(null);
    const [hoveredSegment, setHoveredSegment] = useState(null);

    if (!timeSeries || !segments) return null;

    // --- CÁLCULOS DO GRÁFICO DE LINHA/ÁREA TEMPORAL (SVG) ---
    const chartWidth = 600;
    const chartHeight = 220;
    const padding = { top: 20, right: 20, bottom: 35, left: 35 };
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

    return (
        <section className={`dash-charts-grid ${loading ? 'dash-skeleton' : ''}`}>
            {/* 1. GRÁFICO TEMPORAL DE EVOLUÇÃO DE LEADS */}
            <div className="dash-card dash-chart-main">
                <div className="dash-card-header">
                    <div className="dash-card-title-group">
                        <CalendarBlank weight="duotone" size={20} className="dash-icon-title" />
                        <div>
                            <h3>Evolução de Leads Comerciais B2B</h3>
                            <p>Volume comparativo diário entre WhatsApp e Formulário</p>
                        </div>
                    </div>
                    <div className="dash-chart-legend">
                        <span className="dash-legend-item">
                            <span className="dash-legend-dot dot-cyan"></span>
                            <WhatsappLogo weight="fill" size={13} color="#19A3DF" /> WhatsApp
                        </span>
                        <span className="dash-legend-item">
                            <span className="dash-legend-dot dot-navy"></span>
                            <FileText weight="fill" size={13} color="#000327" /> Formulário
                        </span>
                    </div>
                </div>

                <div className="dash-svg-container">
                    <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="dash-line-chart">
                        <defs>
                            {/* Gradiente WhatsApp */}
                            <linearGradient id="gradWpp" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#19A3DF" stopOpacity="0.35" />
                                <stop offset="100%" stopColor="#19A3DF" stopOpacity="0.0" />
                            </linearGradient>
                            {/* Gradiente Formulário */}
                            <linearGradient id="gradForm" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#000327" stopOpacity="0.25" />
                                <stop offset="100%" stopColor="#000327" stopOpacity="0.0" />
                            </linearGradient>
                        </defs>

                        {/* Linhas de Grade Horizontal */}
                        {[0, 0.33, 0.66, 1].map((ratio, idx) => {
                            const y = padding.top + innerHeight * (1 - ratio);
                            const valLabel = Math.round(maxVal * ratio);
                            return (
                                <g key={idx}>
                                    <line 
                                        x1={padding.left} 
                                        y1={y} 
                                        x2={chartWidth - padding.right} 
                                        y2={y} 
                                        stroke="#E5E7EB" 
                                        strokeDasharray="4 4" 
                                    />
                                    <text 
                                        x={padding.left - 8} 
                                        y={y + 4} 
                                        fontSize="10" 
                                        fill="#9CA3AF" 
                                        textAnchor="end"
                                    >
                                        {valLabel}
                                    </text>
                                </g>
                            );
                        })}

                        {/* Área Preenchida com Gradiente */}
                        <path d={wppAreaPath} fill="url(#gradWpp)" />
                        <path d={formAreaPath} fill="url(#gradForm)" />

                        {/* Linha do Formulário */}
                        <polyline 
                            fill="none" 
                            stroke="#000327" 
                            strokeWidth="2.5" 
                            points={formPoints} 
                            strokeLinecap="round" 
                        />

                        {/* Linha do WhatsApp */}
                        <polyline 
                            fill="none" 
                            stroke="#19A3DF" 
                            strokeWidth="3" 
                            points={wppPoints} 
                            strokeLinecap="round" 
                        />

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
                                            strokeDasharray="2 2" 
                                        />
                                    )}

                                    {/* Ponto Formulário */}
                                    <circle cx={cx} cy={cyForm} r={isHovered ? 5.5 : 3.5} fill="#000327" stroke="#FFF" strokeWidth="2" />
                                    
                                    {/* Ponto WhatsApp */}
                                    <circle cx={cx} cy={cyWpp} r={isHovered ? 6 : 4} fill="#19A3DF" stroke="#FFF" strokeWidth="2" />

                                    {/* Rótulo Eixo X */}
                                    <text 
                                        x={cx} 
                                        y={chartHeight - 12} 
                                        fontSize="11" 
                                        fill={isHovered ? '#000327' : '#6B7280'} 
                                        fontWeight={isHovered ? '700' : '500'}
                                        textAnchor="middle"
                                    >
                                        {d.label}
                                    </text>
                                </g>
                            );
                        })}
                    </svg>

                    {/* Tooltip Dinâmico Flutuante */}
                    {activePoint !== null && (
                        <div className="dash-tooltip-box">
                            <span className="dash-tooltip-title">{timeSeries[activePoint].label}</span>
                            <div className="dash-tooltip-row">
                                <span>WhatsApp:</span>
                                <strong>{timeSeries[activePoint].whatsapp} leads</strong>
                            </div>
                            <div className="dash-tooltip-row">
                                <span>Formulário:</span>
                                <strong>{timeSeries[activePoint].formulario} cotações</strong>
                            </div>
                            <div className="dash-tooltip-total">
                                <span>Total:</span>
                                <strong>{timeSeries[activePoint].total} leads</strong>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* 2. GRÁFICO DE DONUT DE SEGMENTOS */}
            <div className="dash-card dash-chart-donut">
                <div className="dash-card-header">
                    <div className="dash-card-title-group">
                        <ChartPie weight="duotone" size={20} className="dash-icon-title" />
                        <div>
                            <h3>Demanda por Segmento</h3>
                            <p>Proporção das cotações recebidas</p>
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
                                    strokeWidth="20"
                                    strokeDasharray={slice.strokeDasharray}
                                    strokeDashoffset={slice.strokeDashoffset}
                                    transform="rotate(-90 80 80)"
                                    className={`dash-donut-segment ${hoveredSegment === i ? 'is-active' : ''}`}
                                    onMouseEnter={() => setHoveredSegment(i)}
                                    onMouseLeave={() => setHoveredSegment(null)}
                                />
                            ))}
                        </svg>
                        {/* Centro da Rosca */}
                        <div className="dash-donut-center">
                            <span className="dash-donut-center-num">
                                {hoveredSegment !== null ? donutSlices[hoveredSegment].totalLeads : totalSegmentLeads}
                            </span>
                            <span className="dash-donut-center-label">
                                {hoveredSegment !== null ? donutSlices[hoveredSegment].name.split(' ')[0] : 'Leads'}
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
                        <Funnel weight="duotone" size={20} className="dash-icon-title" />
                        <div>
                            <h3>Funil de Aquisição B2B</h3>
                            <p>Taxas de avanço na jornada de cotação</p>
                        </div>
                    </div>
                </div>

                <div className="dash-funnel-list">
                    {funnel.map((step, idx) => (
                        <div key={idx} className="dash-funnel-item">
                            <div className="dash-funnel-header">
                                <span className="dash-funnel-step-name">{step.step}</span>
                                <span className="dash-funnel-values">
                                    <strong>{step.value.toLocaleString('pt-BR')}</strong>
                                    <span className="dash-funnel-pct">({step.percentage}%)</span>
                                </span>
                            </div>
                            <div className="dash-funnel-track">
                                <div 
                                    className="dash-funnel-fill" 
                                    style={{ 
                                        width: `${Math.max(step.percentage, 4)}%`,
                                        backgroundColor: step.color 
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
                        <GlobeHemisphereWest weight="duotone" size={20} className="dash-icon-title" />
                        <div>
                            <h3>Demanda Geográfica (Top UFs)</h3>
                            <p>Sessões e leads por estado de origem</p>
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
                                        <span className="dash-branch-badge" title="Filial física da Expresso PB">
                                            <Buildings size={11} weight="fill" /> Filial
                                        </span>
                                    )}
                                </div>
                                <div className="dash-geo-bar-wrapper">
                                    <div className="dash-geo-bar-track">
                                        <div className="dash-geo-bar-fill" style={{ width: `${pctBar}%` }}></div>
                                    </div>
                                    <span className="dash-geo-metric">
                                        <strong>{item.leads}</strong> leads ({item.sessions} visitas)
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
