import { useState, useEffect } from 'react'; // Importa useState e useEffect
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ArrowLeft, Mail, Phone, Building, BookOpen, Users, Award, ExternalLink, MessageCircle
} from 'lucide-react';

// O componente espera receber o objeto `professor` básico do App.jsx
const ProfessorProfile = ({ professor, onBack }) => {
  const [showContactForm, setShowContactForm] = useState(false);

  // 1. ESTADOS PARA DADOS DETALHADOS, CARREGAMENTO E ERRO
  const [detailedData, setDetailedData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. EFEITO PARA BUSCAR OS DADOS DETALHADOS DO PROFESSOR NA API
  useEffect(() => {
    // Se não houver um professor base, não faz nada.
    if (!professor || !(professor.id || professor.professor_id)) {
      setLoading(false);
      return;
    }

    const fetchDetailedData = async () => {
      setLoading(true);
      setError(null);
      const professorId = professor.id || professor.professor_id;

      try {
        // Use a rota que retorna TODOS os detalhes de um professor
        const response = await fetch(`http://localhost:5000/api/professor_profile/${professorId}`);
        if (!response.ok) {
          throw new Error(`Falha ao buscar detalhes do professor: ${response.status}`);
        }
        const data = await response.json();
        setDetailedData(data);
      } catch (err) {
        console.error("Erro na busca detalhada:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDetailedData();
  }, [professor]); // Roda o efeito sempre que o objeto `professor` mudar

  // 3. RENDERIZAÇÃO CONDICIONAL
  // Se o professor base não existir
  if (!professor) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 text-center">
        <p>Nenhum professor selecionado.</p>
        <Button onClick={onBack} variant="outline" className="mt-4">Voltar</Button>
      </div>
    );
  }

  // Enquanto os dados detalhados estão carregando
  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 text-center">
        <p>Carregando perfil detalhado de {professor.nome || professor.name}...</p>
      </div>
    );
  }

  // Se ocorrer um erro na busca
  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 text-center">
        <p className="text-red-600">Erro ao carregar o perfil: {error}</p>
        <Button onClick={onBack} variant="outline" className="mt-4">Voltar</Button>
      </div>
    );
  }

  // 4. COMBINA OS DADOS BÁSICOS COM OS DETALHADOS
  // Isso garante que o componente não quebre se algum campo for nulo.
  const mergedProfessor = {
    name: professor.nome || professor.name,
    title: professor.cargo || professor.title,
    department: professor.departamento || professor.department,
    email: professor.email,
    specializations: professor.especializacao ? professor.especializacao.split(',') : [],
    // Usa os dados detalhados da API, com fallback para os dados básicos ou um valor padrão
    phone: detailedData?.telefone || '+55 (XX) XXXX-XXXX',
    office: detailedData?.office || 'Sala não informada',
    lattes: detailedData?.lattes || '#',
    researchGate: detailedData?.research_gate || '#',
    bio: detailedData?.biografia || 'Biografia não disponível.',
    // Campos que são listas/arrays
    courses: detailedData?.disciplinas ? detailedData.disciplinas.split(',') : [],
    researchProjects: detailedData?.projetos_pesquisa ? detailedData.projetos_pesquisa.split(',') : [],
    currentStudents: detailedData?.estudantes_orientados || [], // Assumindo que a API retorna um array de objetos
    publications: detailedData?.publicacoes ? detailedData.publicacoes.split(',') : [],
    availableOpportunities: detailedData?.oportunidades_disponiveis || [], // Assumindo que a API retorna um array de objetos
  };

  // =================================================================================
  // A PARTIR DAQUI, SEU CÓDIGO JSX PERMANECE IDÊNTICO, APENAS USANDO `mergedProfessor`
  // =================================================================================

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-4 text-green-700 hover:text-green-800"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar aos professores
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          {/* Professor Card */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <div className="text-center mb-6">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-12 w-12 text-green-700" />
              </div>
              <h1 className="text-xl font-bold text-gray-900 mb-2">{mergedProfessor.name}</h1>
              <p className="text-gray-600 mb-2">{mergedProfessor.title}</p>
              <Badge variant="secondary">{mergedProfessor.department}</Badge>
            </div>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center text-gray-600">
                <Mail className="h-4 w-4 mr-3" />
                <a href={`mailto:${mergedProfessor.email}`} className="text-sm hover:text-green-700">
                  {mergedProfessor.email}
                </a>
              </div>
              <div className="flex items-center text-gray-600">
                <Phone className="h-4 w-4 mr-3" />
                <span className="text-sm">{mergedProfessor.phone}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Building className="h-4 w-4 mr-3" />
                <span className="text-sm">{mergedProfessor.office}</span>
              </div>
            </div>

            {/* External Links */}
            <div className="space-y-2 mb-6">
              <a href={mergedProfessor.lattes} target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-600 hover:text-blue-800 text-sm">
                <ExternalLink className="h-4 w-4 mr-2" />
                Currículo Lattes
              </a>
              <a href={mergedProfessor.researchGate} target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-600 hover:text-blue-800 text-sm">
                <ExternalLink className="h-4 w-4 mr-2" />
                ResearchGate
              </a>
            </div>

            {/* Contact Button */}
            <Button onClick={() => setShowContactForm(!showContactForm)} className="w-full bg-green-700 hover:bg-green-800">
              <MessageCircle className="h-4 w-4 mr-2" />
              Entrar em contato
            </Button>
          </div>

          {/* Specializations */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Especializações</h3>
            <div className="flex flex-wrap gap-2">
              {mergedProfessor.specializations.map((spec, index) => (
                <Badge key={index} variant="outline" className="text-xs">{spec}</Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Biography */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Biografia</h2>
            <p className="text-gray-700 leading-relaxed">{mergedProfessor.bio}</p>
          </div>

          {/* Courses */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              <BookOpen className="h-5 w-5 inline mr-2" />
              Disciplinas Lecionadas
            </h2>
            <ul className="space-y-2">
              {mergedProfessor.courses.map((course, index) => (
                <li key={index} className="text-gray-700">• {course}</li>
              ))}
            </ul>
          </div>

          {/* Research Projects */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              <Award className="h-5 w-5 inline mr-2" />
              Projetos de Pesquisa
            </h2>
            <div className="space-y-4">
              {mergedProfessor.researchProjects.map((project, index) => (
                <div key={index} className="border-l-4 border-green-500 pl-4">
                  <h3 className="font-medium text-gray-900">{project.title}</h3>
                  <p className="text-sm text-gray-600">
                    Financiamento: {project.funding} | Período: {project.period}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Current Students */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              <Users className="h-5 w-5 inline mr-2" />
              Estudantes Orientados
            </h2>
            <div className="space-y-3">
              {mergedProfessor.currentStudents.map((student, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{student.name}</p>
                    <p className="text-sm text-gray-600">{student.project}</p>
                  </div>
                  <Badge className={student.type === 'IC' ? 'bg-purple-100 text-purple-800' : student.type === 'Estágio' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}>
                    {student.type}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          {/* Available Opportunities */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Oportunidades Disponíveis</h2>
            {professor.oportunidades && professor.oportunidades.length > 0 ? (
              <div className="space-y-4">
                {professor.oportunidades.map((opportunity, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge className={
                        opportunity.tipo === 'IC' ? 'bg-purple-100 text-purple-800' :
                          opportunity.tipo === 'Estágio' ? 'bg-blue-100 text-blue-800' :
                            'bg-green-100 text-green-800'
                      }>
                        {opportunity.tipo}
                      </Badge>
                      <h3 className="font-medium text-gray-900">{opportunity.titulo}</h3>
                    </div>
                    <p className="text-gray-700 text-sm mb-3">{opportunity.descricao}</p>
                    <Button size="sm" className="bg-green-700 hover:bg-green-800">
                      Ver detalhes da vaga
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">Não há oportunidades disponíveis no momento.</p>
            )}
          </div>


          {/* Recent Publications */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Publicações Recentes</h2>
            <ul className="space-y-2">
              {mergedProfessor.publications.map((publication, index) => (
                <li key={index} className="text-gray-700 text-sm">• {publication}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Contact Form Modal (seu código original) */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          {/* ... seu formulário de contato aqui ... */}
        </div>
      )}
    </div>
  );
};

export default ProfessorProfile;
