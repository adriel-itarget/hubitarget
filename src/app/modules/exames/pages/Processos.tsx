import { useState } from 'react';
import { Plus, Search, ChevronRight, Users, Clock, FileText, MapPin, Tag, BookOpen, X, ChevronLeft, Check } from 'lucide-react';

const mockProcessos = [
  {
    id: 1, name: 'Prova de Título 2026 - 1ª Fase', status: 'inscricoes_abertas',
    modalidades: ['Prova Escrita', 'Análise de Currículo'], categorias: ['Titular', 'Aspirante'],
    candidatos: 312, inicio: '01/06/2026', encerramento: '30/06/2026',
    locais: 5, documentos: 8,
  },
  {
    id: 2, name: 'Prova de Título 2025 - 2ª Fase', status: 'em_andamento',
    modalidades: ['Prova Prática'], categorias: ['Titular'],
    candidatos: 189, inicio: '01/07/2026', encerramento: '15/07/2026',
    locais: 3, documentos: 4,
  },
  {
    id: 3, name: 'Prova de Recertificação 2026', status: 'planejamento',
    modalidades: ['Prova Escrita', 'Prova Oral'], categorias: ['Titular', 'Recertificação'],
    candidatos: 0, inicio: '01/09/2026', encerramento: '30/09/2026',
    locais: 0, documentos: 0,
  },
];

const statusConfig: Record<string, { label: string; color: string }> = {
  inscricoes_abertas: { label: 'Inscrições Abertas', color: 'bg-green-500/10 text-green-600' },
  em_andamento: { label: 'Em Andamento', color: 'bg-blue-500/10 text-blue-600' },
  planejamento: { label: 'Planejamento', color: 'bg-yellow-500/10 text-yellow-600' },
};

const wizardSteps = ['Identificação', 'Modalidades', 'Categorias', 'Locais', 'Documentos', 'Revisão'];

