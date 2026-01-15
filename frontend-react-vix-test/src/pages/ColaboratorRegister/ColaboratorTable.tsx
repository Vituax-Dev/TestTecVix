import { Box, Stack } from "@mui/material";
import { useZTheme } from "../../stores/useZTheme";
import { useTranslation } from "react-i18next";
import { TextRob16Font1S } from "../../components/Text1S";
import { useEffect, forwardRef, useImperativeHandle, useMemo } from "react";
import { formatUsersColaboratorData } from "../../utils/formatUsersColaboratorData";
import { useZColaboratorRegister } from "../../stores/useZColaboratorRegister";
import { ColaboratorTableRow } from "./ColaboratorTableRow";
import { DropDown } from "../../components/Inputs/DropDown";
import { Pagination } from "@mui/material";
import { useListUsersWithPagination } from "../../hooks/useListUsersWithPagination";

interface ColaboratorTableRef {
  refresh: () => void;
}

export const ColaboratorTable = forwardRef<ColaboratorTableRef>((_, ref) => {
  const { theme, mode } = useZTheme();
  const { t } = useTranslation();
  const {
    users,
    setUsers,
    page,
    setPage,
    limit,
    totalPage,
    setTotalPage,
    companyNameFilter,
    setCompanyNameFilter,
    colaboratorNameFilter,
    setColaboratorNameFilter,
    statusFilter,
    setStatusFilter,
  } = useZColaboratorRegister();

  const { userList, totalCount, isLoading, fetchUsers } =
    useListUsersWithPagination({ page, limit });

  const filteredUsers = useMemo(() => {
    let filtered = formatUsersColaboratorData(userList);

    if (colaboratorNameFilter && colaboratorNameFilter !== "all") {
      filtered = filtered.filter((u) => u.permission === colaboratorNameFilter);
    }

    if (companyNameFilter && companyNameFilter !== "all") {
      filtered = filtered.filter(
        (u) => String(u.idBrandMaster) === companyNameFilter,
      );
    }

    if (statusFilter && statusFilter !== "all") {
      filtered = filtered.filter((u) => u.status === statusFilter);
    }

    return filtered;
  }, [userList, colaboratorNameFilter, companyNameFilter, statusFilter]);

  useEffect(() => {
    setUsers(filteredUsers);
    const calculatedTotalPages =
      totalCount > 0 ? Math.ceil(totalCount / limit) : 0;
    setTotalPage(calculatedTotalPages);
  }, [filteredUsers, totalCount, limit]);

  useImperativeHandle(ref, () => ({
    refresh: fetchUsers,
  }));

  const companyFilterOptions = useMemo(() => {
    const companies = new Map<string, string>();
    userList.forEach((user) => {
      if (user.idBrandMaster && user.brandMaster?.brandName) {
        companies.set(String(user.idBrandMaster), user.brandMaster.brandName);
      }
    });
    return [
      {
        label: t("colaboratorRegister.companyFilterPlaceholder"),
        value: "all",
      },
      ...Array.from(companies.entries()).map(([id, name]) => ({
        label: name,
        value: id,
      })),
    ];
  }, [userList, t]);

  const roleFilterOptions = [
    { label: t("colaboratorRegister.UserFilterPlaceholder"), value: "all" },
    { label: t("colaboratorRegister.admin"), value: "admin" },
    { label: t("colaboratorRegister.manager"), value: "manager" },
    { label: t("colaboratorRegister.member"), value: "member" },
  ];

  const statusFilterOptions = [
    { label: t("colaboratorRegister.allStatus"), value: "all" },
    { label: t("colaboratorRegister.active"), value: "active" },
    { label: t("colaboratorRegister.inactive"), value: "inactive" },
  ];

  return (
    <Stack
      sx={{
        background: theme[mode].mainBackground,
        borderRadius: "16px",
        padding: "24px",
        gap: "24px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
        }}
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

        <Box
          sx={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          <DropDown
            data={companyFilterOptions}
            value={
              companyFilterOptions.find(
                (opt) => opt.value === companyNameFilter,
              ) || companyFilterOptions[0]
            }
            onChange={(value) =>
              setCompanyNameFilter((value?.value as string) || "all")
            }
            placeholder={t("colaboratorRegister.companyFilterPlaceholder")}
            sxContainer={{ minWidth: "200px" }}
          />
          <DropDown
            data={roleFilterOptions}
            value={
              roleFilterOptions.find(
                (opt) => opt.value === colaboratorNameFilter,
              ) || roleFilterOptions[0]
            }
            onChange={(value) =>
              setColaboratorNameFilter((value?.value as string) || "all")
            }
            placeholder={t("colaboratorRegister.UserFilterPlaceholder")}
            sxContainer={{ minWidth: "200px" }}
          />
          <DropDown
            data={statusFilterOptions}
            value={
              statusFilterOptions.find((opt) => opt.value === statusFilter) ||
              statusFilterOptions[0]
            }
            onChange={(value) =>
              setStatusFilter((value?.value as string) || "all")
            }
            placeholder={t("colaboratorRegister.statusFilterPlaceholder")}
            sxContainer={{ minWidth: "200px" }}
          />
        </Box>
      </Box>

      <Stack sx={{ gap: "12px" }}>
        {isLoading ? (
          <TextRob16Font1S sx={{ color: theme[mode].gray }}>
            Loading...
          </TextRob16Font1S>
        ) : users.length === 0 ? (
          <TextRob16Font1S sx={{ color: theme[mode].gray }}>
            {t("colaboratorRegister.noActivity")}
          </TextRob16Font1S>
        ) : (
          users.map((user) => (
            <ColaboratorTableRow
              key={user.idUser}
              user={user}
              onRefresh={fetchUsers}
            />
          ))
        )}
      </Stack>

      {totalPage > 1 && (
        <Box
          sx={{ display: "flex", justifyContent: "center", marginTop: "16px" }}
        >
          <Pagination
            count={totalPage}
            page={page}
            onChange={(_, value) => setPage(value)}
            color="primary"
            showFirstButton
            showLastButton
            sx={{
              "& .MuiPaginationItem-root": {
                color: theme[mode].primary,
              },
            }}
          />
        </Box>
      )}
    </Stack>
  );
});
