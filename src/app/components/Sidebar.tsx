import { Users, BarChart3, ChevronLeft, ChevronRight, Package, Wallet } from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ItargetMark } from './ItargetMark';
import { ItargetLogo } from './ItargetLogo';
import { Button } from './ui/button';

interface SidebarProps {
  onLogout: () => void;
}

export function Sidebar({ onLogout }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const collapse = () => {
    setIsCollapsed(true);
  };

  const navLinkClass = (isActive: boolean) =>
    `w-full flex items-center rounded-lg transition-colors ${
      isCollapsed ? 'justify-center py-3 px-0' : 'gap-3 px-3 py-3'
    } ${isActive ? 'bg-primary text-primary-foreground' : 'hover:bg-accent text-foreground'}`;

  const labelClass = `text-sm font-medium whitespace-nowrap transition-[opacity,max-width] duration-150 ease-in-out overflow-hidden ${
    isCollapsed ? 'opacity-0 max-w-0' : 'opacity-100 max-w-[200px]'
  }`;

  return (
    <aside
      style={{ width: isCollapsed ? 60 : 288 }}
      className="relative flex flex-col bg-card border-r border-border transition-[width] duration-300 ease-in-out flex-shrink-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header */}
      <div className={`border-b border-border flex-shrink-0 flex items-center h-[68px] transition-all duration-300 ${isCollapsed ? 'justify-center px-3' : 'px-5'}`}>
        {isCollapsed ? (
          <ItargetMark size={32} />
        ) : (
          <div className="flex flex-col gap-0.5 overflow-hidden">
            <ItargetLogo height={30} />
            <span className="text-[9px] text-muted-foreground tracking-[0.2em] uppercase leading-none pl-0.5 mt-0.5">Hub</span>
          </div>
        )}
      </div>

      {/* Nav zone */}
      <div className="flex-1 relative min-h-0">
        <Button
          variant="outline"
          size="icon"
          onClick={() => isCollapsed ? setIsCollapsed(false) : collapse()}
          title={isCollapsed ? 'Expandir menu' : 'Recolher menu'}
          style={{ right: -10 }}
          className={`absolute top-1/2 -translate-y-1/2 z-30 w-5 h-5 rounded-full
            shadow-md
            text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary
            transition-all duration-200
            ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none'}`}
        >
          {isCollapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
        </Button>

        <nav className={`h-full overflow-y-auto overflow-x-hidden space-y-0.5 transition-all duration-300 ${isCollapsed ? 'p-2' : 'p-3'}`}>
          <NavLink to="/hub/dashboard" title={isCollapsed ? 'Dashboard' : undefined}
            className={({ isActive }) => navLinkClass(isActive)}>
            <BarChart3 className="w-[18px] h-[18px] flex-shrink-0" />
            <span className={labelClass}>Dashboard</span>
          </NavLink>

          <NavLink to="/hub/modulos" title={isCollapsed ? 'Departamentos' : undefined}
            className={({ isActive }) => navLinkClass(isActive)}>
            <Package className="w-[18px] h-[18px] flex-shrink-0" />
            <span className={labelClass}>Departamentos</span>
          </NavLink>

          <NavLink to="/modulo/configuracoes/usuarios-acesso" title={isCollapsed ? 'Usuários e Acesso' : undefined}
            className={({ isActive }) => navLinkClass(isActive)}>
            <Users className="w-[18px] h-[18px] flex-shrink-0" />
            <span className={labelClass}>Usuários e Acesso</span>
          </NavLink>

          <NavLink to="/modulo/configuracoes/meios-pagamento" title={isCollapsed ? 'Meios de Pagamento' : undefined}
            className={({ isActive }) => navLinkClass(isActive)}>
            <Wallet className="w-[18px] h-[18px] flex-shrink-0" />
            <span className={labelClass}>Meios de Pagamento</span>
          </NavLink>
        </nav>
      </div>

    </aside>
  );
}
