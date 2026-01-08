import { SxProps, Typography } from "@mui/material";

interface IProps {
  sx?: SxProps;
  children?: React.ReactNode;
}

export const TextRob20Font1MC = ({ sx = {}, children }: IProps) => {
  return (
    <Typography
      sx={{
        fontFamily: "Roboto",
        fontWeight: 500,
        fontSize: "20px",
        lineHeight: "24px",
        letterSpacing: "2%",
        ...sx,
      }}
    >
      {children}
    </Typography>
  );
};
