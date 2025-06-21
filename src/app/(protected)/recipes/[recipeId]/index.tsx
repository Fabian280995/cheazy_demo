import AddMealEntryBottomSheet from "@/components/meal-slots/AddMealEntryBottomSheet";
import HeaderIconButton from "@/components/screens/HeaderIconButton";
import { MEAL_SLOTS } from "@/constants/mealSlots";
import { useMealEntryQuery } from "@/hooks/meal-entries/useMealEntryQuery";
import { useHeaderOptions } from "@/hooks/navigation/useHeaderOptions";
import { useCalendar } from "@/providers/calendar";
import { useTheme } from "@/providers/theme";
import RecipeDetailScreen from "@/screens/RecipeDetailScreen";
import { MealSlot } from "@/types";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React from "react";

const RecipeDetail = () => {
  const router = useRouter();
  const { colors } = useTheme();
  const { currentDate } = useCalendar();
  const headerOptions = useHeaderOptions({
    title: "",
    largeTitle: false,
  });
  const { mealEntryId, mealSlotId } = useLocalSearchParams<{
    mealEntryId?: string;
    mealSlotId?: string;
  }>();
  const { data: mealEntryData } = useMealEntryQuery(mealEntryId as string);
  const [bottomSheetOpen, setBottomSheetOpen] = React.useState(false);

  const [quantity, setQuantity] = React.useState<number>(
    mealEntryData?.quantity_g || 100
  );
  const [datetime, setDatetime] = React.useState<Date>(
    mealEntryData?.date ? new Date(mealEntryData.date) : currentDate
  );
  const [mealSlot, setMealSlot] = React.useState<MealSlot>(
    MEAL_SLOTS.find((m) => m.id === mealSlotId) || MEAL_SLOTS[0]
  );
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
          headerRight: () => (
            <HeaderIconButton
              iconName="plus"
              text={mealSlot ? mealSlot.label : "Hinzufügen"}
              onPress={() => {
                setBottomSheetOpen(true);
              }}
              color={colors.text}
              shadow
            />
          ),
        }}
      />
      <RecipeDetailScreen />
      <AddMealEntryBottomSheet
        open={bottomSheetOpen}
        onClose={() => {
          setBottomSheetOpen(false);
        }}
        onAdd={() => null}
        quantity={quantity}
        setQuantity={setQuantity}
        datetime={datetime}
        setDatetime={setDatetime}
        mealSlot={mealSlot}
        setMealSlot={setMealSlot}
        isLoading={false}
      />
    </>
  );
};

export default RecipeDetail;
