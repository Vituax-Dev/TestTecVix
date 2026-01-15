import { useState, useEffect } from "react";
import { useAuth } from "./useAuth";
import { api } from "../services/api";
import { IListAll } from "../types/ListAllTypes";
import { IUserResponse } from "../types/userTypes";

interface UseListUsersWithPaginationParams {
  page: number;
  limit: number;
}

export const useListUsersWithPagination = ({
  page,
  limit,
}: UseListUsersWithPaginationParams) => {
  const [userList, setUserList] = useState<IUserResponse[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { getAuth } = useAuth();

  const fetchUsers = async () => {
    const auth = await getAuth();
    setIsLoading(true);
    const response = await api.get<IListAll<IUserResponse>>({
      url: "/user",
      auth,
      params: {
        page,
        limit,
        orderBy: "lastLoginDate:desc",
      },
    });
    setIsLoading(false);

    if (response.error) {
      setUserList([]);
      setTotalCount(0);
      return;
    }

    setUserList(response.data?.result || []);
    setTotalCount(response.data?.totalCount || 0);
  };

  useEffect(() => {
    fetchUsers();
  }, [page, limit]);

  return {
    isLoading,
    userList,
    totalCount,
    fetchUsers,
  };
};
