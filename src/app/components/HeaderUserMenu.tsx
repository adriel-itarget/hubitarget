import { useState, useRef, useEffect } from 'react';
import { ChevronDown, LogOut, Moon, Sun, User, Shield, X, Save, CheckCircle, Upload, Check, Clock, Palette } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppTheme, THEMES, type ColorTheme } from './AppThemeContext';

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
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-xl w-full max-w-md shadow-xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <h3 className="font-semibold">Editar Perfil</h3>
          <button onClick={onClose} className="p-1.5 hover:bg-muted rounded-lg transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-6 space-y-5">
          <div className="flex items-center gap-4">
            <img src={PROFILE_URL} alt="Foto" className="w-16 h-16 rounded-full object-cover ring-2 ring-border" />
            <div>
              <button className="flex items-center gap-2 px-3 py-1.5 border border-border rounded-lg text-sm hover:bg-accent transition-colors">
                <Upload className="w-3.5 h-3.5" />
                Alterar foto
              </button>
              <p className="text-xs text-muted-foreground mt-1.5">JPG ou PNG · máx. 2 MB</p>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Nome completo</label>
            <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">E-mail</label>
            <input value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} type="email" className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
          </div>
          <div className="pt-1 border-t border-border">
            <p className="text-xs text-muted-foreground mb-3">Deixe em branco para manter a senha atual</p>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-1.5">Nova senha</label>
                <input type="password" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} placeholder="••••••••" className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Confirmar nova senha</label>
                <input type="password" value={form.confirmPassword} onChange={e => setForm(f => ({ ...f, confirmPassword: e.target.value }))} placeholder="••••••••" className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-border">
          <button onClick={onClose} className="px-4 py-2 text-sm border border-border rounded-lg hover:bg-accent transition-colors">Cancelar</button>
          <button onClick={handleSave} className={`flex items-center gap-2 px-5 py-2 text-sm rounded-lg transition-all ${saved ? 'bg-green-500/10 text-green-600 border border-green-500/30' : 'bg-primary text-primary-foreground hover:bg-primary/90'}`}>
            {saved ? <><CheckCircle className="w-4 h-4" />Salvo</> : <><Save className="w-4 h-4" />Salvar</>}
          </button>
        </div>
      </div>
    </div>
  );
}

