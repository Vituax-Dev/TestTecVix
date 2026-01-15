import { SxProps } from "@mui/material";

export interface ITabItem {
  label: React.ReactNode;
  sx?: SxProps;
  sxActive?: SxProps;
  component?: React.ReactNode;
  sxTab?: SxProps;
  disabled?: boolean;
}
