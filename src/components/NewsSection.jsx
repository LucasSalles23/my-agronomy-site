import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Calendar, ArrowRight } from 'lucide-react'

const NewsSection = ({ onNewsClick, onViewAllNews }) => {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('https://my-agronomy-site-production.up.railway.app/api/noticias');
        if (!response.ok) throw new Error(`Erro ao buscar notícias: ${response.status}`);
        const data = await response.json();
        setNews(data);
      } catch (err) {
        console.error("Erro ao buscar notícias:", err);
        setError('Não foi possível carregar as notícias');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);



  // Mostra apenas as 3 primeiras notícias
  const newsPreview = news.slice(0, 2)

  return (
    <section className="py-16 bg-white" id="noticias">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Últimas Notícias
          </h2>
          <p className="text-xl text-gray-600">
            Fique por dentro das novidades do mundo agro
          </p>
        </div>

        {loading && <p className="text-center text-gray-500">Carregando notícias...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {/* Grid de notícias + anúncio */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {newsPreview.map((item, index) => (
              <React.Fragment key={item.id}>
                {/* Card da notícia */}
                <div className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        {item.categoria}
                      </span>
                      <div className="flex items-center ml-auto text-gray-500 text-sm">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(item.data_publicacao).toLocaleDateString('pt-BR')}
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                      {item.titulo}
                    </h3>

                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {item.resumo}
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

                {/* 🔸 Inserir anúncio a cada 2 notícias */}
                {(index + 1) % 2 === 1 && (
                  <div
                    key={`ad-${index}`}
                    className="border border-dashed border-gray-300 rounded-lg p-6 text-center text-gray-600 bg-gray-50 hover:bg-gray-100 transition"
                  >
                    <p className="text-sm font-semibold">🎯 Anúncio patrocinado</p>
                    <p className="text-xs text-gray-500 mt-2">Seu banner pode estar aqui</p>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        )}

        {/* Botão Ver todas */}
        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="border-green-700 text-green-700 hover:bg-green-700 hover:text-white cursor-pointer transition-colors duration-300"
            onClick={onViewAllNews}
          >
            Ver todas as notícias
          </Button>
        </div>
      </div>
    </section>
  )
}

export default NewsSection
