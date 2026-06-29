import { Settings, Lock, Monitor, FileText, ClipboardList, ArrowRight, CreditCard, UserCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const sections = [
  {
    label: 'Acesso',
    description: 'Gerenciar usuários, níveis de acesso, grupos e permissões',
    icon: Lock,
    color: '#60a5fa',
    items: [
      { label: 'Usuários e Níveis de Acesso', to: '/modulo/configuracoes/usuarios-acesso' },
    ],
  },
  {
    label: 'Sistema',
    description: 'Configurações gerais, menus, logos e notificações',
    icon: Monitor,
    color: '#34d399',
    items: [
      { label: 'Menus', to: '/modulo/configuracoes/cfg-menus' },
      { label: 'Configurações', to: '/modulo/configuracoes/cfg-config' },
      { label: 'Logos', to: '/modulo/configuracoes/cfg-logos' },
      { label: 'Notificações', to: '/modulo/configuracoes/cfg-notificacoes' },
      { label: 'Idioma', to: '/modulo/configuracoes/cfg-idioma' },
    ],
  },
  {
    label: 'Pagamentos',
    description: 'Configuração de meios de pagamento e processadores',
    icon: CreditCard,
    color: '#f59e0b',
    items: [
      { label: 'Meios de Pagamento', to: '/modulo/configuracoes/meios-pagamento' },
    ],
  },
  {
    label: 'Documentos',
    description: 'Modelos de documentos e configurações de especialidades',
    icon: FileText,
    color: '#818cf8',
    items: [
      { label: 'Modelos de Documentos', to: '/modulo/configuracoes/cfg-modelos' },
      { label: 'Config. Especialidades', to: '/modulo/configuracoes/cfg-especialidades' },
    ],
  },
  {
    label: 'Forms',
    description: 'Formulários e banco de perguntas',
    icon: ClipboardList,
    color: '#a78bfa',
    items: [
      { label: 'Formulários', to: '/modulo/configuracoes/cfg-formularios' },
      { label: 'Perguntas', to: '/modulo/configuracoes/cfg-perguntas' },
    ],
  },
];

export function ConfiguracoesDashboard() {
  const navigate = useNavigate();

  return (
    <div className="px-8 py-8 max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
          <Settings className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Configurações do Hub</h1>
          <p className="text-muted-foreground text-sm">Departamento de Configurações — ajustes que afetam todos os departamentos</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map(section => {
          const Icon = section.icon;
          return (
            <div key={section.label} className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${section.color}15`, border: `1px solid ${section.color}30` }}
                >
                  <Icon className="w-5 h-5" style={{ color: section.color }} />
                </div>
                <div>
                  <h2 className="font-semibold">{section.label}</h2>
                  <p className="text-xs text-muted-foreground">{section.description}</p>
                </div>
              </div>
              <div className="space-y-1">
                {section.items.map(item => (
                  <button
                    key={item.to}
                    onClick={() => navigate(item.to)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-muted transition-colors text-left group"
                  >
                    <span className="text-sm flex-1">{item.label}</span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
