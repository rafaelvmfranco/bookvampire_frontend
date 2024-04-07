import { useTranslations } from "next-intl";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { ChatInput } from "./components";
import { useActionBar } from "./hooks/useActionBar";

export const ActionsBar = (): JSX.Element => {
  const { hasPendingRequests } = useActionBar();

  const t = useTranslations("chat");

  return (
    <>
      {hasPendingRequests && (
        <div className="mb-3 mt-1 flex w-full flex-col rounded-xl border border-black/10 bg-white p-2 pl-6 shadow-md transition-shadow hover:shadow-xl md:flex-row md:p-6 dark:border-white/25 dark:bg-black dark:shadow-primary/25">
          <div className="mb-2 flex flex-1 items-center md:mb-0">
            <span className="md:text-1xl text-sm">{t("feedingBrain")}</span>
          </div>
          <AiOutlineLoading3Quarters className="animate-spin self-center text-2xl md:text-3xl" />
        </div>
      )}

      <div>
        <ChatInput />
      </div>
    </>
  );
};
