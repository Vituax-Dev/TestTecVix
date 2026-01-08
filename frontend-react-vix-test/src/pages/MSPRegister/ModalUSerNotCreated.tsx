import { Button, Modal, Stack } from "@mui/material";
import { useZTheme } from "../../stores/useZTheme";
import { TextRob20Font1M } from "../../components/Text1M";
import { TextRob16Font1S } from "../../components/Text1S";
import { useTranslation } from "react-i18next";
import { WarningIcon } from "../../icons/WarningIcon";
import { useZMspRegisterPage } from "../../stores/useZMspRegisterPage";

export const ModalUSerNotCreated = ({
  onClose,
  open,
}: {
  onClose: () => void;
  open: boolean;
}) => {
  const { theme, mode } = useZTheme();
  const { t } = useTranslation();
  const { isEditing } = useZMspRegisterPage();

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
          maxWidth: "400px",
        }}
      >
        <WarningIcon
          style={{
            backgroundColor: theme[mode].warning + "50",
            borderRadius: "8px",
            padding: "4px",
          }}
          fill={theme[mode].warning}
          width={"42px"}
          height={"42px"}
        />
        <TextRob20Font1M
          sx={{
            fontSize: "16px",
            color: theme[mode].primary,
            fontWeight: "400",
            textAlign: "center",
          }}
        >
          {isEditing.length
            ? t("mspRegister.userAdminNotCreatedEdit")
            : t("mspRegister.userAdminNotCreated")}
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
            {t("mspRegister.ok")}
          </TextRob16Font1S>
        </Button>
      </Stack>
    </Modal>
  );
};
