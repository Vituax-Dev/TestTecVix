import { Box, Step, StepLabel, Stepper, useMediaQuery } from "@mui/material";
import { useZTheme } from "../../../stores/useZTheme";
import { useTranslation } from "react-i18next";

interface StepIndicatorProps {
  currentStep: number;
}

export const StepIndicator = ({ currentStep }: StepIndicatorProps) => {
  const { theme, mode } = useZTheme();
  const { t } = useTranslation();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const steps = [
    t("mspRegister.step1Title"),
    t("mspRegister.step2Title"),
  ];

  return (
    <Box sx={{ width: "100%", mb: 3 }}>
      <Stepper 
        activeStep={currentStep - 1} 
        orientation={isMobile ? "vertical" : "horizontal"}
        sx={{
          "& .MuiStepLabel-root .Mui-completed": {
            color: theme[mode].ok,
          },
          "& .MuiStepLabel-root .Mui-active": {
            color: theme[mode].blue,
          },
          "& .MuiStepLabel-root .Mui-active .MuiStepIcon-text": {
            fill: theme[mode].btnText,
          },
          "& .MuiStepConnector-line": {
            borderColor: theme[mode].grayLight,
          },
        }}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel
              sx={{
                "& .MuiStepLabel-label": {
                  color: theme[mode].primary,
                  fontSize: isMobile ? "14px" : "16px",
                },
              }}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};