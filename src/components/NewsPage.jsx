import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, Filter, ArrowLeft, Calendar, User, GraduationCap, Eye, Share2 } from 'lucide-react'

const NewsPage = ({ onBack, onNewsClick }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedAuthor, setSelectedAuthor] = useState('all')
  const [selectedReviewer, setSelectedReviewer] = useState('all')

  // Dados mockados de notícias com autores e revisores
  const newsData = [
    {
      id: 1,
      title: "Programa de Bolsas de Estágio 2025 está com inscrições abertas",
      summary: "Iniciativa beneficia 12 estudantes de graduação com apoio financeiro, mentoria profissional e integração entre teoria e prática.",
      content: "O Programa de Bolsas de Estágio 2025 representa uma oportunidade única para estudantes de agronomia desenvolverem suas habilidades práticas...",
      category: "Oportunidades",
      publishDate: "2025-09-25",
      lastUpdate: "2025-09-25",
      views: 245,
      author: {
        name: "Ana Carolina Silva",
        course: "Agronomia",
        period: "4º período",
        avatar: "/api/placeholder/40/40",
        initials: "AS"
      },
      reviewer: {
        name: "Prof. Carlos Eduardo Pellegrino Cerri",
        department: "Ciência do Solo",
        initials: "CC"
      },
      image: "/api/placeholder/400/200",
      tags: ["bolsa", "estágio", "graduação", "mentoria"]
    },
    {
      id: 2,
      title: "Pesquisa sobre impacto dos pets na economia brasileira",
      summary: "Pesquisa desenvolvida no Programa de Pós-graduação em Economia Aplicada analisa impacto dos pets no orçamento familiar.",
      content: "O mercado pet brasileiro tem apresentado crescimento exponencial nos últimos anos, movimentando bilhões de reais anualmente...",
      category: "Pesquisa",
      publishDate: "2025-09-20",
      lastUpdate: "2025-09-22",
      views: 189,
      author: {
        name: "João Pedro Santos",
        course: "Agronomia",
        period: "6º período",
        avatar: "/api/placeholder/40/40",
        initials: "JS"
      },
      reviewer: {
        name: "Prof. Marina Luciana Abreu de Melo",
        department: "Genética",
        initials: "MM"
      },
      image: "/api/placeholder/400/200",
      tags: ["economia", "pets", "pesquisa", "mercado"]
    },
    {
      id: 3,
      title: "Estudo sobre carbono e biodiversidade na Ilha das Cinzas",
      summary: "Pesquisadores estudam carbono, biodiversidade e uso da terra em importante área de conservação.",
      content: "A Ilha das Cinzas representa um ecossistema único que tem sido objeto de estudos intensivos sobre sequestro de carbono...",
      category: "Pesquisa",
      publishDate: "2025-09-18",
      lastUpdate: "2025-09-18",
      views: 167,
      author: {
        name: "Maria Fernanda Costa",
        course: "Agronomia",
        period: "8º período",
        avatar: "/api/placeholder/40/40",
        initials: "MC"
      },
      reviewer: {
        name: "Prof. Tiago Osório Ferreira",
        department: "Fitopatologia e Nematologia",
        initials: "TF"
      },
      image: "/api/placeholder/400/200",
      tags: ["carbono", "biodiversidade", "conservação", "sustentabilidade"]
    },
    {
      id: 4,
      title: "Workshop sobre Agricultura de Precisão acontece na próxima semana",
      summary: "Evento gratuito abordará tecnologias emergentes e suas aplicações práticas no campo.",
      content: "A agricultura de precisão representa o futuro da produção agrícola sustentável, utilizando tecnologias avançadas...",
      category: "Eventos",
      publishDate: "2025-09-15",
      lastUpdate: "2025-09-16",
      views: 312,
      author: {
        name: "Lucas Oliveira",
        course: "Agronomia",
        period: "2º período",
        avatar: "/api/placeholder/40/40",
        initials: "LO"
      },
      reviewer: {
        name: "Prof. Paulo Sérgio Pavinato",
        department: "Ciência do Solo",
        initials: "PP"
      },
      image: "/api/placeholder/400/200",
      tags: ["workshop", "tecnologia", "agricultura", "precisão"]
    },
    {
      id: 5,
      title: "Projeto de Extensão leva conhecimento sobre compostagem às escolas",
      summary: "Iniciativa educativa ensina práticas sustentáveis de manejo de resíduos orgânicos para estudantes do ensino médio.",
      content: "O projeto de extensão 'Compostagem na Escola' tem como objetivo disseminar conhecimentos sobre sustentabilidade...",
      category: "Extensão",
      publishDate: "2025-09-12",
      lastUpdate: "2025-09-12",
      views: 198,
      author: {
        name: "Beatriz Almeida",
        course: "Agronomia",
        period: "5º período",
        avatar: "/api/placeholder/40/40",
        initials: "BA"
      },
      reviewer: {
        name: "Prof. Fernando Dini Andreote",
        department: "Ciência do Solo",
        initials: "FA"
      },
      image: "/api/placeholder/400/200",
      tags: ["extensão", "educação", "compostagem", "sustentabilidade"]
    }
  ]

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

  // Filtrar notícias
  const filteredNews = newsData.filter(news => {
    const matchesSearch = news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         news.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         news.author.name.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = selectedCategory === 'all' || news.category === selectedCategory
    const matchesAuthor = selectedAuthor === 'all' || news.author.name === selectedAuthor
    const matchesReviewer = selectedReviewer === 'all' || news.reviewer.name === selectedReviewer

    return matchesSearch && matchesCategory && matchesAuthor && matchesReviewer
  })

  // Obter listas únicas para filtros
  const categories = [...new Set(newsData.map(news => news.category))]
  const authors = [...new Set(newsData.map(news => news.author.name))]
  const reviewers = [...new Set(newsData.map(news => news.reviewer.name))]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="flex items-center space-x-2"
              >
                <ArrowLeft size={20} />
                <span>Voltar</span>
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Notícias do Portal</h1>
                <p className="text-gray-600 mt-1">
                  Conteúdo colaborativo criado por alunos e revisado por professores
                </p>
              </div>
            </div>
            <Button className="bg-green-600 hover:bg-green-700">
              <User className="mr-2 h-4 w-4" />
              Submeter Notícia
            </Button>
          </div>

          {/* Estatísticas */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-700">{newsData.length}</div>
              <div className="text-sm text-green-600">Total de Notícias</div>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-700">{authors.length}</div>
              <div className="text-sm text-blue-600">Autores Ativos</div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-purple-700">{reviewers.length}</div>
              <div className="text-sm text-purple-600">Professores Revisores</div>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <div className="text-2xl font-bold text-orange-700">{categories.length}</div>
              <div className="text-sm text-orange-600">Categorias</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filtros e Busca */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Campo de busca */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Buscar por título, conteúdo ou autor..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Filtros */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as Categorias</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedAuthor} onValueChange={setSelectedAuthor}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Autor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Autores</SelectItem>
                  {authors.map(author => (
                    <SelectItem key={author} value={author}>{author}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedReviewer} onValueChange={setSelectedReviewer}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Revisor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Revisores</SelectItem>
                  {reviewers.map(reviewer => (
                    <SelectItem key={reviewer} value={reviewer}>{reviewer}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Resultados da busca */}
          <div className="mt-4 text-sm text-gray-600">
            Mostrando {filteredNews.length} de {newsData.length} notícias
          </div>
        </div>

        {/* Grid de Notícias */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredNews.map(news => (
            <Card key={news.id} className="hover:shadow-lg transition-shadow duration-200">
              <div className="relative">
                <img 
                  src={news.image} 
                  alt={news.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <Badge className={`absolute top-3 left-3 ${getCategoryColor(news.category)}`}>
                  {news.category}
                </Badge>
              </div>
              
              <CardHeader className="pb-3">
                <CardTitle className="text-lg line-clamp-2 hover:text-green-700 cursor-pointer">
                  {news.title}
                </CardTitle>
                <p className="text-gray-600 text-sm line-clamp-3 mt-2">
                  {news.summary}
                </p>
              </CardHeader>

              <CardContent className="pt-0">
                {/* Informações do Autor */}
                <div className="flex items-center space-x-3 mb-3 p-3 bg-blue-50 rounded-lg">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={news.author.avatar} />
                    <AvatarFallback className="bg-blue-200 text-blue-700 text-xs">
                      {news.author.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-blue-900 truncate">
                      {news.author.name}
                    </p>
                    <p className="text-xs text-blue-600">
                      {news.author.course} - {news.author.period}
                    </p>
                  </div>
                  <GraduationCap className="h-4 w-4 text-blue-500" />
                </div>

                {/* Informações do Revisor */}
                <div className="flex items-center space-x-3 mb-4 p-3 bg-green-50 rounded-lg">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-green-200 text-green-700 text-xs">
                      {news.reviewer.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-green-900 truncate">
                      {news.reviewer.name}
                    </p>
                    <p className="text-xs text-green-600">
                      {news.reviewer.department}
                    </p>
                  </div>
                  <User className="h-4 w-4 text-green-500" />
                </div>

                {/* Metadados */}
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
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {news.tags.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{news.tags.length - 3}
                    </Badge>
                  )}
                </div>

                {/* Botões de Ação */}
                <div className="flex space-x-2">
                  <Button 
                    size="sm" 
                    className="flex-1 bg-green-600 hover:bg-green-700"
                    onClick={() => onNewsClick && onNewsClick(news.id)}
                  >
                    Ler mais
                  </Button>
                  <Button size="sm" variant="outline" className="px-3">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mensagem quando não há resultados */}
        {filteredNews.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nenhuma notícia encontrada
            </h3>
            <p className="text-gray-600">
              Tente ajustar os filtros ou termos de busca para encontrar o que procura.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default NewsPage

