import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";

import type { EmailAuthContextType } from "~/app/[locale]/auth/signin/types";
import { useSupabase } from "~/core/libs/context/SupabaseProvider";
import { useToast } from "~/core/libs/hooks";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useMagicLinkLogin = () => {
	const { supabase } = useSupabase();
	const { watch, setValue } = useFormContext<EmailAuthContextType>();

	const t = useTranslations("login");
	const { publish } = useToast();

	const email = watch("email");

	const handleMagicLinkLogin = async () => {
		if (email === "") {
			publish({
				variant: "danger",
				text: t("errorMailMissed"),
			});

			return;
		}
		setValue("isMagicLinkSubmitting", true);
		const { error } = await supabase.auth.signInWithOtp({
			email,
			options: {
				emailRedirectTo: window.location.hostname,
			},
		});
		setValue("isMagicLinkSubmitting", false);
		setValue("isMagicLinkSubmitted", true);

		if (error) {
			publish({
				variant: "danger",
				text: error.message,
			});

			throw error;
		}
	};

	return {
		handleMagicLinkLogin,
	};
};
