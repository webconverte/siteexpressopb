import React, { useState, useEffect } from 'react';
import { 
    X, 
    CheckCircle, 
    WarningCircle, 
    Copy, 
    Check, 
    Terminal, 
    ShieldCheck, 
    FloppyDisk,
    GlobeHemisphereWest,
    DeviceMobile,
    Article
} from '@phosphor-icons/react';

export const Ga4ConfigModal = ({ 
    isOpen, 
    onClose, 
    currentConfig, 
    allConfigs,
    activeProperty = 'site',
    onSave 
}) => {
    const [selectedProp, setSelectedProp] = useState(activeProperty);
    const [configsState, setConfigsState] = useState(allConfigs || {
        site: { mode: 'demo', propertyId: '', measurementId: '', apiUrl: '' },
        bio: { mode: 'demo', propertyId: '', measurementId: '', apiUrl: '' },
        blog: { mode: 'demo', propertyId: '', measurementId: '', apiUrl: '' }
    });

    useEffect(() => {
        if (allConfigs) {
            setConfigsState(allConfigs);
        }
    }, [allConfigs]);

    useEffect(() => {
        if (activeProperty) {
            setSelectedProp(activeProperty);
        }
    }, [activeProperty, isOpen]);

    const [copiedSnippet, setCopiedSnippet] = useState(false);
    const [savedNotice, setSavedNotice] = useState(false);

    if (!isOpen) return null;

    const current = configsState[selectedProp] || {
        mode: 'demo',
        propertyId: '',
        measurementId: '',
        apiUrl: ''
    };

    const handleFieldChange = (field, value) => {
        setConfigsState(prev => ({
            ...prev,
            [selectedProp]: {
                ...prev[selectedProp],
                [field]: value
            }
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(selectedProp, current);
        setSavedNotice(true);
        setTimeout(() => {
            setSavedNotice(false);
            onClose();
        }, 1200);
    };

    const propertiesList = [
        { id: 'site', label: 'Site Institucional', icon: GlobeHemisphereWest },
        { id: 'bio', label: 'Link da Bio', icon: DeviceMobile },
        { id: 'blog', label: 'Blog de Logística', icon: Article }
    ];

    const nodeBackendSnippet = `// Exemplo de Endpoint Seguro no seu Backend (Node.js / Express / Serverless)
// Instale: npm install @google-analytics/data
import { BetaAnalyticsDataClient } from '@google-analytics/data';

const analyticsDataClient = new BetaAnalyticsDataClient({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS // service-account.json
});

export async function handleReport(req, res) {
  const { propertyId, property, period } = req.body;
  // property: 'site' | 'bio' | 'blog'

  const [response] = await analyticsDataClient.runReport({
    property: \`properties/\${propertyId}\`,
    dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
    metrics: [{ name: 'eventCount' }, { name: 'totalUsers' }],
    dimensions: [{ name: 'eventName' }]
  });

  return res.json(response);
}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(nodeBackendSnippet);
        setCopiedSnippet(true);
        setTimeout(() => setCopiedSnippet(false), 2000);
    };

    return (
        <div className="dash-modal-backdrop" onClick={onClose}>
            <div className="dash-modal-box" onClick={(e) => e.stopPropagation()}>
                {/* Header do Modal */}
                <div className="dash-modal-header">
                    <div>
                        <h3>Conexão Google Analytics 4 (GA4)</h3>
                        <p>Configure a propriedade do GA4 para cada canal da Expresso PB</p>
                    </div>
                    <button type="button" className="dash-modal-close" onClick={onClose} aria-label="Fechar modal">
                        <X size={20} weight="bold" />
                    </button>
                </div>

                {/* Seletor de Propriedade no Modal */}
                <div className="dash-modal-property-selector">
                    {propertiesList.map(p => {
                        const Icon = p.icon;
                        const isSelected = selectedProp === p.id;
                        const pConf = configsState[p.id];
                        const isLive = pConf?.mode === 'api';

                        return (
                            <button
                                key={p.id}
                                type="button"
                                className={`dash-modal-prop-tab ${isSelected ? 'active' : ''}`}
                                onClick={() => setSelectedProp(p.id)}
                            >
                                <Icon size={16} weight={isSelected ? "duotone" : "regular"} />
                                <span>{p.label}</span>
                                <span className={`dash-prop-status-dot ${isLive ? 'dot-live' : 'dot-demo'}`} />
                            </button>
                        );
                    })}
                </div>

                <form onSubmit={handleSubmit} className="dash-modal-form">
                    {/* Seletor de Modo */}
                    <div className="dash-form-group">
                        <label className="dash-label">
                            Modo de Operação — <strong>{propertiesList.find(p => p.id === selectedProp)?.label}</strong>
                        </label>
                        <div className="dash-mode-selector">
                            <button
                                type="button"
                                className={`dash-mode-card ${current.mode === 'demo' ? 'active' : ''}`}
                                onClick={() => handleFieldChange('mode', 'demo')}
                            >
                                <div className="dash-mode-icon icon-yellow">
                                    <WarningCircle weight="fill" size={20} />
                                </div>
                                <div className="dash-mode-text">
                                    <strong>Modo Demonstração</strong>
                                    <span>Dados simulados e calibrados para o canal selecionado</span>
                                </div>
                            </button>

                            <button
                                type="button"
                                className={`dash-mode-card ${current.mode === 'api' ? 'active' : ''}`}
                                onClick={() => handleFieldChange('mode', 'api')}
                            >
                                <div className="dash-mode-icon icon-green">
                                    <CheckCircle weight="fill" size={20} />
                                </div>
                                <div className="dash-mode-text">
                                    <strong>Conexão Ativa GA4</strong>
                                    <span>Consulta em tempo real via GA4 Data API v1beta</span>
                                </div>
                            </button>
                        </div>
                    </div>

                    {current.mode === 'api' ? (
                        <>
                            {/* Aviso de Segurança */}
                            <div className="dash-alert-box alert-info">
                                <ShieldCheck weight="fill" size={22} className="alert-icon" />
                                <div>
                                    <strong>Arquitetura Segura Recomendada</strong>
                                    <p>
                                        Cada propriedade do GA4 possui seu ID exclusivo. Configure o Property ID e o endpoint do seu backend para consultas seguras via Service Account.
                                    </p>
                                </div>
                            </div>

                            {/* Property ID */}
                            <div className="dash-form-group">
                                <label className="dash-label" htmlFor="ga4-property">
                                    Property ID do GA4 ({propertiesList.find(p => p.id === selectedProp)?.label}) *
                                </label>
                                <input
                                    id="ga4-property"
                                    type="text"
                                    className="dash-input"
                                    placeholder="Ex: 423984129"
                                    value={current.propertyId || ''}
                                    onChange={(e) => handleFieldChange('propertyId', e.target.value)}
                                    required={current.mode === 'api'}
                                />
                                <span className="dash-input-help">
                                    Encontrado em <em>Admin &gt; Informações da Propriedade &gt; ID da Propriedade</em> no GA4.
                                </span>
                            </div>

                            {/* Measurement ID / Fluxo de Dados */}
                            <div className="dash-form-group">
                                <label className="dash-label" htmlFor="ga4-measurement">
                                    ID da Métrica (Measurement ID)
                                </label>
                                <input
                                    id="ga4-measurement"
                                    type="text"
                                    className="dash-input"
                                    placeholder="Ex: G-XXXXXXXXXX"
                                    value={current.measurementId || ''}
                                    onChange={(e) => handleFieldChange('measurementId', e.target.value)}
                                />
                            </div>

                            {/* URL do Endpoint / Proxy Backend */}
                            <div className="dash-form-group">
                                <label className="dash-label" htmlFor="ga4-api-url">
                                    URL da API / Endpoint Backend *
                                </label>
                                <input
                                    id="ga4-api-url"
                                    type="url"
                                    className="dash-input"
                                    placeholder="Ex: https://api.expressopb.com.br/analytics"
                                    value={current.apiUrl || ''}
                                    onChange={(e) => handleFieldChange('apiUrl', e.target.value)}
                                    required={current.mode === 'api'}
                                />
                                <span className="dash-input-help">
                                    Endpoint que recebe <code>POST /report</code> e consulta o GA4 com sua Service Account.
                                </span>
                            </div>

                            {/* Snippet de Código Backend */}
                            <div className="dash-snippet-box">
                                <div className="dash-snippet-header">
                                    <span>
                                        <Terminal size={14} weight="bold" /> Código de Exemplo Backend (Node.js)
                                    </span>
                                    <button 
                                        type="button" 
                                        className="dash-copy-btn"
                                        onClick={handleCopy}
                                    >
                                        {copiedSnippet ? (
                                            <>
                                                <Check size={14} weight="bold" color="#4ADE80" /> Copiado!
                                            </>
                                        ) : (
                                            <>
                                                <Copy size={14} weight="bold" /> Copiar Código
                                            </>
                                        )}
                                    </button>
                                </div>
                                <pre className="dash-code-pre">
                                    <code>{nodeBackendSnippet}</code>
                                </pre>
                            </div>
                        </>
                    ) : (
                        <div className="dash-demo-info">
                            <p>
                                Modo demonstração ativo para <strong>{propertiesList.find(p => p.id === selectedProp)?.label}</strong>.
                            </p>
                            <p>
                                Os dados exibidos refletem o comportamento analítico e comercial da Expresso PB com métricas calibradas para o modelo B2B.
                            </p>
                        </div>
                    )}

                    {/* Rodapé do Formulário com Salvar */}
                    <div className="dash-modal-footer">
                        {savedNotice && (
                            <span className="dash-save-success">
                                <CheckCircle weight="fill" size={16} /> Configurações de {propertiesList.find(p => p.id === selectedProp)?.label} salvas!
                            </span>
                        )}
                        <button type="button" className="dash-btn-secondary" onClick={onClose}>
                            Fechar
                        </button>
                        <button type="submit" className="dash-btn-primary">
                            <FloppyDisk weight="bold" size={16} /> Salvar Propriedade
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Ga4ConfigModal;
