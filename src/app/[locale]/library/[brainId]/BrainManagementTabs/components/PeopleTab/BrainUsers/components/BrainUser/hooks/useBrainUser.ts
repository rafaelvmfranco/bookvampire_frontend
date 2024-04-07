import { useState } from "react";
import { useTranslations } from "next-intl";

import { useBrainApi } from "~/core/libs/api/brain/useBrainApi";
import { useBrainContext } from "~/core/libs/context/BrainProvider/hooks/useBrainContext";
import { getAxiosErrorParams } from "~/core/libs/helpers/getAxiosErrorParams";
import { useToast } from "~/core/libs/hooks";

import type { BrainRoleType } from "../../../types";

type UseBrainUserProps = {
  fetchBrainUsers: () => Promise<void>;
  role: BrainRoleType;
  brainId: string;
  email: string;
};
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useBrainUser = ({
  brainId,
  fetchBrainUsers,
  role,
  email,
}: UseBrainUserProps) => {
  const { updateBrainAccess } = useBrainApi();
  const { publish } = useToast();
  const [selectedRole, setSelectedRole] = useState<BrainRoleType>(role);
  const [isRemovingAccess, setIsRemovingAccess] = useState(false);
  const { currentBrain } = useBrainContext();
  const t = useTranslations("brain");
  const updateSelectedRole = async (newRole: BrainRoleType) => {
    setSelectedRole(newRole);
    try {
      await updateBrainAccess(brainId, email, {
        role: newRole,
      });
      publish({
        variant: "success",
        text: t("userRoleUpdated", {
          email: email,
          role: newRole,
          ns: "brain",
        }),
      });
      void fetchBrainUsers();
    } catch (e) {
      const axiosError = getAxiosErrorParams(e);
      if (axiosError !== undefined && axiosError.status === 403) {
        publish({
          variant: "danger",
          text: axiosError.message,
        });
      } else {
        publish({
          variant: "danger",
          text: t("userRoleUpdateFailed", {
            email: email,
            role: newRole,
            ns: "brain",
          }),
        });
      }
    }
  };
  const removeUserAccess = async () => {
    setIsRemovingAccess(true);
    try {
      await updateBrainAccess(brainId, email, {
        role: null,
      });
      publish({
        variant: "success",
        text: t("userRemoved", { email: email, ns: "brain" }),
      });
      void fetchBrainUsers();
    } catch (e) {
      const axiosError = getAxiosErrorParams(e);
      if (axiosError !== undefined) {
        publish({
          variant: "danger",
          text: axiosError.message,
        });
      } else {
        publish({
          variant: "danger",
          text: t("userRemoveFailed", { email: email, ns: "brain" }),
        });
      }
    } finally {
      setIsRemovingAccess(false);
    }
  };
  const canRemoveAccess = currentBrain?.role === "Owner";

  return {
    isRemovingAccess,
    removeUserAccess,
    updateSelectedRole,
    selectedRole,
    canRemoveAccess,
  };
};
