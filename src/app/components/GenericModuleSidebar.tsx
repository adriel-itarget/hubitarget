import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight, LucideIcon } from 'lucide-react';

export interface NavItem {
  to: string;
  label: string;
  icon: LucideIcon;
}

interface GenericModuleSidebarProps {
  title: string;
  subtitle?: string;
  subtitleContent?: React.ReactNode;
  headerIcon: LucideIcon;
  navItems: NavItem[];
  onLogout: () => void;
}

export function GenericModuleSidebar({
  title,
  subtitle,
  subtitleContent,
  headerIcon: HeaderIcon,
  navItems,
  onLogout,
}: GenericModuleSidebarProps) {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

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
      <div className={`border-b border-border flex-shrink-0 transition-all duration-300 ${isCollapsed ? 'p-3 flex justify-center items-center' : 'p-5'}`}>
        {isCollapsed ? (
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <HeaderIcon className="w-4 h-4 text-primary" />
          </div>
        ) : (
          <>
            <button
              onClick={() => navigate('/hub/modulos')}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-3 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 flex-shrink-0" />
              <span className="text-sm whitespace-nowrap">Voltar ao Hub</span>
            </button>
            <h2 className="tracking-tight whitespace-nowrap">{title}</h2>
            {subtitleContent ? (
              <div className="mt-1.5">{subtitleContent}</div>
            ) : subtitle ? (
              <p className="text-sm text-muted-foreground mt-0.5 whitespace-nowrap">{subtitle}</p>
            ) : null}
          </>
        )}
      </div>

      <div className="flex-1 relative min-h-0">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          title={isCollapsed ? 'Expandir menu' : 'Recolher menu'}
          style={{ right: -10 }}
          className={`absolute top-1/2 -translate-y-1/2 z-30 w-5 h-5 rounded-full
            bg-card border border-border shadow-md
            flex items-center justify-center
            text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary
            transition-all duration-200
            ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none'}`}
        >
          {isCollapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
        </button>

        <nav className={`h-full overflow-y-auto overflow-x-hidden space-y-0.5 transition-all duration-300 ${isCollapsed ? 'p-2' : 'p-3'}`}>
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} title={isCollapsed ? label : undefined}
              className={({ isActive }) => navLinkClass(isActive)}>
              <Icon className="w-[18px] h-[18px] flex-shrink-0" />
              <span className={labelClass}>{label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

    </aside>
  );
}
