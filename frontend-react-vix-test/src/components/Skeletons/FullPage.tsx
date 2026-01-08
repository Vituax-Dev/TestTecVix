import { Skeleton, Stack } from "@mui/material";
import { Screen } from "../Screen";

export const FullPage = () => {
  return (
    <Screen
      className="skeleton h-screen w-screen"
      sx={{
        gap: "12px",
      }}
    >
      <Stack
        sx={{
          width: "100%",
          height: "88px",
        }}
      >
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          animation="wave"
        />
      </Stack>
      <Stack
        sx={{
          width: "100%",
          height: "100%",
        }}
      >
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          animation="pulse"
        />
      </Stack>
    </Screen>
  );
};
