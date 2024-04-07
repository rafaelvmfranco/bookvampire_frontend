import { useMenuContext } from "~/core/libs/context/MenuProvider/hooks/useMenuContext";
import { useDevice } from "~/core/libs/hooks/useDevice";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const useOutsideClickListener = () => {
  const { isOpened, setIsOpened } = useMenuContext();
  const { isMobile } = useDevice();

  const onClickOutside = () => {
    if (isOpened && isMobile) {
      setIsOpened(false);
    }
  };

  return {
    onClickOutside,
  };
};
