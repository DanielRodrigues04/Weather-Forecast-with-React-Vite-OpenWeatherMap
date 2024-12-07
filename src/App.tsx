import React, { useState } from 'react';
import { SearchBar } from './components/SearchBar';
import { CurrentWeather } from './components/CurrentWeather';
import { Forecast } from './components/Forecast';
import { getWeather, getForecast } from './services/weatherApi';
import { WeatherData, ForecastData } from './types/weather';
import { Sun, Moon, CloudSun } from 'lucide-react';

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData | null>(null);
  const [error, setError] = useState<string>('');
  const [view, setView] = useState<'hourly' | 'daily'>('hourly');
  const [loading, setLoading] = useState(false);

  const handleSearch = async (city: string) => {
    try {
      setLoading(true);
      setError('');
      const [weather, forecast] = await Promise.all([
        getWeather(city),
        getForecast(city)
      ]);
      setWeatherData(weather);
      setForecastData(forecast);
    } catch (err) {
      setError('City not found. Please try again.');
      setWeatherData(null);
      setForecastData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-center gap-3 mb-12">
          <CloudSun size={36} className="text-blue-300" />
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-blue-400">
            Weather Forecast
          </h1>
        </div>
        
        <div className="flex justify-center mb-12">
          <SearchBar onSearch={handleSearch} />
        </div>

        {loading && (
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-400 border-t-transparent"></div>
          </div>
        )}

        {error && (
          <div className="text-center text-red-300 mb-6 glass-card py-3 px-6 rounded-lg inline-block">
            {error}
          </div>
        )}

        {weatherData && (
          <div className="space-y-8">
            <CurrentWeather data={weatherData} />
            
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setView('hourly')}
                className={`glass-card flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
                  view === 'hourly'
                    ? 'bg-blue-500/30 border-blue-400/50'
                    : 'hover:bg-white/20'
                }`}
              >
                <Sun size={20} className="text-yellow-300" />
                <span>Hourly</span>
              </button>
              <button
                onClick={() => setView('daily')}
                className={`glass-card flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${
                  view === 'daily'
                    ? 'bg-blue-500/30 border-blue-400/50'
                    : 'hover:bg-white/20'
                }`}
              >
                <Moon size={20} className="text-blue-200" />
                <span>Daily</span>
              </button>
            </div>

            {forecastData && <Forecast data={forecastData} view={view} />}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;