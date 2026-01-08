import { Stack } from "@mui/material";
import { useZTheme } from "../../../../stores/useZTheme";
import { TabOnly } from "../../../../components/Tab/TabOnly";
import { useZSettingsVar } from "../../../../stores/useZSettingsVar";
import { ITabItem } from "../../../../types/TabTypes";

export const SettingsTabList = ({ tabList }: { tabList: ITabItem[] }) => {
  const { mode, theme } = useZTheme();
  const { currentTabIndex, setSettings } = useZSettingsVar();

  return (
    <Stack
      sx={{
        width: "100%",
        gap: "8px",
      }}
    >
      <TabOnly
        item={tabList}
        value={currentTabIndex}
        handleChange={(_, v) => setSettings({ currentTabIndex: v })}
        sxTabs={{
          backgroundColor: theme[mode].mainBackground,
          borderRadius: "8px",
          justifyContent: "space-between",
          "& .MuiTabs-flexContainer": {
            justifyContent: "space-between",
            paddingLeft: "16px",
            paddingRight: "16px",
            "@media (max-width: 1000px)": {
              paddingLeft: "0px",
              paddingRight: "0px",
            },
          },
        }}
      />
    </Stack>
  );
};
