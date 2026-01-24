import { Stack } from "@mui/material";
import { ScreenFullPage } from "../../components/ScreenFullPage";
import { TextRob20Font1MB } from "../../components/Text1MB";
import { TextRob16Font1S } from "../../components/Text1S";
import { useZTheme } from "../../stores/useZTheme";
import { useTranslation } from "react-i18next";
import { ColaboratorForm } from "./ColaboratorForm";
import { ColaboratorTable } from "./ColaboratorTable";
import { useZColaboratorRegister } from "../../stores/useZColaboratorRegister";
import { useUserResources } from "../../hooks/useUserResources";
import { useEffect, useCallback } from "react";
import { AbsoluteBackDrop } from "../../components/AbsoluteBackDrop";

export const ColaboratorRegisterPage = () => {
  const { theme, mode } = useZTheme();
  const { t } = useTranslation();
  const { isLoading, listUsers } = useUserResources();
  const {
    setUsers,
    setTotalPage,
    page,
    limit,
    search,
    filterCompanyId,
  } = useZColaboratorRegister();

  const fetchUsers = useCallback(async () => {
    const result = await listUsers({
      page,
      limit,
      search: search || undefined,
      idBrandMaster: filterCompanyId !== null ? filterCompanyId : undefined,
    });
    if (result) {
      setUsers(result.users);
      setTotalPage(result.totalPages);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit, search, filterCompanyId]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <ScreenFullPage
      isLoading={isLoading}
      title={
        <Stack
          direction="row"
          alignItems="baseline"
          gap="8px"
          sx={{ paddingLeft: "24px" }}
        >
          <TextRob20Font1MB sx={{ color: theme[mode].primary }}>
            {t("colaboratorRegister.title")}
          </TextRob20Font1MB>
          <TextRob20Font1MB sx={{ color: theme[mode].primary }}>
            |
          </TextRob20Font1MB>
          <TextRob20Font1MB sx={{ color: theme[mode].primary }}>
            {t("colaboratorRegister.sideTitle")}
          </TextRob20Font1MB>
        </Stack>
      }
      subtitle={
        <TextRob16Font1S
          sx={{ color: theme[mode].gray, paddingLeft: "24px" }}
        >
          {t("colaboratorRegister.subtitle")}
        </TextRob16Font1S>
      }
    >
      <AbsoluteBackDrop open={isLoading} />
      <Stack
        sx={{
          width: "100%",
          maxWidth: "1200px",
          padding: "0 24px",
          gap: "32px",
          paddingBottom: "40px",
        }}
      >
        {/* Form Section */}
        <ColaboratorForm onSuccess={fetchUsers} />

        {/* Table Section */}
        <ColaboratorTable onRefresh={fetchUsers} />
      </Stack>
    </ScreenFullPage>
  );
};
