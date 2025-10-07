import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ArrowLeft, Mail, Phone, Building, BookOpen, Users, Award, ExternalLink, MessageCircle
} from 'lucide-react';

// =================================================================================
// ALTERAÇÃO 1 DE 2: Adicionado 'onOpportunityClick' aqui.
// =================================================================================
const ProfessorProfile = ({ professor, onBack, onOpportunityClick }) => {
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
    researchProjects: detailedData?.projetos_pesquisa || [],
    currentStudents: detailedData?.orientacoes || [], // Assumindo que a API retorna um array de objetos
    publications: detailedData?.publicacoes || [],
    oportunidades: detailedData?.oportunidades || [], // Assumindo que a API retorna um array de objetos
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

          {/* Research Projects - VERSÃO CORRIGIDA E FINAL */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              <Award className="h-5 w-5 inline mr-2" />
              Projetos de Pesquisa
            </h2>
            <div className="space-y-4">
              {/* Verificamos se a lista de projetos não está vazia */}
              {mergedProfessor.researchProjects && mergedProfessor.researchProjects.length > 0 ? (
                mergedProfessor.researchProjects.map((project) => (
                  // Usamos project.id como key para melhor performance e consistência
                  <div key={project.id} className="border-l-4 border-green-500 pl-4 py-2 hover:bg-gray-50">
                    {/* 
                      Acessamos as propriedades do objeto 'project' que vêm da API.
                      Os nomes (titulo, financiamento, periodo) correspondem às colunas da sua nova tabela.
                    */}
                    <h3 className="font-medium text-gray-900">{project.titulo}</h3>
                    <p className="text-sm text-gray-600">
                      Financiamento: {project.financiamento || 'Não informado'} | Período: {project.periodo || 'Não informado'}
                    </p>
                  </div>
                ))
              ) : (
                // Mensagem exibida se não houver projetos
                <p className="text-gray-600">Nenhum projeto de pesquisa informado no momento.</p>
              )}
            </div>
          </div>


          {/* Current Students - VERSÃO FINAL */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              <Users className="h-5 w-5 inline mr-2" />
              Estudantes Orientados
            </h2>
            <div className="space-y-3">
              {/* Agora o .map() vai funcionar, pois 'currentStudents' é uma lista de objetos */}
              {mergedProfessor.currentStudents.length > 0 ? (
                mergedProfessor.currentStudents.map((student, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100">
                    <div>
                      {/* Usamos os nomes das colunas da nova tabela */}
                      <p className="font-medium text-gray-900">{student.nome_estudante}</p>
                      <p className="text-sm text-gray-600">{student.titulo_projeto || 'Projeto não especificado'}</p>
                    </div>
                    {/* Exibindo o tipo e o período */}
                    <div className="text-right">
                      <Badge className={
                        student.tipo_orientacao === 'IC' ? 'bg-purple-100 text-purple-800' :
                          student.tipo_orientacao === 'Mestrado' ? 'bg-blue-100 text-blue-800' :
                            'bg-green-100 text-green-800'
                      }>
                        {student.tipo_orientacao}
                      </Badge>
                      <p className="text-xs text-gray-500 mt-1">{student.periodo}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">Este professor não possui orientandos no momento.</p>
              )}
            </div>
          </div>


          {/* Available Opportunities */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Oportunidades Disponíveis</h2>
            {mergedProfessor.oportunidades && mergedProfessor.oportunidades.length > 0 ? (
              <div className="space-y-4">
                {mergedProfessor.oportunidades.map((opportunity, index) => (
                  <div key={opportunity.id || index} className="border border-gray-200 rounded-lg p-4">
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

                    {/* ================================================================================= */}
                    {/* ALTERAÇÃO 2 DE 2: O botão agora chama a função 'onOpportunityClick'. */}
                    {/* ================================================================================= */}
                    <Button
                      size="sm"
                      className="bg-green-700 hover:bg-green-800"
                      onClick={() => onOpportunityClick(opportunity.id)}
                    >
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
            <div className="space-y-4">
              {mergedProfessor.publications && mergedProfessor.publications.length > 0 ? (
                mergedProfessor.publications.map((pub) => (
                  <div key={pub.id}>
                    <a
                      href={pub.link_publicacao || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-gray-900 hover:text-green-700 transition-colors"
                    >
                      {pub.titulo}
                    </a>
                    <p className="text-sm text-gray-600">{pub.autores}</p>
                    <p className="text-xs text-gray-500">
                      {pub.revista_ou_conferencia}, {pub.ano}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">Nenhuma publicação informada.</p>
              )}
            </div>
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
