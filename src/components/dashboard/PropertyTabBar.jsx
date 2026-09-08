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
            icon: GlobeHemisphereWest
        },
        {
            id: 'bio',
            title: 'Link da Bio',
            subtitle: 'Redes Sociais & Mobile',
            icon: DeviceMobile
        },
        {
            id: 'blog',
            title: 'Blog de Logística',
            subtitle: 'Inbound SEO & Conteúdo',
            icon: Article
        }
    ];

    return (
        <div className="dash-property-tabs" aria-label="Seletor de Propriedade Analítica">
            <div className="dash-property-segmented-bar">
                {properties.map((prop) => {
                    const Icon = prop.icon;
                    const isActive = activeProperty === prop.id;
                    const propConfig = allConfigs?.[prop.id];
                    const isLive = propConfig?.mode === 'api';

                    return (
                        <button
                            key={prop.id}
                            type="button"
                            className={`dash-property-segment ${isActive ? 'active' : ''}`}
                            onClick={() => onSelectProperty(prop.id)}
                            disabled={loading}
                        >
                            <Icon weight={isActive ? "fill" : "bold"} size={17} className="dash-segment-icon" />
                            <span className="dash-segment-title">{prop.title}</span>
                            <span className="dash-segment-desc hide-mobile">• {prop.subtitle}</span>
                            <span 
                                className={`dash-prop-status-dot ${isLive ? 'dot-live' : 'dot-demo'}`} 
                                title={isLive ? 'GA4 Conectado' : 'Modo Demonstração'} 
                            />
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default PropertyTabBar;
