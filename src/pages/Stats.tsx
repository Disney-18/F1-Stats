import { useQueries } from '@tanstack/react-query';
import { getSeasons, getDrivers, getTeams, getCircuits, getRaceResults } from '@/api/f1-api';
import { IconTrophy, IconUsers, IconBuilding, IconMap, IconFlag } from '@tabler/icons-react';

export default function Stats() {
  const results = useQueries({
    queries: [
      { queryKey: ['seasons'], queryFn: getSeasons },
      { queryKey: ['drivers'], queryFn: getDrivers },
      { queryKey: ['teams'], queryFn: getTeams },
      { queryKey: ['circuits'], queryFn: getCircuits },
      { queryKey: ['lastRace'], queryFn: () => getRaceResults(2026, 13) },
    ],
  });

  const [seasons, drivers, teams, circuits, lastRace] = results;
  const isLoading = seasons.isLoading || drivers.isLoading || teams.isLoading || circuits.isLoading;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-f1-red"></div>
      </div>
    );
  }

  const lastRaceData = lastRace.data?.races;
  const totalRaces = seasons.data?.reduce((acc: number, s: any) => acc + (s.races || 0), 0) || 0;

  const stats = [
    { label: 'Temporadas', value: seasons.data?.length || 0, icon: IconFlag, color: 'text-f1-red' },
    { label: 'Pilotos', value: drivers.data?.length || 0, icon: IconUsers, color: 'text-blue-600' },
    { label: 'Equipos', value: teams.data?.length || 0, icon: IconBuilding, color: 'text-green-600' },
    { label: 'Circuitos', value: circuits.data?.length || 0, icon: IconMap, color: 'text-purple-600' },
    { label: 'Carreras totales', value: totalRaces, icon: IconTrophy, color: 'text-orange-600' },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold flex items-center gap-2">
        <IconTrophy size={32} className="text-f1-red" />
        Estadísticas de F1
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="bg-white rounded-xl shadow-lg p-6 text-center">
              <Icon size={32} className={`mx-auto ${stat.color}`} />
              <div className={`text-3xl font-bold ${stat.color} mt-2`}>{stat.value}</div>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Última carrera */}
      {lastRaceData && (
        <div className="bg-gradient-to-r from-red-50 to-red-100 p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <IconFlag size={28} className="text-f1-red" />
            Última carrera: {lastRaceData.raceName}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg">
              <p className="text-sm text-gray-500">Ganador</p>
              <p className="font-bold text-lg">
                {lastRaceData.results[0]?.driver.name} {lastRaceData.results[0]?.driver.surname}
              </p>
              <p className="text-sm text-gray-600">{lastRaceData.results[0]?.team.teamName}</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <p className="text-sm text-gray-500">Vuelta rápida</p>
              <p className="font-bold text-lg">{lastRaceData.results[0]?.fastLap || '-'}</p>
              <p className="text-sm text-gray-600">{lastRaceData.circuit[0]?.circuitName}</p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <p className="text-sm text-gray-500">Fecha</p>
              <p className="font-bold text-lg">
                {new Date(lastRaceData.date).toLocaleDateString('es-ES', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </p>
              <p className="text-sm text-gray-600">{lastRaceData.circuit[0]?.city}, {lastRaceData.circuit[0]?.country}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
