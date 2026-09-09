import { Link, useLocation } from 'react-router-dom';
import {
  IconHome,
  IconUsers,
  IconBuilding,
  IconMap,
  IconChartBar,
  IconFlag,
} from '@tabler/icons-react';

export default function Header() {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Inicio', icon: IconHome },
    { path: '/drivers', label: 'Pilotos', icon: IconUsers },
    { path: '/teams', label: 'Equipos', icon: IconBuilding },
    { path: '/circuits', label: 'Circuitos', icon: IconMap },
    { path: '/stats', label: 'Estadísticas', icon: IconChartBar },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-f1-dark text-white sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-white hover:text-f1-red transition">
            <IconFlag className="text-f1-red" size={28} />
            <span>F1 Stats</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                    isActive(item.path)
                      ? 'bg-f1-red text-white'
                      : 'hover:bg-gray-800'
                  }`}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <button className="md:hidden p-2 hover:bg-gray-800 rounded-lg">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
