import { Button, SxProps } from "@mui/material";

interface IProps {
  onClick?: () => void;
  sx?: SxProps;
  className?: string;
  type?: "button" | "submit" | "reset" | undefined;
  id?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

export const Btn = ({
  onClick = () => {},
  sx = {},
  className = "",
  type = "button",
  id = "",
  children,
  disabled,
}: IProps) => {
  return (
    <Button
      disabled={disabled}
      className={className}
      onClick={onClick}
      sx={{
        textTransform: "none",
        padding: 0,
        minHeight: 0,
        minWidth: 0,
        borderRadius: "0px",
        "&:disabled": {
          opacity: 0.5,
        },
        ...sx,
      }}
      type={type}
      id={id}
    >
      {children}
    </Button>
  );
};
