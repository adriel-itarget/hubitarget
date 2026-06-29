export function FeaturesSection() {
  return (
    <div className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-32">
          <div>
            <h2 className="text-5xl lg:text-6xl text-slate-900 mb-6 tracking-tight leading-tight" style={{ fontWeight: 600 }}>
              Acompanhe toda a jornada do{' '}
              <span className="text-blue-600">associado</span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              Da inscrição inicial até a educação continuada, nossa plataforma centraliza toda a experiência do profissional médico em um único ecossistema integrado.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg text-slate-900 font-semibold mb-1">Gestão completa</h3>
                  <p className="text-gray-600">Cadastro, anuidades, comunicação e muito mais em uma só plataforma</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg text-slate-900 font-semibold mb-1">Automação inteligente</h3>
                  <p className="text-gray-600">Reduza trabalho manual e libere tempo para o que realmente importa</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                  <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg text-slate-900 font-semibold mb-1">Análise de dados</h3>
                  <p className="text-gray-600">Insights poderosos para tomada de decisão estratégica</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-[4/3] bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop"
                alt="Equipe médica colaborando"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-xl shadow-xl border border-gray-100">
              <div className="text-4xl font-bold text-slate-900 mb-1">10.000+</div>
              <div className="text-gray-600">Associados ativos</div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-1">
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-8">
              <div className="mb-6">
                <div className="text-sm text-gray-500 mb-2">Engajamento por departamento</div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-700">Gestão de Eventos</span>
                      <span className="font-semibold text-slate-900">87%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: '87%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-700">EAD / LMS</span>
                      <span className="font-semibold text-slate-900">92%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-700">Pontuação</span>
                      <span className="font-semibold text-slate-900">78%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-orange-500 rounded-full" style={{ width: '78%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-700">Formulários</span>
                      <span className="font-semibold text-slate-900">95%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500 rounded-full" style={{ width: '95%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100">
                <div className="grid grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-2xl font-bold text-slate-900 mb-1">500+</div>
                    <div className="text-xs text-gray-600">Eventos</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-slate-900 mb-1">98%</div>
                    <div className="text-xs text-gray-600">Satisfação</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-slate-900 mb-1">24/7</div>
                    <div className="text-xs text-gray-600">Suporte</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="text-5xl lg:text-6xl text-slate-900 mb-6 tracking-tight leading-tight" style={{ fontWeight: 600 }}>
              Dados que impulsionam{' '}
              <span className="text-green-600">resultados</span>
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Acompanhe métricas em tempo real, identifique oportunidades e tome decisões baseadas em dados concretos sobre o engajamento dos seus associados.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
