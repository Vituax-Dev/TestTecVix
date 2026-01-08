import { useTranslation } from "react-i18next";
import { useZTheme } from "../../../../stores/useZTheme";
import { Modal, Stack } from "@mui/material";
import { TextRob32Font1L } from "../../../../components/Text1L";
import { TextRob16FontL } from "../../../../components/TextL";
import { ActionButton } from "../../../../components/Buttons/ActionButton";
import { TextRob14FontXsB } from "../../../../components/TextXsB";

interface IProps {
  open: boolean;
  onClose: () => void;
  onCancel: () => void;
  onConfirm: () => void;
}
export const ModalWarningDisk = ({
  open,
  onClose,
  onCancel,
  onConfirm,
}: IProps) => {
  const { theme, mode } = useZTheme();
  const { t } = useTranslation();

  const sxModal = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const sx = {
    backgroundColor: theme[mode].mainBackground,
    width: "350px",
    borderRadius: "8px",
    padding: "24px",
    gap: "12px",
  };

  return (
    <>
      <Modal open={open} onClose={onClose} sx={sxModal}>
        <Stack direction="column" sx={sx}>
          {/* Title */}
          <TextRob32Font1L
            sx={{
              color: theme[mode].primary,
              fontSize: "16px",
              lineHeight: "20px",
            }}
          >
            {t("alerts.diskAsk")}
          </TextRob32Font1L>

          {/* Description */}
          <Stack sx={{ flexDirection: "row", justifyContent: "space-between" }}>
            <TextRob16FontL
              sx={{
                color: theme[mode].gray,
                cursor: "pointer",
              }}
            >
              {`${t("alerts.diskUpgrade")}`}
              <span
                onClick={() => {}}
                style={{
                  marginLeft: "4px",
                  color: theme[mode].gray,
                  fontWeight: "500",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                {t("sidebar.costsAndFinances")}
              </span>
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
              onClick={onCancel}
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
              onClick={onConfirm}
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
                  {t("generic.resizePlan")}
                </TextRob14FontXsB>
              }
            />
          </Stack>
        </Stack>
      </Modal>
    </>
  );
};
