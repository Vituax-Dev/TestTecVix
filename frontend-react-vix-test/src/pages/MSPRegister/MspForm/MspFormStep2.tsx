import { Box, Button, IconButton, Stack } from "@mui/material";
import { useZTheme } from "../../../stores/useZTheme";
import { useTranslation } from "react-i18next";
import { useZMspRegisterPage } from "../../../stores/useZMspRegisterPage";
import { InputLabelTooltip } from "../../../components/Inputs/InputLabelTooltip";
import { TextRob16Font1S } from "../../../components/Text1S";
import { TextRob12Font2Xs } from "../../../components/Text2Xs";
import { ImgFromDB } from "../../../components/ImgFromDB";
import { useEffect, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useDropzone } from "react-dropzone";
import { UploadIcon } from "../../../icons/UploadIcon";

interface IMspFormStep2Props {
  onConfirm: () => void;
  onBack: () => void;
  onClear: () => void;
  isEditing: boolean;
  isLoading?: boolean;
}

export const MspFormStep2 = ({
  onConfirm,
  onBack,
  onClear,
  isEditing,
  isLoading = false,
}: IMspFormStep2Props) => {
  const { theme, mode } = useZTheme();
  const { t } = useTranslation();
  const {
    mspDomain,
    setMSPDomain,
    admName,
    setAdmName,
    admEmail,
    setAdmEmail,
    admPhone,
    setAdmPhone,
    admPassword,
    setAdmPassword,
    brandLogoUrl,
    setBrandLogo,
    brandLogoFile,
    setBrandLogoFile,
    brandLogoPreview,
    setBrandLogoPreview,
    showErrorPageTwo,
    setShowErrorPageTwo,
  } = useZMspRegisterPage();

  const [showPassword, setShowPassword] = useState(false);

  // Limpar blob URL ao desmontar para evitar memory leak
  useEffect(() => {
    return () => {
      if (brandLogoPreview && brandLogoPreview.startsWith("blob:")) {
        URL.revokeObjectURL(brandLogoPreview);
      }
    };
  }, [brandLogoPreview]);

  // Configuração do dropzone para seleção local (sem upload)
  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    const file = acceptedFiles[0];
    
    // Revogar URL anterior se existir
    if (brandLogoPreview && brandLogoPreview.startsWith("blob:")) {
      URL.revokeObjectURL(brandLogoPreview);
    }
    
    // Criar preview local
    const previewUrl = URL.createObjectURL(file);
    setBrandLogoFile(file);
    setBrandLogoPreview(previewUrl);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp"] },
    maxSize: 50 * 1024 * 1024,
    disabled: isLoading,
  });

  const validateAndConfirm = () => {
    // Se está editando, não precisa validar campos de admin
    if (isEditing) {
      onConfirm();
      return;
    }

    // Validar campos obrigatórios para criação
    if (!admName || !admEmail || !admPassword) {
      setShowErrorPageTwo(true);
      return;
    }
    setShowErrorPageTwo(false);
    onConfirm();
  };

  const handleRemoveLogo = () => {
    // Revogar URL de preview se existir
    if (brandLogoPreview && brandLogoPreview.startsWith("blob:")) {
      URL.revokeObjectURL(brandLogoPreview);
    }
    setBrandLogoFile(null);
    setBrandLogoPreview("");
    setBrandLogo({ brandLogoUrl: "", brandObjectName: "" });
  };

  // URL para exibir: preview local ou URL do servidor
  const displayLogoUrl = brandLogoPreview || brandLogoUrl;

  return (
    <form onSubmit={(e) => e.preventDefault()}>
    <Stack
      sx={{
        width: "100%",
        background: theme[mode].mainBackground,
        borderRadius: "16px",
        padding: "24px",
        boxSizing: "border-box",
        gap: "24px",
      }}
    >
      {/* Seção: Domínio do MSP */}
      <Stack sx={{ gap: "16px" }}>
        <TextRob16Font1S
          sx={{
            color: theme[mode].black,
            fontSize: "16px",
            fontWeight: 500,
            lineHeight: "24px",
          }}
        >
          {t("mspRegister.mspDomainSection")}
        </TextRob16Font1S>
        <Box sx={{ maxWidth: "300px" }}>
          <InputLabelTooltip
            value={mspDomain}
            onChange={setMSPDomain}
            inputName="mspDomain"
            label={
              <>
                {t("mspRegister.domain")}{" "}
                <span style={{ color: theme[mode].gray }}>
                  {t("mspRegister.required")}
                </span>
              </>
            }
            placeholder={t("mspRegister.mspDomainPlaceholder")}
          />
        </Box>
      </Stack>

      {/* Seção: Administrador Principal */}
      <Stack sx={{ gap: "16px" }}>
        <TextRob16Font1S
          sx={{
            color: theme[mode].black,
            fontSize: "16px",
            fontWeight: 500,
            lineHeight: "24px",
          }}
        >
          {t("mspRegister.principalAdmin")}
        </TextRob16Font1S>

        {/* Primeira linha: Nome, Email */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "24px",
            "@media (max-width: 1100px)": {
              gridTemplateColumns: "repeat(2, 1fr)",
            },
            "@media (max-width: 600px)": {
              gridTemplateColumns: "1fr",
            },
          }}
        >
          <InputLabelTooltip
            value={admName}
            onChange={setAdmName}
            inputName="admName"
            autoComplete="name"
            label={
              <>
                {t("mspRegister.completeName")}{" "}
                <span style={{ color: theme[mode].gray }}>
                  {t("mspRegister.required")}
                </span>
              </>
            }
            placeholder={t("mspRegister.completeNamePlaceholder")}
            disabled={isEditing}
            sxContainer={{
              ...(showErrorPageTwo && !admName && !isEditing && {
                "& .MuiOutlinedInput-root fieldset": {
                  borderColor: theme[mode].danger + " !important",
                },
              }),
            }}
          />
          <InputLabelTooltip
            value={admEmail}
            onChange={setAdmEmail}
            inputName="admEmail"
            autoComplete="email"
            label={
              <>
                {t("mspRegister.email")}{" "}
                <span style={{ color: theme[mode].gray }}>
                  {t("mspRegister.required")}
                </span>
              </>
            }
            placeholder={t("mspRegister.emailPlaceholder")}
            type="email"
            disabled={isEditing}
            sxContainer={{
              ...(showErrorPageTwo && !admEmail && !isEditing && {
                "& .MuiOutlinedInput-root fieldset": {
                  borderColor: theme[mode].danger + " !important",
                },
              }),
            }}
          />
        </Box>

        {/* Segunda linha: Telefone, Cargo, Senha, Username */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "24px",
            "@media (max-width: 1100px)": {
              gridTemplateColumns: "repeat(2, 1fr)",
            },
            "@media (max-width: 600px)": {
              gridTemplateColumns: "1fr",
            },
          }}
        >
          <InputLabelTooltip
            value={admPhone}
            onChange={setAdmPhone}
            inputName="admPhone"
            autoComplete="tel"
            label={t("mspRegister.adminPhone")}
            placeholder={t("mspRegister.adminPhonePlaceholder")}
            disabled={isEditing}
          />
          <InputLabelTooltip
            value={t("mspRegister.adminPositionValue")}
            onChange={() => {}}
            inputName="admPosition"
            label={t("mspRegister.adminPosition")}
            placeholder={t("mspRegister.positionPlaceholder")}
            disabled
          />
          <Box sx={{ position: "relative" }}>
            <InputLabelTooltip
              value={admPassword}
              onChange={setAdmPassword}
              inputName="admPassword"
              autoComplete="new-password"
              label={
                <>
                  {t("mspRegister.initialPassword")}{" "}
                  {!isEditing && (
                    <span style={{ color: theme[mode].gray }}>
                      {t("mspRegister.required")}
                    </span>
                  )}
                </>
              }
              placeholder={t("mspRegister.initialPasswordPlaceholder")}
              type={showPassword ? "text" : "password"}
              disabled={isEditing}
              sxContainer={{
                ...(showErrorPageTwo && !admPassword && !isEditing && {
                  "& .MuiOutlinedInput-root fieldset": {
                    borderColor: theme[mode].danger + " !important",
                  },
                }),
              }}
            />
            {!isEditing && (
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                sx={{
                  position: "absolute",
                  right: "8px",
                  top: "36px",
                  color: theme[mode].gray,
                }}
              >
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            )}
          </Box>
          <InputLabelTooltip
            value={admName}
            onChange={() => {}}
            inputName="adminUsername"
            label={t("mspRegister.adminUsername")}
            placeholder={t("mspRegister.adminUsernamePlaceholder")}
            disabled
          />
        </Box>
      </Stack>

      {/* Divider */}
      <Box
        sx={{
          height: "1px",
          width: "100%",
          background: theme[mode].grayLight,
        }}
      />

      {/* Seção: Logo */}
      <Stack sx={{ gap: "12px" }}>
        <TextRob16Font1S
          sx={{
            color: theme[mode].black,
            fontSize: "16px",
            fontWeight: 500,
            lineHeight: "24px",
          }}
        >
          {t("mspRegister.companyLogo")}
        </TextRob16Font1S>
        <TextRob12Font2Xs
          sx={{
            color: theme[mode].gray,
            fontSize: "12px",
            fontWeight: 400,
          }}
        >
          {t("mspRegister.companyLogoSubtitle")}
        </TextRob12Font2Xs>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            gap: "24px",
            flexWrap: "wrap",
          }}
        >
          {/* Upload area - Seleção local sem upload imediato */}
          <Box
            {...getRootProps()}
            sx={{
              width: "200px",
              height: "70px",
              border: `1px dashed ${theme[mode].grayLight}`,
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: "16px",
              borderRadius: "12px",
              background: isDragActive
                ? theme[mode].grayLight
                : theme[mode].mainBackground,
              cursor: isLoading ? "not-allowed" : "pointer",
              opacity: isLoading ? 0.5 : 1,
              "&:hover": {
                background: theme[mode].grayLight,
              },
            }}
          >
            <input {...getInputProps()} />
            <UploadIcon fill={theme[mode].black} />
            <Stack sx={{ alignItems: "center" }}>
              <TextRob12Font2Xs sx={{ color: theme[mode].gray, textAlign: "center" }}>
                {t("mspRegister.companyLogoSubtitle").split(" ").slice(0, 4).join(" ")}
              </TextRob12Font2Xs>
            </Stack>
          </Box>

          {/* Preview do logo */}
          {displayLogoUrl && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "16px",
              }}
            >
              {brandLogoPreview ? (
                // Preview local (blob URL)
                <img
                  src={brandLogoPreview}
                  alt="Logo preview"
                  style={{
                    width: "80px",
                    height: "80px",
                    objectFit: "contain",
                    borderRadius: "8px",
                    border: `1px solid ${theme[mode].grayLight}`,
                  }}
                />
              ) : (
                // URL do servidor
                <ImgFromDB
                  src={brandLogoUrl}
                  alt="Logo preview"
                  style={{
                    width: "80px",
                    height: "80px",
                    objectFit: "contain",
                    borderRadius: "8px",
                    border: `1px solid ${theme[mode].grayLight}`,
                  }}
                />
              )}
              <Stack sx={{ gap: "4px" }}>
                <Button
                  {...getRootProps()}
                  sx={{
                    color: theme[mode].blue,
                    textTransform: "none",
                    padding: 0,
                    justifyContent: "flex-start",
                    "&:hover": {
                      background: "transparent",
                      textDecoration: "underline",
                    },
                  }}
                >
                  {t("mspRegister.changeLogo")}
                </Button>
                <Button
                  onClick={handleRemoveLogo}
                  sx={{
                    color: theme[mode].danger,
                    textTransform: "none",
                    padding: 0,
                    justifyContent: "flex-start",
                    "&:hover": {
                      background: "transparent",
                      textDecoration: "underline",
                    },
                  }}
                >
                  {t("mspRegister.removeLogo")}
                </Button>
              </Stack>
            </Box>
          )}

          {/* Especificações */}
          <Stack sx={{ gap: "4px" }}>
            <TextRob12Font2Xs sx={{ color: theme[mode].gray }}>
              • {t("mspRegister.logoSpecs")}
            </TextRob12Font2Xs>
            <TextRob12Font2Xs sx={{ color: theme[mode].gray }}>
              • {t("mspRegister.logoSize")}
            </TextRob12Font2Xs>
            <TextRob12Font2Xs sx={{ color: theme[mode].gray }}>
              • {t("mspRegister.logoFormats")}
            </TextRob12Font2Xs>
          </Stack>
        </Box>
      </Stack>

      {/* Botões de ação */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "16px",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <Box sx={{ display: "flex", gap: "16px" }}>
          <Button
            onClick={validateAndConfirm}
            disabled={isLoading}
            sx={{
              background: theme[mode].blue,
              color: theme[mode].btnText,
              textTransform: "none",
              borderRadius: "12px",
              padding: "12px 32px",
              fontWeight: 500,
              "&:hover": {
                background: theme[mode].blueDark,
              },
              "&:disabled": {
                background: theme[mode].grayLight,
                color: theme[mode].gray,
              },
            }}
          >
            {isLoading ? "..." : t("mspRegister.confirm")}
          </Button>
          <Button
            onClick={onBack}
            disabled={isLoading}
            sx={{
              background: theme[mode].tertiary,
              color: theme[mode].primary,
              textTransform: "none",
              borderRadius: "12px",
              padding: "12px 32px",
              fontWeight: 500,
              "&:hover": {
                background: theme[mode].grayLight,
              },
            }}
          >
            {t("mspRegister.back")}
          </Button>
        </Box>
        <Button
          onClick={onClear}
          disabled={isLoading}
          sx={{
            color: theme[mode].blue,
            textTransform: "none",
            padding: 0,
            "&:hover": {
              background: "transparent",
              textDecoration: "underline",
            },
          }}
        >
          {t("mspRegister.clear")}
        </Button>
      </Box>

      {/* Mensagem de erro */}
      {showErrorPageTwo && (
        <TextRob16Font1S
          sx={{
            color: theme[mode].danger,
            fontSize: "14px",
            fontWeight: 400,
          }}
        >
          {t("mspRegister.alertMessage")}
        </TextRob16Font1S>
      )}
    </Stack>
    </form>
  );
};
