import { useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { MotionConfig } from "framer-motion";

import { MenuControlButton } from "~/app/[locale]/chat/[chatId]/components/ActionsBar/components/ChatInput/components/MenuControlButton/MenuControlButton";
import { useChatsList } from "~/app/[locale]/chat/[chatId]/hooks/useChatsList";
import BookVampireLogo from "~/core/assets/logo.png";
import { nonProtectedPaths } from "~/core/libs/config/routesConfig";
import { useMenuContext } from "~/core/libs/context/MenuProvider/hooks/useMenuContext";
import { useUserSettingsContext } from "~/core/libs/context/UserSettingsProvider/hooks/useUserSettingsContext";

import { AnimatedDiv } from "./components/AnimationDiv";
import { DiscussionButton } from "./components/DiscussionButton/DiscussionButton";
import { HomeButton } from "./components/HomeButton/HomeButton";
import { ProfileButton } from "./components/ProfileButton/ProfileButton";
import { SocialsButtons } from "./components/SocialsButtons/SocialsButtons";
import { LibraryButton } from "./components/LibraryButton/LibraryButton";
import { ThreadsButton } from "./components/ThreadsButton/ThreadsButton";
import { UpgradeToPlusButton } from "./components/UpgradeToPlusButton/UpgradeToPlusButton";
import styles from "./Menu.module.scss";

export const Menu = (): JSX.Element => {
  const { isOpened } = useMenuContext();
  const router = useRouter();
  const pathname = usePathname() ?? "";
  const [isLogoHovered, setIsLogoHovered] = useState<boolean>(false);
  const { isDarkMode } = useUserSettingsContext();

  useChatsList();

  if (nonProtectedPaths.includes(pathname)) return <></>;

  const displayedOnPages = [
    "/chat",
    "/library",
    "/library",
    "/search",
    "/user",
  ];

  const isMenuDisplayed = displayedOnPages.some((page) =>
    pathname.includes(page),
  );

  if (!isMenuDisplayed) return <></>;

  return (
    <MotionConfig transition={{ mass: 1, damping: 10, duration: 0.1 }}>
      <div className={styles.menu_container}>
        <AnimatedDiv>
          <div className={styles.menu_wrapper}>
            {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
            <div
              className={styles.quivr_logo_wrapper}
              onClick={() => router.push("/search")}
              onMouseEnter={() => setIsLogoHovered(true)}
              onMouseLeave={() => setIsLogoHovered(false)}
            >
              <Image
                src={BookVampireLogo}
                alt="Book Vampire Logo"
                height="80"
                width="80"
              />
            </div>

            <div className={styles.buttons_wrapper}>
              <div className={styles.block}>
                <DiscussionButton />
                <HomeButton />
                <LibraryButton />
                <ThreadsButton />
              </div>
              <div className={styles.block}>
                <UpgradeToPlusButton />
                <ProfileButton />
              </div>
            </div>
            <div className={styles.social_buttons_wrapper}>
              <SocialsButtons />
            </div>
          </div>
        </AnimatedDiv>
      </div>
      <div
        className={`
        ${styles.menu_control_button_wrapper} 
        ${isOpened ? styles.shifted : ""}
        `}
      >
        <MenuControlButton />
      </div>
    </MotionConfig>
  );
};
