import { Step, StepLabel, Stepper, SxProps } from "@mui/material";
import { TextRob16Font1S } from "./Text1S";
import { useZTheme } from "../stores/useZTheme";

export interface ISampleStepperProps {
  stepsNames: string[]; // array with all steps names
  activeStep: number; // current active step (index of stepsNames array)
  stepperSx?: SxProps; // styles for stepper (father component)
  stepSx?: SxProps; // styles for step (child component)
  stepTextSx?: SxProps; // styles for step text
}

export const SampleStepper = ({
  stepsNames,
  activeStep,
  stepperSx = {},
  stepSx = {},
  stepTextSx = {},
}: ISampleStepperProps) => {
  const { theme, mode } = useZTheme();
  return (
    <Stepper
      activeStep={activeStep}
      sx={{
        "& > .MuiStepConnector-root.Mui-active > span": {
          border: "1px solid",
          borderColor: theme[mode].blueDark,
          borderRadius: "4px",
        },
        "& > .MuiStepConnector-root.Mui-disabled > span": {
          border: "1px solid",
          borderColor: theme[mode].gray,
          borderRadius: "4px",
        },
        ...stepperSx,
      }}
    >
      {stepsNames.map((label, index) => (
        <Step
          sx={{
            "& > span > .Mui-active > svg": {
              fill: theme[mode].blueDark,
            },
            "& > span > .Mui-completed > svg": {
              fill: theme[mode].blueDark,
            },
            "& > span > .Mui-disabled > svg": {
              fill: theme[mode].gray,
            },
            "& > span > span > svg > text": {
              fill: theme[mode].mainBackground,
              fontWeight: "600",
            },
            ...stepSx,
          }}
          key={`${label}-${index}`}
        >
          <StepLabel
            sx={{
              "@media (max-width: 660px)": {
                "& > span": {
                  paddingRight: 0,
                },
              },
            }}
          >
            <TextRob16Font1S
              sx={{
                color: theme[mode].primary,
                fontSize: "16px",
                fontWeight: "400",
                lineHeight: "24px",
                ...stepTextSx,
                "@media (max-width: 660px)": {
                  display: "none",
                },
              }}
            >
              {label}
            </TextRob16Font1S>
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};
