import { useEffect, useState, useCallback, useRef } from "react";
import axios from "axios";
import { api, ApiError } from "../services/api";
import { toast } from "react-toastify";
import { useZGlobalVar } from "../stores/useZGlobalVar";
import { useZUserProfile } from "../stores/useZUserProfile";
import { IVMCreatedResponse } from "../types/VMTypes";
import { IListAll, IParams } from "../types/ListAllTypes";

const DEFAULT_LIMIT = 20;

export const useListVms = () => {
  const [vmList, setVmList] = useState<IVMCreatedResponse[]>([]);
  const [vmTotalCount, setVmTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    setError(null);

    try {
      const queryParams: Record<string, string | number | boolean | null | undefined> = {
        ...finalParams,
        idBrandMaster: idBrand,
      };

      Object.keys(queryParams).forEach((key) => {
        if (queryParams[key] === undefined || queryParams[key] === "" || queryParams[key] === null) {
          delete queryParams[key];
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

      if (setTotalCountVMs) setTotalCountVMs(total);

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

      let msg = "Erro ao buscar VMs.";

      if (error instanceof ApiError) {
        msg = error.message;
      } else if (error instanceof Error) {
        msg = error.message;
      }

      if (!msg.includes("canceled")) {
        toast.error(msg);
      }

      setError(msg);
      setVmList([]);
      setVmTotalCount(0);

    } finally {
      if (abortControllerRef.current === controller) {
        setIsLoading(false);
      }
    }
  }, [
    idBrand,
    currentIdVM,
    setCurrentIdVM,
    setCurrentVMName,
    setCurrentVMOS,
    setTotalCountVMs
  ]);

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
    if (idBrand) {
      fetchListVms();
    }
    return () => {
      if (abortControllerRef.current) abortControllerRef.current.abort();
    };
  }, [fetchListVms, idBrand]);

  return {
    vmList,
    vmTotalCount,
    isLoading,
    error,
    currentPage,
    totalPages,
    refreshList,
    changePage,
    handleSearch,
    fetchListVms, 
  };
};