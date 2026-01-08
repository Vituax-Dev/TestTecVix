import { SxProps, Typography } from "@mui/material";

interface IProps {
  sx?: SxProps;
  children?: React.ReactNode;
}

export const TextRob20Font1MB = ({ sx = {}, children }: IProps) => {
  return (
    <Typography
      sx={{
        fontFamily: "Roboto",
        fontWeight: 500,
        fontSize: "20px",
        lineHeight: "24px",
        letterSpacing: "1%",
        ...sx,
      }}
    >
      {children}
    </Typography>
  );
};
