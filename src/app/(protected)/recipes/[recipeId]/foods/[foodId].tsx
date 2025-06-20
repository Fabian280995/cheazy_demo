import HeaderIconButton from "@/components/screens/HeaderIconButton";
import { MEAL_SLOTS } from "@/constants/mealSlots";
import { useGetFoodById } from "@/hooks/foods/useGetFoodById";
import { useHeaderOptions } from "@/hooks/navigation/useHeaderOptions";
import { useCalendar } from "@/providers/calendar";
import { useTheme } from "@/providers/theme";
import FoodDetailScreen from "@/screens/FoodDetailScreen";
import { MealSlotId } from "@/types";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { ActivityIndicator, Text, View } from "react-native";

const FoodDetail = () => {
  const router = useRouter();
  const { colors } = useTheme();
  const { currentDate } = useCalendar();
  const headerOptions = useHeaderOptions({
    title: "",
    largeTitle: false,
  });
  const { foodId } = useLocalSearchParams<{
    foodId: string;
  }>();

  const { data: food, isLoading } = useGetFoodById(foodId as string);
  const handleAddFood = async (
    date: Date,
    mealSlotId: MealSlotId,
    quantity: number
  ) => {};

  return (
    <>
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
      {isLoading ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: colors.background,
          }}
        >
          <ActivityIndicator size="large" color={colors.secondary} />
        </View>
      ) : !food ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: colors.background,
          }}
        >
          <Text style={{ color: colors.text }}>
            Nahrungsmittel nicht gefunden.
          </Text>
        </View>
      ) : (
        <FoodDetailScreen
          food={food}
          onAddFood={handleAddFood}
          addLabel="Zu Rezept hinzufügen"
        />
      )}
    </>
  );
};

export default FoodDetail;
