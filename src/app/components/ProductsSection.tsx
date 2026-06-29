import { useState } from 'react';
import { ChevronLeft, ChevronRight, Users, Calendar, GraduationCap, TrendingUp, Award, FileText, Shield, UserCircle, DollarSign, Mail, BarChart3, FolderOpen, CreditCard, BookOpen, Video, BadgeCheck, Gift, MapPin, Clipboard, ClipboardCheck, Lock, History, Key, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const products = [
  {
    id: 'associativa',
    icon: Users,
    title: 'Gestão Associativa',
    subtitle: 'Centralize toda administração de associados',
    description: 'Plataforma completa para gestão de cadastros, anuidades, comunicação e documentos. Automatize processos repetitivos e ganhe tempo para focar no que realmente importa.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1400&h=900&fit=crop',
    stats: { value: '70%', label: 'menos tempo administrativo' },
    submodules: [
      {
        id: 'cadastro',
        icon: UserCircle,
        title: 'Cadastro de Associados',
        description: 'Sistema completo de cadastro com campos personalizáveis, validação automática e importação em massa. Mantenha perfis completos e atualizados de todos os associados.',
        features: ['Campos customizáveis', 'Importação em lote', 'Validação de dados', 'Histórico de alterações']
      },
      {
        id: 'anuidades',
        icon: DollarSign,
        title: 'Controle de Anuidades',
        description: 'Gestão automatizada de cobranças, pagamentos e inadimplência. Integração com gateways de pagamento e geração automática de boletos e notificações.',
        features: ['Cobrança automática', 'Múltiplas formas de pagamento', 'Controle de inadimplência', 'Relatórios financeiros']
      },
      {
        id: 'comunicacao',
        icon: Mail,
        title: 'Comunicação Integrada',
        description: 'Envio de emails, SMS e notificações push de forma segmentada. Crie campanhas personalizadas e acompanhe métricas de abertura e engajamento.',
        features: ['Email marketing', 'SMS em massa', 'Notificações push', 'Segmentação avançada']
      },
      {
        id: 'relatorios',
        icon: BarChart3,
        title: 'Relatórios e Dashboards',
        description: 'Visualize dados em tempo real com dashboards interativos. Gere relatórios customizados sobre associados, financeiro e engajamento.',
        features: ['Dashboards em tempo real', 'Relatórios personalizados', 'Exportação de dados', 'Análise de tendências']
      },
      {
        id: 'documentos',
        icon: FolderOpen,
        title: 'Gestão de Documentos',
        description: 'Armazene e organize documentos de forma segura. Controle de versões, assinatura digital e compartilhamento controlado de arquivos.',
        features: ['Armazenamento seguro', 'Assinatura digital', 'Controle de versões', 'Compartilhamento controlado']
      }
    ]
  },
  {
    id: 'eventos',
    icon: Calendar,
    title: 'Gestão de Eventos',
    subtitle: 'Organize eventos médicos de forma profissional',
    description: 'Da inscrição à certificação, gerencie congressos, simpósios e workshops com facilidade. Gestão de expositores, programação científica e submissão de trabalhos em uma única plataforma.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1400&h=900&fit=crop',
    stats: { value: '500+', label: 'eventos realizados' },
    submodules: [
      {
        id: 'inscricoes',
        icon: Clipboard,
        title: 'Sistema de Inscrições',
        description: 'Inscrições online com múltiplas categorias, descontos progressivos e pagamento integrado. Gestão completa de participantes e acompanhantes.',
        features: ['Múltiplas categorias', 'Descontos automáticos', 'Pagamento online', 'Gestão de acompanhantes']
      },
      {
        id: 'caex',
        icon: MapPin,
        title: 'CAEX - Gestão de Expositores',
        description: 'Departamento completo para gestão de estandes, expositores e patrocinadores. Controle de espaços, contratos e benefícios de cada categoria.',
        features: ['Gestão de estandes', 'Controle de contratos', 'Benefícios por categoria', 'Relatório de expositores']
      },
      {
        id: 'programacao',
        icon: BookOpen,
        title: 'Programação Científica',
        description: 'Organize sessões, palestras e atividades. Gestão de palestrantes, grades horárias e salas de forma visual e intuitiva.',
        features: ['Grade de programação', 'Gestão de palestrantes', 'Controle de salas', 'Apresentação de currículo']
      },
      {
        id: 'trabalhos',
        icon: ClipboardCheck,
        title: 'Submissão de Trabalhos',
        description: 'Sistema completo para submissão, avaliação e publicação de trabalhos científicos. Distribuição automática e cega para avaliadores.',
        features: ['Submissão online', 'Avaliação cega', 'Distribuição automática', 'Publicação de anais']
      },
      {
        id: 'certificados',
        icon: BadgeCheck,
        title: 'Certificados Digitais',
        description: 'Geração e emissão automática de certificados personalizados. Controle de participação por QR Code e validação online.',
        features: ['Geração automática', 'QR Code único', 'Validação online', 'Templates personalizados']
      }
    ]
  },
  {
    id: 'ead',
    icon: GraduationCap,
    title: 'EAD / LMS',
    subtitle: 'Educação continuada para seus associados',
    description: 'Ofereça cursos online, trilhas de aprendizagem e certificações digitais. Controle pontuação CME e mantenha profissionais sempre atualizados com conteúdo de qualidade.',
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=1400&h=900&fit=crop',
    stats: { value: '92%', label: 'engajamento em cursos' },
    submodules: [
      {
        id: 'cursos',
        icon: Video,
        title: 'Cursos Online',
        description: 'Crie cursos com vídeos, textos, quizzes e materiais complementares. Player inteligente com controle de progresso e certificação automática.',
        features: ['Múltiplos formatos', 'Player inteligente', 'Controle de progresso', 'Quizzes integrados']
      },
      {
        id: 'trilhas',
        icon: MapPin,
        title: 'Trilhas de Aprendizagem',
        description: 'Monte jornadas de aprendizagem personalizadas com múltiplos cursos. Libere conteúdos progressivamente conforme o avanço do aluno.',
        features: ['Jornadas personalizadas', 'Liberação progressiva', 'Pré-requisitos', 'Gamificação']
      },
      {
        id: 'certificacao',
        icon: BadgeCheck,
        title: 'Certificação Automática',
        description: 'Emita certificados automaticamente após conclusão de cursos. Templates personalizados com validação online e QR Code.',
        features: ['Emissão automática', 'Templates customizados', 'Validação online', 'Controle de validade']
      },
      {
        id: 'cme',
        icon: Award,
        title: 'Pontuação CME',
        description: 'Controle completo de créditos CME (Continuing Medical Education). Integração com entidades certificadoras e relatórios de pontuação.',
        features: ['Controle de créditos', 'Integração certificadoras', 'Relatórios individuais', 'Histórico completo']
      }
    ]
  },
  {
    id: 'pontuacao',
    icon: TrendingUp,
    title: 'Pontuação e Cashback',
    subtitle: 'Recompense e engaje seus associados',
    description: 'Sistema inteligente de pontos e benefícios que aumenta significativamente o engajamento. Crie parcerias estratégicas e ofereça recompensas tangíveis.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1400&h=900&fit=crop',
    stats: { value: '85%', label: 'aumento no engajamento' },
    submodules: [
      {
        id: 'pontos',
        icon: Gift,
        title: 'Sistema de Pontos',
        description: 'Configure regras de pontuação por atividades. Participação em eventos, cursos, pagamentos e indicações geram pontos automaticamente.',
        features: ['Regras configuráveis', 'Pontuação automática', 'Múltiplas ações', 'Ranking de pontos']
      },
      {
        id: 'cashback',
        icon: CreditCard,
        title: 'Programa de Cashback',
        description: 'Devolva parte dos pagamentos como créditos. Configure percentuais, prazos e formas de utilização do cashback.',
        features: ['Cashback automático', 'Percentuais flexíveis', 'Créditos para eventos', 'Validade configurável']
      },
      {
        id: 'marketplace',
        icon: Gift,
        title: 'Marketplace de Benefícios',
        description: 'Catálogo de produtos e serviços resgatáveis com pontos. Parcerias com empresas oferecem descontos exclusivos aos associados.',
        features: ['Catálogo de benefícios', 'Resgate de pontos', 'Descontos exclusivos', 'Gestão de parcerias']
      }
    ]
  },
  {
    id: 'provas',
    icon: Award,
    title: 'Provas e Exames',
    subtitle: 'Certificações profissionais com segurança',
    description: 'Gestão completa de provas de título e exames. Banco de questões, correção automática, emissão de certificados e segurança antifraude garantida.',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1400&h=900&fit=crop',
    stats: { value: '100%', label: 'segurança e conformidade' },
    submodules: [
      {
        id: 'banco',
        icon: FolderOpen,
        title: 'Banco de Questões',
        description: 'Organize questões por categorias, níveis de dificuldade e temas. Importação em massa e versionamento de questões.',
        features: ['Categorização avançada', 'Níveis de dificuldade', 'Versionamento', 'Importação em massa']
      },
      {
        id: 'aplicacao',
        icon: Clipboard,
        title: 'Aplicação de Provas',
        description: 'Crie provas online e presenciais com randomização de questões. Controle de tempo, tentativas e prevenção de cola.',
        features: ['Provas online/presenciais', 'Randomização', 'Controle de tempo', 'Sistema antifraude']
      },
      {
        id: 'correcao',
        icon: ClipboardCheck,
        title: 'Correção Automática',
        description: 'Correção instantânea de questões objetivas e dissertativas com IA. Feedback automático e release de gabaritos programado.',
        features: ['Correção imediata', 'Suporte a dissertativas', 'Feedback automático', 'Release programado']
      }
    ]
  },
  {
    id: 'formularios',
    icon: FileText,
    title: 'Formulários',
    subtitle: 'Colete dados de forma inteligente',
    description: 'Crie pesquisas, enquetes e avaliações com lógica condicional avançada. Tome decisões baseadas em dados concretos dos seus associados.',
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=1400&h=900&fit=crop',
    stats: { value: '95%', label: 'taxa de resposta' },
    submodules: [
      {
        id: 'builder',
        icon: FileText,
        title: 'Construtor de Formulários',
        description: 'Editor visual drag-and-drop para criar formulários complexos. Múltiplos tipos de campos e validações customizadas.',
        features: ['Editor visual', 'Tipos de campos variados', 'Validações customizadas', 'Templates prontos']
      },
      {
        id: 'logica',
        icon: BarChart3,
        title: 'Lógica Condicional',
        description: 'Configure regras avançadas que mostram/ocultam campos baseado nas respostas. Crie fluxos inteligentes de perguntas.',
        features: ['Regras condicionais', 'Fluxos dinâmicos', 'Ramificações', 'Pulos de questões']
      },
      {
        id: 'analytics',
        icon: BarChart3,
        title: 'Análise de Respostas',
        description: 'Dashboards interativos com análise de respostas em tempo real. Gráficos, exportação e cruzamento de dados.',
        features: ['Dashboards em tempo real', 'Múltiplos gráficos', 'Exportação', 'Cruzamento de dados']
      }
    ]
  },
  {
    id: 'seguranca',
    icon: Shield,
    title: 'Segurança e LGPD',
    subtitle: 'Proteção e conformidade total',
    description: 'Controle de acessos, auditoria completa e conformidade com LGPD. Transições de diretoria seguras com rastreabilidade de todas as ações.',
    image: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=1400&h=900&fit=crop',
    stats: { value: '100%', label: 'conformidade LGPD' },
    submodules: [
      {
        id: 'acessos',
        icon: Key,
        title: 'Controle de Acessos',
        description: 'Gestão granular de permissões por grupos e usuários. Prazos de renovação automáticos e transição de diretoria segura.',
        features: ['Grupos de acesso', 'Permissões granulares', 'Renovação automática', 'Transição segura']
      },
      {
        id: 'lgpd',
        icon: Shield,
        title: 'Conformidade LGPD',
        description: 'Ferramentas para gestão de consentimentos, solicitações de dados e exclusão. Relatórios de conformidade e políticas automatizadas.',
        features: ['Gestão de consentimento', 'Solicitações LGPD', 'Exclusão de dados', 'Relatórios de conformidade']
      },
      {
        id: 'auditoria',
        icon: History,
        title: 'Auditoria de Ações',
        description: 'Log completo de todas as ações realizadas na plataforma. Rastreie quem fez o quê, quando e onde para total transparência.',
        features: ['Log completo', 'Rastreamento de ações', 'Histórico detalhado', 'Exportação de logs']
      },
      {
        id: 'autenticacao',
        icon: Lock,
        title: 'Autenticação Segura',
        description: 'Autenticação multifator (2FA), SSO e integração com Active Directory. Políticas de senha e controle de sessões.',
        features: ['Autenticação 2FA', 'Single Sign-On', 'Integração AD', 'Políticas de senha']
      }
    ]
  }
];

export function ProductsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isExploring, setIsExploring] = useState(false);
  const [activeSubmodule, setActiveSubmodule] = useState(0);

  const handlePrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? products.length - 1 : prev - 1));
    setIsExploring(false);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === products.length - 1 ? 0 : prev + 1));
    setIsExploring(false);
  };

  const handleExplore = () => {
    setIsExploring(true);
    setActiveSubmodule(0);
  };

  const handleBack = () => {
    setIsExploring(false);
  };

  const activeProduct = products[activeIndex];

  return (
    <div className="py-32 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-20">
          <h2 className="text-5xl lg:text-6xl text-slate-900 mb-6 tracking-tight" style={{ fontWeight: 600 }}>
            Departamentos integrados
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Soluções modulares e escaláveis para sua entidade médica
          </p>
        </div>

        <div className="flex justify-center gap-3 mb-16 flex-wrap">
          {products.map((product, index) => {
            const Icon = product.icon;
            return (
              <button
                key={product.id}
                onClick={() => setActiveIndex(index)}
                className={`flex flex-col items-center gap-2 p-4 rounded-2xl transition-all ${
                  activeIndex === index
                    ? 'bg-slate-900 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                <Icon className="w-6 h-6" strokeWidth={1.5} />
                <span className="text-xs font-medium">{product.title.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>

        <div className="relative">
          <AnimatePresence mode="wait">
            {!isExploring ? (
              <motion.div
                key={`product-${activeIndex}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <div className="aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl mb-12 relative">
                  <img
                    src={activeProduct.image}
                    alt={activeProduct.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                  <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12 text-white">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                        <activeProduct.icon className="w-8 h-8" strokeWidth={1.5} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-4xl lg:text-5xl mb-3 tracking-tight" style={{ fontWeight: 600 }}>
                          {activeProduct.title}
                        </h3>
                        <p className="text-xl lg:text-2xl text-white/90 mb-6">
                          {activeProduct.subtitle}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                  <div>
                    <p className="text-lg text-gray-600 leading-relaxed mb-8">
                      {activeProduct.description}
                    </p>

                    <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                      <div className="text-5xl font-bold text-slate-900 mb-2">
                        {activeProduct.stats.value}
                      </div>
                      <div className="text-gray-600">
                        {activeProduct.stats.label}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <button
                      onClick={handleExplore}
                      className="w-full px-8 py-4 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all font-medium text-lg shadow-lg hover:shadow-xl"
                    >
                      Explorar departamento
                    </button>
                    <button className="w-full px-8 py-4 bg-white text-slate-900 rounded-xl hover:bg-gray-50 transition-all font-medium text-lg border border-gray-200">
                      Ver demonstração
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={`explore-${activeIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <activeProduct.icon className="w-8 h-8 text-slate-900" strokeWidth={1.5} />
                    <h3 className="text-3xl text-slate-900" style={{ fontWeight: 600 }}>
                      {activeProduct.title}
                    </h3>
                  </div>
                  <button
                    onClick={handleBack}
                    className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-slate-900 transition-colors"
                  >
                    <X className="w-5 h-5" />
                    <span>Voltar</span>
                  </button>
                </div>

                <div className="grid lg:grid-cols-[400px,1fr] gap-12">
                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-gray-500 mb-6 uppercase tracking-wide">
                      Funcionalidades
                    </h4>
                    {activeProduct.submodules.map((submodule, index) => {
                      const SubIcon = submodule.icon;
                      return (
                        <button
                          key={submodule.id}
                          onClick={() => setActiveSubmodule(index)}
                          className={`w-full text-left p-6 rounded-2xl transition-all ${
                            activeSubmodule === index
                              ? 'bg-slate-900 text-white shadow-xl scale-[1.02]'
                              : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:shadow-md'
                          }`}
                        >
                          <div className="flex items-start gap-5">
                            <div className={`p-4 rounded-xl shrink-0 ${
                              activeSubmodule === index
                                ? 'bg-white/20'
                                : 'bg-slate-100'
                            }`}>
                              <SubIcon className="w-7 h-7" strokeWidth={1.5} />
                            </div>
                            <div className="flex-1 pt-1">
                              <div className={`font-semibold text-xl mb-2 ${
                                activeSubmodule === index ? 'text-white' : 'text-slate-900'
                              }`}>
                                {submodule.title}
                              </div>
                              <p className={`text-sm leading-relaxed ${
                                activeSubmodule === index ? 'text-blue-100' : 'text-gray-600'
                              }`}>
                                {submodule.description.split('.')[0]}.
                              </p>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-10 border border-gray-200 shadow-xl">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`submodule-${activeSubmodule}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        {(() => {
                          const ActiveSubmoduleIcon = activeProduct.submodules[activeSubmodule].icon;
                          return (
                            <>
                              <div className="flex items-start gap-4 mb-6">
                                <div className="p-4 bg-slate-900 rounded-2xl">
                                  <ActiveSubmoduleIcon className="w-8 h-8 text-white" strokeWidth={1.5} />
                                </div>
                                <div className="flex-1">
                                  <h4 className="text-4xl text-slate-900 mb-3 leading-tight" style={{ fontWeight: 600 }}>
                                    {activeProduct.submodules[activeSubmodule].title}
                                  </h4>
                                </div>
                              </div>

                              <p className="text-xl text-gray-700 leading-relaxed mb-10">
                                {activeProduct.submodules[activeSubmodule].description}
                              </p>

                              <div className="mb-10">
                                <h5 className="text-sm font-semibold text-gray-500 mb-5 uppercase tracking-wide">
                                  Recursos principais
                                </h5>
                                <div className="grid gap-4">
                                  {activeProduct.submodules[activeSubmodule].features.map((feature, idx) => (
                                    <div key={idx} className="flex items-start gap-4 bg-white p-4 rounded-xl border border-gray-100">
                                      <div className="mt-0.5 p-1.5 bg-green-100 rounded-lg">
                                        <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                      </div>
                                      <span className="text-gray-800 font-medium">{feature}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              <div className="flex gap-4">
                                <button className="flex-1 px-6 py-4 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all font-semibold shadow-lg hover:shadow-xl">
                                  Agendar demo deste departamento
                                </button>
                                <button className="px-6 py-4 bg-white text-slate-900 rounded-xl hover:bg-gray-50 transition-all font-semibold border-2 border-gray-200">
                                  Documentação
                                </button>
                              </div>
                            </>
                          );
                        })()}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!isExploring && (
            <>
              <button
                onClick={handlePrevious}
                className="absolute left-4 top-1/3 -translate-y-1/2 w-14 h-14 bg-white rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-all border border-gray-200 z-10"
                aria-label="Anterior"
              >
                <ChevronLeft className="w-7 h-7 text-slate-900" strokeWidth={2} />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-4 top-1/3 -translate-y-1/2 w-14 h-14 bg-white rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-all border border-gray-200 z-10"
                aria-label="Próximo"
              >
                <ChevronRight className="w-7 h-7 text-slate-900" strokeWidth={2} />
              </button>
            </>
          )}
        </div>

        {!isExploring && (
          <div className="flex justify-center gap-2 mt-16">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-1.5 rounded-full transition-all ${
                  activeIndex === index
                    ? 'bg-slate-900 w-12'
                    : 'bg-gray-300 hover:bg-gray-400 w-1.5'
                }`}
                aria-label={`Ir para slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}