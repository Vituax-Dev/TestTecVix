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
  const { updateUser, isLoading } = useUserResources();
  const { imageUrl, objectName } = useZUserProfile();
  const {
    fullNameForm,
    userName,
    userEmail,
    userPhone,
    currentPassword,
    password,
    confirmPassword,
    resetAll,
    setFormProfileNotifications,
  } = useZFormProfileNotifications();

  const handleSave = async () => {
    if (
      fullNameForm.errorMessage ||
      userName.errorMessage ||
      userEmail.errorMessage ||
      userPhone.errorMessage ||
      currentPassword.errorMessage ||
      password.errorMessage
    ) {
      return toast.error(t("profileAndNotifications.errorForm"));
    }

    if (password.value && !currentPassword.value) {
      return toast.error(t("profileAndNotifications.requiredField"));
    }

    const data: any = {
      fullName: fullNameForm.value,
      username: userName.value,
      email: userEmail.value,
      userPhoneNumber: userPhone.value,
    };

    if (password.value && currentPassword.value) {
      data.currentPassword = currentPassword.value;
      data.password = password.value;
    }

    if (imageUrl && objectName) {
      data.profileImgUrl = imageUrl;
    }

    const result = await updateUser(data);
    if (result) {
      setFormProfileNotifications({
        currentPassword: { value: "", errorMessage: "" },
        password: { value: "", errorMessage: "" },
        confirmPassword: { value: "", errorMessage: "" },
      });
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
        onClick={resetAll}
        disabled={isLoading}
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
