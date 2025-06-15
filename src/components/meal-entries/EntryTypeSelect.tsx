import {
  View,
  Text,
  Touchable,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import { MealEntryType } from "@/types";
import { useTheme } from "@/providers/theme";

interface Props {
  selectedType: MealEntryType;
  onSelect: (type: MealEntryType) => void;
}

const EntryTypeSelect = ({ selectedType, onSelect }: Props) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ flexDirection: "row", alignItems: "center" }}
    >
      <EntryTypeButton
        type="food"
        isSelected={selectedType === "food"}
        onPress={() => onSelect("food")}
      />
      <EntryTypeButton
        type="recipe"
        isSelected={selectedType === "recipe"}
        onPress={() => onSelect("recipe")}
      />
    </ScrollView>
  );
};

const EntryTypeButton = ({
  type,
  isSelected,
  onPress,
}: {
  type: MealEntryType;
  isSelected: boolean;
  onPress: () => void;
}) => {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        paddingHorizontal: 12,
        paddingVertical: 12,
        minWidth: 80,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: isSelected ? colors.primary : colors.foreground,
        borderRadius: 16,
        marginRight: 10,
        shadowColor: isSelected ? colors.shadow : "transparent",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: isSelected ? 5 : 0,
      }}
    >
      <Text
        style={{
          fontSize: 16,
          color: isSelected ? colors.textForeground : colors.text,
        }}
      >
        {type === "recipe" ? "Recipe" : "Food"}
      </Text>
    </TouchableOpacity>
  );
};

export default EntryTypeSelect;
