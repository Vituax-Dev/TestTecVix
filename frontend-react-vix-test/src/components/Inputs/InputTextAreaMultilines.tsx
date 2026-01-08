import React from "react";
import {
  Box,
  FormControl,
  InputAdornment,
  Stack,
  SxProps,
  TextField,
  Tooltip,
} from "@mui/material";
import { TextRob16FontL } from "../TextL";
import { useZTheme } from "../../stores/useZTheme";
import { TooltipIcon } from "../../icons/TooltipIcon";

interface IProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  sx?: SxProps;
  containerSx?: SxProps;
  className?: string;
  disabled?: boolean;
  /** Ícone à esquerda (apenas single-line) */
  icon?: JSX.Element;
  label?: React.ReactNode;
  toolTipMessage?: React.ReactNode;
  /** Rótulo à direita do título, útil para hints curtos */
  sideLabel?: React.ReactNode;
  sxSidelabel?: React.CSSProperties;
  sxLabel?: SxProps;
  sxContainer?: SxProps; // preferir este (mantive compat com containerSx)
  inputName?: string | undefined;
  autoComplete?: string;
  onClickIcon?: () => void;
  /** Texto curto exibido à direita do input. Em multiline vira overlay. */
  endText?: string;
  /** Limite para contador (não corta por padrão) */
  limit?: number;
  /** Se true, aplica maxLength para cortar o valor em tempo real */
  forceLimit?: boolean;

  /** === Multiline / TextArea === */
  rows?: number;
  /** Altura dinâmica: usa minRows/maxRows (prioriza se definidos) */
  minRows?: number;
  maxRows?: number;
}

export const InputTextAreaMultilines = ({
  value,
  onChange,
  label,
  placeholder,
  sx = {},
  sxLabel = {},
  className = "",
  disabled = false,
  sxContainer,
  containerSx, // legado
  inputName,
  autoComplete = "",
  onBlur = () => {},
  toolTipMessage,
  endText,
  limit,
  forceLimit = false,
  icon,
  onClickIcon,
  sideLabel,
  sxSidelabel,
  rows,
  minRows,
  maxRows,
}: IProps) => {
  const { theme, mode } = useZTheme();

  const handleChange = (next: string) => {
    if (forceLimit && typeof limit === "number") {
      onChange(next.slice(0, limit));
      return;
    }
    onChange(next);
  };

  const hasCounter = typeof limit === "number" && limit > 0;
  const counterColor =
    (value?.length || 0) > (limit || Infinity)
      ? theme[mode].danger
      : theme[mode].gray;

  const mergedContainerSx = { ...containerSx, ...sxContainer };

  return (
    <FormControl
      className={className}
      sx={{
        alignItems: "flex-start",
        width: "100%",
        gap: "12px",
        position: "relative",
        ...mergedContainerSx,
      }}
    >
      {/* Cabeçalho: label + tooltip + sideLabel */}
      <Stack
        flexDirection={"row"}
        gap={"8px"}
        alignItems={"center"}
        justifyContent={"space-between"}
        sx={{ width: "100%" }}
      >
        <Stack direction="row" gap="8px" alignItems="center">
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
                <TooltipIcon
                  onClick={(e) => e.stopPropagation()}
                  fill={theme[mode].btnDarkBlue}
                  style={{ cursor: "help" }}
                />
              </div>
            </Tooltip>
          )}
        </Stack>

        {sideLabel && (
          <div style={{ ...sxSidelabel }}>
            {typeof sideLabel === "string" ? (
              <TextRob16FontL
                sx={{
                  color: theme[mode].gray,
                  fontSize: "12px",
                  lineHeight: "14px",
                }}
              >
                {sideLabel}
              </TextRob16FontL>
            ) : (
              sideLabel
            )}
          </div>
        )}
      </Stack>

      {/* Container relativo para suportar overlay do endText no multiline */}
      <Box sx={{ position: "relative", width: "100%" }}>
        <TextField
          onBlur={onBlur}
          disabled={disabled}
          name={inputName}
          autoComplete={autoComplete}
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          // Em multiline, ignorar 'type'
          type={undefined}
          multiline={true}
          rows={rows}
          minRows={minRows}
          maxRows={maxRows}
          sx={{
            width: "100%",
            backgroundColor: theme[mode].mainBackground,

            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                border: "1px solid " + theme[mode].tertiary,
                borderRadius: "12px",
              },
              "&:hover fieldset": {
                border: "1px solid " + theme[mode].tertiary,
              },
              "&.Mui-focused fieldset": {
                border: "1px solid " + theme[mode].tertiary,
                borderRadius: "12px",
              },
            },

            // Ajustes de padding entre single-line e multiline
            ".MuiInputBase-input": {
              height: "auto",
              color: theme[mode].primary,
              "&::placeholder": {
                color: theme[mode].tertiary,
                opacity: 1,
              },
            },

            "& .Mui-disabled": {
              cursor: "not-allowed",
              WebkitTextFillColor: theme[mode].primary + " !important",
              opacity: 0.7,
              "& fieldset": {
                cursor: "not-allowed",
              },
            },

            ...sx,
          }}
          id={`outlined-adornment-${String(label)}`}
          placeholder={placeholder}
          aria-describedby={`outlined-${String(label)}-helper-text`}
          slotProps={{
            htmlInput: {
              ...(forceLimit && typeof limit === "number"
                ? { maxLength: limit }
                : {}),
            },
            input: {
              startAdornment: icon ? (
                <InputAdornment position="start">
                  <Box
                    onClick={onClickIcon}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      ml: 0.5,
                      mr: 0.5,
                      cursor: onClickIcon ? "pointer" : "default",
                      color: theme[mode].tertiary,
                      "& svg": { width: 20, height: 20 },
                    }}
                  >
                    {icon}
                  </Box>
                </InputAdornment>
              ) : undefined,
              endAdornment: undefined,
            },
          }}
        />

        {/* endText em MULTILINE como overlay (adornos não funcionam nativamente) */}
        {!!endText && (
          <Box
            sx={{
              position: "absolute",
              right: 12,
              bottom: 10,
              pointerEvents: "none",
              color: theme[mode].tertiary,
              fontSize: "14px",
              background: "transparent",
            }}
          >
            {endText}
          </Box>
        )}
      </Box>

      {/* Contador */}
      {hasCounter && (
        <TextRob16FontL
          sx={{
            color: counterColor,
            fontSize: "12px",
            fontFamily: "Roboto",
            fontWeight: "400",
            lineHeight: "14px",
            wordWrap: "break-word",
            ...sxLabel,
          }}
        >
          {value?.length || 0}/{limit}
        </TextRob16FontL>
      )}
    </FormControl>
  );
};
