import { useState, useRef, useEffect, useCallback } from 'react';
import { Search, Users, Calendar, DollarSign, FileText, Settings, BarChart3, Building2, Tags, CreditCard, UserPlus, FileCheck, Briefcase, X, Zap, ClipboardList, BookOpen, Gift, LayoutGrid, Package, ChevronRight, ChevronLeft, Lock, Monitor, Languages, MessageSquare, Upload, ToggleRight, Vote, Layers, Info, FlaskConical, Store, Megaphone, UserCheck, MoreVertical, Plus, Pencil, Trash2, GripVertical, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function WidgetsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 3h8v8H3V3zm0 10h8v8H3v-8zm10-10h8v8h-8V3zm0 10h8v8h-8v-8z" />
    </svg>
  );
}

interface QuickAccessMenuProps {
  currentModule?: string;
}

const ROUTE_ALIASES: Record<string, string> = {
  '/hub/dashboard': '/hub/modulos',
  '/hub/entidade/geral': '/modulo/associacao/entidade/geral',
  '/hub/entidade/dados': '/modulo/associacao/entidade/dados',
  '/hub/entidade/identidade': '/modulo/associacao/entidade/identidade',
  '/hub/entidade/diretoria': '/modulo/associacao/entidade/diretoria',
  '/hub/entidade/textos-regras': '/modulo/associacao/entidade/textos-regras',
  '/modulo/associacao/pessoas': '/modulo/associacao/pessoas-pf',
};

function normalizeRoute(route: string) {
  return ROUTE_ALIASES[route] || route;
}

// ── All available items (sidebar + settings) ──────────────────────────────
const ALL_AVAILABLE_ITEMS = [
  // Hub
  { id: 'hub-dashboard', label: 'Dashboard', icon: <BarChart3 className="w-4 h-4" />, iconKey: 'BarChart3', route: '/hub/modulos', group: 'hub' },
  { id: 'hub-departamentos', label: 'Departamentos', icon: <Package className="w-4 h-4" />, iconKey: 'Package', route: '/hub/modulos', group: 'hub' },
  // Entidade
  { id: 'entidade-config', label: 'Configurações Gerais', icon: <Settings className="w-4 h-4" />, iconKey: 'Settings', route: '/modulo/associacao/entidade/geral', group: 'entidade' },
  { id: 'entidade-dados', label: 'Dados da Entidade', icon: <Building2 className="w-4 h-4" />, iconKey: 'Building2', route: '/modulo/associacao/entidade/dados', group: 'entidade' },
  { id: 'identidade', label: 'Identidade Visual', icon: <Tags className="w-4 h-4" />, iconKey: 'Tags', route: '/modulo/associacao/entidade/identidade', group: 'entidade' },
  { id: 'diretoria', label: 'Diretoria', icon: <Briefcase className="w-4 h-4" />, iconKey: 'Briefcase', route: '/modulo/associacao/entidade/diretoria', group: 'entidade' },
  { id: 'textos-regras', label: 'Textos e Regras', icon: <FileCheck className="w-4 h-4" />, iconKey: 'FileCheck', route: '/modulo/associacao/entidade/textos-regras', group: 'entidade' },
  { id: 'usuarios', label: 'Usuários e Acesso', icon: <UserPlus className="w-4 h-4" />, iconKey: 'UserPlus', route: '/hub/usuarios', group: 'entidade' },
  { id: 'pagamentos', label: 'Meios de Pagamento', icon: <CreditCard className="w-4 h-4" />, iconKey: 'CreditCard', route: '/hub/pagamentos', group: 'entidade' },
  // Criar
  { id: 'novo-associado', label: 'Novo Associado', icon: <UserPlus className="w-4 h-4" />, iconKey: 'UserPlus', route: '/modulo/associacao/pessoas-pf', group: 'criar' },
  { id: 'novo-evento', label: 'Novo Evento', icon: <Calendar className="w-4 h-4" />, iconKey: 'Calendar', route: '/modulo/eventos/dashboard', group: 'criar' },
  { id: 'novo-lancamento', label: 'Novo Lançamento', icon: <DollarSign className="w-4 h-4" />, iconKey: 'DollarSign', route: '/modulo/financeiro/dashboard', group: 'criar' },
  { id: 'novo-curso', label: 'Novo Curso', icon: <BookOpen className="w-4 h-4" />, iconKey: 'BookOpen', route: '/modulo/cursos/dashboard', group: 'criar' },
  // Configurações - Acesso
  { id: 'cfg-usuarios', label: 'Gerenciar Usuários', icon: <Users className="w-4 h-4" />, iconKey: 'Users', route: '', group: 'config' },
  { id: 'cfg-grupos', label: 'Grupos de acesso', icon: <Shield className="w-4 h-4" />, iconKey: 'Shield', route: '', group: 'config' },
  { id: 'cfg-permissoes', label: 'Permissões do Sistema', icon: <Lock className="w-4 h-4" />, iconKey: 'Lock', route: '', group: 'config' },
  // Configurações - Sistema
  { id: 'cfg-menus', label: 'Menus', icon: <LayoutGrid className="w-4 h-4" />, iconKey: 'LayoutGrid', route: '', group: 'config' },
  { id: 'cfg-config', label: 'Configurações', icon: <Settings className="w-4 h-4" />, iconKey: 'Settings', route: '', group: 'config' },
  { id: 'cfg-logos', label: 'Logos', icon: <Upload className="w-4 h-4" />, iconKey: 'Upload', route: '', group: 'config' },
  { id: 'cfg-notificacoes', label: 'Notificações', icon: <MessageSquare className="w-4 h-4" />, iconKey: 'MessageSquare', route: '', group: 'config' },
  { id: 'cfg-idioma', label: 'Idioma', icon: <Languages className="w-4 h-4" />, iconKey: 'Languages', route: '', group: 'config' },
  // Módulos
  { id: 'mod-associacao', label: 'Associação', icon: <Users className="w-4 h-4" />, iconKey: 'Users', route: '/modulo/associacao/dashboard', group: 'modulos' },
  { id: 'mod-financeiro', label: 'Financeiro', icon: <DollarSign className="w-4 h-4" />, iconKey: 'DollarSign', route: '/modulo/financeiro/dashboard', group: 'modulos' },
  { id: 'mod-exames', label: 'Exames', icon: <ClipboardList className="w-4 h-4" />, iconKey: 'ClipboardList', route: '/modulo/exames/dashboard', group: 'modulos' },
  { id: 'mod-cursos', label: 'Cursos/EAD', icon: <BookOpen className="w-4 h-4" />, iconKey: 'BookOpen', route: '/modulo/cursos/dashboard', group: 'modulos' },
];

