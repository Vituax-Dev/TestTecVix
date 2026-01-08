import { SxProps, Typography } from "@mui/material";

interface IProps {
  sx?: SxProps;
  children?: React.ReactNode;
}

export const TextRob14FontXsB = ({ sx = {}, children }: IProps) => {
  return (
    <Typography
      sx={{
        fontFamily: "Roboto",
        fontWeight: 400,
        fontSize: "14px",
        lineHeight: "20px",
        letterSpacing: "1%",
        ...sx,
      }}
    >
      {children}
    </Typography>
  );
};
