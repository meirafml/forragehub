import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Tractor, Sprout, ArrowRight, Lock, Mail } from 'lucide-react';

export function Login() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<'pecuarista' | 'prestador'>('pecuarista');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulação de login
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/oportunidades');
    }, 1500);
  };

  return (
    <div style={{ minHeight: 'calc(100vh - 80px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px', position: 'relative', overflow: 'hidden' }}>
      {/* Background Effects */}
      <div style={{ position: 'absolute', top: '20%', left: '10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(16,185,129,0.1) 0%, rgba(11,15,25,0) 70%)', borderRadius: '50%', filter: 'blur(40px)', zIndex: -1 }}></div>
      
      <div className="card" style={{ width: '100%', maxWidth: '480px', padding: '40px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 style={{ fontSize: '1.8rem', marginBottom: '8px' }}>Bem-vindo de volta</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Acesse sua conta para continuar</p>
        </div>

        {/* Toggle User Type */}
        <div style={{ display: 'flex', background: 'var(--bg-secondary)', padding: '4px', borderRadius: 'var(--radius-lg)', marginBottom: '32px' }}>
          <button 
            type="button"
            onClick={() => setUserType('pecuarista')}
            style={{ 
              flex: 1, 
              padding: '12px', 
              borderRadius: 'var(--radius-md)', 
              border: 'none', 
              background: userType === 'pecuarista' ? 'var(--bg-card)' : 'transparent',
              color: userType === 'pecuarista' ? 'var(--text-primary)' : 'var(--text-secondary)',
              boxShadow: userType === 'pecuarista' ? 'var(--shadow-sm)' : 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              fontWeight: 500,
              transition: 'var(--transition)'
            }}
          >
            <Sprout size={18} />
            Sou Cliente
          </button>
          <button 
            type="button"
            onClick={() => setUserType('prestador')}
            style={{ 
              flex: 1, 
              padding: '12px', 
              borderRadius: 'var(--radius-md)', 
              border: 'none', 
              background: userType === 'prestador' ? 'var(--bg-card)' : 'transparent',
              color: userType === 'prestador' ? 'var(--text-primary)' : 'var(--text-secondary)',
              boxShadow: userType === 'prestador' ? 'var(--shadow-sm)' : 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              fontWeight: 500,
              transition: 'var(--transition)'
            }}
          >
            <Tractor size={18} />
            Sou Prestador
          </button>
        </div>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label">E-mail</label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }}>
                <Mail size={20} />
              </div>
              <input 
                type="email" 
                className="form-control" 
                placeholder="seu@email.com" 
                style={{ paddingLeft: '48px' }}
                required 
              />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '8px' }}>
            <label className="form-label">Senha</label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }}>
                <Lock size={20} />
              </div>
              <input 
                type="password" 
                className="form-control" 
                placeholder="••••••••" 
                style={{ paddingLeft: '48px' }}
                required 
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '32px' }}>
            <a href="#" style={{ color: 'var(--accent-color)', fontSize: '0.875rem', textDecoration: 'none' }}>Esqueceu a senha?</a>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '16px', fontSize: '1.1rem' }} disabled={isSubmitting}>
            {isSubmitting ? 'Entrando...' : (
              <>
                Entrar na Plataforma
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>

        <div style={{ marginTop: '32px', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Não tem uma conta? <br />
          {userType === 'pecuarista' ? (
            <Link to="/cadastrar-demanda" style={{ color: 'var(--accent-color)', fontWeight: 600, textDecoration: 'none', display: 'inline-block', marginTop: '8px' }}>Cadastre sua primeira demanda</Link>
          ) : (
            <Link to="/cadastrar-prestador" style={{ color: 'var(--accent-color)', fontWeight: 600, textDecoration: 'none', display: 'inline-block', marginTop: '8px' }}>Cadastre-se como prestador</Link>
          )}
        </div>
      </div>
    </div>
  );
}
