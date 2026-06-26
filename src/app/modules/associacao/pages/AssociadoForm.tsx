import { useState } from 'react';
import {
  ArrowLeft, User, MapPin, Phone, GraduationCap, Award, FileText, Users, Building2,
  Plus, Trash2, Eye, EyeOff, ChevronDown, Upload, CheckCircle, AlignJustify,
  LayoutTemplate, PanelLeft, Star
} from 'lucide-react';
import { Card, CardContent } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Textarea } from '@/app/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Checkbox } from '@/app/components/ui/checkbox';

type LayoutMode = 'accordion' | 'tabs' | 'sidebar';
type SectionId = 'personal' | 'addresses' | 'phones' | 'graduation' | 'specialties' | 'documents' | 'indication' | 'professional';

interface Address {
  id: number; type: string; zip: string; street: string; number: string;
  complement: string; neighborhood: string; city: string; state: string; isPrimary: boolean;
}
interface PhoneEntry {
  id: number; type: string; number: string; hasWhatsapp: boolean; isPrimary: boolean;
}
interface Graduation {
  id: number; type: string; course: string; institution: string;
  startYear: string; endYear: string; status: string;
}
interface Specialty {
  id: number; name: string; area: string; certYear: string; council: string; registry: string;
}

const SECTIONS: { id: SectionId; label: string; icon: typeof User; color: string; bg: string }[] = [
  { id: 'personal', label: 'Dados Pessoais', icon: User, color: 'text-blue-600', bg: 'bg-blue-500/10' },
  { id: 'addresses', label: 'Endereços', icon: MapPin, color: 'text-green-600', bg: 'bg-green-500/10' },
  { id: 'phones', label: 'Telefones', icon: Phone, color: 'text-purple-600', bg: 'bg-purple-500/10' },
  { id: 'graduation', label: 'Graduação', icon: GraduationCap, color: 'text-orange-600', bg: 'bg-orange-500/10' },
  { id: 'specialties', label: 'Especialidades', icon: Award, color: 'text-yellow-600', bg: 'bg-yellow-500/10' },
  { id: 'documents', label: 'Documentos', icon: FileText, color: 'text-red-600', bg: 'bg-red-500/10' },
  { id: 'indication', label: 'Indicação', icon: Users, color: 'text-teal-600', bg: 'bg-teal-500/10' },
  { id: 'professional', label: 'Dados Profissionais', icon: Building2, color: 'text-indigo-600', bg: 'bg-indigo-500/10' },
];

const requiredDocs = [
  { name: 'RG – Frente', status: 'uploaded', previewBg: 'bg-blue-50 dark:bg-blue-950/30', date: '15/03/2026', size: '1.2 MB', fileType: 'Imagem' },
  { name: 'RG – Verso', status: 'uploaded', previewBg: 'bg-blue-50 dark:bg-blue-950/30', date: '15/03/2026', size: '0.9 MB', fileType: 'Imagem' },
  { name: 'CPF', status: 'uploaded', previewBg: 'bg-green-50 dark:bg-green-950/30', date: '15/03/2026', size: '0.7 MB', fileType: 'Imagem' },
  { name: 'Diploma de Graduação', status: 'uploaded', previewBg: 'bg-purple-50 dark:bg-purple-950/30', date: '10/03/2026', size: '2.8 MB', fileType: 'PDF' },
  { name: 'Comprovante de Endereço', status: 'pending', previewBg: '', date: '', size: '', fileType: '' },
  { name: 'Foto 3x4', status: 'uploaded', previewBg: 'bg-orange-50 dark:bg-orange-950/30', date: '12/03/2026', size: '0.5 MB', fileType: 'Imagem' },
  { name: 'Registro no CRM', status: 'uploaded', previewBg: 'bg-teal-50 dark:bg-teal-950/30', date: '15/03/2026', size: '1.1 MB', fileType: 'PDF' },
  { name: 'Atestado de Especialidade', status: 'optional', previewBg: '', date: '', size: '', fileType: '' },
];

interface AssociadoFormProps {
  associate?: any;
  onBack: () => void;
  onSave: () => void;
}

