import { api } from "./api";
import { IUserList } from "../pages/UserRegister";

export interface ICreateUserDTO {
  username: string;
  email: string;
  password?: string; 
  role: string; 
  isActive: boolean;
  idBrandMaster: number;
  fullName?: string;
  phone?: string;
  position?: string;
  department?: string;
  hiringDate?: string;
}

const BASE_URL = "/users";

const getAll = async () => {
  const response = await api.get<IUserList[]>({ url: BASE_URL });
  return response;
};

const create = async (payload: ICreateUserDTO) => {
  const response = await api.post({ url: BASE_URL, data: payload });
  return response;
};

const update = async (id: string, payload: Partial<ICreateUserDTO>) => {
  const response = await api.put({ url: `${BASE_URL}/${id}`, data: payload });
  return response;
};

const remove = async (id: string) => {
  const response = await api.delete({ url: `${BASE_URL}/${id}` });
  return response;
};

export const userService = {
  getAll,
  create,
  update,
  remove,
};
