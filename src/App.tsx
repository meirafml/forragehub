import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Home } from './pages/Home';
import { CadastrarDemanda } from './pages/CadastrarDemanda';
import { CadastrarPrestador } from './pages/CadastrarPrestador';
import { Oportunidades } from './pages/Oportunidades';
import { Login } from './pages/Login';
import { Tractor } from 'lucide-react';
import { useEffect } from 'react';

// Scroll to top on every route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

function App() {
  return (
    <>
      <ScrollToTop />
      <header style={{
        background: 'rgba(6, 15, 9, 0.8)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border)',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        height: '80px',
        display: 'flex',
        alignItems: 'center'
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <Link to="/" className="flex items-center gap-2" style={{ color: 'var(--text)', textDecoration: 'none' }}>
            <Tractor size={32} color="var(--lime)" />
            <span className="header-logo-text" style={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.02em' }}>Conexão<span style={{ color: 'var(--lime)' }}>Forragem</span></span>
          </Link>
          
          {/* Desktop Nav - Hidden on mobile (<900px) */}
          <nav className="desktop-nav" style={{ display: 'none' }}>
            <a href="/#problema" style={{ color: 'var(--text)', fontWeight: 500, fontSize: '0.95rem' }}>O Problema</a>
            <a href="/#como-funciona" style={{ color: 'var(--text)', fontWeight: 500, fontSize: '0.95rem' }}>Como Funciona</a>
            <a href="/#prestadores" style={{ color: 'var(--text)', fontWeight: 500, fontSize: '0.95rem' }}>Prestadores</a>
            <a href="/#pecuaristas" style={{ color: 'var(--text)', fontWeight: 500, fontSize: '0.95rem' }}>Produtores</a>
          </nav>

          <div>
            <Link to="/cadastrar-prestador" className="btn-primary" style={{ fontSize: '0.95rem' }}>
              <span className="header-cta-text">Quero me cadastrar</span>
              <span className="header-cta-short">Cadastrar</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Global Style overrides */}
      <style>{`
        @media (min-width: 900px) {
          .desktop-nav {
            display: flex !important;
            align-items: center;
            gap: 24px;
          }
        }
        /* Hero grid: 2 cols desktop, 1 col mobile */
        .hero-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 3rem;
          align-items: center;
        }
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .hero-cards { max-width: 100% !important; margin-left: 0 !important; }
          .hero-metrics { grid-template-columns: 1fr 1fr 1fr !important; gap: 1rem !important; }
          .hero-metrics .metric-value { font-size: 1.25rem !important; }
          .hero-btns { flex-direction: column; }
          .hero-btns a { width: 100%; text-align: center; justify-content: center; }
          .hero-subtitle { font-size: 1rem !important; }
          .step-number { font-size: 2rem !important; }
          .agenda-card { padding: 1.5rem !important; gap: 2rem !important; }
          .agenda-title { font-size: 1.3rem !important; }
          .pricing-box { padding: 1.5rem !important; flex-direction: column !important; text-align: center !important; }
          .pricing-box .text-right { text-align: center !important; }
          .pricing-value { font-size: 2rem !important; }
          .producer-section { gap: 2rem !important; }
          .producer-form { padding: 1.5rem !important; }
          .cta-section { padding: 4rem 0 !important; }
          .footer-grid { gap: 2rem !important; margin-bottom: 2rem !important; }
          .header-logo-text { font-size: 1.2rem !important; }
          .header-cta-text { display: none; }
          .header-cta-short { display: inline !important; }
        }
        .header-cta-short { display: none; }
      `}</style>

      <main className="main-content" style={{ paddingTop: '80px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cadastrar-demanda" element={<CadastrarDemanda />} />
          <Route path="/cadastrar-prestador" element={<CadastrarPrestador />} />
          <Route path="/oportunidades" element={<Oportunidades />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>

      <footer style={{ borderTop: '1px solid var(--border)', padding: '60px 0 40px', backgroundColor: 'var(--bg)', color: 'var(--muted)' }}>
        <div className="container">
          <div className="grid grid-cols-3 footer-grid" style={{ gap: '40px', marginBottom: '60px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <Tractor size={24} color="var(--lime)" />
                <span style={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.02em', color: 'var(--text)' }}>Conexão<span style={{ color: 'var(--lime)' }}>Forragem</span></span>
              </div>
              <p style={{ marginBottom: '24px' }}>Feito para quem não pode esperar a janela fechar.</p>
              <a href="https://wa.me/5511999999999" target="_blank" rel="noreferrer" className="btn-outline">
                Falar pelo WhatsApp
              </a>
            </div>
            
            <div>
              <h4 style={{ color: 'var(--text)', marginBottom: '16px', fontSize: '1.1rem' }}>Navegação</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <li><a href="/#problema" style={{ color: 'var(--muted)' }}>O Problema</a></li>
                <li><a href="/#como-funciona" style={{ color: 'var(--muted)' }}>Como Funciona</a></li>
                <li><a href="/#prestadores" style={{ color: 'var(--muted)' }}>Para Prestadores</a></li>
                <li><a href="/#pecuaristas" style={{ color: 'var(--muted)' }}>Para Produtores</a></li>
              </ul>
            </div>
            
            <div>
              <h4 style={{ color: 'var(--text)', marginBottom: '16px', fontSize: '1.1rem' }}>Empresa</h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <li><Link to="/cadastrar-prestador" style={{ color: 'var(--muted)' }}>Cadastro</Link></li>
                <li><a href="#" style={{ color: 'var(--muted)' }}>Contato</a></li>
                <li><a href="#" style={{ color: 'var(--muted)' }}>Política de Privacidade</a></li>
                <li><a href="#" style={{ color: 'var(--muted)' }}>Termos de Uso</a></li>
              </ul>
            </div>
          </div>
          
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '24px', textAlign: 'center', fontSize: '0.85rem' }}>
            <p>© {new Date().getFullYear()} Conexão Forragem. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
