import { iconList } from "../helpers/iconList";
import { Color } from "./Colors";

export interface ButtonType {
  label: string;
  color: Color;
  isLoading?: boolean;
  iconName: keyof typeof iconList;
  onClick?: () => void | Promise<void>;
  disabled?: boolean;
  hidden?: boolean;
}
