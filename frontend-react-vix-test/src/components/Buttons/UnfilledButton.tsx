import { SxProps } from "@mui/material";
import { useZTheme } from "../../stores/useZTheme";
import { Btn } from "./Btn";
import { TextRob16FontL } from "../TextL";

interface IProps {
  onClick?: () => void;
  startElement?: React.ReactNode;
  endElement?: React.ReactNode;
  label?: string;
  sxLabel?: SxProps;
  sxButton?: SxProps;
  disabled?: boolean;
}

export const UnfilledButton = ({
  onClick,
  startElement,
  endElement,
  label,
  sxLabel,
  sxButton,
  disabled,
}: IProps) => {
  const { theme, mode } = useZTheme();
  return (
    <Btn
      disabled={disabled}
      sx={{
        border: `1px solid ${theme[mode].black}`,
        borderRadius: "10px",
        maxWidth: "150px",
        maxHeight: "40px",
        height: "40px",
        width: "100%",
        "@media (max-width: 450px)": {
          maxWidth: "100%",
        },
        ":hover": {
          backgroundColor: theme[mode].black + "12",
        },

        ...sxButton,
      }}
      onClick={onClick}
    >
      {startElement}
      {label && (
        <TextRob16FontL
          sx={{
            color: theme[mode].black,
            ...sxLabel,
          }}
        >
          {label}
        </TextRob16FontL>
      )}
      {endElement}
    </Btn>
  );
};
