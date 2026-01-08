import { Stack } from "@mui/material";
import { useZTheme } from "../../../stores/useZTheme";
import { TextRob16Font1S } from "../../../components/Text1S";
import { MIN_PASS_SIZE } from "../../../configs/contants";
import { useTranslation } from "react-i18next";
import { passwordRegex } from "../../../utils/genStrongPass";

export const PasswordValidations = ({ vmPassword }: { vmPassword: string }) => {
  const { theme, mode } = useZTheme();
  const { t } = useTranslation();
  return (
    <Stack
      sx={{
        padding: "8px",
      }}
    >
      <TextRob16Font1S
        sx={{
          fontSize: "10px",
          color:
            vmPassword?.length >= MIN_PASS_SIZE
              ? theme[mode].ok
              : theme[mode].danger,
        }}
      >
        {t("createVm.passwordMinLength")}
      </TextRob16Font1S>
      <TextRob16Font1S
        sx={{
          fontSize: "10px",
          color: passwordRegex.numbers.test(vmPassword)
            ? theme[mode].ok
            : theme[mode].danger,
        }}
      >
        {t("createVm.passwordNumberValidation")}
      </TextRob16Font1S>
      <TextRob16Font1S
        sx={{
          fontSize: "10px",
          color: passwordRegex.lowercase.test(vmPassword)
            ? theme[mode].ok
            : theme[mode].danger,
        }}
      >
        {t("createVm.passwordLowercaseValidation")}
      </TextRob16Font1S>
      <TextRob16Font1S
        sx={{
          fontSize: "10px",
          color: passwordRegex.uppercase.test(vmPassword)
            ? theme[mode].ok
            : theme[mode].danger,
        }}
      >
        {t("createVm.passwordUppercaseValidation")}
      </TextRob16Font1S>
      <TextRob16Font1S
        sx={{
          fontSize: "10px",
          color: passwordRegex.special.test(vmPassword)
            ? theme[mode].ok
            : theme[mode].danger,
        }}
      >
        {t("createVm.passwordSpecialValidation")}
      </TextRob16Font1S>
    </Stack>
  );
};
