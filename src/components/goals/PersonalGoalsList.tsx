import { View, Text } from "react-native";
import React from "react";
import { PersonalGoal } from "@/types";
import PersonalGoalsCard from "./PersonalGoalsCard";
import { SwipeableListItem } from "../shared/list/ListItem";

interface Props {
  personalGoals: PersonalGoal[];
}

const PersonalGoalsList = ({ personalGoals }: Props) => {
  return (
    <View style={{ padding: 16 }}>
      {personalGoals.length > 0 ? (
        personalGoals.map((goal) => (
          <SwipeableListItem key={goal.id}>
            <PersonalGoalsCard personalGoal={goal} />
          </SwipeableListItem>
        ))
      ) : (
        <Text style={{ textAlign: "center", color: "#888" }}>
          Keine persönlichen Ziele festgelegt.
        </Text>
      )}
    </View>
  );
};

export default PersonalGoalsList;
