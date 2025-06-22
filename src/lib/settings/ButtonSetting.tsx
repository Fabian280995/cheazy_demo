// src/constants/ButtonSetting.tsx
import SettingIconWrapper from "@/components/settings/SettingIconWrapper";
import SettingLabel from "@/components/settings/SettingLabel";
import { ThemeColors } from "@/types";
import { SettingsType } from "@/types/settings";
import { Feather } from "@expo/vector-icons";
import React, { ComponentProps } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { SettingBase } from "./SettingBase";

export class ButtonSetting extends SettingBase {
  constructor(
    key: string,
    label: string,
    iconName: ComponentProps<typeof Feather>["name"],
    private onPress: () => void,
    private colors: ThemeColors,
    private navigationIndicator?: boolean
  ) {
    super(SettingsType.TOGGLE, key, label, iconName);
  }

  render() {
    return (
      <Pressable
        style={styles.container}
        onPress={() => {
          this.onPress();
        }}
      >
        <View style={styles.labelWrapper}>
          <SettingIconWrapper>
            <Feather name={this.iconName} size={24} color={this.colors.text} />
          </SettingIconWrapper>
          <SettingLabel label={this.label} />
        </View>

        {this.navigationIndicator && (
          <Feather
            name={"chevron-right"}
            size={24}
            color={this.colors.textLight}
          />
        )}
      </Pressable>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  labelWrapper: {
    flexDirection: "row",
    alignItems: "center",
    flexShrink: 1, // schrumpft bei Platzmangel
    marginRight: 8,
  },
  label: {
    marginLeft: 8,
    fontSize: 16,
  },
  switch: {
    flexShrink: 0, // bleibt immer seine native Größe
  },
});
