import { Building2, Image, FileText, Scale, UserPlus, Shield, Users, Calendar, DollarSign, Tags } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EntityConfigForm } from './EntityConfigForm';

const configSections = [
  {
    id: 'general',
    title: 'Configurações Gerais',
    description: 'Nome, descrição e informações básicas da entidade',
    icon: Building2,
    color: 'bg-blue-500',
  },
  {
    id: 'data',
    title: 'Dados da Entidade',
    description: 'CNPJ, endereço, contatos e informações cadastrais',
    icon: FileText,
    color: 'bg-green-500',
  },
  {
    id: 'branding',
    title: 'Identidade Visual',
    description: 'Logo, cores, tipografia e elementos visuais',
    icon: Image,
    color: 'bg-purple-500',
  },
  {
    id: 'legal',
    title: 'Textos Legais',
    description: 'Termos de uso, política de privacidade e avisos',
    icon: Scale,
    color: 'bg-orange-500',
  },
  {
    id: 'statute',
    title: 'Estatuto',
    description: 'Estatuto social e regimento interno',
    icon: FileText,
    color: 'bg-pink-500',
  },
  {
    id: 'enrollment',
    title: 'Regra de Inscrições',
    description: 'Critérios de admissão e processo de cadastro',
    icon: UserPlus,
    color: 'bg-indigo-500',
  },
  {
    id: 'lgpd',
    title: 'LGPD',
    description: 'Configurações de privacidade e proteção de dados',
    icon: Shield,
    color: 'bg-teal-500',
  },
];

const entityMenus = [
  {
    id: 'associados',
    title: 'Associados',
    description: 'Gerenciar cadastro de associados e membros',
    icon: Users,
    color: 'bg-blue-500',
    route: '/hub/entidade/associados',
  },
  {
    id: 'eventos',
    title: 'Eventos',
    description: 'Criar e gerenciar eventos da entidade',
    icon: Calendar,
    color: 'bg-purple-500',
    route: '/hub/entidade/eventos',
  },
  {
    id: 'categorias',
    title: 'Categorias Financeiras',
    description: 'Categorias de receitas e despesas',
    icon: DollarSign,
    color: 'bg-green-500',
    route: '/hub/entidade/categorias',
  },
  {
    id: 'tags',
    title: 'Tags e Classificações',
    description: 'Sistema de tags para organização',
    icon: Tags,
    color: 'bg-orange-500',
    route: '/hub/entidade/tags',
  },
];

export function EntityConfig() {
  const navigate = useNavigate();
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  const handleConfigure = (sectionId: string) => {
    setSelectedSection(sectionId);
  };

  const handleMenuClick = (route: string) => {
    navigate(route);
  };

  const handleBackup = () => {
    alert('Backup iniciado! Você será notificado quando o backup estiver completo.');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="px-8 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl mb-2">Configuração da Entidade</h1>
            <p className="text-muted-foreground">
              Gerencie as informações e configurações da sua organização
            </p>
          </div>

          <div className="mb-12">
            <h2 className="text-lg font-semibold mb-4">Gestão de Cadastros</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {entityMenus.map((menu) => {
                const Icon = menu.icon;
                return (
                  <div
                    key={menu.id}
                    onClick={() => handleMenuClick(menu.route)}
                    className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-all hover:border-primary/50 cursor-pointer group"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl ${menu.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>

                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{menu.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {menu.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Configurações da Entidade</h2>
            <div className="space-y-4">
              {configSections.map((section) => {
                const Icon = section.icon;
                return (
                  <div
                    key={section.id}
                    className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-all hover:border-primary/50 cursor-pointer group"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl ${section.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>

                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{section.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {section.description}
                        </p>
                      </div>

                      <button
                        onClick={() => handleConfigure(section.id)}
                        className="px-4 py-2 text-sm bg-primary/10 text-primary rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        Configurar
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-8 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-xl p-6 border border-primary/20">
            <h3 className="font-semibold mb-2">Backup de Configurações</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Faça backup regular das suas configurações para garantir a segurança dos dados
            </p>
            <button
              onClick={handleBackup}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Fazer Backup Agora
            </button>
          </div>
        </div>
      </div>

      {selectedSection && (
        <EntityConfigForm
          section={configSections.find(s => s.id === selectedSection)!}
          onClose={() => setSelectedSection(null)}
        />
      )}
    </div>
  );
}
