import { IconButton, Stack } from "@mui/material";
import { TextRob32Font1L } from "../../../../components/Text1L";
import { useTranslation } from "react-i18next";
import { useZTheme } from "../../../../stores/useZTheme";
import { PlusIcon } from "../../../../icons/PlusIcon";
import { TextRob20Font1MC } from "../../../../components/Text1MC";
import { shadow } from "../../../../utils/shadow";
import { useNavigate } from "react-router-dom";
import { useZGlobalVar } from "../../../../stores/useZGlobalVar";
import { useZUserProfile } from "../../../../stores/useZUserProfile";

export const HeaderVMList = () => {
  const { t } = useTranslation();
  const { theme, mode } = useZTheme();
  const { setCurrentSidebarSelected } = useZGlobalVar();
  const { role } = useZUserProfile();
  const navigate = useNavigate();

  return (
    <Stack
      flexDirection={"row"}
      width={"100%"}
      justifyContent={"space-between"}
      px={"24px"}
      py={"8px"}
      sx={{}}
    >
      <TextRob32Font1L
        sx={{
          color: theme[mode].primary,
          "@media (max-width: 744px)": {
            color: theme[mode].btnDarkBlue,
            fontSize: "28px",
          },
        }}
      >
        {t("home.vmRecents")}
      </TextRob32Font1L>
      {Boolean(role === "admin" || role === "manager") && (
        <IconButton
          onClick={() => {
            setCurrentSidebarSelected({
              label: t("sidebar.newVM"),
              path: "/virtual-machine",
            });
            navigate("/virtual-machine");
          }}
          sx={{
            gap: "8px",
            borderRadius: "12px",
            backgroundColor: theme[mode].blue,
            padding: "8px 16px",
            boxShadow: `0px 4px 4px ${shadow(mode)}`,
            "&:hover": {
              backgroundColor: theme[mode].blue,
              opacity: 0.8,
            },
            "@media (max-width: 744px)": {
              borderRadius: "100%",
              width: "40px",
              padding: "0px",
            },
          }}
        >
          <PlusIcon fill={theme[mode].btnText} />
          <TextRob20Font1MC
            sx={{
              color: theme[mode].btnText,
              "@media (max-width: 744px)": {
                display: "none",
              },
            }}
          >
            {t("home.newVM")}
          </TextRob20Font1MC>
        </IconButton>
      )}
    </Stack>
  );
};
