import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { useTabNavigation } from './TabNavigationContext';
import { TabNavigation } from './TabNavigation';
import { QuickAccessMenu } from './QuickAccessMenu';

interface HubLayoutProps {
  onLogout: () => void;
}

const routeTitles: Record<string, string> = {
  '/hub/dashboard': 'Dashboard',
  '/hub/modulos': 'Departamentos',
  '/hub/usuarios': 'Usuários e Acesso',
  '/hub/pagamentos': 'Meios de Pagamento',
  '/modulo/associacao/acesso-rapido': 'Acesso Rápido',
  '/modulo/associacao/dashboard': 'Dashboard',
  '/modulo/associacao/pessoas': 'Pessoas e Associados',
  '/modulo/associacao/regras': 'Regras de Associação',
  '/modulo/associacao/diretoria': 'Gestão de Diretoria',
  '/modulo/associacao/aplicativo': 'Gestão do Aplicativo',
  '/modulo/associacao/financeiro': 'Financeiro',
  '/modulo/associacao/relatorios': 'Relatórios',
};

export function HubLayout({ onLogout }: HubLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { tabs, activeTabId, addTab, removeTab, setActiveTab } = useTabNavigation();

  useEffect(() => {
    const path = location.pathname;
    const title = routeTitles[path] || path.split('/').pop() || 'Página';
    const module = path.startsWith('/modulo/') ? path.split('/')[2] : 'hub';

    addTab({
      id: path,
      title,
      path,
      module,
    });
  }, [location.pathname]);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    navigate(tabId);
  };

  const handleTabClose = (e: React.MouseEvent, tabId: string) => {
    e.stopPropagation();
    removeTab(tabId);

    const remainingTabs = tabs.filter(t => t.id !== tabId);
    if (remainingTabs.length > 0 && activeTabId === tabId) {
      const nextTab = remainingTabs[remainingTabs.length - 1];
      navigate(nextTab.path);
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar onLogout={onLogout} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex items-center border-b border-border bg-card">
          <div className="flex-1 min-w-0">
            <TabNavigation
              tabs={tabs}
              activeTabId={activeTabId || ''}
              onTabClick={handleTabClick}
              onTabClose={handleTabClose}
            />
          </div>
          <div className="px-4 py-2 border-l border-border flex-shrink-0">
            <QuickAccessMenu currentModule={location.pathname.split('/')[2]} />
          </div>
        </div>
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
