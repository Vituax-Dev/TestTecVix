import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Popper, PopperProps, Stack, SxProps, Tooltip } from "@mui/material";
import { useZTheme } from "../../stores/useZTheme";
import { TextRob16FontL } from "../TextL";
import { shadow } from "../../utils/shadow";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { CloseXIcon } from "../../icons/CloseXIcon";
import { TooltipIcon } from "../../icons/TooltipIcon";
import { TextRob14Font1Xs } from "../Text1Xs";
import { useTranslation } from "react-i18next";
import { makeEllipsis } from "../../utils/makeEllipsis";

interface Props {
  data: {
    label: string;
    value: unknown;
  }[];
  sx?: SxProps;
  value?: { label: string; value: unknown } | null;
  onChange: (value: { label: string; value: unknown } | null) => void;
  onBlur?: () => void;
  label?: React.ReactNode;
  sideLabel?: React.ReactNode;
  toolTipMessage?: React.ReactNode;
  sxSidelabel?: React.CSSProperties;
  sxLabel?: SxProps;
  sxContainer?: SxProps;
  errorMessage?: React.ReactNode;
  disabled?: boolean;
  sxItemList?: SxProps;
  placeholder?: string;
  placeholderIcon?: React.ReactNode;
}

const CustomPopper = (props: PopperProps) => {
  const { theme, mode } = useZTheme();
  return (
    <Popper
      {...props}
      sx={{
        backgroundColor: theme[mode].mainBackground,
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: `0px 4px 4px 2px ${shadow(mode)}`,
        "& .MuiPaper-root": {
          backgroundColor: theme[mode].mainBackground,
          overflow: "hidden",
          borderRadius: "12px",
        },
      }}
      modifiers={[
        {
          name: "offset",
          options: {
            offset: [0, 8],
          },
        },
      ]}
    />
  );
};

export const DropDownLabelToolTip = ({
  data = [],
  sx = {},
  value = null,
  onChange,
  label,
  sxLabel,
  sxContainer,
  disabled,
  toolTipMessage,
  onBlur = () => {},
  sxItemList,
  placeholder,
  placeholderIcon,
}: Props) => {
  const { theme, mode } = useZTheme();
  const { t } = useTranslation();
  return (
    <Stack
      sx={{
        width: "100%",
        gap: "12px",
        ...sxContainer,
      }}
    >
      <Stack flexDirection={"row"} gap={"8px"} alignItems={"center"}>
        <TextRob16FontL
          sx={{
            color: theme[mode].black,
            fontSize: "14px",
            fontFamily: "Roboto",
            fontWeight: "400",
            lineHeight: "16px",
            wordWrap: "break-word",
            ...sxLabel,
          }}
        >
          {label}
        </TextRob16FontL>
        {Boolean(toolTipMessage) && (
          <Tooltip title={toolTipMessage}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <TooltipIcon fill={theme[mode].btnDarkBlue} />
            </div>
          </Tooltip>
        )}
      </Stack>
      <Autocomplete
        disabled={disabled}
        disablePortal
        onBlur={onBlur}
        options={data}
        noOptionsText={
          <TextRob14Font1Xs
            sx={{
              color: theme[mode].primary,
              fontWeight: "400",
              lineHeight: "16px",
            }}
          >
            {t("myVMs.noOptions")}
          </TextRob14Font1Xs>
        }
        slots={{ popper: CustomPopper }}
        renderInput={(params) => {
          const inputProps = {
            ...params.inputProps,
            autoComplete: "off",
          };
          return (
            <TextField
              {...params}
              disabled={disabled}
              autoComplete="off"
              placeholder={placeholder}
              sx={{
                "& .MuiInputBase-input::placeholder": {
                  color: theme[mode].gray,
                  opacity: 1,
                },
                "& .MuiAutocomplete-input": {
                  color: theme[mode].primary,
                  fontSize: "14px",
                  "&.Mui-disabled": {
                    cursor: "not-allowed",
                  },
                },
              }}
              slotProps={{
                htmlInput: {
                  ...inputProps,
                },
                input: {
                  ...params.InputProps,
                  startAdornment: <>{placeholderIcon}</>,
                },
              }}
            />
          );
        }}
        renderOption={(propsWithKey, option, { index }) => {
          const { key, ...props } = propsWithKey;
          return (
            <div key={`${key}-${index}`}>
              <li
                {...props}
                style={{
                  display: "flex",
                  alignItems: "center",
                  minWidth: 0, // Isso garante que os filhos respeitem o tamanho máximo
                }}
              >
                <TextRob14Font1Xs
                  sx={{
                    color: theme[mode].primary,
                    fontWeight: "400",
                    lineHeight: "16px",
                    padding: "12px 20px",
                    alignItems: "center",
                    maxWidth: "100%", // Garante que o texto não ultrapasse
                    flexGrow: 1, // Faz com que o texto ocupe o espaço disponível
                    display: "flex",
                    ...makeEllipsis(), // Aplica o ellipsis
                    ...sxItemList,
                  }}
                >
                  {option.label}
                </TextRob14Font1Xs>
              </li>
            </div>
          );
        }}
        value={value}
        onChange={(_, value) => onChange(value)}
        popupIcon={<ExpandMoreIcon sx={{ color: theme[mode].primary }} />}
        clearIcon={<CloseXIcon fill={theme[mode].primary} width={"18px"} />}
        slotProps={{
          listbox: {
            sx: {
              backgroundColor: theme[mode].mainBackground,
              color: theme[mode].primary,
              fontSize: "14px",
              gap: "8px",
              "& .MuiAutocomplete-option": {
                padding: "4px 12px",
                "&:hover": {
                  backgroundColor: theme[mode].grayLight,
                },
              },
            },
          },
        }}
        sx={{
          backgroundColor: "transparent",
          borderRadius: "12px",
          "& .MuiOutlinedInput-root": {
            height: "40px",
            backgroundColor: theme[mode].mainBackground,
            borderRadius: "12px",
            border: "1px solid " + theme[mode].tertiary,
            "& fieldset": {
              borderColor: "transparent",
            },
            "&:hover fieldset": {
              borderColor: "transparent",
            },
            "&.Mui-focused": {
              backgroundColor: theme[mode].mainBackground,
              "& fieldset": {
                border: "none", //"1px solid " + "transparent",
              },
            },
            "& .MuiAutocomplete-popupIndicator": {
              color: theme[mode].gray,
            },
            "& .MuiAutocomplete-clearIndicator": {
              color: theme[mode].blue,
              "&:hover": {},
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
