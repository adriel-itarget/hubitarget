import { useState } from 'react';
import { Search, Plus, TrendingUp, TrendingDown, ChevronDown, Filter, X } from 'lucide-react';

const costCenters = ['Todos', 'Associação', 'Eventos', 'Cursos', 'Cashback', 'Exames'];
const tipos = ['Todos', 'Receita', 'Despesa'];

const mockLancamentos = [
  { id: 1, desc: 'Anuidades - Junho 2026', type: 'receita', value: 24800, date: '05/06/2026', center: 'Associação', category: 'Anuidade', status: 'confirmado' },
  { id: 2, desc: 'Inscrições Congresso Nacional', type: 'receita', value: 18500, date: '04/06/2026', center: 'Eventos', category: 'Inscrição', status: 'confirmado' },
  { id: 3, desc: 'Aluguel sede - Junho', type: 'despesa', value: 8200, date: '03/06/2026', center: 'Associação', category: 'Despesa Fixa', status: 'confirmado' },
  { id: 4, desc: 'Plataforma EAD - Licença mensal', type: 'despesa', value: 3500, date: '02/06/2026', center: 'Cursos', category: 'Tecnologia', status: 'confirmado' },
  { id: 5, desc: 'Prova de Título - Inscrições', type: 'receita', value: 31200, date: '01/06/2026', center: 'Exames', category: 'Inscrição', status: 'pendente' },
  { id: 6, desc: 'Cashback liberado - Campanha Maio', type: 'despesa', value: 4700, date: '31/05/2026', center: 'Cashback', category: 'Cashback', status: 'confirmado' },
  { id: 7, desc: 'Anuidades - Maio 2026', type: 'receita', value: 22100, date: '28/05/2026', center: 'Associação', category: 'Anuidade', status: 'confirmado' },
  { id: 8, desc: 'Material didático', type: 'despesa', value: 1850, date: '27/05/2026', center: 'Cursos', category: 'Material', status: 'confirmado' },
  { id: 9, desc: 'Patrocínio Evento Científico', type: 'receita', value: 15000, date: '26/05/2026', center: 'Eventos', category: 'Patrocínio', status: 'confirmado' },
  { id: 10, desc: 'Serviços de limpeza', type: 'despesa', value: 2300, date: '25/05/2026', center: 'Associação', category: 'Despesa Fixa', status: 'confirmado' },
];

interface LancamentoModalProps {
  onClose: () => void;
}

function LancamentoModal({ onClose }: LancamentoModalProps) {
  const [form, setForm] = useState({ desc: '', type: 'receita', value: '', date: '', center: 'Associação', category: '', obs: '' });

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-2xl shadow-2xl w-full max-w-lg">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h2 className="text-lg font-semibold">Novo Lançamento</h2>
          <button onClick={onClose} className="p-1.5 hover:bg-accent rounded-lg transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-1 bg-muted p-1 rounded-lg">
            {(['receita', 'despesa'] as const).map(t => (
              <button
                key={t}
                onClick={() => setForm(f => ({ ...f, type: t }))}
                className={`py-2 rounded-md text-sm font-medium transition-colors capitalize ${
                  form.type === t ? 'bg-background shadow-sm' : 'hover:bg-background/50'
                }`}
              >
                {t === 'receita' ? 'Receita' : 'Despesa'}
              </button>
            ))}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Descrição</label>
            <input
              value={form.desc}
              onChange={e => setForm(f => ({ ...f, desc: e.target.value }))}
              className="w-full px-3 py-2.5 bg-input-background border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 outline-none"
              placeholder="Descrição do lançamento"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Valor (R$)</label>
              <input
                type="number"
                value={form.value}
                onChange={e => setForm(f => ({ ...f, value: e.target.value }))}
                className="w-full px-3 py-2.5 bg-input-background border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                placeholder="0,00"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Data</label>
              <input
                type="date"
                value={form.date}
                onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                className="w-full px-3 py-2.5 bg-input-background border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Centro de Custo</label>
              <select
                value={form.center}
                onChange={e => setForm(f => ({ ...f, center: e.target.value }))}
                className="w-full px-3 py-2.5 bg-input-background border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 outline-none"
              >
                {costCenters.filter(c => c !== 'Todos').map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Categoria</label>
              <input
                value={form.category}
                onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                className="w-full px-3 py-2.5 bg-input-background border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                placeholder="Ex: Anuidade, Aluguel..."
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Observações</label>
            <textarea
              value={form.obs}
              onChange={e => setForm(f => ({ ...f, obs: e.target.value }))}
              rows={3}
              className="w-full px-3 py-2.5 bg-input-background border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 outline-none resize-none"
              placeholder="Observações adicionais..."
            />
          </div>
        </div>
        <div className="p-6 border-t border-border flex gap-3 justify-end">
          <button onClick={onClose} className="px-4 py-2 text-sm border border-border rounded-lg hover:bg-accent transition-colors">
            Cancelar
          </button>
          <button onClick={onClose} className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
            Salvar Lançamento
          </button>
        </div>
      </div>
    </div>
  );
}

export function Lancamentos() {
  const [search, setSearch] = useState('');
  const [centerFilter, setCenterFilter] = useState('Todos');
  const [tipoFilter, setTipoFilter] = useState('Todos');
  const [showModal, setShowModal] = useState(false);

  const filtered = mockLancamentos.filter(l => {
    const matchSearch = l.desc.toLowerCase().includes(search.toLowerCase());
    const matchCenter = centerFilter === 'Todos' || l.center === centerFilter;
    const matchTipo = tipoFilter === 'Todos' || l.type === tipoFilter.toLowerCase();
    return matchSearch && matchCenter && matchTipo;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl mb-2">Lançamentos</h1>
              <p className="text-muted-foreground">Histórico de receitas e despesas</p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
            >
              <Plus className="w-4 h-4" />
              Novo Lançamento
            </button>
          </div>

          <div className="bg-card border border-border rounded-xl mb-6 p-4">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="relative flex-1 min-w-[200px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Buscar lançamentos..."
                  className="w-full pl-9 pr-4 py-2 bg-input-background border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 outline-none"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                {costCenters.map(c => (
                  <button
                    key={c}
                    onClick={() => setCenterFilter(c)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      centerFilter === c ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-accent'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-1">
                {tipos.map(t => (
                  <button
                    key={t}
                    onClick={() => setTipoFilter(t)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                      tipoFilter === t ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-accent'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Descrição</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Tipo</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Centro</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Data</th>
                  <th className="text-right px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Valor</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map(l => (
                  <tr key={l.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium">{l.desc}</p>
                      <p className="text-xs text-muted-foreground">{l.category}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`flex items-center gap-1.5 text-sm ${l.type === 'receita' ? 'text-green-600' : 'text-red-500'}`}>
                        {l.type === 'receita' ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                        {l.type === 'receita' ? 'Receita' : 'Despesa'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-muted-foreground">{l.center}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm">{l.date}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className={`text-sm font-semibold ${l.type === 'receita' ? 'text-green-600' : 'text-red-500'}`}>
                        {l.type === 'receita' ? '+' : '-'} R$ {l.value.toLocaleString('pt-BR')}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                        l.status === 'confirmado' ? 'bg-green-500/10 text-green-600' : 'bg-yellow-500/10 text-yellow-600'
                      }`}>
                        {l.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <p>Nenhum lançamento encontrado</p>
              </div>
            )}
          </div>
        </div>
      </div>
      {showModal && <LancamentoModal onClose={() => setShowModal(false)} />}
    </div>
  );
}
