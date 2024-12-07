export const formatTemperature = (temp: number): string => {
  return `${Math.round(temp)}°C`;
};

export const formatWindSpeed = (speed: number): string => {
  return `${speed} m/s`;
};

export const formatHumidity = (humidity: number): string => {
  return `${humidity}%`;
};