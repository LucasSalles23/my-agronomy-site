import { Button } from '@/components/ui/button'
import { Calendar, ArrowRight } from 'lucide-react'

const NewsSection = ({ onNewsClick }) => {
  const news = [
    {
      id: 1,
      title: "Programa de Bolsas de Estágio 2025 está com inscrições abertas",
      description: "Iniciativa beneficia 12 estudantes de graduação com apoio financeiro, mentoria profissional e integração entre teoria e prática.",
      date: "2025-09-25",
      category: "Oportunidades"
    },
    {
      id: 2,
      title: "Pesquisa sobre impacto dos pets na economia brasileira",
      description: "Pesquisa desenvolvida no Programa de Pós-graduação em Economia Aplicada analisa impacto dos pets no orçamento familiar.",
      date: "2025-09-20",
      category: "Pesquisa"
    },
    {
      id: 3,
      title: "Estudo sobre carbono e biodiversidade na Ilha das Cinzas",
      description: "Pesquisadores estudam carbono, biodiversidade e uso da terra em importante área de conservação.",
      date: "2025-09-18",
      category: "Pesquisa"
    }
  ]

  return (
    <section className="py-16 bg-white" id="noticias">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Últimas Notícias
          </h2>
          <p className="text-xl text-gray-600">
            Fique por dentro das novidades do curso de Agronomia
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((item) => (
            <div key={item.id} className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="p-6">
                <div className="flex items-center mb-3">
                  <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                    {item.category}
                  </span>
                  <div className="flex items-center ml-auto text-gray-500 text-sm">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(item.date).toLocaleDateString('pt-BR')}
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                  {item.title}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {item.description}
                </p>
                
                <Button 
                  variant="ghost" 
                  className="text-green-700 hover:text-green-800 p-0"
                  onClick={() => onNewsClick && onNewsClick(item.id)}
                >
                  Leia mais
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="border-green-700 text-green-700 hover:bg-green-50">
            Ver todas as notícias
          </Button>
        </div>
      </div>
    </section>
  )
}

export default NewsSection
