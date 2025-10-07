import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'

const Header = ({ onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-2xl font-bold text-green-700">
              Impulso Agro
            </div>
            <div className="ml-2 text-sm text-gray-600 hidden sm:block">
              UFPR
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <button onClick={() => onNavigate && onNavigate('home')} className="text-gray-700 hover:text-green-700 transition-colors">
              Home
            </button>
            <button onClick={() => onNavigate && onNavigate('news')} className="text-gray-700 hover:text-green-700 transition-colors">
              Notícias
            </button>
            <button onClick={() => onNavigate && onNavigate('opportunities')} className="text-gray-700 hover:text-green-700 transition-colors">
              Oportunidades
            </button>
            <button onClick={() => onNavigate && onNavigate('departments')} className="text-gray-700 hover:text-green-700 transition-colors">
              Departamentos
            </button>
            <button onClick={() => onNavigate && onNavigate('professors')} className="text-gray-700 hover:text-green-700 transition-colors">
              Professores
            </button>
            <button onClick={() => onNavigate && onNavigate('home')} className="text-gray-700 hover:text-green-700 transition-colors">
              Contato
            </button>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMenu}
              className="p-2"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <button onClick={() => { onNavigate && onNavigate('home'); setIsMenuOpen(false); }} className="block w-full text-left px-3 py-2 text-gray-700 hover:text-green-700 transition-colors">
                Home
              </button>
              <button onClick={() => { onNavigate && onNavigate('news'); setIsMenuOpen(false); }} className="block w-full text-left px-3 py-2 text-gray-700 hover:text-green-700 transition-colors">
                Notícias
              </button>
              <button onClick={() => { onNavigate && onNavigate('opportunities'); setIsMenuOpen(false); }} className="block w-full text-left px-3 py-2 text-gray-700 hover:text-green-700 transition-colors">
                Oportunidades
              </button>
              <button onClick={() => { onNavigate && onNavigate('departments'); setIsMenuOpen(false); }} className="block w-full text-left px-3 py-2 text-gray-700 hover:text-green-700 transition-colors">
                Departamentos
              </button>
              <button onClick={() => { onNavigate && onNavigate('professors'); setIsMenuOpen(false); }} className="block w-full text-left px-3 py-2 text-gray-700 hover:text-green-700 transition-colors">
                Professores
              </button>
              <button onClick={() => { onNavigate && onNavigate('home'); setIsMenuOpen(false); }} className="block w-full text-left px-3 py-2 text-gray-700 hover:text-green-700 transition-colors">
                Contato
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header

