import { IconButton, Modal, Stack, SxProps } from "@mui/material";
import { useZTheme } from "../../stores/useZTheme";
import { CloseXIcon } from "../../icons/CloseXIcon";
import { TextRob12Font2Xs } from "../Text2Xs";
import { ActionButton } from "../Buttons/ActionButton";

import { useState } from "react";
import { InputLabel } from "../Inputs/Input";
import { useTranslation } from "react-i18next";
import { TextRob14FontXsB } from "../TextXsB";

interface IProps {
  open: boolean;
  value?: string | number | undefined | null;
  changeValue: (value: string | number) => void;
  onClose: () => void;
  label?: string | null | undefined | number;
  type?: string;
  sx?: SxProps;
}
export const ModalChangeValueInput = ({
  open,
  value,
  changeValue,
  onClose,
  label,
  type = "text",
  ...props
}: IProps) => {
  const { mode, theme } = useZTheme();
  const [valueState, setValueState] = useState(value);
  const { t } = useTranslation();

  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Stack
        sx={{
          width: "500px",
          height: "160px",
          backgroundColor: theme[mode].mainBackground,
          borderRadius: "16px",
          padding: "16px",
          ...props.sx,
        }}
      >
        {/* Header */}
        <Stack
          sx={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Stack>
            <TextRob12Font2Xs
              sx={{
                color: theme[mode].primary,
              }}
            >
              {label}
            </TextRob12Font2Xs>
          </Stack>
          <IconButton onClick={onClose}>
            <CloseXIcon fill={theme[mode].gray} />
          </IconButton>
        </Stack>
        {/* Input */}
        <Stack>
          <InputLabel
            type={type}
            sx={{
              borderRadius: "8px",
              backgroundColor: theme[mode].grayLight,
              ".MuiInputBase-input": {
                padding: "4px 8px",
                paddingLeft: "16px",
                height: "32px",
                color: theme[mode].gray,
              },
            }}
            value={valueState?.toString()}
            onChange={(e) => setValueState(e)}
          />
        </Stack>
        {/* Actions */}
        <Stack
          sx={{
            width: "100%",
            justifyContent: "space-around",
            alignItems: "center",
            marginTop: "auto",
            flexDirection: "row",
          }}
        >
          <ActionButton
            onClick={onClose}
            text={
              <TextRob14FontXsB
                sx={{
                  fontSize: "12px",
                  color: theme[mode].gray,
                  fontWeight: "500",
                  lineHeight: "16px",
                }}
              >
                {t("generic.cancel")}
              </TextRob14FontXsB>
            }
            sx={{
              backgroundColor: theme[mode].grayLight,
              width: "100px",
              height: "32px",
              borderRadius: "12px",
              "&:hover": {
                backgroundColor: theme[mode].grayLight,
                opacity: 0.8,
              },
            }}
          />
          <ActionButton
            backgroundColor={theme[mode].blueMedium}
            sx={{
              borderRadius: "12px",
              height: "32px",
              width: "142px",
            }}
            onClick={() => {
              if (valueState) changeValue(valueState as string);
              onClose();
            }}
            text={
              <TextRob14FontXsB
                sx={{
                  fontSize: "12px",
                  color: theme[mode].btnDarkText,
                  fontWeight: "500",
                }}
              >
                {t("generic.save")}
              </TextRob14FontXsB>
            }
          />
        </Stack>
      </Stack>
    </Modal>
  );
};
