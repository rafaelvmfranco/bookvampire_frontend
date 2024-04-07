import { Controller } from "react-hook-form";

import { FieldHeader } from "~/islands/ui/FieldHeader/FieldHeader";
import QuivrButton from "~/islands/ui/QuivrButton/QuivrButton";
import { TextAreaInput } from "~/islands/ui/TextAreaInput/TextAreaInput";
import { TextInput } from "~/islands/ui/TextInput/TextInput";

import { usePrompt, type UsePromptProps } from "../../hooks/usePrompt";
import { PublicPrompts } from "../PublicPrompts/PublicPrompts";
import styles from "./Prompt.module.scss";

type PromptProps = {
  usePromptProps: UsePromptProps;
  isUpdatingBrain: boolean;
};

export const Prompt = (props: PromptProps): JSX.Element => {
  const { isUpdatingBrain, usePromptProps } = props;

  const {
    pickPublicPrompt,
    submitPrompt,
    promptId,
    isRemovingPrompt,
    removeBrainPrompt,
  } = usePrompt(usePromptProps);

  return (
    <div className={styles.prompt_wrapper}>
      <PublicPrompts onSelect={pickPublicPrompt} />
      <div className={styles.name_wrapper}>
        <FieldHeader label="Prompt Name" iconName="prompt" />
        <Controller
          name="prompt.title"
          defaultValue=""
          render={({ field }) => (
            <TextInput
              label="Choose a name for your prompt"
              inputValue={field.value as string}
              setInputValue={field.onChange}
            />
          )}
        />
      </div>
      <div>
        <FieldHeader label="Prompt Instructions" iconName="paragraph" />
        <Controller
          name="prompt.content"
          defaultValue=""
          render={({ field }) => (
            <TextAreaInput
              label="Write specific instructions for your book here"
              inputValue={field.value as string}
              setInputValue={field.onChange}
            />
          )}
        />
      </div>
      <div className={styles.buttons_wrapper}>
        {promptId !== "" && (
          // biome-ignore lint/style/useSelfClosingElements: <explanation>
          <QuivrButton
            disabled={isUpdatingBrain || isRemovingPrompt}
            onClick={() => void removeBrainPrompt()}
            label="Remove Prompt"
            color="dangerous"
            iconName="delete"
          ></QuivrButton>
        )}
        <div>
          <QuivrButton
            label="Save"
            iconName="upload"
            color="primary"
            onClick={() => submitPrompt()}
          />
        </div>
      </div>
    </div>
  );
};
