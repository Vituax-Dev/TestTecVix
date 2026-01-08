import { SVGProps } from "react";
import { ListItem, ListItemButton, ListItemIcon } from "@mui/material";
import { useZTheme } from "../../../stores/useZTheme";
import { TextRob16FontL } from "../../TextL";

export const Item = ({
  icon,
  text,
  handleSelect,
  selected,
  disabled = false,
}: {
  icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  text: string;
  handleSelect: (value: string) => void;
  selected: string | null;
  disabled?: boolean;
}) => {
  const { mode, theme } = useZTheme();
  return (
    <ListItem
      key={text}
      sx={{
        padding: "0px 8px",
      }}
    >
      <ListItemButton
        onClick={() => handleSelect(text)}
        sx={{
          background: selected === text ? theme[mode].blueLight : "none",
          borderRadius: "12px",
          gap: "12px",
          "&:hover": {
            ...(selected === text && { background: theme[mode].blueLight }),
            cursor: disabled ? "not-allowed" : "pointer",
          },
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: "0px",
          }}
        >
          {icon({
            fill: disabled
              ? theme[mode].tertiary
              : selected === text
                ? theme[mode].btnLightText
                : theme[mode].gray,
          })}
        </ListItemIcon>
        <TextRob16FontL
          sx={{
            color: disabled
              ? theme[mode].tertiary
              : selected === text
                ? theme[mode].btnLightText
                : theme[mode].gray,
          }}
        >
          {text}
        </TextRob16FontL>
      </ListItemButton>
    </ListItem>
  );
};
