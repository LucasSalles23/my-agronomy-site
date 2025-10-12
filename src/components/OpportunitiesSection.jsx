import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, User, Building, Mail } from 'lucide-react';


const OpportunitiesSection = ({ onOpportunityClick, onNavigate }) => {
  // --- Estados ---
  const [opportunities, setOpportunities] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [visibleCount, setVisibleCount] = useState(4);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');

  // --- Buscar oportunidades ---
  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/opportunities`);
        if (!response.ok) throw new Error(`Erro: ${response.status}`);
        const data = await response.json();
        setOpportunities(data);
      } catch (e) {
        console.error(e);
        setError("Não foi possível carregar as oportunidades.");
      } finally {
        setLoading(false);
      }
    };

    fetchOpportunities();
  }, []);


  // --- Buscar departamentos ---
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/departamentos`);
        if (!response.ok) throw new Error(`Erro: ${response.status}`);
        const data = await response.json();
        setDepartments(data);
      } catch (e) {
        console.error("Erro ao buscar departamentos:", e);
      }
    };

    fetchDepartments();
  }, []);

  // --- Função para cores do Badge ---
  const getTypeColor = (type) => {
    switch (type) {
      case 'Estágio': return 'bg-blue-100 text-blue-800';
      case 'IC': return 'bg-purple-100 text-purple-800';
      case 'PVA': return 'bg-green-100 text-green-800';
      case 'Monitoria': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // --- Filtro ---
  const filteredOpportunities = opportunities.filter(op => {
    const matchesSearch =
      op.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      op.descricao.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter ? op.tipo.toLowerCase() === typeFilter.toLowerCase() : true;
    const matchesDepartment = departmentFilter ? op.department === departmentFilter : true;
    return matchesSearch && matchesType && matchesDepartment;
  });

  // --- Renderização ---
  if (loading) return (
    <section className="py-16 bg-gray-50 text-center">
      <h2 className="text-3xl font-bold mb-4">Oportunidades Acadêmicas</h2>
      <p>Carregando vagas...</p>
    </section>
  );

  if (error) return (
    <section className="py-16 bg-gray-50 text-center">
      <h2 className="text-3xl font-bold mb-4">Oportunidades Acadêmicas</h2>
      <p className="text-red-600 bg-red-100 p-4 rounded-md">{error}</p>
    </section>
  );

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

        {/* Barra de busca e filtros */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Buscar por palavra-chave..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
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
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.nome}>
                    {dept.nome}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Lista de oportunidades */}
        {/* Lista de oportunidades + anúncios */}
        <div className="space-y-6">
          {filteredOpportunities.length > 0 ? (
            filteredOpportunities.slice(0, visibleCount).map((opportunity, index) => (
              <React.Fragment key={opportunity.id}>
                {/* Card da oportunidade */}
                <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
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
                        Publicado em {new Date(opportunity.publishDate).toLocaleDateString('pt-BR')}
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

                    <p className="text-gray-700 mb-4">{opportunity.descricao}</p>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button className="bg-green-700 hover:bg-green-800">
                        <Mail className="h-4 w-4 mr-2" />
                        Entrar em contato
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => onOpportunityClick && onOpportunityClick(opportunity.id)}
                      >
                        Ver detalhes
                      </Button>
                    </div>
                  </div>
                </div>

                {/* 🔸 Inserir anúncio a cada 3 oportunidades */}
                {(index + 1) % 2 === 0 && (
                  <div
                    key={`ad-${index}`}
                    className="border border-dashed border-black-300 rounded-lg p-6 text-center text-gray-700 bg-green-50 hover:bg-green-100 transition cursor-pointer"
                  >
                    <p className="text-sm font-semibold flex items-center justify-center gap-2">
                      🍽️ Apoio local: <span className="text-emerald-700">Restaurante Sabor da Roça</span>
                    </p>
                    <p className="text-xs text-gray-600 mt-2">
                      Almoço caseiro com buffet livre — 300 m do campus.
                      <a
                        href="https://sabordaroca.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline ml-1"
                      >
                        Veja o cardápio
                      </a>
                    </p>
                  </div>
                )}

              </React.Fragment>
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
            onClick={() => onNavigate && onNavigate('opportunities')}
          >
            Ver todas as oportunidades
          </Button>
        </div>
      </div>
    </section>
  );
};

export default OpportunitiesSection;