// ── Shield icon (missing from lucide imports) ─────────────────────────────
function Shield({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

// ── Default blocks ────────────────────────────────────────────────────────
interface BlockItem { id: string; label: string; icon: React.ReactNode; iconKey?: string; route: string; }
interface Block { id: string; name: string; items: BlockItem[]; }

const DEFAULT_BLOCKS: Block[] = [
  {
    id: 'block-entidade',
    name: 'Entidade',
    items: [
      { id: 'entidade-config', label: 'Configurações Gerais', icon: <Settings className="w-4 h-4" />, iconKey: 'Settings', route: '/modulo/associacao/entidade/geral' },
      { id: 'entidade-dados', label: 'Dados da Entidade', icon: <Building2 className="w-4 h-4" />, iconKey: 'Building2', route: '/modulo/associacao/entidade/dados' },
      { id: 'identidade', label: 'Identidade Visual', icon: <Tags className="w-4 h-4" />, iconKey: 'Tags', route: '/modulo/associacao/entidade/identidade' },
      { id: 'diretoria', label: 'Diretoria', icon: <Briefcase className="w-4 h-4" />, iconKey: 'Briefcase', route: '/modulo/associacao/entidade/diretoria' },
      { id: 'textos-regras', label: 'Textos e Regras', icon: <FileCheck className="w-4 h-4" />, iconKey: 'FileCheck', route: '/modulo/associacao/entidade/textos-regras' },
      { id: 'usuarios', label: 'Usuários e Acesso', icon: <UserPlus className="w-4 h-4" />, iconKey: 'UserPlus', route: '/hub/usuarios' },
      { id: 'pagamentos', label: 'Meios de Pagamento', icon: <CreditCard className="w-4 h-4" />, iconKey: 'CreditCard', route: '/hub/pagamentos' },
    ],
  },
  {
    id: 'block-hub',
    name: 'Hub',
    items: [
      { id: 'hub-dashboard', label: 'Dashboard', icon: <BarChart3 className="w-4 h-4" />, iconKey: 'BarChart3', route: '/hub/modulos' },
      { id: 'hub-departamentos', label: 'Departamentos', icon: <Package className="w-4 h-4" />, iconKey: 'Package', route: '/hub/modulos' },
    ],
  },
  {
    id: 'block-criar',
    name: 'Criar',
    items: [
      { id: 'novo-associado', label: 'Novo Associado', icon: <UserPlus className="w-4 h-4" />, iconKey: 'UserPlus', route: '/modulo/associacao/pessoas-pf' },
      { id: 'novo-evento', label: 'Novo Evento', icon: <Calendar className="w-4 h-4" />, iconKey: 'Calendar', route: '/modulo/eventos/dashboard' },
      { id: 'novo-lancamento', label: 'Novo Lançamento', icon: <DollarSign className="w-4 h-4" />, iconKey: 'DollarSign', route: '/modulo/financeiro/dashboard' },
      { id: 'novo-curso', label: 'Novo Curso', icon: <BookOpen className="w-4 h-4" />, iconKey: 'BookOpen', route: '/modulo/cursos/dashboard' },
    ],
  },
];

const STORAGE_KEY = 'hubitarget_quick_blocks';

// Icon registry for deserialization from localStorage
const ICON_REGISTRY: Record<string, React.ReactNode> = {
  'Settings': <Settings className="w-4 h-4" />,
  'Building2': <Building2 className="w-4 h-4" />,
  'Tags': <Tags className="w-4 h-4" />,
  'Briefcase': <Briefcase className="w-4 h-4" />,
  'FileCheck': <FileCheck className="w-4 h-4" />,
  'UserPlus': <UserPlus className="w-4 h-4" />,
  'CreditCard': <CreditCard className="w-4 h-4" />,
  'BarChart3': <BarChart3 className="w-4 h-4" />,
  'Package': <Package className="w-4 h-4" />,
  'Calendar': <Calendar className="w-4 h-4" />,
  'DollarSign': <DollarSign className="w-4 h-4" />,
  'BookOpen': <BookOpen className="w-4 h-4" />,
  'Users': <Users className="w-4 h-4" />,
  'ClipboardList': <ClipboardList className="w-4 h-4" />,
  'FlaskConical': <FlaskConical className="w-4 h-4" />,
  'Store': <Store className="w-4 h-4" />,
  'Megaphone': <Megaphone className="w-4 h-4" />,
  'UserCheck': <UserCheck className="w-4 h-4" />,
  'FileText': <FileText className="w-4 h-4" />,
  'Lock': <Lock className="w-4 h-4" />,
  'Monitor': <Monitor className="w-4 h-4" />,
  'Languages': <Languages className="w-4 h-4" />,
  'MessageSquare': <MessageSquare className="w-4 h-4" />,
  'Upload': <Upload className="w-4 h-4" />,
  'LayoutGrid': <LayoutGrid className="w-4 h-4" />,
  'Shield': <Shield className="w-4 h-4" />,
  'Gift': <Gift className="w-4 h-4" />,
};

function loadBlocks(): Block[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) throw new Error('invalid');
      return parsed.map((block: any) => ({
        id: String(block.id || ''),
        name: String(block.name || ''),
        items: Array.isArray(block.items) ? block.items.map((item: any) => ({
          id: String(item.id || ''),
          label: String(item.label || ''),
          route: normalizeRoute(String(item.route || '')),
          iconKey: String(item.iconKey || ''),
          icon: ICON_REGISTRY[item.iconKey] || <Package className="w-4 h-4" />,
        })) : [],
      }));
    }
  } catch {
    localStorage.removeItem(STORAGE_KEY);
  }
  return DEFAULT_BLOCKS;
}

