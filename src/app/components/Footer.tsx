export function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-8 py-20">
        <div className="grid md:grid-cols-5 gap-12 mb-16">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="32" height="32" rx="8" fill="white"/>
                <path d="M10 12h4v8h-4v-8zm8 0h4v8h-4v-8z" fill="#0F172A"/>
              </svg>
              <span className="text-xl text-white" style={{ fontWeight: 600 }}>
                iTARGET
              </span>
            </div>
            <p className="text-blue-200 leading-relaxed mb-6 max-w-sm">
              Transformando a gestão de entidades médicas através da tecnologia e inovação.
            </p>
            <div className="text-sm text-blue-300">
              contato@itarget.com.br
            </div>
          </div>

          <div>
            <h3 className="text-sm text-blue-300 mb-4" style={{ fontWeight: 600 }}>
              Produtos
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-blue-200 hover:text-white transition-colors">
                  Gestão Associativa
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-blue-200 hover:text-white transition-colors">
                  Gestão de Eventos
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-blue-200 hover:text-white transition-colors">
                  EAD / LMS
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-blue-200 hover:text-white transition-colors">
                  Provas e Exames
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm text-blue-300 mb-4" style={{ fontWeight: 600 }}>
              Empresa
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-blue-200 hover:text-white transition-colors">
                  Sobre nós
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-blue-200 hover:text-white transition-colors">
                  Cases
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-blue-200 hover:text-white transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-blue-200 hover:text-white transition-colors">
                  Contato
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm text-blue-300 mb-4" style={{ fontWeight: 600 }}>
              Legal
            </h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-sm text-blue-200 hover:text-white transition-colors">
                  Privacidade
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-blue-200 hover:text-white transition-colors">
                  Termos
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-blue-200 hover:text-white transition-colors">
                  LGPD
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-blue-300">
            © {new Date().getFullYear()} iTARGET Tecnologia. Todos os direitos reservados.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-blue-300 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a href="#" className="text-blue-300 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}