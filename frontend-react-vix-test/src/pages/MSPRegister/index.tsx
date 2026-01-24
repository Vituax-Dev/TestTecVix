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
import { StepOneMsp } from "./Steps/StepOneMsp";
import { StepTwoMsp } from "./Steps/StepTwoMsp";

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
    vmsToBeDeleted,
    setVmsToBeDeleted,
  } = useZMspRegisterPage();
  const { t } = useTranslation();
  const { isLoading, listAllBrands } = useBrandMasterResources();
  const { isLoadingDeleteVM, deleteVM } = useVmResource();
  const [openModalUserNotCreated, setOpenModalUserNotCreated] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const resetAllStepStates = () => {
    setIsEditing([]);
    setActiveStep(0);
    resetAll();
  };

  const handleRefreshTable = async () => {
    await listAllBrands();
    setRefreshKey((prev) => prev + 1);
  };

  const handleCancelAfterDeleteMSP = () => {
    setMspToBeDeleted(null);
    setModalOpen(null);
    setMspToBeDeleted(null);
    setVmsToBeDeleted([]);
    resetAllStepStates();
  };

  const handleAfterDeleteMSP = async () => {
    try {
      await Promise.all(vmsToBeDeleted.map((vm) => deleteVM(vm.idVM)));

      await handleRefreshTable();

      handleCancelAfterDeleteMSP();
    } catch (error) {
      console.error("Erro ao excluir permanentemente:", error);
    }
  };

  useEffect(() => {
    return () => {
      resetAllStepStates();
    };
  }, []);

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
      <Stack sx={{ width: "100%", gap: "26px" }}>
        <Stack
          sx={{
            background: theme[mode].mainBackground,
            borderRadius: "16px",
            padding: "24px",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
          }}
        >
          {activeStep === 0 ? (
            <StepOneMsp />
          ) : (
            <StepTwoMsp onRefresh={handleRefreshTable} />
          )}
        </Stack>

        <Stack
          sx={{
            background: theme[mode].mainBackground,
            borderRadius: "16px",
            width: "100%",
            padding: "24px",
          }}
        >
          <Stack sx={{ gap: "40px" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <TextRob16Font1S
                sx={{ color: theme[mode].black, fontWeight: 500 }}
              >
                {t("mspRegister.tableTitle")}
              </TextRob16Font1S>
              <MspTableFilters />
            </Box>
            <MspTable key={refreshKey} />
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
                onClose={() => {
                  setModalOpen(null);
                  resetAllStepStates();
                }}
              />
            )}
            {modalOpen === "deletedMsp" && mspToBeDeleted && (
              <ModalDeleteMsp
                mspToDelete={mspToBeDeleted}
                onClose={() => {
                  setModalOpen(null);
                  setMspToBeDeleted(null);
                }}
                onConfirm={handleAfterDeleteMSP}
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
    </ScreenFullPage>
  );
};
