import { useState } from "react";
import { styled, Theme } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import InputAddress from "./components/InputAddress";
import WeatherForecast from "./components/WeatherForecast";

const AppContainer = styled(Container)(({ theme }: { theme: Theme }) => ({
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
  gap: theme.spacing(2),
  marginTop: theme.spacing(2),
}));

function App() {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  const handleAddressChange = (lat: number, lon: number) => {
    setLatitude(lat);
    setLongitude(lon);
  };

  return (
    <AppContainer>
      <Typography variant="h3">Weather Forecast</Typography>
      <InputAddress onAddressChange={handleAddressChange} />
      {latitude !== null && longitude !== null && (
        <WeatherForecast latitude={latitude} longitude={longitude} />
      )}
    </AppContainer>
  );
}

export default App;
