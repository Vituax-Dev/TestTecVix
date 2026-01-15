import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { SxProps } from "@mui/material";
import { useZTheme } from "../../stores/useZTheme";
import { TextRob16FontL } from "../TextL";
import { ITabItem } from "../../types/TabTypes";

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
  value: number;
  handleChange: (event: React.SyntheticEvent, newValue: number) => void;
  item: ITabItem[];
}

export const TabOnly = ({
  item,
  sxTabs,
  variant = "scrollable",
  scrollButtons = "auto",
  value,
  handleChange,
}: ITabProps) => {
  const { theme, mode } = useZTheme();

  return (
    <Tabs
      value={value}
      onChange={handleChange}
      textColor="inherit"
      variant={variant}
      scrollButtons={scrollButtons}
      sx={{
        "& .MuiTabScrollButton-root": {
          color: theme[mode].btnBlue,
        },
        "& .MuiTabs-indicator": {
          backgroundColor: theme[mode].btnBlue,
        },
        ...sxTabs,
      }}
    >
      {item.map((item, index) => (
        <Tab
          disabled={item.disabled}
          sx={{
            ...item.sxTab,
          }}
          key={`${item.label}-${index}`}
          label={
            <TextRob16FontL
              sx={{
                color: theme[mode].gray,
                lineHeight: "20px",
                textTransform: "none",
                ...item.sx,
                ...(value === index && {
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
  );
};
