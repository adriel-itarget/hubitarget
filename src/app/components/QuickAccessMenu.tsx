import { useState, useRef, useEffect, useCallback } from 'react';
import { Search, Users, Calendar, DollarSign, FileText, Settings, BarChart3, Building2, Tags, CreditCard, UserPlus, FileCheck, Briefcase, X, Zap, ClipboardList, BookOpen, Gift, LayoutGrid, Package, ChevronRight, ChevronLeft, Lock, Monitor, Languages, MessageSquare, Upload, ToggleRight, Vote, Layers, Info, FlaskConical, Store, Megaphone, UserCheck } from 'lucide-react';
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

const MODULES = [
  { id: 'associacao',           label: 'Associação',             description: 'Gestão de membros e carteirinhas',      Icon: Users,         color: '#60a5fa', route: '/modulo/associacao/dashboard' },
  { id: 'financeiro',           label: 'Financeiro',             description: 'Receitas, despesas e cobranças',        Icon: DollarSign,    color: '#34d399', route: '/modulo/financeiro/dashboard' },
  { id: 'exames',               label: 'Exames',                 description: 'Certificações e avaliações',            Icon: ClipboardList,color: '#fb923c', route: '/modulo/exames/dashboard' },
  { id: 'cursos',               label: 'Cursos/EAD',             description: 'Educação e banco de questões',          Icon: BookOpen,      color: '#a78bfa', route: '/modulo/cursos/dashboard' },
  { id: 'servicos-residencias', label: 'Serviços e Residências', description: 'Especializações e programas',            Icon: Building2,     color: '#2dd4bf', route: '' },
  { id: 'inscricoes',           label: 'Inscrições',             description: 'Eventos e atividades',                   Icon: UserCheck,     color: '#f472b6', route: '' },
  { id: 'trabalhos-cientificos',label: 'Trabalhos Científicos',  description: 'Artigos e publicações',                 Icon: FileText,      color: '#fbbf24', route: '' },
  { id: 'programacao-cientifica',label:'Programação Científica', description: 'Palestras e sessões',                    Icon: FlaskConical,  color: '#22d3ee', route: '' },
  { id: 'feira-comercial',      label: 'Feira Comercial',        description: 'Expositores e estandes',                Icon: Store,         color: '#f87171', route: '' },
  { id: 'marketing',            label: 'Marketing',              description: 'Aplicativo e newsletter',               Icon: Megaphone,     color: '#fb7193', route: '' },
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
      { id: 'usuarios', label: 'Gerenciar Usuários', description: 'Adicionar, editar e remover usuários do sistema' },
      { id: 'grupos', label: 'Grupos de acesso', description: 'Organizar usuários em grupos com permissões' },
      { id: 'permissoes', label: 'Permissões do Sistema', description: 'Controle de acesso a funcionalidades' },
    ]
  },
  {
    id: 'sistema', label: 'Sistema', Icon: Monitor, color: '#34d399',
    items: [
      { id: 'menus', label: 'Menus', description: 'Personalizar menus de navegação' },
      { id: 'config', label: 'Configurações', description: 'Configurações gerais do sistema' },
      { id: 'config-novos', label: 'Configurações Novos', description: 'Configurações para novos usuários' },
      { id: 'campos-form', label: 'Campos Form', description: 'Gerenciar campos de formulários' },
      { id: 'logos', label: 'Logos', description: 'Gerenciar logotipos da plataforma' },
      { id: 'notificacoes', label: 'Notificações', description: 'Configurar alertas e notificações' },
      { id: 'idioma', label: 'Idioma', description: 'Alterar idioma do sistema' },
      { id: 'traducao', label: 'Tradução', description: 'Gerenciar traduções de textos' },
      { id: 'traducao-centro-custo', label: 'Tradução centro de custo', description: 'Traduzir termos de centros de custo' },
      { id: 'mensagens', label: 'Mensagens do Sistema', description: 'Gerenciar mensagens automáticas' },
    ]
  },
  {
    id: 'documentos', label: 'Documentos', Icon: FileText, color: '#818cf8',
    items: [
      { id: 'modelos', label: 'Modelos de Documentos', description: 'Criar e editar templates de documentos' },
      { id: 'config-associese', label: 'Configuração de Documento Associe-se', description: 'Configurar documentos do cadastro' },
      { id: 'tipos-associese', label: 'Tipos de Documento Associe-se', description: 'Definir tipos de documentos aceitos' },
      { id: 'config-especialidades', label: 'Configurações Especialidades', description: 'Gerenciar especialidades médicas' },
      { id: 'config-esp-docs', label: 'Configuração Especialidades Documentos', description: 'Vincular documentos a especialidades' },
    ]
  },
  {
    id: 'forms', label: 'Forms', Icon: ClipboardList, color: '#a78bfa',
    items: [
      { id: 'formularios', label: 'Formulários', description: 'Criar e gerenciar formulários' },
      { id: 'perguntas', label: 'Perguntas', description: 'Banco de perguntas para formulários' },
      { id: 'respostas', label: 'Respostas', description: 'Gerenciar respostas padronizadas' },
    ]
  },
  {
    id: 'relatorios', label: 'Relatórios', Icon: BarChart3, color: '#fbbf24',
    items: [
      { id: 'abas', label: 'Abas dos relatórios', description: 'Organizar relatórios em abas' },
      { id: 'campos-exibidos', label: 'Campos exibidos dos relatórios', description: 'Selecionar campos para exibição' },
      { id: 'config-campos', label: 'Configurador dos Campos', description: 'Personalizar campos de relatórios' },
      { id: 'indicadores', label: 'Indicadores', description: 'Configurar KPIs e métricas' },
    ]
  },
  {
    id: 'geral', label: 'Geral', Icon: Layers, color: '#94a3b8',
    items: [
      { id: 'importacao-excel', label: 'Importação Excel', description: 'Importar dados via planilhas' },
      { id: 'config-status', label: 'Configuração Status', description: 'Definir status personalizados' },
      { id: 'votantes', label: 'Inserir votantes eleições', description: 'Gerenciar eleitores para votações' },
    ]
  },
];

