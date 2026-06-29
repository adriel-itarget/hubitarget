import { ArrowLeft, Check, Users, FileText, Calendar, MessageSquare, DollarSign, TrendingUp, Settings, ShoppingBag, X, Info } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useParams, useOutletContext } from 'react-router-dom';

const moduleDetails: Record<number, {
  name: string;
  description: string;
  icon: any;
  color: string;
  packages: Array<{
    name: string;
    price: string;
    description: string;
    features: string[];
    recommended?: boolean;
  }>;
  subModules: Array<{
    name: string;
    description: string;
    included: 'basic' | 'pro' | 'enterprise';
  }>;
}> = {
  1: {
    name: 'Gestão de Membros',
    description: 'Sistema completo para gerenciar associados, inscrições e renovações com controle total do ciclo de vida dos membros',
    icon: Users,
    color: 'bg-blue-500',
    packages: [
      {
        name: 'Básico',
        price: 'R$ 99/mês',
        description: 'Ideal para associações pequenas',
        features: [
          'Até 500 associados',
          'Cadastro e gestão de membros',
          'Controle de anuidades',
          'Relatórios básicos',
          'Suporte por email',
        ],
      },
      {
        name: 'Profissional',
        price: 'R$ 199/mês',
        description: 'Para associações em crescimento',
        recommended: true,
        features: [
          'Até 2.000 associados',
          'Todos recursos do Básico',
          'Gestão de categorias de sócios',
          'Portal do associado personalizado',
          'Automação de cobranças',
          'Relatórios avançados',
          'Integração com WhatsApp',
          'Suporte prioritário',
        ],
      },
      {
        name: 'Enterprise',
        price: 'R$ 399/mês',
        description: 'Para grandes organizações',
        features: [
          'Associados ilimitados',
          'Todos recursos do Profissional',
          'Gestão de filiais e regionais',
          'API completa',
          'Campos personalizados ilimitados',
          'Workflows customizados',
          'Gestor de conta dedicado',
          'SLA de suporte',
        ],
      },
    ],
    subModules: [
      {
        name: 'Cadastro de Associados',
        description: 'Gestão completa de dados cadastrais com campos customizáveis',
        included: 'basic',
      },
      {
        name: 'Controle de Anuidades',
        description: 'Gestão de mensalidades e renovações automáticas',
        included: 'basic',
      },
      {
        name: 'Portal do Associado',
        description: 'Portal web personalizado para autoatendimento',
        included: 'pro',
      },
      {
        name: 'Categorias e Segmentação',
        description: 'Criação de categorias personalizadas de associados',
        included: 'pro',
      },
      {
        name: 'Gestão de Dependentes',
        description: 'Controle de dependentes e familiares',
        included: 'pro',
      },
      {
        name: 'Gestão Multifilial',
        description: 'Controle de múltiplas unidades e regionais',
        included: 'enterprise',
      },
    ],
  },
  2: {
    name: 'Portal Financeiro',
    description: 'Controle completo de contas a pagar, receber e análise de ROI com integração bancária',
    icon: DollarSign,
    color: 'bg-green-500',
    packages: [
      {
        name: 'Básico',
        price: 'R$ 149/mês',
        description: 'Controle financeiro essencial',
        features: [
          'Contas a pagar e receber',
          'Fluxo de caixa',
          'Categorias de receitas/despesas',
          'Relatórios financeiros básicos',
          'Até 500 lançamentos/mês',
        ],
      },
      {
        name: 'Profissional',
        price: 'R$ 299/mês',
        description: 'Gestão financeira completa',
        recommended: true,
        features: [
          'Lançamentos ilimitados',
          'Todos recursos do Básico',
          'Centros de custo',
          'Análise de ROI',
          'Integração bancária (OFX)',
          'Conciliação bancária',
          'Boletos e PIX automáticos',
          'DRE e Balanço',
        ],
      },
      {
        name: 'Enterprise',
        price: 'R$ 599/mês',
        description: 'Controle corporativo avançado',
        features: [
          'Todos recursos do Profissional',
          'Múltiplas contas bancárias',
          'Workflow de aprovações',
          'Planejamento orçamentário',
          'Previsão de caixa com IA',
          'Gestão de contratos',
          'Integração contábil',
          'Auditoria completa',
        ],
      },
    ],
    subModules: [
      {
        name: 'Contas a Pagar',
        description: 'Gestão completa de fornecedores e pagamentos',
        included: 'basic',
      },
      {
        name: 'Contas a Receber',
        description: 'Controle de recebimentos e inadimplência',
        included: 'basic',
      },
      {
        name: 'Centros de Custo',
        description: 'Análise de custos por departamento ou projeto',
        included: 'pro',
      },
      {
        name: 'Integração Bancária',
        description: 'Sincronização automática com bancos',
        included: 'pro',
      },
      {
        name: 'Geração de Boletos',
        description: 'Emissão automática de boletos e PIX',
        included: 'pro',
      },
      {
        name: 'Planejamento Orçamentário',
        description: 'Orçamento anual e controle de metas',
        included: 'enterprise',
      },
    ],
  },
};

