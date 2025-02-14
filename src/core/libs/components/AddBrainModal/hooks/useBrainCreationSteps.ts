import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";

import type {
	CreateBrainProps,
	Step,
} from "~/core/libs/components/AddBrainModal/types/types";

import { useBrainCreationContext } from "../brainCreation-provider";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useBrainCreationSteps = () => {
	const t = useTranslations("brain");
	const { isBrainCreationModalOpened } = useBrainCreationContext();

	const steps: Step[] = [
		{
			label: t("brain_type"),
			value: "BRAIN_TYPE",
		},
		{
			label: t("brain_params"),
			value: "BRAIN_PARAMS",
		},
		{
			label: t("resources"),
			value: "KNOWLEDGE",
		},
	];
	const { watch, setValue } = useFormContext<CreateBrainProps>();
	const currentStep = watch("brainCreationStep");
	const currentStepIndex = steps.findIndex(
		(step) => step.value === currentStep,
	);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		goToFirstStep();
	}, [isBrainCreationModalOpened]);

	const goToNextStep = () => {
		if (currentStepIndex === -1 || currentStepIndex === steps.length - 1) {
			return;
		}
		const nextStep = steps[currentStepIndex + 1];

		return setValue("brainCreationStep", nextStep.value);
	};

	const goToPreviousStep = () => {
		if (currentStepIndex === -1 || currentStepIndex === 0) {
			return;
		}
		const previousStep = steps[currentStepIndex - 1];

		return setValue("brainCreationStep", previousStep.value);
	};

	const goToFirstStep = () => {
		return setValue("brainCreationStep", steps[0].value);
	};

	return {
		currentStep,
		steps,
		goToNextStep,
		goToPreviousStep,
		currentStepIndex,
	};
};
