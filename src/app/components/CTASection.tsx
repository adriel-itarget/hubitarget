import { ArrowRight, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function CTASection() {
  const navigate = useNavigate();
  return (
    <div className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-8">
        <div className="bg-gradient-to-br from-blue-50 to-white rounded-3xl border border-gray-100 overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-16 p-12 lg:p-16">
            <div>
              <h2 className="text-4xl lg:text-5xl text-slate-900 mb-6 tracking-tight" style={{ fontWeight: 600 }}>
                Pronto para transformar sua gestão?
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Agende uma demonstração personalizada e veja como podemos ajudar sua entidade a crescer.
              </p>

              <div className="space-y-4 mb-12">
                <div className="flex items-start gap-3">
                  <div className="mt-1 p-1 bg-blue-500 rounded-full">
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                  </div>
                  <div>
                    <div className="text-slate-900 font-medium mb-1">Implantação em 30 dias</div>
                    <div className="text-sm text-gray-600">Comece a usar rapidamente sem complicações</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 p-1 bg-blue-500 rounded-full">
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                  </div>
                  <div>
                    <div className="text-slate-900 font-medium mb-1">Suporte dedicado</div>
                    <div className="text-sm text-gray-600">Equipe especializada disponível sempre que precisar</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 p-1 bg-blue-500 rounded-full">
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                  </div>
                  <div>
                    <div className="text-slate-900 font-medium mb-1">Treinamento completo</div>
                    <div className="text-sm text-gray-600">Capacitamos sua equipe do início ao fim</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
              <h3 className="text-2xl text-slate-900 mb-6" style={{ fontWeight: 600 }}>
                Agendar demonstração
              </h3>

              <form className="space-y-5">
                <div>
                  <label className="block text-sm text-gray-700 mb-2" style={{ fontWeight: 500 }}>
                    Nome completo
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-slate-900 transition-all"
                    placeholder="Dr. João Silva"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2" style={{ fontWeight: 500 }}>
                    Email profissional
                  </label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-slate-900 transition-all"
                    placeholder="joao@entidade.com.br"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2" style={{ fontWeight: 500 }}>
                    Nome da entidade
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-slate-900 transition-all"
                    placeholder="Sociedade Brasileira de..."
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-2" style={{ fontWeight: 500 }}>
                    Telefone
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-slate-900 transition-all"
                    placeholder="(11) 99999-9999"
                  />
                </div>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/login');
                  }}
                  className="w-full flex items-center justify-center gap-2 px-8 py-4 mt-2 bg-slate-900 text-white text-base font-medium rounded-xl hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl"
                >
                  Agendar demonstração
                  <ArrowRight size={20} />
                </button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  Respondemos em até 24 horas
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}