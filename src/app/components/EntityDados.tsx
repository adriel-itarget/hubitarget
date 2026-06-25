import { useState, useEffect } from 'react';
import { Save, Building2, MapPin, Phone, Globe, CheckCircle } from 'lucide-react';

const STORAGE_KEY = 'entity_dados';

const initialData = {
  razaoSocial: 'Associação Médica Brasileira Regional SP',
  nomeFantasia: 'AMB Regional SP',
  cnpj: '12.345.678/0001-90',
  inscricaoEstadual: '123.456.789.000',
  naturezaJuridica: 'Associação Privada',
  dataFundacao: '1985-03-15',
  cep: '01310-100',
  logradouro: 'Av. Paulista',
  numero: '1578',
  complemento: 'Conj. 1204',
  bairro: 'Bela Vista',
  cidade: 'São Paulo',
  estado: 'SP',
  email: 'contato@ambsp.org.br',
  emailSecundario: 'secretaria@ambsp.org.br',
  telefone: '(11) 3218-4000',
  whatsapp: '(11) 99876-5432',
  website: 'https://www.ambsp.org.br',
  instagram: '@ambsp',
  facebook: 'facebook.com/ambsp',
  linkedin: 'linkedin.com/company/ambsp',
  youtube: '',
  responsavelLegal: 'Dr. Carlos Alberto Ferreira',
  cpfResponsavel: '123.456.789-00',
  cargoResponsavel: 'Presidente',
};

type FormData = typeof initialData;

function InputField({ label, value, onChange, placeholder, type = 'text', disabled = false }: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-foreground mb-1.5">{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      />
    </div>
  );
}

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

export function EntityDados() {
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

  const set = (field: keyof FormData) => (value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-8 py-8">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-2xl mb-1">Dados da Entidade</h1>
            <p className="text-sm text-muted-foreground">Informações cadastrais, fiscais e de contato</p>
          </div>
          <button
            onClick={handleSave}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm transition-all ${
              saved
                ? 'bg-green-500/10 text-green-600 border border-green-500/30'
                : 'bg-primary text-primary-foreground hover:bg-primary/90'
            }`}
          >
            {saved ? (
              <>
                <CheckCircle className="w-4 h-4" />
                Salvo
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Salvar alterações
              </>
            )}
          </button>
        </div>

        <div className="space-y-6">
          <SectionCard title="Dados Fiscais" icon={Building2}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <InputField label="Razão Social" value={form.razaoSocial} onChange={set('razaoSocial')} placeholder="Razão social completa" />
              </div>
              <InputField label="Nome Fantasia" value={form.nomeFantasia} onChange={set('nomeFantasia')} placeholder="Nome fantasia" />
              <InputField label="CNPJ" value={form.cnpj} onChange={set('cnpj')} placeholder="00.000.000/0000-00" />
              <InputField label="Inscrição Estadual" value={form.inscricaoEstadual} onChange={set('inscricaoEstadual')} placeholder="000.000.000.000" />
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Natureza Jurídica</label>
                <select
                  value={form.naturezaJuridica}
                  onChange={e => set('naturezaJuridica')(e.target.value)}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                >
                  <option>Associação Privada</option>
                  <option>Fundação Privada</option>
                  <option>Sociedade Civil</option>
                  <option>Organização Social</option>
                  <option>OSCIP</option>
                </select>
              </div>
              <InputField label="Data de Fundação" value={form.dataFundacao} onChange={set('dataFundacao')} type="date" />
            </div>
          </SectionCard>

          <SectionCard title="Endereço" icon={MapPin}>
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
              <div className="md:col-span-2">
                <InputField label="CEP" value={form.cep} onChange={set('cep')} placeholder="00000-000" />
              </div>
              <div className="md:col-span-4">
                <InputField label="Logradouro" value={form.logradouro} onChange={set('logradouro')} placeholder="Rua, Avenida, etc." />
              </div>
              <div className="md:col-span-1">
                <InputField label="Número" value={form.numero} onChange={set('numero')} placeholder="Nº" />
              </div>
              <div className="md:col-span-2">
                <InputField label="Complemento" value={form.complemento} onChange={set('complemento')} placeholder="Sala, Andar, etc." />
              </div>
              <div className="md:col-span-3">
                <InputField label="Bairro" value={form.bairro} onChange={set('bairro')} placeholder="Bairro" />
              </div>
              <div className="md:col-span-4">
                <InputField label="Cidade" value={form.cidade} onChange={set('cidade')} placeholder="Cidade" />
              </div>
              <div className="md:col-span-2">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Estado</label>
                  <select
                    value={form.estado}
                    onChange={e => set('estado')(e.target.value)}
                    className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  >
                    {['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'].map(uf => (
                      <option key={uf}>{uf}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Contato" icon={Phone}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField label="E-mail Principal" value={form.email} onChange={set('email')} type="email" placeholder="contato@entidade.com" />
              <InputField label="E-mail Secundário" value={form.emailSecundario} onChange={set('emailSecundario')} type="email" placeholder="secretaria@entidade.com" />
              <InputField label="Telefone" value={form.telefone} onChange={set('telefone')} placeholder="(00) 0000-0000" />
              <InputField label="WhatsApp" value={form.whatsapp} onChange={set('whatsapp')} placeholder="(00) 00000-0000" />
            </div>
          </SectionCard>

          <SectionCard title="Presença Digital" icon={Globe}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <InputField label="Website" value={form.website} onChange={set('website')} type="url" placeholder="https://www.entidade.com" />
              </div>
              <InputField label="Instagram" value={form.instagram} onChange={set('instagram')} placeholder="@usuario" />
              <InputField label="Facebook" value={form.facebook} onChange={set('facebook')} placeholder="facebook.com/pagina" />
              <InputField label="LinkedIn" value={form.linkedin} onChange={set('linkedin')} placeholder="linkedin.com/company/..." />
              <InputField label="YouTube" value={form.youtube} onChange={set('youtube')} placeholder="youtube.com/@canal" />
            </div>
          </SectionCard>

          <SectionCard title="Responsável Legal" icon={Building2}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <InputField label="Nome Completo" value={form.responsavelLegal} onChange={set('responsavelLegal')} placeholder="Nome do responsável legal" />
              </div>
              <InputField label="CPF" value={form.cpfResponsavel} onChange={set('cpfResponsavel')} placeholder="000.000.000-00" />
              <InputField label="Cargo / Função" value={form.cargoResponsavel} onChange={set('cargoResponsavel')} placeholder="Presidente, Diretor, etc." />
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
            {saved ? (
              <><CheckCircle className="w-4 h-4" />Salvo com sucesso</>
            ) : (
              <><Save className="w-4 h-4" />Salvar alterações</>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
