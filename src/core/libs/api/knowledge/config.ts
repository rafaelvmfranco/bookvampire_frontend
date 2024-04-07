import type { UUID } from "node:crypto";

const brainDataKey = "quivr-knowledge";

export const getKnowledgeDataKey = (knowledgeId: UUID): string =>
  `${brainDataKey}-${knowledgeId}`;
