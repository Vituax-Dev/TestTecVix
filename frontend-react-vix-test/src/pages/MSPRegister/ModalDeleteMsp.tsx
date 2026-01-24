import { Box, Button, Stack } from "@mui/material";
import { useZTheme } from "../../stores/useZTheme";
import { TextRob20Font1M } from "../../components/Text1M";
import { TextRob16Font1S } from "../../components/Text1S";
import { useTranslation } from "react-i18next";
import { CancelCircleIcon } from "../../icons/CancelCircleIcon";
import {
  INewMSPResponse,
  useBrandMasterResources,
} from "../../hooks/useBrandMasterResources";
import { useZMspRegisterPage } from "../../stores/useZMspRegisterPage";

export const ModalDeleteMsp = ({
  mspToDelete,
  onClose,
  onConfirm,
}: {
  mspToDelete: INewMSPResponse;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}) => {
  const { theme, mode } = useZTheme();
  const { t } = useTranslation();
  const {
    setMspList,
    setIsEditing,
    resetAll,
    setBrandMasterDeleted,
    setVmsToBeDeleted,
  } = useZMspRegisterPage();
  const { listAllBrands, deleteBrandMaster } = useBrandMasterResources();

  const fetchMsps = async () => {
    const response = await listAllBrands();
    return setMspList(response.result);
  };

  const onDelete = async () => {
    const response = await deleteBrandMaster(mspToDelete.idBrandMaster);

    if (response) {
      await onConfirm();

      setIsEditing([]);
      resetAll();
      setVmsToBeDeleted([]);
      
      setBrandMasterDeleted(response?.brandMaster || null);
      onClose();
    }
  };

  return (
    <Stack
      sx={{
        width: "fit-content",
        alignSelf: "center",
        justifySelf: "center",
        gap: "20px",
        boxSizing: "border-box",
        padding: "24px",
        borderRadius: "16px",
        background: theme[mode].mainBackground,
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CancelCircleIcon color={theme[mode].danger} size={"36px"} />
      <TextRob20Font1M
        sx={{
          color: theme[mode].primary,
          fontWeight: "400",
        }}
      >
        {`${t("mspRegister.areYouSure")} ${mspToDelete.brandName}?`}
      </TextRob20Font1M>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: "24px",
          "@media (max-width: 680px)": {
            flexDirection: "column",
          },
        }}
      >
        <Button
          sx={{
            width: "200px",
            background: theme[mode].danger,
            height: "40px",
            borderRadius: "12px",
            textTransform: "none",
            "@media (max-width: 680px)": {
              width: "100%",
            },
          }}
          onClick={() => onDelete()}
        >
          <TextRob16Font1S
            sx={{
              fontWeight: "400",
              color: "#FFFFFF",
            }}
          >
            {t("companyRegister.delete")}
          </TextRob16Font1S>
        </Button>
        <Button
          variant="outlined"
          sx={{
            width: "200px",
            background: "transparent",
            borderColor: theme[mode].blueDark,
            textTransform: "none",
            borderRadius: "12px",
            height: "40px",
            "@media (max-width: 680px)": {
              width: "100%",
            },
          }}
          onClick={() => onClose()}
        >
          <TextRob16Font1S
            sx={{
              fontSize: "16px",
              fontWeight: "500",
              color: theme[mode].blueDark,
            }}
          >
            {t("companyRegister.cancel")}
          </TextRob16Font1S>
        </Button>
      </Box>
    </Stack>
  );
};
