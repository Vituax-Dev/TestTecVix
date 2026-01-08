import { Box, Button, Modal, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { ThemeNames } from "../../themes";
import { themeColors, useZTheme } from "../../../../stores/useZTheme";

interface IWhiteLabelChildProps {
  theme: {
    dark: themeColors;
    light: themeColors;
  };
}

export interface ISaveThemeModalProps extends IWhiteLabelChildProps {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  handleSaveChanges: () => void;
  color: ThemeNames;
}

export const SaveThemeModal = ({
  isModalOpen,
  setIsModalOpen,
  theme,
  handleThemeChange,
  color,
}) => {
  const { mode } = useZTheme();
  const { t } = useTranslation();

  return (
    <Modal
      open={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: theme[mode].mainBackground,
          border: `1px solid ${theme[mode].grayLight}`,
          borderRadius: "16px",
          boxShadow: 24,
          padding: "24px",
        }}
      >
        <Typography
          id="modal-title"
          variant="h6"
          sx={{ color: theme[mode].primary }}
        >
          {t("whiteLabel.wishConfirm")}
        </Typography>
        <Typography
          id="modal-description"
          sx={{ marginTop: "12px", color: theme[mode].tertiary }}
        >
          {t("whiteLabel.cannotBeUndone")}
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center" mt={4}>
          <Button
            sx={{
              background: theme[mode].blue,
              color: theme[mode].btnText,
              textTransform: "none",
              borderRadius: "12px",
              padding: "8px 16px",
              flexGrow: 2,
            }}
            onClick={() => handleThemeChange(color)}
          >
            {t("whiteLabel.confirmChanges")}
          </Button>
          <Button
            sx={{
              background: "transparent",
              color: theme[mode].blueDark,
              textTransform: "none",
              border: `1px solid ${theme[mode].blueDark}`,
              borderRadius: "12px",
              padding: "8px 16px",
              flexGrow: 1,
            }}
            onClick={() => setIsModalOpen(false)}
          >
            {t("whiteLabel.cancel")}
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};
