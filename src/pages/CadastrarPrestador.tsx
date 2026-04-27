import { useState } from 'react';
import { Tractor, Save, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function CadastrarPrestador() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Form state
  const [nome, setNome] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [cpfCnpj, setCpfCnpj] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [cidadeEstado, setCidadeEstado] = useState('');
  const [regiao, setRegiao] = useState('');
  const [machineType, setMachineType] = useState('');
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [ano, setAno] = useState('');
  const [quantidade, setQuantidade] = useState('1');

  // Checkboxes
  const [servicosCorte, setServicosCorte] = useState(false);
  const [servicosTransp, setServicosTransp] = useState(false);
  const [servicosCompact, setServicosCompact] = useState(false);
  const [servicosVedacao, setServicosVedacao] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Parse cidade/estado
    const parts = cidadeEstado.split(',').map(s => s.trim());
    const cidade = parts[0] || cidadeEstado;
    const estado = parts[1] || '';

    const payload = {
      nome,
      empresa: empresa || null,
      cpfCnpj,
      telefone,
      email,
      cidade,
      estado,
      regiao,
      servicosCorte,
      servicosTransp,
      servicosCompact,
      servicosVedacao,
      maquinas: machineType ? [{
        tipo: machineType,
        marca: marca || null,
        modelo: modelo || null,
        ano: ano ? parseInt(ano) : null,
        quantidade: parseInt(quantidade) || 1,
      }] : [],
    };

    try {
      const res = await fetch('/api/prestadores', {
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
        nome,
        role: 'prestador',
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
        <h2 style={{ marginBottom: '1rem', color: 'var(--lime)' }}>Cadastro realizado com sucesso!</h2>
        <p className="text-muted" style={{ fontSize: '1.1rem', marginBottom: '2rem' }}>
          Bem-vindo à Conexão Forragem. Em breve você receberá oportunidades de serviço da sua região diretamente no WhatsApp.
        </p>
        <Link to="/" className="btn-primary" style={{ padding: '1rem 2rem' }}>
          Voltar para o início
        </Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ maxWidth: '900px', paddingTop: '40px', paddingBottom: '80px' }}>
      <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--muted)', marginBottom: '32px' }}>
        <ArrowLeft size={20} />
        Voltar para o início
      </Link>

      <div style={{ background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px', borderBottom: '1px solid var(--border)', paddingBottom: '24px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(120, 212, 74, 0.15)', color: 'var(--lime)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Tractor size={24} />
          </div>
          <div>
            <h1 style={{ fontSize: '1.5rem' }}>Cadastrar como Prestador</h1>
            <p className="text-muted">Preencha seus dados para receber oportunidades de serviço.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2" style={{ gap: '24px' }}>
            {/* Informações Básicas */}
            <div style={{ gridColumn: '1 / -1' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '16px', color: 'var(--lime)' }}>Informações Básicas</h3>
            </div>
            
            <div style={{ marginBottom: 0 }}>
              <label className="text-muted" style={{ fontSize: '0.85rem', display: 'block', marginBottom: '6px' }}>Nome do prestador *</label>
              <input type="text" className="form-control" placeholder="Seu nome completo" required value={nome} onChange={e => setNome(e.target.value)} />
            </div>

            <div style={{ marginBottom: 0 }}>
              <label className="text-muted" style={{ fontSize: '0.85rem', display: 'block', marginBottom: '6px' }}>Nome da empresa (Opcional)</label>
              <input type="text" className="form-control" placeholder="Razão social ou nome fantasia" value={empresa} onChange={e => setEmpresa(e.target.value)} />
            </div>
            
            <div style={{ marginBottom: 0 }}>
              <label className="text-muted" style={{ fontSize: '0.85rem', display: 'block', marginBottom: '6px' }}>CPF ou CNPJ *</label>
              <input type="text" className="form-control" placeholder="000.000.000-00" required value={cpfCnpj} onChange={e => setCpfCnpj(e.target.value)} />
            </div>

            <div style={{ marginBottom: 0 }}>
              <label className="text-muted" style={{ fontSize: '0.85rem', display: 'block', marginBottom: '6px' }}>Telefone / WhatsApp *</label>
              <input type="tel" className="form-control" placeholder="(00) 00000-0000" required value={telefone} onChange={e => setTelefone(e.target.value)} />
            </div>

            <div style={{ marginBottom: 0 }}>
              <label className="text-muted" style={{ fontSize: '0.85rem', display: 'block', marginBottom: '6px' }}>E-mail *</label>
              <input type="email" className="form-control" placeholder="seu@email.com" required value={email} onChange={e => setEmail(e.target.value)} />
            </div>

            <div style={{ marginBottom: 0 }}>
              <label className="text-muted" style={{ fontSize: '0.85rem', display: 'block', marginBottom: '6px' }}>Cidade e Estado sede *</label>
              <input type="text" className="form-control" placeholder="Ex: Castro, PR" required value={cidadeEstado} onChange={e => setCidadeEstado(e.target.value)} />
            </div>

            <div style={{ gridColumn: '1 / -1', marginBottom: 0 }}>
              <label className="text-muted" style={{ fontSize: '0.85rem', display: 'block', marginBottom: '6px' }}>Região de atendimento *</label>
              <input type="text" className="form-control" placeholder="Ex: Num raio de 200km de Castro, Sul de SP, etc." required value={regiao} onChange={e => setRegiao(e.target.value)} />
            </div>

            {/* Operação */}
            <div style={{ gridColumn: '1 / -1', marginTop: '16px' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '16px', color: 'var(--lime)' }}>Sua Operação</h3>
              <p className="text-muted" style={{ marginBottom: '16px', fontSize: '0.9rem' }}>Quais etapas do serviço você realiza?</p>
              
              <div className="grid grid-cols-2" style={{ gap: '12px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input type="checkbox" checked={servicosCorte} onChange={e => setServicosCorte(e.target.checked)} /> Corte da silagem
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input type="checkbox" checked={servicosTransp} onChange={e => setServicosTransp(e.target.checked)} /> Transporte da silagem
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input type="checkbox" checked={servicosCompact} onChange={e => setServicosCompact(e.target.checked)} /> Compactação
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input type="checkbox" checked={servicosVedacao} onChange={e => setServicosVedacao(e.target.checked)} /> Vedação do silo
                </label>
              </div>
            </div>

            {/* Máquinas */}
            <div style={{ gridColumn: '1 / -1', marginTop: '16px', padding: '24px', background: 'var(--bg2)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '16px' }}>Máquinas de Corte</h3>
              
              <div style={{ marginBottom: '24px' }}>
                <label className="text-muted" style={{ fontSize: '0.85rem', display: 'block', marginBottom: '6px' }}>Tipo de máquina de corte *</label>
                <select className="form-control" value={machineType} onChange={(e) => setMachineType(e.target.value)} required>
                  <option value="">Selecione...</option>
                  <option value="autopropelida">Apenas Forrageira Autopropelida</option>
                  <option value="trator">Apenas Máquina montada em trator</option>
                  <option value="ambas">Possuo ambas</option>
                </select>
              </div>

              {machineType && (
                <div className="grid grid-cols-2" style={{ gap: '16px' }}>
                  <div>
                    <label className="text-muted" style={{ fontSize: '0.85rem', display: 'block', marginBottom: '6px' }}>Marca</label>
                    <input type="text" className="form-control" placeholder="Ex: Claas, John Deere, Krone..." value={marca} onChange={e => setMarca(e.target.value)} />
                  </div>
                  <div>
                    <label className="text-muted" style={{ fontSize: '0.85rem', display: 'block', marginBottom: '6px' }}>Modelo</label>
                    <input type="text" className="form-control" placeholder="Ex: Jaguar 950" value={modelo} onChange={e => setModelo(e.target.value)} />
                  </div>
                  <div>
                    <label className="text-muted" style={{ fontSize: '0.85rem', display: 'block', marginBottom: '6px' }}>Ano</label>
                    <input type="number" className="form-control" placeholder="Ex: 2020" value={ano} onChange={e => setAno(e.target.value)} />
                  </div>
                  <div>
                    <label className="text-muted" style={{ fontSize: '0.85rem', display: 'block', marginBottom: '6px' }}>Quantidade</label>
                    <input type="number" className="form-control" value={quantidade} onChange={e => setQuantidade(e.target.value)} />
                  </div>
                </div>
              )}
            </div>

            {/* CTA */}
            <div style={{ gridColumn: '1 / -1', marginTop: '16px' }}>
              <div style={{ border: '1px solid var(--lime)', borderRadius: 'var(--radius-lg)', padding: '24px', background: 'rgba(120, 212, 74, 0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <CheckCircle2 size={20} color="var(--lime)" />
                  <h3 style={{ fontSize: '1.1rem', color: 'var(--lime)' }}>Acesso gratuito para os primeiros prestadores</h3>
                </div>
                <p className="text-muted" style={{ fontSize: '0.9rem' }}>
                  Ao se cadastrar agora, você garante acesso completo à plataforma sem custo. Visualize demandas, entre em contato direto com produtores e feche serviços sem comissão.
                </p>
              </div>
            </div>

          </div>

          <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'flex-end', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
            <button type="submit" className="btn-primary" style={{ padding: '16px 32px', fontSize: '1.05rem' }} disabled={isSubmitting}>
              {isSubmitting ? 'Enviando cadastro...' : (
                <>
                  Finalizar Cadastro
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
