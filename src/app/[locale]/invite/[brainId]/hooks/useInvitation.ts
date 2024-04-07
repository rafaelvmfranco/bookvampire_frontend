/* eslint-disable max-lines */
"use client";

import type { UUID } from "node:crypto";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios, { type AxiosResponse } from "axios";
import { useTranslations } from "next-intl";

import type { BrainRoleType } from "~/app/[locale]/library/[brainId]/BrainManagementTabs/components/PeopleTab/BrainUsers/types";
import { useSubscriptionApi } from "~/core/libs/api/subscription/useSubscriptionApi";
import { useBrainContext } from "~/core/libs/context/BrainProvider/hooks/useBrainContext";
import { useToast } from "~/core/libs/hooks";
import { useEventTracking } from "~/data/services/analytics/june/useEventTracking";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useInvitation = () => {
  const t = useTranslations("invitation");
  const params = useParams();
  const brainId = params?.brainId as UUID | undefined;
  const [isLoading, setIsLoading] = useState(false);
  const [brainName, setBrainName] = useState<string>("");
  const [role, setRole] = useState<BrainRoleType | undefined>();
  const [isProcessingRequest, setIsProcessingRequest] = useState(false);

  const { publish } = useToast();
  const { track } = useEventTracking();
  const { getInvitation, acceptInvitation, declineInvitation } =
    useSubscriptionApi();

  if (brainId === undefined) {
    throw new Error("Brain ID undefined, possibly is missing");
  }

  const { fetchAllBrains, setCurrentBrainId } = useBrainContext();
  const router = useRouter();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    setIsLoading(true);

    const checkInvitationValidity = async () => {
      try {
        const { name, role: assignedRole } = await getInvitation(brainId);
        setBrainName(name);
        setRole(assignedRole);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          publish({
            variant: "warning",
            text: t("invitationNotFound", { ns: "invitation" }),
          });
        } else {
          publish({
            variant: "danger",
            text: t("errorCheckingInvitation", { ns: "invitation" }),
          });
        }
        router.push("/");
      } finally {
        setIsLoading(false);
      }
    };
    void checkInvitationValidity();
  }, [brainId]);

  const handleAccept = async () => {
    setIsProcessingRequest(true);
    try {
      await acceptInvitation(brainId);
      void track("INVITATION_ACCEPTED");

      await fetchAllBrains();
      publish({
        variant: "success",
        text: t("accept", { ns: "invitation" }),
      });
      setCurrentBrainId(brainId);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data !== undefined) {
        publish({
          variant: "danger",
          text: (
            error.response as AxiosResponse<{
              detail: string;
            }>
          ).data.detail,
        });
      } else {
        console.error("Error calling the API:", error);
        publish({
          variant: "danger",
          text: t("errorAccepting", { ns: "invitation" }),
        });
      }
    } finally {
      setIsProcessingRequest(false);
      void router.push("/chat");
    }
  };

  const handleDecline = async () => {
    setIsProcessingRequest(true);
    try {
      await declineInvitation(brainId);
      publish({
        variant: "success",
        text: t("declined", { ns: "invitation" }),
      });
      void track("INVITATION_DECLINED");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data !== undefined) {
        publish({
          variant: "danger",
          text: (
            error.response as AxiosResponse<{
              detail: string;
            }>
          ).data.detail,
        });
      } else {
        publish({
          variant: "danger",
          text: t("errorDeclining", { ns: "invitation" }),
        });
      }
    } finally {
      setIsProcessingRequest(false);
      void router.push("/chat");
    }
  };

  return {
    handleAccept,
    handleDecline,
    brainName,
    role,
    isLoading,
    isProcessingRequest,
  };
};
