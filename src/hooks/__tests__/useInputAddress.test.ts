import { renderHook, act } from "@testing-library/react";
import useInputAddress from "../useInputAddress";
import { fetchCoordinates } from "../../services/geocodingService";

jest.mock("../../services/geocodingService");

describe("useInputAddress", () => {
  it("should set address and call onAddressChange when handleAddressSubmit is called with a valid address", async () => {
    const onAddressChange = jest.fn();
    (fetchCoordinates as jest.Mock).mockResolvedValueOnce({
      lat: 40.7128,
      lon: -74.006,
    });

    const { result } = renderHook(() => useInputAddress({ onAddressChange }));

    act(() => {
      result.current.setAddress("New York");
    });

    await act(async () => {
      await result.current.handleAddressSubmit();
    });

    expect(onAddressChange).toHaveBeenCalledWith(40.7128, -74.006);
  });

  it("should set error when handleAddressSubmit is called with an invalid address", async () => {
    const { result } = renderHook(() =>
      useInputAddress({ onAddressChange: jest.fn() })
    );
    (fetchCoordinates as jest.Mock).mockRejectedValueOnce(new Error());

    await act(async () => {
      await result.current.handleAddressSubmit();
    });

    expect(result.current.error).toBe(true);
  });
});
