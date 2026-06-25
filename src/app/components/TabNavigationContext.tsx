import { createContext, useContext, useState, ReactNode } from 'react';

interface Tab {
  id: string;
  title: string;
  path: string;
  module?: string;
  icon?: string;
}

interface TabNavigationContextType {
  tabs: Tab[];
  activeTabId: string | null;
  addTab: (tab: Tab) => void;
  removeTab: (id: string) => void;
  setActiveTab: (id: string) => void;
  clearTabs: () => void;
}

const TabNavigationContext = createContext<TabNavigationContextType | undefined>(undefined);

export function TabNavigationProvider({ children }: { children: ReactNode }) {
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [activeTabId, setActiveTabId] = useState<string | null>(null);

  const addTab = (tab: Tab) => {
    setTabs((prevTabs) => {
      const exists = prevTabs.find(t => t.id === tab.id);
      if (exists) {
        setActiveTabId(tab.id);
        return prevTabs;
      }
      const newTabs = [...prevTabs, tab];
      setActiveTabId(tab.id);
      return newTabs;
    });
  };

  const removeTab = (id: string) => {
    setTabs((prevTabs) => {
      const filtered = prevTabs.filter(t => t.id !== id);
      if (activeTabId === id && filtered.length > 0) {
        setActiveTabId(filtered[filtered.length - 1].id);
      } else if (filtered.length === 0) {
        setActiveTabId(null);
      }
      return filtered;
    });
  };

  const setActiveTab = (id: string) => {
    setActiveTabId(id);
  };

  const clearTabs = () => {
    setTabs([]);
    setActiveTabId(null);
  };

  return (
    <TabNavigationContext.Provider
      value={{
        tabs,
        activeTabId,
        addTab,
        removeTab,
        setActiveTab,
        clearTabs,
      }}
    >
      {children}
    </TabNavigationContext.Provider>
  );
}

export function useTabNavigation() {
  const context = useContext(TabNavigationContext);
  if (!context) {
    throw new Error('useTabNavigation must be used within TabNavigationProvider');
  }
  return context;
}
