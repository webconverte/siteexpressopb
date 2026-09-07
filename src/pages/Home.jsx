import React from 'react';
import { Link } from 'react-router-dom';
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import brazilTopoJson from "../assets/brazil.json";

import { MapPin, ShieldCheck, Truck, Buildings, Factory, Package, Barcode, Headset, Crosshair, ArrowRight, CheckCircle, MapPinLine, VideoCamera } from '@phosphor-icons/react';
import imgHub from '../assets/trait_hub.jpg';
import imgHighway from '../assets/trait_highway.jpg';
import imgDriver from '../assets/trait_driver.jpg';
import imgTablet from '../assets/trait_tablet.jpg';


const Home = () => {
    return (
        <>
            <section className="hero">
                <div className="container">
                    <h1>Soluções Logísticas com Transparência</h1>
                    <p>Atuamos em todo o território nacional, oferecendo serviços seguros e confiáveis com frota própria e tecnologia avançada para rastreamento de cargas.</p>
                    <div className="hero-btns">
                        <Link to="/contato" className="btn-primary">Solicitar Cotação</Link>
                        <Link to="/servicos" className="btn-outline">Nossas Soluções</Link>
                    </div>
                </div>
            </section>

            <section className="highlights-section">
                <div className="container">
                    <div className="grid-3">
                        <Link to="/servicos" className="feature-card">
                            <Truck weight="fill" className="watermark-icon" />
                            <div className="feature-icon">
                                <Truck weight="fill" />
                            </div>
                            <h3 className="feature-title">Frota Própria</h3>
                            <p>Veículos modernos, próprios e agregados, rastreados via satélite para garantir máxima segurança na sua entrega.</p>
                            <span className="feature-link">Conheça a Frota <ArrowRight weight="bold" /></span>
                        </Link>
                        
                        <Link to="/atuacao" className="feature-card">
                            <MapPinLine weight="fill" className="watermark-icon" />
                            <div className="feature-icon">
                                <MapPinLine weight="fill" />
                            </div>
                            <h3 className="feature-title">Atuação Nacional</h3>
                            <p>Especialistas em longas distâncias, com forte presença e foco de alta performance nas regiões Norte e Nordeste.</p>
                            <span className="feature-link">Ver Filiais <ArrowRight weight="bold" /></span>
                        </Link>

                        <Link to="/servicos" className="feature-card">
                            <Truck weight="fill" className="watermark-icon" />
                            <div className="feature-icon">
                                <VideoCamera weight="fill" />
                            </div>
                            <h3 className="feature-title">Controle 24/7</h3>
                            <p>Tecnologia de ponta embarcada. Telemetria avançada, GPS em tempo real e câmeras de segurança na cabine.</p>
                            <span className="feature-link">Nossa Tecnologia <ArrowRight weight="bold" /></span>
                        </Link>
                    </div>
                </div>
            </section>

            <section className="bg-light sobre-section">
                <div className="container grid-2" style={{alignItems: 'center', gap: '5rem'}}>
                    <div className="image-wrapper">
                        <img src={imgDriver} alt="Frota Expresso PB" className="img-fluid" />
                    </div>
                    <div className="sobre-content">
                        <span className="kicker">Sobre a Empresa</span>
                        <h2>Inovação e eficiência no transporte rodoviário</h2>
                        <p>Fundada em 2015, a Expresso PB Logística é especializada em soluções inovadoras e eficientes para o transporte rodoviário.</p>
                        <p>Nossa inteligência logística prioriza a agilidade: operamos com coleta e entrega direta (ponto a ponto), sem paradas em centros de distribuição, o que reduz drasticamente os prazos e elimina riscos de avarias.</p>
                        <Link to="/sobre" className="btn-primary" style={{marginTop: '1.5rem'}}>
                            <i className="ph-bold ph-arrow-right"></i> Conheça nossa História
                        </Link>
                    </div>
                </div>
            </section>

            {/* Nossas Soluções */}
            <section className="solucoes-section">
                <div className="container">
                    <div className="section-header text-center">
                        <span className="kicker">Especialidades</span>
                        <h2>Nossas Soluções Logísticas</h2>
                        <p className="section-sub">Atendemos os mais exigentes setores da economia com veículos dedicados e equipe altamente qualificada.</p>
                    </div>
                    <div className="grid-3">
                        <div className="solucao-card">
                            <div className="solucao-img-box">
                                <img src={imgHighway} alt="Construção Civil" className="solucao-img" />
                            </div>
                            <div className="solucao-content">
                                <h3>Construção Civil e Pesados</h3>
                                <p>Transporte especializado para indústrias, cerâmicas e equipamentos de grande porte com total segurança.</p>
                            </div>
                        </div>
                        <div className="solucao-card">
                            <div className="solucao-img-box">
                                <img src={imgTablet} alt="Alimentos e Bebidas" className="solucao-img" />
                            </div>
                            <div className="solucao-content">
                                <h3>Alimentos & Bebidas</h3>
                                <p>Cuidado, telemetria e agilidade no transporte de bens de consumo, garantindo a integridade até o varejo.</p>
                            </div>
                        </div>
                        <div className="solucao-card">
                            <div className="solucao-img-box">
                                <img src={imgDriver} alt="Carga Dedicada" className="solucao-img" />
                            </div>
                            <div className="solucao-content">
                                <h3>Carga Lotação (Dedicada)</h3>
                                <p>Veículos exclusivos para a sua carga, indo do ponto de coleta diretamente ao destino final, sem paradas.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Atuação */}
            <section className="atuacao-section">
                <div className="container grid-2" style={{alignItems: 'center', gap: '4rem'}}>
                    <div>
                        <span className="kicker" style={{color: 'var(--primary-blue)'}}>Área de Atuação</span>
                        <h2 className="text-white">Presença forte no Norte e Nordeste</h2>
                        <p style={{color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem', marginBottom: '2.5rem', lineHeight: '1.6'}}>Com matriz estratégica na Paraíba e presença física em 8 estados, garantimos agilidade incomparável e capilaridade máxima nas rotas do Norte e Nordeste brasileiro.</p>
                        <ul className="atuacao-list">
                            <li><MapPin weight="fill" /> Filiais Estratégicas em 8 Estados</li>
                            <li><Truck weight="fill" /> Hubs de Roteirização Avançada</li>
                            <li><ShieldCheck weight="fill" /> Monitoramento 24h direto da Matriz</li>
                        </ul>
                        <Link to="/atuacao" className="btn-outline" style={{marginTop: '2.5rem'}}>
                            Ver Filiais e Destinos <ArrowRight weight="bold" />
                        </Link>
                    </div>
                    <div className="map-container">
                        <div className="map-wrapper" style={{position: 'relative', zIndex: 2}}>
                            <ComposableMap
                              projection="geoMercator"
                              projectionConfig={{
                                scale: 880,
                                center: [-53, -15]
                              }}
                              style={{ width: "100%", height: "auto", overflow: "visible" }}
                            >
                              <Geographies geography={brazilTopoJson}>
                                {({ geographies }) =>
                                  geographies.map((geo) => {
                                    const activeStates = ['PB', 'PE', 'RN', 'CE', 'BA', 'SE', 'AL', 'MA', 'PA'];
                                    const isHighlighted = activeStates.includes(geo.properties["hc-a2"]);
                                    return (
                                      <Geography
                                        key={geo.rsmKey}
                                        geography={geo}
                                        fill={isHighlighted ? "#19A3DF" : "rgba(255,255,255,0.05)"}
                                        stroke="rgba(255,255,255,0.1)"
                                        strokeWidth={0.5}
                                        style={{
                                          default: { outline: "none", transition: "all 0.3s ease" },
                                          hover: { fill: isHighlighted ? "#1486B8" : "rgba(255,255,255,0.2)", outline: "none", cursor: 'pointer' },
                                          pressed: { outline: "none" },
                                        }}
                                      />
                                    );
                                  })
                                }
                              </Geographies>
                                { [
                                  { name: "PB", coordinates: [-36.5, -7.0], dx: 18, dy: 4 },
                                  { name: "PE", coordinates: [-37.5, -8.5], dx: 18, dy: 4 },
                                  { name: "RN", coordinates: [-36.5, -5.5], dx: 0, dy: -10 },
                                  { name: "CE", coordinates: [-39.0, -5.0], dx: 0, dy: -10 },
                                  { name: "BA", coordinates: [-41.5, -12.5], dx: -18, dy: 4 },
                                  { name: "SE", coordinates: [-37.5, -10.5], dx: 18, dy: 4 },
                                  { name: "AL", coordinates: [-36.5, -9.5], dx: 18, dy: 4 },
                                  { name: "MA", coordinates: [-45.0, -5.0], dx: 0, dy: -10 },
                                  { name: "PA", coordinates: [-52.0, -4.0], dx: 0, dy: -10 }
                                ].map(({ name, coordinates, dx, dy }) => (
                                  <Marker key={name} coordinates={coordinates}>
                                    <circle r={5} fill="#000327" stroke="#ffffff" strokeWidth={2} />
                                    <text
                                      textAnchor="middle"
                                      x={dx}
                                      y={dy}
                                      style={{ fontFamily: "Montserrat, sans-serif", fill: "#ffffff", fontSize: "14px", fontWeight: "800", textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}
                                    >
                                      {name}
                                    </text>
                                  </Marker>
                                )) }
                              </ComposableMap>
                        </div>
                        <div className="map-glow"></div>
                    </div>
                </div>
            </section>

            {/* Cases de Sucesso (Cartões Cinematográficos) */}
            <section className="cases-section">
                <div className="container">
                    <div className="section-header text-center">
                        <span className="kicker">Cases de Sucesso</span>
                        <h2>Logística que gera resultados reais</h2>
                        <p style={{ maxWidth: '700px', margin: '0 auto', color: 'var(--text-muted)' }}>Veja como ajudamos grandes indústrias e varejistas a otimizarem suas cadeias de suprimentos, reduzindo custos e garantindo abastecimento contínuo.</p>
                    </div>
                    
                    <div className="grid-2 cases-grid">
                        <div className="case-card">
                            <img src={imgHighway} alt="Fundo Case Cerâmica" className="case-bg" />
                            <div className="case-overlay"></div>
                            
                            <div className="quote-mark">"</div>
                            <div className="case-logo">
                                <Factory weight="fill" /> Indústria Cerâmica
                            </div>
                            <h3>Eficiência máxima nas rotas do Nordeste</h3>
                            <p>Nossa operação dedicada de transporte de pisos e revestimentos reduziu o tempo de trânsito em 30%, garantindo abastecimento contínuo com índice de avaria quase zero nas rotas mais desafiadoras da região.</p>
                            <div className="case-footer">
                                <span className="case-metric">+30%</span>
                                <span className="case-metric-label">Agilidade em Entregas</span>
                            </div>
                        </div>
                        
                        <div className="case-card">
                            <img src={imgHub} alt="Fundo Case Varejo" className="case-bg" />
                            <div className="case-overlay"></div>
                            
                            <div className="quote-mark">"</div>
                            <div className="case-logo">
                                <Package weight="fill" /> Bens de Consumo
                            </div>
                            <h3>Abastecimento contínuo para o Varejo</h3>
                            <p>Desenvolvemos uma malha logística de ponta a ponta para garantir que produtos essenciais cheguem às gôndolas sem atrasos. Monitoramento em tempo real permitiu precisão cirúrgica no recebimento.</p>
                            <div className="case-footer">
                                <span className="case-metric">100%</span>
                                <span className="case-metric-label">Rastreabilidade da Operação</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="text-center" style={{marginTop: '6rem', padding: '4rem 2rem', background: '#f8f9fa', borderRadius: '24px', border: '1px solid rgba(0,0,0,0.03)'}}>
                        <h3 style={{fontSize: '1.8rem', color: 'var(--dark-blue)', marginBottom: '1rem', fontWeight: 800}}>Sua empresa precisa de um parceiro logístico de alta performance?</h3>
                        <p style={{color: 'var(--text-muted)', marginBottom: '2.5rem', fontSize: '1.1rem'}}>Nossos especialistas estão prontos para desenhar a melhor malha de transporte para o seu negócio, reduzindo custos e otimizando prazos.</p>
                        <Link to="#cotacao" className="btn-primary" onClick={(e) => {
                            e.preventDefault();
                            document.getElementById('cotacao').scrollIntoView({ behavior: 'smooth' });
                        }}>
                            Solicitar Estudo Logístico <ArrowRight weight="bold" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Tecnologia e Segurança (V1) */}
            <section className="tecnologia-section">
                <div className="container grid-2" style={{alignItems: 'center', gap: '5rem'}}>
                    <div className="tech-content">
                        <span className="kicker">Tecnologia & Segurança</span>
                        <h2>Controle total da sua carga em tempo real</h2>
                        <p>Investimos pesado em telemetria avançada e inteligência logística. Do momento da coleta até a entrega, sua mercadoria é monitorada com o mais alto padrão de segurança do mercado.</p>
                        <ul className="tech-list">
                            <li>
                                <div className="icon-box"><Crosshair weight="duotone" /></div>
                                <div>
                                    <h4>Rastreamento Satelital</h4>
                                    <p>Posição exata do veículo atualizada instantaneamente.</p>
                                </div>
                            </li>
                            <li>
                                <div className="icon-box"><Headset weight="duotone" /></div>
                                <div>
                                    <h4>Torre de Controle 24/7</h4>
                                    <p>Equipe dedicada na matriz monitorando cada rota.</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="tech-image-wrapper">
                        <img src={imgTablet} alt="Tecnologia Expresso PB" className="img-fluid tech-img" />
                        <div className="tech-glow"></div>
                        <div className="floating-badge tech-badge">
                            <span className="badge-number">100%</span>
                            <span className="badge-text">Frota<br/>Rastreada</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Cotação Expressa CTA */}
            <section className="cotacao-cta-section" id="cotacao">
                <div className="container cotacao-container">
                    <div className="cotacao-text">
                        <span className="kicker">Cotação Rápida</span>
                        <h2>Pronto para otimizar sua logística?</h2>
                        <p>Chega de atrasos e dores de cabeça. Faça uma cotação rápida agora mesmo e descubra como a Expresso PB pode transformar a distribuição da sua empresa.</p>
                        <ul className="cotacao-benefits">
                            <li><CheckCircle weight="fill" color="var(--primary-blue)" /> Resposta em até 30 minutos</li>
                            <li><CheckCircle weight="fill" color="var(--primary-blue)" /> Consultoria logística gratuita</li>
                            <li><CheckCircle weight="fill" color="var(--primary-blue)" /> Preços altamente competitivos</li>
                        </ul>
                    </div>
                    <div className="cotacao-form-wrapper">
                        <div className="form-header">
                            <h3>Solicitar Cotação</h3>
                            <p>Preencha os dados abaixo e entraremos em contato.</p>
                        </div>
                        <form className="cotacao-form" onSubmit={(e) => { e.preventDefault(); alert('Formulário enviado!'); }}>
                            <div className="grid-2-inputs">
                                <div className="input-group">
                                    <label>Nome completo</label>
                                    <input type="text" placeholder="Como podemos te chamar?" required />
                                </div>
                                <div className="input-group">
                                    <label>Empresa</label>
                                    <input type="text" placeholder="Nome do seu negócio" required />
                                </div>
                            </div>
                            
                            <div className="grid-2-inputs">
                                <div className="input-group">
                                    <label>E-mail Corporativo</label>
                                    <input type="email" placeholder="seu@email.com" required />
                                </div>
                                <div className="input-group">
                                    <label>WhatsApp / Telefone</label>
                                    <input type="tel" placeholder="(00) 00000-0000" required />
                                </div>
                            </div>

                            <div className="input-group">
                                <label>Tipo de Carga</label>
                                <input type="text" placeholder="Ex: Equipamentos industriais, Cerâmica, Produtos Químicos..." />
                            </div>

                            <div className="grid-2-inputs">
                                <div className="input-group">
                                    <label>Origem</label>
                                    <input type="text" placeholder="Estado/Cidade" required />
                                </div>
                                <div className="input-group">
                                    <label>Destino</label>
                                    <input type="text" placeholder="Estado/Cidade" required />
                                </div>
                            </div>
                            <button type="submit" className="btn-primary btn-block" style={{marginTop: '1rem', width: '100%', justifyContent: 'center'}}>
                                Enviar Solicitação <ArrowRight weight="bold" />
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
};
export default Home;
