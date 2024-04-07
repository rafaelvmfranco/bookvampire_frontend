import type { UUID } from "node:crypto";

import type { MinimalBrainForUser } from "~/core/libs/context/BrainProvider/types";
import type { SelectOptionProps } from "~/islands/ui/Select";

export const formatMinimalBrainsToSelectComponentInput = (
  brains: MinimalBrainForUser[],
): SelectOptionProps<UUID>[] =>
  brains.map((brain) => ({
    label: brain.name,
    value: brain.id,
  }));
