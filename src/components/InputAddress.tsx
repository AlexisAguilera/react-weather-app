import { useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import useInputAddress from "../hooks/useInputAddress";

const Container = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  gap: 8,
  justifyContent: "center",
}));

interface InputAddressProps {
  onAddressChange: (latitude: number, longitude: number) => void;
}

const InputAddress = ({ onAddressChange }: InputAddressProps) => {
  const { setAddress, handleAddressSubmit, address, error } = useInputAddress({
    onAddressChange,
  });

  return (
    <Container>
      <TextField
        placeholder="Insert an address..."
        size="small"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        error={error}
        helperText={error ? "Please insert a valid address" : ""}
      />
      <Button
        variant="contained"
        onClick={handleAddressSubmit}
        size="medium"
        sx={{ height: "40px" }}
      >
        Get Forecast
      </Button>
    </Container>
  );
};

export default InputAddress;