function ProcessoWizard({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: '', descricao: '', inicio: '', encerramento: '',
    modalidades: [] as string[], categorias: [] as string[],
    locais: [] as string[], documentos: [] as string[],
  });

  const modalidadesOptions = ['Prova Escrita', 'Prova Oral', 'Prova Prática', 'Análise de Currículo', 'Entrevista'];
  const categoriasOptions = ['Titular', 'Aspirante', 'Estudante', 'Recertificação', 'Internacional'];
  const locaisOptions = ['São Paulo - SP', 'Rio de Janeiro - RJ', 'Brasília - DF', 'Belo Horizonte - MG', 'Porto Alegre - RS', 'Salvador - BA'];
  const documentosOptions = ['Diploma de Medicina', 'Comprovante de Residência', 'Foto 3x4', 'Comprovante de Especialização', 'Currículo Lattes', 'Certidão de Ética', 'Comprovante de Pagamento'];

  const toggle = (key: keyof typeof form, val: string) => {
    const arr = form[key] as string[];
    setForm(f => ({ ...f, [key]: arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val] }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-2xl shadow-2xl w-full max-w-2xl">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Novo Processo de Inscrição</h2>
            <p className="text-sm text-muted-foreground mt-0.5">Passo {step + 1} de {wizardSteps.length}</p>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-accent rounded-lg transition-colors"><X className="w-4 h-4" /></button>
        </div>

        <div className="px-6 pt-4">
          <div className="flex items-center gap-0">
            {wizardSteps.map((s, i) => (
              <div key={i} className="flex items-center flex-1 last:flex-none">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${
                  i < step ? 'bg-primary text-primary-foreground' :
                  i === step ? 'bg-primary text-primary-foreground ring-4 ring-primary/20' :
                  'bg-muted text-muted-foreground'
                }`}>
                  {i < step ? <Check className="w-4 h-4" /> : i + 1}
                </div>
                {i < wizardSteps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-1 transition-colors ${i < step ? 'bg-primary' : 'bg-border'}`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-1.5 mb-4">
            {wizardSteps.map((s, i) => (
              <span key={i} className={`text-xs ${i === step ? 'text-primary font-medium' : 'text-muted-foreground'}`}>{s}</span>
            ))}
          </div>
        </div>

        <div className="px-6 pb-2 min-h-[280px]">
          {step === 0 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">Nome do Processo</label>
                <input value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))}
                  className="w-full px-3 py-2.5 bg-input-background border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                  placeholder="Ex: Prova de Título 2026 - 1ª Fase" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Descrição</label>
                <textarea value={form.descricao} onChange={e => setForm(f => ({...f, descricao: e.target.value}))}
                  rows={3} className="w-full px-3 py-2.5 bg-input-background border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 outline-none resize-none"
                  placeholder="Descrição do processo..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Início das Inscrições</label>
                  <input type="date" value={form.inicio} onChange={e => setForm(f => ({...f, inicio: e.target.value}))}
                    className="w-full px-3 py-2.5 bg-input-background border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Encerramento</label>
                  <input type="date" value={form.encerramento} onChange={e => setForm(f => ({...f, encerramento: e.target.value}))}
                    className="w-full px-3 py-2.5 bg-input-background border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 outline-none" />
                </div>
              </div>
            </div>
          )}
          {step === 1 && (
            <div>
              <p className="text-sm text-muted-foreground mb-3">Selecione as modalidades de inscrição disponíveis</p>
              <div className="grid grid-cols-2 gap-2">
                {modalidadesOptions.map(m => (
                  <button key={m} onClick={() => toggle('modalidades', m)}
                    className={`flex items-center gap-2 p-3 rounded-lg border text-sm text-left transition-colors ${
                      form.modalidades.includes(m) ? 'border-primary bg-primary/5 text-primary' : 'border-border hover:bg-accent'
                    }`}>
                    {form.modalidades.includes(m) && <Check className="w-4 h-4 flex-shrink-0" />}
                    {!form.modalidades.includes(m) && <div className="w-4 h-4 flex-shrink-0" />}
                    {m}
                  </button>
                ))}
              </div>
            </div>
          )}
          {step === 2 && (
            <div>
              <p className="text-sm text-muted-foreground mb-3">Categorias de candidatos habilitados a se inscrever</p>
              <div className="grid grid-cols-2 gap-2">
                {categoriasOptions.map(c => (
                  <button key={c} onClick={() => toggle('categorias', c)}
                    className={`flex items-center gap-2 p-3 rounded-lg border text-sm text-left transition-colors ${
                      form.categorias.includes(c) ? 'border-primary bg-primary/5 text-primary' : 'border-border hover:bg-accent'
                    }`}>
                    {form.categorias.includes(c) ? <Check className="w-4 h-4 flex-shrink-0" /> : <div className="w-4 h-4 flex-shrink-0" />}
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}
          {step === 3 && (
            <div>
              <p className="text-sm text-muted-foreground mb-3">Locais onde a prova será realizada</p>
              <div className="space-y-2">
                {locaisOptions.map(l => (
                  <button key={l} onClick={() => toggle('locais', l)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg border text-sm text-left transition-colors ${
                      form.locais.includes(l) ? 'border-primary bg-primary/5 text-primary' : 'border-border hover:bg-accent'
                    }`}>
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    {l}
                    {form.locais.includes(l) && <Check className="w-4 h-4 ml-auto" />}
                  </button>
                ))}
              </div>
            </div>
          )}
          {step === 4 && (
            <div>
              <p className="text-sm text-muted-foreground mb-3">Documentos obrigatórios para inscrição</p>
              <div className="space-y-2">
                {documentosOptions.map(d => (
                  <button key={d} onClick={() => toggle('documentos', d)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg border text-sm text-left transition-colors ${
                      form.documentos.includes(d) ? 'border-primary bg-primary/5 text-primary' : 'border-border hover:bg-accent'
                    }`}>
                    <FileText className="w-4 h-4 flex-shrink-0" />
                    {d}
                    {form.documentos.includes(d) && <Check className="w-4 h-4 ml-auto" />}
                  </button>
                ))}
              </div>
            </div>
          )}
          {step === 5 && (
            <div className="space-y-4">
              <div className="bg-muted/30 rounded-xl p-4">
                <h4 className="font-medium mb-2">{form.name || 'Sem nome'}</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div><span className="text-muted-foreground">Período:</span> {form.inicio || '—'} a {form.encerramento || '—'}</div>
                  <div><span className="text-muted-foreground">Modalidades:</span> {form.modalidades.length || 0} selecionadas</div>
                  <div><span className="text-muted-foreground">Categorias:</span> {form.categorias.length || 0} selecionadas</div>
                  <div><span className="text-muted-foreground">Locais:</span> {form.locais.length || 0} selecionados</div>
                  <div><span className="text-muted-foreground">Documentos:</span> {form.documentos.length || 0} obrigatórios</div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">Revise as informações acima. Ao confirmar, o processo será criado com status <strong>Planejamento</strong>.</p>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-border flex justify-between">
          <button
            onClick={() => step === 0 ? onClose() : setStep(s => s - 1)}
            className="flex items-center gap-2 px-4 py-2 text-sm border border-border rounded-lg hover:bg-accent transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            {step === 0 ? 'Cancelar' : 'Anterior'}
          </button>
          <button
            onClick={() => step < wizardSteps.length - 1 ? setStep(s => s + 1) : onClose()}
            className="flex items-center gap-2 px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            {step < wizardSteps.length - 1 ? 'Próximo' : 'Criar Processo'}
            {step < wizardSteps.length - 1 && <ChevronRight className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}

export function Processos() {
  const [search, setSearch] = useState('');
  const [showWizard, setShowWizard] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(null);

  const filtered = mockProcessos.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-background">
      <div className="px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl mb-2">Processos de Inscrição</h1>
              <p className="text-muted-foreground">Gerencie processos de provas e títulos de especialista</p>
            </div>
            <button onClick={() => setShowWizard(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium">
              <Plus className="w-4 h-4" /> Novo Processo
            </button>
          </div>

          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Buscar processos..."
              className="w-full pl-9 pr-4 py-2.5 bg-card border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 outline-none" />
          </div>

          <div className="space-y-4">
            {filtered.map(p => {
              const s = statusConfig[p.status];
              const isExp = expanded === p.id;
              return (
                <div key={p.id} className="bg-card border border-border rounded-xl overflow-hidden">
                  <div
                    className="p-5 flex items-center justify-between cursor-pointer hover:bg-muted/30 transition-colors"
                    onClick={() => setExpanded(isExp ? null : p.id)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                        <ClipboardList className="w-5 h-5 text-indigo-500" />
                      </div>
                      <div>
                        <h3 className="font-medium">{p.name}</h3>
                        <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {p.candidatos} candidatos</span>
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> até {p.encerramento}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${s.color}`}>{s.label}</span>
                      <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform ${isExp ? 'rotate-90' : ''}`} />
                    </div>
                  </div>
                  {isExp && (
                    <div className="border-t border-border px-5 py-4 bg-muted/20">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-card rounded-lg p-3 border border-border">
                          <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1"><BookOpen className="w-3 h-3" /> Modalidades</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {p.modalidades.map(m => <span key={m} className="text-xs bg-indigo-500/10 text-indigo-600 px-1.5 py-0.5 rounded">{m}</span>)}
                          </div>
                        </div>
                        <div className="bg-card rounded-lg p-3 border border-border">
                          <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1"><Tag className="w-3 h-3" /> Categorias</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {p.categorias.map(c => <span key={c} className="text-xs bg-blue-500/10 text-blue-600 px-1.5 py-0.5 rounded">{c}</span>)}
                          </div>
                        </div>
                        <div className="bg-card rounded-lg p-3 border border-border">
                          <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1"><MapPin className="w-3 h-3" /> Locais</p>
                          <p className="text-sm font-semibold">{p.locais} configurados</p>
                        </div>
                        <div className="bg-card rounded-lg p-3 border border-border">
                          <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1"><FileText className="w-3 h-3" /> Documentos</p>
                          <p className="text-sm font-semibold">{p.documentos} obrigatórios</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {showWizard && <ProcessoWizard onClose={() => setShowWizard(false)} />}
    </div>
  );
}
