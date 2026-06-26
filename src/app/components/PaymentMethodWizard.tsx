import { X, Check, ArrowLeft, ArrowRight, Search } from 'lucide-react';
import { useState, useMemo } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { Switch } from './ui/switch';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { COST_CENTERS, COST_CENTER_CATEGORIES } from './costCentersMock';
import { PaymentLogo } from './PaymentLogos';

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

const STEPS = [
  { id: 1, title: 'Credenciais', description: 'Chaves de API, códigos de loja e ambiente' },
  { id: 2, title: 'Tipos de Pagamento', description: 'Selecione os métodos ativos' },
  { id: 3, title: 'Centros de Custo', description: 'Vincule a configuração aos centros de custo' },
];

function CredentialsStep({ method, formData, setFormData }: { method: PaymentMethod; formData: Record<string, string>; setFormData: (data: Record<string, string>) => void }) {
  const renderFields = () => {
    switch (method.id) {
      case 'bb':
        return (
          <>
            <div>
              <Label className="mb-2">Client ID</Label>
              <Input value={formData.clientId || ''} onChange={(e) => setFormData({ ...formData, clientId: e.target.value })} placeholder="Seu Client ID do Banco do Brasil" />
            </div>
            <div>
              <Label className="mb-2">Client Secret</Label>
              <Input type="password" value={formData.clientSecret || ''} onChange={(e) => setFormData({ ...formData, clientSecret: e.target.value })} placeholder="Seu Client Secret" />
            </div>
            <div>
              <Label className="mb-2">Developer Application Key</Label>
              <Input value={formData.developerAppKey || ''} onChange={(e) => setFormData({ ...formData, developerAppKey: e.target.value })} placeholder="Chave da aplicação developer" />
            </div>
          </>
        );
      case 'cielo':
        return (
          <>
            <div>
              <Label className="mb-2">MerchantID</Label>
              <Input value={formData.merchantId || ''} onChange={(e) => setFormData({ ...formData, merchantId: e.target.value })} placeholder="Seu MerchantID da Cielo" />
            </div>
            <div>
              <Label className="mb-2">MerchantKey</Label>
              <Input type="password" value={formData.merchantKey || ''} onChange={(e) => setFormData({ ...formData, merchantKey: e.target.value })} placeholder="Sua MerchantKey" />
            </div>
          </>
        );
      case 'rede':
        return (
          <>
            <div>
              <Label className="mb-2">PV (Número do Estabelecimento)</Label>
              <Input value={formData.pv || ''} onChange={(e) => setFormData({ ...formData, pv: e.target.value })} placeholder="Seu PV da Rede" />
            </div>
            <div>
              <Label className="mb-2">Token</Label>
              <Input type="password" value={formData.token || ''} onChange={(e) => setFormData({ ...formData, token: e.target.value })} placeholder="Seu Token de autenticação" />
            </div>
          </>
        );
      case 'vindi':
        return (
          <div>
            <Label className="mb-2">API Key</Label>
            <Input type="password" value={formData.apiKey || ''} onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })} placeholder="Sua API Key da Vindi" />
            <p className="text-xs text-muted-foreground mt-1">Encontre sua API Key em: Configurações → Chaves de API</p>
          </div>
        );
      case 'pagseguro':
        return (
          <>
            <div>
              <Label className="mb-2">Email da Conta</Label>
              <Input type="email" value={formData.email || ''} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="seu@email.com" />
            </div>
            <div>
              <Label className="mb-2">Token</Label>
              <Input type="password" value={formData.token || ''} onChange={(e) => setFormData({ ...formData, token: e.target.value })} placeholder="Seu Token do PagSeguro" />
            </div>
          </>
        );
      case 'pagarme':
        return (
          <>
            <div>
              <Label className="mb-2">API Key</Label>
              <Input type="password" value={formData.apiKey || ''} onChange={(e) => setFormData({ ...formData, apiKey: e.target.value })} placeholder="sk_test_..." />
            </div>
            <div>
              <Label className="mb-2">Encryption Key</Label>
              <Input type="password" value={formData.encryptionKey || ''} onChange={(e) => setFormData({ ...formData, encryptionKey: e.target.value })} placeholder="ek_test_..." />
            </div>
          </>
        );
    }
  };

  return (
    <div className="space-y-4">
      {renderFields()}
      <Separator className="my-4" />
      <div>
        <Label className="mb-2">Ambiente de Integração</Label>
        <Select value={formData.environment || 'sandbox'} onValueChange={(v) => setFormData({ ...formData, environment: v })}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sandbox">Sandbox (Testes)</SelectItem>
            <SelectItem value="production">Produção</SelectItem>
          </SelectContent>
        </Select>
        <p className="text-xs text-muted-foreground mt-1.5">
          {formData.environment === 'production'
            ? '⚠️ Produção — transações reais serão processadas'
            : 'Ambiente seguro para testes sem impacto financeiro'}
        </p>
      </div>
    </div>
  );
}

