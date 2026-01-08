import { FormControl, InputLabel, Stack, Typography } from "@mui/material";
import { useZTheme } from "../../../../stores/useZTheme";
import { TextRob18Font2M } from "../../../../components/Text2M";
import { SimpleInput } from "../../../../components/Inputs/SimpleInput";
import { useTranslation } from "react-i18next";
import { TextRob20Font1M } from "../../../../components/Text1M";
import { useState } from "react";

interface IProps {
  username: string;
  setUsername: (username: string) => void;
  password: string;
  setPassword: (password: string) => void;
  confirmPassword: string;
  setConfirmPassword: (confirmPassword: string) => void;
  email: string;
  setEmail: (email: string) => void;
}

export const RegisterForm = ({
  username,
  setUsername,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  email,
  setEmail,
}: IProps) => {
  const { mode, theme } = useZTheme();
  const { t } = useTranslation();
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError(t("loginRegister.invalidEmail"));
    } else {
      setEmailError(null);
    }
  };

  const validatePasswords = (password: string, confirmPassword: string) => {
    if (password !== confirmPassword) {
      setPasswordError(t("loginRegister.passwordMismatch"));
    } else {
      setPasswordError(null);
    }
  };

  return (
    <Stack
      className=" py-3 gap-4"
      sx={{
        width: "100%",
      }}
    >
      <TextRob20Font1M
        sx={{
          color: theme[mode].dark,
        }}
      >
        {t("loginRegister.register")}
      </TextRob20Font1M>

      {/* username */}
      <FormControl variant="standard">
        <InputLabel
          required
          shrink
          htmlFor="bootstrap-input-username"
          className="username"
          sx={{
            color: theme[mode].dark,
            "&.Mui-focused": {
              color: theme[mode].blue,
            },
            display: "flex",
          }}
        >
          <TextRob18Font2M>{t("loginRegister.username")}</TextRob18Font2M>
        </InputLabel>
        <SimpleInput
          id="bootstrap-input-username"
          type="text"
          value={username}
          onChange={setUsername}
          inputSx={{ height: "48px", borderRadius: "12px" }}
        />
      </FormControl>

      {/* email */}
      <FormControl variant="standard">
        <InputLabel
          required
          shrink
          htmlFor="bootstrap-input-email"
          className="email"
          sx={{
            color: theme[mode].dark,
            "&.Mui-focused": {
              color: theme[mode].blue,
            },
            display: "flex",
          }}
        >
          <TextRob18Font2M>{t("loginRegister.email")}</TextRob18Font2M>
        </InputLabel>
        <SimpleInput
          id="bootstrap-input-email"
          type="text"
          value={email}
          onChange={(e) => {
            setEmail(e);
          }}
          onBlur={() => validateEmail(email)}
          inputSx={{ height: "48px", borderRadius: "12px" }}
        />
        {emailError && (
          <Typography color="error" variant="caption">
            {emailError}
          </Typography>
        )}
      </FormControl>

      {/* password */}
      <FormControl variant="standard">
        <InputLabel
          required
          shrink
          htmlFor="bootstrap-input-password"
          className="password"
          sx={{
            color: theme[mode].dark,
            "&.Mui-focused": {
              color: theme[mode].blue,
            },
            display: "flex",
          }}
        >
          <TextRob18Font2M>{t("loginRegister.password")}</TextRob18Font2M>
        </InputLabel>
        <SimpleInput
          id="bootstrap-input-password"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e);
          }}
          inputSx={{ height: "48px", borderRadius: "12px" }}
        />
      </FormControl>

      {/* confirm password */}
      <FormControl variant="standard">
        <InputLabel
          required
          shrink
          htmlFor="bootstrap-input-confirm-password"
          className="password"
          sx={{
            color: theme[mode].dark,
            "&.Mui-focused": {
              color: theme[mode].blue,
            },
            display: "flex",
          }}
        >
          <TextRob18Font2M>
            {t("loginRegister.confirmPassword")}
          </TextRob18Font2M>
        </InputLabel>
        <SimpleInput
          id="bootstrap-input-confirm-password"
          type="password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e);
          }}
          onBlur={() => validatePasswords(password, confirmPassword)}
          inputSx={{ height: "48px", borderRadius: "12px" }}
        />
        {passwordError && (
          <Typography color="error" variant="caption">
            {passwordError}
          </Typography>
        )}
      </FormControl>
    </Stack>
  );
};
