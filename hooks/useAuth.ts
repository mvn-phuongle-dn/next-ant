import { useRouter } from "next/router";

import authCore from "../api/auth.api";
import { AuthPathsEnum } from "../constants/auth/auth.paths";
import { PermissionEnum } from "../constants/permissions.scopes";
import { clearTokens, saveTokens } from "../helpers/auth.helpers";

const useAuth = () => {
  const router = useRouter();

  const login = async (email: string, password: string) => {
    const res = await authCore.login({ email, password });
    if (res?.data?.token) {
      saveTokens({ token: res.data.token });
      router.push("/");
      return res;
    }
  };

  const logout = () => {
    clearTokens();
    router.push(AuthPathsEnum.login);
  };

  return {
    login,
    logout,
    auth: {
      name: "User",
      permissions: [PermissionEnum.ADMINISTRATOR],
    },
  };
};

export default useAuth;
