import { HeaderGradient } from "./HeaderGradient";
import { useZGlobalVar } from "../../stores/useZGlobalVar";
import { useZTheme } from "../../stores/useZTheme";
import { shadow } from "../../utils/shadow";
import { IconButton, Stack } from "@mui/material";
import { MenuIconBig } from "../../icons/MenuIconBig";
import { UserPicProfile } from "../../pages/Home/components/Header/UserPicProfile";
import { LogoBrand } from "../LogoBrand";

export const HeaderMobile = ({
  title,
  subtitle,
  keepSubtitle = false,
}: {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  keepSubtitle?: boolean;
}) => {
  const { setIsOpenSideBar } = useZGlobalVar();
  const { theme, mode } = useZTheme();

  return (
    <HeaderGradient
      sx={{
        paddingTop: "22px",
        paddingLeft: "24px",
        paddingRight: "8px",
        boxShadow: `0px 4px 4px 0px ${shadow(mode)}`,
        gap: "12px",
        "@media (min-width: 660px)": {
          background: "transparent",
          boxShadow: "none",
          marginBottom: "-50px",
        },
      }}
    >
      {/* Menu and profile */}
      <Stack flexDirection={"row"} justifyContent={"space-between"}>
        {/* Menu button */}
        <Stack
          sx={{
            width: "fit-content",
          }}
        >
          <IconButton onClick={() => setIsOpenSideBar(true)}>
            <MenuIconBig fill={theme[mode].black} />
          </IconButton>
        </Stack>

        {/* Logo */}
        <Stack>
          <LogoBrand
            sx={{
              background: "transparent",
            }}
          />
        </Stack>
        {/* Profile */}
        <Stack
          sx={{
            justifyContent: "center",
            alignItems: "center",
            height: "fit-content",
            marginTop: "-6px",
          }}
        >
          <UserPicProfile />
        </Stack>
      </Stack>
      {/* Title */}
      <Stack
        sx={{
          gap: "12px",
        }}
      >
        {title}
        {subtitle && (
          <Stack
            sx={{
              "@media (max-width: 659px)": {
                display: keepSubtitle ? "block" : "none",
              },
            }}
          >
            {subtitle}
          </Stack>
        )}
      </Stack>
    </HeaderGradient>
  );
};
