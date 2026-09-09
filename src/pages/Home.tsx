import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { getSeasons } from '@/api/f1-api';
import { IconCalendar, IconFlag, IconTrophy } from '@tabler/icons-react';

export default function Home() {
  const { data: seasons, isLoading } = useQuery({
    queryKey: ['seasons'],
    queryFn: getSeasons,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-f1-red"></div>
      </div>
    );
  }

  const latestSeason = seasons?.[0];
  const currentYear = new Date().getFullYear();

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="bg-gradient-to-r from-f1-red to-red-700 rounded-2xl p-8 text-white">
        <div className="flex items-center gap-4 mb-4">
          <IconTrophy size={48} />
          <h1 className="text-4xl font-bold">Fórmula 1 Stats</h1>
        </div>
        <p className="text-xl opacity-90">
          Estadísticas completas de la Fórmula 1 desde 1997 hasta {currentYear}
        </p>
      </div>

      {/* Última temporada */}
      {latestSeason && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <IconCalendar size={28} className="text-f1-red" />
            Última temporada: {latestSeason.year}
          </h2>
          <Link
            to={`/season/${latestSeason.year}`}
            className="inline-flex items-center gap-2 btn-primary"
          >
            <IconFlag size={20} />
            Ver carreras
          </Link>
        </div>
      )}

      {/* Stats rápidas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <div className="text-3xl font-bold text-f1-red">{seasons?.length || 0}</div>
          <p className="text-gray-600">Temporadas</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <div className="text-3xl font-bold text-blue-600">-</div>
          <p className="text-gray-600">Pilotos</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <div className="text-3xl font-bold text-green-600">-</div>
          <p className="text-gray-600">Equipos</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 text-center">
          <div className="text-3xl font-bold text-purple-600">-</div>
          <p className="text-gray-600">Circuitos</p>
        </div>
      </div>
    </div>
  );
}
