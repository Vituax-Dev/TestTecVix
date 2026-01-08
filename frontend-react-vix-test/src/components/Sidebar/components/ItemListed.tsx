import { SVGProps, useEffect, useState } from "react";
import {
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  SxProps,
} from "@mui/material";
import { useZTheme } from "../../../stores/useZTheme";
import { TextRob16FontL } from "../../TextL";
import { useZGlobalVar } from "../../../stores/useZGlobalVar";
import { ArrowDropDownIcon } from "../../../icons/ArrowDropDownIcon";
import { CloudIcon } from "../../../icons/CloudIcon";

interface IItem {
  text: string;
  icon?: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  sx?: SxProps;
  path?: string;
  isSelected?: boolean;
  disabled?: boolean | undefined;
}
export const ItemListed = ({
  icon,
  text,
  handleSelect,
  selected,
  listItems = [],
  hadleSelectItem,
}: {
  icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  text: string;
  handleSelect: (value: string) => void;
  hadleSelectItem: (item: IItem) => void;
  selected: string | null;
  listItems: IItem[];
}) => {
  const { mode, theme } = useZTheme();
  const { currentSidebarSelected } = useZGlobalVar();
  const [isOpen, setIsOpen] = useState(currentSidebarSelected.label === text);

  useEffect(() => {
    if (currentSidebarSelected.label !== text && isOpen) {
      setIsOpen(false);
    }
  }, [currentSidebarSelected, text]);

  return (
    <ListItem
      key={text}
      sx={{
        padding: "0px 8px",
      }}
    >
      <List sx={{ width: "100%" }}>
        <ListItemButton
          onClick={() => {
            handleSelect(text);
            setIsOpen((prev) => !prev);
          }}
          sx={{
            background: selected === text ? theme[mode].blueLight : "none",
            borderRadius: "12px",
            gap: "12px",
            "&:hover": {
              ...(selected === text && { background: theme[mode].blueLight }),
            },
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: "0px",
            }}
          >
            {icon({
              fill:
                selected === text ? theme[mode].btnLightText : theme[mode].gray,
            })}
          </ListItemIcon>
          <TextRob16FontL
            sx={{
              color:
                selected === text ? theme[mode].btnLightText : theme[mode].gray,
            }}
          >
            {text}
          </TextRob16FontL>
          <Stack
            sx={{
              flexDirection: "row-reverse",
              paddingRight: "4px",
              marginLeft: "auto",
            }}
          >
            <ArrowDropDownIcon
              style={{
                transform:
                  Boolean(currentSidebarSelected.label === text) && isOpen
                    ? "rotate(180deg)"
                    : "rotate(0deg)",
                transition: "transform 0.2s ease-in-out",
              }}
              fill={
                selected === text ? theme[mode].btnLightText : theme[mode].gray
              }
            />
          </Stack>
        </ListItemButton>
        {/* Sub-itens */}
        <Collapse
          in={Boolean(currentSidebarSelected.label === text) && isOpen}
          timeout="auto"
          unmountOnExit
        >
          <List
            component="div"
            sx={{
              paddingLeft: "34px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            {listItems.map((item) => (
              <ListItemButton
                key={item.text + item.path}
                onClick={() => hadleSelectItem(item)}
                sx={{
                  backgroundColor: item.isSelected
                    ? theme[mode].blueLight
                    : "none",
                  borderRadius: "12px",
                  padding: "4px 12px",
                  gap: "12px",
                  "&:hover": {
                    background: theme[mode].blueLight,
                    opacity: 0.75,
                    cursor: item?.disabled ? "not-allowed" : "pointer",
                  },
                  ...item.sx,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    width: "fit-content",
                  }}
                >
                  {item.icon ? (
                    item.icon({
                      fill: item?.disabled
                        ? theme[mode].tertiary
                        : selected === text
                          ? theme[mode].btnLightText
                          : theme[mode].gray,
                    })
                  ) : (
                    <CloudIcon fill={theme[mode].btnLightText} />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{
                    color: item?.disabled
                      ? theme[mode].tertiary
                      : theme[mode].btnLightText,
                  }}
                />
              </ListItemButton>
            ))}
          </List>
        </Collapse>
      </List>
    </ListItem>
  );
};
