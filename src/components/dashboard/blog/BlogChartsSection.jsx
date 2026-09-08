import React, { useState } from 'react';
import { 
    CalendarBlank, 
    ChartPie, 
    FunnelSimple, 
    Article, 
    Globe,
    CaretRight
} from '@phosphor-icons/react';

export const BlogChartsSection = ({ timeSeries, categories, funnel, loading }) => {
    const [activePoint, setActivePoint] = useState(null);
    const [selectedChannel, setSelectedChannel] = useState('all'); // 'all' | 'org' | 'dir'

    if (!timeSeries || !categories) return null;

    // --- CÁLCULOS DO GRÁFICO DE LINHA/ÁREA TEMPORAL (SVG) ---
    const chartWidth = 620;
    const chartHeight = 175;
    const padding = { top: 15, right: 15, bottom: 26, left: 30 };
    const innerWidth = chartWidth - padding.left - padding.right;
    const innerHeight = chartHeight - padding.top - padding.bottom;

    const maxVal = Math.max(...timeSeries.map(d => Math.max(d.organico, d.direto, d.social)), 10) * 1.25;

    const getX = (idx) => padding.left + (idx / Math.max(timeSeries.length - 1, 1)) * innerWidth;
    const getY = (val) => padding.top + innerHeight - (val / maxVal) * innerHeight;

    const orgPoints = timeSeries.map((d, i) => `${getX(i)},${getY(d.organico)}`).join(' ');
    const dirPoints = timeSeries.map((d, i) => `${getX(i)},${getY(d.direto)}`).join(' ');

    const orgAreaPath = `M ${getX(0)},${getY(0)} L ${timeSeries.map((d, i) => `${getX(i)},${getY(d.organico)}`).join(' L ')} L ${getX(timeSeries.length - 1)},${getY(0)} Z`;
    const dirAreaPath = `M ${getX(0)},${getY(0)} L ${timeSeries.map((d, i) => `${getX(i)},${getY(d.direto)}`).join(' L ')} L ${getX(timeSeries.length - 1)},${getY(0)} Z`;

    // --- DONUT DE CATEGORIAS DO BLOG ---
    const totalCatViews = categories.reduce((acc, c) => acc + c.views, 0);
    const donutRadius = 45;
    const circumference = 2 * Math.PI * donutRadius;
    let accumulatedAngle = 0;

    const donutSegments = categories.map(c => {
        const pct = totalCatViews > 0 ? c.views / totalCatViews : 0;
        const strokeDasharray = `${pct * circumference} ${circumference}`;
        const strokeDashoffset = -accumulatedAngle * circumference;
        accumulatedAngle += pct;
        return {
            ...c,
            pct: Math.round(pct * 100),
            strokeDasharray,
            strokeDashoffset
        };
    });

    const showOrg = selectedChannel === 'all' || selectedChannel === 'org';
    const showDir = selectedChannel === 'all' || selectedChannel === 'dir';

    return (
        <div className={`dash-charts-grid ${loading ? 'dash-skeleton' : ''}`}>
            {/* 1. Evolução de Visualizações por Canal */}
            <div className="dash-card dash-chart-main">
                <div className="dash-card-header">
                    <div className="dash-card-title-group">
                        <CalendarBlank weight="duotone" size={22} className="dash-icon-title" />
                        <div>
                            <h3>Evolução de Leituras & Tráfego no Blog</h3>
                            <p>Desempenho de aquisição de leitores: Busca Orgânica vs Acesso Direto</p>
                        </div>
                    </div>

                    <div className="dash-chart-filter-group">
                        <button 
                            type="button"
                            className={`dash-chart-pill ${selectedChannel === 'all' ? 'active' : ''}`}
                            onClick={() => setSelectedChannel('all')}
                        >
                            Todos
                        </button>
                        <button 
                            type="button"
                            className={`dash-chart-pill pill-cyan ${selectedChannel === 'org' ? 'active' : ''}`}
                            onClick={() => setSelectedChannel('org')}
                        >
                            <Globe weight="fill" size={12} /> Google Orgânico
                        </button>
                        <button 
                            type="button"
                            className={`dash-chart-pill pill-navy ${selectedChannel === 'dir' ? 'active' : ''}`}
                            onClick={() => setSelectedChannel('dir')}
                        >
                            Direto / Bookmarks
                        </button>
                    </div>
                </div>

                <div className="dash-svg-container">
                    <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="dash-line-chart">
                        <defs>
                            <linearGradient id="gradBlogOrg" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#19A3DF" stopOpacity="0.4" />
                                <stop offset="100%" stopColor="#19A3DF" stopOpacity="0.0" />
                            </linearGradient>
                            <linearGradient id="gradBlogDir" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.3" />
                                <stop offset="100%" stopColor="#000327" stopOpacity="0.0" />
                            </linearGradient>
                        </defs>

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

                        {showOrg && (
                            <path d={orgAreaPath} fill="url(#gradBlogOrg)" className="dash-chart-area-fill" />
                        )}
                        {showDir && (
                            <path d={dirAreaPath} fill="url(#gradBlogDir)" className="dash-chart-area-fill" />
                        )}

                        {showOrg && (
                            <polyline 
                                fill="none" 
                                stroke="#19A3DF" 
                                strokeWidth="2.5" 
                                points={orgPoints}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        )}
                        {showDir && (
                            <polyline 
                                fill="none" 
                                stroke="#38BDF8" 
                                strokeWidth="2" 
                                points={dirPoints}
                                strokeDasharray="3 3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        )}

                        {timeSeries.map((d, i) => {
                            const x = getX(i);
                            const yOrg = getY(d.organico);
                            return (
                                <g key={i}>
                                    <line 
                                        x1={x} 
                                        y1={padding.top + innerHeight} 
                                        x2={x} 
                                        y2={padding.top + innerHeight + 4} 
                                        stroke="#CBD5E1" 
                                    />
                                    <text 
                                        x={x} 
                                        y={chartHeight - 8} 
                                        fontSize="10" 
                                        textAnchor="middle" 
                                        className="dash-axis-text"
                                    >
                                        {d.label}
                                    </text>

                                    {showOrg && (
                                        <circle 
                                            cx={x} 
                                            cy={yOrg} 
                                            r={activePoint === i ? 5 : 3} 
                                            fill="#FFFFFF" 
                                            stroke="#19A3DF" 
                                            strokeWidth="2"
                                            className="dash-chart-dot"
                                            onMouseEnter={() => setActivePoint(i)}
                                            onMouseLeave={() => setActivePoint(null)}
                                        />
                                    )}
                                </g>
                            );
                        })}
                    </svg>

                    {activePoint !== null && (
                        <div 
                            className="dash-chart-tooltip" 
                            style={{ 
                                left: `${(getX(activePoint) / chartWidth) * 100}%`,
                                top: '20px'
                            }}
                        >
                            <span className="dash-tooltip-date">{timeSeries[activePoint].label}</span>
                            <div className="dash-tooltip-row">
                                <span className="tooltip-ch-name"><span className="dot-cyan" /> Google Orgânico:</span>
                                <strong>{timeSeries[activePoint].organico} views</strong>
                            </div>
                            <div className="dash-tooltip-row">
                                <span className="tooltip-ch-name"><span className="dot-sky" /> Direto:</span>
                                <strong>{timeSeries[activePoint].direto} views</strong>
                            </div>
                        </div>
                    )}
                </div>

                <div className="dash-chart-legend">
                    <div className="dash-legend-item">
                        <span className="dash-legend-bar bar-cyan" />
                        <span>Google Search (SEO Orgânico)</span>
                    </div>
                    <div className="dash-legend-item">
                        <span className="dash-legend-bar bar-sky" />
                        <span>Acessos Diretos / Favoritos</span>
                    </div>
                </div>
            </div>

            {/* 2. Categorias do Blog & Funil de Conversão do Artigo */}
            <div className="dash-card dash-chart-secondary">
                <div className="dash-card-header">
                    <div className="dash-card-title-group">
                        <ChartPie weight="duotone" size={22} className="dash-icon-title" />
                        <div>
                            <h3>Categorias Temáticas</h3>
                            <p>Interesse dos gestores de logística</p>
                        </div>
                    </div>
                </div>

                <div className="dash-donut-wrapper">
                    <div className="dash-donut-svg-box">
                        <svg viewBox="0 0 120 120" className="dash-donut-svg">
                            {donutSegments.map((seg, idx) => (
                                <circle 
                                    key={idx}
                                    cx="60" 
                                    cy="60" 
                                    r={donutRadius} 
                                    fill="transparent" 
                                    stroke={seg.color} 
                                    strokeWidth="15" 
                                    strokeDasharray={seg.strokeDasharray} 
                                    strokeDashoffset={seg.strokeDashoffset}
                                    transform="rotate(-90 60 60)"
                                    className="dash-donut-segment"
                                />
                            ))}
                        </svg>
                        <div className="dash-donut-center">
                            <span className="dash-donut-center-num">42%</span>
                            <span className="dash-donut-center-label">Frota FTL</span>
                        </div>
                    </div>

                    <div className="dash-donut-legend">
                        {categories.map((c, idx) => (
                            <div key={idx} className="dash-donut-legend-item">
                                <span className="dash-donut-color-dot" style={{ backgroundColor: c.color }} />
                                <div className="dash-donut-text-group">
                                    <span className="dash-donut-name">{c.name}</span>
                                    <span className="dash-donut-share">{c.views.toLocaleString('pt-BR')} views ({c.share}%)</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Funil de Inbound: Da Leitura ao Lead */}
                {funnel && (
                    <div className="dash-funnel-section">
                        <div className="dash-funnel-header">
                            <div className="dash-funnel-title-group">
                                <FunnelSimple size={15} weight="bold" />
                                <span>Funil Inbound: Leitura &gt; Cotação</span>
                            </div>
                        </div>

                        <div className="dash-funnel-list">
                            {funnel.map((step, idx) => (
                                <div key={idx} className="dash-funnel-row">
                                    <div className="dash-funnel-labels">
                                        <span className="dash-funnel-name">
                                            <CaretRight size={12} weight="bold" />
                                            {step.step}
                                        </span>
                                        <div className="dash-funnel-stats">
                                            <strong className="dash-funnel-val">{step.value.toLocaleString('pt-BR')}</strong>
                                            <span className="dash-funnel-pct">({step.percentage}%)</span>
                                        </div>
                                    </div>
                                    <div className="dash-funnel-track">
                                        <div 
                                            className="dash-funnel-fill" 
                                            style={{ 
                                                width: `${step.percentage}%`,
                                                backgroundColor: step.color 
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlogChartsSection;
