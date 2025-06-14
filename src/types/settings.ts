import { Feather } from "@expo/vector-icons";
import { ComponentProps } from "react";
import { JSX } from "react";

export enum SettingsType {
  LINK = "link",
  TOGGLE = "toggle",
  BUTTON = "button",
  TEXT = "text",
  SELECT = "select",
}

// export type Setting = {
//   label: string;
//   iconName: ComponentProps<typeof Feather>["name"];
//   type: SettingsType;
//   onPress?: () => void;
//   onChange?: (value: string) => void;
//   options?: string[];
//   selectedValue?: string;
//   disabled?: boolean;
// };

export interface ISetting {
  type: SettingsType;
  key: string;
  label: string;
  iconName: ComponentProps<typeof Feather>["name"];
  render: () => JSX.Element;
}
