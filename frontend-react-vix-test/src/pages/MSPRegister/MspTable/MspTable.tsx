import { Fragment, useEffect, useState } from "react";
import { useZTheme } from "../../../stores/useZTheme";
import {
  Box,
  CircularProgress,
  IconButton,
  Stack,
  Tooltip,
} from "@mui/material";
import { ImgFromDB } from "../../../components/ImgFromDB";
import { TextRob14Font1Xs } from "../../../components/Text1Xs";
import { TextRob12Font2Xs } from "../../../components/Text2Xs";
import { useTranslation } from "react-i18next";
import { PencilCicleIcon } from "../../../icons/PencilCicleIcon";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import RestoreIcon from "@mui/icons-material/Restore";
import { useZMspRegisterPage } from "../../../stores/useZMspRegisterPage";
import { useBrandMasterResources } from "../../../hooks/useBrandMasterResources";
import { usePermissions } from "../../../hooks/usePermissions";
import moment from "moment";

export const MspTable = () => {
  const { theme, mode } = useZTheme();
  const { t } = useTranslation();
  const [loadingEdit, setLoadingEdit] = useState<number | null>(null);
  const [loadingReactivate, setLoadingReactivate] = useState<number | null>(
    null,
  );
  const {
    setCep,
    setLocality,
    setCountryState,
    setCity,
    setStreet,
    setStreetNumber,
    setCompanyName,
    setCnpj,
    setPhone,
    setSector,
    setContactEmail,
    setMSPDomain,
    mspList,
    setMspList,
    setIsEditing,
    setMspToBeDeleted,
    mspTableFilter,
    setModalOpen,
    setActiveStep,
    setBrandLogo,
    setCityCode,
    setDistrict,
    setEnterOnEditing,
    setShowAddressFields,
    setIsPoc,
    isPocFilter,
    includeDeletedFilter,
    setAdmName,
    setAdmEmail,
    setAdmPhone,
    setMinConsumption,
    setDiscountPercentage,
    setBrandLogoFile,
    setBrandLogoPreview,
  } = useZMspRegisterPage();

  const { listAllBrands, getBrandMasterById, reactivateBrandMaster } =
    useBrandMasterResources();

  const { canEditMSP, canDeleteMSP, isVituaxUser, isAdmin } = usePermissions();

  useEffect(() => {
    const fetchMsps = async () => {
      const response = await listAllBrands({
        includeDeleted: includeDeletedFilter,
      });
      return setMspList(response.result);
    };

    fetchMsps();
  }, [includeDeletedFilter]);

  const startEditing = (index: number) => {
    setShowAddressFields(true);
    setIsEditing([index]);
  };

  const handleReactivate = async (idBrandMaster: number) => {
    setLoadingReactivate(idBrandMaster);
    await reactivateBrandMaster(idBrandMaster);
    // Recarrega a lista
    const response = await listAllBrands({
      includeDeleted: includeDeletedFilter,
    });
    setMspList(response.result);
    setLoadingReactivate(null);
  };

  const handleEdit = async (index: number) => {
    setLoadingEdit(index);

    // Busca os dados completos do MSP incluindo o admin
    const response = await getBrandMasterById(index);
    const msp = response?.brandMaster;

    if (!msp) {
      setLoadingEdit(null);
      return;
    }

    setEnterOnEditing(true);
    startEditing(index);
    setActiveStep(0);

    // Limpa arquivo e preview anteriores
    setBrandLogoFile(null);
    setBrandLogoPreview("");

    // Dados do MSP
    setCompanyName(msp.brandName || "");
    setCnpj(msp.cnpj || "");
    setPhone(msp.smsContact || "");
    setContactEmail(msp.emailContact || "");
    setCep(msp.cep || "");
    setLocality(msp.location || "");
    setCountryState(msp.state || "");
    setCity(msp.city || "");
    setStreet(msp.street || "");
    setStreetNumber(msp.placeNumber || "");
    setSector(msp.setorName || "");
    setMSPDomain(msp.domain || "");
    setBrandLogo({
      brandLogoUrl: msp.brandLogo || "",
      brandObjectName: msp.brandLogo || "",
    });
    setCityCode(msp.cityCode ? `${msp.cityCode}` : "");
    setDistrict(msp.district || "");
    setIsPoc(Boolean(msp.isPoc));
    setMinConsumption(msp.minConsumption ? `${msp.minConsumption}` : "");
    setDiscountPercentage(
      msp.discountPercentage ? `${msp.discountPercentage}` : "",
    );

    // Dados do Admin (primeiro usuário admin)
    const admin = msp.users?.find((u) => u.role === "admin");
    if (admin) {
      setAdmName(admin.username || "");
      setAdmEmail(admin.email || "");
      setAdmPhone(admin.phone || "");
    }

    setLoadingEdit(null);
  };

  return (
    <Stack
      sx={{
        width: "100%",
        maxHeight: "540px",
        overflow: "auto",
        gap: "16px",
      }}
    >
      {[...mspList]
        .filter(
          (msp) =>
            msp.brandName
              .toLowerCase()
              .includes(mspTableFilter.toLowerCase()) &&
            (!isPocFilter || msp.isPoc === isPocFilter),
        )
        .map((msp, index) => (
          <Fragment key={`${msp.idBrandMaster}-${msp.brandName}`}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "8px 4px",
                gap: "16px",
                "@media (max-width: 800px)": {
                  flexDirection: "column",
                  alignItems: "flex-start",
                },
                // Estilo para MSPs deletados
                ...(msp.deletedAt && {
                  opacity: 0.6,
                  backgroundColor:
                    theme[mode].dangerLight || "rgba(244, 67, 54, 0.08)",
                  borderRadius: "8px",
                }),
              }}
            >
              <Box
                sx={{
                  flex: "2",
                  display: "flex",
                  flexDirection: "row",
                  gap: "16px",
                  alignItems: "center",
                }}
              >
                <ImgFromDB
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "100%",
                  }}
                  alt="msp image"
                  src={
                    msp.brandLogo ||
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhGHdcalX0wUWxZQCiSv8WzmSPpFGHr4jlsw&s"
                  }
                />
                <Stack>
                  <TextRob14Font1Xs
                    sx={{
                      color: theme[mode].black,
                      fontSize: "14px",
                      fontWeight: 500,
                    }}
                  >
                    {msp.brandName}
                  </TextRob14Font1Xs>
                  <TextRob12Font2Xs
                    sx={{
                      color: theme[mode].gray,
                      fontSize: "12px",
                      fontWeight: 400,
                    }}
                  >
                    {msp.emailContact || ""}
                  </TextRob12Font2Xs>
                </Stack>
              </Box>

              {/* Status */}
              <Box
                sx={{
                  flex: "1",
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                  "@media (max-width: 900px)": { display: "none" },
                }}
              >
                <TextRob14Font1Xs
                  sx={{
                    color: theme[mode].black,
                    fontSize: "14px",
                    fontWeight: 500,
                  }}
                >
                  {t("mspRegister.domain")}
                </TextRob14Font1Xs>
                <TextRob12Font2Xs
                  sx={{
                    color: theme[mode].gray,
                    fontSize: "12px",
                    fontWeight: 400,
                  }}
                >
                  {msp?.domain || ""}
                </TextRob12Font2Xs>
              </Box>
              <Box
                sx={{
                  flex: "2",
                  display: "flex",
                  flexDirection: "row",
                  flexWrap: "wrap",
                  gap: "8px",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                <TextRob14Font1Xs
                  sx={{
                    boxSizing: "content-box",
                    padding: "0 10px",
                    fontWeight: "400",
                    borderRadius: "12px",
                    border: `1px solid ${theme[mode].blueDark}`,
                    color: theme[mode].blueDark,
                    maxWidth: "120px",
                    overflow: "hidden",
                    textWrap: "nowrap",
                    textOverflow: "ellipsis",
                    "&:hover": {
                      cursor: "pointer",
                      background: theme[mode].blueDark,
                      color: theme[mode].mainBackground,
                    },
                  }}
                >
                  {msp.brandName}
                </TextRob14Font1Xs>

                <TextRob14Font1Xs
                  sx={{
                    boxSizing: "content-box",
                    padding: "0 10px",
                    fontWeight: "400",
                    borderRadius: "12px",
                    border: `1px solid ${
                      msp.isActive ? theme[mode].ok : theme[mode].danger
                    }`,
                    color: msp.isActive ? theme[mode].ok : theme[mode].danger,
                  }}
                >
                  {t(
                    `colaboratorRegister.${msp.isActive ? "active" : "inactive"}`,
                  )}
                </TextRob14Font1Xs>
                {msp?.isPoc && (
                  <TextRob14Font1Xs
                    sx={{
                      boxSizing: "content-box",
                      fontSize: "14px",
                      padding: "0 10px",
                      fontWeight: "400",
                      borderRadius: "12px",
                      border: `1px solid ${theme[mode].warning}`,
                      color: theme[mode].warning,
                    }}
                  >
                    {t("mspRegister.pocSinceOne")}
                    {moment(Date.now()).diff(moment(msp?.createdAt), "days")}
                    {t("mspRegister.pocSinceTwo")}
                  </TextRob14Font1Xs>
                )}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "8px",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  // justifyContent: "flex-end",
                  // minWidth: "80px",
                  "@media (max-width: 600px)": { display: "none" },
                }}
              >
                {/* Placeholder invisível para manter alinhamento quando deletado */}
                {msp.deletedAt && <Box sx={{ width: 40, height: 40 }} />}
                {/* Botão Reativar - apenas para MSPs deletados e Vituax Admin */}
                {msp.deletedAt && isVituaxUser && isAdmin && (
                  <Tooltip
                    title={t("mspRegister.reactivate") || "Reativar MSP"}
                  >
                    <IconButton
                      onClick={() => handleReactivate(msp.idBrandMaster)}
                      disabled={loadingReactivate === msp.idBrandMaster}
                    >
                      {loadingReactivate === msp.idBrandMaster ? (
                        <CircularProgress size={20} />
                      ) : (
                        <RestoreIcon sx={{ color: theme[mode].ok }} />
                      )}
                    </IconButton>
                  </Tooltip>
                )}

                {/* Botão Editar - apenas para MSPs ativos e se tem permissão */}
                {!msp.deletedAt && (
                  <Tooltip
                    title={!canEditMSP(msp) ? t("permissions.cannotEditMSP") : ""}
                  >
                    <span>
                      <IconButton
                        onClick={() => canEditMSP(msp) && handleEdit(msp.idBrandMaster)}
                        disabled={!canEditMSP(msp) || loadingEdit === msp.idBrandMaster}
                        sx={{
                          opacity: !canEditMSP(msp) ? 0.5 : 1,
                        }}
                      >
                        {loadingEdit === msp.idBrandMaster ? (
                          <CircularProgress size={20} />
                        ) : (
                          <PencilCicleIcon fill={canEditMSP(msp) ? theme[mode].blueMedium : theme[mode].tertiary} />
                        )}
                      </IconButton>
                    </span>
                  </Tooltip>
                )}
                {/* Botão Deletar - apenas para Vituax Admin e MSPs ativos */}
                {canDeleteMSP() && !msp.deletedAt && (
                  <IconButton
                    onClick={() => {
                      setMspToBeDeleted(msp);
                      setModalOpen("deletedMsp");
                    }}
                  >
                    <DeleteForeverIcon sx={{ color: theme[mode].danger }} />
                  </IconButton>
                )}
              </Box>
            </Box>
            {index !== mspList.length - 1 && (
              <div
                key={`${msp.idBrandMaster}-${msp.brandName}-divider`}
                style={{
                  height: "1px",
                  minHeight: "1px",
                  maxHeight: "1px",
                  width: "100%",
                  background: theme[mode].grayLight,
                }}
              />
            )}
          </Fragment>
        ))}
    </Stack>
  );
};
