import { useEffect, useState } from "react";
import { useZTheme } from "../../../../stores/useZTheme";
import { availableThemes, ThemeNames } from "../../themes";
import { Stack } from "@mui/material";
import { LeftCard } from "./LeftCard";
import { useBrandMasterInfos } from "../../../../hooks/useBrandMasterInfos";
import { useAuth } from "../../../../hooks/useAuth";
import { api } from "../../../../services/api";
import { IBrandMasterResponse } from "../../../../types/BrandMasterTypes";

export const WhiteLabel = () => {
  const { themeName, setTheme, version, themeNameDefault } = useZTheme();
  const themeNames = Object.keys(availableThemes) as ThemeNames[];
  const initialColor = themeNames.includes(themeName as ThemeNames)
    ? themeName
    : "default";
  const [colorSelected] = useState<ThemeNames>(initialColor as ThemeNames);
  const { setBrandInfos } = useBrandMasterInfos();
  const { getAuth } = useAuth();

  useEffect(() => {
    const loadBrandData = async () => {
      const auth = await getAuth();
      const response = await api.get<IBrandMasterResponse>({
        url: "/brand-master/self",
        auth,
      });
      if (response.data && !response.error) {
        await setBrandInfos(response.data);
      }
    };
    loadBrandData();
  }, []);

  useEffect(() => {
    if (colorSelected !== themeName) {
      setTheme({
        themeName: colorSelected,
        themeNameDefault,
        light: availableThemes[colorSelected].light,
        dark: availableThemes[colorSelected].dark,
        version: version + 1,
      });
    }
  }, [colorSelected]);

  return (
    <Stack
      width={"100%"}
      sx={{
        alignItems: "center",
        overflow: "auto",
        width: "100%",
        justifyContent: "center",
        flexDirection: "row",
        gap: "32px",
        boxSizing: "border-box",
        "@media (max-width: 1000px)": {
          flexDirection: "column",
        },
      }}
    >
      <LeftCard theme={availableThemes[colorSelected]} />
    </Stack>
  );
};
