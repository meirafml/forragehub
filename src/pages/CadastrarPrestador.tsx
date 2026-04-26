import { useState } from 'react';
import { Tractor, Save, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export function CadastrarPrestador() {
  const navigate = useNavigate();
  const [machineType, setMachineType] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Cadastro realizado com sucesso! Bem-vindo à Conexão Forragem.');
      navigate('/oportunidades');
    }, 1500);
  };

  return (
    <div className="container" style={{ maxWidth: '900px', paddingTop: '40px', paddingBottom: '80px' }}>
      <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', marginBottom: '32px' }}>
        <ArrowLeft size={20} />
        Voltar para o início
      </Link>

      <div className="card" style={{ padding: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px', borderBottom: '1px solid var(--border-color)', paddingBottom: '24px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--accent-light)', color: 'var(--accent-color)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Tractor size={24} />
          </div>
          <div>
            <h1 style={{ fontSize: '1.5rem' }}>Cadastro de Prestador de Serviço</h1>
            <p style={{ color: 'var(--text-secondary)' }}>Cadastre sua estrutura e acesse demandas reais de silagem.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2" style={{ gap: '24px' }}>
            {/* Informações Básicas */}
            <div style={{ gridColumn: '1 / -1' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '16px', color: 'var(--accent-color)' }}>Informações Básicas</h3>
            </div>
            
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Nome do prestador</label>
              <input type="text" className="form-control" placeholder="Seu nome completo" required />
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Nome da empresa (Opcional)</label>
              <input type="text" className="form-control" placeholder="Razão social ou nome fantasia" />
            </div>
            
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">CPF ou CNPJ</label>
              <input type="text" className="form-control" placeholder="000.000.000-00" required />
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Telefone / WhatsApp</label>
              <input type="tel" className="form-control" placeholder="(00) 00000-0000" required />
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">E-mail</label>
              <input type="email" className="form-control" placeholder="seu@email.com" required />
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Cidade e Estado sede</label>
              <input type="text" className="form-control" placeholder="Ex: Castro, PR" required />
            </div>

            <div className="form-group" style={{ gridColumn: '1 / -1', marginBottom: 0 }}>
              <label className="form-label">Região de atendimento</label>
              <input type="text" className="form-control" placeholder="Ex: Num raio de 200km de Castro, Sul de SP, etc." required />
            </div>

            {/* Operação */}
            <div style={{ gridColumn: '1 / -1', marginTop: '16px' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '16px', color: 'var(--accent-color)' }}>Sua Operação</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '16px', fontSize: '0.9rem' }}>Quais etapas do serviço você realiza?</p>
              
              <div className="grid grid-cols-3" style={{ gap: '12px' }}>
                <label className="checkbox-group"><input type="checkbox" /> Corte da silagem</label>
                <label className="checkbox-group"><input type="checkbox" /> Transporte da silagem</label>
                <label className="checkbox-group"><input type="checkbox" /> Compactação</label>
                <label className="checkbox-group"><input type="checkbox" /> Vedação do silo</label>
                <label className="checkbox-group"><input type="checkbox" /> Aplicação de inoculante</label>
                <label className="checkbox-group"><input type="checkbox" /> Consultoria técnica</label>
              </div>
            </div>

            {/* Máquinas e Equipamentos */}
            <div style={{ gridColumn: '1 / -1', marginTop: '16px', padding: '24px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-md)' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '16px', color: 'var(--text-primary)' }}>Máquinas de Corte</h3>
              
              <div className="form-group" style={{ marginBottom: '24px' }}>
                <label className="form-label">Tipo de máquina de corte</label>
                <select 
                  className="form-control" 
                  value={machineType}
                  onChange={(e) => setMachineType(e.target.value)}
                  required
                >
                  <option value="">Selecione...</option>
                  <option value="autopropelida">Apenas Forrageira Autopropelida</option>
                  <option value="trator">Apenas Máquina montada em trator</option>
                  <option value="ambas">Possuo ambas</option>
                </select>
              </div>

              {machineType && (
                <div className="grid grid-cols-2" style={{ gap: '16px', animation: 'fadeIn 0.3s ease-in-out' }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Marca da máquina principal</label>
                    <input type="text" className="form-control" placeholder="Ex: Claas, John Deere, Krone..." />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Modelo</label>
                    <input type="text" className="form-control" placeholder="Ex: Jaguar 950" />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Ano</label>
                    <input type="number" className="form-control" placeholder="Ex: 2020" />
                  </div>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label className="form-label">Quantidade de máquinas</label>
                    <input type="number" className="form-control" defaultValue="1" />
                  </div>
                </div>
              )}
            </div>

            {/* Plataformas e Acessórios */}
            <div style={{ gridColumn: '1 / -1', marginTop: '16px' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '16px', color: 'var(--accent-color)' }}>Plataformas e Acessórios</h3>
              <div className="grid grid-cols-3" style={{ gap: '12px' }}>
                <label className="checkbox-group"><input type="checkbox" /> Plataforma de milho</label>
                <label className="checkbox-group"><input type="checkbox" /> Plataforma de capim</label>
                <label className="checkbox-group"><input type="checkbox" /> Recolhedor</label>
                <label className="checkbox-group"><input type="checkbox" /> Plataforma Kemper</label>
                <label className="checkbox-group"><input type="checkbox" /> Plataforma rotativa</label>
                <label className="checkbox-group"><input type="checkbox" /> Plataforma de linha</label>
              </div>
            </div>

            {/* Infraestrutura Adicional */}
            <div style={{ gridColumn: '1 / -1', marginTop: '16px' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '16px', color: 'var(--accent-color)' }}>Infraestrutura Adicional</h3>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Infraestrutura de Transporte</label>
              <select className="form-control" required>
                <option value="">Selecione...</option>
                <option value="propria">Tenho frota própria (Tratores, Caminhões, Transbordos)</option>
                <option value="terceirizada">Trabalho com frota terceirizada</option>
                <option value="nao">Não possuo, faço apenas o corte</option>
              </select>
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label">Infraestrutura de Compactação</label>
              <select className="form-control" required>
                <option value="">Selecione...</option>
                <option value="trator">Trator para compactação</option>
                <option value="pa">Pá-carregadeira</option>
                <option value="rolo">Rolo compactador</option>
                <option value="nao">Não possuo compactação</option>
              </select>
            </div>

            {/* Planos */}
            <div style={{ gridColumn: '1 / -1', marginTop: '32px' }}>
              <div style={{ border: '2px solid var(--accent-color)', borderRadius: 'var(--radius-lg)', padding: '24px', background: 'rgba(16, 185, 129, 0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', color: 'var(--accent-color)', marginBottom: '8px' }}>Plano de Acesso Profissional</h3>
                    <p style={{ color: 'var(--text-secondary)' }}>Acesso ilimitado a todas as demandas de silagem da sua região.</p>
                    <ul style={{ marginTop: '16px', listStyle: 'none' }}>
                      <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                        <CheckCircle2 size={18} color="var(--accent-color)" /> Visualizar detalhes das demandas
                      </li>
                      <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                        <CheckCircle2 size={18} color="var(--accent-color)" /> Contato direto com o pecuarista
                      </li>
                      <li style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <CheckCircle2 size={18} color="var(--accent-color)" /> Sem comissões por serviço fechado
                      </li>
                    </ul>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--text-primary)' }}>R$ 100<span style={{ fontSize: '1rem', color: 'var(--text-secondary)', fontWeight: 400 }}>/mês</span></div>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>Cobrado anualmente (12x de R$ 100)</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'flex-end', gap: '16px', alignItems: 'center' }}>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Ao continuar, você será direcionado para o pagamento.</p>
            <button type="submit" className="btn btn-primary" style={{ padding: '16px 32px' }} disabled={isSubmitting}>
              {isSubmitting ? 'Processando...' : (
                <>
                  Continuar para Pagamento
                  <Save size={20} />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
