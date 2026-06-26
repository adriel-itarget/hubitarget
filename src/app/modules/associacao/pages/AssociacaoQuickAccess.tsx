import { Users, FileText, UserCog, Smartphone, DollarSign, BarChart3, Calendar, Award, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';

const quickAccessItems = [
  {
    id: 1,
    title: 'Pessoas/Associados',
    description: 'Gerencie associados, categorias e aprovações',
    icon: Users,
    color: 'bg-blue-500',
    route: '/modulo/associacao/pessoas',
    stats: '1,247 associados'
  },
  {
    id: 2,
    title: 'Regras de Associação',
    description: 'Configure anuidades e regras de afiliação',
    icon: FileText,
    color: 'bg-purple-500',
    route: '/modulo/associacao/regras',
    stats: '8 categorias ativas'
  },
  {
    id: 3,
    title: 'Gestão de Diretoria',
    description: 'Administre membros da diretoria e cargos',
    icon: UserCog,
    color: 'bg-indigo-500',
    route: '/modulo/associacao/diretoria',
    stats: '12 membros'
  },
  {
    id: 4,
    title: 'Gestão do Aplicativo',
    description: 'Configure funcionalidades do app móvel',
    icon: Smartphone,
    color: 'bg-green-500',
    route: '/modulo/associacao/aplicativo',
    stats: '856 downloads'
  },
  {
    id: 5,
    title: 'Financeiro',
    description: 'Acompanhe pagamentos e inadimplência',
    icon: DollarSign,
    color: 'bg-emerald-500',
    route: '/modulo/associacao/financeiro',
    stats: 'R$ 124K/mês'
  },
  {
    id: 6,
    title: 'Relatórios',
    description: 'Gere relatórios detalhados e dashboards',
    icon: BarChart3,
    color: 'bg-orange-500',
    route: '/modulo/associacao/relatorios',
    stats: '23 relatórios'
  }
];

const recentActions = [
  { id: 1, action: 'Novo associado aprovado', user: 'Dr. Carlos Silva', time: '5 min atrás', icon: Users, color: 'text-green-600' },
  { id: 2, action: 'Pagamento recebido', user: 'Dra. Ana Costa', time: '12 min atrás', icon: DollarSign, color: 'text-blue-600' },
  { id: 3, action: 'Documento pendente', user: 'Dr. João Santos', time: '1 hora atrás', icon: FileText, color: 'text-yellow-600' },
  { id: 4, action: 'Categoria atualizada', user: 'Sistema', time: '2 horas atrás', icon: Settings, color: 'text-purple-600' },
];

const upcomingEvents = [
  { id: 1, title: 'Reunião de Diretoria', date: '05/06/2026', time: '14:00', icon: Calendar },
  { id: 2, title: 'Vencimento de Anuidades', date: '15/06/2026', time: '23:59', icon: DollarSign },
  { id: 3, title: 'Congresso Anual', date: '20/07/2026', time: '09:00', icon: Award },
];

export function AssociacaoQuickAccess() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="px-4 md:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl mb-2">Acesso Rápido</h1>
            <p className="text-muted-foreground">
              Gerencie rapidamente os principais recursos do módulo
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {quickAccessItems.map((item) => {
              const Icon = item.icon;
              return (
                <Card
                  key={item.id}
                  onClick={() => navigate(item.route)}
                  className="group hover:shadow-lg transition-all cursor-pointer"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-14 h-14 rounded-xl ${item.color} flex items-center justify-center`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <Badge variant="secondary">{item.stats}</Badge>
                    </div>
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Ações Recentes</h3>
                <div className="space-y-3">
                  {recentActions.map((action) => {
                    const Icon = action.icon;
                    return (
                      <div key={action.id} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                        <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center flex-shrink-0">
                          <Icon className={`w-5 h-5 ${action.color}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm">{action.action}</p>
                          <p className="text-xs text-muted-foreground">{action.user}</p>
                        </div>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">{action.time}</span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Próximos Eventos</h3>
                <div className="space-y-3">
                  {upcomingEvents.map((event) => {
                    const Icon = event.icon;
                    return (
                      <div key={event.id} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm mb-1">{event.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {event.date} às {event.time}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
