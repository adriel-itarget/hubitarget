import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import { TabNavigationProvider } from './components/TabNavigationContext';
import { AppThemeProvider } from './components/AppThemeContext';
import { LoginPage } from './pages/LoginPage';
import { DesignSystemPage } from './pages/DesignSystemPage';
import { HubLayout } from './components/HubLayout';
import { EntityDashboard } from './components/EntityDashboard';
import { EntityConfig } from './components/EntityConfig';
import { EntityDados } from './components/EntityDados';
import { EntityGeral } from './components/EntityGeral';
import { EntityDiretoria } from './components/EntityDiretoria';
import { EntityTextosRegras } from './components/EntityTextosRegras';
import { Subscriptions } from './components/Subscriptions';
import { UsersAccess } from './components/UsersAccess';
import { MyModules } from './components/MyModules';
import { PaymentMethods } from './components/PaymentMethods';
import { EntityCRUD } from './components/EntityCRUD';

// Módulo Associação
import { AssociacaoModule } from './modules/associacao/AssociacaoModule';
import { AssociacaoDashboard } from './modules/associacao/pages/AssociacaoDashboard';
import { PessoasAssociados } from './modules/associacao/pages/PessoasAssociados';
import { AssociacaoQuickAccess } from './modules/associacao/pages/AssociacaoQuickAccess';

// Módulo Financeiro
import { FinanceiroModule } from './modules/financeiro/FinanceiroModule';
import { FinanceiroDashboard } from './modules/financeiro/pages/FinanceiroDashboard';
import { Lancamentos } from './modules/financeiro/pages/Lancamentos';

// Módulo Exames
import { ExamesModule } from './modules/exames/ExamesModule';
import { ExamesDashboard } from './modules/exames/pages/ExamesDashboard';
import { Processos } from './modules/exames/pages/Processos';

// Módulo Cursos
import { CursosModule } from './modules/cursos/CursosModule';
import { CursosDashboard } from './modules/cursos/pages/CursosDashboard';
import { Atividades } from './modules/cursos/pages/Atividades';
import { BancoQuestoes } from './modules/cursos/pages/BancoQuestoes';

// Módulo Cashback
import { CashbackModule } from './modules/cashback/CashbackModule';
import { CashbackDashboard } from './modules/cashback/pages/CashbackDashboard';
import { Campanhas } from './modules/cashback/pages/Campanhas';
import { UsuariosCarteiras } from './modules/cashback/pages/UsuariosCarteiras';

// Módulo Eventos
import { EventosModule } from './modules/eventos/EventosModule';
import { EventosDashboard } from './modules/eventos/pages/EventosDashboard';
import { ListaEventos } from './modules/eventos/pages/ListaEventos';
import { Trabalhos } from './modules/eventos/pages/Trabalhos';

import { Users, Calendar, DollarSign, Tags } from 'lucide-react';

