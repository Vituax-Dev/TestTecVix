import { Box, Stack } from "@mui/material";
import { FilterInput } from "../../../components/Inputs/FilterInput";
import { FilterIcon } from "../../../icons/FilterIcon";
import { useZTheme } from "../../../stores/useZTheme";
import { useTranslation } from "react-i18next";
import { useZMspRegisterPage } from "../../../stores/useZMspRegisterPage";
import { CheckboxLabel } from "../../../components/CheckboxLabel";
import { Btn } from "../../../components/Buttons/Btn";
import { TextRob16Font1S } from "../../../components/Text1S";

export const MspTableFilters = () => {
  const { t } = useTranslation();
  const { theme, mode } = useZTheme();

  const {
    mspTableFilter,
    setMspTableFilter,
    isPocFilter,
    setIsPocFilter,
    setModalOpen,
    setActiveStep
  } = useZMspRegisterPage();

  const handleOpenRegister = () => {
    setActiveStep(0); 
    setModalOpen("registeringMsp"); 
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        flexWrap: "wrap",
        gap: "24px",
      }}
    >
      <FilterInput
        icon={<FilterIcon fill={theme[mode].gray} />}
        value={mspTableFilter}
        onChange={setMspTableFilter}
        placeholder={t("mspRegister.filterPlaceholder")}
      />

      <Stack sx={{ justifyContent: "center" }}>
        <CheckboxLabel
          label={t("mspRegister.showOnlyPoc")}
          checked={isPocFilter}
          handleChange={() => setIsPocFilter(!isPocFilter)}
        />
      </Stack>

      <Btn
        onClick={handleOpenRegister}
        sx={{
          backgroundColor: theme[mode].blue,
          px: 3,
          "&:hover": {
            backgroundColor: theme[mode].blue,
            opacity: 0.9
          }
        }}
      >
        <TextRob16Font1S sx={{ color: theme[mode].btnText }}>
          {t("mspRegister.addMspButton") || "Cadastrar MSP"}
        </TextRob16Font1S>
      </Btn>
    </Box>
  );
};