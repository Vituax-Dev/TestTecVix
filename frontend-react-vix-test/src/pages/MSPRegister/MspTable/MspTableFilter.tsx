import { Box, Stack } from "@mui/material";
import { FilterInput } from "../../../components/Inputs/FilterInput";
import { FilterIcon } from "../../../icons/FilterIcon";
import { useZTheme } from "../../../stores/useZTheme";
import { useTranslation } from "react-i18next";
import { useZMspRegisterPage } from "../../../stores/useZMspRegisterPage";
import { CheckboxLabel } from "../../../components/CheckboxLabel";
import { FullFilledButton } from "../../../components/Buttons/FullFilledButton";

export const MspTableFilters = () => {
  const { t } = useTranslation();
  const { theme, mode } = useZTheme();
  const { mspTableFilter, setMspTableFilter, isPocFilter, setIsPocFilter, setActiveStep, resetAll, setIsEditing } =
    useZMspRegisterPage();
  
  const handleNewMsp = () => {
    resetAll();
    setIsEditing([]);
    setActiveStep(0);
  };

  return (
    <Box
      sx={{
        display: "flex",
        gap: "16px",
        alignItems: "center",
      }}
    >
      <FullFilledButton 
        onClick={handleNewMsp}
        label={t("mspRegister.newMsp")}
        sxButton={{ maxWidth: "200px", minWidth: "180px" }}
      />
      <FilterInput
        icon={<FilterIcon fill={theme[mode].gray} />}
        value={mspTableFilter}
        onChange={setMspTableFilter}
        placeholder={t("mspRegister.filterPlaceholder")}
      />
      <CheckboxLabel
        label={t("mspRegister.showOnlyPoc")}
        checked={isPocFilter}
        handleChange={() => setIsPocFilter(!isPocFilter)}
        sx={{ whiteSpace: "nowrap" }}
      />
    </Box>
  );
};
