import { useTranslation } from "react-i18next";
import { themeColors, useZTheme } from "../../../../stores/useZTheme";
import { TextRob16FontL } from "../../../../components/TextL";
import { SimpleInput } from "../../../../components/Inputs/SimpleInput";
import { Button, Tooltip } from "@mui/material";
import { TextRob14Font1Xs } from "../../../../components/Text1Xs";
import { useZBrandInfo } from "../../../../stores/useZBrandStore";
import { useBrandMasterResources } from "../../../../hooks/useBrandMasterResources";
import { AbsoluteBackDrop } from "../../../../components/AbsoluteBackDrop";
import { toast } from "react-toastify";
import { useState } from "react";

interface IWhiteLabelChildProps {
  theme: {
    dark: themeColors;
    light: themeColors;
  };
  isAdmin: boolean;
  isVituaxUser: boolean;
}

export const LeftCardDomain = ({ theme, isAdmin, isVituaxUser }: IWhiteLabelChildProps) => {
  const { mode } = useZTheme();
  const { t } = useTranslation();
  const {
    brandLogoTemp,
    brandObjectName,
    setBrandInfo,
    domain: domainName,
  } = useZBrandInfo();
  const [domain, setDomain] = useState<string>(domainName || "");
  const { updateBrandMaster, isLoading } = useBrandMasterResources();

  // Mensagem do tooltip baseada no motivo do bloqueio
  const disabledTooltip = isVituaxUser
    ? t("generic.vituaxCannotEdit")
    : t("generic.errorOlnlyAdmin");

  const handleSave = async () => {
    if (!isAdmin) {
      toast.error(t(isVituaxUser ? "generic.vituaxCannotEdit" : "generic.errorOlnlyAdmin"));
      return;
    }
    const response = await updateBrandMaster({
      domain,
      brandLogo: brandObjectName || undefined,
    });
    if (!response) return;
    setBrandInfo({
      ...(brandLogoTemp
        ? { brandLogo: brandLogoTemp, brandLogoTemp: "", brandObjectName: "" }
        : {}),
      domain,
    });
  };

  return (
    <>
      <AbsoluteBackDrop open={isLoading} />
      <TextRob16FontL
        sx={{
          fontWeight: 500,
          fontSize: "16px",
          color: theme[mode].primary,
          marginBottom: "16px",
        }}
      >
        {t("whiteLabel.dns")}
      </TextRob16FontL>
      <Tooltip title={!isAdmin ? disabledTooltip : ""} arrow placement="top">
        <span style={{ width: "100%" }}>
          <SimpleInput
            placeholder="Domain/Subdomain"
            onChange={(value) => setDomain(value)}
            value={domain}
            disabled={!isAdmin}
            sx={{
              marginBottom: "24px",
              "& .Mui-disabled": {
                color: theme[mode].gray,
                pointerEvents: "inherit",
                cursor: "not-allowed",
                WebkitTextFillColor: "unset",
              },
            }}
            inputSx={{
              width: "100%",
              height: "48px",
              boxSizing: "border-box",
              padding: "16px",
              borderRadius: "12px",
              background: isAdmin ? theme[mode].lightV2 : theme[mode].grayLight,
              color: isAdmin ? theme[mode].primary : theme[mode].gray,
            }}
          />
        </span>
      </Tooltip>
      <Tooltip title={!isAdmin ? disabledTooltip : ""} arrow placement="top">
        <span style={{ width: "100%" }}>
          <Button
            disabled={!isAdmin}
            sx={{
              background: theme[mode].blue,
              width: "100%",
              color: theme[mode].btnText,
              fontWeight: 500,
              fontSize: "16px",
              textTransform: "none",
              height: "48px",
              borderRadius: "12px",
              "&.Mui-disabled": {
                background: theme[mode].grayLight,
                color: theme[mode].gray,
              },
            }}
            onClick={() => handleSave()}
          >
            {t("whiteLabel.saveChanges")}
          </Button>
        </span>
      </Tooltip>
      <TextRob14Font1Xs
        sx={{
          color: mode === "light" ? theme.light.ok : theme.dark.greenLight,
          fontWeight: 400,
          fontSize: "14px",
          height: "20px",
          marginTop: "16px",
        }}
      ></TextRob14Font1Xs>
    </>
  );
};
