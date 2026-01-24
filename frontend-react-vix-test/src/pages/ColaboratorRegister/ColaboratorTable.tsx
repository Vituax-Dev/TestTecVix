import { Fragment, useState } from "react";
import { Box, IconButton, Modal, Stack, Tooltip } from "@mui/material";
import { useZTheme } from "../../stores/useZTheme";
import { useTranslation } from "react-i18next";
import {
  Colaborator,
  useZColaboratorRegister,
} from "../../stores/useZColaboratorRegister";
import { TextRob14Font1Xs } from "../../components/Text1Xs";
import { TextRob12Font2Xs } from "../../components/Text2Xs";
import { TextRob16Font1S } from "../../components/Text1S";
import { ImgFromDB } from "../../components/ImgFromDB";
import { PencilCicleIcon } from "../../icons/PencilCicleIcon";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useUserResources } from "../../hooks/useUserResources";
import { useZUserProfile } from "../../stores/useZUserProfile";
import { ColaboratorTableFilters } from "./ColaboratorTableFilters";
import CustomPagination from "../../components/Pagination/CustomPagination";
import { ModalDeleteUser } from "./ModalDeleteUser";
import moment from "moment";

interface IColaboratorTableProps {
  onRefresh: () => void;
  isLoading?: boolean;
}

