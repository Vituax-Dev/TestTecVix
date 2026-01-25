import React, { useEffect, useState } from "react";
import { useUploadFile } from "../hooks/useUploadFile";
import { useZTheme } from "../stores/useZTheme";
import { CircularProgress, SxProps } from "@mui/material";

export const ImgFromDB = ({
  src,
  style,
  sxLoader,
  alt,
}: {
  src: string;
  style?: React.CSSProperties;
  sxLoader?: SxProps;
  alt?: string;
}) => {
  const { isLoading, getFileByObjectName } = useUploadFile();
  const [srcImage, setSrcIMage] = useState(src);
  const { mode, theme } = useZTheme();

  useEffect(() => {
    setSrcIMage(src);
    
    getFileByObjectName(src).then(({ url }) => {
      setSrcIMage(url);
    });
  }, [src]);

  if (isLoading)
    return (
      <CircularProgress
        color="inherit"
        sx={{
          color: theme[mode].blue,
          ...sxLoader,
        }}
      />
    );

  if (!srcImage) return null;

  return (
    <img
      src={srcImage}
      alt={alt || "logo"}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "contain",
        ...style,
      }}
    />
  );
};
