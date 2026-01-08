import { Modal, Slider, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useZTheme } from "../../stores/useZTheme";
import { ActionButton } from "../Buttons/ActionButton";
import { useTranslation } from "react-i18next";
import { TextRob14FontXsB } from "../TextXsB";

export const ModalSlider = ({
  value,
  handleChange,
  closeModal,
  min = 1,
  max = 10,
  step = 1,
  posX = 900,
  posY = 450,
  label = "",
}: {
  value: number | string;
  handleChange: (number: number | string) => void;
  closeModal: () => void;
  min?: number;
  max?: number;
  step?: number;
  posX?: number;
  posY?: number;
  label?: string;
}) => {
  const [valueState, setValueState] = useState(0);
  const { theme, mode } = useZTheme();
  const { t } = useTranslation();
  return (
    <Modal open={true} onClose={closeModal}>
      <Stack
        direction="column"
        sx={{
          backgroundColor: theme[mode].mainBackground,
          width: "350px",
          borderRadius: "8px",
          marginTop: `${posY}px`,
          marginLeft: `${posX}px`,
          padding: "8px 16px",
          paddingLeft: "20px",
          paddingTop: "16px",
          gap: "5px",
        }}
      >
        <Typography
          sx={{
            color: theme[mode].primary,
            fontSize: "14px",
            fontWeight: 400,
            lineHeight: "21px",
            letterSpacing: "0.14px",
            wordWrap: "break-word",
          }}
        >
          {label ||
            `${t("generic.addDisk")}: ${value} + ${valueState} = ${+value + +valueState}`}
        </Typography>
        <Slider
          aria-label="min"
          value={valueState || min}
          step={step}
          min={min}
          max={max}
          onChange={(_event, weight) => setValueState(+weight as number)}
          sx={{
            width: "97%",
            "& .MuiSlider-thumb": {
              width: "30px",
              height: "30px",
              color: theme[mode].blue,
              "&::after": {
                position: "absolute",
                content: `"${valueState || 0}"`,
                width: "fit-content",
                color: theme[mode].mainBackground,
                fontSize: "12px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "0",
              },
            },
            "& .MuiSlider-track": {
              color: theme[mode].blue,
            },
            "& .MuiSlider-rail": {
              color: theme[mode].gray,
            },
          }}
        />
        {/* Range */}
        <Stack sx={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Typography
            sx={{
              color: theme[mode].primary,
              fontSize: "14px",
              fontWeight: 500,
              lineHeight: "21px",
              letterSpacing: "0.14px",
              wordWrap: "break-word",
            }}
          >
            {min}
          </Typography>
          <Typography
            sx={{
              color: theme[mode].primary,
              fontSize: "14px",
              fontWeight: 500,
              lineHeight: "21px",
              letterSpacing: "0.14px",
              wordWrap: "break-word",
              marginLeft: "12px",
            }}
          >
            {`${(max + min) / 2}`}
          </Typography>
          <Typography
            sx={{
              color: theme[mode].primary,
              fontSize: "14px",
              fontWeight: 500,
              lineHeight: "21px",
              letterSpacing: "0.14px",
              wordWrap: "break-word",
            }}
          >
            {max}
          </Typography>
        </Stack>
        {/* Buttons */}
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
            onClick={closeModal}
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
            onClick={() => {
              handleChange(+valueState + +value);
              closeModal();
            }}
            sx={{
              borderRadius: "12px",
              height: "32px",
              width: "142px",
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
