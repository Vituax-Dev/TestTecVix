import { useEffect, useState } from "react";
import { api } from "../services/api";
import { IListAll } from "../types/ListAllTypes";
import { toast } from "react-toastify";
import { useLogin } from "./useLogin";
import { useAuth } from "./useAuth";
import { useZGlobalVar } from "../stores/useZGlobalVar";
import { useZUserProfile } from "../stores/useZUserProfile";
import { IVMCreatedResponse } from "../types/VMTypes";

export const useListVms = () => {
  const [vmList, setVmList] = useState<IVMCreatedResponse[]>([]);
  const [vmTotalCount, setVmTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const {
    setCurrentIdVM,
    currentIdVM,
    setCurrentVMName,
    setTotalCountVMs,
    setCurrentVMOS,
    setCurrentVMStatus,
  } = useZGlobalVar();
  const { idBrand } = useZUserProfile();
  const { goLogout } = useLogin();
  const { getAuth } = useAuth();

  const fetchListVms = async (
    params: {
      status?: string;
      page?: number;
      limit?: number;
      search?: string;
      idBrandMaster?: number;
    } = {},
  ) => {
    const auth = await getAuth();
    setIsLoading(true);
    const response = await api.get<IListAll<IVMCreatedResponse>>({
      url: "/vm",
      auth,
      params: {
        ...params,
        //status: "PAUSED", // "RUNNING", "STOPPED", "PAUSED", "null", undefined
      },
    });

    setIsLoading(false);
    if (response.error) {
      if (!response.message.includes("expired")) toast.error(response.message);
      setVmList([]);
      setVmTotalCount(0);
      setTotalCountVMs(0);
      goLogout();
      return;
    }

    setVmList(response.data?.result);
    setVmTotalCount(response.data?.totalCount);
    setTotalCountVMs(response.data?.totalCount);

    // Seleciona automaticamente a primeira VM RUNNING, ou a primeira da lista
    if (!currentIdVM && response.data?.result.length) {
      const vms = response.data.result;
      // Busca a primeira VM com status RUNNING
      const firstRunningVM = vms.find((vm) => vm.status === "RUNNING");
      // Se não encontrar nenhuma RUNNING, usa a primeira da lista
      const selectedVM = firstRunningVM || vms[0];
      
      setCurrentIdVM(selectedVM.idVM);
      setCurrentVMName(selectedVM.vmName);
      setCurrentVMOS(selectedVM.os);
      setCurrentVMStatus(selectedVM.status as "RUNNING" | "STOPPED" | "PAUSED" | null);
    }
  };

  useEffect(() => {
    fetchListVms({ idBrandMaster: idBrand, limit: 20 });
  }, []);

  return { vmList, vmTotalCount, isLoading, fetchListVms };
};
