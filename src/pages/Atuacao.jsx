import React from 'react';
import { Check } from '@phosphor-icons/react';

const Atuacao = () => {
    return (
        <>
            <div className="hero-internal">
                <div className="container">
                    <h1>Estrutura estratégica para atender com agilidade</h1>
                    <p>Atuação nacional. Especializados no transporte rodoviário, atendemos com destaque as regiões Norte e Nordeste.</p>
                </div>
            </div>
            
            <section>
                <div className="container grid-2">
                    <div>
                        <h2 style={{color:'var(--primary-blue)', fontSize:'2rem'}}>Matriz</h2>
                        <h3 style={{fontSize:'2.5rem', marginBottom: '1.5rem'}}>João Pessoa, Paraíba</h3>
                        <ul style={{listStyle:'none', display:'flex', flexDirection:'column', gap:'1rem', fontSize:'1.1rem'}}>
                            <li><Check weight="bold" style={{color:'var(--primary-blue)', marginRight: '0.5rem'}} /> Sede administrativa e operacional</li>
                            <li><Check weight="bold" style={{color:'var(--primary-blue)', marginRight: '0.5rem'}} /> Centro de roteirização e gestão de frota</li>
                            <li><Check weight="bold" style={{color:'var(--primary-blue)', marginRight: '0.5rem'}} /> Central de monitoramento 24/7</li>
                        </ul>
                    </div>
                    <div className="card" style={{background: 'var(--dark-blue)', color: 'var(--white)', padding: '3rem'}}>
                        <h3 style={{color:'var(--primary-blue)', marginBottom: '1.5rem', fontSize:'1.8rem'}}>Filiais Estratégicas</h3>
                        <p style={{marginBottom: '1.5rem'}}>Presença física em 8 estados estratégicos:</p>
                        <div style={{display:'grid', gridTemplateColumns: '1fr 1fr', gap:'1rem'}}>
                            <div>CE (Ceará)</div>
                            <div>RN (Rio Grande do Norte)</div>
                            <div>PE (Pernambuco)</div>
                            <div>SE (Sergipe)</div>
                            <div>BA (Bahia)</div>
                            <div>MA (Maranhão)</div>
                            <div>AL (Alagoas)</div>
                            <div>PA (Pará)</div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
export default Atuacao;
