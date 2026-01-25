import { TQuery } from "./validations/Queries/queryListAll";
import { TQueryVM } from "./validations/VM/vmListAll";
import { TQueryUser } from "./validations/User/userListAll";

export interface IListAll {
  idBrandMaster?: number | undefined | null;
  query: TQuery;
}

export interface IListAllVM {
  idBrandMaster?: number | undefined | null;
  query: TQueryVM;
}

export interface IListAllUser {
  idBrandMaster?: number | undefined | null;
  query: TQueryUser;
}
