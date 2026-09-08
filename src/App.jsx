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
import { useEffect } from 'react'

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/servicos" element={<Servicos />} />
        <Route path="/atuacao" element={<Atuacao />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/trabalhe-conosco" element={<TrabalheConosco />} />
        <Route path="/segmentos/:slug" element={<SegmentoPage />} />
        <Route path="/segmentos" element={<SegmentoPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
