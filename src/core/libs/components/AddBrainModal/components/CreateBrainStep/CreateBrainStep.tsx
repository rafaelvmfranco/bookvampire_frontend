import { useEffect, useState } from "react";
import { capitalCase } from "change-case";

import { KnowledgeToFeed } from "~/app/[locale]/chat/[chatId]/components/ActionsBar/components";
import { MessageInfoBox } from "~/islands/ui/MessageInfoBox/MessageInfoBox";
import QuivrButton from "~/islands/ui/QuivrButton/QuivrButton";
import { TextInput } from "~/islands/ui/TextInput/TextInput";

import { useBrainCreationContext } from "../../brainCreation-provider";
import { useBrainCreationSteps } from "../../hooks/useBrainCreationSteps";
import styles from "./CreateBrainStep.module.scss";
import { useBrainCreationApi } from "./hooks/useBrainCreationApi";

export const CreateBrainStep = (): JSX.Element => {
  const { currentStepIndex, goToPreviousStep } = useBrainCreationSteps();
  const { createBrain, fields, setFields } = useBrainCreationApi();
  const { creating, setCreating, currentSelectedBrain } =
    useBrainCreationContext();
  const [createBrainStepIndex, setCreateBrainStepIndex] = useState<number>(0);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (currentSelectedBrain?.connection_settings) {
      const newFields = Object.entries(
        currentSelectedBrain.connection_settings,
      ).map(([key, type]) => {
        return { name: key, type, value: "" };
      });
      setFields(newFields);
    }

    setCreateBrainStepIndex(Number(!currentSelectedBrain?.connection_settings));
  }, [currentSelectedBrain?.connection_settings]);

  const handleInputChange = (name: string, value: string) => {
    setFields(
      fields.map((field) =>
        field.name === name ? { ...field, value } : field,
      ),
    );
  };

  const previous = (): void => {
    goToPreviousStep();
  };

  const feed = (): void => {
    setCreating(true);
    createBrain();
  };

  if (currentStepIndex !== 2) {
    return <></>;
  }

  return (
    <div className={styles.brain_knowledge_wrapper}>
      {!createBrainStepIndex && (
        <div className={styles.settings_wrapper}>
          <MessageInfoBox type="warning">
            {currentSelectedBrain?.information}
          </MessageInfoBox>
          {fields.map(({ name, value }) => (
            <TextInput
              key={name}
              inputValue={value}
              setInputValue={(inputValue) =>
                handleInputChange(name, inputValue)
              }
              label={capitalCase(name)}
            />
          ))}
        </div>
      )}
      {!!currentSelectedBrain?.max_files && !!createBrainStepIndex && (
        <div>
          <span className={styles.title}>Feed your book</span>
          <KnowledgeToFeed hideBrainSelector={true} />
        </div>
      )}
      {!currentSelectedBrain?.max_files &&
        !currentSelectedBrain?.connection_settings && (
          <div className={styles.message_info_box_wrapper}>
            <MessageInfoBox type="info">
              <div className={styles.message_content}>
                Click on
                <QuivrButton
                  label="Create"
                  color="primary"
                  iconName="add"
                  onClick={feed}
                  isLoading={creating}
                />
                to finish your book creation.
              </div>
            </MessageInfoBox>
          </div>
        )}

      <div className={styles.buttons_wrapper}>
        <QuivrButton
          label="Previous step"
          color="primary"
          iconName="chevronLeft"
          onClick={previous}
        />
        {(!currentSelectedBrain?.max_files && !createBrainStepIndex) ||
        createBrainStepIndex ? (
          <QuivrButton
            label="Create"
            color="primary"
            iconName="add"
            onClick={feed}
            isLoading={creating}
          />
        ) : (
          <QuivrButton
            label="Feed your book"
            color="primary"
            iconName="add"
            onClick={() => setCreateBrainStepIndex(1)}
            isLoading={creating}
          />
        )}
      </div>
    </div>
  );
};
