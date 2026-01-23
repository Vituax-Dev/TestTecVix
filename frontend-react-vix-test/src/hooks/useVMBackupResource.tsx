import { useState } from "react";
import { api } from "../services/api";
import { IListAll, IParams } from "../types/ListAllTypes";
import { IVMBackup } from "../types/VMTypes";
import { toast } from "react-toastify";

export const useVMBackupResource = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingCreate, setIsLoadingCreate] = useState(false);
  const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);

  const listAllBackupsFromThisVM = async (
    idVM: number,
    params: IParams = {},
  ) => {
    setIsLoading(true);
    const response = await api.get<IListAll<IVMBackup>>({
      url: "/vm-backup",
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
    setIsLoadingUpdate(true);
    const response = await api.put<IVMBackup>({
      url: `/vm-backup/restore/${idVMBackup}`,
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
    setIsLoadingCreate(true);
    const response = await api.post<IVMBackup>({
      url: `/vm-backup`,
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
