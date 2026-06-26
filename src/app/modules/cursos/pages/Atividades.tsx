import { useState } from 'react';
import { Plus, Search, Star, Users, BookOpen, Edit2 } from 'lucide-react';
import { Card, CardContent } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Badge } from '@/app/components/ui/badge';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/app/components/ui/dialog';
import { Label } from '@/app/components/ui/label';
import { Textarea } from '@/app/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Progress } from '@/app/components/ui/progress';

const categorias = ['Todas', 'Cardiologia Intervencionista', 'Ecocardiografia', 'Eletrofisiologia', 'Insuficiência Cardíaca', 'Prevenção Cardiovascular'];

const mockAtividades = [
  { id: 1, name: 'Cardiologia Intervencionista - Módulo 1', categoria: 'Cardiologia Intervencionista', tipo: 'Curso Online', inscricoes: 142, vagas: 200, valor: 1200, avaliacao: 4.8, status: 'ativo', inicio: '01/07/2026', fim: '31/08/2026' },
  { id: 2, name: 'Ecocardiografia Avançada', categoria: 'Ecocardiografia', tipo: 'Curso Presencial', inscricoes: 98, vagas: 120, valor: 890, avaliacao: 4.9, status: 'ativo', inicio: '15/06/2026', fim: '15/07/2026' },
  { id: 3, name: 'Eletrofisiologia Clínica', categoria: 'Eletrofisiologia', tipo: 'Híbrido', inscricoes: 87, vagas: 100, valor: 1050, avaliacao: 4.7, status: 'ativo', inicio: '01/07/2026', fim: '30/09/2026' },
  { id: 4, name: 'Insuficiência Cardíaca - Update 2026', categoria: 'Insuficiência Cardíaca', tipo: 'Curso Online', inscricoes: 76, vagas: 150, valor: 650, avaliacao: 4.6, status: 'ativo', inicio: '10/06/2026', fim: '10/07/2026' },
  { id: 5, name: 'Prevenção Cardiovascular Primária', categoria: 'Prevenção Cardiovascular', tipo: 'Curso Online', inscricoes: 54, vagas: 200, valor: 490, avaliacao: 4.5, status: 'rascunho', inicio: '01/08/2026', fim: '30/09/2026' },
];

interface AtividadeModalProps { open: boolean; onClose: () => void; atividade?: typeof mockAtividades[0] | null; }

function AtividadeModal({ open, onClose, atividade }: AtividadeModalProps) {
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
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{atividade ? 'Editar Atividade' : 'Nova Atividade'}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Nome da Atividade</Label>
            <Input value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))}
              placeholder="Nome do curso ou atividade" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Categoria</Label>
              <Select value={form.categoria} onValueChange={v => setForm(f => ({...f, categoria: v}))}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  {categorias.filter(c => c !== 'Todas').map(c => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Tipo</Label>
              <Select value={form.tipo} onValueChange={v => setForm(f => ({...f, tipo: v}))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {['Curso Online', 'Curso Presencial', 'Híbrido', 'Workshop', 'Congresso'].map(t => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Vagas</Label>
              <Input type="number" value={form.vagas} onChange={e => setForm(f => ({...f, vagas: e.target.value}))}
                placeholder="0" />
            </div>
            <div className="space-y-2">
              <Label>Valor (R$)</Label>
              <Input type="number" value={form.valor} onChange={e => setForm(f => ({...f, valor: e.target.value}))}
                placeholder="0,00" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Data de Início</Label>
              <Input type="date" value={form.inicio} onChange={e => setForm(f => ({...f, inicio: e.target.value}))} />
            </div>
            <div className="space-y-2">
              <Label>Data de Fim</Label>
              <Input type="date" value={form.fim} onChange={e => setForm(f => ({...f, fim: e.target.value}))} />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Descrição</Label>
            <Textarea value={form.descricao} onChange={e => setForm(f => ({...f, descricao: e.target.value}))}
              rows={3} placeholder="Descrição da atividade..." className="resize-none" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button onClick={onClose}>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
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
            <Button onClick={() => setShowModal(true)}>
              <Plus className="w-4 h-4 mr-2" /> Nova Atividade
            </Button>
          </div>

          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Buscar atividades..."
                className="pl-9" />
            </div>
            <div className="flex flex-wrap gap-1.5">
              {categorias.map(c => (
                <Button key={c} variant={catFilter === c ? 'default' : 'outline'} size="sm"
                  onClick={() => setCatFilter(c)}>
                  {c}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(a => (
              <Card key={a.id} className="group overflow-hidden hover:shadow-md transition-all">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-purple-500" />
                    </div>
                    <Badge variant={a.status === 'ativo' ? 'default' : 'secondary'}>
                      {a.status === 'ativo' ? 'Ativo' : 'Rascunho'}
                    </Badge>
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
                  <Progress value={(a.inscricoes / a.vagas) * 100} className="h-1.5 mb-4" />
                  <div className="flex gap-2 pt-3 border-t border-border">
                    <Button variant="outline" size="sm" className="flex-1"
                      onClick={() => { setEditItem(a); setShowModal(true); }}>
                      <Edit2 className="w-3 h-3 mr-1.5" /> Editar
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Users className="w-3 h-3 mr-1.5" /> Inscrições
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <AtividadeModal open={showModal} onClose={() => { setShowModal(false); setEditItem(null); }} atividade={editItem} />
    </div>
  );
}
