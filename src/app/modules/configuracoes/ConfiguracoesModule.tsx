import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useTabNavigation } from '../../components/TabNavigationContext';
import { TabNavigation } from '../../components/TabNavigation';
import { QuickAccessMenu } from '../../components/QuickAccessMenu';
import { HeaderUserMenu } from '../../components/HeaderUserMenu';
import { ConfiguracoesSidebar } from './ConfiguracoesSidebar';

const routeTitles: Record<string, string> = {
  '/modulo/configuracoes/dashboard':           'Dashboard',
  '/modulo/configuracoes/usuarios-acesso':     'Usuários e Níveis de Acesso',
  '/modulo/configuracoes/cfg-menus':           'Menus',
  '/modulo/configuracoes/cfg-config':          'Configurações',
  '/modulo/configuracoes/cfg-logos':           'Logos',
  '/modulo/configuracoes/cfg-notificacoes':    'Notificações',
  '/modulo/configuracoes/cfg-idioma':          'Idioma',
  '/modulo/configuracoes/meios-pagamento':     'Meios de Pagamento',
  '/modulo/configuracoes/cfg-modelos':         'Modelos de Documentos',
  '/modulo/configuracoes/cfg-especialidades':  'Config. Especialidades',
  '/modulo/configuracoes/cfg-formularios':     'Formulários',
  '/modulo/configuracoes/cfg-perguntas':       'Perguntas',
};

interface ConfiguracoesModuleProps {
  onLogout: () => void;
}

export function ConfiguracoesModule({ onLogout }: ConfiguracoesModuleProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { tabs, activeTabId, addTab, removeTab, setActiveTab } = useTabNavigation();

  useEffect(() => {
    const path = location.pathname;
    const title = routeTitles[path] || path.split('/').pop() || 'Página';
    addTab({ id: path, title, path, module: 'configuracoes' });
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
      <ConfiguracoesSidebar onLogout={onLogout} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex items-center border-b border-border bg-card">
          <div className="flex-1 min-w-0">
            <TabNavigation tabs={tabs} activeTabId={activeTabId || ''} onTabClick={handleTabClick} onTabClose={handleTabClose} />
          </div>
          <div className="flex items-center gap-2 px-4 py-2 border-l border-border flex-shrink-0">
            <QuickAccessMenu currentModule="configuracoes" />
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
