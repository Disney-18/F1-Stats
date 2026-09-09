import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getDriverDetails } from '@/api/f1-api';
import { IconArrowLeft, IconUser, IconFlag, IconCalendar, IconId } from '@tabler/icons-react';

export default function DriverDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: driver, isLoading } = useQuery({
    queryKey: ['driver', id],
    queryFn: () => getDriverDetails(id!),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-f1-red"></div>
      </div>
    );
  }

  if (!driver) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-gray-600">Piloto no encontrado</p>
        <Link to="/drivers" className="btn-primary inline-block mt-4">
          Volver a pilotos
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Link to="/drivers" className="inline-flex items-center gap-2 text-gray-600 hover:text-f1-red mb-6">
        <IconArrowLeft size={20} />
        Volver a pilotos
      </Link>

      <div className="bg-white rounded-xl shadow-xl p-8">
        <div className="flex items-center gap-6 mb-6">
          <div className="bg-gray-100 p-6 rounded-full">
            <IconUser size={64} className="text-f1-red" />
          </div>
          <div>
            <h1 className="text-4xl font-bold">{driver.name} {driver.surname}</h1>
            <p className="text-xl text-gray-600 flex items-center gap-2">
              <IconFlag size={20} />
              {driver.nationality}
            </p>
            {driver.number && (
              <span className="inline-block bg-f1-red text-white px-4 py-1 rounded-full text-sm mt-2">
                Número: {driver.number}
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="border p-4 rounded-lg">
            <p className="text-sm text-gray-500 flex items-center gap-1">
              <IconCalendar size={16} />
              Fecha de nacimiento
            </p>
            <p className="font-bold">{driver.birthday || 'No disponible'}</p>
          </div>
          <div className="border p-4 rounded-lg">
            <p className="text-sm text-gray-500 flex items-center gap-1">
              <IconId size={16} />
              Código
            </p>
            <p className="font-bold">{driver.shortName || 'N/A'}</p>
          </div>
        </div>

        {driver.url && (
          <div className="mt-6 pt-6 border-t">
            <a
              href={driver.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline flex items-center gap-2"
            >
              Ver biografía en Wikipedia
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
