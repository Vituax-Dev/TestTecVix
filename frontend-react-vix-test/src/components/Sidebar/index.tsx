import { Drawer } from "@mui/material";
import { ListItemSidebar } from "./components/ListItemSidebar";
import { useWindowSize } from "../../hooks/useWindowSize";
import { useZGlobalVar } from "../../stores/useZGlobalVar";

export const Sidebar = () => {
  const { width } = useWindowSize();
  const { isOpenSideBar, setIsOpenSideBar } = useZGlobalVar();

  return (
    <>
      {width > 1430 ? (
        <ListItemSidebar />
      ) : (
        <Drawer
          open={isOpenSideBar}
          onClose={() => setIsOpenSideBar(false)}
          disableEnforceFocus
          disableAutoFocus
          aria-hidden={Boolean(width > 1430)}
        >
          <ListItemSidebar />
        </Drawer>
      )}
    </>
  );
};
