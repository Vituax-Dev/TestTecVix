import { Skeleton, Stack } from "@mui/material";

export const SkeletonTable = () => {
  return (
    <Stack
      sx={{
        width: "100%",
        height: "100%",
        padding: "24px",
      }}
    >
      <Stack
        sx={{
          width: "100%",
          height: "100%",
          borderRadius: "16px",
          overflow: "hidden",
        }}
      >
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100%"
          animation="wave"
        />
      </Stack>
    </Stack>
  );
};