export function ModuleDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { onAddToCart } = useOutletContext<{
    onAddToCart: (item: {
      moduleId: number;
      moduleName: string;
      packageType: 'basic' | 'pro' | 'enterprise' | 'custom';
      price: number;
      subModules: string[];
    }) => void;
  }>();

  const [showInfoModal, setShowInfoModal] = useState(false);
  const [selectedInfoModule, setSelectedInfoModule] = useState<string | null>(null);
  const [selectedSubModules, setSelectedSubModules] = useState<string[]>([]);
  const [isCustomPlan, setIsCustomPlan] = useState(false);

  const moduleId = parseInt(id || '0');
  const module = moduleDetails[moduleId];

  if (!module) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Departamento não encontrado</p>
          <button onClick={() => navigate('/hub/loja')} className="px-4 py-2 bg-primary text-primary-foreground rounded-lg">
            Voltar
          </button>
        </div>
      </div>
    );
  }

  const Icon = module.icon;

  return (
    <div className="min-h-screen bg-background">
      <div className="px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => navigate('/hub/loja')}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar para Loja
          </button>

          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-16 h-16 rounded-2xl ${module.color} flex items-center justify-center`}>
                <Icon className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl mb-2">{module.name}</h1>
                <p className="text-muted-foreground">{module.description}</p>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl mb-6">Escolha seu Plano</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {module.packages.map((pkg, index) => (
                <div
                  key={index}
                  className={`bg-card border rounded-2xl p-8 ${
                    pkg.recommended
                      ? 'border-primary shadow-lg scale-105'
                      : 'border-border'
                  }`}
                >
                  {pkg.recommended && (
                    <div className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full inline-block mb-4">
                      Mais Popular
                    </div>
                  )}
                  <h3 className="text-xl font-semibold mb-2">{pkg.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{pkg.description}</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">{pkg.price}</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => {
                      const packageType = pkg.name === 'Básico' ? 'basic' : pkg.name === 'Profissional' ? 'pro' : 'enterprise';
                      const priceValue = parseInt(pkg.price.replace(/[^\d]/g, ''));

                      onAddToCart({
                        moduleId,
                        moduleName: module.name,
                        packageType,
                        price: priceValue,
                        subModules: pkg.features.slice(0, 5),
                      });
                    }}
                    className={`w-full py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                      pkg.recommended
                        ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                        : 'bg-accent text-accent-foreground hover:bg-accent/80'
                    }`}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Adicionar ao Carrinho
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl">Funcionalidades Incluídas</h2>
              <button
                onClick={() => setIsCustomPlan(!isCustomPlan)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  isCustomPlan
                    ? 'bg-primary text-primary-foreground'
                    : 'border border-border hover:bg-accent'
                }`}
              >
                {isCustomPlan ? 'Ver Planos Fixos' : 'Montar Plano Customizado'}
              </button>
            </div>

            {!isCustomPlan ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {module.subModules.map((subModule, index) => (
                  <div
                    key={index}
                    className="bg-card border border-border rounded-xl p-6"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold">{subModule.name}</h3>
                      <button
                        onClick={() => {
                          setSelectedInfoModule(subModule.name);
                          setShowInfoModal(true);
                        }}
                        className="p-1 hover:bg-accent rounded transition-colors"
                        title="Mais informações"
                      >
                        <Info className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{subModule.description}</p>
                    <span
                      className={`text-xs px-3 py-1 rounded-full ${
                        subModule.included === 'basic'
                          ? 'bg-blue-500/10 text-blue-600'
                          : subModule.included === 'pro'
                          ? 'bg-purple-500/10 text-purple-600'
                          : 'bg-orange-500/10 text-orange-600'
                      }`}
                    >
                      {subModule.included === 'basic' && 'Incluído no Básico'}
                      {subModule.included === 'pro' && 'A partir do Profissional'}
                      {subModule.included === 'enterprise' && 'Apenas Enterprise'}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <div className="bg-muted/50 rounded-xl p-6 mb-6">
                  <h3 className="font-semibold mb-2">Monte seu plano sob medida</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Selecione apenas os recursos que você precisa e pague apenas por eles
                  </p>
                  <div className="flex items-center gap-6">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Recursos selecionados</p>
                      <p className="text-2xl font-bold">{selectedSubModules.length}</p>
                    </div>
                    <div className="h-10 w-px bg-border" />
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Total mensal</p>
                      <p className="text-2xl font-bold text-primary">
                        R$ {selectedSubModules.reduce((sum, name) => {
                          const subModule = module.subModules.find(s => s.name === name);
                          const price = subModule?.included === 'basic' ? 29 : subModule?.included === 'pro' ? 49 : 79;
                          return sum + price;
                        }, 0)}
                      </p>
                    </div>
                    <div className="ml-auto">
                      <button
                        onClick={() => {
                          if (selectedSubModules.length === 0) {
                            alert('Selecione pelo menos um recurso para continuar');
                            return;
                          }

                          const totalPrice = selectedSubModules.reduce((sum, name) => {
                            const subModule = module.subModules.find(s => s.name === name);
                            const price = subModule?.included === 'basic' ? 29 : subModule?.included === 'pro' ? 49 : 79;
                            return sum + price;
                          }, 0);

                          onAddToCart({
                            moduleId,
                            moduleName: module.name,
                            packageType: 'custom',
                            price: totalPrice,
                            subModules: selectedSubModules,
                          });
                        }}
                        disabled={selectedSubModules.length === 0}
                        className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                      >
                        <ShoppingBag className="w-4 h-4" />
                        Adicionar ao Carrinho
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {module.subModules.map((subModule, index) => (
                    <label
                      key={index}
                      className={`flex items-start gap-4 p-5 border rounded-xl cursor-pointer transition-all ${
                        selectedSubModules.includes(subModule.name)
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:bg-accent'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedSubModules.includes(subModule.name)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedSubModules([...selectedSubModules, subModule.name]);
                          } else {
                            setSelectedSubModules(selectedSubModules.filter(s => s !== subModule.name));
                          }
                        }}
                        className="mt-1 w-5 h-5 rounded border-border"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-1">
                          <h3 className="font-semibold">{subModule.name}</h3>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              setSelectedInfoModule(subModule.name);
                              setShowInfoModal(true);
                            }}
                            className="p-1 hover:bg-accent rounded transition-colors"
                            title="Mais informações"
                          >
                            <Info className="w-4 h-4 text-muted-foreground" />
                          </button>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{subModule.description}</p>
                        <div className="flex items-center gap-3">
                          <span className="text-lg font-semibold text-primary">
                            R$ {subModule.included === 'basic' ? '29' : subModule.included === 'pro' ? '49' : '79'}/mês
                          </span>
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              subModule.included === 'basic'
                                ? 'bg-blue-500/10 text-blue-600'
                                : subModule.included === 'pro'
                                ? 'bg-purple-500/10 text-purple-600'
                                : 'bg-orange-500/10 text-orange-600'
                            }`}
                          >
                            {subModule.included === 'basic' && 'Nível Básico'}
                            {subModule.included === 'pro' && 'Nível Profissional'}
                            {subModule.included === 'enterprise' && 'Nível Enterprise'}
                          </span>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mt-12 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-2xl p-8 border border-primary/20">
            <h3 className="text-xl font-semibold mb-2">Precisa de recursos personalizados?</h3>
            <p className="text-muted-foreground mb-6">
              Nossa equipe pode desenvolver funcionalidades específicas para atender às necessidades exclusivas da sua entidade
            </p>
            <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
              Falar com Especialista
            </button>
          </div>
        </div>
      </div>

      {showInfoModal && selectedInfoModule && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">{selectedInfoModule}</h2>
              <button
                onClick={() => {
                  setShowInfoModal(false);
                  setSelectedInfoModule(null);
                }}
                className="p-2 hover:bg-accent rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Visão Geral</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {selectedInfoModule === 'Cadastro de Associados' &&
                    'Sistema completo de gestão cadastral que permite armazenar e organizar todas as informações dos seus associados de forma estruturada e segura. Oferece campos customizáveis para atender as necessidades específicas da sua entidade.'
                  }
                  {selectedInfoModule === 'Controle de Anuidades' &&
                    'Automatize completamente o processo de cobrança e renovação de anuidades. O sistema gera boletos, envia lembretes automáticos e controla inadimplência de forma inteligente.'
                  }
                  {selectedInfoModule === 'Portal do Associado' &&
                    'Portal web personalizado onde seus associados podem acessar informações, atualizar dados cadastrais, consultar anuidades e interagir com a entidade de forma autônoma.'
                  }
                  {selectedInfoModule === 'Categorias e Segmentação' &&
                    'Organize seus associados em categorias personalizadas (titular, dependente, estudante, etc.) com regras específicas de cobrança, benefícios e comunicação para cada grupo.'
                  }
                  {selectedInfoModule === 'Gestão de Dependentes' &&
                    'Controle completo de dependentes vinculados aos associados titulares, com gestão de limites, benefícios herdados e cobrança diferenciada.'
                  }
                  {selectedInfoModule === 'Gestão Multifilial' &&
                    'Gerencie múltiplas filiais, regionais ou unidades da sua entidade de forma centralizada, com controle de permissões, relatórios consolidados e visão estratégica.'
                  }
                  {selectedInfoModule === 'Contas a Pagar' &&
                    'Gestão completa de fornecedores, agendamento de pagamentos, controle de vencimentos e histórico de transações com categorização automática.'
                  }
                  {selectedInfoModule === 'Contas a Receber' &&
                    'Controle de todas as receitas da entidade, gestão de inadimplência, envio de cobranças automáticas e conciliação de pagamentos recebidos.'
                  }
                  {selectedInfoModule === 'Centros de Custo' &&
                    'Organize suas finanças por departamentos, projetos ou eventos. Analise a rentabilidade de cada centro de custo e tome decisões baseadas em dados reais.'
                  }
                  {selectedInfoModule === 'Integração Bancária' &&
                    'Sincronização automática com sua conta bancária através de arquivos OFX. Conciliação facilitada e redução de erros de digitação.'
                  }
                  {selectedInfoModule === 'Geração de Boletos' &&
                    'Emita boletos bancários e PIX de forma automática com registro no banco. Envio por email e SMS com acompanhamento de status em tempo real.'
                  }
                  {selectedInfoModule === 'Planejamento Orçamentário' &&
                    'Defina metas orçamentárias anuais, acompanhe a execução em tempo real e receba alertas quando houver desvios significativos do planejado.'
                  }
                </p>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Principais Vantagens</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Redução de até 70% no tempo gasto com processos administrativos</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Automação completa com notificações inteligentes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Interface intuitiva que não requer treinamento extensivo</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Relatórios detalhados e personalizáveis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Segurança e conformidade com LGPD</span>
                  </li>
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Telas do Sistema</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="aspect-video bg-gradient-to-br from-primary/10 to-purple-500/10 rounded-lg border border-border flex items-center justify-center">
                    <span className="text-muted-foreground">Tela Principal</span>
                  </div>
                  <div className="aspect-video bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-lg border border-border flex items-center justify-center">
                    <span className="text-muted-foreground">Detalhes</span>
                  </div>
                  <div className="aspect-video bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-lg border border-border flex items-center justify-center">
                    <span className="text-muted-foreground">Relatórios</span>
                  </div>
                  <div className="aspect-video bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-lg border border-border flex items-center justify-center">
                    <span className="text-muted-foreground">Configurações</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setShowInfoModal(false);
                  setSelectedInfoModule(null);
                }}
                className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
