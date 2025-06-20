import { View, Text, useWindowDimensions } from "react-native";
import React, { useState } from "react";
import { useTheme } from "@/providers/theme";
import { Feather } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import DetailScreenHeader from "../screens/DetailScreenHeader";
import DetailScreenScroll from "../screens/DetailScreenScroll";
import { AddButton } from "../shared/AddButton";
import { MealSlotId, Recipe } from "@/types";
import { MEAL_SLOTS } from "@/constants/mealSlots";
import { DateSelect } from "../meal-slots/DateSelect";
import MealSlotSelect from "../meal-slots/MealSlotSelect";
import { QuantitySelect } from "../meal-slots/QuantitySelect";

interface Props {
  recipe: Recipe;
  onAddRecipe: (datetime: Date, mealSlot: MealSlotId, portions: number) => void;
  addLabel?: string;
  isLoading?: boolean;
}

const RecipeDetails = ({
  recipe,
  onAddRecipe,
  addLabel = "Hinzufügen",
  isLoading = false,
}: Props) => {
  const { colors } = useTheme();
  const height = useWindowDimensions().height;
  const insets = useSafeAreaInsets();

  const [datetime, setDatetime] = useState(new Date());
  const [mealSlot, setMealSlot] = useState(MEAL_SLOTS[0]);
  const [portions, setPortions] = React.useState<number>(1);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        position: "relative",
      }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: colors.background,
        }}
      >
        {true && (
          <View
            style={{
              width: "100%",
              height: height / 3 + 32,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Feather name="camera" size={64} color={colors.textLight} />
          </View>
        )}
      </View>
      <DetailScreenScroll
        bottomButton={
          <AddButton
            onPress={() => onAddRecipe(datetime, mealSlot.id, portions)}
            label={addLabel}
            insets={insets}
            loading={isLoading}
            disabled={isLoading || portions <= 0 || !datetime || !mealSlot.id}
          />
        }
      >
        <DetailScreenHeader
          title={recipe.name}
          description={recipe.description}
        />

        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <DateSelect date={datetime} onPress={() => null} />
          <MealSlotSelect mealSlot={mealSlot} onChangeSlot={setMealSlot} />
          <QuantitySelect
            quantity={portions}
            onChangeQuantity={setPortions}
            step={1}
          />
        </View>
      </DetailScreenScroll>
    </View>
  );
};

export default RecipeDetails;
