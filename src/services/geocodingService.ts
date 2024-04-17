import axios from "axios";

const BASE_URL = "http://localhost:5000/api/geocode";

export const fetchCoordinates = async (
  address: string
): Promise<{ lat: number; lon: number }> => {
  try {
    const response = await axios.get(
      `${BASE_URL}?address=${address}&benchmark=Public_AR_Current&format=json`
    );
    const { x: lon, y: lat } =
      response.data.result.addressMatches[0].coordinates;

    return { lat, lon };
  } catch (error) {
    throw new Error("Error fetching coordinates");
  }
};
