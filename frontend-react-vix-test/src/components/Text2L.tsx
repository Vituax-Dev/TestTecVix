import { SxProps, Typography } from "@mui/material";

interface IProps {
  sx?: SxProps;
  children?: React.ReactNode;
}

export const TextRob28Font2L = ({ sx = {}, children }: IProps) => {
  return (
    <Typography
      sx={{
        fontFamily: "Roboto",
        fontWeight: 400,
        fontSize: "28px",
        lineHeight: "36px",
        letterSpacing: "1%",
        ...sx,
      }}
    >
      {children}
    </Typography>
  );
};
