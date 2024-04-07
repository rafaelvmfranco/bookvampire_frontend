import type { UUID } from "node:crypto";
import { useEffect, useRef, useState } from "react";
import { isAxiosError } from "axios";
import { useTranslations } from "next-intl";

import { useBrainApi } from "~/core/libs/api/brain/useBrainApi";
import { useBrainContext } from "~/core/libs/context/BrainProvider/hooks/useBrainContext";
import { defineMaxTokens } from "~/core/libs/helpers/defineMaxTokens";
import { getAccessibleModels } from "~/core/libs/helpers/getAccessibleModels";
import { useToast } from "~/core/libs/hooks";
import { useUserData } from "~/core/libs/hooks/useUserData";

import { isBrainDescriptionValid } from "../utils/isBrainDescriptionValid";
import { isBrainNameValid } from "../utils/isBrainNameValid";
import { useBrainFormState } from "./useBrainFormState";

type UseSettingsTabProps = {
	brainId: UUID;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useSettingsTab = ({ brainId }: UseSettingsTabProps) => {
	const t = useTranslations("config");
	const [isUpdating, setIsUpdating] = useState(false);
	const [isSettingAsDefault, setIsSettingAsDefault] = useState(false);
	const { publish } = useToast();
	const formRef = useRef<HTMLFormElement>(null);
	const { setAsDefaultBrain, updateBrain } = useBrainApi();
	const { fetchAllBrains, fetchDefaultBrain } = useBrainContext();
	const { userData } = useUserData();

	const { getValues, maxTokens, setValue, openAiKey, model, isDefaultBrain } =
		useBrainFormState();

	const accessibleModels = getAccessibleModels({
		openAiKey,
		userData,
	});

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		setValue("maxTokens", Math.min(maxTokens, defineMaxTokens(model)));
	}, [maxTokens, model, setValue]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		const handleKeyPress = (event: KeyboardEvent) => {
			if (event.key === "Enter") {
				event.preventDefault();
				void handleSubmit();
			}
		};

		formRef.current?.addEventListener("keydown", handleKeyPress);

		return () => {
			formRef.current?.removeEventListener("keydown", handleKeyPress);
		};
	}, [formRef.current]);

	const setAsDefaultBrainHandler = async () => {
		try {
			setIsSettingAsDefault(true);
			await setAsDefaultBrain(brainId);
			publish({
				variant: "success",
				text: t("defaultBrainSet", { ns: "config" }),
			});
			void fetchAllBrains();
			void fetchDefaultBrain();
		} catch (err) {
			// ...

			if (isAxiosError(err) && err.response?.status === 429) {
				publish({
					variant: "danger",
					text: `${JSON.stringify(
						(
							err.response as {
								data: { detail: string };
							}
						).data.detail,
					)}`,
				});

				return;
			}
		} finally {
			setIsSettingAsDefault(false);
		}
	};

	const handleSubmit = async () => {
		const { name, description } = getValues();

		if (
			!isBrainNameValid(name, publish) ||
			!isBrainDescriptionValid(description, publish)
		) {
			return;
		}

		try {
			setIsUpdating(true);
			const { maxTokens: max_tokens, ...otherConfigs } = getValues();

			await updateBrain(brainId, {
				...otherConfigs,
				max_tokens,
				prompt_id:
					// biome-ignore lint/complexity/useLiteralKeys: <explanation>
					otherConfigs["prompt_id"] !== ""
						? // biome-ignore lint/complexity/useLiteralKeys: <explanation>
							otherConfigs["prompt_id"]
						: undefined,
			});

			publish({
				variant: "success",
				text: t("brainUpdated", { ns: "config" }),
			});
			void fetchAllBrains();
		} catch (err) {
			if (isAxiosError(err) && err.response?.status === 429) {
				publish({
					variant: "danger",
					text: `${JSON.stringify(
						(
							err.response as {
								data: { detail: string };
							}
						).data.detail,
					)}`,
				});
			} else {
				publish({
					variant: "danger",
					text: `${JSON.stringify(err)}`,
				});
			}
		} finally {
			setIsUpdating(false);
		}
	};

	return {
		handleSubmit,
		setAsDefaultBrainHandler,
		isUpdating,
		isSettingAsDefault,
		isDefaultBrain,
		formRef,
		accessibleModels,
		setIsUpdating,
	};
};
