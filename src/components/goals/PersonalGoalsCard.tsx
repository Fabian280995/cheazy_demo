import { PersonalGoal } from "@/types";
import { View, Text } from "react-native";
import React from "react";
import Card from "../shared/Card";
import { SwipeableListItem } from "../shared/list/ListItem";

interface Props {
  personalGoal: PersonalGoal;
}

const PersonalGoalsCard = ({ personalGoal }: Props) => {
  return (
    <View>
      <Text>Kalorien: {personalGoal.kcal} kcal</Text>
      <Text>Protein: {personalGoal.proteins_g} g</Text>
      <Text>Kohlenhydrate: {personalGoal.carbs_g} g</Text>
      <Text>Fett: {personalGoal.fats_g} g</Text>
    </View>
  );
};

export default PersonalGoalsCard;
