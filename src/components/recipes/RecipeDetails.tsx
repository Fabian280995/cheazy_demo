import { useTheme } from "@/providers/theme";
import { NutritionTotals, Recipe } from "@/types";
import React from "react";
import { TextInput, View } from "react-native";
import { QuantitySelect } from "../meal-slots/QuantitySelect";
import CardHeader from "../shared/CardHeader";
import { useUpdateRecipe } from "@/hooks/recipes/useUpdateRecipe";
import { NutritionOverview } from "../nutrition/NutritionOverview";

interface Props {
  recipe: Recipe;
}

const RecipeDetails = ({ recipe }: Props) => {
  const { colors } = useTheme();
  const { mutateAsync: updateRecipe } = useUpdateRecipe();

  const [title, setTitle] = React.useState<string>(recipe.name);
  const [description, setDescription] = React.useState<string>(
    recipe.description ?? ""
  );
  const [servings, setServings] = React.useState<number>(recipe.servings);

  const { ingredients } = recipe;

  const quantity = React.useMemo(() => {
    return ingredients.reduce((acc, item) => acc + item.quantity, 0);
  }, [ingredients]);
  const totalQuantity = quantity / servings;

  const totals: NutritionTotals = React.useMemo(() => {
    return ingredients.reduce(
      (acc, item) => {
        acc.calories += item.calories_per_100 * (item.quantity / 100);
        acc.carbs += item.carbohydrates_per_100 * (item.quantity / 100);
        acc.fat += item.fat_per_100 * (item.quantity / 100);
        acc.protein += item.protein_per_100 * (item.quantity / 100);
        return acc;
      },
      { calories: 0, carbs: 0, fat: 0, protein: 0 }
    );
  }, [ingredients, quantity, servings]);

  React.useEffect(() => {
    setTitle(recipe.name);
    setDescription(recipe.description ?? "");
    setServings(recipe.servings);
  }, [recipe]);

  return (
    <>
      <View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TextInput
            style={{
              fontWeight: "800",
              fontSize: 24,
              fontFamily: "Nunito",
              maxWidth: "80%",
            }}
            value={title}
            onChangeText={setTitle}
            placeholder="Rezeptname"
          />
        </View>

        <View style={{ gap: 4 }}>
          <TextInput
            multiline
            value={description}
            onChangeText={setDescription}
            placeholder="Keine Beschreibung verfügbar. Füge eine hinzu."
            style={{
              fontFamily: "Nunito",
              fontSize: 16,
              fontWeight: "500",
              color: colors.textLight,
            }}
          />
        </View>
      </View>

      <View>
        <CardHeader title="Portionen" size={20} />
        <QuantitySelect
          quantity={servings}
          onChangeQuantity={setServings}
          step={1}
        />
      </View>

      <NutritionOverview
        title={"Nährwerte pro Portion"}
        calories={totals.calories / servings}
        carbs={totals.carbs / servings}
        fat={totals.fat / servings}
        protein={totals.protein / servings}
        target={totalQuantity}
      />
    </>
  );
};

export default RecipeDetails;
