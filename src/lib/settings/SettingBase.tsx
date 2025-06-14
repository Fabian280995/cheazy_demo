// src/constants/SettingBase.tsx
import { ISetting, SettingsType } from "@/types/settings";
import { Feather } from "@expo/vector-icons";
import { ComponentProps, JSX } from "react";

/**
 * Abstrakte Basisklasse, die jedes Setting in der Constructor-Logik
 * schon mit Key/Label/Icon versorgt und ein abstraktes render() deklariert.
 */
export abstract class SettingBase implements ISetting {
  constructor(
    readonly type: SettingsType,
    readonly key: string,
    readonly label: string,
    readonly iconName: ComponentProps<typeof Feather>["name"]
  ) {}

  /** Muss von jeder Subklasse implementiert werden */
  abstract render(): JSX.Element;
}
