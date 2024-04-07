"use client";

import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";

import { useAuthModes } from "~/core/libs/hooks/useAuthModes";
import { Divider } from "~/islands/ui/Divider";

import type { EmailAuthContextType } from "../../types";
import { EmailInput } from "./components/EmailInput";
import { MagicLinkLogin } from "./components/MagicLinkLogin/MaginLinkLogin";
import { PasswordLogin } from "./components/PasswordLogin/PasswordLogin";

export const EmailLogin = (): JSX.Element => {
  const { reset } = useFormContext();
  const { watch } = useFormContext<EmailAuthContextType>();

  const t = useTranslations("login");
  const { password, magicLink } = useAuthModes();

  if (watch("isMagicLinkSubmitted")) {
    return (
      <div className="flex flex-col gap-4 text-center">
        <p>
          {t("check_your_email.part1", { ns: "login" })}{" "}
          <span className="font-semibold">
            {t("check_your_email.magic_link", { ns: "login" })}
          </span>{" "}
          {t("check_your_email.part2", { ns: "login" })}
        </p>
        <div>
          <span>{t("cant_find", { ns: "login" })}</span>{" "}
          {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
          <span
            className="cursor-pointer underline"
            onClick={() => void reset()}
          >
            {t("try_again")}
          </span>
        </div>
      </div>
    );
  }

  return (
    <>
      <EmailInput />
      <PasswordLogin />
      {password && magicLink && (
        <Divider text={"or"} className="my-3 uppercase" />
      )}
      <MagicLinkLogin />
    </>
  );
};
