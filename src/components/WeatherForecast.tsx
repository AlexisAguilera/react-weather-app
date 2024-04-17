import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

import { Alert } from "@mui/material";
import useWeatherForecast from "../hooks/useWeatherForecast";

interface WeatherForecastProps {
  latitude: number;
  longitude: number;
}
const WeatherForecast = ({ latitude, longitude }: WeatherForecastProps) => {
  const { loading, error, forecast } = useWeatherForecast({
    latitude,
    longitude,
  });

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  if (error) {
    return (
      <Box>
        <Alert severity="error">Error fetching weather forecast</Alert>
      </Box>
    );
  }
  return (
    <Box>
      <Typography variant="h5">7-Day Weather Forecast</Typography>
      <Box component="ul">
        {forecast.map((period: any) => (
          <Typography variant="body1" key={period.number} component="li">
            <strong>{period.name}:</strong> {period.detailedForecast}
          </Typography>
        ))}
      </Box>
    </Box>
  );
};

export default WeatherForecast;
