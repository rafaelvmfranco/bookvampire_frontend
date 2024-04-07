import { Fragment } from "react";
import { Controller } from "react-hook-form";

import { useAuthModes } from "~/core/libs/hooks/useAuthModes";
import { TextInput } from "~/islands/ui/TextInput/TextInput";

export const EmailInput = (): JSX.Element => {
  const { password, magicLink } = useAuthModes();
  if (!password && !magicLink) {
    return <Fragment />;
  }

  return (
    // EMAIL FIELD
    <Controller
      name="email"
      defaultValue=""
      render={({ field }) => (
        /* ........................ */
        /* INPUT FIELD AND STYLING */
        <TextInput
          label="Email" /* Email address */
          inputValue={field.value as string}
          setInputValue={field.onChange}
        />
      )}
    />
  );
};
