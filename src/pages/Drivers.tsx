import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { getDrivers } from '@/api/f1-api';
import { IconSearch, IconUser, IconFlag } from '@tabler/icons-react';

export default function Drivers() {
  const [search, setSearch] = useState('');
  const { data: drivers, isLoading } = useQuery({
    queryKey: ['drivers'],
    queryFn: getDrivers,
  });

  const filteredDrivers = drivers?.filter((driver: any) =>
    `${driver.name} ${driver.surname}`.toLowerCase().includes(search.toLowerCase()) ||
    driver.nationality?.toLowerCase().includes(search.toLowerCase())
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
          <IconUser size={32} className="text-f1-red" />
          Pilotos
        </h1>
        <div className="relative">
          <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Buscar piloto o nacionalidad..."
            className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-f1-red"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filteredDrivers?.map((driver: any) => (
          <Link
            key={driver.driverId}
            to={`/drivers/${driver.driverId}`}
            className="card hover:scale-105 transition-transform text-center"
          >
            <div className="text-4xl mb-2">
              <IconUser size={40} className="mx-auto text-gray-400" />
            </div>
            <h3 className="font-bold text-sm">{driver.name} {driver.surname}</h3>
            <p className="text-xs text-gray-600 flex items-center justify-center gap-1">
              <IconFlag size={14} />
              {driver.nationality}
            </p>
            {driver.number && (
              <span className="inline-block bg-f1-red text-white px-2 py-0.5 rounded-full text-xs mt-2">
                #{driver.number}
              </span>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
}
