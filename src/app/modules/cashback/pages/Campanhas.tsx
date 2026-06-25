import { useState } from 'react';
import { Plus, Search, Gift, X, ChevronRight, ChevronLeft, Check, Edit2, Users, Wallet, Star, Trash2, Clock, RefreshCw } from 'lucide-react';

// ── Types ──────────────────────────────────────────────────────────────────────

type Recorrencia = 'unica_vez' | 'diario' | 'mensal' | 'anual' | 'indeterminado';

interface ProdutoCampanha {
  id: string; nome: string;
  tipoPontuacao: 'cash' | 'pontos';
  tipoValor: 'percentual' | 'fixo';
  valor: number;
  expiracaoEmDias: number | null;
  carenciaEmDias: number;
  recorrencia: Recorrencia;
}

interface ProdutoFormData {
  nome: string; tipoPontuacao: 'cash' | 'pontos'; tipoValor: 'percentual' | 'fixo';
  valor: string; naoExpira: boolean; expiracaoEmDias: string; carenciaEmDias: string;
  recorrencia: Recorrencia;
}

const RECORRENCIA_LABEL: Record<Recorrencia, string> = {
  unica_vez: 'Uma única vez', diario: 'Diário', mensal: 'Mensal', anual: 'Anual', indeterminado: 'Indeterminado',
};

const emptyForm = (): ProdutoFormData => ({
  nome: '', tipoPontuacao: 'cash', tipoValor: 'percentual', valor: '',
  naoExpira: false, expiracaoEmDias: '365', carenciaEmDias: '0', recorrencia: 'anual',
});

function formToProduto(f: ProdutoFormData): Omit<ProdutoCampanha, 'id'> {
  return {
    nome: f.nome, tipoPontuacao: f.tipoPontuacao, tipoValor: f.tipoValor,
    valor: parseFloat(f.valor) || 0,
    expiracaoEmDias: f.naoExpira ? null : parseInt(f.expiracaoEmDias) || 365,
    carenciaEmDias: parseInt(f.carenciaEmDias) || 0,
    recorrencia: f.recorrencia,
  };
}

function produtoToForm(p: ProdutoCampanha): ProdutoFormData {
  return {
    nome: p.nome, tipoPontuacao: p.tipoPontuacao, tipoValor: p.tipoValor,
    valor: String(p.valor), naoExpira: p.expiracaoEmDias === null,
    expiracaoEmDias: String(p.expiracaoEmDias ?? 365),
    carenciaEmDias: String(p.carenciaEmDias), recorrencia: p.recorrencia,
  };
}

// ── Mock data ──────────────────────────────────────────────────────────────────

const mockCampanhas = [
  { id: 1, name: 'Cashback Anuidade 2026',  tipo: 'Anuidade',  percentual: 8,  valorTotal: 45800, usuarios: 412, inicio: '01/01/2026', fim: '31/12/2026', status: 'ativa'  },
  { id: 2, name: 'Bônus Congresso Nacional', tipo: 'Evento',    percentual: 10, valorTotal: 12300, usuarios: 189, inicio: '01/06/2026', fim: '30/06/2026', status: 'ativa'  },
  { id: 3, name: 'Cashback Cursos Online',   tipo: 'Educação',  percentual: 5,  valorTotal: 8750,  usuarios: 97,  inicio: '01/03/2026', fim: '30/09/2026', status: 'ativa'  },
  { id: 4, name: 'Campanha Indicação',       tipo: 'Indicação', percentual: 15, valorTotal: 3200,  usuarios: 43,  inicio: '01/05/2026', fim: '31/07/2026', status: 'pausada'},
];

