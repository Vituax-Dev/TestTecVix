import React, { useState, useEffect } from "react";
import { Box, Button, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useZTheme } from "../../../../stores/useZTheme";
import { TextRob16Font1S } from "../../../../components/Text1S";

export const InstallButton: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showButton, setShowButton] = useState(false);
  const { t } = useTranslation();
  const { theme, mode } = useZTheme();

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
      setShowButton(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();

      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === "accepted") {
        console.log("Usuário aceitou instalar o PWA");
      } else {
        console.log("Usuário recusou instalar o PWA");
      }

      setDeferredPrompt(null);
      setShowButton(false);
    }
  };

  if (!showButton) return null;

  return (
    <Stack
      sx={{
        justifyContent: "center",
        alignItems: "center",
        marginTop: "24px",
        width: "100%",
        gap: "24px",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <div
          style={{
            flexGrow: 1,
            height: "1px",
            backgroundColor: theme[mode].tertiary,
            borderRadius: "4px",
          }}
        />
        <TextRob16Font1S
          sx={{
            color: theme[mode].primary,
            fontWeight: "400",
            margin: "0 16px",
          }}
        >
          {t("loginRegister.or")}
        </TextRob16Font1S>
        <div
          style={{
            flexGrow: 1,
            height: "1px",
            backgroundColor: theme[mode].tertiary,
            borderRadius: "4px",
          }}
        />
      </Box>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleInstallClick}
        sx={{
          textTransform: "none",
          width: "100%",
          height: "48px",
          borderRadius: "12px",
          borderColor: theme[mode].black,
        }}
      >
        <TextRob16Font1S
          sx={{
            color: theme[mode].black,
            fontWeight: "500",
          }}
        >
          {t("generic.installApp")}
        </TextRob16Font1S>
      </Button>
    </Stack>
  );
};
