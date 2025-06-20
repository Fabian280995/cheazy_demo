import { useTheme } from "@/providers/theme";
import React from "react";
import { Text } from "react-native";
import CardIcon from "../shared/CardIcon";
import { PressableListItem } from "../shared/list/ListItem";

interface Props {
  id: string;
  onPress: () => void;
  label?: string;
}

const AddEntryButton = ({
  id,
  onPress: handleAddEntryPress,
  label = "Eintrag hinzufügen",
}: Props) => {
  const { colors } = useTheme();
  return (
    <PressableListItem
      isLast
      style={{
        flexDirection: "row",
        alignItems: "center",
      }}
      onPress={handleAddEntryPress}
    >
      <CardIcon
        name="add"
        size={36}
        color={colors.textForeground}
        bgColor={colors.primary}
      />
      <Text
        style={{
          fontFamily: "Nunito",
          color: colors.text,
          fontWeight: "700",
          fontSize: 14,
          marginLeft: 8,
        }}
      >
        {label}
      </Text>
    </PressableListItem>
  );
};

export default AddEntryButton;
