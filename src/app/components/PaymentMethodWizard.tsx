import { X, Check, ArrowLeft, ArrowRight, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { Switch } from './ui/switch';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';

interface PaymentMethod {
  id: string;
  name: string;
  provider: string;
  types: string[];
  color: string;
  icon: string;
  status: 'active' | 'inactive';
  description: string;
}

interface WizardProps {
  method: PaymentMethod;
  onClose: () => void;
}

export function PaymentMethodWizard({ method, onClose }: WizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [activeTab, setActiveTab] = useState('credentials');

  const isConfigured = method.status === 'active';

  const getSteps = () => {
    switch (method.id) {
      case 'bb':
        return [
          { id: 1, title: 'Credenciais', description: 'Configure as credenciais de acesso' },
          { id: 2, title: 'Métodos', description: 'Selecione os métodos de pagamento' },
          { id: 3, title: 'Confirmação', description: 'Revise e confirme' }
        ];
      case 'cielo':
        return [
          { id: 1, title: 'Credenciais', description: 'MerchantID e MerchantKey' },
          { id: 2, title: 'Configurações', description: 'Opções de parcelamento' },
          { id: 3, title: 'Confirmação', description: 'Revise e confirme' }
        ];
      case 'rede':
        return [
          { id: 1, title: 'Credenciais', description: 'PV e Token' },
          { id: 2, title: 'Configurações', description: 'Ambiente e opções' },
          { id: 3, title: 'Confirmação', description: 'Revise e confirme' }
        ];
      case 'vindi':
        return [
          { id: 1, title: 'API Key', description: 'Chave de integração' },
          { id: 2, title: 'Planos', description: 'Configure planos e ciclos' },
          { id: 3, title: 'Confirmação', description: 'Revise e confirme' }
        ];
      case 'pagseguro':
        return [
          { id: 1, title: 'Credenciais', description: 'Email e Token' },
          { id: 2, title: 'Métodos', description: 'Selecione métodos aceitos' },
          { id: 3, title: 'Confirmação', description: 'Revise e confirme' }
        ];
      case 'pagarme':
        return [
          { id: 1, title: 'API Key', description: 'Chave de API' },
          { id: 2, title: 'Configurações', description: 'Webhook e opções' },
          { id: 3, title: 'Confirmação', description: 'Revise e confirme' }
        ];
      default:
        return [];
    }
  };

  const renderStepContent = () => {
    if (currentStep === 1) {
      switch (method.id) {
        case 'bb':
          return (
            <div className="space-y-4">
              <div>
                <Label className="mb-2">Client ID</Label>
                <Input
                  value={formData.clientId || ''}
                  onChange={(e) => setFormData({ ...formData, clientId: e.target.value })}
                  placeholder="Seu Client ID do Banco do Brasil"
                />
              </div>
              <div>
                <Label className="mb-2">Client Secret</Label>
                <Input
                  type="password"
                  value={formData.clientSecret || ''}
                  onChange={(e) => setFormData({ ...formData, clientSecret: e.target.value })}
                  placeholder="Seu Client Secret"
                />
              </div>
              <div>
                <Label className="mb-2">Developer Application Key</Label>
                <Input
                  value={formData.developerAppKey || ''}
                  onChange={(e) => setFormData({ ...formData, developerAppKey: e.target.value })}
                  placeholder="Chave da aplicação developer"
                />
              </div>
              <div>
                <Label className="mb-2">Ambiente</Label>
                <select
                  value={formData.environment || 'sandbox'}
                  onChange={(e) => setFormData({ ...formData, environment: e.target.value })}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                >
                  <option value="sandbox">Sandbox (Testes)</option>
                  <option value="production">Produção</option>
                </select>
              </div>
            </div>
          );

        case 'cielo':
          return (
            <div className="space-y-4">
              <div>
                <Label className="mb-2">MerchantID</Label>
                <Input
                  value={formData.merchantId || ''}
                  onChange={(e) => setFormData({ ...formData, merchantId: e.target.value })}
                  placeholder="Seu MerchantID da Cielo"
                />
              </div>
              <div>
                <Label className="mb-2">MerchantKey</Label>
                <Input
                  type="password"
                  value={formData.merchantKey || ''}
                  onChange={(e) => setFormData({ ...formData, merchantKey: e.target.value })}
                  placeholder="Sua MerchantKey"
                />
              </div>
              <div>
                <Label className="mb-2">Ambiente</Label>
                <select
                  value={formData.environment || 'sandbox'}
                  onChange={(e) => setFormData({ ...formData, environment: e.target.value })}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                >
                  <option value="sandbox">Sandbox (Testes)</option>
                  <option value="production">Produção</option>
                </select>
              </div>
            </div>
          );

        case 'rede':
          return (
            <div className="space-y-4">
              <div>
                <Label className="mb-2">PV (Número do Estabelecimento)</Label>
                <Input
                  value={formData.pv || ''}
                  onChange={(e) => setFormData({ ...formData, pv: e.target.value })}
                  placeholder="Seu PV da Rede"
                />
              </div>
              <div>
                <Label className="mb-2">Token</Label>
                <Input
                  type="password"
                  value={formData.token || ''}
                  onChange={(e) => setFormData({ ...formData, token: e.target.value })}
                  placeholder="Seu Token de autenticação"
                />
              </div>
              <div>
                <Label className="mb-2">Ambiente</Label>
                <select
                  value={formData.environment || 'sandbox'}
                  onChange={(e) => setFormData({ ...formData, environment: e.target.value })}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                >
                  <option value="sandbox">Sandbox (Testes)</option>
                  <option value="production">Produção</option>
                </select>
              </div>
            </div>
          );

        case 'vindi':
          return (
            <div className="space-y-4">
              <div>
                <Label className="mb-2">API Key</Label>
                <Input
                  type="password"
                  value={formData.apiKey || ''}
                  onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })}
                  placeholder="Sua API Key da Vindi"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Encontre sua API Key em: Configurações → Chaves de API
                </p>
              </div>
              <div>
                <Label className="mb-2">Ambiente</Label>
                <select
                  value={formData.environment || 'sandbox'}
                  onChange={(e) => setFormData({ ...formData, environment: e.target.value })}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                >
                  <option value="sandbox">Sandbox (Testes)</option>
                  <option value="production">Produção</option>
                </select>
              </div>
            </div>
          );

        case 'pagseguro':
          return (
            <div className="space-y-4">
              <div>
                <Label className="mb-2">Email da Conta</Label>
                <Input
                  type="email"
                  value={formData.email || ''}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="seu@email.com"
                />
              </div>
              <div>
                <Label className="mb-2">Token</Label>
                <Input
                  type="password"
                  value={formData.token || ''}
                  onChange={(e) => setFormData({ ...formData, token: e.target.value })}
                  placeholder="Seu Token do PagSeguro"
                />
              </div>
              <div>
                <Label className="mb-2">Ambiente</Label>
                <select
                  value={formData.environment || 'sandbox'}
                  onChange={(e) => setFormData({ ...formData, environment: e.target.value })}
                  className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                >
                  <option value="sandbox">Sandbox (Testes)</option>
                  <option value="production">Produção</option>
                </select>
              </div>
            </div>
          );

        case 'pagarme':
          return (
            <div className="space-y-4">
              <div>
                <Label className="mb-2">API Key</Label>
                <Input
                  type="password"
                  value={formData.apiKey || ''}
                  onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })}
                  placeholder="sk_test_..."
                />
              </div>
              <div>
                <Label className="mb-2">Encryption Key</Label>
                <Input
                  type="password"
                  value={formData.encryptionKey || ''}
                  onChange={(e) => setFormData({ ...formData, encryptionKey: e.target.value })}
                  placeholder="ek_test_..."
                />
              </div>
            </div>
          );
      }
    }

    if (currentStep === 2) {
      if (method.id === 'bb') {
        return (
          <div className="space-y-4">
            <h4 className="font-medium mb-4">Selecione os métodos que deseja ativar:</h4>
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div>
                <p className="font-medium">Boleto Bancário</p>
                <p className="text-sm text-muted-foreground">Pagamentos via boleto com vencimento configurável</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div>
                <p className="font-medium">PIX</p>
                <p className="text-sm text-muted-foreground">Pagamentos instantâneos via PIX</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="mt-4">
              <Label className="mb-2">Prazo de vencimento do boleto (dias)</Label>
              <Input
                type="number"
                value={formData.boletoDays || '3'}
                onChange={(e) => setFormData({ ...formData, boletoDays: e.target.value })}
              />
            </div>
          </div>
        );
      }

      if (method.id === 'cielo') {
        return (
          <div className="space-y-4">
            <div>
              <Label className="mb-2">Parcelamento Máximo</Label>
              <select
                value={formData.maxInstallments || '12'}
                onChange={(e) => setFormData({ ...formData, maxInstallments: e.target.value })}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map(n => (
                  <option key={n} value={n}>{n}x</option>
                ))}
              </select>
            </div>
            <div>
              <Label className="mb-2">Valor mínimo de parcela</Label>
              <Input
                type="number"
                value={formData.minInstallmentValue || '50'}
                onChange={(e) => setFormData({ ...formData, minInstallmentValue: e.target.value })}
                placeholder="R$ 50,00"
              />
            </div>
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <span className="text-sm font-medium">Capturar transação automaticamente</span>
              <Switch />
            </div>
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <span className="text-sm font-medium">Solicitar CVV nas transações</span>
              <Switch defaultChecked />
            </div>
          </div>
        );
      }

      return (
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">Configure as opções adicionais do método de pagamento.</p>
        </div>
      );
    }

    if (currentStep === 3) {
      return (
        <div className="space-y-6">
          <div className="bg-muted/30 rounded-lg p-4">
            <h4 className="font-medium mb-3">Resumo da Configuração</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Método:</span>
                <span className="font-medium">{method.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Ambiente:</span>
                <span className="font-medium">{formData.environment === 'sandbox' ? 'Sandbox (Testes)' : 'Produção'}</span>
              </div>
              {Object.keys(formData).filter(k => k !== 'environment').map(key => (
                <div key={key} className="flex justify-between">
                  <span className="text-muted-foreground">{key}:</span>
                  <span className="font-medium">{'•'.repeat(20)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 flex gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-yellow-900 dark:text-yellow-100 mb-1">Importante</p>
              <p className="text-yellow-800 dark:text-yellow-200">
                Certifique-se de que as credenciais estão corretas antes de ativar em produção.
                Teste sempre em ambiente de sandbox primeiro.
              </p>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  const steps = getSteps();
  const progress = (currentStep / steps.length) * 100;

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
    alert('Configuração salva com sucesso!');
    onClose();
  };

  const handleSave = () => {
    alert('Alterações salvas com sucesso!');
    onClose();
  };

  const renderCredentialsTab = () => {
    return renderStepContent();
  };

  const renderSettingsTab = () => {
    if (method.id === 'bb' || method.id === 'cielo') {
      if (method.id === 'bb') {
        return (
          <div className="space-y-4">
            <h4 className="font-medium mb-4">Selecione os métodos que deseja ativar:</h4>
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div>
                <p className="font-medium">Boleto Bancário</p>
                <p className="text-sm text-muted-foreground">Pagamentos via boleto com vencimento configurável</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div>
                <p className="font-medium">PIX</p>
                <p className="text-sm text-muted-foreground">Pagamentos instantâneos via PIX</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="mt-4">
              <Label className="mb-2">Prazo de vencimento do boleto (dias)</Label>
              <Input
                type="number"
                value={formData.boletoDays || '3'}
                onChange={(e) => setFormData({ ...formData, boletoDays: e.target.value })}
              />
            </div>
          </div>
        );
      }

      if (method.id === 'cielo') {
        return (
          <div className="space-y-4">
            <div>
              <Label className="mb-2">Parcelamento Máximo</Label>
              <select
                value={formData.maxInstallments || '12'}
                onChange={(e) => setFormData({ ...formData, maxInstallments: e.target.value })}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map(n => (
                  <option key={n} value={n}>{n}x</option>
                ))}
              </select>
            </div>
            <div>
              <Label className="mb-2">Valor mínimo de parcela</Label>
              <Input
                type="number"
                value={formData.minInstallmentValue || '50'}
                onChange={(e) => setFormData({ ...formData, minInstallmentValue: e.target.value })}
                placeholder="R$ 50,00"
              />
            </div>
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <span className="text-sm font-medium">Capturar transação automaticamente</span>
              <Switch />
            </div>
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <span className="text-sm font-medium">Solicitar CVV nas transações</span>
              <Switch defaultChecked />
            </div>
          </div>
        );
      }
    }

    return (
      <div className="space-y-4">
        <div>
          <Label className="mb-2">Webhook URL</Label>
          <Input
            value={formData.webhookUrl || ''}
            onChange={(e) => setFormData({ ...formData, webhookUrl: e.target.value })}
            placeholder="https://seu-site.com/webhook"
          />
          <p className="text-xs text-muted-foreground mt-1">
            URL para receber notificações de pagamento
          </p>
        </div>

        <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
          <div>
            <p className="font-medium">Modo de teste</p>
            <p className="text-sm text-muted-foreground">Usar ambiente sandbox</p>
          </div>
          <Switch defaultChecked={formData.environment === 'sandbox'} />
        </div>

        <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
          <div>
            <p className="font-medium">Auto-captura</p>
            <p className="text-sm text-muted-foreground">Capturar pagamentos automaticamente</p>
          </div>
          <Switch defaultChecked />
        </div>
      </div>
    );
  };

  // Se já está configurado, usa abas
  if (isConfigured) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <div className="bg-card rounded-xl border border-border max-w-3xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-border flex items-center justify-between sticky top-0 bg-card z-10">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl ${method.color} flex items-center justify-center text-2xl`}>
                {method.icon}
              </div>
              <div>
                <h3 className="text-xl font-semibold">{method.name}</h3>
                <p className="text-sm text-muted-foreground">{method.description}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="p-6">
            <TabsList className="w-full">
              <TabsTrigger value="credentials" className="flex-1">Credenciais</TabsTrigger>
              <TabsTrigger value="settings" className="flex-1">Configurações</TabsTrigger>
              <TabsTrigger value="status" className="flex-1">Status</TabsTrigger>
            </TabsList>

            <TabsContent value="credentials" className="mt-6">
              <div className="space-y-4">
                {renderCredentialsTab()}
              </div>
            </TabsContent>

            <TabsContent value="settings" className="mt-6">
              {renderSettingsTab()}
            </TabsContent>

            <TabsContent value="status" className="mt-6">
              <div className="space-y-6">
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 flex gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-green-900 dark:text-green-100 mb-1">Método Ativo</p>
                    <p className="text-sm text-green-800 dark:text-green-200">
                      Este método de pagamento está ativo e pronto para processar transações.
                    </p>
                  </div>
                </div>

                <div className="bg-muted/30 rounded-lg p-4">
                  <h4 className="font-medium mb-3">Informações da Integração</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Método:</span>
                      <span className="font-medium">{method.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Ambiente:</span>
                      <span className="font-medium">{formData.environment === 'sandbox' ? 'Sandbox (Testes)' : 'Produção'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status:</span>
                      <Badge variant="default" className="bg-green-500/10 text-green-600 border-green-500/30 hover:bg-green-500/10">Ativo</Badge>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div>
                    <p className="font-medium">Desativar método</p>
                    <p className="text-sm text-muted-foreground">Parar de aceitar pagamentos por este método</p>
                  </div>
                  <Button variant="destructive" size="sm">Desativar</Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="p-6 border-t border-border flex justify-end gap-3 sticky bottom-0 bg-card">
            <Button variant="outline" onClick={onClose}>Cancelar</Button>
            <Button onClick={handleSave}>Salvar Alterações</Button>
          </div>
        </div>
      </div>
    );
  }

  // Modo wizard para novos métodos
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-xl border border-border max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-border flex items-center justify-between sticky top-0 bg-card z-10">
          <div>
            <h3 className="text-xl font-semibold">Configurar {method.name}</h3>
            <p className="text-sm text-muted-foreground">{steps[currentStep - 1]?.description}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
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
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Button>

          {currentStep < steps.length ? (
            <Button onClick={handleNext} className="gap-2">
              Próximo
              <ArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button onClick={handleFinish} className="gap-2 bg-green-600 text-white hover:bg-green-700">
              <Check className="w-4 h-4" />
              Concluir
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
