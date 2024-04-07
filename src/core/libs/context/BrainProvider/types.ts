import type { UUID } from "node:crypto";

import type { BrainRoleType } from "~/app/[locale]/library/[brainId]/BrainManagementTabs/components/PeopleTab/BrainUsers/types";
import type { ApiBrainDefinition } from "~/core/libs/api/brain/types";
import type { Document } from "~/core/libs/types/Document";

import type { BrainType, Model } from "../../types/BrainConfig";
import type { useBrainProvider } from "./hooks/useBrainProvider";

export type BrainAccessStatus = "private" | "public";

export type IntegrationDescription = {
  connection_settings?: object;
  description: string;
  id: UUID;
  integration_logo_url: string;
  integration_name: string;
  integration_type: "custom" | "sync";
  max_files: number;
  allow_model_change: boolean;
  integration_display_name: string;
};

export type Brain = {
  id: UUID;
  name: string;
  documents?: Document[];
  status?: BrainAccessStatus;
  model?: Model | null;
  max_tokens?: number;
  temperature?: number;
  description?: string;
  prompt_id?: string | null;
  brain_type?: BrainType;
  brain_definition?: ApiBrainDefinition;
  integration_description?: IntegrationDescription;
  max_files?: number;
};

export type MinimalBrainForUser = {
  id: UUID;
  name: string;
  role: BrainRoleType;
  status: BrainAccessStatus;
  brain_type: BrainType;
  description: string;
  integration_logo_url?: string;
  max_files: number;
  allow_model_change: boolean;
};

//TODO: rename rights to role in Backend and use MinimalBrainForUser instead of BackendMinimalBrainForUser
export type BackendMinimalBrainForUser = Omit<MinimalBrainForUser, "role"> & {
  rights: BrainRoleType;
};

export type PublicBrain = {
  id: UUID;
  name: string;
  description?: string;
  number_of_subscribers: number;
  last_update: string;
  brain_type?: BrainType;
  brain_definition?: ApiBrainDefinition;
};

export type BrainContextType = ReturnType<typeof useBrainProvider>;
