import { useTheme } from "@/providers/theme";
import { NutritionTotals, Recipe } from "@/types";
import React, { useMemo } from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import { QuantitySelect } from "../meal-slots/QuantitySelect";
import CardHeader from "../shared/CardHeader";
import { useUpdateRecipe } from "@/hooks/recipes/useUpdateRecipe";
import { NutritionOverview } from "../nutrition/NutritionOverview";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Feather } from "@expo/vector-icons";
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from "react-native-reanimated";

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
  const { mutateAsync: updateRecipe, isPending: updating } = useUpdateRecipe();

  const {
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isDirty },
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
    reset(data);
  });

  return (
    <View>
      {isDirty && !updating && (
        <Animated.View
          entering={FadeIn}
          exiting={FadeOut}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 16,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              reset();
            }}
            style={{
              height: 32,
              width: 32,
              justifyContent: "center",
              borderRadius: 32,
              alignItems: "center",
            }}
          >
            <Feather name="refresh-cw" size={16} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onSubmit}
            style={{
              backgroundColor: colors.primary,
              height: 32,
              paddingHorizontal: 12,
              borderRadius: 32,
              alignItems: "center",
              justifyContent: "center",
              shadowColor: colors.shadow,
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
              zIndex: 10,
            }}
          >
            {updating ? (
              <ActivityIndicator size="small" color={colors.textForeground} />
            ) : (
              <Text
                style={{
                  color: colors.textForeground,
                  fontWeight: "600",
                  fontSize: 12,
                }}
              >
                Änderungen speichern
              </Text>
            )}
          </TouchableOpacity>
        </Animated.View>
      )}
      <Animated.View layout={LinearTransition} key="recipe-details">
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
      </Animated.View>
    </View>
  );
};

export default RecipeDetails;
