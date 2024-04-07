import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";

import type { EmailAuthContextType } from "~/app/[locale]/auth/signin/types";
import { useSupabase } from "~/core/libs/context/SupabaseProvider";
import { useToast } from "~/core/libs/hooks";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const usePasswordLogin = () => {
  const { supabase } = useSupabase();
  const t = useTranslations("login");
  const { publish } = useToast();
  const { watch, setValue } = useFormContext<EmailAuthContextType>();

  const email = watch("email");
  const password = watch("password");

  const handlePasswordLogin = async () => {
    if (email === "") {
      publish({
        variant: "danger",
        text: t("errorMailMissed"),
      });

      return;
    }

    if (password === "") {
      publish({
        variant: "danger",
        text: t("errorPasswordMissed"),
      });

      return;
    }
    setValue("isPasswordSubmitting", true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setValue("isPasswordSubmitting", false);
    setValue("isPasswordSubmitted", true);

    if (error) {
      publish({
        variant: "danger",
        text: error.message,
      });

      throw error; // this error is caught by react-hook-form
    }
  };

  return {
    handlePasswordLogin,
  };
};
