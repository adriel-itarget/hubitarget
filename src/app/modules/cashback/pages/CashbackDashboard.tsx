import { Gift, Users, DollarSign, TrendingUp, UserX, UserCheck, MapPin } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const growthData = [
  { mes: 'Jan', ativos: 320, novos: 45 }, { mes: 'Fev', ativos: 365, novos: 52 },
  { mes: 'Mar', ativos: 390, novos: 38 }, { mes: 'Abr', ativos: 442, novos: 61 },
  { mes: 'Mai', ativos: 481, novos: 48 }, { mes: 'Jun', ativos: 524, novos: 58 },
];

const statusData = [
  { name: 'Ativos', value: 524, color: '#22c55e' },
  { name: 'Inativos', value: 183, color: '#94a3b8' },
  { name: 'Não aceitaram', value: 89, color: '#f59e0b' },
];

const campanhasAtivas = [
  { id: 1, name: 'Cashback Anuidade 2026', tipo: 'Anuidade', valor: 'R$ 45.800', usuarios: 412, percentual: 8, status: 'ativa' },
  { id: 2, name: 'Bônus Congresso Nacional', tipo: 'Evento', valor: 'R$ 12.300', usuarios: 189, percentual: 10, status: 'ativa' },
  { id: 3, name: 'Cashback Cursos Online', tipo: 'Educação', valor: 'R$ 8.750', usuarios: 97, percentual: 5, status: 'ativa' },
];

export function CashbackDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <div className="px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl mb-2">Dashboard - Cashback</h1>
            <p className="text-muted-foreground">Visão geral das campanhas e carteiras de benefícios</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { icon: Gift, bg: 'bg-orange-500/10', color: 'text-orange-500', label: 'Campanhas Ativas', value: '3', badge: '+1 este mês' },
              { icon: DollarSign, bg: 'bg-green-500/10', color: 'text-green-500', label: 'Total Cash Liberado', value: 'R$ 66.850', badge: '+24%' },
              { icon: UserCheck, bg: 'bg-blue-500/10', color: 'text-blue-500', label: 'Usuários Ativos', value: '524', badge: '+58 mês' },
              { icon: UserX, bg: 'bg-yellow-500/10', color: 'text-yellow-500', label: 'Não Participam', value: '89', badge: '11.2%' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-full ${item.bg} flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${item.color}`} />
                    </div>
                    <span className="text-xs text-green-600 font-medium">{item.badge}</span>
                  </div>
                  <h3 className="text-2xl font-semibold mb-1">{item.value}</h3>
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6">
              <h3 className="font-semibold mb-4">Crescimento de Usuários (2026)</h3>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={growthData}>
                  <defs>
                    <linearGradient id="colorAtivos" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f97316" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="mes" tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Area key="ativos-area" type="monotone" dataKey="ativos" stroke="#f97316" strokeWidth={2} fill="url(#colorAtivos)" name="Usuários Ativos" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-semibold mb-4">Status dos Usuários</h3>
              <ResponsiveContainer width="100%" height={160}>
                <PieChart>
                  <Pie data={statusData} cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3} dataKey="value">
                    {statusData.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
                  </Pie>
                  <Tooltip formatter={(v: number) => [v, 'usuários']} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 mt-2">
                {statusData.map(s => (
                  <div key={s.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: s.color }} />
                      <span className="text-muted-foreground">{s.name}</span>
                    </div>
                    <span className="font-medium">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h3 className="font-semibold">Campanhas Ativas</h3>
              <button className="text-sm text-primary hover:underline">Ver todas</button>
            </div>
            <div className="divide-y divide-border">
              {campanhasAtivas.map(c => (
                <div key={c.id} className="px-6 py-4 flex items-center gap-4 hover:bg-muted/30 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                    <Gift className="w-5 h-5 text-orange-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">{c.name}</p>
                    <p className="text-xs text-muted-foreground">{c.tipo} · {c.usuarios} usuários · {c.percentual}% de cashback</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-sm text-green-600">{c.valor}</p>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/10 text-green-600">Ativa</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
