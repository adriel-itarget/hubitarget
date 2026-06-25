import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Gift, Home, Megaphone, Users, ShoppingBag } from 'lucide-react';
import { GenericModuleSidebar } from '../../components/GenericModuleSidebar';
import { useTabNavigation } from '../../components/TabNavigationContext';
import { TabNavigation } from '../../components/TabNavigation';
import { QuickAccessMenu } from '../../components/QuickAccessMenu';

const navItems = [
  { to: '/modulo/cashback/dashboard', label: 'Dashboard', icon: Home },
  { to: '/modulo/cashback/campanhas', label: 'Campanhas', icon: Megaphone },
  { to: '/modulo/cashback/usuarios', label: 'Usuários e Carteiras', icon: Users },
  { to: '/modulo/cashback/produtos', label: 'Produtos', icon: ShoppingBag },
];

const routeTitles: Record<string, string> = {
  '/modulo/cashback/dashboard': 'Dashboard',
  '/modulo/cashback/campanhas': 'Campanhas',
  '/modulo/cashback/usuarios': 'Usuários e Carteiras',
  '/modulo/cashback/produtos': 'Produtos',
};

interface CashbackModuleProps { onLogout: () => void; }

export function CashbackModule({ onLogout }: CashbackModuleProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { tabs, activeTabId, addTab, removeTab, setActiveTab } = useTabNavigation();

  useEffect(() => {
    const path = location.pathname;
    addTab({ id: path, title: routeTitles[path] || 'Página', path, module: 'cashback' });
  }, [location.pathname]);

  const handleTabClick = (tabId: string) => { setActiveTab(tabId); navigate(tabId); };
  const handleTabClose = (e: React.MouseEvent, tabId: string) => {
    e.stopPropagation(); removeTab(tabId);
    const remaining = tabs.filter(t => t.id !== tabId);
    if (remaining.length > 0 && activeTabId === tabId) navigate(remaining[remaining.length - 1].path);
  };

  return (
    <div className="flex h-screen bg-background">
      <GenericModuleSidebar title="Cashback" subtitle="Benefícios e Recompensas" headerIcon={Gift} navItems={navItems} onLogout={onLogout} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex items-center border-b border-border bg-card">
          <div className="flex-1 min-w-0">
            <TabNavigation tabs={tabs} activeTabId={activeTabId || ''} onTabClick={handleTabClick} onTabClose={handleTabClose} />
          </div>
          <div className="px-4 py-2 border-l border-border flex-shrink-0">
            <QuickAccessMenu currentModule="cashback" />
          </div>
        </div>
        <main className="flex-1 overflow-y-auto"><Outlet /></main>
      </div>
    </div>
  );
}
