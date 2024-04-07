/* eslint-disable max-lines */

import { useState } from "react";
import axios, { type AxiosResponse } from "axios";
import { useTranslations } from "next-intl";

import type { BrainRoleAssignation } from "~/app/[locale]/library/[brainId]/BrainManagementTabs/components/PeopleTab/BrainUsers/types";
import { generateBrainAssignation } from "~/app/[locale]/library/[brainId]/BrainManagementTabs/components/PeopleTab/BrainUsers/utils/generateBrainAssignation";
import type { Subscription } from "~/core/libs/api/brain/brain";
import { useBrainApi } from "~/core/libs/api/brain/useBrainApi";
import { useToast } from "~/core/libs/hooks";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useShareBrain = (brainId: string) => {
  const [sendingInvitation, setSendingInvitation] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [roleAssignations, setRoleAssignation] = useState<
    BrainRoleAssignation[]
  >([generateBrainAssignation()]);
  const t = useTranslations("brain");

  const baseUrl = window.location.origin;
  const brainShareLink = `${baseUrl}/invite/${brainId}`;

  const { publish } = useToast();
  const { addBrainSubscriptions } = useBrainApi();

  const handleCopyInvitationLink = async () => {
    await navigator.clipboard.writeText(brainShareLink);
    publish({
      variant: "success",
      text: t("copiedToClipboard", { ns: "brain" }),
    });
  };

  const removeRoleAssignation = (assignationIndex: number) => () => {
    if (roleAssignations.length === 1) {
      return;
    }
    setRoleAssignation(
      roleAssignations.filter((_, index) => index !== assignationIndex),
    );
  };

  const updateRoleAssignation =
    (rowIndex: number) => (data: BrainRoleAssignation) => {
      const concernedRow = roleAssignations[rowIndex];

      if (concernedRow !== undefined) {
        setRoleAssignation(
          roleAssignations.map((row, index) => {
            if (index === rowIndex) {
              return data;
            }

            return row;
          }),
        );
      } else {
        setRoleAssignation([...roleAssignations, data]);
      }
    };

  const inviteUsers = async (): Promise<void> => {
    setSendingInvitation(true);
    try {
      const inviteUsersPayload: Subscription[] = roleAssignations
        .filter(({ email }) => email !== "")
        .map((assignation) => ({
          email: assignation.email,
          role: assignation.role,
        }));

      await addBrainSubscriptions(brainId, inviteUsersPayload);

      publish({
        variant: "success",
        text: t("usersInvited", { ns: "brain" }),
      });

      setIsShareModalOpen(false);
      setRoleAssignation([generateBrainAssignation()]);
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
          text: t("errorSendingInvitation"),
        });
      }
    } finally {
      setSendingInvitation(false);
    }
  };

  const addNewRoleAssignationRole = () => {
    setRoleAssignation([...roleAssignations, generateBrainAssignation()]);
  };
  const canAddNewRow =
    roleAssignations.length === 0 ||
    roleAssignations.filter((invitingUser) => invitingUser.email === "")
      .length === 0;

  return {
    roleAssignations,
    brainShareLink,
    handleCopyInvitationLink,
    updateRoleAssignation,
    removeRoleAssignation,
    inviteUsers,
    addNewRoleAssignationRole,
    sendingInvitation,
    setIsShareModalOpen,
    isShareModalOpen,
    canAddNewRow,
  };
};
