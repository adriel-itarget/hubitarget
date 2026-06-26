import { useState } from 'react';
import { Plus, Search, HelpCircle, ChevronDown, ChevronUp, Edit2 } from 'lucide-react';
import { Card, CardContent } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Badge } from '@/app/components/ui/badge';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/app/components/ui/dialog';
import { Label } from '@/app/components/ui/label';
import { Textarea } from '@/app/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/app/components/ui/radio-group';

const eixos = ['Todos', 'Fisiopatologia', 'Diagnóstico', 'Tratamento', 'Prevenção', 'Hemodinâmica', 'Eletrofisiologia'];
const cursos = ['Todos os Cursos', 'Cardiologia Intervencionista', 'Ecocardiografia Avançada', 'Eletrofisiologia Clínica'];

const mockQuestoes = [
  {
    id: 1, enunciado: 'Qual o mecanismo de ação principal dos betabloqueadores no tratamento da insuficiência cardíaca?',
    eixo: 'Tratamento', curso: 'Cardiologia Intervencionista', dificuldade: 'media',
    alternativas: [
      { id: 'a', texto: 'Bloqueio dos receptores alfa-adrenérgicos', correta: false },
      { id: 'b', texto: 'Bloqueio dos receptores beta-1 adrenérgicos, reduzindo a frequência cardíaca e o trabalho miocárdico', correta: true },
      { id: 'c', texto: 'Inibição da enzima conversora de angiotensina', correta: false },
      { id: 'd', texto: 'Bloqueio dos canais de cálcio', correta: false },
    ],
  },
  {
    id: 2, enunciado: 'Na estenose aórtica grave, qual é o valor de área valvar que caracteriza gravidade?',
    eixo: 'Diagnóstico', curso: 'Ecocardiografia Avançada', dificuldade: 'dificil',
    alternativas: [
      { id: 'a', texto: 'Área valvar < 2,0 cm²', correta: false },
      { id: 'b', texto: 'Área valvar < 1,5 cm²', correta: false },
      { id: 'c', texto: 'Área valvar < 1,0 cm²', correta: true },
      { id: 'd', texto: 'Área valvar < 0,5 cm²', correta: false },
    ],
  },
  {
    id: 3, enunciado: 'Qual o principal mecanismo de reentrada em taquicardia por reentrada nodal?',
    eixo: 'Eletrofisiologia', curso: 'Eletrofisiologia Clínica', dificuldade: 'facil',
    alternativas: [
      { id: 'a', texto: 'Circuito de reentrada no nó sinusal', correta: false },
      { id: 'b', texto: 'Reentrada utilizando duas vias no nó AV com diferentes velocidades de condução', correta: true },
      { id: 'c', texto: 'Automatismo aumentado nas fibras de Purkinje', correta: false },
      { id: 'd', texto: 'Pós-potenciais tardios', correta: false },
    ],
  },
];

const dificuldadeConfig: Record<string, { label: string; color: string }> = {
  facil: { label: 'Fácil', color: 'bg-green-500/10 text-green-600' },
  media: { label: 'Média', color: 'bg-yellow-500/10 text-yellow-600' },
  dificil: { label: 'Difícil', color: 'bg-red-500/10 text-red-600' },
};

function QuestaoModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [form, setForm] = useState({
    enunciado: '', eixo: '', curso: '', dificuldade: 'media',
    alternativas: [
      { id: 'a', texto: '', correta: false },
      { id: 'b', texto: '', correta: false },
      { id: 'c', texto: '', correta: false },
      { id: 'd', texto: '', correta: false },
    ],
  });

  const setCorreta = (id: string) => {
    setForm(f => ({...f, alternativas: f.alternativas.map(a => ({...a, correta: a.id === id}))}));
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Nova Questão</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Enunciado</Label>
            <Textarea value={form.enunciado} onChange={e => setForm(f => ({...f, enunciado: e.target.value}))}
              rows={3} placeholder="Digite o enunciado da questão..." className="resize-none" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Eixo Temático</Label>
              <Select value={form.eixo} onValueChange={v => setForm(f => ({...f, eixo: v}))}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  {eixos.filter(e => e !== 'Todos').map(e => (
                    <SelectItem key={e} value={e}>{e}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Curso</Label>
              <Select value={form.curso} onValueChange={v => setForm(f => ({...f, curso: v}))}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione..." />
                </SelectTrigger>
                <SelectContent>
                  {cursos.filter(c => c !== 'Todos os Cursos').map(c => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Dificuldade</Label>
              <Select value={form.dificuldade} onValueChange={v => setForm(f => ({...f, dificuldade: v}))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="facil">Fácil</SelectItem>
                  <SelectItem value="media">Média</SelectItem>
                  <SelectItem value="dificil">Difícil</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label className="mb-2 block">Alternativas (marque a correta)</Label>
            <RadioGroup value={form.alternativas.find(a => a.correta)?.id} onValueChange={setCorreta}>
              <div className="space-y-2">
                {form.alternativas.map((alt) => (
                  <div key={alt.id} className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                    alt.correta ? 'border-green-500 bg-green-500/5' : 'border-border'
                  }`}>
                    <RadioGroupItem value={alt.id} id={`alt-${alt.id}`} />
                    <span className="text-sm font-medium text-muted-foreground w-4">{alt.id.toUpperCase()})</span>
                    <Input value={alt.texto}
                      onChange={e => setForm(f => ({...f, alternativas: f.alternativas.map(a => a.id === alt.id ? {...a, texto: e.target.value} : a)}))}
                      className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                      placeholder={`Alternativa ${alt.id.toUpperCase()}...`} />
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button onClick={onClose}>Salvar Questão</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function BancoQuestoes() {
  const [search, setSearch] = useState('');
  const [eixoFilter, setEixoFilter] = useState('Todos');
  const [cursoFilter, setCursoFilter] = useState('Todos os Cursos');
  const [showModal, setShowModal] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(null);

  const filtered = mockQuestoes.filter(q => {
    const matchSearch = q.enunciado.toLowerCase().includes(search.toLowerCase());
    const matchEixo = eixoFilter === 'Todos' || q.eixo === eixoFilter;
    const matchCurso = cursoFilter === 'Todos os Cursos' || q.curso === cursoFilter;
    return matchSearch && matchEixo && matchCurso;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl mb-2">Banco de Questões</h1>
              <p className="text-muted-foreground">Questões organizadas por curso e eixo temático</p>
            </div>
            <Button onClick={() => setShowModal(true)}>
              <Plus className="w-4 h-4 mr-2" /> Nova Questão
            </Button>
          </div>

          <div className="flex gap-3 mb-4 flex-wrap">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Buscar questões..."
                className="pl-9" />
            </div>
            <Select value={cursoFilter} onValueChange={setCursoFilter}>
              <SelectTrigger className="w-[220px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {cursos.map(c => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-wrap gap-1.5 mb-6">
            {eixos.map(e => (
              <Button key={e} variant={eixoFilter === e ? 'default' : 'outline'} size="sm"
                onClick={() => setEixoFilter(e)}>
                {e}
              </Button>
            ))}
          </div>

          <div className="space-y-3">
            {filtered.map(q => {
              const dif = dificuldadeConfig[q.dificuldade];
              const isExp = expanded === q.id;
              return (
                <Card key={q.id} className="overflow-hidden">
                  <div className="p-5 flex items-start gap-4 cursor-pointer hover:bg-muted/30 transition-colors"
                    onClick={() => setExpanded(isExp ? null : q.id)}>
                    <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <HelpCircle className="w-4 h-4 text-purple-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium leading-relaxed">{q.enunciado}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="secondary">{q.eixo}</Badge>
                        <Badge variant="secondary">{q.curso}</Badge>
                        <Badge variant="outline" className={dif.color}>{dif.label}</Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Button variant="ghost" size="icon" className="h-8 w-8"
                        onClick={e => e.stopPropagation()}>
                        <Edit2 className="w-3.5 h-3.5 text-muted-foreground" />
                      </Button>
                      {isExp ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                    </div>
                  </div>
                  {isExp && (
                    <div className="border-t border-border px-5 py-4 bg-muted/20">
                      <div className="space-y-2">
                        {q.alternativas.map(alt => (
                          <div key={alt.id} className={`flex items-center gap-3 p-3 rounded-lg ${alt.correta ? 'bg-green-500/10 border border-green-500/30' : 'bg-card border border-border'}`}>
                            <span className={`text-sm font-semibold w-5 ${alt.correta ? 'text-green-600' : 'text-muted-foreground'}`}>{alt.id.toUpperCase()})</span>
                            <span className={`text-sm ${alt.correta ? 'text-green-700 font-medium' : ''}`}>{alt.texto}</span>
                            {alt.correta && <span className="ml-auto text-xs text-green-600 font-medium">✓ Correta</span>}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        </div>
      </div>
      <QuestaoModal open={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}
