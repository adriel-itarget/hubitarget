import { useState, useRef, useEffect } from 'react';
import { Users, DollarSign, Calendar, BookOpen, Gift, ClipboardList, ArrowRight, ExternalLink, ChevronDown, Check, Building2, FileText, FlaskConical, Store, Megaphone, UserCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ItargetMark } from './ItargetMark';

const allModules = [
  {
    id: 1,
    moduleKey: 'associacao',
    name: 'Associação',
    description: 'Gestão completa de membros, associados e carteirinhas digitais.',
    icon: Users,
    iconColor: 'text-blue-400',
    accentColor: 'blue' as const,
    route: '/modulo/associacao/dashboard',
  },
  {
    id: 2,
    moduleKey: 'financeiro',
    name: 'Financeiro',
    description: 'Controle de receitas, despesas, cobranças e relatórios financeiros.',
    icon: DollarSign,
    iconColor: 'text-emerald-400',
    accentColor: 'emerald' as const,
    route: '/modulo/financeiro/dashboard',
  },
  {
    id: 3,
    moduleKey: 'exames',
    name: 'Exames',
    description: 'Gerenciamento de exames, avaliações e certificações profissionais.',
    icon: ClipboardList,
    iconColor: 'text-orange-400',
    accentColor: 'orange' as const,
    route: '/modulo/exames/dashboard',
  },
  {
    id: 4,
    moduleKey: 'cursos',
    name: 'Cursos/EAD',
    description: 'Gestão de atividades educacionais, banco de questões e ensino à distância.',
    icon: BookOpen,
    iconColor: 'text-violet-400',
    accentColor: 'violet' as const,
    route: '/modulo/cursos/dashboard',
  },
  {
    id: 5,
    moduleKey: 'servicos-residencias',
    name: 'Serviços e Residências',
    description: 'Controle de serviços médicos, residências e programas de especialização.',
    icon: Building2,
    iconColor: 'text-teal-400',
    accentColor: 'teal' as const,
  },
  {
    id: 6,
    moduleKey: 'inscricoes',
    name: 'Inscrições',
    description: 'Gerenciamento de inscrições para eventos, cursos e atividades.',
    icon: UserCheck,
    iconColor: 'text-pink-400',
    accentColor: 'pink' as const,
  },
  {
    id: 7,
    moduleKey: 'trabalhos-cientificos',
    name: 'Trabalhos Científicos',
    description: 'Submissão, avaliação e publicação de trabalhos e artigos científicos.',
    icon: FileText,
    iconColor: 'text-amber-400',
    accentColor: 'amber' as const,
  },
  {
    id: 8,
    moduleKey: 'programacao-cientifica',
    name: 'Programação Científica',
    description: 'Montagem de grade de programação, palestras e sessões científicas.',
    icon: FlaskConical,
    iconColor: 'text-cyan-400',
    accentColor: 'cyan' as const,
  },
  {
    id: 9,
    moduleKey: 'feira-comercial',
    name: 'Feira Comercial',
    description: 'Gestão de expositores, estandes e patrocinadores dos eventos.',
    icon: Store,
    iconColor: 'text-red-400',
    accentColor: 'red' as const,
  },
  {
    id: 10,
    moduleKey: 'marketing',
    name: 'Marketing',
    description: 'Gerencie seu aplicativo, sites ou envie newsletter.',
    icon: Megaphone,
    iconColor: 'text-rose-400',
    accentColor: 'rose' as const,
  },
];

type AccentColor = 'blue' | 'emerald' | 'orange' | 'violet' | 'teal' | 'pink' | 'amber' | 'cyan' | 'red' | 'rose';

