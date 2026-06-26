import { useState } from 'react';
import { Plus, Search, Gift, ChevronRight, ChevronLeft, Check, Edit2, Users, Wallet, Star, Trash2, Clock, RefreshCw } from 'lucide-react';
import { Card, CardContent } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Badge } from '@/app/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/app/components/ui/dialog';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/app/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Label } from '@/app/components/ui/label';
import { Textarea } from '@/app/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Separator } from '@/app/components/ui/separator';
import { ScrollArea } from '@/app/components/ui/scroll-area';

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

function ProdutoFormFields({ data, onChange }: { data: ProdutoFormData; onChange: (d: ProdutoFormData) => void }) {
  const set = <K extends keyof ProdutoFormData>(k: K, v: ProdutoFormData[K]) => onChange({ ...data, [k]: v });

  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <Label className="text-xs">Nome do Produto</Label>
        <Input value={data.nome} onChange={e => set('nome', e.target.value)}
          placeholder="Ex: Anuidade Padrão" className="h-8 text-xs" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <Label className="text-xs">Tipo de Pontuação</Label>
          <div className="flex gap-1.5">
            {(['cash', 'pontos'] as const).map(t => (
              <Button key={t} type="button" variant={data.tipoPontuacao === t ? 'default' : 'outline'}
                size="sm" onClick={() => set('tipoPontuacao', t)}
                className="flex-1 h-8 text-xs">
                {t === 'cash' ? <><Wallet className="w-3 h-3 mr-1" />Cash</> : <><Star className="w-3 h-3 mr-1" />Pontos</>}
              </Button>
            ))}
          </div>
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Tipo de Valor</Label>
          <div className="flex gap-1.5">
            {(['percentual', 'fixo'] as const).map(t => (
              <Button key={t} type="button" variant={data.tipoValor === t ? 'default' : 'outline'}
                size="sm" onClick={() => set('tipoValor', t)}
                className="flex-1 h-8 text-xs">
                {t === 'percentual' ? 'Percentual %' : 'Fixo'}
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <Label className="text-xs">
            Valor {data.tipoValor === 'percentual' ? '(%)' : data.tipoPontuacao === 'cash' ? '(R$)' : '(pts)'}
          </Label>
          <Input type="number" min="0" value={data.valor} onChange={e => set('valor', e.target.value)}
            className="h-8 text-xs" placeholder={data.tipoValor === 'percentual' ? 'Ex: 8' : 'Ex: 100'} />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Recorrência</Label>
          <Select value={data.recorrencia} onValueChange={v => set('recorrencia', v as Recorrencia)}>
            <SelectTrigger className="h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {(Object.entries(RECORRENCIA_LABEL) as [Recorrencia, string][]).map(([k, v]) => (
                <SelectItem key={k} value={k}>{v}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <Label className="text-xs">Expiração (dias)</Label>
          <Input type="number" min="0" value={data.naoExpira ? '' : data.expiracaoEmDias}
            disabled={data.naoExpira} onChange={e => set('expiracaoEmDias', e.target.value)}
            className="h-8 text-xs disabled:opacity-40" placeholder="Ex: 365" />
          <label className="flex items-center gap-1.5 text-xs mt-1 cursor-pointer text-muted-foreground hover:text-foreground transition-colors">
            <input type="checkbox" checked={data.naoExpira} onChange={e => set('naoExpira', e.target.checked)} className="accent-primary" />
            Não expira
          </label>
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Carência para Resgate (dias)</Label>
          <Input type="number" min="0" value={data.carenciaEmDias} onChange={e => set('carenciaEmDias', e.target.value)}
            className="h-8 text-xs" placeholder="0" />
          <p className="text-[11px] text-muted-foreground mt-1">0 = resgate imediato</p>
        </div>
      </div>
    </div>
  );
}

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
            <Badge variant={produto.tipoPontuacao === 'cash' ? 'default' : 'secondary'} className="text-xs">
              {produto.tipoPontuacao === 'cash' ? 'Cash' : 'Pontos'}
            </Badge>
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
          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onEdit}>
            <Edit2 className="w-3.5 h-3.5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7 hover:text-red-500 hover:bg-red-500/10" onClick={onRemove}>
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}

type PanelTab = 'dados' | 'usuarios' | 'produtos';

