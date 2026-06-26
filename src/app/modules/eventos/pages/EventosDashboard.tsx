import { Calendar, Users, FileText, UserCheck, AlertCircle, Clock, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';

const proximosEventos = [
  { id: 1, name: 'Congresso Nacional de Cardiologia 2026', data: '15-18 Jul, 2026', inscricoes: 1842, locais: 'São Paulo, SP', status: 'inscricoes_abertas' },
  { id: 2, name: 'Simpósio de Insuficiência Cardíaca', data: '05 Ago, 2026', inscricoes: 312, locais: 'Rio de Janeiro, RJ', status: 'planejamento' },
  { id: 3, name: 'Workshop Ecocardiografia Intervencionista', data: '22-23 Ago, 2026', inscricoes: 0, locais: 'Online', status: 'planejamento' },
];

const statusConfig: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
  inscricoes_abertas: { label: 'Inscrições Abertas', variant: 'default' },
  em_andamento: { label: 'Em Andamento', variant: 'secondary' },
  planejamento: { label: 'Planejamento', variant: 'outline' },
};

export function EventosDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <div className="px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl mb-2">Dashboard - Eventos</h1>
            <p className="text-muted-foreground">Gestão de eventos, inscrições e programação científica</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { icon: Calendar, bg: 'bg-pink-500/10', color: 'text-pink-500', label: 'Eventos Ativos', value: '3', badge: '' },
              { icon: Users, bg: 'bg-blue-500/10', color: 'text-blue-500', label: 'Total de Inscrições', value: '2.154', badge: '+1.842 mês' },
              { icon: FileText, bg: 'bg-purple-500/10', color: 'text-purple-500', label: 'Trabalhos Submetidos', value: '287', badge: '43 novos' },
              { icon: UserCheck, bg: 'bg-green-500/10', color: 'text-green-500', label: 'Palestrantes Confirmados', value: '64', badge: '12 pendentes' },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <Card key={i}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-full ${item.bg} flex items-center justify-center`}>
                        <Icon className={`w-6 h-6 ${item.color}`} />
                      </div>
                      {item.badge && <span className="text-xs text-green-600 font-medium">{item.badge}</span>}
                    </div>
                    <h3 className="text-2xl font-semibold mb-1">{item.value}</h3>
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Próximos Eventos</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-border">
                  {proximosEventos.map(e => {
                    const s = statusConfig[e.status];
                    return (
                      <div key={e.id} className="p-5 hover:bg-muted/30 transition-colors">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium text-sm">{e.name}</h4>
                          <Badge variant={s.variant} className="ml-2 flex-shrink-0">{s.label}</Badge>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{e.data}</span>
                          <span className="flex items-center gap-1"><Users className="w-3 h-3" />{e.inscricoes} inscrições</span>
                          <span>{e.locais}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Ações Prioritárias</h3>
                <div className="space-y-3">
                  <div className="p-4 border border-orange-500/20 bg-orange-500/5 rounded-lg flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm mb-1">12 palestrantes aguardando aceite</p>
                      <p className="text-xs text-muted-foreground mb-2">Congresso Nacional · prazo 10/06</p>
                      <Button size="sm" className="bg-orange-500 text-white hover:bg-orange-600 h-7 text-xs">Enviar Convites</Button>
                    </div>
                  </div>
                  <div className="p-4 border border-purple-500/20 bg-purple-500/5 rounded-lg flex items-start gap-3">
                    <FileText className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm mb-1">43 trabalhos para distribuir a avaliadores</p>
                      <p className="text-xs text-muted-foreground mb-2">Congresso Nacional · 3 avaliadores disponíveis</p>
                      <Button size="sm" className="bg-purple-500 text-white hover:bg-purple-600 h-7 text-xs">Distribuir Trabalhos</Button>
                    </div>
                  </div>
                  <div className="p-4 border border-blue-500/20 bg-blue-500/5 rounded-lg flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm mb-1">Programação científica 78% completa</p>
                      <p className="text-xs text-muted-foreground mb-2">14 sessões sem palestrante confirmado</p>
                      <Button size="sm" className="bg-blue-500 text-white hover:bg-blue-600 h-7 text-xs">Ver Programação</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
