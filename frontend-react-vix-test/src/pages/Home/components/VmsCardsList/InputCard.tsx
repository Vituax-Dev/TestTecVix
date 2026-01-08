import { InputBase, SxProps } from "@mui/material";
import { useZTheme } from "../../../../stores/useZTheme";
import { useRefFocusEffect } from "../../../../hooks/useRefFocusEffect";

interface IInputCardProps {
  value: string | number;
  setValue: (value: string | number) => void;
  hashFocus?: boolean;
  sx?: SxProps;
  className?: string;
  type?: string;
}

export const InputCard = ({
  value,
  setValue,
  hashFocus = true,
  sx = {},
  className,
  type = "text",
}: IInputCardProps) => {
  const { mode, theme } = useZTheme();
  const { inputRef } = useRefFocusEffect();
  return (
    <InputBase
      type={type}
      className={className}
      {...(hashFocus && { inputRef })}
      sx={{
        color: theme[mode].mainBackground,
        ...sx,
      }}
      onChange={(e) => setValue(e.target.value)}
      value={value}
    />
  );
};
