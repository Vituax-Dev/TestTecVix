import { Stack } from "@mui/material";
import animationData from "./slide-2-lottie.json";
import { useLottie } from "lottie-react";
export const SlideTwo = () => {
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
