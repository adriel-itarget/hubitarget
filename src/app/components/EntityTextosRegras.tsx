import { useState } from 'react';
import { Save, CheckCircle, Clock, Eye, EyeOff, FileText, Scale, UserPlus, Shield, History } from 'lucide-react';

interface TextoSection {
  id: string;
  label: string;
  icon: any;
  color: string;
  description: string;
  placeholder: string;
  defaultContent: string;
  version: string;
  updatedAt: string;
  published: boolean;
  history: { version: string; date: string; author: string }[];
}

const sections: TextoSection[] = [
  {
    id: 'legais',
    label: 'Textos Legais',
    icon: Scale,
    color: 'text-orange-500',
    description: 'Termos de uso e política de privacidade exibidos no portal',
    placeholder: 'Digite os textos legais da entidade...',
    defaultContent: `TERMOS DE USO

1. ACEITAÇÃO DOS TERMOS
Ao acessar e utilizar a plataforma da Associação Médica Brasileira Regional SP (AMB-SP), você concorda em cumprir e estar vinculado aos seguintes termos e condições de uso.

2. DESCRIÇÃO DO SERVIÇO
A AMB-SP oferece uma plataforma digital para gestão associativa, comunicação entre membros, acesso a conteúdos educacionais e serviços exclusivos para médicos associados.

3. ELEGIBILIDADE
O acesso é restrito a médicos regularmente inscritos no Conselho Regional de Medicina de São Paulo (CREMESP) e em dia com suas obrigações associativas.

4. RESPONSABILIDADES DO USUÁRIO
O associado é responsável por manter a confidencialidade de suas credenciais de acesso e por todas as atividades realizadas em sua conta.

5. PROPRIEDADE INTELECTUAL
Todo o conteúdo disponível na plataforma é protegido por direitos autorais e não pode ser reproduzido sem autorização expressa da AMB-SP.`,
    version: '2.3',
    updatedAt: '2025-11-10',
    published: true,
    history: [
      { version: '2.3', date: '2025-11-10', author: 'Dr. Carlos Ferreira' },
      { version: '2.2', date: '2025-06-15', author: 'Dra. Márcia Santos' },
      { version: '2.1', date: '2024-12-01', author: 'Dr. Carlos Ferreira' },
    ],
  },
  {
    id: 'estatuto',
    label: 'Estatuto',
    icon: FileText,
    color: 'text-blue-500',
    description: 'Estatuto social e regimento interno da entidade',
    placeholder: 'Digite o estatuto da entidade...',
    defaultContent: `ESTATUTO SOCIAL DA ASSOCIAÇÃO MÉDICA BRASILEIRA REGIONAL SÃO PAULO

CAPÍTULO I — DA DENOMINAÇÃO, SEDE, FINS E DURAÇÃO

Art. 1º — A Associação Médica Brasileira Regional São Paulo, doravante denominada AMB-SP, é uma entidade civil, de caráter científico e cultural, sem fins lucrativos, com sede e foro na cidade de São Paulo, Estado de São Paulo.

Art. 2º — A AMB-SP tem por finalidades:
I — Representar os interesses dos médicos do Estado de São Paulo;
II — Promover o desenvolvimento científico e cultural da classe médica;
III — Defender a ética profissional médica;
IV — Contribuir para a melhoria do sistema de saúde público e privado;
V — Oferecer serviços e benefícios aos associados.

Art. 3º — A duração da AMB-SP é por tempo indeterminado.

CAPÍTULO II — DO QUADRO ASSOCIATIVO

Art. 4º — O quadro associativo da AMB-SP é composto de associados nas seguintes categorias:
I — Titular: médico com CRM ativo no CREMESP;
II — Honorário: pessoa que prestou relevantes serviços à medicina;
III — Estudante: graduando de medicina regularmente matriculado;
IV — Especial: médico aposentado ou em situação especial.`,
    version: '5.1',
    updatedAt: '2024-08-20',
    published: true,
    history: [
      { version: '5.1', date: '2024-08-20', author: 'Assembleia Geral' },
      { version: '5.0', date: '2022-03-15', author: 'Assembleia Geral' },
      { version: '4.2', date: '2019-10-05', author: 'Assembleia Geral' },
    ],
  },
  {
    id: 'inscricoes',
    label: 'Regras de Inscrição',
    icon: UserPlus,
    color: 'text-indigo-500',
    description: 'Critérios de admissão e processo de filiação',
    placeholder: 'Digite as regras de inscrição...',
    defaultContent: `REGRAS DE INSCRIÇÃO E FILIAÇÃO — AMB-SP

1. REQUISITOS PARA FILIAÇÃO

1.1 Associado Titular
- Ser médico com registro ativo no CREMESP;
- Não possuir débitos com outros CRMs;
- Não ter sofrido penalidades éticas nos últimos 5 anos;
- Preencher formulário de filiação e documentação exigida;
- Estar em dia com a mensalidade associativa.

1.2 Associado Estudante
- Estar regularmente matriculado em curso de medicina reconhecido pelo MEC;
- Apresentar declaração de matrícula atualizada;
- Renovar anualmente mediante nova declaração.

2. DOCUMENTAÇÃO NECESSÁRIA
- Documento de identidade (RG ou CNH);
- CPF;
- Comprovante de residência;
- Certificado de Registro no CRM (para associado titular);
- Declaração de matrícula (para estudante);
- Foto 3×4 recente.

3. PROCESSO DE APROVAÇÃO
O pedido de filiação será analisado pela Secretaria em até 15 dias úteis. O solicitante será comunicado por e-mail sobre a decisão.

4. ANUIDADE E MENSALIDADE
Os valores são definidos anualmente pela diretoria e comunicados com 60 dias de antecedência.`,
    version: '3.0',
    updatedAt: '2025-01-05',
    published: true,
    history: [
      { version: '3.0', date: '2025-01-05', author: 'Dra. Márcia Santos' },
      { version: '2.8', date: '2024-04-12', author: 'Dr. Roberto Lima' },
    ],
  },
  {
    id: 'lgpd',
    label: 'LGPD',
    icon: Shield,
    color: 'text-teal-500',
    description: 'Política de privacidade e proteção de dados pessoais (LGPD)',
    placeholder: 'Digite a política de privacidade e LGPD...',
    defaultContent: `POLÍTICA DE PRIVACIDADE E PROTEÇÃO DE DADOS — AMB-SP

Em conformidade com a Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018 — LGPD).

1. DADOS COLETADOS
A AMB-SP coleta dados pessoais necessários para a prestação de serviços associativos, incluindo:
- Nome completo, CPF, data de nascimento;
- Número de registro no CRM e especialidade;
- Endereço, telefone e e-mail;
- Dados bancários para débito de anuidade (quando autorizado);
- Histórico de participação em eventos e cursos.

2. FINALIDADE DO TRATAMENTO
Os dados são utilizados para:
- Gestão do cadastro associativo;
- Comunicação sobre benefícios, eventos e informações relevantes;
- Cumprimento de obrigações legais;
- Melhoria dos serviços prestados.

3. COMPARTILHAMENTO DE DADOS
Os dados não são vendidos ou cedidos a terceiros. Podem ser compartilhados com:
- Parceiros para prestação de benefícios (mediante consentimento);
- Autoridades competentes, quando exigido por lei.

4. DIREITOS DO TITULAR
O associado pode, a qualquer momento:
- Confirmar a existência de tratamento de seus dados;
- Acessar e corrigir seus dados;
- Solicitar a portabilidade ou exclusão dos dados;
- Revogar o consentimento.

5. ENCARREGADO DE DADOS (DPO)
Contato: dpo@ambsp.org.br
Responsável: Dr. Fernando Mendes Costa`,
    version: '1.4',
    updatedAt: '2025-09-18',
    published: true,
    history: [
      { version: '1.4', date: '2025-09-18', author: 'Dr. Fernando Costa' },
      { version: '1.3', date: '2025-03-22', author: 'Dr. Fernando Costa' },
      { version: '1.0', date: '2022-08-01', author: 'Dr. Carlos Ferreira' },
    ],
  },
];

