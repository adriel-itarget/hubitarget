import { X, Check, ArrowLeft, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { Switch } from './ui/switch';

interface EntityWizardProps {
  entityType: string;
  onClose: () => void;
  onSave: (entity: any) => void;
}

export function EntityWizard({ entityType, onClose, onSave }: EntityWizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Record<string, any>>({
    status: 'active',
  });

  const getSteps = () => {
    switch (entityType) {
      case 'associados':
        return [
          { id: 1, title: 'Dados Pessoais', description: 'Informações básicas do associado' },
          { id: 2, title: 'Contato', description: 'Telefone e endereço' },
          { id: 3, title: 'Configurações', description: 'Tipo e permissões' }
        ];
      case 'eventos':
        return [
          { id: 1, title: 'Informações', description: 'Nome e descrição do evento' },
          { id: 2, title: 'Data e Local', description: 'Quando e onde acontecerá' },
          { id: 3, title: 'Configurações', description: 'Inscrições e limites' }
        ];
      case 'categorias':
        return [
          { id: 1, title: 'Informações', description: 'Nome e tipo da categoria' },
          { id: 2, title: 'Configurações', description: 'Regras e permissões' }
        ];
      default:
        return [
          { id: 1, title: 'Informações', description: 'Dados principais' },
          { id: 2, title: 'Configurações', description: 'Opções adicionais' }
        ];
    }
  };

  const renderStepContent = () => {
    if (entityType === 'associados') {
      if (currentStep === 1) {
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Nome Completo</label>
              <input
                type="text"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Digite o nome completo"
                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">CPF</label>
              <input
                type="text"
                value={formData.cpf || ''}
                onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
                placeholder="000.000.000-00"
                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Data de Nascimento</label>
              <input
                type="date"
                value={formData.birthDate || ''}
                onChange={(e) => setFormData({ ...formData, birthDate: e.target.value })}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              />
            </div>
          </div>
        );
      }

      if (currentStep === 2) {
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                value={formData.email || ''}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="email@exemplo.com"
                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Telefone</label>
              <input
                type="tel"
                value={formData.phone || ''}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="(00) 00000-0000"
                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Endereço</label>
              <textarea
                value={formData.address || ''}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Rua, número, bairro, cidade"
                rows={3}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none"
              />
            </div>
          </div>
        );
      }

      if (currentStep === 3) {
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Tipo de Associado</label>
              <select
                value={formData.type || 'Titular'}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              >
                <option value="Titular">Titular</option>
                <option value="Dependente">Dependente</option>
                <option value="Colaborador">Colaborador</option>
              </select>
            </div>

            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div>
                <p className="font-medium">Ativar cadastro</p>
                <p className="text-sm text-muted-foreground">Associado poderá acessar o sistema</p>
              </div>
              <Switch
                checked={formData.status === 'active'}
                onCheckedChange={(checked) => setFormData({ ...formData, status: checked ? 'active' : 'inactive' })}
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div>
                <p className="font-medium">Receber notificações</p>
                <p className="text-sm text-muted-foreground">Enviar emails sobre eventos e novidades</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div>
                <p className="font-medium">Acesso ao aplicativo</p>
                <p className="text-sm text-muted-foreground">Permitir login no app móvel</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        );
      }
    }

    if (entityType === 'eventos') {
      if (currentStep === 1) {
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Nome do Evento</label>
              <input
                type="text"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Digite o nome do evento"
                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Tipo de Evento</label>
              <select
                value={formData.type || 'Evento Social'}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              >
                <option value="Evento Social">Evento Social</option>
                <option value="Assembleia">Assembleia</option>
                <option value="Reunião">Reunião</option>
                <option value="Esportivo">Esportivo</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Descrição</label>
              <textarea
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Descreva o evento"
                rows={4}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none"
              />
            </div>
          </div>
        );
      }

      if (currentStep === 2) {
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Data do Evento</label>
              <input
                type="date"
                value={formData.date || ''}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Horário</label>
              <input
                type="time"
                value={formData.time || ''}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Local</label>
              <input
                type="text"
                value={formData.location || ''}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="Endereço ou nome do local"
                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              />
            </div>
          </div>
        );
      }

      if (currentStep === 3) {
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div>
                <p className="font-medium">Evento ativo</p>
                <p className="text-sm text-muted-foreground">Tornar evento visível para associados</p>
              </div>
              <Switch
                checked={formData.status === 'active'}
                onCheckedChange={(checked) => setFormData({ ...formData, status: checked ? 'active' : 'inactive' })}
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div>
                <p className="font-medium">Permitir inscrições</p>
                <p className="text-sm text-muted-foreground">Associados podem se inscrever no evento</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Limite de participantes</label>
              <input
                type="number"
                value={formData.maxParticipants || ''}
                onChange={(e) => setFormData({ ...formData, maxParticipants: e.target.value })}
                placeholder="0 = sem limite"
                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              />
            </div>
          </div>
        );
      }
    }

    if (entityType === 'categorias') {
      if (currentStep === 1) {
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Nome da Categoria</label>
              <input
                type="text"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Digite o nome da categoria"
                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Tipo</label>
              <select
                value={formData.type || 'Receita'}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              >
                <option value="Receita">Receita</option>
                <option value="Despesa">Despesa</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Descrição</label>
              <textarea
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Descreva a categoria"
                rows={3}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none"
              />
            </div>
          </div>
        );
      }

      if (currentStep === 2) {
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div>
                <p className="font-medium">Categoria ativa</p>
                <p className="text-sm text-muted-foreground">Disponível para uso</p>
              </div>
              <Switch
                checked={formData.status === 'active'}
                onCheckedChange={(checked) => setFormData({ ...formData, status: checked ? 'active' : 'inactive' })}
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div>
                <p className="font-medium">Exibir em relatórios</p>
                <p className="text-sm text-muted-foreground">Incluir categoria nos relatórios financeiros</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        );
      }
    }

    return null;
  };

  const steps = getSteps();

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = () => {
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-xl border border-border max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-border flex items-center justify-between sticky top-0 bg-card z-10">
          <div>
            <h3 className="text-xl font-semibold">Novo Cadastro</h3>
            <p className="text-sm text-muted-foreground">{steps[currentStep - 1]?.description}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between mb-2">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center flex-1">
                <div className={`flex flex-col items-center ${index < steps.length - 1 ? 'flex-1' : ''}`}>
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                      currentStep > step.id
                        ? 'bg-green-500 text-white'
                        : currentStep === step.id
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {currentStep > step.id ? <Check className="w-5 h-5" /> : step.id}
                  </div>
                  <span className="text-xs mt-2 text-center font-medium">{step.title}</span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-0.5 flex-1 mx-2 ${
                      currentStep > step.id ? 'bg-green-500' : 'bg-muted'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="p-6">
          {renderStepContent()}
        </div>

        <div className="p-6 border-t border-border flex justify-between sticky bottom-0 bg-card">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </button>

          {currentStep < steps.length ? (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              Próximo
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Check className="w-4 h-4" />
              Concluir
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
