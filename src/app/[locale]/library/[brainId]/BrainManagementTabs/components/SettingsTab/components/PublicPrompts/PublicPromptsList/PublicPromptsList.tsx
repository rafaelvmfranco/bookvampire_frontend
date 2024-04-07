import { ChangeEvent } from "react";

import { Prompt } from "~/core/libs/types/Prompt";
import { SingleSelector } from "~/islands/ui/SingleSelector/SingleSelector";

import { usePublicPromptsList } from "./hooks/usePublicPromptsList";

type PublicPromptsListProps = {
  options: Prompt[];
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
  onSelect: ({ title, content }: { title: string; content: string }) => void;
};

export const PublicPromptsList = ({
  options,
  onChange,
  onSelect,
}: PublicPromptsListProps): JSX.Element => {
  const { handleOptionClick, selectedOption } = usePublicPromptsList({
    onChange,
    onSelect,
  });

  const formattedOptions = options.map((option) => {
    return { label: option.title, value: option.id };
  });

  return (
    <SingleSelector
      options={formattedOptions}
      iconName="brain"
      selectedOption={
        selectedOption
          ? {
              label: selectedOption.title,
              value: selectedOption.id,
            }
          : undefined
      }
      placeholder="Select a Quivr prompt"
      onChange={(clickedOption) => {
        const findedOption = options.find(
          (option) => option.id === clickedOption,
        );
        if (findedOption) {
          handleOptionClick(findedOption);
        }
      }}
    />
  );
};
