import type { UUID } from "node:crypto";

import { useAxios } from "~/core/libs/hooks";

import {
  deleteKnowledge,
  type DeleteKnowledgeInputProps,
  generateSignedUrlKnowledge,
  getAllKnowledge,
  type GetAllKnowledgeInputProps,
} from "./knowledge";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useKnowledgeApi = () => {
  const { axiosInstance } = useAxios();

  return {
    getAllKnowledge: async (props: GetAllKnowledgeInputProps) =>
      getAllKnowledge(props, axiosInstance),
    deleteKnowledge: async (props: DeleteKnowledgeInputProps) =>
      deleteKnowledge(props, axiosInstance),
    generateSignedUrlKnowledge: async (props: { knowledgeId: UUID }) =>
      generateSignedUrlKnowledge(props, axiosInstance),
  };
};
