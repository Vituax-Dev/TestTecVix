import { SxProps, Typography } from "@mui/material";

interface IProps {
  sx?: SxProps;
  children?: React.ReactNode;
}

export const TextRob12Font2Xs = ({ sx = {}, children }: IProps) => {
  return (
    <Typography
      sx={{
        fontFamily: "Roboto",
        fontWeight: 400,
        fontSize: "12px",
        lineHeight: "16px",
        letterSpacing: "1%",
        ...sx,
      }}
    >
      {children}
    </Typography>
  );
};
