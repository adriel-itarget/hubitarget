import { useState } from 'react';
import { DollarSign, TrendingUp, TrendingDown, AlertCircle, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';

const costCenters = [
  { value: 'todos', label: 'Todos os Centros' },
  { value: 'associacao', label: 'Associação' },
  { value: 'eventos', label: 'Eventos' },
  { value: 'cursos', label: 'Cursos' },
  { value: 'cashback', label: 'Cashback' },
  { value: 'exames', label: 'Exames e Provas' },
];

const monthlyData = [
  { month: 'Jan', receita: 85000, despesas: 52000 },
  { month: 'Fev', receita: 92000, despesas: 48000 },
  { month: 'Mar', receita: 78000, despesas: 61000 },
  { month: 'Abr', receita: 105000, despesas: 55000 },
  { month: 'Mai', receita: 118000, despesas: 63000 },
  { month: 'Jun', receita: 124000, despesas: 58000 },
];

const recentTransactions = [
  { id: 1, desc: 'Anuidades - Junho 2026', type: 'receita', value: 24800, date: '05/06/2026', center: 'Associação', status: 'confirmado' },
  { id: 2, desc: 'Inscrições Congresso Nacional', type: 'receita', value: 18500, date: '04/06/2026', center: 'Eventos', status: 'confirmado' },
  { id: 3, desc: 'Aluguel sede - Junho', type: 'despesa', value: 8200, date: '03/06/2026', center: 'Associação', status: 'confirmado' },
  { id: 4, desc: 'Plataforma EAD - Licença mensal', type: 'despesa', value: 3500, date: '02/06/2026', center: 'Cursos', status: 'confirmado' },
  { id: 5, desc: 'Prova de Título - Inscrições', type: 'receita', value: 31200, date: '01/06/2026', center: 'Exames', status: 'pendente' },
  { id: 6, desc: 'Cashback liberado - Campanha Maio', type: 'despesa', value: 4700, date: '31/05/2026', center: 'Cashback', status: 'confirmado' },
];

const centerData = [
  { name: 'Associação', receita: 54000, despesas: 22000 },
  { name: 'Eventos', receita: 38000, despesas: 18000 },
  { name: 'Cursos', receita: 21000, despesas: 9500 },
  { name: 'Exames', receita: 31200, despesas: 4800 },
  { name: 'Cashback', receita: 0, despesas: 4700 },
];

export function FinanceiroDashboard() {
  const [selectedCenter, setSelectedCenter] = useState('todos');

  const filteredTransactions = selectedCenter === 'todos'
    ? recentTransactions
    : recentTransactions.filter(t => t.center.toLowerCase().includes(selectedCenter));

  return (
    <div className="min-h-screen bg-background">
      <div className="px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-start justify-between mb-8">
            <div>
              <h1 className="text-3xl mb-2">Dashboard Financeiro</h1>
              <p className="text-muted-foreground">Visão consolidada das finanças por centro de custo</p>
            </div>

            <Select value={selectedCenter} onValueChange={setSelectedCenter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Todos os Centros" />
              </SelectTrigger>
              <SelectContent>
                {costCenters.map(c => (
                  <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
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
                    +18.4%
                  </div>
                </div>
                <h3 className="text-2xl font-semibold mb-1">R$ 124.500</h3>
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
                    +5.1%
                  </div>
                </div>
                <h3 className="text-2xl font-semibold mb-1">R$ 58.200</h3>
                <p className="text-sm text-muted-foreground">Despesas (Junho)</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-blue-500" />
                  </div>
                  <Badge variant="outline" className="text-green-600 border-green-500/30 bg-green-500/10">
                    Positivo
                  </Badge>
                </div>
                <h3 className="text-2xl font-semibold mb-1">R$ 66.300</h3>
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
                    98 casos
                  </Badge>
                </div>
                <h3 className="text-2xl font-semibold mb-1">R$ 12.250</h3>
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
                  <AreaChart data={monthlyData}>
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
                  <BarChart data={centerData}>
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
                {filteredTransactions.map(t => (
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
