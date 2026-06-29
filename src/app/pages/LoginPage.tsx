import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { ItargetLogo } from '../components/ItargetLogo';
import { ItargetMark } from '../components/ItargetMark';

interface LoginPageProps {
  onLogin: () => void;
}

const DEMO_EMAIL = 'carlos.silva@sbcardio.org.br';
const DEMO_PASSWORD = 'Demo@2024';

type Theme = 'dark' | 'slate' | 'light' | 'slate-light';

const THEMES: Record<Theme, {
  bg: string;
  blob1: string;
  blob2: string;
  gridColor: string;
  textColor: string;
  subtextColor: string;
  featureDot: string;
  featureText: string;
  footerColor: string;
  markOpacity: number;
  accentColor: string;
}> = {
  dark: {
    bg: 'linear-gradient(135deg, #0d354e 0%, #0a2840 40%, #062030 100%)',
    blob1: 'radial-gradient(circle, #00b2cc, transparent)',
    blob2: 'radial-gradient(circle, #008dab, transparent)',
    gridColor: '#00b2cc',
    textColor: '#ffffff',
    subtextColor: 'rgba(147,197,253,0.7)',
    featureDot: '#00b2cc',
    featureText: 'rgba(191,219,254,0.7)',
    footerColor: 'rgba(147,197,253,0.3)',
    markOpacity: 1,
    accentColor: '#00b2cc',
  },
  slate: {
    bg: 'linear-gradient(135deg, #1e293b 0%, #334155 40%, #475569 100%)',
    blob1: 'radial-gradient(circle, #94a3b8, transparent)',
    blob2: 'radial-gradient(circle, #64748b, transparent)',
    gridColor: '#94a3b8',
    textColor: '#f8fafc',
    subtextColor: 'rgba(226,232,240,0.8)',
    featureDot: '#cbd5e1',
    featureText: 'rgba(226,232,240,0.7)',
    footerColor: 'rgba(148,163,184,0.4)',
    markOpacity: 1,
    accentColor: '#94a3b8',
  },
  light: {
    bg: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 40%, #d1fae5 100%)',
    blob1: 'radial-gradient(circle, #34d399, transparent)',
    blob2: 'radial-gradient(circle, #10b981, transparent)',
    gridColor: '#34d399',
    textColor: '#064e3b',
    subtextColor: 'rgba(6,78,59,0.7)',
    featureDot: '#10b981',
    featureText: 'rgba(6,78,59,0.6)',
    footerColor: 'rgba(6,78,59,0.3)',
    markOpacity: 0.8,
    accentColor: '#10b981',
  },
  'slate-light': {
    bg: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 40%, #e2e8f0 100%)',
    blob1: 'radial-gradient(circle, #94a3b8, transparent)',
    blob2: 'radial-gradient(circle, #64748b, transparent)',
    gridColor: '#94a3b8',
    textColor: '#0f172a',
    subtextColor: 'rgba(15,23,42,0.6)',
    featureDot: '#64748b',
    featureText: 'rgba(15,23,42,0.55)',
    footerColor: 'rgba(15,23,42,0.3)',
    markOpacity: 0.85,
    accentColor: '#475569',
  },
};

const FEATURES = [
  'Gestão de associados e anuidades',
  'Eventos, cursos e certificações',
  'Financeiro integrado a todos os departamentos',
];

