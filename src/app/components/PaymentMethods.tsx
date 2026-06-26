import { Plus, Check, Settings, CreditCard } from 'lucide-react';
import { useState } from 'react';
import { PaymentMethodWizard } from './PaymentMethodWizard';
import { PaymentLogo } from './PaymentLogos';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';

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

const paymentMethods: PaymentMethod[] = [
  {
    id: 'bb',
    name: 'Banco do Brasil',
    provider: 'Banco do Brasil',
    types: ['Boleto', 'PIX'],
    color: 'bg-yellow-500/10',
    icon: 'bb',
    status: 'active',
    description: 'Pagamentos via boleto bancário e PIX'
  },
  {
    id: 'cielo',
    name: 'Cielo',
    provider: 'Cielo',
    types: ['Cartão de Crédito', 'Cartão de Débito'],
    color: 'bg-blue-500/10',
    icon: 'cielo',
    status: 'active',
    description: 'Processamento de cartões de crédito e débito'
  },
  {
    id: 'rede',
    name: 'Rede',
    provider: 'Rede',
    types: ['Cartão de Crédito', 'Cartão de Débito'],
    color: 'bg-red-500/10',
    icon: 'rede',
    status: 'inactive',
    description: 'Adquirência de cartões de crédito e débito'
  },
  {
    id: 'vindi',
    name: 'Vindi',
    provider: 'Vindi',
    types: ['Cartão', 'Boleto', 'PIX'],
    color: 'bg-purple-500/10',
    icon: 'vindi',
    status: 'inactive',
    description: 'Pagamentos recorrentes e múltiplos métodos'
  },
  {
    id: 'pagseguro',
    name: 'PagSeguro',
    provider: 'PagSeguro',
    types: ['Cartão', 'Boleto', 'PIX'],
    color: 'bg-emerald-500/10',
    icon: 'pagseguro',
    status: 'inactive',
    description: 'Gateway completo com múltiplos métodos'
  },
  {
    id: 'pagarme',
    name: 'Pagar.me',
    provider: 'Pagar.me',
    types: ['Cartão', 'Boleto', 'PIX'],
    color: 'bg-slate-500/10',
    icon: 'pagarme',
    status: 'inactive',
    description: 'Processamento de pagamentos online'
  }
];

export function PaymentMethods() {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [showWizard, setShowWizard] = useState(false);

  const activeM = paymentMethods.filter(m => m.status === 'active');
  const inactiveMethods = paymentMethods.filter(m => m.status === 'inactive');

  const handleConfigure = (method: PaymentMethod) => {
    setSelectedMethod(method);
    setShowWizard(true);
  };

  const handleCloseWizard = () => {
    setShowWizard(false);
    setSelectedMethod(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="px-4 md:px-8 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl mb-2">Meios de Pagamento</h1>
              <p className="text-muted-foreground">
                Configure os métodos de pagamento aceitos pela sua entidade
              </p>
            </div>
          </div>

          {activeM.length > 0 && (
            <div className="mb-12">
              <h2 className="text-lg font-semibold mb-4">Métodos Ativos</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeM.map((method) => (
                  <Card key={method.id} className="group hover:shadow-lg transition-all">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className={`w-12 h-12 rounded-xl ${method.color} flex items-center justify-center`}>
                          <PaymentLogo methodId={method.id} className="w-12 h-12" />
                        </div>
                        <Badge variant="outline" className="bg-green-500/10 text-green-600 border-green-500/30 hover:bg-green-500/10 gap-1">
                          <Check className="w-3 h-3" />
                          Ativo
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardTitle className="text-lg mb-1">{method.name}</CardTitle>
                      <CardDescription className="mb-3">{method.description}</CardDescription>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {method.types.map((type) => (
                          <Badge key={type} variant="secondary">{type}</Badge>
                        ))}
                      </div>
                      <Button className="w-full gap-2" onClick={() => handleConfigure(method)}>
                        <Settings className="w-4 h-4" />
                        Configurar
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          <div>
            <h2 className="text-lg font-semibold mb-4">Outros Métodos Disponíveis</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Ative novos métodos de pagamento para oferecer mais opções aos seus associados
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {inactiveMethods.map((method) => (
                <Card key={method.id} className="hover:border-primary/50 transition-all">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className={`w-12 h-12 rounded-xl ${method.color} flex items-center justify-center`}>
                        <PaymentLogo methodId={method.id} className="w-12 h-12" />
                      </div>
                      <Badge variant="secondary">Indisponível</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="opacity-75">
                    <CardTitle className="text-lg mb-1">{method.name}</CardTitle>
                    <CardDescription className="mb-3">{method.description}</CardDescription>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {method.types.map((type) => (
                        <Badge key={type} variant="secondary">{type}</Badge>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full gap-2" onClick={() => handleConfigure(method)}>
                      <Plus className="w-4 h-4" />
                      Ativar Método
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showWizard && selectedMethod && (
        <PaymentMethodWizard
          method={selectedMethod}
          onClose={handleCloseWizard}
        />
      )}
    </div>
  );
}
