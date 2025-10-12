import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, ArrowLeft, Calendar, Eye, User, GraduationCap, Share2, X } from 'lucide-react'

const NewsPage = ({ onBack, onNewsClick }) => {
  const [newsData, setNewsData] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [visibleCount, setVisibleCount] = useState(3)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/noticias`);
        if (!response.ok) throw new Error('Erro ao buscar notícias do backend');
        const data = await response.json();

        const formatted = data.map(item => ({
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
          image: item.url_imagem || '/api/placeholder/400/200',
          tags: item.tags ? item.tags.split(',') : []
        }));

        setNewsData(formatted);
        setLoading(false);
      } catch (err) {
        console.error('Erro ao buscar notícias do backend:', err);
        setNewsData([]);
        setLoading(false);
      }
    };

    fetchNews();
  }, []);


  const filteredNews = newsData.filter(news => {
    const matchesSearch =
      news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      news.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      news.author.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || news.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const visibleNews = filteredNews.slice(0, visibleCount)
  const categories = [...new Set(newsData.map(news => news.category))]

  const getCategoryColor = category => {
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

  if (loading) return <div className="text-center py-20">Carregando notícias...</div>

  const SubmitNewsModal = () => (
    isModalOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 relative animate-fadeIn">
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-900"
            onClick={() => setIsModalOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Quer Submeter Notícias?</h2>
          <p className="text-gray-700 mb-6">
            Contate a equipe Impulso e descubra como você pode submeter notícias, participar ativamente do portal e ganhar horas complementares.
          </p>
          <div className="flex flex-col gap-3">
            <Button
              className="bg-green-600 hover:bg-green-700 w-full"
              onClick={() => window.open('https://wa.me/5591999999999?text=Olá!%20Quero%20submeter%20uma%20notícia%20e%20saber%20sobre%20horas%20complementares.', '_blank')}
            >
              Contatar pelo WhatsApp
            </Button>
          </div>
        </div>
      </div>
    )
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={onBack} className="flex items-center space-x-2">
              <ArrowLeft size={20} />
              <span>Voltar</span>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Notícias do Portal</h1>
              <p className="text-gray-600 mt-1">Conteúdo colaborativo criado por alunos e revisado por professores</p>
            </div>
          </div>

          <Button
            className="bg-green-600 hover:bg-green-700 flex items-center"
            onClick={() => setIsModalOpen(true)}
          >
            <User className="mr-2 h-4 w-4" />
            Submeter Notícia
          </Button>
          <SubmitNewsModal />
        </div>
      </div>

      {/* Filtros e busca */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6 flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar por título, conteúdo ou autor..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas as Categorias</SelectItem>
                {categories.map(c => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Grid de notícias */}
        {visibleNews.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {visibleNews.map(news => (
              <Card key={news.id} className="hover:shadow-lg transition-shadow duration-200 rounded-lg overflow-hidden p-0">
                {/* Imagem */}
                <div className="relative">
                  <img
                    src={news.image}
                    alt={news.title}
                    className="w-full h-48 md:h-56 lg:h-64 object-cover"
                  />
                  <Badge className={`absolute top-3 left-3 ${getCategoryColor(news.category)}`}>
                    {news.category}
                  </Badge>
                </div>

                {/* Cabeçalho */}
                <CardHeader className="pb-3">
                  <CardTitle
                    className="text-lg line-clamp-2 hover:text-green-700 cursor-pointer"
                    onClick={() => onNewsClick && onNewsClick(news.id)}
                  >
                    {news.title}
                  </CardTitle>
                  <p className="text-gray-600 text-sm line-clamp-3 mt-2">{news.summary}</p>
                </CardHeader>

                {/* Conteúdo */}
                <CardContent className="pt-0 pb-6">
                  {/* Autor */}
                  <div className="flex items-center space-x-3 mb-3 p-3 bg-blue-50 rounded-lg">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={news.author.avatar} />
                      <AvatarFallback className="bg-blue-200 text-blue-700 text-xs">{news.author.initials}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-blue-900 truncate">{news.author.name}</p>
                      <p className="text-xs text-blue-600">{news.author.course} - {news.author.period}</p>
                    </div>
                    <GraduationCap className="h-4 w-4 text-blue-500" />
                  </div>

                  {/* Revisor */}
                  <div className="flex items-center space-x-3 mb-4 p-3 bg-green-50 rounded-lg">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-green-200 text-green-700 text-xs">{news.reviewer.initials}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-green-900 truncate">{news.reviewer.name}</p>
                      <p className="text-xs text-green-600">{news.reviewer.department}</p>
                    </div>
                    <User className="h-4 w-4 text-green-500" />
                  </div>

                  {/* Informações */}
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(news.publishDate).toLocaleDateString('pt-BR')}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Eye className="h-3 w-3" />
                        <span>{news.views}</span>
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {news.tags.slice(0, 3).map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                    ))}
                    {news.tags.length > 3 && <Badge variant="secondary" className="text-xs">+{news.tags.length - 3}</Badge>}
                  </div>

                  {/* Botões */}
                  <div className="flex space-x-2">
                    <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700" onClick={() => onNewsClick && onNewsClick(news.id)}>Ler mais</Button>
                    <Button size="sm" variant="outline" className="px-3">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma notícia encontrada</h3>
            <p className="text-gray-600">Tente ajustar os filtros ou termos de busca para encontrar o que procura.</p>
          </div>
        )}

        {/* Botão Carregar Mais */}
        {visibleCount < filteredNews.length && (
          <div className="flex justify-center mt-6">
            <Button className="bg-green-600 hover:bg-green-700" onClick={() => setVisibleCount(prev => prev + 3)}>
              Carregar mais notícias
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default NewsPage
