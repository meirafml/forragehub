import { Link } from 'react-router-dom';
import { Tractor, Sprout, ShieldCheck, Zap, Users, ArrowRight } from 'lucide-react';

export function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section style={{ 
        padding: '80px 0 120px', 
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Abstract background elements */}
        <div style={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(16,185,129,0.15) 0%, rgba(11,15,25,0) 70%)',
          borderRadius: '50%',
          filter: 'blur(40px)',
          zIndex: -1
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '10%',
          left: '-10%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(52,211,153,0.1) 0%, rgba(11,15,25,0) 70%)',
          borderRadius: '50%',
          filter: 'blur(40px)',
          zIndex: -1
        }}></div>

        <div className="container text-center">
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', background: 'var(--accent-light)', color: 'var(--accent-color)', borderRadius: '100px', fontSize: '0.875rem', fontWeight: 600, marginBottom: '24px' }}>
            <Zap size={16} />
            A maior rede de forragem do Brasil
          </div>
          <h1 style={{ fontSize: '4rem', marginBottom: '24px', letterSpacing: '-0.02em', lineHeight: '1.1' }}>
            Conectando quem precisa de <br />
            <span className="text-gradient">silagem, feno e pré-secado</span> <br />
            a quem faz.
          </h1>
          <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '650px', margin: '0 auto 40px' }}>
            A plataforma simples e direta para pecuaristas encontrarem prestadores de serviço com máquinas e estrutura para colher e processar sua lavoura.
          </p>
          
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/cadastrar-demanda" className="btn btn-primary" style={{ padding: '16px 32px', fontSize: '1.1rem' }}>
              <Sprout size={20} />
              Preciso de serviço (Silagem/Feno)
            </Link>
            <Link to="/cadastrar-prestador" className="btn btn-secondary" style={{ padding: '16px 32px', fontSize: '1.1rem' }}>
              <Tractor size={20} />
              Sou prestador de serviço
            </Link>
          </div>
        </div>
      </section>



      {/* How it works */}
      <section style={{ padding: '80px 0', backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="text-center mb-8">
            <h2 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Como funciona?</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Sem burocracia. Sem comissões obrigatórias. Apenas oportunidades reais.</p>
          </div>

          <div className="grid grid-cols-3" style={{ gap: '32px' }}>
            <div className="card text-center" style={{ padding: '40px 24px' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'var(--accent-light)', color: 'var(--accent-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                <Sprout size={32} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '16px' }}>1. Cadastre sua demanda</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Pecuarista informa o tipo de cultura, área, previsão de colheita e máquina desejada gratuitamente.</p>
            </div>
            
            <div className="card text-center" style={{ padding: '40px 24px' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'var(--accent-light)', color: 'var(--accent-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                <Users size={32} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '16px' }}>2. Conexão imediata</h3>
              <p style={{ color: 'var(--text-secondary)' }}>A demanda vira uma oportunidade visível para prestadores de serviço ativos na região.</p>
            </div>

            <div className="card text-center" style={{ padding: '40px 24px' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'var(--accent-light)', color: 'var(--accent-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                <ShieldCheck size={32} />
              </div>
              <h3 style={{ fontSize: '1.25rem', marginBottom: '16px' }}>3. Negociação direta</h3>
              <p style={{ color: 'var(--text-secondary)' }}>O prestador entra em contato direto com o pecuarista para combinar valores, prazos e fechar o serviço.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '100px 0' }}>
        <div className="container">
          <div className="glass-panel" style={{ padding: '60px 40px', textAlign: 'center', background: 'linear-gradient(135deg, rgba(28,33,40,0.8), rgba(16,185,129,0.1))' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '24px' }}>Pronto para fechar mais negócios?</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto 32px' }}>
              Veja as oportunidades abertas na sua região e encontre clientes com demanda real por silagem, feno ou pré-secado hoje mesmo.
            </p>
            <Link to="/oportunidades" className="btn btn-primary" style={{ padding: '16px 32px', fontSize: '1.1rem' }}>
              Ver oportunidades agora
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
