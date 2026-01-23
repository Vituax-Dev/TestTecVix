import { useEffect, useState, useCallback, useRef } from "react";
import axios from "axios";
import { api, ApiError } from "../services/api";
import { toast } from "react-toastify";
import { useLogin } from "./useLogin";
import { useZGlobalVar } from "../stores/useZGlobalVar";
import { useZUserProfile } from "../stores/useZUserProfile";
import { IVMCreatedResponse } from "../types/VMTypes";
import { IListAll, IParams } from "../types/ListAllTypes";

const DEFAULT_LIMIT = 20;

export const useListVms = () => {
  const [vmList, setVmList] = useState<IVMCreatedResponse[]>([]);
  const [vmTotalCount, setVmTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const abortControllerRef = useRef<AbortController | null>(null);
  const filtersRef = useRef<IParams>({ limit: DEFAULT_LIMIT, page: 1 });
  
  const {
    setCurrentIdVM,
    currentIdVM,
    setCurrentVMName,
    setCurrentVMOS,
    setTotalCountVMs,
  } = useZGlobalVar();

  const { idBrand } = useZUserProfile();
  const { goLogout } = useLogin();

  const fetchListVms = useCallback(async (
    params: IParams = {}
  ) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;

    const finalParams = { ...filtersRef.current, ...params };
    filtersRef.current = finalParams;

    if (params.page) setCurrentPage(params.page);

    setIsLoading(true);

    try {
      const queryParams = {
        ...finalParams,
        idBrandMaster: finalParams.idBrandMaster ?? idBrand ?? undefined,
      };

      Object.keys(queryParams).forEach((key) => {
        const k = key as keyof typeof queryParams;
        if (queryParams[k] === undefined || queryParams[k] === "") {
          delete queryParams[k];
        }
      });

      const response = await api.get<IListAll<IVMCreatedResponse>>({
        url: "/vm",
        params: queryParams,
        signal: controller.signal,
      });

      if (response.error) {
        throw new ApiError(response.message, response.statusCode);
      }

      const data = response.data;
      const results = data.result || [];
      const total = data.totalCount || 0;

      setVmList(results);
      setVmTotalCount(total);
      const limit = finalParams.limit || DEFAULT_LIMIT;
      setTotalPages(limit > 0 ? Math.ceil(total / limit) : 0);
      setTotalCountVMs(total);

      if (results.length > 0 && !currentIdVM) {
        const first = results[0];
        setCurrentIdVM(first.idVM);
        setCurrentVMName(first.vmName);
        setCurrentVMOS(first.os);
      } else if (results.length === 0) {
        setCurrentIdVM(null);
        setCurrentVMName(null);
        setCurrentVMOS(null);
      }

    } catch (error: unknown) {
      if (axios.isCancel(error) || (error instanceof Error && error.name === "AbortError")) {
        return;
      }

      let msg = "Unknown error while searching for VMs.";

      if (error instanceof ApiError) {
        msg = error.message;
        if (error.statusCode === 401 || error.statusCode === 403) {
          goLogout();
          return;
        }
      } else if (error instanceof Error) {
        msg = error.message;
      }

      if (!msg.includes("canceled") && !msg.includes("Network Error")) {
        toast.error(msg);
      }

      setVmList([]);
      setVmTotalCount(0);

    } finally {
      if (abortControllerRef.current === controller) {
        setIsLoading(false);
      }
    }
  }, [idBrand, goLogout, currentIdVM, setCurrentIdVM, setCurrentVMName, setCurrentVMOS, setTotalCountVMs]);


  const refreshList = useCallback(() => {
    fetchListVms();
  }, [fetchListVms]);

  const changePage = useCallback((newPage: number) => {
    fetchListVms({ page: newPage });
  }, [fetchListVms]);

  const handleSearch = useCallback((term: string) => {
    fetchListVms({ search: term, page: 1 });
  }, [fetchListVms]);

  useEffect(() => {
    fetchListVms();
    return () => {
      if (abortControllerRef.current) abortControllerRef.current.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    vmList,
    vmTotalCount,
    isLoading,
    currentPage,
    totalPages,
    refreshList,
    changePage,
    handleSearch,
  };
};