import { useState } from 'react';
import { Plus, Search, Calendar, Users, MapPin, X, ChevronLeft, ChevronRight, Check, Clock } from 'lucide-react';

const mockEventos = [
  { id: 1, name: 'Congresso Nacional de Cardiologia 2026', tipo: 'Congresso', data: '15-18 Jul, 2026', local: 'São Paulo, SP', inscricoes: 1842, vagas: 3000, status: 'inscricoes_abertas', valor: 890 },
  { id: 2, name: 'Simpósio de Insuficiência Cardíaca', tipo: 'Simpósio', data: '05 Ago, 2026', local: 'Rio de Janeiro, RJ', inscricoes: 312, vagas: 500, status: 'planejamento', valor: 450 },
  { id: 3, name: 'Workshop Ecocardiografia Intervencionista', tipo: 'Workshop', data: '22-23 Ago, 2026', local: 'Online', inscricoes: 0, vagas: 200, status: 'planejamento', valor: 0 },
  { id: 4, name: 'Jornada Regional Sul', tipo: 'Jornada', data: '12 Set, 2026', local: 'Porto Alegre, RS', inscricoes: 0, vagas: 400, status: 'planejamento', valor: 320 },
];

const statusConfig: Record<string, { label: string; color: string }> = {
  inscricoes_abertas: { label: 'Inscrições Abertas', color: 'bg-green-500/10 text-green-600' },
  em_andamento: { label: 'Em Andamento', color: 'bg-blue-500/10 text-blue-600' },
  planejamento: { label: 'Planejamento', color: 'bg-yellow-500/10 text-yellow-600' },
};

const wizardSteps = ['Dados do Evento', 'Local e Data', 'Inscrições', 'Programação', 'Revisão'];

