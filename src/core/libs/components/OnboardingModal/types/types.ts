import type { CompanySize } from "~/core/libs/api/user/user";

export type OnboardingProps = {
  username: string;
  companyName: string;
  companySize: CompanySize;
  usagePurpose: string;
};
