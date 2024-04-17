import { renderHook, waitFor } from "@testing-library/react";
import useWeatherForecast from "../useWeatherForecast";
import { fetchWeatherForecast } from "../../services/weatherService";

jest.mock("../../services/weatherService");

describe("useWeatherForecast", () => {
  it("should fetch weather forecast data and set loading to false", async () => {
    const latitude = 40.7128;
    const longitude = -74.006;

    const mockFetchWeatherForecast = jest
      .fn()
      .mockResolvedValue(["forecast data"]);
    (fetchWeatherForecast as jest.Mock).mockImplementation(
      mockFetchWeatherForecast
    );

    const { result } = renderHook(() =>
      useWeatherForecast({ latitude, longitude })
    );

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(mockFetchWeatherForecast).toHaveBeenCalledWith(
        latitude,
        longitude
      );
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe(false);
      expect(result.current.forecast).toEqual(["forecast data"]);
    });
  });

  it("should set error state when fetch fails", async () => {
    const latitude = 40.7128;
    const longitude = -74.006;

    const mockFetchWeatherForecast = jest
      .fn()
      .mockRejectedValue(new Error("Failed to fetch"));

    (fetchWeatherForecast as jest.Mock).mockImplementation(
      mockFetchWeatherForecast
    );

    const { result } = renderHook(() =>
      useWeatherForecast({ latitude, longitude })
    );

    await waitFor(() => {
      expect(mockFetchWeatherForecast).toHaveBeenCalledWith(
        latitude,
        longitude
      );
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe(true);
      expect(result.current.forecast).toEqual([]);
    });
  });
});
