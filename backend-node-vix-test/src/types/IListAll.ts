import { user } from "@prisma/client";
import { TQuery } from "./validations/Queries/queryListAll";
import { TQueryVM } from "./validations/VM/vmListAll";

export interface IListAll {
  idBrandMaster?: number | undefined | null;
  query: TQuery;
}

export interface IListAllVM {
  idBrandMaster?: number | undefined | null;
  query: TQueryVM;
  user: user;
}
