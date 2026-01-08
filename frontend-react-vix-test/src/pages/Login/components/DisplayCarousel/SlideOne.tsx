import { Stack } from "@mui/material";
import animationData from "./slide-1-lottie.json";
import { useLottie } from "lottie-react";

export const SlideOne = () => {
  const options = {
    animationData,
    loop: true,
    autoplay: true,
  };

  const { View } = useLottie(options);
  return (
    <Stack
      sx={{
        width: "100%",
        maxHeight: "100%",
        justifyContent: "center",
        alignItems: "center",
        gap: "32px",
        boxSizing: "border-box",
      }}
    >
      {View}
    </Stack>
  );
};
