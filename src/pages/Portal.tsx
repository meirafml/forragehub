import { useAuth } from '../context/AuthContext';
import { Link, Navigate } from 'react-router-dom';
import { MapPin, Calendar, Sprout, Tractor, Plus, LogOut, User, Search } from 'lucide-react';

export function Portal() {
  const { user, logout } = useAuth();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="container" style={{ paddingTop: '40px', paddingBottom: '80px' }}>
      {/* Portal Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <div style={{ 
              width: '48px', height: '48px', borderRadius: '50%', 
              background: user.role === 'prestador' ? 'rgba(120, 212, 74, 0.15)' : 'rgba(229, 168, 32, 0.15)', 
              color: user.role === 'prestador' ? 'var(--lime)' : 'var(--amber)',
              display: 'flex', alignItems: 'center', justifyContent: 'center' 
            }}>
              {user.role === 'prestador' ? <Tractor size={24} /> : <Sprout size={24} />}
            </div>
            <div>
              <h1 style={{ fontSize: '1.5rem', marginBottom: '4px' }}>Olá, {user.nome.split(' ')[0]}!</h1>
              <span className="badge" style={{ 
                background: user.role === 'prestador' ? 'rgba(120, 212, 74, 0.1)' : 'rgba(229, 168, 32, 0.1)',
                borderColor: user.role === 'prestador' ? 'rgba(120, 212, 74, 0.3)' : 'rgba(229, 168, 32, 0.3)',
                color: user.role === 'prestador' ? 'var(--lime)' : 'var(--amber)',
              }}>
                {user.role === 'prestador' ? 'Prestador de Serviço' : 'Produtor / Pecuarista'}
              </span>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          {user.role === 'produtor' && (
            <Link to="/cadastrar-demanda" className="btn-primary" style={{ gap: '8px' }}>
              <Plus size={18} /> Nova Demanda
            </Link>
          )}
          <button onClick={logout} className="btn-outline" style={{ gap: '8px', cursor: 'pointer' }}>
            <LogOut size={18} /> Sair
          </button>
        </div>
      </div>

      {/* Content based on role */}
      {user.role === 'prestador' ? <PrestadorView /> : <ProdutorView />}
    </div>
  );
}

// =============================================
// PRESTADOR VIEW — Sees opportunities (demandas)
// =============================================
function PrestadorView() {
  const oportunidades = [
    {
      id: 1, cidade: 'Castro, PR', cultura: 'Milho', area: '120 ha',
      previsao: 'Março/2026', terreno: 'Plano', maquina: 'Autopropelida',
      servico: 'Corte e Transporte', dataCadastro: 'Há 2 dias',
      obs: 'Lavoura de alto rendimento, acesso fácil pela rodovia PR-151.',
    },
    {
      id: 2, cidade: 'Ponta Grossa, PR', cultura: 'Sorgo', area: '45 ha',
      previsao: 'Abril/2026', terreno: 'Ondulado', maquina: 'Ambas',
      servico: 'Serviço Completo', dataCadastro: 'Hoje',
      obs: 'Preciso de compactação pesada. Tenho 1 trator disponível para ajudar.',
    },
    {
      id: 3, cidade: 'Itapetininga, SP', cultura: 'Milho', area: '80 ha',
      previsao: 'Fevereiro/2026', terreno: 'Plano', maquina: 'Autopropelida',
      servico: 'Apenas Corte', dataCadastro: 'Há 5 dias',
      obs: 'Tenho frota própria para transporte. Preciso apenas de máquina com plataforma Kemper.',
    }
  ];

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <h2 style={{ fontSize: '1.3rem' }}>
          <Search size={20} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '8px' }} />
          Oportunidades de Serviço
        </h2>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <select className="form-control" style={{ width: 'auto', minWidth: '160px', padding: '8px 12px', fontSize: '0.9rem' }}>
            <option value="">Todas as regiões</option>
            <option value="pr">Paraná</option>
            <option value="sp">São Paulo</option>
          </select>
          <select className="form-control" style={{ width: 'auto', minWidth: '160px', padding: '8px 12px', fontSize: '0.9rem' }}>
            <option value="">Todas as culturas</option>
            <option value="milho">Milho</option>
            <option value="sorgo">Sorgo</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2" style={{ gap: '20px' }}>
        {oportunidades.map(op => (
          <div key={op.id} style={{ background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '24px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={16} color="var(--lime)" />
                <span style={{ fontWeight: 600 }}>{op.cidade}</span>
              </div>
              <span className="text-muted" style={{ fontSize: '0.8rem' }}>{op.dataCadastro}</span>
            </div>

            <div className="grid grid-cols-2" style={{ gap: '12px', marginBottom: '16px' }}>
              <div>
                <span className="text-muted" style={{ fontSize: '0.75rem', display: 'block', marginBottom: '2px' }}>Cultura / Área</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 500, fontSize: '0.95rem' }}>
                  <Sprout size={16} color="var(--lime)" />
                  {op.cultura} · {op.area}
                </div>
              </div>
              <div>
                <span className="text-muted" style={{ fontSize: '0.75rem', display: 'block', marginBottom: '2px' }}>Previsão</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 500, fontSize: '0.95rem' }}>
                  <Calendar size={16} color="var(--amber)" />
                  {op.previsao}
                </div>
              </div>
              <div>
                <span className="text-muted" style={{ fontSize: '0.75rem', display: 'block', marginBottom: '2px' }}>Máquina</span>
                <span style={{ fontWeight: 500, fontSize: '0.95rem' }}>{op.maquina}</span>
              </div>
              <div>
                <span className="text-muted" style={{ fontSize: '0.75rem', display: 'block', marginBottom: '2px' }}>Serviço</span>
                <span style={{ fontWeight: 500, fontSize: '0.95rem' }}>{op.servico}</span>
              </div>
            </div>

            <div style={{ background: 'var(--bg2)', padding: '12px', borderRadius: 'var(--radius-sm)', marginBottom: '16px', flex: 1 }}>
              <p className="text-muted" style={{ fontSize: '0.85rem', fontStyle: 'italic' }}>"{op.obs}"</p>
              <span className="text-muted" style={{ fontSize: '0.8rem', marginTop: '8px', display: 'block' }}>Terreno: {op.terreno}</span>
            </div>

            <button className="btn-primary" style={{ width: '100%' }}>
              Entrar em Contato
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

// =============================================
// PRODUTOR VIEW — Sees their own demandas
// =============================================
function ProdutorView() {
  return (
    <>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '1.3rem', marginBottom: '8px' }}>Suas Demandas</h2>
        <p className="text-muted">Gerencie suas publicações de lavoura aqui.</p>
      </div>

      {/* Empty state */}
      <div style={{ 
        background: 'var(--bg3)', border: '1px dashed var(--border)', 
        borderRadius: 'var(--radius-lg)', padding: '60px 40px', textAlign: 'center' 
      }}>
        <Sprout size={48} color="var(--muted)" style={{ marginBottom: '16px' }} />
        <h3 style={{ marginBottom: '8px' }}>Nenhuma demanda publicada ainda</h3>
        <p className="text-muted" style={{ marginBottom: '24px', maxWidth: '400px', margin: '0 auto 24px' }}>
          Publique sua primeira lavoura e prestadores da sua região entrarão em contato.
        </p>
        <Link to="/cadastrar-demanda" className="btn-primary" style={{ padding: '1rem 2rem' }}>
          <Plus size={18} /> Publicar Primeira Demanda
        </Link>
      </div>
    </>
  );
}
