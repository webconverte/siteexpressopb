import React from 'react';
import { 
    Calendar, 
    Funnel, 
    Buildings, 
    MapPin, 
    ArrowClockwise, 
    X,
    SlidersHorizontal
} from '@phosphor-icons/react';

const periods = [
    { key: '7d', label: '7 dias' },
    { key: '14d', label: '14 dias' },
    { key: '30d', label: '30 dias' },
    { key: '90d', label: '90 dias' }
];

const segments = [
    { value: 'all', label: 'Todos os Segmentos' },
    { value: 'construcao-civil', label: 'Construção Civil' },
    { value: 'alimentos-bebidas', label: 'Alimentos & Bebidas' },
    { value: 'papel-celulose', label: 'Papel & Celulose' },
    { value: 'maquinario-metalmecanica', label: 'Maquinário & Metalmecânica' }
];

const channels = [
    { value: 'all', label: 'Todos os Canais' },
    { value: 'whatsapp', label: 'WhatsApp Comercial' },
    { value: 'formulario', label: 'Formulário de Cotação' }
];

const regions = [
    { value: 'all', label: 'Todas as Regiões / UFs' },
    { value: 'PB', label: 'Paraíba (Matriz)' },
    { value: 'SP', label: 'São Paulo (Filial)' },
    { value: 'PE', label: 'Pernambuco' },
    { value: 'CE', label: 'Ceará' },
    { value: 'AL', label: 'Alagoas' }
];

export const DashboardFilterBar = ({
    period,
    onPeriodChange,
    segment,
    onSegmentChange,
    channel,
    onChannelChange,
    region,
    onRegionChange,
    onResetFilters,
    onRefresh,
    loading
}) => {
    // Verifica se algum filtro adicional além da data está ativo
    const hasActiveFilters = segment !== 'all' || channel !== 'all' || region !== 'all';

    return (
        <section className="dash-filter-section" aria-label="Filtros de telemetria analítica">
            <div className="dash-filter-card">
                <div className="dash-filter-row">
                    {/* 1. Filtro de Período (Data) */}
                    <div className="dash-filter-group">
                        <span className="dash-filter-label">
                            <Calendar weight="bold" size={13} />
                            Período:
                        </span>
                        <div className="dash-period-pills" role="group" aria-label="Seletor de período">
                            {periods.map(p => (
                                <button
                                    key={p.key}
                                    type="button"
                                    className={`dash-filter-pill-btn ${period === p.key ? 'active' : ''}`}
                                    onClick={() => onPeriodChange(p.key)}
                                    disabled={loading}
                                >
                                    {p.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="dash-filter-divider hide-mobile"></div>

                    {/* 2. Filtro de Segmento Industrial */}
                    <div className="dash-filter-group">
                        <span className="dash-filter-label">
                            <Buildings weight="bold" size={13} />
                            Segmento:
                        </span>
                        <div className="dash-select-wrapper">
                            <select 
                                value={segment} 
                                onChange={(e) => onSegmentChange(e.target.value)}
                                className={`dash-select ${segment !== 'all' ? 'has-value' : ''}`}
                                disabled={loading}
                            >
                                {segments.map(s => (
                                    <option key={s.value} value={s.value}>{s.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* 3. Filtro de Canal de Conversão */}
                    <div className="dash-filter-group">
                        <span className="dash-filter-label">
                            <Funnel weight="bold" size={13} />
                            Canal:
                        </span>
                        <div className="dash-select-wrapper">
                            <select 
                                value={channel} 
                                onChange={(e) => onChannelChange(e.target.value)}
                                className={`dash-select ${channel !== 'all' ? 'has-value' : ''}`}
                                disabled={loading}
                            >
                                {channels.map(c => (
                                    <option key={c.value} value={c.value}>{c.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* 4. Filtro de Região / UF */}
                    <div className="dash-filter-group">
                        <span className="dash-filter-label">
                            <MapPin weight="bold" size={13} />
                            Origem / UF:
                        </span>
                        <div className="dash-select-wrapper">
                            <select 
                                value={region} 
                                onChange={(e) => onRegionChange(e.target.value)}
                                className={`dash-select ${region !== 'all' ? 'has-value' : ''}`}
                                disabled={loading}
                            >
                                {regions.map(r => (
                                    <option key={r.value} value={r.value}>{r.label}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Lado Direito: Ações (Limpar Filtros + Atualizar) */}
                    <div className="dash-filter-actions">
                        {hasActiveFilters && (
                            <button
                                type="button"
                                className="dash-clear-filters-btn"
                                onClick={onResetFilters}
                                title="Limpar filtros aplicados"
                            >
                                <X weight="bold" size={14} />
                                <span>Limpar Filtros</span>
                            </button>
                        )}

                        <button 
                            type="button"
                            className="dash-filter-refresh-btn" 
                            onClick={onRefresh}
                            title="Atualizar dados de telemetria"
                            disabled={loading}
                        >
                            <ArrowClockwise weight="bold" size={15} className={loading ? 'dash-spin' : ''} />
                            <span className="hide-mobile">Atualizar</span>
                        </button>
                    </div>
                </div>

                {/* Feedback sutil de filtros aplicados */}
                {hasActiveFilters && (
                    <div className="dash-active-filters-bar">
                        <span className="dash-active-filters-title">
                            <SlidersHorizontal size={13} weight="bold" /> Filtros Ativos:
                        </span>
                        {segment !== 'all' && (
                            <span className="dash-active-tag">
                                Segmento: {segments.find(s => s.value === segment)?.label}
                                <button type="button" onClick={() => onSegmentChange('all')}><X size={12} /></button>
                            </span>
                        )}
                        {channel !== 'all' && (
                            <span className="dash-active-tag">
                                Canal: {channels.find(c => c.value === channel)?.label}
                                <button type="button" onClick={() => onChannelChange('all')}><X size={12} /></button>
                            </span>
                        )}
                        {region !== 'all' && (
                            <span className="dash-active-tag">
                                UF: {regions.find(r => r.value === region)?.label}
                                <button type="button" onClick={() => onRegionChange('all')}><X size={12} /></button>
                            </span>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
};

export default DashboardFilterBar;
