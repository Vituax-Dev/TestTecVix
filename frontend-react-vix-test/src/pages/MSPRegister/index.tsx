import { Box, Button, Modal, Stack } from "@mui/material";
import { ScreenFullPage } from "../../components/ScreenFullPage";
import { TextRob20Font1MB } from "../../components/Text1MB";
import { useZTheme } from "../../stores/useZTheme";
import { SampleStepper } from "../../components/SampleStepper";
import { useZMspRegisterPage } from "../../stores/useZMspRegisterPage";
import { useTranslation } from "react-i18next";
import { TextRob16Font1S } from "../../components/Text1S";
import { MspTableFilters } from "./MspTable/MspTableFilter";
import { MspTable } from "./MspTable/MspTable";
import { MspModal } from "./MspModal";
import { ModalDeleteMsp } from "./ModalDeleteMsp";
import { useEffect, useState } from "react";
import { ModalDeleteVMsFromMSP } from "./ModalDeleteVMsFromMSP";
import { useBrandMasterResources } from "../../hooks/useBrandMasterResources";
import { AbsoluteBackDrop } from "../../components/AbsoluteBackDrop";
import { useVmResource } from "../../hooks/useVmResource";
import { MspFormStep1, MspFormStep2 } from "./MspForm";
import { toast } from "react-toastify";
import AddIcon from "@mui/icons-material/Add";

