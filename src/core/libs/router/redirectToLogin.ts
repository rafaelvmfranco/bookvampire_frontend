import type { RedirectType } from "next/dist/client/components/redirect";
import { redirect } from "next/navigation";
import { DEBUG_GOD_MODE } from "~/app";

// type RedirectToLogin = (type?: RedirectType) => never;
// biome-ignore lint/suspicious/noConfusingVoidType: <explanation>
type RedirectToLogin = (type?: RedirectType) => never | void;

export const redirectToLogin: RedirectToLogin = (type?: RedirectType) => {
  if (DEBUG_GOD_MODE === "true") {
    // console.log("DEBUG_GOD_MODE is enabled. Redirect is disabled.");
    return;
  }
  sessionStorage.setItem("previous-page", window.location.pathname);
  redirect("/auth/signin", type);
};
