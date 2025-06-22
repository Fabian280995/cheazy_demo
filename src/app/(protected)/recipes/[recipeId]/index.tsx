import AddMealEntryBottomSheet from "@/components/meal-slots/AddMealEntryBottomSheet";
import HeaderIconButton from "@/components/screens/HeaderIconButton";
import { MEAL_SLOTS } from "@/constants/mealSlots";
import { useCreateRecipeMealEntry } from "@/hooks/meal-entries/useCreateRecipeMealEntry";
import { useMealEntryQuery } from "@/hooks/meal-entries/useMealEntryQuery";
import { useHeaderOptions } from "@/hooks/navigation/useHeaderOptions";
import { useAuth } from "@/providers/auth";
import { useCalendar } from "@/providers/calendar";
import { useRecipe } from "@/providers/recipe";
import { useTheme } from "@/providers/theme";
import RecipeDetailScreen from "@/screens/RecipeDetailScreen";
import { MealSlot } from "@/types";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect } from "react";

const RecipeDetail = () => {
  const router = useRouter();
  const { recipe } = useRecipe();
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
  const { user } = useAuth();
  const { data: mealEntryData } = useMealEntryQuery(mealEntryId as string);
  const [bottomSheetOpen, setBottomSheetOpen] = React.useState(false);
  const { mutateAsync: create, isPending: creating } =
    useCreateRecipeMealEntry();
  const { mutateAsync: udpate, isPending: updating } =
    useCreateRecipeMealEntry();

  const [portions, setPortions] = React.useState<number>(
    mealEntryData?.portions || 1
  );
  const [datetime, setDatetime] = React.useState<Date>(
    mealEntryData?.date ? new Date(mealEntryData.date) : currentDate
  );
  const [mealSlot, setMealSlot] = React.useState<MealSlot>(
    MEAL_SLOTS.find((m) => m.id === mealSlotId) || MEAL_SLOTS[0]
  );

  const handleAddToMeal = async () => {
    if (!user) {
      console.error("User not found");
      return;
    }

    if (mealEntryId) {
      // Update existing meal entry
      await udpate({
        userId: user.id,
        recipeId: recipe.id,
        date: datetime,
        slot: mealSlot.id,
        portions,
      });
    } else {
      // Create new meal entry
      await create({
        userId: user.id,
        recipeId: recipe.id,
        date: datetime,
        slot: mealSlot.id,
        portions,
      });
    }
    setBottomSheetOpen(false);
    router.back();
  };

  useEffect(() => {
    if (mealEntryData) {
      setPortions(mealEntryData.portions || 1);
      setDatetime(new Date(mealEntryData.date));
      setMealSlot(
        MEAL_SLOTS.find((m) => m.id === mealEntryData.slot) || MEAL_SLOTS[0]
      );
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
      <RecipeDetailScreen />
      <AddMealEntryBottomSheet
        open={bottomSheetOpen}
        onClose={() => {
          setBottomSheetOpen(false);
        }}
        onAdd={handleAddToMeal}
        quantity={portions}
        setQuantity={setPortions}
        datetime={datetime}
        setDatetime={setDatetime}
        mealSlot={mealSlot}
        setMealSlot={setMealSlot}
        isLoading={updating || creating}
        type="recipe"
      />
    </>
  );
};

export default RecipeDetail;
