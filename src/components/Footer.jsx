import React from 'react';
import { Link } from 'react-router-dom';
import { EnvelopeSimple, InstagramLogo, MapPin, WhatsappLogo, LinkedinLogo, Phone, CaretRight } from '@phosphor-icons/react';
import logo from '../assets/logo_escura.svg';
import logoWebconverte from '../assets/logo_webconverte.png';


const Footer = () => {
    return (
        <footer className="footer-mega">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-col brand-col">
                        <img src={logo} alt="Expresso PB" className="logo-img" />
                        <p className="brand-desc">Soluções logísticas de alta performance para cargas dedicadas (Lotação), com tecnologia de ponta e foco total na sua operação.</p>
                        <div className="social-links">
                            <a href="#" aria-label="WhatsApp"><WhatsappLogo weight="fill" /></a>
                            <a href="#" aria-label="LinkedIn"><LinkedinLogo weight="fill" /></a>
                            <a href="#" aria-label="Instagram"><InstagramLogo weight="fill" /></a>
                        </div>
                    </div>
                    
                    <div className="footer-col link-col">
                        <h4>Soluções Logísticas</h4>
                        <ul>
                            <li><Link to="/servicos"><CaretRight weight="bold"/> Carga Lotação (FTL)</Link></li>
                            <li><Link to="/servicos"><CaretRight weight="bold"/> Transporte Dedicado</Link></li>
                            <li><Link to="/servicos"><CaretRight weight="bold"/> Construção & Pesados</Link></li>
                            <li><Link to="/servicos"><CaretRight weight="bold"/> Rotas Exclusivas</Link></li>
                        </ul>
                    </div>
                    
                    <div className="footer-col link-col">
                        <h4>A Empresa</h4>
                        <ul>
                            <li><Link to="/sobre"><CaretRight weight="bold"/> Nossa História</Link></li>
                            <li><Link to="/servicos"><CaretRight weight="bold"/> Tecnologia e Segurança</Link></li>
                            <li><Link to="/atuacao"><CaretRight weight="bold"/> Área de Atuação</Link></li>
                            <li><a href="https://blog.expressopb.com" target="_blank" rel="noopener noreferrer"><CaretRight weight="bold"/> Blog de Notícias</a></li>
                            <li><Link to="/trabalhe-conosco"><CaretRight weight="bold"/> Trabalhe Conosco</Link></li>
                            <li><Link to="/contato"><CaretRight weight="bold"/> Fale Conosco</Link></li>
                        </ul>
                    </div>
                    
                    <div className="footer-col contact-col">
                        <h4>Fale Conosco</h4>
                        <ul>
                            <li>
                                <div className="contact-icon"><EnvelopeSimple weight="bold" /></div>
                                <div className="contact-info">
                                    <span>Email Comercial</span>
                                    <p>comercial@expressopb.com</p>
                                </div>
                            </li>
                            <li>
                                <div className="contact-icon"><Phone weight="bold" /></div>
                                <div className="contact-info">
                                    <span>WhatsApp Comercial</span>
                                    <p>(83) 99999-9999</p>
                                </div>
                            </li>
                            <li>
                                <div className="contact-icon"><MapPin weight="bold" /></div>
                                <div className="contact-info">
                                    <span>Matriz</span>
                                    <p>João Pessoa - Paraíba</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <div className="footer-bottom-info">
                        <p className="footer-copy">&copy; 2026 Expresso PB Logística. Todos os direitos reservados.</p>
                        <div className="legal-links">
                            <Link to="#">Política de Privacidade</Link>
                            <span className="legal-divider" aria-hidden="true">•</span>
                            <Link to="#">Termos de Uso</Link>
                        </div>
                    </div>
                    <div className="dev-credit">
                        <span className="dev-credit-text">Desenvolvido por</span>
                        <a 
                            href="https://webconverte.com.br" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            title="Webconverte - Soluções Digitais e Criação de Sites"
                            className="dev-credit-link"
                        >
                            <img src={logoWebconverte} alt="Webconverte" className="dev-credit-logo" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
export default Footer;
