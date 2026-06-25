import { useState, useRef, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, X, Users, DollarSign, ClipboardList, BookOpen, Gift, Calendar, LayoutGrid } from 'lucide-react';

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
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  const scrollToTab = useCallback((tabId: string, behavior: ScrollBehavior = 'smooth') => {
    const container = scrollContainerRef.current;
    const tabEl = tabRefs.current.get(tabId);
    if (container && tabEl) {
      const containerRect = container.getBoundingClientRect();
      const tabRect = tabEl.getBoundingClientRect();
      const isFullyVisible = tabRect.left >= containerRect.left && tabRect.right <= containerRect.right;
      if (!isFullyVisible) {
        const offset = tabEl.offsetLeft - container.offsetLeft - container.clientWidth / 2 + tabEl.clientWidth / 2;
        container.scrollTo({ left: Math.max(0, offset), behavior });
      }
    }
  }, []);

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
    if (tabs.length > 0) {
      requestAnimationFrame(() => {
        scrollToTab(tabs[tabs.length - 1].id, 'smooth');
      });
    }
  }, [tabs.length, scrollToTab]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const tabsArr = Array.from(tabRefs.current.keys());
      const currentIndex = tabsArr.findIndex(id => {
        const el = tabRefs.current.get(id);
        if (!el) return false;
        const rect = el.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        return rect.left >= containerRect.left - 10 && rect.left <= containerRect.left + 10;
      });
      if (direction === 'right' && currentIndex < tabsArr.length - 1) {
        scrollToTab(tabsArr[currentIndex + 1]);
      } else if (direction === 'left' && currentIndex > 0) {
        scrollToTab(tabsArr[currentIndex - 1]);
      } else {
        container.scrollBy({ left: direction === 'left' ? -200 : 200, behavior: 'smooth' });
      }
    }
  };

  if (tabs.length === 0) return null;

  return (
    <div className="relative bg-card">
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
        <div className="flex items-center gap-0.5 min-w-max">
          {tabs.map(tab => {
            const isActive = activeTabId === tab.id;
            const color = tab.module ? MODULE_COLORS[tab.module] : null;
            const Icon = tab.module ? MODULE_ICONS[tab.module] : null;

            return (
              <div
                key={tab.id}
                ref={(el) => { if (el) tabRefs.current.set(tab.id, el); }}
                onClick={() => onTabClick(tab.id)}
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
  );
}
