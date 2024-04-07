import { useTranslations } from "next-intl";
import { FcGoogle } from "react-icons/fc";

import { Button } from "~/islands/ui/button";

import { useGoogleLogin } from "./hooks/useGoogleLogin";

export const GoogleLoginButton = (): JSX.Element => {
	const { isPending, signInWithGoogle } = useGoogleLogin();
	const t = useTranslations("login");

	return (
		<Button
			onClick={() => void signInWithGoogle()}
			isLoading={isPending}
			type="button"
			data-testid="google-login-button"
			className="bg-white py-2 font-normal text-black hover:text-white"
		>
			<FcGoogle className="mr-2" />
			{t("googleLogin", { ns: "login" })}
		</Button>
	);
};