export function QuickAccessMenu({ currentModule }: QuickAccessMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'quick' | 'settings'>('quick');
  const [searchTerm, setSearchTerm] = useState('');
  const [settingsSearch, setSettingsSearch] = useState('');
  const [settingsStack, setSettingsStack] = useState<string[]>([]);
  const [hoveredInfo, setHoveredInfo] = useState<string | null>(null);
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
      setSettingsSearch('');
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
              <div>
                {/* iOS-style search bar */}
                {settingsStack.length === 0 && (
                  <div className="px-4 pt-3 pb-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder="Configurações"
                        value={settingsSearch}
                        onChange={e => setSettingsSearch(e.target.value)}
                        className="w-full pl-9 pr-4 py-2.5 bg-muted/60 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all placeholder:text-muted-foreground/60"
                      />
                      {settingsSearch && (
                        <button
                          onClick={() => setSettingsSearch('')}
                          className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-muted-foreground/20 flex items-center justify-center hover:bg-muted-foreground/30 transition-colors"
                        >
                          <X className="w-3 h-3 text-muted-foreground" />
                        </button>
                      )}
                    </div>
                  </div>
                )}

                <div className="p-2">
                  {settingsStack.length === 0 ? (
                    /* Root: categories list */
                    settingsSearch ? (
                      /* Search results */
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
                                <div
                                  className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0"
                                  style={{ backgroundColor: `${cat.color}15` }}
                                >
                                  <Icon className="w-3.5 h-3.5" style={{ color: cat.color }} />
                                </div>
                                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{cat.label}</span>
                              </div>
                              {filteredItems.map(item => (
                                <div
                                  key={item.id}
                                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-muted transition-colors group"
                                >
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
                      /* Categories grid */
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
                    /* Sub-level: items list */
                    <div className="space-y-0.5">
                      {currentCategory?.items.map(item => (
                        <div
                          key={item.id}
                          className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-muted transition-colors group"
                        >
                          <div
                            className="w-2 h-2 rounded-full flex-shrink-0"
                            style={{ backgroundColor: currentCategory.color }}
                          />
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
    </>
  );
}
