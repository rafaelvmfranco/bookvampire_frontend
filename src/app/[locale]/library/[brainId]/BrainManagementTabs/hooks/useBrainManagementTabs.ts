import type { UUID } from "node:crypto";
import { useState } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import { useSubscriptionApi } from "~/core/libs/api/subscription/useSubscriptionApi";
import { useBrainContext } from "~/core/libs/context/BrainProvider/hooks/useBrainContext";
import { useToast } from "~/core/libs/hooks";
import { useEventTracking } from "~/data/services/analytics/june/useEventTracking";

import { getBrainPermissions } from "../utils/getBrainPermissions";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useBrainManagementTabs = (customBrainId?: UUID) => {
  const { allBrains } = useBrainContext();
  const [
    isDeleteOrUnsubscribeRequestPending,
    setIsDeleteOrUnsubscribeRequestPending,
  ] = useState(false);

  const { track } = useEventTracking();
  const { publish } = useToast();

  const { unsubscribeFromBrain } = useSubscriptionApi();
  const { deleteBrain, setCurrentBrainId, fetchAllBrains } = useBrainContext();
  const [
    isDeleteOrUnsubscribeModalOpened,
    setIsDeleteOrUnsubscribeModalOpened,
  ] = useState(false);
  const router = useRouter();

  const params = useParams();
  const pathname = usePathname();
  const t = useTranslations("deleteOrUnsubscribeFromBrain");
  const brainId = customBrainId ?? (params?.brainId as UUID | undefined);

  const { hasEditRights, isOwnedByCurrentUser } = getBrainPermissions({
    brainId,
    userAccessibleBrains: allBrains,
  });

  const handleUnSubscription = async () => {
    if (brainId === undefined) {
      return;
    }
    await unsubscribeFromBrain(brainId);

    void track("UNSUBSCRIBE_FROM_BRAIN");
    publish({
      variant: "success",
      text: t("successfully_unsubscribed"),
    });
  };

  const handleUnsubscribeOrDeleteBrain = async () => {
    if (brainId === undefined) {
      return;
    }

    setIsDeleteOrUnsubscribeRequestPending(true);
    try {
      if (!isOwnedByCurrentUser) {
        await handleUnSubscription();
      } else {
        await deleteBrain(brainId);
      }
      setCurrentBrainId(null);
      setIsDeleteOrUnsubscribeModalOpened(false);
      void fetchAllBrains();
    } catch (error) {
      console.error("Error deleting brain: ", error);
    } finally {
      if (pathname !== "library") {
        router.push("/library");
      }
      void fetchAllBrains();
      setIsDeleteOrUnsubscribeRequestPending(false);
    }
  };

  return {
    brainId,
    handleUnsubscribeOrDeleteBrain,
    isDeleteOrUnsubscribeModalOpened,
    setIsDeleteOrUnsubscribeModalOpened,
    hasEditRights,
    isOwnedByCurrentUser,
    isDeleteOrUnsubscribeRequestPending,
  };
};
