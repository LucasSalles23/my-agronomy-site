import { useState, useEffect } from 'react';

import Header from './components/Header';
import Hero from './components/Hero';
import NewsSection from './components/NewsSection';
import OpportunitiesSection from './components/OpportunitiesSection';
import ProfessorsSection from './components/ProfessorsSection';
import DepartmentsPage from './components/DepartmentsPage';
import OpportunityDetail from './components/OpportunityDetail';
import ProfessorProfile from './components/ProfessorProfile';
import NewsPage from './components/NewsPage';
import NewsDetail from './components/NewsDetail';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [selectedProfessor, setSelectedProfessor] = useState(null);
  const [selectedNews, setSelectedNews] = useState(null);
  const [professors, setProfessors] = useState([]);

  // --- BUSCA PROFESSORES ---
  useEffect(() => {
    const fetchProfessors = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/professors' );
        const data = await response.json();
        setProfessors(data);
      } catch (error) {
        console.error("Erro ao buscar professores:", error);
        setProfessors([]);
      }
    };
    fetchProfessors();
  }, []);

  // --- HANDLERS ---

  // =================================================================================
  // CORREÇÃO APLICADA AQUI
  // A versão antiga (que causava a "travada") foi comentada para você não perder nada.
  // A nova versão, mais rápida, está ativa logo abaixo.
  // =================================================================================

  /*
  // VERSÃO ANTIGA - Buscava os dados ANTES de mudar a página
  const handleOpportunityClick = async (opportunityId) => {
    console.log("Clicou na oportunidade com ID:", opportunityId);
    try {
      const response = await fetch(`http://localhost:5000/api/oportunidades_detalhes/${opportunityId}` );
      console.log("Resposta do fetch:", response);
      if (!response.ok) throw new Error(`Oportunidade não encontrada: ${response.status}`);

      const data = await response.json();
      console.log("Dados recebidos da API:", data);
      setSelectedOpportunity(data);
      setCurrentPage('opportunity-detail');
    } catch (err) {
      console.error("Erro ao buscar oportunidade detalhada:", err);
      alert("Não foi possível carregar a oportunidade. Tente novamente.");
    }
  };
  */

  // NOVA VERSÃO - Muda a página IMEDIATAMENTE e deixa a página de detalhes buscar os dados.
  const handleOpportunityClick = (opportunityId) => {
    console.log("[App.jsx] Oportunidade selecionada. Guardando ID:", opportunityId);
    setSelectedOpportunity({ id: opportunityId }); // Apenas guarda o ID
    setCurrentPage('opportunity-detail'); // Muda a página na hora
  };


  // Clique em um professor
  const handleProfessorClick = (professorId) => {
    const professor = professors.find(
      prof => prof.id === professorId || prof.professor_id === professorId
    );
    console.log(`[App.jsx] Clique no Professor`, { clicado_id: professorId, professor_encontrado: professor });
    setSelectedProfessor(professor);
    setCurrentPage('professor-profile');
  };

  // Clique em uma notícia
  const handleNewsClick = (newsId) => {
    setSelectedNews(newsId);
    setCurrentPage('news-detail');
  };

  // Navegação genérica entre páginas
  const handleNavigation = (page) => {
    setCurrentPage(page);
    setSelectedOpportunity(null);
    setSelectedProfessor(null);
    setSelectedNews(null);
  };

  // --- RENDERIZAÇÃO CONDICIONAL ---
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <Hero />
            <NewsSection onNewsClick={handleNewsClick} />
            <OpportunitiesSection
              onOpportunityClick={handleOpportunityClick}
              onNavigate={handleNavigation} // ✅ Adicionado
            />
            <DepartmentsPage
              onProfessorClick={handleProfessorClick}
              professors={professors}
            />
          </>
        );

      case 'departments':
        return <DepartmentsPage onProfessorClick={handleProfessorClick} professors={professors} />;

      case 'news':
        return <NewsPage onBack={() => handleNavigation('home')} onNewsClick={handleNewsClick} />;

      case 'news-detail':
        return <NewsDetail newsId={selectedNews} onBack={() => handleNavigation('news')} />;

      case 'opportunities':
        return (
          <OpportunitiesSection
            onOpportunityClick={handleOpportunityClick}
            onNavigate={handleNavigation} // ✅ Adicionado
          />
        );

      case 'professors':
        return <ProfessorsSection onProfessorClick={handleProfessorClick} professors={professors} />;

      case 'opportunity-detail':
        return (
          <OpportunityDetail
            opportunity={selectedOpportunity}
            onBack={() => handleNavigation('opportunities')} // ✅ volta para oportunidades
          />
        );

      case 'professor-profile':
        console.log(`[App.jsx] Renderizando Profile`, { enviando_professor: selectedProfessor });
        return (
          <ProfessorProfile
            professor={selectedProfessor}
            onBack={() => handleNavigation('home')}
            onOpportunityClick={handleOpportunityClick}
          />
        );

      default:
        return (
          <>
            <Hero />
            <NewsSection onNewsClick={handleNewsClick} />
            <OpportunitiesSection
              onOpportunityClick={handleOpportunityClick}
              onNavigate={handleNavigation} // ✅ Garante fallback
            />
            <ProfessorsSection onProfessorClick={handleProfessorClick} professors={professors} />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header onNavigate={handleNavigation} />
      <main>
        {renderCurrentPage()}
      </main>
      <Footer />
    </div>
  );
}

export default App;
