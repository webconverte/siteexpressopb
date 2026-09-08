import React, { useState, useMemo } from 'react';
import { 
    Table, 
    CursorClick, 
    ShareNetwork, 
    DeviceMobile, 
    DownloadSimple, 
    MagnifyingGlass,
    ArrowUpRight
} from '@phosphor-icons/react';

export const BioTablesSection = ({ buttons, campaigns, devices, loading }) => {
    const [activeTab, setActiveTab] = useState('botoes'); // 'botoes' | 'campanhas' | 'dispositivos'
    const [searchQuery, setSearchQuery] = useState('');

    const filteredButtons = useMemo(() => {
        if (!buttons) return [];
        if (!searchQuery.trim()) return buttons;
        const q = searchQuery.toLowerCase();
        return buttons.filter(b => b.name.toLowerCase().includes(q) || b.tag.toLowerCase().includes(q));
    }, [buttons, searchQuery]);

    const filteredCampaigns = useMemo(() => {
        if (!campaigns) return [];
        if (!searchQuery.trim()) return campaigns;
        const q = searchQuery.toLowerCase();
        return campaigns.filter(c => 
            c.campaign.toLowerCase().includes(q) || 
            c.source.toLowerCase().includes(q)
        );
    }, [campaigns, searchQuery]);

    const handleExportCsv = () => {
        let headers = [];
        let rows = [];
        const filename = `expresso_pb_bio_${activeTab}_${new Date().toISOString().slice(0, 10)}.csv`;

        if (activeTab === 'botoes') {
            headers = ['Botao', 'Tag', 'Destino', 'Cliques', 'CTR_Pct'];
            rows = filteredButtons.map(b => [b.name, b.tag, b.destination, b.clicks, b.ctr]);
        } else if (activeTab === 'campanhas') {
            headers = ['Origem', 'Campanha', 'Medium', 'Cliques', 'Leads_WhatsApp', 'Taxa_Conversao'];
            rows = filteredCampaigns.map(c => [c.source, c.campaign, c.medium, c.clicks, c.wppLeads, c.convRate]);
        } else {
            headers = ['Dispositivo', 'Participacao_Pct', 'Cliques'];
            rows = (devices || []).map(d => [d.device, d.share, d.clicks]);
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

    const formatDestination = (url) => {
        if (!url) return '';
        if (url.includes('wa.me')) return 'WhatsApp Comercial';
        if (url.includes('#cotacao')) return 'expressopb.com/#cotacao';
        if (url.includes('rastreamento')) return 'expressopb.com/rastreamento';
        if (url.includes('trabalhe-conosco')) return 'expressopb.com/trabalhe-conosco';
        return url.replace(/^https?:\/\/(www\.)?/, '').slice(0, 32);
    };

    if (!buttons || !campaigns) return null;

    return (
        <div className={`dash-tables-section ${loading ? 'dash-skeleton' : ''}`}>
            <div className="dash-card">
                <div className="dash-tables-header">
                    <div className="dash-card-title-group">
                        <Table weight="duotone" size={22} className="dash-icon-title" />
                        <div>
                            <h3>Métricas Detalhadas do Link da Bio</h3>
                            <p>Análise de engajamento por botão, campanhas sociais com UTMs e perfil dos smartphones</p>
                        </div>
                    </div>

                    <div className="dash-table-controls">
                        {/* Abas */}
                        <div className="dash-table-tabs" role="tablist">
                            <button
                                type="button"
                                className={`dash-tab-btn ${activeTab === 'botoes' ? 'active' : ''}`}
                                onClick={() => setActiveTab('botoes')}
                            >
                                <CursorClick size={14} weight="bold" />
                                <span>Botões da Bio</span>
                            </button>
                            <button
                                type="button"
                                className={`dash-tab-btn ${activeTab === 'campanhas' ? 'active' : ''}`}
                                onClick={() => setActiveTab('campanhas')}
                            >
                                <ShareNetwork size={14} weight="bold" />
                                <span>Campanhas / UTMs</span>
                            </button>
                            <button
                                type="button"
                                className={`dash-tab-btn ${activeTab === 'dispositivos' ? 'active' : ''}`}
                                onClick={() => setActiveTab('dispositivos')}
                            >
                                <DeviceMobile size={14} weight="bold" />
                                <span>Dispositivos Mobile</span>
                            </button>
                        </div>

                        {/* Campo de Busca */}
                        <div className="dash-search-box">
                            <MagnifyingGlass size={15} weight="bold" className="dash-search-icon" />
                            <input
                                type="text"
                                className="dash-search-input"
                                placeholder="Filtrar dados..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        {/* Exportar CSV */}
                        <button
                            type="button"
                            className="dash-export-btn"
                            onClick={handleExportCsv}
                            title="Exportar dados da tabela atual em formato CSV"
                        >
                            <DownloadSimple size={15} weight="bold" />
                            <span className="hide-mobile">Exportar CSV</span>
                        </button>
                    </div>
                </div>

                {/* TABELA 1: BOTÕES DA BIO */}
                {activeTab === 'botoes' && (
                    <div className="dash-table-responsive">
                        <table className="dash-table">
                            <thead>
                                <tr>
                                    <th>Link / Botão</th>
                                    <th>Finalidade</th>
                                    <th>Destino / Rota</th>
                                    <th className="text-right">Cliques</th>
                                    <th className="text-right">CTR no Período</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredButtons.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="dash-table-empty">
                                            Nenhum botão encontrado para "{searchQuery}"
                                        </td>
                                    </tr>
                                ) : (
                                    filteredButtons.map((btn, idx) => (
                                        <tr key={idx}>
                                            <td className="font-bold text-dark">
                                                <div className="dash-table-cell-lead">
                                                    <span className="dash-segment-dot" style={{ backgroundColor: btn.color }} />
                                                    <strong>{btn.name}</strong>
                                                </div>
                                            </td>
                                            <td>
                                                <span className="dash-tag-table" style={{ borderColor: btn.color, color: btn.color }}>
                                                    {btn.tag}
                                                </span>
                                            </td>
                                            <td>
                                                <span className="dash-url-chip" title={btn.destination}>
                                                    <ArrowUpRight size={12} weight="bold" />
                                                    <code>{formatDestination(btn.destination)}</code>
                                                </span>
                                            </td>
                                            <td className="text-right font-bold text-dark">
                                                {btn.clicks.toLocaleString('pt-BR')}
                                            </td>
                                            <td className="text-right">
                                                <span className="dash-badge-table badge-pill-green">
                                                    {btn.ctr}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* TABELA 2: CAMPANHAS & UTMS */}
                {activeTab === 'campanhas' && (
                    <div className="dash-table-responsive">
                        <table className="dash-table">
                            <thead>
                                <tr>
                                    <th>Rede Social / Origem</th>
                                    <th>Campanha (UTM Campaign)</th>
                                    <th>Mídia</th>
                                    <th className="text-right">Cliques</th>
                                    <th className="text-right">Leads WhatsApp</th>
                                    <th className="text-right">Taxa de Conversão</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredCampaigns.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="dash-table-empty">
                                            Nenhuma campanha encontrada para "{searchQuery}"
                                        </td>
                                    </tr>
                                ) : (
                                    filteredCampaigns.map((camp, idx) => (
                                        <tr key={idx}>
                                            <td className="font-bold text-dark">
                                                <span className="dash-utm-source">{camp.source}</span>
                                            </td>
                                            <td>
                                                <span className="dash-badge-table badge-pill-blue" style={{ fontFamily: 'monospace' }}>
                                                    {camp.campaign}
                                                </span>
                                            </td>
                                            <td className="text-muted">{camp.medium}</td>
                                            <td className="text-right font-bold text-dark">{camp.clicks.toLocaleString('pt-BR')}</td>
                                            <td className="text-right font-bold text-green">{camp.wppLeads.toLocaleString('pt-BR')}</td>
                                            <td className="text-right">
                                                <span className="dash-badge-table badge-pill-green">
                                                    {camp.convRate}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* TABELA 3: DISPOSITIVOS MOBILE */}
                {activeTab === 'dispositivos' && (
                    <div className="dash-table-responsive">
                        <table className="dash-table">
                            <thead>
                                <tr>
                                    <th>Sistema / Dispositivo</th>
                                    <th>Participação de Mercado Mobile</th>
                                    <th className="text-right">Cliques Totais</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(devices || []).map((dev, idx) => (
                                    <tr key={idx}>
                                        <td className="font-bold text-dark">{dev.device}</td>
                                        <td>
                                            <div className="dash-table-bar-wrapper">
                                                <div className="dash-table-bar-track">
                                                    <div className="dash-table-bar-fill" style={{ width: dev.share }} />
                                                </div>
                                                <span className="dash-table-bar-label">{dev.share}</span>
                                            </div>
                                        </td>
                                        <td className="text-right font-bold text-dark">{dev.clicks?.toLocaleString('pt-BR')}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BioTablesSection;