export function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState(DEMO_EMAIL);
  const [password, setPassword] = useState(DEMO_PASSWORD);
  const [error, setError] = useState('');
  const [theme, setTheme] = useState<Theme>('dark');
  const navigate = useNavigate();

  const t = THEMES[theme];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
      localStorage.setItem('currentUser', JSON.stringify({
        name: 'Dr. Carlos Eduardo Silva',
        email: DEMO_EMAIL,
        entityName: 'Sociedade Brasileira de Cardiologia',
      }));
      onLogin();
    } else {
      setError('E-mail ou senha incorretos.');
    }
  };

  const isLight = theme === 'light' || theme === 'slate-light';
  const logoWhite = !isLight;

  return (
    <div className="min-h-screen flex">

      {/* ── Left panel — brand ── */}
      <div
        className="hidden lg:flex flex-col justify-between w-[54%] relative overflow-hidden p-12 transition-colors duration-700"
        style={{ background: t.bg }}
      >
        {/* Decorative blobs */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-10"
          style={{ background: t.blob1 }} />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full opacity-8"
          style={{ background: t.blob2, transform: 'translate(40%, 40%)' }} />

        {/* Grid pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="lgrid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke={t.gridColor} strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#lgrid)" />
        </svg>

        {/* Logo — top */}
        <div className="relative z-10">
          <ItargetLogo height={38} white={logoWhite} />
        </div>

        {/* Center content */}
        <div className="relative z-10">
          {/* Animated mark */}
          <div className="relative w-28 h-28 mb-10">
            <div className="absolute inset-0 rounded-full opacity-20 animate-ping"
              style={{ background: t.blob1, animationDuration: '3s' }} />
            <div className="absolute inset-2 rounded-full opacity-30 animate-ping"
              style={{ background: t.blob2, animationDuration: '3s', animationDelay: '1.5s' }} />
            <div className="relative z-10 w-28 h-28 flex items-center justify-center" style={{ opacity: t.markOpacity }}>
              <ItargetMark size={112} />
            </div>
          </div>

          <h2 className="text-4xl mb-3" style={{ color: t.textColor, lineHeight: 1.2, fontWeight: 600 }}>
            Gestão inteligente<br />
            <span style={{ color: t.accentColor }}>para sua entidade</span>
          </h2>
          <p className="text-base leading-relaxed max-w-sm" style={{ color: t.subtextColor }}>
            Plataforma completa para associações, sociedades médicas e entidades de classe.
          </p>

          <div className="mt-8 space-y-3">
            {FEATURES.map(f => (
              <div key={f} className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: t.featureDot }} />
                <span className="text-sm" style={{ color: t.featureText }}>{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer + theme switcher */}
        <div className="relative z-10 flex items-center justify-between">
          <p className="text-xs flex items-center gap-3" style={{ color: t.footerColor }}>
            <span>© 2026 Itarget · Todos os direitos reservados</span>
            <Link to="/design-system"
              className="hover:opacity-80 transition-colors underline underline-offset-2"
              style={{ color: t.footerColor }}>
              Design System
            </Link>
          </p>

          {/* Theme switcher */}
          <div className="flex items-center gap-2">
            {(['dark', 'slate', 'light', 'slate-light'] as Theme[]).map((v) => (
              <button
                key={v}
                onClick={() => setTheme(v)}
                title={v === 'dark' ? 'Azul Escuro' : v === 'slate' ? 'Slate' : v === 'light' ? 'Claro' : 'Slate Claro'}
                className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                  theme === v ? 'scale-125 border-white/60' : 'border-white/20 hover:border-white/40'
                }`}
                style={{
                  background: v === 'dark' ? '#0d354e' : v === 'slate' ? '#475569' : v === 'light' ? '#d1fae5' : '#e2e8f0',
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── Right panel — form ── */}
      <div className="flex-1 flex flex-col items-center justify-center bg-background p-8">

        {/* Mobile logo */}
        <div className="lg:hidden mb-10 flex flex-col items-center gap-1">
          <ItargetLogo height={36} />
          <span className="text-[10px] text-muted-foreground tracking-widest uppercase">Hub</span>
        </div>

        <div className="w-full max-w-sm">
          <div className="mb-8">
            <h1 className="text-2xl mb-1.5" style={{ fontWeight: 600 }}>Bem-vindo de volta</h1>
            <p className="text-muted-foreground text-sm">Entre com suas credenciais para acessar o Hub.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">E-mail</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={e => { setEmail(e.target.value); setError(''); }}
                  className="w-full pl-10 pr-4 py-2.5 border border-border rounded-xl text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  placeholder="seu@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Senha</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="password"
                  value={password}
                  onChange={e => { setPassword(e.target.value); setError(''); }}
                  className="w-full pl-10 pr-4 py-2.5 border border-border rounded-xl text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {error && (
              <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg border border-red-100">{error}</p>
            )}

            <button
              type="submit"
              className="w-full py-2.5 text-white rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98]"
              style={{ background: 'linear-gradient(135deg, #0d354e, #008dab)' }}
            >
              Entrar na plataforma
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-border">
            <p className="text-xs text-muted-foreground text-center mb-2.5">Credenciais de demonstração</p>
            <div className="bg-muted/50 rounded-xl px-4 py-3 text-xs text-muted-foreground space-y-1 border border-border">
              <div><span className="font-medium text-foreground">E-mail:</span> {DEMO_EMAIL}</div>
              <div><span className="font-medium text-foreground">Senha:</span> {DEMO_PASSWORD}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
