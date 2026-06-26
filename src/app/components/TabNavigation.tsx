import { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, X, Users, DollarSign, ClipboardList, BookOpen, Gift, Calendar, LayoutGrid, Layers, Columns3 } from 'lucide-react';
import { useTabNavigation } from './TabNavigationContext';

interface Tab {
  id: string;
  title: string;
  path: string;
  module?: string;
}

interface TabNavigationProps {
  tabs: Tab[];
  activeTabId: string;
  onTabClick: (tabId: string) => void;
  onTabClose: (e: React.MouseEvent, tabId: string) => void;
}

const MODULE_COLORS: Record<string, string> = {
  associacao: '#60a5fa',
  financeiro: '#34d399',
  exames:     '#818cf8',
  cursos:     '#a78bfa',
  cashback:   '#fbbf24',
  eventos:    '#fb7185',
  hub:        '#94a3b8',
};

const MODULE_LABELS: Record<string, string> = {
  associacao: 'Associação',
  financeiro: 'Financeiro',
  exames:     'Exames',
  cursos:     'Cursos',
  cashback:   'Cashback',
  eventos:    'Eventos',
  hub:        'Hub',
};

const MODULE_ICONS: Record<string, React.ComponentType<{ className?: string; style?: React.CSSProperties }>> = {
  associacao: Users,
  financeiro: DollarSign,
  exames:     ClipboardList,
  cursos:     BookOpen,
  cashback:   Gift,
  eventos:    Calendar,
  hub:        LayoutGrid,
};

