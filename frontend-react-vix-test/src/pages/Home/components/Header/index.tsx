import { IconButton, Stack } from "@mui/material";
import { Searchbar } from "./Searchbar";
import { Bell } from "./Bell";
import { SwithLanguages } from "../../../../components/SwithLanguages";
import { SwithThemeMode } from "../../../../components/SwithThemeMode";
import { UserPicProfile } from "./UserPicProfile";
import { useZTheme } from "../../../../stores/useZTheme";
import { useZGlobalVar } from "../../../../stores/useZGlobalVar";
import { MenuIconBig } from "../../../../icons/MenuIconBig";
import { useEffect, useState } from "react";
import { ModalNotifications } from "../../../../components/ModalNotifications";

export const Header = () => {
  const { theme, mode } = useZTheme();
  const { setIsOpenSideBar } = useZGlobalVar();
  const [openModalNotifications, setOpenModalNotifications] = useState(false);
  const shadow =
    mode === "dark" ? "rgba(0, 0, 0, 0.4)" : "rgba(217, 217, 217, 0.4)";
  const [notifications, setNotifications] = useState<[]>([]);
  const [numberOfNotifications, setNumberOfNotifications] = useState(0);

  const getAndSetNotifications = async () => {
    setNotifications([]);
  };

  const getNumberOfNotifications = () => {
    let count = 0;
    notifications.forEach(() => {
      count++;
    });
    setNumberOfNotifications(count);
  };

  useEffect(() => {
    getAndSetNotifications();
  }, []);

  useEffect(() => {
    getNumberOfNotifications();
  }, [notifications]);

  return (
    <>
      <Stack
        width={"100%"}
        sx={{
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
          padding: "16px 0px",
          boxShadow: `0px 2px 16px -5px ${shadow}`,
          backgroundColor: theme[mode].mainBackground,
        }}
      >
        <Stack
          sx={{
            marginLeft: "24px",
            "@media (min-width: 1431px)": {
              display: "none",
            },
          }}
        >
          <IconButton onClick={() => setIsOpenSideBar(true)}>
            <MenuIconBig fill={theme[mode].black} />
          </IconButton>
        </Stack>
        {/* Search */}
        <Stack
          sx={{
            width: "55%",
            overflow: "hidden",
            flexDirection: "row",
            justifyContent: "space-between",
            paddingLeft: "48px",
            "@media (max-width: 955px)": {
              display: "none",
            },
          }}
        >
          <Searchbar />
        </Stack>
        {/* Group icons 1 */}
        <Stack
          sx={{
            width: "15%",
            overflow: "hidden",
            flexDirection: "row",
            justifyContent: "flex-end",
            paddingRight: "24px",
            paddingLeft: "12px",
            alignItems: "center",
            borderRight: `2px solid ${theme[mode].grayLight}`,
            marginLeft: "auto",
            "@media (max-width: 744px)": {
              display: "none",
            },
          }}
        >
          <Bell
            numberOfNotifications={numberOfNotifications}
            toggleNotifications={() => setOpenModalNotifications((p) => !p)}
          />
          <SwithThemeMode />
        </Stack>
        {/* Group icons 2 */}
        <Stack
          sx={{
            width: "30%",
            flexDirection: "row",
            gap: "8px",
            alignItems: "center",
            justifyContent: "space-between",
            paddingLeft: "24px",
            paddingRight: "48px",
            "@media (max-width: 955px)": {
              paddingRight: "8px",
              width: "20%",
            },
            "@media (max-width: 744px)": {
              justifyContent: "flex-end",
            },
          }}
        >
          <SwithLanguages />
          <UserPicProfile />
        </Stack>
      </Stack>
      {openModalNotifications && (
        <ModalNotifications
          open={openModalNotifications}
          onClose={() => {
            setOpenModalNotifications(false);
            getAndSetNotifications();
          }}
          notifications={[]}
        />
      )}
    </>
  );
};