function AssocPlaceholder({ title }: { title: string }) {
  return (
    <div className="min-h-screen bg-background">
      <div className="px-8 py-8 max-w-7xl mx-auto">
        <h1 className="text-3xl mb-2">{title}</h1>
        <p className="text-muted-foreground">Esta seção está em desenvolvimento.</p>
      </div>
    </div>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  return (
    <AppThemeProvider>
    <TabNavigationProvider>
      <BrowserRouter>
        <Routes>
          {/* Rotas públicas */}
          <Route path="/" element={isLoggedIn ? <Navigate to="/hub/modulos" replace /> : <Navigate to="/login" replace />} />
          <Route path="/login" element={isLoggedIn ? <Navigate to="/hub/modulos" replace /> : <LoginPage onLogin={handleLogin} />} />
          <Route path="/design-system" element={<DesignSystemPage />} />

          {/* Hub */}
          <Route
            path="/hub/*"
            element={isLoggedIn ? <HubLayout onLogout={handleLogout} /> : <Navigate to="/login" replace />}
          >
            <Route index element={<Navigate to="/hub/modulos" replace />} />
            <Route path="dashboard" element={<EntityDashboard />} />
            <Route path="assinaturas" element={<Subscriptions />} />
            <Route path="usuarios" element={<UsersAccess />} />
            <Route path="modulos" element={<MyModules />} />
            <Route path="pagamentos" element={<PaymentMethods />} />
          </Route>

          {/* Módulo Associação */}
          <Route
            path="/modulo/associacao/*"
            element={isLoggedIn ? <AssociacaoModule onLogout={handleLogout} /> : <Navigate to="/login" replace />}
          >
            <Route index element={<Navigate to="/modulo/associacao/dashboard" replace />} />
            {/* Dados da Entidade */}
            <Route path="entidade/geral"        element={<EntityGeral />} />
            <Route path="entidade/dados"        element={<EntityDados />} />
            <Route path="entidade/identidade"   element={<EntityConfig />} />
            <Route path="entidade/diretoria"    element={<EntityDiretoria />} />
            <Route path="entidade/textos-regras" element={<EntityTextosRegras />} />
            {/* legado */}
            <Route path="acesso-rapido" element={<AssociacaoQuickAccess />} />
            <Route path="aplicativo" element={<AssocPlaceholder title="Gestão do Aplicativo" />} />
            <Route path="financeiro" element={<FinanceiroDashboard />} />
            {/* Associados */}
            <Route path="pessoas-pf" element={<PessoasAssociados />} />
            <Route path="pessoas-pj" element={<AssocPlaceholder title="Pessoa Jurídica" />} />
            {/* legado redirect */}
            <Route path="pessoas" element={<Navigate to="/modulo/associacao/pessoas-pf" replace />} />
            {/* Gestão Financeira */}
            <Route path="anuidades"              element={<AssocPlaceholder title="Anuidades" />} />
            <Route path="negociacao-anuidades"   element={<AssocPlaceholder title="Negociação de Anuidades" />} />
            <Route path="vouchers"               element={<AssocPlaceholder title="Voucher" />} />
            <Route path="inscricoes-automaticas" element={<AssocPlaceholder title="Inscrições Automáticas" />} />
            <Route path="impressao-lote"         element={<AssocPlaceholder title="Impressão em Lote" />} />
            {/* Relatórios e BI */}
            <Route path="dashboard"                element={<AssociacaoDashboard />} />
            <Route path="relatorios-analiticos"    element={<AssocPlaceholder title="Relatórios Analíticos" />} />
            <Route path="relatorios-quantitativos" element={<AssocPlaceholder title="Relatórios Quantitativos" />} />
            <Route path="gestao-propostas"         element={<AssocPlaceholder title="Gestão de Propostas" />} />
            <Route path="acoes-lote"               element={<AssocPlaceholder title="Ações em Lote" />} />
            <Route path="painel-servicos"          element={<AssocPlaceholder title="Painel de Serviços" />} />
            {/* Estrutura Organizacional */}
            <Route path="diretoria"    element={<EntityDiretoria />} />
            <Route path="comissoes"    element={<AssocPlaceholder title="Comissões" />} />
            <Route path="departamentos" element={<AssocPlaceholder title="Departamentos" />} />
            <Route path="cargos"       element={<AssocPlaceholder title="Cargos" />} />
            <Route path="tipos-orgaos" element={<AssocPlaceholder title="Tipos de Órgãos" />} />
            {/* Configurações Financeiras */}
            <Route path="config-anuidades" element={<AssocPlaceholder title="Anuidades (Configurações)" />} />
            <Route path="planos-pagamento" element={<AssocPlaceholder title="Planos de Pagamento" />} />
            <Route path="taxas"            element={<AssocPlaceholder title="Taxas" />} />
            <Route path="categorias"       element={<AssocPlaceholder title="Categorias" />} />
            <Route path="regras"           element={<EntityTextosRegras />} />
            {/* Cadastro Profissional */}
            <Route path="entidades"       element={<AssocPlaceholder title="Entidades" />} />
            <Route path="graduacoes"      element={<AssocPlaceholder title="Graduações" />} />
            <Route path="faculdades"      element={<AssocPlaceholder title="Faculdades" />} />
            <Route path="cursos-prof"     element={<AssocPlaceholder title="Cursos" />} />
            <Route path="especialidades"  element={<AssocPlaceholder title="Especialidades" />} />
            <Route path="areas-atuacao"   element={<AssocPlaceholder title="Áreas de Atuação" />} />
            <Route path="areas-interesse" element={<AssocPlaceholder title="Áreas de Interesse" />} />
            {/* Regionalização e Comunicação */}
            <Route path="regionais"            element={<AssocPlaceholder title="Regionais" />} />
            <Route path="municipios-regionais" element={<AssocPlaceholder title="Municípios Regionais" />} />
            <Route path="funcoes"              element={<AssocPlaceholder title="Funções" />} />
            <Route path="tipos-email"          element={<AssocPlaceholder title="Tipos de Email" />} />
            <Route path="modelos-email"        element={<AssocPlaceholder title="Modelos de Email" />} />
            <Route path="carta-associado"      element={<AssocPlaceholder title="Carta de Associado" />} />
          </Route>

          {/* Módulo Financeiro */}
          <Route
            path="/modulo/financeiro/*"
            element={isLoggedIn ? <FinanceiroModule onLogout={handleLogout} /> : <Navigate to="/login" replace />}
          >
            <Route index element={<Navigate to="/modulo/financeiro/dashboard" replace />} />
            <Route path="dashboard" element={<FinanceiroDashboard />} />
            <Route path="lancamentos" element={<Lancamentos />} />
            <Route path="contas-pagar" element={<div className="p-8"><h1 className="text-3xl">Contas a Pagar</h1></div>} />
            <Route path="contas-receber" element={<div className="p-8"><h1 className="text-3xl">Contas a Receber</h1></div>} />
            <Route path="centros-custo" element={<div className="p-8"><h1 className="text-3xl">Centros de Custo</h1></div>} />
            <Route path="relatorios" element={<div className="p-8"><h1 className="text-3xl">Relatórios Financeiros</h1></div>} />
          </Route>

          {/* Módulo Exames */}
          <Route
            path="/modulo/exames/*"
            element={isLoggedIn ? <ExamesModule onLogout={handleLogout} /> : <Navigate to="/login" replace />}
          >
            <Route index element={<Navigate to="/modulo/exames/dashboard" replace />} />
            <Route path="dashboard" element={<ExamesDashboard />} />
            <Route path="processos" element={<Processos />} />
            <Route path="editais" element={<div className="p-8"><h1 className="text-3xl">Editais</h1></div>} />
            <Route path="locais" element={<div className="p-8"><h1 className="text-3xl">Locais de Prova</h1></div>} />
            <Route path="candidatos" element={<PessoasAssociados />} />
            <Route path="relatorios" element={<div className="p-8"><h1 className="text-3xl">Relatórios</h1></div>} />
          </Route>

          {/* Módulo Cursos */}
          <Route
            path="/modulo/cursos/*"
            element={isLoggedIn ? <CursosModule onLogout={handleLogout} /> : <Navigate to="/login" replace />}
          >
            <Route index element={<Navigate to="/modulo/cursos/dashboard" replace />} />
            <Route path="dashboard" element={<CursosDashboard />} />
            <Route path="atividades" element={<Atividades />} />
            <Route path="banco-questoes" element={<BancoQuestoes />} />
            <Route path="inscricoes" element={<PessoasAssociados />} />
            <Route path="categorias" element={<div className="p-8"><h1 className="text-3xl">Categorias</h1></div>} />
            <Route path="relatorios" element={<div className="p-8"><h1 className="text-3xl">Relatórios</h1></div>} />
          </Route>

          {/* Módulo Cashback */}
          <Route
            path="/modulo/cashback/*"
            element={isLoggedIn ? <CashbackModule onLogout={handleLogout} /> : <Navigate to="/login" replace />}
          >
            <Route index element={<Navigate to="/modulo/cashback/dashboard" replace />} />
            <Route path="dashboard" element={<CashbackDashboard />} />
            <Route path="campanhas" element={<Campanhas />} />
            <Route path="usuarios" element={<UsuariosCarteiras />} />
            <Route path="produtos" element={<div className="p-8"><h1 className="text-3xl">Produtos</h1></div>} />
          </Route>

          {/* Módulo Eventos */}
          <Route
            path="/modulo/eventos/*"
            element={isLoggedIn ? <EventosModule onLogout={handleLogout} /> : <Navigate to="/login" replace />}
          >
            <Route index element={<Navigate to="/modulo/eventos/dashboard" replace />} />
            <Route path="dashboard" element={<EventosDashboard />} />
            <Route path="lista" element={<ListaEventos />} />
            <Route path="inscricoes" element={<PessoasAssociados />} />
            <Route path="programacao" element={<div className="p-8"><h1 className="text-3xl">Programação Científica</h1></div>} />
            <Route path="trabalhos" element={<Trabalhos />} />
            <Route path="palestrantes" element={<PessoasAssociados />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </TabNavigationProvider>
    </AppThemeProvider>
  );
}
