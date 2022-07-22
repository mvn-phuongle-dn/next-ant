import useSWR from "swr";

import { convertApiParams } from "../helpers/api.helpers";
import usersCore from "../api/users.api";
import { User, GetUsersParam } from "../types/users.type";

import useSearchParams from "./useSearchParams";

const useUsers = () => {
  const { search } = useSearchParams<GetUsersParam>();
  const { data, error } = useSWR(
    [
      "https://reqres.in/api/users?page=1",
      convertApiParams({
        page: search.page,
        pageSize: search?.pageSize,
        search: search?.search,
      }),
    ],
    usersCore.getUsersApi
  );
  
  return {
    users: data?.data as User[],
    isLoading: !error && !data,
    isError: error,
    pagination: {
      page: search.page,
      pageSize: search?.pageSize,
      total: data?.total,
    },
  };
};

export default useUsers;
