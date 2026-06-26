import { useState, useMemo, useEffect } from 'react';
import { ChevronDown, Search, Check, Pin } from 'lucide-react';
import { COST_CENTERS, CostCenter } from './costCentersMock';

const STORAGE_KEY = 'hubitarget_financeiro_default_cost_center';
export const COST_CENTER_CHANGE_EVENT = 'hubitarget_cost_center_changed';

export function getDefaultCostCenter(): CostCenter | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    const parsed = JSON.parse(stored);
    return COST_CENTERS.find(cc => cc.id === parsed.id) || null;
  } catch {
    return null;
  }
}

function persistDefault(cc: CostCenter | null) {
  if (cc) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cc));
  } else {
    localStorage.removeItem(STORAGE_KEY);
  }
  window.dispatchEvent(new CustomEvent(COST_CENTER_CHANGE_EVENT, { detail: { costCenter: cc } }));
}

export function useCostCenter() {
  const [costCenter, setCostCenter] = useState<CostCenter | null>(getDefaultCostCenter);

  useEffect(() => {
    const handler = (e: CustomEvent) => setCostCenter(e.detail.costCenter);
    window.addEventListener(COST_CENTER_CHANGE_EVENT, handler as EventListener);
    return () => window.removeEventListener(COST_CENTER_CHANGE_EVENT, handler as EventListener);
  }, []);

  return costCenter;
}

export function CostCenterSelect() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<CostCenter | null>(getDefaultCostCenter);
  const [defaultPin, setDefaultPin] = useState<CostCenter | null>(getDefaultCostCenter);

  const grouped = useMemo(() => {
    const s = search.toLowerCase();
    const filtered = COST_CENTERS.filter(cc => !s || cc.name.toLowerCase().includes(s));
    const groups: Record<string, CostCenter[]> = {};
    filtered.forEach(cc => {
      if (!groups[cc.category]) groups[cc.category] = [];
      groups[cc.category].push(cc);
    });
    return groups;
  }, [search]);

  const handleSelect = (cc: CostCenter) => {
    setSelected(cc);
    setIsOpen(false);
    setSearch('');
  };

  const handleSetDefault = (e: React.MouseEvent, cc: CostCenter) => {
    e.stopPropagation();
    setDefaultPin(cc);
    persistDefault(cc);
  };

  const handleRemoveDefault = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDefaultPin(null);
    persistDefault(null);
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelected(null);
    setIsOpen(false);
    setSearch('');
  };

  const isDefault = (id: string) => defaultPin?.id === id;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-left"
      >
        <div className="min-w-0 flex-1">
          <p className="text-[11px] text-muted-foreground uppercase tracking-wider leading-none mb-1">Centro de Custo</p>
          <p className="text-sm font-medium leading-snug">
            {selected ? selected.name : 'Todos (padrão)'}
          </p>
        </div>
        <ChevronDown className={`w-4 h-4 text-muted-foreground flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => { setIsOpen(false); setSearch(''); }} />
          <div className="absolute left-0 top-full mt-1 z-50 bg-card border border-border rounded-xl shadow-lg overflow-hidden min-w-[19rem]">
            <div className="p-2 border-b border-border">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Buscar centro de custo..."
                  className="w-full h-8 pl-8 pr-3 text-sm bg-muted/50 rounded-lg border-0 focus:outline-none focus:ring-1 focus:ring-ring"
                  autoFocus
                />
              </div>
            </div>

            <div className="overflow-y-auto" style={{ maxHeight: '14rem' }}>
              <div className="p-1">
                {selected && (
                  <button
                    onClick={handleClear}
                    className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-sm text-muted-foreground hover:bg-accent transition-colors"
                  >
                    <span className="w-5 h-5 rounded-full bg-muted flex items-center justify-center text-[10px]">✦</span>
                    <span>Todos (padrão)</span>
                  </button>
                )}

                {Object.entries(grouped).map(([category, items]) => (
                  <div key={category}>
                    <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider px-2.5 pt-2 pb-1">{category}</p>
                    {items.map(cc => (
                      <button
                        key={cc.id}
                        onClick={() => handleSelect(cc)}
                        className="w-full text-left px-2.5 py-1.5 rounded-lg text-sm hover:bg-accent transition-colors group"
                      >
                        <div className="flex items-center gap-2">
                          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] flex-shrink-0 ${
                            selected?.id === cc.id ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                          }`}>
                            {selected?.id === cc.id && <Check className="w-3 h-3" />}
                          </span>
                          <span className="leading-snug">{cc.name}</span>
                        </div>
                        <div className="pl-7 mt-0.5 flex items-center gap-1.5">
                          {isDefault(cc.id) && (
                            <Pin className="w-3 h-3 text-primary fill-primary" />
                          )}
                          <span
                            onClick={(e) => isDefault(cc.id) ? handleRemoveDefault(e) : handleSetDefault(e, cc)}
                            className={`opacity-0 group-hover:opacity-100 text-[11px] px-1.5 py-0.5 rounded transition-all cursor-pointer ${
                              isDefault(cc.id)
                                ? 'text-orange-600 hover:text-orange-700 bg-orange-500/10 hover:bg-orange-500/20'
                                : 'text-muted-foreground hover:text-primary bg-muted/50 hover:bg-primary/10'
                            }`}
                          >
                            {isDefault(cc.id) ? 'Remover padrão' : 'Definir padrão'}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                ))}

                {Object.keys(grouped).length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">Nenhum centro de custo encontrado</p>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
