import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ArrowLeft, Mail, Phone, Building, BookOpen, Users, Award, ExternalLink, MessageCircle
} from 'lucide-react';

const ProfessorProfile = ({ professor, onBack, onOpportunityClick }) => {
  const [showContactForm, setShowContactForm] = useState(false);
  const [detailedData, setDetailedData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // =================================================================================
    // [LOG 1] O que o componente está recebendo como prop 'professor'?
    // =================================================================================
    console.log('[LOG 1] Objeto "professor" recebido do App.jsx:', professor);

    if (!professor || !(professor.id || professor.professor_id)) {
      console.log('[LOG 1.1] Prop "professor" inválida ou sem ID. Abortando busca.');
      setLoading(false);
      return;
    }

    const fetchDetailedData = async () => {
      setLoading(true);
      setError(null);

      const professorId = professor.id || professor.professor_id;

      // =================================================================================
      // [LOG 2] Qual ID foi extraído para usar na URL?
      // =================================================================================
      console.log('[LOG 2] ID extraído para a URL:', professorId);

      const apiUrl = `https://my-agronomy-site-production.up.railway.app/api/professor_profile/${professorId}`;


      // =================================================================================
      // [LOG 3] Qual URL final estamos tentando acessar?
      // =================================================================================
      console.log('[LOG 3] Tentando fazer fetch da URL:', apiUrl);

      try {
        const response = await fetch(apiUrl);
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
  }, [professor]);

  if (!professor) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 text-center">
        <p>Nenhum professor selecionado.</p>
        <Button onClick={onBack} variant="outline" className="mt-4">Voltar</Button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 text-center">
        <p>Carregando perfil detalhado de {professor.nome || professor.name}...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 text-center">
        <p className="text-red-600">Erro ao carregar o perfil: {error}</p>
        <Button onClick={onBack} variant="outline" className="mt-4">Voltar</Button>
      </div>
    );
  }

  // Adicionando uma verificação para o caso de o fetch ter sucesso, mas não retornar dados
  if (!detailedData) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 text-center">
        <p>Não foi possível carregar os dados detalhados do perfil.</p>
        <Button onClick={onBack} variant="outline" className="mt-4">Voltar</Button>
      </div>
    );
  }

  // A sua lógica de 'mergedProfessor' e o resto do JSX permanecem intactos.
  const mergedProfessor = {
    ...detailedData,
    specializations: detailedData.especializacao ? detailedData.especializacao.split(',').map(s => s.trim()).filter(s => s) : [],
    oportunidades: detailedData.oportunidades || [],
    orientacoes: detailedData.orientacoes || [],
    projetos_pesquisa: detailedData.projetos_pesquisa || [],
    publicacoes: detailedData.publicacoes || [],
    disciplinas: detailedData.disciplinas || [],
  };

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
              <h1 className="text-xl font-bold text-gray-900 mb-2">{mergedProfessor.nome}</h1>
              <p className="text-gray-600 mb-2">{mergedProfessor.cargo}</p>
              <Badge variant="secondary">{mergedProfessor.departamento}</Badge>
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
                <span className="text-sm">{mergedProfessor.telefone}</span>
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
              <a href={mergedProfessor.research_gate} target="_blank" rel="noopener noreferrer" className="flex items-center text-blue-600 hover:text-blue-800 text-sm">
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
            <p className="text-gray-700 leading-relaxed">{mergedProfessor.biografia}</p>
          </div>

          {/* Courses */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              <BookOpen className="h-5 w-5 inline mr-2" />
              Disciplinas Lecionadas
            </h2>
            <ul className="space-y-2">
              {mergedProfessor.disciplinas.length > 0 ? mergedProfessor.disciplinas.map((disciplina) => (
                <li key={disciplina.id} className="text-gray-700">• {disciplina.nome} ({disciplina.codigo_disciplina})</li>
              )) : <p className="text-gray-600">Nenhuma disciplina informada.</p>}
            </ul>
          </div>

          {/* Research Projects */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              <Award className="h-5 w-5 inline mr-2" />
              Projetos de Pesquisa
            </h2>
            <div className="space-y-4">
              {mergedProfessor.projetos_pesquisa.length > 0 ? mergedProfessor.projetos_pesquisa.map((project) => (
                <div key={project.id} className="border-l-4 border-green-500 pl-4">
                  <h3 className="font-medium text-gray-900">{project.titulo}</h3>
                  <p className="text-sm text-gray-600">
                    Financiamento: {project.financiamento || 'Não informado'} | Período: {project.periodo || 'Não informado'}
                  </p>
                </div>
              )) : <p className="text-gray-600">Nenhum projeto de pesquisa informado.</p>}
            </div>
          </div>

          {/* Current Students */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              <Users className="h-5 w-5 inline mr-2" />
              Estudantes Orientados
            </h2>
            <div className="space-y-3">
              {mergedProfessor.orientacoes.length > 0 ? mergedProfessor.orientacoes.map((student) => (
                <div key={student.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{student.nome_estudante}</p>
                    <p className="text-sm text-gray-600">{student.titulo_projeto || 'Projeto não especificado'}</p>
                  </div>
                  <Badge className={student.tipo_orientacao === 'IC' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}>
                    {student.tipo_orientacao}
                  </Badge>
                </div>
              )) : <p className="text-gray-600">Nenhum orientando informado.</p>}
            </div>
          </div>

          {/* Available Opportunities */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Oportunidades Disponíveis</h2>
            {mergedProfessor.oportunidades.length > 0 ? (
              <div className="space-y-4">
                {mergedProfessor.oportunidades.map((opportunity) => (
                  <div key={opportunity.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-2">
                      <Badge className={opportunity.tipo === 'IC' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'}>
                        {opportunity.tipo}
                      </Badge>
                      <h3 className="font-medium text-gray-900">{opportunity.titulo}</h3>
                    </div>
                    <p className="text-gray-700 text-sm mb-3">{opportunity.descricao}</p>
                    <Button size="sm" className="bg-green-700 hover:bg-green-800" onClick={() => onOpportunityClick(opportunity.id)}>
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
              {mergedProfessor.publicacoes.length > 0 ? mergedProfessor.publicacoes.map((publication) => (
                <li key={publication.id} className="text-gray-700 text-sm">
                  <a href={publication.link_publicacao || '#'} target="_blank" rel="noopener noreferrer" className="hover:text-green-700 font-medium">{publication.titulo}</a>
                  <p className="text-xs">{publication.autores} ({publication.ano}). In: {publication.revista_ou_conferencia}.</p>
                </li>
              )) : <p className="text-gray-600">Nenhuma publicação informada.</p>}
            </ul>
          </div>
        </div>
      </div>

      {/* Contact Form Modal (seu código original) */}
      {showContactForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl">
            <h2 className="text-xl font-bold mb-4">Contato</h2>
            <p>Formulário de contato aqui...</p>
            <Button onClick={() => setShowContactForm(false)} className="mt-4">Fechar</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfessorProfile;
