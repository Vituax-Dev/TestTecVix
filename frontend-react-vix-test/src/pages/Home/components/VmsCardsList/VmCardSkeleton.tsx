import { Skeleton, Stack } from "@mui/material";
import { useZTheme } from "../../../../stores/useZTheme";
import { shadow } from "../../../../utils/shadow";

export const VmCardSkeleton = () => {
  const { mode } = useZTheme();
  return (
    <Stack
      sx={{
        height: "275px",
        minWidth: "200px",
        maxWidth: "200px",
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: `0px 4px 4px ${shadow(mode)}`,
      }}
    >
      <Skeleton variant="rectangular" height={"100%"} width={"100%"} />
    </Stack>
  );
};
