import { useZTheme } from "../../../stores/useZTheme";
import { Checkbox, FormControlLabel, Stack, SxProps } from "@mui/material";
import { TextRob16FontL } from "../../../components/TextL";

interface Props {
  sx?: SxProps;
  value?: boolean;
  onChange: (value: boolean) => void;
  label?: string;
  sxLabel?: SxProps;
  disabled?: boolean;
}

export const CheckboxLabel = ({
  sx,
  value,
  onChange,
  label,
  sxLabel,
  disabled,
}: Props) => {
  const { theme, mode } = useZTheme();

  return (
    <Stack
      sx={{
        width: "100%",
        gap: "12px",
      }}
    >
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
            }}
            checked={value}
            onChange={() => onChange(!value)}
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
    </Stack>
  );
};
