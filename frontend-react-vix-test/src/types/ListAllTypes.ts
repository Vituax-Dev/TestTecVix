export interface IListAll<T> {
  totalCount: number;
  result: T[];
}

export interface IParams {
  status?: string;
  page?: number;
  limit?: number;
  search?: string;
  orderBy?: string; // field_name:asc or field_name:desc
  idBrandMaster?: number | "null";
  idCompany?: number | "null";
}
