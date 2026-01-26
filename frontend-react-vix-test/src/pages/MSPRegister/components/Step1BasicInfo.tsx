import { Box, Grid, TextField, useMediaQuery, FormControl, Select, MenuItem, Typography } from "@mui/material";
import { useZTheme } from "../../../stores/useZTheme";
import { useTranslation } from "react-i18next";
import { useMSPRegisterStore } from "../../../stores/useMSPRegisterStore";
import { TextRob16Font1S } from "../../../components/Text1S";

export const Step1BasicInfo = () => {
  const { theme, mode } = useZTheme();
  const { t } = useTranslation();
  const isMobile = useMediaQuery("(max-width: 768px)");
  
  const { mspData, updateMSPData } = useMSPRegisterStore();

  const handleChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    updateMSPData({ [field]: event.target.value });
  };

  const formatCNPJ = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    return numbers.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
  };

  const handleCNPJChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const formattedValue = formatCNPJ(value);
    updateMSPData({ cnpj: formattedValue });
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length === 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    }
    return numbers.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const formattedValue = formatPhone(value);
    updateMSPData({ phone: formattedValue });
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

  const selectSx = {
    borderRadius: "8px",
    backgroundColor: theme[mode].lightV2,
    border: `1px solid ${theme[mode].grayLight}`,
    "&.Mui-focused fieldset": {
      borderColor: theme[mode].blue,
    },
    "& .MuiSelect-select": {
      color: theme[mode].primary,
      padding: "12px 16px",
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
        {t("mspRegister.step1Subtitle")}
      </TextRob16Font1S>

      <Grid container spacing={isMobile ? 2 : 3}>
        {/* Nome da marca */}
        <Grid item xs={12} md={6}>
          <FormControl fullWidth size="small">
            <Typography
              variant="caption"
              sx={{
                color: theme[mode].tertiary,
                mb: 1,
                fontWeight: "medium",
                fontSize: "0.875rem",
              }}
            >
              Nome da marca
            </Typography>
            <TextField
              size="small"
              placeholder="Digite o nome da marca"
              value={mspData.brandName}
              onChange={handleChange("brandName")}
              required
              sx={inputSx}
            />
          </FormControl>
        </Grid>

        {/* Localização */}
        <Grid item xs={12} md={6}>
          <FormControl fullWidth size="small">
            <Typography
              variant="caption"
              sx={{
                color: theme[mode].tertiary,
                mb: 1,
                fontWeight: "medium",
                fontSize: "0.875rem",
              }}
            >
              Localização
            </Typography>
            <Select
              size="small"
              placeholder="Selecione a localização"
              value={mspData.location || ""}
              onChange={(e) => updateMSPData({ location: e.target.value })}
              displayEmpty
              sx={selectSx}
            >
              <MenuItem value="" disabled>
                Selecione a localização
              </MenuItem>
              <MenuItem value="norte">Norte</MenuItem>
              <MenuItem value="sul">Sul</MenuItem>
              <MenuItem value="leste">Leste</MenuItem>
              <MenuItem value="oeste">Oeste</MenuItem>
              <MenuItem value="centro">Centro</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* CNPJ */}
        <Grid item xs={12} md={6}>
          <FormControl fullWidth size="small">
            <Typography
              variant="caption"
              sx={{
                color: theme[mode].tertiary,
                mb: 1,
                fontWeight: "medium",
                fontSize: "0.875rem",
              }}
            >
              CNPJ
            </Typography>
            <TextField
              size="small"
              placeholder="Digite o CNPJ"
              value={mspData.cnpj}
              onChange={handleCNPJChange}
              required
              inputProps={{ maxLength: 18 }}
              sx={inputSx}
            />
          </FormControl>
        </Grid>

        {/* Telefone */}
        <Grid item xs={12} md={6}>
          <FormControl fullWidth size="small">
            <Typography
              variant="caption"
              sx={{
                color: theme[mode].tertiary,
                mb: 1,
                fontWeight: "medium",
                fontSize: "0.875rem",
              }}
            >
              Telefone
            </Typography>
            <TextField
              size="small"
              placeholder="Digite o telefone"
              value={mspData.phone}
              onChange={handlePhoneChange}
              required
              inputProps={{ maxLength: 15 }}
              sx={inputSx}
            />
          </FormControl>
        </Grid>

        {/* Setor */}
        <Grid item xs={12} md={6}>
          <FormControl fullWidth size="small">
            <Typography
              variant="caption"
              sx={{
                color: theme[mode].tertiary,
                mb: 1,
                fontWeight: "medium",
                fontSize: "0.875rem",
              }}
            >
              Setor
            </Typography>
            <Select
              size="small"
              placeholder="Selecione o setor"
              value={mspData.setorName || ""}
              onChange={(e) => updateMSPData({ setorName: e.target.value })}
              displayEmpty
              sx={selectSx}
            >
              <MenuItem value="" disabled>
                Selecione o setor
              </MenuItem>
              <MenuItem value="alimentario">Alimentário</MenuItem>
              <MenuItem value="varejo">Varejo</MenuItem>
              <MenuItem value="servicos">Serviços</MenuItem>
              <MenuItem value="tecnologia">Tecnologia</MenuItem>
              <MenuItem value="saude">Saúde</MenuItem>
              <MenuItem value="educacao">Educação</MenuItem>
              <MenuItem value="financeiro">Financeiro</MenuItem>
              <MenuItem value="outros">Outros</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* E-mail */}
        <Grid item xs={12} md={6}>
          <FormControl fullWidth size="small">
            <Typography
              variant="caption"
              sx={{
                color: theme[mode].tertiary,
                mb: 1,
                fontWeight: "medium",
                fontSize: "0.875rem",
              }}
            >
              E-mail
            </Typography>
            <TextField
              size="small"
              placeholder="Digite o e-mail"
              value={mspData.email}
              onChange={handleChange("email")}
              type="email"
              required
              sx={inputSx}
            />
          </FormControl>
        </Grid>

        {/* Consumo mínimo */}
        <Grid item xs={12} md={6}>
          <FormControl fullWidth size="small">
            <Typography
              variant="caption"
              sx={{
                color: theme[mode].tertiary,
                mb: 1,
                fontWeight: "medium",
                fontSize: "0.875rem",
              }}
            >
              Consumo mínimo (R$)
            </Typography>
            <TextField
              size="small"
              type="number"
              placeholder="Digite o valor mínimo"
              value={mspData.minConsumption || ""}
              onChange={(e) => updateMSPData({ minConsumption: parseFloat(e.target.value) || 0 })}
              sx={inputSx}
            />
          </FormControl>
        </Grid>

        {/* Percentual de desconto */}
        <Grid item xs={12} md={6}>
          <FormControl fullWidth size="small">
            <Typography
              variant="caption"
              sx={{
                color: theme[mode].tertiary,
                mb: 1,
                fontWeight: "medium",
                fontSize: "0.875rem",
              }}
            >
              Percentual de desconto (%)
            </Typography>
            <TextField
              size="small"
              type="number"
              placeholder="Digite o percentual"
              value={mspData.discountPercentage || ""}
              onChange={(e) => updateMSPData({ discountPercentage: parseFloat(e.target.value) || 0 })}
              inputProps={{ min: 0, max: 100 }}
              sx={inputSx}
            />
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};