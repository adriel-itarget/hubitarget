import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Users, Calendar, GraduationCap, TrendingUp, Award, FileText, Vote, ArrowLeft } from 'lucide-react';
import { Button } from '@mui/material';

const modules = [
  {
    id: 'associativa',
    name: 'Gestão Associativa',
    icon: Users,
    description: 'Administre seus associados com cadastro completo, controle de anuidades e comunicação integrada.',
    price: 299,
    priceType: '/mês',
    features: ['Cadastro de associados', 'Controle de anuidades', 'Comunicação integrada', 'Relatórios completos'],
    category: 'Gestão'
  },
  {
    id: 'eventos',
    name: 'Gestão de Eventos',
    icon: Calendar,
    description: 'Organize congressos e eventos com inscrições, CAEX, programação científica e certificados digitais.',
    price: 499,
    priceType: '/mês',
    features: ['Inscrições online', 'CAEX - Expositores', 'Programação científica', 'Certificados digitais'],
    category: 'Eventos'
  },
  {
    id: 'ead',
    name: 'EAD / LMS',
    icon: GraduationCap,
    description: 'Plataforma completa de educação continuada com cursos online, trilhas e certificações.',
    price: 399,
    priceType: '/mês',
    features: ['Cursos online', 'Trilhas de aprendizagem', 'Certificados automáticos', 'Pontuação CME'],
    category: 'Educação'
  },
  {
    id: 'cashback',
    name: 'Pontuação e Cashback',
    icon: TrendingUp,
    description: 'Sistema de pontos e benefícios que aumenta o engajamento e fideliza associados.',
    price: 199,
    priceType: '/mês',
    features: ['Programa de pontos', 'Cashback automático', 'Marketplace de benefícios', 'Parcerias'],
    category: 'Engajamento'
  },
  {
    id: 'provas',
    name: 'Provas e Exames',
    icon: Award,
    description: 'Gestão completa de provas de título com banco de questões e correção automática.',
    price: 349,
    priceType: '/mês',
    features: ['Banco de questões', 'Aplicação de provas', 'Correção automática', 'Certificação'],
    category: 'Certificação'
  },
  {
    id: 'formularios',
    name: 'Formulários',
    icon: FileText,
    description: 'Crie pesquisas, enquetes e avaliações com lógica condicional avançada.',
    price: 149,
    priceType: '/mês',
    features: ['Construtor visual', 'Lógica condicional', 'Análise de dados', 'Exportação'],
    category: 'Pesquisas'
  },
  {
    id: 'eleicoes',
    name: 'Eleições de Diretoria',
    icon: Vote,
    description: 'Sistema completo e seguro para eleições de diretoria com votação online.',
    price: 249,
    priceType: '/mês',
    features: ['Votação online segura', 'Cadastro de chapas', 'Apuração automática', 'Certificado de resultado'],
    category: 'Governança'
  }
];

export function MarketplacePage() {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      navigate('/login');
    } else {
      setUser(JSON.parse(currentUser));
    }
  }, [navigate]);

  if (!user) return null;

  const purchasedModuleIds = user.modules?.map((m: any) => m.id) || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="text"
                startIcon={<ArrowLeft />}
                onClick={() => navigate('/dashboard')}
                sx={{
                  color: '#475569',
                  textTransform: 'none',
                }}
              >
                Voltar
              </Button>
              <div className="w-px h-6 bg-gray-200"></div>
              <Building2 className="w-6 h-6 text-slate-900" />
              <span className="font-semibold text-slate-900">{user.entityName}</span>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-semibold text-slate-900 mb-4">
            Marketplace de Departamentos
          </h1>
          <p className="text-xl text-gray-600">
            Expanda sua plataforma com departamentos profissionais
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {modules.map((module) => {
            const Icon = module.icon;
            const isPurchased = purchasedModuleIds.includes(module.id);

            return (
              <div
                key={module.id}
                className="bg-white rounded-2xl border border-gray-200 hover:shadow-xl transition-all overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-4 bg-slate-900 rounded-xl">
                      <Icon className="w-8 h-8 text-white" strokeWidth={1.5} />
                    </div>
                    {isPurchased && (
                      <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                        Ativo
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl font-semibold text-slate-900 mb-2">
                    {module.name}
                  </h3>

                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {module.description}
                  </p>

                  <div className="mb-6">
                    <div className="text-sm font-medium text-gray-500 mb-3">
                      Recursos inclusos
                    </div>
                    <ul className="space-y-2">
                      {module.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-t border-gray-100 pt-6">
                    <div className="flex items-end justify-between mb-4">
                      <div>
                        <div className="text-3xl font-bold text-slate-900">
                          R$ {module.price}
                        </div>
                        <div className="text-sm text-gray-500">{module.priceType}</div>
                      </div>
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-lg">
                        {module.category}
                      </span>
                    </div>

                    <Button
                      variant={isPurchased ? 'outlined' : 'contained'}
                      fullWidth
                      onClick={() => navigate(`/module/${module.id}`)}
                      sx={{
                        bgcolor: isPurchased ? 'transparent' : '#0F172A',
                        color: isPurchased ? '#475569' : 'white',
                        borderColor: isPurchased ? '#e2e8f0' : 'transparent',
                        py: 1.5,
                        textTransform: 'none',
                        borderRadius: '12px',
                        fontWeight: 600,
                        boxShadow: 'none',
                        '&:hover': {
                          bgcolor: isPurchased ? '#f8fafc' : '#1e293b',
                          borderColor: isPurchased ? '#cbd5e1' : 'transparent',
                          boxShadow: 'none',
                        }
                      }}
                    >
                      {isPurchased ? 'Ver detalhes' : 'Contratar agora'}
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
