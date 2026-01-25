import { Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import { TextRob16FontL } from "../../../../../components/TextL";
import { useZTheme } from "../../../../../stores/useZTheme";
import { InputLabelAndFeedback } from "../../../../../components/Inputs/InputLabelAndFeedback";
import { EditCirclePencilIcon } from "../../../../../icons/EditCirclePencilIcon";
import { useZUserProfile } from "../../../../../stores/useZUserProfile";
import {
  IFormProfileNotificationsVar,
  useZFormProfileNotifications,
} from "../../../../../stores/useZFormProfileNotifications";
import { useEffect } from "react";
import { PerfilPhotoUpload } from "./PerfilPhotoUpload";

export const PersonalInformation = () => {
  const { t } = useTranslation();
  const { theme, mode } = useZTheme();
  const {
    username,
    userEmail,
    profileImgUrl: profileImgStore,
  } = useZUserProfile();
  const {
    userEmail: userEmailForm,
    userName,
    userPhone,
    password,
    confirmPassword,
    fullName,
    setFormProfileNotifications,
  } = useZFormProfileNotifications();

  const inputSx = {
    maxWidth: "400px",
    width: "100%",
    "@media (max-width: 745px)": {
      maxWidth: "100%",
    },
  };
  const sxContainer = {
    maxWidth: "400px",
    width: "100%",
    "@media (max-width: 745px)": {
      maxWidth: "100%",
    },
  };
  const sxLabel = {};
  const sxSideLabel = {};

  const formatPhoneNumber = (value: string) => {
    if (!value) return "";

    const phoneNumber = value.replace(/\D/g, "");
    const phoneNumberLength = phoneNumber.length;

    if (phoneNumberLength < 3) return phoneNumber;
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2)}`;
    }
    return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2, 7)}-${phoneNumber.slice(7, 11)}`;
  };

  const validFullName = () => {
    if (!fullName.value) {
      setFormProfileNotifications({
        fullName: {
          ...fullName,
          errorMessage: t("profileAndNotifications.requiredField"),
        },
      });
      return;
    }
    if (fullName.value.length < 4 || fullName.value.length > 100) {
      setFormProfileNotifications({
        fullName: {
          ...fullName,
          errorMessage: t("profileAndNotifications.invalidData"),
        },
      });
      return;
    }
    setFormProfileNotifications({
      fullName: {
        ...fullName,
        errorMessage: "",
      },
    });

    return true;
  };

  const validName = () => {
    if (!userName.value) {
      setFormProfileNotifications({
        userName: {
          ...userName,
          errorMessage: t("profileAndNotifications.requiredField"),
        },
      });
      return;
    }
    if (userName.value.length < 4 || userName.value.length > 100) {
      setFormProfileNotifications({
        userName: {
          ...userName,
          errorMessage: t("profileAndNotifications.invalidData"),
        },
      });
      return;
    }
    setFormProfileNotifications({
      userName: {
        ...userName,
        errorMessage: "",
      },
    });

    return true;
  };

  const validPassword = () => {
    if (password.value && password.value !== confirmPassword.value) {
      setFormProfileNotifications({
        password: {
          ...password,
          errorMessage: t("colaboratorRegister.dontMatch"),
        },
      });
      return;
    }

    setFormProfileNotifications({
      password: {
        ...password,
        errorMessage: "",
      },
    });

    return true;
  };

  const validEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex para validar email
    if (!userEmailForm.value) {
      return setFormProfileNotifications({
        userEmail: {
          ...userEmailForm,
          errorMessage: t("profileAndNotifications.requiredField"),
        },
      });
    }

    if (
      !emailRegex.test(userEmailForm.value) ||
      userEmailForm.value.length > 100
    ) {
      return setFormProfileNotifications({
        userEmail: {
          ...userEmailForm,
          errorMessage: t("profileAndNotifications.invalidData"),
        },
      });
    }

    // Se o email for válido
    return setFormProfileNotifications({
      userEmail: {
        ...userEmailForm,
        errorMessage: "",
      },
    });
  };

  const validPhoneNumber = () => {
    const digitsOnly = userPhone.value.replace(/\D/g, "");
    const phoneRegex = /^\d{10,11}$/;

    if (!digitsOnly) {
      setFormProfileNotifications({
        userPhone: { ...userPhone, errorMessage: "" },
      });
      return;
    }

    if (!phoneRegex.test(digitsOnly)) {
      setFormProfileNotifications({
        userPhone: {
          ...userPhone,
          errorMessage: t("profileAndNotifications.invalidData"),
        },
      });
      return;
    }

    setFormProfileNotifications({
      userPhone: { ...userPhone, errorMessage: "" },
    });
  };

  const handleChange = (
    key: keyof IFormProfileNotificationsVar,
    val: string,
  ) => {
    let valueToSave = val;

    if (key === "userPhone") {
      valueToSave = formatPhoneNumber(val);
    }

    setFormProfileNotifications({
      [key]: {
        value: valueToSave,
        errorMessage: "",
      },
    });
  };

  useEffect(() => {
    setFormProfileNotifications({
      fullName: { value: fullName.value, errorMessage: "" },
      userName: { value: username || "", errorMessage: "" },
      userEmail: { value: userEmail || "", errorMessage: "" },
      userPhone: { value: userPhone.value, errorMessage: "" },
      profileImgUrl: { value: profileImgStore || "", errorMessage: "" },
    });
  }, []);

  return (
    <Stack
      sx={{
        gap: "24px",
      }}
    >
      {/* Title */}
      <Stack
        sx={{
          width: "100%",
        }}
      >
        <TextRob16FontL
          sx={{
            color: theme[mode].black,
            fontWeight: "500",
            lineHeight: "24px",
          }}
        >
          {t("profileAndNotifications.personalData")}
        </TextRob16FontL>
      </Stack>
      {/* Inputs line 01 */}
      <Stack
        sx={{
          flexDirection: "row",
          gap: "24px",
          "@media (max-width: 745px)": {
            flexDirection: "column",
          },
        }}
      >
        <InputLabelAndFeedback
          label={t("profileAndNotifications.completeName")}
          value={fullName.value}
          onChange={(val) => handleChange("fullName", val)}
          errorMessage={fullName.errorMessage}
          icon={
            <EditCirclePencilIcon
              fill={
                fullName.errorMessage
                  ? theme[mode].danger
                  : theme[mode].blueMedium
              }
            />
          }
          onBlur={validFullName}
          sx={inputSx}
          sxContainer={sxContainer}
          sxLabel={sxLabel}
          sxSidelabel={sxSideLabel}
        />
        <InputLabelAndFeedback
          label={t("profileAndNotifications.username")}
          value={userName.value}
          onChange={(val) => handleChange("userName", val)}
          errorMessage={userName.errorMessage}
          icon={
            <EditCirclePencilIcon
              fill={
                userName.errorMessage
                  ? theme[mode].danger
                  : theme[mode].blueMedium
              }
            />
          }
          onBlur={validName}
          sx={inputSx}
          sxContainer={sxContainer}
          sxLabel={sxLabel}
          sxSidelabel={sxSideLabel}
        />
        <InputLabelAndFeedback
          label={t("profileAndNotifications.email")}
          value={userEmailForm.value}
          errorMessage={userEmailForm.errorMessage}
          onChange={(val) => handleChange("userEmail", val)}
          icon={
            <EditCirclePencilIcon
              fill={
                userEmailForm.errorMessage
                  ? theme[mode].danger
                  : theme[mode].blueMedium
              }
            />
          }
          onBlur={validEmail}
          sx={inputSx}
          sxContainer={sxContainer}
          sxLabel={sxLabel}
          sxSidelabel={sxSideLabel}
        />
        <InputLabelAndFeedback
          label={t("profileAndNotifications.phone")}
          placeholder="(00) 0000-0000"
          value={userPhone.value}
          errorMessage={userPhone.errorMessage}
          onBlur={validPhoneNumber}
          onChange={(val) => handleChange("userPhone", val)}
          icon={
            <EditCirclePencilIcon
              fill={
                userPhone.errorMessage
                  ? theme[mode].danger
                  : theme[mode].blueMedium
              }
            />
          }
          sx={inputSx}
          sxContainer={sxContainer}
          sxLabel={sxLabel}
          sxSidelabel={sxSideLabel}
        />
      </Stack>
      {/* Inputs line 02 */}
      <Stack
        sx={{
          flexDirection: "row",
          gap: "24px",
          "@media (max-width: 745px)": {
            flexDirection: "column",
          },
        }}
      >
        <InputLabelAndFeedback
          type="password"
          label={t("colaboratorRegister.password")}
          value={password.value}
          onChange={(val) => handleChange("password", val)}
          errorMessage={password.errorMessage}
          sx={inputSx}
          sxContainer={sxContainer}
          sxLabel={sxLabel}
          sxSidelabel={sxSideLabel}
        />
        <InputLabelAndFeedback
          type="password"
          label={t("colaboratorRegister.confirmPassword")}
          value={confirmPassword.value}
          onChange={(val) => handleChange("confirmPassword", val)}
          errorMessage={confirmPassword.errorMessage}
          onBlur={validPassword}
          sx={inputSx}
          sxContainer={sxContainer}
          sxLabel={sxLabel}
          sxSidelabel={sxSideLabel}
        />
      </Stack>
      <Stack
        sx={{
          width: "100%",
        }}
      >
        <PerfilPhotoUpload />
      </Stack>
    </Stack>
  );
};
