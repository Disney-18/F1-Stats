import { Outlet } from 'react-router-dom';
import Header from './Header';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Outlet />
      </main>
      <footer className="bg-f1-dark text-white py-4 text-center text-sm">
        <p>Datos proporcionados por F1 API - Proyecto de demostración</p>
      </footer>
    </div>
  );
}