function saveBlocks(blocks: Block[]) {
  const serializable = blocks.map(block => ({
    ...block,
    items: block.items.map(item => ({
      id: item.id,
      label: item.label,
      route: item.route,
      iconKey: item.iconKey || '',
    })),
  }));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(serializable));
}

// ── Modules list for departamentos ────────────────────────────────────────
const MODULES = [
  { id: 'associacao',           label: 'Associação',             Icon: Users,         color: '#60a5fa', route: '/modulo/associacao/dashboard' },
  { id: 'financeiro',           label: 'Financeiro',             Icon: DollarSign,    color: '#34d399', route: '/modulo/financeiro/dashboard' },
  { id: 'exames',               label: 'Exames',                 Icon: ClipboardList,color: '#fb923c', route: '/modulo/exames/dashboard' },
  { id: 'cursos',               label: 'Cursos/EAD',             Icon: BookOpen,      color: '#a78bfa', route: '/modulo/cursos/dashboard' },
  { id: 'servicos-residencias', label: 'Serviços e Residências', Icon: Building2,     color: '#2dd4bf', route: '' },
  { id: 'inscricoes',           label: 'Inscrições',             Icon: UserCheck,     color: '#f472b6', route: '' },
  { id: 'trabalhos-cientificos',label: 'Trabalhos Científicos',  Icon: FileText,      color: '#fbbf24', route: '' },
  { id: 'programacao-cientifica',label:'Programação Científica', Icon: FlaskConical,  color: '#22d3ee', route: '' },
  { id: 'feira-comercial',      label: 'Feira Comercial',        Icon: Store,         color: '#f87171', route: '' },
  { id: 'marketing',            label: 'Marketing',              Icon: Megaphone,     color: '#fb7193', route: '' },
];

const DEPT_STORAGE_KEY = 'hubitarget_quick_departments';
const DEFAULT_DEPT_IDS = MODULES.map(m => m.id);

function loadDeptIds(): string[] {
  try {
    const raw = localStorage.getItem(DEPT_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.every((x: any) => typeof x === 'string')) return parsed;
    }
  } catch {
    localStorage.removeItem(DEPT_STORAGE_KEY);
  }
  return DEFAULT_DEPT_IDS;
}

function saveDeptIds(ids: string[]) {
  localStorage.setItem(DEPT_STORAGE_KEY, JSON.stringify(ids));
}

// ── Settings categories (for add items) ───────────────────────────────────
const SETTINGS_CATEGORIES = [
  {
    id: 'acesso', label: 'Acesso', Icon: Lock, color: '#60a5fa',
    items: [
      { id: 'cfg-usuarios', label: 'Gerenciar Usuários', description: 'Adicionar, editar e remover usuários do sistema' },
      { id: 'cfg-grupos', label: 'Grupos de acesso', description: 'Organizar usuários em grupos com permissões' },
      { id: 'cfg-permissoes', label: 'Permissões do Sistema', description: 'Controle de acesso a funcionalidades' },
    ]
  },
  {
    id: 'sistema', label: 'Sistema', Icon: Monitor, color: '#34d399',
    items: [
      { id: 'cfg-menus', label: 'Menus', description: 'Personalizar menus de navegação' },
      { id: 'cfg-config', label: 'Configurações', description: 'Configurações gerais do sistema' },
      { id: 'cfg-logos', label: 'Logos', description: 'Gerenciar logotipos da plataforma' },
      { id: 'cfg-notificacoes', label: 'Notificações', description: 'Configurar alertas e notificações' },
      { id: 'cfg-idioma', label: 'Idioma', description: 'Alterar idioma do sistema' },
    ]
  },
  {
    id: 'documentos', label: 'Documentos', Icon: FileText, color: '#818cf8',
    items: [
      { id: 'cfg-modelos', label: 'Modelos de Documentos', description: 'Criar e editar templates de documentos' },
      { id: 'cfg-especialidades', label: 'Configurações Especialidades', description: 'Gerenciar especialidades médicas' },
    ]
  },
  {
    id: 'forms', label: 'Forms', Icon: ClipboardList, color: '#a78bfa',
    items: [
      { id: 'cfg-formularios', label: 'Formulários', description: 'Criar e gerenciar formulários' },
      { id: 'cfg-perguntas', label: 'Perguntas', description: 'Banco de perguntas para formulários' },
    ]
  },
];

// ── Department Context Menu ───────────────────────────────────────────────
function DeptContextMenu({ onClose, onCustomize }: { onClose: () => void; onCustomize: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) onClose(); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClose]);
  return (
    <div ref={ref} className="absolute right-0 top-full mt-1 w-48 bg-card border border-border rounded-xl shadow-xl overflow-hidden z-50">
      <button onClick={onCustomize} className="w-full flex items-center gap-2.5 px-3 py-2.5 hover:bg-muted transition-colors text-left text-sm">
        <Plus className="w-4 h-4 text-muted-foreground" />
        Customizar departamentos
      </button>
    </div>
  );
}

