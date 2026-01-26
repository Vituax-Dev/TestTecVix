import { Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useZTheme } from "../../stores/useZTheme";
import { useZColaboratorRegisterPage } from "../../stores/useZColaboratorRegisterPage";
import { useBrandMasterResources, INewMSPResponse } from "../../hooks/useBrandMasterResources";
import { useZUserProfile } from "../../stores/useZUserProfile";
import { FilterInput } from "../../components/Inputs/FilterInput";
import { DropDownDark } from "../../components/Inputs/DropDownDark";
import { FilterIcon } from "../../icons/FilterIcon";
import { useEffect, useState } from "react";

export const ColaboratorTableFilters = () => {
  const { theme, mode } = useZTheme();
  const { t } = useTranslation();
  const { idBrand } = useZUserProfile();
  const { listAllBrands } = useBrandMasterResources();

  const {
    companyFilter,
    setCompanyFilter,
    userFilter,
    setUserFilter,
  } = useZColaboratorRegisterPage();

  const [companies, setCompanies] = useState<INewMSPResponse[]>([]);

  // Usuário vituax (idBrand === null) pode ver todas as empresas
  const isVituaxUser = idBrand === null;

  useEffect(() => {
    const fetchCompanies = async () => {
      if (isVituaxUser) {
        const response = await listAllBrands();
        if (response?.result) {
          setCompanies(response.result);
        }
      }
    };
    fetchCompanies();
  }, [isVituaxUser, listAllBrands]);

  const companyOptions = [
    { label: t("colaboratorRegister.companyFilterPlaceholder"), value: null },
    ...companies.map((c) => ({
      label: c.brandName || "",
      value: c.idBrandMaster,
    })),
  ];

  return (
    <Stack sx={{ flexDirection: "row", gap: "12px", alignItems: "center" }}>
      {isVituaxUser && (
        <DropDownDark
          data={companyOptions}
          value={companyOptions.find((o) => o.value === companyFilter) || companyOptions[0]}
          onChange={(val) => setCompanyFilter(val?.value as number | null)}
          placeholderIcon={<FilterIcon fill={theme[mode].tertiary} />}
          sxContainer={{ minWidth: "180px" }}
        />
      )}
      <FilterInput
        value={userFilter}
        onChange={setUserFilter}
        placeholder={t("colaboratorRegister.UserFilterPlaceholder")}
        icon={<FilterIcon fill={theme[mode].tertiary} />}
        hasDebounce
        debounceDelay={400}
      />
    </Stack>
  );
};
