import { useTranslation } from "react-i18next";
import { api } from "../services/api";
import { useZUserProfile } from "../stores/useZUserProfile";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { passwordRegex, validatePassword } from "../utils/genStrongPass";
import { MIN_PASS_SIZE } from "../configs/contants";

import {
  ENetworkType,
  EVMStatus,
  IVMCreatedResponse,
  IVMResource,
} from "../types/VMTypes";
import { EOS } from "../stores/useZVMSugestion";

enum ETaskLocation {
  bre_barueri = "bre_barueri",
  usa_miami = "usa_miami",
}

export const useVmResource = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingCreateVM, setIsLoadingCreateVM] = useState(false);
  const [isLoadingUpdateVM, setIsLoadingUpdateVM] = useState(false);
  const [isLoadingDeleteVM, setIsLoadingDeleteVM] = useState(false);
  const { t } = useTranslation();
  const { idBrand, role } = useZUserProfile();
  const navigate = useNavigate();

  const osNotFound = {
    idVMISO: 0,
    value: EOS.notFound,
    label: t("generic.notFound"),
    hasTerminal: false,
    hasMonitor: false,
    isoLabelName: t("generic.notFound"),
    isoCode: "",
    hasDiskGraph: false,
    hasCPUGraph: false,
    hasMemoryGraph: false,
    hasNetworkGraph: false,
    hasDiskReadGraph: false,
    hasDiskWriteGraph: false,
    isActive: false,
    supplier: null,
    version: null,
    isRequiredLicense: false,
    category: null,
    priceBRL: 0,
    licenseURL: null,
    description: null,
    logoURL: null,
    imgDemo1: null,
    imgDemo2: null,
    imgDemo3: null,
    arch: null,
    cpuRequirement: null,
    ramRequirement: null,
    diskRequirement: null,
  };

  const storageOptions = [
    {
      value: "ssd",
      label: "SSD",
    },
    {
      value: "hd",
      label: "HD",
    },
  ];

  const localizationOptions: { value: ETaskLocation; label: string }[] = [
    {
      value: ETaskLocation.usa_miami,
      label: t("createVm.usaMiami"),
    },
    {
      value: ETaskLocation.bre_barueri,
      label: t("createVm.brSaoPaulo"),
    },
  ];

  const networkTypeOptions: { value: ENetworkType; label: string }[] = [
    {
      value: ENetworkType.public,
      label: t("createVm.publicNetwork"),
    },
    {
      value: ENetworkType.public_private,
      label: `${t("createVm.publicNetwork")} & ${t("createVm.privateNetwork")}`,
    },
    {
      value: ENetworkType.private,
      label: t("createVm.privateNetwork"),
    },
  ];

  const validPassword = (vmPassword: string) => {
    const isValid = validatePassword(vmPassword, MIN_PASS_SIZE);
    if (isValid) return true;
    const password = vmPassword;
    switch (true) {
      case password.length < MIN_PASS_SIZE:
        toast.error(t("createVm.passwordMinLength"));
        break;
      case passwordRegex.numbers.test(password):
        toast.error(t("createVm.passwordNumberValidation"));
        break;
      case passwordRegex.lowercase.test(password):
        toast.error(t("createVm.passwordLowercaseValidation"));
        break;
      case passwordRegex.uppercase.test(password):
        toast.error(t("createVm.passwordUppercaseValidation"));
        break;
      case passwordRegex.special.test(password):
        toast.error(t("createVm.passwordSpecialValidation"));
        break;
    }
    return false;
  };

  const createVm = async (vm: IVMResource) => {
    setIsLoadingCreateVM(true);

    const response = await api.post<IVMCreatedResponse>({
      url: "/vm",
      data: {
        ...vm,
      },
    });

    if (response.error) {
      toast.error(response.message);
      setIsLoadingCreateVM(false);
      return;
    }
    toast.success(t("createVm.createVmSuccess"));
    setIsLoadingCreateVM(false);
    return navigate("/");
  };

  const updateNameVm = async ({
    idVM,
    vmName,
  }: {
    idVM: number;
    vmName: string;
  }) => {
    const response = await api.put<IVMCreatedResponse>({
      url: `/vm/${idVM}`,
      data: { vmName },
    });
    if (response.error) {
      toast.error(response.message);
      return;
    }

    toast.success(t("createVm.updateVmSuccess"));
    return;
  };

  const updateVMStatus = async ({
    idVM,
    status,
  }: {
    idVM: number;
    status: EVMStatus;
  }) => {
    const response = await api.put<IVMCreatedResponse>({
      url: `/vm/${idVM}`,
      data: { status },
    });
    if (response.error) {
      toast.error(response.message);
      return null;
    }

    return true;
  };

  const updateDiskSizeVm = async ({
    idVM,
    disk,
  }: {
    idVM: number;
    disk: number;
  }) => {
    const response = await api.put<IVMCreatedResponse>({
      url: `/vm/${idVM}`,
      data: { disk },
    });

    if (response.error) {
      toast.error(response.message);
      return;
    }

    toast.success(t("createVm.updateVmSuccess"));
    return;
  };

  const getVMById = async (idVM: number) => {
    setIsLoading(true);
    const response = await api.get<IVMCreatedResponse>({
      url: `/vm/${idVM}`,
      tryRefetch: true,
    });
    setIsLoading(false);
    if (response.error) {
      toast.error(response.message);
      return;
    }

    return response.data;
  };

  const updateVM = async (vm: IVMResource, idVM: number) => {
    setIsLoadingUpdateVM(true);
    const [response] = await Promise.all([
      api.put<IVMCreatedResponse>({
        url: `/vm/${idVM}`,
        data: {
          ...vm,
          idBrandMaster: idBrand,
        },
      }),
    ]);

    setIsLoadingUpdateVM(false);
    if (response.error) {
      toast.error(response.message);
      return;
    }

    toast.success(t("createVm.updateVmSuccess"));
    return;
  };

  const deleteVM = async (idVM: number) => {
    if (role !== "admin") return toast.error(t("generic.errorOlnlyAdmin"));
    if (!idVM) return;
    setIsLoadingDeleteVM(true);
    const response = await api.delete<IVMCreatedResponse>({
      url: `/vm/${idVM}`,
    });
    if (response.error) {
      toast.error(response.message);
      return setIsLoadingDeleteVM(false);
    }

    return true;
  };

  const getOS = ({
    osLabel,
    osValue,
  }: {
    osLabel?: string;
    osValue?: string;
  }) => {
    if (osLabel) {
      return { ...osNotFound, isoLabelName: osLabel, isoCode: osValue };
    }

    if (osValue) {
      return { ...osNotFound, isoLabelName: osLabel, isoCode: osValue };
    }

    return osNotFound;
  };

  const getOSDeletedLabel = (): string => {
    return "";
  };

  const getNetworkType = ({
    networkTypeLabel,
    networkTypeValue,
  }: {
    networkTypeLabel?: string;
    networkTypeValue?: ENetworkType;
  }): { value: ENetworkType; label: string } => {
    if (networkTypeLabel)
      return (
        networkTypeOptions?.find((nt) => nt.label === networkTypeLabel) ||
        networkTypeOptions[0]
      );
    if (networkTypeValue)
      return (
        networkTypeOptions?.find((nt) => nt.value === networkTypeValue) ||
        networkTypeOptions[0]
      );
    return networkTypeOptions[0];
  };

  const getStorageType = (
    storageTypeValue?: string,
  ): { value: string; label: string } => {
    if (storageTypeValue) {
      return (
        storageOptions?.find((st) => st.value === storageTypeValue) ||
        storageOptions[0]
      );
    }
    return storageOptions[0];
  };

  const monitoringVMStatus = async (idVM: number) => {
    const response = await api.get<boolean>({
      url: `/vm/monitoring/status/${idVM}`,
    });
    if (response.error) {
      toast.error(response.message);
      return false;
    }
    return Boolean(response.data);
  };

  return {
    createVm,
    updateNameVm,
    updateDiskSizeVm,
    getVMById,
    updateVM,
    validPassword,
    deleteVM,
    getOS,
    getNetworkType,
    getStorageType,
    storageOptions,
    localizationOptions,
    isLoading,
    networkTypeOptions,
    isLoadingCreateVM,
    isLoadingUpdateVM,
    isLoadingDeleteVM,
    getOSDeletedLabel,
    monitoringVMStatus,
    updateVMStatus,
  };
};
