import { IconButton, Stack } from "@mui/material";
import { useZTheme } from "../../../../stores/useZTheme";
import { NotificationIcon } from "../../../../icons/NotificationIcon";
import { TextRob16FontL } from "../../../../components/TextL";
import { makeEllipsis } from "../../../../utils/makeEllipsis";

export const Bell = ({
  color,
  toggleNotifications,
  numberOfNotifications,
}: {
  color?: string;
  toggleNotifications: () => void;
  numberOfNotifications?: number;
}) => {
  const { theme, mode } = useZTheme();
  return (
    <Stack
      sx={{
        width: "fit-content",
        maxWidth: "100px",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <IconButton
        onClick={toggleNotifications}
        type="button"
        sx={{
          px: 1.8,
          py: 0.5,
        }}
      >
        <NotificationIcon fill={color || theme[mode].blueMedium} />
      </IconButton>
      {Boolean(numberOfNotifications) && (
        <Stack
          sx={{
            position: "absolute",
            top: "2px",
            left: "10px",
            width: "12px",
            height: "12px",
            backgroundColor: theme[mode].danger,
            borderRadius: "50%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TextRob16FontL
            sx={{
              fontSize: "10px",
              fontWeight: "200",
              lineHeight: "9px",
              color: theme[mode].primary,
              ...makeEllipsis(),
            }}
          >
            {numberOfNotifications}
          </TextRob16FontL>
        </Stack>
      )}
    </Stack>
  );
};
