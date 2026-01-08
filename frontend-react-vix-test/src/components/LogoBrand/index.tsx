import { Stack, SxProps } from "@mui/material";
import { useZTheme } from "../../stores/useZTheme";
import logo from "../../assets/Vituax_LOGO_Versao_Principal_RBG.svg";
import logoBranco from "../../assets/Vituax_LOGO_Versao_Principal_Branco.svg";
import { useZBrandInfo } from "../../stores/useZBrandStore";
import { CSSProperties } from "react";
// import { useZUserProfile } from "../../stores/useZUserProfile";
// import { useZCompany } from "../../stores/useZCompany";
import { ImgFromDB } from "../ImgFromDB";

export const LogoBrand = ({
  sx = {},
  sxImg,
}: {
  sx?: SxProps;
  sxImg?: CSSProperties;
}) => {
  const { mode, theme } = useZTheme();
  const { brandLogo, brandLogoTemp } = useZBrandInfo();
  // const { idCompany } = useZUserProfile();
  // const { companyLogo } = useZCompany();

  const srcLogo = (() => {
    switch (true) {
      // case Boolean(idCompany) && Boolean(companyLogo):
      //   return companyLogo;
      case Boolean(brandLogoTemp):
        return brandLogoTemp;
      case Boolean(brandLogo):
        return brandLogo;
      case Boolean(mode === "light"):
        return logo;

      default:
        return logoBranco;
    }
  })();

  return (
    <Stack
      sx={{
        width: "100%",
        backgroundColor: theme[mode].mainBackground,
        height: "50px",
        maxHeight: "50px",
        overflow: "hidden",
        ...sx,
      }}
    >
      <ImgFromDB
        src={srcLogo}
        alt="logo"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          ...sxImg,
        }}
      />
    </Stack>
  );
};
