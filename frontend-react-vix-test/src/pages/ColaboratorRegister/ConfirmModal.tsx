import { Box, Stack } from "@mui/material";
import { useZTheme } from "../../stores/useZTheme";
import { TextRob16Font1S } from "../../components/Text1S";
import { FullFilledButton } from "../../components/Buttons/FullFilledButton";
import { UnfilledButton } from "../../components/Buttons/UnfilledButton";

interface Props {
  title: string;
  onClose: () => void;
  onConfirm: () => void;
  confirmText: string;
  cancelText: string;
}

export const ConfirmModal = ({
  title,
  onClose,
  onConfirm,
  confirmText,
  cancelText,
}: Props) => {
  const { theme, mode } = useZTheme();

  return (
    <Box
      sx={{
        background: theme[mode].mainBackground,
        borderRadius: "16px",
        padding: "24px",
        minWidth: "400px",
        maxWidth: "90vw",
      }}
    >
      <Stack sx={{ gap: "24px" }}>
        <TextRob16Font1S
          sx={{
            color: theme[mode].black,
            fontSize: "18px",
            fontWeight: 500,
            textAlign: "center",
          }}
        >
          {title}
        </TextRob16Font1S>

        <Box
          sx={{
            display: "flex",
            gap: "12px",
            justifyContent: "center",
          }}
        >
          <UnfilledButton label={cancelText} onClick={onClose} />
          <FullFilledButton label={confirmText} onClick={onConfirm} />
        </Box>
      </Stack>
    </Box>
  );
};
