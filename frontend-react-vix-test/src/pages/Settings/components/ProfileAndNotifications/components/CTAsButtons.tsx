import { Button, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useZTheme } from "../../../../../stores/useZTheme";
import { TextRob16FontL } from "../../../../../components/TextL";
import { toast } from "react-toastify";
import { useZFormProfileNotifications } from "../../../../../stores/useZFormProfileNotifications";
import { useUserResources } from "../../../../../hooks/useUserResources";
import { useZUserProfile } from "../../../../../stores/useZUserProfile";

export const CTAsButtons = () => {
  const { t } = useTranslation();
  const { theme, mode } = useZTheme();
  const { updateMe, isLoading } = useUserResources();
  const { imageUrl } = useZUserProfile();
  const {
    fullNameForm,
    userName,
    userEmail,
    userPhone,
    password,
    confirmPassword,
    resetAll,
  } = useZFormProfileNotifications();

  const validateForm = (): boolean => {

    if (!userName.value || userName.value.length < 2) {
      toast.error(t("profileAndNotifications.invalidData"));
      return false;
    }
    if (!userEmail.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail.value)) {
      toast.error(t("profileAndNotifications.invalidData"));
      return false;
    }
    if (password.value && password.value !== confirmPassword.value) {
      toast.error(t("colaboratorRegister.dontMatch"));
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    const phoneDigits = userPhone.value ? userPhone.value.replace(/\D/g, "") : null;

    const data: {
      username?: string;
      email?: string;
      fullName?: string | null;
      phone?: string | null;
      password?: string;
      profileImgUrl?: string | null;
    } = {
      username: userName.value,
      email: userEmail.value,
      fullName: fullNameForm.value || null,
      phone: phoneDigits || null,
    };

    // Só envia a senha se foi preenchida
    if (password.value) {
      data.password = password.value;
    }

    // Envia a imagem de perfil se foi alterada
    if (imageUrl) {
      data.profileImgUrl = imageUrl;
    }

    const result = await updateMe(data);
    if (result) {
      toast.success(t("generic.dataSavesuccess"));
    }
  };

  const handleReset = () => {
    resetAll();
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
        disabled={isLoading}
      >
        <TextRob16FontL
          sx={{
            color: theme[mode].btnText,
            fontWeight: "500",
            fontFamily: "Roboto",
            lineHeight: "16px",
          }}
        >
          {isLoading ? t("whiteLabel.loading") : t("profileAndNotifications.saveChanges")}
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
        onClick={handleReset}
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
