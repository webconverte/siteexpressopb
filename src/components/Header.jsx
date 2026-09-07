import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
    List, 
    X, 
    House, 
    Buildings, 
    Truck, 
    MapPin, 
    Article, 
    Users, 
    PhoneCall, 
    CaretRight, 
    ArrowRight,
    ArrowUpRight,
    WhatsappLogo,
    ShieldCheck
} from '@phosphor-icons/react';
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

    const navItems = [
        { path: '/', label: 'Início', icon: House },
        { path: '/sobre', label: 'Sobre Nós', icon: Buildings },
        { path: '/servicos', label: 'Serviços & Frota', icon: Truck },
        { path: '/atuacao', label: 'Área de Atuação', icon: MapPin },
        { 
            path: 'https://blog.expressopb.com', 
            label: 'Blog de Notícias', 
            icon: Article, 
            isExternal: true, 
            badge: 'Externo' 
        },
        { 
            path: '/trabalhe-conosco', 
            label: 'Trabalhe Conosco', 
            icon: Users,
            badge: 'Vagas'
        },
        { path: '/contato', label: 'Fale Conosco', icon: PhoneCall },
    ];

    return (
        <header className={`header ${scrolled ? 'scrolled' : ''}`}>
            <div className="header-container">
                <Link to="/" className="header-logo" onClick={() => setMenuActive(false)}>
                    <img src={logo} alt="Expresso PB" className="logo-img" />
                </Link>

                {/* Navegação Desktop */}
                <ul className="nav-links desktop-only">
                    <li><Link to="/" className={location.pathname === '/' ? 'active-link' : ''}>Início</Link></li>
                    <li><Link to="/sobre" className={location.pathname === '/sobre' ? 'active-link' : ''}>Sobre Nós</Link></li>
                    <li><Link to="/servicos" className={location.pathname === '/servicos' ? 'active-link' : ''}>Serviços & Frota</Link></li>
                    <li><Link to="/atuacao" className={location.pathname === '/atuacao' ? 'active-link' : ''}>Atuação</Link></li>
                    <li><a href="https://blog.expressopb.com" target="_blank" rel="noopener noreferrer">Blog</a></li>
                    <li><Link to="/trabalhe-conosco" className={location.pathname === '/trabalhe-conosco' ? 'active-link' : ''}>Trabalhe Conosco</Link></li>
                    <li><Link to="/contato" className={location.pathname === '/contato' ? 'active-link' : ''}>Contato</Link></li>
                </ul>

                <div className="header-actions">
                    <Link to="/contato" className="header-btn hide-mobile">Cotar Frete</Link>
                    <button 
                        className={`mobile-menu-btn ${menuActive ? 'is-active' : ''}`}
                        onClick={() => setMenuActive(!menuActive)}
                        aria-label={menuActive ? "Fechar menu" : "Abrir menu"}
                    >
                        {menuActive ? <X size={22} weight="bold" /> : <List size={22} weight="bold" />}
                    </button>
                </div>
            </div>

            {/* Menu Mobile Drawer */}
            <div className={`mobile-nav-drawer ${menuActive ? 'open' : ''}`}>
                <div className="mobile-nav-content">
                    <div className="mobile-nav-header">
                        <span className="mobile-nav-kicker">Navegação Principal</span>
                        <div className="mobile-nav-status">
                            <span className="status-indicator"></span>
                            <span>Torre de Controle 24/7 Ativa</span>
                        </div>
                    </div>

                    <nav className="mobile-nav-list">
                        {navItems.map((item) => {
                            const IconComponent = item.icon;
                            const isActive = !item.isExternal && location.pathname === item.path;

                            if (item.isExternal) {
                                return (
                                    <a
                                        key={item.label}
                                        href={item.path}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mobile-nav-item"
                                        onClick={() => setMenuActive(false)}
                                    >
                                        <div className="mobile-nav-item-left">
                                            <div className="mobile-nav-icon">
                                                <IconComponent weight="duotone" />
                                            </div>
                                            <span className="mobile-nav-label">{item.label}</span>
                                            {item.badge && <span className="mobile-nav-badge external">{item.badge}</span>}
                                        </div>
                                        <ArrowUpRight size={18} className="mobile-nav-arrow" />
                                    </a>
                                );
                            }

                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`mobile-nav-item ${isActive ? 'active' : ''}`}
                                    onClick={() => setMenuActive(false)}
                                >
                                    <div className="mobile-nav-item-left">
                                        <div className="mobile-nav-icon">
                                            <IconComponent weight={isActive ? "fill" : "duotone"} />
                                        </div>
                                        <span className="mobile-nav-label">{item.label}</span>
                                        {item.badge && <span className="mobile-nav-badge">{item.badge}</span>}
                                    </div>
                                    <CaretRight size={18} className="mobile-nav-arrow" />
                                </Link>
                            );
                        })}
                    </nav>

                    {/* CTAs de Ação Rápida */}
                    <div className="mobile-nav-actions">
                        <Link 
                            to="/contato" 
                            className="mobile-btn-primary" 
                            onClick={() => setMenuActive(false)}
                        >
                            <span>Solicitar Cotação de Frete</span>
                            <ArrowRight size={18} weight="bold" />
                        </Link>
                        <a 
                            href="https://wa.me/5583999999999" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="mobile-btn-whatsapp"
                            onClick={() => setMenuActive(false)}
                        >
                            <WhatsappLogo size={20} weight="fill" />
                            <span>WhatsApp Comercial</span>
                        </a>
                    </div>

                    {/* Rodapé institucional com contato rápido */}
                    <div className="mobile-nav-footer">
                        <div className="mobile-nav-footer-item">
                            <ShieldCheck size={18} weight="fill" color="#19A3DF" />
                            <span>Cargas 100% Monitoradas via Satélite</span>
                        </div>
                        <p className="mobile-nav-footer-contact">
                            Matriz: João Pessoa - PB | comercial@expressopb.com
                        </p>
                    </div>
                </div>
            </div>
        </header>
    );
};
export default Header;
