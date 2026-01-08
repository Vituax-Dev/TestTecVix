import { Stack, SxProps } from "@mui/material";
import React from "react";
import { FolderEmptyFeedback } from "../icons/FolderEmptyFeedback";

interface IProps {
  title?: React.ReactNode;
  sx?: SxProps;
}

export const EmptyFeedback = ({ title, sx }: IProps) => {
  return (
    <Stack
      sx={{
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        gap: "32px",
        ...sx,
      }}
    >
      <FolderEmptyFeedback />
      {title}
    </Stack>
  );
};
