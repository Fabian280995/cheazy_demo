import { useTheme } from "@/providers/theme";
import React from "react";
import { Text, ViewStyle } from "react-native";
import CardIcon from "../shared/CardIcon";
import { PressableListItem } from "../shared/list/ListItem";

interface Props {
  id?: string;
  onPress: () => void;
  label?: string;
  style?: ViewStyle;
  isLast?: boolean;
  isFirst?: boolean;
}

const AddEntryButton = ({
  id,
  onPress: handleAddEntryPress,
  label = "Eintrag hinzufügen",
  style,
  isLast = false,
  isFirst = false,
}: Props) => {
  const { colors } = useTheme();
  return (
    <PressableListItem
      key={id}
      isFirst={isFirst}
      isLast={isLast}
      style={{
        flexDirection: "row",
        alignItems: "center",
        ...style,
      }}
      onPress={handleAddEntryPress}
    >
      <CardIcon
        name="plus"
        size={36}
        color={colors.textForeground}
        bgColor={colors.primary}
      />
      <Text
        style={{
          fontFamily: "Nunito",
          color: colors.text,
          fontWeight: "700",
          fontSize: 16,
          marginLeft: 8,
        }}
      >
        {label}
      </Text>
    </PressableListItem>
  );
};

export default AddEntryButton;
