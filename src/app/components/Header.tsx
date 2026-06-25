import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  onLogin: () => void;
}

export function Header({ onLogin }: HeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-3">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="32" height="32" rx="8" fill="#0F172A"/>
              <path d="M10 12h4v8h-4v-8zm8 0h4v8h-4v-8z" fill="#60A5FA"/>
            </svg>
            <span className="text-xl text-gray-900" style={{ fontWeight: 600 }}>
              iTARGET
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-10">
            <a href="#produtos" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Produtos
            </a>
            <a href="#sobre" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Sobre
            </a>
            <a href="#recursos" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Recursos
            </a>
          </nav>

          <button
            onClick={() => navigate('/login')}
            className="px-6 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-colors"
          >
            Agendar demo
          </button>
        </div>
      </div>
    </header>
  );
}
