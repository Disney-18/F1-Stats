import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getTeamDetails } from '@/api/f1-api';
import { IconArrowLeft, IconBuilding, IconFlag, IconTrophy } from '@tabler/icons-react';

export default function TeamDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: team, isLoading } = useQuery({
    queryKey: ['team', id],
    queryFn: () => getTeamDetails(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-f1-red"></div>
      </div>
    );
  }

  if (!team) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-gray-600">Equipo no encontrado</p>
        <Link to="/teams" className="btn-primary inline-block mt-4">
          Volver a equipos
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Link to="/teams" className="inline-flex items-center gap-2 text-gray-600 hover:text-f1-red mb-6">
        <IconArrowLeft size={20} />
        Volver a equipos
      </Link>

      <div className="bg-white rounded-xl shadow-xl p-8">
        <div className="flex items-center gap-6 mb-6">
          <div className="bg-gray-100 p-6 rounded-full">
            <IconBuilding size={64} className="text-f1-red" />
          </div>
          <div>
            <h1 className="text-4xl font-bold">{team.teamName}</h1>
            <p className="text-xl text-gray-600 flex items-center gap-2">
              <IconFlag size={20} />
              {team.teamNationality}
            </p>
            {team.firstAppeareance && (
              <span className="inline-block bg-gray-200 px-3 py-1 rounded-full text-sm mt-2">
                Debut: {team.firstAppeareance}
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="border p-4 rounded-lg">
            <p className="text-sm text-gray-500 flex items-center gap-1">
              <IconTrophy size={16} />
              Campeonatos de Constructores
            </p>
            <p className="font-bold">{team.constructorsChampionships || '0'}</p>
          </div>
          <div className="border p-4 rounded-lg">
            <p className="text-sm text-gray-500 flex items-center gap-1">
              <IconTrophy size={16} />
              Campeonatos de Pilotos
            </p>
            <p className="font-bold">{team.driversChampionships || '0'}</p>
          </div>
        </div>

        {team.url && (
          <div className="mt-6 pt-6 border-t">
            <a
              href={team.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline flex items-center gap-2"
            >
              Ver historia en Wikipedia
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
