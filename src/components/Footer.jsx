import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12" id="contato">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">Portal Agronomia</h3>
            <p className="text-gray-300 mb-4">
              Conectando estudantes e professores para oportunidades acadêmicas no curso de Agronomia.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#noticias" className="text-gray-300 hover:text-white transition-colors">
                  Notícias
                </a>
              </li>
              <li>
                <a href="#oportunidades" className="text-gray-300 hover:text-white transition-colors">
                  Oportunidades
                </a>
              </li>
              <li>
                <a href="#departamentos" className="text-gray-300 hover:text-white transition-colors">
                  Departamentos
                </a>
              </li>
              <li>
                <a href="#professores" className="text-gray-300 hover:text-white transition-colors">
                  Professores
                </a>
              </li>
            </ul>
          </div>

          {/* Departments */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Departamentos</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Ciência do Solo</li>
              <li>Genética</li>
              <li>Fitopatologia</li>
              <li>Ciências Florestais</li>
              <li>Produção Vegetal</li>
              <li>Entomologia</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-3 text-green-400" />
                <span className="text-gray-300">
                  Av. Pádua Dias, 11<br />
                  Piracicaba - SP<br />
                  CEP: 13418-900
                </span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-green-400" />
                <span className="text-gray-300">+55 (19) 3429-4100</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-green-400" />
                <span className="text-gray-300">contato@agronomia.edu.br</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © 2025 Portal Agronomia - Universidade. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
