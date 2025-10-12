import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Users, BookOpen, Briefcase } from 'lucide-react';

const Hero = ({ onOpportunitiesClick, onProfessorsClick }) => {
  const [stats, setStats] = useState({
    professores: 0,
    departamentos: 0,
    oportunidades: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('https://my-agronomy-site-production.up.railway.app/api/contagens');
        if (!res.ok) throw new Error('Erro ao buscar contagens');
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error('Erro ao buscar contagens:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);



  if (loading) {
    return (
      <section className="py-16 text-center">
        Carregando estatísticas...
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 text-center text-red-500">
        Erro ao carregar estatísticas: {error}
      </section>
    );
  }

  const oportunidadesDisplay = stats.oportunidades > 150
    ? `${stats.oportunidades}+`
    : '150+';

  return (
    <section className="bg-gradient-to-br from-green-50 to-green-100 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
            Impulso <span className="text-green-700">Agro</span>
          </h1>
          <p className="text-xl lg:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Conectando estudantes e professores para oportunidades de estágio, PVA e iniciação científica
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              className="bg-green-700 hover:bg-green-800 cursor-pointer"
              onClick={onOpportunitiesClick} // ✅ Handler do App.jsx
            >
              Ver Oportunidades
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-green-700 text-green-700 hover:bg-green-50 cursor-pointer"
              onClick={onProfessorsClick} // ✅ Handler do App.jsx
            >
              Conhecer Professores
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <Users className="h-12 w-12 text-green-700 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{stats.professores}</h3>
                <p className="text-gray-600">Professores</p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <BookOpen className="h-12 w-12 text-green-700 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{stats.departamentos}</h3>
                <p className="text-gray-600">Departamentos</p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <Briefcase className="h-12 w-12 text-green-700 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {oportunidadesDisplay}
                </h3>
                <p className="text-gray-600">Oportunidades Anuais</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
