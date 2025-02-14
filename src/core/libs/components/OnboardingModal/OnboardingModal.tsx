import { Controller, FormProvider, useForm } from "react-hook-form";

import { CompanySize, UsagePurpose } from "~/core/libs/api/user/user";
import { useUserApi } from "~/core/libs/api/user/useUserApi";
import { useOnboardingContext } from "~/core/libs/context/OnboardingProvider/hooks/useOnboardingContext";
import { Modal } from "~/islands/ui/Modal/Modal";

import type { OnboardingProps } from "../OnboardingModal/types/types";
import { FieldHeader } from "~/islands/ui/FieldHeader/FieldHeader";
import { QuivrButton } from "~/islands/ui/QuivrButton/QuivrButton";
import { SingleSelector } from "~/islands/ui/SingleSelector/SingleSelector";
import { TextInput } from "~/islands/ui/TextInput/TextInput";
import styles from "./OnboardingModal.module.scss";

export const OnboardingModal = (): JSX.Element => {
	const { isOnboardingModalOpened, setIsOnboardingModalOpened } =
		useOnboardingContext();

	const methods = useForm<OnboardingProps>({
		defaultValues: {
			username: "",
			companyName: "",
			companySize: undefined,
			usagePurpose: "",
		},
	});
	const { watch } = methods;
	const username = watch("username");

	const { updateUserIdentity } = useUserApi();

	const companySizeOptions = Object.entries(CompanySize).map(([, value]) => ({
		label: value,
		value: value,
	}));

	const usagePurposeOptions = Object.entries(UsagePurpose).map(
		([key, value]) => ({
			label: value,
			value: key,
		}),
	);

	const submitForm = async () => {
		await updateUserIdentity({
			username: methods.getValues("username"),
			company: methods.getValues("companyName"),
			onboarded: true,
			company_size: methods.getValues("companySize"),
			usage_purpose: methods.getValues("usagePurpose") as
				| UsagePurpose
				| undefined,
		});
		window.location.reload();
	};

	return (
		<FormProvider {...methods}>
			<Modal
				title="Welcome to Quivr!"
				desc="Let us know a bit more about you to get started."
				isOpen={isOnboardingModalOpened}
				setOpen={setIsOnboardingModalOpened}
				CloseTrigger={<div />}
				unclosable={true}
			>
				<div className={styles.modal_content_wrapper}>
					<div className={styles.form_wrapper}>
						<div>
							<FieldHeader iconName="user" label="Username" mandatory={true} />
							<Controller
								name="username"
								render={({ field }) => (
									<TextInput
										label="Choose a username"
										inputValue={field.value as string}
										setInputValue={field.onChange}
									/>
								)}
							/>
						</div>
						<div>
							<FieldHeader iconName="office" label="Company" />
							<Controller
								name="companyName"
								render={({ field }) => (
									<TextInput
										label="Your company name"
										inputValue={field.value as string}
										setInputValue={field.onChange}
									/>
								)}
							/>
						</div>
						<div>
							<FieldHeader iconName="goal" label="Usage Purpose" />
							<Controller
								name="usagePurpose"
								render={({ field }) => (
									<SingleSelector
										iconName="goal"
										options={usagePurposeOptions}
										placeholder="In what context will you be using Quivr"
										selectedOption={
											field.value
												? {
														label: field.value as string,
														value: field.value as string,
													}
												: undefined
										}
										onChange={field.onChange}
									/>
								)}
							/>
						</div>
						<div>
							<FieldHeader iconName="hashtag" label="Size of your company" />
							<Controller
								name="companySize"
								render={({ field }) => (
									<SingleSelector
										iconName="hashtag"
										options={companySizeOptions}
										placeholder="Number of employees in your company"
										selectedOption={
											field.value
												? {
														label: field.value as string,
														value: field.value as string,
													}
												: undefined
										}
										onChange={field.onChange}
									/>
								)}
							/>
						</div>
					</div>
					<div className={styles.button_wrapper}>
						<QuivrButton
							iconName="chevronRight"
							label="Submit"
							color="primary"
							onClick={() => submitForm()}
							disabled={!username}
						/>
					</div>
				</div>
			</Modal>
		</FormProvider>
	);
};
