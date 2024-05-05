import { authKey } from "@/constant/constant";
import { decodedToken } from "@/utils/jwt";
import {
  getLocalStorageUserInfo,
  removedUserInfo,
  setLocalStorage,
} from "@/utils/local-storage";

export const storeUserInfo = ({ accessToken }: { accessToken: string }) => {
  return setLocalStorage(authKey, accessToken);
};

export const getUserInfo = () => {
  const authToken = getLocalStorageUserInfo(authKey);
  if (authToken) {
    const decodedData: any = decodedToken(authToken);
    return {
      ...decodedData,
      role: decodedData?.role.toLowerCase(),
    };
  }
};

export const isLoggedIn = () => {
  const authToken = getLocalStorageUserInfo(authKey);
  if (authToken) {
    return !!authToken;
  }
};

export const removedUser = () => {
  return removedUserInfo(authKey);
};
