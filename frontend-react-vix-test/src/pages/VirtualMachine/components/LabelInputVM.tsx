import {
  FormControl,
  IconButton,
  Stack,
  SxProps,
  TextField,
} from "@mui/material";
import { TextRob16FontL } from "../../../components/TextL";
import { useZTheme } from "../../../stores/useZTheme";
import { useState } from "react";
import { VisibilityOn, VisibilityOff } from "../../../icons/Visibility";

interface Props {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  sx?: SxProps;
  sxLabel?: SxProps;
  containerSx?: SxProps;
  className?: string;
  type?: string;
  disabled?: boolean;
}

export const LabelInputVM = ({
  value,
  onChange,
  label,
  placeholder,
  sx = {},
  sxLabel = {},
  containerSx = {},
  className = "",
  type = "text",
  disabled = false,
}: Props) => {
  const { theme, mode } = useZTheme();
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <FormControl
      className={className}
      sx={{
        alignItems: "flex-start",
        width: "100%",
        gap: "12px",
        position: "relative",
        ...containerSx,
      }}
    >
      <TextRob16FontL
        sx={{
          fontWeight: 400,
          lineHeight: "16px",
          color: theme[mode].primary,
          ...sxLabel,
        }}
      >
        {label}
      </TextRob16FontL>
      <TextField
        disabled={disabled}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type={showPassword ? "text" : type}
        sx={{
          width: "100%",
          backgroundColor: theme[mode].grayLight,
          borderRadius: "12px",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              border: "none",
            },
            "&:hover fieldset": {
              border: "none",
            },
            "&.Mui-focused fieldset": {
              border: `1px solid ${theme[mode].blue}`,
              borderRadius: "12px",
            },
          },
          ".MuiInputBase-input": {
            padding: "4px 8px",
            paddingLeft: "16px",
            height: "32px",
            color: theme[mode].primary,
            ...(type === "password" && { paddingRight: "40px" }),
            "&::placeholder": {
              color: theme[mode].tertiary,
              opacity: 1,
            },
          },
          "& .Mui-disabled": {
            cursor: "not-allowed",
            WebkitTextFillColor: theme[mode].primary + " !important",
            opacity: 1,
          },
          ...sx,
        }}
        id={`outlined-adornment-${label}`}
        placeholder={placeholder}
        aria-describedby={`outlined-${label}-helper-text`}
      />
      {type === "password" && (
        <Stack
          sx={{
            width: "28px",
            height: "28px",
            position: "absolute",
            right: "8px",
            top: "36px",
          }}
        >
          <IconButton
            aria-label="toggle-password-visibility"
            onClick={handleTogglePasswordVisibility}
            sx={{
              color: theme[mode].primary,
              minWidth: "0px",
              minHeight: "0px",
              padding: "0px",
              borderRadius: "50%",
            }}
          >
            {showPassword ? (
              <VisibilityOff fill={theme[mode].tertiary} />
            ) : (
              <VisibilityOn fill={theme[mode].tertiary} />
            )}
          </IconButton>
        </Stack>
      )}
    </FormControl>
  );
};
