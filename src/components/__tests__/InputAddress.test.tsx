import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import InputAddress from "../InputAddress";
import { fetchCoordinates } from "../../services/geocodingService";

jest.mock("../../services/geocodingService", () => ({
  fetchCoordinates: jest.fn().mockResolvedValue({ lat: 40.7128, lon: -74.006 }),
}));

describe("InputAddress", () => {
  it("should call onAddressChange with latitude and longitude when address is submitted", async () => {
    const mockOnAddressChange = jest.fn();

    render(<InputAddress onAddressChange={mockOnAddressChange} />);

    const input = screen.getByRole("textbox");
    const submitButton = screen.getByRole("button");

    fireEvent.change(input, {
      target: { value: "6 W 33rd St, New York, NY 10001, Estados Unidos" },
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(fetchCoordinates).toHaveBeenCalledWith(
        "6 W 33rd St, New York, NY 10001, Estados Unidos"
      );
      expect(mockOnAddressChange).toHaveBeenCalledWith(40.7128, -74.006);
    });
  });

  it("should display error message when handleAddressSubmit is called with an invalid address", async () => {
    const onAddressChange = jest.fn();
    (fetchCoordinates as jest.Mock).mockRejectedValueOnce(new Error());

    render(<InputAddress onAddressChange={onAddressChange} />);

    const input = screen.getByRole("textbox");
    const submitButton = screen.getByRole("button");

    fireEvent.change(input, { target: { value: "Invalid Address" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText("Please insert a valid address")
      ).toBeInTheDocument();
    });
  });
});
