import { useState } from "react";
import { useAuth } from "./useAuth";
import { api } from "../services/api";
import { IListAll, IParams } from "../types/ListAllTypes";
import { IVMBackup } from "../types/VMTypes";
import { toast } from "react-toastify";

export const useVMBackupResource = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingCreate, setIsLoadingCreate] = useState(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
  const { getAuth } = useAuth();

  const listAllBackupsFromThisVM = async (
    idVM: number,
    params: IParams = {},
  ) => {
    const auth = await getAuth();
    setIsLoading(true);
    const response = await api.get<IListAll<IVMBackup>>({
      url: "/vm-backup",
      auth,
      params: {
        ...params,
        idVM,
      },
    });

    setIsLoading(false);
    if (response.error) {
      toast.error(response.message);
      return { totalCount: 0, vmList: [] };
    }

    const backups = response.data?.result;
    const totalCount = parseInt(response.data?.totalCount?.toString());
    return { totalCount, backups };
  };

  const restoreThisBackup = async (idVMBackup: number) => {
    const auth = await getAuth();
    setIsLoadingUpdate(true);
    const response = await api.put<IVMBackup>({
      url: `/vm-backup/restore/${idVMBackup}`,
      auth,
      data: { isRestored: true },
    });
    setIsLoadingUpdate(false);
    if (response.error) {
      toast.error(response.message);
      return;
    }
    return response.data;
  };

  const createBackup = async (idVM: number) => {
    const auth = await getAuth();
    setIsLoadingCreate(true);
    const response = await api.post<IVMBackup>({
      url: `/vm-backup`,
      auth,
      data: { idVM },
    });
    setIsLoadingCreate(false);
    if (response.error) {
      toast.error(response.message);
      return;
    }
    return response.data;
  };

  return {
    isLoading,
    listAllBackupsFromThisVM,
    isLoadingCreate,
    isLoadingUpdate,
    restoreThisBackup,
    createBackup,
    // isLoadingDelete,
  };
};
