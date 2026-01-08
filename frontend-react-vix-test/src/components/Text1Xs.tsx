import { SxProps, Typography } from "@mui/material";

interface IProps {
  sx?: SxProps;
  children?: React.ReactNode;
}

export const TextRob14Font1Xs = ({ sx = {}, children }: IProps) => {
  return (
    <Typography
      sx={{
        fontFamily: "Roboto",
        fontWeight: 500,
        fontSize: "14px",
        lineHeight: "20px",
        letterSpacing: "2%",
        ...sx,
      }}
    >
      {children}
    </Typography>
  );
};
