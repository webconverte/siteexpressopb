import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import brazilTopoJson from "../assets/brazil.json";
import { 
    Buildings, MapPin, ShieldCheck, Truck, Headset, 
    ArrowsClockwise, NavigationArrow, CheckCircle, ArrowRight, 
    Clock, Compass, Crosshair
} from '@phosphor-icons/react';
import imgHub from '../assets/trait_hub.jpg';
import imgHighway from '../assets/trait_highway.jpg';

const FILIAIS_DATA = [
    { uf: "PB", estado: "Paraíba", cidade: "João Pessoa (Matriz)", tipo: "Hub Central", desc: "Sede administrativa e centro nervoso de operações e telemetria 24/7.", coords: [-36.5, -7.0], sla: "Origem Matriz" },
    { uf: "PE", estado: "Pernambuco", cidade: "Recife / Suape", tipo: "Hub Portuário", desc: "Integração multimodal rápida com o Porto de Suape e polos industriais.", coords: [-37.5, -8.5], sla: "D+1 Regional" },
    { uf: "RN", estado: "Rio Grande do Norte", cidade: "Natal / Mossoró", tipo: "Base Operacional", desc: "Atendimento direto ao polo salineiro, fruticultura e distribuição litorânea.", coords: [-36.5, -5.5], sla: "D+1 Regional" },
    { uf: "CE", estado: "Ceará", cidade: "Fortaleza / Pecém", tipo: "Polo de Carga", desc: "Conexão estratégica com o Complexo do Pecém e rotas do semiárido.", coords: [-39.0, -5.0], sla: "D+2 Interestadual" },
    { uf: "BA", estado: "Bahia", cidade: "Salvador / Feira de Santana", tipo: "Tronco Rodoviário", desc: "O maior entroncamento do Nordeste ligando o Norte/Nordeste ao Sudeste.", coords: [-41.5, -12.5], sla: "D+2 Tronco" },
    { uf: "SE", estado: "Sergipe", cidade: "Aracaju", tipo: "Ponto de Apoio", desc: "Agilidade na distribuição intermediária e escoamento pela BR-101.", coords: [-37.5, -10.5], sla: "D+1 Regional" },
    { uf: "AL", estado: "Alagoas", cidade: "Maceió", tipo: "Ponto de Apoio", desc: "Malha de abastecimento direto para indústrias químicas e varejo.", coords: [-36.5, -9.5], sla: "D+1 Regional" },
    { uf: "MA", estado: "Maranhão", cidade: "São Luís / Imperatriz", tipo: "Corredor Norte", desc: "Portão de entrada para o escoamento agrícola e industrial do Arco Norte.", coords: [-45.0, -5.0], sla: "D+3 Corredor" },
    { uf: "PA", estado: "Pará", cidade: "Belém / Marabá", tipo: "Hub Amazônico", desc: "Base de apoio avançada para grandes operações industriais e mineração.", coords: [-52.0, -4.0], sla: "D+4 Amazônia" }
];

