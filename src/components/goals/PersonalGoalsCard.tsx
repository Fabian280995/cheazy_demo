import { PersonalGoal } from "@/types";
import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Card from "../shared/Card";
import { SwipeableListItem } from "../shared/list/ListItem";
import { useDeletePersonalGoal } from "@/hooks/personal-goals/useDeletePersonalGoal";

interface Props {
  personalGoal: PersonalGoal;
}

const PersonalGoalsCard = ({ personalGoal }: Props) => {
  const { mutate: deletePG } = useDeletePersonalGoal();
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
          {personalGoal.kcal} kcal
        </Text>
        <TouchableOpacity
          onPress={() => deletePG(personalGoal.id)}
          style={{ padding: 8, backgroundColor: "#f00", borderRadius: 4 }}
        >
          <Text style={{ color: "#fff" }}>Löschen</Text>
        </TouchableOpacity>
      </View>
      <Text>Kalorien: {personalGoal.kcal} kcal</Text>
      <Text>Protein: {personalGoal.proteins_g} g</Text>
      <Text>Kohlenhydrate: {personalGoal.carbs_g} g</Text>
      <Text>Fett: {personalGoal.fats_g} g</Text>
    </View>
  );
};

export default PersonalGoalsCard;
