import { IconButton, SxProps } from "@mui/material";
import { shadow } from "../../utils/shadow";
import React from "react";

interface IProps {
  backgroundColor?: string;
  hasShadow?: boolean;
  mode?: "light" | "dark";
  icon?: JSX.Element;
  text?: React.ReactNode;
  sx?: SxProps;
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
}

export const ActionButton = ({
  backgroundColor,
  hasShadow = true,
  mode,
  icon,
  sx,
  text,
  onClick,
  className,
  children,
}: IProps) => {
  return (
    <IconButton
      className={className}
      onClick={onClick}
      sx={{
        gap: "8px",
        borderRadius: "8px",
        backgroundColor: backgroundColor,
        padding: "8px 16px",
        ...(hasShadow && mode && { boxShadow: `0px 4px 4px ${shadow(mode)}` }),
        "&:hover": {
          backgroundColor: backgroundColor,
          opacity: 0.8,
        },
        ...sx,
      }}
    >
      {icon && icon}
      {text && text}
      {children && children}
    </IconButton>
  );
};
