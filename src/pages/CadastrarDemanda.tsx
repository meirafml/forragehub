import { useState } from 'react';
import { Sprout, Save, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export function CadastrarDemanda() {
  const navigate = useNavigate();
  const [machineType, setMachineType] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Demanda cadastrada com sucesso!');
      navigate('/oportunidades');
    }, 1500);
  };

  return (
    <div className="container" style={{ maxWidth: '800px', paddingTop: '40px', paddingBottom: '80px' }}>
      <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', marginBottom: '32px' }}>
        <ArrowLeft size={20} />
        Voltar para o início
      </Link>

      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px', borderBottom: '1px solid var(--border-color)', paddingBottom: '24px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--accent-light)', color: 'var(--accent-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Sprout size={24} />
          </div>
          <div>
            <h1 style={{ fontSize: '1.5rem' }}>Cadastrar Demanda de Silagem</h1>
            <p style={{ color: 'var(--text-secondary)' }}>Preencha os dados para encontrar prestadores na sua região.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2" style={{ gap: '24px' }}>
            {/* Informações Básicas */}
            <div style={{ gridColumn: '1 / -1' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '16px', color: 'var(--accent-color)' }}>Informações Básicas</h3>
            </div>
            
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Nome do responsável</label>
              <input type="text" className="form-control" placeholder="Seu nome completo" required />
            </div>
            
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Nome da propriedade</label>
              <input type="text" className="form-control" placeholder="Fazenda, Sítio, etc." required />
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Cidade e Estado</label>
              <input type="text" className="form-control" placeholder="Ex: Castro, PR" required />
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Telefone / WhatsApp</label>
              <input type="tel" className="form-control" placeholder="(00) 00000-0000" required />
            </div>

            <div className="form-group" style={{ gridColumn: '1 / -1', marginBottom: 0 }}>
              <label className="form-label">Preferência de Contato</label>
              <select className="form-control" required>
                <option value="true">Quero receber ligações/mensagens dos prestadores de serviço</option>
                <option value="false">Quero apenas listar a demanda e eu mesmo escolherei com quem falar (Seu telefone ficará oculto)</option>
              </select>
            </div>

            <div className="form-group" style={{ gridColumn: '1 / -1', marginBottom: 0 }}>
              <label className="form-label">Link do Google Maps da lavoura (Opcional)</label>
              <input type="url" className="form-control" placeholder="https://maps.app.goo.gl/..." />
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '6px' }}>Ajuda os prestadores a calcularem a distância exata até a sua propriedade.</p>
            </div>

            {/* Dados da Lavoura */}
            <div style={{ gridColumn: '1 / -1', marginTop: '16px' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '16px', color: 'var(--accent-color)' }}>Dados da Lavoura</h3>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Serviço Desejado</label>
              <select className="form-control" required>
                <option value="">Selecione...</option>
                <option value="silagem">Silagem</option>
                <option value="feno">Feno</option>
                <option value="pre_secado">Pré-secado</option>
              </select>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Tipo de cultura</label>
              <select className="form-control" required>
                <option value="">Selecione...</option>
                <optgroup label="Tradicionais">
                  <option value="milho">Milho</option>
                  <option value="sorgo">Sorgo</option>
                </optgroup>
                <optgroup label="Capins Tropicais / Corte">
                  <option value="capiacu">BRS Capiaçu / Napier</option>
                  <option value="mombaca">Mombaça / BRS Zuri</option>
                  <option value="brachiaria">Brachiaria (Marandu, etc)</option>
                </optgroup>
                <optgroup label="Capins para Feno / Pré-secado">
                  <option value="tifton">Tifton 85 / Jiggs / Coastcross</option>
                  <option value="cynodon">Outros Cynodon</option>
                  <option value="alfafa">Alfafa</option>
                </optgroup>
                <optgroup label="Culturas de Inverno (Sul)">
                  <option value="aveia">Aveia</option>
                  <option value="azevem">Azevém</option>
                  <option value="trigo">Trigo</option>
                </optgroup>
                <option value="outro">Outra cultura</option>
              </select>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Área aproximada a ser colhida (ha)</label>
              <input type="number" className="form-control" placeholder="Ex: 50" required />
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Data de plantio (Aproximada)</label>
              <input type="date" className="form-control" />
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Previsão estimada para silagem</label>
              <input type="month" className="form-control" required />
            </div>

            {/* Condições e Estrutura */}
            <div style={{ gridColumn: '1 / -1', marginTop: '16px' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '16px', color: 'var(--accent-color)' }}>Condições e Estrutura</h3>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Tipo de terreno / relevo</label>
              <select className="form-control" required>
                <option value="">Selecione...</option>
                <option value="plano">Plano</option>
                <option value="ondulado">Ondulado (Leve declive)</option>
                <option value="acidentado">Acidentado (Forte declive)</option>
              </select>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Condições de acesso à propriedade</label>
              <select className="form-control" required>
                <option value="">Selecione...</option>
                <option value="bom">Bom (Acesso fácil para caminhões)</option>
                <option value="regular">Regular</option>
                <option value="ruim">Ruim (Acesso restrito/difícil)</option>
              </select>
            </div>

            <div className="form-group" style={{ gridColumn: '1 / -1', marginBottom: 0 }}>
              <label className="form-label">Você já possui alguma estrutura de apoio? (Ex: tratores para compactação, carretas)</label>
              <input type="text" className="form-control" placeholder="Ex: Tenho 2 tratores com carreta e 1 trator para compactar" />
            </div>

            {/* Preferência de Máquina */}
            <div style={{ gridColumn: '1 / -1', marginTop: '16px', padding: '24px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '16px', color: 'var(--text-primary)' }}>Preferência de Máquina</h3>
              
              <div className="form-group" style={{ marginBottom: machineType === 'autopropelida' ? '24px' : 0 }}>
                <label className="form-label">Qual tipo de máquina você deseja ou aceita para fazer sua silagem?</label>
                <select 
                  className="form-control" 
                  value={machineType}
                  onChange={(e) => setMachineType(e.target.value)}
                  required
                >
                  <option value="">Selecione uma opção...</option>
                  <option value="autopropelida">1. Quero fazer apenas com forrageira autopropelida</option>
                  <option value="trator">2. Aceito fazer com máquina montada em trator</option>
                  <option value="ambas">3. Aceito avaliar as duas opções</option>
                </select>
              </div>

              {machineType === 'autopropelida' && (
                <div className="form-group" style={{ marginBottom: 0, animation: 'fadeIn 0.3s ease-in-out' }}>
                  <label className="form-label" style={{ color: 'var(--accent-color)' }}>Já foi feita silagem nessa propriedade com máquina autopropelida?</label>
                  <select className="form-control" style={{ borderColor: 'var(--accent-color)' }} required>
                    <option value="">Selecione...</option>
                    <option value="sim">Sim</option>
                    <option value="nao">Não</option>
                    <option value="nao-sei">Não sei informar</option>
                  </select>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '8px' }}>
                    Esta informação ajuda a entender se o relevo e acessos são adequados para este tipo de máquina.
                  </p>
                </div>
              )}
            </div>

            <div className="form-group" style={{ gridColumn: '1 / -1', marginBottom: 0, marginTop: '16px' }}>
              <label className="form-label">Observações adicionais (Opcional)</label>
              <textarea className="form-control" rows={4} placeholder="Detalhes adicionais importantes para o prestador..."></textarea>
            </div>
          </div>

          <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" className="btn btn-primary" style={{ padding: '16px 32px' }} disabled={isSubmitting}>
              {isSubmitting ? 'Salvando...' : (
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
