import { SxProps, Typography } from "@mui/material";

interface IProps {
  sx?: SxProps;
  children?: React.ReactNode;
}

export const TextRob32Font1L = ({ sx = {}, children }: IProps) => {
  return (
    <Typography
      sx={{
        fontFamily: "Roboto",
        fontSize: "32px",
        lineHeight: "40px",
        fontWeight: 500,
        letterSpacing: "1%",
        ...sx,
      }}
    >
      {children}
    </Typography>
  );
};
