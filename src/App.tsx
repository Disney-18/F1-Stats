import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from './components/Layout';
import Home from './pages/Home';
import Drivers from './pages/Drivers';
import DriverDetail from './pages/DriverDetail';
import Teams from './pages/Teams';
import TeamDetail from './pages/TeamDetail';
import Circuits from './pages/Circuits';
import CircuitDetail from './pages/CircuitDetail';
import RaceDetail from './pages/RaceDetail';
import Stats from './pages/Stats';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename="/f1-stats">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="drivers" element={<Drivers />} />
            <Route path="drivers/:id" element={<DriverDetail />} />
            <Route path="teams" element={<Teams />} />
            <Route path="teams/:id" element={<TeamDetail />} />
            <Route path="circuits" element={<Circuits />} />
            <Route path="circuits/:id" element={<CircuitDetail />} />
            <Route path="race/:season/:round" element={<RaceDetail />} />
            <Route path="stats" element={<Stats />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
