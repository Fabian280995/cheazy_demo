import { useTheme } from "@/providers/theme";
import { NutritionTotals, Recipe } from "@/types";
import React, { useMemo } from "react";
import { TextInput, View } from "react-native";
import { QuantitySelect } from "../meal-slots/QuantitySelect";
import CardHeader from "../shared/CardHeader";
import { useUpdateRecipe } from "@/hooks/recipes/useUpdateRecipe";
import { NutritionOverview } from "../nutrition/NutritionOverview";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1, "Name erforderlich"),
  description: z.string().optional(),
  servings: z.number().int().min(1, "Mindestens 1 Portion"),
});

type FormValues = z.infer<typeof schema>;

interface Props {
  recipe: Recipe;
}

const RecipeDetails = ({ recipe }: Props) => {
  const { colors } = useTheme();
  const { mutateAsync: updateRecipe } = useUpdateRecipe();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: recipe.name,
      description: recipe.description ?? "",
      servings: recipe.servings,
    },
  });

  const servings = watch("servings");
  const { ingredients } = recipe;

  const quantity = useMemo(
    () => ingredients.reduce((acc, item) => acc + item.quantity, 0),
    [ingredients]
  );

  const totals: NutritionTotals = useMemo(
    () =>
      ingredients.reduce(
        (acc, item) => {
          acc.calories += item.calories_per_100 * (item.quantity / 100);
          acc.carbs += item.carbohydrates_per_100 * (item.quantity / 100);
          acc.fat += item.fat_per_100 * (item.quantity / 100);
          acc.protein += item.protein_per_100 * (item.quantity / 100);
          return acc;
        },
        { calories: 0, carbs: 0, fat: 0, protein: 0 }
      ),
    [ingredients]
  );

  const onSubmit = handleSubmit(async (data) => {
    await updateRecipe({
      recipeId: recipe.id,
      updatedRecipe: {
        name: data.name,
        description: data.description,
        servings: data.servings,
      },
    });
  });

  return (
    <View>
      <View>
        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <TextInput
              style={{
                fontWeight: "800",
                fontSize: 24,
                fontFamily: "Nunito",
                maxWidth: "80%",
              }}
              value={field.value}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              placeholder="Rezeptname"
            />
          )}
        />
        <Controller
          control={control}
          name="description"
          render={({ field }) => (
            <TextInput
              multiline
              value={field.value}
              onChangeText={field.onChange}
              onBlur={field.onBlur}
              placeholder="Keine Beschreibung verfügbar. Füge eine hinzu."
              style={{
                fontFamily: "Nunito",
                fontSize: 16,
                fontWeight: "500",
                color: colors.textLight,
              }}
            />
          )}
        />
      </View>

      <View style={{ marginTop: 32 }}>
        <CardHeader title="Portionen" size={20} />
        <Controller
          control={control}
          name="servings"
          render={({ field }) => (
            <QuantitySelect
              quantity={field.value}
              onChangeQuantity={field.onChange}
              step={1}
            />
          )}
        />
      </View>

      <View style={{ marginTop: 32 }}>
        <NutritionOverview
          title={"Nährwerte pro Portion"}
          calories={totals.calories / servings}
          carbs={totals.carbs / servings}
          fat={totals.fat / servings}
          protein={totals.protein / servings}
          target={quantity / servings}
        />
      </View>
    </View>
  );
};

export default RecipeDetails;