export const MSPRegisterPage = () => {
  const { theme, mode } = useZTheme();
  const {
    activeStep,
    modalOpen,
    mspToBeDeleted,
    setModalOpen,
    setMspToBeDeleted,
    setActiveStep,
    resetAll,
    setIsEditing,
    isEditing,
    brandMasterDeleted,
    vmsToBeDeleted,
    setBrandMasterDeleted,
    setVmsToBeDeleted,
    showForm,
    setShowForm,
    // Form fields
    companyName,
    cnpj,
    phone,
    sector,
    contactEmail,
    locality,
    mspDomain,
    admName,
    admEmail,
    admPhone,
    admPassword,
    brandLogoUrl,
    brandObjectName,
    isPoc,
    setMspList,
    minConsumption,
    discountPercentage,
  } = useZMspRegisterPage();
  const { t } = useTranslation();
  const {
    isLoading,
    createAnewBrandMaster,
    editBrandMaster,
    listAllBrands,
  } = useBrandMasterResources();
  const { isLoadingDeleteVM, deleteVM } = useVmResource();
  const [isSaving, setIsSaving] = useState(false);

  const isEditingMode = isEditing.length > 0;

  const resetAllStepStates = () => {
    setIsEditing([]);
    setActiveStep(0);
    setShowForm(false);
    resetAll();
  };

  const handleCancelAfterDeleteMSP = () => {
    setMspToBeDeleted(null);
    setModalOpen(null);
    setMspToBeDeleted(null);
    setBrandMasterDeleted(null);
    setVmsToBeDeleted([]);
    resetAllStepStates();
  };

  const handleAfterDeleteMSP = async () => {
    await Promise.all(vmsToBeDeleted.map((vm) => deleteVM(vm.idVM)));
    handleCancelAfterDeleteMSP();
  };

  const handleStartCreate = () => {
    resetAll();
    setIsEditing([]);
    setActiveStep(0);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    // Se não quiser perder os dados, apenas esconde o form
    // Os dados permanecem no state para quando voltar
    setShowForm(false);
    setActiveStep(0);
    setIsEditing([]);
  };

  const handleContinueToStep2 = () => {
    setActiveStep(1);
  };

  const handleBackToStep1 = () => {
    setActiveStep(0);
  };

  const handleClearForm = () => {
    resetAll();
    setActiveStep(0);
  };

  const handleConfirmSave = async () => {
    setIsSaving(true);

    try {
      if (isEditingMode) {
        // MODO EDIÇÃO (sem alterar admin)
        const editId = isEditing[0];
        const result = await editBrandMaster(editId, {
          brandName: companyName,
          emailContact: contactEmail,
          cnpj,
          setorName: sector,
          location: locality,
          smsContact: phone,
          brandLogo: brandObjectName || brandLogoUrl,
          isPoc,
          minConsumption,
          discountPercentage,
        });

        if (result?.brandMaster) {
          // Atualizar lista
          const updatedList = await listAllBrands();
          setMspList(updatedList.result);
          setModalOpen("editedMsp");
          resetAllStepStates();
        }
      } else {
        // MODO CRIAÇÃO (MSP + Admin em transação)
        const result = await createAnewBrandMaster({
          companyName,
          cnpj,
          phone,
          sector,
          contactEmail,
          cep: "",
          locality,
          countryState: "",
          city: "",
          street: "",
          streetNumber: "",
          admName,
          admEmail,
          admPhone,
          admPassword,
          brandLogo: brandObjectName || brandLogoUrl,
          position: "admin",
          mspDomain,
          isPoc,
          minConsumption: minConsumption ? parseFloat(minConsumption) : 0,
          discountPercentage: discountPercentage ? parseFloat(discountPercentage) : 0,
        });

        if (result?.brandMaster) {
          // Sucesso - MSP e Admin criados em transação
          const updatedList = await listAllBrands();
          setMspList(updatedList.result);
          setModalOpen("createdMsp");
          resetAllStepStates();
        }
      }
    } catch {
      toast.error(t("mspRegister.editMspError"));
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    return () => {
      resetAllStepStates();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Quando entra em modo edição, mostrar o form
  useEffect(() => {
    if (isEditing.length > 0) {
      setShowForm(true);
    }
  }, [isEditing, setShowForm]);

  const renderContent = () => {
    if (showForm) {
      // Mostrar formulário
      if (activeStep === 0) {
        return (
          <MspFormStep1
            onContinue={handleContinueToStep2}
            onCancel={handleCancelForm}
          />
        );
      } else {
        return (
          <MspFormStep2
            onConfirm={handleConfirmSave}
            onBack={handleBackToStep1}
            onClear={handleClearForm}
            isEditing={isEditingMode}
            isLoading={isSaving}
          />
        );
      }
    }

    // Mostrar tabela
    return (
      <Stack
        sx={{
          background: theme[mode].mainBackground,
          borderRadius: "16px",
          width: "100%",
          padding: "24px",
          boxSizing: "border-box",
        }}
      >
        <Stack
          sx={{
            gap: "40px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "24px",
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
              {t("mspRegister.tableTitle")}
            </TextRob16Font1S>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "16px",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <MspTableFilters />
              <Button
                onClick={handleStartCreate}
                startIcon={<AddIcon />}
                sx={{
                  background: theme[mode].blue,
                  color: theme[mode].btnText,
                  textTransform: "none",
                  borderRadius: "12px",
                  padding: "8px 16px",
                  fontWeight: 500,
                  whiteSpace: "nowrap",
                  "&:hover": {
                    background: theme[mode].blueDark,
                  },
                }}
              >
                {t("mspRegister.createNewMsp")}
              </Button>
            </Box>
          </Box>
          <MspTable />
        </Stack>
      </Stack>
    );
  };

  return (
    <ScreenFullPage
      title={
        <TextRob20Font1MB
          sx={{
            color: theme[mode].primary,
            fontSize: "28px",
            fontWeight: "500",
            lineHeight: "40px",
          }}
        >
          {t("mspRegister.title")}
        </TextRob20Font1MB>
      }
      sxTitleSubTitle={{
        paddingLeft: "40px",
        paddingRight: "40px",
      }}
      sxContainer={{
        paddingLeft: "40px",
        paddingRight: "40px",
        paddingBottom: "40px",
      }}
      subtitle={
        showForm ? (
          <Box
            sx={{
              maxWidth: "646px",
              "@media (max-width: 660px)": { maxWidth: "136px" },
            }}
          >
            <SampleStepper
              activeStep={activeStep}
              stepsNames={[
                t("mspRegister.stepOneTitle"),
                t("mspRegister.stepTwoTitle"),
              ]}
            />
          </Box>
        ) : undefined
      }
    >
      {Boolean(isLoading || isLoadingDeleteVM || isSaving) && (
        <AbsoluteBackDrop open />
      )}
      <Stack
        sx={{
          width: "100%",
          gap: "26px",
          borderRadius: "16px",
          boxSizing: "border-box",
        }}
      >
        {renderContent()}
      </Stack>
      {modalOpen !== null && (
        <Modal
          open={modalOpen !== null}
          onClose={() => setModalOpen(null)}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div>
            {(modalOpen === "editedMsp" || modalOpen === "createdMsp") && (
              <MspModal
                modalType={modalOpen}
                onClose={() => setModalOpen(null)}
              />
            )}
            {modalOpen === "deletedMsp" && mspToBeDeleted && (
              <ModalDeleteMsp
                mspToDelete={mspToBeDeleted}
                onClose={() => {
                  setModalOpen(null);
                  setMspToBeDeleted(null);
                }}
              />
            )}
          </div>
        </Modal>
      )}
      {Boolean(brandMasterDeleted) && (
        <ModalDeleteVMsFromMSP
          onClose={handleCancelAfterDeleteMSP}
          onConfirm={handleAfterDeleteMSP}
          open={Boolean(brandMasterDeleted)}
          msp={brandMasterDeleted}
          vms={vmsToBeDeleted}
        />
      )}
    </ScreenFullPage>
  );
};
