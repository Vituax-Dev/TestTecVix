import { Divider, Menu, MenuItem, Stack } from "@mui/material";
import { shadow } from "../../../../utils/shadow";
import { useZTheme } from "../../../../stores/useZTheme";
import { PictureProfile } from "./PictureProfile";
import { TextRob16FontL } from "../../../../components/TextL";
import { useZUserProfile } from "../../../../stores/useZUserProfile";
import { makeEllipsis } from "../../../../utils/makeEllipsis";
import { SettingsIcon } from "../../../../icons/SettingsIcon";
import { useTranslation } from "react-i18next";
import { useLogin } from "../../../../hooks/useLogin";
import { useNavigate } from "react-router-dom";

interface IProps {
  anchorEl: null | HTMLElement;
  open: boolean;
  handleClose: () => void;
}
export const ModalUserProfile = ({ anchorEl, open, handleClose }: IProps) => {
  const { theme, mode } = useZTheme();
  const { t } = useTranslation();
  const { username, userEmail } = useZUserProfile();
  const { goLogout } = useLogin();
  const navigate = useNavigate();

  const logout = () => {
    goLogout();
    handleClose();
  };

  const goSettings = () => {
    navigate("/settings");
    handleClose();
  };

  return (
    <Menu
      anchorEl={anchorEl}
      id="account-menu"
      open={open}
      onClose={handleClose}
      onClick={handleClose}
      slotProps={{
        paper: {
          elevation: 0,
          sx: {
            borderRadius: "24px",
            backgroundColor: theme[mode].light,
            overflow: "visible",
            filter: `drop-shadow(0px 2px 8px ${shadow(mode)})`,
            mt: 1.5,
            padding: "16px 8px",
            "& .MuiAvatar-root": {
              // width: 32,
              // height: 32,
              // ml: -0.5,
              // mr: 1,
            },
            "& .MuiList-root ": {
              display: "flex",
              flexDirection: "column",
              gap: "4px",
            },
          },
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <MenuItem onClick={handleClose}>
        <Stack
          flexDirection={"row"}
          sx={{
            gap: "12px",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          {/* Picture Profile */}
          <Stack
            sx={{
              width: "56px",
              height: "56px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <PictureProfile
              sx={{
                height: "55px",
                width: "55px",
                overflow: "hidden",
              }}
            />
          </Stack>
          {/* Texts */}
          <Stack
            sx={{
              width: "100%",
              maxWidth: "150px",
              overflow: "hidden",
              gap: "4px",
            }}
          >
            <TextRob16FontL
              sx={{
                fontSize: "14px",
                fontWeight: "500",
                lineHeight: "16px",
                color: theme[mode].primary,
                ...makeEllipsis(),
              }}
            >
              {username || "My name is John Doe Lorem big ipsum"}
            </TextRob16FontL>
            <TextRob16FontL
              sx={{
                lineHeight: "16px",
                fontWeight: "400",
                color: theme[mode].gray,
                fontSize: "12px",
              }}
            >
              {userEmail || "p3gUc@example.com"}
            </TextRob16FontL>
          </Stack>
        </Stack>
      </MenuItem>
      <Stack sx={{ padding: "0px 16px" }}>
        <Divider
          sx={{
            marginTop: "0px !important",
            marginBottom: "0px !important",
            borderColor: theme[mode].grayLight,
          }}
        />
      </Stack>
      <MenuItem
        onClick={goSettings}
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <SettingsIcon fill={theme[mode].tertiary} width={"12px"} />
        <TextRob16FontL
          sx={{
            lineHeight: "16px",
            fontWeight: "400",
            color: theme[mode].primary,
            fontSize: "12px",
          }}
        >
          {t("userProfile.settings")}
        </TextRob16FontL>
      </MenuItem>
      <Stack sx={{ padding: "0px 16px" }}>
        <Divider
          sx={{
            marginTop: "0px !important",
            marginBottom: "0px !important",
            borderColor: theme[mode].grayLight,
          }}
        />
      </Stack>
      <MenuItem onClick={logout}>
        <TextRob16FontL
          sx={{
            lineHeight: "16px",
            fontWeight: "400",
            color: theme[mode].gray,
            fontSize: "12px",
          }}
        >
          {t("userProfile.logout")}
        </TextRob16FontL>
      </MenuItem>
    </Menu>
  );
};