function EventoWizard({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: '', tipo: 'Congresso', descricao: '',
    dataInicio: '', dataFim: '', local: '', cidade: '', online: false,
    vagas: '', valorAssociado: '', valorNaoAssociado: '',
    trilhas: [] as string[],
  });

  const tiposEvento = ['Congresso', 'Simpósio', 'Workshop', 'Jornada', 'Seminário', 'Curso Pré-Congresso'];
  const trilhasOptions = ['Cardiologia Clínica', 'Intervencionismo', 'Ecocardiografia', 'Eletrofisiologia', 'Insuficiência Cardíaca', 'Prevenção', 'Pediatria', 'Pesquisa'];

  const toggleTrilha = (t: string) => {
    setForm(f => ({ ...f, trilhas: f.trilhas.includes(t) ? f.trilhas.filter(x => x !== t) : [...f.trilhas, t] }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-2xl shadow-2xl w-full max-w-xl">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Novo Evento</h2>
            <p className="text-sm text-muted-foreground mt-0.5">Passo {step + 1} de {wizardSteps.length}</p>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-accent rounded-lg transition-colors"><X className="w-4 h-4" /></button>
        </div>

        <div className="px-6 pt-4">
          <div className="flex items-center">
            {wizardSteps.map((s, i) => (
              <div key={i} className="flex items-center flex-1 last:flex-none">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${
                  i < step ? 'bg-primary text-primary-foreground' :
                  i === step ? 'bg-primary text-primary-foreground ring-4 ring-primary/20' :
                  'bg-muted text-muted-foreground'
                }`}>
                  {i < step ? <Check className="w-4 h-4" /> : i + 1}
                </div>
                {i < wizardSteps.length - 1 && <div className={`flex-1 h-0.5 mx-1 ${i < step ? 'bg-primary' : 'bg-border'}`} />}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-1.5 mb-4">
            {wizardSteps.map((s, i) => (
              <span key={i} className={`text-xs ${i === step ? 'text-primary font-medium' : 'text-muted-foreground'}`}>{s}</span>
            ))}
          </div>
        </div>

        <div className="px-6 pb-2 min-h-[260px]">
          {step === 0 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">Nome do Evento</label>
                <input value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))}
                  className="w-full px-3 py-2.5 bg-input-background border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                  placeholder="Ex: Congresso Nacional de Cardiologia 2026" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Tipo de Evento</label>
                <div className="grid grid-cols-3 gap-2">
                  {tiposEvento.map(t => (
                    <button key={t} onClick={() => setForm(f => ({...f, tipo: t}))}
                      className={`p-2 rounded-lg border text-xs transition-colors ${form.tipo === t ? 'border-primary bg-primary/5 text-primary' : 'border-border hover:bg-accent'}`}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Descrição</label>
                <textarea value={form.descricao} onChange={e => setForm(f => ({...f, descricao: e.target.value}))}
                  rows={2} className="w-full px-3 py-2.5 bg-input-background border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 outline-none resize-none"
                  placeholder="Descrição do evento..." />
              </div>
            </div>
          )}
          {step === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Data Início</label>
                  <input type="date" value={form.dataInicio} onChange={e => setForm(f => ({...f, dataInicio: e.target.value}))}
                    className="w-full px-3 py-2.5 bg-input-background border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Data Fim</label>
                  <input type="date" value={form.dataFim} onChange={e => setForm(f => ({...f, dataFim: e.target.value}))}
                    className="w-full px-3 py-2.5 bg-input-background border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 outline-none" />
                </div>
              </div>
              <div className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg cursor-pointer" onClick={() => setForm(f => ({...f, online: !f.online}))}>
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${form.online ? 'border-primary bg-primary' : 'border-border'}`}>
                  {form.online && <Check className="w-3 h-3 text-white" />}
                </div>
                <span className="text-sm">Evento Online / Híbrido</span>
              </div>
              {!form.online && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Local / Venue</label>
                    <input value={form.local} onChange={e => setForm(f => ({...f, local: e.target.value}))}
                      className="w-full px-3 py-2.5 bg-input-background border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                      placeholder="Nome do local" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Cidade/Estado</label>
                    <input value={form.cidade} onChange={e => setForm(f => ({...f, cidade: e.target.value}))}
                      className="w-full px-3 py-2.5 bg-input-background border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                      placeholder="São Paulo, SP" />
                  </div>
                </div>
              )}
            </div>
          )}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">Vagas Totais</label>
                <input type="number" value={form.vagas} onChange={e => setForm(f => ({...f, vagas: e.target.value}))}
                  className="w-full px-3 py-2.5 bg-input-background border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 outline-none" placeholder="0" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Valor (Associado)</label>
                  <input type="number" value={form.valorAssociado} onChange={e => setForm(f => ({...f, valorAssociado: e.target.value}))}
                    className="w-full px-3 py-2.5 bg-input-background border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 outline-none" placeholder="R$ 0,00" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Valor (Não Associado)</label>
                  <input type="number" value={form.valorNaoAssociado} onChange={e => setForm(f => ({...f, valorNaoAssociado: e.target.value}))}
                    className="w-full px-3 py-2.5 bg-input-background border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 outline-none" placeholder="R$ 0,00" />
                </div>
              </div>
            </div>
          )}
          {step === 3 && (
            <div>
              <p className="text-sm text-muted-foreground mb-3">Selecione as trilhas/eixos temáticos da programação científica</p>
              <div className="grid grid-cols-2 gap-2">
                {trilhasOptions.map(t => (
                  <button key={t} onClick={() => toggleTrilha(t)}
                    className={`flex items-center gap-2 p-3 rounded-lg border text-sm text-left transition-colors ${
                      form.trilhas.includes(t) ? 'border-primary bg-primary/5 text-primary' : 'border-border hover:bg-accent'
                    }`}>
                    {form.trilhas.includes(t) ? <Check className="w-3.5 h-3.5 flex-shrink-0" /> : <div className="w-3.5 h-3.5 flex-shrink-0" />}
                    {t}
                  </button>
                ))}
              </div>
            </div>
          )}
          {step === 4 && (
            <div className="space-y-4">
              <div className="bg-muted/30 rounded-xl p-4">
                <h4 className="font-medium mb-3">{form.name || 'Sem nome'}</h4>
                <div className="grid grid-cols-2 gap-y-2 text-sm">
                  <div><span className="text-muted-foreground">Tipo:</span> {form.tipo}</div>
                  <div><span className="text-muted-foreground">Vagas:</span> {form.vagas || 0}</div>
                  <div><span className="text-muted-foreground">Início:</span> {form.dataInicio || '—'}</div>
                  <div><span className="text-muted-foreground">Fim:</span> {form.dataFim || '—'}</div>
                  <div><span className="text-muted-foreground">Local:</span> {form.online ? 'Online' : form.cidade || '—'}</div>
                  <div><span className="text-muted-foreground">Trilhas:</span> {form.trilhas.length}</div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-border flex justify-between">
          <button onClick={() => step === 0 ? onClose() : setStep(s => s - 1)}
            className="flex items-center gap-2 px-4 py-2 text-sm border border-border rounded-lg hover:bg-accent transition-colors">
            <ChevronLeft className="w-4 h-4" />{step === 0 ? 'Cancelar' : 'Anterior'}
          </button>
          <button onClick={() => step < wizardSteps.length - 1 ? setStep(s => s + 1) : onClose()}
            className="flex items-center gap-2 px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
            {step < wizardSteps.length - 1 ? 'Próximo' : 'Criar Evento'}
            {step < wizardSteps.length - 1 && <ChevronRight className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}

export function ListaEventos() {
  const [search, setSearch] = useState('');
  const [showWizard, setShowWizard] = useState(false);

  const filtered = mockEventos.filter(e => e.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-background">
      <div className="px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl mb-2">Eventos</h1>
              <p className="text-muted-foreground">Gerencie congressos, simpósios, workshops e jornadas</p>
            </div>
            <button onClick={() => setShowWizard(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium">
              <Plus className="w-4 h-4" /> Novo Evento
            </button>
          </div>

          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar eventos..."
              className="w-full pl-9 pr-4 py-2.5 bg-card border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 outline-none" />
          </div>

          <div className="space-y-4">
            {filtered.map(e => {
              const s = statusConfig[e.status];
              const pct = e.vagas > 0 ? (e.inscricoes / e.vagas) * 100 : 0;
              return (
                <div key={e.id} className="group bg-card border border-border rounded-xl p-5 hover:shadow-md transition-all cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-6 h-6 text-pink-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">{e.name}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ml-3 flex-shrink-0 ${s.color}`}>{s.label}</span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{e.data}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{e.local}</span>
                        <span className="bg-muted px-1.5 py-0.5 rounded">{e.tipo}</span>
                        {e.valor > 0 && <span className="text-green-600 font-medium">R$ {e.valor}</span>}
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex-1">
                          <div className="flex justify-between text-xs text-muted-foreground mb-1">
                            <span>{e.inscricoes} inscrições</span>
                            <span>{e.vagas} vagas</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-1.5">
                            <div className="bg-pink-500 h-1.5 rounded-full transition-all" style={{ width: `${Math.min(pct, 100)}%` }} />
                          </div>
                        </div>
                        <span className="text-xs text-muted-foreground">{pct.toFixed(0)}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {showWizard && <EventoWizard onClose={() => setShowWizard(false)} />}
    </div>
  );
}
