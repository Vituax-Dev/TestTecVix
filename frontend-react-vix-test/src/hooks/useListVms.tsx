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
      setIsLoading(false);
      return;
    }

    const vmsWithStats = response.data?.result.map((vm: any) => ({
      ...vm,
      cpuUsage: Math.floor(Math.random() * 100),
      ramUsage: Math.floor(Math.random() * 100),
    }));

    
    setVmList(vmsWithStats);
    setVmTotalCount(response.data?.totalCount);
    setTotalCountVMs(response.data?.totalCount);

    if (!currentIdVM && response.data?.result.length) {
      setCurrentIdVM(response.data?.result[0].idVM);
      setCurrentVMName(response.data?.result[0].vmName);
      setCurrentVMOS(response.data?.result[0].os);
    }
  };

  useEffect(() => {
    if (idBrand) {
        fetchListVms({ idBrandMaster: idBrand, limit: 20 });
    }
}, [idBrand]);

  return { vmList, vmTotalCount, isLoading, fetchListVms };
};
