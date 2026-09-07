import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Target, Eye, Diamond, ArrowRight, CheckCircle, ShieldCheck, Clock, ShieldStar, Lightbulb, Handshake } from '@phosphor-icons/react';
import imgDriver from '../assets/trait_driver.jpg';
import imgTablet from '../assets/trait_tablet.jpg';
import imgHighway from '../assets/trait_highway.jpg';

const Sobre = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="sobre-page">
            <div className="hero-internal">
                <div className="container" style={{textAlign: 'left', margin: '0 auto'}}>
                    <span className="kicker" style={{color: 'var(--primary-blue)', letterSpacing: '2px', fontWeight: '800', textTransform: 'uppercase', marginBottom: '1rem', display: 'block'}}>Conheça a Empresa</span>
                    <h1 style={{fontSize: '4.5rem', fontWeight: '800', lineHeight: '1.1', letterSpacing: '-2px', marginBottom: '1.5rem', color: 'var(--white)'}}>Movendo o Brasil com Excelência</h1>
                    <p style={{fontSize: '1.3rem', color: 'rgba(255,255,255,0.85)', maxWidth: '600px', lineHeight: '1.6', margin: '0'}}>Mais de uma década de inteligência logística, frota dedicada e performance impecável no transporte rodoviário B2B.</p>
                </div>
            </div>
            
            {/* Missão, Visão e Valores - Bento Grid */}
            <section className="bento-section">
                <div className="container">
                    <div className="section-header text-center">
                        <span className="kicker">Nossos Pilares</span>
                        <h2>O que nos move todos os dias</h2>
                    </div>
                    
                    <div className="standard-pillars-wrapper" style={{marginTop: '4rem'}}>
                        <div className="grid-2" style={{alignItems: 'stretch', gap: '2rem'}}>
                            
                            {/* Lado Esquerdo: Valores (1 Card Gigante) */}
                            <div className="feature-card" style={{height: '100%', padding: '3.5rem 3rem'}}>
                                <Diamond weight="fill" className="watermark-icon" />
                                <div className="feature-icon">
                                    <Diamond weight="fill" />
                                </div>
                                <h3 className="feature-title">Valores Intocáveis</h3>
                                <ul className="values-list-standard" style={{marginTop: '2rem'}}>
                                    <li>
                                        <CheckCircle weight="fill" />
                                        <div>
                                            <strong>Segurança Absoluta</strong>
                                            <span>Rigor total nas operações logísticas.</span>
                                        </div>
                                    </li>
                                    <li>
                                        <CheckCircle weight="fill" />
                                        <div>
                                            <strong>Prazos Inegociáveis</strong>
                                            <span>Compromisso pontual com cada entrega.</span>
                                        </div>
                                    </li>
                                    <li>
                                        <CheckCircle weight="fill" />
                                        <div>
                                            <strong>Transparência Total</strong>
                                            <span>Visibilidade completa para o cliente B2B.</span>
                                        </div>
                                    </li>
                                    <li>
                                        <CheckCircle weight="fill" />
                                        <div>
                                            <strong>Inovação Tecnológica</strong>
                                            <span>Sistemas avançados e telemetria.</span>
                                        </div>
                                    </li>
                                    <li>
                                        <CheckCircle weight="fill" />
                                        <div>
                                            <strong>Parcerias Éticas</strong>
                                            <span>Relações sólidas e de longo prazo.</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            {/* Lado Direito: Missão e Visão (2 Cards Empilhados) */}
                            <div style={{display: 'flex', flexDirection: 'column', gap: '2rem'}}>
                                <div className="feature-card" style={{padding: '3.5rem 3rem', flexGrow: 1}}>
                                    <Target weight="fill" className="watermark-icon" />
                                    <div className="feature-icon">
                                        <Target weight="fill" />
                                    </div>
                                    <h3 className="feature-title">Nossa Missão</h3>
                                    <p style={{marginBottom: 0}}>Oferecer soluções logísticas dedicadas e seguras, garantindo agilidade e confiabilidade. Comprometemo-nos com a excelência para que nossos clientes possam focar no seu core business.</p>
                                </div>

                                <div className="feature-card" style={{padding: '3.5rem 3rem', flexGrow: 1}}>
                                    <Eye weight="fill" className="watermark-icon" />
                                    <div className="feature-icon">
                                        <Eye weight="fill" />
                                    </div>
                                    <h3 className="feature-title">Nossa Visão</h3>
                                    <p style={{marginBottom: 0}}>Ser a maior referência em transporte dedicado no Brasil, expandindo nossa presença nacional com tecnologia embarcada e o mais alto nível de satisfação B2B.</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            {/* Imagem Cinematográfica */}
            <section className="cinematic-break" style={{backgroundImage: `url(${imgDriver})`}}>
                <div className="cinematic-overlay"></div>
                <div className="container cinematic-content">
                    <h2>Frota própria e motoristas de elite</h2>
                    <p>Não terceirizamos a nossa responsabilidade. Nossa operação é 100% controlada do embarque ao destino final, garantindo a integridade absoluta da sua carga.</p>
                </div>
            </section>

            {/* Roadmap de Crescimento */}
            <section className="bg-light roadmap-section">
                <div className="container">
                    <div className="section-header text-center">
                        <span className="kicker">História de Crescimento</span>
                        <h2>Uma década de evolução logística</h2>
                    </div>
                    
                    <div className="roadmap">
                        <div className="roadmap-line"></div>
                        <div className="roadmap-item right">
                            <span className="watermark-year">2015</span>
                            <div className="roadmap-content">
                                <h4>O Início da Jornada</h4>
                                <p>Fundação da matriz na Paraíba, com foco inicial no transporte de cargas pesadas e equipamentos industriais para a região Nordeste.</p>
                            </div>
                        </div>
                        <div className="roadmap-item left">
                            <span className="watermark-year">2018</span>
                            <div className="roadmap-content">
                                <h4>Parcerias Estratégicas</h4>
                                <p>Fechamento de grandes contratos com as maiores indústrias de bens de consumo, estabelecendo rotas expressas interestaduais.</p>
                            </div>
                        </div>
                        <div className="roadmap-item right">
                            <span className="watermark-year">2020</span>
                            <div className="roadmap-content">
                                <h4>Expansão Nacional</h4>
                                <p>Atuação consolidada em todo o Nordeste e abertura forte de rotas para as regiões Norte e Sudeste, dobrando a capacidade da frota.</p>
                            </div>
                        </div>
                        <div className="roadmap-item left">
                            <span className="watermark-year">2026</span>
                            <div className="roadmap-content">
                                <h4>Alta Tecnologia e Telemetria</h4>
                                <p>Adoção de sistemas de rastreamento de última geração e câmeras embarcadas, garantindo 100% de previsibilidade nas rotas.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Final */}
            <section className="sobre-cta-section">
                <div className="container">
                    <div className="mid-cta-box">
                        <h3>Sua empresa precisa de um parceiro logístico de alta performance?</h3>
                        <p>Nossos especialistas estão prontos para desenhar a melhor malha de transporte para o seu negócio, reduzindo custos e otimizando prazos.</p>
                        <Link to="/contato" className="btn-primary">
                            Falar com um Especialista <ArrowRight weight="bold" />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};
export default Sobre;