const mockProdutos: Record<number, ProdutoCampanha[]> = {
  1: [
    { id: '1-1', nome: 'Anuidade Padrão',      tipoPontuacao: 'cash',   tipoValor: 'percentual', valor: 8,   expiracaoEmDias: 365, carenciaEmDias: 30, recorrencia: 'anual'       },
  ],
  2: [
    { id: '2-1', nome: 'Inscrição Congresso',  tipoPontuacao: 'cash',   tipoValor: 'percentual', valor: 10,  expiracaoEmDias: 180, carenciaEmDias: 15, recorrencia: 'unica_vez'   },
    { id: '2-2', nome: 'Workshop Cardiologia', tipoPontuacao: 'pontos', tipoValor: 'fixo',       valor: 500, expiracaoEmDias: 90,  carenciaEmDias: 0,  recorrencia: 'unica_vez'   },
    { id: '2-3', nome: 'Mesa Redonda',         tipoPontuacao: 'pontos', tipoValor: 'fixo',       valor: 250, expiracaoEmDias: 90,  carenciaEmDias: 0,  recorrencia: 'unica_vez'   },
  ],
  3: [
    { id: '3-1', nome: 'Curso Online Básico',    tipoPontuacao: 'cash',   tipoValor: 'percentual', valor: 5,   expiracaoEmDias: 180, carenciaEmDias: 7,  recorrencia: 'mensal'      },
    { id: '3-2', nome: 'Curso Online Avançado',  tipoPontuacao: 'pontos', tipoValor: 'percentual', valor: 3,   expiracaoEmDias: 180, carenciaEmDias: 7,  recorrencia: 'mensal'      },
    { id: '3-3', nome: 'Webinar ao Vivo',        tipoPontuacao: 'pontos', tipoValor: 'fixo',       valor: 100, expiracaoEmDias: 60,  carenciaEmDias: 0,  recorrencia: 'indeterminado'},
    { id: '3-4', nome: 'Simulado Online',        tipoPontuacao: 'pontos', tipoValor: 'fixo',       valor: 150, expiracaoEmDias: null, carenciaEmDias: 0, recorrencia: 'indeterminado'},
  ],
  4: [],
};

const mockUsuariosCampanha: Record<number, { id: number; nome: string; avatar: string; saldoCash: number; saldoPontos: number; dataEntrada: string }[]> = {
  1: [
    { id: 1, nome: 'Dr. Carlos Eduardo Silva',  avatar: 'CE', saldoCash: 245.50, saldoPontos: 1840, dataEntrada: '01/01/2026' },
    { id: 3, nome: 'Dr. Roberto Mendes Costa',  avatar: 'RM', saldoCash: 512.80, saldoPontos: 3250, dataEntrada: '01/01/2026' },
    { id: 5, nome: 'Dr. Fernando Lima Santos',  avatar: 'FL', saldoCash: 1200.00,saldoPontos: 5620, dataEntrada: '15/01/2026' },
    { id: 7, nome: 'Dr. Paulo Rodrigues',       avatar: 'PR', saldoCash: 320.50, saldoPontos: 2100, dataEntrada: '01/01/2026' },
  ],
  2: [
    { id: 1, nome: 'Dr. Carlos Eduardo Silva',  avatar: 'CE', saldoCash: 89.00,  saldoPontos: 500,  dataEntrada: '01/06/2026' },
    { id: 5, nome: 'Dr. Fernando Lima Santos',  avatar: 'FL', saldoCash: 150.00, saldoPontos: 1000, dataEntrada: '01/06/2026' },
    { id: 9, nome: 'Dr. Marcelo Teixeira',      avatar: 'MT', saldoCash: 200.00, saldoPontos: 750,  dataEntrada: '02/06/2026' },
  ],
  3: [
    { id: 2, nome: 'Dra. Ana Paula Ferreira',   avatar: 'AP', saldoCash: 45.00,  saldoPontos: 300,  dataEntrada: '01/03/2026' },
    { id: 6, nome: 'Dra. Juliana Pereira',      avatar: 'JP', saldoCash: 30.00,  saldoPontos: 200,  dataEntrada: '15/03/2026' },
    { id: 10,nome: 'Dra. Renata Carvalho',      avatar: 'RC', saldoCash: 60.00,  saldoPontos: 400,  dataEntrada: '01/04/2026' },
  ],
  4: [
    { id: 8, nome: 'Dra. Beatriz Almeida',      avatar: 'BA', saldoCash: 20.00,  saldoPontos: 150,  dataEntrada: '01/05/2026' },
  ],
};

