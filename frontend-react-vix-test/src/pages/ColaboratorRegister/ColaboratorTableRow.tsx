import { Box, Stack } from "@mui/material";
import { useZTheme } from "../../stores/useZTheme";
import { useTranslation } from "react-i18next";
import { TextRob14Font1Xs } from "../../components/Text1Xs";
import { Colaborator } from "../../stores/useZColaboratorRegister";
import { ImgFromDB } from "../../components/ImgFromDB";
import { EditCirclePencilIcon } from "../../icons/EditCirclePencilIcon";
import { TrashIcon } from "../../icons/TrashIcon";
import { useState } from "react";
import { Modal } from "@mui/material";
import { ConfirmModal } from "./ConfirmModal";
import { api } from "../../services/api";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";
import { useZUserProfile } from "../../stores/useZUserProfile";

interface Props {
  user: Colaborator;
  onRefresh: () => void;
}

export const ColaboratorTableRow = ({ user, onRefresh }: Props) => {
  const { theme, mode } = useZTheme();
  const { t } = useTranslation();
  const { getAuth } = useAuth();
  const { role } = useZUserProfile();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const canEdit = role === "admin" || role === "manager";
  const canDelete = role === "admin";

  const formatDate = (date: string | Date | null) => {
    if (!date) return t("colaboratorRegister.noActivity");
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString();
  };

  const handleDelete = async () => {
    const auth = await getAuth();
    const response = await api.delete({
      url: `/user/${user.idUser}`,
      auth,
    });

    if (!response.error) {
      toast.success(t("colaboratorRegister.userEdited"));
      setOpenDeleteModal(false);
      onRefresh();
    } else {
      toast.error(response.message);
    }
  };

  return (
    <>
      <Box
        component="table"
        sx={{
          width: "100%",
          background: theme[mode].grayLight,
          borderRadius: "12px",
          borderCollapse: "separate",
          borderSpacing: 0,
        }}
      >
        <Box component="tbody">
          <Box component="tr">
            <Box
              component="td"
              sx={{
                padding: "16px",
                width: "30%",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <ImgFromDB
                  src={user.profileImgUrl || ""}
                  alt={user.name}
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
                <Stack>
                  <TextRob14Font1Xs
                    sx={{
                      color: theme[mode].black,
                      fontWeight: 500,
                    }}
                  >
                    {user.name}
                  </TextRob14Font1Xs>
                  <TextRob14Font1Xs
                    sx={{
                      color: theme[mode].gray,
                      fontSize: "12px",
                    }}
                  >
                    {user.email}
                  </TextRob14Font1Xs>
                </Stack>
              </Box>
            </Box>

            <Box
              component="td"
              sx={{
                padding: "16px",
                width: "25%",
                textAlign: "left",
              }}
            >
              <TextRob14Font1Xs
                sx={{
                  color: theme[mode].gray,
                  fontSize: "12px",
                }}
              >
                Status
              </TextRob14Font1Xs>
              <TextRob14Font1Xs
                sx={{
                  color: theme[mode].gray,
                  fontSize: "12px",
                }}
              >
                {t("colaboratorRegister.lastActivity")} {formatDate(user.lastActivity)}
              </TextRob14Font1Xs>
            </Box>

            <Box
              component="td"
              sx={{
                padding: "16px",
                textAlign: "left",
              }}
            >
              <Box sx={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                <Box
                  sx={{
                    padding: "4px 12px",
                    borderRadius: "16px",
                    border: `1px solid ${theme[mode].blue}`,
                    background: "transparent",
                  }}
                >
                  <TextRob14Font1Xs
                    sx={{
                      color: theme[mode].blue,
                      fontSize: "12px",
                    }}
                  >
                    {t(`colaboratorRegister.${user.permission}`)}
                  </TextRob14Font1Xs>
                </Box>

                <Box
                  sx={{
                    padding: "4px 12px",
                    borderRadius: "16px",
                    border: `1px solid ${theme[mode].gray}`,
                    background: "transparent",
                  }}
                >
                  <TextRob14Font1Xs
                    sx={{
                      color: theme[mode].gray,
                      fontSize: "12px",
                    }}
                  >
                    {user.companyName || "N/A"}
                  </TextRob14Font1Xs>
                </Box>

                <Box
                  sx={{
                    padding: "4px 12px",
                    borderRadius: "16px",
                    border: `1px solid ${
                      user.status === "active" ? theme[mode].green : theme[mode].red
                    }`,
                    background: "transparent",
                  }}
                >
                  <TextRob14Font1Xs
                    sx={{
                      color:
                        user.status === "active"
                          ? theme[mode].green
                          : theme[mode].red,
                      fontSize: "12px",
                    }}
                  >
                    {t(`colaboratorRegister.${user.status}`)}
                  </TextRob14Font1Xs>
                </Box>
              </Box>
            </Box>

            <Box
              component="td"
              sx={{
                padding: "16px",
                textAlign: "right",
                width: "100px",
              }}
            >
              <Box sx={{ display: "flex", gap: "8px", justifyContent: "flex-end" }}>
                <Box
                  sx={{
                    cursor: canEdit ? "pointer" : "not-allowed",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    border: `1px solid ${theme[mode].gray}`,
                    opacity: canEdit ? 1 : 0.4,
                    "&:hover": canEdit ? {
                      background: theme[mode].gray + "20",
                    } : {},
                  }}
                >
                  <EditCirclePencilIcon fill={theme[mode].gray} />
                </Box>
                <Box
                  onClick={canDelete ? () => setOpenDeleteModal(true) : undefined}
                  sx={{
                    cursor: canDelete ? "pointer" : "not-allowed",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    border: `1px solid ${theme[mode].red}`,
                    opacity: canDelete ? 1 : 0.4,
                    "&:hover": canDelete ? {
                      background: theme[mode].red + "20",
                    } : {},
                  }}
                >
                  <TrashIcon fill={theme[mode].red} />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <Modal
        open={openDeleteModal}
        onClose={() => setOpenDeleteModal(false)}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div>
          <ConfirmModal
            title={t("colaboratorRegister.areYouSure", { username: user.name })}
            onClose={() => setOpenDeleteModal(false)}
            onConfirm={handleDelete}
            confirmText={t("colaboratorRegister.ok")}
            cancelText={t("colaboratorRegister.back")}
          />
        </div>
      </Modal>
    </>
  );
};
