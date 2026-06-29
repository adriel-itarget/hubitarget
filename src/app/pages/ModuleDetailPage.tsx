import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Building2, ArrowLeft, Check, CreditCard } from 'lucide-react';
import { Button } from '@mui/material';

const moduleDetails: any = {
  associativa: {
    submodules: [
      { name: 'Cadastro de Associados', description: 'Sistema completo de cadastro com campos personalizáveis' },
      { name: 'Controle de Anuidades', description: 'Gestão automatizada de cobranças e pagamentos' },
      { name: 'Comunicação Integrada', description: 'Envio de emails, SMS e notificações push' },
      { name: 'Relatórios e Dashboards', description: 'Visualização de dados em tempo real' },
      { name: 'Gestão de Documentos', description: 'Armazenamento seguro e assinatura digital' }
    ]
  },
  eventos: {
    submodules: [
      { name: 'Sistema de Inscrições', description: 'Inscrições online com múltiplas categorias' },
      { name: 'CAEX - Gestão de Expositores', description: 'Controle completo de estandes e expositores' },
      { name: 'Programação Científica', description: 'Gestão de palestras e palestrantes' },
      { name: 'Submissão de Trabalhos', description: 'Sistema com avaliação cega automática' },
      { name: 'Certificados Digitais', description: 'Geração automática de certificados' }
    ]
  },
  ead: {
    submodules: [
      { name: 'Cursos Online', description: 'Player inteligente com múltiplos formatos' },
      { name: 'Trilhas de Aprendizagem', description: 'Jornadas personalizadas de conhecimento' },
      { name: 'Certificação Automática', description: 'Emissão automática de certificados' },
      { name: 'Pontuação CME', description: 'Controle de créditos de educação continuada' }
    ]
  },
  cashback: {
    submodules: [
      { name: 'Sistema de Pontos', description: 'Pontuação automática por atividades' },
      { name: 'Programa de Cashback', description: 'Devolução de créditos configurável' },
      { name: 'Marketplace de Benefícios', description: 'Catálogo de produtos para resgate' }
    ]
  },
  provas: {
    submodules: [
      { name: 'Banco de Questões', description: 'Organização avançada de questões' },
      { name: 'Aplicação de Provas', description: 'Provas online com sistema antifraude' },
      { name: 'Correção Automática', description: 'Correção instantânea e feedback' }
    ]
  },
  formularios: {
    submodules: [
      { name: 'Construtor de Formulários', description: 'Editor visual drag-and-drop' },
      { name: 'Lógica Condicional', description: 'Fluxos inteligentes de perguntas' },
      { name: 'Análise de Respostas', description: 'Dashboards interativos em tempo real' }
    ]
  },
  eleicoes: {
    submodules: [
      { name: 'Cadastro de Chapas', description: 'Gestão completa de candidaturas' },
      { name: 'Votação Online', description: 'Sistema seguro de votação eletrônica' },
      { name: 'Apuração Automática', description: 'Contagem de votos em tempo real' },
      { name: 'Certificado de Resultado', description: 'Documento oficial com assinatura digital' }
    ]
  }
};

