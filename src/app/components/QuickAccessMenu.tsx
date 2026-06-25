import { useState, useRef, useEffect, useCallback } from 'react';
import { Grid3x3, Search, Users, Calendar, DollarSign, FileText, Settings, BarChart3, Building2, Tags, CreditCard, UserPlus, FileCheck, Briefcase, X, Zap, ClipboardList, BookOpen, Gift, LayoutGrid, Package, ChevronRight, ChevronLeft, Lock, Monitor, Languages, MessageSquare, Upload, ToggleRight, Vote, Layers } from 'lucide-react';
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

const SETTINGS_CATEGORIES = [
  {
    id: 'acesso', label: 'Acesso', Icon: Lock, color: '#60a5fa',
    items: [
      { id: 'usuarios', label: 'Gerenciar Usuários' },
      { id: 'grupos', label: 'Grupos de acesso' },
      { id: 'permissoes', label: 'Permissões do Sistema' },
    ]
  },
  {
    id: 'sistema', label: 'Sistema', Icon: Monitor, color: '#34d399',
    items: [
      { id: 'menus', label: 'Menus' },
      { id: 'config', label: 'Configurações' },
      { id: 'config-novos', label: 'Configurações Novos' },
      { id: 'campos-form', label: 'Campos Form' },
      { id: 'logos', label: 'Logos' },
      { id: 'notificacoes', label: 'Notificações' },
      { id: 'idioma', label: 'Idioma' },
      { id: 'traducao', label: 'Tradução' },
      { id: 'traducao-centro-custo', label: 'Tradução centro de custo' },
      { id: 'mensagens', label: 'Mensagens do Sistema' },
    ]
  },
  {
    id: 'documentos', label: 'Documentos', Icon: FileText, color: '#818cf8',
    items: [
      { id: 'modelos', label: 'Modelos de Documentos' },
      { id: 'config-associese', label: 'Configuração de Documento Associe-se' },
      { id: 'tipos-associese', label: 'Tipos de Documento Associe-se' },
      { id: 'config-especialidades', label: 'Configurações Especialidades' },
      { id: 'config-esp-docs', label: 'Configuração Especialidades Documentos' },
    ]
  },
  {
    id: 'forms', label: 'Forms', Icon: ClipboardList, color: '#a78bfa',
    items: [
      { id: 'formularios', label: 'Formulários' },
      { id: 'perguntas', label: 'Perguntas' },
      { id: 'respostas', label: 'Respostas' },
    ]
  },
  {
    id: 'relatorios', label: 'Relatórios', Icon: BarChart3, color: '#fbbf24',
    items: [
      { id: 'abas', label: 'Abas dos relatórios' },
      { id: 'campos-exibidos', label: 'Campos exibidos dos relatórios' },
      { id: 'config-campos', label: 'Configurador dos Campos' },
      { id: 'indicadores', label: 'Indicadores' },
    ]
  },
  {
    id: 'geral', label: 'Geral', Icon: Layers, color: '#94a3b8',
    items: [
      { id: 'importacao-excel', label: 'Importação Excel' },
      { id: 'config-status', label: 'Configuração Status' },
      { id: 'votantes', label: 'Inserir votantes eleições' },
    ]
  },
];

export function QuickAccessMenu({ currentModule }: QuickAccessMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'quick' | 'settings'>('quick');
  const [searchTerm, setSearchTerm] = useState('');
  const [settingsStack, setSettingsStack] = useState<string[]>([]);
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

  const openCategory = useCallback((categoryId: string) => {
    setSettingsStack(prev => [...prev, categoryId]);
  }, []);

  const goBack = useCallback(() => {
    setSettingsStack(prev => prev.slice(0, -1));
  }, []);

  const resetSettings = useCallback(() => {
    setSettingsStack([]);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setSearchTerm('');
      setSettingsStack([]);
    }
  }, [isOpen]);

  const currentCategoryId = settingsStack[settingsStack.length - 1] || null;
  const currentCategory = currentCategoryId
    ? SETTINGS_CATEGORIES.find(c => c.id === currentCategoryId)
    : null;

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

            {/* Tabs */}
            <div className="flex gap-1 p-1 bg-muted rounded-lg">
              <button
                onClick={() => { setActiveTab('quick'); setSettingsStack([]); }}
                className={`flex-1 flex items-center justify-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                  activeTab === 'quick'
                    ? 'bg-card text-foreground shadow-sm'
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
                    ? 'bg-card text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Settings className="w-4 h-4" />
                Configurações
              </button>
            </div>

            {/* Search */}
            {activeTab === 'quick' && (
              <div className="relative mt-3">
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
            )}
          </div>

          <div className="overflow-y-auto max-h-[calc(80vh-140px)]">

            {/* === QUICK ACCESS TAB === */}
            {activeTab === 'quick' && (
              <>
                {!hasResults && (
                  <div className="py-12 text-center text-muted-foreground text-sm">
                    Nenhum resultado para "<span className="text-foreground">{searchTerm}</span>"
                  </div>
                )}

                {filteredModules.length > 0 && (
                  <div className="p-4 border-b border-border">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Departamentos</h4>
                      <button onClick={() => handleNav('/hub/modulos')} className="text-xs text-primary hover:underline">Ver todos</button>
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
              </>
            )}

            {/* === SETTINGS TAB === */}
            {activeTab === 'settings' && (
              <div className="p-2">
                {settingsStack.length === 0 ? (
                  /* Root: categories list */
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
                ) : (
                  /* Sub-level: items list */
                  <div className="space-y-0.5">
                    {currentCategory?.items.map(item => (
                      <button
                        key={item.id}
                        className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-muted transition-colors text-left group"
                      >
                        <div
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ backgroundColor: currentCategory.color }}
                        />
                        <span className="text-sm flex-1">{item.label}</span>
                        <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
