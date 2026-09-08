import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 20px',
          textAlign: 'center',
          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        }}>
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#0F172A', marginBottom: '12px' }}>
            Ops! Algo deu errado ao carregar esta área.
          </h2>
          <p style={{ color: '#64748B', maxWidth: '480px', marginBottom: '24px', lineHeight: '1.6', fontSize: '15px' }}>
            Ocorreu um erro inesperado. Você pode tentar recarregar a página ou voltar para a página inicial.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              type="button"
              onClick={() => window.location.reload()}
              style={{
                padding: '10px 22px',
                background: '#FF7A00',
                color: '#fff',
                borderRadius: '8px',
                border: 'none',
                fontWeight: 600,
                fontSize: '14px',
                cursor: 'pointer'
              }}
            >
              Recarregar Página
            </button>
            <a
              href="/"
              style={{
                padding: '10px 22px',
                background: '#F1F5F9',
                color: '#0F172A',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '14px',
                display: 'inline-flex',
                alignItems: 'center'
              }}
            >
              Ir para o Início
            </a>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
