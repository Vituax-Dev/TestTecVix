import { useTranslation } from "react-i18next";
import { useZTheme } from "../../../../../stores/useZTheme";
import { Box, Stack, Tooltip } from "@mui/material";
import { TextRob16FontL } from "../../../../../components/TextL";
import { InputLabelAndFeedback } from "../../../../../components/Inputs/InputLabelAndFeedback";
import { EditCirclePencilIcon } from "../../../../../icons/EditCirclePencilIcon";
import { DropDrownLabel } from "../../../../../components/Inputs/DropDrownLabel";
import { useGenericResources } from "../../../../../hooks/useGenericResources";
import {
  IFormProfileNotificationsVar,
  useZFormProfileNotifications,
} from "../../../../../stores/useZFormProfileNotifications";
import { useZBrandInfo } from "../../../../../stores/useZBrandStore";
import { useEffect } from "react";

interface NotificationsContactProps {
  isVituaxUser?: boolean;
}

export const NotificationsContact = ({ isVituaxUser = false }: NotificationsContactProps) => {
  const { t } = useTranslation();
  const { theme, mode } = useZTheme();
  const { timeZones } = useGenericResources();
  const { companyEmail, companySMS, timeZone, setFormProfileNotifications } =
    useZFormProfileNotifications();
  const { emailContact, smsContact, timezone } = useZBrandInfo();
  const { contactEmail, phoneNumber } = {
    contactEmail: emailContact,
    phoneNumber: smsContact,
  };

  const validEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex para validar email
    if (!companyEmail.value) {
      return setFormProfileNotifications({
        companyEmail: {
          ...companyEmail,
          errorMessage: t("profileAndNotifications.requiredField"),
        },
      });
    }

    if (
      !emailRegex.test(companyEmail.value) ||
      companyEmail.value.length > 100
    ) {
      return setFormProfileNotifications({
        companyEmail: {
          ...companyEmail,
          errorMessage: t("profileAndNotifications.invalidData"),
        },
      });
    }

    // Se o email for válido
    return setFormProfileNotifications({
      companyEmail: {
        ...companyEmail,
        errorMessage: "",
      },
    });
  };

  const validPhoneNumber = () => {
    if (!companySMS.value) {
      return setFormProfileNotifications({
        companySMS: {
          ...companySMS,
          errorMessage: "",
        },
      });
    }
    const phoneRegex = /^\d+$/; // Regex para validar telefone com 10 ou 11 dígitos

    if (!companySMS.value) {
      return setFormProfileNotifications({
        companySMS: {
          ...companySMS,
          errorMessage: t("profileAndNotifications.requiredField"),
        },
      });
    }

    if (!phoneRegex.test(companySMS.value) || companySMS.value.length > 20) {
      return setFormProfileNotifications({
        companySMS: {
          ...companySMS,
          errorMessage: t("profileAndNotifications.invalidData"),
        },
      });
    }

    // Se o telefone for válido
    return setFormProfileNotifications({
      companySMS: {
        ...companySMS,
        errorMessage: "",
      },
    });
  };

  const handleChange = (
    key: keyof IFormProfileNotificationsVar,
    val: string,
  ) => {
    setFormProfileNotifications({
      [key]: {
        ...[key],
        value: val,
      },
    });
  };

  useEffect(() => {
    setFormProfileNotifications({
      companyEmail: {
        ...companyEmail,
        value: contactEmail || emailContact || "",
        errorMessage: "",
      },
      companySMS: {
        ...companySMS,
        value: phoneNumber || smsContact || "",
        errorMessage: "",
      },
      timeZone: {
        ...timeZone,
        value: timezone || "",
        errorMessage: "",
      },
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
          {t("profileAndNotifications.notifications")}
          {isVituaxUser && (
            <Box
              component="span"
              sx={{
                fontSize: "12px",
                color: theme[mode].tertiary,
                marginLeft: "8px",
              }}
            >
              ({t("generic.vituaxCannotEdit")})
            </Box>
          )}
        </TextRob16FontL>
      </Stack>
      {/* Inputs */}
      <Stack
        sx={{
          flexDirection: "row",
          gap: "24px",
          "@media (max-width: 745px)": {
            flexDirection: "column",
          },
        }}
      >
        <Tooltip
          title={isVituaxUser ? t("generic.vituaxCannotEdit") : ""}
          arrow
          placement="top"
        >
          <Box sx={{ width: "100%" }}>
            <InputLabelAndFeedback
              label={t("profileAndNotifications.email")}
              value={companyEmail.value}
              onChange={(val) => !isVituaxUser && handleChange("companyEmail", val)}
              errorMessage={companyEmail.errorMessage}
              onBlur={() => !isVituaxUser && validEmail()}
              disabled={isVituaxUser}
              icon={
                <EditCirclePencilIcon
                  fill={
                    isVituaxUser
                      ? theme[mode].grayLight
                      : companyEmail.errorMessage
                        ? theme[mode].danger
                        : theme[mode].blueMedium
                  }
                />
              }
            />
          </Box>
        </Tooltip>
        <Tooltip
          title={isVituaxUser ? t("generic.vituaxCannotEdit") : ""}
          arrow
          placement="top"
        >
          <Box sx={{ width: "100%" }}>
            <InputLabelAndFeedback
              label={t("profileAndNotifications.sms")}
              value={companySMS.value}
              onChange={(val) => !isVituaxUser && handleChange("companySMS", val)}
              errorMessage={companySMS.errorMessage}
              onBlur={() => !isVituaxUser && validPhoneNumber()}
              disabled={isVituaxUser}
              icon={
                <EditCirclePencilIcon
                  fill={
                    isVituaxUser
                      ? theme[mode].grayLight
                      : companySMS.errorMessage
                        ? theme[mode].danger
                        : theme[mode].blueMedium
                  }
                />
              }
            />
          </Box>
        </Tooltip>
        <Tooltip
          title={isVituaxUser ? t("generic.vituaxCannotEdit") : ""}
          arrow
          placement="top"
        >
          <Box sx={{ width: "100%" }}>
            <DropDrownLabel
              label={t("profileAndNotifications.timeZone")}
              data={timeZones}
              value={
                timeZone.value
                  ? { label: timeZone.value, value: timeZone.value }
                  : null
              }
              onChange={(val) => {
                if (isVituaxUser) return;
                if (!val) return handleChange("timeZone", "");
                return handleChange("timeZone", val.label);
              }}
              disabled={isVituaxUser}
            />
          </Box>
        </Tooltip>
      </Stack>
    </Stack>
  );
};
