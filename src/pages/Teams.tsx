import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { getTeams } from '@/api/f1-api';
import { IconSearch, IconBuilding, IconFlag } from '@tabler/icons-react';

export default function Teams() {
  const [search, setSearch] = useState('');
  const { data: teams, isLoading } = useQuery({
    queryKey: ['teams'],
    queryFn: getTeams,
  });

  const filteredTeams = teams?.filter((team: any) =>
    team.teamName.toLowerCase().includes(search.toLowerCase()) ||
    team.teamNationality.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-f1-red"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <IconBuilding size={32} className="text-f1-red" />
          Equipos
        </h1>
        <div className="relative">
          <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Buscar equipo o nacionalidad..."
            className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-f1-red"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredTeams?.map((team: any) => (
          <Link
            key={team.teamId}
            to={`/teams/${team.teamId}`}
            className="card hover:scale-105 transition-transform text-center"
          >
            <div className="text-4xl mb-2">
              <IconBuilding size={40} className="mx-auto text-gray-400" />
            </div>
            <h3 className="font-bold text-sm">{team.teamName}</h3>
            <p className="text-xs text-gray-600 flex items-center justify-center gap-1">
              <IconFlag size={14} />
              {team.teamNationality}
            </p>
            {team.firstAppeareance && (
              <span className="inline-block bg-gray-100 px-2 py-0.5 rounded-full text-xs mt-2">
                Desde {team.firstAppeareance}
              </span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
