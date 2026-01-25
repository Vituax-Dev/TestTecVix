import { useState } from "react";
import { InputBase, IconButton, InputAdornment, SxProps } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility"; // Ícones de olho
import VisibilityOff from "@mui/icons-material/VisibilityOff"; // Ícones de olho
import { useZTheme } from "../../stores/useZTheme";

interface IProps {
  value: string;
  disabled?: boolean;
  onChange: (value: string) => void;
  onBlur?: () => void;
  onEnter?: () => void;
  placeholder?: string;
  sx?: SxProps;
  inputSx?: { [key: string]: string | number };
  className?: string;
  type?: string;
  showIcon?: boolean;
  id?: string;
}

export const SimpleInput = ({
  value,
  onChange,
  placeholder,
  sx = {},
  type = "text",
  showIcon = true,
  id = "",
  inputSx = {},
  onEnter,
  disabled = false,
  ...props
}: IProps) => {
  const { theme, mode } = useZTheme();
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <InputBase
      id={id}
      type={type === "password" && !showPassword ? "password" : "text"}
      sx={{
        "label + &": {
          marginTop: "26px",
        },
        "& .MuiInputBase-input": {
          borderRadius: "20px",
          position: "relative",
          backgroundColor: theme[mode].tertiary,
          fontSize: 16,
          padding: "10px 12px",
          paddingTop: 0,
          paddingBottom: 0,
          transition: "box-shadow 0.2s ease-in-out",
          height: "50px",
          ...(mode === "dark" && { color: theme[mode].light }),
          ...(type === "password" && { paddingRight: "40px" }),
          ...inputSx,
        },
        "& .MuiInputBase-input:focus": {
          boxShadow: `0 0 8px 1px ${theme[mode].blue}66`,
          outline: "none",
          backgroundColor: theme[mode].light,
          color: theme[mode].dark,
        },
        ...sx,
      }}
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter" && onEnter) {
          onEnter();
        }
      }}
      placeholder={placeholder}
      onBlur={props.onBlur || undefined}
      endAdornment={
        type === "password" &&
        showIcon && (
          <InputAdornment
            position="end"
            sx={{
              position: "absolute",
              right: 0,
            }}
          >
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleTogglePasswordVisibility}
              edge="start"
            >
              {showPassword ? (
                <Visibility sx={{ color: theme[mode].tertiary }} />
              ) : (
                <VisibilityOff sx={{ color: theme[mode].tertiary }} />
              )}
            </IconButton>
          </InputAdornment>
        )
      }
      {...props}
    />
  );
};
