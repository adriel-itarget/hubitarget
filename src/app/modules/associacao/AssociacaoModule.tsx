import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { AssociacaoSidebar } from './AssociacaoSidebar';
import { useTabNavigation } from '../../components/TabNavigationContext';
import { TabNavigation } from '../../components/TabNavigation';
import { QuickAccessMenu } from '../../components/QuickAccessMenu';

const routeTitles: Record<string, string> = {
  // Dados da Entidade
  '/modulo/associacao/entidade/geral':        'Configurações Gerais',
  '/modulo/associacao/entidade/dados':        'Dados da Entidade',
  '/modulo/associacao/entidade/identidade':   'Identidade Visual',
  '/modulo/associacao/entidade/diretoria':    'Diretoria',
  '/modulo/associacao/entidade/textos-regras': 'Textos e Regras',
  // legado
  '/modulo/associacao/acesso-rapido':  'Acesso Rápido',
  '/modulo/associacao/aplicativo':     'Gestão do Aplicativo',
  '/modulo/associacao/financeiro':     'Financeiro',
  // Associados
  '/modulo/associacao/pessoas-pf':     'Pessoa Física',
  '/modulo/associacao/pessoas-pj':     'Pessoa Jurídica',
  // Gestão Financeira
  '/modulo/associacao/anuidades':               'Anuidades',
  '/modulo/associacao/negociacao-anuidades':    'Negociação de Anuidades',
  '/modulo/associacao/vouchers':                'Voucher',
  '/modulo/associacao/inscricoes-automaticas':  'Inscrições Automáticas',
  '/modulo/associacao/impressao-lote':          'Impressão em Lote',
  // Relatórios e BI
  '/modulo/associacao/dashboard':                  'Dashboards',
  '/modulo/associacao/relatorios-analiticos':      'Relatórios Analíticos',
  '/modulo/associacao/relatorios-quantitativos':   'Relatórios Quantitativos',
  '/modulo/associacao/gestao-propostas':           'Gestão de Propostas',
  '/modulo/associacao/acoes-lote':                 'Ações em Lote',
  '/modulo/associacao/painel-servicos':            'Painel de Serviços',
  // Estrutura Organizacional
  '/modulo/associacao/diretoria':      'Diretorias',
  '/modulo/associacao/comissoes':      'Comissões',
  '/modulo/associacao/departamentos':  'Departamentos',
  '/modulo/associacao/cargos':         'Cargos',
  '/modulo/associacao/tipos-orgaos':   'Tipos de Órgãos',
  // Configurações Financeiras
  '/modulo/associacao/config-anuidades':  'Anuidades (Config.)',
  '/modulo/associacao/planos-pagamento':  'Planos de Pagamento',
  '/modulo/associacao/taxas':             'Taxas',
  '/modulo/associacao/categorias':        'Categorias',
  '/modulo/associacao/regras':            'Regras de Associação',
  // Cadastro Profissional
  '/modulo/associacao/entidades':       'Entidades',
  '/modulo/associacao/graduacoes':      'Graduações',
  '/modulo/associacao/faculdades':      'Faculdades',
  '/modulo/associacao/cursos-prof':     'Cursos',
  '/modulo/associacao/especialidades':  'Especialidades',
  '/modulo/associacao/areas-atuacao':   'Áreas de Atuação',
  '/modulo/associacao/areas-interesse': 'Áreas de Interesse',
  // Regionalização e Comunicação
  '/modulo/associacao/regionais':            'Regionais',
  '/modulo/associacao/municipios-regionais': 'Municípios Regionais',
  '/modulo/associacao/funcoes':              'Funções',
  '/modulo/associacao/tipos-email':          'Tipos de Email',
  '/modulo/associacao/modelos-email':        'Modelos de Email',
  '/modulo/associacao/carta-associado':      'Carta de Associado',
};

interface AssociacaoModuleProps {
  onLogout: () => void;
}

export function AssociacaoModule({ onLogout }: AssociacaoModuleProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { tabs, activeTabId, addTab, removeTab, setActiveTab } = useTabNavigation();

  useEffect(() => {
    const path = location.pathname;
    const title = routeTitles[path] || path.split('/').pop() || 'Página';

    addTab({
      id: path,
      title,
      path,
      module: 'associacao',
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
      <AssociacaoSidebar onLogout={onLogout} />
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
            <QuickAccessMenu currentModule="associacao" />
          </div>
        </div>
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
