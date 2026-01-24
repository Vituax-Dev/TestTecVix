import { Button, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useZTheme } from "../../../../../stores/useZTheme";
import { TextRob16FontL } from "../../../../../components/TextL";
import { toast } from "react-toastify";
import { useZFormProfileNotifications } from "../../../../../stores/useZFormProfileNotifications";
import { useZUserProfile } from "../../../../../stores/useZUserProfile";
import { useUserResources } from "../../../../../hooks/useUserResources";
import { useZBrandInfo } from "../../../../../stores/useZBrandStore";
import { useState } from "react";

export const CTAsButtons = () => {
  const { t } = useTranslation();
  const { theme, mode } = useZTheme();
  const [isLoading, setIsLoading] = useState(false);

  const {
    companyEmail,
    companySMS,
    timeZone,
    resetAll,
    fullNameForm,
    userName,
    userEmail,
    userPhone,
    password,
    confirmPassword,
  } = useZFormProfileNotifications();
  const { objectName, role, idBrand, setUser } = useZUserProfile();
  const { updateProfileSettings } = useUserResources();
  const { setBrandInfo } = useZBrandInfo();

  const isAdmin = role === "admin";
  const isManager = role === "manager";
  const canEditCompany = (isAdmin || isManager) && idBrand !== null;

  const validateForm = (): boolean => {
    // Validate personal info fields
    if (fullNameForm.errorMessage || userName.errorMessage || userEmail.errorMessage || userPhone.errorMessage) {
      return false;
    }
    // Validate password match
    if (password.value && password.value !== confirmPassword.value) {
      return false;
    }
    // Validate company email if user can edit company
    if (canEditCompany && companyEmail.errorMessage) {
      return false;
    }
    // Validate company SMS if user can edit company
    if (canEditCompany && companySMS.errorMessage) {
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return toast.error(t("profileAndNotifications.errorForm"));
    }

    setIsLoading(true);

    try {
      // Build request data for unified endpoint
      const requestData: {
        profileImgUrl?: string;
        username?: string;
        fullName?: string;
        email?: string;
        phone?: string;
        password?: string;
        companyData?: {
          emailContact?: string;
          smsContact?: string;
          timezone?: string;
        };
      } = {};

      // Add profile image if changed
      if (objectName) {
        requestData.profileImgUrl = objectName;
      }

      // Add personal info if provided
      if (userName.value) {
        requestData.username = userName.value;
      }
      if (fullNameForm.value) {
        requestData.fullName = fullNameForm.value;
      }
      if (userEmail.value) {
        requestData.email = userEmail.value;
      }
      if (userPhone.value) {
        requestData.phone = userPhone.value;
      }

      // Add password if provided and matches confirmation
      if (password.value && password.value === confirmPassword.value) {
        requestData.password = password.value;
      }

      // Add company data if user can edit company
      if (canEditCompany) {
        requestData.companyData = {
          emailContact: companyEmail.value || undefined,
          smsContact: companySMS.value || undefined,
          timezone: timeZone.value || undefined,
        };
      }

      // Single request with transaction - if any fails, all rolled back
      const result = await updateProfileSettings(requestData);
      if (!result) {
        setIsLoading(false);
        return;
      }

      // Update user info in store
      if (result.user) {
        setUser({
          profileImgUrl: result.user.profileImgUrl || null,
          username: result.user.username || null,
          userEmail: result.user.email || null,
        });
      }

      // Update brand info in store if company data was updated
      if (result.brandMaster) {
        setBrandInfo({
          emailContact: result.brandMaster.emailContact || "",
          smsContact: result.brandMaster.smsContact || "",
          timezone: result.brandMaster.timezone || "",
        });
      }

      setIsLoading(false);
      toast.success(t("generic.dataSavesuccess"));
    } catch {
      setIsLoading(false);
      toast.error(t("generic.errorToSaveData"));
    }
  };

  const handleReset = () => {
    resetAll();
    window.location.reload();
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
          {isLoading
            ? t("generic.loading")
            : t("profileAndNotifications.saveChanges")}
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
