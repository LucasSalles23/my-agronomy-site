import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Mail, Search, User, Building } from 'lucide-react'

const ProfessorsSection = ({ onProfessorClick }) => {
  const [professors, setProfessors] = useState([])
  const [departments, setDepartments] = useState([]) // ✅ estado para departamentos
  const [search, setSearch] = useState('')
  const [departmentFilter, setDepartmentFilter] = useState('')
  const [visibleCount, setVisibleCount] = useState(10)

  // Fetch de professores
  useEffect(() => {
    axios.get('https://my-agronomy-site-production.up.railway.app/api/professors')
      .then(res => {
        console.log("[ProfessorsSection] Professores recebidos:", res.data)
        setProfessors(res.data)
      })
      .catch(err => console.error("Erro ao buscar professores:", err))
  }, [])

  // Fetch de departamentos
  useEffect(() => {
    axios.get('https://my-agronomy-site-production.up.railway.app/api/departamentos')
      .then(res => {
        console.log("[ProfessorsSection] Departamentos recebidos:", res.data)
        setDepartments(res.data)
      })
      .catch(err => console.error("Erro ao buscar departamentos:", err))
  }, [])

  // Enriquecer professores com o nome do departamento
  const professorsWithDepartment = professors.map(p => {
    const dept = departments.find(d => d.id === p.departamento_id)
    return { ...p, departamentoNome: dept ? dept.nome : 'Desconhecido' }
  })

  // Filtrar professores
  const filteredProfessors = professorsWithDepartment.filter(p => {
    const matchesNameOrSpec =
      p.nome.toLowerCase().includes(search.toLowerCase()) ||
      p.especializacao.toLowerCase().includes(search.toLowerCase())
    const matchesDepartment = departmentFilter ? p.departamentoNome === departmentFilter : true
    return matchesNameOrSpec && matchesDepartment
  })

  // Professores visíveis
  const visibleProfessors = filteredProfessors.slice(0, visibleCount)

  return (
    <section className="py-16 bg-white" id="professores">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Nossos Professores
          </h2>
          <p className="text-xl text-gray-600">
            Conheça os professores e suas áreas de especialização
          </p>
        </div>

        {/* Busca e Filtro */}
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
                {departments.map(d => (
                  <option key={d.id} value={d.nome}>{d.nome}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Grid de Professores + Anúncios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleProfessors.map((professor, index) => (
            <React.Fragment key={professor.id}>
              {/* Card do Professor */}
              <div className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="p-6">
                  {/* Avatar */}
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

                  {/* Departamento */}
                  <div className="flex items-center mb-3 text-gray-600">
                    <Building className="h-4 w-4 mr-2" />
                    <span className="text-sm">{professor.departamentoNome}</span>
                  </div>

                  {/* Especializações */}
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Especializações:</p>
                    <div className="flex flex-wrap gap-1">
                      {professor.especializacao.split(',').map((spec, i) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {spec.trim()}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Estatísticas */}
                  <div className="flex justify-between items-center mb-4 text-sm text-gray-600">
                    <span>{professor.estudantesOrientados} estudantes orientados</span>
                    {professor.oportunidades > 0 && (
                      <Badge className="bg-green-100 text-green-800">
                        Vagas disponíveis
                      </Badge>
                    )}
                  </div>

                  {/* Ações */}
                  <div className="flex flex-col gap-2">
                    <Button className="w-full bg-green-700 hover:bg-green-800">
                      <Mail className="h-4 w-4 mr-2" />
                      Entrar em contato
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => onProfessorClick && onProfessorClick(professor.id)}
                    >
                      Ver perfil completo
                    </Button>
                  </div>
                </div>
              </div>

              {/* Inserir anúncio a cada 4 professores */}
              {(index + 1) % 4 === 0 && (
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

        {/* Botão Ver mais */}
        {visibleCount < filteredProfessors.length && (
          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              className="border-green-700 text-green-700 hover:bg-green-700 hover:text-white cursor-pointer"
              onClick={() => setVisibleCount(prev => prev + 10)}
            >
              Ver mais professores
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}

export default ProfessorsSection
