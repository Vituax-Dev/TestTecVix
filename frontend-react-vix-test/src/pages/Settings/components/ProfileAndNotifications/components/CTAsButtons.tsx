import { Button, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useZTheme } from "../../../../../stores/useZTheme";
import { TextRob16FontL } from "../../../../../components/TextL";
import { toast } from "react-toastify";
import { useZFormProfileNotifications } from "../../../../../stores/useZFormProfileNotifications";
import { useZUserProfile } from "../../../../../stores/useZUserProfile";
import { useUserResources } from "../../../../../hooks/useUserResources";
import { useBrandMasterResources } from "../../../../../hooks/useBrandMasterResources";
import { useState } from "react";

export const CTAsButtons = () => {
  const { t } = useTranslation();
  const { theme, mode } = useZTheme();
  const [isLoading, setIsLoading] = useState(false);

  const { companyEmail, companySMS, timeZone, resetAll } =
    useZFormProfileNotifications();
  const { objectName, role, idBrand } = useZUserProfile();
  const { updateUser } = useUserResources();
  const { updateBrandMasterInfo } = useBrandMasterResources();

  const isAdmin = role === "admin";
  const isManager = role === "manager";
  const canEditCompany = (isAdmin || isManager) && idBrand !== null;

  const validateForm = (): boolean => {
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
      // Save profile image if there's a new objectName
      if (objectName) {
        const userResult = await updateUser({ profileImgUrl: objectName });
        if (!userResult) {
          setIsLoading(false);
          return;
        }
      }

      // Save company notifications (email, SMS, timezone) - only for admin/manager
      if (canEditCompany) {
        const brandResult = await updateBrandMasterInfo({
          emailContact: companyEmail.value || undefined,
          smsContact: companySMS.value || undefined,
          timezone: timeZone.value || undefined,
        });
        if (!brandResult) {
          setIsLoading(false);
          return;
        }
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
