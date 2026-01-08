import { IconButton, Modal, Stack, SxProps } from "@mui/material";
import { useZTheme } from "../../stores/useZTheme";
import { TextRob18Font2M } from "../Text2M";
import { CloseXIcon } from "../../icons/CloseXIcon";
import { useTranslation } from "react-i18next";
import { CardNotification } from "./CardNotification";

interface IProps {
  open: boolean;
  onClose: () => void;
  sx?: SxProps;
  notifications?: {
    isOpen: boolean;
    idNotification: number;
    message: string;
    title: string;
    date: string;
    priority: string;
    createdAt: string;
  }[];
}

export const ModalNotifications = ({
  open,
  onClose,
  sx,
  notifications = [],
}: IProps) => {
  const { mode, theme } = useZTheme();
  const { t } = useTranslation();

  if (!notifications.length) return null;
  return (
    <Modal
      open={open}
      onClose={onClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Stack
        sx={{
          width: "80%",
          maxHeight: "85vh",
          overflowY: "auto",
          height: "fit-content",
          backgroundColor: theme[mode].mainBackground,
          borderRadius: "12px",
          padding: "24px",
          gap: "12px",
          ...sx,
        }}
      >
        {/* Header - Title - close */}
        <Stack
          sx={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TextRob18Font2M
            sx={{
              color: theme[mode].black,
              fontSize: "18px",
              fontWeight: "500",
              lineHeight: "24px",
            }}
          >
            {t("userProfile.notifications")}
          </TextRob18Font2M>
          <IconButton onClick={() => onClose()}>
            <CloseXIcon fill={theme[mode].gray} />
          </IconButton>
        </Stack>
        {/* Notifications */}
        <Stack
          sx={{
            gap: "16px",
          }}
        >
          {notifications.map((notification) => (
            <CardNotification
              key={notification.idNotification}
              notification={notification}
            />
          ))}
        </Stack>
      </Stack>
    </Modal>
  );
};
