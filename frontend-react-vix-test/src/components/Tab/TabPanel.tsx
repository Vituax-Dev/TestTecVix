import { Stack, SxProps } from "@mui/material";

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
  sx?: SxProps;
}

export const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  if (value !== index) return null;

  return (
    <Stack
      className="h-full"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}-${value}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Stack className="h-full">{children}</Stack>}
    </Stack>
  );
};
