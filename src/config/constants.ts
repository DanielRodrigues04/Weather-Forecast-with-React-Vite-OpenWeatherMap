export const WEATHER_CONFIG = {
  API_KEY: '', //coloque aqui sua chave de api para funcionamento correto
  BASE_URL: 'https://api.openweathermap.org/data/2.5',
  UNITS: 'metric',
} as const;

export const WEATHER_ENDPOINTS = {
  CURRENT: '/weather',
  FORECAST: '/forecast',
} as const;