import React, { useState, useEffect, useRef } from 'react';
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
    ShieldCheck,
    CaretDown
} from '@phosphor-icons/react';
import logo from '../assets/logo fundo escuro.svg';

const Header = () => {
    const [menuActive, setMenuActive] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);
    const dropdownTimeoutRef = useRef(null);
    const location = useLocation();

    // Fecha os menus automaticamente sempre que a rota mudar
    useEffect(() => {
        setMenuActive(false);
        setOpenDropdown(null);
    }, [location.pathname]);

    // Cleanup do timeout ao desmontar
    useEffect(() => {
        return () => {
            if (dropdownTimeoutRef.current) {
                clearTimeout(dropdownTimeoutRef.current);
            }
        };
    }, []);

    const handleMouseEnter = (menu) => {
        if (dropdownTimeoutRef.current) {
            clearTimeout(dropdownTimeoutRef.current);
        }
        setOpenDropdown(menu);
    };

    const handleMouseLeave = () => {
        dropdownTimeoutRef.current = setTimeout(() => {
            setOpenDropdown(null);
        }, 220); // 220ms grace period para o mouse transitar sem sumir
    };

    const handleDropdownClick = () => {
        if (dropdownTimeoutRef.current) {
            clearTimeout(dropdownTimeoutRef.current);
        }
        setOpenDropdown(null);
    };

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
        { path: '/servicos', label: 'Serviços & Frota', icon: Truck },
        { 
            path: 'https://blog.expressopb.com', 
            label: 'Blog', 
            icon: Article, 
            isExternal: true 
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
                    
                    {/* Menu Institucional com Dropdown */}
                    <li 
                        className={`nav-dropdown-item ${openDropdown === 'institucional' ? 'is-open' : ''}`}
                        onMouseEnter={() => handleMouseEnter('institucional')}
                        onMouseLeave={handleMouseLeave}
                    >
                        <span 
                            className={`nav-dropdown-trigger ${['/sobre', '/atuacao', '/trabalhe-conosco'].includes(location.pathname) ? 'active-link' : ''}`}
                            onClick={() => setOpenDropdown(openDropdown === 'institucional' ? null : 'institucional')}
                        >
                            Institucional <CaretDown size={13} weight="bold" />
                        </span>
                        <div className="nav-dropdown-menu">
                            <Link to="/sobre" className={location.pathname === '/sobre' ? 'active' : ''} onClick={handleDropdownClick}>
                                Sobre Nós
                            </Link>
                            <Link to="/atuacao" className={location.pathname === '/atuacao' ? 'active' : ''} onClick={handleDropdownClick}>
                                Área de Atuação
                            </Link>
                            <Link to="/trabalhe-conosco" className={location.pathname === '/trabalhe-conosco' ? 'active' : ''} onClick={handleDropdownClick}>
                                Trabalhe Conosco
                            </Link>
                        </div>
                    </li>

                    {/* Menu Segmentos com Dropdown */}
                    <li 
                        className={`nav-dropdown-item ${openDropdown === 'segmentos' ? 'is-open' : ''}`}
                        onMouseEnter={() => handleMouseEnter('segmentos')}
                        onMouseLeave={handleMouseLeave}
                    >
                        <span 
                            className={`nav-dropdown-trigger ${location.pathname.startsWith('/segmentos') ? 'active-link' : ''}`}
                            onClick={() => setOpenDropdown(openDropdown === 'segmentos' ? null : 'segmentos')}
                        >
                            Segmentos <CaretDown size={13} weight="bold" />
                        </span>
                        <div className="nav-dropdown-menu">
                            <Link to="/segmentos/construcao-civil" className={location.pathname === '/segmentos/construcao-civil' ? 'active' : ''} onClick={handleDropdownClick}>
                                Construção Civil & Cerâmica
                            </Link>
                            <Link to="/segmentos/alimentos-bebidas" className={location.pathname === '/segmentos/alimentos-bebidas' ? 'active' : ''} onClick={handleDropdownClick}>
                                Alimentos & Bebidas
                            </Link>
                            <Link to="/segmentos/papel-celulose" className={location.pathname === '/segmentos/papel-celulose' ? 'active' : ''} onClick={handleDropdownClick}>
                                Papel, Celulose & FMCG
                            </Link>
                            <Link to="/segmentos/maquinario-metalmecanica" className={location.pathname === '/segmentos/maquinario-metalmecanica' ? 'active' : ''} onClick={handleDropdownClick}>
                                Maquinário & Metalmecânica
                            </Link>
                        </div>
                    </li>

                    <li><Link to="/servicos" className={location.pathname === '/servicos' ? 'active-link' : ''}>Serviços & Frota</Link></li>
                    <li><a href="https://blog.expressopb.com" target="_blank" rel="noopener noreferrer">Blog</a></li>
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

                        {/* Bloco Institucional Mobile */}
                        <div className="mobile-segmentos-box">
                            <span className="mobile-segmentos-title">Institucional</span>
                            <div className="mobile-segmentos-grid">
                                <Link 
                                    to="/sobre" 
                                    className={`mobile-sub-link ${location.pathname === '/sobre' ? 'active' : ''}`}
                                    onClick={() => setMenuActive(false)}
                                >
                                    <Buildings size={16} weight="duotone" /> Sobre Nós
                                </Link>
                                <Link 
                                    to="/atuacao" 
                                    className={`mobile-sub-link ${location.pathname === '/atuacao' ? 'active' : ''}`}
                                    onClick={() => setMenuActive(false)}
                                >
                                    <MapPin size={16} weight="duotone" /> Área de Atuação
                                </Link>
                                <Link 
                                    to="/trabalhe-conosco" 
                                    className={`mobile-sub-link ${location.pathname === '/trabalhe-conosco' ? 'active' : ''}`}
                                    onClick={() => setMenuActive(false)}
                                >
                                    <Users size={16} weight="duotone" /> Trabalhe Conosco
                                </Link>
                            </div>
                        </div>

                        {/* Bloco de Segmentos Dedicados Mobile */}
                        <div className="mobile-segmentos-box">
                            <span className="mobile-segmentos-title">Segmentos Dedicados B2B</span>
                            <div className="mobile-segmentos-grid">
                                <Link 
                                    to="/segmentos/construcao-civil" 
                                    className={`mobile-sub-link ${location.pathname === '/segmentos/construcao-civil' ? 'active' : ''}`}
                                    onClick={() => setMenuActive(false)}
                                >
                                    <CaretRight size={14} weight="bold" /> Construção Civil & Cerâmica
                                </Link>
                                <Link 
                                    to="/segmentos/alimentos-bebidas" 
                                    className={`mobile-sub-link ${location.pathname === '/segmentos/alimentos-bebidas' ? 'active' : ''}`}
                                    onClick={() => setMenuActive(false)}
                                >
                                    <CaretRight size={14} weight="bold" /> Alimentos & Bebidas
                                </Link>
                                <Link 
                                    to="/segmentos/papel-celulose" 
                                    className={`mobile-sub-link ${location.pathname === '/segmentos/papel-celulose' ? 'active' : ''}`}
                                    onClick={() => setMenuActive(false)}
                                >
                                    <CaretRight size={14} weight="bold" /> Papel, Celulose & FMCG
                                </Link>
                                <Link 
                                    to="/segmentos/maquinario-metalmecanica" 
                                    className={`mobile-sub-link ${location.pathname === '/segmentos/maquinario-metalmecanica' ? 'active' : ''}`}
                                    onClick={() => setMenuActive(false)}
                                >
                                    <CaretRight size={14} weight="bold" /> Maquinário & Metalmecânica
                                </Link>
                            </div>
                        </div>
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
