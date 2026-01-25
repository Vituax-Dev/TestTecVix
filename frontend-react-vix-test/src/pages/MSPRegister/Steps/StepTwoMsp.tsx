import { Box, Stack, Divider } from "@mui/material";
import { useZMspRegisterPage } from "../../../stores/useZMspRegisterPage";
import { SimpleInput } from "../../../components/Inputs/SimpleInput";
import { Btn } from "../../../components/Buttons/Btn";
import { useTranslation } from "react-i18next";
import { useZTheme } from "../../../stores/useZTheme";
import { TextRob16Font1S } from "../../../components/Text1S";
import { maskPhone } from "../../../utils/maskPhone";
import {
  useBrandMasterResources,
  ICreateNewBrandMaster,
} from "../../../hooks/useBrandMasterResources";
import { UploadIcon } from "../../../icons/UploadIcon";
import { AbsoluteBackDrop } from "../../../components/AbsoluteBackDrop";
import { useRef } from "react";
import { useEffect } from "react";
import { useUploadFile } from "../../../hooks/useUploadFile";

export interface StepTwoMspProps {
  onRefresh?: () => Promise<any>;
}

export const StepTwoMsp = ({ onRefresh }: StepTwoMspProps) => {
  const { t } = useTranslation();
  const { theme, mode } = useZTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { createAnewBrandMaster, editBrandMaster, isLoading } =
    useBrandMasterResources();
  const { handleUpload, isUploading: isUploadingFile } = useUploadFile();

  const {
    admName,
    setAdmName,
    admEmail,
    setAdmEmail,
    admPhone,
    setAdmPhone,
    admPassword,
    setAdmPassword,
    mspDomain,
    setMSPDomain,
    brandLogoUrl,
    setBrandLogo,
    position,
    setPosition,
    setActiveStep,
    setModalOpen,
    resetAll,
    isEditing,
    companyName,
    cnpj,
    phone,
    sector,
    contactEmail,
    locality,
    isPoc,
    notesBrandMasterDescription,
    cep,
    countryState,
    city,
    street,
    streetNumber,
    district,
    cityCode,
  } = useZMspRegisterPage();

  const inputSx = {
    width: "90%",
    height: "75px",
    maxWidth: "350px",
  };

  const labelStyle = {
    color: theme[mode].primary,
    fontSize: "16px",
    fontWeight: "200",
    opacity: 0.7,
  };

  const sectionTitleStyle = {
    color: theme[mode].primary,
    fontWeight: "600",
    fontSize: "18px",
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const result = await handleUpload(file);

      if (result && result.url) {
        setBrandLogo({
          brandLogoUrl: result.url,
          brandObjectName: result.objectName || file.name,
        });
      }
    }
  };
  const handleFinish = async () => {
    if (!admName || !admEmail || !admPassword || !mspDomain) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    const payload: ICreateNewBrandMaster = {
      companyName: companyName,
      cnpj: cnpj,
      phone: phone,
      sector: sector,
      contactEmail: contactEmail,
      cep: cep,
      locality: locality,
      countryState: countryState,
      city: city,
      street: street,
      streetNumber: streetNumber,
      district,
      admName: admName,
      admEmail: admEmail,
      admPhone: admPhone,
      admPassword: admPassword,
      mspDomain: mspDomain,
      cityCode: cityCode ? Number(cityCode) : undefined,
      isPoc: Boolean(isPoc),
      position: "admin",
      brandLogo: brandLogoUrl?.startsWith("data:")
        ? "https://cataas.com/cat/gif"
        : brandLogoUrl || "https://cataas.com/cat/gif",
    };

    if (isEditing.length > 0) {
      const mspId = isEditing[0];

      const response = await editBrandMaster(mspId, {
        idBrandMaster: mspId,
        brandName: companyName, 
        emailContact: contactEmail,
        domain: mspDomain, 
        cnpj: cnpj,
        setorName: sector,
        location: locality,
        state: countryState,
        city: city,
        cep: cep,
        street: street,
        placeNumber: streetNumber,
        smsContact: phone,
        brandLogo: brandLogoUrl,
        isPoc: Boolean(isPoc),
      });

      if (response) {
        if (onRefresh) await onRefresh();
        setModalOpen("editedMsp");
        return
      }
    } else {
      const response = await createAnewBrandMaster(payload);
      if (response) {
        if (onRefresh) await onRefresh();
        setModalOpen("createdMsp");
      }
    }
  };

  useEffect(() => {
    setPosition("Administrador");
  }, [setPosition]);

  return (
    <Stack sx={{ gap: "20px" }}>
      {isLoading && <AbsoluteBackDrop open />}

      <Stack sx={{ gap: "10px" }}>
        <TextRob16Font1S sx={sectionTitleStyle}>Domínio do MSP</TextRob16Font1S>
        <Stack sx={{ rowGap: "20px", maxWidth: "350px", maxHeight: "20px" }}>
          <TextRob16Font1S sx={labelStyle}>
            Domínio (Obrigatório)
          </TextRob16Font1S>
          <SimpleInput
            placeholder="xx.xxx.xxx"
            value={mspDomain}
            onChange={setMSPDomain}
            sx={inputSx}
          />
        </Stack>
      </Stack>

      <Divider sx={{ opacity: 0.1 }} />

      <TextRob16Font1S
        sx={{
          color: theme[mode].primary,
          fontWeight: "600",
          fontSize: "16px",
          marginTop: "65px",
        }}
      >
        Administrador principal da MSP
      </TextRob16Font1S>

      <Stack sx={{ gap: "15px" }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "350px 350px 350px 350px",
            columnGap: "10px",
          }}
        >
          <Stack>
            <TextRob16Font1S sx={labelStyle}>
              Nome completo (Obrigatório)
            </TextRob16Font1S>
            <SimpleInput
              placeholder="josé da Silva"
              value={admName}
              onChange={setAdmName}
              sx={inputSx}
            />
          </Stack>
          <Stack>
            <TextRob16Font1S sx={labelStyle}>
              E-mail (Obrigatório)
            </TextRob16Font1S>
            <SimpleInput
              placeholder="jose@email.com"
              value={admEmail}
              onChange={setAdmEmail}
              sx={inputSx}
            />
          </Stack>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "350px 350px 350px 350px",
            columnGap: "10px",
          }}
        >
          <Stack>
            <TextRob16Font1S sx={labelStyle}>Telefone</TextRob16Font1S>
            <SimpleInput
              placeholder="(00) 00000-0000"
              value={admPhone}
              onChange={(v) => setAdmPhone(maskPhone(v))}
              sx={inputSx}
            />
          </Stack>
          <Stack>
            <TextRob16Font1S sx={labelStyle}>Cargo</TextRob16Font1S>
            <SimpleInput
              placeholder="Administrador"
              value={position}
              onChange={() => {}}
              sx={inputSx}
              disabled
            />
          </Stack>
          <Stack>
            <TextRob16Font1S sx={labelStyle}>
              Senha inicial (Obrigatório)
            </TextRob16Font1S>
            <SimpleInput
              placeholder="Gerada e enviada por e-mail"
              value={admPassword}
              onChange={setAdmPassword}
              sx={inputSx}
              type="password"
            />
          </Stack>
          <Stack>
            <TextRob16Font1S sx={labelStyle}>Nome de Usuário</TextRob16Font1S>
            <SimpleInput
              placeholder="Nome de Usuário"
              value={admName.split(" ")[0].toLowerCase()}
              onChange={() => {}}
              sx={inputSx}
              disabled
            />
          </Stack>
        </Box>
      </Stack>

      <Divider
        sx={{ borderColor: theme[mode].grayLight, opacity: 0.5, my: 0.5 }}
      />

      {/* Logotipo */}
      <Stack sx={{ gap: "15px" }}>
        <Stack>
          <TextRob16Font1S sx={sectionTitleStyle}>
            Logotipo da empresa
          </TextRob16Font1S>
          <TextRob16Font1S
            sx={{
              fontSize: "15px",
              opacity: 0.6,
              color: theme[mode].primary,
              marginTop: "10px",
              marginBottom: "10px",
            }}
          >
            O logo ficará visível no sistema e poderá ser alterado mais tarde.
          </TextRob16Font1S>
        </Stack>

        <Stack direction="row" spacing={2} alignItems="flex-start">
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
            accept="image/*"
          />
          <Box
            onClick={() => fileInputRef.current?.click()}
            sx={{
              width: "350px",
              height: "200px",
              background: "#1E2125",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "4px #ffffff",
              cursor: "pointer",
              "&:hover": { borderColor: theme[mode].blue },
            }}
          >
            <Stack alignItems="center" spacing={1}>
              <UploadIcon fill={theme[mode].gray} />
              <TextRob16Font1S
                sx={{
                  fontSize: "14px",
                  textAlign: "center",
                  color: theme[mode].gray,
                }}
              >
                Clique aqui para fazer
                <br />
                upload do seu logo
              </TextRob16Font1S>
            </Stack>
          </Box>
          <Stack spacing={4}>
            <Stack direction="row" spacing={3} alignItems="center">
              <Box
                sx={{
                  width: "75px",
                  height: "75px",
                  background: "#FFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                {brandLogoUrl ? (
                  <img
                    src={brandLogoUrl}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                    onError={(e) =>
                      console.error("Erro ao carregar imagem:", brandLogoUrl)
                    }
                  />
                ) : (
                  <TextRob16Font1S sx={{ color: "#000", fontSize: "10px" }}>
                    LOGO
                  </TextRob16Font1S>
                )}
              </Box>
              <Stack spacing={1}>
                <Box
                  onClick={() => fileInputRef.current?.click()}
                  sx={{ cursor: "pointer" }}
                >
                  <TextRob16Font1S
                    sx={{
                      color: theme[mode].blue,
                      fontSize: "15px",
                      textDecoration: "underline",
                    }}
                  >
                    Alterar logo
                  </TextRob16Font1S>
                </Box>
                <Box
                  onClick={() =>
                    setBrandLogo({ brandLogoUrl: "", brandObjectName: "" })
                  }
                  sx={{ cursor: "pointer" }}
                >
                  <TextRob16Font1S
                    sx={{
                      color: theme[mode].blue,
                      fontSize: "15px",
                      textDecoration: "underline",
                    }}
                  >
                    Remover logo
                  </TextRob16Font1S>
                </Box>
              </Stack>
            </Stack>
            <Box
              component="ul"
              sx={{
                paddingLeft: "120px",
                color: theme[mode].gray,
                fontSize: "15px",
                listStyleType: "disc",
                "& li::marker": {
                  color: theme[mode].blue,
                  fontSize: "22px",
                },
              }}
            >
              <li>Padrão: 165x50px</li>
              <li>Tamanho: 50mb</li>
              <li>Formatos: .svg .png .jpg .gif .webp</li>
            </Box>
          </Stack>
        </Stack>
      </Stack>

      <Divider
        sx={{ borderColor: theme[mode].grayLight, opacity: 0.5, my: 0.5 }}
      />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: 2,
          mb: 1,
        }}
      >
        <Stack direction="row" spacing={2}>
          <Btn
            onClick={handleFinish}
            sx={{
              background: theme[mode].blue,
              height: "50px",
              width: "350px",
              borderRadius: "10px",
            }}
          >
            <TextRob16Font1S
              sx={{ color: "#FFF", fontWeight: "600", fontSize: "16px" }}
            >
              {isEditing.length > 0 ? "Salvar alterações" : "Confirmar cadastro"}
            </TextRob16Font1S>
          </Btn>
          <Btn
            onClick={() => setActiveStep(0)}
            sx={{
              border: `3px solid ${theme[mode].blue}40`,
              background: "transparent",
              height: "50px",
              width: "350px",
              borderRadius: "10px",
            }}
          >
            <TextRob16Font1S sx={{ color: theme[mode].blue, fontSize: "16px" }}>
              Voltar
            </TextRob16Font1S>
          </Btn>
        </Stack>
        <Box onClick={() => resetAll()} sx={{ cursor: "pointer" }}>
          <TextRob16Font1S
            sx={{
              color: theme[mode].gray,
              textDecoration: "underline",
              fontSize: "16px",
              mr: 5,
            }}
          >
            Limpar
          </TextRob16Font1S>
        </Box>
      </Box>
    </Stack>
  );
};
