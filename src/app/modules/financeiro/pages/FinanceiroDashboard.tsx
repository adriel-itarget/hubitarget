import { useState, useMemo } from 'react';
import { DollarSign, TrendingUp, TrendingDown, AlertCircle, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { useCostCenter } from '@/app/components/CostCenterSelect';

function randomBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateDashboardData(seed: number) {
  const base = seed * 7 + 13;
  const rand = (min: number, max: number) => {
    const x = Math.sin(base + min + max) * 10000;
    return min + Math.abs(x % (max - min));
  };

  const receita = randomBetween(70000, 180000);
  const despesas = randomBetween(30000, receita * 0.6);
  const saldo = receita - despesas;
  const variacaoReceita = randomBetween(5, 35);
  const variacaoDespesas = randomBetween(-10, 15);
  const inadimplencia = randomBetween(5000, 25000);
  const casosInadimplencia = randomBetween(20, 150);

  const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'];
  const monthlyData = months.map(m => ({
    month: m,
    receita: randomBetween(50000, 200000),
    despesas: randomBetween(25000, 100000),
  }));

  const centerNames = ['Associação', 'Eventos', 'Cursos', 'Exames', 'Cashback'];
  const centerData = centerNames.map(name => ({
    name,
    receita: randomBetween(10000, 80000),
    despesas: randomBetween(5000, 40000),
  }));

  const descriptions = [
    'Anuidades - Junho 2026',
    'Inscrições Congresso Nacional',
    'Aluguel sede - Junho',
    'Plataforma EAD - Licença mensal',
    'Prova de Título - Inscrições',
    'Cashback liberado - Campanha Maio',
    'Patrocínio Evento Científico',
    'Curso de Atualização - Turma 12',
  ];
  const centers = ['Associação', 'Eventos', 'Cursos', 'Exames', 'Cashback'];

  const recentTransactions = Array.from({ length: 6 }, (_, i) => ({
    id: i + 1,
    desc: descriptions[i % descriptions.length],
    type: i % 3 === 0 ? 'despesa' as const : 'receita' as const,
    value: randomBetween(1500, 35000),
    date: `${String(6 - i).padStart(2, '0')}/06/2026`,
    center: centers[i % centers.length],
    status: i % 4 === 0 ? 'pendente' as const : 'confirmado' as const,
  }));

  return { receita, despesas, saldo, variacaoReceita, variacaoDespesas, inadimplencia, casosInadimplencia, monthlyData, centerData, recentTransactions };
}

export function FinanceiroDashboard() {
  const costCenter = useCostCenter();
  const [refreshKey, setRefreshKey] = useState(0);

  const data = useMemo(() => generateDashboardData(refreshKey + (costCenter?.id?.charCodeAt(2) || 0)), [costCenter?.id, refreshKey]);

  return (
    <div className="min-h-screen bg-background">
      <div className="px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-start justify-between mb-8">
            <div>
              <h1 className="text-3xl mb-2">Dashboard Financeiro</h1>
              <p className="text-muted-foreground">
                {costCenter ? `Dados de: ${costCenter.name}` : 'Visão consolidada de todos os centros de custo'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-green-500" />
                  </div>
                  <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
                    <ArrowUpRight className="w-4 h-4" />
                    +{data.variacaoReceita}%
                  </div>
                </div>
                <h3 className="text-2xl font-semibold mb-1">R$ {data.receita.toLocaleString('pt-BR')}</h3>
                <p className="text-sm text-muted-foreground">Receitas (Junho)</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center">
                    <TrendingDown className="w-6 h-6 text-red-500" />
                  </div>
                  <div className="flex items-center gap-1 text-red-500 text-sm font-medium">
                    <ArrowDownRight className="w-4 h-4" />
                    +{data.variacaoDespesas}%
                  </div>
                </div>
                <h3 className="text-2xl font-semibold mb-1">R$ {data.despesas.toLocaleString('pt-BR')}</h3>
                <p className="text-sm text-muted-foreground">Despesas (Junho)</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-blue-500" />
                  </div>
                  <Badge variant="outline" className={data.saldo >= 0 ? 'text-green-600 border-green-500/30 bg-green-500/10' : 'text-red-500 border-red-500/30 bg-red-500/10'}>
                    {data.saldo >= 0 ? 'Positivo' : 'Negativo'}
                  </Badge>
                </div>
                <h3 className="text-2xl font-semibold mb-1">R$ {data.saldo.toLocaleString('pt-BR')}</h3>
                <p className="text-sm text-muted-foreground">Saldo do Mês</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center">
                    <AlertCircle className="w-6 h-6 text-orange-500" />
                  </div>
                  <Badge variant="outline" className="text-orange-600 border-orange-500/30 bg-orange-500/10">
                    {data.casosInadimplencia} casos
                  </Badge>
                </div>
                <h3 className="text-2xl font-semibold mb-1">R$ {data.inadimplencia.toLocaleString('pt-BR')}</h3>
                <p className="text-sm text-muted-foreground">Inadimplência</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Receitas vs Despesas (2026)</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={220}>
                  <AreaChart data={data.monthlyData}>
                    <defs>
                      <linearGradient id="colorReceita" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.15} />
                        <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorDespesas" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.15} />
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} tickFormatter={v => `${(v/1000).toFixed(0)}k`} />
                    <Tooltip formatter={(v: number) => [`R$ ${v.toLocaleString('pt-BR')}`, '']} />
                    <Area type="monotone" dataKey="receita" stroke="#22c55e" strokeWidth={2} fill="url(#colorReceita)" name="Receita" />
                    <Area type="monotone" dataKey="despesas" stroke="#ef4444" strokeWidth={2} fill="url(#colorDespesas)" name="Despesas" />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Receita por Centro de Custo</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={data.centerData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                    <XAxis dataKey="name" tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} tickFormatter={v => `${(v/1000).toFixed(0)}k`} />
                    <Tooltip formatter={(v: number) => [`R$ ${v.toLocaleString('pt-BR')}`, '']} />
                    <Bar dataKey="receita" fill="#2563eb" radius={[4, 4, 0, 0]} name="Receita" />
                    <Bar dataKey="despesas" fill="#94a3b8" radius={[4, 4, 0, 0]} name="Despesas" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Lançamentos Recentes</CardTitle>
              <Button variant="ghost" size="sm">Ver todos</Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-border">
                {data.recentTransactions.map(t => (
                  <div key={t.id} className="px-6 py-4 flex items-center gap-4 hover:bg-muted/30 transition-colors">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
                      t.type === 'receita' ? 'bg-green-500/10' : 'bg-red-500/10'
                    }`}>
                      {t.type === 'receita'
                        ? <TrendingUp className="w-4 h-4 text-green-500" />
                        : <TrendingDown className="w-4 h-4 text-red-500" />
                      }
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{t.desc}</p>
                      <p className="text-xs text-muted-foreground">{t.date} · {t.center}</p>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold text-sm ${t.type === 'receita' ? 'text-green-600' : 'text-red-500'}`}>
                        {t.type === 'receita' ? '+' : '-'} R$ {t.value.toLocaleString('pt-BR')}
                      </p>
                      <Badge variant={t.status === 'confirmado' ? 'default' : 'secondary'}>
                        {t.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
