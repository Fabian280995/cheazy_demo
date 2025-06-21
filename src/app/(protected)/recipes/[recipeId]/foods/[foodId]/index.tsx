import AddEntryButton from "@/components/meal-slots/AddEntryButton";
import { QuantitySelect } from "@/components/meal-slots/QuantitySelect";
import HeaderIconButton from "@/components/screens/HeaderIconButton";
import { AddButton } from "@/components/shared/AddButton";
import { useHeaderOptions } from "@/hooks/navigation/useHeaderOptions";
import { useCreateRecipeIngredient } from "@/hooks/recipe-ingredients/useCreateRecipeIngredient";
import { useGetRecipeIngredientByCompId } from "@/hooks/recipe-ingredients/useGetRecipeIngredientByCompId";
import { useUpdateRecipeIngredient } from "@/hooks/recipe-ingredients/useUpdateRecipeIngredient";
import { useFood } from "@/providers/food";
import { useTheme } from "@/providers/theme";
import FoodDetailScreen from "@/screens/FoodDetailScreen";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { View } from "react-native";

const FoodDetail = () => {
  const { food } = useFood();
  const router = useRouter();
  const { colors } = useTheme();
  const headerOptions = useHeaderOptions({
    title: "",
    largeTitle: false,
  });
  const { recipeId } = useLocalSearchParams<{
    recipeId: string;
  }>();

  const { data: ingredient } = useGetRecipeIngredientByCompId(
    recipeId,
    food.id
  );
  const { mutateAsync: create, isPending: creating } =
    useCreateRecipeIngredient();
  const { mutateAsync: update, isPending: updating } =
    useUpdateRecipeIngredient();

  const [quantity, setQuantity] = React.useState<number>(
    ingredient?.quantity_g || 100
  );

  const handleAddToRecipe = async () => {
    if (!recipeId) return;
    if (ingredient) {
      await update({
        recipeId: recipeId,
        foodId: food.id,
        ingredient: {
          quantity_g: quantity,
        },
      });
    } else {
      await create({
        recipe_id: recipeId,
        food_id: food.id,
        quantity_g: quantity,
      });
    }

    router.dismissTo(`/recipes/${recipeId}`);
  };

  useEffect(() => {
    if (ingredient) {
      setQuantity(ingredient.quantity_g);
    }
  }, [ingredient]);

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
      <FoodDetailScreen food={food} quantity={quantity} />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          position: "absolute",
          bottom: 64,
          left: 12,
          right: 12,
          zIndex: 10,
          gap: 8,
        }}
      >
        <QuantitySelect quantity={quantity} onChangeQuantity={setQuantity} />
        <AddButton
          onPress={handleAddToRecipe}
          label="Hinzufügen"
          loading={creating}
        />
      </View>
    </>
  );
};

export default FoodDetail;
