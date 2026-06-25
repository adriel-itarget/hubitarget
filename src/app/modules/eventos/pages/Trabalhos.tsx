import { useState } from 'react';
import { Search, FileText, User, ChevronDown, Tag, AlertCircle, CheckCircle, Clock } from 'lucide-react';

const mockTrabalhos = [
  { id: 1, titulo: 'Impacto da Telemedicina no Seguimento de Pacientes com IC Avançada', autor: 'Dr. Paulo Mendes', coautores: 2, evento: 'Congresso Nacional 2026', eixo: 'Insuficiência Cardíaca', status: 'aguardando_avaliacao', avaliador: null, nota: null },
  { id: 2, titulo: 'Resultados de 5 anos do Registro Brasileiro de Intervenção Coronariana', autor: 'Dra. Camila Torres', coautores: 5, evento: 'Congresso Nacional 2026', eixo: 'Intervencionismo', status: 'em_avaliacao', avaliador: 'Dr. Roberto Alves', nota: null },
  { id: 3, titulo: 'Correlação entre Variabilidade de Frequência Cardíaca e Desfechos Clínicos', autor: 'Dr. Fernando Lima', coautores: 3, evento: 'Congresso Nacional 2026', eixo: 'Eletrofisiologia', status: 'avaliado', avaliador: 'Dra. Marta Sousa', nota: 8.5 },
  { id: 4, titulo: 'Eficácia do Treinamento Físico em Pacientes Pós-IAM na Era dos Novos Medicamentos', autor: 'Dra. Ana Paula Costa', coautores: 4, evento: 'Congresso Nacional 2026', eixo: 'Prevenção', status: 'aguardando_avaliacao', avaliador: null, nota: null },
  { id: 5, titulo: 'Biomarcadores Cardíacos como Preditores de Recorrência em FA', autor: 'Dr. Lucas Ferreira', coautores: 2, evento: 'Congresso Nacional 2026', eixo: 'Eletrofisiologia', status: 'aceito', avaliador: 'Dr. Carlos Melo', nota: 9.2 },
];

const avaliadores = ['Dr. Roberto Alves', 'Dra. Marta Sousa', 'Dr. Carlos Melo', 'Dra. Juliana Pinto', 'Dr. Eduardo Santos'];

const statusConfig: Record<string, { label: string; color: string; icon: typeof FileText }> = {
  aguardando_avaliacao: { label: 'Aguardando', color: 'bg-yellow-500/10 text-yellow-600', icon: Clock },
  em_avaliacao: { label: 'Em Avaliação', color: 'bg-blue-500/10 text-blue-600', icon: Clock },
  avaliado: { label: 'Avaliado', color: 'bg-purple-500/10 text-purple-600', icon: CheckCircle },
  aceito: { label: 'Aceito', color: 'bg-green-500/10 text-green-600', icon: CheckCircle },
  rejeitado: { label: 'Rejeitado', color: 'bg-red-500/10 text-red-600', icon: AlertCircle },
};

export function Trabalhos() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('todos');
  const [distribuindo, setDistribuindo] = useState<number | null>(null);
  const [avaliadorSel, setAvaliadorSel] = useState('');

  const filtered = mockTrabalhos.filter(t => {
    const matchSearch = t.titulo.toLowerCase().includes(search.toLowerCase()) || t.autor.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'todos' || t.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const aguardando = mockTrabalhos.filter(t => t.status === 'aguardando_avaliacao').length;

  return (
    <div className="min-h-screen bg-background">
      <div className="px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl mb-2">Submissão de Trabalhos</h1>
              <p className="text-muted-foreground">Gerencie trabalhos submetidos e distribua para avaliadores</p>
            </div>
            {aguardando > 0 && (
              <div className="flex items-center gap-2 px-4 py-2 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <AlertCircle className="w-4 h-4 text-yellow-600" />
                <span className="text-sm text-yellow-600 font-medium">{aguardando} aguardando distribuição</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar por título ou autor..."
                className="w-full pl-9 pr-4 py-2.5 bg-card border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 outline-none" />
            </div>
            <div className="flex gap-1.5">
              {[
                { value: 'todos', label: 'Todos' },
                { value: 'aguardando_avaliacao', label: 'Aguardando' },
                { value: 'em_avaliacao', label: 'Em Avaliação' },
                { value: 'avaliado', label: 'Avaliados' },
                { value: 'aceito', label: 'Aceitos' },
              ].map(f => (
                <button key={f.value} onClick={() => setStatusFilter(f.value)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${statusFilter === f.value ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-accent'}`}>
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Trabalho</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Eixo</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Avaliador</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                  <th className="text-right px-6 py-3 text-xs font-medium text-muted-foreground uppercase tracking-wider">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map(t => {
                  const s = statusConfig[t.status];
                  return (
                    <tr key={t.id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium line-clamp-1">{t.titulo}</p>
                        <div className="flex items-center gap-1 mt-0.5 text-xs text-muted-foreground">
                          <User className="w-3 h-3" />
                          <span>{t.autor}</span>
                          {t.coautores > 0 && <span>+ {t.coautores} coaut.</span>}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs bg-muted px-2 py-0.5 rounded text-muted-foreground">{t.eixo}</span>
                      </td>
                      <td className="px-6 py-4">
                        {distribuindo === t.id ? (
                          <div className="flex items-center gap-2">
                            <select value={avaliadorSel} onChange={e => setAvaliadorSel(e.target.value)}
                              className="text-xs px-2 py-1.5 bg-input-background border border-border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none">
                              <option value="">Selecione...</option>
                              {avaliadores.map(a => <option key={a}>{a}</option>)}
                            </select>
                            <button onClick={() => setDistribuindo(null)}
                              className="text-xs px-2 py-1 bg-primary text-primary-foreground rounded hover:bg-primary/90">OK</button>
                          </div>
                        ) : (
                          <span className="text-sm text-muted-foreground">{t.avaliador || '—'}</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${s.color}`}>{s.label}</span>
                          {t.nota && <span className="text-xs font-semibold text-primary">{t.nota}</span>}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        {t.status === 'aguardando_avaliacao' && (
                          <button onClick={() => setDistribuindo(t.id)}
                            className="text-xs px-3 py-1.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                            Distribuir
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
