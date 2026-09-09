import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://f1api.dev/api',
  headers: {
    'x-api-key': import.meta.env.VITE_F1_API_KEY || '',
  },
});

export const getSeasons = async () => {
  const { data } = await api.get('/seasons?limit=30');
  return data.championships;
};

export const getSeasonRaces = async (year: number) => {
  const { data } = await api.get(`/seasons/${year}/races`);
  return data;
};

export const getRaceResults = async (season: number, round: number) => {
  const { data } = await api.get(`/${season}/${round}/race`);
  return data;
};

export const getDrivers = async () => {
  const { data } = await api.get('/drivers?limit=200');
  return data.drivers;
};

export const getDriverDetails = async (driverId: string) => {
  const { data } = await api.get(`/drivers/${driverId}`);
  return data;
};

export const getTeams = async () => {
  const { data } = await api.get('/teams?limit=100');
  return data.teams;
};

export const getTeamDetails = async (teamId: string) => {
  const { data } = await api.get(`/teams/${teamId}`);
  return data;
};

export const getCircuits = async () => {
  const { data } = await api.get('/circuits?limit=50');
  return data.circuits;
};

export const getCircuitDetails = async (circuitId: string) => {
  const { data } = await api.get(`/circuits/${circuitId}`);
  return data;
};
