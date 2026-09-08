import React from 'react';
import { 
    ShieldCheck, 
    Lightning, 
    Sparkle, 
    CheckCircle,
    Truck,
    ClockAfternoon
} from '@phosphor-icons/react';

export const ExecutiveInsightBar = ({ period = '30d' }) => {
    return (
        <section className="dash-exec-bar" aria-label="Barra de Inteligência Executiva">
            {/* Lado Esquerdo: Pilares Operacionais B2B */}
            <div className="dash-exec-metrics">
                <div className="dash-exec-item" title="SLA de pontualidade contratual em cargas lotação">
                    <div className="dash-exec-badge success">
                        <CheckCircle weight="fill" size={14} />
                        <span>SLA 99.4%</span>
                    </div>
                    <span className="dash-exec-label">Entregas no Prazo</span>
                </div>

                <div className="dash-exec-divider hide-mobile"></div>

                <div className="dash-exec-item" title="Diferencial exclusivo Expresso PB: eliminação total de cobrança de pernoite">
                    <div className="dash-exec-badge cyan">
                        <ShieldCheck weight="fill" size={14} />
                        <span>Isenção de Pernoite</span>
                    </div>
                    <span className="dash-exec-label">0% Custo Oculto em Docas</span>
                </div>

                <div className="dash-exec-divider hide-mobile"></div>

                <div className="dash-exec-item" title="Torre de controle operacional e monitoramento por satélite">
                    <div className="dash-exec-badge sky">
                        <Lightning weight="fill" size={14} />
                        <span>Torre 24/7 Ativa</span>
                    </div>
                    <span className="dash-exec-label">Telemetria em Tempo Real</span>
                </div>
            </div>

            {/* Lado Direito: Insight Estratégico do Período */}
            <div className="dash-exec-insight">
                <div className="dash-insight-icon">
                    <Sparkle weight="fill" size={16} />
                </div>
                <div className="dash-insight-text">
                    <strong>Insight B2B ({period}):</strong> O setor de <em>Construção Civil</em> lidera a demanda de frota dedicada com 42% do volume. O canal <em>WhatsApp Comercial</em> converte 3.2x mais rápido que formulários tradicionais.
                </div>
            </div>
        </section>
    );
};

export default ExecutiveInsightBar;
