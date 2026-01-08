import { Checkbox, FormControlLabel, SxProps } from "@mui/material";
import { useZTheme } from "../stores/useZTheme";
import { TextRob16FontL } from "./TextL";

interface IProps {
  checked: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  sx?: SxProps;
  sxLabel?: SxProps;
  label?: string;
  sxCheckbox?: SxProps;
  disabled?: boolean;
}

export const CheckboxLabel = ({
  checked,
  handleChange,
  sx,
  sxLabel,
  label,
  sxCheckbox,
  disabled,
}: IProps) => {
  const { mode, theme } = useZTheme();

  return (
    <FormControlLabel
      sx={{
        padding: 0,
        alignItems: "center",
        gap: "4px",
        ...sx,
      }}
      control={
        <Checkbox
          disabled={disabled}
          sx={{
            padding: 0,
            paddingLeft: 1,
            ...(mode === "dark" && {
              "& .MuiSvgIcon-root": {
                borderRadius: "4px",
              },
              "&.Mui-checked .MuiSvgIcon-root": {
                border: "none",
              },
            }),
            "& .MuiSvgIcon-root path": {
              fill: theme[mode].gray,
            },
            "&.Mui-checked .MuiSvgIcon-root path": {
              fill: theme[mode].blue,
            },
            ...sxCheckbox,
          }}
          checked={checked}
          onChange={handleChange}
          // icon={<b>x</b>}
          // checkedIcon={<p>Ok</p>}
        />
      }
      label={
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
      }
    />
  );
};
