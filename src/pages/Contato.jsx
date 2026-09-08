import React, { useState } from 'react';
import { 
    EnvelopeSimple, WhatsappLogo, 
    Clock, ShieldCheck, Truck, CheckCircle, 
    Buildings, Headset, PaperPlaneTilt
} from '@phosphor-icons/react';
import imgHighway from '../assets/trait_highway.jpg';

const Contato = () => {
    const [formData, setFormData] = useState({
        empresa: '',
        cnpj: '',
        nome: '',
        email: '',
        whatsapp: '',
        origem: '',
        destino: '',
        tipoCarga: '',
        pesoEstimado: '',
        veiculoPreferencial: '',
        mensagem: ''
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulação de envio com feedback visual imediato
        setSubmitted(true);
    };

    return (
        <>
            {/* 1. Hero Monumental Padronizado */}
            <div className="hero-internal" style={{ backgroundImage: `url(${imgHighway})` }}>
                <div className="container" style={{ textAlign: 'left', margin: '0 auto' }}>
                    <span className="kicker" style={{ color: 'var(--primary-blue)', letterSpacing: '2px', fontWeight: '800', textTransform: 'uppercase', marginBottom: '1rem', display: 'block' }}>
                        Atendimento & Engenharia Logística
                    </span>
                    <h1 style={{ fontWeight: '800', lineHeight: '1.1', letterSpacing: '-2px', marginBottom: '1.5rem', color: 'var(--white)' }}>
                        Solicite sua Cotação Dedicada B2B
                    </h1>
                    <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.85)', maxWidth: '680px', lineHeight: '1.6', margin: '0' }}>
                        Fale diretamente com nossa mesa comercial e receba uma análise de saving, previsão orçamentária para o seu DRE e contratos dedicados com isenção total de pernoite.
                    </p>
                </div>
            </div>

            {/* 2. Área Central de Contato & Cotação */}
            <div className="contato-wrapper">
                <div className="container">
                    <div className="grid-2" style={{ alignItems: 'start', gap: '4.5rem' }}>
                        
                        {/* Coluna Esquerda: Informações Oficiais, Canais e Confiança */}
                        <div>
                            <span className="kicker" style={{ color: 'var(--primary-blue)', letterSpacing: '2px', fontWeight: '800', textTransform: 'uppercase', marginBottom: '1rem', display: 'block' }}>
                                Canais Diretos
                            </span>
                            <h2 style={{ fontWeight: '800', color: 'var(--dark-blue)', marginBottom: '1.2rem', letterSpacing: '-1px' }}>
                                Estamos prontos para transportar seu resultado
                            </h2>
                            <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '2.5rem' }}>
                                Seja para uma rota recorrente de grande porte ou uma carga pontual de alto valor agregado, nosso centro de despacho e frota própria oferecem prontidão operacional imediata.
                            </p>

                            {/* Cards de Canais Rápidos */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginBottom: '3rem' }}>
                                <a href="https://wa.me/5583999999999" target="_blank" rel="noopener noreferrer" className="contato-channel-card">
                                    <div className="contato-channel-icon" style={{ background: 'rgba(37, 211, 102, 0.12)', color: '#25D366' }}>
                                        <WhatsappLogo weight="fill" />
                                    </div>
                                    <div className="contato-channel-info">
                                        <h4>WhatsApp Comercial</h4>
                                        <p>Atendimento ágil para despachos urgentes: <strong>(83) 99999-9999</strong></p>
                                    </div>
                                </a>

                                <a href="mailto:comercial@expressopb.com" className="contato-channel-card">
                                    <div className="contato-channel-icon">
                                        <EnvelopeSimple weight="fill" />
                                    </div>
                                    <div className="contato-channel-info">
                                        <h4>E-mail Corporativo</h4>
                                        <p>Envio de RFPs e editais de logística: <strong>comercial@expressopb.com</strong></p>
                                    </div>
                                </a>

                                <div className="contato-channel-card">
                                    <div className="contato-channel-icon">
                                        <Buildings weight="fill" />
                                    </div>
                                    <div className="contato-channel-info">
                                        <h4>Matriz Corporativa</h4>
                                        <p>João Pessoa - PB | Torre de telemetria e coordenação 24 horas por dia.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Box de Confiança Operacional */}
                            <div style={{
                                background: 'var(--dark-blue)',
                                color: 'var(--white)',
                                borderRadius: '20px',
                                padding: '2.2rem',
                                position: 'relative',
                                overflow: 'hidden'
                            }}>
                                <div style={{ position: 'relative', zIndex: 2 }}>
                                    <span style={{ 
                                        display: 'inline-flex', 
                                        alignItems: 'center', 
                                        gap: '0.5rem', 
                                        color: '#38bdf8', 
                                        fontWeight: '700', 
                                        fontSize: '0.85rem', 
                                        textTransform: 'uppercase', 
                                        letterSpacing: '1px',
                                        marginBottom: '0.8rem' 
                                    }}>
                                        <ShieldCheck weight="bold" size={18} /> Apólice RCF-DC & RCTR-C Ativa
                                    </span>
                                    <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '0.6rem', color: 'var(--white)' }}>
                                        Cobertura Securitária Integral
                                    </h3>
                                    <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.95rem', lineHeight: '1.5', margin: 0 }}>
                                        Todas as viagens possuem gerenciamento de risco integrado (rastreamento 100% via satélite, sensores de porta e desengate, além de comboio quando aplicável).
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Coluna Direita: Formulário de Cotação Corporativa */}
                        <div className="quote-form-card">
                            <div style={{ marginBottom: '2.5rem' }}>
                                <span style={{
                                    background: 'rgba(25, 163, 223, 0.1)',
                                    color: 'var(--primary-blue)',
                                    padding: '0.35rem 0.9rem',
                                    borderRadius: '8px',
                                    fontWeight: '800',
                                    fontSize: '0.85rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '1px',
                                    display: 'inline-block',
                                    marginBottom: '0.8rem'
                                }}>
                                    Atendimento Comercial
                                </span>
                                <h3 style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--dark-blue)', letterSpacing: '-0.5px', marginBottom: '0.5rem' }}>
                                    Solicitar Proposta Comercial
                                </h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '1rem', margin: 0 }}>
                                    Preencha os dados da sua operação para nossa equipe comercial analisar e enviar uma proposta sob medida.
                                </p>
                            </div>

                            <div className="pernoite-banner-inline" style={{marginBottom: '1.8rem'}}>
                                <ShieldCheck weight="fill" />
                                <span><strong>Garantia Comercial:</strong> Contratos dedicados com isenção total de cobrança de pernoite — blindagem do seu DRE contra taxas ocultas.</span>
                            </div>

                            {submitted ? (
                                <div style={{
                                    textAlign: 'center',
                                    padding: '4rem 2rem',
                                    background: 'rgba(25, 163, 223, 0.05)',
                                    borderRadius: '16px',
                                    border: '1px dashed var(--primary-blue)'
                                }}>
                                    <CheckCircle weight="fill" size={68} color="#19A3DF" style={{ marginBottom: '1.5rem' }} />
                                    <h4 style={{ fontSize: '1.8rem', color: 'var(--dark-blue)', marginBottom: '0.8rem', fontWeight: '800' }}>
                                        Solicitação Recebida com Sucesso!
                                    </h4>
                                    <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '460px', margin: '0 auto 2rem auto', lineHeight: '1.6' }}>
                                        Nossa mesa de operações já está analisando as especificações da rota. Em até <strong>2 horas úteis</strong> entraremos em contato via WhatsApp/E-mail.
                                    </p>
                                    <button 
                                        type="button" 
                                        className="btn-primary" 
                                        onClick={() => setSubmitted(false)}
                                        style={{ border: 'none', cursor: 'pointer', padding: '0.8rem 1.8rem' }}
                                    >
                                        Enviar Nova Solicitação
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit}>
                                    {/* Linha 1: Empresa e CNPJ */}
                                    <div className="grid-2" style={{ gap: '1.2rem', marginBottom: '1.2rem' }}>
                                        <div>
                                            <label className="quote-input-label">Razão Social / Nome da Empresa *</label>
                                            <input 
                                                type="text" 
                                                name="empresa" 
                                                required 
                                                value={formData.empresa} 
                                                onChange={handleChange}
                                                className="quote-input-control" 
                                                placeholder="Ex: Indústria Brasileira S.A." 
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

                                    {/* Linha 2: Responsável e Contatos */}
                                    <div className="grid-2" style={{ gap: '1.2rem', marginBottom: '1.2rem' }}>
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

                                    {/* Linha 3: E-mail */}
                                    <div style={{ marginBottom: '1.2rem' }}>
                                        <label className="quote-input-label">E-mail Profissional *</label>
                                        <input 
                                            type="email" 
                                            name="email" 
                                            required 
                                            value={formData.email} 
                                            onChange={handleChange}
                                            className="quote-input-control" 
                                            placeholder="exemplo@suaempresa.com.br" 
                                        />
                                    </div>

                                    {/* Linha 4: Origem e Destino */}
                                    <div className="grid-2" style={{ gap: '1.2rem', marginBottom: '1.2rem' }}>
                                        <div>
                                            <label className="quote-input-label">Origem da Carga (Cidade/UF) *</label>
                                            <input 
                                                type="text" 
                                                name="origem" 
                                                required 
                                                value={formData.origem} 
                                                onChange={handleChange}
                                                className="quote-input-control" 
                                                placeholder="Ex: João Pessoa / PB" 
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
                                                placeholder="Ex: Belém / PA" 
                                            />
                                        </div>
                                    </div>

                                    {/* Linha 5: Especificações da Carga */}
                                    <div className="grid-2" style={{ gap: '1.2rem', marginBottom: '1.2rem' }}>
                                        <div>
                                            <label className="quote-input-label">Tipo de Modalidade / Segmento</label>
                                            <select 
                                                name="tipoCarga" 
                                                value={formData.tipoCarga} 
                                                onChange={handleChange}
                                                className="quote-input-control"
                                                style={{ cursor: 'pointer' }}
                                            >
                                                <option value="">Selecione o segmento / modalidade...</option>
                                                <option value="FTL (Carga Lotação Fechada)">FTL (Carga Lotação Fechada)</option>
                                                <option value="Construção Civil & Cerâmica (Pisos/Revestimentos)">Construção Civil & Cerâmica (Pisos/Revestimentos)</option>
                                                <option value="Alimentos & Bebidas (Janelas em CDs / Atacarejo)">Alimentos & Bebidas (Janelas em CDs / Atacarejo)</option>
                                                <option value="Papel, Celulose & Alta Cubagem">Papel, Celulose & Alta Cubagem (Bitrem/Rodotrem)</option>
                                                <option value="Maquinário & Metalmecânica (Carga Direta)">Maquinário & Metalmecânica (Carga Direta)</option>
                                                <option value="Transporte Dedicado Contratual (Longo Prazo)">Transporte Dedicado Contratual (Longo Prazo)</option>
                                                <option value="Outros">Outros</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="quote-input-label">Peso Estimado (ou Toneladas)</label>
                                            <input 
                                                type="text" 
                                                name="pesoEstimado" 
                                                value={formData.pesoEstimado} 
                                                onChange={handleChange}
                                                className="quote-input-control" 
                                                placeholder="Ex: 27 toneladas" 
                                            />
                                        </div>
                                    </div>

                                    {/* Linha 6: Veículo Sugerido */}
                                    <div style={{ marginBottom: '1.2rem' }}>
                                        <label className="quote-input-label">Veículo Preferencial (Opcional)</label>
                                        <select 
                                            name="veiculoPreferencial" 
                                            value={formData.veiculoPreferencial} 
                                            onChange={handleChange}
                                            className="quote-input-control"
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <option value="">Selecione o veículo preferencial...</option>
                                            <option value="Carreta Graneleira">Carreta Graneleira (Grãos, Sacaria, Granel)</option>
                                            <option value="Carreta Baú Fechado">Carreta Baú Fechado (Carga Geral Seca)</option>
                                            <option value="Carreta Sider">Carreta Sider (Carga Paletizada e Rápida)</option>
                                            <option value="Prancha / Carga Especial">Prancha / Equipamentos Pesados</option>
                                            <option value="Não sei / Recomendação da Expresso PB">Não sei / Recomendação da Expresso PB</option>
                                        </select>
                                    </div>

                                    {/* Linha 7: Observações */}
                                    <div style={{ marginBottom: '2rem' }}>
                                        <label className="quote-input-label">Observações Adicionais ou Janela de Carga</label>
                                        <textarea 
                                            name="mensagem" 
                                            value={formData.mensagem} 
                                            onChange={handleChange}
                                            className="quote-input-control" 
                                            style={{ minHeight: '100px', resize: 'vertical' }}
                                            placeholder="Informe datas de carregamento, valor aproximado da nota fiscal para averbação ou detalhes de acesso ao pátio..."
                                        ></textarea>
                                    </div>

                                    <button 
                                        type="submit" 
                                        className="btn-primary" 
                                        style={{
                                            width: '100%', 
                                            border: 'none', 
                                            cursor: 'pointer', 
                                            padding: '1.2rem', 
                                            fontSize: '1.15rem', 
                                            fontWeight: '800',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            gap: '0.8rem',
                                            borderRadius: '12px'
                                        }}
                                    >
                                        Enviar Solicitação para o Comercial <PaperPlaneTilt weight="bold" size={22} />
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. Seção com Fundo Azul: Selos de Compromisso & SLA */}
            <section className="sla-trust-section">
                <div className="container">
                    <div className="sla-trust-grid">
                        <div className="sla-trust-item">
                            <Clock weight="fill" className="sla-trust-icon" />
                            <div>
                                <h4>Resposta Ágil & Sem Pernoite</h4>
                                <p>Proposta comercial em até 2h úteis e contratos com isenção total de cobrança de pernoite se a doca atrasar.</p>
                            </div>
                        </div>

                        <div className="sla-trust-item">
                            <Truck weight="fill" className="sla-trust-icon" />
                            <div>
                                <h4>Frota Dedicada sem Transbordo</h4>
                                <p>Carregamento direto da fábrica ao destino final sem centros intermediários, eliminando risco de avaria.</p>
                            </div>
                        </div>

                        <div className="sla-trust-item">
                            <Headset weight="fill" className="sla-trust-icon" />
                            <div>
                                <h4>Mesa de Suporte Dedicada</h4>
                                <p>Acompanhamento de janelas de agendamento em CDs e posição de viagem 24 horas por dia.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Contato;
