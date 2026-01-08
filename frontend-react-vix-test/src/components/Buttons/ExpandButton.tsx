import { ExpandIcon } from "../../icons/ZoomIcons";
import { Btn } from "./Btn";
import { useZTheme } from "../../stores/useZTheme";
import { SxProps } from "@mui/material";

interface IProps {
  onClick: () => void;
  sx?: SxProps;
}
export const ExpandButton = ({ onClick, sx }: IProps) => {
  const { theme, mode } = useZTheme();
  return (
    <Btn
      onClick={onClick}
      sx={{
        position: "absolute",
        right: "16px",
        top: "22px",
        backgroundColor: "transparent",
        borderRadius: "50%",
        width: "26px",
        height: "26px",
        ...sx,
      }}
    >
      <ExpandIcon fill={theme[mode].gray} />
    </Btn>
  );
};
