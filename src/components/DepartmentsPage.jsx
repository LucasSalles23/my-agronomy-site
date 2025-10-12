// ARQUIVO: src/components/DepartmentsPage.jsx (Versão Final com Contato Dinâmico)

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Building,
  Users,
  BookOpen,
  ArrowRight,
  Mail,
  Phone
} from 'lucide-react';

// O componente recebe 'onProfessorClick' e 'onViewAllDepartments' do App.jsx para navegação
const DepartmentsPage = ({ onProfessorClick, onViewAllDepartments }) => {
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDepartments = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://my-agronomy-site-production.up.railway.app/api/departamentos');
        if (!response.ok) {
          throw new Error('Falha ao buscar os dados dos departamentos.');
        }
        const data = await response.json();
        setDepartments(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  const handleProfessorCardClick = (profId) => {
    if (onProfessorClick) {
      onProfessorClick(profId);
    } else {
      console.warn("onProfessorClick não foi fornecido como prop.");
    }
  };

  if (loading) {
    return <section className="py-16 text-center">Carregando departamentos...</section>;
  }

  if (error) {
    return <section className="py-16 text-center text-red-500">Erro ao carregar: {error}</section>;
  }

  return (
    <section className="py-16 bg-gray-50" id="departamentos">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Departamentos
          </h2>
          <p className="text-xl text-gray-600">
            Conheça os departamentos do curso de Agronomia e suas especialidades
          </p>
        </div>

        {!selectedDepartment ? (
          <>
            {/* Departments Grid - Mostrando apenas 3 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {departments.slice(0, 3).map((dept) => (
                <div key={dept.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <Building className="h-6 w-6 text-green-700" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 ml-3">
                        {dept.nome}
                      </h3>
                    </div>

                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {dept.descricao}
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center p-4 bg-green-30 rounded-lg shadow">
                        <div className="text-2xl font-bold text-green-700">{dept.quantidade_professores}</div>
                        <div className="text-xs text-gray-600">Professores</div>
                      </div>
                      <div className="text-center p-4 bg-green-30 rounded-lg shadow">
                        <div className="text-2xl font-bold text-green-700">{dept.disciplinas.length}</div>
                        <div className="text-xs text-gray-600">Disciplinas</div>
                      </div>
                    </div>

                    {/* Disciplines Preview */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {dept.disciplinas.slice(0, 3).map((discipline) => (
                          <Badge key={discipline.id} variant="secondary" className="text-xs">
                            {discipline.nome}
                          </Badge>
                        ))}
                        {dept.disciplinas.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{dept.disciplinas.length - 3} mais
                          </Badge>
                        )}
                      </div>
                    </div>

                    <Button
                      onClick={() => setSelectedDepartment(dept)}
                      className="w-full bg-green-700 hover:bg-green-800"
                    >
                      Ver detalhes
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            {/* Botão "Ver todos os departamentos" */}
            {departments.length > 2 && !selectedDepartment && (
              <div className="text-center mt-8">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-green-700 text-green-700 hover:bg-green-700 hover:text-white cursor-pointer transition-colors"
                  onClick={onViewAllDepartments}
                >
                  Ver todos os departamentos
                </Button>
              </div>
            )}
          </>
        ) : (
          /* Department Detail */
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Button
              onClick={() => setSelectedDepartment(null)}
              variant="ghost"
              className="mb-6 text-green-700 hover:text-green-800"
            >
              ← Voltar aos departamentos
            </Button>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              {/* Header */}
              <div className="bg-green-700 text-white p-6">
                <div className="flex items-center mb-4">
                  <Building className="h-8 w-8 mr-3" />
                  <h1 className="text-3xl font-bold">{selectedDepartment.nome}</h1>
                </div>
                <p className="text-green-100 text-lg">{selectedDepartment.descricao}</p>
              </div>

              <div className="p-6">
                {/* Stats */}
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                    <Users className="h-8 w-8 text-green-700 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{selectedDepartment.quantidade_professores}</div>
                    <div className="text-gray-600">Professores</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                    <BookOpen className="h-8 w-8 text-green-700 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{selectedDepartment.disciplinas.length}</div>
                    <div className="text-gray-600">Disciplinas</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Disciplines and Professors */}
                  <div className="col-span-2">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      <BookOpen className="h-5 w-5 inline mr-2" />
                      Disciplinas e Professores
                    </h3>
                    <div className="space-y-6">
                      {selectedDepartment.disciplinas.map((discipline) => (
                        <div key={discipline.id} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                          <h4 className="text-lg font-semibold text-gray-800 mb-3">{discipline.nome}</h4>
                          <div className="space-y-3">
                            {discipline.professores.length > 0 ? (
                              discipline.professores.map((prof) => (
                                <div key={prof.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
                                  <div>
                                    <p className="font-medium text-gray-900">{prof.nome}</p>
                                    <p className="text-sm text-gray-600">{prof.especializacao}</p>
                                  </div>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleProfessorCardClick(prof.id)}
                                  >
                                    Ver perfil
                                  </Button>
                                </div>
                              ))
                            ) : (
                              <p className="text-sm text-gray-500 px-3">Nenhum professor associado a esta disciplina.</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Contact Information (DINÂMICO) */}
                <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Informações de Contato</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 text-green-700 mr-3" />
                      <div>
                        <p className="text-sm text-gray-600">E-mail</p>
                        <p className="font-medium">{selectedDepartment.email || 'Não informado'}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 text-green-700 mr-3" />
                      <div>
                        <p className="text-sm text-gray-600">Telefone</p>
                        <p className="font-medium">{selectedDepartment.telefone || 'Não informado'}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-5 w-5 text-green-700 mr-3" />
                      <div>
                        <p className="text-sm text-gray-600">Chefe do Departamento</p>
                        <p className="font-medium">{selectedDepartment.chefe_de_departamento || 'Não informado'}</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default DepartmentsPage;
