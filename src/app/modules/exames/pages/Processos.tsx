import { useState } from 'react';
import { Plus, Search, ChevronRight, Users, Clock, FileText, MapPin, Tag, BookOpen, ChevronLeft, Check, ClipboardList } from 'lucide-react';
import { Card, CardContent } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Badge } from '@/app/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/app/components/ui/dialog';
import { Label } from '@/app/components/ui/label';
import { Textarea } from '@/app/components/ui/textarea';

const mockProcessos = [
  {
    id: 1, name: 'Prova de Título 2026 - 1ª Fase', status: 'inscricoes_abertas',
    modalidades: ['Prova Escrita', 'Análise de Currículo'], categorias: ['Titular', 'Aspirante'],
    candidatos: 312, inicio: '01/06/2026', encerramento: '30/06/2026',
    locais: 5, documentos: 8,
  },
  {
    id: 2, name: 'Prova de Título 2025 - 2ª Fase', status: 'em_andamento',
    modalidades: ['Prova Prática'], categorias: ['Titular'],
    candidatos: 189, inicio: '01/07/2026', encerramento: '15/07/2026',
    locais: 3, documentos: 4,
  },
  {
    id: 3, name: 'Prova de Recertificação 2026', status: 'planejamento',
    modalidades: ['Prova Escrita', 'Prova Oral'], categorias: ['Titular', 'Recertificação'],
    candidatos: 0, inicio: '01/09/2026', encerramento: '30/09/2026',
    locais: 0, documentos: 0,
  },
];

const statusConfig: Record<string, { label: string; color: string }> = {
  inscricoes_abertas: { label: 'Inscrições Abertas', color: 'bg-green-500/10 text-green-600' },
  em_andamento: { label: 'Em Andamento', color: 'bg-blue-500/10 text-blue-600' },
  planejamento: { label: 'Planejamento', color: 'bg-yellow-500/10 text-yellow-600' },
};

const wizardSteps = ['Identificação', 'Modalidades', 'Categorias', 'Locais', 'Documentos', 'Revisão'];

