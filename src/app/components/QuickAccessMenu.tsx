import { useState, useRef, useEffect } from 'react';
import { Grid3x3, Search, Users, Calendar, DollarSign, FileText, Settings, BarChart3, Bell, Mail, Phone, Building2, Tags, CreditCard, UserPlus, FileCheck, Briefcase, TrendingUp, X, Zap, ClipboardList, BookOpen, Gift, LayoutGrid, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface QuickAccessMenuProps {
  currentModule?: string;
}

const MODULES = [
  { id: 'associacao', label: 'Associação',  description: 'Gestão de associados e anuidades', Icon: Users,         color: '#60a5fa', route: '/modulo/associacao/dashboard' },
  { id: 'financeiro', label: 'Financeiro',  description: 'Lançamentos, cobranças e relatórios', Icon: DollarSign,    color: '#34d399', route: '/modulo/financeiro/dashboard' },
  { id: 'exames',     label: 'Exames',      description: 'Processos e certificações', Icon: ClipboardList, color: '#818cf8', route: '/modulo/exames/dashboard' },
  { id: 'cursos',     label: 'Cursos',      description: 'Educação e atividades', Icon: BookOpen,      color: '#a78bfa', route: '/modulo/cursos/dashboard' },
  { id: 'cashback',   label: 'Cashback',    description: 'Campanhas e benefícios', Icon: Gift,          color: '#fbbf24', route: '/modulo/cashback/dashboard' },
  { id: 'eventos',    label: 'Eventos',     description: 'Organização e inscrições', Icon: Calendar,      color: '#fb7185', route: '/modulo/eventos/dashboard' },
];

const ENTITY_ITEMS = [
  { id: 'entidade-config', label: 'Configurações Gerais', icon: <Settings className="w-4 h-4" />,    route: '/hub/entidade/geral' },
  { id: 'entidade-dados',  label: 'Dados da Entidade',    icon: <Building2 className="w-4 h-4" />,   route: '/hub/entidade/dados' },
  { id: 'identidade',      label: 'Identidade Visual',    icon: <Tags className="w-4 h-4" />,         route: '/hub/entidade/identidade' },
  { id: 'diretoria',       label: 'Diretoria',            icon: <Briefcase className="w-4 h-4" />,   route: '/hub/entidade/diretoria' },
  { id: 'textos-regras',   label: 'Textos e Regras',      icon: <FileCheck className="w-4 h-4" />,   route: '/hub/entidade/textos-regras' },
  { id: 'usuarios',        label: 'Usuários e Acesso',    icon: <UserPlus className="w-4 h-4" />,    route: '/hub/usuarios' },
  { id: 'pagamentos',      label: 'Meios de Pagamento',   icon: <CreditCard className="w-4 h-4" />,  route: '/hub/pagamentos' },
];

const CREATE_ITEMS = [
  { id: 'novo-associado',  label: 'Novo Associado',      icon: <UserPlus className="w-4 h-4" />,   route: '/modulo/associacao/pessoas' },
  { id: 'novo-evento',     label: 'Novo Evento',         icon: <Calendar className="w-4 h-4" />,   route: '/modulo/eventos/dashboard' },
  { id: 'novo-lancamento', label: 'Novo Lançamento',     icon: <DollarSign className="w-4 h-4" />, route: '/modulo/financeiro/dashboard' },
  { id: 'novo-curso',      label: 'Novo Curso',          icon: <BookOpen className="w-4 h-4" />,   route: '/modulo/cursos/dashboard' },
];

export function QuickAccessMenu({ currentModule }: QuickAccessMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen]);

  const handleNav = (route: string) => {
    navigate(route);
    setIsOpen(false);
    setSearchTerm('');
  };

  const search = searchTerm.toLowerCase();

  const filteredModules = MODULES.filter(m =>
    !search || m.label.toLowerCase().includes(search) || m.description.toLowerCase().includes(search)
  );
  const filteredEntity = ENTITY_ITEMS.filter(i =>
    !search || i.label.toLowerCase().includes(search)
  );
  const filteredCreate = CREATE_ITEMS.filter(i =>
    !search || i.label.toLowerCase().includes(search)
  );

  const hasResults = filteredModules.length > 0 || filteredEntity.length > 0 || filteredCreate.length > 0;

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-2 rounded-lg transition-colors ${isOpen ? 'bg-accent' : 'hover:bg-accent'}`}
        title="Menu de Acesso Rápido"
      >
        <Grid3x3 className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-[580px] bg-card border border-border rounded-2xl shadow-2xl overflow-hidden z-50">

          {/* Header */}
          <div className="px-4 pt-4 pb-3 border-b border-border">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold">Acesso Rápido</h3>
              <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-muted rounded-lg transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Pesquisar..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                autoFocus
                className="w-full pl-9 pr-4 py-2 bg-muted border border-border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
            </div>
          </div>

          <div className="overflow-y-auto max-h-[calc(80vh-110px)]">

            {!hasResults && (
              <div className="py-12 text-center text-muted-foreground text-sm">
                Nenhum resultado para "<span className="text-foreground">{searchTerm}</span>"
              </div>
            )}

            {/* Módulos */}
            {filteredModules.length > 0 && (
              <div className="p-4 border-b border-border">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Departamentos</h4>
                  <button
                    onClick={() => handleNav('/hub/modulos')}
                    className="text-xs text-primary hover:underline"
                  >
                    Ver todos
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {filteredModules.map(mod => (
                    <button
                      key={mod.id}
                      onClick={() => handleNav(mod.route)}
                      className="flex items-center gap-2.5 p-2.5 rounded-xl hover:bg-muted transition-colors text-left group"
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
                        style={{ backgroundColor: `${mod.color}18`, border: `1px solid ${mod.color}33` }}
                      >
                        <mod.Icon className="w-4 h-4" style={{ color: mod.color }} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium truncate">{mod.label}</p>
                        <p className="text-[11px] text-muted-foreground leading-tight line-clamp-1">{mod.description}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 divide-x divide-border">

              {/* Entidade */}
              {filteredEntity.length > 0 && (
                <div className="p-4">
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Entidade</h4>
                  <div className="space-y-0.5">
                    {filteredEntity.map(item => (
                      <button
                        key={item.id}
                        onClick={() => handleNav(item.route)}
                        className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-muted transition-colors text-left group"
                      >
                        <div className="w-7 h-7 rounded-md bg-muted flex items-center justify-center text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0">
                          {item.icon}
                        </div>
                        <span className="text-sm truncate">{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Criar */}
              {filteredCreate.length > 0 && (
                <div className="p-4">
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Criar</h4>
                  <div className="space-y-0.5">
                    {filteredCreate.map(item => (
                      <button
                        key={item.id}
                        onClick={() => handleNav(item.route)}
                        className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-muted transition-colors text-left group"
                      >
                        <div className="w-7 h-7 rounded-md bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                          {item.icon}
                        </div>
                        <span className="text-sm truncate">{item.label}</span>
                      </button>
                    ))}
                  </div>

                  {/* Hub links */}
                  <div className="mt-4 pt-4 border-t border-border space-y-0.5">
                    <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Hub</h4>
                    {[
                      { label: 'Dashboard', icon: <BarChart3 className="w-4 h-4" />, route: '/hub/dashboard' },
                      { label: 'Departamentos', icon: <Package className="w-4 h-4" />, route: '/hub/modulos' },
                    ].map(item => (
                      <button
                        key={item.route}
                        onClick={() => handleNav(item.route)}
                        className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-muted transition-colors text-left group"
                      >
                        <div className="w-7 h-7 rounded-md bg-muted flex items-center justify-center text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0">
                          {item.icon}
                        </div>
                        <span className="text-sm">{item.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
