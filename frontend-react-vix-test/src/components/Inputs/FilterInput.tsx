import React, { useEffect, useState } from "react";
import { useZTheme } from "../../stores/useZTheme";
import { FormControl, Stack, SxProps, TextField } from "@mui/material";

export const FilterInput = ({
  value,
  onChange,
  sxContainer = {},
  type = "text",
  placeholder,
  sx = {},
  icon,
  hasDebounce = false,
  debounceDelay = 500,
}: {
  value: string;
  onChange: (value: string) => void;
  sxContainer?: SxProps;
  type?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  sx?: SxProps;
  hasDebounce?: boolean;
  debounceDelay?: number;
}) => {
  const { theme, mode } = useZTheme();
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputValue(newValue);
  };

  useEffect(() => {
    if (!hasDebounce) {
      onChange(inputValue);
      return;
    }
    const timeout = setTimeout(() => {
      onChange(inputValue);
    }, debounceDelay);
    return () => clearTimeout(timeout);
  }, [inputValue]);

  return (
    <FormControl
      sx={{
        alignItems: "flex-start",
        width: "216px",
        gap: "12px",
        position: "relative",
        ...sxContainer,
      }}
    >
      <TextField
        value={inputValue}
        onChange={handleChange}
        type={type}
        placeholder={placeholder}
        InputProps={{
          startAdornment: icon && (
            <Stack
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: theme[mode].gray, // Ajuste para estilizar o ícone
              }}
            >
              {icon}
            </Stack>
          ),
        }}
        sx={{
          width: "100%",
          backgroundColor: theme[mode].mainBackground,
          color: theme[mode].primary,
          borderRadius: "12px",
          fontSize: "14px",
          fontWeight: 400,
          boxSizing: "border-box",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              border: `1px solid ${theme[mode].gray}`,
              borderRadius: "12px",
            },
            "&:hover fieldset": {
              border: `1px solid ${theme[mode].gray}`, // Não altera no hover
            },
            "&.Mui-focused fieldset": {
              border: `1px solid ${theme[mode].blue}`,
              borderRadius: "12px",
            },
          },
          ".MuiInputBase-input": {
            padding: "8px", // Ajusta o padding interno
            color: theme[mode].primary,
          },
          "& .Mui-disabled": {
            cursor: "not-allowed",
            WebkitTextFillColor: theme[mode].primary + " !important",
            opacity: 1,
          },
          ...sx,
        }}
      />
    </FormControl>
  );
};
