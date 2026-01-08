import { Button, List, ListItem, Popover, Stack } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useZTheme } from "../stores/useZTheme";
import { ArrowDown } from "../icons/ArrowDown";

export const ImgFlagOfBrazil = (
  props: React.ImgHTMLAttributes<HTMLImageElement>,
) => (
  <img
    src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Flag_of_Brazil.svg/2560px-Flag_of_Brazil.svg.png"
    alt="Brazil flag"
    width="25px"
    height="25px"
    style={{ objectFit: "contain" }}
    {...props}
  />
);

export const ImgFlagOfEUA = (
  props: React.ImgHTMLAttributes<HTMLImageElement>,
) => (
  <img
    src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1200px-Flag_of_the_United_States.svg.png"
    alt="USA flag"
    width="25px"
    height="25px"
    style={{ objectFit: "contain" }}
    {...props}
  />
);

export const ImgFlagOfSpain = (
  props: React.ImgHTMLAttributes<HTMLImageElement>,
) => (
  <img
    src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Flag_of_Spain.svg/2560px-Flag_of_Spain.svg.png"
    alt="SPANISH flag"
    width="25px"
    height="25px"
    style={{ objectFit: "contain" }}
    {...props}
  />
);
interface IProps {
  keepShow?: boolean;
}

export const SwithLanguages = ({ keepShow = false }: IProps) => {
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const { theme, mode } = useZTheme();
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelectLanguage = (leng: string) => {
    i18n.changeLanguage(leng);
    handleClose();
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const getFlag = (leng: string) => {
    switch (leng) {
      case "ptBr":
        return <ImgFlagOfBrazil />;
      case "en":
        return <ImgFlagOfEUA />;
      case "es":
        return <ImgFlagOfSpain />;
      default:
        return <ImgFlagOfEUA />;
    }
  };

  return (
    <Stack
      width={"60px"}
      height={"30px"}
      sx={{
        "@media (max-width: 744px)": {
          display: keepShow ? "block" : "none",
        },
      }}
    >
      <Button
        aria-describedby={id}
        onClick={handleClick}
        sx={{
          minHeight: "0px",
          width: "100%",
          height: "30px",
          background: theme[mode].blueMedium,
          display: "flex",
          justifyContent: "space-between",
          padding: "0px 8px",
          borderRadius: "20px",
          overflow: "hidden",
        }}
      >
        <Stack
          sx={{
            borderRadius: "50%",
            overflow: "hidden",
          }}
        >
          {getFlag(i18n.language)}
        </Stack>
        <ArrowDown fill={theme[mode].mainBackground} />
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        sx={{
          mt: 0.2,
        }}
      >
        <List
          sx={{
            background: theme[mode].blue,
          }}
        >
          <ListItem
            onClick={() => handleSelectLanguage("en")}
            sx={{
              cursor: "pointer",
              ...(i18n.language === "en" && {
                background: theme[mode].primary,
              }),
            }}
          >
            <ImgFlagOfEUA />
          </ListItem>
          <ListItem
            sx={{
              cursor: "pointer",
              ...(i18n.language === "ptBr" && {
                background: theme[mode].primary,
              }),
            }}
            onClick={() => handleSelectLanguage("ptBr")}
          >
            <ImgFlagOfBrazil />
          </ListItem>
          <ListItem
            onClick={() => handleSelectLanguage("es")}
            sx={{
              cursor: "pointer",
              ...(i18n.language === "es" && {
                background: theme[mode].primary,
              }),
            }}
          >
            <ImgFlagOfSpain />
          </ListItem>
        </List>
      </Popover>
    </Stack>
  );
};
