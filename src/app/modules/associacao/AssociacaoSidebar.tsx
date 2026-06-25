import { useState, useEffect } from 'react';
import {
  Users, DollarSign, BarChart3, Building2, Settings, GraduationCap, MapPin,
  ChevronDown, ChevronLeft, ChevronRight, ArrowLeft,
} from 'lucide-react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { SidebarUserMenu } from '../../components/SidebarUserMenu';

// ── Nav structure ──────────────────────────────────────────────────────────────
interface NavItem  { label: string; to: string }
interface NavSection {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  items: NavItem[];
}

const navSections: NavSection[] = [
  {
    id: 'entidade',
    label: 'Dados da Entidade',
    icon: Building2,
    items: [
      { label: 'Configurações Gerais', to: '/modulo/associacao/entidade/geral' },
      { label: 'Dados da Entidade',    to: '/modulo/associacao/entidade/dados' },
      { label: 'Identidade Visual',    to: '/modulo/associacao/entidade/identidade' },
      { label: 'Diretoria',            to: '/modulo/associacao/entidade/diretoria' },
      { label: 'Textos e Regras',      to: '/modulo/associacao/entidade/textos-regras' },
    ],
  },
  {
    id: 'associados',
    label: 'Associados',
    icon: Users,
    items: [
      { label: 'Pessoa Física',   to: '/modulo/associacao/pessoas-pf' },
      { label: 'Pessoa Jurídica', to: '/modulo/associacao/pessoas-pj' },
    ],
  },
  {
    id: 'gestao-financeira',
    label: 'Gestão Financeira',
    icon: DollarSign,
    items: [
      { label: 'Anuidades',               to: '/modulo/associacao/anuidades' },
      { label: 'Negociação de Anuidades', to: '/modulo/associacao/negociacao-anuidades' },
      { label: 'Voucher',                 to: '/modulo/associacao/vouchers' },
      { label: 'Inscrições Automáticas',  to: '/modulo/associacao/inscricoes-automaticas' },
      { label: 'Impressão em Lote',       to: '/modulo/associacao/impressao-lote' },
    ],
  },
  {
    id: 'relatorios',
    label: 'Relatórios e BI',
    icon: BarChart3,
    items: [
      { label: 'Dashboards',               to: '/modulo/associacao/dashboard' },
      { label: 'Relatórios Analíticos',    to: '/modulo/associacao/relatorios-analiticos' },
      { label: 'Relatórios Quantitativos', to: '/modulo/associacao/relatorios-quantitativos' },
      { label: 'Gestão de Propostas',      to: '/modulo/associacao/gestao-propostas' },
      { label: 'Ações em Lote',            to: '/modulo/associacao/acoes-lote' },
      { label: 'Painel de Serviços',       to: '/modulo/associacao/painel-servicos' },
    ],
  },
  {
    id: 'estrutura',
    label: 'Estrutura Organizacional',
    icon: Building2,
    items: [
      { label: 'Diretorias',      to: '/modulo/associacao/diretoria' },
      { label: 'Comissões',       to: '/modulo/associacao/comissoes' },
      { label: 'Departamentos',   to: '/modulo/associacao/departamentos' },
      { label: 'Cargos',          to: '/modulo/associacao/cargos' },
      { label: 'Tipos de Órgãos', to: '/modulo/associacao/tipos-orgaos' },
    ],
  },
  {
    id: 'config-financeira',
    label: 'Configurações Financeiras',
    icon: Settings,
    items: [
      { label: 'Anuidades',            to: '/modulo/associacao/config-anuidades' },
      { label: 'Planos de Pagamento',  to: '/modulo/associacao/planos-pagamento' },
      { label: 'Taxas',                to: '/modulo/associacao/taxas' },
      { label: 'Categorias',           to: '/modulo/associacao/categorias' },
      { label: 'Regras de Associação', to: '/modulo/associacao/regras' },
    ],
  },
  {
    id: 'cadastro-profissional',
    label: 'Cadastro Profissional',
    icon: GraduationCap,
    items: [
      { label: 'Entidades',          to: '/modulo/associacao/entidades' },
      { label: 'Graduações',         to: '/modulo/associacao/graduacoes' },
      { label: 'Faculdades',         to: '/modulo/associacao/faculdades' },
      { label: 'Cursos',             to: '/modulo/associacao/cursos-prof' },
      { label: 'Especialidades',     to: '/modulo/associacao/especialidades' },
      { label: 'Áreas de Atuação',   to: '/modulo/associacao/areas-atuacao' },
      { label: 'Áreas de Interesse', to: '/modulo/associacao/areas-interesse' },
    ],
  },
  {
    id: 'regionalizacao',
    label: 'Regionalização e Comunicação',
    icon: MapPin,
    items: [
      { label: 'Regionais',            to: '/modulo/associacao/regionais' },
      { label: 'Municípios Regionais', to: '/modulo/associacao/municipios-regionais' },
      { label: 'Funções',              to: '/modulo/associacao/funcoes' },
      { label: 'Tipos de Email',       to: '/modulo/associacao/tipos-email' },
      { label: 'Modelos de Email',     to: '/modulo/associacao/modelos-email' },
      { label: 'Carta de Associado',   to: '/modulo/associacao/carta-associado' },
    ],
  },
];

