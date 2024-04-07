"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

import BookVampireLogo from "~/core/assets/logo.png";
import { AddBrainModal } from "~/core/libs/components/AddBrainModal";
import { useBrainCreationContext } from "~/core/libs/components/AddBrainModal/brainCreation-provider";
import { OnboardingModal } from "~/core/libs/components/OnboardingModal/OnboardingModal";
import { UploadDocumentModal } from "~/core/libs/components/UploadDocumentModal/UploadDocumentModal";
import { useSupabase } from "~/core/libs/context/SupabaseProvider";
import { redirectToLogin } from "~/core/libs/router/redirectToLogin";
import type { ButtonType } from "~/core/libs/types/QuivrButton";
import { SearchBar } from "~/islands/ui/SearchBar/SearchBar";

import styles from "./page.module.scss";
import { APP_NAME, DEBUG_GOD_MODE } from "~/app";
import { useTranslations } from "next-intl";
import { Button } from "~/islands/ui/button";
import { BsLightning } from "react-icons/bs";

const Search = (): JSX.Element => {
  const t = useTranslations("login");

  const pathname = usePathname();
  const { session } = useSupabase();
  const { setIsBrainCreationModalOpened } = useBrainCreationContext();

  const [searchMode, setSearchMode] = useState<"bookSearch" | "askQuestion">(
    "bookSearch",
  );
  const [debugBookOpened, setDebugBookOpened] = useState(false);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (session === null) {
      redirectToLogin();
    }
  }, [pathname, session]);

  const buttons: ButtonType[] = [
    {
      label: "Create book",
      color: "primary",
      onClick: () => {
        setIsBrainCreationModalOpened(true);
      },
      iconName: "brain",
    },
  ];

  const handleDebugModeClick = () => {
    setSearchMode("askQuestion");
    setDebugBookOpened(true);
  };

  const handleCloseDebugBook = () => {
    setSearchMode("bookSearch");
    setDebugBookOpened(false);
  };

  return (
    <div className={styles.main_container}>
      <div className={styles.search_page_container}>
        <div className={styles.main_wrapper}>
          <div className={styles.quivr_logo_wrapper}>
            <Image
              src={BookVampireLogo}
              alt="Book Vampire Logo"
              height="80"
              width="80"
            />
            <p className="font-title text-4xl mt-1 mb-7 text-center">
              <span className="mr-2">{t("talk_to")}</span>
              <span className="text-primary">{APP_NAME}</span>
            </p>
          </div>

          {DEBUG_GOD_MODE && (
            <div className="mb-4">
              {!debugBookOpened ? (
                <Button
                  variant="secondary"
                  onClick={handleDebugModeClick}
                  className="w-full"
                >
                  [DEBUG] Choose "The Power of Now"
                </Button>
              ) : (
                <Button
                  variant="secondary"
                  onClick={handleCloseDebugBook}
                  className="w-full"
                >
                  [DEBUG] Back to Book Selection
                </Button>
              )}
            </div>
          )}

          <div className={styles.search_bar_wrapper}>
            <SearchBar mode={searchMode} />
          </div>
        </div>

        {!debugBookOpened ? (
          <div className={`${styles.shortcuts_card_wrapper} ml-4`}>
            <div className={styles.shortcut_wrapper}>
              <span>Press</span>
              <span className={styles.shortcut}>@</span>
              <span>to select a book</span>
            </div>
          </div>
        ) : (
          <div className="ml-4">
            <h2 className="flex items-center gap-1 mb-2">
              <BsLightning />
              Shortcuts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <Button variant="default">Provide a summary of the book</Button>
              <Button variant="default">What is this book about?</Button>
              <Button variant="default">Explain the ending of the book</Button>
              <Button variant="default">
                What is the main idea of this book?
              </Button>
            </div>
          </div>
        )}
      </div>

      <UploadDocumentModal />
      <AddBrainModal />
      <OnboardingModal />
    </div>
  );
};

export default Search;
