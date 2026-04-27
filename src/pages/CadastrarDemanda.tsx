import { useState } from 'react';
import { Sprout, Save, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function CadastrarDemanda() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Form state
  const [responsavel, setResponsavel] = useState('');
  const [propriedade, setPropriedade] = useState('');
  const [cidadeEstado, setCidadeEstado] = useState('');
  const [telefone, setTelefone] = useState('');
  const [aceitaContato, setAceitaContato] = useState('true');
  const [mapsLink, setMapsLink] = useState('');
  const [tipoServico, setTipoServico] = useState('');
  const [cultura, setCultura] = useState('');
  const [areaHectares, setAreaHectares] = useState('');
  const [dataPlantio, setDataPlantio] = useState('');
  const [previsaoColheita, setPrevisaoColheita] = useState('');
  const [terreno, setTerreno] = useState('');
  const [acesso, setAcesso] = useState('');
  const [estruturaApoio, setEstruturaApoio] = useState('');
  const [maquinaDesejada, setMaquinaDesejada] = useState('');
  const [historicoAutoProp, setHistoricoAutoProp] = useState('');
  const [observacoes, setObservacoes] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const parts = cidadeEstado.split(',').map(s => s.trim());
    const cidade = parts[0] || cidadeEstado;
    const estado = parts[1] || '';

    const payload = {
      responsavel,
      propriedade,
      cidade,
      estado,
      telefone,
      mapsLink: mapsLink || null,
      tipoServico,
      cultura,
      areaHectares: parseFloat(areaHectares),
      dataPlantio: dataPlantio ? new Date(dataPlantio).toISOString() : null,
      previsaoColheita,
      terreno,
      acesso,
      estruturaApoio: estruturaApoio || null,
      maquinaDesejada,
      historicoAutoProp: maquinaDesejada === 'autopropelida' ? historicoAutoProp : null,
      observacoes: observacoes || null,
      aceitaContato: aceitaContato === 'true',
    };

    try {
      const res = await fetch('/api/demandas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Erro ao cadastrar');
      }

      const data = await res.json();

      // Save session and redirect to portal
      login({
        id: data.id || 'new',
        nome: responsavel,
        role: 'produtor',
      });

      navigate('/portal');
    } catch (err: any) {
      console.error(err);
      alert(err.message || 'Ocorreu um erro ao enviar. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="container" style={{ maxWidth: '600px', paddingTop: '60px', paddingBottom: '80px', textAlign: 'center' }}>
        <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'var(--lime)', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
          <CheckCircle2 size={36} />
        </div>
        <h2 style={{ marginBottom: '1rem', color: 'var(--lime)' }}>Demanda publicada com sucesso!</h2>
        <p className="text-muted" style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>
          Sua lavoura já está visível para prestadores da sua região. Quando alguém tiver interesse, entrarão em contato pelo WhatsApp.
        </p>
        <Link to="/" className="btn-primary" style={{ padding: '1rem 2rem' }}>
          Voltar para o início
        </Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ maxWidth: '800px', paddingTop: '40px', paddingBottom: '80px' }}>
      <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--muted)', marginBottom: '32px' }}>
        <ArrowLeft size={20} />
        Voltar para o início
      </Link>

      <div style={{ background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px', borderBottom: '1px solid var(--border)', paddingBottom: '24px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(120, 212, 74, 0.15)', color: 'var(--lime)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Sprout size={24} />
          </div>
          <div>
            <h1 style={{ fontSize: '1.5rem' }}>Cadastrar Demanda de Silagem</h1>
            <p className="text-muted">Preencha os dados para encontrar prestadores na sua região.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2" style={{ gap: '24px' }}>
            {/* Informações Básicas */}
            <div style={{ gridColumn: '1 / -1' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '16px', color: 'var(--lime)' }}>Informações Básicas</h3>
            </div>
            
            <div>
              <label className="text-muted" style={{ fontSize: '0.85rem', display: 'block', marginBottom: '6px' }}>Nome do responsável *</label>
              <input type="text" className="form-control" placeholder="Seu nome completo" required value={responsavel} onChange={e => setResponsavel(e.target.value)} />
            </div>
            
            <div>
              <label className="text-muted" style={{ fontSize: '0.85rem', display: 'block', marginBottom: '6px' }}>Nome da propriedade *</label>
              <input type="text" className="form-control" placeholder="Fazenda, Sítio, etc." required value={propriedade} onChange={e => setPropriedade(e.target.value)} />
            </div>

            <div>
              <label className="text-muted" style={{ fontSize: '0.85rem', display: 'block', marginBottom: '6px' }}>Cidade e Estado *</label>
              <input type="text" className="form-control" placeholder="Ex: Castro, PR" required value={cidadeEstado} onChange={e => setCidadeEstado(e.target.value)} />
            </div>

            <div>
              <label className="text-muted" style={{ fontSize: '0.85rem', display: 'block', marginBottom: '6px' }}>Telefone / WhatsApp *</label>
              <input type="tel" className="form-control" placeholder="(00) 00000-0000" required value={telefone} onChange={e => setTelefone(e.target.value)} />
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <label className="text-muted" style={{ fontSize: '0.85rem', display: 'block', marginBottom: '6px' }}>Preferência de Contato</label>
              <select className="form-control" value={aceitaContato} onChange={e => setAceitaContato(e.target.value)}>
                <option value="true">Quero receber ligações/mensagens dos prestadores</option>
                <option value="false">Quero apenas listar a demanda (telefone ficará oculto)</option>
              </select>
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <label className="text-muted" style={{ fontSize: '0.85rem', display: 'block', marginBottom: '6px' }}>Link do Google Maps da lavoura (Opcional)</label>
              <input type="url" className="form-control" placeholder="https://maps.app.goo.gl/..." value={mapsLink} onChange={e => setMapsLink(e.target.value)} />
              <p className="text-muted" style={{ fontSize: '0.8rem', marginTop: '6px' }}>Ajuda os prestadores a calcularem a distância exata.</p>
            </div>

            {/* Dados da Lavoura */}
            <div style={{ gridColumn: '1 / -1', marginTop: '16px' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '16px', color: 'var(--lime)' }}>Dados da Lavoura</h3>
            </div>

            <div>
              <label className="text-muted" style={{ fontSize: '0.85rem', display: 'block', marginBottom: '6px' }}>Serviço Desejado *</label>
              <select className="form-control" required value={tipoServico} onChange={e => setTipoServico(e.target.value)}>
                <option value="">Selecione...</option>
                <option value="silagem">Silagem</option>
                <option value="feno">Feno</option>
                <option value="pre_secado">Pré-secado</option>
              </select>
            </div>

            <div>
              <label className="text-muted" style={{ fontSize: '0.85rem', display: 'block', marginBottom: '6px' }}>Tipo de cultura *</label>
              <select className="form-control" required value={cultura} onChange={e => setCultura(e.target.value)}>
                <option value="">Selecione...</option>
                <optgroup label="Tradicionais">
                  <option value="milho">Milho</option>
                  <option value="sorgo">Sorgo</option>
                </optgroup>
                <optgroup label="Capins Tropicais">
                  <option value="capiacu">BRS Capiaçu / Napier</option>
                  <option value="mombaca">Mombaça / BRS Zuri</option>
                  <option value="brachiaria">Brachiaria (Marandu, etc)</option>
                </optgroup>
                <optgroup label="Feno / Pré-secado">
                  <option value="tifton">Tifton 85 / Jiggs / Coastcross</option>
                  <option value="alfafa">Alfafa</option>
                </optgroup>
                <optgroup label="Inverno (Sul)">
                  <option value="aveia">Aveia</option>
                  <option value="azevem">Azevém</option>
                </optgroup>
                <option value="outro">Outra cultura</option>
              </select>
            </div>

            <div>
              <label className="text-muted" style={{ fontSize: '0.85rem', display: 'block', marginBottom: '6px' }}>Área aproximada (ha) *</label>
              <input type="number" className="form-control" placeholder="Ex: 50" required value={areaHectares} onChange={e => setAreaHectares(e.target.value)} />
            </div>

            <div>
              <label className="text-muted" style={{ fontSize: '0.85rem', display: 'block', marginBottom: '6px' }}>Data de plantio (Aprox.)</label>
              <input type="date" className="form-control" value={dataPlantio} onChange={e => setDataPlantio(e.target.value)} />
            </div>

            <div>
              <label className="text-muted" style={{ fontSize: '0.85rem', display: 'block', marginBottom: '6px' }}>Previsão para colheita *</label>
              <input type="text" className="form-control" placeholder="Ex: Março/2026" required value={previsaoColheita} onChange={e => setPrevisaoColheita(e.target.value)} />
            </div>

            {/* Condições */}
            <div style={{ gridColumn: '1 / -1', marginTop: '16px' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '16px', color: 'var(--lime)' }}>Condições e Estrutura</h3>
            </div>

            <div>
              <label className="text-muted" style={{ fontSize: '0.85rem', display: 'block', marginBottom: '6px' }}>Tipo de terreno *</label>
              <select className="form-control" required value={terreno} onChange={e => setTerreno(e.target.value)}>
                <option value="">Selecione...</option>
                <option value="plano">Plano</option>
                <option value="ondulado">Ondulado (Leve declive)</option>
                <option value="acidentado">Acidentado (Forte declive)</option>
              </select>
            </div>

            <div>
              <label className="text-muted" style={{ fontSize: '0.85rem', display: 'block', marginBottom: '6px' }}>Condições de acesso *</label>
              <select className="form-control" required value={acesso} onChange={e => setAcesso(e.target.value)}>
                <option value="">Selecione...</option>
                <option value="bom">Bom (Acesso fácil para caminhões)</option>
                <option value="regular">Regular</option>
                <option value="ruim">Ruim (Acesso restrito/difícil)</option>
              </select>
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <label className="text-muted" style={{ fontSize: '0.85rem', display: 'block', marginBottom: '6px' }}>Estrutura de apoio (Opcional)</label>
              <input type="text" className="form-control" placeholder="Ex: Tenho 2 tratores com carreta e 1 trator para compactar" value={estruturaApoio} onChange={e => setEstruturaApoio(e.target.value)} />
            </div>

            {/* Preferência de Máquina */}
            <div style={{ gridColumn: '1 / -1', marginTop: '16px', padding: '24px', background: 'var(--bg2)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '16px' }}>Preferência de Máquina</h3>
              
              <div style={{ marginBottom: maquinaDesejada === 'autopropelida' ? '24px' : 0 }}>
                <label className="text-muted" style={{ fontSize: '0.85rem', display: 'block', marginBottom: '6px' }}>Qual tipo de máquina você deseja? *</label>
                <select className="form-control" value={maquinaDesejada} onChange={(e) => setMaquinaDesejada(e.target.value)} required>
                  <option value="">Selecione...</option>
                  <option value="autopropelida">Apenas forrageira autopropelida</option>
                  <option value="trator">Aceito máquina montada em trator</option>
                  <option value="ambas">Aceito avaliar as duas opções</option>
                </select>
              </div>

              {maquinaDesejada === 'autopropelida' && (
                <div style={{ marginTop: '16px' }}>
                  <label className="text-muted" style={{ fontSize: '0.85rem', display: 'block', marginBottom: '6px' }}>Já foi feita silagem com autopropelida nessa propriedade?</label>
                  <select className="form-control" value={historicoAutoProp} onChange={e => setHistoricoAutoProp(e.target.value)} required>
                    <option value="">Selecione...</option>
                    <option value="sim">Sim</option>
                    <option value="nao">Não</option>
                    <option value="nao-sei">Não sei informar</option>
                  </select>
                  <p className="text-muted" style={{ fontSize: '0.8rem', marginTop: '6px' }}>Ajuda a entender se o relevo é adequado para este tipo de máquina.</p>
                </div>
              )}
            </div>

            <div style={{ gridColumn: '1 / -1', marginTop: '16px' }}>
              <label className="text-muted" style={{ fontSize: '0.85rem', display: 'block', marginBottom: '6px' }}>Observações adicionais (Opcional)</label>
              <textarea className="form-control" rows={4} placeholder="Detalhes adicionais importantes para o prestador..." value={observacoes} onChange={e => setObservacoes(e.target.value)}></textarea>
            </div>
          </div>

          <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" className="btn-primary" style={{ padding: '16px 32px', fontSize: '1.05rem' }} disabled={isSubmitting}>
              {isSubmitting ? 'Publicando...' : (
                <>
                  <Save size={20} />
                  Publicar Demanda
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
