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
  value: string | string | null | undefined;
  label?: string;
  sx?: SxProps;
  sxLabel?: SxProps;
  containerSx?: SxProps;
  className?: string;
  type?: string;
}

export const PreviewValue = ({
  value,
  label,
  sx = {},
  sxLabel = {},
  containerSx = {},
  className = "",
  type = "text",
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
        width: "100%",
        gap: "12px",
        position: "relative",
        flexDirection: "row",
        alignContent: "center",
        overflow: "hidden",
        alignItems: "center",
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
        {label}:
      </TextRob16FontL>
      <TextField
        value={value}
        type={showPassword ? "text" : type}
        disabled
        sx={{
          width: "100%",
          minWidth: "100px",
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
            WebkitTextFillColor: theme[mode].primary,
            opacity: 1,
          },
          ...sx,
        }}
        id={`outlined-adornment-${label}`}
        aria-describedby={`outlined-${label}-helper-text`}
      />
      {type === "password" && (
        <Stack
          sx={{
            width: "28px",
            height: "28px",
            position: "absolute",
            right: "8px",
            top: "8px",
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