function sectionForPath(path: string): string | null {
  for (const s of navSections) {
    if (s.items.some(i => i.to === path)) return s.id;
  }
  return null;
}

interface AssociacaoSidebarProps { onLogout: () => void }

export function AssociacaoSidebar({ onLogout }: AssociacaoSidebarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isHovered,   setIsHovered]   = useState(false);
  const [expanded, setExpanded] = useState<Set<string>>(() => {
    const initial = sectionForPath(location.pathname);
    return initial ? new Set([initial]) : new Set();
  });

  // Auto-expand the section that contains the current route
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
      {/* ── Header ── */}
      <div
        className={`border-b border-border flex-shrink-0 transition-all duration-300 ${
          isCollapsed ? 'p-3 flex justify-center items-center min-h-[68px]' : 'px-5 py-4'
        }`}
      >
        {isCollapsed ? (
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <Users className="w-4 h-4 text-primary" />
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
            <h2 className="tracking-tight whitespace-nowrap text-base">Gestão de Membros</h2>
            <p className="text-xs text-muted-foreground mt-0.5 whitespace-nowrap">Módulo Associativo</p>
          </>
        )}
      </div>

      {/* ── Nav zone ── */}
      <div className="flex-1 relative min-h-0">
        {/* Collapse toggle — visible on hover */}
        <button
          onClick={() => isCollapsed ? setIsCollapsed(false) : setIsCollapsed(true)}
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

        {/* Scrollable nav */}
        <nav
          className={`h-full overflow-y-auto overflow-x-hidden transition-all duration-300 ${
            isCollapsed ? 'p-2 space-y-0.5' : 'p-3 space-y-0.5'
          }`}
          style={{ scrollbarWidth: 'none' }}
        >
          {navSections.map(({ id, label, icon: Icon, items }) => {
            const isOpen    = expanded.has(id);
            const hasActive = items.some(i => i.to === location.pathname);

            return (
              <div key={id}>
                {/* Section button */}
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
                  <Icon
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

                {/* Sub-items */}
                <div
                  className="overflow-hidden transition-all duration-300 ease-in-out"
                  style={isOpen && !isCollapsed
                    ? { maxHeight: items.length * 36 + 8, opacity: 1 }
                    : { maxHeight: 0, opacity: 0 }
                  }
                >
                  <div className="ml-7 mr-1 mt-0.5 mb-1.5 space-y-0.5">
                    {items.map(item => (
                      <NavLink
                        key={item.to}
                        to={item.to}
                        className={({ isActive }) =>
                          `block px-3 py-1.5 text-sm rounded-lg transition-colors ${
                            isActive
                              ? 'text-primary bg-primary/10 font-medium'
                              : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                          }`
                        }
                      >
                        {item.label}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </nav>
      </div>

      {/* ── Footer ── */}
      <div
        className={`border-t border-border flex-shrink-0 transition-all duration-300 ${
          isCollapsed ? 'p-2' : 'p-3'
        }`}
      >
        <SidebarUserMenu isCollapsed={isCollapsed} onLogout={onLogout} />
      </div>
    </aside>
  );
}
