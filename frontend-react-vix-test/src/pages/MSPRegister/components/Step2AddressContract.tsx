import { Box, Grid, TextField, FormControlLabel, Switch, useMediaQuery } from "@mui/material";
import { useZTheme } from "../../../stores/useZTheme";
import { useTranslation } from "react-i18next";
import { useMSPRegisterStore } from "../../../stores/useMSPRegisterStore";
import { TextRob16Font1S } from "../../../components/Text1S";
import { useState } from "react";

export const Step2AddressContract = () => {
  const { theme, mode } = useZTheme();
  const { t } = useTranslation();
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  const { mspData, updateMSPData } = useMSPRegisterStore();
  const [isLoadingCEP, setIsLoadingCEP] = useState(false);

  const handleChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    updateMSPData({ [field]: event.target.value });
  };

  const formatCEP = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    return numbers.replace(/(\d{5})(\d{3})/, "$1-$2");
  };

  const handleCEPChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const formattedValue = formatCEP(value);
    updateMSPData({ cep: formattedValue });

    // Auto-complete address if CEP is complete
    if (formattedValue.length === 9) {
      setIsLoadingCEP(true);
      try {
        const cep = formattedValue.replace(/\D/g, "");
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await response.json();
        
        if (!data.erro) {
          updateMSPData({
            street: data.logradouro || "",
            neighborhood: data.bairro || "",
            city: data.localidade || "",
            state: data.uf || "",
          });
        }
      } catch (error) {
        console.warn("Erro ao buscar CEP:", error);
      } finally {
        setIsLoadingCEP(false);
      }
    }
  };

  const handlePocChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateMSPData({ isPoc: event.target.checked });
  };

  const inputSx = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "8px",
      backgroundColor: theme[mode].lightV2,
      border: `1px solid ${theme[mode].grayLight}`,
      "&.Mui-focused fieldset": {
        borderColor: theme[mode].blue,
      },
      "& input": {
        color: theme[mode].primary,
        padding: "12px 16px",
      },
    },
    "& .MuiInputLabel-root": {
      color: theme[mode].tertiary,
      "&.Mui-focused": {
        color: theme[mode].blue,
      },
    },
  };

  return (
    <Box sx={{ width: "100%" }}>
      <TextRob16Font1S
        sx={{
          color: theme[mode].primary,
          mb: 3,
          textAlign: "center",
          fontWeight: "500",
        }}
      >
        {t("mspRegister.step2Subtitle")}
      </TextRob16Font1S>

      <Grid container spacing={isMobile ? 2 : 3}>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label={t("mspRegister.cep")}
            value={mspData.cep}
            onChange={handleCEPChange}
            variant="outlined"
            required
            inputProps={{ maxLength: 9 }}
            disabled={isLoadingCEP}
            sx={inputSx}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label={t("mspRegister.street")}
            value={mspData.street}
            onChange={handleChange("street")}
            variant="outlined"
            required
            sx={inputSx}
          />
        </Grid>

        <Grid item xs={12} md={2}>
          <TextField
            fullWidth
            label={t("mspRegister.number")}
            value={mspData.number}
            onChange={handleChange("number")}
            variant="outlined"
            required
            sx={inputSx}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label={t("mspRegister.complement")}
            value={mspData.complement}
            onChange={handleChange("complement")}
            variant="outlined"
            sx={inputSx}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label={t("mspRegister.neighborhood")}
            value={mspData.neighborhood}
            onChange={handleChange("neighborhood")}
            variant="outlined"
            required
            sx={inputSx}
          />
        </Grid>

        <Grid item xs={12} md={8}>
          <TextField
            fullWidth
            label={t("mspRegister.city")}
            value={mspData.city}
            onChange={handleChange("city")}
            variant="outlined"
            required
            sx={inputSx}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            label={t("mspRegister.state")}
            value={mspData.state}
            onChange={handleChange("state")}
            variant="outlined"
            required
            inputProps={{ maxLength: 2 }}
            sx={inputSx}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label={t("mspRegister.contractNumber")}
            value={mspData.contractNumber}
            onChange={handleChange("contractNumber")}
            variant="outlined"
            required
            sx={inputSx}
          />
        </Grid>

        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Switch
                checked={mspData.isPoc}
                onChange={handlePocChange}
                sx={{
                  "& .MuiSwitch-switchBase.Mui-checked": {
                    color: theme[mode].blue,
                  },
                  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                    backgroundColor: theme[mode].blue,
                  },
                }}
              />
            }
            label={t("mspRegister.isPoc")}
            sx={{
              "& .MuiFormControlLabel-label": {
                color: theme[mode].primary,
                fontSize: "16px",
              },
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};