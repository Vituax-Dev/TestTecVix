import { Button, Typography } from "@mui/material";
import { useZTheme } from "../../../../stores/useZTheme";

export const BigPlusBtn = () => {
  const { theme, mode } = useZTheme();
  return (
    <Button
      sx={{
        width: 100,
        height: 100,
        borderRadius: "50%",
        backgroundColor: "transparent",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        overflow: "hidden",
      }}
    >
      <Typography
        sx={{
          fontSize: 150,
          fontWeight: 900,
          background: `radial-gradient(circle, ${theme[mode].primary}  1%, ${theme[mode].blue} 25%)`,
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        +
      </Typography>
    </Button>
  );
};
