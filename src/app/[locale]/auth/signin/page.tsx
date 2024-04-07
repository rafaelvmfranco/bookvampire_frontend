import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { LoginPageClient } from "./client";
import BookVampireLogo from "~/core/assets/logo.png";
import { Divider } from "~/islands/ui/Divider";
import styles from "./page.module.scss";
import { env } from "~/env.mjs";
import { buttonVariants } from "~/islands/ui/button";
import { cn } from "~/core/utils";
import { APP_NAME, DEBUG_GOD_MODE } from "~/app";

const LoginPage = (): JSX.Element => {
  const t = useTranslations("login");

  return (
    <div className={styles.login_page_wrapper}>
      <section className={styles.section}>
        <Link href="/" className={styles.logo_link}>
          <Image
            src={BookVampireLogo}
            alt="Book Vampire Logo"
            height="80"
            width="80"
          />
        </Link>
        <p className="font-title text-4xl mt-1 mb-7">
          <span className="mr-2">{t("talk_to")}</span>
          <span className="text-primary">{APP_NAME}</span>
        </p>
        <div className={styles.form_container}>
          <LoginPageClient />
          {DEBUG_GOD_MODE === "true" && (
            <>
              <Divider className="mt-5 mb-3" />
              <p className="text-red-500 font-semibold text-center">
                ATTENTION! DEBUG_GOD_MODE IS ACTIVATED!
              </p>
              <Link
                href="/search"
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "whitespace-nowrap px-3 mt-1 flex flex-col items-center h-10 mx-[30%]",
                )}
              >
                Open the app
              </Link>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
