import { forwardRef } from "react";
import { SuggestionKeyDownProps } from "@tiptap/suggestion";

import { useMentionList } from "./hooks/useMentionList";
import { MentionItem } from "./MentionItem/MentionItem";
import styles from "./MentionsList.module.scss";
import { MentionListProps } from "./types";

export type MentionListRef = {
  onKeyDown: (event: SuggestionKeyDownProps) => boolean;
};

export const MentionList = forwardRef<MentionListRef, MentionListProps>(
  (props, ref) => {
    const { selectItem, selectedIndex } = useMentionList({
      ...props,
      ref,
    });

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
      event.preventDefault();
      event.stopPropagation();
    };

    return (
      <div className={styles.mentions_list_wrapper} onClick={handleClick}>
        <div className={styles.mentions_list}>
          {props.suggestionData.items.map((item, index) => (
            <MentionItem
              key={item.id}
              item={item}
              isSelected={index === selectedIndex}
              onClick={() => selectItem(index)}
              type={props.suggestionData.type}
            />
          ))}
        </div>
      </div>
    );
  },
);

MentionList.displayName = "MentionList";
