import { useState, useEffect } from 'react';
import {
  Settings, Lock, Monitor, FileText, ClipboardList,
  ChevronDown, ChevronLeft, ChevronRight, ArrowLeft,
  LayoutGrid, Upload, MessageSquare, Languages,
  BookOpen, HelpCircle, CreditCard, UserCheck,
} from 'lucide-react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

interface NavItem  { label: string; to: string; icon: React.ComponentType<{ className?: string }> }
interface NavSection {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  items: NavItem[];
}

const navSections: NavSection[] = [
  {
    id: 'acesso',
    label: 'Acesso',
    icon: Lock,
    color: '#60a5fa',
    items: [
      { label: 'Usuários e Níveis de Acesso', to: '/modulo/configuracoes/usuarios-acesso', icon: UserCheck },
    ],
  },
  {
    id: 'sistema',
    label: 'Sistema',
    icon: Monitor,
    color: '#34d399',
    items: [
      { label: 'Menus',          to: '/modulo/configuracoes/cfg-menus',          icon: LayoutGrid },
      { label: 'Configurações',  to: '/modulo/configuracoes/cfg-config',         icon: Settings },
      { label: 'Logos',          to: '/modulo/configuracoes/cfg-logos',          icon: Upload },
      { label: 'Notificações',   to: '/modulo/configuracoes/cfg-notificacoes',   icon: MessageSquare },
      { label: 'Idioma',         to: '/modulo/configuracoes/cfg-idioma',         icon: Languages },
    ],
  },
  {
    id: 'pagamentos',
    label: 'Pagamentos',
    icon: CreditCard,
    color: '#f59e0b',
    items: [
      { label: 'Meios de Pagamento', to: '/modulo/configuracoes/meios-pagamento', icon: CreditCard },
    ],
  },
  {
    id: 'documentos',
    label: 'Documentos',
    icon: FileText,
    color: '#818cf8',
    items: [
      { label: 'Modelos de Documentos',        to: '/modulo/configuracoes/cfg-modelos',        icon: FileText },
      { label: 'Configurações Especialidades', to: '/modulo/configuracoes/cfg-especialidades', icon: BookOpen },
    ],
  },
  {
    id: 'forms',
    label: 'Forms',
    icon: ClipboardList,
    color: '#a78bfa',
    items: [
      { label: 'Formulários', to: '/modulo/configuracoes/cfg-formularios', icon: ClipboardList },
      { label: 'Perguntas',   to: '/modulo/configuracoes/cfg-perguntas',   icon: HelpCircle },
    ],
  },
];

function sectionForPath(path: string): string | null {
  for (const s of navSections) {
    if (s.items.some(i => i.to === path)) return s.id;
  }
  return null;
}

interface ConfiguracoesSidebarProps { onLogout: () => void }

export function ConfiguracoesSidebar({ onLogout }: ConfiguracoesSidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isHovered,   setIsHovered]   = useState(false);
  const [expanded, setExpanded] = useState<Set<string>>(() => {
    const initial = sectionForPath(location.pathname);
    return initial ? new Set([initial]) : new Set();
  });

  useEffect(() => {
    const sec = sectionForPath(location.pathname);
    if (sec) setExpanded(prev => { const n = new Set(prev); n.add(sec); return n; });
  }, [location.pathname]);

  const toggleSection = (id: string) => {
    if (isCollapsed) return;
    setExpanded(prev => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  };

  const labelClass = `text-sm font-medium whitespace-nowrap overflow-hidden transition-[opacity,max-width] duration-150 ease-in-out ${
    isCollapsed ? 'opacity-0 max-w-0' : 'opacity-100 max-w-[200px]'
  }`;

  return (
    <aside
      style={{ width: isCollapsed ? 60 : 288 }}
      className="relative flex flex-col bg-card border-r border-border transition-[width] duration-300 ease-in-out flex-shrink-0 h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`border-b border-border flex-shrink-0 transition-all duration-300 ${
          isCollapsed ? 'p-3 flex justify-center items-center min-h-[68px]' : 'px-5 py-4'
        }`}
      >
        {isCollapsed ? (
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Settings className="w-4 h-4 text-primary" />
          </div>
        ) : (
          <>
            <button
              onClick={() => navigate('/hub/modulos')}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-3 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm whitespace-nowrap">Voltar ao Hub</span>
            </button>
            <h2 className="tracking-tight whitespace-nowrap text-base">Configurações do Hub</h2>
            <p className="text-xs text-muted-foreground mt-0.5 whitespace-nowrap">Departamento de Configurações</p>
          </>
        )}
      </div>

      <div className="flex-1 relative min-h-0">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          title={isCollapsed ? 'Expandir menu' : 'Recolher menu'}
          style={{ right: -10 }}
          className={`absolute top-1/2 -translate-y-1/2 z-30 w-5 h-5 rounded-full
            bg-card border border-border shadow-md
            flex items-center justify-center
            text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary
            transition-all duration-200
            ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none'}`}
        >
          {isCollapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
        </button>

        <nav
          className={`h-full overflow-y-auto overflow-x-hidden transition-all duration-300 ${
            isCollapsed ? 'p-2 space-y-0.5' : 'p-3 space-y-0.5'
          }`}
          style={{ scrollbarWidth: 'none' }}
        >
          {navSections.map(({ id, label, icon: SectionIcon, color, items }) => {
            const isOpen    = expanded.has(id);
            const hasActive = items.some(i => i.to === location.pathname);

            return (
              <div key={id}>
                <button
                  onClick={() => toggleSection(id)}
                  title={isCollapsed ? label : undefined}
                  className={`w-full flex items-center rounded-lg transition-colors ${
                    isCollapsed ? 'justify-center py-3 px-0' : 'gap-3 px-3 py-2.5'
                  } ${
                    hasActive && !isOpen
                      ? 'bg-primary/8 text-primary'
                      : 'hover:bg-accent text-foreground'
                  }`}
                >
                  <SectionIcon
                    className={`w-[18px] h-[18px] flex-shrink-0 transition-colors ${
                      hasActive ? 'text-primary' : 'text-muted-foreground'
                    }`}
                  />
                  <span className={`${labelClass} flex-1 text-left`}>{label}</span>
                  {!isCollapsed && (
                    <ChevronDown
                      className={`w-3.5 h-3.5 flex-shrink-0 text-muted-foreground transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  )}
                </button>

                <div
                  className="overflow-hidden transition-all duration-300 ease-in-out"
                  style={isOpen && !isCollapsed
                    ? { maxHeight: items.length * 36 + 8, opacity: 1 }
                    : { maxHeight: 0, opacity: 0 }
                  }
                >
                  <div className="ml-7 mr-1 mt-0.5 mb-1.5 space-y-0.5">
                    {items.map(item => {
                      const ItemIcon = item.icon;
                      return (
                        <NavLink
                          key={item.to}
                          to={item.to}
                          className={({ isActive }) =>
                            `flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg transition-colors ${
                              isActive
                                ? 'text-primary bg-primary/10 font-medium'
                                : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                            }`
                          }
                        >
                          <ItemIcon className="w-3.5 h-3.5 flex-shrink-0" />
                          {item.label}
                        </NavLink>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
