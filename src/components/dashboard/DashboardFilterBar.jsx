import React from 'react';
import { 
    CalendarBlank, 
    Funnel, 
    Buildings, 
    MapPin, 
    ArrowClockwise, 
    X
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
    { value: 'all', label: 'Todas as Regiões' },
    { value: 'PB', label: 'Paraíba (Matriz)' },
    { value: 'SP', label: 'São Paulo (Filial)' },
    { value: 'PE', label: 'Pernambuco' },
    { value: 'CE', label: 'Ceará' },
    { value: 'AL', label: 'Alagoas' }
];

export const DashboardFilterBar = ({
    property = 'site',
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
    const hasActiveFilters = segment !== 'all' || channel !== 'all' || region !== 'all';

    return (
        <div className="dash-filter-section" aria-label="Filtros de telemetria analítica">
            <div className="dash-filter-card">
                <div className="dash-filter-row">
                    {/* Grupo de Filtros à Esquerda */}
                    <div className="dash-filter-left-group">
                        {/* 1. Período */}
                        <div className="dash-filter-item">
                            <div className="dash-period-pills">
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

                        {property === 'site' ? (
                            <>
                                <div className="dash-filter-divider hide-mobile"></div>

                                {/* 2. Segmento */}
                                <div className="dash-filter-item">
                                    <div className="dash-select-container">
                                        <Buildings size={14} weight="bold" className="dash-filter-icon" />
                                        <select 
                                            value={segment} 
                                            onChange={(e) => onSegmentChange(e.target.value)}
                                            className={`dash-select ${segment !== 'all' ? 'has-value' : ''}`}
                                            disabled={loading}
                                            aria-label="Filtrar por segmento industrial"
                                        >
                                            {segments.map(s => (
                                                <option key={s.value} value={s.value}>{s.label}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* 3. Canal */}
                                <div className="dash-filter-item">
                                    <div className="dash-select-container">
                                        <Funnel size={14} weight="bold" className="dash-filter-icon" />
                                        <select 
                                            value={channel} 
                                            onChange={(e) => onChannelChange(e.target.value)}
                                            className={`dash-select ${channel !== 'all' ? 'has-value' : ''}`}
                                            disabled={loading}
                                            aria-label="Filtrar por canal de conversão"
                                        >
                                            {channels.map(c => (
                                                <option key={c.value} value={c.value}>{c.label}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                {/* 4. Região / UF */}
                                <div className="dash-filter-item">
                                    <div className="dash-select-container">
                                        <MapPin size={14} weight="bold" className="dash-filter-icon" />
                                        <select 
                                            value={region} 
                                            onChange={(e) => onRegionChange(e.target.value)}
                                            className={`dash-select ${region !== 'all' ? 'has-value' : ''}`}
                                            disabled={loading}
                                            aria-label="Filtrar por região ou UF"
                                        >
                                            {regions.map(r => (
                                                <option key={r.value} value={r.value}>{r.label}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="dash-prop-context-tag hide-mobile">
                                {property === 'bio' ? '📱 Conversões de Redes Sociais & Cliques Mobile' : '📝 Inbound Marketing & Desempenho de Artigos'}
                            </div>
                        )}
                    </div>

                    {/* Grupo de Ações à Direita */}
                    <div className="dash-filter-actions">
                        {hasActiveFilters && (
                            <button
                                type="button"
                                className="dash-clear-filters-btn"
                                onClick={onResetFilters}
                                title="Limpar filtros selecionados"
                            >
                                <X weight="bold" size={13} />
                                <span>Limpar</span>
                            </button>
                        )}

                        <button 
                            type="button"
                            className="dash-filter-refresh-btn" 
                            onClick={onRefresh}
                            title="Atualizar dados analíticos"
                            disabled={loading}
                        >
                            <ArrowClockwise weight="bold" size={14} className={loading ? 'dash-spin' : ''} />
                            <span>Atualizar</span>
                        </button>
                    </div>
                </div>

                {/* Tags de Filtros Ativos (Apenas quando houver filtro ativo) */}
                {hasActiveFilters && (
                    <div className="dash-active-filters-bar">
                        <span className="dash-active-filters-title">Filtros:</span>
                        {segment !== 'all' && (
                            <span className="dash-active-tag">
                                {segments.find(s => s.value === segment)?.label}
                                <button type="button" onClick={() => onSegmentChange('all')}><X size={11} /></button>
                            </span>
                        )}
                        {channel !== 'all' && (
                            <span className="dash-active-tag">
                                {channels.find(c => c.value === channel)?.label}
                                <button type="button" onClick={() => onChannelChange('all')}><X size={11} /></button>
                            </span>
                        )}
                        {region !== 'all' && (
                            <span className="dash-active-tag">
                                {regions.find(r => r.value === region)?.label}
                                <button type="button" onClick={() => onRegionChange('all')}><X size={11} /></button>
                            </span>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DashboardFilterBar;
