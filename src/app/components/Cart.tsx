import { X, Minus, Plus, ShoppingCart } from 'lucide-react';
import { useState } from 'react';

interface CartItem {
  moduleId: number;
  moduleName: string;
  packageType: 'basic' | 'pro' | 'enterprise';
  price: number;
  subModules: string[];
}

interface CartProps {
  items: CartItem[];
  onRemove: (moduleId: number) => void;
  onCheckout: () => void;
  onClose: () => void;
  onToggleSubModule: (moduleId: number, subModule: string) => void;
}

export function Cart({ items, onRemove, onCheckout, onClose, onToggleSubModule }: CartProps) {
  const total = items.reduce((sum, item) => sum + item.price, 0);

  if (items.length === 0) {
    return (
      <div className="fixed inset-y-0 right-0 w-96 bg-card border-l border-border shadow-xl z-50 flex flex-col">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h3>Carrinho</h3>
          <button onClick={onClose} className="p-2 hover:bg-accent rounded-lg transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <ShoppingCart className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-40" />
            <p className="text-sm text-muted-foreground">Seu carrinho está vazio</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-y-0 right-0 w-96 bg-card border-l border-border shadow-xl z-50 flex flex-col">
      <div className="p-6 border-b border-border flex items-center justify-between">
        <h3>Carrinho</h3>
        <button onClick={onClose} className="p-2 hover:bg-accent rounded-lg transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-3">
        {items.map((item) => (
          <div key={item.moduleId} className="bg-muted/50 rounded-lg p-4 border border-border">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h4 className="mb-1">{item.moduleName}</h4>
                <p className="text-xs text-muted-foreground capitalize">Plano {item.packageType}</p>
              </div>
              <button
                onClick={() => onRemove(item.moduleId)}
                className="p-1 hover:bg-destructive/10 text-destructive rounded transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="mb-3">
              <p className="text-xs text-muted-foreground mb-2">Funcionalidades Incluídas:</p>
              <div className="space-y-1">
                {item.subModules.slice(0, 3).map((sub, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <span>{sub}</span>
                  </div>
                ))}
                {item.subModules.length > 3 && (
                  <p className="text-xs text-muted-foreground">+{item.subModules.length - 3} funcionalidades</p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-border">
              <span className="font-semibold">R$ {item.price}</span>
              <button className="text-xs text-primary hover:underline">Customizar</button>
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 border-t border-border bg-muted/30">
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-muted-foreground">Subtotal</span>
            <span>R$ {total}</span>
          </div>
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-muted-foreground">Desconto</span>
            <span className="text-primary">-R$ 0</span>
          </div>
          <div className="flex items-center justify-between pt-3 border-t border-border">
            <span className="font-semibold">Total mensal</span>
            <span className="text-xl font-semibold">R$ {total}</span>
          </div>
        </div>

        <button
          onClick={onCheckout}
          className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
        >
          Finalizar Assinatura
        </button>
        <p className="text-xs text-center text-muted-foreground mt-3">Cancele a qualquer momento</p>
      </div>
    </div>
  );
}
