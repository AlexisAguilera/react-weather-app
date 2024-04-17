import axios from "axios";

const BASE_URL = "http://localhost:5000/api/weather";

//39.7456,-97.0892

export const fetchWeatherForecast = async (
  latitude: number,
  longitude: number
): Promise<any> => {
  try {
    // Round the latitude and longitude values to 4 decimal places
    const roundedLatitude = latitude.toFixed(4);
    const roundedLongitude = longitude.toFixed(4);
    const response = await axios.get(
      `${BASE_URL}?latitude=${roundedLatitude}&longitude=${roundedLongitude}`
    );
    console.log("response", response);
    return response.data.properties.periods;
  } catch (error) {
    console.log("error", error);
    throw new Error("Error fetching weather forecast");
  }
};
