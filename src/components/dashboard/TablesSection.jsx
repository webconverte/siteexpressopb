import React, { useState, useMemo } from 'react';
import { 
    Table, 
    NavigationArrow, 
    CursorClick, 
    WhatsappLogo, 
    FileText, 
    ArrowRight,
    MagnifyingGlass,
    DownloadSimple
} from '@phosphor-icons/react';

export const TablesSection = ({ segments, routes, ctas, loading }) => {
    const [activeTab, setActiveTab] = useState('segmentos'); // 'segmentos' | 'rotas' | 'ctas'
    const [searchQuery, setSearchQuery] = useState('');

    // Filtragem dinâmica por busca de texto
    const filteredSegments = useMemo(() => {
        if (!segments) return [];
        if (!searchQuery.trim()) return segments;
        const q = searchQuery.toLowerCase();
        return segments.filter(s => s.name.toLowerCase().includes(q));
    }, [segments, searchQuery]);

    const filteredRoutes = useMemo(() => {
        if (!routes) return [];
        if (!searchQuery.trim()) return routes;
        const q = searchQuery.toLowerCase();
        return routes.filter(r => 
            r.origem.toLowerCase().includes(q) || 
            r.destino.toLowerCase().includes(q) ||
            r.vehicle.toLowerCase().includes(q)
        );
    }, [routes, searchQuery]);

    const filteredCtas = useMemo(() => {
        if (!ctas) return [];
        if (!searchQuery.trim()) return ctas;
        const q = searchQuery.toLowerCase();
        return ctas.filter(c => 
            c.location.toLowerCase().includes(q) || 
            c.type.toLowerCase().includes(q)
        );
    }, [ctas, searchQuery]);

    // Exportação simples de CSV
    const handleExportCsv = () => {
        let headers = [];
        let rows = [];
        let filename = `expresso_pb_${activeTab}_${new Date().toISOString().slice(0, 10)}.csv`;

        if (activeTab === 'segmentos') {
            headers = ['Segmento', 'Sessoes_Qualificadas', 'Formulario', 'WhatsApp', 'Total_Leads', 'Taxa_Conversao'];
            rows = filteredSegments.map(s => [s.name, s.sessions, s.formLeads, s.wppLeads, s.totalLeads, s.convRate]);
        } else if (activeTab === 'rotas') {
            headers = ['Origem', 'Destino', 'Qtd_Cotacoes', 'Participacao_Pct', 'Frota_Preferencial'];
            rows = filteredRoutes.map(r => [r.origem, r.destino, r.count, r.share, r.vehicle]);
        } else {
            headers = ['Elemento', 'Canal', 'Contagem', 'Participacao_Pct'];
            rows = filteredCtas.map(c => [c.location, c.type, c.count, c.share]);
        }

        const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (!segments || !routes || !ctas) return null;

    return (
        <div className={`dash-tables-section ${loading ? 'dash-skeleton' : ''}`}>
            <div className="dash-card">
                {/* Header da Seção de Tabelas com Abas & Ações */}
                <div className="dash-tables-header">
                    <div className="dash-card-title-group">
                        <Table weight="duotone" size={22} className="dash-icon-title" />
                        <div>
                            <h3>Inteligência de Dados Comerciais</h3>
                            <p>Detalhamento operacional de segmentos industriais, rotas rodoviárias e canais de contato</p>
                        </div>
                    </div>

                    {/* Controles: Abas + Busca + Botão CSV */}
                    <div className="dash-table-controls">
                        {/* Seletor de Tabela */}
                        <div className="dash-table-tabs" role="tablist">
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

                        {/* Busca Instantânea */}
                        <div className="dash-search-box">
                            <MagnifyingGlass size={15} weight="bold" className="dash-search-icon" />
                            <input 
                                type="text"
                                placeholder="Filtrar dados..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="dash-search-input"
                            />
                        </div>

                        {/* Botão Exportar CSV */}
                        <button 
                            type="button"
                            className="dash-export-btn"
                            onClick={handleExportCsv}
                            title="Exportar dados filtrados em formato CSV"
                        >
                            <DownloadSimple size={15} weight="bold" />
                            <span className="hide-mobile">Exportar CSV</span>
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
                                {filteredSegments.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="dash-table-empty">Nenhum segmento encontrado para "{searchQuery}"</td>
                                    </tr>
                                ) : (
                                    filteredSegments.map((seg, idx) => (
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
                                    ))
                                )}
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
                                    <th>Frota Preferencial</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredRoutes.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="dash-table-empty">Nenhuma rota encontrada para "{searchQuery}"</td>
                                    </tr>
                                ) : (
                                    filteredRoutes.map((route, idx) => (
                                        <tr key={idx}>
                                            <td>
                                                <div className="dash-route-badge">
                                                    <span className="route-origem">{route.origem}</span>
                                                    <ArrowRight weight="bold" size={14} className="route-arrow" />
                                                    <span className="route-destino">{route.destino}</span>
                                                </div>
                                            </td>
                                            <td>
                                                <strong className="dash-text-highlight">{route.count}</strong> cotações
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
                                    ))
                                )}
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
                                {filteredCtas.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="dash-table-empty">Nenhum CTA encontrado para "{searchQuery}"</td>
                                    </tr>
                                ) : (
                                    filteredCtas.map((cta, idx) => (
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
                                                <strong className="dash-text-highlight">{cta.count}</strong> acionamentos
                                            </td>
                                            <td>
                                                <div className="dash-pct-bar-wrapper">
                                                    <div className="dash-pct-bar" style={{ width: cta.share }}></div>
                                                    <span>{cta.share}</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TablesSection;
