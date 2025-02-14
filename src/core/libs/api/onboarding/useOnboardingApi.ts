import { useAxios } from "~/core/libs/hooks";
import type { Onboarding } from "~/core/libs/types/Onboarding";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useOnboardingApi = () => {
  const { axiosInstance } = useAxios();
  const getOnboarding = async () => {
    return (await axiosInstance.get<Onboarding>("/onboarding")).data;
  };
  const updateOnboarding = async (onboarding: Partial<Onboarding>) => {
    return (await axiosInstance.put<Onboarding>("/onboarding", onboarding))
      .data;
  };

  return {
    getOnboarding,
    updateOnboarding,
  };
};
