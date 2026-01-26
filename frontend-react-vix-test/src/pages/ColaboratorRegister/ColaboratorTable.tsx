import { Fragment } from "react";
import { Box, IconButton, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useZTheme } from "../../stores/useZTheme";
import { useZColaboratorRegisterPage } from "../../stores/useZColaboratorRegisterPage";
import { TextRob14Font1Xs } from "../../components/Text1Xs";
import { TextRob12Font2Xs } from "../../components/Text2Xs";
import { ImgFromDB } from "../../components/ImgFromDB";
import { PencilCicleIcon } from "../../icons/PencilCicleIcon";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import moment from "moment";
import { useAuth } from "../../auth/PrivatePage";

export const ColaboratorTable = () => {
  const { theme, mode } = useZTheme();
  const { t } = useTranslation();
  const { isAdmin, isManagerOrAdmin } = useAuth();

  const {
    userList,
    setUserToBeDeleted,
    setModalOpen,
    loadUserForEdit,
  } = useZColaboratorRegisterPage();

  const handleEdit = (index: number) => {
    const user = userList[index];
    if (user) {
      loadUserForEdit(user);
    }
  };

  const handleDelete = (index: number) => {
    const user = userList[index];
    if (user) {
      setUserToBeDeleted(user);
      setModalOpen("deleted");
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case "admin":
        return t("colaboratorRegister.admin");
      case "manager":
        return t("colaboratorRegister.manager");
      case "member":
        return t("colaboratorRegister.member");
      default:
        return role;
    }
  };

  return (
    <Stack sx={{ gap: "8px" }}>
      {userList.map((user, index) => (
        <Fragment key={user.idUser}>
          <Stack
            sx={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "12px 16px",
              borderRadius: "12px",
              background: theme[mode].mainBackground,
              "&:hover": {
                background: theme[mode].grayLight,
              },
            }}
          >
            {/* User Info */}
            <Stack sx={{ flexDirection: "row", alignItems: "center", gap: "12px", flex: 1 }}>
              <Box
                sx={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  background: theme[mode].gray,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {user.profileImgUrl ? (
                  <ImgFromDB
                    src={user.profileImgUrl}
                    alt={user.username}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <TextRob14Font1Xs sx={{ color: theme[mode].primary }}>
                    {(user.fullName || user.username || "U").charAt(0).toUpperCase()}
                  </TextRob14Font1Xs>
                )}
              </Box>
              <Stack>
                <TextRob14Font1Xs sx={{ color: theme[mode].primary, fontWeight: 500 }}>
                  {user.fullName || user.username}
                </TextRob14Font1Xs>
                <TextRob12Font2Xs sx={{ color: theme[mode].tertiary }}>
                  {user.email}
                </TextRob12Font2Xs>
              </Stack>
            </Stack>

            {/* Status & Last Activity */}
            <Stack sx={{ alignItems: "flex-start", minWidth: "180px" }}>
              <TextRob12Font2Xs sx={{ color: theme[mode].tertiary }}>
                {t("colaboratorRegister.status")}
              </TextRob12Font2Xs>
              <TextRob12Font2Xs sx={{ color: theme[mode].tertiary }}>
                {t("colaboratorRegister.lastActivity")}{" "}
                {user.lastLoginDate
                  ? moment(user.lastLoginDate).format("DD/MM/YYYY")
                  : t("colaboratorRegister.noActivity")}
              </TextRob12Font2Xs>
            </Stack>

            {/* Tags */}
            <Stack sx={{ flexDirection: "row", gap: "8px", alignItems: "center", minWidth: "280px" }}>
              <Box
                sx={{
                  padding: "4px 12px",
                  borderRadius: "12px",
                  border: `1px solid ${theme[mode].gray}`,
                }}
              >
                <TextRob12Font2Xs sx={{ color: theme[mode].primary }}>
                  {getRoleLabel(user.role)}
                </TextRob12Font2Xs>
              </Box>
              {user.brandMaster?.brandName && (
                <Box
                  sx={{
                    padding: "4px 12px",
                    borderRadius: "12px",
                    border: `1px solid ${theme[mode].gray}`,
                  }}
                >
                  <TextRob12Font2Xs sx={{ color: theme[mode].primary }}>
                    {user.brandMaster.brandName}
                  </TextRob12Font2Xs>
                </Box>
              )}
              <Box
                sx={{
                  padding: "4px 12px",
                  borderRadius: "12px",
                  background: user.isActive ? theme[mode].green : theme[mode].danger,
                }}
              >
                <TextRob12Font2Xs sx={{ color: "#fff" }}>
                  {user.isActive
                    ? t("colaboratorRegister.active")
                    : t("colaboratorRegister.inactive")}
                </TextRob12Font2Xs>
              </Box>
            </Stack>

            {/* Actions */}
            <Stack sx={{ flexDirection: "row", gap: "4px" }}>
              {isManagerOrAdmin && (
                <IconButton
                  onClick={() => handleEdit(index)}
                  sx={{
                    color: theme[mode].blue,
                    padding: "8px",
                  }}
                >
                  <PencilCicleIcon fill={theme[mode].blue} width="20px" />
                </IconButton>
              )}
              {isAdmin && (
                <IconButton
                  onClick={() => handleDelete(index)}
                  sx={{
                    color: theme[mode].danger,
                    padding: "8px",
                  }}
                >
                  <DeleteForeverIcon sx={{ fontSize: "20px" }} />
                </IconButton>
              )}
            </Stack>
          </Stack>
        </Fragment>
      ))}

      {userList.length === 0 && (
        <Stack
          sx={{
            padding: "24px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TextRob14Font1Xs sx={{ color: theme[mode].tertiary }}>
            {t("colaboratorRegister.noActivity")}
          </TextRob14Font1Xs>
        </Stack>
      )}
    </Stack>
  );
};
