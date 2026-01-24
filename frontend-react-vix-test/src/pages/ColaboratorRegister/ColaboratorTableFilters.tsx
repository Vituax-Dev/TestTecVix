import { Box } from "@mui/material";
import { FilterInput } from "../../components/Inputs/FilterInput";
import { DropDownLabelToolTip } from "../../components/Inputs/DropDownLabelToolTip";
import { FilterIcon } from "../../icons/FilterIcon";
import { useZTheme } from "../../stores/useZTheme";
import { useTranslation } from "react-i18next";
import { useZColaboratorRegister } from "../../stores/useZColaboratorRegister";
import { useBrandMasterResources } from "../../hooks/useBrandMasterResources";
import { useUserResources } from "../../hooks/useUserResources";
import { useEffect, useState } from "react";

export const ColaboratorTableFilters = () => {
  const { t } = useTranslation();
  const { theme, mode } = useZTheme();
  const { isVituaxUser } = useUserResources();
  const { listAllBrands } = useBrandMasterResources();
  const [companies, setCompanies] = useState<{ label: string; value: number | null }[]>([]);

  const {
    search,
    setSearch,
    filterCompanyId,
    setFilterCompanyId,
  } = useZColaboratorRegister();

  useEffect(() => {
    const fetchCompanies = async () => {
      if (isVituaxUser) {
        const response = await listAllBrands();
        const companyOptions = [
          { label: t("colaboratorRegister.companyFilterPlaceholder"), value: -1 },
          { label: "Vituax", value: 0 },
          ...response.result.map((brand: { brandName: string; idBrandMaster: number }) => ({
            label: brand.brandName,
            value: brand.idBrandMaster,
          })),
        ];
        setCompanies(companyOptions);
      }
    };
    fetchCompanies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVituaxUser]);

  const handleCompanyFilterChange = (value: { label: string; value: unknown } | null) => {
    if (!value || value.value === -1) {
      setFilterCompanyId(null);
    } else {
      setFilterCompanyId(value.value as number);
    }
  };

  const getSelectedCompany = () => {
    if (filterCompanyId === null) {
      return companies.find((c) => c.value === -1) || null;
    }
    return companies.find((c) => c.value === filterCompanyId) || null;
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        flexWrap: "wrap",
        gap: "16px",
        alignItems: "center",
      }}
    >
      {isVituaxUser && (
        <DropDownLabelToolTip
          data={companies}
          value={getSelectedCompany()}
          onChange={handleCompanyFilterChange}
          placeholder={t("colaboratorRegister.companyFilterPlaceholder")}
          sxContainer={{
            width: "200px",
            gap: "0px",
          }}
        />
      )}
      <FilterInput
        icon={<FilterIcon fill={theme[mode].gray} />}
        value={search}
        onChange={setSearch}
        placeholder={t("colaboratorRegister.UserFilterPlaceholder")}
      />
    </Box>
  );
};
