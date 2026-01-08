import { Stack } from "@mui/material";
import animationData from "./slide-3-lottie.json";
import { useLottie } from "lottie-react";

export const SlideThree = () => {
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
