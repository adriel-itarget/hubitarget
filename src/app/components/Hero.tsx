import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Hero() {
  const navigate = useNavigate();

  return (
    <div className="bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h1 className="mb-8 text-5xl lg:text-7xl text-slate-900 tracking-tight leading-tight" style={{ fontWeight: 600 }}>
              Ajudamos entidades médicas a alcançar o{' '}
              <span className="text-green-600">melhor desempenho</span>
            </h1>

            <p className="mb-10 text-xl text-gray-600 leading-relaxed">
              Plataforma completa que acompanha médicos em toda jornada profissional, da associação à educação continuada.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <button
                onClick={() => navigate('/login')}
                className="flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 text-white text-base font-medium rounded-xl hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl"
              >
                Começar agora
                <ArrowRight size={20} />
              </button>

              <button className="px-8 py-4 border-2 border-slate-200 text-slate-900 text-base font-medium rounded-xl hover:border-slate-300 hover:bg-slate-50 transition-colors">
                Ver demonstração
              </button>
            </div>

            <div className="flex items-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Implantação em 30 dias</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Suporte 24/7</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/3] bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=800&h=600&fit=crop"
                alt="Equipe médica em reunião"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}