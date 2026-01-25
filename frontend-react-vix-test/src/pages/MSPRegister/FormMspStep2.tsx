import { Box, Divider, Stack, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDropzone } from "react-dropzone";
import { useZTheme } from "../../stores/useZTheme";
import { useZMspRegisterPage } from "../../stores/useZMspRegisterPage";
import { TextRob18Font2M } from "../../components/Text2M";
import { TextRob16Font1S } from "../../components/Text1S";
import { TextRob12Font2Xs } from "../../components/Text2Xs";
import { LabelInputVM } from "../VirtualMachine/components/LabelInputVM";
import { Btn } from "../../components/Buttons/Btn";
import { UploadFileIcon } from "../../icons/UploadFileIcon";
import { CircleIcon } from "../../icons/CircleIcon";
import { useUploadFile } from "../../hooks/useUploadFile";
import { useBrandMasterResources } from "../../hooks/useBrandMasterResources";
import { AbsoluteBackDrop } from "../../components/AbsoluteBackDrop";
import { maskPhone } from "../../utils/maskPhone";
import { maskDomain } from "../../utils/maskDomain";

interface FormMspStep2Props {
  onBack: () => void;
  onConfirm: () => void;
  onClear: () => void;
}

export const FormMspStep2 = ({ onBack, onConfirm, onClear }: FormMspStep2Props) => {
  const { t } = useTranslation();
  const { mode, theme } = useZTheme();
  const { handleUpload, isUploading, getFileByObjectName } = useUploadFile();
  const { createAnewBrandMaster, editBrandMaster, isLoading } = useBrandMasterResources();
  
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
    brandObjectName,
    setBrandLogo,
    companyName,
    cnpj,
    phone,
    sector,
    contactEmail,
    cep,
    locality,
    countryState,
    city,
    street,
    streetNumber,
    cityCode,
    district,
    isPoc,
    minConsumption,
    discountPercent,
    isEditing,
    setModalOpen,
    setActiveStep,
    resetAll,
    setIsEditing,
  } = useZMspRegisterPage();

  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [username, setUsername] = useState("");

  // Field-level error states
  const [domainError, setDomainError] = useState<string | null>(null);
  const [admNameError, setAdmNameError] = useState<string | null>(null);
  const [admEmailError, setAdmEmailError] = useState<string | null>(null);

  // Validation functions
  const validateDomain = () => {
    if (!mspDomain.trim()) {
      setDomainError(t("validation.required"));
      return false;
    }
    setDomainError(null);
    return true;
  };

  const validateAdmName = () => {
    if (!admName.trim()) {
      setAdmNameError(t("validation.required"));
      return false;
    }
    setAdmNameError(null);
    return true;
  };

  const validateAdmEmail = () => {
    if (!admEmail.trim()) {
      setAdmEmailError(t("validation.required"));
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(admEmail)) {
      setAdmEmailError(t("validation.invalidEmail"));
      return false;
    }
    setAdmEmailError(null);
    return true;
  };

  useEffect(() => {
    const loadLogo = async () => {
      if (brandObjectName) {
        const { url } = await getFileByObjectName(brandObjectName);
        if (url) setUploadedFile(url);
      }
    };
    loadLogo();
  }, [brandObjectName, getFileByObjectName]);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    const file = acceptedFiles[0];
    const response = await handleUpload(file);
    if (response && response.url) {
      setUploadedFile(response.url);
      setBrandLogo({
        brandLogoUrl: response.url,
        brandObjectName: response.objectName,
      });
    }
  }, [handleUpload, setBrandLogo]);

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp"] },
    maxSize: 50 * 1024 * 1024,
  });

  const handleRemoveLogo = () => {
    setUploadedFile(null);
    setBrandLogo({ brandLogoUrl: "", brandObjectName: "" });
  };

  const handleConfirm = async () => {
    const isDomainValid = validateDomain();
    const isAdmNameValid = validateAdmName();
    const isAdmEmailValid = validateAdmEmail();

    if (!isDomainValid || !isAdmNameValid || !isAdmEmailValid) {
      return;
    }

    const isEditingMsp = isEditing.length > 0;

    if (isEditingMsp) {
      // Edit existing MSP
      const response = await editBrandMaster(isEditing[0], {
        brandName: companyName,
        cnpj,
        smsContact: phone,
        setorName: sector,
        emailContact: contactEmail,
        cep,
        location: locality,
        state: countryState,
        city,
        street,
        placeNumber: streetNumber,
        brandLogo: brandObjectName,
        cityCode: cityCode ? parseInt(cityCode) : undefined,
        district,
        isPoc,
        minConsumption: minConsumption ? parseFloat(minConsumption) : undefined,
        discountPercent: discountPercent ? parseFloat(discountPercent) : undefined,
        domain: mspDomain,
        admName,
        admEmail,
        admPhone,
        admPassword: admPassword || undefined,
      });

      if (response?.brandMaster) {
        setModalOpen("editedMsp");
        resetAll();
        setIsEditing([]);
        setActiveStep(0);
      }
    } else {
      // Create new MSP
      const response = await createAnewBrandMaster({
        companyName,
        cnpj,
        phone,
        sector,
        contactEmail,
        cep,
        locality,
        countryState,
        city,
        street,
        streetNumber,
        admName,
        admEmail,
        admPhone,
        admPassword: admPassword || "TempPass@123",
        brandLogo: brandObjectName,
        position: "admin",
        mspDomain,
        cityCode: cityCode ? parseInt(cityCode) : undefined,
        district,
        isPoc,
        minConsumption: minConsumption ? parseFloat(minConsumption) : undefined,
        discountPercent: discountPercent ? parseFloat(discountPercent) : undefined,
      });

      if (response?.brandMaster) {
        setModalOpen("createdMsp");
        resetAll();
        setActiveStep(0);
      }
    }

    onConfirm();
  };

  const handleClear = () => {
    setMSPDomain("");
    setAdmName("");
    setAdmEmail("");
    setAdmPhone("");
    setAdmPassword("");
    setUsername("");
    handleRemoveLogo();
    onClear();
  };

  return (
    <>
      {(isLoading || isUploading) && <AbsoluteBackDrop open />}
      <Stack
        sx={{
          width: "100%",
          padding: "24px",
          gap: "24px",
        }}
      >
        <TextRob18Font2M
          sx={{
            color: theme[mode].black,
            fontSize: "18px",
            fontWeight: "500",
            lineHeight: "24px",
          }}
        >
          {t("mspRegister.mspDomainInfo")}
        </TextRob18Font2M>

        <LabelInputVM
          onChange={(val) => {
            setMSPDomain(maskDomain(val));
            if (domainError) setDomainError(null);
          }}
          value={mspDomain}
          label={`${t("mspRegister.domain")} ${t("mspRegister.required")}`}
          placeholder="xx.xxx.xxx"
          onBlur={validateDomain}
          error={domainError}
          containerSx={{
            "@media (min-width: 768px)": {
              maxWidth: "300px",
            },
          }}
        />

        <Divider sx={{ borderColor: theme[mode].grayLight }} />

        <TextRob18Font2M
          sx={{
            color: theme[mode].black,
            fontSize: "18px",
            fontWeight: "500",
            lineHeight: "24px",
          }}
        >
          {t("mspRegister.principalAdmin")}
        </TextRob18Font2M>

        <Stack
          sx={{
            gap: "24px",
            "@media (min-width: 768px)": {
              flexDirection: "row",
            },
          }}
        >
          <LabelInputVM
            onChange={(val) => {
              setAdmName(val);
              if (admNameError) setAdmNameError(null);
            }}
            value={admName}
            label={`${t("mspRegister.completeName")} ${t("mspRegister.required")}`}
            placeholder={t("mspRegister.completeNamePlaceholder")}
            onBlur={validateAdmName}
            error={admNameError}
          />
          <LabelInputVM
            onChange={(val) => {
              setAdmEmail(val);
              if (admEmailError) setAdmEmailError(null);
            }}
            value={admEmail}
            label={`${t("mspRegister.email")} ${t("mspRegister.required")}`}
            placeholder={t("mspRegister.emailPlaceholder")}
            onBlur={validateAdmEmail}
            error={admEmailError}
          />
        </Stack>

        <Stack
          sx={{
            gap: "24px",
            "@media (min-width: 768px)": {
              flexDirection: "row",
            },
          }}
        >
          <LabelInputVM
            onChange={(val) => setAdmPhone(maskPhone(val))}
            value={admPhone}
            label={t("mspRegister.phone")}
            placeholder="(00) 00000-0000"
          />
          <LabelInputVM
            onChange={() => {}}
            value={"Administrador"}
            label={t("mspRegister.position")}
            placeholder={t("mspRegister.positionPlaceholder")}
            disabled
          />
          <LabelInputVM
            onChange={setAdmPassword}
            value={admPassword}
            label={`${t("mspRegister.initialPassword")} ${t("mspRegister.required")}`}
            placeholder={t("mspRegister.initialPasswordPlaceholder")}
            type="password"
          />
          <LabelInputVM
            onChange={setUsername}
            value={username}
            label={t("mspRegister.username")}
            placeholder={t("mspRegister.usernamePlaceholder")}
          />
        </Stack>

        <Divider sx={{ borderColor: theme[mode].grayLight }} />

        <Stack sx={{ gap: "8px" }}>
          <TextRob18Font2M
            sx={{
              color: theme[mode].black,
              fontSize: "18px",
              fontWeight: "500",
              lineHeight: "24px",
            }}
          >
            {t("mspRegister.companyLogo")}
          </TextRob18Font2M>
          <TextRob12Font2Xs
            sx={{
              color: theme[mode].tertiary,
              fontSize: "12px",
            }}
          >
            {t("mspRegister.companyLogoSubtitle")}
          </TextRob12Font2Xs>
        </Stack>

        <Stack
          sx={{
            flexDirection: "row",
            gap: "24px",
            alignItems: "flex-start",
            flexWrap: "wrap",
          }}
        >
          <Box
            {...getRootProps()}
            sx={{
              width: "165px",
              height: "140px",
              border: `1px dashed ${theme[mode].grayLight}`,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "12px",
              borderRadius: "12px",
              background: isDragActive
                ? theme[mode].grayLight
                : theme[mode].lightV2,
              cursor: "pointer",
            }}
          >
            <input {...getInputProps()} />
            <UploadFileIcon color={theme[mode].tertiary} />
            <TextRob12Font2Xs
              sx={{
                color: theme[mode].tertiary,
                fontWeight: "400",
                fontSize: "12px",
                maxWidth: "120px",
                textAlign: "center",
                lineHeight: "16px",
                userSelect: "none",
              }}
            >
              {isUploading ? "Loading..." : t("mspRegister.clickToUpload")}
            </TextRob12Font2Xs>
          </Box>

          {uploadedFile && (
            <Box
              sx={{
                width: "100px",
                height: "100px",
                borderRadius: "8px",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: theme[mode].lightV2,
              }}
            >
              <img
                src={uploadedFile}
                alt="Logo"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                }}
              />
            </Box>
          )}

          <Stack sx={{ gap: "8px" }}>
            {uploadedFile && (
              <Stack sx={{ flexDirection: "row", gap: "16px" }}>
                <Typography
                  sx={{
                    color: theme[mode].blueDark,
                    cursor: "pointer",
                    textDecoration: "underline",
                    fontSize: "14px",
                  }}
                  onClick={open}
                >
                  {t("mspRegister.changeLogo")}
                </Typography>
                <Typography
                  sx={{
                    color: theme[mode].blueDark,
                    cursor: "pointer",
                    textDecoration: "underline",
                    fontSize: "14px",
                  }}
                  onClick={handleRemoveLogo}
                >
                  {t("mspRegister.removeLogo")}
                </Typography>
              </Stack>
            )}
            <Stack sx={{ gap: "4px", marginTop: "8px" }}>
              <Stack sx={{ flexDirection: "row", alignItems: "center", gap: "8px" }}>
                <CircleIcon color={theme[mode].blueMedium} />
                <TextRob12Font2Xs sx={{ color: theme[mode].tertiary }}>
                  {t("mspRegister.logoPattern")}
                </TextRob12Font2Xs>
              </Stack>
              <Stack sx={{ flexDirection: "row", alignItems: "center", gap: "8px" }}>
                <CircleIcon color={theme[mode].blueMedium} />
                <TextRob12Font2Xs sx={{ color: theme[mode].tertiary }}>
                  {t("mspRegister.logoSize")}
                </TextRob12Font2Xs>
              </Stack>
              <Stack sx={{ flexDirection: "row", alignItems: "center", gap: "8px" }}>
                <CircleIcon color={theme[mode].blueMedium} />
                <TextRob12Font2Xs sx={{ color: theme[mode].tertiary }}>
                  {t("mspRegister.logoFormats")}
                </TextRob12Font2Xs>
              </Stack>
            </Stack>
          </Stack>
        </Stack>

        <Stack
          sx={{
            flexDirection: "row",
            gap: "24px",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          <Stack sx={{ flexDirection: "row", gap: "24px" }}>
            <Btn
              onClick={handleConfirm}
              sx={{
                padding: "9px 24px",
                backgroundColor: theme[mode].blue,
                borderRadius: "12px",
                minWidth: "180px",
              }}
            >
              <TextRob16Font1S
                sx={{
                  color: theme[mode].btnText,
                  fontSize: "16px",
                  fontWeight: "500",
                  lineHeight: "20px",
                }}
              >
                {t("mspRegister.confirm")}
              </TextRob16Font1S>
            </Btn>
            <Btn
              onClick={onBack}
              sx={{
                padding: "9px 24px",
                backgroundColor: theme[mode].grayLight,
                borderRadius: "12px",
                minWidth: "120px",
              }}
            >
              <TextRob16Font1S
                sx={{
                  color: theme[mode].gray,
                  fontSize: "16px",
                  fontWeight: "500",
                  lineHeight: "16px",
                }}
              >
                {t("mspRegister.back")}
              </TextRob16Font1S>
            </Btn>
          </Stack>
          <Typography
            sx={{
              color: theme[mode].blueDark,
              cursor: "pointer",
              textDecoration: "underline",
              fontSize: "14px",
            }}
            onClick={handleClear}
          >
            {t("mspRegister.clear")}
          </Typography>
        </Stack>
      </Stack>
    </>
  );
};
