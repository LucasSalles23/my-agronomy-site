import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Building, 
  Users, 
  BookOpen, 
  FlaskConical,
  ArrowRight,
  Mail,
  Phone
} from 'lucide-react'

const DepartmentsPage = ({ onProfessorClick }) => {
  const [selectedDepartment, setSelectedDepartment] = useState(null)

  const departments = [
    {
      id: 1,
      name: "Ciência do Solo",
      description: "Desenvolve atividades nas áreas de Solos; Fertilização de Culturas; Nutrição Mineral Vegetal; Microbiologia do solo, incluindo características minerais, físicas, químicas e biológicas.",
      disciplines: [
        {
          name: "Fertilidade do Solo",
          professors: [
            { name: "Prof. Carlos Eduardo Pellegrino Cerri", specialization: "Matéria Orgânica do Solo" },
            { name: "Prof. Paulo Sérgio Pavinato", specialization: "Fertilidade do Solo" }
          ]
        },
        {
          name: "Microbiologia do Solo",
          professors: [
            { name: "Prof. Fernando Dini Andreote", specialization: "Microbiologia Molecular" }
          ]
        },
        {
          name: "Manejo e Conservação do Solo",
          professors: [
            { name: "Prof. Maurício Roberto Cherubin", specialization: "Manejo e saúde do solo" }
          ]
        }
      ],
      contact: {
        email: "solos@usp.br",
        phone: "(19) 3417-2100",
        head: "Prof. Fernando Dini Andreote"
      },
      stats: {
        professors: 22,
        students: 150,
        courses: 8
      }
    },
    {
      id: 2,
      name: "Genética",
      description: "Desenvolve atividades nas áreas de Genética e Melhoramento de Plantas, Genética Quantitativa, Genética e Genômica de Populações, Estatística Genética, Genética de Microrganismos.",
      disciplines: [
        {
          name: "Melhoramento de Plantas",
          professors: [
            { name: "Prof. Roberto Fritsche-Neto", specialization: "Melhoramento de Plantas" }
          ]
        },
        {
          name: "Genética Molecular",
          professors: [
            { name: "Prof. Maria Lucia Carneiro Vieira", specialization: "Genética Molecular" }
          ]
        },
        {
          name: "Fisiologia Vegetal",
          professors: [
            { name: "Prof. Marina Luciana Abreu de Melo", specialization: "Fisiologia Vegetal" }
          ]
        }
      ],
      contact: {
        email: "genetica@usp.br",
        phone: "(19) 3447-8621",
        head: "Prof. Roberto Fritsche-Neto"
      },
      stats: {
        professors: 15,
        students: 120,
        courses: 6
      }
    },
    {
      id: 3,
      name: "Fitopatologia e Nematologia",
      description: "Desenvolve atividades nas áreas de Fitoplasmas de bactérias patogênicas vegetais; Doenças Pós-Colheita; Epidemiologia e Controle de Doenças de Plantas; Patologia Bioquímica e Fisiológica de Plantas.",
      disciplines: [
        {
          name: "Epidemiologia de Doenças",
          professors: [
            { name: "Prof. Lilian Amorim", specialization: "Epidemiologia" }
          ]
        },
        {
          name: "Nematologia Vegetal",
          professors: [
            { name: "Prof. Tiago Osório Ferreira", specialization: "Nematologia Vegetal" }
          ]
        },
        {
          name: "Virologia Vegetal",
          professors: [
            { name: "Prof. Jorge Rezende", specialization: "Virologia Vegetal" }
          ]
        }
      ],
      contact: {
        email: "fitopatologia@usp.br",
        phone: "(19) 3429-4124",
        head: "Prof. Lilian Amorim"
      },
      stats: {
        professors: 18,
        students: 90,
        courses: 7
      }
    },
    {
      id: 4,
      name: "Ciências Florestais",
      description: "Desenvolve atividades nas áreas de Silvicultura; Gestão florestal; Ecologia e Tecnologia Aplicada de Produtos Florestais, com o objetivo de avaliar, planejar e gerenciar um uso e conservação sustentável dos recursos florestais.",
      disciplines: [
        {
          name: "Manejo Florestal",
          professors: [
            { name: "Prof. Luiz Carlos Estraviz Rodriguez", specialization: "Manejo Florestal" }
          ]
        },
        {
          name: "Silvicultura",
          professors: [
            { name: "Prof. José Leonardo Gonçalves", specialization: "Silvicultura" }
          ]
        },
        {
          name: "Tecnologia da Madeira",
          professors: [
            { name: "Prof. Francides Silva", specialization: "Tecnologia da Madeira" }
          ]
        }
      ],
      contact: {
        email: "florestal@usp.br",
        phone: "(19) 3447-6621",
        head: "Prof. José Leonardo Gonçalves"
      },
      stats: {
        professors: 20,
        students: 110,
        courses: 9
      }
    },
    {
      id: 5,
      name: "Produção Vegetal",
      description: "Desenvolve atividades nas áreas de Irrigação; Modelagem de Culturas; Agricultura orgânica; Ciência de plantas daninhas; Horticultura; Plantas Medicinais e Aromáticas; Produção, Análise e Processamento de Sementes.",
      disciplines: [
        {
          name: "Horticultura",
          professors: [
            { name: "Prof. Simone Rodrigues", specialization: "Horticultura" }
          ]
        },
        {
          name: "Plantas Daninhas",
          professors: [
            { name: "Prof. Pedro Christoffoleti", specialization: "Plantas Daninhas" }
          ]
        },
        {
          name: "Fisiologia Pós-Colheita",
          professors: [
            { name: "Prof. Ricardo Kluge", specialization: "Fisiologia Pós-Colheita" }
          ]
        }
      ],
      contact: {
        email: "producao@usp.br",
        phone: "(19) 3447-8530",
        head: "Prof. Ricardo Kluge"
      },
      stats: {
        professors: 25,
        students: 180,
        courses: 12
      }
    },
    {
      id: 6,
      name: "Entomologia e Acarologia",
      description: "Desenvolve atividades em três áreas principais de pesquisa: Taxonomia de Insetos e Bioecologia; Interações Artrópodes-Planta-Microrganismos; Estratégias para Manejo de Pragas de Insetos.",
      disciplines: [
        {
          name: "Controle Biológico de Pragas",
          professors: [
            { name: "Prof. José Roberto Postali Parra", specialization: "Controle Biológico" }
          ]
        },
        {
          name: "Ecologia de Insetos",
          professors: [
            { name: "Prof. Wesley Godoy", specialization: "Ecologia de Insetos" }
          ]
        },
        {
          name: "Manejo Integrado de Pragas",
          professors: [
            { name: "Prof. Celso Omoto", specialization: "Manejo de Resistência" }
          ]
        }
      ],
      contact: {
        email: "entomologia@usp.br",
        phone: "(19) 3429-4199",
        head: "Prof. José Roberto Postali Parra"
      },
      stats: {
        professors: 16,
        students: 85,
        courses: 5
      }
    }
  ]

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
          /* Departments Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {departments.map((dept) => (
              <div key={dept.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Building className="h-6 w-6 text-green-700" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 ml-3">
                      {dept.name}
                    </h3>
                  </div>

                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {dept.description}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-700">{dept.stats.professors}</div>
                      <div className="text-xs text-gray-600">Professores</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-700">{dept.stats.students}</div>
                      <div className="text-xs text-gray-600">Estudantes</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-700">{dept.stats.courses}</div>
                      <div className="text-xs text-gray-600">Disciplinas</div>
                    </div>
                  </div>

                  {/* Disciplines Preview */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {dept.disciplines.slice(0, 3).map((discipline, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {discipline.name}
                        </Badge>
                      ))}
                      {dept.disciplines.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{dept.disciplines.length - 3} mais
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
        ) : (
          /* Department Detail */
          <div className="max-w-4xl mx-auto">
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
                  <h1 className="text-3xl font-bold">{selectedDepartment.name}</h1>
                </div>
                <p className="text-green-100 text-lg">{selectedDepartment.description}</p>
              </div>

              <div className="p-6">
                {/* Stats */}
                <div className="grid grid-cols-3 gap-6 mb-8">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Users className="h-8 w-8 text-green-700 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{selectedDepartment.stats.professors}</div>
                    <div className="text-gray-600">Professores</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <Users className="h-8 w-8 text-green-700 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{selectedDepartment.stats.students}</div>
                    <div className="text-gray-600">Estudantes</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <BookOpen className="h-8 w-8 text-green-700 mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{selectedDepartment.stats.courses}</div>
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
                      {selectedDepartment.disciplines.map((discipline, discIndex) => (
                        <div key={discIndex} className="bg-gray-50 p-4 rounded-lg shadow-sm">
                          <h4 className="text-lg font-semibold text-gray-800 mb-3">{discipline.name}</h4>
                          <div className="space-y-3">
                            {discipline.professors.map((prof, profIndex) => (
                              <div key={profIndex} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors">
                                <div>
                                  <p className="font-medium text-gray-900">{prof.name}</p>
                                  <p className="text-sm text-gray-600">{prof.specialization}</p>
                                </div>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => onProfessorClick && onProfessorClick(prof)}
                                >
                                  Ver perfil
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="mt-8 p-6 bg-gray-50 rounded-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Informações de Contato</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 text-green-700 mr-3" />
                      <div>
                        <p className="text-sm text-gray-600">E-mail</p>
                        <p className="font-medium">{selectedDepartment.contact.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 text-green-700 mr-3" />
                      <div>
                        <p className="text-sm text-gray-600">Telefone</p>
                        <p className="font-medium">{selectedDepartment.contact.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-5 w-5 text-green-700 mr-3" />
                      <div>
                        <p className="text-sm text-gray-600">Chefe do Departamento</p>
                        <p className="font-medium">{selectedDepartment.contact.head}</p>
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

export default DepartmentsPage