// ── Department Customize Panel ────────────────────────────────────────────
function DeptCustomizePanel({ visibleIds, onSave, onBack }: { visibleIds: string[]; onSave: (ids: string[]) => void; onBack: () => void }) {
  const [selected, setSelected] = useState<string[]>(visibleIds);
  const [search, setSearch] = useState('');
  const s = search.toLowerCase();
  const filtered = MODULES.filter(m => !s || m.label.toLowerCase().includes(s));

  const toggle = (id: string) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 pt-4 pb-3 border-b border-border">
        <div className="flex items-center gap-2 mb-3">
          <button onClick={onBack} className="p-1 hover:bg-muted rounded-lg transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <h3 className="font-semibold text-sm flex-1">Customizar Departamentos</h3>
          <button onClick={() => onSave(selected)} className="px-3 py-1 text-xs font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
            Salvar
          </button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input type="text" placeholder="Buscar departamento..." value={search} onChange={e => setSearch(e.target.value)} autoFocus
            className="w-full pl-9 pr-4 py-2 bg-muted border border-border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all" />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-1">
        {filtered.map(mod => {
          const isSelected = selected.includes(mod.id);
          return (
            <button key={mod.id} onClick={() => toggle(mod.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors text-left ${isSelected ? 'bg-primary/10 border border-primary/20' : 'hover:bg-muted border border-transparent'}`}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${mod.color}18`, border: `1px solid ${mod.color}33` }}>
                <mod.Icon className="w-4 h-4" style={{ color: mod.color }} />
              </div>
              <span className="text-sm flex-1">{mod.label}</span>
              <div className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors ${isSelected ? 'bg-primary text-primary-foreground' : 'border border-border'}`}>
                {isSelected && <Check className="w-3 h-3" />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ── Block Context Menu ────────────────────────────────────────────────────
function BlockContextMenu({
  block,
  onRename,
  onCustomize,
  onDelete,
  onClose,
}: {
  block: Block;
  onRename: () => void;
  onCustomize: () => void;
  onDelete: () => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClose]);

  return (
    <div ref={ref} className="absolute right-0 top-full mt-1 w-48 bg-card border border-border rounded-xl shadow-xl overflow-hidden z-50">
      <button
        onClick={() => { onCustomize(); onClose(); }}
        className="w-full flex items-center gap-2.5 px-3 py-2.5 hover:bg-muted transition-colors text-left text-sm"
      >
        <Plus className="w-4 h-4 text-muted-foreground" />
        Adicionar itens
      </button>
      <button
        onClick={() => { onRename(); onClose(); }}
        className="w-full flex items-center gap-2.5 px-3 py-2.5 hover:bg-muted transition-colors text-left text-sm"
      >
        <Pencil className="w-4 h-4 text-muted-foreground" />
        Renomear bloco
      </button>
      <div className="border-t border-border">
        <button
          onClick={() => { onDelete(); onClose(); }}
          className="w-full flex items-center gap-2.5 px-3 py-2.5 hover:bg-destructive/10 transition-colors text-left text-sm text-destructive"
        >
          <Trash2 className="w-4 h-4" />
          Remover bloco
        </button>
      </div>
    </div>
  );
}

// ── Customize Panel (add/remove items from a block) ───────────────────────
function CustomizePanel({
  block,
  onSave,
  onBack,
}: {
  block: Block;
  onSave: (updatedItems: BlockItem[]) => void;
  onBack: () => void;
}) {
  const [items, setItems] = useState<BlockItem[]>(block.items);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const s = search.toLowerCase();

  // All available items grouped
  const availableGroups = [
    {
      id: 'current', label: 'Itens Atuais',
      items: items,
    },
    {
      id: 'hub', label: 'Hub',
      items: ALL_AVAILABLE_ITEMS.filter(i => i.group === 'hub' && !items.find(x => x.id === i.id)),
    },
    {
      id: 'entidade', label: 'Entidade',
      items: ALL_AVAILABLE_ITEMS.filter(i => i.group === 'entidade' && !items.find(x => x.id === i.id)),
    },
    {
      id: 'criar', label: 'Criar',
      items: ALL_AVAILABLE_ITEMS.filter(i => i.group === 'criar' && !items.find(x => x.id === i.id)),
    },
    {
      id: 'config', label: 'Configurações',
      items: ALL_AVAILABLE_ITEMS.filter(i => i.group === 'config' && !items.find(x => x.id === i.id)),
    },
    {
      id: 'modulos', label: 'Módulos',
      items: ALL_AVAILABLE_ITEMS.filter(i => i.group === 'modulos' && !items.find(x => x.id === i.id)),
    },
  ];

  const addItem = (item: BlockItem) => {
    if (!items.find(i => i.id === item.id)) {
      setItems([...items, item]);
    }
  };

  const removeItem = (id: string) => {
    setItems(items.filter(i => i.id !== id));
  };

  const moveItem = (from: number, to: number) => {
    const arr = [...items];
    const [moved] = arr.splice(from, 1);
    arr.splice(to, 0, moved);
    setItems(arr);
  };

  const filteredGroups = availableGroups
    .map(g => ({
      ...g,
      items: g.items.filter(i => !s || i.label.toLowerCase().includes(s)),
    }))
    .filter(g => g.items.length > 0);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-4 pt-4 pb-3 border-b border-border">
        <div className="flex items-center gap-2 mb-3">
          <button onClick={onBack} className="p-1 hover:bg-muted rounded-lg transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <h3 className="font-semibold text-sm flex-1">Customizar: {block.name}</h3>
          <button
            onClick={() => onSave(items)}
            className="px-3 py-1 text-xs font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Salvar
          </button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar itens para adicionar..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            autoFocus
            className="w-full pl-9 pr-4 py-2 bg-muted border border-border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
          />
        </div>
      </div>

      {/* Current items */}
      <div className="px-4 pt-3 pb-2 border-b border-border">
        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          Itens neste bloco ({items.length})
        </h4>
        <div className="space-y-1 max-h-32 overflow-y-auto">
          {items.map((item, idx) => (
            <div key={item.id} className="flex items-center gap-2 px-2 py-1.5 bg-muted/50 rounded-lg group">
              <button
                onClick={() => idx > 0 && moveItem(idx, idx - 1)}
                disabled={idx === 0}
                className="p-0.5 text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors"
              >
                <GripVertical className="w-3.5 h-3.5" />
              </button>
              <div className="flex-1 text-sm truncate">{item.label}</div>
              <button
                onClick={() => removeItem(item.id)}
                className="p-1 text-muted-foreground hover:text-destructive transition-colors opacity-0 group-hover:opacity-100"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
          {items.length === 0 && (
            <p className="text-xs text-muted-foreground py-2">Nenhum item. Adicione abaixo.</p>
          )}
        </div>
      </div>

      {/* Available items */}
      <div className="flex-1 overflow-y-auto px-4 py-3">
        {filteredGroups.map(group => (
          <div key={group.id} className="mb-3">
            <button
              onClick={() => setActiveCategory(activeCategory === group.id ? null : group.id)}
              className="flex items-center justify-between w-full text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 hover:text-foreground transition-colors"
            >
              <span>{group.label}</span>
              <span className="text-[10px] bg-muted px-1.5 py-0.5 rounded-full">{group.items.length}</span>
            </button>
            {(activeCategory === group.id || search) && (
              <div className="space-y-0.5">
                {group.items.map(item => (
                  <button
                    key={item.id}
                    onClick={() => addItem(item)}
                    className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-primary/10 hover:text-primary transition-colors text-left group"
                  >
                    <div className="w-6 h-6 rounded-md bg-muted flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0">
                      {item.icon}
                    </div>
                    <span className="text-sm flex-1 truncate">{item.label}</span>
                    <Plus className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Rename Dialog ─────────────────────────────────────────────────────────
function RenameDialog({
  currentName,
  onSave,
  onClose,
}: {
  currentName: string;
  onSave: (name: string) => void;
  onClose: () => void;
}) {
  const [name, setName] = useState(currentName);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => { ref.current?.focus(); }, []);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-card border border-border rounded-xl w-full max-w-sm shadow-xl" onClick={e => e.stopPropagation()}>
        <div className="px-5 py-4 border-b border-border">
          <h3 className="font-semibold text-sm">Renomear bloco</h3>
        </div>
        <div className="p-5">
          <input
            ref={ref}
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && name.trim()) { onSave(name.trim()); onClose(); } }}
            className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
        </div>
        <div className="flex justify-end gap-2 px-5 py-3 border-t border-border">
          <button onClick={onClose} className="px-3 py-1.5 text-sm border border-border rounded-lg hover:bg-accent transition-colors">Cancelar</button>
          <button
            onClick={() => { if (name.trim()) { onSave(name.trim()); onClose(); } }}
            disabled={!name.trim()}
            className="px-4 py-1.5 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────
export function QuickAccessMenu({ currentModule }: QuickAccessMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'quick' | 'settings'>('quick');
  const [searchTerm, setSearchTerm] = useState('');
  const [settingsSearch, setSettingsSearch] = useState('');
  const [settingsStack, setSettingsStack] = useState<string[]>([]);
  const [hoveredInfo, setHoveredInfo] = useState<string | null>(null);

  // Block state
  const [blocks, setBlocks] = useState<Block[]>(loadBlocks);
  const [deptIds, setDeptIds] = useState<string[]>(loadDeptIds);
  const [deptContextMenu, setDeptContextMenu] = useState(false);
  const [deptCustomizeOpen, setDeptCustomizeOpen] = useState(false);
  const [contextMenuBlockId, setContextMenuBlockId] = useState<string | null>(null);
  const [customizeBlockId, setCustomizeBlockId] = useState<string | null>(null);
  const [renameBlockId, setRenameBlockId] = useState<string | null>(null);
  const [addBlockMode, setAddBlockMode] = useState(false);
  const [expandedBlocks, setExpandedBlocks] = useState<Set<string>>(new Set());

  const toggleExpanded = (blockId: string) => {
    setExpandedBlocks(prev => {
      const next = new Set(prev);
      if (next.has(blockId)) next.delete(blockId);
      else next.add(blockId);
      return next;
    });
  };

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
    const targetRoute = normalizeRoute(route);
    if (!targetRoute) return;
    navigate(targetRoute);
    setIsOpen(false);
    setSearchTerm('');
  };

  const openCategory = useCallback((categoryId: string) => {
    setSettingsStack(prev => [...prev, categoryId]);
  }, []);

  const goBack = useCallback(() => {
    setSettingsStack(prev => prev.slice(0, -1));
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setSearchTerm('');
      setSettingsSearch('');
      setSettingsStack([]);
    }
  }, [isOpen]);

  const currentCategoryId = settingsStack[settingsStack.length - 1] || null;
  const currentCategory = currentCategoryId
    ? SETTINGS_CATEGORIES.find(c => c.id === currentCategoryId)
    : null;

  const search = searchTerm.toLowerCase();

  // Block actions
  const handleCustomizeSave = (blockId: string, updatedItems: BlockItem[]) => {
    const updated = blocks.map(b => b.id === blockId ? { ...b, items: updatedItems } : b);
    setBlocks(updated);
    saveBlocks(updated);
    setCustomizeBlockId(null);
  };

  const handleRename = (blockId: string, newName: string) => {
    const updated = blocks.map(b => b.id === blockId ? { ...b, name: newName } : b);
    setBlocks(updated);
    saveBlocks(updated);
    setRenameBlockId(null);
  };

  const handleDeleteBlock = (blockId: string) => {
    const updated = blocks.filter(b => b.id !== blockId);
    setBlocks(updated);
    saveBlocks(updated);
  };

  const handleAddBlock = (name: string) => {
    const newBlock: Block = {
      id: `block-${Date.now()}`,
      name,
      items: [],
    };
    const updated = [...blocks, newBlock];
    setBlocks(updated);
    saveBlocks(updated);
    setAddBlockMode(false);
  };

  const customizeBlock = blocks.find(b => b.id === customizeBlockId);
  const renameBlock = blocks.find(b => b.id === renameBlockId);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}
      <div className="relative z-50" ref={menuRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`p-2 rounded-lg transition-colors ${isOpen ? 'bg-accent' : 'hover:bg-accent'}`}
          title="Menu de Acesso Rápido"
        >
          <WidgetsIcon className="w-5 h-5" />
        </button>

        {isOpen && (
          <div className="absolute right-0 top-full mt-2 w-[580px] bg-card border border-border rounded-2xl shadow-2xl overflow-hidden z-50">

          {/* Header */}
          <div className="px-4 pt-4 pb-3 border-b border-border">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                {activeTab === 'settings' && settingsStack.length > 0 && (
                  <button onClick={goBack} className="p-1 hover:bg-muted rounded-lg transition-colors">
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                )}
                <h3 className="font-semibold">
                  {activeTab === 'quick' && 'Acesso Rápido'}
                  {activeTab === 'settings' && settingsStack.length === 0 && 'Configurações'}
                  {activeTab === 'settings' && currentCategory && currentCategory.label}
                </h3>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-muted rounded-lg transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Search - above tabs */}
            <div className="relative mb-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder={activeTab === 'quick' ? 'Pesquisar funcionalidade...' : 'Localizar configuração...'}
                value={activeTab === 'quick' ? searchTerm : settingsSearch}
                onChange={e => activeTab === 'quick' ? setSearchTerm(e.target.value) : setSettingsSearch(e.target.value)}
                autoFocus
                className="w-full pl-9 pr-4 py-2 bg-muted border border-border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
              {(activeTab === 'quick' ? searchTerm : settingsSearch) && (
                <button
                  onClick={() => activeTab === 'quick' ? setSearchTerm('') : setSettingsSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-muted-foreground/20 flex items-center justify-center hover:bg-muted-foreground/30 transition-colors"
                >
                  <X className="w-3 h-3 text-muted-foreground" />
                </button>
              )}
            </div>

            {/* Tabs */}
            <div className="flex gap-1 p-1 bg-muted rounded-lg">
              <button
                onClick={() => { setActiveTab('quick'); setSettingsStack([]); }}
                className={`flex-1 flex items-center justify-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  activeTab === 'quick'
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Zap className="w-4 h-4" />
                Acesso Rápido
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`flex-1 flex items-center justify-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  activeTab === 'settings'
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Settings className="w-4 h-4" />
                Configurações
              </button>
            </div>
          </div>

          <div className="overflow-y-auto max-h-[calc(80vh-140px)]">

            {/* === QUICK ACCESS TAB === */}
            {activeTab === 'quick' && (
              <>
                {search ? (
                  /* ── Global search results ── */
                  <div className="p-4">
                    {(() => {
                      const s = search;
                      const results: { group: string; groupIcon: React.ReactNode; groupColor: string; items: { id: string; label: string; icon: React.ReactNode; route: string; description?: string }[] }[] = [];

                      // 1. Departments
                      const deptResults = MODULES.filter(m => m.label.toLowerCase().includes(s));
                      if (deptResults.length > 0) {
                        results.push({
                          group: 'Departamentos',
                          groupIcon: <LayoutGrid className="w-3.5 h-3.5" />,
                          groupColor: '#94a3b8',
                          items: deptResults.map(m => ({ id: m.id, label: m.label, icon: <m.Icon className="w-4 h-4" style={{ color: m.color }} />, route: m.route })),
                        });
                      }

                      // 2. System items (ALL_AVAILABLE_ITEMS)
                      const systemResults = ALL_AVAILABLE_ITEMS.filter(i => i.label.toLowerCase().includes(s));
                      const groupMap: Record<string, typeof systemResults> = {};
                      systemResults.forEach(item => {
                        const g = item.group;
                        if (!groupMap[g]) groupMap[g] = [];
                        groupMap[g].push(item);
                      });
                      const groupLabels: Record<string, { label: string; icon: React.ReactNode; color: string }> = {
                        hub: { label: 'Hub', icon: <Package className="w-3.5 h-3.5" />, color: '#94a3b8' },
                        entidade: { label: 'Entidade', icon: <Building2 className="w-3.5 h-3.5" />, color: '#60a5fa' },
                        criar: { label: 'Criar', icon: <Plus className="w-3.5 h-3.5" />, color: '#34d399' },
                        config: { label: 'Configurações', icon: <Settings className="w-3.5 h-3.5" />, color: '#a78bfa' },
                        modulos: { label: 'Módulos', icon: <Package className="w-3.5 h-3.5" />, color: '#fbbf24' },
                      };
                      Object.entries(groupMap).forEach(([g, items]) => {
                        const meta = groupLabels[g] || { label: g, icon: <Settings className="w-3.5 h-3.5" />, color: '#94a3b8' };
                        results.push({
                          group: meta.label,
                          groupIcon: meta.icon,
                          groupColor: meta.color,
                          items: items.map(i => ({ id: i.id, label: i.label, icon: i.icon, route: i.route })),
                        });
                      });

                      // 3. Settings items
                      SETTINGS_CATEGORIES.forEach(cat => {
                        const matched = cat.items.filter(i =>
                          i.label.toLowerCase().includes(s) || i.description.toLowerCase().includes(s)
                        );
                        if (matched.length > 0) {
                          results.push({
                            group: cat.label,
                            groupIcon: <cat.Icon className="w-3.5 h-3.5" />,
                            groupColor: cat.color,
                            items: matched.map(i => ({
                              id: i.id,
                              label: i.label,
                              icon: <div className="w-2 h-2 rounded-full" style={{ backgroundColor: cat.color }} />,
                              route: '',
                              description: i.description,
                            })),
                          });
                        }
                      });

                      // 4. Block items
                      const blockResults: { id: string; label: string; icon: React.ReactNode; route: string; blockName: string }[] = [];
                      blocks.forEach(block => {
                        block.items.forEach(item => {
                          if (item.label.toLowerCase().includes(s)) {
                            blockResults.push({ ...item, blockName: block.name });
                          }
                        });
                      });
                      if (blockResults.length > 0) {
                        const byBlock: Record<string, typeof blockResults> = {};
                        blockResults.forEach(item => {
                          if (!byBlock[item.blockName]) byBlock[item.blockName] = [];
                          byBlock[item.blockName].push(item);
                        });
                        Object.entries(byBlock).forEach(([blockName, items]) => {
                          results.push({
                            group: `Bloco: ${blockName}`,
                            groupIcon: <Zap className="w-3.5 h-3.5" />,
                            groupColor: '#fbbf24',
                            items: items.map(i => ({ id: i.id, label: i.label, icon: i.icon, route: i.route })),
                          });
                        });
                      }

                      const totalResults = results.reduce((sum, g) => sum + g.items.length, 0);

                      if (totalResults === 0) {
                        return (
                          <div className="py-12 text-center">
                            <Search className="w-8 h-8 text-muted-foreground/30 mx-auto mb-3" />
                            <p className="text-sm text-muted-foreground">Nenhum resultado para "{searchTerm}"</p>
                            <p className="text-xs text-muted-foreground/60 mt-1">Tente buscar por outro termo</p>
                          </div>
                        );
                      }

                      return (
                        <div className="space-y-4">
                          <p className="text-xs text-muted-foreground">{totalResults} resultado{totalResults !== 1 ? 's' : ''} encontrado{totalResults !== 1 ? 's' : ''}</p>
                          {results.map(group => (
                            <div key={group.group}>
                              <div className="flex items-center gap-2 mb-1.5">
                                <div className="w-5 h-5 rounded-md flex items-center justify-center" style={{ backgroundColor: `${group.groupColor}15` }}>
                                  <span style={{ color: group.groupColor }}>{group.groupIcon}</span>
                                </div>
                                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{group.group}</h4>
                                <span className="text-[10px] bg-muted px-1.5 py-0.5 rounded-full text-muted-foreground">{group.items.length}</span>
                              </div>
                              <div className="space-y-0.5">
                                {group.items.map(item => (
                                  <button
                                    key={item.id}
                                    onClick={() => handleNav(item.route)}
                                    className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-primary/10 hover:text-primary transition-colors text-left group"
                                  >
                                    <div className="w-7 h-7 rounded-md bg-muted flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0">
                                      {item.icon}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <span className="text-sm font-medium truncate block">{item.label}</span>
                                      {item.description && <span className="text-[11px] text-muted-foreground truncate block">{item.description}</span>}
                                    </div>
                                    <ChevronRight className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                                  </button>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      );
                    })()}
                  </div>
                ) : (
                  /* ── Default blocks view ── */
                  <>
                    {(() => {
                      const visibleModules = MODULES.filter(m => deptIds.includes(m.id));
                      return visibleModules.length > 0 ? (
                        <div className="p-4 border-b border-border">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Departamentos</h4>
                            <div className="flex items-center gap-1">
                              <button onClick={() => handleNav('/hub/modulos')} className="text-xs text-primary hover:underline">Ver todos</button>
                              <div className="relative">
                                <button
                                  onClick={() => setDeptContextMenu(!deptContextMenu)}
                                  className="p-1 rounded-md hover:bg-muted transition-colors"
                                >
                                  <MoreVertical className="w-3.5 h-3.5 text-muted-foreground" />
                                </button>
                                {deptContextMenu && (
                                  <DeptContextMenu
                                    onClose={() => setDeptContextMenu(false)}
                                    onCustomize={() => { setDeptContextMenu(false); setDeptCustomizeOpen(true); }}
                                  />
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="grid grid-cols-4 gap-1">
                            {visibleModules.map(mod => (
                              <button
                                key={mod.id}
                                onClick={() => handleNav(mod.route)}
                                className="flex flex-col items-center gap-1.5 py-2.5 px-1 rounded-xl hover:bg-muted/60 transition-colors text-center group"
                              >
                                <div
                                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all group-hover:scale-105 group-hover:shadow-sm"
                                  style={{ backgroundColor: `${mod.color}12` }}
                                >
                                  <mod.Icon className="w-5 h-5" style={{ color: mod.color }} />
                                </div>
                                <span className="text-[11px] text-muted-foreground leading-tight group-hover:text-foreground transition-colors">{mod.label}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      ) : null;
                    })()}

                    {/* Customizable blocks */}
                    <div className="p-4">
                      <div className="grid grid-cols-2 gap-3">
                        {blocks.map((block, idx) => {
                          const isLastAlone = idx === blocks.length - 1 && blocks.length % 2 !== 0;
                          const isExpanded = expandedBlocks.has(block.id);
                          const maxItems = isLastAlone ? 8 : 4;
                          const visibleItems = isExpanded ? block.items : block.items.slice(0, maxItems);
                          const hasMore = block.items.length > maxItems;
                          return (
                            <div key={block.id} className={`relative bg-muted/30 border border-border rounded-xl overflow-hidden hover:border-primary/20 transition-colors ${isLastAlone ? 'col-span-2' : ''}`}>
                              <div className="flex items-center justify-between px-3 py-2 border-b border-border/50">
                                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{block.name}</h4>
                                <div className="relative">
                                  <button
                                    onClick={() => setContextMenuBlockId(contextMenuBlockId === block.id ? null : block.id)}
                                    className="p-1 rounded-md hover:bg-muted transition-colors"
                                  >
                                    <MoreVertical className="w-3.5 h-3.5 text-muted-foreground" />
                                  </button>
                                  {contextMenuBlockId === block.id && (
                                    <BlockContextMenu
                                      block={block}
                                      onRename={() => setRenameBlockId(block.id)}
                                      onCustomize={() => setCustomizeBlockId(block.id)}
                                      onDelete={() => handleDeleteBlock(block.id)}
                                      onClose={() => setContextMenuBlockId(null)}
                                    />
                                  )}
                                </div>
                              </div>
                              <div className="relative">
                                <div className={`p-2 ${isLastAlone ? 'grid grid-cols-2 gap-0.5' : 'space-y-0.5'}`}>
                                  {visibleItems.map(item => (
                                    <button
                                      key={item.id}
                                      onClick={() => handleNav(item.route)}
                                      className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-card transition-colors text-left group"
                                    >
                                      <div className="w-6 h-6 rounded-md bg-card border border-border flex items-center justify-center text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0">
                                        {item.icon}
                                      </div>
                                      <span className="text-xs font-medium truncate">{item.label}</span>
                                    </button>
                                  ))}
                                  {block.items.length === 0 && (
                                    <p className="text-[11px] text-muted-foreground py-2 text-center">Vazio. Use ⋮ para adicionar.</p>
                                  )}
                                </div>
                                {hasMore && !isExpanded && (
                                  <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-muted/30 to-transparent flex items-end justify-center pb-1.5">
                                    <button
                                      onClick={() => toggleExpanded(block.id)}
                                      className="text-[11px] font-medium text-primary hover:underline"
                                    >
                                      +{block.items.length - 4} mais
                                    </button>
                                  </div>
                                )}
                                {hasMore && isExpanded && (
                                  <div className="px-2 pb-2">
                                    <button
                                      onClick={() => toggleExpanded(block.id)}
                                      className="text-[11px] font-medium text-primary hover:underline"
                                    >
                                      Mostrar menos
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Add new block */}
                      <div className="mt-3">
                        {addBlockMode ? (
                          <AddBlockInline onSave={handleAddBlock} onCancel={() => setAddBlockMode(false)} />
                        ) : (
                          <button
                            onClick={() => setAddBlockMode(true)}
                            className="w-full flex items-center justify-center gap-2 py-2.5 border border-dashed border-border rounded-xl text-sm text-muted-foreground hover:text-foreground hover:border-primary/30 hover:bg-primary/5 transition-all"
                          >
                            <Plus className="w-4 h-4" />
                            Adicionar bloco
                          </button>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </>
            )}

            {/* === SETTINGS TAB === */}
            {activeTab === 'settings' && (
              <div>
                <div className="p-2">
                  {settingsStack.length === 0 ? (
                    settingsSearch ? (
                      <div className="space-y-1">
                        {SETTINGS_CATEGORIES.filter(cat =>
                          cat.items.some(item =>
                            item.label.toLowerCase().includes(settingsSearch.toLowerCase()) ||
                            item.description.toLowerCase().includes(settingsSearch.toLowerCase())
                          )
                        ).map(cat => {
                          const Icon = cat.Icon;
                          const filteredItems = cat.items.filter(item =>
                            item.label.toLowerCase().includes(settingsSearch.toLowerCase()) ||
                            item.description.toLowerCase().includes(settingsSearch.toLowerCase())
                          );
                          return (
                            <div key={cat.id}>
                              <div className="flex items-center gap-2 px-3 py-2">
                                <div className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${cat.color}15` }}>
                                  <Icon className="w-3.5 h-3.5" style={{ color: cat.color }} />
                                </div>
                                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{cat.label}</span>
                              </div>
                              {filteredItems.map(item => (
                                <div key={item.id} className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-muted transition-colors group">
                                  <div className="w-2 h-2 rounded-full flex-shrink-0 ml-1" style={{ backgroundColor: cat.color }} />
                                  <span className="text-sm flex-1">{item.label}</span>
                                  <div className="relative">
                                    <button
                                      onMouseEnter={() => setHoveredInfo(item.id)}
                                      onMouseLeave={() => setHoveredInfo(null)}
                                      className="p-1 rounded-full hover:bg-muted-foreground/10 transition-colors"
                                    >
                                      <Info className="w-4 h-4 text-muted-foreground/50" />
                                    </button>
                                    {hoveredInfo === item.id && (
                                      <div className="absolute right-0 top-full mt-1 w-56 p-2.5 bg-foreground text-background text-xs rounded-lg shadow-xl z-50">
                                        {item.description}
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          );
                        })}
                        {SETTINGS_CATEGORIES.filter(cat =>
                          cat.items.some(item =>
                            item.label.toLowerCase().includes(settingsSearch.toLowerCase()) ||
                            item.description.toLowerCase().includes(settingsSearch.toLowerCase())
                          )
                        ).length === 0 && (
                          <div className="py-8 text-center text-muted-foreground text-sm">
                            Nenhuma configuração encontrada
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-0.5">
                        {SETTINGS_CATEGORIES.map(cat => {
                          const Icon = cat.Icon;
                          return (
                            <button
                              key={cat.id}
                              onClick={() => openCategory(cat.id)}
                              className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-muted transition-colors text-left group"
                            >
                              <div
                                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105"
                                style={{ backgroundColor: `${cat.color}15`, border: `1px solid ${cat.color}30` }}
                              >
                                <Icon className="w-5 h-5" style={{ color: cat.color }} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium">{cat.label}</p>
                                <p className="text-[11px] text-muted-foreground">{cat.items.length} itens</p>
                              </div>
                              <ChevronRight className="w-4 h-4 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
                            </button>
                          );
                        })}
                      </div>
                    )
                  ) : (
                    <div className="space-y-0.5">
                      {currentCategory?.items.map(item => (
                        <div key={item.id} className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-muted transition-colors group">
                          <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: currentCategory.color }} />
                          <span className="text-sm flex-1">{item.label}</span>
                          <div className="relative">
                            <button
                              onMouseEnter={() => setHoveredInfo(item.id)}
                              onMouseLeave={() => setHoveredInfo(null)}
                              className="p-1 rounded-full hover:bg-muted-foreground/10 transition-colors"
                            >
                              <Info className="w-4 h-4 text-muted-foreground/50" />
                            </button>
                            {hoveredInfo === item.id && (
                              <div className="absolute right-0 top-full mt-1 w-56 p-2.5 bg-foreground text-background text-xs rounded-lg shadow-xl z-50">
                                {item.description}
                              </div>
                            )}
                          </div>
                          <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>

    {/* Department customize overlay */}
    {deptCustomizeOpen && (
      <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setDeptCustomizeOpen(false)}>
        <div className="bg-card border border-border rounded-2xl w-full max-w-lg h-[80vh] shadow-2xl overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
          <DeptCustomizePanel
            visibleIds={deptIds}
            onSave={(ids) => { setDeptIds(ids); saveDeptIds(ids); setDeptCustomizeOpen(false); }}
            onBack={() => setDeptCustomizeOpen(false)}
          />
        </div>
      </div>
    )}

    {/* Customize panel overlay */}
    {customizeBlock && (
      <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setCustomizeBlockId(null)}>
        <div className="bg-card border border-border rounded-2xl w-full max-w-lg h-[80vh] shadow-2xl overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
          <CustomizePanel
            block={customizeBlock}
            onSave={(items) => handleCustomizeSave(customizeBlock.id, items)}
            onBack={() => setCustomizeBlockId(null)}
          />
        </div>
      </div>
    )}

    {/* Rename dialog */}
    {renameBlock && (
      <RenameDialog
        currentName={renameBlock.name}
        onSave={(name) => handleRename(renameBlock.id, name)}
        onClose={() => setRenameBlockId(null)}
      />
    )}
    </>
  );
}

// ── Inline add block ──────────────────────────────────────────────────────
function AddBlockInline({ onSave, onCancel }: { onSave: (name: string) => void; onCancel: () => void }) {
  const [name, setName] = useState('');
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => { ref.current?.focus(); }, []);

  return (
    <div className="flex items-center gap-2 p-2 border border-primary/30 bg-primary/5 rounded-xl">
      <input
        ref={ref}
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        onKeyDown={e => { if (e.key === 'Enter' && name.trim()) onSave(name.trim()); if (e.key === 'Escape') onCancel(); }}
        placeholder="Nome do novo bloco..."
        className="flex-1 px-3 py-1.5 bg-background border border-border rounded-lg text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
      />
      <button
        onClick={() => { if (name.trim()) onSave(name.trim()); }}
        disabled={!name.trim()}
        className="px-3 py-1.5 text-xs font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
      >
        Criar
      </button>
      <button onClick={onCancel} className="p-1.5 text-muted-foreground hover:text-foreground transition-colors">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
