import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Home } from './pages/Home';
import { CadastrarDemanda } from './pages/CadastrarDemanda';
import { CadastrarPrestador } from './pages/CadastrarPrestador';
import { Oportunidades } from './pages/Oportunidades';
import { Tractor, Sprout, Briefcase, Menu, X } from 'lucide-react';
import { useState } from 'react';

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <header style={{
        background: 'rgba(22, 27, 34, 0.8)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border-color)',
        position: 'sticky',
        top: 0,
        zIndex: 50
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '80px' }}>
          <Link to="/" className="flex items-center gap-2" style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>
            <Tractor size={32} color="var(--accent-color)" />
            <span style={{ fontSize: '1.25rem', fontWeight: 700 }}>Conexão<span style={{ color: 'var(--accent-color)' }}>Forragem</span></span>
          </Link>
          
          <nav className="hidden md:flex gap-4" style={{ display: 'flex', alignItems: 'center' }}>
            <Link to="/oportunidades" className="btn btn-secondary">
              <Briefcase size={18} />
              Ver Oportunidades
            </Link>
            <Link to="/cadastrar-demanda" className="btn btn-primary">
              <Sprout size={18} />
              Preciso de Silagem
            </Link>
            <Link to="/cadastrar-prestador" className="btn btn-secondary" style={{ borderColor: 'transparent' }}>
              Sou Prestador
            </Link>
          </nav>
        </div>
      </header>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cadastrar-demanda" element={<CadastrarDemanda />} />
          <Route path="/cadastrar-prestador" element={<CadastrarPrestador />} />
          <Route path="/oportunidades" element={<Oportunidades />} />
        </Routes>
      </main>

      <footer style={{ borderTop: '1px solid var(--border-color)', padding: '40px 0', backgroundColor: 'var(--bg-secondary)', textAlign: 'center', color: 'var(--text-secondary)' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '16px' }}>
            <Tractor size={24} color="var(--text-secondary)" />
            <span style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>Conexão<span style={{ color: 'var(--text-secondary)' }}>Forragem</span></span>
          </div>
          <p>Conectando pecuaristas e prestadores de serviço de silagem de forma simples e rápida.</p>
          <p style={{ marginTop: '24px', fontSize: '0.875rem' }}>&copy; {new Date().getFullYear()} Conexão Forragem. Todos os direitos reservados.</p>
        </div>
      </footer>
    </>
  );
}

export default App;
