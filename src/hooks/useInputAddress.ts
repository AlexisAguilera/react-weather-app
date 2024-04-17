import { useState } from "react";
import { fetchCoordinates } from "../services/geocodingService";

interface UseInputAddressProps {
  onAddressChange: (latitude: number, longitude: number) => void;
}

const useInputAddress = ({ onAddressChange }: UseInputAddressProps) => {
  const [address, setAddress] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const handleAddressSubmit = async () => {
    try {
      setError(false);
      const { lat, lon } = await fetchCoordinates(address);
      onAddressChange(lat, lon);
    } catch (error) {
      setError(true);
    }
  };

  return {
    error,
    address,
    setAddress,
    handleAddressSubmit,
  };
};

export default useInputAddress;
