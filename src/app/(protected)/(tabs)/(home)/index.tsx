import DailyCaloriesCard from "@/components/overview/DailyCaloriesCard";
import React from "react";
import { ScrollView } from "react-native";

const Home = () => {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={{ flex: 1 }}
      contentContainerStyle={{
        padding: 16,
      }}
    >
      <DailyCaloriesCard />
    </ScrollView>
  );
};

export default Home;
