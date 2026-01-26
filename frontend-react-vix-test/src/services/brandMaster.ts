import { retryRequest } from "./api";

export interface CreateBrandMasterPayload {
  brandName: string;
  cnpj: string;
  corporateName: string;
  stateRegistration?: string;
  municipalRegistration?: string;
  phone: string;
  email: string;
  cep: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  contractNumber: string;
  isPoc: boolean;
}

export interface BrandMaster {
  id: string;
  brandName: string;
  cnpj: string;
  corporateName: string;
  stateRegistration?: string;
  municipalRegistration?: string;
  phone: string;
  email: string;
  cep: string;
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  contractNumber: string;
  isPoc: boolean;
  createdAt: string;
  updatedAt: string;
}

export const createBrandMasterApi = async (
  payload: CreateBrandMasterPayload
): Promise<BrandMaster> => {
  const token = localStorage.getItem("@vixtest:token");
  const auth = token ? { Authorization: `Bearer ${token}` } : {};

  const response = await retryRequest<BrandMaster>({
    method: "POST",
    url: "/brand-master",
    data: payload,
    auth,
  });

  if (response.error) {
    throw new Error(response.message);
  }

  return response.data;
};

export const getBrandMastersApi = async (): Promise<BrandMaster[]> => {
  const token = localStorage.getItem("@vixtest:token");
  const auth = token ? { Authorization: `Bearer ${token}` } : {};

  const response = await retryRequest<BrandMaster[]>({
    method: "GET",
    url: "/brand-master",
    auth,
  });

  if (response.error) {
    throw new Error(response.message);
  }

  return response.data;
};

export const updateBrandMasterApi = async (
  id: string,
  payload: Partial<CreateBrandMasterPayload>
): Promise<BrandMaster> => {
  const token = localStorage.getItem("@vixtest:token");
  const auth = token ? { Authorization: `Bearer ${token}` } : {};

  const response = await retryRequest<BrandMaster>({
    method: "PUT",
    url: `/brand-master/${id}`,
    data: payload,
    auth,
  });

  if (response.error) {
    throw new Error(response.message);
  }

  return response.data;
};

export const deleteBrandMasterApi = async (id: string): Promise<void> => {
  const token = localStorage.getItem("@vixtest:token");
  const auth = token ? { Authorization: `Bearer ${token}` } : {};

  const response = await retryRequest<void>({
    method: "DELETE",
    url: `/brand-master/${id}`,
    auth,
  });

  if (response.error) {
    throw new Error(response.message);
  }
};