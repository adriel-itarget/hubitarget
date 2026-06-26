import { useState } from 'react';
import { Plus, Pencil, Trash2, X, Save, Search, Users, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from './ui/alert-dialog';

interface DiretorMembro {
  id: string;
  nome: string;
  crm: string;
  cargo: string;
  inicio: string;
  fim: string;
  email: string;
  telefone: string;
  status: 'ativo' | 'inativo';
  foto?: string;
}

const cargos = [
  'Presidente', 'Vice-Presidente', 'Secretário Geral', 'Secretário Adjunto',
  'Tesoureiro', 'Tesoureiro Adjunto', 'Diretor Científico', 'Diretor de Defesa Profissional',
  'Diretor de Comunicação', 'Diretor de Eventos', 'Diretor de Benefícios',
  'Conselheiro Fiscal', 'Conselheiro Suplente',
];

const mockDiretores: DiretorMembro[] = [
  { id: '1', nome: 'Dr. Carlos Alberto Ferreira', crm: 'CRM-SP 123456', cargo: 'Presidente', inicio: '2023-01-01', fim: '2025-12-31', email: 'carlos.ferreira@ambsp.org.br', telefone: '(11) 99123-4567', status: 'ativo' },
  { id: '2', nome: 'Dra. Márcia Regina Santos', crm: 'CRM-SP 234567', cargo: 'Vice-Presidente', inicio: '2023-01-01', fim: '2025-12-31', email: 'marcia.santos@ambsp.org.br', telefone: '(11) 99234-5678', status: 'ativo' },
  { id: '3', nome: 'Dr. Roberto Lima Neto', crm: 'CRM-SP 345678', cargo: 'Secretário Geral', inicio: '2023-01-01', fim: '2025-12-31', email: 'roberto.lima@ambsp.org.br', telefone: '(11) 99345-6789', status: 'ativo' },
  { id: '4', nome: 'Dra. Ana Paula Oliveira', crm: 'CRM-SP 456789', cargo: 'Tesoureiro', inicio: '2023-01-01', fim: '2025-12-31', email: 'ana.oliveira@ambsp.org.br', telefone: '(11) 99456-7890', status: 'ativo' },
  { id: '5', nome: 'Dr. Fernando Mendes Costa', crm: 'CRM-SP 567890', cargo: 'Diretor Científico', inicio: '2023-01-01', fim: '2025-12-31', email: 'fernando.costa@ambsp.org.br', telefone: '(11) 99567-8901', status: 'ativo' },
  { id: '6', nome: 'Dra. Patrícia Rocha Alves', crm: 'CRM-SP 678901', cargo: 'Diretora de Comunicação', inicio: '2021-01-01', fim: '2022-12-31', email: 'patricia.alves@email.com', telefone: '(11) 99678-9012', status: 'inativo' },
];

const emptyMembro: Omit<DiretorMembro, 'id'> = {
  nome: '', crm: '', cargo: cargos[0], inicio: '', fim: '',
  email: '', telefone: '', status: 'ativo',
};

function getInitials(nome: string) {
  return nome.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase();
}

function StatusBadge({ status }: { status: 'ativo' | 'inativo' }) {
  return (
    <Badge
      variant="default"
      className={`gap-1 ${
        status === 'ativo'
          ? 'bg-green-500/10 text-green-600 border-green-500/30 hover:bg-green-500/10'
          : 'bg-muted text-muted-foreground hover:bg-muted'
      }`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${status === 'ativo' ? 'bg-green-500' : 'bg-muted-foreground'}`} />
      {status === 'ativo' ? 'Ativo' : 'Inativo'}
    </Badge>
  );
}

interface ModalProps {
  membro: Omit<DiretorMembro, 'id'>;
  isEdit: boolean;
  onSave: (m: Omit<DiretorMembro, 'id'>) => void;
  onClose: () => void;
}

function MembroModal({ membro, isEdit, onSave, onClose }: ModalProps) {
  const [form, setForm] = useState(membro);
  const set = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [field]: e.target.value }));

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Editar membro' : 'Adicionar membro'}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label className="mb-1.5">Nome Completo</Label>
            <Input value={form.nome} onChange={set('nome')} placeholder="Dr. Nome Sobrenome" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="mb-1.5">CRM</Label>
              <Input value={form.crm} onChange={set('crm')} placeholder="CRM-SP 000000" />
            </div>
            <div>
              <Label className="mb-1.5">Cargo</Label>
              <select value={form.cargo} onChange={set('cargo')}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none">
                {cargos.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="mb-1.5">Início do Mandato</Label>
              <Input type="date" value={form.inicio} onChange={set('inicio')} />
            </div>
            <div>
              <Label className="mb-1.5">Fim do Mandato</Label>
              <Input type="date" value={form.fim} onChange={set('fim')} />
            </div>
          </div>
          <div>
            <Label className="mb-1.5">E-mail</Label>
            <Input type="email" value={form.email} onChange={set('email')} placeholder="email@entidade.com" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="mb-1.5">Telefone</Label>
              <Input value={form.telefone} onChange={set('telefone')} placeholder="(00) 00000-0000" />
            </div>
            <div>
              <Label className="mb-1.5">Status</Label>
              <select value={form.status} onChange={set('status')}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none">
                <option value="ativo">Ativo</option>
                <option value="inativo">Inativo</option>
              </select>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button onClick={() => onSave(form)} disabled={!form.nome.trim()} className="gap-2">
            <Save className="w-4 h-4" />
            Salvar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function EntityDiretoria() {
  const [membros, setMembros] = useState<DiretorMembro[]>(mockDiretores);
  const [search, setSearch] = useState('');
  const [filtroStatus, setFiltroStatus] = useState<'todos' | 'ativo' | 'inativo'>('todos');
  const [modal, setModal] = useState<{ open: boolean; isEdit: boolean; membro: Omit<DiretorMembro, 'id'>; editId?: string }>({
    open: false, isEdit: false, membro: { ...emptyMembro },
  });
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const filtered = membros.filter(m => {
    const matchSearch = m.nome.toLowerCase().includes(search.toLowerCase()) ||
      m.cargo.toLowerCase().includes(search.toLowerCase()) ||
      m.crm.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filtroStatus === 'todos' || m.status === filtroStatus;
    return matchSearch && matchStatus;
  });

  const ativos = membros.filter(m => m.status === 'ativo').length;

  const openAdd = () => setModal({ open: true, isEdit: false, membro: { ...emptyMembro } });
  const openEdit = (m: DiretorMembro) => setModal({ open: true, isEdit: true, membro: { ...m }, editId: m.id });

  const handleSave = (data: Omit<DiretorMembro, 'id'>) => {
    if (modal.isEdit && modal.editId) {
      setMembros(prev => prev.map(m => m.id === modal.editId ? { ...data, id: modal.editId } : m));
    } else {
      setMembros(prev => [...prev, { ...data, id: Date.now().toString() }]);
    }
    setModal(m => ({ ...m, open: false }));
  };

  const handleDelete = (id: string) => {
    setMembros(prev => prev.filter(m => m.id !== id));
    setConfirmDelete(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-8 py-8">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-2xl mb-1">Gestão de Diretoria</h1>
            <p className="text-sm text-muted-foreground">Membros da diretoria e seus mandatos</p>
          </div>
          <Button onClick={openAdd} className="gap-2">
            <Plus className="w-4 h-4" />
            Adicionar membro
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-card border border-border rounded-xl p-5">
            <p className="text-xs text-muted-foreground mb-1">Total de Membros</p>
            <p className="text-2xl font-semibold">{membros.length}</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-5">
            <p className="text-xs text-muted-foreground mb-1">Mandatos Ativos</p>
            <p className="text-2xl font-semibold text-green-600">{ativos}</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-5">
            <p className="text-xs text-muted-foreground mb-1">Mandatos Encerrados</p>
            <p className="text-2xl font-semibold text-muted-foreground">{membros.length - ativos}</p>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Buscar por nome, cargo ou CRM..."
                className="pl-9"
              />
            </div>
            <div className="flex items-center gap-1 border border-border rounded-lg overflow-hidden">
              {(['todos', 'ativo', 'inativo'] as const).map(f => (
                <Button
                  key={f}
                  variant={filtroStatus === f ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setFiltroStatus(f)}
                  className="capitalize"
                >
                  {f === 'todos' ? 'Todos' : f === 'ativo' ? 'Ativos' : 'Encerrados'}
                </Button>
              ))}
            </div>
          </div>

          <div className="divide-y divide-border">
            {filtered.length === 0 ? (
              <div className="py-16 text-center">
                <Users className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">Nenhum membro encontrado</p>
              </div>
            ) : (
              filtered.map(membro => (
                <div key={membro.id} className="flex items-center gap-4 px-5 py-4 hover:bg-muted/20 transition-colors">
                  <Avatar className="w-10 h-10 flex-shrink-0">
                    <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                      {getInitials(membro.nome)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium truncate">{membro.nome}</p>
                      <StatusBadge status={membro.status} />
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{membro.cargo} · {membro.crm}</p>
                  </div>
                  <div className="hidden md:block text-right">
                    <p className="text-xs text-muted-foreground">Mandato</p>
                    <p className="text-xs font-medium">
                      {membro.inicio ? new Date(membro.inicio + 'T00:00:00').getFullYear() : '—'}
                      {' – '}
                      {membro.fim ? new Date(membro.fim + 'T00:00:00').getFullYear() : '—'}
                    </p>
                  </div>
                  <div className="hidden lg:block text-right">
                    <p className="text-xs text-muted-foreground truncate max-w-[160px]">{membro.email}</p>
                    <p className="text-xs text-muted-foreground">{membro.telefone}</p>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEdit(membro)} title="Editar">
                      <Pencil className="w-4 h-4 text-muted-foreground" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-destructive/10" onClick={() => setConfirmDelete(membro.id)} title="Remover">
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>

          {filtered.length > 0 && (
            <div className="px-5 py-3 border-t border-border bg-muted/10">
              <p className="text-xs text-muted-foreground">{filtered.length} {filtered.length === 1 ? 'membro' : 'membros'} encontrado{filtered.length !== 1 ? 's' : ''}</p>
            </div>
          )}
        </div>
      </div>

      {modal.open && (
        <MembroModal
          membro={modal.membro}
          isEdit={modal.isEdit}
          onSave={handleSave}
          onClose={() => setModal(m => ({ ...m, open: false }))}
        />
      )}

      <AlertDialog open={!!confirmDelete} onOpenChange={() => setConfirmDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remover membro</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação removerá o membro da diretoria. O histórico será mantido nos registros.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleDelete(confirmDelete!)} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Remover
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
