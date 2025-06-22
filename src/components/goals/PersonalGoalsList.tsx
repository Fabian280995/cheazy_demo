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
    <View style={{ marginTop: 32 }}>
      {personalGoals.length > 0 ? (
        personalGoals.map((goal, index) => (
          <SwipeableListItem
            key={goal.id}
            isFirst={index === 0}
            isLast={index === personalGoals.length - 1}
          >
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
