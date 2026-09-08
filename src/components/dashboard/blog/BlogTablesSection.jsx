import React, { useState, useMemo } from 'react';
import { 
    Table, 
    Article, 
    MagnifyingGlass, 
    DownloadSimple,
    ArrowUpRight,
    Sparkle
} from '@phosphor-icons/react';

export const BlogTablesSection = ({ articles, keywords, loading }) => {
    const [activeTab, setActiveTab] = useState('artigos'); // 'artigos' | 'palavras'
    const [searchQuery, setSearchQuery] = useState('');

    const filteredArticles = useMemo(() => {
        if (!articles) return [];
        if (!searchQuery.trim()) return articles;
        const q = searchQuery.toLowerCase();
        return articles.filter(a => 
            a.title.toLowerCase().includes(q) || 
            a.category.toLowerCase().includes(q)
        );
    }, [articles, searchQuery]);

    const filteredKeywords = useMemo(() => {
        if (!keywords) return [];
        if (!searchQuery.trim()) return keywords;
        const q = searchQuery.toLowerCase();
        return keywords.filter(k => k.keyword.toLowerCase().includes(q));
    }, [keywords, searchQuery]);

    const handleExportCsv = () => {
        let headers = [];
        let rows = [];
        const filename = `expresso_pb_blog_${activeTab}_${new Date().toISOString().slice(0, 10)}.csv`;

        if (activeTab === 'artigos') {
            headers = ['Titulo_Artigo', 'Categoria', 'Pageviews', 'Tempo_Medio', 'Cliques_Cotacao', 'Taxa_Conversao'];
            rows = filteredArticles.map(a => [a.title, a.category, a.views, a.avgTime, a.ctaClicks, a.convRate]);
        } else {
            headers = ['Palavra_Chave', 'Impressoes', 'Cliques', 'CTR_Pct', 'Posicao_Media'];
            rows = filteredKeywords.map(k => [k.keyword, k.impressions, k.clicks, k.ctr, k.position]);
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

    if (!articles || !keywords) return null;

    return (
        <div className={`dash-tables-section ${loading ? 'dash-skeleton' : ''}`}>
            <div className="dash-card">
                <div className="dash-tables-header">
                    <div className="dash-card-title-group">
                        <Table weight="duotone" size={22} className="dash-icon-title" />
                        <div>
                            <h3>Inteligência de Conteúdo & SEO Orgânico</h3>
                            <p>Desempenho de artigos que convertem em cotações e ranking de palavras-chave no Google</p>
                        </div>
                    </div>

                    <div className="dash-table-controls">
                        {/* Abas */}
                        <div className="dash-table-tabs">
                            <button
                                type="button"
                                className={`dash-tab-btn ${activeTab === 'artigos' ? 'active' : ''}`}
                                onClick={() => setActiveTab('artigos')}
                            >
                                <Article size={14} weight="bold" />
                                <span>Top Artigos</span>
                            </button>
                            <button
                                type="button"
                                className={`dash-tab-btn ${activeTab === 'palavras' ? 'active' : ''}`}
                                onClick={() => setActiveTab('palavras')}
                            >
                                <MagnifyingGlass size={14} weight="bold" />
                                <span>Buscas no Google</span>
                            </button>
                        </div>

                        {/* Campo de Busca */}
                        <div className="dash-search-container">
                            <MagnifyingGlass size={14} className="dash-search-icon" />
                            <input
                                type="text"
                                className="dash-table-search"
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
                            <DownloadSimple size={14} weight="bold" />
                            <span className="hide-mobile">Exportar</span>
                        </button>
                    </div>
                </div>

                {/* TABELA 1: TOP ARTIGOS */}
                {activeTab === 'artigos' && (
                    <div className="dash-table-responsive">
                        <table className="dash-data-table">
                            <thead>
                                <tr>
                                    <th>Artigo do Blog</th>
                                    <th>Categoria</th>
                                    <th className="text-right">Pageviews</th>
                                    <th className="text-right">Tempo Médio</th>
                                    <th className="text-right">Cliques no Cotar</th>
                                    <th className="text-right">Taxa de Conversão</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredArticles.map((art, idx) => (
                                    <tr key={idx}>
                                        <td className="font-bold text-dark" style={{ maxWidth: '380px' }}>
                                            {art.title}
                                        </td>
                                        <td>
                                            <span className="dash-tag-table">
                                                {art.category}
                                            </span>
                                        </td>
                                        <td className="text-right font-bold text-dark">
                                            {art.views.toLocaleString('pt-BR')}
                                        </td>
                                        <td className="text-right text-muted">{art.avgTime}</td>
                                        <td className="text-right font-bold text-green">
                                            {art.ctaClicks} cotações
                                        </td>
                                        <td className="text-right">
                                            <span className="dash-badge-table badge-pill-blue">
                                                {art.convRate}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* TABELA 2: PALAVRAS-CHAVE NO GOOGLE */}
                {activeTab === 'palavras' && (
                    <div className="dash-table-responsive">
                        <table className="dash-data-table">
                            <thead>
                                <tr>
                                    <th>Palavra-Chave (Google Search Console / GA4)</th>
                                    <th className="text-right">Impressões</th>
                                    <th className="text-right">Cliques Orgânicos</th>
                                    <th className="text-right">CTR</th>
                                    <th className="text-right">Posição Média</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredKeywords.map((kw, idx) => (
                                    <tr key={idx}>
                                        <td className="font-bold text-cyan font-mono" style={{ fontSize: '0.8rem' }}>
                                            {kw.keyword}
                                        </td>
                                        <td className="text-right text-muted font-bold">
                                            {kw.impressions.toLocaleString('pt-BR')}
                                        </td>
                                        <td className="text-right font-bold text-dark">
                                            {kw.clicks.toLocaleString('pt-BR')}
                                        </td>
                                        <td className="text-right">
                                            <span className="dash-badge-table badge-pill-green">
                                                {kw.ctr}
                                            </span>
                                        </td>
                                        <td className="text-right font-bold text-dark">
                                            #{kw.position}
                                        </td>
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

export default BlogTablesSection;
