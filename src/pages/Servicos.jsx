import React from 'react';
import { Link } from 'react-router-dom';
import { 
    ShieldCheck, ArrowsOut, Handshake, Truck, MapPin, 
    ChartLine, VideoCamera, CheckCircle, ArrowRight 
} from '@phosphor-icons/react';
import imgTablet from '../assets/trait_tablet.jpg';
import imgDriver from '../assets/trait_driver.jpg';
import imgHighway from '../assets/trait_highway.jpg';
import imgHub from '../assets/trait_hub.jpg';

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
            <section className="servicos-pilares-section">
                <div className="container">
                    <div className="grid-3 mobile-carousel" style={{alignItems: 'stretch'}}>
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
            <section className="servicos-frota-section">
                <div className="container">
                    <div style={{textAlign: 'center', marginBottom: '5rem'}}>
                        <span className="kicker" style={{color: 'var(--primary-blue)', letterSpacing: '2px', fontWeight: '800', textTransform: 'uppercase', marginBottom: '1rem', display: 'block'}}>Ativos de Alta Performance</span>
                        <h2 style={{fontSize: '3.5rem', fontWeight: '800', marginBottom: '1rem', color: 'var(--white)'}}>Nossa Frota</h2>
                        <p style={{fontSize: '1.2rem', color: 'rgba(255,255,255,0.7)', maxWidth: '600px', margin: '0 auto'}}>Equipamentos novos, com manutenção em dia e prontos para qualquer desafio logístico rodoviário.</p>
                    </div>
                    <div className="frota-grid mobile-carousel">
                        {/* 1. Truck (2 eixos) */}
                        <div className="frota-card">
                            <div className="frota-icon-box">
                                <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    {/* Cabine curta e baú rígido unificado */}
                                    <rect x="6" y="20" width="34" height="24" rx="3" fill="#FFFFFF" />
                                    <path d="M40 25H52C53.5 25 55 26.5 56 28.5L59 34.5C59.6 35.7 60 37 60 38.5V44H40V25Z" fill="#FFFFFF" />
                                    <path d="M43 28H51L54 34H43V28Z" fill="#19A3DF" />
                                    {/* 2 Eixos: 1 na frente, 1 atrás */}
                                    <circle cx="16" cy="46" r="5.5" fill="#000327" stroke="#FFFFFF" strokeWidth="2.5" />
                                    <circle cx="50" cy="46" r="5.5" fill="#000327" stroke="#FFFFFF" strokeWidth="2.5" />
                                    <rect x="22" y="44" width="22" height="3" fill="#FFFFFF" opacity="0.6" />
                                </svg>
                            </div>
                            <div className="frota-card-body">
                                <div className="frota-card-header">
                                    <h4>Truck (2 eixos)</h4>
                                    <span className="frota-tag">Até 14 toneladas</span>
                                </div>
                                <p className="frota-desc">A máquina perfeita para cargas médias, transporte urbano ágil e conexões intermunicipais dinâmicas.</p>
                            </div>
                        </div>

                        {/* 2. Carreta (3 eixos) */}
                        <div className="frota-card">
                            <div className="frota-icon-box">
                                <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    {/* Cavalo mecânico separado */}
                                    <path d="M46 25H53C54.5 25 55.5 26.5 56.5 28.5L59.5 34.5C60.1 35.7 60.5 37 60.5 38.5V44H44V31C44 27.7 44.5 25 46 25Z" fill="#FFFFFF" />
                                    <path d="M47 28H52L55 34H47V28Z" fill="#19A3DF" />
                                    <rect x="42" y="38" width="5" height="4" fill="#FFFFFF" opacity="0.8" />
                                    {/* Semirreboque longo */}
                                    <rect x="4" y="19" width="37" height="23" rx="3" fill="#FFFFFF" />
                                    {/* 3 Eixos traseiros juntos + 1 eixo dianteiro */}
                                    <circle cx="11" cy="46" r="4.5" fill="#000327" stroke="#FFFFFF" strokeWidth="2" />
                                    <circle cx="21" cy="46" r="4.5" fill="#000327" stroke="#FFFFFF" strokeWidth="2" />
                                    <circle cx="31" cy="46" r="4.5" fill="#000327" stroke="#FFFFFF" strokeWidth="2" />
                                    <circle cx="53" cy="46" r="5" fill="#000327" stroke="#FFFFFF" strokeWidth="2.5" />
                                </svg>
                            </div>
                            <div className="frota-card-body">
                                <div className="frota-card-header">
                                    <h4>Carreta (3 eixos)</h4>
                                    <span className="frota-tag">Até 30 toneladas</span>
                                </div>
                                <p className="frota-desc">O padrão-ouro da estrada. A solução mais versátil para escoamento de longas distâncias entre estados.</p>
                            </div>
                        </div>

                        {/* 3. Bitrem (5 eixos) */}
                        <div className="frota-card">
                            <div className="frota-icon-box">
                                <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    {/* 2 Semirreboques articulados acoplados */}
                                    <rect x="2" y="21" width="18" height="20" rx="2" fill="#FFFFFF" />
                                    <rect x="22" y="21" width="20" height="20" rx="2" fill="#FFFFFF" />
                                    {/* Cavalo mecânico */}
                                    <path d="M46 25H52C53.5 25 54.5 26.5 55.5 28.5L58.5 34.5C59.1 35.7 59.5 37 59.5 38.5V44H44V29C44 26.8 44.8 25 46 25Z" fill="#FFFFFF" />
                                    <path d="M47 28H51L54 34H47V28Z" fill="#19A3DF" />
                                    {/* Eixos do Bitrem (2 traseiros + 2 centrais + 1 dianteiro) */}
                                    <circle cx="7" cy="45" r="4" fill="#000327" stroke="#FFFFFF" strokeWidth="2" />
                                    <circle cx="15" cy="45" r="4" fill="#000327" stroke="#FFFFFF" strokeWidth="2" />
                                    <circle cx="27" cy="45" r="4" fill="#000327" stroke="#FFFFFF" strokeWidth="2" />
                                    <circle cx="37" cy="45" r="4" fill="#000327" stroke="#FFFFFF" strokeWidth="2" />
                                    <circle cx="52" cy="45" r="4.5" fill="#000327" stroke="#FFFFFF" strokeWidth="2" />
                                </svg>
                            </div>
                            <div className="frota-card-body">
                                <div className="frota-card-header">
                                    <h4>Bitrem (5 eixos)</h4>
                                    <span className="frota-tag">Até 45 toneladas</span>
                                </div>
                                <p className="frota-desc">Escalabilidade e alto volume cúbico, projetado para transporte pesado contínuo de cargas industriais.</p>
                            </div>
                        </div>

                        {/* 4. Rodotrem (7 eixos) */}
                        <div className="frota-card">
                            <div className="frota-icon-box">
                                <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    {/* Conjunto longo com Dolly intermediário */}
                                    <rect x="2" y="21" width="17" height="20" rx="2" fill="#FFFFFF" />
                                    <rect x="21" y="24" width="4" height="17" rx="1" fill="#FFFFFF" opacity="0.6" />
                                    <rect x="27" y="21" width="18" height="20" rx="2" fill="#FFFFFF" />
                                    {/* Cavalo trucado */}
                                    <path d="M48 24H54C55.5 24 56.5 25.5 57.5 27.5L60.5 33.5C61.1 34.7 61.5 36 61.5 37.5V43H46V28C46 25.8 46.8 24 48 24Z" fill="#FFFFFF" />
                                    <path d="M49 27H53L56 33H49V27Z" fill="#19A3DF" />
                                    {/* 7 Eixos distribuídos */}
                                    <circle cx="6" cy="45" r="3.5" fill="#000327" stroke="#FFFFFF" strokeWidth="1.8" />
                                    <circle cx="14" cy="45" r="3.5" fill="#000327" stroke="#FFFFFF" strokeWidth="1.8" />
                                    <circle cx="23" cy="45" r="3.5" fill="#000327" stroke="#FFFFFF" strokeWidth="1.8" />
                                    <circle cx="31" cy="45" r="3.5" fill="#000327" stroke="#FFFFFF" strokeWidth="1.8" />
                                    <circle cx="39" cy="45" r="3.5" fill="#000327" stroke="#FFFFFF" strokeWidth="1.8" />
                                    <circle cx="47" cy="45" r="3.5" fill="#000327" stroke="#FFFFFF" strokeWidth="1.8" />
                                    <circle cx="55" cy="45" r="4" fill="#000327" stroke="#FFFFFF" strokeWidth="2" />
                                </svg>
                            </div>
                            <div className="frota-card-body">
                                <div className="frota-card-header">
                                    <h4>Rodotrem (7 eixos)</h4>
                                    <span className="frota-tag">Até 74 toneladas</span>
                                </div>
                                <p className="frota-desc">A força bruta das estradas. Operações de alta intensidade, mineração e agronegócio em escala nacional.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Como Funciona */}
            <section className="servicos-processo-section">
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
            <section className="servicos-tech-section">
                <div className="container">
                    <div style={{textAlign: 'center', marginBottom: '4rem'}}>
                        <span className="kicker" style={{color: 'var(--primary-blue)', letterSpacing: '2px', fontWeight: '800', textTransform: 'uppercase', marginBottom: '0.8rem', display: 'inline-block'}}>Tecnologia Embarcada</span>
                        <h2 style={{fontSize: '3rem', fontWeight: '800', color: 'var(--dark-blue)'}}>Controle absoluto da carga</h2>
                        <p style={{fontSize: '1.25rem', color: 'var(--text-muted)'}}>Tecnologia de ponta embarcada em cada veículo para garantir tranquilidade máxima.</p>
                    </div>
                    <div className="grid-3 mobile-carousel" style={{alignItems: 'stretch'}}>
                        {/* Card 1: GPS */}
                        <div className="tech-feature-card">
                            <div className="tech-card-img-box">
                                <img src={imgHighway} alt="GPS em Tempo Real" className="tech-card-img" />
                                <span className="tech-card-pill">
                                    <span className="pulse-dot"></span> SINAL ATIVO
                                </span>
                            </div>
                            <div className="tech-card-content">
                                <h3>GPS em Tempo Real</h3>
                                <p>Monitore a localização exata da sua mercadoria a qualquer momento. Precisão militar na previsão de chegadas.</p>
                                <div className="tech-card-metrics">
                                    <div className="tech-metric">
                                        <span className="metric-val">99.9%</span>
                                        <span className="metric-lbl">Precisão</span>
                                    </div>
                                    <div className="tech-metric">
                                        <span className="metric-val">2s</span>
                                        <span className="metric-lbl">Ping Latency</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Card 2: Telemetria */}
                        <div className="tech-feature-card">
                            <div className="tech-card-img-box">
                                <img src={imgDriver} alt="Telemetria Avançada" className="tech-card-img" />
                                <span className="tech-card-pill">
                                    <span className="pulse-dot"></span> COLETANDO
                                </span>
                            </div>
                            <div className="tech-card-content">
                                <h3>Telemetria Avançada</h3>
                                <p>Acompanhamento analítico de direção, aferição de consumo de diesel e diagnóstico preditivo do motor.</p>
                                <div className="tech-card-metrics">
                                    <div className="tech-metric">
                                        <span className="metric-val">-15%</span>
                                        <span className="metric-lbl">Custo Combustível</span>
                                    </div>
                                    <div className="tech-metric">
                                        <span className="metric-val">0</span>
                                        <span className="metric-lbl">Falhas Críticas</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Card 3: Câmeras */}
                        <div className="tech-feature-card">
                            <div className="tech-card-img-box">
                                <img src={imgTablet} alt="Câmeras Inteligentes" className="tech-card-img" />
                                <span className="tech-card-pill">
                                    <span className="pulse-dot" style={{background: '#ef4444'}}></span> GRAVANDO (REC)
                                </span>
                            </div>
                            <div className="tech-card-content">
                                <h3>Câmeras Inteligentes</h3>
                                <p>Duplo monitoramento por IA (cabine e estrada) que age contra fadiga e distração, prevenindo acidentes.</p>
                                <div className="tech-card-metrics">
                                    <div className="tech-metric">
                                        <span className="metric-val">4K</span>
                                        <span className="metric-lbl">Resolução</span>
                                    </div>
                                    <div className="tech-metric">
                                        <span className="metric-val">360°</span>
                                        <span className="metric-lbl">Visão Periférica</span>
                                    </div>
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
