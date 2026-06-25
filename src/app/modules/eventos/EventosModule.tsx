import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Calendar, Home, List, Users, BookOpen, FileText, UserCheck } from 'lucide-react';
import { GenericModuleSidebar } from '../../components/GenericModuleSidebar';
import { useTabNavigation } from '../../components/TabNavigationContext';
import { TabNavigation } from '../../components/TabNavigation';
import { QuickAccessMenu } from '../../components/QuickAccessMenu';

const navItems = [
  { to: '/modulo/eventos/dashboard', label: 'Dashboard', icon: Home },
  { to: '/modulo/eventos/lista', label: 'Eventos', icon: List },
  { to: '/modulo/eventos/inscricoes', label: 'Usuários e Inscrições', icon: Users },
  { to: '/modulo/eventos/programacao', label: 'Programação Científica', icon: BookOpen },
  { to: '/modulo/eventos/trabalhos', label: 'Submissão de Trabalhos', icon: FileText },
  { to: '/modulo/eventos/palestrantes', label: 'Palestrantes', icon: UserCheck },
];

const routeTitles: Record<string, string> = {
  '/modulo/eventos/dashboard': 'Dashboard',
  '/modulo/eventos/lista': 'Eventos',
  '/modulo/eventos/inscricoes': 'Inscrições',
  '/modulo/eventos/programacao': 'Programação Científica',
  '/modulo/eventos/trabalhos': 'Submissão de Trabalhos',
  '/modulo/eventos/palestrantes': 'Palestrantes',
};

interface EventosModuleProps { onLogout: () => void; }

export function EventosModule({ onLogout }: EventosModuleProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { tabs, activeTabId, addTab, removeTab, setActiveTab } = useTabNavigation();

  useEffect(() => {
    const path = location.pathname;
    addTab({ id: path, title: routeTitles[path] || 'Página', path, module: 'eventos' });
  }, [location.pathname]);

  const handleTabClick = (tabId: string) => { setActiveTab(tabId); navigate(tabId); };
  const handleTabClose = (e: React.MouseEvent, tabId: string) => {
    e.stopPropagation(); removeTab(tabId);
    const remaining = tabs.filter(t => t.id !== tabId);
    if (remaining.length > 0 && activeTabId === tabId) navigate(remaining[remaining.length - 1].path);
  };

  return (
    <div className="flex h-screen bg-background">
      <GenericModuleSidebar title="Eventos" subtitle="Gestão de Eventos" headerIcon={Calendar} navItems={navItems} onLogout={onLogout} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex items-center border-b border-border bg-card">
          <div className="flex-1 min-w-0">
            <TabNavigation tabs={tabs} activeTabId={activeTabId || ''} onTabClick={handleTabClick} onTabClose={handleTabClose} />
          </div>
          <div className="px-4 py-2 border-l border-border flex-shrink-0">
            <QuickAccessMenu currentModule="eventos" />
          </div>
        </div>
        <main className="flex-1 overflow-y-auto"><Outlet /></main>
      </div>
    </div>
  );
}
