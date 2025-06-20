import { useTheme } from "@/providers/theme";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import CardIcon from "../shared/CardIcon";
import MealSlotEntryContainer from "./MealSlotEntryContainer";

interface Props {
  id: string;
  onPress: () => void;
}

const AddEntryButton = ({ id, onPress: handleAddEntryPress }: Props) => {
  const { colors } = useTheme();
  return (
    <MealSlotEntryContainer key={`add-entry-${id}`}>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: colors.foreground,
          paddingHorizontal: 12,
          paddingVertical: 8,
          borderBottomLeftRadius: 16,
          borderBottomRightRadius: 16,
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
          Eintrag hinzufügen
        </Text>
      </TouchableOpacity>
    </MealSlotEntryContainer>
  );
};

export default AddEntryButton;
