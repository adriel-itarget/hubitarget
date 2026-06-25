import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ClipboardList, Home, FileText, MapPin, Users, BookOpen, BarChart3 } from 'lucide-react';
import { GenericModuleSidebar } from '../../components/GenericModuleSidebar';
import { useTabNavigation } from '../../components/TabNavigationContext';
import { TabNavigation } from '../../components/TabNavigation';
import { QuickAccessMenu } from '../../components/QuickAccessMenu';

const navItems = [
  { to: '/modulo/exames/dashboard', label: 'Dashboard', icon: Home },
  { to: '/modulo/exames/processos', label: 'Processos', icon: ClipboardList },
  { to: '/modulo/exames/editais', label: 'Editais', icon: FileText },
  { to: '/modulo/exames/locais', label: 'Locais de Prova', icon: MapPin },
  { to: '/modulo/exames/candidatos', label: 'Candidatos', icon: Users },
  { to: '/modulo/exames/relatorios', label: 'Relatórios', icon: BarChart3 },
];

const routeTitles: Record<string, string> = {
  '/modulo/exames/dashboard': 'Dashboard',
  '/modulo/exames/processos': 'Processos',
  '/modulo/exames/editais': 'Editais',
  '/modulo/exames/locais': 'Locais de Prova',
  '/modulo/exames/candidatos': 'Candidatos',
  '/modulo/exames/relatorios': 'Relatórios',
};

interface ExamesModuleProps { onLogout: () => void; }

export function ExamesModule({ onLogout }: ExamesModuleProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { tabs, activeTabId, addTab, removeTab, setActiveTab } = useTabNavigation();

  useEffect(() => {
    const path = location.pathname;
    addTab({ id: path, title: routeTitles[path] || 'Página', path, module: 'exames' });
  }, [location.pathname]);

  const handleTabClick = (tabId: string) => { setActiveTab(tabId); navigate(tabId); };
  const handleTabClose = (e: React.MouseEvent, tabId: string) => {
    e.stopPropagation(); removeTab(tabId);
    const remaining = tabs.filter(t => t.id !== tabId);
    if (remaining.length > 0 && activeTabId === tabId) navigate(remaining[remaining.length - 1].path);
  };

  return (
    <div className="flex h-screen bg-background">
      <GenericModuleSidebar title="Exames e Provas" subtitle="Título de Especialista" headerIcon={ClipboardList} navItems={navItems} onLogout={onLogout} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex items-center border-b border-border bg-card">
          <div className="flex-1 min-w-0">
            <TabNavigation tabs={tabs} activeTabId={activeTabId || ''} onTabClick={handleTabClick} onTabClose={handleTabClose} />
          </div>
          <div className="px-4 py-2 border-l border-border flex-shrink-0">
            <QuickAccessMenu currentModule="exames" />
          </div>
        </div>
        <main className="flex-1 overflow-y-auto"><Outlet /></main>
      </div>
    </div>
  );
}
