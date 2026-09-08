import React, { useState } from 'react';
import { 
    Table, 
    NavigationArrow, 
    CursorClick, 
    WhatsappLogo, 
    FileText, 
    ArrowRight
} from '@phosphor-icons/react';

export const TablesSection = ({ segments, routes, ctas, loading }) => {
    const [activeTab, setActiveTab] = useState('segmentos'); // 'segmentos' | 'rotas' | 'ctas'

    if (!segments || !routes || !ctas) return null;

    return (
        <section className={`dash-tables-section ${loading ? 'dash-skeleton' : ''}`}>
            <div className="dash-card">
                {/* Header da Seção de Tabelas com Abas */}
                <div className="dash-tables-header">
                    <div className="dash-card-title-group">
                        <Table weight="duotone" size={20} className="dash-icon-title" />
                        <div>
                            <h3>Inteligência de Dados Comerciais</h3>
                            <p>Detalhamento cruzado de segmentos, rotas rodoviárias e pontos de contato</p>
                        </div>
                    </div>

                    {/* Seletor de Tabela */}
                    <div className="dash-table-tabs">
                        <button
                            type="button"
                            className={`dash-tab-btn ${activeTab === 'segmentos' ? 'active' : ''}`}
                            onClick={() => setActiveTab('segmentos')}
                        >
                            Matriz de Segmentos
                        </button>
                        <button
                            type="button"
                            className={`dash-tab-btn ${activeTab === 'rotas' ? 'active' : ''}`}
                            onClick={() => setActiveTab('rotas')}
                        >
                            <NavigationArrow size={14} weight="bold" /> Rotas Mais Cotadas
                        </button>
                        <button
                            type="button"
                            className={`dash-tab-btn ${activeTab === 'ctas' ? 'active' : ''}`}
                            onClick={() => setActiveTab('ctas')}
                        >
                            <CursorClick size={14} weight="bold" /> Eficácia de CTAs
                        </button>
                    </div>
                </div>

                {/* TABELA 1: MATRIZ DE SEGMENTOS */}
                {activeTab === 'segmentos' && (
                    <div className="dash-table-responsive">
                        <table className="dash-table">
                            <thead>
                                <tr>
                                    <th>Segmento Especializado</th>
                                    <th>Sessões Qualificadas</th>
                                    <th>Formulário</th>
                                    <th>WhatsApp</th>
                                    <th>Total Leads B2B</th>
                                    <th>Taxa de Conversão</th>
                                </tr>
                            </thead>
                            <tbody>
                                {segments.map((seg, idx) => (
                                    <tr key={idx}>
                                        <td>
                                            <div className="dash-table-cell-lead">
                                                <span className="dash-segment-dot" style={{ backgroundColor: seg.color }}></span>
                                                <strong>{seg.name}</strong>
                                            </div>
                                        </td>
                                        <td>{seg.sessions.toLocaleString('pt-BR')}</td>
                                        <td>
                                            <span className="dash-tag-table tag-form">
                                                <FileText size={12} weight="fill" /> {seg.formLeads}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="dash-tag-table tag-wpp">
                                                <WhatsappLogo size={12} weight="fill" /> {seg.wppLeads}
                                            </span>
                                        </td>
                                        <td>
                                            <strong className="dash-text-highlight">{seg.totalLeads}</strong>
                                        </td>
                                        <td>
                                            <span className="dash-conv-badge">
                                                {seg.convRate}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* TABELA 2: ROTAS MAIS DEMANDADAS */}
                {activeTab === 'rotas' && (
                    <div className="dash-table-responsive">
                        <table className="dash-table">
                            <thead>
                                <tr>
                                    <th>Corredor Rodoviário (Origem ➔ Destino)</th>
                                    <th>Qtd. Cotações</th>
                                    <th>Participação (%)</th>
                                    <th>Configuração de Frota Preferencial</th>
                                </tr>
                            </thead>
                            <tbody>
                                {routes.map((route, idx) => (
                                    <tr key={idx}>
                                        <td>
                                            <div className="dash-route-badge">
                                                <span className="route-origem">{route.origem}</span>
                                                <ArrowRight weight="bold" size={14} className="route-arrow" />
                                                <span className="route-destino">{route.destino}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <strong>{route.count}</strong> cotações
                                        </td>
                                        <td>
                                            <div className="dash-pct-bar-wrapper">
                                                <div className="dash-pct-bar" style={{ width: route.share }}></div>
                                                <span>{route.share}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="dash-vehicle-tag">
                                                {route.vehicle}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* TABELA 3: PONTOS DE CONVERSÃO (CTAs) */}
                {activeTab === 'ctas' && (
                    <div className="dash-table-responsive">
                        <table className="dash-table">
                            <thead>
                                <tr>
                                    <th>Elemento / Posição na Página</th>
                                    <th>Canal de Saída</th>
                                    <th>Cliques / Envios</th>
                                    <th>% do Volume Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ctas.map((cta, idx) => (
                                    <tr key={idx}>
                                        <td>
                                            <strong>{cta.location}</strong>
                                        </td>
                                        <td>
                                            {cta.type === 'WhatsApp' ? (
                                                <span className="dash-tag-table tag-wpp">
                                                    <WhatsappLogo size={13} weight="fill" /> WhatsApp Comercial
                                                </span>
                                            ) : (
                                                <span className="dash-tag-table tag-form">
                                                    <FileText size={13} weight="fill" /> Formulário Cotação
                                                </span>
                                            )}
                                        </td>
                                        <td>
                                            <strong>{cta.count}</strong> acionamentos
                                        </td>
                                        <td>
                                            <div className="dash-pct-bar-wrapper">
                                                <div className="dash-pct-bar" style={{ width: cta.share }}></div>
                                                <span>{cta.share}</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </section>
    );
};

export default TablesSection;
