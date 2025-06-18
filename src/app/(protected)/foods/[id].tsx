import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  ScrollViewBase,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useGetFoodById } from "@/hooks/foods/useGetFoodById";
import { useTheme } from "@/providers/theme";
import { useHeaderOptions } from "@/hooks/navigation/useHeaderOptions";
import HeaderIconButton from "@/components/screens/HeaderIconButton";
import FoodDetailScreen from "@/screens/FoodDetailScreen";
import { FoodModel } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import { useMealEntryQuery } from "@/hooks/meal-entries/useMealEntryQuery";
import { MEAL_SLOTS } from "@/constants/mealSlots";

const FoodDetail = () => {
  const router = useRouter();
  const { colors } = useTheme();
  const headerOptions = useHeaderOptions({
    title: "",
    largeTitle: false,
  });
  const { id, mealEntryId } = useLocalSearchParams<{
    id: string;
    mealEntryId?: string;
  }>();
  const { data: food, isLoading } = useGetFoodById(id as string);
  const { data: mealEntryData } = useMealEntryQuery(mealEntryId as string);

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
          onAddFood={(food: FoodModel) => {
            // Handle adding food to a meal or diary
            console.log("Add food:", food);
          }}
          addLabel="Zu Mahlzeit hinzufügen"
          initialEntryData={
            mealEntryData
              ? {
                  id: mealEntryData.id,
                  datetime: new Date(mealEntryData.date),
                  mealSlot:
                    MEAL_SLOTS.find((slot) => {
                      return (
                        console.log("Meal Slot:", slot.id, mealEntryData.slot),
                        slot.id.toLowerCase() ===
                          mealEntryData.slot.toLowerCase()
                      );
                    }) ?? MEAL_SLOTS[0],
                  // null -> undefined
                  quantity: mealEntryData.quantity_g ?? undefined,
                }
              : undefined
          }
        />
      )}
    </>
  );
};

export default FoodDetail;
