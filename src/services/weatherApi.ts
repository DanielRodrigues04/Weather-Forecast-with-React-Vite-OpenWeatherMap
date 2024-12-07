import axios from 'axios';
import { WeatherData, ForecastData } from '../types/weather';
import { WEATHER_CONFIG, WEATHER_ENDPOINTS } from '../config/constants';

const { API_KEY, BASE_URL, UNITS } = WEATHER_CONFIG;

export const getWeather = async (city: string): Promise<WeatherData> => {
  const response = await axios.get(
    `${BASE_URL}${WEATHER_ENDPOINTS.CURRENT}?q=${city}&units=${UNITS}&appid=${API_KEY}`
  );
  return response.data;
};

export const getForecast = async (city: string): Promise<ForecastData> => {
  const response = await axios.get(
    `${BASE_URL}${WEATHER_ENDPOINTS.FORECAST}?q=${city}&units=${UNITS}&appid=${API_KEY}`
  );
  return response.data;
};