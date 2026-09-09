import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getRaceResults } from '@/api/f1-api';
import { IconArrowLeft, IconFlag, IconCalendar, IconClock, IconMap } from '@tabler/icons-react';

export default function RaceDetail() {
  const { season, round } = useParams<{ season: string; round: string }>();
  const { data: race, isLoading } = useQuery({
    queryKey: ['race', season, round],
    queryFn: () => getRaceResults(parseInt(season!), parseInt(round!)),
    enabled: !!season && !!round,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-f1-red"></div>
      </div>
    );
  }

  if (!race?.races) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-gray-600">Carrera no encontrada</p>
        <Link to="/" className="btn-primary inline-block mt-4">
          Volver al inicio
        </Link>
      </div>
    );
  }

  const raceData = race.races;
  const circuit = raceData.circuit?.[0];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <Link to="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-f1-red">
        <IconArrowLeft size={20} />
        Volver al inicio
      </Link>

      {/* Cabecera */}
      <div className="bg-white rounded-xl shadow-xl p-6">
        <h1 className="text-3xl font-bold text-f1-red">{raceData.raceName}</h1>
        <div className="flex flex-wrap gap-4 mt-2 text-gray-600">
          <span className="flex items-center gap-1">
            <IconFlag size={16} />
            {raceData.round}ª ronda
          </span>
          <span className="flex items-center gap-1">
            <IconCalendar size={16} />
            {new Date(raceData.date).toLocaleDateString('es-ES', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </span>
          <span className="flex items-center gap-1">
            <IconClock size={16} />
            {raceData.time}
          </span>
        </div>
        {circuit && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-bold flex items-center gap-1">
              <IconMap size={20} />
              {circuit.circuitName}
            </h3>
            <p className="text-sm text-gray-600">{circuit.city}, {circuit.country}</p>
            <div className="flex flex-wrap gap-4 mt-2 text-sm">
              <span>{circuit.circuitLength}</span>
              <span>{circuit.corners} curvas</span>
              <span>Desde {circuit.firstParticipationYear}</span>
            </div>
          </div>
        )}
      </div>

      {/* Tabla de resultados */}
      <div className="bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-f1-red text-white">
              <tr>
                <th className="p-3 text-left">Pos</th>
                <th className="p-3 text-left">Piloto</th>
                <th className="p-3 text-left">Equipo</th>
                <th className="p-3 text-center">Puntos</th>
                <th className="p-3 text-center">Tiempo</th>
                <th className="p-3 text-center">V.Rápida</th>
              </tr>
            </thead>
            <tbody>
              {raceData.results.map((result: any, index: number) => (
                <tr key={index} className={`border-b ${result.position === '1' ? 'bg-yellow-50' : ''}`}>
                  <td className="p-3 font-bold">
                    {result.position === '-' ? 'DNF' : `#${result.position}`}
                  </td>
                  <td className="p-3">
                    <div>
                      <span className="font-bold">{result.driver.name} {result.driver.surname}</span>
                      <span className="text-sm text-gray-500 ml-2">({result.driver.shortName})</span>
                    </div>
                    <div className="text-xs text-gray-400">{result.driver.nationality}</div>
                  </td>
                  <td className="p-3 text-sm">{result.team.teamName}</td>
                  <td className="p-3 text-center font-bold">{result.points || 0}</td>
                  <td className="p-3 text-center text-sm">
                    {result.time || result.status || result.retired || '-'}
                  </td>
                  <td className="p-3 text-center text-sm">
                    {result.fastLap || '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {raceData.url && (
        <div className="text-center">
          <a
            href={raceData.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Ver más detalles en Wikipedia
          </a>
        </div>
      )}
    </div>
  );
}
