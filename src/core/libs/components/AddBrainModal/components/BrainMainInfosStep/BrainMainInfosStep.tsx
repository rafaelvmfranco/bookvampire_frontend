import { Controller, useFormContext } from "react-hook-form";

import type { CreateBrainProps } from "~/core/libs/components/AddBrainModal/types/types";
import { FieldHeader } from "~/islands/ui/FieldHeader/FieldHeader";
import QuivrButton from "~/islands/ui/QuivrButton/QuivrButton";
import { TextAreaInput } from "~/islands/ui/TextAreaInput/TextAreaInput";
import { TextInput } from "~/islands/ui/TextInput/TextInput";

import { useBrainCreationSteps } from "../../hooks/useBrainCreationSteps";
import styles from "./BrainMainInfosStep.module.scss";

export const BrainMainInfosStep = (): JSX.Element => {
  const { currentStepIndex, goToNextStep, goToPreviousStep } =
    useBrainCreationSteps();

  const { watch } = useFormContext<CreateBrainProps>();
  const name = watch("name");
  const description = watch("description");

  const isDisabled = !name || !description;

  const next = (): void => {
    goToNextStep();
  };

  const previous = (): void => {
    goToPreviousStep();
  };

  if (currentStepIndex !== 1) {
    return <></>;
  }

  return (
    <div className={styles.brain_main_infos_wrapper}>
      <div className={styles.inputs_wrapper}>
        <span className={styles.title}>Define book identity</span>
        <div>
          <FieldHeader iconName="brain" label="Name" mandatory={true} />
          <Controller
            name="name"
            render={({ field }) => (
              <TextInput
                label="Enter your book name"
                inputValue={field.value as string}
                setInputValue={field.onChange}
              />
            )}
          />
        </div>
        <div>
          <FieldHeader
            iconName="paragraph"
            label="Description"
            mandatory={true}
          />
          <Controller
            name="description"
            render={({ field }) => (
              <TextAreaInput
                label="Enter your book description"
                inputValue={field.value as string}
                setInputValue={field.onChange}
              />
            )}
          />
        </div>
      </div>
      <div className={styles.buttons_wrapper}>
        <QuivrButton
          color="primary"
          label="Previous Step"
          onClick={() => previous()}
          iconName="chevronLeft"
        />
        <QuivrButton
          color="primary"
          label="Next Step"
          onClick={() => next()}
          iconName="chevronRight"
          disabled={isDisabled}
        />
      </div>
    </div>
  );
};
