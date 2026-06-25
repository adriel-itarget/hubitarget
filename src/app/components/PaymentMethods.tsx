import { Plus, Check, Settings, CreditCard, Smartphone, Zap, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { PaymentMethodWizard } from './PaymentMethodWizard';

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
    color: 'bg-yellow-500',
    icon: '🏦',
    status: 'active',
    description: 'Pagamentos via boleto bancário e PIX'
  },
  {
    id: 'cielo',
    name: 'Cielo',
    provider: 'Cielo',
    types: ['Cartão de Crédito', 'Cartão de Débito'],
    color: 'bg-blue-500',
    icon: '💳',
    status: 'active',
    description: 'Processamento de cartões de crédito e débito'
  },
  {
    id: 'rede',
    name: 'Rede',
    provider: 'Rede',
    types: ['Cartão de Crédito', 'Cartão de Débito'],
    color: 'bg-red-500',
    icon: '💳',
    status: 'inactive',
    description: 'Adquirência de cartões de crédito e débito'
  },
  {
    id: 'vindi',
    name: 'Vindi',
    provider: 'Vindi',
    types: ['Cartão', 'Boleto', 'PIX'],
    color: 'bg-purple-500',
    icon: '⚡',
    status: 'inactive',
    description: 'Pagamentos recorrentes e múltiplos métodos'
  },
  {
    id: 'pagseguro',
    name: 'PagSeguro',
    provider: 'PagSeguro',
    types: ['Cartão', 'Boleto', 'PIX'],
    color: 'bg-green-500',
    icon: '🔒',
    status: 'inactive',
    description: 'Gateway completo com múltiplos métodos'
  },
  {
    id: 'pagarme',
    name: 'Pagar.me',
    provider: 'Pagar.me',
    types: ['Cartão', 'Boleto', 'PIX'],
    color: 'bg-indigo-500',
    icon: '💰',
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
                  <div
                    key={method.id}
                    className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all"
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className={`w-12 h-12 rounded-xl ${method.color} flex items-center justify-center text-2xl`}>
                          {method.icon}
                        </div>
                        <span className="text-xs px-3 py-1 rounded-full bg-green-500/10 text-green-600 font-medium flex items-center gap-1">
                          <Check className="w-3 h-3" />
                          Ativo
                        </span>
                      </div>

                      <div className="mb-4">
                        <h3 className="text-lg font-semibold mb-1">{method.name}</h3>
                        <p className="text-sm text-muted-foreground mb-3">
                          {method.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {method.types.map((type) => (
                            <span
                              key={type}
                              className="text-xs px-2 py-1 bg-muted rounded-full"
                            >
                              {type}
                            </span>
                          ))}
                        </div>
                      </div>

                      <button
                        onClick={() => handleConfigure(method)}
                        className="w-full flex items-center justify-center gap-2 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                      >
                        <Settings className="w-4 h-4" />
                        Configurar
                      </button>
                    </div>
                  </div>
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
                <div
                  key={method.id}
                  className="bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all"
                >
                  <div className="p-6 opacity-75">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl ${method.color} flex items-center justify-center text-2xl`}>
                        {method.icon}
                      </div>
                      <span className="text-xs px-3 py-1 rounded-full bg-muted text-muted-foreground">
                        Indisponível
                      </span>
                    </div>

                    <div className="mb-4">
                      <h3 className="text-lg font-semibold mb-1">{method.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {method.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {method.types.map((type) => (
                          <span
                            key={type}
                            className="text-xs px-2 py-1 bg-muted rounded-full"
                          >
                            {type}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => handleConfigure(method)}
                      className="w-full flex items-center justify-center gap-2 py-2 border border-border rounded-lg hover:bg-accent transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                      Ativar Método
                    </button>
                  </div>
                </div>
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
