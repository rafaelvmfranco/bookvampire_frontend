import Image from "next/image";
import { capitalCase } from "change-case";

import type { IntegrationBrains } from "~/core/libs/api/brain/types";
import { useUserSettingsContext } from "~/core/libs/context/UserSettingsProvider/hooks/useUserSettingsContext";
import { MessageInfoBox } from "~/islands/ui/MessageInfoBox/MessageInfoBox";
import { Tag } from "~/islands/ui/Tag/Tag";
import Tooltip from "~/islands/ui/Tooltip/Tooltip";

import { useBrainCreationContext } from "../../../brainCreation-provider";
import styles from "./BrainCatalogue.module.scss";

export const BrainCatalogue = ({
  brains,
  next,
}: {
  brains: IntegrationBrains[];
  next: () => void;
}): JSX.Element => {
  const { setCurrentSelectedBrain, currentSelectedBrain } =
    useBrainCreationContext();
  const { isDarkMode } = useUserSettingsContext();

  return (
    <div className={styles.cards_wrapper}>
      <MessageInfoBox type="info">
        <span>
          A Book Vampire is a specialized AI tool designed to interact with
          specific use cases or data sources.
        </span>
      </MessageInfoBox>
      <span className={styles.title}>Choose a book type</span>
      <div className={styles.brains_grid}>
        {brains.map((brain) => {
          return (
            // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
            <div
              key={brain.id}
              className={styles.brain_card_container}
              onClick={() => {
                next();
                setCurrentSelectedBrain(brain);
              }}
            >
              <Tooltip tooltip={brain.description}>
                <div
                  className={`${styles.brain_card_wrapper} ${
                    currentSelectedBrain === brain ? styles.selected : ""
                  }`}
                >
                  <Image
                    className={isDarkMode ? styles.dark_image : ""}
                    src={brain.integration_logo_url}
                    alt={brain.integration_name}
                    width={50}
                    height={50}
                  />
                  <span className={styles.brain_title}>
                    {brain.integration_display_name}
                  </span>
                  <div className={styles.tag_wrapper}>
                    {brain.tags[0] && (
                      <Tag color="primary" name={capitalCase(brain.tags[0])} />
                    )}
                  </div>
                </div>
              </Tooltip>
            </div>
          );
        })}
      </div>
    </div>
  );
};
