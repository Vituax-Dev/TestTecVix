import { Box, Modal, Stack } from "@mui/material";
import { ScreenFullPage } from "../../components/ScreenFullPage";
import { TextRob20Font1MB } from "../../components/Text1MB";
import { useZTheme } from "../../stores/useZTheme";
import { useTranslation } from "react-i18next";
import { TextRob16Font1S } from "../../components/Text1S";
import { useEffect, useCallback } from "react";
import { useBrandMasterResources } from "../../hooks/useBrandMasterResources";
import { useUserResources } from "../../hooks/useUserResources";
import { AbsoluteBackDrop } from "../../components/AbsoluteBackDrop";
import { useZColaboratorRegisterPage } from "../../stores/useZColaboratorRegisterPage";
import { ColaboratorForm } from "./ColaboratorForm";
import { ColaboratorTable } from "./ColaboratorTable";
import { ColaboratorTableFilters } from "./ColaboratorTableFilters";
import { useZUserProfile } from "../../stores/useZUserProfile";
import { ModalDeleteUser } from "./ModalDeleteUser";
import { ModalUserSuccess } from "./ModalUserSuccess";

export const ColaboratorRegisterPage = () => {
  const { theme, mode } = useZTheme();
  const { t } = useTranslation();
  const { isLoading: isLoadingBrands } = useBrandMasterResources();
  const { isLoading: isLoadingUsers, listAllUsers } = useUserResources();
  const { idBrand } = useZUserProfile();
  const {
    setUserList,
    companyFilter,
    userFilter,
    modalOpen,
    setModalOpen,
    userToBeDeleted,
    setUserToBeDeleted,
    resetAll,
    isEditing,
  } = useZColaboratorRegisterPage();

  const fetchUsers = useCallback(async () => {
    const response = await listAllUsers({
      search: userFilter || undefined,
      idBrandMaster: companyFilter ?? idBrand ?? undefined,
    });
    if (response?.result) {
      setUserList(response.result);
    }
  }, [companyFilter, userFilter, idBrand, listAllUsers, setUserList]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    return () => {
      resetAll();
    };
  }, [resetAll]);

  const handleCloseModal = () => {
    setModalOpen(null);
    setUserToBeDeleted(null);
  };

  const handleAfterSuccess = () => {
    fetchUsers();
    handleCloseModal();
  };

  return (
    <ScreenFullPage>
      <AbsoluteBackDrop open={isLoadingBrands || isLoadingUsers} />
      <Stack
        sx={{
          width: "100%",
          padding: "24px",
          gap: "24px",
        }}
      >
        {/* Header */}
        <Stack sx={{ gap: "8px" }}>
          <Stack sx={{ flexDirection: "row", alignItems: "baseline", gap: "8px" }}>
            <TextRob20Font1MB sx={{ color: theme[mode].primary }}>
              {isEditing
                ? t("colaboratorRegister.editTitle")
                : t("colaboratorRegister.title")}
            </TextRob20Font1MB>
            <TextRob16Font1S sx={{ color: theme[mode].tertiary }}>
              | {t("colaboratorRegister.sideTitle")}
            </TextRob16Font1S>
          </Stack>
          <TextRob16Font1S sx={{ color: theme[mode].tertiary }}>
            {isEditing
              ? t("colaboratorRegister.editSubtitle")
              : t("colaboratorRegister.subtitle")}
          </TextRob16Font1S>
        </Stack>

        {/* Form Section */}
        <Box
          sx={{
            background: theme[mode].lightV2,
            borderRadius: "16px",
            padding: "24px",
          }}
        >
          <ColaboratorForm onSuccess={handleAfterSuccess} />
        </Box>

        {/* Table Section */}
        <Box
          sx={{
            background: theme[mode].lightV2,
            borderRadius: "16px",
            padding: "24px",
          }}
        >
          <Stack sx={{ gap: "16px" }}>
            <Stack
              sx={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "16px",
              }}
            >
              <TextRob20Font1MB sx={{ color: theme[mode].primary }}>
                {t("colaboratorRegister.tableTitle")}
              </TextRob20Font1MB>
              <ColaboratorTableFilters />
            </Stack>
            <ColaboratorTable />
          </Stack>
        </Box>
      </Stack>

      {/* Modals */}
      <Modal
        open={modalOpen === "deleted" && !!userToBeDeleted}
        onClose={handleCloseModal}
      >
        <Box>
          <ModalDeleteUser
            onCancel={handleCloseModal}
            onConfirm={handleAfterSuccess}
          />
        </Box>
      </Modal>

      <Modal
        open={modalOpen === "created" || modalOpen === "edited"}
        onClose={handleCloseModal}
      >
        <Box>
          <ModalUserSuccess
            type={modalOpen as "created" | "edited"}
            onClose={handleCloseModal}
          />
        </Box>
      </Modal>
    </ScreenFullPage>
  );
};
