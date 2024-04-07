/* eslint-disable complexity */

import { useCallback, useEffect } from "react";
import { useFormContext } from "react-hook-form";

import { useBrainContext } from "~/core/libs/context/BrainProvider/hooks/useBrainContext";
import type { Brain } from "~/core/libs/context/BrainProvider/types";
import { useUrlBrain } from "~/core/libs/hooks/useBrainIdFromUrl";
import type { BrainConfig, Model } from "~/core/libs/types/BrainConfig";

import { useBrainFetcher } from "../../../hooks/useBrainFetcher";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useBrainFormState = () => {
	const { brainId } = useUrlBrain();

	const { defaultBrainId } = useBrainContext();

	const {
		register,
		getValues,
		watch,
		setValue,
		reset,
		resetField,
		formState: { defaultValues, dirtyFields },
	} = useFormContext<BrainConfig>();

	const { brain, refetchBrain } = useBrainFetcher({
		brainId,
	});

	const isDefaultBrain = defaultBrainId === brainId;
	const promptId = watch("prompt_id");
	const openAiKey = watch("openAiKey");
	const model = watch("model");
	const temperature = watch("temperature");
	const maxTokens = watch("maxTokens");
	const status = watch("status");

	const updateFormValues = useCallback(() => {
		if (brain === undefined) {
			return;
		}

		for (const key in brain) {
			const brainKey = key as keyof Brain;
			if (!(key in brain)) {
				return;
			}

			// biome-ignore lint/complexity/useLiteralKeys: <explanation>
			if (brainKey === "max_tokens" && brain["max_tokens"] !== undefined) {
				// biome-ignore lint/complexity/useLiteralKeys: <explanation>
				setValue("maxTokens", brain["max_tokens"]);
				continue;
			}

			// @ts-expect-error bad type inference from typescript
			// eslint-disable-next-line
			if (brain[key]) setValue(key, brain[key]);
		}

		setTimeout(() => {
			if (brain.model) {
				setValue("model", brain.model);
			}
		}, 50);
	}, [brain, setValue]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		updateFormValues();
	}, [brain, updateFormValues]);

	const setModel = (newModel: Model) => {
		setValue("model", newModel);
	};

	return {
		brain,
		brainId,
		model,
		temperature,
		maxTokens,
		isDefaultBrain,
		promptId,
		openAiKey,
		defaultValues,
		dirtyFields,
		status,
		register,
		getValues,
		setValue,
		reset,
		resetField,
		refetchBrain,
		setModel,
	};
};