export function TabNavigation({ tabs, activeTabId, onTabClick, onTabClose }: TabNavigationProps) {
  const navigate = useNavigate();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const prevTabCountRef = useRef(tabs.length);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);
  const { clearTabs } = useTabNavigation();

  // Context menu state
  const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);
  const contextMenuRef = useRef<HTMLDivElement>(null);

  // Grouping state
  const [groupByModule, setGroupByModule] = useState(false);
  const [selectedModule, setSelectedModule] = useState<string>('all');

  const getTabContentLeft = useCallback((tabEl: HTMLElement): number => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return 0;
    return tabEl.offsetLeft;
  }, []);

  const scrollToTab = useCallback((tabId: string, behavior: ScrollBehavior = 'smooth') => {
    const container = scrollContainerRef.current;
    const tabEl = tabRefs.current.get(tabId);
    if (!container || !tabEl) return;

    const contentLeft = getTabContentLeft(tabEl);
    const contentRight = contentLeft + tabEl.offsetWidth;
    const viewLeft = container.scrollLeft;
    const viewRight = viewLeft + container.clientWidth;

    if (contentLeft >= viewLeft && contentRight <= viewRight) return;

    const target = contentLeft - container.clientWidth / 2 + tabEl.offsetWidth / 2;
    container.scrollTo({ left: Math.max(0, target), behavior });
  }, [getTabContentLeft]);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 5);
    }
  };

  useEffect(() => {
    checkScroll();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScroll);
      window.addEventListener('resize', checkScroll);
      return () => {
        container.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, [tabs]);

  useEffect(() => {
    const prevCount = prevTabCountRef.current;
    prevTabCountRef.current = tabs.length;
    if (tabs.length > prevCount && tabs.length > 0) {
      requestAnimationFrame(() => {
        scrollToTab(tabs[tabs.length - 1].id, 'smooth');
      });
    }
  }, [tabs.length, scrollToTab, tabs]);

  useEffect(() => {
    if (activeTabId) {
      requestAnimationFrame(() => {
        scrollToTab(activeTabId, 'smooth');
      });
    }
  }, [activeTabId, scrollToTab]);

  // Close context menu on outside click
  useEffect(() => {
    if (!contextMenu) return;
    const handler = (e: MouseEvent) => {
      if (contextMenuRef.current && !contextMenuRef.current.contains(e.target as Node)) {
        setContextMenu(null);
      }
    };
    // Use setTimeout to avoid closing on the same mousedown that opened the menu
    const timer = setTimeout(() => {
      document.addEventListener('mousedown', handler);
    }, 0);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousedown', handler);
    };
  }, [contextMenu]);

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const tabsArr = Array.from(tabRefs.current.values());
    if (direction === 'right') {
      for (const el of tabsArr) {
        if (el.offsetLeft + el.offsetWidth > container.scrollLeft + container.clientWidth) {
          container.scrollTo({ left: el.offsetLeft - 16, behavior: 'smooth' });
          return;
        }
      }
    } else {
      for (let i = tabsArr.length - 1; i >= 0; i--) {
        if (tabsArr[i].offsetLeft < container.scrollLeft) {
          container.scrollTo({ left: tabsArr[i].offsetLeft - 16, behavior: 'smooth' });
          return;
        }
      }
    }
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  const handleCloseAll = () => {
    setContextMenu(null);
    clearTabs();
    navigate('/hub/modulos');
  };

  const handleToggleGrouping = () => {
    setGroupByModule(prev => !prev);
    if (groupByModule) setSelectedModule('all');
    setContextMenu(null);
  };

  // Get unique modules from open tabs
  const availableModules = Array.from(new Set(tabs.map(t => t.module).filter(Boolean))) as string[];

  // Filter tabs by selected module
  const filteredTabs = groupByModule && selectedModule !== 'all'
    ? tabs.filter(t => t.module === selectedModule)
    : tabs;

  if (tabs.length === 0) return null;

  return (
    <div className="relative bg-card">
      {/* Context menu */}
      {contextMenu && (
        <div
          ref={contextMenuRef}
          className="fixed z-50 w-52 bg-card border border-border rounded-xl shadow-xl overflow-hidden"
          style={{ left: contextMenu.x, top: contextMenu.y }}
        >
          <button
            onClick={handleCloseAll}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 hover:bg-destructive/10 transition-colors text-left text-sm text-destructive"
          >
            <X className="w-4 h-4" />
            Fechar todas
          </button>
          <div className="border-t border-border">
            <button
              onClick={handleToggleGrouping}
              className="w-full flex items-center gap-2.5 px-3 py-2.5 hover:bg-muted transition-colors text-left text-sm"
            >
              {groupByModule ? <Columns3 className="w-4 h-4 text-muted-foreground" /> : <Layers className="w-4 h-4 text-muted-foreground" />}
              {groupByModule ? 'Desagrupar abas' : 'Exibir agrupamento'}
            </button>
          </div>
        </div>
      )}

      {/* Module filter chips - only when grouping is active */}
      {groupByModule && availableModules.length > 1 && (
        <div className="flex items-center gap-1.5 px-3 py-1.5 border-b border-border/50">
          <button
            onClick={() => setSelectedModule('all')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
              selectedModule === 'all'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80'
            }`}
          >
            Todas
            <span className={`text-[10px] px-1 py-0 rounded-full ${selectedModule === 'all' ? 'bg-primary-foreground/20' : 'bg-foreground/10'}`}>
              {tabs.length}
            </span>
          </button>
          {availableModules.map(mod => {
            const color = MODULE_COLORS[mod] || '#94a3b8';
            const label = MODULE_LABELS[mod] || mod;
            const Icon = MODULE_ICONS[mod];
            const count = tabs.filter(t => t.module === mod).length;
            return (
              <button
                key={mod}
                onClick={() => setSelectedModule(mod)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                  selectedModule === mod
                    ? 'text-white'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                style={{
                  backgroundColor: selectedModule === mod ? color : `${color}15`,
                  color: selectedModule === mod ? '#fff' : undefined,
                }}
              >
                {Icon && <Icon className="w-3 h-3" style={{ color: selectedModule === mod ? '#fff' : color }} />}
                {label}
                <span
                  className="text-[10px] px-1 py-0 rounded-full"
                  style={{
                    backgroundColor: selectedModule === mod ? 'rgba(255,255,255,0.2)' : `${color}20`,
                  }}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* Tab bar */}
      <div className="relative" onContextMenu={handleContextMenu}>
        {showLeftArrow && (
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-0 bottom-0 z-10 bg-gradient-to-r from-card to-transparent pl-2 pr-4 flex items-center hover:from-muted transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}

        <div
          ref={scrollContainerRef}
          className="overflow-x-auto px-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div ref={wrapperRef} className="flex items-center gap-0.5 min-w-max" style={{ position: 'relative' }}>
            {filteredTabs.map(tab => {
              const isActive = activeTabId === tab.id;
              const color = tab.module ? MODULE_COLORS[tab.module] : null;
              const Icon = tab.module ? MODULE_ICONS[tab.module] : null;

              return (
                <div
                  key={tab.id}
                  ref={(el) => { if (el) tabRefs.current.set(tab.id, el); }}
                  onClick={() => { scrollToTab(tab.id); onTabClick(tab.id); }}
                  className={`group flex items-center gap-2 px-3 py-3 text-sm transition-colors border-b-2 whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'border-primary text-primary'
                      : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                  }`}
                >
                  {Icon && color && (
                    <div
                      className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${color}22`, border: `1px solid ${color}44` }}
                    >
                      <Icon className="w-3 h-3" style={{ color }} />
                    </div>
                  )}
                  <span className="font-medium">{tab.title}</span>
                  {tabs.length > 1 && (
                    <button
                      onClick={(e) => onTabClose(e, tab.id)}
                      className="ml-0.5 p-0.5 rounded hover:bg-muted transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
              );
            })}
            {groupByModule && filteredTabs.length === 0 && (
              <div className="px-4 py-3 text-sm text-muted-foreground">
                Nenhuma aba neste departamento
              </div>
            )}
          </div>
        </div>

        {showRightArrow && (
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-0 bottom-0 z-10 bg-gradient-to-l from-card to-transparent pr-2 pl-4 flex items-center hover:from-muted transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
