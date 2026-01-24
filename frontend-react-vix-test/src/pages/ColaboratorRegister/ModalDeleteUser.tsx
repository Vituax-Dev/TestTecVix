import { Box, Button, Stack } from "@mui/material";
import { useZTheme } from "../../stores/useZTheme";
import { TextRob20Font1M } from "../../components/Text1M";
import { TextRob16Font1S } from "../../components/Text1S";
import { useTranslation } from "react-i18next";
import { CancelCircleIcon } from "../../icons/CancelCircleIcon";
import { Colaborator } from "../../stores/useZColaboratorRegister";

interface IModalDeleteUserProps {
  userToDelete: Colaborator;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  isLoading?: boolean;
}

export const ModalDeleteUser = ({
  userToDelete,
  onClose,
  onConfirm,
  isLoading = false,
}: IModalDeleteUserProps) => {
  const { theme, mode } = useZTheme();
  const { t } = useTranslation();

  return (
    <Stack
      sx={{
        width: "fit-content",
        maxWidth: "400px",
        alignSelf: "center",
        justifySelf: "center",
        gap: "20px",
        boxSizing: "border-box",
        padding: "24px",
        borderRadius: "16px",
        background: theme[mode].mainBackground,
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CancelCircleIcon color={theme[mode].danger} size={"36px"} />
      <TextRob20Font1M
        sx={{
          color: theme[mode].primary,
          fontWeight: "400",
          textAlign: "center",
        }}
      >
        {t("colaboratorRegister.areYouSure", { username: userToDelete.name })}
      </TextRob20Font1M>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "24px",
          "@media (max-width: 680px)": {
            flexDirection: "column",
          },
        }}
      >
        <Button
          sx={{
            width: "160px",
            background: theme[mode].danger,
            height: "40px",
            borderRadius: "12px",
            textTransform: "none",
            "@media (max-width: 680px)": {
              width: "100%",
            },
            "&:hover": {
              background: theme[mode].lightRed,
            },
            "&:disabled": {
              opacity: 0.6,
            },
          }}
          onClick={onConfirm}
          disabled={isLoading}
        >
          <TextRob16Font1S
            sx={{
              fontWeight: "400",
              color: "#FFFFFF",
            }}
          >
            {t("generic.delete")}
          </TextRob16Font1S>
        </Button>
        <Button
          sx={{
            width: "160px",
            borderRadius: "12px",
            textTransform: "none",
            height: "40px",
            border: `1px solid ${theme[mode].gray}`,
            "@media (max-width: 680px)": {
              width: "100%",
            },
          }}
          onClick={onClose}
          disabled={isLoading}
        >
          <TextRob16Font1S
            sx={{
              fontWeight: "400",
              color: theme[mode].primary,
            }}
          >
            {t("generic.cancel")}
          </TextRob16Font1S>
        </Button>
      </Box>
    </Stack>
  );
};
