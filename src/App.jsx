import React, { useEffect, Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Sobre from './pages/Sobre'
import Servicos from './pages/Servicos'
import Atuacao from './pages/Atuacao'
import Contato from './pages/Contato'
import TrabalheConosco from './pages/TrabalheConosco'
import SegmentoPage from './pages/SegmentoPage'
import ErrorBoundary from './components/ErrorBoundary'

const Dashboard = lazy(() => import('./pages/Dashboard'))

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const AppContent = () => {
  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard';

  return (
    <ErrorBoundary>
      <ScrollToTop />
      {!isDashboard && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/servicos" element={<Servicos />} />
        <Route path="/atuacao" element={<Atuacao />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/trabalhe-conosco" element={<TrabalheConosco />} />
        <Route path="/segmentos/:slug" element={<SegmentoPage />} />
        <Route path="/segmentos" element={<SegmentoPage />} />
        <Route 
          path="/dashboard" 
          element={
            <Suspense fallback={
              <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#090D16', color: '#94A3B8' }}>
                Carregando Dashboard...
              </div>
            }>
              <Dashboard />
            </Suspense>
          } 
        />
      </Routes>
      {!isDashboard && <Footer />}
    </ErrorBoundary>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App
