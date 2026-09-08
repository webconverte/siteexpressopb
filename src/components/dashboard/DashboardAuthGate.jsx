import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
    LockKey, 
    LockKeyOpen, 
    Eye, 
    EyeSlash, 
    ShieldCheck, 
    ArrowLeft, 
    WarningCircle,
    Key
} from '@phosphor-icons/react';
import logo from '../../assets/logo fundo escuro.svg';

const DASH_AUTH_KEY = 'expressopb_dash_authenticated';
const CORRECT_PASSWORD = '123456';

export const DashboardAuthGate = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return sessionStorage.getItem(DASH_AUTH_KEY) === 'true';
    });
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [shake, setShake] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!password.trim()) {
            setError('Por favor, informe a senha de acesso.');
            triggerShake();
            return;
        }

        setIsSubmitting(true);

        setTimeout(() => {
            if (password === CORRECT_PASSWORD) {
                sessionStorage.setItem(DASH_AUTH_KEY, 'true');
                setIsAuthenticated(true);
            } else {
                setError('Senha incorreta. Verifique suas credenciais.');
                triggerShake();
                setPassword('');
            }
            setIsSubmitting(false);
        }, 200);
    };

    const triggerShake = () => {
        setShake(true);
        setTimeout(() => setShake(false), 500);
    };

    const handleLogout = () => {
        sessionStorage.removeItem(DASH_AUTH_KEY);
        setIsAuthenticated(false);
        setPassword('');
        setError('');
    };

    if (isAuthenticated) {
        if (typeof children === 'function') {
            return children({ onLogout: handleLogout });
        }
        return React.cloneElement(children, { onLogout: handleLogout });
    }

    return (
        <div className="dash-auth-overlay">
            <div className={`dash-auth-card ${shake ? 'dash-auth-shake' : ''}`}>
                <div className="dash-auth-header">
                    <Link to="/" className="dash-auth-logo-link" title="Voltar para a página inicial">
                        <img src={logo} alt="Expresso PB Logística" className="dash-auth-logo" />
                    </Link>
                    <div className="dash-auth-shield-icon">
                        <LockKey size={26} weight="duotone" />
                    </div>
                    <h2 className="dash-auth-title">Painel de Performance B2B</h2>
                    <p className="dash-auth-subtitle">
                        Área restrita à diretoria e gestão de inteligência logística da Expresso PB.
                    </p>
                </div>

                {error && (
                    <div className="dash-auth-error">
                        <WarningCircle size={16} weight="fill" />
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="dash-auth-form">
                    <div className="dash-auth-input-group">
                        <label htmlFor="dash-password">Senha de Acesso</label>
                        <div className="dash-auth-input-wrapper">
                            <Key size={16} weight="bold" className="dash-auth-key-icon" />
                            <input
                                id="dash-password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Digite a senha de segurança..."
                                autoFocus
                                autoComplete="current-password"
                                className="dash-auth-input"
                            />
                            <button
                                type="button"
                                className="dash-auth-toggle-pwd"
                                onClick={() => setShowPassword(!showPassword)}
                                title={showPassword ? "Ocultar senha" : "Ver senha"}
                                tabIndex="-1"
                            >
                                {showPassword ? <EyeSlash size={16} /> : <Eye size={16} />}
                            </button>
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        className="dash-auth-submit-btn"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <span>Autenticando...</span>
                        ) : (
                            <>
                                <LockKeyOpen size={16} weight="bold" />
                                <span>Acessar Painel B2B</span>
                            </>
                        )}
                    </button>
                </form>

                <div className="dash-auth-footer">
                    <Link to="/" className="dash-auth-back-link">
                        <ArrowLeft size={14} weight="bold" />
                        <span>Voltar para o site institucional</span>
                    </Link>
                    <span className="dash-auth-security-badge">
                        <ShieldCheck size={13} weight="fill" /> Acesso Protegido
                    </span>
                </div>
            </div>
        </div>
    );
};

export default DashboardAuthGate;
