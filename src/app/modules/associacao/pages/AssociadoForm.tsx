import { useState } from 'react';
import {
  ArrowLeft, User, MapPin, Phone, GraduationCap, Award, FileText, Users, Building2,
  Plus, Trash2, Eye, EyeOff, ChevronDown, Upload, CheckCircle, AlignJustify,
  LayoutTemplate, PanelLeft, Star
} from 'lucide-react';

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

// ── Shared field components ──────────────────────────────────────────────────
const Label = ({ text, required }: { text: string; required?: boolean }) => (
  <label className="text-sm font-medium mb-1.5 block">
    {text}{required && <span className="text-red-500 ml-1">*</span>}
  </label>
);

const inp = 'w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all';
const selClass = 'w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 outline-none appearance-none';

export function AssociadoForm({ associate, onBack, onSave }: AssociadoFormProps) {
  const [layoutMode, setLayoutMode] = useState<LayoutMode>('accordion');
  const [activeSection, setActiveSection] = useState<SectionId>('personal');
  const [expanded, setExpanded] = useState<Set<SectionId>>(new Set(['personal']));
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Personal state
  const [personal, setP] = useState({
    name: associate?.name || '', cpf: associate?.cpf || '', rg: '', birthdate: '',
    gender: '', maritalStatus: '', nationality: 'Brasileira', naturalness: '', crm: '',
    email: associate?.email || '', password: '', confirmPassword: '',
  });

  // Addresses
  const [addresses, setAddresses] = useState<Address[]>([
    { id: 1, type: 'Residencial', zip: '', street: '', number: '', complement: '', neighborhood: '', city: '', state: '', isPrimary: true },
  ]);

  // Phones
  const [phones, setPhones] = useState<PhoneEntry[]>([
    { id: 1, type: 'Celular', number: '', hasWhatsapp: true, isPrimary: true },
  ]);

  // Graduation
  const [graduations, setGraduations] = useState<Graduation[]>([
    { id: 1, type: 'Graduação', course: '', institution: '', startYear: '', endYear: '', status: 'Concluído' },
  ]);

  // Specialties
  const [specialties, setSpecialties] = useState<Specialty[]>([
    { id: 1, name: '', area: '', certYear: '', council: 'CFM', registry: '' },
  ]);

  // Indication
  const [indication, setInd] = useState({ memberName: '', memberCRM: '', registryNumber: '', date: '', notes: '' });

  // Professional
  const [professional, setPro] = useState({ institution: '', role: '', department: '', type: 'Privado', startDate: '', website: '' });

  const toggleExpand = (id: SectionId) => {
    setExpanded(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  };

  const makePrimaryAddr = (id: number) => setAddresses(a => a.map(x => ({ ...x, isPrimary: x.id === id })));
  const makePrimaryPhone = (id: number) => setPhones(p => p.map(x => ({ ...x, isPrimary: x.id === id })));

  // ── Section renderers ────────────────────────────────────────────────────────
  const renderSection = (id: SectionId) => {
    switch (id) {
      // ─ Personal ─────────────────────────────────────────────────────────────
      case 'personal': return (
        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Label text="Nome completo" required />
              <input className={inp} placeholder="Nome completo do associado" value={personal.name} onChange={e => setP(p => ({ ...p, name: e.target.value }))} />
            </div>
            <div>
              <Label text="CPF" required />
              <input className={inp} placeholder="000.000.000-00" value={personal.cpf} onChange={e => setP(p => ({ ...p, cpf: e.target.value }))} />
            </div>
            <div>
              <Label text="RG" />
              <input className={inp} placeholder="Número do RG" value={personal.rg} onChange={e => setP(p => ({ ...p, rg: e.target.value }))} />
            </div>
            <div>
              <Label text="Data de nascimento" required />
              <input className={inp} type="date" value={personal.birthdate} onChange={e => setP(p => ({ ...p, birthdate: e.target.value }))} />
            </div>
            <div>
              <Label text="CRM" required />
              <input className={inp} placeholder="CRM SP 000000" value={personal.crm} onChange={e => setP(p => ({ ...p, crm: e.target.value }))} />
            </div>
            <div>
              <Label text="Sexo" />
              <select className={selClass} value={personal.gender} onChange={e => setP(p => ({ ...p, gender: e.target.value }))}>
                <option value="">Selecione</option>
                {['Masculino', 'Feminino', 'Outro', 'Não informar'].map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <Label text="Estado civil" />
              <select className={selClass} value={personal.maritalStatus} onChange={e => setP(p => ({ ...p, maritalStatus: e.target.value }))}>
                <option value="">Selecione</option>
                {['Solteiro(a)', 'Casado(a)', 'Divorciado(a)', 'Viúvo(a)', 'União estável'].map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div>
              <Label text="Naturalidade" />
              <input className={inp} placeholder="Cidade natal" value={personal.naturalness} onChange={e => setP(p => ({ ...p, naturalness: e.target.value }))} />
            </div>
            <div>
              <Label text="Nacionalidade" />
              <input className={inp} value={personal.nationality} onChange={e => setP(p => ({ ...p, nationality: e.target.value }))} />
            </div>
          </div>
          <div className="border-t border-border pt-5">
            <p className="text-sm font-semibold mb-4 text-muted-foreground flex items-center gap-2">
              <span className="w-5 h-5 rounded bg-primary/10 flex items-center justify-center text-primary text-xs">🔐</span>
              Acesso ao sistema
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-1">
                <Label text="E-mail" required />
                <input className={inp} type="email" placeholder="email@exemplo.com" value={personal.email} onChange={e => setP(p => ({ ...p, email: e.target.value }))} />
                <p className="text-xs text-muted-foreground mt-1">Usado para login no sistema</p>
              </div>
              <div>
                <Label text="Senha" required />
                <div className="relative">
                  <input className={`${inp} pr-10`} type={showPwd ? 'text' : 'password'} placeholder="••••••••" value={personal.password} onChange={e => setP(p => ({ ...p, password: e.target.value }))} />
                  <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div>
                <Label text="Confirmar senha" required />
                <div className="relative">
                  <input className={`${inp} pr-10`} type={showConfirm ? 'text' : 'password'} placeholder="••••••••" value={personal.confirmPassword} onChange={e => setP(p => ({ ...p, confirmPassword: e.target.value }))} />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );

      // ─ Addresses ─────────────────────────────────────────────────────────────
      case 'addresses': return (
        <div className="space-y-4">
          {addresses.map((addr, idx) => (
            <div key={addr.id} className={`border rounded-xl p-5 ${addr.isPrimary ? 'border-primary/40 bg-primary/3' : 'border-border'}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">Endereço {idx + 1}</span>
                  {addr.isPrimary && (
                    <span className="flex items-center gap-1 text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                      <Star className="w-3 h-3" /> Principal
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {!addr.isPrimary && (
                    <button onClick={() => makePrimaryAddr(addr.id)} className="text-xs text-muted-foreground hover:text-primary transition-colors">
                      Definir como principal
                    </button>
                  )}
                  {addresses.length > 1 && (
                    <button onClick={() => setAddresses(a => a.filter(x => x.id !== addr.id))} className="p-1 hover:bg-red-500/10 rounded text-muted-foreground hover:text-red-600 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <Label text="Tipo" />
                  <select className={selClass} value={addr.type} onChange={e => setAddresses(a => a.map(x => x.id === addr.id ? { ...x, type: e.target.value } : x))}>
                    {['Residencial', 'Comercial', 'Correspondência', 'Outro'].map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <Label text="CEP" />
                  <input className={inp} placeholder="00000-000" value={addr.zip} onChange={e => setAddresses(a => a.map(x => x.id === addr.id ? { ...x, zip: e.target.value } : x))} />
                </div>
                <div>
                  <Label text="Estado" />
                  <select className={selClass} value={addr.state} onChange={e => setAddresses(a => a.map(x => x.id === addr.id ? { ...x, state: e.target.value } : x))}>
                    <option value="">UF</option>
                    {['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'].map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <Label text="Logradouro" required />
                  <input className={inp} placeholder="Rua, Avenida, etc." value={addr.street} onChange={e => setAddresses(a => a.map(x => x.id === addr.id ? { ...x, street: e.target.value } : x))} />
                </div>
                <div>
                  <Label text="Número" required />
                  <input className={inp} placeholder="Nº" value={addr.number} onChange={e => setAddresses(a => a.map(x => x.id === addr.id ? { ...x, number: e.target.value } : x))} />
                </div>
                <div>
                  <Label text="Complemento" />
                  <input className={inp} placeholder="Apto, Bloco, etc." value={addr.complement} onChange={e => setAddresses(a => a.map(x => x.id === addr.id ? { ...x, complement: e.target.value } : x))} />
                </div>
                <div>
                  <Label text="Bairro" />
                  <input className={inp} placeholder="Bairro" value={addr.neighborhood} onChange={e => setAddresses(a => a.map(x => x.id === addr.id ? { ...x, neighborhood: e.target.value } : x))} />
                </div>
                <div>
                  <Label text="Cidade" required />
                  <input className={inp} placeholder="Cidade" value={addr.city} onChange={e => setAddresses(a => a.map(x => x.id === addr.id ? { ...x, city: e.target.value } : x))} />
                </div>
              </div>
            </div>
          ))}
          <button onClick={() => setAddresses(a => [...a, { id: Date.now(), type: 'Comercial', zip: '', street: '', number: '', complement: '', neighborhood: '', city: '', state: '', isPrimary: false }])}
            className="w-full flex items-center justify-center gap-2 py-2.5 border border-dashed border-border rounded-xl text-sm text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors">
            <Plus className="w-4 h-4" /> Adicionar endereço
          </button>
        </div>
      );

      // ─ Phones ─────────────────────────────────────────────────────────────────
      case 'phones': return (
        <div className="space-y-3">
          {phones.map((ph, idx) => (
            <div key={ph.id} className={`border rounded-xl p-4 ${ph.isPrimary ? 'border-primary/40 bg-primary/3' : 'border-border'}`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">Telefone {idx + 1}</span>
                  {ph.isPrimary && <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full flex items-center gap-1"><Star className="w-3 h-3" /> Principal</span>}
                </div>
                <div className="flex items-center gap-2">
                  {!ph.isPrimary && <button onClick={() => makePrimaryPhone(ph.id)} className="text-xs text-muted-foreground hover:text-primary">Definir como principal</button>}
                  {phones.length > 1 && <button onClick={() => setPhones(p => p.filter(x => x.id !== ph.id))} className="p-1 hover:bg-red-500/10 rounded text-muted-foreground hover:text-red-600"><Trash2 className="w-4 h-4" /></button>}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <Label text="Tipo" />
                  <select className={selClass} value={ph.type} onChange={e => setPhones(p => p.map(x => x.id === ph.id ? { ...x, type: e.target.value } : x))}>
                    {['Celular', 'Fixo', 'Trabalho', 'Outro'].map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <Label text="Número" required />
                  <input className={inp} placeholder="(00) 00000-0000" value={ph.number} onChange={e => setPhones(p => p.map(x => x.id === ph.id ? { ...x, number: e.target.value } : x))} />
                </div>
              </div>
              <div className="mt-3 flex items-center gap-2">
                <input type="checkbox" id={`wa-${ph.id}`} checked={ph.hasWhatsapp} onChange={e => setPhones(p => p.map(x => x.id === ph.id ? { ...x, hasWhatsapp: e.target.checked } : x))} className="rounded border-border" />
                <label htmlFor={`wa-${ph.id}`} className="text-sm text-muted-foreground cursor-pointer select-none">Este número tem WhatsApp</label>
              </div>
            </div>
          ))}
          <button onClick={() => setPhones(p => [...p, { id: Date.now(), type: 'Fixo', number: '', hasWhatsapp: false, isPrimary: false }])}
            className="w-full flex items-center justify-center gap-2 py-2.5 border border-dashed border-border rounded-xl text-sm text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors">
            <Plus className="w-4 h-4" /> Adicionar telefone
          </button>
        </div>
      );

      // ─ Graduation ────────────────────────────────────────────────────────────
      case 'graduation': return (
        <div className="space-y-4">
          {graduations.map((g, idx) => (
            <div key={g.id} className="border border-border rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold">Formação {idx + 1}</span>
                {graduations.length > 1 && <button onClick={() => setGraduations(gr => gr.filter(x => x.id !== g.id))} className="p-1 hover:bg-red-500/10 rounded text-muted-foreground hover:text-red-600"><Trash2 className="w-4 h-4" /></button>}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <Label text="Tipo" required />
                  <select className={selClass} value={g.type} onChange={e => setGraduations(gr => gr.map(x => x.id === g.id ? { ...x, type: e.target.value } : x))}>
                    {['Graduação', 'Especialização', 'Residência', 'Mestrado', 'Doutorado', 'Pós-doutorado'].map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <Label text="Status" />
                  <select className={selClass} value={g.status} onChange={e => setGraduations(gr => gr.map(x => x.id === g.id ? { ...x, status: e.target.value } : x))}>
                    {['Concluído', 'Em andamento', 'Trancado'].map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
                <div className="md:col-span-2">
                  <Label text="Curso / Programa" required />
                  <input className={inp} placeholder="Nome do curso ou programa" value={g.course} onChange={e => setGraduations(gr => gr.map(x => x.id === g.id ? { ...x, course: e.target.value } : x))} />
                </div>
                <div className="md:col-span-2">
                  <Label text="Instituição" required />
                  <input className={inp} placeholder="Nome da instituição de ensino" value={g.institution} onChange={e => setGraduations(gr => gr.map(x => x.id === g.id ? { ...x, institution: e.target.value } : x))} />
                </div>
                <div>
                  <Label text="Ano de início" />
                  <input className={inp} placeholder="AAAA" maxLength={4} value={g.startYear} onChange={e => setGraduations(gr => gr.map(x => x.id === g.id ? { ...x, startYear: e.target.value } : x))} />
                </div>
                <div>
                  <Label text="Ano de conclusão" />
                  <input className={inp} placeholder="AAAA (ou previsão)" value={g.endYear} onChange={e => setGraduations(gr => gr.map(x => x.id === g.id ? { ...x, endYear: e.target.value } : x))} />
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <Label text="Documento comprobatório" />
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
          <button onClick={() => setGraduations(gr => [...gr, { id: Date.now(), type: 'Especialização', course: '', institution: '', startYear: '', endYear: '', status: 'Concluído' }])}
            className="w-full flex items-center justify-center gap-2 py-2.5 border border-dashed border-border rounded-xl text-sm text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors">
            <Plus className="w-4 h-4" /> Adicionar formação
          </button>
        </div>
      );

      // ─ Specialties ───────────────────────────────────────────────────────────
      case 'specialties': return (
        <div className="space-y-4">
          {specialties.map((sp, idx) => (
            <div key={sp.id} className="border border-border rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold">Especialidade {idx + 1}</span>
                {specialties.length > 1 && <button onClick={() => setSpecialties(s => s.filter(x => x.id !== sp.id))} className="p-1 hover:bg-red-500/10 rounded text-muted-foreground hover:text-red-600"><Trash2 className="w-4 h-4" /></button>}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <Label text="Especialidade" required />
                  <input className={inp} placeholder="Ex: Cardiologia Clínica" value={sp.name} onChange={e => setSpecialties(s => s.map(x => x.id === sp.id ? { ...x, name: e.target.value } : x))} />
                </div>
                <div>
                  <Label text="Área / Subespecialidade" />
                  <input className={inp} placeholder="Ex: Ecocardiografia" value={sp.area} onChange={e => setSpecialties(s => s.map(x => x.id === sp.id ? { ...x, area: e.target.value } : x))} />
                </div>
                <div>
                  <Label text="Conselho" />
                  <select className={selClass} value={sp.council} onChange={e => setSpecialties(s => s.map(x => x.id === sp.id ? { ...x, council: e.target.value } : x))}>
                    {['CFM', 'SBC', 'AMB', 'Outro'].map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <Label text="Nº de registro" />
                  <input className={inp} placeholder="Número do título" value={sp.registry} onChange={e => setSpecialties(s => s.map(x => x.id === sp.id ? { ...x, registry: e.target.value } : x))} />
                </div>
                <div>
                  <Label text="Ano de certificação" />
                  <input className={inp} placeholder="AAAA" maxLength={4} value={sp.certYear} onChange={e => setSpecialties(s => s.map(x => x.id === sp.id ? { ...x, certYear: e.target.value } : x))} />
                </div>
              </div>
            </div>
          ))}
          <button onClick={() => setSpecialties(s => [...s, { id: Date.now(), name: '', area: '', certYear: '', council: 'CFM', registry: '' }])}
            className="w-full flex items-center justify-center gap-2 py-2.5 border border-dashed border-border rounded-xl text-sm text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors">
            <Plus className="w-4 h-4" /> Adicionar especialidade
          </button>
        </div>
      );

      // ─ Documents ─────────────────────────────────────────────────────────────
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
                    {/* Simulated document preview */}
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
                        <span className="text-xs text-green-600 bg-green-500/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <CheckCircle className="w-3 h-3" /> Enviado
                        </span>
                        <button className="text-xs text-muted-foreground hover:text-foreground">Substituir</button>
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

      // ─ Indication ────────────────────────────────────────────────────────────
      case 'indication': return (
        <div className="space-y-4">
          <div className="bg-blue-500/5 border border-blue-500/15 rounded-xl p-4 text-sm text-blue-600">
            A indicação por membro efetivo é necessária para associados nas categorias Titular e Aspirante.
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label text="Nome do membro indicante" />
              <input className={inp} placeholder="Nome completo" value={indication.memberName} onChange={e => setInd(i => ({ ...i, memberName: e.target.value }))} />
            </div>
            <div>
              <Label text="CRM do indicante" />
              <input className={inp} placeholder="CRM SP 000000" value={indication.memberCRM} onChange={e => setInd(i => ({ ...i, memberCRM: e.target.value }))} />
            </div>
            <div>
              <Label text="Nº de registro na associação" />
              <input className={inp} placeholder="Nº de associado" value={indication.registryNumber} onChange={e => setInd(i => ({ ...i, registryNumber: e.target.value }))} />
            </div>
            <div>
              <Label text="Data da indicação" />
              <input className={inp} type="date" value={indication.date} onChange={e => setInd(i => ({ ...i, date: e.target.value }))} />
            </div>
            <div className="md:col-span-2">
              <Label text="Observações" />
              <textarea className={`${inp} resize-none`} rows={3} placeholder="Informações adicionais sobre a indicação..." value={indication.notes} onChange={e => setInd(i => ({ ...i, notes: e.target.value }))} />
            </div>
          </div>
        </div>
      );

      // ─ Professional ──────────────────────────────────────────────────────────
      case 'professional': return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <Label text="Instituição / Empresa" required />
            <input className={inp} placeholder="Hospital, clínica, universidade, etc." value={professional.institution} onChange={e => setPro(p => ({ ...p, institution: e.target.value }))} />
          </div>
          <div>
            <Label text="Cargo / Função" required />
            <input className={inp} placeholder="Ex: Cardiologista Clínico" value={professional.role} onChange={e => setPro(p => ({ ...p, role: e.target.value }))} />
          </div>
          <div>
            <Label text="Departamento / Setor" />
            <input className={inp} placeholder="Ex: UTI Cardíaca" value={professional.department} onChange={e => setPro(p => ({ ...p, department: e.target.value }))} />
          </div>
          <div>
            <Label text="Tipo de vínculo" />
            <select className={selClass} value={professional.type} onChange={e => setPro(p => ({ ...p, type: e.target.value }))}>
              {['Privado', 'Público', 'Autônomo', 'Acadêmico', 'Misto'].map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div>
            <Label text="Data de início" />
            <input className={inp} type="date" value={professional.startDate} onChange={e => setPro(p => ({ ...p, startDate: e.target.value }))} />
          </div>
          <div className="md:col-span-2">
            <Label text="Website / LinkedIn" />
            <input className={inp} placeholder="https://" value={professional.website} onChange={e => setPro(p => ({ ...p, website: e.target.value }))} />
          </div>
        </div>
      );

      default: return null;
    }
  };

  // ── Layout renderers ─────────────────────────────────────────────────────────
  const renderAccordion = () => (
    <div className="space-y-3">
      {SECTIONS.map(sec => {
        const Icon = sec.icon;
        const isOpen = expanded.has(sec.id);
        return (
          <div key={sec.id} className={`bg-card border rounded-xl overflow-hidden transition-all ${isOpen ? 'border-border shadow-sm' : 'border-border/60'}`}>
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
          </div>
        );
      })}
    </div>
  );

  const renderTabs = () => (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
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
      <div className="p-6">
        {renderSection(activeSection)}
      </div>
    </div>
  );

  const renderSidebar = () => (
    <div className="flex gap-5">
      <div className="w-56 flex-shrink-0">
        <div className="bg-card border border-border rounded-xl overflow-hidden">
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
        </div>
      </div>
      <div className="flex-1 min-w-0 bg-card border border-border rounded-xl p-6">
        {(() => { const s = SECTIONS.find(x => x.id === activeSection); const Icon = s!.icon; return (
          <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
            <div className={`w-9 h-9 rounded-xl ${s!.bg} flex items-center justify-center`}>
              <Icon className={`w-4.5 h-4.5 ${s!.color}`} />
            </div>
            <h2 className="text-lg font-semibold">{s!.label}</h2>
          </div>
        ); })()}
        {renderSection(activeSection)}
      </div>
    </div>
  );

  // ── Main render ──────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-background">
      <div className="px-8 py-8">
        <div className="max-w-5xl mx-auto">

          {/* Header */}
          <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
            <div className="flex items-center gap-4">
              <button onClick={onBack} className="p-2 hover:bg-muted rounded-xl transition-colors group">
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
              </button>
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
                <button
                  key={mode}
                  onClick={() => setLayoutMode(mode)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                    layoutMode === mode ? 'bg-background shadow-sm font-medium text-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Form content */}
          {layoutMode === 'accordion' && renderAccordion()}
          {layoutMode === 'tabs' && renderTabs()}
          {layoutMode === 'sidebar' && renderSidebar()}

          {/* Footer actions */}
          <div className="flex items-center justify-between gap-3 mt-8 pt-6 border-t border-border">
            <button onClick={onBack} className="px-5 py-2.5 border border-border rounded-xl hover:bg-accent transition-colors text-sm">
              Cancelar
            </button>
            <div className="flex items-center gap-3">
              <button className="px-5 py-2.5 border border-border rounded-xl hover:bg-accent transition-colors text-sm text-muted-foreground">
                Salvar rascunho
              </button>
              <button onClick={onSave} className="px-6 py-2.5 bg-primary text-primary-foreground rounded-xl hover:bg-primary/90 transition-colors text-sm font-medium shadow-sm">
                {associate ? 'Salvar alterações' : 'Cadastrar associado'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
