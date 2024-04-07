import Link from "next/link";
import { usePathname } from "next/navigation";

import { MenuButton } from "~/core/libs/components/Menu/components/MenuButton/MenuButton";

export const LibraryButton = (): JSX.Element => {
  const pathname = usePathname();
  const isSelected = pathname ? pathname.includes("/library") : false;

  return (
    <Link href="/library">
      <MenuButton
        label="Book Library"
        isSelected={isSelected}
        iconName="brainCircuit"
        type="open"
        color="primary"
      />
    </Link>
  );
};
