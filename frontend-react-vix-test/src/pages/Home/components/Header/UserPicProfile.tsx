import { Button, IconButton, Stack } from "@mui/material";
import { useZUserProfile } from "../../../../stores/useZUserProfile";
import { useZTheme } from "../../../../stores/useZTheme";
// import { useNavigate } from "react-router-dom";
import { TextRob12Font2Xs } from "../../../../components/Text2Xs";
import { useTranslation } from "react-i18next";
import { ArrowDown } from "../../../../icons/ArrowDown";
import { useRef, useState } from "react";
import { ModalUserProfile } from "./ModalUserProfile";
import { PictureProfile } from "./PictureProfile";

export const UserPicProfile = () => {
  const { fullName, username } = useZUserProfile();
  const { theme, mode } = useZTheme();
  // const navigate = useNavigate();
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const ref = useRef(null);

  const open = Boolean(anchorEl);
  const handleClick = () => {
    setAnchorEl(ref.current);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Stack
        sx={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          backgroundColor: theme[mode].light,
          gap: "4px",
          padding: "0px 8px",
          borderRadius: "24px",
          height: "48px",
          maxWidth: "200px",
          "@media (max-width: 955px)": {
            backgroundColor: "transparent",
            padding: "0px",
            paddingRight: "22px",
          },
        }}
        ref={ref}
      >
        <Button
          sx={{
            minWidth: "45px",
            borderRadius: "100%",
            padding: 0,
            height: "45px",
            width: "45px",
            overflow: "hidden",
          }}
          onClick={handleClick}
        >
          <PictureProfile />
        </Button>
        <Stack
          sx={{
            flexDirection: "row",
            alignItems: "center",
            maxWidth: "calc(100% - 45px)",
            "@media (max-width: 955px)": {
              display: "none",
            },
          }}
        >
          <TextRob12Font2Xs
            sx={{
              fontSize: "16px",
              color: theme[mode].primary,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: "100%",
            }}
          >
            {t("home.hi")}, {fullName?.trim() !== "" ? fullName : username}
          </TextRob12Font2Xs>
          <IconButton onClick={handleClick}>
            <ArrowDown fill={theme[mode].blueMedium} />
          </IconButton>
        </Stack>
      </Stack>
      <ModalUserProfile
        anchorEl={anchorEl}
        open={open}
        handleClose={handleClose}
      />
    </>
  );
};
