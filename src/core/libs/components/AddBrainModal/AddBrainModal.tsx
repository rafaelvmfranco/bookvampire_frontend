import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { FormProvider, useForm } from "react-hook-form";

import { addBrainDefaultValues } from "~/core/libs/config/defaultBrainConfig";
import { Modal } from "~/islands/ui/Modal/Modal";

import styles from "./AddBrainModal.module.scss";
import { useBrainCreationContext } from "./brainCreation-provider";
import { BrainMainInfosStep } from "./components/BrainMainInfosStep/BrainMainInfosStep";
import { BrainTypeSelectionStep } from "./components/BrainTypeSelectionStep/BrainTypeSelectionStep";
import { CreateBrainStep } from "./components/CreateBrainStep/CreateBrainStep";
import { Stepper } from "./components/Stepper/Stepper";
import type { CreateBrainProps } from "./types/types";

export const AddBrainModal = (): JSX.Element => {
	const t = useTranslations("brain");

	const {
		isBrainCreationModalOpened,
		setIsBrainCreationModalOpened,
		setCurrentSelectedBrain,
	} = useBrainCreationContext();

	const defaultValues: CreateBrainProps = {
		...addBrainDefaultValues,
		setDefault: true,
		brainCreationStep: "BRAIN_TYPE",
	};

	const methods = useForm<CreateBrainProps>({
		defaultValues,
	});

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		setCurrentSelectedBrain(undefined);
	}, [isBrainCreationModalOpened]);

	return (
		<FormProvider {...methods}>
			<Modal
				title={t("newBrainTitle", { ns: "brain" })}
				desc={t("newBrainSubtitle", { ns: "brain" })}
				isOpen={isBrainCreationModalOpened}
				setOpen={setIsBrainCreationModalOpened}
				size="big"
				CloseTrigger={<div />}
			>
				<div className={styles.add_brain_modal_container}>
					<div className={styles.stepper_container}>
						<Stepper />
					</div>
					<div className={styles.content_wrapper}>
						<BrainTypeSelectionStep />
						<BrainMainInfosStep />
						<CreateBrainStep />
					</div>
				</div>
			</Modal>
		</FormProvider>
	);
};
