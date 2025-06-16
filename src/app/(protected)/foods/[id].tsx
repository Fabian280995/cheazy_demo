import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";

const FoodDetail = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  return (
    <View>
      <Text>FoodDetail</Text>
    </View>
  );
};

export default FoodDetail;
