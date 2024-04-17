import { useState, useEffect } from "react";
import { fetchWeatherForecast } from "../services/weatherService";

interface UseWeatherForecastProps {
  latitude: number;
  longitude: number;
}

const useWeatherForecast = ({
  latitude,
  longitude,
}: UseWeatherForecastProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        setError(false);
        setLoading(true);
        const forecastData = await fetchWeatherForecast(latitude, longitude);
        setForecast(forecastData);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };

    fetchForecast();
  }, [latitude, longitude]);
  return {
    loading,
    error,
    forecast,
  };
};

export default useWeatherForecast;
