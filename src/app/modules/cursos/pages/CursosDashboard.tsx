import { BookOpen, Users, DollarSign, Star, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const cursosData = [
  { name: 'Jan', inscricoes: 45 }, { name: 'Fev', inscricoes: 68 }, { name: 'Mar', inscricoes: 52 },
  { name: 'Abr', inscricoes: 89 }, { name: 'Mai', inscricoes: 74 }, { name: 'Jun', inscricoes: 93 },
];

const topCursos = [
  { name: 'Cardiologia Intervencionista - Módulo 1', inscricoes: 142, avaliacao: 4.8, valor: 1200 },
  { name: 'Ecocardiografia Avançada', inscricoes: 98, avaliacao: 4.9, valor: 890 },
  { name: 'Eletrofisiologia Clínica', inscricoes: 87, avaliacao: 4.7, valor: 1050 },
  { name: 'Insuficiência Cardíaca - Update 2026', inscricoes: 76, avaliacao: 4.6, valor: 650 },
];

export function CursosDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <div className="px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl mb-2">Dashboard - Cursos</h1>
            <p className="text-muted-foreground">Gestão de atividades educacionais e banco de questões</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { icon: BookOpen, bg: 'bg-purple-500/10', color: 'text-purple-500', label: 'Cursos Ativos', value: '24', badge: '3 novos' },
              { icon: Users, bg: 'bg-blue-500/10', color: 'text-blue-500', label: 'Alunos Matriculados', value: '421', badge: '+93 mês' },
              { icon: DollarSign, bg: 'bg-green-500/10', color: 'text-green-500', label: 'Receita (Junho)', value: 'R$ 21k', badge: '+12%' },
              { icon: Star, bg: 'bg-yellow-500/10', color: 'text-yellow-500', label: 'Avaliação Média', value: '4.75', badge: '★' },
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-semibold mb-4">Inscrições por Mês (2026)</h3>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={cursosData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                  <XAxis dataKey="name" tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: 'var(--muted-foreground)' }} axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Bar key="inscricoes-bar" dataKey="inscricoes" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="Inscrições" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-card border border-border rounded-xl">
              <div className="p-6 border-b border-border">
                <h3 className="font-semibold">Cursos Mais Populares</h3>
              </div>
              <div className="divide-y divide-border">
                {topCursos.map((c, i) => (
                  <div key={i} className="px-6 py-4 flex items-center gap-4 hover:bg-muted/30 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-semibold text-purple-600">#{i + 1}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{c.name}</p>
                      <div className="flex items-center gap-3 mt-0.5">
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Users className="w-3 h-3" /> {c.inscricoes}
                        </span>
                        <span className="text-xs text-yellow-500 flex items-center gap-1">
                          <Star className="w-3 h-3" /> {c.avaliacao}
                        </span>
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-green-600">R$ {c.valor}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
