import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Popper, Stack, SxProps } from "@mui/material";
import { useZTheme } from "../../../stores/useZTheme";
import { TextRob16FontL } from "../../../components/TextL";
import { shadow } from "../../../utils/shadow";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { CloseXIcon } from "../../../icons/CloseXIcon";

interface IOption {
  id?: number;
  label: string;
  value: unknown;
}

interface Props {
  data: IOption[];
  sx?: SxProps;
  value?: IOption | null;
  onChange: (value: IOption | null) => void;
  label?: string;
  sxLabel?: SxProps;
  sxContainer?: SxProps;
  disabled?: boolean;
  placeholder?: string;
}

export const DropDowText = ({
  data,
  sx = {},
  value,
  onChange,
  label,
  sxLabel,
  sxContainer,
  disabled,
  placeholder,
}: Props) => {
  const { theme, mode } = useZTheme();

  return (
    <Stack
      sx={{
        width: "100%",
        gap: "12px",
        ...sxContainer,
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
      <Autocomplete
        disabled={disabled}
        disablePortal
        options={data}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={placeholder}
            disabled={disabled}
            sx={{
              "& .MuiAutocomplete-input": {
                color: theme[mode].primary,
                fontSize: "14px",
                "&.Mui-disabled": {
                  cursor: "not-allowed",
                },
              },
            }}
          />
        )}
        value={value}
        onChange={(_, value) => onChange(value)}
        popupIcon={<ExpandMoreIcon sx={{ color: theme[mode].primary }} />}
        clearIcon={<CloseXIcon fill={theme[mode].primary} width={"18px"} />}
        PopperComponent={(props) => (
          <Popper
            {...props}
            sx={{
              ...props.sx,
              boxShadow: `0px 0px 4px ${shadow(mode)}`,
              borderRadius: "12px",
              overflow: "hidden",
            }}
          />
        )}
        slotProps={{
          popper: {
            sx: {
              border: "4px solid " + theme[mode].mainBackground,
            },
          },
          paper: {
            sx: {
              border: "4px solid " + theme[mode].mainBackground,
            },
          },
        }}
        ListboxProps={{
          sx: {
            backgroundColor: theme[mode].mainBackground,
            color: theme[mode].primary,
            fontSize: "14px",
            gap: "4px",
            "& .MuiAutocomplete-option": {
              padding: "4px 12px",
              "&:hover": {
                backgroundColor: theme[mode].grayLight,
              },
            },
          },
        }}
        sx={{
          backgroundColor: "transparent",
          borderRadius: "12px",
          "& .MuiOutlinedInput-root": {
            height: "40px",
            backgroundColor: theme[mode].grayLight,
            borderRadius: "12px",
            "& fieldset": {
              borderColor: "transparent",
            },
            "&:hover fieldset": {
              borderColor: theme[mode].blue,
            },
            "&.Mui-focused": {
              backgroundColor: theme[mode].mainBackground,
              "& fieldset": {
                borderColor: theme[mode].blue,
                boxShadow: `0px 0px 4px ${theme[mode].blue}`,
                borderWidth: "1px",
              },
            },
            "& .Mui-disabled": {
              cursor: "not-allowed",
              WebkitTextFillColor: theme[mode].primary + " !important",
              opacity: 0.5,
              "& fieldset": {
                cursor: "not-allowed",
              },
            },
          },
          ...sx,
        }}
      />
    </Stack>
  );
};
