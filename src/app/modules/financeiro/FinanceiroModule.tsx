import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { DollarSign, Home, List, TrendingDown, TrendingUp, Layers, BarChart3 } from 'lucide-react';
import { GenericModuleSidebar } from '../../components/GenericModuleSidebar';
import { useTabNavigation } from '../../components/TabNavigationContext';
import { TabNavigation } from '../../components/TabNavigation';
import { QuickAccessMenu } from '../../components/QuickAccessMenu';
import { HeaderUserMenu } from '../../components/HeaderUserMenu';

const navItems = [
  { to: '/modulo/financeiro/dashboard', label: 'Dashboard', icon: Home },
  { to: '/modulo/financeiro/lancamentos', label: 'Lançamentos', icon: List },
  { to: '/modulo/financeiro/contas-pagar', label: 'Contas a Pagar', icon: TrendingDown },
  { to: '/modulo/financeiro/contas-receber', label: 'Contas a Receber', icon: TrendingUp },
  { to: '/modulo/financeiro/centros-custo', label: 'Centros de Custo', icon: Layers },
  { to: '/modulo/financeiro/relatorios', label: 'Relatórios', icon: BarChart3 },
];

const routeTitles: Record<string, string> = {
  '/modulo/financeiro/dashboard': 'Dashboard',
  '/modulo/financeiro/lancamentos': 'Lançamentos',
  '/modulo/financeiro/contas-pagar': 'Contas a Pagar',
  '/modulo/financeiro/contas-receber': 'Contas a Receber',
  '/modulo/financeiro/centros-custo': 'Centros de Custo',
  '/modulo/financeiro/relatorios': 'Relatórios',
};

interface FinanceiroModuleProps {
  onLogout: () => void;
}

export function FinanceiroModule({ onLogout }: FinanceiroModuleProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { tabs, activeTabId, addTab, removeTab, setActiveTab } = useTabNavigation();

  useEffect(() => {
    const path = location.pathname;
    const title = routeTitles[path] || path.split('/').pop() || 'Página';
    addTab({ id: path, title, path, module: 'financeiro' });
  }, [location.pathname]);

  const handleTabClick = (tabId: string) => { setActiveTab(tabId); navigate(tabId); };
  const handleTabClose = (e: React.MouseEvent, tabId: string) => {
    e.stopPropagation();
    removeTab(tabId);
    const remaining = tabs.filter(t => t.id !== tabId);
    if (remaining.length > 0 && activeTabId === tabId) navigate(remaining[remaining.length - 1].path);
  };

  return (
    <div className="flex h-screen bg-background">
      <GenericModuleSidebar
        title="Financeiro"
        subtitle="Gestão Financeira"
        headerIcon={DollarSign}
        navItems={navItems}
        onLogout={onLogout}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex items-center border-b border-border bg-card">
          <div className="flex-1 min-w-0">
            <TabNavigation tabs={tabs} activeTabId={activeTabId || ''} onTabClick={handleTabClick} onTabClose={handleTabClose} />
          </div>
          <div className="flex items-center gap-2 px-4 py-2 border-l border-border flex-shrink-0">
            <QuickAccessMenu currentModule="financeiro" />
            <HeaderUserMenu onLogout={onLogout} />
          </div>
        </div>
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
