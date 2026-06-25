import { useState, useEffect } from 'react';
import { Save, Building2, Target, Image, Bell, CheckCircle, Upload } from 'lucide-react';
import { Switch } from './ui/switch';

const STORAGE_KEY = 'entity_geral';

const initialData = {
  nomeEntidade: 'Associação Médica Brasileira Regional SP',
  sigla: 'AMB-SP',
  descricaoCurta: 'Representando e valorizando os médicos do Estado de São Paulo desde 1985.',
  categoria: 'Associação Médica',
  especialidade: 'Medicina Geral',
  missao: 'Defender os interesses dos médicos associados, promover a ética médica e contribuir para a melhoria da saúde pública no estado de São Paulo.',
  visao: 'Ser a referência nacional em gestão associativa médica, reconhecida pela excelência nos serviços prestados aos associados e pela contribuição ao sistema de saúde brasileiro.',
  valores: 'Ética e integridade profissional\nExcelência na medicina\nSolidariedade entre os membros\nInovação e educação continuada\nTransparência na gestão',
  corPrimaria: '#2563eb',
  corSecundaria: '#7c3aed',
  notificacoesEmail: true,
  notificacoesSms: false,
  modoPublico: true,
  backupAutomatico: true,
};

type FormData = typeof initialData;

function SectionCard({ title, icon: Icon, children }: { title: string; icon: any; children: React.ReactNode }) {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="flex items-center gap-3 px-6 py-4 border-b border-border bg-muted/20">
        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon className="w-4 h-4 text-primary" />
        </div>
        <h3 className="font-medium text-sm">{title}</h3>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

function ToggleRow({ label, description, checked, onChange }: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
      </div>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );
}

export function EntityGeral() {
  const [form, setForm] = useState<FormData>(initialData);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setForm(JSON.parse(stored));
      } catch {}
    }
  }, []);

  const set = (field: keyof FormData) => (value: any) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const categorias = [
    'Associação Médica', 'Conselho Regional de Medicina', 'Sociedade de Especialidade',
    'Federação Médica', 'Associação de Residentes', 'Sindicato Médico', 'Outro',
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-8 py-8">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-2xl mb-1">Configurações Gerais</h1>
            <p className="text-sm text-muted-foreground">Identidade, missão e preferências da entidade</p>
          </div>
          <button
            onClick={handleSave}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm transition-all ${
              saved
                ? 'bg-green-500/10 text-green-600 border border-green-500/30'
                : 'bg-primary text-primary-foreground hover:bg-primary/90'
            }`}
          >
            {saved ? <><CheckCircle className="w-4 h-4" />Salvo</> : <><Save className="w-4 h-4" />Salvar</>}
          </button>
        </div>

        <div className="space-y-6">
          <SectionCard title="Identidade da Entidade" icon={Building2}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1.5">Nome da Entidade</label>
                <input
                  value={form.nomeEntidade}
                  onChange={e => set('nomeEntidade')(e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Sigla</label>
                <input
                  value={form.sigla}
                  onChange={e => set('sigla')(e.target.value)}
                  placeholder="Ex: AMB-SP"
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                />
              </div>
              <div className="md:col-span-3">
                <label className="block text-sm font-medium mb-1.5">Descrição Curta</label>
                <textarea
                  value={form.descricaoCurta}
                  onChange={e => set('descricaoCurta')(e.target.value)}
                  rows={2}
                  placeholder="Descrição resumida para o portal"
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Categoria</label>
                <select
                  value={form.categoria}
                  onChange={e => set('categoria')(e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                >
                  {categorias.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1.5">Especialidade / Área de Atuação</label>
                <input
                  value={form.especialidade}
                  onChange={e => set('especialidade')(e.target.value)}
                  placeholder="Ex: Cardiologia, Pediatria, Medicina Geral"
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                />
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Missão, Visão e Valores" icon={Target}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">Missão</label>
                <textarea
                  value={form.missao}
                  onChange={e => set('missao')(e.target.value)}
                  rows={3}
                  placeholder="Por que a entidade existe e o que ela faz"
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Visão</label>
                <textarea
                  value={form.visao}
                  onChange={e => set('visao')(e.target.value)}
                  rows={3}
                  placeholder="Onde a entidade quer chegar no futuro"
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Valores</label>
                <textarea
                  value={form.valores}
                  onChange={e => set('valores')(e.target.value)}
                  rows={4}
                  placeholder="Um valor por linha"
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                />
                <p className="text-xs text-muted-foreground mt-1">Digite um valor por linha</p>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Identidade Visual" icon={Image}>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-2">Logo da Entidade</label>
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 rounded-xl bg-primary/10 border-2 border-dashed border-primary/30 flex items-center justify-center">
                    <span className="text-xl font-bold text-primary">{form.sigla.slice(0, 2)}</span>
                  </div>
                  <div>
                    <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg text-sm hover:bg-accent transition-colors">
                      <Upload className="w-4 h-4" />
                      Carregar logo
                    </button>
                    <p className="text-xs text-muted-foreground mt-1.5">PNG, SVG ou JPG — máx. 2 MB, 400×400 px</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5">Cor Primária</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={form.corPrimaria}
                      onChange={e => set('corPrimaria')(e.target.value)}
                      className="w-10 h-10 rounded-lg border border-border cursor-pointer"
                    />
                    <input
                      value={form.corPrimaria}
                      onChange={e => set('corPrimaria')(e.target.value)}
                      className="flex-1 px-3 py-2 bg-background border border-border rounded-lg text-sm font-mono focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">Cor Secundária</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={form.corSecundaria}
                      onChange={e => set('corSecundaria')(e.target.value)}
                      className="w-10 h-10 rounded-lg border border-border cursor-pointer"
                    />
                    <input
                      value={form.corSecundaria}
                      onChange={e => set('corSecundaria')(e.target.value)}
                      className="flex-1 px-3 py-2 bg-background border border-border rounded-lg text-sm font-mono focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Notificações e Configurações" icon={Bell}>
            <div>
              <ToggleRow
                label="Notificações por e-mail"
                description="Receber alertas e resumos por e-mail"
                checked={form.notificacoesEmail}
                onChange={set('notificacoesEmail')}
              />
              <ToggleRow
                label="Notificações por SMS"
                description="Receber alertas urgentes por SMS"
                checked={form.notificacoesSms}
                onChange={set('notificacoesSms')}
              />
              <ToggleRow
                label="Portal público ativo"
                description="Exibir informações básicas da entidade publicamente"
                checked={form.modoPublico}
                onChange={set('modoPublico')}
              />
              <ToggleRow
                label="Backup automático semanal"
                description="Salvar cópia das configurações toda semana"
                checked={form.backupAutomatico}
                onChange={set('backupAutomatico')}
              />
            </div>
          </SectionCard>
        </div>

        <div className="flex justify-end mt-6 pt-6 border-t border-border">
          <button
            onClick={handleSave}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm transition-all ${
              saved
                ? 'bg-green-500/10 text-green-600 border border-green-500/30'
                : 'bg-primary text-primary-foreground hover:bg-primary/90'
            }`}
          >
            {saved ? <><CheckCircle className="w-4 h-4" />Salvo com sucesso</> : <><Save className="w-4 h-4" />Salvar alterações</>}
          </button>
        </div>
      </div>
    </div>
  );
}
