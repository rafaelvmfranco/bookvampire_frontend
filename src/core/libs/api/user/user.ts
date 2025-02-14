import type { UUID } from "node:crypto";
import type { AxiosInstance } from "axios";

import type { UserStats } from "~/core/libs/types/User";

export enum CompanySize {
  One = "1-10",
  Two = "10-25",
  Three = "25-50",
  Four = "50-100",
  Five = "100-500",
  Six = "500-1000",
  Seven = "1000-5000",
  Eight = "+5000",
}

export enum UsagePurpose {
  Business = "Business",
  NGO = "NGO",
  Personal = "Personal",
  Student = "Student",
  Teacher = "Teacher",
}

export type UserIdentityUpdatableProperties = {
  username: string;
  company?: string;
  onboarded: boolean;
  company_size?: CompanySize;
  usage_purpose?: UsagePurpose;
};

export type UserIdentity = {
  user_id: UUID;
  onboarded: boolean;
  username: string;
};

export const updateUserIdentity = async (
  userUpdatableProperties: UserIdentityUpdatableProperties,
  axiosInstance: AxiosInstance,
): Promise<UserIdentity> =>
  axiosInstance.put("/user/identity", userUpdatableProperties);

export const getUserIdentity = async (
  axiosInstance: AxiosInstance,
): Promise<UserIdentity> => {
  const { data } = await axiosInstance.get<UserIdentity>("/user/identity");

  return data;
};

export const getUser = async (
  axiosInstance: AxiosInstance,
): Promise<UserStats> => (await axiosInstance.get<UserStats>("/user")).data;