function CampanhaPanel({ campanha, initialTab, open, onClose }: {
  campanha: typeof mockCampanhas[0];
  initialTab: PanelTab;
  open: boolean;
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

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-[460px] sm:max-w-[460px] p-0 flex flex-col">
        <SheetHeader className="p-4 border-b border-border">
          <div className="min-w-0">
            <SheetTitle className="truncate">{campanha.name}</SheetTitle>
            <p className="text-xs text-muted-foreground">{campanha.tipo} · {campanha.inicio} até {campanha.fim}</p>
          </div>
        </SheetHeader>

        <Tabs value={activeTab} onValueChange={v => setActiveTab(v as PanelTab)} className="flex flex-col flex-1 min-h-0">
          <TabsList className="rounded-none border-b border-border h-auto p-0 bg-transparent">
            <TabsTrigger value="dados" className="rounded-none flex-1 h-9 text-xs data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary">Dados</TabsTrigger>
            <TabsTrigger value="usuarios" className="rounded-none flex-1 h-9 text-xs data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary">Usuários ({usuarios.length})</TabsTrigger>
            <TabsTrigger value="produtos" className="rounded-none flex-1 h-9 text-xs data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary">Produtos ({produtos.length})</TabsTrigger>
          </TabsList>

          <ScrollArea className="flex-1 min-h-0">
            <div className="p-4">

            <TabsContent value="dados" className="mt-0">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Nome da Campanha</Label>
                  <Input value={formDados.name} onChange={e => setFormDados(f => ({ ...f, name: e.target.value }))} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label>Tipo</Label>
                    <Select value={formDados.tipo} onValueChange={v => setFormDados(f => ({ ...f, tipo: v }))}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {['Anuidade','Evento','Educação','Indicação','Fidelidade'].map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Status</Label>
                    <Select value={formDados.status} onValueChange={v => setFormDados(f => ({ ...f, status: v }))}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ativa">Ativa</SelectItem>
                        <SelectItem value="pausada">Pausada</SelectItem>
                        <SelectItem value="encerrada">Encerrada</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>% Cashback geral</Label>
                  <Input type="number" value={formDados.percentual} onChange={e => setFormDados(f => ({ ...f, percentual: Number(e.target.value) }))} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label>Início</Label>
                    <Input value={formDados.inicio} onChange={e => setFormDados(f => ({ ...f, inicio: e.target.value }))} />
                  </div>
                  <div className="space-y-2">
                    <Label>Fim</Label>
                    <Input value={formDados.fim} onChange={e => setFormDados(f => ({ ...f, fim: e.target.value }))} />
                  </div>
                </div>
                <Button className="w-full">Salvar Alterações</Button>
              </div>
            </TabsContent>

            <TabsContent value="usuarios" className="mt-0">
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
            </TabsContent>

            <TabsContent value="produtos" className="mt-0">
              <div className="space-y-3">
                <Button variant="outline" className="w-full border-dashed"
                  onClick={() => { setShowAddProduto(s => !s); setAddForm(emptyForm()); }}>
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Produto Campanha
                </Button>

                {showAddProduto && (
                  <div className="p-4 rounded-xl border border-primary/30 bg-primary/5 space-y-3">
                    <p className="text-xs font-semibold text-primary uppercase tracking-wide">Novo Produto</p>
                    <ProdutoFormFields data={addForm} onChange={setAddForm} />
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1" onClick={() => setShowAddProduto(false)}>
                        Cancelar
                      </Button>
                      <Button size="sm" className="flex-1" onClick={handleAddProduto} disabled={!addForm.nome}>
                        Adicionar
                      </Button>
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
                          <Button variant="outline" size="sm" className="flex-1" onClick={() => setEditingId(null)}>
                            Cancelar
                          </Button>
                          <Button size="sm" className="flex-1" onClick={() => handleSaveEdit(p.id)} disabled={!editForm.nome}>
                            Salvar
                          </Button>
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
            </TabsContent>

            </div>
          </ScrollArea>
        </Tabs>
      </SheetContent>
    </Sheet>
  );
}

const wizardSteps = ['Dados da Campanha', 'Produtos Campanha', 'Revisão'];

function CampanhaWizard({ open, onClose }: { open: boolean; onClose: () => void }) {
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
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Nova Campanha de Cashback</DialogTitle>
          <p className="text-sm text-muted-foreground">Passo {step + 1} de {wizardSteps.length}</p>
        </DialogHeader>

        <div className="px-1">
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

        <ScrollArea className="flex-1 min-h-0 max-h-[400px]">
          <div className="px-1 pb-4">

          {step === 0 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Nome da Campanha</Label>
                <Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="Ex: Cashback Anuidade 2026" />
              </div>
              <div className="space-y-2">
                <Label>Tipo</Label>
                <Select value={form.tipo} onValueChange={v => setForm(f => ({ ...f, tipo: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {['Anuidade','Evento','Educação','Indicação','Fidelidade'].map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Início</Label>
                  <Input type="date" value={form.inicio} onChange={e => setForm(f => ({ ...f, inicio: e.target.value }))} />
                </div>
                <div className="space-y-2">
                  <Label>Fim</Label>
                  <Input type="date" value={form.fim} onChange={e => setForm(f => ({ ...f, fim: e.target.value }))} />
                </div>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">Configure os produtos que geram cashback ou pontos nesta campanha.</p>

              <Button variant="outline" className="w-full border-dashed"
                onClick={() => { setShowAddForm(s => !s); setAddForm(emptyForm()); setEditingId(null); }}>
                <Plus className="w-4 h-4 mr-2" />
                Adicionar Produto Campanha
              </Button>

              {showAddForm && (
                <div className="p-4 rounded-xl border border-primary/30 bg-primary/5 space-y-3">
                  <p className="text-xs font-semibold text-primary uppercase tracking-wide">Novo Produto</p>
                  <ProdutoFormFields data={addForm} onChange={setAddForm} />
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1" onClick={() => setShowAddForm(false)}>
                      Cancelar
                    </Button>
                    <Button size="sm" className="flex-1" onClick={handleAddProduto} disabled={!addForm.nome}>
                      Adicionar
                    </Button>
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
                        <Button variant="outline" size="sm" className="flex-1" onClick={() => setEditingId(null)}>Cancelar</Button>
                        <Button size="sm" className="flex-1"
                          onClick={() => { setProdutos(prev => prev.map(x => x.id === p.id ? { id: p.id, ...formToProduto(editForm) } : x)); setEditingId(null); }}
                          disabled={!editForm.nome}>Salvar</Button>
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
                        <Badge variant={p.tipoPontuacao === 'cash' ? 'default' : 'secondary'} className="h-2 w-2 p-0" />
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
        </ScrollArea>

        <div className="flex justify-between pt-4 border-t">
          <Button variant="outline" onClick={() => step === 0 ? onClose() : setStep(s => s - 1)}>
            <ChevronLeft className="w-4 h-4 mr-2" />
            {step === 0 ? 'Cancelar' : 'Anterior'}
          </Button>
          <Button onClick={() => step < wizardSteps.length - 1 ? setStep(s => s + 1) : onClose()}>
            {step < wizardSteps.length - 1 ? 'Próximo' : 'Criar Campanha'}
            {step < wizardSteps.length - 1 && <ChevronRight className="w-4 h-4 ml-2" />}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

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
            <Button onClick={() => setShowWizard(true)}>
              <Plus className="w-4 h-4 mr-2" /> Nova Campanha
            </Button>
          </div>

          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar campanhas..."
              className="pl-9" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map(c => {
              const numProdutos = (mockProdutos[c.id] || []).length;
              return (
                <Card key={c.id} className="overflow-hidden hover:shadow-md transition-all group">
                  <CardContent className="pt-6">
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
                      <Badge variant={c.status === 'ativa' ? 'default' : 'secondary'}>
                        {c.status === 'ativa' ? 'Ativa' : 'Pausada'}
                      </Badge>
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
                      <Button variant="outline" size="sm" className="flex-1" onClick={() => openPanel(c, 'dados')}>
                        <Edit2 className="w-3 h-3 mr-1.5" /> Editar
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1" onClick={() => openPanel(c, 'usuarios')}>
                        <Users className="w-3 h-3 mr-1.5" /> Usuários
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1" onClick={() => openPanel(c, 'produtos')}>
                        <Gift className="w-3 h-3 mr-1.5" /> Produtos
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {panel && (
        <CampanhaPanel
          campanha={panel.campanha}
          initialTab={panel.tab}
          open={!!panel}
          onClose={() => setPanel(null)}
        />
      )}
      <CampanhaWizard open={showWizard} onClose={() => setShowWizard(false)} />
    </div>
  );
}
