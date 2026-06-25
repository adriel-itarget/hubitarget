export function TestimonialsSection() {
  return (
    <div className="py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-20">
          <h2 className="text-5xl lg:text-6xl text-slate-900 mb-6 tracking-tight leading-tight" style={{ fontWeight: 600 }}>
            Veja como funciona na prática
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Entidades médicas de todo Brasil já transformaram sua gestão com a iTARGET
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
          <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=300&fit=crop"
              alt="Profissional médico"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=300&fit=crop"
              alt="Evento médico"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-lg row-span-2 lg:col-span-2">
            <img
              src="https://images.unsplash.com/photo-1591115765373-5207764f72e7?w=800&h=600&fit=crop"
              alt="Equipe em reunião"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=300&fit=crop"
              alt="Apresentação"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=300&fit=crop"
              alt="Profissional trabalhando"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-lg lg:col-span-2">
            <img
              src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=300&fit=crop"
              alt="Equipe colaborando"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=400&h=300&fit=crop"
              alt="Trabalho em equipe"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop"
              alt="Colaboração"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="mb-6">
              <svg className="w-10 h-10 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>
            <p className="text-gray-700 mb-6 leading-relaxed">
              "A plataforma transformou nossa gestão. Conseguimos reduzir o tempo administrativo em 65% e melhorar significativamente o engajamento dos associados."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-slate-200 rounded-full"></div>
              <div>
                <div className="font-semibold text-slate-900">Dr. Carlos Silva</div>
                <div className="text-sm text-gray-600">Presidente, SBM</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="mb-6">
              <svg className="w-10 h-10 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>
            <p className="text-gray-700 mb-6 leading-relaxed">
              "O módulo de eventos é excepcional. Conseguimos organizar nosso congresso anual com 2000 participantes de forma totalmente digital e sem problemas."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-slate-200 rounded-full"></div>
              <div>
                <div className="font-semibold text-slate-900">Dra. Ana Costa</div>
                <div className="text-sm text-gray-600">Diretora Científica, SBACV</div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="mb-6">
              <svg className="w-10 h-10 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>
            <p className="text-gray-700 mb-6 leading-relaxed">
              "A integração entre todos os módulos é perfeita. Nossa taxa de renovação de associados aumentou 40% no primeiro ano usando a plataforma."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-slate-200 rounded-full"></div>
              <div>
                <div className="font-semibold text-slate-900">Dr. Paulo Mendes</div>
                <div className="text-sm text-gray-600">Secretário Geral, SBOT</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
