import React, { useState } from 'react';
import { 
    X, 
    CheckCircle, 
    WarningCircle, 
    Copy, 
    Check, 
    Terminal, 
    ShieldCheck, 
    FloppyDisk 
} from '@phosphor-icons/react';

export const Ga4ConfigModal = ({ isOpen, onClose, currentConfig, onSave }) => {
    const [mode, setMode] = useState(currentConfig?.mode || 'demo');
    const [propertyId, setPropertyId] = useState(currentConfig?.propertyId || '');
    const [apiUrl, setApiUrl] = useState(currentConfig?.apiUrl || '');
    const [copiedSnippet, setCopiedSnippet] = useState(false);
    const [savedNotice, setSavedNotice] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
            mode,
            propertyId: propertyId.trim(),
            apiUrl: apiUrl.trim()
        });
        setSavedNotice(true);
        setTimeout(() => {
            setSavedNotice(false);
            onClose();
        }, 1200);
    };

    const nodeBackendSnippet = `// Exemplo de Endpoint Seguro no seu Backend (Node.js / Express / Serverless)
// Instale: npm install @google-analytics/data
import { BetaAnalyticsDataClient } from '@google-analytics/data';

const analyticsDataClient = new BetaAnalyticsDataClient({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS // service-account.json
});

export async function handleReport(req, res) {
  const { propertyId, period } = req.body;

  const [response] = await analyticsDataClient.runReport({
    property: \`properties/\${propertyId}\`,
    dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
    dimensions: [{ name: 'customEvent:segmento' }],
    metrics: [{ name: 'eventCount' }],
    dimensionFilter: {
      filter: {
        fieldName: 'eventName',
        stringFilter: { value: 'lead_form_cotacao' }
      }
    }
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
                        <p>Configure a fonte de dados do seu Intelligence Hub</p>
                    </div>
                    <button type="button" className="dash-modal-close" onClick={onClose} aria-label="Fechar modal">
                        <X size={20} weight="bold" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="dash-modal-form">
                    {/* Seletor de Modo */}
                    <div className="dash-form-group">
                        <label className="dash-label">Modo de Operação</label>
                        <div className="dash-mode-selector">
                            <button
                                type="button"
                                className={`dash-mode-card ${mode === 'demo' ? 'active' : ''}`}
                                onClick={() => setMode('demo')}
                            >
                                <div className="dash-mode-icon icon-yellow">
                                    <WarningCircle weight="fill" size={20} />
                                </div>
                                <div className="dash-mode-text">
                                    <strong>Modo Demonstração</strong>
                                    <span>Simulação B2B calibrada para transporte de carga lotação</span>
                                </div>
                            </button>

                            <button
                                type="button"
                                className={`dash-mode-card ${mode === 'api' ? 'active' : ''}`}
                                onClick={() => setMode('api')}
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

                    {mode === 'api' ? (
                        <>
                            {/* Aviso de Segurança */}
                            <div className="dash-alert-box alert-info">
                                <ShieldCheck weight="fill" size={22} className="alert-icon" />
                                <div>
                                    <strong>Arquitetura Segura Recomendada</strong>
                                    <p>
                                        A API do Google Analytics 4 exige credenciais com chave privada (Service Account). 
                                        Para proteger suas credenciais, as requisições devem passar pelo seu backend ou rota de API.
                                    </p>
                                </div>
                            </div>

                            {/* Property ID */}
                            <div className="dash-form-group">
                                <label className="dash-label" htmlFor="ga4-property">
                                    Property ID do GA4 *
                                </label>
                                <input
                                    id="ga4-property"
                                    type="text"
                                    className="dash-input"
                                    placeholder="Ex: 423984129"
                                    value={propertyId}
                                    onChange={(e) => setPropertyId(e.target.value)}
                                    required={mode === 'api'}
                                />
                                <span className="dash-input-help">
                                    Encontrado em <em>Admin &gt; Informações da Propriedade &gt; ID da Propriedade</em> no GA4.
                                </span>
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
                                    value={apiUrl}
                                    onChange={(e) => setApiUrl(e.target.value)}
                                    required={mode === 'api'}
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
                                No modo demonstração, o painel exibe um ecossistema com dados 100% fieis à realidade operacional da Expresso PB, calculando leads de WhatsApp, formulários de cotação por rota, distribuição dos 4 segmentos e filtragem de RH.
                            </p>
                            <p>
                                Você pode explorar todos os filtros temporais (7d, 14d, 30d, 90d) livremente.
                            </p>
                        </div>
                    )}

                    {/* Rodapé do Formulário com Salvar */}
                    <div className="dash-modal-footer">
                        {savedNotice && (
                            <span className="dash-save-success">
                                <CheckCircle weight="fill" size={16} /> Configurações salvas!
                            </span>
                        )}
                        <button type="button" className="dash-btn-secondary" onClick={onClose}>
                            Cancelar
                        </button>
                        <button type="submit" className="dash-btn-primary">
                            <FloppyDisk weight="bold" size={16} /> Salvar Configuração
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Ga4ConfigModal;
