import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

import { MenuButton } from "~/core/libs/components/Menu/components/MenuButton/MenuButton";

export const HomeButton = (): JSX.Element => {
  const pathname = usePathname() ?? "";
  const isSelected = pathname.includes("/search");
  const t = useTranslations("chat");

  return (
    <Link href="/search">
      <MenuButton
        label={t("home")}
        isSelected={isSelected}
        iconName="home"
        type="open"
        color="primary"
      />
    </Link>
  );
};