export function AssociadoForm({ associate, onBack, onSave }: AssociadoFormProps) {
  const [layoutMode, setLayoutMode] = useState<LayoutMode>('accordion');
  const [activeSection, setActiveSection] = useState<SectionId>('personal');
  const [expanded, setExpanded] = useState<Set<SectionId>>(new Set(['personal']));
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [personal, setP] = useState({
    name: associate?.name || '', cpf: associate?.cpf || '', rg: '', birthdate: '',
    gender: '', maritalStatus: '', nationality: 'Brasileira', naturalness: '', crm: '',
    email: associate?.email || '', password: '', confirmPassword: '',
  });

  const [addresses, setAddresses] = useState<Address[]>([
    { id: 1, type: 'Residencial', zip: '', street: '', number: '', complement: '', neighborhood: '', city: '', state: '', isPrimary: true },
  ]);

  const [phones, setPhones] = useState<PhoneEntry[]>([
    { id: 1, type: 'Celular', number: '', hasWhatsapp: true, isPrimary: true },
  ]);

  const [graduations, setGraduations] = useState<Graduation[]>([
    { id: 1, type: 'Graduação', course: '', institution: '', startYear: '', endYear: '', status: 'Concluído' },
  ]);

  const [specialties, setSpecialties] = useState<Specialty[]>([
    { id: 1, name: '', area: '', certYear: '', council: 'CFM', registry: '' },
  ]);

  const [indication, setInd] = useState({ memberName: '', memberCRM: '', registryNumber: '', date: '', notes: '' });
  const [professional, setPro] = useState({ institution: '', role: '', department: '', type: 'Privado', startDate: '', website: '' });

  const toggleExpand = (id: SectionId) => {
    setExpanded(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  };

  const makePrimaryAddr = (id: number) => setAddresses(a => a.map(x => ({ ...x, isPrimary: x.id === id })));
  const makePrimaryPhone = (id: number) => setPhones(p => p.map(x => ({ ...x, isPrimary: x.id === id })));

  const renderSection = (id: SectionId) => {
    switch (id) {
      case 'personal': return (
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Label>Nome completo <span className="text-red-500">*</span></Label>
              <Input placeholder="Nome completo do associado" value={personal.name} onChange={e => setP(p => ({ ...p, name: e.target.value }))} />
            </div>
            <div>
              <Label>CPF <span className="text-red-500">*</span></Label>
              <Input placeholder="000.000.000-00" value={personal.cpf} onChange={e => setP(p => ({ ...p, cpf: e.target.value }))} />
            </div>
            <div>
              <Label>RG</Label>
              <Input placeholder="Número do RG" value={personal.rg} onChange={e => setP(p => ({ ...p, rg: e.target.value }))} />
            </div>
            <div>
              <Label>Data de nascimento <span className="text-red-500">*</span></Label>
              <Input type="date" value={personal.birthdate} onChange={e => setP(p => ({ ...p, birthdate: e.target.value }))} />
            </div>
            <div>
              <Label>CRM <span className="text-red-500">*</span></Label>
              <Input placeholder="CRM SP 000000" value={personal.crm} onChange={e => setP(p => ({ ...p, crm: e.target.value }))} />
            </div>
            <div>
              <Label>Sexo</Label>
              <Select value={personal.gender} onValueChange={v => setP(p => ({ ...p, gender: v }))}>
                <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                <SelectContent>
                  {['Masculino', 'Feminino', 'Outro', 'Não informar'].map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Estado civil</Label>
              <Select value={personal.maritalStatus} onValueChange={v => setP(p => ({ ...p, maritalStatus: v }))}>
                <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                <SelectContent>
                  {['Solteiro(a)', 'Casado(a)', 'Divorciado(a)', 'Viúvo(a)', 'União estável'].map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Naturalidade</Label>
              <Input placeholder="Cidade natal" value={personal.naturalness} onChange={e => setP(p => ({ ...p, naturalness: e.target.value }))} />
            </div>
            <div>
              <Label>Nacionalidade</Label>
              <Input value={personal.nationality} onChange={e => setP(p => ({ ...p, nationality: e.target.value }))} />
            </div>
          </div>
          <div className="border-t border-border pt-5">
            <p className="text-sm font-semibold mb-4 text-muted-foreground flex items-center gap-2">
              <span className="w-5 h-5 rounded bg-primary/10 flex items-center justify-center text-primary text-xs">Acesso</span>
              Acesso ao sistema
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-1">
                <Label>E-mail <span className="text-red-500">*</span></Label>
                <Input type="email" placeholder="email@exemplo.com" value={personal.email} onChange={e => setP(p => ({ ...p, email: e.target.value }))} />
                <p className="text-xs text-muted-foreground mt-1">Usado para login no sistema</p>
              </div>
              <div>
                <Label>Senha <span className="text-red-500">*</span></Label>
                <div className="relative">
                  <Input type={showPwd ? 'text' : 'password'} placeholder="••••••••" value={personal.password} onChange={e => setP(p => ({ ...p, password: e.target.value }))} className="pr-10" />
                  <Button type="button" variant="ghost" size="icon" onClick={() => setShowPwd(!showPwd)} className="absolute right-0 top-0 h-full px-3">
                    {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
              <div>
                <Label>Confirmar senha <span className="text-red-500">*</span></Label>
                <div className="relative">
                  <Input type={showConfirm ? 'text' : 'password'} placeholder="••••••••" value={personal.confirmPassword} onChange={e => setP(p => ({ ...p, confirmPassword: e.target.value }))} className="pr-10" />
                  <Button type="button" variant="ghost" size="icon" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-0 top-0 h-full px-3">
                    {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );

      case 'addresses': return (
        <div className="space-y-4">
          {addresses.map((addr, idx) => (
            <div key={addr.id} className={`border rounded-xl p-5 ${addr.isPrimary ? 'border-primary/40 bg-primary/3' : 'border-border'}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">Endereço {idx + 1}</span>
                  {addr.isPrimary && (
                    <Badge variant="secondary" className="gap-1">
                      <Star className="w-3 h-3" /> Principal
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {!addr.isPrimary && (
                    <Button variant="ghost" size="sm" onClick={() => makePrimaryAddr(addr.id)} className="text-xs text-muted-foreground hover:text-primary">
                      Definir como principal
                    </Button>
                  )}
                  {addresses.length > 1 && (
                    <Button variant="ghost" size="icon" onClick={() => setAddresses(a => a.filter(x => x.id !== addr.id))} className="h-8 w-8 text-muted-foreground hover:text-red-600">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <Label>Tipo</Label>
                  <Select value={addr.type} onValueChange={v => setAddresses(a => a.map(x => x.id === addr.id ? { ...x, type: v } : x))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {['Residencial', 'Comercial', 'Correspondência', 'Outro'].map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>CEP</Label>
                  <Input placeholder="00000-000" value={addr.zip} onChange={e => setAddresses(a => a.map(x => x.id === addr.id ? { ...x, zip: e.target.value } : x))} />
                </div>
                <div>
                  <Label>Estado</Label>
                  <Select value={addr.state} onValueChange={v => setAddresses(a => a.map(x => x.id === addr.id ? { ...x, state: v } : x))}>
                    <SelectTrigger><SelectValue placeholder="UF" /></SelectTrigger>
                    <SelectContent>
                      {['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'].map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2">
                  <Label>Logradouro <span className="text-red-500">*</span></Label>
                  <Input placeholder="Rua, Avenida, etc." value={addr.street} onChange={e => setAddresses(a => a.map(x => x.id === addr.id ? { ...x, street: e.target.value } : x))} />
                </div>
                <div>
                  <Label>Número <span className="text-red-500">*</span></Label>
                  <Input placeholder="Nº" value={addr.number} onChange={e => setAddresses(a => a.map(x => x.id === addr.id ? { ...x, number: e.target.value } : x))} />
                </div>
                <div>
                  <Label>Complemento</Label>
                  <Input placeholder="Apto, Bloco, etc." value={addr.complement} onChange={e => setAddresses(a => a.map(x => x.id === addr.id ? { ...x, complement: e.target.value } : x))} />
                </div>
                <div>
                  <Label>Bairro</Label>
                  <Input placeholder="Bairro" value={addr.neighborhood} onChange={e => setAddresses(a => a.map(x => x.id === addr.id ? { ...x, neighborhood: e.target.value } : x))} />
                </div>
                <div>
                  <Label>Cidade <span className="text-red-500">*</span></Label>
                  <Input placeholder="Cidade" value={addr.city} onChange={e => setAddresses(a => a.map(x => x.id === addr.id ? { ...x, city: e.target.value } : x))} />
                </div>
              </div>
            </div>
          ))}
          <Button variant="outline" className="w-full border-dashed"
            onClick={() => setAddresses(a => [...a, { id: Date.now(), type: 'Comercial', zip: '', street: '', number: '', complement: '', neighborhood: '', city: '', state: '', isPrimary: false }])}>
            <Plus className="w-4 h-4 mr-2" /> Adicionar endereço
          </Button>
        </div>
      );

      case 'phones': return (
        <div className="space-y-3">
          {phones.map((ph, idx) => (
            <div key={ph.id} className={`border rounded-xl p-4 ${ph.isPrimary ? 'border-primary/40 bg-primary/3' : 'border-border'}`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">Telefone {idx + 1}</span>
                  {ph.isPrimary && <Badge variant="secondary" className="gap-1"><Star className="w-3 h-3" /> Principal</Badge>}
                </div>
                <div className="flex items-center gap-2">
                  {!ph.isPrimary && <Button variant="ghost" size="sm" onClick={() => makePrimaryPhone(ph.id)} className="text-xs text-muted-foreground hover:text-primary">Definir como principal</Button>}
                  {phones.length > 1 && <Button variant="ghost" size="icon" onClick={() => setPhones(p => p.filter(x => x.id !== ph.id))} className="h-7 w-7 text-muted-foreground hover:text-red-600"><Trash2 className="w-4 h-4" /></Button>}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <Label>Tipo</Label>
                  <Select value={ph.type} onValueChange={v => setPhones(p => p.map(x => x.id === ph.id ? { ...x, type: v } : x))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {['Celular', 'Fixo', 'Trabalho', 'Outro'].map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2">
                  <Label>Número <span className="text-red-500">*</span></Label>
                  <Input placeholder="(00) 00000-0000" value={ph.number} onChange={e => setPhones(p => p.map(x => x.id === ph.id ? { ...x, number: e.target.value } : x))} />
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <Checkbox id={`wa-${ph.id}`} checked={ph.hasWhatsapp}
                  onCheckedChange={c => setPhones(p => p.map(x => x.id === ph.id ? { ...x, hasWhatsapp: !!c } : x))} />
                <Label htmlFor={`wa-${ph.id}`} className="text-sm text-muted-foreground cursor-pointer select-none">Este número tem WhatsApp</Label>
              </div>
            </div>
          ))}
          <Button variant="outline" className="w-full border-dashed"
            onClick={() => setPhones(p => [...p, { id: Date.now(), type: 'Fixo', number: '', hasWhatsapp: false, isPrimary: false }])}>
            <Plus className="w-4 h-4 mr-2" /> Adicionar telefone
          </Button>
        </div>
      );

      case 'graduation': return (
        <div className="space-y-4">
          {graduations.map((g, idx) => (
            <div key={g.id} className="border border-border rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold">Formação {idx + 1}</span>
                {graduations.length > 1 && <Button variant="ghost" size="icon" onClick={() => setGraduations(gr => gr.filter(x => x.id !== g.id))} className="h-7 w-7 text-muted-foreground hover:text-red-600"><Trash2 className="w-4 h-4" /></Button>}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <Label>Tipo <span className="text-red-500">*</span></Label>
                  <Select value={g.type} onValueChange={v => setGraduations(gr => gr.map(x => x.id === g.id ? { ...x, type: v } : x))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {['Graduação', 'Especialização', 'Residência', 'Mestrado', 'Doutorado', 'Pós-doutorado'].map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Status</Label>
                  <Select value={g.status} onValueChange={v => setGraduations(gr => gr.map(x => x.id === g.id ? { ...x, status: v } : x))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {['Concluído', 'Em andamento', 'Trancado'].map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2">
                  <Label>Curso / Programa <span className="text-red-500">*</span></Label>
                  <Input placeholder="Nome do curso ou programa" value={g.course} onChange={e => setGraduations(gr => gr.map(x => x.id === g.id ? { ...x, course: e.target.value } : x))} />
                </div>
                <div className="md:col-span-2">
                  <Label>Instituição <span className="text-red-500">*</span></Label>
                  <Input placeholder="Nome da instituição de ensino" value={g.institution} onChange={e => setGraduations(gr => gr.map(x => x.id === g.id ? { ...x, institution: e.target.value } : x))} />
                </div>
                <div>
                  <Label>Ano de início</Label>
                  <Input placeholder="AAAA" maxLength={4} value={g.startYear} onChange={e => setGraduations(gr => gr.map(x => x.id === g.id ? { ...x, startYear: e.target.value } : x))} />
                </div>
                <div>
                  <Label>Ano de conclusão</Label>
                  <Input placeholder="AAAA (ou previsão)" value={g.endYear} onChange={e => setGraduations(gr => gr.map(x => x.id === g.id ? { ...x, endYear: e.target.value } : x))} />
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <Label>Documento comprobatório</Label>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 px-4 py-2 border border-dashed border-border rounded-lg text-sm text-muted-foreground hover:text-foreground hover:border-primary/50 cursor-pointer transition-colors">
                    <Upload className="w-4 h-4" /> Anexar diploma / certificado
                    <input type="file" className="hidden" />
                  </label>
                  <span className="text-xs text-muted-foreground">PDF, JPG ou PNG · máx. 10 MB</span>
                </div>
              </div>
            </div>
          ))}
          <Button variant="outline" className="w-full border-dashed"
            onClick={() => setGraduations(gr => [...gr, { id: Date.now(), type: 'Especialização', course: '', institution: '', startYear: '', endYear: '', status: 'Concluído' }])}>
            <Plus className="w-4 h-4 mr-2" /> Adicionar formação
          </Button>
        </div>
      );

      case 'specialties': return (
        <div className="space-y-4">
          {specialties.map((sp, idx) => (
            <div key={sp.id} className="border border-border rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold">Especialidade {idx + 1}</span>
                {specialties.length > 1 && <Button variant="ghost" size="icon" onClick={() => setSpecialties(s => s.filter(x => x.id !== sp.id))} className="h-7 w-7 text-muted-foreground hover:text-red-600"><Trash2 className="w-4 h-4" /></Button>}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <Label>Especialidade <span className="text-red-500">*</span></Label>
                  <Input placeholder="Ex: Cardiologia Clínica" value={sp.name} onChange={e => setSpecialties(s => s.map(x => x.id === sp.id ? { ...x, name: e.target.value } : x))} />
                </div>
                <div>
                  <Label>Área / Subespecialidade</Label>
                  <Input placeholder="Ex: Ecocardiografia" value={sp.area} onChange={e => setSpecialties(s => s.map(x => x.id === sp.id ? { ...x, area: e.target.value } : x))} />
                </div>
                <div>
                  <Label>Conselho</Label>
                  <Select value={sp.council} onValueChange={v => setSpecialties(s => s.map(x => x.id === sp.id ? { ...x, council: v } : x))}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {['CFM', 'SBC', 'AMB', 'Outro'].map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Nº de registro</Label>
                  <Input placeholder="Número do título" value={sp.registry} onChange={e => setSpecialties(s => s.map(x => x.id === sp.id ? { ...x, registry: e.target.value } : x))} />
                </div>
                <div>
                  <Label>Ano de certificação</Label>
                  <Input placeholder="AAAA" maxLength={4} value={sp.certYear} onChange={e => setSpecialties(s => s.map(x => x.id === sp.id ? { ...x, certYear: e.target.value } : x))} />
                </div>
              </div>
            </div>
          ))}
          <Button variant="outline" className="w-full border-dashed"
            onClick={() => setSpecialties(s => [...s, { id: Date.now(), name: '', area: '', certYear: '', council: 'CFM', registry: '' }])}>
            <Plus className="w-4 h-4 mr-2" /> Adicionar especialidade
          </Button>
        </div>
      );

      case 'documents': return (
        <div>
          <p className="text-sm text-muted-foreground mb-4">
            Documentos obrigatórios para validação cadastral. Todos os itens marcados com <span className="text-red-500">*</span> devem ser enviados antes da aprovação.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {requiredDocs.map((doc, i) => (
              <div key={i} className={`rounded-xl border overflow-hidden ${
                doc.status === 'pending' ? 'border-dashed border-border' :
                doc.status === 'optional' ? 'border-dashed border-border/50 opacity-70' :
                'border-border'
              }`}>
                {doc.status === 'uploaded' ? (
                  <>
                    <div className={`h-24 ${doc.previewBg} flex items-center justify-center relative`}>
                      <FileText className="w-10 h-10 text-muted-foreground/30" />
                      <div className="absolute top-2 right-2 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                        <CheckCircle className="w-3.5 h-3.5 text-white" />
                      </div>
                      <div className="absolute bottom-2 left-2 text-xs font-medium px-1.5 py-0.5 bg-black/20 text-white rounded">
                        {doc.fileType}
                      </div>
                    </div>
                    <div className="p-3">
                      <p className="text-sm font-medium">{doc.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{doc.date} · {doc.size}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="secondary" className="text-green-600 bg-green-500/10 gap-1">
                          <CheckCircle className="w-3 h-3" /> Enviado
                        </Badge>
                        <Button variant="ghost" size="sm" className="text-xs h-auto p-0">Substituir</Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="p-4 flex flex-col items-center justify-center h-32 text-center">
                    <Upload className="w-6 h-6 text-muted-foreground/50 mb-2" />
                    <p className="text-sm font-medium text-muted-foreground">{doc.name}</p>
                    {doc.status === 'optional' ? (
                      <span className="text-xs text-muted-foreground/60 mt-1">Opcional</span>
                    ) : (
                      <label className="mt-2 text-xs text-primary hover:underline cursor-pointer">
                        Fazer upload <span className="text-red-500">*</span>
                        <input type="file" className="hidden" />
                      </label>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      );

      case 'indication': return (
        <div className="space-y-4">
          <div className="bg-blue-500/5 border border-blue-500/15 rounded-xl p-4 text-sm text-blue-600">
            A indicação por membro efetivo é necessária para associados nas categorias Titular e Aspirante.
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Nome do membro indicante</Label>
              <Input placeholder="Nome completo" value={indication.memberName} onChange={e => setInd(i => ({ ...i, memberName: e.target.value }))} />
            </div>
            <div>
              <Label>CRM do indicante</Label>
              <Input placeholder="CRM SP 000000" value={indication.memberCRM} onChange={e => setInd(i => ({ ...i, memberCRM: e.target.value }))} />
            </div>
            <div>
              <Label>Nº de registro na associação</Label>
              <Input placeholder="Nº de associado" value={indication.registryNumber} onChange={e => setInd(i => ({ ...i, registryNumber: e.target.value }))} />
            </div>
            <div>
              <Label>Data da indicação</Label>
              <Input type="date" value={indication.date} onChange={e => setInd(i => ({ ...i, date: e.target.value }))} />
            </div>
            <div className="md:col-span-2">
              <Label>Observações</Label>
              <Textarea rows={3} className="resize-none" placeholder="Informações adicionais sobre a indicação..." value={indication.notes} onChange={e => setInd(i => ({ ...i, notes: e.target.value }))} />
            </div>
          </div>
        </div>
      );

      case 'professional': return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <Label>Instituição / Empresa <span className="text-red-500">*</span></Label>
            <Input placeholder="Hospital, clínica, universidade, etc." value={professional.institution} onChange={e => setPro(p => ({ ...p, institution: e.target.value }))} />
          </div>
          <div>
            <Label>Cargo / Função <span className="text-red-500">*</span></Label>
            <Input placeholder="Ex: Cardiologista Clínico" value={professional.role} onChange={e => setPro(p => ({ ...p, role: e.target.value }))} />
          </div>
          <div>
            <Label>Departamento / Setor</Label>
            <Input placeholder="Ex: UTI Cardíaca" value={professional.department} onChange={e => setPro(p => ({ ...p, department: e.target.value }))} />
          </div>
          <div>
            <Label>Tipo de vínculo</Label>
            <Select value={professional.type} onValueChange={v => setPro(p => ({ ...p, type: v }))}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {['Privado', 'Público', 'Autônomo', 'Acadêmico', 'Misto'].map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Data de início</Label>
            <Input type="date" value={professional.startDate} onChange={e => setPro(p => ({ ...p, startDate: e.target.value }))} />
          </div>
          <div className="md:col-span-2">
            <Label>Website / LinkedIn</Label>
            <Input placeholder="https://" value={professional.website} onChange={e => setPro(p => ({ ...p, website: e.target.value }))} />
          </div>
        </div>
      );

      default: return null;
    }
  };

  const renderAccordion = () => (
    <div className="space-y-3">
      {SECTIONS.map(sec => {
        const Icon = sec.icon;
        const isOpen = expanded.has(sec.id);
        return (
          <Card key={sec.id} className={`overflow-hidden transition-all ${isOpen ? 'shadow-sm' : ''}`}>
            <button
              onClick={() => toggleExpand(sec.id)}
              className="w-full flex items-center justify-between px-5 py-4 hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg ${sec.bg} flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-4 h-4 ${sec.color}`} />
                </div>
                <span className="font-medium text-sm">{sec.label}</span>
              </div>
              <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
              <div className="px-5 pb-5 pt-1 border-t border-border">
                {renderSection(sec.id)}
              </div>
            )}
          </Card>
        );
      })}
    </div>
  );

  const renderTabs = () => (
    <Card className="overflow-hidden">
      <div className="flex overflow-x-auto border-b border-border">
        {SECTIONS.map(sec => {
          const Icon = sec.icon;
          return (
            <button
              key={sec.id}
              onClick={() => setActiveSection(sec.id)}
              className={`flex items-center gap-2 px-5 py-3.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeSection === sec.id ? 'border-primary text-primary bg-primary/3' : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/30'
              }`}
            >
              <Icon className="w-4 h-4" />
              {sec.label}
            </button>
          );
        })}
      </div>
      <CardContent className="p-6">
        {renderSection(activeSection)}
      </CardContent>
    </Card>
  );

  const renderSidebar = () => (
    <div className="flex gap-5">
      <div className="w-56 flex-shrink-0">
        <Card className="overflow-hidden">
          {SECTIONS.map((sec, i) => {
            const Icon = sec.icon;
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => setActiveSection(sec.id)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 transition-colors text-left ${
                  isActive ? 'bg-primary/8 text-primary border-r-2 border-primary' : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                } ${i > 0 ? 'border-t border-border' : ''}`}
              >
                <div className={`w-7 h-7 rounded-lg ${sec.bg} flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-3.5 h-3.5 ${sec.color}`} />
                </div>
                <span className="text-sm font-medium truncate">{sec.label}</span>
              </button>
            );
          })}
        </Card>
      </div>
      <div className="flex-1 min-w-0">
        <Card>
          <CardContent className="p-6">
            {(() => { const s = SECTIONS.find(x => x.id === activeSection); const Icon = s!.icon; return (
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
                <div className={`w-9 h-9 rounded-xl ${s!.bg} flex items-center justify-center`}>
                  <Icon className={`w-4.5 h-4.5 ${s!.color}`} />
                </div>
                <h2 className="text-lg font-semibold">{s!.label}</h2>
              </div>
            ); })()}
            {renderSection(activeSection)}
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="px-8 py-8">
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={onBack} className="h-10 w-10">
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl">{associate ? 'Editar Associado' : 'Novo Associado'}</h1>
                <p className="text-sm text-muted-foreground">
                  {associate ? `Editando perfil de ${associate.name}` : 'Preencha os dados para cadastrar um novo membro'}
                </p>
              </div>
            </div>

            {/* Layout toggle */}
            <div className="flex items-center gap-1 bg-muted rounded-xl p-1">
              {([
                { mode: 'accordion' as LayoutMode, label: 'Acordeão', Icon: AlignJustify },
                { mode: 'tabs' as LayoutMode, label: 'Abas', Icon: LayoutTemplate },
                { mode: 'sidebar' as LayoutMode, label: 'Menu Lateral', Icon: PanelLeft },
              ]).map(({ mode, label, Icon }) => (
                <Button
                  key={mode}
                  variant={layoutMode === mode ? 'background' : 'ghost'}
                  size="sm"
                  onClick={() => setLayoutMode(mode)}
                  className="gap-1.5"
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{label}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Form content */}
          {layoutMode === 'accordion' && renderAccordion()}
          {layoutMode === 'tabs' && renderTabs()}
          {layoutMode === 'sidebar' && renderSidebar()}

          {/* Footer actions */}
          <div className="flex items-center justify-between gap-3 mt-8 pt-6 border-t border-border">
            <Button variant="outline" onClick={onBack}>Cancelar</Button>
            <div className="flex items-center gap-3">
              <Button variant="outline">Salvar rascunho</Button>
              <Button onClick={onSave}>{associate ? 'Salvar alterações' : 'Cadastrar associado'}</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
