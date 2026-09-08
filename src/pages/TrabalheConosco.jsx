import React, { useState } from 'react';
import { 
    Briefcase, Truck, Users, Sparkle, MapPin, 
    CheckCircle, ArrowRight, ShieldCheck, Handshake,
    CurrencyCircleDollar, FileText, PaperPlaneTilt, Clock
} from '@phosphor-icons/react';
import imgDriver from '../assets/trait_driver.jpg';

const TrabalheConosco = () => {
    const [formData, setFormData] = useState({
        nome: '',
        telefone: '',
        email: '',
        cidadeUf: '',
        vagaInteresse: 'Motorista Carreteiro',
        cnhCategoria: 'E',
        experiencia: '',
        linkCurriculo: ''
    });
    const [enviado, setEnviado] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setEnviado(true);
    };

    return (
        <>
            {/* 1. Hero Monumental */}
            <div className="hero-internal" style={{ backgroundImage: `url(${imgDriver})` }}>
                <div className="container" style={{ textAlign: 'left', margin: '0 auto' }}>
                    <span className="kicker" style={{ color: 'var(--primary-blue)', letterSpacing: '2px', fontWeight: '800', textTransform: 'uppercase', marginBottom: '1rem', display: 'block' }}>
                        Gente que Move o Brasil
                    </span>
                    <h1 style={{ fontSize: '4.2rem', fontWeight: '800', lineHeight: '1.1', letterSpacing: '-2px', marginBottom: '1.5rem', color: 'var(--white)' }}>
                        Construa sua Carreira na Expresso PB
                    </h1>
                    <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.85)', maxWidth: '660px', lineHeight: '1.6', margin: '0' }}>
                        Valorizamos quem está na estrada e nos centros de controle. Faça parte de uma das transportadoras que mais crescem no Norte e Nordeste com estrutura moderna e respeito às pessoas.
                    </p>
                </div>
            </div>

            {/* 2. Banco de Talentos & Cadastro Contínuo */}
            <div className="carreiras-wrapper">
                <div className="container">
                    <div className="grid-2" style={{ alignItems: 'start', gap: '4.5rem' }}>
                        
                        {/* Coluna Esquerda: Texto Institucional & Orientações de Carreira */}
                        <div>
                            <span className="kicker" style={{ color: 'var(--primary-blue)', letterSpacing: '2px', fontWeight: '800', textTransform: 'uppercase', marginBottom: '1rem', display: 'block' }}>
                                Oportunidades & Carreiras
                            </span>
                            <h2 style={{ fontSize: '2.8rem', fontWeight: '800', color: 'var(--dark-blue)', marginBottom: '1.2rem', letterSpacing: '-1px' }}>
                                Venha fazer parte de uma equipe que não para de crescer
                            </h2>
                            <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '2.5rem' }}>
                                A Expresso PB investe continuamente na modernização de sua frota e expansão de novas rotas pelo Brasil. Mantemos um banco de talentos ativo e contínuo para motoristas profissionais, parceiros agregados e especialistas operacionais.
                            </p>

                            {/* Cards de Orientação para Candidatos */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginBottom: '2.5rem' }}>
                                <div className="contato-channel-card">
                                    <div className="contato-channel-icon">
                                        <Truck weight="fill" />
                                    </div>
                                    <div className="contato-channel-info">
                                        <h4>Motoristas Carreteiros & Truck</h4>
                                        <p>Viagens interestaduais e distribuição regional com suporte 24/7 da torre de controle.</p>
                                    </div>
                                </div>

                                <div className="contato-channel-card">
                                    <div className="contato-channel-icon">
                                        <Handshake weight="fill" />
                                    </div>
                                    <div className="contato-channel-info">
                                        <h4>Transportadores Agregados</h4>
                                        <p>Rotas dedicadas com adiantamento de frete garantido e contrato contínuo de carga.</p>
                                    </div>
                                </div>

                                <div className="contato-channel-card">
                                    <div className="contato-channel-icon">
                                        <Users weight="fill" />
                                    </div>
                                    <div className="contato-channel-info">
                                        <h4>Operacional, Manutenção & Matriz</h4>
                                        <p>Vagas administrativas, mecânica pesada, telemetria satelital e inteligência de tráfego.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Alerta de Contratação Responsável */}
                            <div style={{
                                background: 'rgba(25, 163, 223, 0.08)',
                                border: '1px solid rgba(25, 163, 223, 0.25)',
                                borderRadius: '16px',
                                padding: '1.5rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem'
                            }}>
                                <CheckCircle weight="fill" size={32} color="#19A3DF" style={{ flexShrink: 0 }} />
                                <span style={{ fontSize: '0.95rem', color: 'var(--dark-blue)', fontWeight: '600', lineHeight: '1.5' }}>
                                    Processo seletivo 100% gratuito e transparente. Nosso time de RH entrará em contato diretamente pelo WhatsApp informado.
                                </span>
                            </div>
                        </div>

                        {/* Coluna Direita: Formulário de Cadastro */}
                        <div id="form-candidatura" className="quote-form-card">
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
                                    Banco de Talentos
                                </span>
                                <h3 style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--dark-blue)', letterSpacing: '-0.5px', marginBottom: '0.5rem' }}>
                                    Cadastre seu Currículo
                                </h3>
                                <p style={{ color: 'var(--text-muted)', fontSize: '1rem', margin: 0 }}>
                                    Preencha seus dados para que nossa equipe avalie suas qualificações e entre em contato.
                                </p>
                            </div>

                            {enviado ? (
                            <div style={{
                                textAlign: 'center',
                                padding: '4rem 2rem',
                                background: 'rgba(25, 163, 223, 0.05)',
                                borderRadius: '16px',
                                border: '1px dashed var(--primary-blue)'
                            }}>
                                <CheckCircle weight="fill" size={68} color="#19A3DF" style={{ marginBottom: '1.5rem' }} />
                                <h4 style={{ fontSize: '1.8rem', color: 'var(--dark-blue)', marginBottom: '0.8rem', fontWeight: '800' }}>
                                    Currículo Cadastrado com Sucesso!
                                </h4>
                                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '480px', margin: '0 auto 2rem auto', lineHeight: '1.6' }}>
                                    Nossa equipe de Recursos Humanos analisará suas informações e entrará em contato quando surgirem vagas compatíveis com a sua região.
                                </p>
                                <button 
                                    type="button" 
                                    className="btn-primary" 
                                    onClick={() => setEnviado(false)}
                                    style={{ border: 'none', cursor: 'pointer', padding: '0.8rem 1.8rem' }}
                                >
                                    Enviar Outro Currículo
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit}>
                                <div className="grid-2" style={{ gap: '1.2rem', marginBottom: '1.2rem' }}>
                                    <div>
                                        <label className="quote-input-label">Nome Completo *</label>
                                        <input 
                                            type="text" 
                                            required
                                            value={formData.nome}
                                            onChange={e => setFormData({ ...formData, nome: e.target.value })}
                                            className="quote-input-control" 
                                            placeholder="Seu nome" 
                                        />
                                    </div>
                                    <div>
                                        <label className="quote-input-label">WhatsApp com DDD *</label>
                                        <input 
                                            type="tel" 
                                            required
                                            value={formData.telefone}
                                            onChange={e => setFormData({ ...formData, telefone: e.target.value })}
                                            className="quote-input-control" 
                                            placeholder="(83) 99999-9999" 
                                        />
                                    </div>
                                </div>

                                <div className="grid-2" style={{ gap: '1.2rem', marginBottom: '1.2rem' }}>
                                    <div>
                                        <label className="quote-input-label">E-mail Profissional *</label>
                                        <input 
                                            type="email" 
                                            required
                                            value={formData.email}
                                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                                            className="quote-input-control" 
                                            placeholder="seuemail@exemplo.com" 
                                        />
                                    </div>
                                    <div>
                                        <label className="quote-input-label">Cidade e Estado onde reside *</label>
                                        <input 
                                            type="text" 
                                            required
                                            value={formData.cidadeUf}
                                            onChange={e => setFormData({ ...formData, cidadeUf: e.target.value })}
                                            className="quote-input-control" 
                                            placeholder="Ex: João Pessoa - PB" 
                                        />
                                    </div>
                                </div>

                                <div className="grid-2" style={{ gap: '1.2rem', marginBottom: '1.2rem' }}>
                                    <div>
                                        <label className="quote-input-label">Área de Interesse ou Vaga</label>
                                        <input 
                                            type="text" 
                                            value={formData.vagaInteresse}
                                            onChange={e => setFormData({ ...formData, vagaInteresse: e.target.value })}
                                            className="quote-input-control" 
                                            placeholder="Ex: Motorista Carreteiro, Torre de Controle..." 
                                        />
                                    </div>
                                    <div>
                                        <label className="quote-input-label">Categoria da CNH (se aplicável)</label>
                                        <select 
                                            value={formData.cnhCategoria}
                                            onChange={e => setFormData({ ...formData, cnhCategoria: e.target.value })}
                                            className="quote-input-control"
                                            style={{ cursor: 'pointer' }}
                                        >
                                            <option value="E">Categoria E (Carreta / Articulados)</option>
                                            <option value="D">Categoria D (Caminhão / Ônibus)</option>
                                            <option value="C">Categoria C (Veículos de Carga Médios)</option>
                                            <option value="B">Categoria B (Veículos Leves)</option>
                                            <option value="Não se aplica">Não se aplica (Área Administrativa)</option>
                                        </select>
                                    </div>
                                </div>

                                <div style={{ marginBottom: '1.2rem' }}>
                                    <label className="quote-input-label">Link do Currículo / LinkedIn (ou resumo de experiência)</label>
                                    <input 
                                        type="text" 
                                        value={formData.linkCurriculo}
                                        onChange={e => setFormData({ ...formData, linkCurriculo: e.target.value })}
                                        className="quote-input-control" 
                                        placeholder="Ex: Link do Google Drive, LinkedIn ou descreva abaixo" 
                                    />
                                </div>

                                <div style={{ marginBottom: '2rem' }}>
                                    <label className="quote-input-label">Resumo das Suas Últimas Experiências Profissionais</label>
                                    <textarea 
                                        rows="4"
                                        value={formData.experiencia}
                                        onChange={e => setFormData({ ...formData, experiencia: e.target.value })}
                                        className="quote-input-control" 
                                        style={{ minHeight: '100px', resize: 'vertical' }}
                                        placeholder="Conte um pouco sobre as empresas onde atuou, rotas que já rodou ou principais qualificações..."
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
                                    Enviar Candidatura para o RH <PaperPlaneTilt weight="bold" size={22} />
                                </button>
                            </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. Nossos Diferenciais para Colaboradores (Fundo Azul Acima do Footer) */}
            <section className="carreiras-diferenciais-section">
                <div className="container">
                    <div className="section-header text-center" style={{ marginBottom: '4rem' }}>
                        <span className="kicker" style={{ color: '#38bdf8', letterSpacing: '2px', fontWeight: '800', textTransform: 'uppercase', marginBottom: '1rem', display: 'inline-block' }}>
                            Por que a Expresso PB?
                        </span>
                        <h2 style={{ fontSize: '3rem', fontWeight: '800', color: 'var(--white)', letterSpacing: '-1px' }}>
                            Um ambiente feito para quem ama a estrada e a eficiência
                        </h2>
                    </div>

                    <div className="grid-3" style={{ gap: '2rem' }}>
                        <div className="carreiras-benefit-box">
                            <div className="carreiras-benefit-icon">
                                <Truck weight="fill" />
                            </div>
                            <div>
                                <h4>Frota Nova & Confortável</h4>
                                <p>Caminhões com cabine leito, ar-condicionado, telemetria e manutenção preventiva rigorosa antes de cada viagem.</p>
                            </div>
                        </div>

                        <div className="carreiras-benefit-box">
                            <div className="carreiras-benefit-icon">
                                <CurrencyCircleDollar weight="fill" />
                            </div>
                            <div>
                                <h4>Pagamento Rigoroso em Dia</h4>
                                <p>Salários, diárias e adiantamentos de frete quitados com máxima pontualidade e transparência fiscal.</p>
                            </div>
                        </div>

                        <div className="carreiras-benefit-box">
                            <div className="carreiras-benefit-icon">
                                <ShieldCheck weight="fill" />
                            </div>
                            <div>
                                <h4>Segurança em Primeiro Lugar</h4>
                                <p>Gerenciamento de risco 24 horas por dia, respeito rigoroso à Lei do Motorista e pontos de apoio seguros homologados.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default TrabalheConosco;
