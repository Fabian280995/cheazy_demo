import AddMealEntryBottomSheet from "@/components/meal-slots/AddMealEntryBottomSheet";
import HeaderIconButton from "@/components/screens/HeaderIconButton";
import { MEAL_SLOTS } from "@/constants/mealSlots";
import { useCreateFoodMealEntry } from "@/hooks/meal-entries/useCreateFoodMealEntry";
import { useMealEntryQuery } from "@/hooks/meal-entries/useMealEntryQuery";
import { useUpdateFoodMealEntry } from "@/hooks/meal-entries/useUpdateFoodMealEntry";
import { useHeaderOptions } from "@/hooks/navigation/useHeaderOptions";
import { useAuth } from "@/providers/auth";
import { useCalendar } from "@/providers/calendar";
import { useFood } from "@/providers/food";
import { useTheme } from "@/providers/theme";
import FoodDetailScreen from "@/screens/FoodDetailScreen";
import { MealSlot } from "@/types";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect } from "react";

const FoodDetail = () => {
  const { food } = useFood();
  const router = useRouter();
  const { colors } = useTheme();
  const { currentDate } = useCalendar();
  const { user } = useAuth();
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
  const { mutateAsync: createFoodMealEntry, isPending: creating } =
    useCreateFoodMealEntry();
  const { mutateAsync: updateFoodMealEntry, isPending: updating } =
    useUpdateFoodMealEntry();

  const [quantity, setQuantity] = React.useState<number>(
    mealEntryData?.quantity_g || 100
  );
  const [datetime, setDatetime] = React.useState<Date>(
    mealEntryData?.date ? new Date(mealEntryData.date) : currentDate
  );
  const [mealSlot, setMealSlot] = React.useState<MealSlot>(
    MEAL_SLOTS.find((m) => m.id === mealSlotId) || MEAL_SLOTS[0]
  );

  const handleAddFood = async () => {
    if (!user) {
      console.error("User not authenticated");
      return;
    }
    if (mealEntryId) {
      await updateFoodMealEntry({
        id: mealEntryId,
        foodId: food.id,
        date: datetime,
        slot: mealSlot.id,
        quantityG: quantity,
      });
    } else {
      await createFoodMealEntry({
        foodId: food.id,
        date: datetime,
        slot: mealSlot.id,
        quantityG: quantity,
        userId: user.id,
      });
    }
    router.back();
  };

  useEffect(() => {
    if (mealEntryData) {
      setBottomSheetOpen(true);
    }
  }, [mealEntryData]);

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
      <FoodDetailScreen food={food} quantity={quantity} />

      <AddMealEntryBottomSheet
        open={bottomSheetOpen}
        onClose={() => {
          setBottomSheetOpen(false);
        }}
        onAdd={handleAddFood}
        quantity={quantity}
        setQuantity={setQuantity}
        datetime={datetime}
        setDatetime={setDatetime}
        mealSlot={mealSlot}
        setMealSlot={setMealSlot}
        isLoading={creating || updating}
        update={!!mealEntryId}
      />
    </>
  );
};

export default FoodDetail;