const AC: Record<AccentColor, { bg: string; border: string; text: string; glow: string; grad: string }> = {
  blue:    { bg: 'bg-blue-500/8',    border: 'border-blue-500/20',    text: 'text-blue-500',    glow: 'rgba(59,130,246,0.15)',  grad: 'from-blue-500/10 to-blue-500/3' },
  emerald: { bg: 'bg-emerald-500/8', border: 'border-emerald-500/20', text: 'text-emerald-500', glow: 'rgba(16,185,129,0.15)',  grad: 'from-emerald-500/10 to-emerald-500/3' },
  orange:  { bg: 'bg-orange-500/8',  border: 'border-orange-500/20',  text: 'text-orange-500',  glow: 'rgba(249,115,22,0.15)',  grad: 'from-orange-500/10 to-orange-500/3' },
  violet:  { bg: 'bg-violet-500/8',  border: 'border-violet-500/20',  text: 'text-violet-500',  glow: 'rgba(139,92,246,0.15)',  grad: 'from-violet-500/10 to-violet-500/3' },
  teal:    { bg: 'bg-teal-500/8',    border: 'border-teal-500/20',    text: 'text-teal-500',    glow: 'rgba(20,184,166,0.15)',  grad: 'from-teal-500/10 to-teal-500/3' },
  pink:    { bg: 'bg-pink-500/8',    border: 'border-pink-500/20',    text: 'text-pink-500',    glow: 'rgba(236,72,153,0.15)',  grad: 'from-pink-500/10 to-pink-500/3' },
  amber:   { bg: 'bg-amber-500/8',   border: 'border-amber-500/20',   text: 'text-amber-500',   glow: 'rgba(245,158,11,0.15)',  grad: 'from-amber-500/10 to-amber-500/3' },
  cyan:    { bg: 'bg-cyan-500/8',    border: 'border-cyan-500/20',    text: 'text-cyan-500',    glow: 'rgba(6,182,212,0.15)',   grad: 'from-cyan-500/10 to-cyan-500/3' },
  red:     { bg: 'bg-red-500/8',     border: 'border-red-500/20',     text: 'text-red-500',     glow: 'rgba(239,68,68,0.15)',   grad: 'from-red-500/10 to-red-500/3' },
  rose:    { bg: 'bg-rose-500/8',    border: 'border-rose-500/20',    text: 'text-rose-500',    glow: 'rgba(244,63,94,0.15)',   grad: 'from-rose-500/10 to-rose-500/3' },
};

type ViewMode = 'grid' | 'list' | 'compact' | 'vitrine' | 'launcher' | 'bento' | 'orbital';

/* ── Preview SVGs ── */
const PreviewGrid = () => (
  <svg width="28" height="20" viewBox="0 0 28 20" fill="none">
    {[0,1,2].map(i => [0,1].map(j => (
      <rect key={`${i}-${j}`} x={i*10} y={j*10} width="8" height="8" rx="1.5" fill="currentColor" opacity={0.65} />
    )))}
  </svg>
);
const PreviewList = () => (
  <svg width="28" height="20" viewBox="0 0 28 20" fill="none">
    {[0,1,2,3].map(i => (
      <g key={i}>
        <circle cx="3" cy={i*5+2} r="2" fill="currentColor" opacity={0.65} />
        <rect x="8" y={i*5+0.5} width="18" height="3" rx="1" fill="currentColor" opacity={0.35} />
      </g>
    ))}
  </svg>
);
const PreviewCompact = () => (
  <svg width="28" height="20" viewBox="0 0 28 20" fill="none">
    {[0,1,2,3,4].map(i => (
      <g key={i}>
        <rect x="0" y={i*4} width="4" height="3" rx="0.5" fill="currentColor" opacity={0.55} />
        <rect x="6" y={i*4+0.5} width="22" height="2" rx="0.5" fill="currentColor" opacity={0.28} />
      </g>
    ))}
  </svg>
);
const PreviewVitrine = () => (
  <svg width="28" height="20" viewBox="0 0 28 20" fill="none">
    {[0,1].map(i => (
      <g key={i}>
        <rect x={i*15} y="0" width="12" height="19" rx="2" fill="currentColor" opacity={0.1} />
        <rect x={i*15} y="0" width="3" height="19" rx="2" fill="currentColor" opacity={0.5} />
        <rect x={i*15+5} y="5" width="6" height="2" rx="0.5" fill="currentColor" opacity={0.5} />
        <rect x={i*15+5} y="9" width="4" height="1.5" rx="0.5" fill="currentColor" opacity={0.3} />
      </g>
    ))}
  </svg>
);
const PreviewLauncher = () => (
  <svg width="28" height="20" viewBox="0 0 28 20" fill="none">
    {[0,1,2].map(i => [0,1].map(j => (
      <g key={`${i}-${j}`}>
        <circle cx={i*10+5} cy={j*10+4} r="4" fill="currentColor" opacity={0.45} />
        <rect x={i*10+1} y={j*10+9} width="8" height="1.5" rx="0.75" fill="currentColor" opacity={0.28} />
      </g>
    )))}
  </svg>
);
const PreviewBento = () => (
  <svg width="28" height="20" viewBox="0 0 28 20" fill="none">
    <rect x="0" y="0" width="17" height="13" rx="1.5" fill="currentColor" opacity={0.55} />
    <rect x="19" y="0" width="9" height="6" rx="1.5" fill="currentColor" opacity={0.35} />
    <rect x="19" y="8" width="9" height="5" rx="1.5" fill="currentColor" opacity={0.35} />
    <rect x="0" y="15" width="8" height="5" rx="1.5" fill="currentColor" opacity={0.35} />
    <rect x="10" y="15" width="8" height="5" rx="1.5" fill="currentColor" opacity={0.35} />
    <rect x="20" y="15" width="8" height="5" rx="1.5" fill="currentColor" opacity={0.35} />
  </svg>
);
const PreviewOrbital = () => {
  const cx = 14, cy = 10, r = 7.5;
  return (
    <svg width="28" height="20" viewBox="0 0 28 20" fill="none">
      <circle cx={cx} cy={cy} r={r} stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" opacity={0.4} fill="none" />
      <circle cx={cx} cy={cy} r="2.5" fill="currentColor" opacity={0.7} />
      {[0,1,2,3,4,5].map(i => {
        const a = (i * 60 - 90) * Math.PI / 180;
        return <circle key={i} cx={cx + r * Math.cos(a)} cy={cy + r * Math.sin(a)} r="1.5" fill="currentColor" opacity={0.45} />;
      })}
    </svg>
  );
};

