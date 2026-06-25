import { TrendingUp, Users, DollarSign, AlertCircle } from 'lucide-react';
import { NewMembersChart } from './charts/NewMembersChart';
import { RetentionChart } from './charts/RetentionChart';
import { RoiChart } from './charts/RoiChart';
import { DistributionChart } from './charts/DistributionChart';

export function EntityDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <div className="px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl mb-2">Dashboard da Entidade</h1>
            <p className="text-muted-foreground">
              Acompanhe os principais indicadores e métricas de desempenho
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-500" />
                </div>
                <span className="text-sm text-green-600 font-medium">+12.5%</span>
              </div>
              <h3 className="text-2xl font-semibold mb-1">423</h3>
              <p className="text-sm text-muted-foreground">Total de Associados</p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-500" />
                </div>
                <span className="text-sm text-green-600 font-medium">+8.2%</span>
              </div>
              <h3 className="text-2xl font-semibold mb-1">96%</h3>
              <p className="text-sm text-muted-foreground">Taxa de Retenção</p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-purple-500" />
                </div>
                <span className="text-sm text-green-600 font-medium">+15.3%</span>
              </div>
              <h3 className="text-2xl font-semibold mb-1">R$ 280K</h3>
              <p className="text-sm text-muted-foreground">Receita Total</p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-orange-500" />
                </div>
                <span className="text-sm text-orange-600 font-medium">23</span>
              </div>
              <h3 className="text-2xl font-semibold mb-1">5.4%</h3>
              <p className="text-sm text-muted-foreground">Pendências</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6" key="charts-row-1">
            <div key="chart-wrapper-1"><NewMembersChart /></div>
            <div key="chart-wrapper-2"><RetentionChart /></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" key="charts-row-2">
            <div key="chart-wrapper-3"><RoiChart /></div>
            <div key="chart-wrapper-4"><DistributionChart /></div>
          </div>
        </div>
      </div>
    </div>
  );
}
