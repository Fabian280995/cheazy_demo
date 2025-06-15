import { View, Text } from "react-native";
import React from "react";
import { FoodModel } from "@/types";

interface Props {
  foods: FoodModel[];
}

const FoodsList = ({ foods }: Props) => {
  return (
    <View>
      <Text>FoodsList</Text>
    </View>
  );
};

export default FoodsList;
