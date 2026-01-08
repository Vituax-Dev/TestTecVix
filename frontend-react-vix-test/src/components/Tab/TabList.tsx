import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useState } from "react";
import { Stack, SxProps } from "@mui/material";
import { useZTheme } from "../../stores/useZTheme";
import { TextRob16FontL } from "../TextL";
import { TabPanel } from "./TabPanel";

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

interface ITabProps {
  sxContainer?: SxProps;
  sxTabs?: SxProps;
  variant?: "scrollable" | "standard" | "fullWidth";
  scrollButtons?: boolean | "auto";
  item: {
    label: React.ReactNode;
    sx?: SxProps;
    sxActive?: SxProps;
    component?: React.ReactNode;
    sxTab?: SxProps;
  }[];
}

export const TabList = ({
  item,
  sxContainer,
  sxTabs,
  variant = "scrollable",
  scrollButtons = "auto",
}: ITabProps) => {
  const { theme, mode } = useZTheme();
  const [value, setValue] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Stack sx={{ width: "100%", ...sxContainer }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="inherit"
        variant={variant}
        scrollButtons={scrollButtons}
        sx={{
          "& .MuiButtonBase-root": {
            // borderBottom: `3px solid ${theme[mode].tertiary}`,
          },
          "& .MuiTabs-indicator": {
            backgroundColor: theme[mode].btnBlue,
          },
          ...sxTabs,
        }}
      >
        {item.map((item, index) => (
          <Tab
            sx={{
              ...item.sxTab,
            }}
            key={`${item.label}-${index}`}
            label={
              <TextRob16FontL
                sx={{
                  color: theme[mode].tertiary,
                  lineHeight: "20px",
                  textTransform: "none",
                  ...item.sx,
                  ...(value === 0 && {
                    fontWeight: "500",
                    color: theme[mode].btnBlue,
                    ...item.sxActive,
                  }),
                }}
              >
                {item.label}
              </TextRob16FontL>
            }
            {...a11yProps(index)}
          />
        ))}
      </Tabs>

      {/* Tab panels */}
      {item.map((item, index) => (
        <TabPanel value={value} index={index} key={`${index}-${item.label}`}>
          {item.component}
        </TabPanel>
      ))}
    </Stack>
  );
};
