import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { List, X } from '@phosphor-icons/react';
import logo from '../assets/logo fundo escuro.svg';

const Header = () => {
    const [menuActive, setMenuActive] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    // Fecha o menu mobile automaticamente sempre que a rota mudar
    useEffect(() => {
        setMenuActive(false);
    }, [location.pathname]);

    // Trava o scroll da página quando o menu mobile está aberto
    useEffect(() => {
        if (menuActive) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [menuActive]);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 30);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`header ${scrolled ? 'scrolled' : ''}`}>
            <div className="header-container">
                <Link to="/" className="header-logo" onClick={() => setMenuActive(false)}>
                    <img src={logo} alt="Expresso PB" className="logo-img" />
                </Link>

                <ul className={`nav-links ${menuActive ? 'active' : ''}`}>
                    <li><Link to="/" onClick={() => setMenuActive(false)}>Início</Link></li>
                    <li><Link to="/sobre" onClick={() => setMenuActive(false)}>Sobre Nós</Link></li>
                    <li><Link to="/servicos" onClick={() => setMenuActive(false)}>Serviços & Frota</Link></li>
                    <li><Link to="/atuacao" onClick={() => setMenuActive(false)}>Atuação</Link></li>
                    <li><a href="https://blog.expressopb.com" target="_blank" rel="noopener noreferrer" onClick={() => setMenuActive(false)}>Blog</a></li>
                    <li><Link to="/trabalhe-conosco" onClick={() => setMenuActive(false)}>Trabalhe Conosco</Link></li>
                    <li><Link to="/contato" onClick={() => setMenuActive(false)}>Contato</Link></li>
                </ul>

                <div className="header-actions">
                    <Link to="/contato" className="header-btn hide-mobile">Cotar Frete</Link>
                    <button 
                        className="mobile-menu-btn" 
                        onClick={() => setMenuActive(!menuActive)}
                        aria-label={menuActive ? "Fechar menu" : "Abrir menu"}
                    >
                        {menuActive ? <X size={28} weight="bold" /> : <List size={28} weight="bold" />}
                    </button>
                </div>
            </div>
        </header>
    );
};
export default Header;
