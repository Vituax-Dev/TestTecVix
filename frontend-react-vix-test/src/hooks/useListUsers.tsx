import { useState } from "react";
import { useAuth } from "./useAuth";
import { api } from "../services/api";
import { IListAll } from "../types/ListAllTypes";
import { IUserResponse } from "../types/userTypes";

export const useListUsers = () => {
  const [userList, setUserList] = useState<IUserResponse[]>([]);
  const [userTotalCount, setUserTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { getAuth } = useAuth();

  const fetchListUsers = async () => {
    const auth = await getAuth();
    setIsLoading(true);
    const response = await api.get<IListAll<IUserResponse>>({
      url: "/user/access",
      auth,
      params: {
        orderBy: "lastLoginDate:desc",
        isActive: "true",
        limit: 5,
      },
    });

    setIsLoading(false);

    if (response.error) {
      setUserList([]);
      setUserTotalCount(0);
      return;
    }

    setUserList(response.data?.result);
    setUserTotalCount(response.data?.totalCount);
  };

  return {
    isLoading,
    userList,
    userTotalCount,
    fetchListUsers,
  };
};
