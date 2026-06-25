import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { BookOpen, Home, List, HelpCircle, Users, Tag, BarChart3 } from 'lucide-react';
import { GenericModuleSidebar } from '../../components/GenericModuleSidebar';
import { useTabNavigation } from '../../components/TabNavigationContext';
import { TabNavigation } from '../../components/TabNavigation';
import { QuickAccessMenu } from '../../components/QuickAccessMenu';

const navItems = [
  { to: '/modulo/cursos/dashboard', label: 'Dashboard', icon: Home },
  { to: '/modulo/cursos/atividades', label: 'Atividades (Cursos)', icon: List },
  { to: '/modulo/cursos/banco-questoes', label: 'Banco de Questões', icon: HelpCircle },
  { to: '/modulo/cursos/inscricoes', label: 'Inscrições', icon: Users },
  { to: '/modulo/cursos/categorias', label: 'Categorias', icon: Tag },
  { to: '/modulo/cursos/relatorios', label: 'Relatórios', icon: BarChart3 },
];

const routeTitles: Record<string, string> = {
  '/modulo/cursos/dashboard': 'Dashboard',
  '/modulo/cursos/atividades': 'Atividades',
  '/modulo/cursos/banco-questoes': 'Banco de Questões',
  '/modulo/cursos/inscricoes': 'Inscrições',
  '/modulo/cursos/categorias': 'Categorias',
  '/modulo/cursos/relatorios': 'Relatórios',
};

interface CursosModuleProps { onLogout: () => void; }

export function CursosModule({ onLogout }: CursosModuleProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { tabs, activeTabId, addTab, removeTab, setActiveTab } = useTabNavigation();

  useEffect(() => {
    const path = location.pathname;
    addTab({ id: path, title: routeTitles[path] || 'Página', path, module: 'cursos' });
  }, [location.pathname]);

  const handleTabClick = (tabId: string) => { setActiveTab(tabId); navigate(tabId); };
  const handleTabClose = (e: React.MouseEvent, tabId: string) => {
    e.stopPropagation(); removeTab(tabId);
    const remaining = tabs.filter(t => t.id !== tabId);
    if (remaining.length > 0 && activeTabId === tabId) navigate(remaining[remaining.length - 1].path);
  };

  return (
    <div className="flex h-screen bg-background">
      <GenericModuleSidebar title="Cursos" subtitle="Gestão Educacional" headerIcon={BookOpen} navItems={navItems} onLogout={onLogout} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex items-center border-b border-border bg-card">
          <div className="flex-1 min-w-0">
            <TabNavigation tabs={tabs} activeTabId={activeTabId || ''} onTabClick={handleTabClick} onTabClose={handleTabClose} />
          </div>
          <div className="px-4 py-2 border-l border-border flex-shrink-0">
            <QuickAccessMenu currentModule="cursos" />
          </div>
        </div>
        <main className="flex-1 overflow-y-auto"><Outlet /></main>
      </div>
    </div>
  );
}
