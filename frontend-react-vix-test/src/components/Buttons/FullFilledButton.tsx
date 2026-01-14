import { Button, SxProps } from "@mui/material";
import { useZTheme } from "../../stores/useZTheme";
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

export const FullFilledButton = ({
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
    <Button
      disabled={disabled}
      sx={{
        background: theme[mode].blue,
        border: `1px solid ${theme[mode].blue}`,
        textTransform: "none",
        borderRadius: "12px",
        height: "40px",
        fontWeight: "500",
        fontSize: "16px",
        width: "100%",
        maxWidth: "330px",
        gap: "8px",
        "@media (max-width: 745px)": {
          maxWidth: "100%",
        },
        ...sxButton,
      }}
      onClick={onClick}
    >
      {startElement}
      {label && (
        <TextRob16FontL
          sx={{
            color: theme[mode].btnText,
            fontWeight: "500",
            fontFamily: "Roboto",
            lineHeight: "16px",
            ...sxLabel,
          }}
        >
          {label}
        </TextRob16FontL>
      )}
      {endElement}
    </Button>
  );
};
