import { MapPin, Calendar, Sprout, Tractor, ExternalLink, Navigation } from 'lucide-react';

export function Oportunidades() {
  // Mock data for opportunities
  const oportunidades = [
    {
      id: 1,
      cidade: 'Castro, PR',
      cultura: 'Milho',
      area: '120 ha',
      previsao: 'Março/2026',
      terreno: 'Plano',
      maquina: 'Autopropelida',
      historico: 'Sim',
      servico: 'Corte e Transporte',
      obs: 'Lavoura de alto rendimento, acesso fácil pela rodovia PR-151.',
      dataCadastro: 'Há 2 dias',
      distancia: '28 km de você',
      mapsLink: 'https://maps.app.goo.gl/placeholder'
    },
    {
      id: 2,
      cidade: 'Ponta Grossa, PR',
      cultura: 'Sorgo',
      area: '45 ha',
      previsao: 'Abril/2026',
      terreno: 'Ondulado',
      maquina: 'Ambas (Avaliar)',
      historico: 'Não sei informar',
      servico: 'Serviço Completo',
      obs: 'Preciso de compactação pesada. Tenho 1 trator disponível para ajudar.',
      dataCadastro: 'Hoje',
      distancia: '45 km de você',
      mapsLink: 'https://maps.app.goo.gl/placeholder'
    },
    {
      id: 3,
      cidade: 'Itapetininga, SP',
      cultura: 'Milho',
      area: '80 ha',
      previsao: 'Fevereiro/2026',
      terreno: 'Plano',
      maquina: 'Autopropelida',
      historico: 'Sim',
      servico: 'Apenas Corte',
      obs: 'Tenho frota própria para transporte. Preciso apenas de máquina com plataforma Kemper.',
      dataCadastro: 'Há 5 dias',
      distancia: '112 km de você',
      mapsLink: 'https://maps.app.goo.gl/placeholder'
    }
  ];

  return (
    <div className="container" style={{ padding: '40px 24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>Oportunidades de Serviço</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Encontre pecuaristas precisando de silagem na sua região.</p>
        </div>
        
        <div style={{ display: 'flex', gap: '16px' }}>
          <select className="form-control" style={{ width: 'auto', minWidth: '200px' }}>
            <option value="">Filtrar por Região</option>
            <option value="pr">Paraná</option>
            <option value="sp">São Paulo</option>
            <option value="mg">Minas Gerais</option>
          </select>
          <select className="form-control" style={{ width: 'auto', minWidth: '200px' }}>
            <option value="">Filtrar por Cultura</option>
            <option value="milho">Milho</option>
            <option value="sorgo">Sorgo</option>
            <option value="capim">Capim</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2" style={{ gap: '24px' }}>
        {oportunidades.map(op => (
          <div key={op.id} className="card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255, 255, 255, 0.05)', padding: '6px 12px', borderRadius: '100px', fontSize: '0.85rem' }}>
                  <MapPin size={16} color="var(--accent-color)" />
                  {op.cidade}
                </div>
                <a href={op.mapsLink} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--accent-color)', padding: '6px 12px', borderRadius: '100px', fontSize: '0.85rem', textDecoration: 'none', transition: 'all 0.2s' }} onMouseOver={(e) => e.currentTarget.style.background = 'rgba(16, 185, 129, 0.2)'} onMouseOut={(e) => e.currentTarget.style.background = 'rgba(16, 185, 129, 0.1)'}>
                  <Navigation size={16} />
                  {op.distancia}
                </a>
              </div>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{op.dataCadastro}</span>
            </div>

            <div className="grid grid-cols-2" style={{ gap: '16px', marginBottom: '24px', flex: 1 }}>
              <div>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Cultura e Área</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 500 }}>
                  <Sprout size={18} color="var(--accent-color)" />
                  {op.cultura} &bull; {op.area}
                </div>
              </div>
              
              <div>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Previsão de Colheita</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 500 }}>
                  <Calendar size={18} color="var(--accent-color)" />
                  {op.previsao}
                </div>
              </div>

              <div>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Máquina Desejada</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 500 }}>
                  <Tractor size={18} color="var(--accent-color)" />
                  {op.maquina}
                </div>
              </div>

              <div>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Serviço Necessário</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 500 }}>
                  {op.servico}
                </div>
              </div>
            </div>

            <div style={{ background: 'var(--bg-secondary)', padding: '16px', borderRadius: 'var(--radius-md)', marginBottom: '24px' }}>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                "{op.obs}"
              </p>
              <div style={{ marginTop: '12px', fontSize: '0.85rem', display: 'flex', gap: '16px' }}>
                <span><strong>Terreno:</strong> {op.terreno}</span>
                {op.maquina.includes('Autopropelida') && (
                  <span><strong>Já usou autopropelida?</strong> {op.historico}</span>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: 'auto' }}>
              <button className="btn btn-primary" style={{ flex: 1 }}>
                Enviar Proposta
              </button>
              <button className="btn btn-secondary" style={{ flex: 1 }}>
                Acessar Contato
                <ExternalLink size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
