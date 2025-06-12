import { View, Text, ScrollView } from "react-native";
import React from "react";

const Journal = () => {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{ flex: 1 }}
      contentContainerStyle={{
        padding: 16,
      }}
    >
      <Text>Diary Stack</Text>
    </ScrollView>
  );
};

export default Journal;
