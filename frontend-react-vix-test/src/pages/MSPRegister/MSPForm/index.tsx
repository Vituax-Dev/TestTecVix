import { Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useZTheme } from "../../../stores/useZTheme";
import { useZMspRegisterPage } from "../../../stores/useZMspRegisterPage";
import { StepOne } from "./StepOne";
import { StepTwo } from "./StepTwo";
import { FullFilledButton } from "../../../components/Buttons/FullFilledButton";
import { UnfilledButton } from "../../../components/Buttons/UnfilledButton";
import { useBrandMasterResources } from "../../../hooks/useBrandMasterResources";
import { useState } from "react";

export const MSPForm = () => {
  const { t } = useTranslation();
  const { theme, mode } = useZTheme();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { 
    activeStep, 
    setActiveStep, 
    resetAll, 
    companyName, 
    cnpj, 
    phone, 
    sector, 
    contactEmail, 
    locality,
    mspDomain,
    admName,
    admEmail,
    admPhone,
    position,
    admPassword,
    cep,
    countryState,
    city,
    street,
    streetNumber,
    brandObjectName,
    cityCode,
    district,
    isPoc,
    discountRate,
    minConsumption,
    setModalOpen,
    setMspList,
    isEditing,
  } = useZMspRegisterPage();
  const { createAnewBrandMaster, editBrandMaster, listAllBrands } = useBrandMasterResources();

  const isStep1Valid = companyName && cnpj && phone && sector && contactEmail && locality;
  const isStep2Valid = mspDomain && admName && admEmail && admPhone && position && admPassword;

  const handleNext = () => {
    if (activeStep === 0) {
      setActiveStep(1);
    }
  };

  const handleBack = () => {
    if (activeStep === 1) {
      setActiveStep(0);
    }
  };

  const handleCancel = () => {
    resetAll();
    setActiveStep(2);
  };

  const handleConfirm = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      if (isEditing.length > 0) {
        await editBrandMaster(isEditing[0], {
          brandName: companyName,
          cnpj,
          smsContact: phone,
          setorName: sector,
          emailContact: contactEmail,
          location: locality,
          cep,
          state: countryState,
          city,
          street,
          placeNumber: streetNumber,
          brandLogo: brandObjectName,
          cityCode: cityCode ? Number(cityCode) : undefined,
          district,
          isPoc,
          discountRate: discountRate ? 1 - discountRate / 100 : undefined,
          minConsumption,
          domain: mspDomain,
        });
        setModalOpen("editedMsp");
      } else {
        await createAnewBrandMaster({
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
          admPassword,
          brandLogo: brandObjectName,
          position: "admin",
          mspDomain,
          cityCode: cityCode ? Number(cityCode) : undefined,
          district,
          isPoc,
          discountRate: discountRate ? 1 - discountRate / 100 : undefined,
          minConsumption,
        });
        setModalOpen("createdMsp");
      }

      const response = await listAllBrands();
      setMspList(response.result);
      resetAll();
      setActiveStep(2);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Stack
      sx={{
        background: theme[mode].mainBackground,
        borderRadius: "16px",
        width: "100%",
        padding: "24px",
        boxSizing: "border-box",
        gap: "24px",
      }}
    >
      {activeStep === 0 && <StepOne />}
      {activeStep === 1 && <StepTwo />}

      <Stack
        direction="row"
        gap="16px"
        justifyContent="flex-start"
        flexWrap="wrap"
      >
        {activeStep === 0 && (
          <>
            <UnfilledButton 
              onClick={handleCancel}
              label={t("mspRegister.cancel")}
            />
            <FullFilledButton 
              onClick={handleNext}
              label="Continuar"
              sxButton={{ opacity: isStep1Valid ? 1 : 0.5 }}
              disabled={!isStep1Valid}
            />
          </>
        )}
        {activeStep === 1 && (
          <>
            <UnfilledButton 
              onClick={handleBack}
              label={t("mspRegister.back")}
            />
            <FullFilledButton 
              onClick={handleConfirm}
              label={t("mspRegister.confirm")}
              sxButton={{ opacity: isStep2Valid ? 1 : 0.5 }}
              disabled={!isStep2Valid || isSubmitting}
            />
          </>
        )}
      </Stack>
    </Stack>
  );
};
