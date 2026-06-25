import { useState } from 'react';
import { Plus, Search, HelpCircle, X, ChevronDown, ChevronUp, Edit2, Trash2 } from 'lucide-react';

const eixos = ['Todos', 'Fisiopatologia', 'Diagnóstico', 'Tratamento', 'Prevenção', 'Hemodinâmica', 'Eletrofisiologia'];
const cursos = ['Todos os Cursos', 'Cardiologia Intervencionista', 'Ecocardiografia Avançada', 'Eletrofisiologia Clínica'];

const mockQuestoes = [
  {
    id: 1, enunciado: 'Qual o mecanismo de ação principal dos betabloqueadores no tratamento da insuficiência cardíaca?',
    eixo: 'Tratamento', curso: 'Cardiologia Intervencionista', dificuldade: 'media',
    alternativas: [
      { id: 'a', texto: 'Bloqueio dos receptores alfa-adrenérgicos', correta: false },
      { id: 'b', texto: 'Bloqueio dos receptores beta-1 adrenérgicos, reduzindo a frequência cardíaca e o trabalho miocárdico', correta: true },
      { id: 'c', texto: 'Inibição da enzima conversora de angiotensina', correta: false },
      { id: 'd', texto: 'Bloqueio dos canais de cálcio', correta: false },
    ],
  },
  {
    id: 2, enunciado: 'Na estenose aórtica grave, qual é o valor de área valvar que caracteriza gravidade?',
    eixo: 'Diagnóstico', curso: 'Ecocardiografia Avançada', dificuldade: 'dificil',
    alternativas: [
      { id: 'a', texto: 'Área valvar < 2,0 cm²', correta: false },
      { id: 'b', texto: 'Área valvar < 1,5 cm²', correta: false },
      { id: 'c', texto: 'Área valvar < 1,0 cm²', correta: true },
      { id: 'd', texto: 'Área valvar < 0,5 cm²', correta: false },
    ],
  },
  {
    id: 3, enunciado: 'Qual o principal mecanismo de reentrada em taquicardia por reentrada nodal?',
    eixo: 'Eletrofisiologia', curso: 'Eletrofisiologia Clínica', dificuldade: 'facil',
    alternativas: [
      { id: 'a', texto: 'Circuito de reentrada no nó sinusal', correta: false },
      { id: 'b', texto: 'Reentrada utilizando duas vias no nó AV com diferentes velocidades de condução', correta: true },
      { id: 'c', texto: 'Automatismo aumentado nas fibras de Purkinje', correta: false },
      { id: 'd', texto: 'Pós-potenciais tardios', correta: false },
    ],
  },
];

const dificuldadeConfig: Record<string, { label: string; color: string }> = {
  facil: { label: 'Fácil', color: 'bg-green-500/10 text-green-600' },
  media: { label: 'Média', color: 'bg-yellow-500/10 text-yellow-600' },
  dificil: { label: 'Difícil', color: 'bg-red-500/10 text-red-600' },
};

function QuestaoModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({
    enunciado: '', eixo: '', curso: '', dificuldade: 'media',
    alternativas: [
      { id: 'a', texto: '', correta: false },
      { id: 'b', texto: '', correta: false },
      { id: 'c', texto: '', correta: false },
      { id: 'd', texto: '', correta: false },
    ],
  });

  const setCorreta = (id: string) => {
    setForm(f => ({...f, alternativas: f.alternativas.map(a => ({...a, correta: a.id === id}))}));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-border flex items-center justify-between sticky top-0 bg-card">
          <h2 className="text-lg font-semibold">Nova Questão</h2>
          <button onClick={onClose} className="p-1.5 hover:bg-accent rounded-lg transition-colors"><X className="w-4 h-4" /></button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5">Enunciado</label>
            <textarea value={form.enunciado} onChange={e => setForm(f => ({...f, enunciado: e.target.value}))}
              rows={3} className="w-full px-3 py-2.5 bg-input-background border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 outline-none resize-none"
              placeholder="Digite o enunciado da questão..." />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Eixo Temático</label>
              <select value={form.eixo} onChange={e => setForm(f => ({...f, eixo: e.target.value}))}
                className="w-full px-3 py-2.5 bg-input-background border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 outline-none">
                <option value="">Selecione...</option>
                {eixos.filter(e => e !== 'Todos').map(e => <option key={e}>{e}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Curso</label>
              <select value={form.curso} onChange={e => setForm(f => ({...f, curso: e.target.value}))}
                className="w-full px-3 py-2.5 bg-input-background border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 outline-none">
                <option value="">Selecione...</option>
                {cursos.filter(c => c !== 'Todos os Cursos').map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Dificuldade</label>
              <select value={form.dificuldade} onChange={e => setForm(f => ({...f, dificuldade: e.target.value}))}
                className="w-full px-3 py-2.5 bg-input-background border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 outline-none">
                <option value="facil">Fácil</option>
                <option value="media">Média</option>
                <option value="dificil">Difícil</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Alternativas (marque a correta)</label>
            <div className="space-y-2">
              {form.alternativas.map((alt) => (
                <div key={alt.id} className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                  alt.correta ? 'border-green-500 bg-green-500/5' : 'border-border'
                }`}>
                  <button onClick={() => setCorreta(alt.id)}
                    className={`w-6 h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center transition-colors ${
                      alt.correta ? 'border-green-500 bg-green-500' : 'border-border hover:border-primary'
                    }`}>
                    {alt.correta && <div className="w-2 h-2 rounded-full bg-white" />}
                  </button>
                  <span className="text-sm font-medium text-muted-foreground w-4">{alt.id.toUpperCase()})</span>
                  <input value={alt.texto}
                    onChange={e => setForm(f => ({...f, alternativas: f.alternativas.map(a => a.id === alt.id ? {...a, texto: e.target.value} : a)}))}
                    className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                    placeholder={`Alternativa ${alt.id.toUpperCase()}...`} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="p-6 border-t border-border flex gap-3 justify-end">
          <button onClick={onClose} className="px-4 py-2 text-sm border border-border rounded-lg hover:bg-accent transition-colors">Cancelar</button>
          <button onClick={onClose} className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">Salvar Questão</button>
        </div>
      </div>
    </div>
  );
}

export function BancoQuestoes() {
  const [search, setSearch] = useState('');
  const [eixoFilter, setEixoFilter] = useState('Todos');
  const [cursoFilter, setCursoFilter] = useState('Todos os Cursos');
  const [showModal, setShowModal] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(null);

  const filtered = mockQuestoes.filter(q => {
    const matchSearch = q.enunciado.toLowerCase().includes(search.toLowerCase());
    const matchEixo = eixoFilter === 'Todos' || q.eixo === eixoFilter;
    const matchCurso = cursoFilter === 'Todos os Cursos' || q.curso === cursoFilter;
    return matchSearch && matchEixo && matchCurso;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl mb-2">Banco de Questões</h1>
              <p className="text-muted-foreground">Questões organizadas por curso e eixo temático</p>
            </div>
            <button onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium">
              <Plus className="w-4 h-4" /> Nova Questão
            </button>
          </div>

          <div className="flex gap-3 mb-4 flex-wrap">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar questões..."
                className="w-full pl-9 pr-4 py-2.5 bg-card border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 outline-none" />
            </div>
            <select value={cursoFilter} onChange={e => setCursoFilter(e.target.value)}
              className="px-3 py-2.5 bg-card border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 outline-none">
              {cursos.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>

          <div className="flex flex-wrap gap-1.5 mb-6">
            {eixos.map(e => (
              <button key={e} onClick={() => setEixoFilter(e)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${eixoFilter === e ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-accent'}`}>
                {e}
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {filtered.map(q => {
              const dif = dificuldadeConfig[q.dificuldade];
              const isExp = expanded === q.id;
              return (
                <div key={q.id} className="bg-card border border-border rounded-xl overflow-hidden">
                  <div className="p-5 flex items-start gap-4 cursor-pointer hover:bg-muted/30 transition-colors" onClick={() => setExpanded(isExp ? null : q.id)}>
                    <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <HelpCircle className="w-4 h-4 text-purple-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium leading-relaxed">{q.enunciado}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">{q.eixo}</span>
                        <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">{q.curso}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${dif.color}`}>{dif.label}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button className="p-1.5 hover:bg-accent rounded-lg transition-colors" onClick={e => e.stopPropagation()}>
                        <Edit2 className="w-3.5 h-3.5 text-muted-foreground" />
                      </button>
                      {isExp ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                    </div>
                  </div>
                  {isExp && (
                    <div className="border-t border-border px-5 py-4 bg-muted/20">
                      <div className="space-y-2">
                        {q.alternativas.map(alt => (
                          <div key={alt.id} className={`flex items-center gap-3 p-3 rounded-lg ${alt.correta ? 'bg-green-500/10 border border-green-500/30' : 'bg-card border border-border'}`}>
                            <span className={`text-sm font-semibold w-5 ${alt.correta ? 'text-green-600' : 'text-muted-foreground'}`}>{alt.id.toUpperCase()})</span>
                            <span className={`text-sm ${alt.correta ? 'text-green-700 font-medium' : ''}`}>{alt.texto}</span>
                            {alt.correta && <span className="ml-auto text-xs text-green-600 font-medium">✓ Correta</span>}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {showModal && <QuestaoModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
