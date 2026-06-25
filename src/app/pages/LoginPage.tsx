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

export function LoginPage({ onLogin }: LoginPageProps) {
  const [email, setEmail] = useState(DEMO_EMAIL);
  const [password, setPassword] = useState(DEMO_PASSWORD);
  const [error, setError] = useState('');
  const navigate = useNavigate();

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
      navigate('/hub/modulos');
    } else {
      setError('E-mail ou senha incorretos.');
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* ── Left panel — brand ── */}
      <div
        className="hidden lg:flex flex-col justify-between w-[54%] relative overflow-hidden p-12"
        style={{ background: 'linear-gradient(135deg, #0d354e 0%, #0a2840 40%, #062030 100%)' }}
      >
        {/* Decorative blobs */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #00b2cc, transparent)' }} />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full opacity-8"
          style={{ background: 'radial-gradient(circle, #008dab, transparent)', transform: 'translate(40%, 40%)' }} />

        {/* Grid pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="lgrid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#00b2cc" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#lgrid)" />
        </svg>

        {/* Logo — top */}
        <div className="relative z-10">
          <ItargetLogo height={38} white />
        </div>

        {/* Center content */}
        <div className="relative z-10">
          {/* Animated mark */}
          <div className="relative w-28 h-28 mb-10">
            <div className="absolute inset-0 rounded-full opacity-20 animate-ping"
              style={{ background: 'radial-gradient(circle, #00b2cc, transparent)', animationDuration: '3s' }} />
            <div className="absolute inset-2 rounded-full opacity-30 animate-ping"
              style={{ background: 'radial-gradient(circle, #008dab, transparent)', animationDuration: '3s', animationDelay: '1.5s' }} />
            <div className="relative z-10 w-28 h-28 flex items-center justify-center">
              <ItargetMark size={112} />
            </div>
          </div>

          <h2 className="text-4xl text-white mb-3" style={{ lineHeight: 1.2 }}>
            Gestão inteligente<br />
            <span style={{ color: '#00b2cc' }}>para sua entidade</span>
          </h2>
          <p className="text-blue-200/70 text-base leading-relaxed max-w-sm">
            Plataforma completa para associações, sociedades médicas e entidades de classe.
          </p>

          <div className="mt-8 space-y-3">
            {['Gestão de associados e anuidades', 'Eventos, cursos e certificações', 'Financeiro integrado a todos os módulos'].map(f => (
              <div key={f} className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: '#00b2cc' }} />
                <span className="text-blue-100/70 text-sm">{f}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-blue-200/30 text-xs relative z-10 flex items-center gap-3">
          <span>© 2026 Itarget · Todos os direitos reservados</span>
          <Link to="/design-system" className="text-blue-200/40 hover:text-blue-200/70 transition-colors underline underline-offset-2 decoration-blue-200/30">Design System</Link>
        </p>
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
