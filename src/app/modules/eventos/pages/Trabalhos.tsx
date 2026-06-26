import { useState } from 'react';
import { Search, User, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { Card, CardContent } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Input } from '@/app/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';

const mockTrabalhos = [
  { id: 1, titulo: 'Impacto da Telemedicina no Seguimento de Pacientes com IC Avançada', autor: 'Dr. Paulo Mendes', coautores: 2, evento: 'Congresso Nacional 2026', eixo: 'Insuficiência Cardíaca', status: 'aguardando_avaliacao', avaliador: null, nota: null },
  { id: 2, titulo: 'Resultados de 5 anos do Registro Brasileiro de Intervenção Coronariana', autor: 'Dra. Camila Torres', coautores: 5, evento: 'Congresso Nacional 2026', eixo: 'Intervencionismo', status: 'em_avaliacao', avaliador: 'Dr. Roberto Alves', nota: null },
  { id: 3, titulo: 'Correlação entre Variabilidade de Frequência Cardíaca e Desfechos Clínicos', autor: 'Dr. Fernando Lima', coautores: 3, evento: 'Congresso Nacional 2026', eixo: 'Eletrofisiologia', status: 'avaliado', avaliador: 'Dra. Marta Sousa', nota: 8.5 },
  { id: 4, titulo: 'Eficácia do Treinamento Físico em Pacientes Pós-IAM na Era dos Novos Medicamentos', autor: 'Dra. Ana Paula Costa', coautores: 4, evento: 'Congresso Nacional 2026', eixo: 'Prevenção', status: 'aguardando_avaliacao', avaliador: null, nota: null },
  { id: 5, titulo: 'Biomarcadores Cardíacos como Preditores de Recorrência em FA', autor: 'Dr. Lucas Ferreira', coautores: 2, evento: 'Congresso Nacional 2026', eixo: 'Eletrofisiologia', status: 'aceito', avaliador: 'Dr. Carlos Melo', nota: 9.2 },
];

const avaliadores = ['Dr. Roberto Alves', 'Dra. Marta Sousa', 'Dr. Carlos Melo', 'Dra. Juliana Pinto', 'Dr. Eduardo Santos'];

const statusConfig: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
  aguardando_avaliacao: { label: 'Aguardando', variant: 'outline' },
  em_avaliacao: { label: 'Em Avaliação', variant: 'secondary' },
  avaliado: { label: 'Avaliado', variant: 'secondary' },
  aceito: { label: 'Aceito', variant: 'default' },
  rejeitado: { label: 'Rejeitado', variant: 'destructive' },
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
              <Badge variant="outline" className="border-yellow-500/20 text-yellow-600 bg-yellow-500/10 gap-1.5 py-1.5 px-3">
                <AlertCircle className="w-4 h-4" />
                {aguardando} aguardando distribuição
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar por título ou autor..."
                className="pl-9" />
            </div>
            <div className="flex gap-1.5">
              {[
                { value: 'todos', label: 'Todos' },
                { value: 'aguardando_avaliacao', label: 'Aguardando' },
                { value: 'em_avaliacao', label: 'Em Avaliação' },
                { value: 'avaliado', label: 'Avaliados' },
                { value: 'aceito', label: 'Aceitos' },
              ].map(f => (
                <Button key={f.value} variant={statusFilter === f.value ? 'default' : 'secondary'} size="sm"
                  onClick={() => setStatusFilter(f.value)}>
                  {f.label}
                </Button>
              ))}
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Trabalho</TableHead>
                    <TableHead>Eixo</TableHead>
                    <TableHead>Avaliador</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ação</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map(t => {
                    const s = statusConfig[t.status];
                    return (
                      <TableRow key={t.id}>
                        <TableCell>
                          <p className="text-sm font-medium line-clamp-1">{t.titulo}</p>
                          <div className="flex items-center gap-1 mt-0.5 text-xs text-muted-foreground">
                            <User className="w-3 h-3" />
                            <span>{t.autor}</span>
                            {t.coautores > 0 && <span>+ {t.coautores} coaut.</span>}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{t.eixo}</Badge>
                        </TableCell>
                        <TableCell>
                          {distribuindo === t.id ? (
                            <div className="flex items-center gap-2">
                              <Select value={avaliadorSel} onValueChange={setAvaliadorSel}>
                                <SelectTrigger className="w-40 h-8 text-xs">
                                  <SelectValue placeholder="Selecione..." />
                                </SelectTrigger>
                                <SelectContent>
                                  {avaliadores.map(a => <SelectItem key={a} value={a}>{a}</SelectItem>)}
                                </SelectContent>
                              </Select>
                              <Button size="sm" className="h-7 text-xs" onClick={() => setDistribuindo(null)}>OK</Button>
                            </div>
                          ) : (
                            <span className="text-sm text-muted-foreground">{t.avaliador || '—'}</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Badge variant={s.variant}>{s.label}</Badge>
                            {t.nota && <span className="text-xs font-semibold text-primary">{t.nota}</span>}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          {t.status === 'aguardando_avaliacao' && (
                            <Button size="sm" onClick={() => setDistribuindo(t.id)}>
                              Distribuir
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
