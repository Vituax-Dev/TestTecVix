import { CircularProgress, CircularProgressProps } from "@mui/material";
import React from "react";
import { useZTheme } from "../stores/useZTheme";

export const LoaderComponent = (props: CircularProgressProps) => {
  const { mode, theme } = useZTheme();
  return (
    <CircularProgress
      size={24}
      sx={{
        width: "100%",
        height: "100%",
        color: theme[mode].blue,
        ...props.sx,
      }}
    />
  );
};
