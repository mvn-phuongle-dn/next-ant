import useSWR from "swr";

import { convertApiParams } from "../helpers/api.helpers";
import usersCore from "../api/users.api";
import { User } from "../types/users.type";

const useUser = (id: any) => {
  const { data, error } = useSWR(
    id && `https://reqres.in/api/users/${id}`,
    usersCore.getUserApi
  );

  return {
    user: data as User,
    isLoading: !!id && !error && !data,
    isError: error,
  };
};

export default useUser;
