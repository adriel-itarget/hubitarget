import { ClipboardList, Users, FileText, MapPin, AlertCircle, CheckCircle, Clock } from 'lucide-react';

const processos = [
  { id: 1, name: 'Prova de Título 2026 - 1ª Fase', status: 'inscricoes_abertas', candidatos: 312, encerramento: '30/06/2026' },
  { id: 2, name: 'Prova de Título 2025 - 2ª Fase', status: 'em_andamento', candidatos: 189, encerramento: '15/07/2026' },
  { id: 3, name: 'Prova de Recertificação 2026', status: 'planejamento', candidatos: 0, encerramento: '01/09/2026' },
];

const statusConfig: Record<string, { label: string; color: string }> = {
  inscricoes_abertas: { label: 'Inscrições Abertas', color: 'bg-green-500/10 text-green-600' },
  em_andamento: { label: 'Em Andamento', color: 'bg-blue-500/10 text-blue-600' },
  planejamento: { label: 'Planejamento', color: 'bg-yellow-500/10 text-yellow-600' },
  encerrado: { label: 'Encerrado', color: 'bg-muted text-muted-foreground' },
};

export function ExamesDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <div className="px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl mb-2">Dashboard - Exames e Provas</h1>
            <p className="text-muted-foreground">Gestão de processos de inscrição e provas de título</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { icon: ClipboardList, color: 'bg-indigo-500', iconColor: 'text-indigo-500', bg: 'bg-indigo-500/10', label: 'Processos Ativos', value: '3', badge: '' },
              { icon: Users, color: 'bg-blue-500', iconColor: 'text-blue-500', bg: 'bg-blue-500/10', label: 'Candidatos Inscritos', value: '501', badge: '+47 hoje' },
              { icon: FileText, color: 'bg-purple-500', iconColor: 'text-purple-500', bg: 'bg-purple-500/10', label: 'Editais Publicados', value: '5', badge: '' },
              { icon: MapPin, color: 'bg-orange-500', iconColor: 'text-orange-500', bg: 'bg-orange-500/10', label: 'Locais de Prova', value: '12', badge: '' },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-full ${item.bg} flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${item.iconColor}`} />
                    </div>
                    {item.badge && <span className="text-xs text-green-600 font-medium">{item.badge}</span>}
                  </div>
                  <h3 className="text-2xl font-semibold mb-1">{item.value}</h3>
                  <p className="text-sm text-muted-foreground">{item.label}</p>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-xl">
              <div className="p-6 border-b border-border">
                <h3 className="font-semibold">Processos em Andamento</h3>
              </div>
              <div className="divide-y divide-border">
                {processos.map(p => {
                  const s = statusConfig[p.status];
                  return (
                    <div key={p.id} className="p-5 hover:bg-muted/30 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="font-medium text-sm">{p.name}</h4>
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${s.color}`}>{s.label}</span>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {p.candidatos} candidatos</span>
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> Encerra {p.encerramento}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-semibold mb-4">Ações Pendentes</h3>
              <div className="space-y-3">
                <div className="p-4 border border-orange-500/20 bg-orange-500/5 rounded-lg flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm mb-1">47 documentos aguardando análise</p>
                    <p className="text-xs text-muted-foreground mb-2">Prova de Título 2026 - 1ª Fase</p>
                    <button className="text-xs px-3 py-1 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors">
                      Revisar Documentos
                    </button>
                  </div>
                </div>
                <div className="p-4 border border-blue-500/20 bg-blue-500/5 rounded-lg flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm mb-1">Publicar edital 2ª fase</p>
                    <p className="text-xs text-muted-foreground mb-2">Prazo: 15/06/2026</p>
                    <button className="text-xs px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
                      Ver Edital
                    </button>
                  </div>
                </div>
                <div className="p-4 border border-purple-500/20 bg-purple-500/5 rounded-lg flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm mb-1">Confirmar 3 locais de prova</p>
                    <p className="text-xs text-muted-foreground mb-2">São Paulo, Rio de Janeiro, Brasília</p>
                    <button className="text-xs px-3 py-1 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors">
                      Gerenciar Locais
                    </button>
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
