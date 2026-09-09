import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
    ShieldCheck, 
    Truck, 
    CheckCircle, 
    ArrowRight, 
    WhatsappLogo, 
    EnvelopeSimple, 
    ArrowDown, 
    CaretDown, 
    PaperPlaneTilt, 
    Sparkle, 
    LockKey,
    XCircle,
    Coins,
    ChartLineUp
} from '@phosphor-icons/react';
import { getSegmentoBySlug, segmentosData } from '../data/segmentosData';

// Imagens para cada segmento
import imgHighway from '../assets/trait_highway.jpg';
import imgTablet from '../assets/trait_tablet.jpg';
import imgHub from '../assets/trait_hub.jpg';
import imgDriver from '../assets/trait_driver.jpg';

const imageMap = {
    'construcao-civil': imgHighway,
    'alimentos-bebidas': imgTablet,
    'papel-celulose': imgHub,
    'maquinario-metalmecanica': imgDriver,
};

const personaIcons = [
    Truck,       // Operações / Logística
    Coins,       // Procurement / Compras
    ChartLineUp  // Diretoria / Supply Chain
];

const SegmentoPage = () => {
    const { slug } = useParams();

    // Obtém os dados do segmento atual com fallback seguro
    const segmento = getSegmentoBySlug(slug) || segmentosData['construcao-civil'];
    const heroImage = imageMap[segmento.slug] || imgHighway;

    // Estado do FAQ acordeão
    const [openFaq, setOpenFaq] = useState(null);

    // Estado do formulário de cotação
    const [formData, setFormData] = useState({
        empresa: '',
        cnpj: '',
        nome: '',
        whatsapp: '',
        email: '',
        origem: '',
        destino: '',
        tipoCarga: segmento.quoteFormDefault,
        pesoEstimado: '',
        veiculoPreferencial: '',
        mensagem: ''
    });

    const [submitted, setSubmitted] = useState(false);

    // Atualiza o formulário quando o segmento mudar via URL
    useEffect(() => {
        setFormData(prev => ({
            ...prev,
            tipoCarga: segmento.quoteFormDefault
        }));
        setSubmitted(false);
        setOpenFaq(null);
    }, [segmento.slug, segmento.quoteFormDefault]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    };

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const scrollToForm = () => {
        const formElement = document.getElementById('cotacao-segmento');
        if (formElement) {
            formElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Lista de outros segmentos para cross-navigation
    const outrosSegmentos = Object.values(segmentosData).filter(s => s.slug !== segmento.slug);

    return (
        <div className="segmento-page">
            {/* 1. HERO MONUMENTAL SEGMENTADO */}
            <section 
                className="segmento-hero"
                style={{ 
                    backgroundImage: `linear-gradient(135deg, rgba(0, 3, 39, 0.94) 0%, rgba(0, 3, 39, 0.88) 55%, rgba(0, 3, 39, 0.95) 100%), url(${heroImage})` 
                }}
            >
                <div className="container">
                    <div className="segmento-hero-content">
                        {/* Kicker & Badge */}
                        <div className="segmento-badge-wrapper">
                            <span className="segmento-kicker">{segmento.kicker}</span>
                            <span className="segmento-badge">
                                <Sparkle weight="fill" size={14} />
                                {segmento.heroBadge}
                            </span>
                        </div>

                        {/* H1 Título Genérico do Segmento */}
                        <h1 className="segmento-title">{segmento.heroTitle || segmento.title}</h1>

                        {/* Headline / Proposta de Valor B2B */}
                        <p className="segmento-headline-tagline">{segmento.headline}</p>

                        {/* Subheadline conversando com dores de DRE e SLA */}
                        <p className="segmento-subheadline">{segmento.subheadline}</p>

                        {/* Dual CTA Padrão Design System */}
                        <div className="hero-btns">
                            <button 
                                type="button" 
                                className="btn-primary" 
                                onClick={scrollToForm}
                            >
                                Solicitar Cotação Dedicada
                                <ArrowDown weight="bold" size={16} />
                            </button>

                            <a 
                                href={`https://wa.me/5583999999999?text=${encodeURIComponent(segmento.whatsappMessage)}`}
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="btn-outline"
                            >
                                <WhatsappLogo weight="fill" size={18} color="#25D366" />
                                Falar com Especialista
                            </a>
                        </div>

                        {/* Hero Stats (Igual ao padrão da Home, eliminando tags em formato de botão) */}
                        <div className="hero-stats">
                            {segmento.metrics.map((m, idx) => (
                                <React.Fragment key={idx}>
                                    {idx > 0 && <div className="stat-divider"></div>}
                                    <div className="hero-stat-item">
                                        <span className="stat-number">{m.value}</span>
                                        <span className="stat-label">{m.label}</span>
                                    </div>
                                </React.Fragment>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. FAIXA DE MÉTRICAS & INDICADORES DO SEGMENTO */}
            <section className="segmento-metrics-strip">
                <div className="container">
                    <div className="segmento-metrics-grid">
                        {segmento.metrics.map((m, idx) => (
                            <div key={idx} className="segmento-metric-card">
                                <span className="metric-val">{m.value}</span>
                                <strong className="metric-lbl">{m.label}</strong>
                                <p className="metric-desc">{m.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. A TRÍADE DE DECISORES (PERSONA PITCH) */}
            <section className="segmento-personas-section">
                <div className="container">
                    <div className="section-header text-center">
                        <span className="kicker">Alinhamento Estratégico</span>
                        <h2>Feito para atender quem decide</h2>
                        <p className="section-sub">
                            Uma operação de transporte eficiente deve responder às exigências da doca, à disciplina do financeiro e à governança da diretoria.
                        </p>
                    </div>

                    <div className="segmento-personas-grid">
                        {segmento.personas.map((p, idx) => {
                            const PersonaIcon = personaIcons[idx] || ShieldCheck;
                            return (
                                <div key={idx} className="persona-card">
                                    <div className="persona-card-top">
                                        <div className="persona-avatar-box">
                                            <PersonaIcon weight="duotone" size={32} />
                                        </div>
                                        <div>
                                            <span className="persona-badge">{p.badge}</span>
                                            <h4 className="persona-role">{p.role}</h4>
                                        </div>
                                    </div>
                                    <h3 className="persona-card-title">{p.title}</h3>
                                    <ul className="persona-points-list">
                                        {p.points.map((pt, pIdx) => (
                                            <li key={pIdx}>
                                                <CheckCircle weight="fill" className="persona-check-icon" />
                                                <span>{pt}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* 4. COMPARATIVO: CARGA CONVENCIONAL VS OPERAÇÃO EXPRESSO PB */}
            <section className="segmento-comparison-section">
                <div className="container">
                    <div className="section-header text-center">
                        <span className="kicker">Diferencial Competitivo</span>
                        <h2>A Realidade do Mercado vs. A Blindagem Expresso PB</h2>
                        <p className="section-sub">
                            Compare o impacto real de operar com amadorismo no spot contra a tranquilidade de uma transportadora corporativa dedicada.
                        </p>
                    </div>

                    <div className="comparison-table-wrapper">
                        <table className="comparison-table">
                            <thead>
                                <tr>
                                    <th className="th-criteria">Critério Operacional</th>
                                    <th className="th-standard">Carga Convencional / Spot de Mercado</th>
                                    <th className="th-expresso">Operação Dedicada Expresso PB</th>
                                </tr>
                            </thead>
                            <tbody>
                                {segmento.comparison.map((item, idx) => (
                                    <tr key={idx}>
                                        <td className="td-criteria">
                                            <strong>{item.criteria}</strong>
                                        </td>
                                        <td className="td-standard">
                                            <div className="comp-cell-content">
                                                <XCircle weight="fill" className="comp-icon-x" />
                                                <span>{item.standard}</span>
                                            </div>
                                        </td>
                                        <td className="td-expresso">
                                            <div className="comp-cell-content">
                                                <CheckCircle weight="fill" className="comp-icon-check" />
                                                <span>{item.expresso}</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* 5. FROTA RECOMENDADA DO SEGMENTO */}
            <section className="segmento-fleet-section">
                <div className="container">
                    <div className="section-header text-center">
                        <span className="kicker">Engenharia Veicular</span>
                        <h2>Frota Sob Medida para {segmento.shortTitle}</h2>
                        <p className="section-sub">
                            Conjuntos dimensionados para máxima proteção, velocidade de carga/descarga e conformidade técnica integral.
                        </p>
                    </div>

                    <div className="segmento-fleet-grid">
                        {segmento.recommendedFleet.map((truck, idx) => (
                            <div key={idx} className="segmento-fleet-card">
                                <div className="fleet-card-icon-box">
                                    <Truck weight="duotone" size={40} />
                                </div>
                                <div className="fleet-card-body">
                                    <h3>{truck.name}</h3>
                                    <p className="fleet-desc">{truck.desc}</p>
                                    <div className="fleet-spec-box">
                                        <ShieldCheck weight="bold" size={18} />
                                        <span>{truck.specs}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. FORMULÁRIO DE COTAÇÃO RÁPIDA B2B (CONVERSÃO) */}
            <section id="cotacao-segmento" className="segmento-quote-section">
                <div className="container">
                    <div className="grid-2 quote-split-layout">
                        {/* Coluna de Prova & Contato Direto */}
                        <div className="quote-direct-info">
                            <span className="kicker">Cotação Rápida B2B</span>
                            <h2>Receba uma Proposta Dedicada em até 2 Horas</h2>
                            <p className="quote-intro-text">
                                Nossa mesa comercial analisa as particularidades da sua rota e tipo de carga para formatar uma proposta técnica e comercial sob medida para a sua operação.
                            </p>

                            {/* Contatos Imediatos */}
                            <div className="quote-quick-contacts">
                                <a 
                                    href={`https://wa.me/5583999999999?text=${encodeURIComponent(segmento.whatsappMessage)}`}
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="quote-channel-item"
                                >
                                    <div className="channel-icon-circle whatsapp">
                                        <WhatsappLogo weight="fill" size={24} />
                                    </div>
                                    <div>
                                        <span className="channel-tag">Atendimento Imediato</span>
                                        <strong>WhatsApp: (83) 99999-9999</strong>
                                    </div>
                                </a>

                                <a href="mailto:comercial@expressopb.com" className="quote-channel-item">
                                    <div className="channel-icon-circle email">
                                        <EnvelopeSimple weight="fill" size={24} />
                                    </div>
                                    <div>
                                        <span className="channel-tag">Envio de RFPs & Editais</span>
                                        <strong>comercial@expressopb.com</strong>
                                    </div>
                                </a>
                            </div>

                            {/* Box de Segurança Jurídica e Risco */}
                            <div className="quote-guarantee-card">
                                <div className="guarantee-header">
                                    <LockKey weight="bold" size={20} color="#19A3DF" />
                                    <span>Segurança & Conformidade B2B</span>
                                </div>
                                <p>
                                    Apólices RCTR-C e RC-DC com averbação automática antes da saída, cadastro homologado nas principais gerenciadoras de risco do país e emissão eletrônica de CT-e e MDF-e.
                                </p>
                            </div>
                        </div>

                        {/* Coluna do Formulário */}
                        <div className="quote-form-card">
                            <div className="quote-card-header">
                                <span className="quote-kicker-tag">Formulário de Cotação</span>
                                <h3>Proposta para {segmento.shortTitle}</h3>
                                <p>Preencha os campos abaixo para receber a análise da rota:</p>
                            </div>

                            {submitted ? (
                                <div className="quote-success-box">
                                    <CheckCircle weight="fill" size={64} color="#19A3DF" />
                                    <h4>Solicitação Registrada com Sucesso!</h4>
                                    <p>
                                        Nossa mesa de operações já está calculando as rotas e a disponibilidade de frota para <strong>{segmento.title}</strong>.
                                    </p>
                                    <p style={{ fontSize: '0.92rem', color: 'var(--text-muted)' }}>
                                        Entraremos em contato via WhatsApp/E-mail em até <strong>2 horas úteis</strong> com sua proposta técnica e comercial.
                                    </p>
                                    <button 
                                        type="button" 
                                        className="btn-primary" 
                                        onClick={() => setSubmitted(false)}
                                        style={{ marginTop: '1.5rem' }}
                                    >
                                        Enviar Outra Cotação
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="segmento-quote-form">
                                    {/* Empresa & CNPJ */}
                                    <div className="form-grid-2">
                                        <div>
                                            <label className="quote-input-label">Razão Social / Empresa *</label>
                                            <input 
                                                type="text" 
                                                name="empresa" 
                                                required 
                                                value={formData.empresa} 
                                                onChange={handleChange}
                                                className="quote-input-control" 
                                                placeholder="Ex: Cerâmica do Norte S.A." 
                                            />
                                        </div>
                                        <div>
                                            <label className="quote-input-label">CNPJ da Empresa</label>
                                            <input 
                                                type="text" 
                                                name="cnpj" 
                                                value={formData.cnpj} 
                                                onChange={handleChange}
                                                className="quote-input-control" 
                                                placeholder="00.000.000/0001-00" 
                                            />
                                        </div>
                                    </div>

                                    {/* Nome & WhatsApp */}
                                    <div className="form-grid-2">
                                        <div>
                                            <label className="quote-input-label">Nome do Solicitante *</label>
                                            <input 
                                                type="text" 
                                                name="nome" 
                                                required 
                                                value={formData.nome} 
                                                onChange={handleChange}
                                                className="quote-input-control" 
                                                placeholder="Seu nome completo" 
                                            />
                                        </div>
                                        <div>
                                            <label className="quote-input-label">WhatsApp Corporativo *</label>
                                            <input 
                                                type="tel" 
                                                name="whatsapp" 
                                                required 
                                                value={formData.whatsapp} 
                                                onChange={handleChange}
                                                className="quote-input-control" 
                                                placeholder="(83) 99999-9999" 
                                            />
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className="quote-input-label">E-mail Profissional *</label>
                                        <input 
                                            type="email" 
                                            name="email" 
                                            required 
                                            value={formData.email} 
                                            onChange={handleChange}
                                            className="quote-input-control" 
                                            placeholder="comprador@suaempresa.com.br" 
                                        />
                                    </div>

                                    {/* Origem e Destino */}
                                    <div className="form-grid-2">
                                        <div>
                                            <label className="quote-input-label">Origem da Carga (Cidade/UF) *</label>
                                            <input 
                                                type="text" 
                                                name="origem" 
                                                required 
                                                value={formData.origem} 
                                                onChange={handleChange}
                                                className="quote-input-control" 
                                                placeholder="Ex: Conde / PB" 
                                            />
                                        </div>
                                        <div>
                                            <label className="quote-input-label">Destino da Carga (Cidade/UF) *</label>
                                            <input 
                                                type="text" 
                                                name="destino" 
                                                required 
                                                value={formData.destino} 
                                                onChange={handleChange}
                                                className="quote-input-control" 
                                                placeholder="Ex: Fortaleza / CE" 
                                            />
                                        </div>
                                    </div>

                                    {/* Modalidade / Segmento (Pré-selecionado) e Peso */}
                                    <div className="form-grid-2">
                                        <div>
                                            <label className="quote-input-label">Modalidade / Segmento *</label>
                                            <select 
                                                name="tipoCarga" 
                                                value={formData.tipoCarga} 
                                                onChange={handleChange}
                                                className="quote-input-control"
                                                required
                                            >
                                                <option value="Construção Civil">Construção Civil</option>
                                                <option value="Alimentos & Bebidas">Alimentos & Bebidas</option>
                                                <option value="Papel & Celulose">Papel & Celulose</option>
                                                <option value="Maquinário & Metalmecânica">Maquinário & Metalmecânica</option>
                                                <option value="Carga Lotação Geral (FTL)">Carga Lotação Geral (FTL)</option>
                                                <option value="Transporte Dedicado Contratual">Transporte Dedicado Contratual</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="quote-input-label">Peso Estimado da Carga</label>
                                            <input 
                                                type="text" 
                                                name="pesoEstimado" 
                                                value={formData.pesoEstimado} 
                                                onChange={handleChange}
                                                className="quote-input-control" 
                                                placeholder="Ex: Lotação Fechada" 
                                            />
                                        </div>
                                    </div>

                                    {/* Veículo Preferencial */}
                                    <div>
                                        <label className="quote-input-label">Veículo Sugerido (Opcional)</label>
                                        <select 
                                            name="veiculoPreferencial" 
                                            value={formData.veiculoPreferencial} 
                                            onChange={handleChange}
                                            className="quote-input-control"
                                        >
                                            <option value="">Recomendação técnica da Expresso PB</option>
                                            {segmento.recommendedFleet.map((truck, idx) => (
                                                <option key={idx} value={truck.name}>{truck.name}</option>
                                            ))}
                                            <option value="Carreta Graneleira">Carreta Graneleira</option>
                                            <option value="Carreta Baú Carga Seca">Carreta Baú Carga Seca</option>
                                            <option value="Carreta Sider">Carreta Sider</option>
                                            <option value="Bitrem / Rodotrem">Bitrem / Rodotrem</option>
                                            <option value="Prancha Especial">Prancha Especial</option>
                                        </select>
                                    </div>

                                    {/* Mensagem / Detalhes */}
                                    <div>
                                        <label className="quote-input-label">Observações da Operação (Opcional)</label>
                                        <textarea 
                                            name="mensagem" 
                                            rows="3"
                                            value={formData.mensagem} 
                                            onChange={handleChange}
                                            className="quote-input-control" 
                                            placeholder="Detalhes sobre janelas de entrega, restrições de doca, frequência semanal..."
                                        />
                                    </div>

                                    <button 
                                        type="submit" 
                                        className="btn-primary quote-submit-btn"
                                    >
                                        <PaperPlaneTilt weight="bold" size={20} />
                                        Solicitar Proposta Comercial para {segmento.shortTitle}
                                    </button>

                                    <p className="quote-disclaimer">
                                        <ShieldCheck weight="bold" size={15} />
                                        Seus dados são protegidos sob sigilo corporativo. Resposta ágil em horário comercial.
                                    </p>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* 7. FAQ ESTRATÉGICO DO SEGMENTO */}
            <section className="segmento-faq-section">
                <div className="container">
                    <div className="section-header text-center">
                        <span className="kicker">Dúvidas Frequentes</span>
                        <h2>Perguntas dos Nossos Clientes em {segmento.shortTitle}</h2>
                        <p className="section-sub">
                            Esclarecimentos diretos sobre faturamento, isenção de pernoite, rastreamento e seguro.
                        </p>
                    </div>

                    <div className="segmento-faq-accordion">
                        {segmento.faqs.map((faq, idx) => (
                            <div 
                                key={idx} 
                                className={`faq-accordion-item ${openFaq === idx ? 'open' : ''}`}
                            >
                                <button 
                                    type="button" 
                                    className="faq-accordion-header"
                                    onClick={() => toggleFaq(idx)}
                                    aria-expanded={openFaq === idx}
                                >
                                    <span className="faq-question-text">{faq.q}</span>
                                    <CaretDown weight="bold" className={`faq-caret ${openFaq === idx ? 'rotated' : ''}`} />
                                </button>
                                {openFaq === idx && (
                                    <div className="faq-accordion-content">
                                        <p>{faq.a}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 8. EXPLORAR OUTROS SEGMENTOS DEDICADOS */}
            <section className="outros-segmentos-section">
                <div className="container">
                    <div className="section-header text-center">
                        <span className="kicker">Outras Especialidades</span>
                        <h2>Conheça Nossas Demais Soluções Dedicadas</h2>
                        <p className="section-sub">Operações logísticas estruturadas para os principais setores industriais.</p>
                    </div>

                    <div className="grid-3 outros-segmentos-grid">
                        {outrosSegmentos.map((outro, idx) => (
                            <Link 
                                key={idx} 
                                to={`/segmentos/${outro.slug}`} 
                                className="outro-segmento-card"
                            >
                                <div className="outro-img-box">
                                    <img 
                                        src={imageMap[outro.slug] || imgHighway} 
                                        alt={outro.title} 
                                    />
                                    <div className="outro-overlay-badge">{outro.shortTitle}</div>
                                </div>
                                <div className="outro-content">
                                    <h4>{outro.title}</h4>
                                    <p>{outro.kicker}</p>
                                    <span className="outro-link-cta">
                                        Ver Solução Dedicada
                                        <ArrowRight weight="bold" size={16} />
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* 9. CTA FINAL PERSUASIVO */}
            <section className="segmento-final-cta">
                <div className="container text-center">
                    <span className="kicker" style={{ color: '#38bdf8' }}>Atendimento Corporativo</span>
                    <h2>Pronto para acabar com atrasos e cobranças surpresa no frete?</h2>
                    <p>
                        Fale com nossa equipe comercial e veja como a Expresso PB pode simplificar a sua operação de transporte.
                    </p>
                    <div className="hero-btns" style={{ justifyContent: 'center' }}>
                        <button 
                            type="button" 
                            className="btn-primary" 
                            onClick={scrollToForm}
                        >
                            Solicitar Proposta
                            <ArrowDown weight="bold" size={18} />
                        </button>

                        <a 
                            href={`https://wa.me/5583999999999?text=${encodeURIComponent(segmento.whatsappMessage)}`}
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="btn-outline"
                        >
                            <WhatsappLogo weight="fill" size={20} />
                            Falar no WhatsApp
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SegmentoPage;
