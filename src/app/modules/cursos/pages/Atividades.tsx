import { useState } from 'react';
import { Plus, Search, Star, Users, DollarSign, BookOpen, X, Edit2, Trash2 } from 'lucide-react';

const categorias = ['Todas', 'Cardiologia Intervencionista', 'Ecocardiografia', 'Eletrofisiologia', 'Insuficiência Cardíaca', 'Prevenção Cardiovascular'];

const mockAtividades = [
  { id: 1, name: 'Cardiologia Intervencionista - Módulo 1', categoria: 'Cardiologia Intervencionista', tipo: 'Curso Online', inscricoes: 142, vagas: 200, valor: 1200, avaliacao: 4.8, status: 'ativo', inicio: '01/07/2026', fim: '31/08/2026' },
  { id: 2, name: 'Ecocardiografia Avançada', categoria: 'Ecocardiografia', tipo: 'Curso Presencial', inscricoes: 98, vagas: 120, valor: 890, avaliacao: 4.9, status: 'ativo', inicio: '15/06/2026', fim: '15/07/2026' },
  { id: 3, name: 'Eletrofisiologia Clínica', categoria: 'Eletrofisiologia', tipo: 'Híbrido', inscricoes: 87, vagas: 100, valor: 1050, avaliacao: 4.7, status: 'ativo', inicio: '01/07/2026', fim: '30/09/2026' },
  { id: 4, name: 'Insuficiência Cardíaca - Update 2026', categoria: 'Insuficiência Cardíaca', tipo: 'Curso Online', inscricoes: 76, vagas: 150, valor: 650, avaliacao: 4.6, status: 'ativo', inicio: '10/06/2026', fim: '10/07/2026' },
  { id: 5, name: 'Prevenção Cardiovascular Primária', categoria: 'Prevenção Cardiovascular', tipo: 'Curso Online', inscricoes: 54, vagas: 200, valor: 490, avaliacao: 4.5, status: 'rascunho', inicio: '01/08/2026', fim: '30/09/2026' },
];

interface AtividadeModalProps { onClose: () => void; atividade?: typeof mockAtividades[0] | null; }

function AtividadeModal({ onClose, atividade }: AtividadeModalProps) {
  const [form, setForm] = useState({
    name: atividade?.name || '',
    categoria: atividade?.categoria || '',
    tipo: atividade?.tipo || 'Curso Online',
    vagas: atividade?.vagas?.toString() || '',
    valor: atividade?.valor?.toString() || '',
    inicio: '', fim: '',
    descricao: '',
  });

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-border flex items-center justify-between sticky top-0 bg-card">
          <h2 className="text-lg font-semibold">{atividade ? 'Editar Atividade' : 'Nova Atividade'}</h2>
          <button onClick={onClose} className="p-1.5 hover:bg-accent rounded-lg transition-colors"><X className="w-4 h-4" /></button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5">Nome da Atividade</label>
            <input value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))}
              className="w-full px-3 py-2.5 bg-input-background border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 outline-none"
              placeholder="Nome do curso ou atividade" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Categoria</label>
              <select value={form.categoria} onChange={e => setForm(f => ({...f, categoria: e.target.value}))}
                className="w-full px-3 py-2.5 bg-input-background border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 outline-none">
                <option value="">Selecione...</option>
                {categorias.filter(c => c !== 'Todas').map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Tipo</label>
              <select value={form.tipo} onChange={e => setForm(f => ({...f, tipo: e.target.value}))}
                className="w-full px-3 py-2.5 bg-input-background border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 outline-none">
                {['Curso Online', 'Curso Presencial', 'Híbrido', 'Workshop', 'Congresso'].map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Vagas</label>
              <input type="number" value={form.vagas} onChange={e => setForm(f => ({...f, vagas: e.target.value}))}
                className="w-full px-3 py-2.5 bg-input-background border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 outline-none" placeholder="0" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Valor (R$)</label>
              <input type="number" value={form.valor} onChange={e => setForm(f => ({...f, valor: e.target.value}))}
                className="w-full px-3 py-2.5 bg-input-background border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 outline-none" placeholder="0,00" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Data de Início</label>
              <input type="date" value={form.inicio} onChange={e => setForm(f => ({...f, inicio: e.target.value}))}
                className="w-full px-3 py-2.5 bg-input-background border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Data de Fim</label>
              <input type="date" value={form.fim} onChange={e => setForm(f => ({...f, fim: e.target.value}))}
                className="w-full px-3 py-2.5 bg-input-background border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 outline-none" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Descrição</label>
            <textarea value={form.descricao} onChange={e => setForm(f => ({...f, descricao: e.target.value}))}
              rows={3} className="w-full px-3 py-2.5 bg-input-background border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 outline-none resize-none"
              placeholder="Descrição da atividade..." />
          </div>
        </div>
        <div className="p-6 border-t border-border flex gap-3 justify-end">
          <button onClick={onClose} className="px-4 py-2 text-sm border border-border rounded-lg hover:bg-accent transition-colors">Cancelar</button>
          <button onClick={onClose} className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">Salvar</button>
        </div>
      </div>
    </div>
  );
}

export function Atividades() {
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('Todas');
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState<typeof mockAtividades[0] | null>(null);

  const filtered = mockAtividades.filter(a => {
    const matchSearch = a.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = catFilter === 'Todas' || a.categoria === catFilter;
    return matchSearch && matchCat;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl mb-2">Atividades (Cursos)</h1>
              <p className="text-muted-foreground">Gerencie cursos, workshops e atividades educacionais</p>
            </div>
            <button onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium">
              <Plus className="w-4 h-4" /> Nova Atividade
            </button>
          </div>

          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar atividades..."
                className="w-full pl-9 pr-4 py-2.5 bg-card border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 outline-none" />
            </div>
            <div className="flex flex-wrap gap-1.5">
              {categorias.map(c => (
                <button key={c} onClick={() => setCatFilter(c)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${catFilter === c ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-accent'}`}>
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(a => (
              <div key={a.id} className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-md transition-all">
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-purple-500" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        a.status === 'ativo' ? 'bg-green-500/10 text-green-600' : 'bg-yellow-500/10 text-yellow-600'
                      }`}>{a.status === 'ativo' ? 'Ativo' : 'Rascunho'}</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">{a.categoria} · {a.tipo}</p>
                  <h3 className="font-semibold text-sm mb-3 line-clamp-2 group-hover:text-primary transition-colors">{a.name}</h3>
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Inscrições</p>
                      <p className="text-sm font-semibold">{a.inscricoes}/{a.vagas}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Valor</p>
                      <p className="text-sm font-semibold text-green-600">R$ {a.valor}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground">Avaliação</p>
                      <p className="text-sm font-semibold flex items-center justify-center gap-0.5">
                        <Star className="w-3 h-3 text-yellow-400" /> {a.avaliacao}
                      </p>
                    </div>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1.5 mb-4">
                    <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: `${(a.inscricoes / a.vagas) * 100}%` }} />
                  </div>
                  <div className="flex gap-2 pt-3 border-t border-border">
                    <button onClick={() => { setEditItem(a); setShowModal(true); }}
                      className="flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs border border-border rounded-lg hover:bg-accent transition-colors">
                      <Edit2 className="w-3 h-3" /> Editar
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs border border-border rounded-lg hover:bg-accent transition-colors">
                      <Users className="w-3 h-3" /> Inscrições
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {showModal && <AtividadeModal onClose={() => { setShowModal(false); setEditItem(null); }} atividade={editItem} />}
    </div>
  );
}
