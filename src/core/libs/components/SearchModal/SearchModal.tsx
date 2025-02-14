import { useEffect, useRef } from "react";

import { useSearchModalContext } from "~/core/libs/context/SearchModalProvider/hooks/useSearchModalContext";

import { SearchBar } from "~/islands/ui/SearchBar/SearchBar";
import styles from "./SearchModal.module.scss";

export const SearchModal = (): JSX.Element => {
  const { isVisible, setIsVisible } = useSearchModalContext();
  const searchBarRef = useRef(null);

  const keydownHandler = ({
    key,
    metaKey,
  }: {
    key: string;
    metaKey: boolean;
  }) => {
    if (metaKey && key === "k") {
      setIsVisible(true);
    } else if (key === "Escape") {
      setIsVisible(false);
    }
  };

  const clickHandler = (event: MouseEvent) => {
    if (
      !(searchBarRef.current as HTMLElement | null)?.contains(
        event.target as Node,
      )
    ) {
      setIsVisible(false);
    }
  };

  const handleSearch = () => {
    setIsVisible(false);
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    document.addEventListener("keydown", keydownHandler);
    document.addEventListener("click", clickHandler);

    return () => {
      document.removeEventListener("keydown", keydownHandler);
      document.removeEventListener("click", clickHandler);
    };
  }, []);

  if (!isVisible) {
    return <></>;
  }

  return (
    <div className={styles.search_modal_wrapper}>
      <div className={styles.search_bar_wrapper} ref={searchBarRef}>
        <SearchBar onSearch={handleSearch} mode="bookSearch" />
      </div>
    </div>
  );
};

export default SearchModal;
