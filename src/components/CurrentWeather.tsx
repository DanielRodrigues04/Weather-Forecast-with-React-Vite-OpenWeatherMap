import React from 'react';
import { Droplets, Wind, Thermometer } from 'lucide-react';
import { WeatherData } from '../types/weather';
import { formatTemperature, formatWindSpeed, formatHumidity } from '../utils/formatters';

interface CurrentWeatherProps {
  data: WeatherData;
}

export const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data }) => {
  return (
    <div className="glass-card rounded-2xl p-8 w-full max-w-2xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <div className="text-center sm:text-left mb-4 sm:mb-0">
          <h2 className="text-3xl font-bold mb-2">{data.name}</h2>
          <p className="text-lg text-blue-200 capitalize">
            {data.weather[0].description}
          </p>
        </div>
        <img
          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
          alt={data.weather[0].description}
          className="w-24 h-24 weather-icon"
        />
      </div>
      
      <div className="text-center mb-8">
        <div className="text-6xl font-bold mb-2">
          {formatTemperature(data.main.temp)}
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="glass-card rounded-xl p-4 flex items-center justify-center">
          <Droplets className="text-blue-300 mr-3" size={24} />
          <div>
            <p className="text-sm text-blue-200">Humidity</p>
            <p className="text-xl font-semibold">{formatHumidity(data.main.humidity)}</p>
          </div>
        </div>
        
        <div className="glass-card rounded-xl p-4 flex items-center justify-center">
          <Wind className="text-blue-300 mr-3" size={24} />
          <div>
            <p className="text-sm text-blue-200">Wind Speed</p>
            <p className="text-xl font-semibold">{formatWindSpeed(data.wind.speed)}</p>
          </div>
        </div>
        
        <div className="glass-card rounded-xl p-4 flex items-center justify-center">
          <Thermometer className="text-blue-300 mr-3" size={24} />
          <div>
            <p className="text-sm text-blue-200">Feels Like</p>
            <p className="text-xl font-semibold">{formatTemperature(data.main.feels_like)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};