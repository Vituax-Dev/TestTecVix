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

    const vms = response.data?.result || [];
    
    // SEMPRE verifica se a VM selecionada ainda existe e está RUNNING
    if (currentIdVM) {
      // Busca a VM atualmente selecionada na lista
      const currentVM = vms.find((vm) => vm.idVM === currentIdVM);
      
      if (currentVM && currentVM.status === "RUNNING") {
        // VM existe e está RUNNING - atualiza dados (nome pode ter mudado)
        setCurrentVMName(currentVM.vmName);
        setCurrentVMOS(currentVM.os);
        setCurrentVMStatus(currentVM.status as "RUNNING" | "STOPPED" | "PAUSED" | null);
      } else {
        // VM não existe, foi excluída ou não está RUNNING
        // Busca a próxima VM RUNNING
        const nextRunningVM = vms.find((vm) => vm.status === "RUNNING");
        
        if (nextRunningVM) {
          setCurrentIdVM(nextRunningVM.idVM);
          setCurrentVMName(nextRunningVM.vmName);
          setCurrentVMOS(nextRunningVM.os);
          setCurrentVMStatus(nextRunningVM.status as "RUNNING" | "STOPPED" | "PAUSED" | null);
        } else if (vms.length > 0) {
          // Nenhuma VM RUNNING, seleciona a primeira (parada)
          const firstVM = vms[0];
          setCurrentIdVM(firstVM.idVM);
          setCurrentVMName(firstVM.vmName);
          setCurrentVMOS(firstVM.os);
          setCurrentVMStatus(firstVM.status as "RUNNING" | "STOPPED" | "PAUSED" | null);
        } else {
          // Nenhuma VM disponível
          setCurrentIdVM(null);
          setCurrentVMName(null);
          setCurrentVMOS(null);
          setCurrentVMStatus(null);
        }
      }
    } else if (vms.length > 0) {
      // Não tinha VM selecionada - seleciona a primeira RUNNING
      const firstRunningVM = vms.find((vm) => vm.status === "RUNNING");
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
