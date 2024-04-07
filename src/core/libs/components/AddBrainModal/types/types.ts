import type { CreateBrainInput } from "~/core/libs/api/brain/types";
import type { iconList } from "~/core/libs/helpers/iconList";

const brainCreationSteps = ["BRAIN_TYPE", "BRAIN_PARAMS", "KNOWLEDGE"] as const;

export type BrainCreationStep = (typeof brainCreationSteps)[number];

export type CreateBrainProps = CreateBrainInput & {
  setDefault: boolean;
  brainCreationStep: BrainCreationStep;
};

export interface BrainType {
  name: string;
  description: string;
  iconName: keyof typeof iconList;
  disabled?: boolean;
  onClick?: () => void;
}

export type Step = {
  label: string;
  value: BrainCreationStep;
};
