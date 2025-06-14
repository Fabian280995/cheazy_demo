// src/components/settings/SettingsBlock.tsx
import { useTheme } from "@/providers/theme";
import { ISetting } from "@/types/settings";
import React from "react";
import { Text } from "react-native";
import SettingsBlockWrapper from "./SettingsBlockWrapper";
import SettingsItemList from "./SettingsItemList";
import SettingsLabel from "./SettingsLabel";
import SettingsListWrapper from "./SettingsListWrapper";

interface Props {
  settings: ISetting[];
  label?: string;
  description?: string;
}

const SettingsBlock: React.FC<Props> = ({ settings, label, description }) => {
  const { colors } = useTheme();
  return (
    <SettingsBlockWrapper>
      {label && <SettingsLabel label={label} />}
      <SettingsListWrapper>
        <SettingsItemList settings={settings} />
      </SettingsListWrapper>
      {description && (
        <Text
          style={{
            fontFamily: "Inter",
            fontSize: 14,
            color: colors.textLight,
            textAlign: "center",
          }}
        >
          {description}
        </Text>
      )}
    </SettingsBlockWrapper>
  );
};

export default SettingsBlock;
