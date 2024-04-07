import { Fragment } from "react";
import { useTranslations } from "next-intl";
import { Controller, useFormContext } from "react-hook-form";

import type { EmailAuthContextType } from "~/app/[locale]/auth/signin/types";
import { useAuthModes } from "~/core/libs/hooks/useAuthModes";
import { Button } from "~/islands/ui/button";
import { TextInput } from "~/islands/ui/TextInput/TextInput";

import { usePasswordLogin } from "./hooks/usePasswordLogin";

export const PasswordLogin = (): JSX.Element => {
  const t = useTranslations("login");
  const { password } = useAuthModes();
  const { handlePasswordLogin } = usePasswordLogin();
  const { watch } = useFormContext<EmailAuthContextType>();

  if (!password) {
    return <Fragment />;
  }

  return (
    <div>
      {/* PASSWORD FIELD */}
      <Controller
        name="password"
        defaultValue=""
        render={({ field }) => (
          /* ........................ */
          /* INPUT FIELD AND STYLING */
          <TextInput
            label="Password"
            inputValue={field.value as string}
            setInputValue={field.onChange}
            crypted={true}
          />
        )}
      />

      {/* LOGIN SUBMIT BUTTON */}
      <Button
        isLoading={watch("isPasswordSubmitting")}
        variant="default"
        className="mb-1 mt-2 w-full py-2 font-normal"
        onClick={() => void handlePasswordLogin()}
      >
        {t("login")}
      </Button>
    </div>
  );
};
