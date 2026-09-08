import React from 'react'
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
import Dashboard from './pages/Dashboard'
import { useEffect } from 'react'

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
    <>
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
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      {!isDashboard && <Footer />}
    </>
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
