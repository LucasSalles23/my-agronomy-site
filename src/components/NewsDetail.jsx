import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ArrowLeft, Calendar, User, GraduationCap, Eye, Share2, Clock } from 'lucide-react'

const NewsDetail = ({ newsId, onBack }) => {
  const [news, setNews] = useState(null)
  const [loading, setLoading] = useState(true)

  // --- BUSCAR NOTÍCIA PELO ID ---
  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/noticias/${newsId}`)
        if (!response.ok) throw new Error('Erro ao buscar notícia do backend')
        const item = await response.json()

        // Formatando os dados
        const formatted = {
          id: item.id,
          title: item.titulo,
          summary: item.resumo,
          content: item.conteudo,
          category: item.categoria,
          publishDate: item.data_publicacao,
          lastUpdate: item.ultima_atualizacao,
          views: item.visualizacoes || 0,
          author: {
            name: item.autor_nome || 'Desconhecido',
            course: item.autor_curso || 'Agronomia',
            period: item.autor_periodo || 'N/A',
            avatar: item.autor_url_avatar || '/api/placeholder/40/40',
            initials: item.autor_iniciais || 'NA'
          },
          reviewer: {
            name: item.revisor_nome || 'Desconhecido',
            department: item.revisor_departamento || 'N/A',
            initials: item.revisor_iniciais || 'NA'
          },
          image: item.url_imagem || '/api/placeholder/800/400',
          tags: item.tags ? item.tags.split(',') : []
        }

        setNews(formatted)
        setLoading(false)
      } catch (err) {
        console.error('Erro ao buscar notícia do backend:', err)
        setNews(null)
        setLoading(false)
      }
    }

    fetchNewsDetail()
  }, [newsId])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span>Carregando...</span>
      </div>
    )
  }

  if (!news) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Notícia não encontrada</h2>
          <Button onClick={onBack} className="bg-green-600 hover:bg-green-700">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar às notícias
          </Button>
        </div>
      </div>
    )
  }

  // Função para obter cor da categoria
  const getCategoryColor = (category) => {
    const colors = {
      'Oportunidades': 'bg-blue-100 text-blue-800',
      'Pesquisa': 'bg-green-100 text-green-800',
      'Eventos': 'bg-purple-100 text-purple-800',
      'Extensão': 'bg-orange-100 text-orange-800',
      'Ensino': 'bg-yellow-100 text-yellow-800',
      'Institucional': 'bg-gray-100 text-gray-800'
    }
    return colors[category] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="flex items-center space-x-2 mb-4"
          >
            <ArrowLeft size={20} />
            <span>Voltar às notícias</span>
          </Button>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <article className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Imagem Principal */}
          <div className="relative">
            <img 
              src={news.image} 
              alt={news.title}
              className="w-full h-64 md:h-96 object-cover"
            />
            <Badge className={`absolute top-4 left-4 ${getCategoryColor(news.category)}`}>
              {news.category}
            </Badge>
          </div>

          {/* Conteúdo do Artigo */}
          <div className="p-6 md:p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {news.title}
            </h1>
            <p className="text-xl text-gray-600 mb-6 leading-relaxed">
              {news.summary}
            </p>

            {/* Metadados */}
            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-500">
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>Publicado em {new Date(news.publishDate).toLocaleDateString('pt-BR')}</span>
              </div>
              {news.lastUpdate !== news.publishDate && (
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>Atualizado em {new Date(news.lastUpdate).toLocaleDateString('pt-BR')}</span>
                </div>
              )}
              <div className="flex items-center space-x-1">
                <Eye className="h-4 w-4" />
                <span>{news.views} visualizações</span>
              </div>
            </div>

            {/* Autor */}
            <div className="flex items-center space-x-4 mb-6 p-4 bg-blue-50 rounded-lg">
              <Avatar className="h-12 w-12">
                <AvatarImage src={news.author.avatar} />
                <AvatarFallback className="bg-blue-200 text-blue-700">{news.author.initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <GraduationCap className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-blue-600 font-medium">Autor</span>
                </div>
                <p className="font-medium text-blue-900">{news.author.name}</p>
                <p className="text-sm text-blue-600">{news.author.course} - {news.author.period}</p>
              </div>
            </div>

            {/* Revisor */}
            <div className="flex items-center space-x-4 mb-8 p-4 bg-green-50 rounded-lg">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-green-200 text-green-700">{news.reviewer.initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-green-600" />
                  <span className="text-sm text-green-600 font-medium">Revisado por</span>
                </div>
                <p className="font-medium text-green-900">{news.reviewer.name}</p>
                <p className="text-sm text-green-600">{news.reviewer.department}</p>
              </div>
            </div>

            {/* Conteúdo */}
            <div className="prose prose-lg max-w-none mb-8">
              {news.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4 text-gray-700 leading-relaxed">{paragraph}</p>
              ))}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {news.tags.map(tag => (
                <Badge key={tag} variant="secondary" className="text-sm">{tag}</Badge>
              ))}
            </div>

            {/* Ações */}
            <div className="flex items-center justify-between pt-6 border-t">
              <Button variant="outline" size="sm" className="flex items-center space-x-2">
                <Share2 className="h-4 w-4" />
                <span>Compartilhar</span>
              </Button>

              <Button onClick={onBack} className="bg-green-600 hover:bg-green-700">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar às notícias
              </Button>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}

export default NewsDetail