const Atuacao = () => {
    const [selectedUf, setSelectedUf] = useState("PB");
    const activeFilial = FILIAIS_DATA.find(f => f.uf === selectedUf) || FILIAIS_DATA[0];

    const filiaisRef = useRef(null);
    const [activeFilialIndex, setActiveFilialIndex] = useState(0);
    const filiaisCards = FILIAIS_DATA.filter(f => f.uf !== 'PB');

    const handleFiliaisScroll = () => {
        if (!filiaisRef.current) return;
        const container = filiaisRef.current;
        const scrollLeft = container.scrollLeft;
        const card = container.children[0];
        if (!card) return;
        const cardWidth = card.offsetWidth;
        const gap = 20;
        const index = Math.round(scrollLeft / (cardWidth + gap));
        setActiveFilialIndex(Math.min(Math.max(index, 0), filiaisCards.length - 1));
    };

    const scrollToFilial = (index) => {
        if (!filiaisRef.current) return;
        const container = filiaisRef.current;
        const card = container.children[index];
        if (card) {
            const cardLeft = card.offsetLeft - container.offsetLeft - (container.clientWidth - card.clientWidth) / 2;
            container.scrollTo({ left: Math.max(0, cardLeft), behavior: 'smooth' });
            setActiveFilialIndex(index);
        }
    };

    const corredoresRef = useRef(null);
    const [activeCorredorIndex, setActiveCorredorIndex] = useState(0);

    const handleCorredoresScroll = () => {
        if (!corredoresRef.current) return;
        const container = corredoresRef.current;
        const scrollLeft = container.scrollLeft;
        const card = container.children[0];
        if (!card) return;
        const cardWidth = card.offsetWidth;
        const gap = 20;
        const index = Math.round(scrollLeft / (cardWidth + gap));
        setActiveCorredorIndex(Math.min(Math.max(index, 0), 2));
    };

    const scrollToCorredor = (index) => {
        if (!corredoresRef.current) return;
        const container = corredoresRef.current;
        const card = container.children[index];
        if (card) {
            const cardLeft = card.offsetLeft - container.offsetLeft - (container.clientWidth - card.clientWidth) / 2;
            container.scrollTo({ left: Math.max(0, cardLeft), behavior: 'smooth' });
            setActiveCorredorIndex(index);
        }
    };

    return (
        <>
            {/* 1. Hero Monumental Padronizado */}
            <div className="hero-internal" style={{backgroundImage: `url(${imgHighway})`}}>
                <div className="container" style={{textAlign: 'left', margin: '0 auto'}}>
                    <span className="kicker" style={{color: 'var(--primary-blue)', letterSpacing: '2px', fontWeight: '800', textTransform: 'uppercase', marginBottom: '1rem', display: 'block'}}>
                        Cobertura & Malha Rodoviária
                    </span>
                    <h1 style={{fontSize: '4.5rem', fontWeight: '800', lineHeight: '1.1', letterSpacing: '-2px', marginBottom: '1.5rem', color: 'var(--white)'}}>
                        Presença Estratégica Nacional
                    </h1>
                    <p style={{fontSize: '1.3rem', color: 'rgba(255,255,255,0.85)', maxWidth: '650px', lineHeight: '1.6', margin: '0'}}>
                        Com matriz na Paraíba e filiais operacionais em 8 estados, conectamos centros produtivos e de consumo com velocidade, rastreamento contínuo e sem intermediários.
                    </p>
                </div>
            </div>

            {/* 2. Matriz de Excelência Operacional (João Pessoa - PB) */}
            <section className="matriz-section">
                <div className="container">
                    <div className="matriz-banner-card">
                        <div className="matriz-card-header">
                            <span className="matriz-badge-pill">
                                <Buildings weight="fill" /> Sede Corporativa & Hub Central
                            </span>
                            <h2 className="matriz-title">
                                João Pessoa, Paraíba
                            </h2>
                            <p className="matriz-desc">
                                O coração operacional da Expresso PB. A partir da matriz, orquestramos toda a frota própria que atende o Brasil, com torre de controle de risco, telemetria 24 horas por dia e engenharia de tráfego dedicada.
                            </p>
                        </div>

                        <ul className="matriz-features-list">
                            <li className="matriz-feature-item">
                                <Crosshair weight="bold" className="matriz-feature-icon" />
                                <div>
                                    <h5>Torre de Controle 24/7</h5>
                                    <p>Vigilância satelital ativa em 100% dos caminhões e acompanhamento de SLA em tempo real.</p>
                                </div>
                            </li>
                            <li className="matriz-feature-item">
                                <NavigationArrow weight="bold" className="matriz-feature-icon" />
                                <div>
                                    <h5>Engenharia de Roteirização</h5>
                                    <p>Algoritmos de malha viária para desenhar a rota mais rápida e segura para o cliente.</p>
                                </div>
                            </li>
                            <li className="matriz-feature-item">
                                <Truck weight="bold" className="matriz-feature-icon" />
                                <div>
                                    <h5>Pátio e Oficina Própria</h5>
                                    <p>Manutenção preventiva rigorosa antes de cada viagem para zerar falhas em trânsito.</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* 3. As Filiais em Detalhes */}
            <section className="filiais-section">
                <div className="container">
                    <div className="section-header text-center">
                        <span className="kicker" style={{color: 'var(--primary-blue)', letterSpacing: '2px', fontWeight: '800', textTransform: 'uppercase', marginBottom: '1rem', display: 'inline-block'}}>
                            Capilaridade Regional
                        </span>
                        <h2 style={{fontSize: '3rem', fontWeight: '800', color: 'var(--dark-blue)', letterSpacing: '-1px'}}>
                            Rede de Filiais e Polos de Apoio
                        </h2>
                        <p style={{fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto'}}>
                            Bases estruturadas para transbordo ágil, suporte aos motoristas e atendimento local às demandas industriais.
                        </p>
                    </div>

                    <div className="filiais-carousel-wrapper">
                        <div 
                            className="filiais-grid filiais-carousel-grid"
                            ref={filiaisRef}
                            onScroll={handleFiliaisScroll}
                        >
                            {filiaisCards.map(filial => (
                                <div 
                                    key={filial.uf} 
                                    className={`filial-card ${selectedUf === filial.uf ? 'active' : ''}`}
                                    onClick={() => setSelectedUf(filial.uf)}
                                >
                                    <div className="filial-card-header">
                                        <div className="filial-uf-badge">{filial.uf}</div>
                                        <span className="filial-type">{filial.tipo}</span>
                                    </div>
                                    <h4>{filial.cidade}</h4>
                                    <p>{filial.desc}</p>
                                    <div className="filial-card-footer">
                                        <Clock weight="fill" />
                                        <span>Padrão SLA: {filial.sla}</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="filiais-dots" aria-label="Navegação das filiais">
                            {filiaisCards.map((filial, idx) => (
                                <button
                                    key={filial.uf}
                                    type="button"
                                    className={`filiais-dot ${activeFilialIndex === idx ? 'active' : ''}`}
                                    onClick={() => scrollToFilial(idx)}
                                    aria-label={`Ir para filial ${filial.cidade}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Mapa Interativo & Painel Dinâmico */}
            <section style={{padding: '8rem 0', background: 'var(--dark-blue)', color: 'var(--white)', position: 'relative', overflow: 'hidden'}}>
                <div className="container">
                    <div className="grid-2" style={{alignItems: 'center', gap: '4rem'}}>
                        <div>
                            <span className="kicker" style={{color: 'var(--primary-blue)', letterSpacing: '2px', fontWeight: '800', textTransform: 'uppercase', marginBottom: '1rem', display: 'block'}}>
                                Mapa de Operações
                            </span>
                            <h2 style={{fontSize: '3rem', fontWeight: '800', color: 'var(--white)', marginBottom: '1.5rem', letterSpacing: '-1px'}}>
                                Conectividade direta de ponta a ponta
                            </h2>
                            <p style={{color: 'rgba(255,255,255,0.75)', fontSize: '1.15rem', lineHeight: '1.6', marginBottom: '2.5rem'}}>
                                Clique sobre os estados destacados no mapa ou nas siglas abaixo para inspecionar a capacidade operacional, hubs e previsões de entrega.
                            </p>

                            {/* Card Dinâmico da Unidade Selecionada */}
                            <div style={{
                                background: 'rgba(255,255,255,0.04)',
                                border: '1px solid rgba(25, 163, 223, 0.4)',
                                borderRadius: '24px',
                                padding: '2rem 2.5rem',
                                boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                                backdropFilter: 'blur(10px)',
                                position: 'relative'
                            }}>
                                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem'}}>
                                    <span style={{
                                        background: 'var(--primary-blue)',
                                        color: 'var(--white)',
                                        padding: '0.4rem 1rem',
                                        borderRadius: '10px',
                                        fontWeight: '800',
                                        fontSize: '1.1rem',
                                        letterSpacing: '1px'
                                    }}>
                                        {activeFilial.uf}
                                    </span>
                                    <span style={{
                                        color: 'var(--primary-blue)',
                                        fontWeight: '700',
                                        fontSize: '0.9rem',
                                        textTransform: 'uppercase',
                                        letterSpacing: '1px'
                                    }}>
                                        {activeFilial.tipo}
                                    </span>
                                </div>

                                <h3 style={{fontSize: '1.8rem', fontWeight: '800', marginBottom: '0.6rem', color: 'var(--white)'}}>
                                    {activeFilial.cidade}
                                </h3>
                                <p style={{color: 'rgba(255,255,255,0.7)', fontSize: '1.05rem', lineHeight: '1.5', marginBottom: '1.5rem'}}>
                                    {activeFilial.desc}
                                </p>

                                <div style={{
                                    display: 'flex', 
                                    gap: '2rem', 
                                    borderTop: '1px solid rgba(255,255,255,0.1)', 
                                    paddingTop: '1.5rem'
                                }}>
                                    <div>
                                        <span style={{fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'rgba(255,255,255,0.5)', display: 'block'}}>
                                            Previsão / SLA
                                        </span>
                                        <strong style={{color: 'var(--primary-blue)', fontSize: '1.1rem'}}>{activeFilial.sla}</strong>
                                    </div>
                                    <div>
                                        <span style={{fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'rgba(255,255,255,0.5)', display: 'block'}}>
                                            Monitoramento
                                        </span>
                                        <strong style={{color: '#4ade80', fontSize: '1.1rem'}}>100% Satelital</strong>
                                    </div>
                                </div>
                            </div>

                            {/* Pílulas de Seleção Rápida */}
                            <div style={{display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginTop: '2rem'}}>
                                {FILIAIS_DATA.map(f => (
                                    <button
                                        key={f.uf}
                                        onClick={() => setSelectedUf(f.uf)}
                                        style={{
                                            padding: '0.5rem 0.9rem',
                                            borderRadius: '8px',
                                            border: selectedUf === f.uf ? '1px solid var(--primary-blue)' : '1px solid rgba(255,255,255,0.15)',
                                            background: selectedUf === f.uf ? 'var(--primary-blue)' : 'rgba(255,255,255,0.05)',
                                            color: 'var(--white)',
                                            fontWeight: '700',
                                            fontSize: '0.85rem',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease'
                                        }}
                                    >
                                        {f.uf}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Visualizador do Mapa do Brasil Interativo */}
                        <div style={{position: 'relative', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <div style={{width: '100%', maxWidth: '750px', transform: 'scale(1.08)', transformOrigin: 'center center'}}>
                                <ComposableMap
                                    projection="geoMercator"
                                    projectionConfig={{
                                        scale: 960,
                                        center: [-53, -14.5]
                                    }}
                                    style={{ width: "100%", height: "auto", overflow: "visible" }}
                                >
                                    <Geographies geography={brazilTopoJson}>
                                        {({ geographies }) =>
                                            geographies.map((geo) => {
                                                const activeStates = ['PB', 'PE', 'RN', 'CE', 'BA', 'SE', 'AL', 'MA', 'PA'];
                                                const uf = geo.properties["hc-a2"];
                                                const isHighlighted = activeStates.includes(uf);
                                                const isSelected = selectedUf === uf;

                                                return (
                                                    <Geography
                                                        key={geo.rsmKey}
                                                        geography={geo}
                                                        fill={isSelected ? "#38bdf8" : isHighlighted ? "#19A3DF" : "rgba(255,255,255,0.05)"}
                                                        stroke="rgba(255,255,255,0.15)"
                                                        strokeWidth={isSelected ? 1.5 : 0.5}
                                                        onClick={() => {
                                                            if (isHighlighted) setSelectedUf(uf);
                                                        }}
                                                        style={{
                                                            default: { outline: "none", transition: "all 0.3s ease" },
                                                            hover: { fill: isHighlighted ? "#0284c7" : "rgba(255,255,255,0.1)", outline: "none", cursor: isHighlighted ? "pointer" : "default" },
                                                            pressed: { outline: "none" }
                                                        }}
                                                    />
                                                );
                                            })
                                        }
                                    </Geographies>

                                    {/* Marcadores das Filiais */}
                                    {FILIAIS_DATA.map(({ uf, coords }) => (
                                        <Marker key={uf} coordinates={coords} onClick={() => setSelectedUf(uf)}>
                                            <circle 
                                                r={selectedUf === uf ? 7 : 4.5} 
                                                fill={selectedUf === uf ? "#38bdf8" : "#000327"} 
                                                stroke="#ffffff" 
                                                strokeWidth={2} 
                                                style={{cursor: 'pointer', transition: 'all 0.3s ease'}}
                                            />
                                            <text
                                                textAnchor="middle"
                                                y={-9}
                                                style={{ 
                                                    fontFamily: "Montserrat, sans-serif", 
                                                    fill: selectedUf === uf ? "#38bdf8" : "#ffffff", 
                                                    fontSize: "13px", 
                                                    fontWeight: "800", 
                                                    textShadow: "0 2px 4px rgba(0,0,0,0.8)",
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                {uf}
                                            </text>
                                        </Marker>
                                    ))}
                                </ComposableMap>
                            </div>
                            <div className="map-glow"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 5. Corredores de Longa Distância */}
            <section className="corredores-section">
                <div className="container">
                    <div className="section-header text-center">
                        <span className="kicker" style={{color: 'var(--primary-blue)', letterSpacing: '2px', fontWeight: '800', textTransform: 'uppercase', marginBottom: '1rem', display: 'inline-block'}}>
                            Rotas Principais
                        </span>
                        <h2 style={{fontSize: '3rem', fontWeight: '800', color: 'var(--dark-blue)', letterSpacing: '-1px'}}>
                            Nossos Corredores Rodoviários Estratégicos
                        </h2>
                        <p style={{fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '700px', margin: '0 auto'}}>
                            Domínio técnico das malhas viárias mais exigentes do país com segurança reforçada.
                        </p>
                    </div>

                    <div className="corredores-carousel-wrapper">
                        <div 
                            className="grid-3 corredores-carousel-grid"
                            ref={corredoresRef}
                            onScroll={handleCorredoresScroll}
                        >
                            <div className="corredor-card">
                                <div className="corredor-icon">
                                    <Truck weight="fill" />
                                </div>
                                <h3>Tronco BR-101 (Nordeste Litoral)</h3>
                                <p>Espinha dorsal conectando Salvador, Aracaju, Maceió, Recife, João Pessoa e Natal com partidas diárias e entregas expressas.</p>
                            </div>

                            <div className="corredor-card">
                                <div className="corredor-icon">
                                    <Compass weight="fill" />
                                </div>
                                <h3>Corredor Setentrional (CE - MA - PA)</h3>
                                <p>Ligação rápida entre Fortaleza, São Luís e os polos industriais e de mineração do Pará com monitoramento por satélite ininterrupto.</p>
                            </div>

                            <div className="corredor-card">
                                <div className="corredor-icon">
                                    <ArrowsClockwise weight="fill" />
                                </div>
                                <h3>Conexão Ponto a Ponto Dedicada</h3>
                                <p>Operação sem centros de redistribuição (crossdocking): o caminhão sai lacrado da indústria e vai direto até a porta do seu cliente final.</p>
                            </div>
                        </div>

                        <div className="corredores-dots" aria-label="Navegação dos corredores">
                            {[0, 1, 2].map((idx) => (
                                <button
                                    key={idx}
                                    type="button"
                                    className={`corredores-dot ${activeCorredorIndex === idx ? 'active' : ''}`}
                                    onClick={() => scrollToCorredor(idx)}
                                    aria-label={`Ir para corredor ${idx + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* 6. CTA Final para Cotação de Rota */}
            <section className="sobre-cta-section">
                <div className="container">
                    <div className="mid-cta-box">
                        <h3>Sua mercadoria precisa cruzar o Brasil com pontualidade e segurança?</h3>
                        <p>Nossa equipe de engenharia logística elabora o estudo de rota ideal para diminuir seus custos de frete e encurtar prazos de entrega.</p>
                        <Link to="/contato" className="btn-primary" style={{display: 'inline-flex', padding: '1rem 2rem', gap: '0.8rem', alignItems: 'center'}}>
                            Solicitar Análise de Rota <ArrowRight weight="bold" />
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Atuacao;
