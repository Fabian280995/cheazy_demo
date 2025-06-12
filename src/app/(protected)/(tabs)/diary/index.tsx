import DiaryScreen from "@/screens/DiaryScreen";
import React from "react";
import { ScrollView } from "react-native";

const Journal = () => {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{ flex: 1 }}
      contentContainerStyle={{
        padding: 16,
      }}
    >
      <DiaryScreen />
    </ScrollView>
  );
};

export default Journal;
