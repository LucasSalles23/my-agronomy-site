import { useEffect, useState } from 'react'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Mail, Search, User, Building } from 'lucide-react'

const ProfessorsSection = ({ onProfessorClick }) => {
  const [professors, setProfessors] = useState([])
  const [search, setSearch] = useState('')
  const [departmentFilter, setDepartmentFilter] = useState('')

  // Buscar professores do backend
  useEffect(() => {
    axios.get('http://localhost:5000/api/professors') // altere se seu endpoint for diferente
      .then((res) => setProfessors(res.data))
      .catch((err) => console.error(err))
  }, [])

  // Filtrar professores por busca e departamento
  const filteredProfessors = professors.filter(p => {
    const matchesNameOrSpec = p.nome.toLowerCase().includes(search.toLowerCase()) ||
                              p.especializacao.toLowerCase().includes(search.toLowerCase())
    const matchesDepartment = departmentFilter ? p.departamento === departmentFilter : true
    return matchesNameOrSpec && matchesDepartment
  })

  return (
    <section className="py-16 bg-white" id="professores">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Nossos Professores
          </h2>
          <p className="text-xl text-gray-600">
            Conheça os professores e suas áreas de especialização
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Buscar professor por nome ou especialização..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <select
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
              >
                <option value="">Todos os Departamentos</option>
                <option value="Ciência do Solo">Ciência do Solo</option>
                <option value="Genética">Genética</option>
                <option value="Fitopatologia e Nematologia">Fitopatologia</option>
              </select>
              <Button className="bg-green-700 hover:bg-green-800">
                Buscar
              </Button>
            </div>
          </div>
        </div>

        {/* Professors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProfessors.map((professor) => (
            <div key={professor.id} className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="p-6">
                {/* Professor Avatar */}
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <User className="h-8 w-8 text-green-700" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                      {professor.nome}
                    </h3>
                    <p className="text-sm text-gray-600">{professor.cargo}</p>
                  </div>
                </div>

                {/* Department */}
                <div className="flex items-center mb-3 text-gray-600">
                  <Building className="h-4 w-4 mr-2" />
                  <span className="text-sm">{professor.departamento}</span>
                </div>

                {/* Specializations */}
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Especializações:</p>
                  <div className="flex flex-wrap gap-1">
                    {professor.especializacao.split(',').map((spec, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {spec.trim()}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="flex justify-between items-center mb-4 text-sm text-gray-600">
                  <span>{professor.estudantesOrientados} estudantes orientados</span>
                  {professor.oportunidades && (
                    <Badge className="bg-green-100 text-green-800">
                      Vagas disponíveis
                    </Badge>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2">
                  <Button className="w-full bg-green-700 hover:bg-green-800">
                    <Mail className="h-4 w-4 mr-2" />
                    Entrar em contato
                  </Button>
                  <Button variant="outline" className="w-full" onClick={() => onProfessorClick && onProfessorClick(professor.id)}>
                    Ver perfil completo
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="border-green-700 text-green-700 hover:bg-green-50">
            Ver todos os professores
          </Button>
        </div>
      </div>
    </section>
  )
}

export default ProfessorsSection
