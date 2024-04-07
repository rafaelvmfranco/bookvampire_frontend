import type { iconList } from "~/core/libs/helpers/iconList";

import type { Color } from "./Colors";

export type Option = {
  label: string;
  iconName: keyof typeof iconList;
  onClick: () => void;
  iconColor: Color;
  disabled?: boolean;
};
