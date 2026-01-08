import { FormControl, SxProps, TextField } from "@mui/material";
import { useRefFocusEffectDelayed } from "../../hooks/useRefFocusEffectDelayed";

export interface IPropsLabelInput {
  label?: string;
  placeholder?: string;
  containerSx?: SxProps;
  type?: string;
  labelSx?: SxProps;
  sx?: SxProps;
  value?: string | number;
  hasFocusEffect?: boolean;
  onChange?: (value: string) => void;
  className?: string;
}

export const InputLabel = ({
  label = "",
  placeholder = "",
  type = "text",
  hasFocusEffect = true,
  onChange = () => {},
  value = "",
  containerSx = {},
  sx = {},
  className = "",
}: IPropsLabelInput) => {
  const { inputRef } = useRefFocusEffectDelayed();

  return (
    <FormControl
      className={className}
      sx={{
        alignItems: "center",
        width: "100%",
        ...containerSx,
      }}
    >
      <TextField
        {...(hasFocusEffect && { inputRef })}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type={type}
        sx={{
          width: "100%",
          backgroundColor: "#FAFAFA",
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              border: "none",
            },
            "&:hover fieldset": {
              border: "none",
            },
            "&.Mui-focused fieldset": {
              border: "none",
            },
          },
          ".MuiInputBase-input": {
            padding: "4px 8px",
            paddingLeft: "16px",
            height: "32px",
          },
          ...sx,
        }}
        id={`outlined-adornment-${label}`}
        placeholder={placeholder}
        aria-describedby={`outlined-${label}-helper-text`}
      />
    </FormControl>
  );
};
