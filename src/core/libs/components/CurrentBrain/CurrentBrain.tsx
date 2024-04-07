import Image from "next/image";
import { useBrainContext } from "~/core/libs/context/BrainProvider/hooks/useBrainContext";
import DefaultImage from "~/core/assets/default.png";
import { Icon } from "~/islands/ui/Icon/Icon";
import { cn } from "~/core/utils";

interface CurrentBrainProps {
  allowingRemoveBrain: boolean;
}

export const CurrentBrain = ({
  allowingRemoveBrain,
}: CurrentBrainProps): JSX.Element => {
  const { currentBrain, setCurrentBrainId } = useBrainContext();

  const removeCurrentBrain = (): void => {
    setCurrentBrainId(null);
  };

  /* if (!currentBrain) {
    return <></>;
  } */

  return (
    <div className="bg-background-2 px-5 py-1 -mb-4 text-sm text-text-1 bg-card">
      <div className="flex justify-between items-center overflow-hidden">
        <div className="flex gap-2 items-center overflow-ellipsis overflow-hidden text-slate-900 dark:text-slate-200">
          <span className="whitespace-nowrap opacity-50">Talking to</span>
          <div className="flex gap-2 items-center overflow-hidden">
            <Image
              className="dark:invert"
              /* src={
                currentBrain.integration_logo_url
                  ? currentBrain.integration_logo_url
                  : "/default_brain_image.png"
              } */
              src={DefaultImage}
              alt="logo_image"
              width={18}
              height={18}
            />
            <span className="text-text-3 overflow-ellipsis overflow-hidden">
              Book name{/* {currentBrain.name} */}
            </span>
          </div>
        </div>
        {allowingRemoveBrain && currentBrain && (
          // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
          <div
            onClick={(event) => {
              event.nativeEvent.stopImmediatePropagation();
              removeCurrentBrain();
            }}
          >
            <Icon size="normal" name="close" color="grey" handleHover={true} />
          </div>
        )}
      </div>
    </div>
  );
};
