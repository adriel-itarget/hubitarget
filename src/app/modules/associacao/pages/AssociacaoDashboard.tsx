import { Users, TrendingUp, DollarSign, AlertCircle } from 'lucide-react';

export function AssociacaoDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <div className="px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl mb-2">Dashboard - Gestão de Membros</h1>
            <p className="text-muted-foreground">
              Visão geral dos seus associados e métricas principais
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
              <h3 className="text-2xl font-semibold mb-1">1,247</h3>
              <p className="text-sm text-muted-foreground">Total de Associados</p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-500" />
                </div>
                <span className="text-sm text-green-600 font-medium">+8.2%</span>
              </div>
              <h3 className="text-2xl font-semibold mb-1">92%</h3>
              <p className="text-sm text-muted-foreground">Taxa de Adimplência</p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-purple-500" />
                </div>
                <span className="text-sm text-green-600 font-medium">+15.3%</span>
              </div>
              <h3 className="text-2xl font-semibold mb-1">R$ 124K</h3>
              <p className="text-sm text-muted-foreground">Anuidades Mensais</p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-orange-500" />
                </div>
                <span className="text-sm text-orange-600 font-medium">98</span>
              </div>
              <h3 className="text-2xl font-semibold mb-1">8%</h3>
              <p className="text-sm text-muted-foreground">Inadimplentes</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-semibold mb-4">Novos Associados (Últimos 30 dias)</h3>
              <div className="space-y-3">
                {[
                  { name: 'Dr. João Silva', date: '15/06/2026', category: 'Titular' },
                  { name: 'Dra. Maria Costa', date: '14/06/2026', category: 'Titular' },
                  { name: 'Dr. Pedro Santos', date: '13/06/2026', category: 'Estudante' },
                  { name: 'Dra. Ana Oliveira', date: '12/06/2026', category: 'Titular' },
                ].map((member, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div>
                      <p className="font-medium">{member.name}</p>
                      <p className="text-xs text-muted-foreground">{member.date}</p>
                    </div>
                    <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                      {member.category}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-semibold mb-4">Ações Pendentes</h3>
              <div className="space-y-3">
                <div className="p-4 border border-orange-500/20 bg-orange-500/5 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium mb-1">98 associados inadimplentes</p>
                      <p className="text-sm text-muted-foreground mb-2">Enviar lembretes de cobrança</p>
                      <button className="text-xs px-3 py-1 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors">
                        Processar Cobranças
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-4 border border-blue-500/20 bg-blue-500/5 rounded-lg">
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium mb-1">23 solicitações de cadastro</p>
                      <p className="text-sm text-muted-foreground mb-2">Aguardando aprovação</p>
                      <button className="text-xs px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                        Revisar Solicitações
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
