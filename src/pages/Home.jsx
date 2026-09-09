import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import brazilTopoJson from "../assets/brazil.json";

import { 
    MapPin, ShieldCheck, Truck, Factory, Package, 
    Headset, Crosshair, ArrowRight, CheckCircle, 
    MapPinLine, VideoCamera, Leaf, Tree, Recycle, Drop, Trophy, WhatsappLogo
} from '@phosphor-icons/react';
import imgHub from '../assets/trait_hub.jpg';
import imgHighway from '../assets/trait_highway.jpg';
import imgDriver from '../assets/trait_driver.jpg';
import imgTablet from '../assets/trait_tablet.jpg';


const Home = () => {
    const highlightsRef = useRef(null);
    const [activeHighlight, setActiveHighlight] = useState(0);

    const solucoesRef = useRef(null);
    const [activeSolucao, setActiveSolucao] = useState(0);

    const handleHighlightScroll = () => {
        if (!highlightsRef.current) return;
        const container = highlightsRef.current;
        const scrollLeft = container.scrollLeft;
        const card = container.children[0];
        if (!card) return;
        const cardWidth = card.offsetWidth;
        const gap = 20;
        const index = Math.round(scrollLeft / (cardWidth + gap));
        setActiveHighlight(Math.min(Math.max(index, 0), 2));
    };

    const scrollToHighlight = (index) => {
        if (!highlightsRef.current) return;
        const container = highlightsRef.current;
        const card = container.children[index];
        if (card) {
            const cardLeft = card.offsetLeft - container.offsetLeft - (container.clientWidth - card.clientWidth) / 2;
            container.scrollTo({ left: Math.max(0, cardLeft), behavior: 'smooth' });
            setActiveHighlight(index);
        }
    };

    const handleSolucaoScroll = () => {
        if (!solucoesRef.current) return;
        const container = solucoesRef.current;
        const scrollLeft = container.scrollLeft;
        const card = container.children[0];
        if (!card) return;
        const cardWidth = card.offsetWidth;
        const gap = 20;
        const index = Math.round(scrollLeft / (cardWidth + gap));
        setActiveSolucao(Math.min(Math.max(index, 0), 3));
    };

    const scrollToSolucao = (index) => {
        if (!solucoesRef.current) return;
        const container = solucoesRef.current;
        const card = container.children[index];
        if (card) {
            const cardLeft = card.offsetLeft - container.offsetLeft - (container.clientWidth - card.clientWidth) / 2;
            container.scrollTo({ left: Math.max(0, cardLeft), behavior: 'smooth' });
            setActiveSolucao(index);
        }
    };

    const ecoRef = useRef(null);
    const [activeEco, setActiveEco] = useState(0);

    const handleEcoScroll = () => {
        if (!ecoRef.current) return;
        const container = ecoRef.current;
        const scrollLeft = container.scrollLeft;
        const card = container.children[0];
        if (!card) return;
        const cardWidth = card.offsetWidth;
        const gap = 20;
        const index = Math.round(scrollLeft / (cardWidth + gap));
        setActiveEco(Math.min(Math.max(index, 0), 2));
    };

    const scrollToEco = (index) => {
        if (!ecoRef.current) return;
        const container = ecoRef.current;
        const card = container.children[index];
        if (card) {
            const cardLeft = card.offsetLeft - container.offsetLeft - (container.clientWidth - card.clientWidth) / 2;
            container.scrollTo({ left: Math.max(0, cardLeft), behavior: 'smooth' });
            setActiveEco(index);
        }
    };

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
                    <div className="hero-stats">
                        <div className="hero-stat-item">
                            <span className="stat-number">+10 <span className="stat-unit">anos</span></span>
                            <span className="stat-label">de mercado</span>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="hero-stat-item">
                            <span className="stat-number">24/7</span>
                            <span className="stat-label">monitoramento</span>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="hero-stat-item">
                            <span className="stat-number">100%</span>
                            <span className="stat-label">frota dedicada</span>
                        </div>
                        <div className="stat-divider"></div>
                        <div className="hero-stat-item">
                            <span className="stat-number">R$ 0</span>
                            <span className="stat-label">taxa de pernoite</span>
                        </div>
                    </div>
                </div>
            </section>

            <section className="highlights-section">
                <div className="container">
                    <div className="highlights-carousel-wrapper">
                        <div 
                            className="grid-3 highlights-carousel-grid"
                            ref={highlightsRef}
                            onScroll={handleHighlightScroll}
                        >
                            <Link to="/servicos" className="feature-card">
                                <Truck weight="fill" className="watermark-icon" />
                                <div className="feature-icon">
                                    <Truck weight="fill" />
                                </div>
                                <h3 className="feature-title">Frota Própria & Agregados</h3>
                                <p>Nossos motoristas terceirizados e agregados operam sob o mesmo padrão rigoroso da frota própria: telemetria ativa, rastreamento ininterrupto e câmeras na cabine.</p>
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

                        <div className="highlights-dots" aria-label="Navegação do carrossel">
                            {[0, 1, 2].map((idx) => (
                                <button
                                    key={idx}
                                    type="button"
                                    className={`highlights-dot ${activeHighlight === idx ? 'active' : ''}`}
                                    onClick={() => scrollToHighlight(idx)}
                                    aria-label={`Ir para o card ${idx + 1}`}
                                />
                            ))}
                        </div>
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
                        <p>Nossa inteligência logística prioriza a agilidade, segurança e previsibilidade: planejamos rotas otimizadas com monitoramento 24/7, garantindo pontualidade rigorosa e integridade total da carga.</p>
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
                        <p className="section-sub">Atendemos os mais exigentes setores da economia com veículos dedicados, frota pesada e equipe altamente qualificada.</p>
                    </div>
                    <div className="solucoes-carousel-wrapper">
                        <div 
                            className="grid-4 solucoes-carousel-grid"
                            ref={solucoesRef}
                            onScroll={handleSolucaoScroll}
                        >
                            <Link to="/segmentos/construcao-civil" className="solucao-card">
                                <div className="solucao-img-box">
                                    <img src={imgHighway} alt="Construção Civil" className="solucao-img" />
                                </div>
                                <div className="solucao-content">
                                    <h3>Construção Civil</h3>
                                    <p>Operação dedicada e premiada no transporte de pisos, cerâmicas e acabamentos pesados. Eliminação de avarias e ganho de 30% em agilidade de rota.</p>
                                    <span className="solucao-link-btn">
                                        Ver Solução Dedicada <ArrowRight weight="bold" size={16} />
                                    </span>
                                </div>
                            </Link>
                            <Link to="/segmentos/alimentos-bebidas" className="solucao-card">
                                <div className="solucao-img-box">
                                    <img src={imgTablet} alt="Alimentos e Bebidas" className="solucao-img" />
                                </div>
                                <div className="solucao-content">
                                    <h3>Alimentos & Bebidas</h3>
                                    <p>Precisão cirúrgica no cumprimento rigoroso de janelas de agendamento em grandes redes de atacarejo e Centros de Distribuição (CDs), sem estadias.</p>
                                    <span className="solucao-link-btn">
                                        Ver Solução Dedicada <ArrowRight weight="bold" size={16} />
                                    </span>
                                </div>
                            </Link>
                            <Link to="/segmentos/papel-celulose" className="solucao-card">
                                <div className="solucao-img-box">
                                    <img src={imgHub} alt="Papel e Celulose" className="solucao-img" />
                                </div>
                                <div className="solucao-content">
                                    <h3>Papel & Celulose</h3>
                                    <p>Máxima cubagem e eficiência com carretas dedicadas, Bitrems e Rodotrens, reduzindo custos operacionais em cargas de alto volume.</p>
                                    <span className="solucao-link-btn">
                                        Ver Solução Dedicada <ArrowRight weight="bold" size={16} />
                                    </span>
                                </div>
                            </Link>
                            <Link to="/segmentos/maquinario-metalmecanica" className="solucao-card">
                                <div className="solucao-img-box">
                                    <img src={imgDriver} alt="Maquinário e Metalmecânica" className="solucao-img" />
                                </div>
                                <div className="solucao-content">
                                    <h3>Maquinário & Metalmecânica</h3>
                                    <p>Transporte especializado para cargas industriais e maquinários pesados, com amarração técnica certificada, monitoramento dedicado e seguro total.</p>
                                    <span className="solucao-link-btn">
                                        Ver Solução Dedicada <ArrowRight weight="bold" size={16} />
                                    </span>
                                </div>
                            </Link>
                        </div>

                        <div className="solucoes-dots" aria-label="Navegação das soluções">
                            {[0, 1, 2, 3].map((idx) => (
                                <button
                                    key={idx}
                                    type="button"
                                    className={`solucoes-dot ${activeSolucao === idx ? 'active' : ''}`}
                                    onClick={() => scrollToSolucao(idx)}
                                    aria-label={`Ir para a solução ${idx + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Outros Segmentos CTA */}
            <section className="outros-segmentos-section">
                <div className="container">
                    <div className="outros-segmentos-box">
                        <div className="outros-segmentos-content">
                            <span className="kicker" style={{ color: '#38bdf8' }}>Seu setor não está na lista?</span>
                            <h3>Atendemos outros segmentos também</h3>
                            <p>Além das nossas especialidades principais, atendemos qualquer necessidade de transporte de carga na indústria e no comércio. Fale com a nossa equipe e nos conte o que você precisa.</p>
                        </div>
                        <div className="outros-segmentos-actions">
                            <Link to="/contato" className="btn-primary">
                                Falar com a Equipe <ArrowRight weight="bold" size={18} />
                            </Link>
                            <a
                                href="https://wa.me/5583999999999?text=Olá! Gostaria de uma cotação para o meu segmento."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-whatsapp-outros"
                            >
                                <WhatsappLogo weight="fill" size={18} />
                                WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            </section>


            <section className="atuacao-section">
                <div className="container grid-2" style={{alignItems: 'center', gap: '4rem'}}>
                    <div>
                        <span className="kicker" style={{color: 'var(--primary-blue)'}}>Área de Atuação</span>
                        <h2 className="text-white">Presença forte no Norte e Nordeste</h2>
                        <p style={{color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem', marginBottom: '2.5rem', lineHeight: '1.6'}}>Com matriz estratégica na Paraíba e presença física em 8 estados, garantimos agilidade incomparável, alta confiabilidade de frota e capilaridade máxima nas rotas mais desafiadoras do país.</p>
                        <ul className="atuacao-list">
                            <li><MapPin weight="fill" /> Filiais Estratégicas em 8 Estados</li>
                            <li><Truck weight="fill" /> Rastreamento Satelital e Telemetria Ininterrupta</li>
                            <li><ShieldCheck weight="fill" /> Cumprimento Rigoroso de Janelas em CDs e Atacarejo</li>
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
                                scale: 900,
                                center: [-53.5, -14.5]
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
                    
                    <div className="grid-2 cases-grid" style={{alignItems: 'stretch'}}>
                        <div className="case-card" style={{height: '100%', display: 'flex', flexDirection: 'column'}}>
                            <img src={imgHighway} alt="Fundo Case Cerâmica" className="case-bg" />
                            <div className="case-overlay"></div>
                            
                            <div className="quote-mark">"</div>
                            <div className="case-logo">
                                <Factory weight="fill" /> Elizabeth & Cerbras (Indústria Cerâmica)
                            </div>
                            <div className="case-award-badge badge-gold">
                                <Trophy weight="fill" /> 2ª Maior Parceira Cerbras & Premiada Elizabeth
                            </div>
                            <h3>Eficiência e premiação máxima nas rotas do Nordeste</h3>
                            <p>Reconhecida como a 2ª maior parceira logística da Cerbras e premiada pela Elizabeth como fornecedora destaque em pontualidade e integridade. Nossa operação dedicada de pisos e revestimentos reduziu o tempo de trânsito em 30%, garantindo abastecimento contínuo com índice de avaria próximo a zero.</p>
                            <div className="case-footer">
                                <span className="case-metric">+30%</span>
                                <span className="case-metric-label">Agilidade em Rotas</span>
                            </div>
                        </div>
                        
                        <div className="case-card" style={{height: '100%', display: 'flex', flexDirection: 'column'}}>
                            <img src={imgHub} alt="Fundo Case Varejo" className="case-bg" />
                            <div className="case-overlay"></div>
                            
                            <div className="quote-mark">"</div>
                            <div className="case-logo">
                                <Package weight="fill" /> Bens de Consumo, Alimentos & Atacarejo
                            </div>
                            <div className="case-award-badge badge-blue">
                                <CheckCircle weight="fill" /> Janelas de Agendamento em CDs
                            </div>
                            <h3>Abastecimento contínuo sem estouro de diárias</h3>
                            <p>Desenvolvemos uma malha logística de ponta a ponta com cumprimento rigoroso de horários agendados em Centros de Distribuição e redes de atacarejo. Com contratos dedicados e isenção de pernoite, blindamos o orçamento do cliente mesmo diante de esperas em docas.</p>
                            <div className="case-footer">
                                <span className="case-metric">100%</span>
                                <span className="case-metric-label">Pontualidade em Janelas</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="cases-cta-box text-center">
                        <h3 style={{fontSize: '1.8rem', color: 'var(--dark-blue)', marginBottom: '1rem', fontWeight: 800}}>Sua empresa precisa de um parceiro logístico de alta performance?</h3>
                        <p style={{color: 'var(--text-muted)', marginBottom: '2.5rem', fontSize: '1.1rem'}}>Nossos especialistas estão prontos para desenhar a melhor malha de transporte para o seu negócio, gerando saving e blindando seu DRE contra taxas imprevistas.</p>
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

            {/* Sustentabilidade & Compromisso Ambiental (ESG) */}
            <section className="eco-section">
                <div className="container">
                    <div className="eco-banner-box">
                        <div style={{ maxWidth: '780px', position: 'relative', zIndex: 2 }}>
                            <span className="eco-badge-pill">
                                <Leaf weight="fill" /> Compromisso Ambiental & ESG
                            </span>
                            <h2 style={{ fontSize: '3.2rem', fontWeight: '800', color: 'var(--white)', letterSpacing: '-1.5px', marginBottom: '1.2rem', lineHeight: '1.15' }}>
                                Eficiência que move cargas e preserva o meio ambiente
                            </h2>
                            <p style={{ fontSize: '1.2rem', color: 'rgba(255, 255, 255, 0.85)', lineHeight: '1.7', margin: 0 }}>
                                Acreditamos que a logística do futuro precisa ser limpa, inteligente e responsável. Na Expresso PB, combinamos tecnologia de ponta, renovação contínua de frota e engenharia de tráfego para reduzir drasticamente as emissões de carbono em cada quilômetro percorrido.
                            </p>
                        </div>
                    </div>

                    {/* Pilares Práticos de Ação Sustentável */}
                    <div className="eco-carousel-wrapper">
                        <div 
                            className="eco-pillars-grid eco-carousel-grid"
                            ref={ecoRef}
                            onScroll={handleEcoScroll}
                        >
                            <div className="eco-pillar-card">
                                <div className="eco-pillar-icon">
                                    <Tree weight="fill" />
                                </div>
                                <h4>Direção Econômica & Treinamento</h4>
                                <p>Capacitamos periodicamente nossos motoristas em condução defensiva e econômica, reduzindo freadas bruscas, rotações excessivas e emissão desnecessária de poluentes.</p>
                            </div>

                            <div className="eco-pillar-card">
                                <div className="eco-pillar-icon">
                                    <Recycle weight="fill" />
                                </div>
                                <h4>Ciclo Reverso & Otimização de Pneus</h4>
                                <p>Controle rigoroso da vida útil dos pneus com recapeamento homologado e descarte responsável via logística reversa através de parceiros certificados pela ANIP.</p>
                            </div>

                            <div className="eco-pillar-card">
                                <div className="eco-pillar-icon">
                                    <Drop weight="fill" />
                                </div>
                                <h4>Reuso de Água & Manutenção Limpa</h4>
                                <p>Nosso pátio matriz em João Pessoa opera com sistema de separação de água e óleo e lavagem técnica de caminhões com captação e reaproveitamento de água pluvial.</p>
                            </div>
                        </div>

                        <div className="eco-dots" aria-label="Navegação do compromisso ambiental">
                            {[0, 1, 2].map((idx) => (
                                <button
                                    key={idx}
                                    type="button"
                                    className={`eco-dot ${activeEco === idx ? 'active' : ''}`}
                                    onClick={() => scrollToEco(idx)}
                                    aria-label={`Ir para o pilar ${idx + 1}`}
                                />
                            ))}
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
                            <li><CheckCircle weight="fill" color="var(--primary-blue)" /> <span><strong>Isenção total de pernoite:</strong> se a doca atrasar, seu orçamento não estoura</span></li>
                            <li><CheckCircle weight="fill" color="var(--primary-blue)" /> <span><strong>Previsibilidade para o seu DRE:</strong> contratos dedicados imunes à volatilidade spot</span></li>
                            <li><CheckCircle weight="fill" color="var(--primary-blue)" /> <span><strong>Redução de custos ocultos:</strong> operações formatadas para gerar saving contínuo</span></li>
                            <li><CheckCircle weight="fill" color="var(--primary-blue)" /> <span><strong>Torre de controle 24/7:</strong> resposta da cotação em até 30 minutos</span></li>
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
                                <label>Tipo de Carga / Segmento</label>
                                <input type="text" placeholder="Ex: Cerâmica, Alimentos & Bebidas, Papel & Celulose, Maquinário..." />
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
                                Enviar Solicitação para o Comercial <ArrowRight weight="bold" />
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
};
export default Home;
