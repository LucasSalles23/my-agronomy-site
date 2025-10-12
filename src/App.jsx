/* 



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
  const [news, setNews] = useState([]); // ✅ Novo state para notícias

  // --- BUSCA PROFESSORES ---
  useEffect(() => {
    const fetchProfessors = async () => {
      try {
        const response = await fetch('http://my-agronomy-site-production.up.railway.app/api/professors');
        const data = await response.json();
        setProfessors(data);
      } catch (error) {
        console.error("Erro ao buscar professores:", error);
        setProfessors([]);
      }
    };
    fetchProfessors();
  }, []);

  // --- BUSCA NOTÍCIAS ---
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('http://my-agronomy-site-production.up.railway.app/api/noticias'); // ✅ nova rota
        const data = await response.json();
        setNews(data);
      } catch (error) {
        console.error("Erro ao buscar notícias:", error);
        setNews([]);
      }
    };
    fetchNews();
  }, []);

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
            <Hero
              onOpportunitiesClick={() => handleNavigation('opportunities')}
              onProfessorsClick={() => handleNavigation('professors')}
            />
            <NewsSection
              news={news}
              onNewsClick={handleNewsClick}
              onViewAllNews={() => handleNavigation('news')} // ✅ botão "Ver todas as notícias"
            />
            <OpportunitiesSection
              onOpportunityClick={handleOpportunityClick}
              onNavigate={handleNavigation}
            />
            <DepartmentsPage
              onProfessorClick={handleProfessorClick}
              professors={professors}
              onViewAllDepartments={() => handleNavigation('departments')} // ✅ botão "Ver todos os departamentos"
            />

          </>

        );

      case 'departments':
        return <DepartmentsPage onProfessorClick={handleProfessorClick} professors={professors} />;

      case 'news':
        return <NewsPage news={news} onBack={() => handleNavigation('home')} onNewsClick={handleNewsClick} />;

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
            <NewsSection news={news} onNewsClick={handleNewsClick} />
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
 */

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
  const [news, setNews] = useState([]);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // --- BUSCA PROFESSORES ---
  useEffect(() => {
    const fetchProfessors = async () => {
      try {
        const response = await fetch(`${API_URL}/api/professors`);
        const data = await response.json();
        setProfessors(data);
      } catch (error) {
        console.error("Erro ao buscar professores:", error);
        setProfessors([]);
      }
    };
    fetchProfessors();
  }, [API_URL]);

  // --- BUSCA NOTÍCIAS ---
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(`${API_URL}/api/noticias`);
        const data = await response.json();
        setNews(data);
      } catch (error) {
        console.error("Erro ao buscar notícias:", error);
        setNews([]);
      }
    };
    fetchNews();
  }, [API_URL]);

  // --- CLIQUE EM OPORTUNIDADE ---
  const handleOpportunityClick = (opportunityId) => {
    console.log("[App.jsx] Oportunidade selecionada. Guardando ID:", opportunityId);
    setSelectedOpportunity({ id: opportunityId });
    setCurrentPage('opportunity-detail');
  };

  // --- CLIQUE EM PROFESSOR ---
  const handleProfessorClick = (professorId) => {
    console.log(`[App.jsx] Clique no Professor, ID:`, professorId);
    setSelectedProfessor({ id: professorId });
    setCurrentPage('professor-profile');
  };

  // --- CLIQUE EM NOTÍCIA ---
  const handleNewsClick = (newsId) => {
    setSelectedNews(newsId);
    setCurrentPage('news-detail');
  };

  // --- NAVEGAÇÃO GENÉRICA ---
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
            <Hero
              onOpportunitiesClick={() => handleNavigation('opportunities')}
              onProfessorsClick={() => handleNavigation('professors')}
            />
            <NewsSection
              news={news}
              onNewsClick={handleNewsClick}
              onViewAllNews={() => handleNavigation('news')}
            />
            <OpportunitiesSection
              onOpportunityClick={handleOpportunityClick}
              onNavigate={handleNavigation}
            />
            <DepartmentsPage
              onProfessorClick={handleProfessorClick}
              professors={professors}
              onViewAllDepartments={() => handleNavigation('departments')}
            />
          </>
        );

      case 'departments':
        return <DepartmentsPage onProfessorClick={handleProfessorClick} professors={professors} />;

      case 'news':
        return <NewsPage news={news} onBack={() => handleNavigation('home')} onNewsClick={handleNewsClick} />;

      case 'news-detail':
        return <NewsDetail newsId={selectedNews} onBack={() => handleNavigation('news')} />;

      case 'opportunities':
        return (
          <OpportunitiesSection
            onOpportunityClick={handleOpportunityClick}
            onNavigate={handleNavigation}
          />
        );

      case 'professors':
        return <ProfessorsSection onProfessorClick={handleProfessorClick} professors={professors} />;

      case 'opportunity-detail':
        return (
          <OpportunityDetail
            opportunity={selectedOpportunity}
            onBack={() => handleNavigation('opportunities')}
          />
        );

      case 'professor-profile':
        console.log(`[App.jsx] Renderizando Profile`, { enviando_professor: selectedProfessor });
        return (
          <ProfessorProfile
            professor={selectedProfessor} // contém apenas {id}
            onBack={() => handleNavigation('home')}
            onOpportunityClick={handleOpportunityClick}
          />
        );

      default:
        return (
          <>
            <Hero />
            <NewsSection news={news} onNewsClick={handleNewsClick} />
            <OpportunitiesSection
              onOpportunityClick={handleOpportunityClick}
              onNavigate={handleNavigation}
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

