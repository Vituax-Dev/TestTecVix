import { Modal, Stack } from "@mui/material";
import { useZTheme } from "../../../../stores/useZTheme";
import { useTranslation } from "react-i18next";
import { TextRob32Font1L } from "../../../../components/Text1L";
import { TextRob16FontL } from "../../../../components/TextL";
import { ActionButton } from "../../../../components/Buttons/ActionButton";
import { TextRob14FontXsB } from "../../../../components/TextXsB";

// TextRob14FontXsB

interface IProps {
  open: boolean;
  onClose: () => void;
}

export const ModalUserNotActive = ({ open, onClose }: IProps) => {
  const { theme, mode } = useZTheme();
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
        direction="column"
        sx={{
          backgroundColor: theme[mode].mainBackground,
          width: "350px",
          borderRadius: "8px",
          padding: "24px",
          gap: "12px",
        }}
      >
        {/* Title */}
        <TextRob32Font1L
          sx={{
            color: theme[mode].primary,
            fontSize: "16px",
            lineHeight: "20px",
          }}
        >
          {t("alerts.userNotActive")}
        </TextRob32Font1L>

        {/* Description */}
        <Stack sx={{ flexDirection: "row", justifyContent: "space-between" }}>
          <TextRob16FontL
            sx={{
              color: theme[mode].gray,
            }}
          >
            {`${t("alerts.userNotActiveSuport")}`}
          </TextRob16FontL>
        </Stack>
        {/* Buttons */}
        <Stack
          sx={{
            width: "100%",
            justifyContent: "space-around",
            alignItems: "center",
            marginTop: "8px",
            flexDirection: "row",
          }}
        >
          <ActionButton
            backgroundColor={theme[mode].blueMedium}
            onClick={onClose}
            sx={{
              borderRadius: "12px",
              height: "32px",
              width: "142px",
            }}
            text={
              <TextRob14FontXsB
                sx={{
                  fontSize: "12px",
                  color: theme[mode].btnDarkBlue,
                  fontWeight: "500",
                }}
              >
                {t("generic.close")}
              </TextRob14FontXsB>
            }
          />
        </Stack>
      </Stack>
    </Modal>
  );
};
