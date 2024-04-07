import type { BrainRoleType } from "~/app/[locale]/library/[brainId]/BrainManagementTabs/components/PeopleTab/BrainUsers/types";

import type { SubscriptionUpdatableProperties } from "../types";

type BackendSubscriptionUpdatableProperties = {
  rights: BrainRoleType | null;
};
export const mapSubscriptionUpdatablePropertiesToBackendSubscriptionUpdatableProperties =
  (
    subscriptionUpdatableProperties: SubscriptionUpdatableProperties,
  ): BackendSubscriptionUpdatableProperties => ({
    rights: subscriptionUpdatableProperties.role,
  });
