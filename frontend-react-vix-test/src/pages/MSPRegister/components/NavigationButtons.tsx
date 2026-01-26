import { Button, Stack } from "@mui/material";
import { useZTheme } from "../../../stores/useZTheme";
import { useTranslation } from "react-i18next";
import { TextRob16Font1S } from "../../../components/Text1S";

interface NavigationButtonsProps {
  currentStep: number;
  totalSteps: number;
  canProceed: boolean;
  isSubmitting: boolean;
  onBack: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

export const NavigationButtons = ({
  currentStep,
  totalSteps,
  canProceed,
  isSubmitting,
  onBack,
  onNext,
  onSubmit,
}: NavigationButtonsProps) => {
  const { theme, mode } = useZTheme();
  const { t } = useTranslation();

  const isLastStep = currentStep === totalSteps;
  const isFirstStep = currentStep === 1;

  return (
    <Stack 
      direction="row" 
      spacing={2} 
      justifyContent="space-between"
      sx={{ width: "100%", mt: 3 }}
    >
      <Button
        variant="outlined"
        disabled={isFirstStep || isSubmitting}
        onClick={onBack}
        sx={{
          width: "120px",
          height: "40px",
          borderRadius: "12px",
          textTransform: "none",
          borderColor: theme[mode].grayLight,
          "&:hover": {
            borderColor: theme[mode].blue,
          },
          "&:disabled": {
            borderColor: theme[mode].grayLight,
            opacity: 0.5,
          },
        }}
      >
        <TextRob16Font1S
          sx={{
            color: isFirstStep ? theme[mode].gray : theme[mode].primary,
          }}
        >
          {t("general.back")}
        </TextRob16Font1S>
      </Button>

      <Button
        variant="contained"
        disabled={!canProceed || isSubmitting}
        onClick={isLastStep ? onSubmit : onNext}
        sx={{
          width: "120px",
          height: "40px",
          borderRadius: "12px",
          textTransform: "none",
          backgroundColor: theme[mode].blue,
          "&:hover": {
            backgroundColor: theme[mode].blue,
          },
          "&:disabled": {
            backgroundColor: theme[mode].grayLight,
          },
        }}
      >
        <TextRob16Font1S
          sx={{
            color: theme[mode].btnText,
          }}
        >
          {isLastStep 
            ? (isSubmitting ? t("general.creating") : t("general.create"))
            : t("general.next")
          }
        </TextRob16Font1S>
      </Button>
    </Stack>
  );
};