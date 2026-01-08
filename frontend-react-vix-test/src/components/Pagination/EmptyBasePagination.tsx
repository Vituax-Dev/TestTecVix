import { Box, SxProps } from "@mui/material";
import { useZTheme } from "../../stores/useZTheme";

interface IProps {
  sx?: SxProps;
}

export const EmptyBasePagination = ({ sx }: IProps) => {
  const { mode, theme } = useZTheme();

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        width: "100%",
        backgroundColor: theme[mode].grayLightV2,
        padding: "26px 24px",
        borderRadius: "0px 0px 16px 16px",
        ...sx,
      }}
    ></Box>
  );
};