function GroupsModal({ onClose }: { onClose: () => void }) {
  const [groups] = useState(allGroups);
  const [requested, setRequested] = useState<Set<string>>(new Set());

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-xl w-full max-w-lg shadow-xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div>
            <h3 className="font-semibold">Grupos e Permissões</h3>
            <p className="text-xs text-muted-foreground mt-0.5">Gerencie seus acessos e solicite novos grupos</p>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-muted rounded-lg transition-colors"><X className="w-4 h-4" /></button>
        </div>
        <div className="p-6 space-y-3 max-h-[60vh] overflow-y-auto">
          {groups.map(group => (
            <div key={group.id} className={`flex items-center gap-4 p-4 rounded-xl border transition-colors ${group.hasAccess ? 'border-primary/20 bg-primary/5' : 'border-border bg-muted/20'}`}>
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${group.hasAccess ? 'bg-primary/10' : 'bg-muted'}`}>
                <Shield className={`w-4 h-4 ${group.hasAccess ? 'text-primary' : 'text-muted-foreground'}`} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium">{group.name}</p>
                  {group.hasAccess && <span className="flex items-center gap-1 text-xs text-green-600 bg-green-500/10 px-2 py-0.5 rounded-full"><Check className="w-3 h-3" />Ativo</span>}
                  {requested.has(group.id) && <span className="flex items-center gap-1 text-xs text-orange-600 bg-orange-500/10 px-2 py-0.5 rounded-full"><Clock className="w-3 h-3" />Solicitado</span>}
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{group.description}</p>
              </div>
              {!group.hasAccess && !requested.has(group.id) && group.canRequest && (
                <button onClick={() => setRequested(prev => new Set([...prev, group.id]))} className="flex-shrink-0 px-3 py-1.5 text-xs border border-border rounded-lg hover:bg-accent transition-colors whitespace-nowrap">Solicitar acesso</button>
              )}
            </div>
          ))}
        </div>
        <div className="px-6 py-4 border-t border-border bg-muted/10">
          <p className="text-xs text-muted-foreground">Solicitações de acesso são enviadas ao administrador e processadas em até 24 horas úteis.</p>
        </div>
      </div>
    </div>
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
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-accent transition-colors"
        >
          <img src={PROFILE_URL} alt="Foto do usuário" className="w-8 h-8 rounded-full object-cover ring-2 ring-border" />
          <div className="hidden sm:block text-left">
            <p className="text-sm font-medium leading-tight">Dr. Carlos Eduardo Silva</p>
            <p className="text-[11px] text-muted-foreground leading-tight">Administrador</p>
          </div>
          <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
        </button>

        {isMenuOpen && (
          <div className="absolute right-0 top-full mt-2 w-64 bg-card border border-border rounded-xl shadow-xl overflow-hidden z-50">
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-muted/20">
              <img src={PROFILE_URL} alt="Foto" className="w-9 h-9 rounded-full object-cover flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-sm font-medium truncate">Dr. Carlos Eduardo Silva</p>
                <p className="text-xs text-muted-foreground truncate">Administrador</p>
              </div>
            </div>

            <div className="p-1.5">
              <button onClick={toggleDark} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent transition-colors text-left text-sm">
                {isDark ? <Sun className="w-4 h-4 text-muted-foreground" /> : <Moon className="w-4 h-4 text-muted-foreground" />}
                <span>{isDark ? 'Modo claro' : 'Modo escuro'}</span>
              </button>

              <button onClick={() => { setModal('theme'); setIsMenuOpen(false); }} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent transition-colors text-left text-sm">
                <Palette className="w-4 h-4 text-muted-foreground" />
                <span className="flex-1">Tema de cor</span>
                <span className="w-4 h-4 rounded-full flex-shrink-0 ring-1 ring-border" style={{ background: THEMES[colorTheme].swatch }} />
              </button>

              <button onClick={() => { setIsMenuOpen(false); setModal('profile'); }} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent transition-colors text-left text-sm">
                <User className="w-4 h-4 text-muted-foreground" />
                <span>Editar perfil</span>
              </button>

              <button onClick={() => { setIsMenuOpen(false); setModal('groups'); }} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-accent transition-colors text-left text-sm">
                <Shield className="w-4 h-4 text-muted-foreground" />
                <span>Grupos e permissões</span>
              </button>
            </div>

            <div className="border-t border-border p-1.5">
              <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-destructive/10 transition-colors text-left text-sm text-destructive">
                <LogOut className="w-4 h-4" />
                <span>Sair</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {modal === 'profile' && <ProfileEditModal onClose={() => setModal(null)} />}
      {modal === 'groups' && <GroupsModal onClose={() => setModal(null)} />}
      {modal === 'theme' && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-xl w-full max-w-sm shadow-xl">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border">
              <div>
                <h3 className="font-semibold">Tema de cor</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Escolha o esquema de cores da plataforma</p>
              </div>
              <button onClick={() => setModal(null)} className="p-1.5 hover:bg-muted rounded-lg transition-colors"><X className="w-4 h-4" /></button>
            </div>
            <div className="p-6 space-y-3">
              {(Object.entries(THEMES) as [ColorTheme, typeof THEMES[ColorTheme]][]).map(([key, theme]) => (
                <button key={key} onClick={() => setColorTheme(key)} className={`w-full flex items-center gap-4 p-3.5 rounded-xl border transition-all ${colorTheme === key ? 'border-primary bg-primary/8' : 'border-border hover:bg-accent'}`}>
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
                </button>
              ))}
            </div>
            <div className="px-6 pb-5">
              <button onClick={() => setModal(null)} className="w-full py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:opacity-90 transition-opacity">Aplicar tema</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