// ── Shared input classes ───────────────────────────────────────────────────────
const inputCls = 'w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 outline-none';
const selectCls = `${inputCls} cursor-pointer`;

// ── ProdutoFormFields ──────────────────────────────────────────────────────────

function ProdutoFormFields({ data, onChange }: { data: ProdutoFormData; onChange: (d: ProdutoFormData) => void }) {
  const set = <K extends keyof ProdutoFormData>(k: K, v: ProdutoFormData[K]) => onChange({ ...data, [k]: v });

  return (
    <div className="space-y-3">
      <div>
        <label className="block text-xs font-medium mb-1">Nome do Produto</label>
        <input value={data.nome} onChange={e => set('nome', e.target.value)}
          className={inputCls} placeholder="Ex: Anuidade Padrão" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium mb-1">Tipo de Pontuação</label>
          <div className="flex gap-1.5">
            {(['cash', 'pontos'] as const).map(t => (
              <button key={t} type="button" onClick={() => set('tipoPontuacao', t)}
                className={`flex-1 py-1.5 text-xs rounded-lg border transition-colors flex items-center justify-center gap-1 ${
                  data.tipoPontuacao === t ? 'border-primary bg-primary/5 text-primary' : 'border-border hover:bg-accent'}`}>
                {t === 'cash' ? <><Wallet className="w-3 h-3" />Cash</> : <><Star className="w-3 h-3" />Pontos</>}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">Tipo de Valor</label>
          <div className="flex gap-1.5">
            {(['percentual', 'fixo'] as const).map(t => (
              <button key={t} type="button" onClick={() => set('tipoValor', t)}
                className={`flex-1 py-1.5 text-xs rounded-lg border transition-colors ${
                  data.tipoValor === t ? 'border-primary bg-primary/5 text-primary' : 'border-border hover:bg-accent'}`}>
                {t === 'percentual' ? 'Percentual %' : 'Fixo'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium mb-1">
            Valor {data.tipoValor === 'percentual' ? '(%)' : data.tipoPontuacao === 'cash' ? '(R$)' : '(pts)'}
          </label>
          <input type="number" min="0" value={data.valor} onChange={e => set('valor', e.target.value)}
            className={inputCls} placeholder={data.tipoValor === 'percentual' ? 'Ex: 8' : 'Ex: 100'} />
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">Recorrência</label>
          <select value={data.recorrencia} onChange={e => set('recorrencia', e.target.value as Recorrencia)} className={selectCls}>
            {(Object.entries(RECORRENCIA_LABEL) as [Recorrencia, string][]).map(([k, v]) => (
              <option key={k} value={k}>{v}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium mb-1">Expiração (dias)</label>
          <input type="number" min="0" value={data.naoExpira ? '' : data.expiracaoEmDias}
            disabled={data.naoExpira} onChange={e => set('expiracaoEmDias', e.target.value)}
            className={`${inputCls} disabled:opacity-40`} placeholder="Ex: 365" />
          <label className="flex items-center gap-1.5 text-xs mt-1.5 cursor-pointer text-muted-foreground hover:text-foreground transition-colors">
            <input type="checkbox" checked={data.naoExpira} onChange={e => set('naoExpira', e.target.checked)} className="accent-primary" />
            Não expira
          </label>
        </div>
        <div>
          <label className="block text-xs font-medium mb-1">Carência para Resgate (dias)</label>
          <input type="number" min="0" value={data.carenciaEmDias} onChange={e => set('carenciaEmDias', e.target.value)}
            className={inputCls} placeholder="0" />
          <p className="text-[11px] text-muted-foreground mt-1">0 = resgate imediato</p>
        </div>
      </div>
    </div>
  );
}

// ── ProdutoItem ────────────────────────────────────────────────────────────────

function ProdutoItem({ produto, onEdit, onRemove }: {
  produto: ProdutoCampanha;
  onEdit: () => void;
  onRemove: () => void;
}) {
  return (
    <div className="p-3 rounded-xl border border-border bg-muted/20 hover:bg-muted/40 transition-colors group">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1.5">
            <span className="text-sm font-medium">{produto.nome}</span>
            <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${
              produto.tipoPontuacao === 'cash' ? 'bg-green-500/10 text-green-600' : 'bg-violet-500/10 text-violet-600'}`}>
              {produto.tipoPontuacao === 'cash' ? 'Cash' : 'Pontos'}
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground flex-wrap">
            <span className="flex items-center gap-1">
              <Gift className="w-3 h-3" />
              {produto.tipoValor === 'percentual' ? `${produto.valor}%` : produto.tipoPontuacao === 'cash' ? `R$ ${produto.valor}` : `${produto.valor} pts`}
            </span>
            <span className="flex items-center gap-1">
              <RefreshCw className="w-3 h-3" />
              {RECORRENCIA_LABEL[produto.recorrencia]}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {produto.expiracaoEmDias ? `Expira em ${produto.expiracaoEmDias}d` : 'Não expira'}
            </span>
            {produto.carenciaEmDias > 0 && (
              <span>Carência: {produto.carenciaEmDias}d</span>
            )}
          </div>
        </div>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={onEdit} className="p-1.5 hover:bg-accent rounded-lg transition-colors">
            <Edit2 className="w-3.5 h-3.5" />
          </button>
          <button onClick={onRemove} className="p-1.5 hover:bg-red-500/10 hover:text-red-500 rounded-lg transition-colors">
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Campaign Panel ─────────────────────────────────────────────────────────────

type PanelTab = 'dados' | 'usuarios' | 'produtos';

function CampanhaPanel({ campanha, initialTab, onClose }: {
  campanha: typeof mockCampanhas[0];
  initialTab: PanelTab;
  onClose: () => void;
}) {
  const [activeTab, setActiveTab] = useState<PanelTab>(initialTab);
  const [formDados, setFormDados] = useState({ ...campanha });
  const [produtos, setProdutos] = useState<ProdutoCampanha[]>(mockProdutos[campanha.id] || []);
  const [showAddProduto, setShowAddProduto] = useState(false);
  const [addForm, setAddForm] = useState<ProdutoFormData>(emptyForm());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<ProdutoFormData>(emptyForm());

  const usuarios = mockUsuariosCampanha[campanha.id] || [];

  const handleAddProduto = () => {
    if (!addForm.nome) return;
    const novo: ProdutoCampanha = { id: `${campanha.id}-${Date.now()}`, ...formToProduto(addForm) };
    setProdutos(p => [...p, novo]);
    setAddForm(emptyForm());
    setShowAddProduto(false);
  };

  const handleSaveEdit = (id: string) => {
    if (!editForm.nome) return;
    setProdutos(p => p.map(x => x.id === id ? { id, ...formToProduto(editForm) } : x));
    setEditingId(null);
  };

  const tabs: { id: PanelTab; label: string }[] = [
    { id: 'dados',    label: 'Dados'    },
    { id: 'usuarios', label: `Usuários (${usuarios.length})` },
    { id: 'produtos', label: `Produtos (${produtos.length})` },
  ];

  return (
    <div className="fixed inset-0 z-40 flex justify-end" onClick={onClose}>
      <div className="w-[460px] h-full bg-card border-l border-border shadow-2xl flex flex-col overflow-hidden"
        onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="p-4 border-b border-border flex items-start justify-between gap-3 flex-shrink-0">
          <div className="min-w-0">
            <p className="font-semibold truncate">{campanha.name}</p>
            <p className="text-xs text-muted-foreground">{campanha.tipo} · {campanha.inicio} até {campanha.fim}</p>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-accent rounded-lg transition-colors flex-shrink-0">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border flex-shrink-0">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              className={`flex-1 py-2.5 text-xs font-medium transition-colors border-b-2 ${
                activeTab === t.id ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">

          {/* ── Dados Tab ── */}
          {activeTab === 'dados' && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium mb-1">Nome da Campanha</label>
                <input value={formDados.name} onChange={e => setFormDados(f => ({ ...f, name: e.target.value }))}
                  className={inputCls} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium mb-1">Tipo</label>
                  <select value={formDados.tipo} onChange={e => setFormDados(f => ({ ...f, tipo: e.target.value }))} className={selectCls}>
                    {['Anuidade','Evento','Educação','Indicação','Fidelidade'].map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">Status</label>
                  <select value={formDados.status} onChange={e => setFormDados(f => ({ ...f, status: e.target.value }))} className={selectCls}>
                    <option value="ativa">Ativa</option>
                    <option value="pausada">Pausada</option>
                    <option value="encerrada">Encerrada</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">% Cashback geral</label>
                <input type="number" value={formDados.percentual} onChange={e => setFormDados(f => ({ ...f, percentual: Number(e.target.value) }))}
                  className={inputCls} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium mb-1">Início</label>
                  <input value={formDados.inicio} onChange={e => setFormDados(f => ({ ...f, inicio: e.target.value }))} className={inputCls} />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1">Fim</label>
                  <input value={formDados.fim} onChange={e => setFormDados(f => ({ ...f, fim: e.target.value }))} className={inputCls} />
                </div>
              </div>
              <button className="w-full py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
                Salvar Alterações
              </button>
            </div>
          )}

          {/* ── Usuários Tab ── */}
          {activeTab === 'usuarios' && (
            <div className="space-y-2">
              {usuarios.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-10">Nenhum usuário vinculado a esta campanha</p>
              ) : usuarios.map(u => (
                <div key={u.id} className="flex items-center gap-3 p-3 rounded-xl border border-border hover:bg-muted/30 transition-colors">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">
                    {u.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{u.nome}</p>
                    <p className="text-xs text-muted-foreground">Desde {u.dataEntrada}</p>
                  </div>
                  <div className="text-right flex-shrink-0 space-y-0.5">
                    <p className="text-xs font-semibold text-green-600">
                      {u.saldoCash.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                    </p>
                    <p className="text-xs text-violet-600">{u.saldoPontos.toLocaleString()} pts</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ── Produtos Tab ── */}
          {activeTab === 'produtos' && (
            <div className="space-y-3">
              <button onClick={() => { setShowAddProduto(s => !s); setAddForm(emptyForm()); }}
                className="w-full flex items-center justify-center gap-2 py-2 text-sm border border-dashed border-border rounded-xl hover:border-primary hover:text-primary hover:bg-primary/5 transition-colors">
                <Plus className="w-4 h-4" />
                Adicionar Produto Campanha
              </button>

              {showAddProduto && (
                <div className="p-4 rounded-xl border border-primary/30 bg-primary/5 space-y-3">
                  <p className="text-xs font-semibold text-primary uppercase tracking-wide">Novo Produto</p>
                  <ProdutoFormFields data={addForm} onChange={setAddForm} />
                  <div className="flex gap-2">
                    <button onClick={() => setShowAddProduto(false)}
                      className="flex-1 py-2 text-xs border border-border rounded-lg hover:bg-accent transition-colors">
                      Cancelar
                    </button>
                    <button onClick={handleAddProduto} disabled={!addForm.nome}
                      className="flex-1 py-2 text-xs bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-40">
                      Adicionar
                    </button>
                  </div>
                </div>
              )}

              {produtos.length === 0 && !showAddProduto && (
                <p className="text-sm text-muted-foreground text-center py-8">Nenhum produto configurado</p>
              )}

              {produtos.map(p => (
                <div key={p.id}>
                  {editingId === p.id ? (
                    <div className="p-4 rounded-xl border border-border bg-muted/30 space-y-3">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Editando: {p.nome}</p>
                      <ProdutoFormFields data={editForm} onChange={setEditForm} />
                      <div className="flex gap-2">
                        <button onClick={() => setEditingId(null)}
                          className="flex-1 py-2 text-xs border border-border rounded-lg hover:bg-accent transition-colors">
                          Cancelar
                        </button>
                        <button onClick={() => handleSaveEdit(p.id)} disabled={!editForm.nome}
                          className="flex-1 py-2 text-xs bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-40">
                          Salvar
                        </button>
                      </div>
                    </div>
                  ) : (
                    <ProdutoItem produto={p}
                      onEdit={() => { setEditingId(p.id); setEditForm(produtoToForm(p)); setShowAddProduto(false); }}
                      onRemove={() => setProdutos(prev => prev.filter(x => x.id !== p.id))} />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Wizard ─────────────────────────────────────────────────────────────────────

const wizardSteps = ['Dados da Campanha', 'Produtos Campanha', 'Revisão'];

function CampanhaWizard({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ name: '', tipo: 'Anuidade', inicio: '', fim: '' });
  const [produtos, setProdutos] = useState<ProdutoCampanha[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [addForm, setAddForm] = useState<ProdutoFormData>(emptyForm());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<ProdutoFormData>(emptyForm());

  const handleAddProduto = () => {
    if (!addForm.nome) return;
    setProdutos(p => [...p, { id: `new-${Date.now()}`, ...formToProduto(addForm) }]);
    setAddForm(emptyForm());
    setShowAddForm(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-2xl shadow-2xl w-full max-w-xl max-h-[90vh] flex flex-col">

        {/* Header */}
        <div className="p-6 border-b border-border flex items-center justify-between flex-shrink-0">
          <div>
            <h2 className="text-lg font-semibold">Nova Campanha de Cashback</h2>
            <p className="text-sm text-muted-foreground mt-0.5">Passo {step + 1} de {wizardSteps.length}</p>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-accent rounded-lg transition-colors"><X className="w-4 h-4" /></button>
        </div>

        {/* Steps */}
        <div className="px-6 pt-4 flex-shrink-0">
          <div className="flex items-center">
            {wizardSteps.map((s, i) => (
              <div key={i} className="flex items-center flex-1 last:flex-none">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${
                  i < step ? 'bg-primary text-primary-foreground' :
                  i === step ? 'bg-primary text-primary-foreground ring-4 ring-primary/20' :
                  'bg-muted text-muted-foreground'}`}>
                  {i < step ? <Check className="w-4 h-4" /> : i + 1}
                </div>
                {i < wizardSteps.length - 1 && <div className={`flex-1 h-0.5 mx-1 transition-colors ${i < step ? 'bg-primary' : 'bg-border'}`} />}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-1.5 mb-4">
            {wizardSteps.map((s, i) => (
              <span key={i} className={`text-xs ${i === step ? 'text-primary font-medium' : 'text-muted-foreground'}`}>{s}</span>
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="px-6 pb-2 flex-1 overflow-y-auto min-h-0">

          {step === 0 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">Nome da Campanha</label>
                <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className={inputCls} placeholder="Ex: Cashback Anuidade 2026" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Tipo</label>
                <select value={form.tipo} onChange={e => setForm(f => ({ ...f, tipo: e.target.value }))} className={selectCls}>
                  {['Anuidade','Evento','Educação','Indicação','Fidelidade'].map(t => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Início</label>
                  <input type="date" value={form.inicio} onChange={e => setForm(f => ({ ...f, inicio: e.target.value }))} className={inputCls} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Fim</label>
                  <input type="date" value={form.fim} onChange={e => setForm(f => ({ ...f, fim: e.target.value }))} className={inputCls} />
                </div>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">Configure os produtos que geram cashback ou pontos nesta campanha.</p>

              <button onClick={() => { setShowAddForm(s => !s); setAddForm(emptyForm()); setEditingId(null); }}
                className="w-full flex items-center justify-center gap-2 py-2.5 text-sm border border-dashed border-border rounded-xl hover:border-primary hover:text-primary hover:bg-primary/5 transition-colors">
                <Plus className="w-4 h-4" />
                Adicionar Produto Campanha
              </button>

              {showAddForm && (
                <div className="p-4 rounded-xl border border-primary/30 bg-primary/5 space-y-3">
                  <p className="text-xs font-semibold text-primary uppercase tracking-wide">Novo Produto</p>
                  <ProdutoFormFields data={addForm} onChange={setAddForm} />
                  <div className="flex gap-2">
                    <button onClick={() => setShowAddForm(false)}
                      className="flex-1 py-2 text-xs border border-border rounded-lg hover:bg-accent transition-colors">
                      Cancelar
                    </button>
                    <button onClick={handleAddProduto} disabled={!addForm.nome}
                      className="flex-1 py-2 text-xs bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-40">
                      Adicionar
                    </button>
                  </div>
                </div>
              )}

              {produtos.length === 0 && !showAddForm && (
                <p className="text-sm text-muted-foreground text-center py-6">Nenhum produto adicionado ainda</p>
              )}

              {produtos.map(p => (
                <div key={p.id}>
                  {editingId === p.id ? (
                    <div className="p-4 rounded-xl border border-border bg-muted/30 space-y-3">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Editando: {p.nome}</p>
                      <ProdutoFormFields data={editForm} onChange={setEditForm} />
                      <div className="flex gap-2">
                        <button onClick={() => setEditingId(null)}
                          className="flex-1 py-2 text-xs border border-border rounded-lg hover:bg-accent transition-colors">Cancelar</button>
                        <button onClick={() => { setProdutos(prev => prev.map(x => x.id === p.id ? { id: p.id, ...formToProduto(editForm) } : x)); setEditingId(null); }}
                          disabled={!editForm.nome}
                          className="flex-1 py-2 text-xs bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-40">Salvar</button>
                      </div>
                    </div>
                  ) : (
                    <ProdutoItem produto={p}
                      onEdit={() => { setEditingId(p.id); setEditForm(produtoToForm(p)); setShowAddForm(false); }}
                      onRemove={() => setProdutos(prev => prev.filter(x => x.id !== p.id))} />
                  )}
                </div>
              ))}
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="bg-muted/30 rounded-xl p-4 space-y-3">
                <h4 className="font-medium">{form.name || 'Sem nome'}</h4>
                <div className="grid grid-cols-2 gap-y-2 text-sm">
                  <div><span className="text-muted-foreground">Tipo:</span> {form.tipo}</div>
                  <div><span className="text-muted-foreground">Início:</span> {form.inicio || '—'}</div>
                  <div><span className="text-muted-foreground">Fim:</span> {form.fim || '—'}</div>
                  <div><span className="text-muted-foreground">Produtos:</span> {produtos.length}</div>
                </div>
              </div>
              {produtos.length > 0 && (
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Produtos configurados</p>
                  <div className="space-y-2">
                    {produtos.map(p => (
                      <div key={p.id} className="flex items-center gap-2 text-sm p-2 rounded-lg bg-muted/30">
                        <span className={`w-2 h-2 rounded-full flex-shrink-0 ${p.tipoPontuacao === 'cash' ? 'bg-green-500' : 'bg-violet-500'}`} />
                        <span className="font-medium flex-1">{p.nome}</span>
                        <span className="text-muted-foreground text-xs">
                          {p.tipoValor === 'percentual' ? `${p.valor}%` : p.tipoPontuacao === 'cash' ? `R$ ${p.valor}` : `${p.valor} pts`}
                          {' · '}{RECORRENCIA_LABEL[p.recorrencia]}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <p className="text-sm text-muted-foreground">Ao confirmar, a campanha será criada com status <strong>Ativa</strong>.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border flex justify-between flex-shrink-0">
          <button onClick={() => step === 0 ? onClose() : setStep(s => s - 1)}
            className="flex items-center gap-2 px-4 py-2 text-sm border border-border rounded-lg hover:bg-accent transition-colors">
            <ChevronLeft className="w-4 h-4" />
            {step === 0 ? 'Cancelar' : 'Anterior'}
          </button>
          <button onClick={() => step < wizardSteps.length - 1 ? setStep(s => s + 1) : onClose()}
            className="flex items-center gap-2 px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
            {step < wizardSteps.length - 1 ? 'Próximo' : 'Criar Campanha'}
            {step < wizardSteps.length - 1 && <ChevronRight className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────

export function Campanhas() {
  const [search, setSearch] = useState('');
  const [showWizard, setShowWizard] = useState(false);
  const [panel, setPanel] = useState<{ campanha: typeof mockCampanhas[0]; tab: PanelTab } | null>(null);

  const filtered = mockCampanhas.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  const openPanel = (campanha: typeof mockCampanhas[0], tab: PanelTab) => setPanel({ campanha, tab });

  return (
    <div className="min-h-screen bg-background">
      <div className="px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl mb-2">Campanhas de Cashback</h1>
              <p className="text-muted-foreground">Gerencie campanhas, produtos e usuários vinculados</p>
            </div>
            <button onClick={() => setShowWizard(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium">
              <Plus className="w-4 h-4" /> Nova Campanha
            </button>
          </div>

          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar campanhas..."
              className="w-full pl-9 pr-4 py-2.5 bg-card border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 outline-none" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map(c => {
              const numProdutos = (mockProdutos[c.id] || []).length;
              return (
                <div key={c.id} className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-md transition-all group">
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center">
                          <Gift className="w-5 h-5 text-orange-500" />
                        </div>
                        <div>
                          <h3 className="font-medium text-sm group-hover:text-primary transition-colors">{c.name}</h3>
                          <p className="text-xs text-muted-foreground">{c.tipo}</p>
                        </div>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        c.status === 'ativa' ? 'bg-green-500/10 text-green-600' : 'bg-yellow-500/10 text-yellow-600'}`}>
                        {c.status === 'ativa' ? 'Ativa' : 'Pausada'}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-3 mb-4">
                      <div className="text-center p-2 bg-muted/50 rounded-lg">
                        <p className="text-xs text-muted-foreground">Cashback</p>
                        <p className="text-sm font-semibold text-orange-500">{c.percentual}%</p>
                      </div>
                      <div className="text-center p-2 bg-muted/50 rounded-lg">
                        <p className="text-xs text-muted-foreground">Usuários</p>
                        <p className="text-sm font-semibold">{c.usuarios}</p>
                      </div>
                      <div className="text-center p-2 bg-muted/50 rounded-lg">
                        <p className="text-xs text-muted-foreground">Total</p>
                        <p className="text-sm font-semibold text-green-600">R$ {(c.valorTotal / 1000).toFixed(1)}k</p>
                      </div>
                    </div>

                    <p className="text-xs text-muted-foreground mb-4">{c.inicio} até {c.fim} · {numProdutos} produto{numProdutos !== 1 ? 's' : ''}</p>

                    <div className="flex gap-2 pt-3 border-t border-border">
                      <button onClick={() => openPanel(c, 'dados')}
                        className="flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs border border-border rounded-lg hover:bg-accent hover:text-primary transition-colors">
                        <Edit2 className="w-3 h-3" /> Editar
                      </button>
                      <button onClick={() => openPanel(c, 'usuarios')}
                        className="flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs border border-border rounded-lg hover:bg-accent hover:text-primary transition-colors">
                        <Users className="w-3 h-3" /> Usuários
                      </button>
                      <button onClick={() => openPanel(c, 'produtos')}
                        className="flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs border border-border rounded-lg hover:bg-accent hover:text-primary transition-colors">
                        <Gift className="w-3 h-3" /> Produtos
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {panel && (
        <CampanhaPanel
          campanha={panel.campanha}
          initialTab={panel.tab}
          onClose={() => setPanel(null)}
        />
      )}
      {showWizard && <CampanhaWizard onClose={() => setShowWizard(false)} />}
    </div>
  );
}
