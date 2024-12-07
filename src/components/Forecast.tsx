import React from 'react';
import { format } from 'date-fns';
import { ForecastData } from '../types/weather';
import { formatTemperature } from '../utils/formatters';

interface ForecastProps {
  data: ForecastData;
  view: 'hourly' | 'daily';
}

export const Forecast: React.FC<ForecastProps> = ({ data, view }) => {
  const getForecastItems = () => {
    if (view === 'hourly') {
      return data.list.slice(0, 8);
    } else {
      return data.list.filter((item, index) => index % 8 === 0).slice(0, 5);
    }
  };

  return (
    <div className="glass-card rounded-2xl p-8 mt-8">
      <h3 className="text-2xl font-bold mb-6 text-center">
        {view === 'hourly' ? 'Hourly' : '5-Day'} Forecast
      </h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
        {getForecastItems().map((item) => (
          <div
            key={item.dt}
            className="forecast-card rounded-xl p-4 flex flex-col items-center"
          >
            <p className="text-sm text-blue-200 mb-2">
              {view === 'hourly'
                ? format(new Date(item.dt * 1000), 'HH:mm')
                : format(new Date(item.dt * 1000), 'EEE')}
            </p>
            <img
              src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
              alt={item.weather[0].description}
              className="w-16 h-16 weather-icon mb-2"
            />
            <p className="text-lg font-semibold">{formatTemperature(item.main.temp)}</p>
            <p className="text-xs text-blue-200 text-center mt-1 capitalize">
              {item.weather[0].description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};