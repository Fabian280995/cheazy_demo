import HeaderIconButton from "@/components/screens/HeaderIconButton";
import { MEAL_SLOTS } from "@/constants/mealSlots";
import { useGetFoodById } from "@/hooks/foods/useGetFoodById";
import { useMealEntryQuery } from "@/hooks/meal-entries/useMealEntryQuery";
import { useHeaderOptions } from "@/hooks/navigation/useHeaderOptions";
import { useCalendar } from "@/providers/calendar";
import { useTheme } from "@/providers/theme";
import FoodDetailScreen from "@/screens/FoodDetailScreen";
import { FoodModel } from "@/types";
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
  const { id, mealEntryId, mealSlotId } = useLocalSearchParams<{
    id: string;
    mealEntryId?: string;
    mealSlotId?: string;
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
              : {
                  datetime: currentDate,
                  mealSlot:
                    MEAL_SLOTS.find(
                      (m) =>
                        m.id.toLowerCase() ===
                        (mealSlotId as string)?.toLowerCase()
                    ) ?? MEAL_SLOTS[0],
                }
          }
        />
      )}
    </>
  );
};

export default FoodDetail;
