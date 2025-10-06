// ARQUIVO: src/components/OpportunityDetail.jsx

import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ArrowLeft, Calendar, User, Building, Mail, Clock,
  DollarSign, FileText, CheckCircle
} from 'lucide-react';

// ==================================================================
// ADIÇÃO 1: FUNÇÕES DE FORMATAÇÃO (HELPERS)
// ==================================================================
const capitalizeFirstLetter = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const capitalizeAllWords = (str) => {
  if (!str) return '';
  return str.toLowerCase().split(' ').map(word =>
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
};


// O componente recebe o objeto 'opportunity' BÁSICO do App.jsx (que tem o ID)
const OpportunityDetail = ({ opportunity, onBack }) => {
  // A sua lógica de busca de dados, que já está correta, permanece intacta.
  const [detailedData, setDetailedData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [applicationSent, setApplicationSent] = useState(false);

  useEffect(() => {
    if (!opportunity || !opportunity.id) {
      setLoading(false);
      setError("Nenhuma oportunidade foi selecionada para detalhar.");
      return;
    }

    const fetchDetailedData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`http://localhost:5000/api/oportunidades_detalhes/${opportunity.id}`);
        setDetailedData(response.data);
      } catch (err) {
        console.error("Erro ao buscar detalhes da oportunidade:", err);
        setError("Não foi possível carregar os detalhes. Tente novamente.");
      } finally {
        setLoading(false);
      }
    };

    fetchDetailedData();
  }, [opportunity]);

  // Sua lógica de renderização de status, intacta.
  if (loading) {
    return <div className="max-w-4xl mx-auto px-4 py-8 text-center"><p>Carregando detalhes da oportunidade...</p></div>;
  }

  if (error) {
    return <div className="max-w-4xl mx-auto px-4 py-8 text-center"><p className="text-red-500">{error}</p><Button onClick={onBack} variant="outline" className="mt-4">Voltar</Button></div>;
  }

  if (!detailedData) {
    return <div className="max-w-4xl mx-auto px-4 py-8 text-center"><p>Oportunidade não encontrada.</p><Button onClick={onBack} variant="outline" className="mt-4">Voltar</Button></div>;
  }

  // Sua preparação de dados, intacta.
  const data = detailedData;
  const requisitosList = data.requisitos ? data.requisitos.split(',').map(item => capitalizeFirstLetter(item.trim())) : [];
  const atividadesList = data.atividades ? data.atividades.split(',').map(item => capitalizeFirstLetter(item.trim())) : [];

  const getTypeColor = (type) => {
    switch (type) {
      case 'Estágio': return 'bg-blue-100 text-blue-800';
      case 'IC': return 'bg-purple-100 text-purple-800';
      case 'PVA': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleApply = () => setApplicationSent(true);

  // ==================================================================
  // SEU JSX ORIGINAL, COM AS FORMATAÇÕES APLICADAS NOS PONTOS CERTOS
  // ==================================================================
  return (
    <div className="max-w-4xl lg:max-w-6xl xl:max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-6">
        <Button variant="ghost" onClick={onBack} className="mb-4 text-green-700 hover:text-green-800">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar às oportunidades
        </Button>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
          <div className="flex items-center gap-3 mb-2 lg:mb-0">

            {/* ===== CORREÇÃO 1: Sigla sempre em maiúsculas ===== */}
            <Badge className={getTypeColor(data.type)}>
              {data.type.toUpperCase()}
            </Badge>

            <h1 className="text-3xl font-bold text-gray-900">
              {/* ===== CORREÇÃO 2: Usando a função correta para o título ===== */}
              {capitalizeAllWords(data.title)}
            </h1>

          </div>
          <div className="text-sm text-gray-500">
            Publicado em {new Date(data.publishDate).toLocaleDateString('pt-BR')}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Descrição da Oportunidade</h2>
            <p className="text-gray-700 leading-relaxed mb-4">{capitalizeFirstLetter(data.description)}</p>
            <p className="text-gray-700 leading-relaxed">
              Esta é uma excelente oportunidade para estudantes que desejam aprofundar seus conhecimentos
              na área de {data.department.toLowerCase()} e ganhar experiência prática em pesquisa
              e desenvolvimento. O candidato selecionado trabalhará diretamente com o professor responsável
              e terá acesso a laboratórios e equipamentos de ponta.
            </p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Requisitos</h2>
            <ul className="space-y-2 text-gray-700">
              {requisitosList.length > 0 ? requisitosList.map((req, i) => (
                <li key={i} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                  {req}
                </li>
              )) : <li className="flex items-start text-gray-500">Requisitos não informados.</li>}
            </ul>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Atividades a serem desenvolvidas</h2>
            <ul className="space-y-2 text-gray-700">
              {atividadesList.length > 0 ? atividadesList.map((act, i) => (
                <li key={i}>• {act}</li>
              )) : <li>Atividades não informadas.</li>}
            </ul>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Professor Responsável</h3>
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-green-700" />
              </div>
              <div className="ml-3">
                <p className="font-medium text-gray-900">{capitalizeAllWords(data.professor)}</p>
                <p className="text-sm text-gray-600">Professor(a)</p>
              </div>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center"><Building className="h-4 w-4 mr-2" /><span>{capitalizeAllWords(data.department)}</span></div>
              <div className="flex items-center"><Mail className="h-4 w-4 mr-2" /><span>{data.email}</span></div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Detalhes da Vaga</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-600"><Clock className="h-4 w-4 mr-2" /><span>Carga Horária</span></div>
                <span className="text-sm font-medium">
                  {/* ADIÇÃO 3: Formatação da Carga Horária */}
                  {data.cargaHoraria ? `${data.cargaHoraria}h/semana` : 'Não informada'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-600"><Calendar className="h-4 w-4 mr-2" /><span>Duração</span></div>
                <span className="text-sm font-medium">{data.duracao || 'Não informada'}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-600">
                  <DollarSign className="h-4 w-4 mr-2" />
                  <span className="text-sm">Bolsa</span>
                </div>
                <span className="text-sm font-medium">
                  {/* 
                    Verifica se o valor da bolsa é numericamente maior que 0.
                    Isso funciona tanto para o número 0 quanto para a string "0".
                  */}
                  {Number(data.bolsa) > 0
                    ? `R$ ${data.bolsa}/mês`
                    : 'Voluntário'
                  }
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Candidatar-se</h3>
            {!applicationSent ? (
              <div className="space-y-4">
                <p className="text-sm text-gray-600">Para se candidatar a esta vaga, clique no botão abaixo.</p>
                <Button onClick={handleApply} className="w-full bg-green-700 hover:bg-green-800"><FileText className="h-4 w-4 mr-2" />Candidatar-se à vaga</Button>
                <Button variant="outline" className="w-full" onClick={() => window.open(`mailto:${data.email}?subject=Interesse na vaga: ${capitalizeFirstLetter(data.title)}`)}><Mail className="h-4 w-4 mr-2" />Contatar professor</Button>
              </div>
            ) : (
              <div className="text-center">
                <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-3" />
                <p className="text-green-700 font-medium mb-2">Candidatura enviada!</p>
                <p className="text-sm text-gray-600">Sua candidatura foi enviada com sucesso.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpportunityDetail;
