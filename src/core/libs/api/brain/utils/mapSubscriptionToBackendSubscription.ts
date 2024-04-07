import type { BrainRoleType } from "~/app/[locale]/library/[brainId]/BrainManagementTabs/components/PeopleTab/BrainUsers/types";

import type { Subscription } from "../brain";

export type BackendSubscription = { email: string; rights: BrainRoleType };

export const mapSubscriptionToBackendSubscription = (
  subscription: Subscription,
): BackendSubscription => ({
  email: subscription.email,
  rights: subscription.role,
});