export function ModuleDetailPage() {
  const { id } = useParams();
  const [user, setUser] = useState<any>(null);
  const [module, setModule] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      navigate('/login');
      return;
    }
    setUser(JSON.parse(currentUser));

    // Buscar módulo
    const modulesData = [
      { id: 'associativa', name: 'Gestão Associativa', price: 299, description: 'Administre seus associados com cadastro completo, controle de anuidades e comunicação integrada.' },
      { id: 'eventos', name: 'Gestão de Eventos', price: 499, description: 'Organize congressos e eventos com inscrições, CAEX, programação científica e certificados digitais.' },
      { id: 'ead', name: 'EAD / LMS', price: 399, description: 'Plataforma completa de educação continuada com cursos online, trilhas e certificações.' },
      { id: 'cashback', name: 'Pontuação e Cashback', price: 199, description: 'Sistema de pontos e benefícios que aumenta o engajamento e fideliza associados.' },
      { id: 'provas', name: 'Provas e Exames', price: 349, description: 'Gestão completa de provas de título com banco de questões e correção automática.' },
      { id: 'formularios', name: 'Formulários', price: 149, description: 'Crie pesquisas, enquetes e avaliações com lógica condicional avançada.' },
      { id: 'eleicoes', name: 'Eleições de Diretoria', price: 249, description: 'Sistema completo e seguro para eleições de diretoria com votação online.' }
    ];

    const foundModule = modulesData.find(m => m.id === id);
    if (foundModule) {
      setModule({ ...foundModule, submodules: moduleDetails[id]?.submodules || [] });
    }
  }, [id, navigate]);

  const handlePurchase = () => {
    if (!user || !module) return;

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex((u: any) => u.id === user.id);

    if (userIndex !== -1) {
      if (!users[userIndex].modules) {
        users[userIndex].modules = [];
      }

      // Verificar se já possui o módulo
      const alreadyPurchased = users[userIndex].modules.some((m: any) => m.id === module.id);

      if (alreadyPurchased) {
        alert('Você já possui este departamento!');
        return;
      }

      users[userIndex].modules.push({
        id: module.id,
        name: module.name,
        purchasedAt: new Date().toISOString()
      });

      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('currentUser', JSON.stringify(users[userIndex]));
      setUser(users[userIndex]);

      alert('Departamento contratado com sucesso!');
      navigate('/dashboard');
    }
  };

  if (!user || !module) return null;

  const isPurchased = user.modules?.some((m: any) => m.id === module.id);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="text"
                startIcon={<ArrowLeft />}
                onClick={() => navigate('/marketplace')}
                sx={{
                  color: '#475569',
                  textTransform: 'none',
                }}
              >
                Voltar para marketplace
              </Button>
              <div className="w-px h-6 bg-gray-200"></div>
              <Building2 className="w-6 h-6 text-slate-900" />
              <span className="font-semibold text-slate-900">{user.entityName}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <h1 className="text-5xl font-semibold text-slate-900 mb-4">
              {module.name}
            </h1>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed">
              {module.description}
            </p>

            <div className="mb-12">
              <h2 className="text-3xl font-semibold text-slate-900 mb-6">
                Funcionalidades incluídas
              </h2>

              <div className="space-y-4">
                {module.submodules.map((submodule: any, idx: number) => (
                  <div key={idx} className="bg-white rounded-xl p-6 border border-gray-200">
                    <div className="flex items-start gap-4">
                      <div className="mt-1 p-2 bg-green-100 rounded-lg">
                        <Check className="w-5 h-5 text-green-600" strokeWidth={3} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-slate-900 mb-1">
                          {submodule.name}
                        </h3>
                        <p className="text-gray-600">
                          {submodule.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 rounded-2xl p-8 border border-blue-100">
              <h3 className="text-2xl font-semibold text-slate-900 mb-4">
                Por que escolher este departamento?
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" strokeWidth={2.5} />
                  <span className="text-gray-700">Implementação rápida em até 48 horas</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" strokeWidth={2.5} />
                  <span className="text-gray-700">Suporte técnico especializado 24/7</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" strokeWidth={2.5} />
                  <span className="text-gray-700">Atualizações automáticas incluídas</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" strokeWidth={2.5} />
                  <span className="text-gray-700">Treinamento completo para sua equipe</span>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-2xl p-8 border border-gray-200 sticky top-24">
              <div className="mb-6">
                <div className="text-5xl font-bold text-slate-900 mb-2">
                  R$ {module.price}
                </div>
                <div className="text-gray-600">por mês</div>
              </div>

              {isPurchased ? (
                <div className="mb-6">
                  <div className="flex items-center gap-2 text-green-600 mb-4">
                    <Check className="w-5 h-5" strokeWidth={2.5} />
                    <span className="font-semibold">Departamento ativo</span>
                  </div>
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={() => navigate('/dashboard')}
                    sx={{
                      borderColor: '#e2e8f0',
                      color: '#475569',
                      py: 2,
                      textTransform: 'none',
                      borderRadius: '12px',
                      fontWeight: 600,
                      '&:hover': {
                        borderColor: '#cbd5e1',
                        bgcolor: '#f8fafc',
                      }
                    }}
                  >
                    Ir para dashboard
                  </Button>
                </div>
              ) : (
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<CreditCard />}
                  onClick={handlePurchase}
                  sx={{
                    bgcolor: '#0F172A',
                    py: 2,
                    textTransform: 'none',
                    borderRadius: '12px',
                    fontWeight: 600,
                    fontSize: '1.125rem',
                    mb: 3,
                    boxShadow: 'none',
                    '&:hover': {
                      bgcolor: '#1e293b',
                      boxShadow: 'none',
                    }
                  }}
                >
                  Contratar agora
                </Button>
              )}

              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-gray-400" />
                  <span>Cancele quando quiser</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-gray-400" />
                  <span>Primeira semana grátis</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-gray-400" />
                  <span>Sem taxas de setup</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
