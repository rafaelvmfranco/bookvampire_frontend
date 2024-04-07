"use client";

import { useEffect, type PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { posthog } from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

import { BrainCreationProvider } from "~/core/libs/components/AddBrainModal/brainCreation-provider";
import { useOutsideClickListener } from "~/core/libs/components/Menu/hooks/useOutsideClickListener";
import SearchModal from "~/core/libs/components/SearchModal/SearchModal";
import {
  BrainProvider,
  ChatProvider,
  KnowledgeToFeedProvider,
} from "~/core/libs/context";
import { useBrainContext } from "~/core/libs/context/BrainProvider/hooks/useBrainContext";
import { ChatsProvider } from "~/core/libs/context/ChatsProvider";
import { MenuProvider } from "~/core/libs/context/MenuProvider/Menu-provider";
import { OnboardingProvider } from "~/core/libs/context/OnboardingProvider/Onboarding-provider";
import { SearchModalProvider } from "~/core/libs/context/SearchModalProvider/search-modal-provider";
import { useSupabase } from "~/core/libs/context/SupabaseProvider";
import { UserSettingsProvider } from "~/core/libs/context/UserSettingsProvider/User-settings.provider";
import { IntercomProvider } from "~/core/libs/helpers/intercom/IntercomProvider";
import { UpdateMetadata } from "~/core/libs/helpers/updateMetadata";
import { usePageTracking } from "~/data/services/analytics/june/usePageTracking";
import { Sidebar } from "~/islands/special/sidebar";
import { Header } from "~/islands/special/header";

if (
  process.env.NEXT_PUBLIC_POSTHOG_KEY != null &&
  process.env.NEXT_PUBLIC_POSTHOG_HOST != null
) {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    opt_in_site_apps: true,
    disable_session_recording: true,
  });
}

// This wrapper is used to make effect calls at a high level in app rendering.
const App = ({ children }: PropsWithChildren): JSX.Element => {
  const { fetchAllBrains, fetchDefaultBrain, fetchPublicPrompts } =
    useBrainContext();
  const { onClickOutside } = useOutsideClickListener();
  const { session } = useSupabase();

  usePageTracking();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (session?.user) {
      void fetchAllBrains();
      void fetchDefaultBrain();
      void fetchPublicPrompts();
      posthog.identify(session.user.id, { email: session.user.email });
      posthog.startSessionRecording();
    }
  }, [session]);

  return (
    <>
      {/* <Script
        id="octolane-script"
        src="https://cdn.octolane.com/tag.js?pk=0a213725640302dff773"
      /> */}

      <PostHogProvider client={posthog}>
        <IntercomProvider>
          <div className="flex flex-1 flex-col overflow-auto">
            <SearchModalProvider>
              <SearchModal />
                <div className="relative flex h-full w-full overflow-auto">
                  <Sidebar />
                  {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
                  <div
                    onClick={onClickOutside}
                    className="flex-1 overflow-scroll"
                  >
                    {children}
                  </div>
                  <UpdateMetadata />
              </div>
            </SearchModalProvider>
          </div>
        </IntercomProvider>
      </PostHogProvider>
    </>
  );
};

const queryClient = new QueryClient();

const AppWithQueryClient = ({ children }: PropsWithChildren): JSX.Element => {
  return (
    <QueryClientProvider client={queryClient}>
      <UserSettingsProvider>
        <BrainProvider>
          <KnowledgeToFeedProvider>
            <BrainCreationProvider>
              <MenuProvider>
                <OnboardingProvider>
                  <ChatsProvider>
                    <ChatProvider>
                      <App>{children}</App>
                    </ChatProvider>
                  </ChatsProvider>
                </OnboardingProvider>
              </MenuProvider>
            </BrainCreationProvider>
          </KnowledgeToFeedProvider>
        </BrainProvider>
      </UserSettingsProvider>
    </QueryClientProvider>
  );
};

export { AppWithQueryClient as App };
