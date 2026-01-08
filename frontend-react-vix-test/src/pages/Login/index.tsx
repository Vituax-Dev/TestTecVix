import { Stack } from "@mui/material";
import { MainLoginForm } from "./components/MainLoginForm";
import { useZTheme } from "../../stores/useZTheme";
import { DisplayCarousel } from "./components/DisplayCarousel";
import { useWindowSize } from "../../hooks/useWindowSize";

export const LoginPage = () => {
  const { mode } = useZTheme();
  const { width, height } = useWindowSize();

  return (
    <Stack
      sx={{
        height,
        width,
        overflowY: "auto",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        background:
          mode === "light"
            ? "linear-gradient(117deg, #FFF 39.68%, var(--c1, #F9F9F9) 100%);"
            : "linear-gradient(117deg, var(--c6, #252930) 39.61%, var(--alt-gray, #181B20) 100%);",
      }}
    >
      {/* Login box */}
      <Stack
        sx={{
          width: "100%",
          padding: "16px",
          maxWidth: "700px",
          height: "100%",
          alignItems: "center",
        }}
      >
        {/* Main form */}
        <MainLoginForm />
      </Stack>
      {/* Carousel */}
      <Stack
        sx={{
          width: "100%",
          height: "100%",
          maxWidth: "900px",
          justifyContent: "center",
          alignItems: "center",
          padding: "16px",
          "@media (max-width: 1000px)": {
            display: "none",
          },
        }}
      >
        <DisplayCarousel />
      </Stack>
    </Stack>
  );
};
