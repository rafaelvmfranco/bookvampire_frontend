import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { ArrowUpCircle } from "lucide-react";

import { Editor } from "~/app/[locale]/chat/[chatId]/components/ActionsBar/components/ChatInput/components/ChatEditor/Editor/Editor";
import { useChatInput } from "~/app/[locale]/chat/[chatId]/components/ActionsBar/components/ChatInput/hooks/useChatInput";
import { useChat } from "~/app/[locale]/chat/[chatId]/hooks/useChat";
import { useChatContext } from "~/core/libs/context";
import { useBrainContext } from "~/core/libs/context/BrainProvider/hooks/useBrainContext";

import { CurrentBrain } from "~/core/libs/components/CurrentBrain/CurrentBrain";
import { LoaderIcon } from "../LoaderIcon/LoaderIcon";
import styles from "./SearchBar.module.scss";

export const SearchBar = ({
  onSearch,
  mode,
}: {
  onSearch?: () => void;
  mode: "bookSearch" | "askQuestion";
}): JSX.Element => {
  const [searching, setSearching] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const { message, setMessage } = useChatInput();
  const { setMessages } = useChatContext();
  const { addQuestion } = useChat();
  const { currentBrain, setCurrentBrainId } = useBrainContext();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    setCurrentBrainId(null);
  }, []);

  useEffect(() => {
    setIsDisabled(message === "");
  }, [message]);

  const submit = async (): Promise<void> => {
    if (!searching) {
      setSearching(true);
      setMessages([]);
      try {
        if (onSearch) {
          onSearch();
        }
        await addQuestion(message);
      } catch (error) {
        console.error(error);
      } finally {
        setSearching(false);
      }
    }
  };

  const { placeholder, Icon } = useMemo(() => {
    if (mode === "bookSearch") {
      return {
        placeholder: "Choose a book",
        Icon: Search,
      };
    }
    return {
      placeholder: "Ask a question",
      Icon: ArrowUpCircle,
    };
  }, [mode]);

  return (
    <div
      className={`
      ${styles.search_bar_wrapper}
      ${currentBrain ? styles.with_brain : ""}
      `}
    >
      {mode === "bookSearch" && <CurrentBrain allowingRemoveBrain={true} />}
      <div
        className={`  
      ${styles.editor_wrapper}
      ${currentBrain ? styles.with_brain : ""}
      `}
      >
        {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
        <Editor
          message={message}
          setMessage={setMessage}
          onSubmit={() => void submit()}
          placeholder={placeholder}
          key={mode}
        ></Editor>
        {searching ? (
          <LoaderIcon size="big" color="accent" />
        ) : (
          <Icon
            className={`
          ${styles.search_icon} 
          ${isDisabled ? styles.disabled : "bg-primary rounded-md"}
          `}
            onClick={() => void submit()}
          />
        )}
      </div>
    </div>
  );
};
