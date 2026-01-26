import { Stack, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useZTheme } from "../../stores/useZTheme";
import { TextRob16Font1S } from "../../components/Text1S";
import { TextRob18Font2M } from "../../components/Text2M";
import { Btn } from "../../components/Buttons/Btn";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";

interface ModalUserSuccessProps {
  type: "created" | "edited";
  onClose: () => void;
}

export const ModalUserSuccess = ({ type, onClose }: ModalUserSuccessProps) => {
  const { theme, mode } = useZTheme();
  const { t } = useTranslation();

  const message =
    type === "created"
      ? t("colaboratorRegister.userCreated")
      : t("colaboratorRegister.userEdited");

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
        <CheckCircleOutlineRoundedIcon
          sx={{ fontSize: "64px", color: theme[mode].green }}
        />
        <TextRob18Font2M sx={{ color: theme[mode].primary, textAlign: "center" }}>
          {message}
        </TextRob18Font2M>

        <Btn
          onClick={onClose}
          sx={{
            background: theme[mode].blue,
            color: "#fff",
            borderRadius: "24px",
            padding: "12px 48px",
            "&:hover": {
              background: theme[mode].blueDark,
            },
          }}
        >
          <TextRob16Font1S>{t("colaboratorRegister.ok")}</TextRob16Font1S>
        </Btn>
      </Stack>
    </Box>
  );
};
