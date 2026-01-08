import { Backdrop, CircularProgress, SxProps } from "@mui/material";
import React from "react";
import { useZTheme } from "../stores/useZTheme";

export const AbsoluteBackDrop = ({
  open,
  sx,
  sxCircularProgress,
}: {
  open: boolean;
  sx?: SxProps;
  sxCircularProgress?: SxProps;
}) => {
  const { mode, theme, maxZindex } = useZTheme();
  if (!open) return null;
  return (
    <Backdrop
      open={open}
      sx={{
        zIndex: maxZindex,
        ...sx,
      }}
    >
      <CircularProgress
        color="inherit"
        sx={{
          ...sxCircularProgress,
          color: theme[mode].blue,
        }}
      />
    </Backdrop>
  );
};
