import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { getCircuits } from '@/api/f1-api';
import { IconSearch, IconMap, IconFlag } from '@tabler/icons-react';

export default function Circuits() {
  const [search, setSearch] = useState('');
  const { data: circuits, isLoading } = useQuery({
    queryKey: ['circuits'],
    queryFn: getCircuits,
  });

  const filteredCircuits = circuits?.filter((circuit: any) =>
    circuit.circuitName.toLowerCase().includes(search.toLowerCase()) ||
    circuit.country.toLowerCase().includes(search.toLowerCase()) ||
    circuit.city.toLowerCase().includes(search.toLowerCase())
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
          <IconMap size={32} className="text-f1-red" />
          Circuitos
        </h1>
        <div className="relative">
          <IconSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Buscar circuito, país o ciudad..."
            className="pl-10 pr-4 py-2 border rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-f1-red"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCircuits?.map((circuit: any) => (
          <Link
            key={circuit.circuitId}
            to={`/circuits/${circuit.circuitId}`}
            className="card hover:scale-105 transition-transform"
          >
            <h3 className="text-xl font-bold">{circuit.circuitName}</h3>
            <p className="text-gray-600 flex items-center gap-1">
              <IconFlag size={16} />
              {circuit.city}, {circuit.country}
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
              <span className="bg-gray-100 p-1 rounded text-center">
                {circuit.circuitLength}m
              </span>
              <span className="bg-gray-100 p-1 rounded text-center">
                {circuit.numberOfCorners} curvas
              </span>
            </div>
            <div className="mt-2 text-xs text-gray-500">
              Desde {circuit.firstParticipationYear}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
