import Spinner from "~/islands/ui/Spinner";

import { useBrainsTabs } from "../../hooks/useBrainsTabs";
import { BrainSearchBar } from "../BrainSearchBar";
import { BrainsList } from "../BrainsList/BrainsList";
import styles from "./ManageBrains.module.scss";

export const ManageBrains = (): JSX.Element => {
  const { searchQuery, isFetchingBrains, setSearchQuery, brains } =
    useBrainsTabs();

  if (isFetchingBrains && brains.length === 0) {
    return (
      <div className="flex w-full h-full justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className={styles.manage_brains_wrapper}>
      <div className={styles.search_brain}>
        <BrainSearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </div>

      <BrainsList brains={brains} />
    </div>
  );
};
