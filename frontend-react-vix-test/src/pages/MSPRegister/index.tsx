import { Box, Modal, Stack } from "@mui/material";
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
import { ModalUSerNotCreated } from "./ModalUSerNotCreated";
import { ModalDeleteVMsFromMSP } from "./ModalDeleteVMsFromMSP";
import { useBrandMasterResources } from "../../hooks/useBrandMasterResources";
import { AbsoluteBackDrop } from "../../components/AbsoluteBackDrop";
import { useVmResource } from "../../hooks/useVmResource";
import { FormMspStep1 } from "./FormMspStep1";
import { FormMspStep2 } from "./FormMspStep2";
import { Btn } from "../../components/Buttons/Btn";

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
    brandMasterDeleted,
    vmsToBeDeleted,
    setBrandMasterDeleted,
    setVmsToBeDeleted,
    isEditing,
    enterOnEditing,
    setEnterOnEditing,
  } = useZMspRegisterPage();
  const { t } = useTranslation();
  const { isLoading, listAllBrands } = useBrandMasterResources();
  const { isLoadingDeleteVM, deleteVM } = useVmResource();
  const [openModalUserNotCreated, setOpenModalUserNotCreated] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const resetAllStepStates = () => {
    setIsEditing([]);
    setActiveStep(0);
    resetAll();
    setShowForm(false);
    setEnterOnEditing(false);
  };

  const handleStartNewMsp = () => {
    resetAll();
    setActiveStep(0);
    setShowForm(true);
  };

  const handleContinueToStep2 = () => {
    setActiveStep(1);
  };

  const handleBackToStep1 = () => {
    setActiveStep(0);
  };

  const { setMspList } = useZMspRegisterPage();

  const handleConfirmMsp = async () => {
    // Refresh the list after create/edit
    const response = await listAllBrands();
    if (response?.result) {
      setMspList(response.result);
    }
    resetAllStepStates();
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

  useEffect(() => {
    return () => {
      resetAllStepStates();
    };
  }, []);

  // Show form when entering edit mode
  useEffect(() => {
    if (enterOnEditing && isEditing.length > 0) {
      setShowForm(true);
    }
  }, [enterOnEditing, isEditing]);

  const isFormVisible = showForm || (isEditing.length > 0);

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
      }
      //  sx= estilização do componente pai
      // children= elementos do componente
      // className= estilização do componente
      // isLoading= ativa um loaing na tela
      // title= componente do titulo
      // subtitle= componente do subtitulo
      // keepSubtitle = false= mantem o subtitulo no caso de tela mobile ou pequena
      // sxContainer= estilização do componente children
      // sxTitleSubTitle= estilização do componente title e subtitle
    >
      {Boolean(isLoading || isLoadingDeleteVM) && <AbsoluteBackDrop open />}
      <Stack
        sx={{
          width: "100%",
          gap: "26px",
          borderRadius: "16px",
          boxSizing: "border-box",
        }}
      >
        {isFormVisible && (
          <Stack
            sx={{
              background: theme[mode].mainBackground,
              borderRadius: "16px",
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            {activeStep === 0 && (
              <FormMspStep1
                onContinue={handleContinueToStep2}
                onCancel={resetAllStepStates}
              />
            )}
            {activeStep === 1 && (
              <FormMspStep2
                onBack={handleBackToStep1}
                onConfirm={handleConfirmMsp}
                onClear={() => {}}
              />
            )}
          </Stack>
        )}
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
              <Stack sx={{ flexDirection: "row", gap: "16px", alignItems: "center", flexWrap: "wrap" }}>
                {!isFormVisible && (
                  <Btn
                    onClick={handleStartNewMsp}
                    sx={{
                      padding: "8px 16px",
                      backgroundColor: theme[mode].blue,
                      borderRadius: "12px",
                    }}
                  >
                    <TextRob16Font1S
                      sx={{
                        color: theme[mode].btnText,
                        fontSize: "14px",
                        fontWeight: "500",
                      }}
                    >
                      + {t("mspRegister.title")}
                    </TextRob16Font1S>
                  </Btn>
                )}
                <MspTableFilters />
              </Stack>
            </Box>
            <MspTable />
          </Stack>
        </Stack>
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
      {openModalUserNotCreated && (
        <ModalUSerNotCreated
          open={openModalUserNotCreated}
          onClose={() => {
            setOpenModalUserNotCreated(false);
            resetAllStepStates();
          }}
        />
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
