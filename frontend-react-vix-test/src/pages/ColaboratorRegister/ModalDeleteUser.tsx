import { Stack, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useZTheme } from "../../stores/useZTheme";
import { useZColaboratorRegisterPage } from "../../stores/useZColaboratorRegisterPage";
import { useUserResources } from "../../hooks/useUserResources";
import { TextRob16Font1S } from "../../components/Text1S";
import { TextRob18Font2M } from "../../components/Text2M";
import { Btn } from "../../components/Buttons/Btn";

interface ModalDeleteUserProps {
  onCancel: () => void;
  onConfirm: () => void;
}

export const ModalDeleteUser = ({ onCancel, onConfirm }: ModalDeleteUserProps) => {
  const { theme, mode } = useZTheme();
  const { t } = useTranslation();
  const { deleteUserById, isLoading } = useUserResources();
  const { userToBeDeleted, setUserToBeDeleted, setModalOpen } = useZColaboratorRegisterPage();

  const handleConfirm = async () => {
    if (!userToBeDeleted) return;

    const result = await deleteUserById(userToBeDeleted.idUser);
    if (result) {
      setUserToBeDeleted(null);
      setModalOpen(null);
      onConfirm();
    }
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: theme[mode].lightV2,
        borderRadius: "16px",
        padding: "32px",
        minWidth: "400px",
        maxWidth: "500px",
      }}
    >
      <Stack sx={{ gap: "24px", alignItems: "center" }}>
        <TextRob18Font2M sx={{ color: theme[mode].primary, textAlign: "center" }}>
          {t("colaboratorRegister.areYouSure", { username: userToBeDeleted?.username || "" })}
        </TextRob18Font2M>

        <Stack sx={{ flexDirection: "row", gap: "16px" }}>
          <Btn
            onClick={handleConfirm}
            disabled={isLoading}
            sx={{
              background: theme[mode].danger,
              color: "#fff",
              borderRadius: "24px",
              padding: "12px 32px",
              "&:hover": {
                background: theme[mode].danger,
              },
            }}
          >
            <TextRob16Font1S>{t("colaboratorRegister.ok")}</TextRob16Font1S>
          </Btn>
          <Btn
            onClick={onCancel}
            sx={{
              background: theme[mode].grayLight,
              color: theme[mode].primary,
              borderRadius: "24px",
              padding: "12px 32px",
              "&:hover": {
                background: theme[mode].gray,
              },
            }}
          >
            <TextRob16Font1S>{t("colaboratorRegister.back")}</TextRob16Font1S>
          </Btn>
        </Stack>
      </Stack>
    </Box>
  );
};
