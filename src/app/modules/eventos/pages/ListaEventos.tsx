import { useState } from 'react';
import { Plus, Search, Calendar, Users, MapPin, ChevronLeft, ChevronRight, Check, Clock } from 'lucide-react';
import { Card, CardContent } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Textarea } from '@/app/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/app/components/ui/dialog';

const mockEventos = [
  { id: 1, name: 'Congresso Nacional de Cardiologia 2026', tipo: 'Congresso', data: '15-18 Jul, 2026', local: 'São Paulo, SP', inscricoes: 1842, vagas: 3000, status: 'inscricoes_abertas', valor: 890 },
  { id: 2, name: 'Simpósio de Insuficiência Cardíaca', tipo: 'Simpósio', data: '05 Ago, 2026', local: 'Rio de Janeiro, RJ', inscricoes: 312, vagas: 500, status: 'planejamento', valor: 450 },
  { id: 3, name: 'Workshop Ecocardiografia Intervencionista', tipo: 'Workshop', data: '22-23 Ago, 2026', local: 'Online', inscricoes: 0, vagas: 200, status: 'planejamento', valor: 0 },
  { id: 4, name: 'Jornada Regional Sul', tipo: 'Jornada', data: '12 Set, 2026', local: 'Porto Alegre, RS', inscricoes: 0, vagas: 400, status: 'planejamento', valor: 320 },
];

const statusConfig: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
  inscricoes_abertas: { label: 'Inscrições Abertas', variant: 'default' },
  em_andamento: { label: 'Em Andamento', variant: 'secondary' },
  planejamento: { label: 'Planejamento', variant: 'outline' },
};

const wizardSteps = ['Dados do Evento', 'Local e Data', 'Inscrições', 'Programação', 'Revisão'];

