import { useState } from 'react';
import { Search, Plus, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Badge } from '@/app/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/components/ui/table';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/app/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Textarea } from '@/app/components/ui/textarea';
import { Label } from '@/app/components/ui/label';

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
  open: boolean;
  onClose: () => void;
}

function LancamentoModal({ open, onClose }: LancamentoModalProps) {
  const [form, setForm] = useState({ desc: '', type: 'receita', value: '', date: '', center: 'Associação', category: '', obs: '' });

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Novo Lançamento</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            {(['receita', 'despesa'] as const).map(t => (
              <Button
                key={t}
                variant={form.type === t ? 'default' : 'outline'}
                onClick={() => setForm(f => ({ ...f, type: t }))}
                className="capitalize"
              >
                {t === 'receita' ? 'Receita' : 'Despesa'}
              </Button>
            ))}
          </div>

          <div className="space-y-2">
            <Label>Descrição</Label>
            <Input
              value={form.desc}
              onChange={e => setForm(f => ({ ...f, desc: e.target.value }))}
              placeholder="Descrição do lançamento"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Valor (R$)</Label>
              <Input
                type="number"
                value={form.value}
                onChange={e => setForm(f => ({ ...f, value: e.target.value }))}
                placeholder="0,00"
              />
            </div>
            <div className="space-y-2">
              <Label>Data</Label>
              <Input
                type="date"
                value={form.date}
                onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Centro de Custo</Label>
              <Select value={form.center} onValueChange={v => setForm(f => ({ ...f, center: v }))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {costCenters.filter(c => c !== 'Todos').map(c => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Categoria</Label>
              <Input
                value={form.category}
                onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                placeholder="Ex: Anuidade, Aluguel..."
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Observações</Label>
            <Textarea
              value={form.obs}
              onChange={e => setForm(f => ({ ...f, obs: e.target.value }))}
              rows={3}
              placeholder="Observações adicionais..."
              className="resize-none"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button onClick={onClose}>Salvar Lançamento</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
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
            <Button onClick={() => setShowModal(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Novo Lançamento
            </Button>
          </div>

          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    placeholder="Buscar lançamentos..."
                    className="pl-9"
                  />
                </div>
                <Select value={centerFilter} onValueChange={setCenterFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Centro de Custo" />
                  </SelectTrigger>
                  <SelectContent>
                    {costCenters.map(c => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={tipoFilter} onValueChange={setTipoFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    {tipos.map(t => (
                      <SelectItem key={t} value={t}>{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Centro</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map(l => (
                    <TableRow key={l.id}>
                      <TableCell>
                        <p className="text-sm font-medium">{l.desc}</p>
                        <p className="text-xs text-muted-foreground">{l.category}</p>
                      </TableCell>
                      <TableCell>
                        <div className={`flex items-center gap-1.5 text-sm ${l.type === 'receita' ? 'text-green-600' : 'text-red-500'}`}>
                          {l.type === 'receita' ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                          {l.type === 'receita' ? 'Receita' : 'Despesa'}
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-muted-foreground">{l.center}</span>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm">{l.date}</span>
                      </TableCell>
                      <TableCell className="text-right">
                        <span className={`text-sm font-semibold ${l.type === 'receita' ? 'text-green-600' : 'text-red-500'}`}>
                          {l.type === 'receita' ? '+' : '-'} R$ {l.value.toLocaleString('pt-BR')}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge variant={l.status === 'confirmado' ? 'default' : 'secondary'}>
                          {l.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filtered.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-12 text-muted-foreground">
                        Nenhum lançamento encontrado
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
      <LancamentoModal open={showModal} onOpenChange={setShowModal} onClose={() => setShowModal(false)} />
    </div>
  );
}
