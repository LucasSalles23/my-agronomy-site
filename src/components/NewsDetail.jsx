import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ArrowLeft, Calendar, User, GraduationCap, Eye, Share2, Clock } from 'lucide-react'

const NewsDetail = ({ newsId, onBack }) => {
  // Dados mockados de notícias (mesmo array da NewsPage)
  const newsData = [
    {
      id: 1,
      title: "Programa de Bolsas de Estágio 2025 está com inscrições abertas",
      summary: "Iniciativa beneficia 12 estudantes de graduação com apoio financeiro, mentoria profissional e integração entre teoria e prática.",
      content: `O Programa de Bolsas de Estágio 2025 representa uma oportunidade única para estudantes de agronomia desenvolverem suas habilidades práticas em um ambiente profissional real. A iniciativa, que já está em sua quinta edição, tem como objetivo principal conectar a teoria aprendida em sala de aula com a prática do mercado de trabalho.

Este ano, o programa oferece 12 vagas para estudantes de graduação em Agronomia, proporcionando não apenas apoio financeiro através de bolsas mensais, mas também mentoria profissional especializada. Os estudantes selecionados terão a oportunidade de trabalhar em projetos reais, desenvolvendo competências técnicas e soft skills essenciais para sua futura carreira.

O processo seletivo é rigoroso e busca identificar estudantes com potencial de liderança, interesse genuíno pela área e comprometimento com a excelência acadêmica. Os candidatos passarão por análise de histórico escolar, entrevista individual e apresentação de um projeto de interesse.

As inscrições estão abertas até o dia 15 de outubro de 2025, e podem ser realizadas através do portal online da universidade. Os resultados serão divulgados no dia 25 de outubro, com início das atividades previsto para novembro.

Para mais informações sobre requisitos, documentação necessária e cronograma detalhado, os interessados podem consultar o edital completo disponível no site oficial ou entrar em contato diretamente com a coordenação do programa.`,
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
      image: "/api/placeholder/800/400",
      tags: ["bolsa", "estágio", "graduação", "mentoria"]
    },
    {
      id: 2,
      title: "Pesquisa sobre impacto dos pets na economia brasileira",
      summary: "Pesquisa desenvolvida no Programa de Pós-graduação em Economia Aplicada analisa impacto dos pets no orçamento familiar.",
      content: `O mercado pet brasileiro tem apresentado crescimento exponencial nos últimos anos, movimentando bilhões de reais anualmente e se consolidando como um dos setores mais promissores da economia nacional. Uma nova pesquisa desenvolvida no âmbito do Programa de Pós-graduação em Economia Aplicada da universidade busca compreender de forma mais profunda o impacto deste fenômeno no orçamento das famílias brasileiras.

O estudo, que está sendo conduzido ao longo de 18 meses, analisa dados de mais de 2.000 famílias de diferentes regiões do país, investigando como a presença de animais de estimação influencia os padrões de consumo e as decisões financeiras domésticas. Os resultados preliminares já indicam tendências surpreendentes que podem redefinir nossa compreensão sobre este mercado.

Segundo os pesquisadores, o gasto médio mensal das famílias com pets varia significativamente conforme a região, renda familiar e tipo de animal. Cães e gatos lideram os investimentos, seguidos por peixes ornamentais e aves. Os maiores gastos concentram-se em alimentação, cuidados veterinários e produtos de higiene e bem-estar.

A pesquisa também investiga o fenômeno da "humanização" dos pets, onde os animais são tratados como membros da família, recebendo cuidados e produtos antes destinados exclusivamente aos humanos. Este comportamento tem impulsionado o desenvolvimento de novos nichos de mercado e oportunidades de negócio.

Os dados coletados serão fundamentais para empresários, formuladores de políticas públicas e pesquisadores interessados em compreender melhor esta dinâmica econômica emergente.`,
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
      image: "/api/placeholder/800/400",
      tags: ["economia", "pets", "pesquisa", "mercado"]
    },
    {
      id: 3,
      title: "Estudo sobre carbono e biodiversidade na Ilha das Cinzas",
      summary: "Pesquisadores estudam carbono, biodiversidade e uso da terra em importante área de conservação.",
      content: `A Ilha das Cinzas representa um ecossistema único que tem sido objeto de estudos intensivos sobre sequestro de carbono e conservação da biodiversidade. Este importante projeto de pesquisa, desenvolvido em parceria com institutos nacionais e internacionais, busca compreender os complexos mecanismos ecológicos que fazem desta região um verdadeiro laboratório natural.

O estudo, que já está em sua segunda fase, utiliza tecnologias de ponta para monitorar os fluxos de carbono no solo e na vegetação, mapeando com precisão como diferentes práticas de uso da terra influenciam a capacidade de sequestro de carbono do ecossistema. Os pesquisadores empregam sensores remotos, análises laboratoriais avançadas e modelagem computacional para obter dados precisos.

Os resultados preliminares indicam que a Ilha das Cinzas possui uma capacidade de sequestro de carbono superior à média de ecossistemas similares, principalmente devido à sua rica diversidade de espécies vegetais e às características únicas do solo local. Esta descoberta tem implicações importantes para estratégias de mitigação das mudanças climáticas.

Além do aspecto climático, o projeto também documenta a extraordinária biodiversidade da região, catalogando espécies de flora e fauna, muitas das quais endêmicas. O trabalho de campo revelou a presença de espécies anteriormente desconhecidas, destacando a importância da conservação desta área.

O projeto conta com financiamento de agências nacionais e internacionais de fomento à pesquisa e representa um exemplo de como a ciência pode contribuir para a compreensão e preservação de ecossistemas únicos.`,
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
      image: "/api/placeholder/800/400",
      tags: ["carbono", "biodiversidade", "conservação", "sustentabilidade"]
    }
  ]

  // Encontrar a notícia pelo ID
  const news = newsData.find(item => item.id === parseInt(newsId))

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
            {/* Título */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {news.title}
            </h1>

            {/* Resumo */}
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

            {/* Informações do Autor */}
            <div className="flex items-center space-x-4 mb-6 p-4 bg-blue-50 rounded-lg">
              <Avatar className="h-12 w-12">
                <AvatarImage src={news.author.avatar} />
                <AvatarFallback className="bg-blue-200 text-blue-700">
                  {news.author.initials}
                </AvatarFallback>
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

            {/* Informações do Revisor */}
            <div className="flex items-center space-x-4 mb-8 p-4 bg-green-50 rounded-lg">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-green-200 text-green-700">
                  {news.reviewer.initials}
                </AvatarFallback>
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

            {/* Conteúdo Principal */}
            <div className="prose prose-lg max-w-none mb-8">
              {news.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {news.tags.map(tag => (
                <Badge key={tag} variant="secondary" className="text-sm">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Ações */}
            <div className="flex items-center justify-between pt-6 border-t">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center space-x-2"
              >
                <Share2 className="h-4 w-4" />
                <span>Compartilhar</span>
              </Button>
              
              <Button
                onClick={onBack}
                className="bg-green-600 hover:bg-green-700"
              >
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

