"use client";

import { useTranslations } from "next-intl";
import { FormProvider, useForm } from "react-hook-form";

import { useAuthModes } from "~/core/libs/hooks/useAuthModes";
import { Divider } from "~/islands/ui/Divider";

import { EmailLogin } from "./components/EmailLogin";
import { GoogleLoginButton } from "./components/GoogleLogin";
import { useLogin } from "./hooks/useLogin";
import type { EmailAuthContextType } from "./types";

export const LoginPageClient = (): JSX.Element => {
	const t = useTranslations("login");

	useLogin();
	const { googleSso } = useAuthModes();

	const methods = useForm<EmailAuthContextType>({
		defaultValues: {
			email: "",
			password: "",
		},
	});

	return (
		<>
			<FormProvider {...methods}>
				<EmailLogin />
			</FormProvider>
			{googleSso && (
				<>
					<Divider text={"or"} className="my-3 uppercase" />
					<GoogleLoginButton />
				</>
			)}
		</>
	);
};
