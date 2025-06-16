import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  ScrollViewBase,
} from "react-native";
import React from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useGetFoodById } from "@/hooks/foods/useGetFoodById";
import { useTheme } from "@/providers/theme";
import { useHeaderOptions } from "@/hooks/navigation/useHeaderOptions";
import HeaderIconButton from "@/components/screens/HeaderIconButton";
import FoodDetailScreen from "@/screens/FoodDetailScreen";
import { FoodModel } from "@/types";

const FoodDetail = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: food, isLoading } = useGetFoodById(id);
  const { colors } = useTheme();
  const headerOptions = useHeaderOptions({
    title: "",
    largeTitle: false,
  });

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!food) {
    return <Text>Food not found</Text>;
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{
        paddingBottom: 96,
      }}
    >
      <Stack.Screen
        options={{
          ...headerOptions,
          headerLeft: () => (
            <HeaderIconButton
              iconName="arrow-left"
              onPress={() => router.back()}
              color={colors.text}
              shadow
            />
          ),
        }}
      />
      <FoodDetailScreen
        food={food}
        onAddFood={(food: FoodModel) => {
          // Handle adding food to a meal or diary
          console.log("Add food:", food);
        }}
        addLabel="Zu Mahlzeit hinzufügen"
      />
    </ScrollView>
  );
};

export default FoodDetail;
