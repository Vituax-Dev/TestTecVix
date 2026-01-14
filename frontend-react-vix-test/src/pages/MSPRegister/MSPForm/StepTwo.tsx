import { Box, IconButton, Stack } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { useZTheme } from "../../../stores/useZTheme";
import { useZMspRegisterPage } from "../../../stores/useZMspRegisterPage";
import { TextRob16FontL } from "../../../components/TextL";
import { InputLabel } from "../../../components/Inputs/Input";
import { maskPhone } from "../../../utils/maskPhone";
import { UploadIcon } from "../../../icons/UploadIcon";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useUploadFile } from "../../../hooks/useUploadFile";

export const StepTwo = () => {
  const { t } = useTranslation();
  const { theme, mode } = useZTheme();
  const [showPassword, setShowPassword] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const { handleUpload, isUploading, getFileByObjectName } = useUploadFile();
  const {
    mspDomain,
    admName,
    admEmail,
    admPhone,
    position,
    admPassword,
    brandLogoUrl,
    setBrandLogo,
    setMSPDomain,
    setAdmName,
    setAdmEmail,
    setAdmPhone,
    setPosition,
    setAdmPassword,
  } = useZMspRegisterPage();

  const generatePassword = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%";
    let password = "";
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setAdmPassword(password);
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBrandLogo({
          brandLogoUrl: reader.result as string,
          brandObjectName: "",
        });
      };
      reader.readAsDataURL(file);

      const result = await handleUpload(file);
      if (result?.objectName) {
        setBrandLogo({
          brandLogoUrl: reader.result as string,
          brandObjectName: result.objectName,
        });
      }
    }
  };

  React.useEffect(() => {
    if (!admPassword) {
      generatePassword();
    }
    if (brandLogoUrl && !brandLogoUrl.includes('data:image') && !brandLogoUrl.includes('http')) {
      getFileByObjectName(brandLogoUrl).then(({ url }) => {
        if (url) {
          setBrandLogo({
            brandLogoUrl: url,
            brandObjectName: brandLogoUrl,
          });
        }
      });
    }
  }, []);

  return (
    <Stack gap="24px" width="100%">
      <Stack>
        <TextRob16FontL
          sx={{
            color: theme[mode].black,
            fontSize: "14px",
            fontWeight: 400,
            lineHeight: "16px",
            mb: "12px",
          }}
        >
          {t("mspRegister.mspDomain")} {t("mspRegister.required")}
        </TextRob16FontL>
        <InputLabel
          value={mspDomain}
          onChange={setMSPDomain}
          placeholder={t("mspRegister.mspDomainPlaceholder")}
          hasFocusEffect={false}
        />
      </Stack>

      <TextRob16FontL
        sx={{
          color: theme[mode].black,
          fontSize: "16px",
          fontWeight: 500,
          lineHeight: "24px",
        }}
      >
        {t("mspRegister.principalAdmin")}
      </TextRob16FontL>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "16px",
          "@media (max-width: 768px)": {
            gridTemplateColumns: "1fr",
          },
        }}
      >
        <Stack>
          <TextRob16FontL
            sx={{
              color: theme[mode].black,
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: "16px",
              mb: "12px",
            }}
          >
            {t("mspRegister.completeName")} {t("mspRegister.required")}
          </TextRob16FontL>
          <InputLabel
            value={admName}
            onChange={setAdmName}
            placeholder={t("mspRegister.completeNamePlaceholder")}
            hasFocusEffect={false}
          />
        </Stack>

        <Stack>
          <TextRob16FontL
            sx={{
              color: theme[mode].black,
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: "16px",
              mb: "12px",
            }}
          >
            {t("mspRegister.email")} {t("mspRegister.required")}
          </TextRob16FontL>
          <InputLabel
            value={admEmail}
            onChange={setAdmEmail}
            placeholder={t("mspRegister.emailPlaceholder")}
            type="email"
            hasFocusEffect={false}
          />
        </Stack>
      </Box>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          gap: "16px",
          "@media (max-width: 1024px)": {
            gridTemplateColumns: "1fr 1fr",
          },
          "@media (max-width: 768px)": {
            gridTemplateColumns: "1fr",
          },
        }}
      >
        <Stack>
          <TextRob16FontL
            sx={{
              color: theme[mode].black,
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: "16px",
              mb: "12px",
            }}
          >
            {t("mspRegister.phone")} {t("mspRegister.required")}
          </TextRob16FontL>
          <InputLabel
            value={maskPhone(admPhone)}
            onChange={(val) => setAdmPhone(val.replace(/\D/g, ""))}
            placeholder="(00) 00000-0000"
            hasFocusEffect={false}
          />
        </Stack>

        <Stack>
          <TextRob16FontL
            sx={{
              color: theme[mode].black,
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: "16px",
              mb: "12px",
            }}
          >
            {t("mspRegister.position")} {t("mspRegister.required")}
          </TextRob16FontL>
          <InputLabel
            value={position}
            onChange={setPosition}
            placeholder={t("mspRegister.positionPlaceholder")}
            hasFocusEffect={false}
          />
        </Stack>

        <Stack>
          <TextRob16FontL
            sx={{
              color: theme[mode].black,
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: "16px",
              mb: "12px",
            }}
          >
            {t("mspRegister.initialPassword")} (
            {t("mspRegister.initialPasswordPlaceholder")})
          </TextRob16FontL>
          <Box sx={{ position: "relative" }}>
            <InputLabel
              value={admPassword}
              onChange={() => {}}
              type={showPassword ? "text" : "password"}
              disabled
              hasFocusEffect={false}
            />
            {admPassword && (
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                sx={{
                  position: "absolute",
                  right: "8px",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            )}
          </Box>
        </Stack>

        <Stack>
          <TextRob16FontL
            sx={{
              color: theme[mode].black,
              fontSize: "14px",
              fontWeight: 400,
              lineHeight: "16px",
              mb: "12px",
            }}
          >
            Nome do usuário {t("mspRegister.required")}
          </TextRob16FontL>
          <InputLabel
            value={admEmail.split("@")[0]}
            onChange={() => {}}
            disabled
            hasFocusEffect={false}
          />
        </Stack>
      </Box>

      <Stack gap="16px" width="100%">
        <TextRob16FontL
          sx={{
            color: theme[mode].black,
            fontSize: "16px",
            fontWeight: 500,
            lineHeight: "24px",
          }}
        >
          {t("mspRegister.companyLogo")}
        </TextRob16FontL>
        <TextRob16FontL
          sx={{
            color: theme[mode].gray,
            fontSize: "14px",
            fontWeight: 400,
            lineHeight: "20px",
          }}
        >
          {t("mspRegister.companyLogoSubtitle")}
        </TextRob16FontL>
        <Box
          sx={{
            display: "flex",
            gap: "16px",
            alignItems: "flex-start",
          }}
        >
          <Box
            onClick={() => fileInputRef.current?.click()}
            sx={{
              width: "120px",
              height: "120px",
              border: `1px dashed ${theme[mode].grayLight}`,
              borderRadius: "12px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexShrink: 0,
              cursor: "pointer",
              backgroundImage: brandLogoUrl ? `url(${brandLogoUrl})` : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {!brandLogoUrl && <UploadIcon fill={theme[mode].gray} />}
          </Box>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/jpg"
            onChange={handleFileSelect}
            style={{ display: "none" }}
          />
          <Stack gap="8px" sx={{ flex: 1 }}>
            <Stack direction="row" gap="4px" alignItems="center">
              <Box
                sx={{
                  width: "4px",
                  height: "4px",
                  borderRadius: "50%",
                  backgroundColor: theme[mode].gray,
                }}
              />
              <TextRob16FontL
                sx={{
                  color: theme[mode].gray,
                  fontSize: "12px",
                  fontWeight: 400,
                  lineHeight: "16px",
                }}
              >
                Padrão: 512x512 pixels
              </TextRob16FontL>
            </Stack>
            <Stack direction="row" gap="4px" alignItems="center">
              <Box
                sx={{
                  width: "4px",
                  height: "4px",
                  borderRadius: "50%",
                  backgroundColor: theme[mode].gray,
                }}
              />
              <TextRob16FontL
                sx={{
                  color: theme[mode].gray,
                  fontSize: "12px",
                  fontWeight: 400,
                  lineHeight: "16px",
                }}
              >
                Tamanho máximo: 5MB
              </TextRob16FontL>
            </Stack>
            <Stack direction="row" gap="4px" alignItems="center">
              <Box
                sx={{
                  width: "4px",
                  height: "4px",
                  borderRadius: "50%",
                  backgroundColor: theme[mode].gray,
                }}
              />
              <TextRob16FontL
                sx={{
                  color: theme[mode].gray,
                  fontSize: "12px",
                  fontWeight: 400,
                  lineHeight: "16px",
                }}
              >
                Formatos: PNG, JPG, JPEG
              </TextRob16FontL>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Stack>
  );
};
