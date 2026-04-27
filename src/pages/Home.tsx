import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, AlertTriangle, ArrowRight, Check, Tractor, Wheat, Calendar, Phone } from 'lucide-react';

export function Home() {
  const [leadNome, setLeadNome] = useState('');
  const [leadWhatsapp, setLeadWhatsapp] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [leadSuccess, setLeadSuccess] = useState(false);
  const navigate = useNavigate();

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // In a real app, URL might need to be absolute if not proxied
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome: leadNome, whatsapp: leadWhatsapp })
      });
      setLeadSuccess(true);
      setLeadNome('');
      setLeadWhatsapp('');
    } catch (err) {
      console.error(err);
      alert('Ocorreu um erro ao enviar. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };
  // Simple intersection observer for fade-up animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.fade-up');
    elements.forEach((el) => observer.observe(el));

    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);

  return (
    <div>
      {/* ======================= HERO ======================= */}
      <section id="hero" style={{ 
        minHeight: 'calc(100vh - 80px)', 
        paddingTop: '2rem', 
        position: 'relative',
        background: 'radial-gradient(circle at 70% 30%, rgba(120,212,74,0.07) 0%, transparent 65%)'
      }}>
        <div className="container hero-grid">
          
          <div className="fade-up">
            <h1 className="display" style={{ marginBottom: '1.5rem' }}>
              Sua colhedora não pode ficar parada.
            </h1>
            <p className="hero-subtitle" style={{ fontSize: '1.15rem', color: 'var(--muted)', marginBottom: '2.5rem', maxWidth: '90%' }}>
              O Conexão Forragem coloca você em contato direto com produtores que precisam ensilar — na hora certa, sem intermediário, sem pagar comissão sobre o contrato.
            </p>
            
            <div className="flex gap-4 mb-8 hero-btns" style={{ flexWrap: 'wrap' }}>
              <Link to="/cadastrar-prestador" className="btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
                Quero me cadastrar gratuitamente
              </Link>
              <a href="#como-funciona" className="btn-outline" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
                Ver como funciona
              </a>
            </div>

            <div className="hero-metrics grid grid-cols-3 gap-6" style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem', alignItems: 'flex-start' }}>
              <div>
                <div className="metric-value" style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--lime)' }}>R$ 0</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--muted)', marginTop: '0.25rem' }}>Comissão sobre contratos</div>
              </div>
              <div>
                <div className="metric-value" style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--amber)' }}>3 dias</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--muted)', marginTop: '0.25rem' }}>Bastam para destruir a qualidade nutricional do silo</div>
              </div>
              <div>
                <div className="metric-value" style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--text)' }}>100%</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--muted)', marginTop: '0.25rem' }}>Gratuito para o produtor</div>
              </div>
            </div>
          </div>

          <div className="fade-up hero-cards" style={{ transitionDelay: '0.2s', position: 'relative', display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '420px', marginLeft: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0.5rem' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'var(--bg3)', padding: '6px 16px', borderRadius: '100px', border: '1px solid var(--border)' }}>
                <div className="status-dot"></div>
                <span style={{ fontSize: '0.85rem', color: 'var(--lime)', fontWeight: 600 }}>Oportunidades ao vivo</span>
              </div>
            </div>

            <div className="notif-card" style={{ margin: 0 }}>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <Tractor size={18} color="var(--lime)" />
                  <span style={{ fontWeight: 600, whiteSpace: 'nowrap' }}>Castro, PR</span>
                </div>
                <span className="text-muted" style={{ fontSize: '0.85rem', whiteSpace: 'nowrap' }}>28 km de você</span>
              </div>
              <div className="flex flex-col gap-2 mb-4" style={{ fontSize: '0.95rem' }}>
                <div className="flex items-center gap-2"><Wheat size={16} className="text-muted flex-shrink-0" /> <span>120 ha de Milho</span></div>
                <div className="flex items-center gap-2"><Calendar size={16} className="text-muted flex-shrink-0" /> <span>Março/2026</span></div>
                <div className="flex items-center gap-2"><Tractor size={16} className="text-muted flex-shrink-0" /> <span>Autopropelida · Corte e Transporte</span></div>
                <div className="flex items-center gap-2"><MapPin size={16} className="text-muted flex-shrink-0" /> <span>Terreno plano</span></div>
              </div>
              <div style={{ padding: '1rem', background: 'var(--bg)', borderRadius: '8px', fontStyle: 'italic', color: 'var(--muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>
                "Lavoura de alto rendimento, acesso fácil pela PR-151."
              </div>
              <button className="flex items-center gap-2 text-lime font-bold">
                <ArrowRight size={16} /> Ver contato
              </button>
            </div>

            <div className="notif-card urgent" style={{ margin: 0 }}>
              <div className="flex items-start gap-2 mb-2 text-danger font-bold">
                <AlertTriangle size={18} className="flex-shrink-0 mt-1" />
                <span>2 prestadores já enviaram proposta para este serviço.</span>
              </div>
              <p className="text-muted mb-4" style={{ fontSize: '0.95rem' }}>
                Sua máquina está a 28 km da lavoura em Castro-PR.<br/>Não perca a viagem.
              </p>
              <button className="flex items-center gap-2 text-danger font-bold">
                <ArrowRight size={16} /> Assinar e ver o contato
              </button>
            </div>
            
            <div className="notif-card" style={{ opacity: 0.5, margin: 0 }}>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <Tractor size={18} color="var(--lime)" />
                  <span style={{ fontWeight: 600, whiteSpace: 'nowrap' }}>Itapetininga, SP</span>
                </div>
                <span className="text-muted" style={{ fontSize: '0.85rem', whiteSpace: 'nowrap' }}>112 km</span>
              </div>
              <div className="flex flex-col gap-2 mb-4" style={{ fontSize: '0.95rem' }}>
                <div className="flex items-center gap-2"><Wheat size={16} className="text-muted flex-shrink-0" /> <span>80 ha de Milho</span></div>
                <div className="flex items-center gap-2"><Calendar size={16} className="text-muted flex-shrink-0" /> <span>Fevereiro/2026</span></div>
              </div>
              <button className="flex items-center gap-2 text-lime font-bold">
                <ArrowRight size={16} /> Ver contato
              </button>
            </div>
          </div>
          
        </div>
      </section>

      {/* ======================= O PROBLEMA ======================= */}
      <section id="problema" className="bg-alt">
        <div className="container fade-up">
          <div className="badge mb-4">O Problema</div>
          <h2 className="mb-4">Um mercado enorme operando no boca a boca.</h2>
          <p className="text-muted mb-12" style={{ fontSize: '1.2rem', maxWidth: '700px' }}>
            Dois lados do mesmo problema. A janela de corte dura dias — e as duas partes têm dificuldade de se encontrar a tempo.
          </p>

          <div className="grid grid-cols-2">
            <div style={{ background: 'var(--bg3)', padding: '3rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
              <div className="flex items-center gap-3 mb-6">
                <span style={{ fontSize: '2rem' }}>🌾</span>
                <h3 style={{ fontSize: '1.5rem' }}>Para o Produtor</h3>
              </div>
              <ul className="flex flex-col gap-4 text-muted">
                <li className="flex gap-3">
                  <div style={{ marginTop: '4px' }}><div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--amber)' }}></div></div>
                  A janela ideal de corte é curtíssima. Dias de atraso destroem o teor de matéria seca da lavoura.
                </li>
                <li className="flex gap-3">
                  <div style={{ marginTop: '4px' }}><div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--amber)' }}></div></div>
                  Encontrar maquinário disponível no momento certo ainda é feito pelo boca a boca — sem garantia, sem agilidade.
                </li>
                <li className="flex gap-3">
                  <div style={{ marginTop: '4px' }}><div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--amber)' }}></div></div>
                  Atrasar 3 dias na colheita do milho compromete o KPS e impacta diretamente o resultado do leite e da carne.
                </li>
              </ul>
            </div>

            <div style={{ background: 'var(--bg3)', padding: '3rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
              <div className="flex items-center gap-3 mb-6">
                <span style={{ fontSize: '2rem' }}>🚜</span>
                <h3 style={{ fontSize: '1.5rem' }}>Para o Prestador</h3>
              </div>
              <ul className="flex flex-col gap-4 text-muted">
                <li className="flex gap-3">
                  <div style={{ marginTop: '4px' }}><div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--danger)' }}></div></div>
                  Colhedoras autopropelidas exigem alto investimento. Máquina parada é dinheiro perdido todo dia.
                </li>
                <li className="flex gap-3">
                  <div style={{ marginTop: '4px' }}><div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--danger)' }}></div></div>
                  Prestadores experientes rodam o Brasil inteiro, mas prospectam novos clientes só dentro da própria rede de contatos.
                </li>
                <li className="flex gap-3">
                  <div style={{ marginTop: '4px' }}><div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--danger)' }}></div></div>
                  Dias livres na agenda sem serviço encadeado = custo fixo que corrói a margem do negócio.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ======================= COMO FUNCIONA ======================= */}
      <section id="como-funciona">
        <div className="container fade-up">
          <div className="badge mb-4">Como Funciona</div>
          <h2 className="mb-4">Simples para quem está no campo.</h2>
          <p className="text-muted mb-12" style={{ fontSize: '1.2rem', maxWidth: '800px' }}>
            Você vê as oportunidades disponíveis na sua região, filtra pelo que combina com seu equipamento e negocia direto com o produtor. Sem tabela de comissão. Sem taxa sobre o contrato.
          </p>

          <div className="grid grid-cols-3 mb-12">
            <div>
              <div className="step-number" style={{ fontSize: '3rem', fontWeight: 700, color: 'var(--border)', lineHeight: 1, marginBottom: '1rem' }}>01</div>
              <h3 className="mb-3">O produtor cadastra a lavoura</h3>
              <p className="text-muted">Ele informa cultura, tamanho da área, data prevista de corte, tipo de terreno e o serviço que precisa. O cadastro é gratuito.</p>
            </div>
            <div>
              <div className="step-number" style={{ fontSize: '3rem', fontWeight: 700, color: 'var(--border)', lineHeight: 1, marginBottom: '1rem' }}>02</div>
              <h3 className="mb-3">Você vê as demandas da sua região</h3>
              <p className="text-muted">Receba avisos no WhatsApp com a distância, tamanho da área e observações do produtor. Filtre pelo que combina com seu equipamento e sua agenda.</p>
            </div>
            <div>
              <div className="step-number" style={{ fontSize: '3rem', fontWeight: 700, color: 'var(--lime)', lineHeight: 1, marginBottom: '1rem' }}>03</div>
              <h3 className="mb-3 text-lime">Entre em contato e feche o serviço</h3>
              <p className="text-muted">Assinantes com acesso completo desbloqueiam o contato direto do produtor e negociam livremente. Sem intermediário. Sem comissão.</p>
            </div>
          </div>

          <div className="agenda-card" style={{ background: 'var(--bg3)', padding: '3rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '4rem', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 280px' }}>
              <div className="badge mb-4">Agenda Semáforo</div>
              <h3 className="agenda-title mb-4" style={{ fontSize: '1.5rem' }}>Sua agenda. Sua rota. Seu controle.</h3>
              <p className="text-muted">Marque os dias livres e ocupados. A plataforma mostra sua disponibilidade para os produtores da sua região — e ajuda a encadear os serviços para reduzir o deslocamento entre uma lavoura e outra.</p>
            </div>
            <div style={{ flex: '1 1 280px' }}>
              <div className="flex gap-4 text-sm font-bold mb-2 flex-wrap">
                <div className="flex items-center gap-2"><div style={{ width: '12px', height: '12px', borderRadius: '4px', background: 'var(--lime)' }}></div> Livre</div>
                <div className="flex items-center gap-2"><div style={{ width: '12px', height: '12px', borderRadius: '4px', background: 'var(--danger)' }}></div> Ocupado</div>
                <div className="flex items-center gap-2"><div style={{ width: '12px', height: '12px', borderRadius: '4px', background: 'var(--amber)' }}></div> Negociando</div>
              </div>
              <div className="calendar-grid">
                {[...Array(31)].map((_, i) => {
                  let statusClass = 'day-empty';
                  if (i > 3 && i < 10) statusClass = 'day-busy';
                  if (i >= 10 && i < 15) statusClass = 'day-free';
                  if (i >= 15 && i < 18) statusClass = 'day-negotiating';
                  return (
                    <div key={i} className={`calendar-day ${statusClass}`}>
                      {i + 1}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================= PARA PRESTADORES ======================= */}
      <section id="prestadores" className="bg-alt">
        <div className="container fade-up">
          <div className="badge mb-4">Para Prestadores de Serviço</div>
          <h2 className="mb-4" style={{ maxWidth: '800px' }}>Chega de máquina parada esperando o telefone tocar.</h2>
          <p className="text-muted mb-12" style={{ fontSize: '1.2rem', maxWidth: '800px' }}>
            Você já tem o equipamento certo. O que falta é uma ferramenta para encontrar quem precisa do seu serviço — antes que a janela feche.
          </p>

          <div className="grid grid-cols-2 mb-12">
            <div className="flex gap-4">
              <span style={{ fontSize: '2rem' }}>📡</span>
              <div>
                <h3 className="mb-2">Oportunidades filtradas para você</h3>
                <p className="text-muted">Receba só as demandas compatíveis com seu equipamento, raio de atuação e dias disponíveis. Sem ruído.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span style={{ fontSize: '2rem' }}>🗺️</span>
              <div>
                <h3 className="mb-2">Veja onde o serviço está concentrado</h3>
                <p className="text-muted">Consulte o mapa de demandas antes de se deslocar. Otimize sua rota e reduza custo de viagem.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span style={{ fontSize: '2rem' }}>📱</span>
              <div>
                <h3 className="mb-2">Aviso no WhatsApp, na hora</h3>
                <p className="text-muted">Notificação com distância, cultura, tamanho da área e observação do produtor direto no seu celular — fácil de ler mesmo no trator.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span style={{ fontSize: '2rem' }}>💸</span>
              <div>
                <h3 className="mb-2 text-lime">Zero comissão sobre o contrato</h3>
                <p className="text-muted">O que você combina com o produtor fica entre vocês. Nunca cobramos porcentagem sobre o serviço fechado.</p>
              </div>
            </div>
          </div>

          <div className="pricing-box" style={{ background: 'var(--bg3)', padding: '2.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--lime)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}>
            <div>
              <h3 className="mb-2" style={{ fontSize: '1.5rem', color: 'var(--lime)' }}>Acesso completo — sem comissão</h3>
              <p className="text-muted mb-4">Contato ilimitado de produtores · Mapa de demandas · Avisos no WhatsApp · Agenda Semáforo</p>
              <div style={{ display: 'inline-block', background: 'var(--amber)', color: '#000', padding: '4px 12px', borderRadius: '4px', fontWeight: 'bold', fontSize: '0.9rem' }}>
                Cadastro gratuito para os primeiros prestadores.
              </div>
            </div>
            <div>
              <Link to="/cadastrar-prestador" className="btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.05rem' }}>
                Garantir minha vaga gratuita
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ======================= PARA PRODUTORES ======================= */}
      <section id="pecuaristas">
        <div className="container fade-up flex producer-section" style={{ alignItems: 'center', gap: '4rem', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 340px' }}>
            <div className="badge mb-4">Para Pecuaristas e Produtores</div>
            <h2 className="mb-4">Colha no momento certo. Sem correr atrás de máquina.</h2>
            <p className="text-muted mb-8" style={{ fontSize: '1.1rem' }}>
              Três dias de atraso na colheita do milho para silagem destroem o KPS e comprometem meses de resultado. Com o Conexão Forragem, você encontra prestadores com agenda livre e equipamento adequado para a sua lavoura.
            </p>

            <ul className="flex flex-col gap-6 mb-8">
              <li className="flex gap-4">
                <Check size={24} color="var(--lime)" style={{ flexShrink: 0 }} />
                <div>
                  <strong style={{ display: 'block', color: 'var(--text)', marginBottom: '0.25rem' }}>Cadastre sua lavoura em minutos</strong>
                  <span className="text-muted">Informe cultura, área, janela de corte e tipo de serviço. Simples como preencher um formulário.</span>
                </div>
              </li>
              <li className="flex gap-4">
                <Check size={24} color="var(--lime)" style={{ flexShrink: 0 }} />
                <div>
                  <strong style={{ display: 'block', color: 'var(--text)', marginBottom: '0.25rem' }}>Receba contato de quem tem disponibilidade</strong>
                  <span className="text-muted">Só chegam até você prestadores com agenda livre e maquinário compatível com o seu terreno.</span>
                </div>
              </li>
              <li className="flex gap-4">
                <Check size={24} color="var(--lime)" style={{ flexShrink: 0 }} />
                <div>
                  <strong style={{ display: 'block', color: 'var(--text)', marginBottom: '0.25rem' }}>Negocie direto, sem intermediário</strong>
                  <span className="text-muted">Sem tabela de comissão. Você fecha o contrato diretamente com o prestador.</span>
                </div>
              </li>
            </ul>

            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', border: '1px solid var(--border)', padding: '12px 24px', borderRadius: '100px', fontWeight: 600 }}>
              <span style={{ color: 'var(--lime)' }}>✦ Acesso 100% gratuito</span> para produtores. Para sempre.
            </div>
          </div>
          <div style={{ flex: '1 1 340px', width: '100%' }}>
            <div className="producer-form" style={{ background: 'var(--bg3)', padding: '2.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
              <h3 className="mb-6 text-center">Criar Demanda</h3>
              <div className="grid gap-4">
                <div>
                  <label className="text-muted" style={{ fontSize: '0.85rem', marginBottom: '4px', display: 'block' }}>Cultura</label>
                  <div className="form-control" style={{ background: 'var(--bg)' }}>Milho</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-muted" style={{ fontSize: '0.85rem', marginBottom: '4px', display: 'block' }}>Área (ha)</label>
                    <div className="form-control" style={{ background: 'var(--bg)' }}>120</div>
                  </div>
                  <div>
                    <label className="text-muted" style={{ fontSize: '0.85rem', marginBottom: '4px', display: 'block' }}>Mês previsto</label>
                    <div className="form-control" style={{ background: 'var(--bg)' }}>Março/2026</div>
                  </div>
                </div>
                <Link to="/cadastrar-demanda" className="btn-primary" style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '1rem', padding: '1rem' }}>Publicar Gratuitamente</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ======================= CTA ======================= */}
      <section id="cta" className="bg-alt cta-section" style={{ borderTop: '1px solid var(--border)', padding: '6rem 0' }}>
        <div className="container text-center fade-up" style={{ maxWidth: '700px' }}>
          <div className="badge mb-4">Cadastro</div>
          <h2 className="mb-4">Entre antes da safra.</h2>
          <p className="text-muted mb-8" style={{ fontSize: '1.2rem' }}>
            Os primeiros prestadores a se cadastrar garantem 1 ano de acesso completo sem custo. Seja um dos primeiros a mapear sua região e fechar serviços sem concorrência.
          </p>
          
          <form onSubmit={handleLeadSubmit} style={{ background: 'var(--bg3)', padding: '2rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}>
            {leadSuccess ? (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--lime)', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                  <Check size={28} />
                </div>
                <h3 style={{ marginBottom: '0.5rem', color: 'var(--lime)' }}>Vaga garantida!</h3>
                <p className="text-muted">Entraremos em contato no WhatsApp em breve.</p>
              </div>
            ) : (
              <>
                <div className="flex gap-4 mb-4" style={{ flexWrap: 'wrap' }}>
                  <input type="text" className="form-control" placeholder="Seu nome" style={{ flex: 1, minWidth: '200px' }} value={leadNome} onChange={e => setLeadNome(e.target.value)} required />
                  <input type="tel" className="form-control" placeholder="WhatsApp (com DDD)" style={{ flex: 1, minWidth: '200px' }} value={leadWhatsapp} onChange={e => setLeadWhatsapp(e.target.value)} required />
                </div>
                <button type="submit" className="btn-primary" style={{ width: '100%', padding: '1.2rem', fontSize: '1.1rem' }} disabled={isSubmitting}>
                  {isSubmitting ? 'Enviando...' : (
                    <>Quero me cadastrar <ArrowRight size={20} style={{ marginLeft: '8px' }} /></>
                  )}
                </button>
                <p className="text-muted mt-4" style={{ fontSize: '0.85rem' }}>
                  É prestador de serviço? Após o cadastro, informe sua região e tipo de equipamento. Nenhum dado seu será compartilhado sem autorização.
                </p>
              </>
            )}
          </form>
        </div>
      </section>
    </div>
  );
}
