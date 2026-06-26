import { useState, useRef, useEffect } from 'react';
import { ChevronDown, LogOut, Moon, Sun, User, Shield, X, Save, CheckCircle, Upload, Check, Clock, Palette } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppTheme, THEMES, type ColorTheme } from './AppThemeContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';

const PROFILE_URL = 'https://images.unsplash.com/photo-1645066928295-2506defde470?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxwcm9mZXNzaW9uYWwlMjBtYWxlJTIwZG9jdG9yJTIwcG9ydHJhaXQlMjBoZWFkc2hvdHxlbnwxfHx8fDE3ODA2NjQ2Mzd8MA&ixlib=rb-4.1.0&q=80&w=400';

const allGroups = [
  { id: 'admin', name: 'Administrador', description: 'Acesso total ao sistema', hasAccess: true, canRequest: false },
  { id: 'diretoria', name: 'Diretoria', description: 'Gestão de diretoria e representação', hasAccess: true, canRequest: false },
  { id: 'financeiro', name: 'Financeiro', description: 'Acesso a departamentos e dados financeiros', hasAccess: false, canRequest: true },
  { id: 'secretaria', name: 'Secretaria', description: 'Gestão de associados e eventos', hasAccess: false, canRequest: true },
  { id: 'comunicacao', name: 'Comunicação', description: 'Publicação de conteúdo e comunicados', hasAccess: false, canRequest: true },
  { id: 'readonly', name: 'Somente Leitura', description: 'Visualização sem edição', hasAccess: false, canRequest: true },
];

function ProfileEditModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ name: 'Dr. Carlos Eduardo Silva', email: 'carlos.silva@sbcardio.org.br', password: '', confirmPassword: '' });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    if (form.password && form.password !== form.confirmPassword) {
      alert('As senhas não coincidem.');
      return;
    }
    setSaved(true);
    setTimeout(() => { setSaved(false); onClose(); }, 1500);
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Editar Perfil</DialogTitle>
        </DialogHeader>
        <div className="space-y-5">
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16 ring-2 ring-border">
              <AvatarImage src={PROFILE_URL} alt="Foto" className="object-cover" />
              <AvatarFallback>CE</AvatarFallback>
            </Avatar>
            <div>
              <Button variant="outline" size="sm" className="gap-2">
                <Upload className="w-3.5 h-3.5" />
                Alterar foto
              </Button>
              <p className="text-xs text-muted-foreground mt-1.5">JPG ou PNG · máx. 2 MB</p>
            </div>
          </div>
          <div>
            <Label className="mb-1.5">Nome completo</Label>
            <Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
          </div>
          <div>
            <Label className="mb-1.5">E-mail</Label>
            <Input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
          </div>
          <Separator />
          <div>
            <p className="text-xs text-muted-foreground mb-3">Deixe em branco para manter a senha atual</p>
            <div className="space-y-3">
              <div>
                <Label className="mb-1.5">Nova senha</Label>
                <Input type="password" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} placeholder="••••••••" />
              </div>
              <div>
                <Label className="mb-1.5">Confirmar nova senha</Label>
                <Input type="password" value={form.confirmPassword} onChange={e => setForm(f => ({ ...f, confirmPassword: e.target.value }))} placeholder="••••••••" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button onClick={handleSave} className={saved ? 'bg-green-500/10 text-green-600 border border-green-500/30 hover:bg-green-500/20' : ''}>
            {saved ? <><CheckCircle className="w-4 h-4" />Salvo</> : <><Save className="w-4 h-4" />Salvar</>}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function GroupsModal({ onClose }: { onClose: () => void }) {
  const [groups] = useState(allGroups);
  const [requested, setRequested] = useState<Set<string>>(new Set());

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Grupos e Permissões</DialogTitle>
          <DialogDescription>Gerencie seus acessos e solicite novos grupos</DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[60vh]">
          <div className="space-y-3 pr-4">
            {groups.map(group => (
              <div key={group.id} className={`flex items-center gap-4 p-4 rounded-xl border transition-colors ${group.hasAccess ? 'border-primary/20 bg-primary/5' : 'border-border bg-muted/20'}`}>
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${group.hasAccess ? 'bg-primary/10' : 'bg-muted'}`}>
                  <Shield className={`w-4 h-4 ${group.hasAccess ? 'text-primary' : 'text-muted-foreground'}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">{group.name}</p>
                    {group.hasAccess && (
                      <Badge variant="default" className="bg-green-500/10 text-green-600 border-green-500/30 hover:bg-green-500/10 gap-1">
                        <Check className="w-3 h-3" />Ativo
                      </Badge>
                    )}
                    {requested.has(group.id) && (
                      <Badge variant="default" className="bg-orange-500/10 text-orange-600 border-orange-500/30 hover:bg-orange-500/10 gap-1">
                        <Clock className="w-3 h-3" />Solicitado
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{group.description}</p>
                </div>
                {!group.hasAccess && !requested.has(group.id) && group.canRequest && (
                  <Button variant="outline" size="sm" onClick={() => setRequested(prev => new Set([...prev, group.id]))}>
                    Solicitar acesso
                  </Button>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="pt-3 border-t border-border">
          <p className="text-xs text-muted-foreground">Solicitações de acesso são enviadas ao administrador e processadas em até 24 horas úteis.</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface HeaderUserMenuProps {
  onLogout: () => void;
}

export function HeaderUserMenu({ onLogout }: HeaderUserMenuProps) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [modal, setModal] = useState<'profile' | 'groups' | 'theme' | null>(null);
  const { isDark, toggleDark, colorTheme, setColorTheme } = useAppTheme();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  const handleLogout = () => {
    setIsMenuOpen(false);
    if (confirm('Deseja realmente sair?')) {
      onLogout();
      navigate('/login');
    }
  };

  return (
    <>
      <div ref={menuRef} className="relative">
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 px-2 py-1.5 h-auto"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Avatar className="w-8 h-8 ring-2 ring-border">
            <AvatarImage src={PROFILE_URL} alt="Foto do usuário" className="object-cover" />
            <AvatarFallback>CE</AvatarFallback>
          </Avatar>
          <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
        </Button>

        {isMenuOpen && (
          <div className="absolute right-0 top-full mt-2 w-64 bg-card border border-border rounded-xl shadow-xl overflow-hidden z-50">
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-muted/20">
              <Avatar className="w-9 h-9 flex-shrink-0">
                <AvatarImage src={PROFILE_URL} alt="Foto" className="object-cover" />
                <AvatarFallback>CE</AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <p className="text-sm font-medium truncate">Dr. Carlos Eduardo Silva</p>
                <p className="text-xs text-muted-foreground truncate">Administrador</p>
              </div>
            </div>

            <div className="p-1.5">
              <Button variant="ghost" className="w-full justify-start gap-3 px-3 py-2 h-auto" onClick={toggleDark}>
                {isDark ? <Sun className="w-4 h-4 text-muted-foreground" /> : <Moon className="w-4 h-4 text-muted-foreground" />}
                <span>{isDark ? 'Modo claro' : 'Modo escuro'}</span>
              </Button>

              <Button variant="ghost" className="w-full justify-start gap-3 px-3 py-2 h-auto"
                onClick={() => { setModal('theme'); setIsMenuOpen(false); }}>
                <Palette className="w-4 h-4 text-muted-foreground" />
                <span className="flex-1 text-left">Tema de cor</span>
                <span className="w-4 h-4 rounded-full flex-shrink-0 ring-1 ring-border" style={{ background: THEMES[colorTheme].swatch }} />
              </Button>

              <Button variant="ghost" className="w-full justify-start gap-3 px-3 py-2 h-auto"
                onClick={() => { setIsMenuOpen(false); setModal('profile'); }}>
                <User className="w-4 h-4 text-muted-foreground" />
                <span>Editar perfil</span>
              </Button>

              <Button variant="ghost" className="w-full justify-start gap-3 px-3 py-2 h-auto"
                onClick={() => { setIsMenuOpen(false); setModal('groups'); }}>
                <Shield className="w-4 h-4 text-muted-foreground" />
                <span>Grupos e permissões</span>
              </Button>
            </div>

            <div className="border-t border-border p-1.5">
              <Button variant="ghost" className="w-full justify-start gap-3 px-3 py-2 h-auto text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={handleLogout}>
                <LogOut className="w-4 h-4" />
                <span>Sair</span>
              </Button>
            </div>
          </div>
        )}
      </div>

      {modal === 'profile' && <ProfileEditModal onClose={() => setModal(null)} />}
      {modal === 'groups' && <GroupsModal onClose={() => setModal(null)} />}
      {modal === 'theme' && (
        <Dialog open onOpenChange={() => setModal(null)}>
          <DialogContent className="max-w-sm">
            <DialogHeader>
              <DialogTitle>Tema de cor</DialogTitle>
              <DialogDescription>Escolha o esquema de cores da plataforma</DialogDescription>
            </DialogHeader>
            <div className="space-y-3">
              {(Object.entries(THEMES) as [ColorTheme, typeof THEMES[ColorTheme]][]).map(([key, theme]) => (
                <Button
                  key={key}
                  variant="outline"
                  className={`w-full justify-start gap-4 p-3.5 h-auto ${colorTheme === key ? 'border-primary bg-primary/8' : ''}`}
                  onClick={() => setColorTheme(key)}
                >
                  <div className="flex gap-1.5">
                    <div className="w-7 h-7 rounded-full shadow-sm" style={{ background: theme.light.primary }} />
                    <div className="w-7 h-7 rounded-full shadow-sm" style={{ background: theme.dark.primary }} />
                  </div>
                  <div className="text-left flex-1">
                    <p className="text-sm font-medium">{theme.name}</p>
                    <p className="text-xs text-muted-foreground">Claro · Escuro</p>
                  </div>
                  {colorTheme === key && (
                    <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center flex-shrink-0"><Check className="w-3 h-3 text-primary-foreground" /></div>
                  )}
                </Button>
              ))}
            </div>
            <Button className="w-full" onClick={() => setModal(null)}>Aplicar tema</Button>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
