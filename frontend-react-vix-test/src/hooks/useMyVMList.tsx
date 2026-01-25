import { useState } from "react";
import { api } from "../services/api";
import { IListAll } from "../types/ListAllTypes";
import { toast } from "react-toastify";
import { IVMCreatedResponse } from "../types/VMTypes";

export const useMyVMList = () => {
  const [isLoading, setIsLoading] = useState(false);

  const fetchMyVmsList = async (
    params: {
      status?: string;
      page?: number;
      limit?: number;
      search?: string;
      orderBy?: string;
      idBrandMaster?: number | null;
    } = {},
  ) => {
    setIsLoading(true);
    const response = await api.get<IListAll<IVMCreatedResponse>>({
      url: "/vm",
      params: {
        ...params,
        idBrandMaster: params.idBrandMaster === null ? "null" : params.idBrandMaster,
      },
    });

    setIsLoading(false);
    if (response.error) {
      toast.error(response.message);
      return { totalCount: 0, vmList: [] };
    }

    const vmList = response.data?.result;
    const totalCount = parseInt(response.data?.totalCount?.toString());
    return { totalCount, vmList };
  };

  return { isLoading, fetchMyVmsList };
};