export const ColaboratorTable = ({ onRefresh, isLoading }: IColaboratorTableProps) => {
  const { theme, mode } = useZTheme();
  const { t } = useTranslation();
  const { deleteUser } = useUserResources();
  const { role } = useZUserProfile();
  const [loadingDelete, setLoadingDelete] = useState<string | null>(null);

  const { 
    users, 
    page, 
    totalCount, 
    setPage, 
    limit, 
    userToDelete, 
    setUserToDelete,
    fillFormForEdit,
    idUser: editingUserId,
    isEditingMode,
  } = useZColaboratorRegister();

  const handleOpenDeleteModal = (user: Colaborator) => {
    if (role !== "admin") return;
    setUserToDelete(user);
  };

  const handleCloseDeleteModal = () => {
    setUserToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (!userToDelete) return;
    setLoadingDelete(userToDelete.idUser);
    const success = await deleteUser(userToDelete.idUser);
    setLoadingDelete(null);
    setUserToDelete(null); // Always close modal after attempt
    
    if (success) {
      onRefresh();
    }
  };

  const handleEdit = (user: Colaborator) => {
    // Fill form with user data for editing
    fillFormForEdit(user);
    // Scroll to form
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getRoleBadgeColor = (permission: string) => {
    switch (permission) {
      case "admin":
        return theme[mode].blueDark;
      case "manager":
        return theme[mode].primary;
      default:
        return theme[mode].gray;
    }
  };

  const getRoleLabel = (permission: string) => {
    switch (permission) {
      case "admin":
        return t("colaboratorRegister.admin");
      case "manager":
        return t("colaboratorRegister.manager");
      default:
        return t("colaboratorRegister.member");
    }
  };

  const formatDate = (date: string | Date | null) => {
    if (!date) return t("colaboratorRegister.noActivity");
    return moment(date).format("DD/MM/YYYY");
  };

  return (
    <Stack
      sx={{
        width: "100%",
        background: theme[mode].mainBackground,
        borderRadius: "16px",
        padding: "24px",
        boxSizing: "border-box",
        gap: "24px",
      }}
    >
      {/* Header with Title and Filters */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        gap="16px"
      >
        <TextRob16Font1S
          sx={{
            color: theme[mode].black,
            fontSize: "16px",
            fontWeight: 500,
            lineHeight: "24px",
          }}
        >
          {t("colaboratorRegister.tableTitle")}
        </TextRob16Font1S>
        <ColaboratorTableFilters />
      </Stack>

      {/* User List */}
      <Stack
        sx={{
          width: "100%",
          gap: "16px",
          opacity: isLoading ? 0.5 : 1,
          transition: "opacity 0.2s ease-in-out",
          pointerEvents: isLoading ? "none" : "auto",
        }}
      >
        {users.length === 0 ? (
          <TextRob14Font1Xs
            sx={{
              color: theme[mode].gray,
              textAlign: "center",
              padding: "24px",
            }}
          >
            {t("myVMs.noOptions")}
          </TextRob14Font1Xs>
        ) : (
          users.map((user) => {
            const isBeingEdited = isEditingMode && editingUserId === user.idUser;
            return (
            <Fragment key={user.idUser}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "12px 8px",
                  gap: "16px",
                  borderRadius: "8px",
                  transition: "all 0.2s ease",
                  border: isBeingEdited ? `2px solid ${theme[mode].warning}` : "2px solid transparent",
                  backgroundColor: isBeingEdited ? `${theme[mode].warning}15` : "transparent",
                  "&:hover": {
                    backgroundColor: isBeingEdited ? `${theme[mode].warning}25` : theme[mode].grayLight,
                  },
                  "@media (max-width: 800px)": {
                    flexDirection: "column",
                    alignItems: "flex-start",
                  },
                }}
              >
                {/* User Info */}
                <Box
                  sx={{
                    flex: "2",
                    display: "flex",
                    flexDirection: "row",
                    gap: "16px",
                    alignItems: "center",
                  }}
                >
                  <ImgFromDB
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "100%",
                    }}
                    alt="user avatar"
                    src={
                      user.profileImgUrl ||
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhGHdcalX0wUWxZQCiSv8WzmSPpFGHr4jlsw&s"
                    }
                  />
                  <Stack>
                    <TextRob14Font1Xs
                      sx={{
                        color: theme[mode].black,
                        fontSize: "14px",
                        fontWeight: 500,
                      }}
                    >
                      {user.name}
                    </TextRob14Font1Xs>
                    <TextRob12Font2Xs
                      sx={{
                        color: theme[mode].gray,
                        fontSize: "12px",
                        fontWeight: 400,
                      }}
                    >
                      {user.email}
                    </TextRob12Font2Xs>
                  </Stack>
                </Box>

                {/* Status & Last Activity */}
                <Box
                  sx={{
                    flex: "1",
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                    "@media (max-width: 900px)": { display: "none" },
                  }}
                >
                  <TextRob14Font1Xs
                    sx={{
                      color: theme[mode].black,
                      fontSize: "14px",
                      fontWeight: 500,
                    }}
                  >
                    {t("colaboratorRegister.status")}
                  </TextRob14Font1Xs>
                  <TextRob12Font2Xs
                    sx={{
                      color: theme[mode].gray,
                      fontSize: "12px",
                      fontWeight: 400,
                    }}
                  >
                    {t("colaboratorRegister.lastActivity")} {formatDate(user.lastActivity)}
                  </TextRob12Font2Xs>
                </Box>

                {/* Badges: Role, Company, Status */}
                <Box
                  sx={{
                    flex: "2",
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    gap: "8px",
                    alignItems: "center",
                    justifyContent: "flex-start",
                  }}
                >
                  {/* Role Badge */}
                  <TextRob14Font1Xs
                    sx={{
                      boxSizing: "content-box",
                      padding: "2px 12px",
                      fontWeight: "400",
                      borderRadius: "12px",
                      border: `1px solid ${getRoleBadgeColor(user.permission)}`,
                      color: getRoleBadgeColor(user.permission),
                      maxWidth: "120px",
                      overflow: "hidden",
                      textWrap: "nowrap",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {getRoleLabel(user.permission)}
                  </TextRob14Font1Xs>

                  {/* Company Badge */}
                  <TextRob14Font1Xs
                    sx={{
                      boxSizing: "content-box",
                      padding: "2px 12px",
                      fontWeight: "400",
                      borderRadius: "12px",
                      border: `1px solid ${theme[mode].primary}`,
                      color: theme[mode].primary,
                      maxWidth: "120px",
                      overflow: "hidden",
                      textWrap: "nowrap",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {user.brandName || "Vituax"}
                  </TextRob14Font1Xs>

                  {/* Status Badge */}
                  <TextRob14Font1Xs
                    sx={{
                      boxSizing: "content-box",
                      padding: "2px 12px",
                      fontWeight: "400",
                      borderRadius: "12px",
                      backgroundColor:
                        user.status === "active"
                          ? theme[mode].ok + "20"
                          : theme[mode].danger + "20",
                      color:
                        user.status === "active"
                          ? theme[mode].ok
                          : theme[mode].danger,
                      maxWidth: "80px",
                      overflow: "hidden",
                      textWrap: "nowrap",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {user.status === "active"
                      ? t("colaboratorRegister.active")
                      : t("colaboratorRegister.inactive")}
                  </TextRob14Font1Xs>
                </Box>

                {/* Actions */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "8px",
                    alignItems: "center",
                  }}
                >
                  <Tooltip title={t("generic.edit")}>
                    <IconButton
                      size="small"
                      onClick={() => handleEdit(user)}
                      sx={{
                        color: theme[mode].primary,
                        "&:hover": {
                          backgroundColor: theme[mode].primary + "20",
                        },
                      }}
                    >
                      <PencilCicleIcon fill={theme[mode].primary} />
                    </IconButton>
                  </Tooltip>

                  {role === "admin" && (
                    <Tooltip title={t("generic.delete")}>
                      <IconButton
                        size="small"
                        onClick={() => handleOpenDeleteModal(user)}
                        disabled={loadingDelete === user.idUser}
                        sx={{
                          color: theme[mode].danger,
                          "&:hover": {
                            backgroundColor: theme[mode].danger + "20",
                          },
                        }}
                      >
                        <DeleteForeverIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                </Box>
              </Box>
            </Fragment>
          );})
        )}
      </Stack>

      {/* Delete Confirmation Modal */}
      <Modal
        open={!!userToDelete}
        onClose={handleCloseDeleteModal}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box>
          {userToDelete && (
            <ModalDeleteUser
              userToDelete={userToDelete}
              onClose={handleCloseDeleteModal}
              onConfirm={handleConfirmDelete}
              isLoading={!!loadingDelete}
            />
          )}
        </Box>
      </Modal>

      {/* Pagination */}
      {totalCount > limit && (
        <CustomPagination
          totalPages={totalCount}
          currentPage={page}
          onPageChange={setPage}
          limit={limit}
        />
      )}
    </Stack>
  );
};
