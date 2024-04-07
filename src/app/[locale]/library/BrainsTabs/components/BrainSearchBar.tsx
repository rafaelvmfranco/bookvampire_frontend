import { useTranslations } from "next-intl";

import { TextInput } from "~/islands/ui/TextInput/TextInput";

type BrainSearchBarProps = {
  searchQuery: string;
  setSearchQuery: (searchQuery: string) => void;
};

export const BrainSearchBar = ({
  searchQuery,
  setSearchQuery,
}: BrainSearchBarProps): JSX.Element => {
  const t = useTranslations("brain");

  return (
    <TextInput
      iconName="search"
      label={t("searchBrain")}
      inputValue={searchQuery}
      setInputValue={setSearchQuery}
    />
  );
};
