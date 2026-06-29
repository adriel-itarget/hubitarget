import { Search, TrendingUp, Users, FileText, Calendar, MessageSquare, DollarSign, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const resources = [
  {
    id: 1,
    name: 'Gestão de Membros',
    description: 'Sistema completo para gerenciar associados com automação inteligente',
    icon: Users,
    price: 99,
    category: 'Associados',
  },
  {
    id: 2,
    name: 'Portal Financeiro',
    description: 'Controle financeiro com IA e integração bancária automática',
    icon: DollarSign,
    price: 149,
    category: 'Financeiro',
  },
  {
    id: 3,
    name: 'Agenda de Eventos',
    description: 'Gestão completa de eventos com check-in digital e certificados',
    icon: Calendar,
    price: 79,
    category: 'Eventos',
  },
  {
    id: 4,
    name: 'Centro de Documentos',
    description: 'Repositório seguro com assinatura digital e controle de versão',
    icon: FileText,
    price: 59,
    category: 'Documentos',
  },
  {
    id: 5,
    name: 'Comunicação Integrada',
    description: 'Multicanal com personalização e análise de engajamento',
    icon: MessageSquare,
    price: 89,
    category: 'Comunicação',
  },
  {
    id: 6,
    name: 'Analytics Avançado',
    description: 'Business intelligence com dashboards personalizáveis e insights',
    icon: TrendingUp,
    price: 129,
    category: 'Analytics',
  },
];

export function ResourceStore() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen pb-24">
      <div className="bg-card border-b border-border px-8 py-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="mb-2">Departamentos Disponíveis</h1>
          <p className="text-muted-foreground mb-8">
            Expanda as capacidades da sua entidade com departamentos especializados
          </p>

          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar departamentos..."
              className="w-full pl-11 pr-4 py-3 rounded-lg bg-background border border-border text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {resources.map((resource) => {
            const Icon = resource.icon;
            return (
              <div
                key={resource.id}
                onClick={() => navigate(`/hub/loja/${resource.id}`)}
                className="group bg-card rounded-xl overflow-hidden border border-border hover:border-primary/50 hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded-md bg-muted text-muted-foreground">
                      {resource.category}
                    </span>
                  </div>

                  <h3 className="mb-2">
                    {resource.name}
                  </h3>

                  <p className="text-sm text-muted-foreground mb-6 line-clamp-2">
                    {resource.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-xl font-semibold">R$ {resource.price}</span>
                        <span className="text-sm text-muted-foreground">/mês</span>
                      </div>
                      <span className="text-xs text-muted-foreground">Plano básico</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 bg-muted/50 rounded-xl p-8 border border-border">
          <div className="max-w-2xl">
            <h3 className="mb-2">Precisa de algo específico?</h3>
            <p className="text-muted-foreground mb-6">
              Nossa equipe desenvolve departamentos personalizados sob medida para as necessidades da sua entidade
            </p>
            <button className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
              Falar com Especialista
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
