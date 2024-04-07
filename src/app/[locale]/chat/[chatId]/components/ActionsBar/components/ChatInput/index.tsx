"use client";

import { CurrentBrain } from "~/core/libs/components/CurrentBrain/CurrentBrain";
import { useBrainContext } from "~/core/libs/context/BrainProvider/hooks/useBrainContext";
import Icon from "~/islands/ui/Icon/Icon";
import { LoaderIcon } from "~/islands/ui/LoaderIcon/LoaderIcon";
import { ChatEditor } from "./components/ChatEditor/ChatEditor";
import { useChatInput } from "./hooks/useChatInput";

export const ChatInput = (): JSX.Element => {
  const { setMessage, submitQuestion, generatingAnswer, message } =
    useChatInput();
  const { currentBrain } = useBrainContext();

  const handleSubmitQuestion = () => {
    if (message.trim() !== "") {
      submitQuestion();
    }
  };

  return (
    <>
      <form
        data-testid="chat-input-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmitQuestion();
        }}
      >
        <div className="flex flex-col bg-background-0 gap-3 rounded-lg border border-zinc-500 overflow-hidden">
          <CurrentBrain allowingRemoveBrain={false} />
          <div
            className={`
              flex
              p-5
              ${currentBrain ? "pt-0" : ""}
            `}
          >
            <ChatEditor
              message={message}
              setMessage={setMessage}
              onSubmit={handleSubmitQuestion}
            />
            {generatingAnswer ? (
              <LoaderIcon size="large" color="accent" />
            ) : (
              <Icon
                name="followUp"
                size="large"
                color="accent"
                disabled={!message}
                handleHover={true}
                onClick={handleSubmitQuestion}
              />
            )}
          </div>
        </div>
      </form>
    </>
  );
};
