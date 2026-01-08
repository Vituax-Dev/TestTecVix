import { Button, Stack } from "@mui/material";
import { useZTheme } from "../../stores/useZTheme";
import { CheckCircleIcon } from "../../icons/CheckCircleIcon";
import { TextRob20Font1M } from "../../components/Text1M";
import { TextRob16Font1S } from "../../components/Text1S";
import { useTranslation } from "react-i18next";

export const MspModal = ({
  modalType,
  onClose,
}: {
  modalType: "editedMsp" | "createdMsp";
  onClose: () => void;
}) => {
  const { theme, mode } = useZTheme();
  const { t } = useTranslation();
  return (
    <Stack
      sx={{
        width: "fit-content",
        alignSelf: "center",
        justifySelf: "center",
        gap: "20px",
        boxSizing: "border-box",
        padding: "24px",
        borderRadius: "16px",
        background: theme[mode].mainBackground,
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CheckCircleIcon color={theme[mode].ok} size={"36px"} />
      <TextRob20Font1M
        sx={{
          color: theme[mode].primary,
          fontWeight: "400",
        }}
      >
        {modalType === "editedMsp"
          ? t("mspRegister.editedMsp")
          : t("mspRegister.createdMsp")}
      </TextRob20Font1M>
      <Button
        sx={{
          width: "100px",
          background: theme[mode].blue,
          height: "40px",
          borderRadius: "12px",
          textTransform: "none",
        }}
        onClick={onClose}
      >
        <TextRob16Font1S
          sx={{
            fontWeight: "400",
            color: theme[mode].btnText,
          }}
        >
          {t("colaboratorRegister.ok")}
        </TextRob16Font1S>
      </Button>
    </Stack>
  );
};
