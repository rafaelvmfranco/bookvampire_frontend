import { useAxios } from "~/core/libs/hooks";

import {
  getUser,
  getUserIdentity,
  updateUserIdentity,
  type UserIdentityUpdatableProperties,
} from "./user";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useUserApi = () => {
  const { axiosInstance } = useAxios();

  return {
    updateUserIdentity: async (
      userIdentityUpdatableProperties: UserIdentityUpdatableProperties,
    ) => updateUserIdentity(userIdentityUpdatableProperties, axiosInstance),
    getUserIdentity: async () => getUserIdentity(axiosInstance),
    getUser: async () => getUser(axiosInstance),
  };
};
