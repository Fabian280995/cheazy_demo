import { useTheme } from "@/providers/theme";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import CardIcon from "../shared/CardIcon";
import ListItem from "../shared/list/ListItem";

interface Props {
  id: string;
  onPress: () => void;
}

const AddEntryButton = ({ id, onPress: handleAddEntryPress }: Props) => {
  const { colors } = useTheme();
  return (
    <ListItem isLast>
      <TouchableOpacity
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
          Eintrag hinzufügen
        </Text>
      </TouchableOpacity>
    </ListItem>
  );
};

export default AddEntryButton;
