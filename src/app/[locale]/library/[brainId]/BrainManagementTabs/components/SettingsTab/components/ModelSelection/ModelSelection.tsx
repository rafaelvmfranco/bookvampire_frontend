import type { UUID } from "node:crypto";

import { defineMaxTokens } from "~/core/libs/helpers/defineMaxTokens";
import type { Model } from "~/core/libs/types/BrainConfig";
import { FieldHeader } from "~/islands/ui/FieldHeader/FieldHeader";
import { SingleSelector } from "~/islands/ui/SingleSelector/SingleSelector";

import { useBrainFormState } from "../../hooks/useBrainFormState";
import styles from "./ModelSelection.module.scss";

type ModelSelectionProps = {
  brainId: UUID;
  handleSubmit: (checkDirty: boolean) => Promise<void>;
  hasEditRights: boolean;
  accessibleModels: string[];
};

export const ModelSelection = (props: ModelSelectionProps): JSX.Element => {
  const { model, maxTokens, register, setModel } = useBrainFormState();
  const { handleSubmit, hasEditRights, accessibleModels } = props;

  const accessibleModelOptions = accessibleModels.map((accessibleModel) => {
    return { value: accessibleModel, label: accessibleModel };
  });

  return (
    <div className={styles.model_selection_wrapper}>
      <fieldset
        {...register("model", {
          value: accessibleModelOptions[0].value as Model,
        })}
      >
        <FieldHeader
          label="Model"
          iconName="robot"
          help="Changing the model could make this book smarter, understanding you better and giving you more helpful answers."
        />
        <SingleSelector
          options={accessibleModelOptions}
          onChange={(option) => {
            setModel(option as Model);
            void handleSubmit(false);
          }}
          selectedOption={{ value: model, label: model }}
          placeholder="Select a model"
          iconName="robot"
        />
      </fieldset>
      <fieldset>
        <FieldHeader
          label="Max tokens"
          iconName="hashtag"
          help="Increasing the number of tokens this book can use in its replies will give you more detailed answers"
        />
        <div className={styles.max_tokens}>
          <input
            className={styles.slider}
            type="range"
            min="10"
            max={defineMaxTokens(model)}
            value={maxTokens}
            disabled={!hasEditRights}
            {...register("maxTokens")}
          />
          <span>{maxTokens}</span>
        </div>
      </fieldset>
    </div>
  );
};
