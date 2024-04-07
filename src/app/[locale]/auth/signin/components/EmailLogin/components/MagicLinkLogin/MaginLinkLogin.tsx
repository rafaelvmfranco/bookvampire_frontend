import { Fragment } from "react";
import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";

import type { EmailAuthContextType } from "~/app/[locale]/auth/signin/types";
import { useAuthModes } from "~/core/libs/hooks/useAuthModes";
import { Button } from "~/islands/ui/button";

import { useMagicLinkLogin } from "./hooks/useMagicLinkLogin";

export const MagicLinkLogin = (): JSX.Element => {
	const t = useTranslations("login");
	const { magicLink } = useAuthModes();
	const { handleMagicLinkLogin } = useMagicLinkLogin();
	const { watch } = useFormContext<EmailAuthContextType>();

	if (!magicLink) {
		return <Fragment />;
	}

	return (
		<Button
			isLoading={watch("isMagicLinkSubmitting")}
			className="w-full bg-black py-2 font-normal text-white"
			type="submit"
			onClick={() => void handleMagicLinkLogin()}
		>
			{t("magicLink", { ns: "login" })}
		</Button>
	);
};
