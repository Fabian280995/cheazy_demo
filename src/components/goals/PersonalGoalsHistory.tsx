import { View, Text } from "react-native";
import React from "react";
import { usePersonalGoalsQuery } from "@/hooks/personal-goals/usePersonalGoalsQuery";
import PersonalGoalsList from "./PersonalGoalsList";
import EntryNotFoundScreen from "../shared/EntryNotFoundScreen";
import LoadingIndicator from "../shared/LoadingIndicator";

const PersonalGoalsHistory = () => {
  const {
    data: personalGoals,
    isLoading,
    isError,
    error,
  } = usePersonalGoalsQuery();

  if (isError) {
    console.error("Error fetching recipe:", error);
    return (
      <EntryNotFoundScreen title="Es gab ein Fehler beim abrufen deiner Ziele." />
    );
  }

  if (isLoading || !personalGoals) {
    return <LoadingIndicator />;
  }

  return <PersonalGoalsList personalGoals={personalGoals} />;
};

export default PersonalGoalsHistory;
