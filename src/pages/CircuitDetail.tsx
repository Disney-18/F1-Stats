import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getCircuitDetails } from '@/api/f1-api';
import { IconArrowLeft, IconMap, IconFlag, IconRuler, IconCornerUpRight, IconCalendar } from '@tabler/icons-react';

export default function CircuitDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: circuit, isLoading } = useQuery({
    queryKey: ['circuit', id],
    queryFn: () => getCircuitDetails(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-f1-red"></div>
      </div>
    );
  }

  if (!circuit) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-gray-600">Circuito no encontrado</p>
        <Link to="/circuits" className="btn-primary inline-block mt-4">
          Volver a circuitos
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Link to="/circuits" className="inline-flex items-center gap-2 text-gray-600 hover:text-f1-red mb-6">
        <IconArrowLeft size={20} />
        Volver a circuitos
      </Link>

      <div className="bg-white rounded-xl shadow-xl p-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-gray-100 p-4 rounded-full">
            <IconMap size={40} className="text-f1-red" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">{circuit.circuitName}</h1>
            <p className="text-xl text-gray-600 flex items-center gap-1">
              <IconFlag size={20} />
              {circuit.city}, {circuit.country}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <div className="border p-4 rounded-lg">
            <p className="text-sm text-gray-500 flex items-center gap-1">
              <IconRuler size={16} />
              Longitud
            </p>
            <p className="font-bold">{circuit.circuitLength}m</p>
          </div>
          <div className="border p-4 rounded-lg">
            <p className="text-sm text-gray-500 flex items-center gap-1">
              <IconCornerUpRight size={16} />
              Curvas
            </p>
            <p className="font-bold">{circuit.numberOfCorners}</p>
          </div>
          <div className="border p-4 rounded-lg">
            <p className="text-sm text-gray-500 flex items-center gap-1">
              <IconCalendar size={16} />
              Primera carrera
            </p>
            <p className="font-bold">{circuit.firstParticipationYear}</p>
          </div>
        </div>

        {circuit.lapRecord && (
          <div className="bg-red-50 p-4 rounded-lg border border-red-200">
            <h3 className="font-bold text-f1-red">Récord de vuelta</h3>
            <p className="text-lg">{circuit.lapRecord}</p>
            <p className="text-sm text-gray-600">
              {circuit.fastestLapDriverId} - {circuit.fastestLapTeamId} ({circuit.fastestLapYear})
            </p>
          </div>
        )}

        {circuit.url && (
          <div className="mt-6 pt-6 border-t">
            <a
              href={circuit.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline flex items-center gap-2"
            >
              Ver en Wikipedia
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
