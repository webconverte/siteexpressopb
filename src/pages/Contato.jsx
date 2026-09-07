import React from 'react';
import { EnvelopeSimple, InstagramLogo } from '@phosphor-icons/react';

const Contato = () => {
    return (
        <section style={{paddingTop: '150px'}}>
            <div className="container grid-2" style={{alignItems: 'start'}}>
                <div>
                    <h1 style={{fontSize:'3rem', marginBottom: '1rem'}}>Fale com a Expresso PB</h1>
                    <p style={{fontSize:'1.2rem', marginBottom: '2rem', color:'var(--text-muted)'}}>Estamos prontos para atender a demanda de transporte da sua empresa com excelência.</p>
                    
                    <div style={{display:'flex', flexDirection:'column', gap:'1.5rem', marginBottom: '2rem'}}>
                        <div style={{display:'flex', gap:'1rem', alignItems:'center'}}>
                            <div className="step-number"><EnvelopeSimple /></div>
                            <div>
                                <h4 style={{margin:0}}>E-mail Comercial</h4>
                                <p>comercial@transportadoraexpressopb.com</p>
                            </div>
                        </div>
                        <div style={{display:'flex', gap:'1rem', alignItems:'center'}}>
                            <div className="step-number"><InstagramLogo /></div>
                            <div>
                                <h4 style={{margin:0}}>Instagram</h4>
                                <p>@expressopb_01</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="card" style={{padding: '2.5rem'}}>
                    <h3 style={{marginBottom: '1.5rem', color:'var(--primary-blue)'}}>Formulário de Cotação</h3>
                    <form>
                        <div className="form-group">
                            <label>Nome da Empresa</label>
                            <input type="text" className="form-control" placeholder="Sua empresa" />
                        </div>
                        <div className="grid-2" style={{gap:'1rem'}}>
                            <div className="form-group">
                                <label>CNPJ</label>
                                <input type="text" className="form-control" placeholder="00.000.000/0000-00" />
                            </div>
                            <div className="form-group">
                                <label>Telefone / WhatsApp</label>
                                <input type="text" className="form-control" placeholder="(00) 00000-0000" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label>E-mail</label>
                            <input type="email" className="form-control" placeholder="contato@empresa.com.br" />
                        </div>
                        <div className="grid-2" style={{gap:'1rem'}}>
                            <div className="form-group">
                                <label>Origem da Carga</label>
                                <input type="text" className="form-control" placeholder="Cidade/UF" />
                            </div>
                            <div className="form-group">
                                <label>Destino da Carga</label>
                                <input type="text" className="form-control" placeholder="Cidade/UF" />
                            </div>
                        </div>
                        <div className="grid-2" style={{gap:'1rem'}}>
                            <div className="form-group">
                                <label>Peso / Volume (Estimado)</label>
                                <input type="text" className="form-control" placeholder="Ex: 14 toneladas" />
                            </div>
                            <div className="form-group">
                                <label>Segmento</label>
                                <select className="form-control">
                                    <option>Selecione...</option>
                                    <option>Maquinário</option>
                                    <option>Alimentos/Bebidas</option>
                                    <option>Construção Civil</option>
                                    <option>Outros</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Mensagem Adicional</label>
                            <textarea className="form-control" placeholder="Detalhes específicos da sua carga..."></textarea>
                        </div>
                        <button type="button" className="btn-primary" style={{width:'100%', border:'none', cursor:'pointer', fontSize:'1.1rem', padding: '1rem'}}>Solicitar Cotação</button>
                    </form>
                </div>
            </div>
        </section>
    );
};
export default Contato;
