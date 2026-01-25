import { Divider, Stack } from "@mui/material";
import { useZTheme } from "../../../../stores/useZTheme";
import { PersonalInformation } from "./components/PersonalInformation";
import { NotificationsContact } from "./components/NotificationsContact";
import { CTAsButtons } from "./components/CTAsButtons";
import { useAuth } from "../../../../auth/PrivatePage";

export const ProfileAndNotifications = () => {
  const { mode, theme } = useZTheme();
  const { isManagerOrAdmin } = useAuth();
  return (
    <Stack
      sx={{
        width: "100%",
        gap: "32px",
        background: theme[mode].mainBackground,
        borderRadius: "16px",
        padding: "24px",
      }}
    >
      {/* Personal information  */}
      <PersonalInformation />
      <Divider
        sx={{
          mt: "16px",
          background: theme[mode].grayLight,
        }}
      />
      {isManagerOrAdmin && (
        <>
          {/* Notifications */}
          <NotificationsContact />
          <Divider
            sx={{
              mt: "16px",
              background: theme[mode].grayLight,
            }}
          />
        </>
      )}
      {/* Save Buttons */}
      <CTAsButtons />
    </Stack>
  );
};
