import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useTabNavigation } from './TabNavigationContext';
import { TabNavigation } from './TabNavigation';
import { QuickAccessMenu } from './QuickAccessMenu';
import { HeaderUserMenu } from './HeaderUserMenu';
import { ItargetLogo } from './ItargetLogo';
import { Alert, AlertTitle, AlertDescription, AlertAction } from './ui/alert';
import { Button } from './ui/button';

interface HubLayoutProps {
  onLogout: () => void;
}

const routeTitles: Record<string, string> = {
  '/hub/modulos': 'Departamentos',
  '/hub/dashboard': 'Departamentos',
  '/hub/usuarios': 'Usuários e Acesso',
  '/hub/pagamentos': 'Meios de Pagamento',
};

export function HubLayout({ onLogout }: HubLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { tabs, activeTabId, addTab, removeTab, setActiveTab } = useTabNavigation();

  const isHubRoot = location.pathname === '/hub/modulos' || location.pathname === '/hub';

  useEffect(() => {
    if (isHubRoot) return;
    const path = location.pathname;
    const title = routeTitles[path] || path.split('/').pop() || 'Página';
    const module = path.startsWith('/modulo/') ? path.split('/')[2] : 'hub';
    addTab({ id: path, title, path, module });
  }, [location.pathname, isHubRoot]);

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
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="flex items-center justify-between px-6 h-16 border-b border-border bg-card flex-shrink-0 z-30">
        <div className="flex items-center gap-3">
          <ItargetLogo />
        </div>
        <div className="flex items-center gap-2">
          <QuickAccessMenu currentModule={location.pathname.split('/')[2]} />
          <HeaderUserMenu onLogout={onLogout} />
        </div>
      </header>

      {/* Tab bar - only when not on hub root */}
      {!isHubRoot && tabs.length > 0 && (
        <div className="flex items-center border-b border-border bg-card flex-shrink-0">
          <div className="flex-1 min-w-0">
            <TabNavigation
              tabs={tabs}
              activeTabId={activeTabId || ''}
              onTabClick={handleTabClick}
              onTabClose={handleTabClose}
            />
          </div>
        </div>
      )}

      {/* Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Alert: return to open tabs */}
        {isHubRoot && tabs.length > 0 && (
          <div className="px-8 pt-8">
            <div className="max-w-7xl mx-auto">
              <Alert>
                <AlertTitle>Você tem {tabs.length} {tabs.length === 1 ? 'aba aberta' : 'abas abertas'}</AlertTitle>
                <AlertDescription>
                  {tabs.length === 1
                    ? `Aba "${tabs[0].title}" está aberta. Volte a qualquer momento para continuar de onde parou.`
                    : `Suas abas estão salvas. Volte a qualquer momento para continuar de onde parou.`
                  }
                </AlertDescription>
                <AlertAction className="justify-end">
                  <Button size="sm" variant="default" onClick={() => {
                    const lastTab = tabs[tabs.length - 1];
                    if (lastTab) handleTabClick(lastTab.id);
                  }}>
                    Voltar à página anterior
                  </Button>
                </AlertAction>
              </Alert>
            </div>
          </div>
        )}
        <Outlet />
      </main>
    </div>
  );
}
