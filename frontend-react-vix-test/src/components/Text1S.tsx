import { SxProps, Typography } from "@mui/material";

interface IProps {
  sx?: SxProps;
  children?: React.ReactNode;
}

export const TextRob16Font1S = ({ sx = {}, children }: IProps) => {
  return (
    <Typography
      sx={{
        fontFamily: "Roboto",
        fontWeight: 400,
        fontSize: "16px",
        lineHeight: "20px",
        letterSpacing: "2%",
        ...sx,
      }}
    >
      {children}
    </Typography>
  );
};