function ProcessoWizard({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: '', descricao: '', inicio: '', encerramento: '',
    modalidades: [] as string[], categorias: [] as string[],
    locais: [] as string[], documentos: [] as string[],
  });

  const modalidadesOptions = ['Prova Escrita', 'Prova Oral', 'Prova Prática', 'Análise de Currículo', 'Entrevista'];
  const categoriasOptions = ['Titular', 'Aspirante', 'Estudante', 'Recertificação', 'Internacional'];
  const locaisOptions = ['São Paulo - SP', 'Rio de Janeiro - RJ', 'Brasília - DF', 'Belo Horizonte - MG', 'Porto Alegre - RS', 'Salvador - BA'];
  const documentosOptions = ['Diploma de Medicina', 'Comprovante de Residência', 'Foto 3x4', 'Comprovante de Especialização', 'Currículo Lattes', 'Certidão de Ética', 'Comprovante de Pagamento'];

  const toggle = (key: keyof typeof form, val: string) => {
    const arr = form[key] as string[];
    setForm(f => ({ ...f, [key]: arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val] }));
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Novo Processo de Inscrição</DialogTitle>
          <p className="text-sm text-muted-foreground">Passo {step + 1} de {wizardSteps.length}</p>
        </DialogHeader>

        <div className="px-1 pt-2">
          <div className="flex items-center gap-0">
            {wizardSteps.map((s, i) => (
              <div key={i} className="flex items-center flex-1 last:flex-none">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${
                  i < step ? 'bg-primary text-primary-foreground' :
                  i === step ? 'bg-primary text-primary-foreground ring-4 ring-primary/20' :
                  'bg-muted text-muted-foreground'
                }`}>
                  {i < step ? <Check className="w-4 h-4" /> : i + 1}
                </div>
                {i < wizardSteps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-1 transition-colors ${i < step ? 'bg-primary' : 'bg-border'}`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-1.5 mb-4">
            {wizardSteps.map((s, i) => (
              <span key={i} className={`text-xs ${i === step ? 'text-primary font-medium' : 'text-muted-foreground'}`}>{s}</span>
            ))}
          </div>
        </div>

        <div className="min-h-[280px]">
          {step === 0 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Nome do Processo</Label>
                <Input value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))}
                  placeholder="Ex: Prova de Título 2026 - 1ª Fase" />
              </div>
              <div className="space-y-2">
                <Label>Descrição</Label>
                <Textarea value={form.descricao} onChange={e => setForm(f => ({...f, descricao: e.target.value}))}
                  rows={3} placeholder="Descrição do processo..." className="resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Início das Inscrições</Label>
                  <Input type="date" value={form.inicio} onChange={e => setForm(f => ({...f, inicio: e.target.value}))} />
                </div>
                <div className="space-y-2">
                  <Label>Encerramento</Label>
                  <Input type="date" value={form.encerramento} onChange={e => setForm(f => ({...f, encerramento: e.target.value}))} />
                </div>
              </div>
            </div>
          )}
          {step === 1 && (
            <div>
              <p className="text-sm text-muted-foreground mb-3">Selecione as modalidades de inscrição disponíveis</p>
              <div className="grid grid-cols-2 gap-2">
                {modalidadesOptions.map(m => (
                  <Button key={m} variant={form.modalidades.includes(m) ? 'default' : 'outline'}
                    onClick={() => toggle('modalidades', m)}
                    className="justify-start gap-2 h-auto py-3">
                    {form.modalidades.includes(m) && <Check className="w-4 h-4 flex-shrink-0" />}
                    {m}
                  </Button>
                ))}
              </div>
            </div>
          )}
          {step === 2 && (
            <div>
              <p className="text-sm text-muted-foreground mb-3">Categorias de candidatos habilitados a se inscrever</p>
              <div className="grid grid-cols-2 gap-2">
                {categoriasOptions.map(c => (
                  <Button key={c} variant={form.categorias.includes(c) ? 'default' : 'outline'}
                    onClick={() => toggle('categorias', c)}
                    className="justify-start gap-2 h-auto py-3">
                    {form.categorias.includes(c) && <Check className="w-4 h-4 flex-shrink-0" />}
                    {c}
                  </Button>
                ))}
              </div>
            </div>
          )}
          {step === 3 && (
            <div>
              <p className="text-sm text-muted-foreground mb-3">Locais onde a prova será realizada</p>
              <div className="space-y-2">
                {locaisOptions.map(l => (
                  <Button key={l} variant={form.locais.includes(l) ? 'default' : 'outline'}
                    onClick={() => toggle('locais', l)}
                    className="w-full justify-start gap-3 h-auto py-3">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    {l}
                    {form.locais.includes(l) && <Check className="w-4 h-4 ml-auto" />}
                  </Button>
                ))}
              </div>
            </div>
          )}
          {step === 4 && (
            <div>
              <p className="text-sm text-muted-foreground mb-3">Documentos obrigatórios para inscrição</p>
              <div className="space-y-2">
                {documentosOptions.map(d => (
                  <Button key={d} variant={form.documentos.includes(d) ? 'default' : 'outline'}
                    onClick={() => toggle('documentos', d)}
                    className="w-full justify-start gap-3 h-auto py-3">
                    <FileText className="w-4 h-4 flex-shrink-0" />
                    {d}
                    {form.documentos.includes(d) && <Check className="w-4 h-4 ml-auto" />}
                  </Button>
                ))}
              </div>
            </div>
          )}
          {step === 5 && (
            <div className="space-y-4">
              <div className="bg-muted/30 rounded-xl p-4">
                <h4 className="font-medium mb-2">{form.name || 'Sem nome'}</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div><span className="text-muted-foreground">Período:</span> {form.inicio || '—'} a {form.encerramento || '—'}</div>
                  <div><span className="text-muted-foreground">Modalidades:</span> {form.modalidades.length || 0} selecionadas</div>
                  <div><span className="text-muted-foreground">Categorias:</span> {form.categorias.length || 0} selecionadas</div>
                  <div><span className="text-muted-foreground">Locais:</span> {form.locais.length || 0} selecionados</div>
                  <div><span className="text-muted-foreground">Documentos:</span> {form.documentos.length || 0} obrigatórios</div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">Revise as informações acima. Ao confirmar, o processo será criado com status <strong>Planejamento</strong>.</p>
            </div>
          )}
        </div>

        <div className="flex justify-between pt-4 border-t">
          <Button variant="outline"
            onClick={() => step === 0 ? onClose() : setStep(s => s - 1)}>
            <ChevronLeft className="w-4 h-4 mr-2" />
            {step === 0 ? 'Cancelar' : 'Anterior'}
          </Button>
          <Button
            onClick={() => step < wizardSteps.length - 1 ? setStep(s => s + 1) : onClose()}>
            {step < wizardSteps.length - 1 ? 'Próximo' : 'Criar Processo'}
            {step < wizardSteps.length - 1 && <ChevronRight className="w-4 h-4 ml-2" />}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function Processos() {
  const [search, setSearch] = useState('');
  const [showWizard, setShowWizard] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(null);

  const filtered = mockProcessos.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="min-h-screen bg-background">
      <div className="px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl mb-2">Processos de Inscrição</h1>
              <p className="text-muted-foreground">Gerencie processos de provas e títulos de especialista</p>
            </div>
            <Button onClick={() => setShowWizard(true)}>
              <Plus className="w-4 h-4 mr-2" /> Novo Processo
            </Button>
          </div>

          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input value={search} onChange={e => setSearch(e.target.value)}
              placeholder="Buscar processos..."
              className="pl-9" />
          </div>

          <div className="space-y-4">
            {filtered.map(p => {
              const s = statusConfig[p.status];
              const isExp = expanded === p.id;
              return (
                <Card key={p.id} className="overflow-hidden">
                  <div
                    className="p-5 flex items-center justify-between cursor-pointer hover:bg-muted/30 transition-colors"
                    onClick={() => setExpanded(isExp ? null : p.id)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                        <ClipboardList className="w-5 h-5 text-indigo-500" />
                      </div>
                      <div>
                        <h3 className="font-medium">{p.name}</h3>
                        <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {p.candidatos} candidatos</span>
                          <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> até {p.encerramento}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className={s.color}>{s.label}</Badge>
                      <ChevronRight className={`w-4 h-4 text-muted-foreground transition-transform ${isExp ? 'rotate-90' : ''}`} />
                    </div>
                  </div>
                  {isExp && (
                    <div className="border-t border-border px-5 py-4 bg-muted/20">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-card rounded-lg p-3 border border-border">
                          <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1"><BookOpen className="w-3 h-3" /> Modalidades</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {p.modalidades.map(m => <Badge key={m} variant="secondary" className="text-xs">{m}</Badge>)}
                          </div>
                        </div>
                        <div className="bg-card rounded-lg p-3 border border-border">
                          <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1"><Tag className="w-3 h-3" /> Categorias</p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {p.categorias.map(c => <Badge key={c} variant="secondary" className="text-xs">{c}</Badge>)}
                          </div>
                        </div>
                        <div className="bg-card rounded-lg p-3 border border-border">
                          <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1"><MapPin className="w-3 h-3" /> Locais</p>
                          <p className="text-sm font-semibold">{p.locais} configurados</p>
                        </div>
                        <div className="bg-card rounded-lg p-3 border border-border">
                          <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1"><FileText className="w-3 h-3" /> Documentos</p>
                          <p className="text-sm font-semibold">{p.documentos} obrigatórios</p>
                        </div>
                      </div>
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        </div>
      </div>
      <ProcessoWizard open={showWizard} onClose={() => setShowWizard(false)} />
    </div>
  );
}