function EventoWizard({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: '', tipo: 'Congresso', descricao: '',
    dataInicio: '', dataFim: '', local: '', cidade: '', online: false,
    vagas: '', valorAssociado: '', valorNaoAssociado: '',
    trilhas: [] as string[],
  });

  const tiposEvento = ['Congresso', 'Simpósio', 'Workshop', 'Jornada', 'Seminário', 'Curso Pré-Congresso'];
  const trilhasOptions = ['Cardiologia Clínica', 'Intervencionismo', 'Ecocardiografia', 'Eletrofisiologia', 'Insuficiência Cardíaca', 'Prevenção', 'Pediatria', 'Pesquisa'];

  const toggleTrilha = (t: string) => {
    setForm(f => ({ ...f, trilhas: f.trilhas.includes(t) ? f.trilhas.filter(x => x !== t) : [...f.trilhas, t] }));
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-xl p-0 gap-0">
        <DialogHeader className="p-6 pb-3">
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle>Novo Evento</DialogTitle>
              <p className="text-sm text-muted-foreground mt-0.5">Passo {step + 1} de {wizardSteps.length}</p>
            </div>
          </div>
        </DialogHeader>

        <div className="px-6 pt-2">
          <div className="flex items-center">
            {wizardSteps.map((s, i) => (
              <div key={i} className="flex items-center flex-1 last:flex-none">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${
                  i < step ? 'bg-primary text-primary-foreground' :
                  i === step ? 'bg-primary text-primary-foreground ring-4 ring-primary/20' :
                  'bg-muted text-muted-foreground'
                }`}>
                  {i < step ? <Check className="w-4 h-4" /> : i + 1}
                </div>
                {i < wizardSteps.length - 1 && <div className={`flex-1 h-0.5 mx-1 ${i < step ? 'bg-primary' : 'bg-border'}`} />}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-1.5 mb-4">
            {wizardSteps.map((s, i) => (
              <span key={i} className={`text-xs ${i === step ? 'text-primary font-medium' : 'text-muted-foreground'}`}>{s}</span>
            ))}
          </div>
        </div>

        <div className="px-6 pb-2 min-h-[260px]">
          {step === 0 && (
            <div className="space-y-4">
              <div>
                <Label>Nome do Evento</Label>
                <Input value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))}
                  placeholder="Ex: Congresso Nacional de Cardiologia 2026" />
              </div>
              <div>
                <Label>Tipo de Evento</Label>
                <div className="grid grid-cols-3 gap-2">
                  {tiposEvento.map(t => (
                    <Button key={t} variant={form.tipo === t ? 'default' : 'outline'} size="sm"
                      onClick={() => setForm(f => ({...f, tipo: t}))} type="button">
                      {t}
                    </Button>
                  ))}
                </div>
              </div>
              <div>
                <Label>Descrição</Label>
                <Textarea value={form.descricao} onChange={e => setForm(f => ({...f, descricao: e.target.value}))}
                  rows={2} className="resize-none" placeholder="Descrição do evento..." />
              </div>
            </div>
          )}
          {step === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Data Início</Label>
                  <Input type="date" value={form.dataInicio} onChange={e => setForm(f => ({...f, dataInicio: e.target.value}))} />
                </div>
                <div>
                  <Label>Data Fim</Label>
                  <Input type="date" value={form.dataFim} onChange={e => setForm(f => ({...f, dataFim: e.target.value}))} />
                </div>
              </div>
              <div className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg cursor-pointer" onClick={() => setForm(f => ({...f, online: !f.online}))}>
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${form.online ? 'border-primary bg-primary' : 'border-border'}`}>
                  {form.online && <Check className="w-3 h-3 text-white" />}
                </div>
                <span className="text-sm">Evento Online / Híbrido</span>
              </div>
              {!form.online && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Local / Venue</Label>
                    <Input value={form.local} onChange={e => setForm(f => ({...f, local: e.target.value}))}
                      placeholder="Nome do local" />
                  </div>
                  <div>
                    <Label>Cidade/Estado</Label>
                    <Input value={form.cidade} onChange={e => setForm(f => ({...f, cidade: e.target.value}))}
                      placeholder="São Paulo, SP" />
                  </div>
                </div>
              )}
            </div>
          )}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <Label>Vagas Totais</Label>
                <Input type="number" value={form.vagas} onChange={e => setForm(f => ({...f, vagas: e.target.value}))} placeholder="0" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Valor (Associado)</Label>
                  <Input type="number" value={form.valorAssociado} onChange={e => setForm(f => ({...f, valorAssociado: e.target.value}))} placeholder="R$ 0,00" />
                </div>
                <div>
                  <Label>Valor (Não Associado)</Label>
                  <Input type="number" value={form.valorNaoAssociado} onChange={e => setForm(f => ({...f, valorNaoAssociado: e.target.value}))} placeholder="R$ 0,00" />
                </div>
              </div>
            </div>
          )}
          {step === 3 && (
            <div>
              <p className="text-sm text-muted-foreground mb-3">Selecione as trilhas/eixos temáticos da programação científica</p>
              <div className="grid grid-cols-2 gap-2">
                {trilhasOptions.map(t => (
                  <Button key={t} variant={form.trilhas.includes(t) ? 'default' : 'outline'} size="sm"
                    onClick={() => toggleTrilha(t)} type="button"
                    className="justify-start gap-2 h-auto py-3 text-left">
                    {form.trilhas.includes(t) ? <Check className="w-3.5 h-3.5 flex-shrink-0" /> : <div className="w-3.5 h-3.5 flex-shrink-0" />}
                    {t}
                  </Button>
                ))}
              </div>
            </div>
          )}
          {step === 4 && (
            <div className="space-y-4">
              <div className="bg-muted/30 rounded-xl p-4">
                <h4 className="font-medium mb-3">{form.name || 'Sem nome'}</h4>
                <div className="grid grid-cols-2 gap-y-2 text-sm">
                  <div><span className="text-muted-foreground">Tipo:</span> {form.tipo}</div>
                  <div><span className="text-muted-foreground">Vagas:</span> {form.vagas || 0}</div>
                  <div><span className="text-muted-foreground">Início:</span> {form.dataInicio || '—'}</div>
                  <div><span className="text-muted-foreground">Fim:</span> {form.dataFim || '—'}</div>
                  <div><span className="text-muted-foreground">Local:</span> {form.online ? 'Online' : form.cidade || '—'}</div>
                  <div><span className="text-muted-foreground">Trilhas:</span> {form.trilhas.length}</div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-border flex justify-between">
          <Button variant="outline" onClick={() => step === 0 ? onClose() : setStep(s => s - 1)}>
            <ChevronLeft className="w-4 h-4 mr-1" />{step === 0 ? 'Cancelar' : 'Anterior'}
          </Button>
          <Button onClick={() => step < wizardSteps.length - 1 ? setStep(s => s + 1) : onClose()}>
            {step < wizardSteps.length - 1 ? 'Próximo' : 'Criar Evento'}
            {step < wizardSteps.length - 1 && <ChevronRight className="w-4 h-4 ml-1" />}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function ListaEventos() {
  const [search, setSearch] = useState('');
  const [showWizard, setShowWizard] = useState(false);

  const filtered = mockEventos.filter(e => e.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-background">
      <div className="px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl mb-2">Eventos</h1>
              <p className="text-muted-foreground">Gerencie congressos, simpósios, workshops e jornadas</p>
            </div>
            <Button onClick={() => setShowWizard(true)}>
              <Plus className="w-4 h-4 mr-2" /> Novo Evento
            </Button>
          </div>

          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar eventos..."
              className="pl-9" />
          </div>

          <div className="space-y-4">
            {filtered.map(e => {
              const s = statusConfig[e.status];
              const pct = e.vagas > 0 ? (e.inscricoes / e.vagas) * 100 : 0;
              return (
                <Card key={e.id} className="group hover:shadow-md transition-all cursor-pointer">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-6 h-6 text-pink-500" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-1">
                          <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">{e.name}</h3>
                          <Badge variant={s.variant} className="ml-3 flex-shrink-0">{s.label}</Badge>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{e.data}</span>
                          <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{e.local}</span>
                          <Badge variant="secondary" className="text-xs">{e.tipo}</Badge>
                          {e.valor > 0 && <span className="text-green-600 font-medium">R$ {e.valor}</span>}
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="flex-1">
                            <div className="flex justify-between text-xs text-muted-foreground mb-1">
                              <span>{e.inscricoes} inscrições</span>
                              <span>{e.vagas} vagas</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-1.5">
                              <div className="bg-pink-500 h-1.5 rounded-full transition-all" style={{ width: `${Math.min(pct, 100)}%` }} />
                            </div>
                          </div>
                          <span className="text-xs text-muted-foreground">{pct.toFixed(0)}%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
      {showWizard && <EventoWizard onClose={() => setShowWizard(false)} />}
    </div>
  );
}
