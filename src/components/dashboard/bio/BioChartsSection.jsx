import React, { useState } from 'react';
import { 
    CalendarBlank, 
    ChartPie, 
    Clock, 
    InstagramLogo, 
    LinkedinLogo,
    CursorClick
} from '@phosphor-icons/react';

export const BioChartsSection = ({ timeSeries, buttons, hourlyDistribution, loading }) => {
    const [activePoint, setActivePoint] = useState(null);
    const [selectedChannel, setSelectedChannel] = useState('all'); // 'all' | 'insta' | 'linkedin'

    if (!timeSeries || !buttons) return null;

    // --- CÁLCULOS DO GRÁFICO DE LINHA/ÁREA TEMPORAL (SVG) ---
    const chartWidth = 620;
    const chartHeight = 175;
    const padding = { top: 15, right: 15, bottom: 26, left: 30 };
    const innerWidth = chartWidth - padding.left - padding.right;
    const innerHeight = chartHeight - padding.top - padding.bottom;

    const maxVal = Math.max(...timeSeries.map(d => Math.max(d.instagram, d.linkedin, d.direto)), 10) * 1.25;

    const getX = (idx) => padding.left + (idx / Math.max(timeSeries.length - 1, 1)) * innerWidth;
    const getY = (val) => padding.top + innerHeight - (val / maxVal) * innerHeight;

    const instaPoints = timeSeries.map((d, i) => `${getX(i)},${getY(d.instagram)}`).join(' ');
    const linkedinPoints = timeSeries.map((d, i) => `${getX(i)},${getY(d.linkedin)}`).join(' ');

    const instaAreaPath = `M ${getX(0)},${getY(0)} L ${timeSeries.map((d, i) => `${getX(i)},${getY(d.instagram)}`).join(' L ')} L ${getX(timeSeries.length - 1)},${getY(0)} Z`;
    const linkedinAreaPath = `M ${getX(0)},${getY(0)} L ${timeSeries.map((d, i) => `${getX(i)},${getY(d.linkedin)}`).join(' L ')} L ${getX(timeSeries.length - 1)},${getY(0)} Z`;

    // --- DONUT DE BOTÕES DA BIO ---
    const totalButtonClicks = buttons.reduce((acc, b) => acc + b.clicks, 0);
    const donutRadius = 45;
    const circumference = 2 * Math.PI * donutRadius;
    let accumulatedAngle = 0;

    const donutSegments = buttons.map(b => {
        const pct = totalButtonClicks > 0 ? b.clicks / totalButtonClicks : 0;
        const strokeDasharray = `${pct * circumference} ${circumference}`;
        const strokeDashoffset = -accumulatedAngle * circumference;
        accumulatedAngle += pct;
        return {
            ...b,
            pct: Math.round(pct * 100),
            strokeDasharray,
            strokeDashoffset
        };
    });

    const showInsta = selectedChannel === 'all' || selectedChannel === 'insta';
    const showLinkedin = selectedChannel === 'all' || selectedChannel === 'linkedin';

    return (
        <div className={`dash-charts-grid ${loading ? 'dash-skeleton' : ''}`}>
            {/* 1. Evolução Diária de Cliques Sociais */}
            <div className="dash-card dash-chart-main">
                <div className="dash-card-header">
                    <div className="dash-card-title-group">
                        <CalendarBlank weight="duotone" size={22} className="dash-icon-title" />
                        <div>
                            <h3>Evolução de Tráfego no Link da Bio</h3>
                            <p>Volume diário de toques originados em perfis sociais da Expresso PB</p>
                        </div>
                    </div>

                    <div className="dash-chart-filter-group">
                        <button 
                            type="button"
                            className={`dash-chart-pill ${selectedChannel === 'all' ? 'active' : ''}`}
                            onClick={() => setSelectedChannel('all')}
                        >
                            Todas Redes
                        </button>
                        <button 
                            type="button"
                            className={`dash-chart-pill pill-cyan ${selectedChannel === 'insta' ? 'active' : ''}`}
                            onClick={() => setSelectedChannel('insta')}
                        >
                            <InstagramLogo weight="fill" size={12} /> Instagram
                        </button>
                        <button 
                            type="button"
                            className={`dash-chart-pill pill-navy ${selectedChannel === 'linkedin' ? 'active' : ''}`}
                            onClick={() => setSelectedChannel('linkedin')}
                        >
                            <LinkedinLogo weight="fill" size={12} /> LinkedIn
                        </button>
                    </div>
                </div>

                <div className="dash-svg-container">
                    <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="dash-line-chart">
                        <defs>
                            <linearGradient id="gradInsta" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#19A3DF" stopOpacity="0.4" />
                                <stop offset="100%" stopColor="#19A3DF" stopOpacity="0.0" />
                            </linearGradient>
                            <linearGradient id="gradLinkedin" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#0077B5" stopOpacity="0.35" />
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

                        {showInsta && (
                            <path d={instaAreaPath} fill="url(#gradInsta)" className="dash-chart-area-fill" />
                        )}
                        {showLinkedin && (
                            <path d={linkedinAreaPath} fill="url(#gradLinkedin)" className="dash-chart-area-fill" />
                        )}

                        {showInsta && (
                            <polyline 
                                fill="none" 
                                stroke="#19A3DF" 
                                strokeWidth="2.5" 
                                points={instaPoints}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        )}
                        {showLinkedin && (
                            <polyline 
                                fill="none" 
                                stroke="#0077B5" 
                                strokeWidth="2" 
                                points={linkedinPoints}
                                strokeDasharray="3 3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        )}

                        {timeSeries.map((d, i) => {
                            const x = getX(i);
                            const yInsta = getY(d.instagram);
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

                                    {showInsta && (
                                        <circle 
                                            cx={x} 
                                            cy={yInsta} 
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
                            className="dash-tooltip-box" 
                            style={{ 
                                left: `${Math.min(Math.max((getX(activePoint) / chartWidth) * 100, 15), 75)}%`,
                                top: '20px'
                            }}
                        >
                            <span className="dash-tooltip-title">{timeSeries[activePoint].label}</span>
                            <div className="dash-tooltip-row">
                                <span className="tooltip-ch-name"><span className="dot-cyan" /> Instagram:</span>
                                <strong>{timeSeries[activePoint].instagram} cliques</strong>
                            </div>
                            <div className="dash-tooltip-row">
                                <span className="tooltip-ch-name"><span className="dot-sky" /> LinkedIn:</span>
                                <strong>{timeSeries[activePoint].linkedin} cliques</strong>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* 2. Distribuição de Cliques por Botão & Horários de Pico */}
            <div className="dash-card dash-chart-secondary">
                <div className="dash-card-header">
                    <div className="dash-card-title-group">
                        <ChartPie weight="duotone" size={22} className="dash-icon-title" />
                        <div>
                            <h3>Destino dos Cliques na Bio</h3>
                            <p>Preferência de rota dos visitantes mobile</p>
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
                            <span className="dash-donut-center-num">{buttons[0]?.ctr}</span>
                            <span className="dash-donut-center-label">Mesa WPP</span>
                        </div>
                    </div>

                    <div className="dash-donut-legend">
                        {buttons.map((b, idx) => (
                            <div key={idx} className="dash-donut-legend-row">
                                <span className="dash-legend-color" style={{ backgroundColor: b.color }} />
                                <span className="dash-legend-name" title={b.name}>{b.name}</span>
                                <span className="dash-legend-pct"><strong>{b.clicks}</strong> ({b.ctr})</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Faixas de Horário de Acesso */}
                {hourlyDistribution && (
                    <div className="dash-hourly-section">
                        <div className="dash-hourly-title">
                            <Clock size={14} weight="bold" />
                            <span>Horários de Maior Conversão de Frete</span>
                        </div>
                        <div className="dash-hourly-bars">
                            {hourlyDistribution.map((h, i) => (
                                <div key={i} className="dash-hourly-item">
                                    <div className="dash-hourly-labels">
                                        <span>{h.period}</span>
                                        <strong>{h.percentage}% ({h.count} cliques)</strong>
                                    </div>
                                    <div className="dash-hourly-track">
                                        <div 
                                            className="dash-hourly-fill" 
                                            style={{ width: `${h.percentage}%` }}
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

export default BioChartsSection;