const styleOptions: { id: ViewMode; label: string; Preview: React.FC }[] = [
  { id: 'grid',     label: 'Grade',    Preview: PreviewGrid },
  { id: 'list',     label: 'Lista',    Preview: PreviewList },
  { id: 'compact',  label: 'Compacto', Preview: PreviewCompact },
  { id: 'vitrine',  label: 'Vitrine',  Preview: PreviewVitrine },
  { id: 'launcher', label: 'Lançador', Preview: PreviewLauncher },
  { id: 'bento',    label: 'Bento',    Preview: PreviewBento },
  { id: 'orbital',  label: 'Orbital',  Preview: PreviewOrbital },
];

/* ── Layout dropdown component ── */
function LayoutDropdown({ viewMode, onChange }: { viewMode: ViewMode; onChange: (v: ViewMode) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = styleOptions.find(o => o.id === viewMode)!;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    if (open) document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  return (
    <div ref={ref} className="relative flex-shrink-0">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-2.5 px-4 py-2.5 bg-card border border-border rounded-xl shadow-sm hover:bg-accent transition-colors text-sm font-medium"
      >
        <span className="text-muted-foreground">
          <current.Preview />
        </span>
        <span>{current.label}</span>
        <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 z-50 bg-card border border-border rounded-xl shadow-2xl overflow-hidden w-52">
          <div className="p-1.5">
            {styleOptions.map(({ id, label, Preview }) => (
              <button
                key={id}
                onClick={() => { onChange(id); setOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  viewMode === id ? 'bg-primary/10 text-primary' : 'hover:bg-accent text-foreground'
                }`}
              >
                <span className={viewMode === id ? 'text-primary' : 'text-muted-foreground'}>
                  <Preview />
                </span>
                <span className="flex-1 text-left">{label}</span>
                {viewMode === id && <Check className="w-3.5 h-3.5 text-primary flex-shrink-0" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const STORAGE_KEY = 'hubitarget_default_module';

export function MyModules() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [orbitalHover, setOrbitalHover] = useState<number | null>(null);
  const [defaultModule, setDefaultModule] = useState<string | null>(() => {
    try { return localStorage.getItem(STORAGE_KEY); } catch { return null; }
  });

  const handleSetDefault = (moduleKey: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newValue = defaultModule === moduleKey ? null : moduleKey;
    setDefaultModule(newValue);
    try {
      if (newValue) {
        localStorage.setItem(STORAGE_KEY, newValue);
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch {}
  };

  const getModuleName = (id: string) => allModules.find(m => m.moduleKey === id)?.name || '';
  const visibleModules = allModules.filter(m => !m.hidden);

  /* ── Grid ── */
  const renderGrid = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {visibleModules.map((mod) => {
        const Icon = mod.icon;
        const ac = AC[mod.accentColor];
        const isDefault = defaultModule === mod.moduleKey;
        return (
          <div key={mod.id} onClick={() => navigate(mod.route)}
            className={`group bg-card/80 backdrop-blur-sm border rounded-2xl p-6 hover:shadow-md transition-all cursor-pointer flex flex-col gap-4 ${
              isDefault ? 'border-primary/40 shadow-sm' : 'border-border hover:border-primary/20'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className={`w-11 h-11 rounded-xl ${ac.bg} flex items-center justify-center`}>
                <Icon className={`w-5 h-5 ${mod.iconColor}`} />
              </div>
              <button
                onClick={(e) => handleSetDefault(mod.moduleKey, e)}
                title={isDefault ? 'Acesso padrão ativo — clique para desabilitar' : 'Definir como acesso padrão'}
                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                  isDefault ? 'bg-primary' : 'bg-muted-foreground/30'
                }`}
              >
                <span className={`inline-block h-3.5 w-3.5 rounded-full bg-white shadow-sm transition-transform ${
                  isDefault ? 'translate-x-4.5' : 'translate-x-0.5'
                }`} />
              </button>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold mb-1.5 group-hover:text-primary transition-colors">{mod.name}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{mod.description}</p>
            </div>
            <div className="flex items-center justify-end pt-3 border-t border-border">
              <span className="flex items-center gap-1 text-sm text-card-foreground group-hover:gap-2 transition-all">
                Acessar <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );

  /* ── List ── */
  const renderList = () => (
    <div className="space-y-2">
      {visibleModules.map((mod) => {
        const Icon = mod.icon;
        const ac = AC[mod.accentColor];
        const isDefault = defaultModule === mod.moduleKey;
        return (
          <div key={mod.id} onClick={() => navigate(mod.route)}
            className={`group bg-card/80 backdrop-blur-sm border rounded-xl px-5 py-4 hover:shadow-sm transition-all cursor-pointer flex items-center gap-5 ${
              isDefault ? 'border-primary/40' : 'border-border hover:border-primary/20'
            }`}
          >
            <div className={`w-10 h-10 rounded-xl ${ac.bg} flex items-center justify-center flex-shrink-0`}>
              <Icon className={`w-5 h-5 ${mod.iconColor}`} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium group-hover:text-primary transition-colors">{mod.name}</h3>
              <p className="text-sm text-muted-foreground truncate mt-0.5">{mod.description}</p>
            </div>
            <button
              onClick={(e) => handleSetDefault(mod.moduleKey, e)}
              title={isDefault ? 'Acesso padrão ativo' : 'Definir como acesso padrão'}
              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors flex-shrink-0 ${
                isDefault ? 'bg-primary' : 'bg-muted-foreground/30'
              }`}
            >
              <span className={`inline-block h-3.5 w-3.5 rounded-full bg-white shadow-sm transition-transform ${
                isDefault ? 'translate-x-4.5' : 'translate-x-0.5'
              }`} />
            </button>
            <span className="flex items-center gap-1 text-sm text-card-foreground group-hover:gap-2 transition-all flex-shrink-0">
              Acessar <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        );
      })}
    </div>
  );

  /* ── Compact ── */
  const renderCompact = () => (
    <div className="bg-card/80 backdrop-blur-sm border border-border rounded-xl overflow-hidden">
      {visibleModules.map((mod, idx) => {
        const Icon = mod.icon;
        const ac = AC[mod.accentColor];
        return (
          <div key={mod.id} onClick={() => navigate(mod.route)}
            className={`group flex items-center gap-4 px-5 py-3 hover:bg-muted/40 transition-colors cursor-pointer ${idx < visibleModules.length - 1 ? 'border-b border-border' : ''}`}
          >
            <div className={`w-8 h-8 rounded-lg ${ac.bg} flex items-center justify-center flex-shrink-0`}>
              <Icon className={`w-4 h-4 ${mod.iconColor}`} />
            </div>
            <div className="flex-1 min-w-0 flex items-center gap-4">
              <span className="font-medium text-sm whitespace-nowrap">{mod.name}</span>
              <span className="text-xs text-muted-foreground truncate hidden md:block">{mod.description}</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
          </div>
        );
      })}
    </div>
  );

  /* ── Vitrine ── */
  const renderVitrine = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {visibleModules.map((mod) => {
        const Icon = mod.icon;
        const ac = AC[mod.accentColor];
        return (
          <div key={mod.id} onClick={() => navigate(mod.route)}
            className="group bg-card/80 backdrop-blur-sm border border-border rounded-2xl overflow-hidden hover:shadow-lg hover:border-primary/20 transition-all cursor-pointer flex"
          >
            <div className={`w-1.5 flex-shrink-0 bg-gradient-to-b ${ac.grad}`} />
            <div className="flex-1 p-6 flex items-center gap-5">
              <div className={`w-14 h-14 rounded-2xl ${ac.bg} border ${ac.border} flex items-center justify-center flex-shrink-0`}>
                <Icon className={`w-7 h-7 ${mod.iconColor}`} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">{mod.name}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{mod.description}</p>
              </div>
              <div className={`w-8 h-8 rounded-lg ${ac.bg} flex items-center justify-center flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity`}>
                <ArrowRight className={`w-4 h-4 ${ac.text}`} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );

  /* ── Launcher ── */
  const renderLauncher = () => (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
      {visibleModules.map((mod) => {
        const Icon = mod.icon;
        const ac = AC[mod.accentColor];
        return (
          <div key={mod.id} onClick={() => navigate(mod.route)}
            className="group flex flex-col items-center gap-3 p-5 rounded-2xl bg-card/80 backdrop-blur-sm border border-border hover:shadow-md hover:border-primary/20 hover:scale-105 transition-all cursor-pointer"
          >
            <div className={`w-14 h-14 rounded-2xl ${ac.bg} border ${ac.border} flex items-center justify-center`}>
              <Icon className={`w-7 h-7 ${mod.iconColor}`} />
            </div>
            <span className="text-xs font-medium text-center leading-tight group-hover:text-primary transition-colors">{mod.name}</span>
          </div>
        );
      })}
    </div>
  );

  /* ── Bento ── */
  const renderBento = () => {
    const [m1, m2, m3, m4, m5, m6] = visibleModules;
    return (
      <div
        className="grid gap-4"
        style={{ gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: 'repeat(3, 180px)' }}
      >
        {/* Hero card — col 1-2, row 1-2 */}
        {(() => {
          const Icon = m1.icon;
          const ac = AC[m1.accentColor];
          return (
            <div
              onClick={() => navigate(m1.route)}
              className={`group col-start-1 col-end-3 row-start-1 row-end-3 bg-gradient-to-br ${ac.grad} border ${ac.border} rounded-2xl p-7 cursor-pointer hover:shadow-xl transition-all relative overflow-hidden flex flex-col justify-between`}
              style={{ boxShadow: `0 0 40px ${AC[m1.accentColor].glow}` }}
            >
              {/* Background decoration */}
              <div className="absolute -right-8 -bottom-8 w-48 h-48 rounded-full opacity-20"
                style={{ background: `radial-gradient(circle, ${AC[m1.accentColor].glow.replace('0.15','0.6')}, transparent)` }} />
              <div className="absolute right-6 top-6 w-32 h-32 rounded-full opacity-10"
                style={{ background: `radial-gradient(circle, ${AC[m1.accentColor].glow.replace('0.15','0.8')}, transparent)` }} />

              <div className="relative z-10 flex items-start justify-between">
                <div className={`w-16 h-16 rounded-2xl ${ac.bg} border-2 ${ac.border} flex items-center justify-center backdrop-blur-sm`}>
                  <Icon className={`w-8 h-8 ${m1.iconColor}`} />
                </div>
              </div>

              <div className="relative z-10">
                <h3 className="text-2xl mb-2 group-hover:text-primary transition-colors">{m1.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">{m1.description}</p>
                <div className={`mt-5 inline-flex items-center gap-2 text-sm font-medium ${ac.text} group-hover:gap-3 transition-all`}>
                  Acessar departamento <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          );
        })()}

        {/* Right column: m2 (row 1) and m3 (row 2) */}
        {[m2, m3].map((mod, ri) => {
          const Icon = mod.icon;
          const ac = AC[mod.accentColor];
          return (
            <div
              key={mod.id}
              onClick={() => navigate(mod.route)}
              style={{ gridColumn: '3', gridRow: ri + 1 }}
              className={`group bg-card border ${ac.border} rounded-2xl p-5 cursor-pointer hover:shadow-md hover:bg-gradient-to-br ${ac.grad} transition-all flex flex-col justify-between`}
            >
              <div className="flex items-start justify-between">
                <div className={`w-11 h-11 rounded-xl ${ac.bg} flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${mod.iconColor}`} />
                </div>
                <ExternalLink className={`w-3.5 h-3.5 ${ac.text} opacity-0 group-hover:opacity-100 transition-opacity`} />
              </div>
              <div>
                <h3 className="font-semibold text-sm mb-1 group-hover:text-primary transition-colors">{mod.name}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{mod.description}</p>
              </div>
            </div>
          );
        })}

        {/* Bottom row: m4, m5, m6 */}
        {[m4, m5, m6].map((mod, ci) => {
          const Icon = mod.icon;
          const ac = AC[mod.accentColor];
          return (
            <div
              key={mod.id}
              onClick={() => navigate(mod.route)}
              style={{ gridColumn: ci + 1, gridRow: 3 }}
              className={`group bg-card border border-border rounded-2xl p-5 cursor-pointer hover:shadow-md hover:border-${mod.accentColor}-500/30 transition-all flex flex-col justify-between`}
            >
              <div className={`w-10 h-10 rounded-xl ${ac.bg} flex items-center justify-center`}>
                <Icon className={`w-5 h-5 ${mod.iconColor}`} />
              </div>
              <div>
                <h3 className="font-semibold text-sm mb-0.5 group-hover:text-primary transition-colors">{mod.name}</h3>
                <p className="text-xs text-muted-foreground line-clamp-1">{mod.description}</p>
                <span className={`mt-2 inline-flex items-center gap-1 text-xs ${ac.text}`}>
                  Acessar <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  /* ── Orbital ── */
  const W = 620, H = 540;
  const cx = W / 2, cy = H / 2;
  const radius = 210;

  const nodePositions = visibleModules.map((_, i) => {
    const angle = (i * 60 - 90) * Math.PI / 180;
    return { x: cx + radius * Math.cos(angle), y: cy + radius * Math.sin(angle) };
  });

  const getOrbitalCardStyle = (pos: { x: number; y: number }): React.CSSProperties => {
    const cardW = 200;
    if (pos.x > cx + 60) return { right: 68, top: '50%', transform: 'translateY(-50%)', width: cardW };
    if (pos.x < cx - 60) return { left: 68, top: '50%', transform: 'translateY(-50%)', width: cardW };
    if (pos.y < cy) return { left: '50%', transform: 'translateX(-50%)', top: 72, width: cardW };
    return { left: '50%', transform: 'translateX(-50%)', bottom: 72, width: cardW };
  };

  const renderOrbital = () => (
    <div className="flex justify-center overflow-x-auto py-4">
      <div className="relative flex-shrink-0" style={{ width: W, height: H }}>

        {/* SVG layer: rings + connection lines */}
        <svg className="absolute inset-0 pointer-events-none" width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
          {/* Outer decorative ring */}
          <circle cx={cx} cy={cy} r={radius + 28} fill="none" stroke="currentColor"
            strokeWidth="1" strokeDasharray="1 8" className="text-border" opacity={0.3} />
          {/* Main orbit ring */}
          <circle cx={cx} cy={cy} r={radius} fill="none" stroke="currentColor"
            strokeWidth="1" strokeDasharray="4 6" className="text-border" opacity={0.5} />
          {/* Inner decorative ring */}
          <circle cx={cx} cy={cy} r={80} fill="none" stroke="currentColor"
            strokeWidth="0.5" strokeDasharray="2 6" className="text-border" opacity={0.3} />

          {/* Connection lines */}
          {nodePositions.map((pos, i) => {
            const mod = visibleModules[i];
            const ac = AC[mod.accentColor];
            const isHov = orbitalHover === mod.id;
            return (
              <line key={mod.id}
                x1={cx} y1={cy} x2={pos.x} y2={pos.y}
                stroke={isHov ? 'currentColor' : 'currentColor'}
                className={isHov ? ac.text : 'text-border'}
                strokeWidth={isHov ? 1.5 : 1}
                strokeDasharray={isHov ? '0' : '5 5'}
                opacity={isHov ? 0.7 : 0.35}
                style={{ transition: 'all 0.3s ease' }}
              />
            );
          })}

          {/* Dot on line midpoints */}
          {nodePositions.map((pos, i) => (
            <circle key={`mid-${i}`}
              cx={(cx + pos.x) / 2} cy={(cy + pos.y) / 2}
              r="2" fill="currentColor" className="text-border" opacity={0.25} />
          ))}
        </svg>

        {/* Center hub */}
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: cx, top: cy }}
        >
          <div className="relative">
            {/* Pulse rings */}
            <div className="absolute inset-0 rounded-full animate-ping opacity-20"
              style={{ background: 'radial-gradient(circle, #008dab, transparent)', transform: 'scale(2)', animationDuration: '3s' }} />
            <div className="absolute inset-0 rounded-full animate-ping opacity-10"
              style={{ background: 'radial-gradient(circle, #008dab, transparent)', transform: 'scale(2.8)', animationDuration: '3s', animationDelay: '1.5s' }} />

            <div className="relative w-24 h-24 rounded-full bg-card border-2 border-border shadow-xl flex flex-col items-center justify-center gap-1 z-10">
              <ItargetMark size={42} />
            </div>
          </div>
        </div>

        {/* Module nodes */}
        {visibleModules.map((mod, i) => {
          const Icon = mod.icon;
          const pos = nodePositions[i];
          const ac = AC[mod.accentColor];
          const isHov = orbitalHover === mod.id;

          return (
            <div
              key={mod.id}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: pos.x, top: pos.y, zIndex: isHov ? 30 : 10 }}
              onMouseEnter={() => setOrbitalHover(mod.id)}
              onMouseLeave={() => setOrbitalHover(null)}
              onClick={() => navigate(mod.route)}
            >
              {/* Node */}
              <div className={`flex flex-col items-center gap-2 cursor-pointer transition-all duration-300 ${isHov ? 'scale-110' : 'scale-100'}`}>
                <div
                  className={`w-16 h-16 rounded-2xl ${ac.bg} border-2 ${ac.border} shadow-lg flex items-center justify-center transition-all duration-300`}
                  style={isHov ? { boxShadow: `0 0 24px ${ac.glow}, 0 4px 20px rgba(0,0,0,0.1)` } : {}}
                >
                  <Icon className={`w-7 h-7 ${mod.iconColor}`} />
                </div>
                <span
                  className={`text-xs font-medium whitespace-nowrap px-2.5 py-1 rounded-full border shadow-sm transition-all duration-300 ${
                    isHov ? `${ac.bg} ${ac.border} ${ac.text}` : 'bg-card border-border text-foreground'
                  }`}
                >
                  {mod.name}
                </span>
              </div>

              {/* Hover info card */}
              {isHov && (
                <div
                  className="absolute z-40 bg-card border border-border rounded-xl shadow-2xl p-4"
                  style={getOrbitalCardStyle(pos)}
                >
                  <div className="flex items-center gap-2.5 mb-2.5">
                    <div className={`w-8 h-8 rounded-lg ${ac.bg} flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-4 h-4 ${mod.iconColor}`} />
                    </div>
                    <h4 className="font-semibold text-sm">{mod.name}</h4>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-3">{mod.description}</p>
                  <button
                    className={`w-full py-1.5 rounded-lg text-xs font-medium ${ac.bg} ${ac.text} border ${ac.border} flex items-center justify-center gap-1.5 hover:opacity-80 transition-opacity`}
                  >
                    Acessar departamento <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (viewMode) {
      case 'grid':     return renderGrid();
      case 'list':     return renderList();
      case 'compact':  return renderCompact();
      case 'vitrine':  return renderVitrine();
      case 'launcher': return renderLauncher();
      case 'bento':    return renderBento();
      case 'orbital':  return renderOrbital();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-muted/40 to-background">
      <div className="px-8 py-8">
        <div className="max-w-7xl mx-auto">

          {/* Header with dropdown on right */}
          <div className="flex items-end justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl mb-1.5">Departamentos</h1>
              <p className="text-muted-foreground">Acesse os departamentos da plataforma Itarget</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">Layout:</span>
              <LayoutDropdown viewMode={viewMode} onChange={setViewMode} />
            </div>
          </div>

          {renderContent()}
        </div>
      </div>
    </div>
  );
}
