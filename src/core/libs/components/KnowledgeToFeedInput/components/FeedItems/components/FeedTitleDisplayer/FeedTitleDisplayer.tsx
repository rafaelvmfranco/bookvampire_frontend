import Tooltip from "~/islands/ui/Tooltip/Tooltip";

import { enhanceUrlDisplay } from "./utils/enhanceUrlDisplay";
import { removeFileExtension } from "./utils/removeFileExtension";

type FeedTitleDisplayerProps = {
  title: string;
  isUrl?: boolean;
};

export const FeedTitleDisplayer = ({
  title,
  isUrl = false,
}: FeedTitleDisplayerProps): JSX.Element => {
  return (
    <div>
      <Tooltip tooltip={title}>
        <p className={`line-clamp-1 tooltip-${title}`}>
          {isUrl ? enhanceUrlDisplay(title) : removeFileExtension(title)}
        </p>
      </Tooltip>
    </div>
  );
};
