import { useState } from "react";
import { useTranslations } from "next-intl";

import { useSupabase } from "~/core/libs/context/SupabaseProvider";
import { useToast } from "~/core/libs/hooks";
import { useEventTracking } from "~/data/services/analytics/june/useEventTracking";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useLogoutModal = () => {
  const { supabase } = useSupabase();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isLogoutModalOpened, setIsLogoutModalOpened] = useState(false);
  const { track } = useEventTracking();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const t = useTranslations("logout");

  const { publish } = useToast();

  const handleLogout = async () => {
    setIsLoggingOut(true);
    const { error } = await supabase.auth.signOut();
    void track("LOGOUT");
    localStorage.clear();

    if (error) {
      console.error("Error logging out:", error.message);
      publish({
        variant: "danger",
        text: t("error", { errorMessage: error.message, ns: "logout" }),
      });
    } else {
      publish({
        variant: "success",
        text: t("loggedOut", { ns: "logout" }),
      });
      window.location.href = "/";
    }
    setIsLoggingOut(false);
  };

  return {
    handleLogout,
    isLoggingOut,
    isLogoutModalOpened,
    setIsLogoutModalOpened,
  };
};
