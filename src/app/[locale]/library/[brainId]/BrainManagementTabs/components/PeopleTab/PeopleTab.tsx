"use client";

import type { UUID } from "node:crypto";

import { BrainUsers } from "~/app/[locale]/library/[brainId]/BrainManagementTabs/components/PeopleTab/BrainUsers/BrainUsers";
import { UserToInvite } from "~/app/[locale]/library/[brainId]/BrainManagementTabs/components/PeopleTab/BrainUsers/components/UserToInvite/UserToInvite";
import { useShareBrain } from "~/core/libs/hooks/useShareBrain";
import QuivrButton from "~/islands/ui/QuivrButton/QuivrButton";

import styles from "./PeopleTab.module.scss";

type ShareBrainModalProps = {
  brainId: UUID;
};

export const PeopleTab = ({ brainId }: ShareBrainModalProps): JSX.Element => {
  const {
    roleAssignations,
    updateRoleAssignation,
    removeRoleAssignation,
    inviteUsers,
    addNewRoleAssignationRole,
    sendingInvitation,
    canAddNewRow,
  } = useShareBrain(brainId);

  return (
    <div className={styles.people_tab_wrapper}>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          void inviteUsers();
        }}
      >
        <div className={styles.section_wrapper}>
          <span className={styles.section_title}>Invite new users</span>
          {roleAssignations.map((roleAssignation, index) => (
            <UserToInvite
              key={roleAssignation.id}
              onChange={updateRoleAssignation(index)}
              removeCurrentInvitation={removeRoleAssignation(index)}
              roleAssignation={roleAssignation}
            />
          ))}
          <div className={styles.buttons_wrapper}>
            <QuivrButton
              onClick={addNewRoleAssignationRole}
              disabled={sendingInvitation || !canAddNewRow}
              label="Add new user"
              color="primary"
              iconName="add"
            ></QuivrButton>
            <QuivrButton
              isLoading={sendingInvitation}
              disabled={roleAssignations.length === 0}
              label="Invite"
              color="primary"
              iconName="share"
              onClick={inviteUsers}
            ></QuivrButton>
          </div>
        </div>
      </form>
      <div className={styles.section_wrapper}>
        <span className={styles.section_title}>Users with access</span>
        <BrainUsers brainId={brainId} />
      </div>
    </div>
  );
};
