import { Box, Paper, useMediaQuery } from "@mui/material";
import { useZTheme } from "../../../stores/useZTheme";
import { useTranslation } from "react-i18next";
import { useMSPRegisterStore } from "../../../stores/useMSPRegisterStore";
import { StepIndicator } from "./StepIndicator";
import { Step1BasicInfo } from "./Step1BasicInfo";
import { Step2AddressContract } from "./Step2AddressContract";
import { NavigationButtons } from "./NavigationButtons";
import { TextRob20Font1M } from "../../../components/Text1M";
import { createBrandMasterApi } from "../../../services/brandMaster";
import { toast } from "react-toastify";
import { useState } from "react";
import { MspModal } from "../MspModal";

interface MSPRegisterFormProps {
  onSuccess?: () => void;
  onClose?: () => void;
}

export const MSPRegisterForm = ({ onSuccess, onClose }: MSPRegisterFormProps) => {
  const { theme, mode } = useZTheme();
  const { t } = useTranslation();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const {
    currentStep,
    mspData,
    isSubmitting,
    setCurrentStep,
    setIsSubmitting,
    resetForm,
    canProceedToNextStep,
  } = useMSPRegisterStore();

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const totalSteps = 2;

  const handleNext = () => {
    if (canProceedToNextStep() && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (!canProceedToNextStep() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const mspPayload = {
        brandName: mspData.brandName,
        cnpj: mspData.cnpj.replace(/\D/g, ""), // Remove formatting
        corporateName: mspData.corporateName,
        stateRegistration: mspData.stateRegistration || undefined,
        municipalRegistration: mspData.municipalRegistration || undefined,
        phone: mspData.phone.replace(/\D/g, ""), // Remove formatting
        email: mspData.email,
        cep: mspData.cep.replace(/\D/g, ""), // Remove formatting
        street: mspData.street,
        number: mspData.number,
        complement: mspData.complement || undefined,
        neighborhood: mspData.neighborhood,
        city: mspData.city,
        state: mspData.state,
        contractNumber: mspData.contractNumber,
        isPoc: mspData.isPoc,
      };

      await createBrandMasterApi(mspPayload);
      
      setShowSuccessModal(true);
      resetForm();
      onSuccess?.();
    } catch (error: unknown) {
      console.error("Erro ao criar MSP:", error);
      const errorMessage = error instanceof Error && 'response' in error 
        ? ((error as { response?: { data?: { message?: string } } }).response?.data?.message) 
        : t("mspRegister.createError");
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    onClose?.();
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1BasicInfo />;
      case 2:
        return <Step2AddressContract />;
      default:
        return <Step1BasicInfo />;
    }
  };

  if (showSuccessModal) {
    return <MspModal modalType="createdMsp" onClose={handleSuccessModalClose} />;
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        minHeight: "100vh",
        padding: isMobile ? "20px" : "40px",
        backgroundColor: theme[mode].mainBackground,
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: "100%",
          maxWidth: "800px",
          padding: isMobile ? "24px" : "32px",
          borderRadius: "16px",
          backgroundColor: theme[mode].lightV2,
          border: `1px solid ${theme[mode].grayLight}`,
        }}
      >
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <TextRob20Font1M
            sx={{
              color: theme[mode].primary,
              fontWeight: "600",
            }}
          >
            {t("mspRegister.title")}
          </TextRob20Font1M>
        </Box>

        <StepIndicator 
          currentStep={currentStep} 
        />

        <Box sx={{ mt: 4, mb: 4 }}>
          {renderStep()}
        </Box>

        <NavigationButtons
          currentStep={currentStep}
          totalSteps={totalSteps}
          canProceed={canProceedToNextStep()}
          isSubmitting={isSubmitting}
          onBack={handleBack}
          onNext={handleNext}
          onSubmit={handleSubmit}
        />
      </Paper>
    </Box>
  );
};