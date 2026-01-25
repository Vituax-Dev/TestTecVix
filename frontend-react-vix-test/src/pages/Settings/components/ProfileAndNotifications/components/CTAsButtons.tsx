import { Button, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useZTheme } from "../../../../../stores/useZTheme";
import { TextRob16FontL } from "../../../../../components/TextL";
import { toast } from "react-toastify";
import { useUserResources } from "../../../../../hooks/useUserResources";
import { useZUserProfile } from "../../../../../stores/useZUserProfile";
import { useZFormProfileNotifications } from "../../../../../stores/useZFormProfileNotifications";

export const CTAsButtons = () => {
  const { t } = useTranslation();
  const { theme, mode } = useZTheme();
  const { updateUser, isLoading } = useUserResources();
  const { idUser, imageUrl } = useZUserProfile();
  const { fullName, userName, userEmail, userPhone, password, confirmPassword } =
    useZFormProfileNotifications();

  const handleSave = async () => {
    if (!userName.value || !userEmail.value) {
      return toast.error("Por favor, preencha os campos de nome de usuário e e-mail");
    }

    if (
      fullName.errorMessage ||
      userName.errorMessage ||
      userEmail.errorMessage
    ) {
      return toast.error(t("profileAndNotifications.errorForm"));
    }

    if (password.value !== confirmPassword.value) {
      return toast.error(
        t("colaboratorRegister.dontMatch") || "As senhas não coincidem",
      );
    }

    const success = await updateUser({
      fullName: fullName.value,
      username: userName.value,
      email: userEmail.value,
      phone: userPhone.value,
      profileImgUrl: imageUrl || null,
      ...(password.value && { password: password.value }),
    } as any);

    if (success) {
      toast.success(t("generic.dataSavesuccess"));
    }
  };

  return (
    <Stack
      flexDirection={"row"}
      sx={{
        gap: "24px",
        "@media (max-width: 745px)": {
          flexDirection: "column",
        },
      }}
    >
      <Button
        sx={{
          background: theme[mode].blue,
          border: `1px solid ${theme[mode].blue}`,
          textTransform: "none",
          borderRadius: "12px",
          height: "48px",
          fontWeight: "500",
          fontSize: "16px",
          width: "100%",
          maxWidth: "330px",
          "@media (max-width: 745px)": {
            maxWidth: "100%",
          },
        }}
        onClick={handleSave}
      >
        <TextRob16FontL
          sx={{
            color: theme[mode].btnText,
            fontWeight: "500",
            fontFamily: "Roboto",
            lineHeight: "16px",
          }}
        >
          {t("profileAndNotifications.saveChanges")}
        </TextRob16FontL>
      </Button>
      <Button
        sx={{
          background: "transparent",
          border: `1px solid ${theme[mode].blueDark}`,
          textTransform: "none",
          borderRadius: "12px",
          height: "48px",
          fontWeight: "500",
          fontSize: "16px",
          width: "100%",
          maxWidth: "330px",
          "@media (max-width: 745px)": {
            maxWidth: "100%",
          },
        }}
        onClick={() => {}}
      >
        <TextRob16FontL
          sx={{
            color: theme[mode].blueDark,
            fontWeight: "500",
            fontFamily: "Roboto",
            lineHeight: "16px",
          }}
        >
          {t("profileAndNotifications.redefineAllData")}
        </TextRob16FontL>
      </Button>
    </Stack>
  );
};
