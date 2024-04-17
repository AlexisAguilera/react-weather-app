import { render, waitFor, screen } from "@testing-library/react";
import WeatherForecast from "../WeatherForecast";
import { fetchWeatherForecast } from "../../services/weatherService";

jest.mock("../../services/weatherService");

const mockedFetchWeatherForecast = fetchWeatherForecast as jest.MockedFunction<
  typeof fetchWeatherForecast
>;

describe("WeatherForecast", () => {
  it("should display weather forecast", async () => {
    const mockForecastData = [
      { number: 1, name: "Today", detailedForecast: "Sunny" },
      { number: 2, name: "Tomorrow", detailedForecast: "Partly cloudy" },
    ];
    mockedFetchWeatherForecast.mockResolvedValue(mockForecastData);

    render(<WeatherForecast latitude={40.7128} longitude={-74.006} />);

    await waitFor(() => {
      expect(screen.getByText("7-Day Weather Forecast")).toBeInTheDocument();
      expect(screen.getByText("Sunny")).toBeInTheDocument();
      expect(screen.getByText("Partly cloudy")).toBeInTheDocument();
    });
  });

  it("should handle error when fetching weather forecast", async () => {
    mockedFetchWeatherForecast.mockRejectedValue(
      new Error("Failed to fetch weather forecast")
    );

    render(<WeatherForecast latitude={40.7128} longitude={-74.006} />);

    await waitFor(() => {
      expect(
        screen.getByText("Error fetching weather forecast")
      ).toBeInTheDocument();
    });
  });
});
