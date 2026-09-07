import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { List } from '@phosphor-icons/react';
import logo from '../assets/logo fundo escuro.svg';

const Header = () => {
    const [menuActive, setMenuActive] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`header ${scrolled ? 'scrolled' : ''}`}>
            <div className="container">
                <Link to="/" className="logo">
                    <img src={logo} alt="Expresso PB" className="logo-img" />
                </Link>
                <ul className={`nav-links ${menuActive ? 'active' : ''}`}>
                    <li><Link to="/">Início</Link></li>
                    <li><Link to="/sobre">Sobre Nós</Link></li>
                    <li><Link to="/servicos">Serviços & Frota</Link></li>
                    <li><Link to="/atuacao">Atuação</Link></li>
                    <li><Link to="/contato">Contato</Link></li>
                </ul>
                <Link to="/contato" className="btn-primary hide-mobile">Cotar Frete</Link>
                <List size={32} className="mobile-menu-btn" onClick={() => setMenuActive(!menuActive)} />
            </div>
        </header>
    );
};
export default Header;
