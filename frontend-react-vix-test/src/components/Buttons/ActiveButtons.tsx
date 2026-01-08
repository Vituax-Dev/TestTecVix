import { Stack, SxProps } from "@mui/material";
import { useZTheme } from "../../stores/useZTheme";
import { Btn } from "./Btn";
import { TextRob16FontL } from "../TextL";

interface IProps {
  rightTitle: string;
  leftTitle: string;
  isDisabledLeft: boolean;
  isDisabledRight: boolean;
  onClickLeft: () => void;
  onClickRight: () => void;
  sx?: SxProps;
}

export const ActiveButtons = ({
  isDisabledLeft,
  isDisabledRight,
  onClickLeft,
  onClickRight,
  sx,
  leftTitle,
  rightTitle,
}: IProps) => {
  const { theme, mode } = useZTheme();
  return (
    <Stack
      sx={{
        width: "100%",
        gap: "12px",
        ...sx,
      }}
    >
      <Stack
        sx={{
          flexDirection: "row",
          width: "100%",
          justifyContent: "center",
        }}
      >
        {/* Left */}
        <Btn
          disabled={isDisabledLeft}
          onClick={onClickLeft}
          className="w-full"
          sx={{
            borderRadius: "8px 0px 0px 8px",
            padding: "0px 4px",
            backgroundColor: isDisabledLeft ? theme[mode].blue : "transparent",
            border: "1px solid",
            borderColor: isDisabledLeft ? theme[mode].blue : theme[mode].gray,
            "&:disabled": {
              opacity: 1,
            },
          }}
        >
          <TextRob16FontL
            sx={{
              color: isDisabledLeft
                ? theme[mode].mainBackground
                : theme[mode].gray,
              fontWeight: "500",
              letterSpacing: "0.5px",
              lineHeight: "22px",
            }}
          >
            {leftTitle}
          </TextRob16FontL>
        </Btn>
        {/* Right */}
        <Btn
          disabled={isDisabledRight}
          onClick={onClickRight}
          className="w-full"
          sx={{
            borderRadius: "0px 8px 8px 0px",
            padding: "0px 4px",
            backgroundColor: isDisabledRight ? theme[mode].blue : "transparent",
            border: isDisabledRight ? "1px solid" : "1px solid",
            borderColor: isDisabledRight ? theme[mode].blue : theme[mode].gray,
            "&:disabled": {
              opacity: 1,
            },
          }}
        >
          <TextRob16FontL
            sx={{
              color: isDisabledRight
                ? theme[mode].mainBackground
                : theme[mode].gray,
              letterSpacing: "0.5px",
              fontWeight: "500",
              lineHeight: "22px",
            }}
          >
            {rightTitle}
          </TextRob16FontL>
        </Btn>
      </Stack>
    </Stack>
  );
};
