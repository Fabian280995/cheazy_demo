import { ISetting } from "@/types/settings";
import React from "react";
import SettingItemWrapper from "./SettingsItemWrapper";

interface Props {
  settings: ISetting[];
}
const SettingsItemList = ({ settings }: Props) => {
  return settings.map((s) => {
    const isLast = settings.indexOf(s) === settings.length - 1;
    const isFirst = settings.indexOf(s) === 0;
    return (
      <SettingItemWrapper isLast={isLast} isFirst={isFirst} key={s.key}>
        {s.render()}
      </SettingItemWrapper>
    );
  });
};

export default SettingsItemList;
