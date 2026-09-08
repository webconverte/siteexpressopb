import React from 'react';
import { 
    GlobeHemisphereWest, 
    DeviceMobile, 
    Article,
    CheckCircle,
    WarningCircle
} from '@phosphor-icons/react';

export const PropertyTabBar = ({ 
    activeProperty, 
    onSelectProperty, 
    allConfigs, 
    loading 
}) => {
    const properties = [
        {
            id: 'site',
            title: 'Site Institucional',
            subtitle: 'Cotações FTL & Segmentos',
            icon: GlobeHemisphereWest,
            badge: 'Principal'
        },
        {
            id: 'bio',
            title: 'Link da Bio',
            subtitle: 'Redes Sociais & Mobile',
            icon: DeviceMobile,
            badge: 'Instagram / LinkedIn'
        },
        {
            id: 'blog',
            title: 'Blog de Logística',
            subtitle: 'Inbound SEO & Conteúdo',
            icon: Article,
            badge: 'Google Orgânico'
        }
    ];

    return (
        <nav className="dash-property-tabs" aria-label="Propriedades Analíticas">
            <div className="dash-property-tabs-container">
                {properties.map((prop) => {
                    const Icon = prop.icon;
                    const isActive = activeProperty === prop.id;
                    const propConfig = allConfigs?.[prop.id];
                    const isLive = propConfig?.mode === 'api';

                    return (
                        <button
                            key={prop.id}
                            type="button"
                            className={`dash-property-tab-btn ${isActive ? 'active' : ''}`}
                            onClick={() => onSelectProperty(prop.id)}
                            disabled={loading}
                        >
                            <div className="dash-prop-icon-box">
                                <Icon weight={isActive ? "duotone" : "regular"} size={20} />
                            </div>

                            <div className="dash-prop-text">
                                <div className="dash-prop-title-row">
                                    <span className="dash-prop-title">{prop.title}</span>
                                    <span className={`dash-prop-status-dot ${isLive ? 'dot-live' : 'dot-demo'}`} 
                                          title={isLive ? 'Conectado à API do GA4' : 'Modo Demonstração'} 
                                    />
                                </div>
                                <span className="dash-prop-subtitle">{prop.subtitle}</span>
                            </div>

                            <span className="dash-prop-badge hide-mobile">
                                {prop.badge}
                            </span>
                        </button>
                    );
                })}
            </div>
        </nav>
    );
};

export default PropertyTabBar;
