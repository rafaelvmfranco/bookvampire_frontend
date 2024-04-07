import type { UUID } from "node:crypto";

import type { MinimalBrainForUser } from "~/core/libs/context/BrainProvider/types";

type IsUserBrainOwnerProps = {
  userAccessibleBrains: MinimalBrainForUser[];
  brainId?: UUID;
};
export const isUserBrainEditor = ({
  brainId,
  userAccessibleBrains,
}: IsUserBrainOwnerProps): boolean => {
  const brain = userAccessibleBrains.find(({ id }) => id === brainId);
  if (brain === undefined) {
    return false;
  }

  return brain.role === "Editor";
};