export function EntityTextosRegras() {
  const [activeTab, setActiveTab] = useState('legais');
  const [contents, setContents] = useState<Record<string, string>>(
    Object.fromEntries(sections.map(s => [s.id, s.defaultContent]))
  );
  const [published, setPublished] = useState<Record<string, boolean>>(
    Object.fromEntries(sections.map(s => [s.id, s.published]))
  );
  const [saved, setSaved] = useState<Record<string, boolean>>({});
  const [showHistory, setShowHistory] = useState(false);

  const currentSection = sections.find(s => s.id === activeTab)!;

  const handleSave = () => {
    setSaved(prev => ({ ...prev, [activeTab]: true }));
    setTimeout(() => setSaved(prev => ({ ...prev, [activeTab]: false })), 3000);
  };

  const togglePublish = () => {
    setPublished(prev => ({ ...prev, [activeTab]: !prev[activeTab] }));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl mb-1">Textos e Regras</h1>
          <p className="text-sm text-muted-foreground">Gerencie os textos legais, estatuto, regras de inscrição e política de privacidade</p>
        </div>

        <div className="flex gap-6">
          <div className="w-52 flex-shrink-0">
            <nav className="space-y-1">
              {sections.map(section => {
                const Icon = section.icon;
                const isActive = activeTab === section.id;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveTab(section.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                      isActive ? 'bg-primary/10 text-primary' : 'hover:bg-accent text-foreground'
                    }`}
                  >
                    <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-primary' : section.color}`} />
                    <span className="text-sm font-medium">{section.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="flex-1 min-w-0">
            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="px-5 py-4 border-b border-border">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold">{currentSection.label}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{currentSection.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowHistory(!showHistory)}
                      className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-border rounded-lg hover:bg-accent transition-colors"
                    >
                      <History className="w-3.5 h-3.5" />
                      Histórico
                    </button>
                    <button
                      onClick={togglePublish}
                      className={`flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-lg transition-colors ${
                        published[activeTab]
                          ? 'bg-green-500/10 text-green-600 border border-green-500/30 hover:bg-green-500/20'
                          : 'bg-muted text-muted-foreground border border-border hover:bg-accent'
                      }`}
                    >
                      {published[activeTab] ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                      {published[activeTab] ? 'Publicado' : 'Rascunho'}
                    </button>
                    <button
                      onClick={handleSave}
                      className={`flex items-center gap-1.5 px-4 py-1.5 text-xs rounded-lg transition-all ${
                        saved[activeTab]
                          ? 'bg-green-500/10 text-green-600 border border-green-500/30'
                          : 'bg-primary text-primary-foreground hover:bg-primary/90'
                      }`}
                    >
                      {saved[activeTab] ? <><CheckCircle className="w-3.5 h-3.5" />Salvo</> : <><Save className="w-3.5 h-3.5" />Salvar</>}
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Clock className="w-3.5 h-3.5" />
                    Versão {currentSection.version} · Atualizado em {new Date(currentSection.updatedAt + 'T00:00:00').toLocaleDateString('pt-BR')}
                  </div>
                </div>
              </div>

              {showHistory && (
                <div className="px-5 py-4 border-b border-border bg-muted/20">
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Histórico de versões</h4>
                  <div className="space-y-2">
                    {currentSection.history.map((h, i) => (
                      <div key={i} className="flex items-center gap-3 text-xs">
                        <span className="font-mono font-medium text-primary">v{h.version}</span>
                        <span className="text-muted-foreground">{new Date(h.date + 'T00:00:00').toLocaleDateString('pt-BR')}</span>
                        <span className="text-muted-foreground">por {h.author}</span>
                        {i === 0 && (
                          <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-full">Atual</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="p-5">
                <div className="mb-2 flex items-center gap-2">
                  <div className="h-px flex-1 bg-border" />
                  <span className="text-xs text-muted-foreground px-2">Conteúdo</span>
                  <div className="h-px flex-1 bg-border" />
                </div>
                <textarea
                  value={contents[activeTab]}
                  onChange={e => setContents(prev => ({ ...prev, [activeTab]: e.target.value }))}
                  placeholder={currentSection.placeholder}
                  rows={24}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg text-sm font-mono leading-relaxed focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none"
                />
                <p className="text-xs text-muted-foreground mt-2 text-right">
                  {contents[activeTab].length} caracteres
                </p>
              </div>

              <div className="px-5 py-4 border-t border-border bg-muted/10 flex items-center justify-between">
                <p className="text-xs text-muted-foreground">
                  As alterações salvas entram em vigor imediatamente para usuários que {published[activeTab] ? 'acessarem o portal.' : 'após a publicação.'}
                </p>
                <button
                  onClick={handleSave}
                  className={`flex items-center gap-2 px-5 py-2 text-sm rounded-lg transition-all ${
                    saved[activeTab]
                      ? 'bg-green-500/10 text-green-600 border border-green-500/30'
                      : 'bg-primary text-primary-foreground hover:bg-primary/90'
                  }`}
                >
                  {saved[activeTab] ? <><CheckCircle className="w-4 h-4" />Salvo</> : <><Save className="w-4 h-4" />Salvar alterações</>}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
