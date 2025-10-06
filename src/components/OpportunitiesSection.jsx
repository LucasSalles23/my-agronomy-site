import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, Mail, User, Building } from 'lucide-react';

const OpportunitiesSection = ({ onOpportunityClick }) => {
  // Estados para gerenciar os dados, carregamento e erros
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Novos estados para paginação e filtros
  const [visibleCount, setVisibleCount] = useState(4);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');

  // Hook para buscar os dados da API quando o componente é montado
  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/opportunities');

        if (!response.ok) {
          throw new Error(`A requisição falhou com o status: ${response.status}`);
        }

        const data = await response.json();
        setOpportunities(data);

      } catch (e) {
        console.error("Erro ao buscar oportunidades:", e);
        setError("Não foi possível carregar as oportunidades. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchOpportunities();
  }, []);

  // Função para determinar a cor do Badge
  const getTypeColor = (type) => {
    switch (type) {
      case 'Estágio':
        return 'bg-blue-100 text-blue-800';
      case 'IC':
        return 'bg-purple-100 text-purple-800';
      case 'PVA':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Função para aplicar filtros
  const filteredOpportunities = opportunities.filter(op => {
    const matchesSearch = op.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      op.descricao.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter ? op.tipo.toLowerCase() === typeFilter.toLowerCase() : true;
    const matchesDepartment = departmentFilter ? op.department.toLowerCase() === departmentFilter.toLowerCase() : true;
    return matchesSearch && matchesType && matchesDepartment;
  });

  // --- RENDERIZAÇÃO CONDICIONAL ---

  // 1. Estado de Carregamento
  if (loading) {
    return (
      <section className="py-16 bg-gray-50" id="oportunidades">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Oportunidades Acadêmicas
          </h2>
          <p className="text-xl text-gray-600">Carregando vagas...</p>
        </div>
      </section>
    );
  }

  // 2. Estado de Erro
  if (error) {
    return (
      <section className="py-16 bg-gray-50" id="oportunidades">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Oportunidades Acadêmicas
          </h2>
          <p className="text-xl text-red-600 bg-red-100 p-4 rounded-md">{error}</p>
        </div>
      </section>
    );
  }

  // 3. Estado de Sucesso (com dados)
  return (
    <section className="py-16 bg-gray-50" id="oportunidades">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Oportunidades Acadêmicas
          </h2>
          <p className="text-xl text-gray-600">
            Encontre vagas de estágio, PVA, iniciação científica, monitoria e muito mais.
          </p>
        </div>

        {/* Barra de Busca e Filtro */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Buscar por palavra-chave..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <select
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option value="">Todos</option>
                <option value="Estágio">Estágio</option>
                <option value="IC">IC</option>
                <option value="PVA">PVA</option>
                <option value="Monitoria">Monitoria</option>
              </select>
              <select
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
              >
                <option value="">Departamento</option>
                {/* Adicione opções reais dos departamentos */}
              </select>
              <Button
                className="bg-green-700 hover:bg-green-800"
                onClick={() => setVisibleCount(4)} // resetar paginação se quiser
              >
                <Filter className="h-4 w-4 mr-2" />
                Filtrar
              </Button>
            </div>
          </div>
        </div>

        {/* Lista de Oportunidades */}
        <div className="space-y-6">
          {filteredOpportunities.length > 0 ? (
            filteredOpportunities.slice(0, visibleCount).map((opportunity) => (
              <div key={opportunity.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                    <div className="flex items-center gap-3 mb-2 lg:mb-0">
                      <Badge className={getTypeColor(opportunity.tipo)}>
                        {opportunity.tipo}
                      </Badge>
                      <h3 className="text-xl font-semibold text-gray-900">
                        {opportunity.titulo}
                      </h3>
                    </div>
                    <div className="text-sm text-gray-500">
                      Publicado em {new Date(opportunity.publishDate).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center text-gray-600">
                      <User className="h-4 w-4 mr-2" />
                      <span>{opportunity.professor}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Building className="h-4 w-4 mr-2" />
                      <span>{opportunity.department}</span>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4">
                    {opportunity.descricao}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button className="bg-green-700 hover:bg-green-800">
                      <Mail className="h-4 w-4 mr-2" />
                      Entrar em contato
                    </Button>
                    <Button variant="outline" onClick={() => onOpportunityClick && onOpportunityClick(opportunity.id)}>
                      Ver detalhes
                    </Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10 bg-white rounded-lg shadow-md">
              <p className="text-gray-600">Nenhuma oportunidade encontrada no momento.</p>
            </div>
          )}
        </div>

        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="border-green-700 text-green-700 hover:bg-green-700 hover:text-white cursor-pointer"
            onClick={() => {
              if (typeof onNavigate === 'function') {
                onNavigate('opportunities'); // muda pra página de todas as oportunidades
              } else {
                console.warn("onNavigate não foi passado como prop");
              }
            }}
          >
            Ver todas as oportunidades
          </Button>
        </div>



      </div>
    </section>
  );
};

export default OpportunitiesSection;