function PaymentTypesStep({ method, formData, setFormData }: { method: PaymentMethod; formData: Record<string, string>; setFormData: (data: Record<string, string>) => void }) {
  const methodTypes: Record<string, Array<{ id: string; label: string; description: string }>> = {
    bb: [
      { id: 'boleto', label: 'Boleto Bancário', description: 'Pagamentos via boleto com vencimento configurável' },
      { id: 'pix', label: 'PIX', description: 'Pagamentos instantâneos via PIX' },
    ],
    cielo: [
      { id: 'credit', label: 'Cartão de Crédito', description: 'Parcelamento em até 12x' },
      { id: 'debit', label: 'Cartão de Débito', description: 'Pagamento à vista no débito' },
    ],
    rede: [
      { id: 'credit', label: 'Cartão de Crédito', description: 'Processamento de crédito' },
      { id: 'debit', label: 'Cartão de Débito', description: 'Processamento de débito' },
    ],
    vindi: [
      { id: 'card', label: 'Cartão', description: 'Crédito e débito' },
      { id: 'boleto', label: 'Boleto', description: 'Boleto bancário recorrente' },
      { id: 'pix', label: 'PIX', description: 'Pagamento instantâneo' },
    ],
    pagseguro: [
      { id: 'card', label: 'Cartão', description: 'Crédito e débito' },
      { id: 'boleto', label: 'Boleto', description: 'Boleto bancário' },
      { id: 'pix', label: 'PIX', description: 'PIX instantâneo' },
    ],
    pagarme: [
      { id: 'card', label: 'Cartão', description: 'Crédito e débito' },
      { id: 'boleto', label: 'Boleto', description: 'Boleto bancário' },
      { id: 'pix', label: 'PIX', description: 'PIX instantâneo' },
    ],
  };

  const types = methodTypes[method.id] || [];

  const toggleType = (typeId: string) => {
    const current = (formData.activeTypes || '').split(',').filter(Boolean);
    const updated = current.includes(typeId) ? current.filter(t => t !== typeId) : [...current, typeId];
    setFormData({ ...formData, activeTypes: updated.join(',') });
  };

  const activeTypes = (formData.activeTypes || '').split(',').filter(Boolean);

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Selecione quais tipos de pagamento serão aceitos via {method.name}.
      </p>
      {types.map((type) => (
        <div key={type.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
          <div>
            <p className="font-medium">{type.label}</p>
            <p className="text-sm text-muted-foreground">{type.description}</p>
          </div>
          <Switch checked={activeTypes.includes(type.id)} onCheckedChange={() => toggleType(type.id)} />
        </div>
      ))}
      {method.id === 'bb' && activeTypes.includes('boleto') && (
        <div>
          <Label className="mb-2">Prazo de vencimento do boleto (dias)</Label>
          <Input type="number" value={formData.boletoDays || '3'} onChange={(e) => setFormData({ ...formData, boletoDays: e.target.value })} />
        </div>
      )}
      {method.id === 'cielo' && activeTypes.includes('credit') && (
        <div className="space-y-4">
          <div>
            <Label className="mb-2">Parcelamento Máximo</Label>
            <Select value={formData.maxInstallments || '12'} onValueChange={(v) => setFormData({ ...formData, maxInstallments: v })}>
              <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
              <SelectContent>
                {Array.from({ length: 12 }, (_, i) => i + 1).map(n => (
                  <SelectItem key={n} value={String(n)}>{n}x</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="mb-2">Valor mínimo de parcela</Label>
            <Input type="number" value={formData.minInstallmentValue || '50'} onChange={(e) => setFormData({ ...formData, minInstallmentValue: e.target.value })} placeholder="R$ 50,00" />
          </div>
        </div>
      )}
    </div>
  );
}

function CostCentersStep({ formData, setFormData }: { formData: Record<string, string>; setFormData: (data: Record<string, string>) => void }) {
  const [search, setSearch] = useState('');
  const selectedIds = (formData.costCenters || '').split(',').filter(Boolean);

  const filtered = useMemo(() => {
    const s = search.toLowerCase();
    return COST_CENTERS.filter(cc => !s || cc.name.toLowerCase().includes(s) || cc.category.toLowerCase().includes(s));
  }, [search]);

  const groupedByCategory = useMemo(() => {
    const groups: Record<string, typeof filtered> = {};
    filtered.forEach(cc => {
      if (!groups[cc.category]) groups[cc.category] = [];
      groups[cc.category].push(cc);
    });
    return groups;
  }, [filtered]);

  const toggleCC = (id: string) => {
    const updated = selectedIds.includes(id) ? selectedIds.filter(i => i !== id) : [...selectedIds, id];
    setFormData({ ...formData, costCenters: updated.join(',') });
  };

  const hasSelection = selectedIds.length > 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {hasSelection
            ? `${selectedIds.length} centro(s) de custo selecionado(s)`
            : 'Nenhum selecionado — será aplicado a todos (padrão)'}
        </p>
        {hasSelection && (
          <Button variant="ghost" size="sm" onClick={() => setFormData({ ...formData, costCenters: '' })}>
            Limpar seleção
          </Button>
        )}
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar centro de custo..." className="pl-9" />
      </div>

      <div className="space-y-4 max-h-80 overflow-y-auto">
        {Object.entries(groupedByCategory).map(([category, items]) => (
          <div key={category}>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 px-1">{category}</p>
            <div className="space-y-0.5">
              {items.map((cc) => (
                <div key={cc.id} className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-muted/50 transition-colors">
                  <p className="text-sm font-medium">{cc.name}</p>
                  <Switch checked={selectedIds.includes(cc.id)} onCheckedChange={() => toggleCC(cc.id)} />
                </div>
              ))}
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-6">Nenhum centro de custo encontrado</p>
        )}
      </div>

      {!hasSelection && (
        <div className="bg-muted/30 rounded-lg p-3 flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-primary" />
          <p className="text-xs text-muted-foreground">
            Sem seleção, esta configuração será aplicada como <strong>padrão para todos</strong> os centros de custo.
          </p>
        </div>
      )}
    </div>
  );
}

export function PaymentMethodWizard({ method, onClose }: WizardProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<Record<string, string>>({ environment: 'sandbox' });
  const [isConfigured, setIsConfigured] = useState(method.status === 'active');
  const [activeTab, setActiveTab] = useState('credentials');

  const handleNext = () => { if (currentStep < 3) setCurrentStep(currentStep + 1); };
  const handleBack = () => { if (currentStep > 1) setCurrentStep(currentStep - 1); };

  const handleFinish = () => {
    setIsConfigured(true);
    setActiveTab('credentials');
  };

  const handleSave = () => {
    alert('Alterações salvas com sucesso!');
    onClose();
  };

  const stepContent = (
    <div className="space-y-6">
      {currentStep === 1 && <CredentialsStep method={method} formData={formData} setFormData={setFormData} />}
      {currentStep === 2 && <PaymentTypesStep method={method} formData={formData} setFormData={setFormData} />}
      {currentStep === 3 && <CostCentersStep formData={formData} setFormData={setFormData} />}
    </div>
  );

  const tabContent = (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="p-6">
      <TabsList className="w-full">
        <TabsTrigger value="credentials" className="flex-1">Credenciais</TabsTrigger>
        <TabsTrigger value="types" className="flex-1">Tipos de Pagamento</TabsTrigger>
        <TabsTrigger value="cost-centers" className="flex-1">Centros de Custo</TabsTrigger>
        <TabsTrigger value="status" className="flex-1">Status</TabsTrigger>
      </TabsList>

      <TabsContent value="credentials" className="mt-6">
        <CredentialsStep method={method} formData={formData} setFormData={setFormData} />
      </TabsContent>

      <TabsContent value="types" className="mt-6">
        <PaymentTypesStep method={method} formData={formData} setFormData={setFormData} />
      </TabsContent>

      <TabsContent value="cost-centers" className="mt-6">
        <CostCentersStep formData={formData} setFormData={setFormData} />
      </TabsContent>

      <TabsContent value="status" className="mt-6">
        <div className="space-y-4">
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 flex gap-3">
            <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium mb-1">Método Ativo</p>
              <p className="text-sm text-muted-foreground">
                Este método de pagamento está ativo e pronto para processar transações.
              </p>
            </div>
          </div>

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
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tipos ativos:</span>
                <span className="font-medium">{(formData.activeTypes || 'Nenhum').split(',').filter(Boolean).length} tipo(s)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Centros de custo:</span>
                <span className="font-medium">{formData.costCenters ? `${formData.costCenters.split(',').length} vinculado(s)` : 'Padrão (todos)'}</span>
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
  );

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-xl border border-border max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-border flex items-center justify-between sticky top-0 bg-card z-10">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl ${method.color} flex items-center justify-center`}>
              <PaymentLogo methodId={method.id} className="w-12 h-12" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">{isConfigured ? method.name : `Configurar ${method.name}`}</h3>
              <p className="text-sm text-muted-foreground">
                {isConfigured ? method.description : STEPS[currentStep - 1]?.description}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Stepper (wizard mode only) */}
        {!isConfigured && (
          <div className="px-8 pt-6 pb-4 border-b border-border">
            <div className="flex items-center justify-center gap-0 max-w-lg mx-auto">
              {STEPS.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                        currentStep > step.id
                          ? 'bg-primary text-primary-foreground'
                          : currentStep === step.id
                          ? 'bg-primary text-primary-foreground ring-4 ring-primary/15'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {currentStep > step.id ? <Check className="w-4 h-4" /> : step.id}
                    </div>
                    <span className="text-xs mt-2 font-medium text-muted-foreground">{step.title}</span>
                  </div>
                  {index < STEPS.length - 1 && (
                    <div className={`w-12 h-0.5 mx-2 mb-5 ${currentStep > step.id ? 'bg-primary' : 'bg-border'}`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Content */}
        {isConfigured ? tabContent : <div className="p-6">{stepContent}</div>}

        {/* Footer */}
        <div className="p-6 border-t border-border flex justify-between sticky bottom-0 bg-card">
          {isConfigured ? (
            <>
              <Button variant="outline" onClick={onClose}>Cancelar</Button>
              <Button onClick={handleSave}>Salvar Alterações</Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={handleBack} disabled={currentStep === 1} className="gap-2">
                <ArrowLeft className="w-4 h-4" /> Voltar
              </Button>
              {currentStep < 3 ? (
                <Button onClick={handleNext} className="gap-2">
                  Próximo <ArrowRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button onClick={handleFinish} className="gap-2">
                  <Check className="w-4 h-4" /> Concluir
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
