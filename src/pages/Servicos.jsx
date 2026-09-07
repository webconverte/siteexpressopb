import React from 'react';
import { Link } from 'react-router-dom';
import { 
    ShieldCheck, ArrowsOut, Handshake, Truck, MapPin, 
    ChartLine, VideoCamera, CheckCircle, ArrowRight 
} from '@phosphor-icons/react';
import imgTablet from '../assets/trait_tablet.jpg';
import imgDriver from '../assets/trait_driver.jpg';

const Servicos = () => {
    return (
        <>
            {/* 1. Hero Internal */}
            <div className="hero-internal" style={{backgroundImage: `url(${imgDriver})`}}>
                <div className="container" style={{textAlign: 'left', margin: '0 auto'}}>
                    <span className="kicker" style={{color: 'var(--primary-blue)', letterSpacing: '2px', fontWeight: '800', textTransform: 'uppercase', marginBottom: '1rem', display: 'block'}}>Nossos Serviços e Frota</span>
                    <h1 style={{fontSize: '4.5rem', fontWeight: '800', lineHeight: '1.1', letterSpacing: '-2px', marginBottom: '1.5rem', color: 'var(--white)'}}>Operações Dedicadas B2B</h1>
                    <p style={{fontSize: '1.3rem', color: 'rgba(255,255,255,0.85)', maxWidth: '600px', lineHeight: '1.6', margin: '0'}}>Alta performance, controle total e frota dimensionada sob medida para garantir a máxima eficiência do seu negócio.</p>
                </div>
            </div>
            
            {/* 2. Pilares de Serviço */}
            <section style={{padding: '6rem 0'}}>
                <div className="container">
                    <div className="grid-3" style={{alignItems: 'stretch'}}>
                        <div className="feature-card" style={{height: '100%', padding: '3.5rem 2.5rem'}}>
                            <ShieldCheck weight="fill" className="watermark-icon" />
                            <div className="feature-icon">
                                <ShieldCheck weight="fill" />
                            </div>
                            <h3 className="feature-title">Segurança Máxima</h3>
                            <ul className="values-list-standard" style={{marginTop: '2rem'}}>
                                <li><CheckCircle weight="fill" /> <span>Monitoramento 24/7 via telemetria avançada.</span></li>
                                <li><CheckCircle weight="fill" /> <span>Câmeras embarcadas preventivas.</span></li>
                                <li><CheckCircle weight="fill" /> <span>Manutenção preditiva rigorosa.</span></li>
                                <li><CheckCircle weight="fill" /> <span>Seguro de carga abrangente.</span></li>
                            </ul>
                        </div>
                        
                        <div className="feature-card" style={{height: '100%', padding: '3.5rem 2.5rem'}}>
                            <ArrowsOut weight="fill" className="watermark-icon" />
                            <div className="feature-icon">
                                <ArrowsOut weight="fill" />
                            </div>
                            <h3 className="feature-title">Flexibilidade Absoluta</h3>
                            <ul className="values-list-standard" style={{marginTop: '2rem'}}>
                                <li><CheckCircle weight="fill" /> <span>Veículos leves até carretas pesadas.</span></li>
                                <li><CheckCircle weight="fill" /> <span>Capacidade bruta para até 74 toneladas.</span></li>
                                <li><CheckCircle weight="fill" /> <span>Atendimento emergencial 7 dias por semana.</span></li>
                                <li><CheckCircle weight="fill" /> <span>Rotas customizadas e sob demanda.</span></li>
                            </ul>
                        </div>

                        <div className="feature-card" style={{height: '100%', padding: '3.5rem 2.5rem'}}>
                            <Handshake weight="fill" className="watermark-icon" />
                            <div className="feature-icon">
                                <Handshake weight="fill" />
                            </div>
                            <h3 className="feature-title">Frota Dedicada</h3>
                            <ul className="values-list-standard" style={{marginTop: '2rem'}}>
                                <li><CheckCircle weight="fill" /> <span>Veículos exclusivos formatados por contrato.</span></li>
                                <li><CheckCircle weight="fill" /> <span>Adesivação e identidade visual do cliente.</span></li>
                                <li><CheckCircle weight="fill" /> <span>Ausência de cobrança extra de pernoite.</span></li>
                                <li><CheckCircle weight="fill" /> <span>Gestão de frota 100% sob nossa responsabilidade.</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. A Frota */}
            <section style={{padding: '8rem 0', background: 'var(--dark-blue)', color: 'var(--white)'}}>
                <div className="container">
                    <div style={{textAlign: 'center', marginBottom: '5rem'}}>
                        <span className="kicker" style={{color: 'var(--primary-blue)', letterSpacing: '2px', fontWeight: '800', textTransform: 'uppercase', marginBottom: '1rem', display: 'block'}}>Ativos de Alta Performance</span>
                        <h2 style={{fontSize: '3.5rem', fontWeight: '800', marginBottom: '1rem', color: 'var(--white)'}}>Nossa Frota</h2>
                        <p style={{fontSize: '1.2rem', color: 'rgba(255,255,255,0.7)', maxWidth: '600px', margin: '0 auto'}}>Equipamentos novos, com manutenção em dia e prontos para qualquer desafio logístico rodoviário.</p>
                    </div>

                    <div className="grid-2" style={{gap: '2rem'}}>
                        <div style={{background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', padding: '2.5rem', display: 'flex', alignItems: 'center', gap: '2rem', transition: 'background 0.3s'}}>
                            <div style={{background: 'var(--primary-blue)', width: '80px', height: '80px', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
                                <Truck weight="fill" style={{fontSize: '3rem', color: 'var(--white)'}} />
                            </div>
                            <div>
                                <h4 style={{fontSize: '1.7rem', marginBottom: '0.4rem', color: 'var(--white)'}}>Truck (2 eixos)</h4>
                                <p style={{margin: 0, color: 'rgba(255,255,255,0.7)', lineHeight: 1.5}}>Até 14 toneladas. <br/>A máquina perfeita para cargas médias, transporte urbano e rotas intermunicipais ágeis.</p>
                            </div>
                        </div>

                        <div style={{background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', padding: '2.5rem', display: 'flex', alignItems: 'center', gap: '2rem'}}>
                            <div style={{background: 'var(--primary-blue)', width: '80px', height: '80px', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
                                <Truck weight="fill" style={{fontSize: '3rem', color: 'var(--white)'}} />
                            </div>
                            <div>
                                <h4 style={{fontSize: '1.7rem', marginBottom: '0.4rem', color: 'var(--white)'}}>Carreta (3 eixos)</h4>
                                <p style={{margin: 0, color: 'rgba(255,255,255,0.7)', lineHeight: 1.5}}>Até 30 toneladas. <br/>O padrão-ouro da estrada. A solução mais versátil para escoamento de longas distâncias.</p>
                            </div>
                        </div>

                        <div style={{background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', padding: '2.5rem', display: 'flex', alignItems: 'center', gap: '2rem'}}>
                            <div style={{background: 'var(--primary-blue)', width: '80px', height: '80px', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
                                <Truck weight="fill" style={{fontSize: '3rem', color: 'var(--white)'}} />
                            </div>
                            <div>
                                <h4 style={{fontSize: '1.7rem', marginBottom: '0.4rem', color: 'var(--white)'}}>Bitrem (5 eixos)</h4>
                                <p style={{margin: 0, color: 'rgba(255,255,255,0.7)', lineHeight: 1.5}}>Até 45 toneladas. <br/>Escalabilidade e alto volume, projetado para transporte de carga industrial intensiva.</p>
                            </div>
                        </div>

                        <div style={{background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', padding: '2.5rem', display: 'flex', alignItems: 'center', gap: '2rem'}}>
                            <div style={{background: 'var(--primary-blue)', width: '80px', height: '80px', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0}}>
                                <Truck weight="fill" style={{fontSize: '3rem', color: 'var(--white)'}} />
                            </div>
                            <div>
                                <h4 style={{fontSize: '1.7rem', marginBottom: '0.4rem', color: 'var(--white)'}}>Rodotrem (7 eixos)</h4>
                                <p style={{margin: 0, color: 'rgba(255,255,255,0.7)', lineHeight: 1.5}}>Até 74 toneladas. <br/>A força bruta das estradas. Operações florestais, mineração e agronegócio em grande escala.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Como Funciona */}
            <section style={{padding: '8rem 0'}}>
                <div className="container grid-2" style={{alignItems: 'stretch', gap: '5rem'}}>
                    <div>
                        <h2 style={{fontSize: '3rem', fontWeight: '800', marginBottom: '3.5rem', letterSpacing: '-1px'}}>Como orquestramos o transporte dedicado</h2>
                        <div className="stepper-modern">
                            <div className="stepper-item">
                                <div className="step-badge">1</div>
                                <div className="step-content">
                                    <h4>Recebimento e Integração</h4>
                                    <p>Integração sistêmica de dados e recebimento contínuo das ordens de embarque diárias.</p>
                                </div>
                            </div>
                            <div className="stepper-item">
                                <div className="step-badge">2</div>
                                <div className="step-content">
                                    <h4>Roteirização Inteligente</h4>
                                    <p>Análise de malha viária, cálculo logístico e desenho da rota mais eficiente via sistema.</p>
                                </div>
                            </div>
                            <div className="stepper-item">
                                <div className="step-badge">3</div>
                                <div className="step-content">
                                    <h4>Execução e Acompanhamento</h4>
                                    <p>Disparo automático para o tablet do motorista com rastreamento ativo em tempo real.</p>
                                </div>
                            </div>
                            <div className="stepper-item">
                                <div className="step-badge">4</div>
                                <div className="step-content">
                                    <h4>Entrega Comprovada</h4>
                                    <p>Canhoto assinado digitalmente, confirmação de chegada imediata e emissão de relatórios de SLA.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <img src={imgTablet} alt="Operação Logística" style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '32px', boxShadow: '0 25px 50px rgba(0,3,39,0.1)', minHeight: '500px'}} />
                    </div>
                </div>
            </section>

            {/* 5. Controle Total */}
            <section style={{padding: '6rem 0 10rem', background: '#f4f6f9'}}>
                <div className="container">
                    <div style={{textAlign: 'center', marginBottom: '4rem'}}>
                        <h2 style={{fontSize: '3rem', fontWeight: '800', color: 'var(--dark-blue)'}}>Controle absoluto da carga</h2>
                        <p style={{fontSize: '1.25rem', color: 'var(--text-muted)'}}>Tecnologia de ponta embarcada em cada veículo para garantir tranquilidade máxima.</p>
                    </div>
                    
                    <div className="grid-3" style={{alignItems: 'stretch'}}>
                        {/* Widget 1: GPS */}
                        <div className="dashboard-widget">
                            <div className="widget-glass-effect"></div>
                            <div className="widget-header">
                                <MapPin weight="fill" className="widget-icon" />
                                <span className="widget-status"><span className="pulse-dot"></span> SINAL ATIVO</span>
                            </div>
                            <h3 className="widget-title">GPS em Tempo Real</h3>
                            <p>Monitore a localização exata da sua mercadoria a qualquer momento. Precisão militar na previsão de chegadas.</p>
                            <div className="widget-footer">
                                <div className="widget-stat">
                                    <span className="stat-value">99.9%</span>
                                    <span className="stat-label">Precisão</span>
                                </div>
                                <div className="widget-stat">
                                    <span className="stat-value">2s</span>
                                    <span className="stat-label">Ping Latency</span>
                                </div>
                            </div>
                        </div>

                        {/* Widget 2: Telemetria */}
                        <div className="dashboard-widget">
                            <div className="widget-glass-effect"></div>
                            <div className="widget-header">
                                <ChartLine weight="fill" className="widget-icon" />
                                <span className="widget-status"><span className="pulse-dot"></span> COLETANDO</span>
                            </div>
                            <h3 className="widget-title">Telemetria Avançada</h3>
                            <p>Acompanhamento analítico de direção, aferição de consumo de diesel e diagnóstico preditivo do motor.</p>
                            <div className="widget-footer">
                                <div className="widget-stat">
                                    <span className="stat-value">-15%</span>
                                    <span className="stat-label">Custo Combustível</span>
                                </div>
                                <div className="widget-stat">
                                    <span className="stat-value">0</span>
                                    <span className="stat-label">Falhas Críticas</span>
                                </div>
                            </div>
                        </div>

                        {/* Widget 3: Câmeras */}
                        <div className="dashboard-widget">
                            <div className="widget-glass-effect"></div>
                            <div className="widget-header">
                                <VideoCamera weight="fill" className="widget-icon" />
                                <span className="widget-status"><span className="pulse-dot" style={{background: '#ef4444'}}></span> GRAVANDO (REC)</span>
                            </div>
                            <h3 className="widget-title">Câmeras Inteligentes</h3>
                            <p>Duplo monitoramento por IA (cabine e estrada) que age contra fadiga e distração, prevenindo acidentes.</p>
                            <div className="widget-footer">
                                <div className="widget-stat">
                                    <span className="stat-value">4K</span>
                                    <span className="stat-label">Resolução</span>
                                </div>
                                <div className="widget-stat">
                                    <span className="stat-value">360°</span>
                                    <span className="stat-label">Visão Periférica</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. CTA (Injetado) */}
            <section className="sobre-cta-section">
                <div className="container">
                    <div className="mid-cta-box">
                        <h3>Sua empresa precisa de um parceiro logístico de alta performance?</h3>
                        <p>Nossos especialistas estão prontos para desenhar a melhor malha de transporte para o seu negócio, reduzindo custos e otimizando prazos operacionais.</p>
                        <Link to="/contato" className="btn-primary" style={{display: 'inline-flex', padding: '1rem 2rem', gap: '0.8rem', alignItems: 'center'}}>
                            Falar com um Especialista <ArrowRight weight="bold" />
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
};
export default Servicos;
