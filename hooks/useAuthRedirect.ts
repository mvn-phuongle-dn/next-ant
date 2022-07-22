import { useRouter } from "next/router";
import { useEffect } from "react";
import { AuthPathsEnum } from "../constants/auth/auth.paths";
import { getTokens } from "../helpers/auth.helpers";

export const useAuthRedirect = (isNeedAuthen?: boolean) => {
  const router = useRouter();
  const getToken = !!getTokens().accessToken;
  useEffect(() => {
    if (isNeedAuthen) {
      !getToken && router.push(AuthPathsEnum.login);
    } else {
      getToken && router.push("/");
    }
  }, [getToken, isNeedAuthen, router]);
  return null;
};
