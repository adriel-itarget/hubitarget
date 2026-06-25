import { CreditCard, Calendar, CheckCircle2, AlertCircle, X } from 'lucide-react';
import { useState } from 'react';

const subscriptions = [
  {
    id: 1,
    name: 'Gestão de Membros',
    status: 'active',
    price: 'R$ 99/mês',
    nextBilling: '15/07/2026',
    features: ['Até 500 associados', 'Suporte prioritário', 'Relatórios avançados'],
  },
  {
    id: 2,
    name: 'Portal Financeiro',
    status: 'active',
    price: 'R$ 149/mês',
    nextBilling: '22/07/2026',
    features: ['Contas a pagar/receber', 'Análise de ROI', 'Integração bancária'],
  },
  {
    id: 3,
    name: 'Analytics Avançado',
    status: 'trial',
    price: 'R$ 129/mês',
    nextBilling: '10/07/2026',
    features: ['Dashboards personalizados', '14 dias de teste', 'Exportação de dados'],
  },
];

export function Subscriptions() {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [managingSubscription, setManagingSubscription] = useState<number | null>(null);

  const handleManage = (subId: number) => {
    setManagingSubscription(subId);
  };

  const handleCancel = (subId: number, subName: string) => {
    if (confirm(`Tem certeza que deseja cancelar a assinatura de "${subName}"?`)) {
      alert('Assinatura cancelada com sucesso. O acesso permanecerá ativo até o fim do período pago.');
    }
  };

  const handleChangePayment = () => {
    setShowPaymentModal(true);
  };

  const handleSavePayment = () => {
    alert('Método de pagamento atualizado com sucesso!');
    setShowPaymentModal(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="px-8 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl mb-2">Minhas Assinaturas</h1>
            <p className="text-muted-foreground">
              Gerencie seus recursos ativos e histórico de pagamentos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                </div>
                <span className="text-sm text-muted-foreground">Assinaturas Ativas</span>
              </div>
              <p className="text-3xl font-semibold">2</p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-orange-500" />
                </div>
                <span className="text-sm text-muted-foreground">Em Teste</span>
              </div>
              <p className="text-3xl font-semibold">1</p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground">Total Mensal</span>
              </div>
              <p className="text-3xl font-semibold">R$ 377</p>
            </div>
          </div>

          <div className="space-y-4">
            {subscriptions.map((sub) => (
              <div
                key={sub.id}
                className="bg-card border border-border rounded-xl p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold">{sub.name}</h3>
                      {sub.status === 'active' ? (
                        <span className="px-2 py-1 text-xs rounded-full bg-green-500/10 text-green-600 font-medium">
                          Ativo
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-xs rounded-full bg-orange-500/10 text-orange-600 font-medium">
                          Teste
                        </span>
                      )}
                    </div>
                    <p className="text-2xl font-semibold text-primary mb-1">{sub.price}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>Próxima cobrança: {sub.nextBilling}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleManage(sub.id)}
                      className="px-4 py-2 text-sm border border-border rounded-lg hover:bg-accent transition-colors"
                    >
                      Gerenciar
                    </button>
                    <button
                      onClick={() => handleCancel(sub.id, sub.name)}
                      className="px-4 py-2 text-sm text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>

                <div className="border-t border-border pt-4">
                  <p className="text-sm font-medium mb-3">Recursos incluídos:</p>
                  <ul className="space-y-2">
                    {sub.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-xl p-6 border border-primary/20">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold mb-2">Método de Pagamento</h3>
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">•••• •••• •••• 4532</span>
                  <span className="text-xs px-2 py-1 rounded bg-card">Visa</span>
                </div>
              </div>
              <button
                onClick={handleChangePayment}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Alterar
              </button>
            </div>
          </div>
        </div>
      </div>

      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-xl max-w-md w-full">
            <div className="border-b border-border px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Alterar Método de Pagamento</h2>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="p-2 hover:bg-accent rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Número do Cartão</label>
                  <input
                    type="text"
                    placeholder="0000 0000 0000 0000"
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Validade</label>
                    <input
                      type="text"
                      placeholder="MM/AA"
                      className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">CVV</label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Nome no Cartão</label>
                  <input
                    type="text"
                    placeholder="Como está no cartão"
                    className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowPaymentModal(false)}
                  className="flex-1 px-4 py-2 border border-border rounded-lg hover:bg-accent transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSavePayment}
                  className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Salvar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {managingSubscription && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-xl max-w-md w-full">
            <div className="border-b border-border px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Gerenciar Assinatura</h2>
              <button
                onClick={() => setManagingSubscription(null)}
                className="p-2 hover:bg-accent rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              <p className="text-sm text-muted-foreground mb-6">
                Gerencie sua assinatura de {subscriptions.find(s => s.id === managingSubscription)?.name}
              </p>

              <div className="space-y-3">
                <button className="w-full px-4 py-3 text-left border border-border rounded-lg hover:bg-accent transition-colors">
                  Alterar Plano
                </button>
                <button className="w-full px-4 py-3 text-left border border-border rounded-lg hover:bg-accent transition-colors">
                  Ver Histórico de Pagamentos
                </button>
                <button className="w-full px-4 py-3 text-left border border-border rounded-lg hover:bg-accent transition-colors">
                  Baixar Nota Fiscal
                </button>
              </div>

              <button
                onClick={() => setManagingSubscription(null)}
                className="w-full mt-6 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
