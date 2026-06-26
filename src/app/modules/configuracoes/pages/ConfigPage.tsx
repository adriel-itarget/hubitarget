import { LucideIcon } from 'lucide-react';

interface ConfigPageProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color?: string;
}

export function ConfigPage({ title, description, icon: Icon, color = 'currentColor' }: ConfigPageProps) {
  return (
    <div className="px-8 py-8 max-w-7xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${color}15`, border: `1px solid ${color}30` }}
        >
          <Icon className="w-6 h-6" style={{ color }} />
        </div>
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-muted-foreground text-sm">{description}</p>
        </div>
      </div>
      <div className="bg-card border border-border rounded-xl p-12 text-center">
        <Icon className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
        <p className="text-muted-foreground">Esta página está em desenvolvimento.</p>
      </div>
    </div>
  );
}
