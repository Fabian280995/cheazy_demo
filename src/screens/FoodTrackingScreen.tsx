// src/screens/FoodTrackingScreen.tsx
import React from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FoodInputSchema, FoodInput } from "@/schemas/foodSchema";
import { useTrackFood } from "@/hooks/food/useTrackFood";

export const FoodTrackingScreen: React.FC = () => {
  // React Hook Form mit Zod-Resolver:
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FoodInput>({
    resolver: zodResolver(FoodInputSchema),
    defaultValues: { description: "" },
  });

  const mutation = useTrackFood();

  const onSubmit = (data: FoodInput) => {
    mutation.mutate(data);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Was hast du heute gegessen?</Text>

      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={[styles.input, errors.description && styles.inputError]}
            multiline
            placeholder="Zum Beispiel: Ich hatte Frühstücks-Müsli, Mittag ein Sandwich mit Hühnerbrust und Salat..."
            value={value}
            onChangeText={onChange}
          />
        )}
      />
      {errors.description && (
        <Text style={styles.errorText}>{errors.description.message}</Text>
      )}

      <Button
        title="Track Food"
        onPress={handleSubmit(onSubmit)}
        disabled={mutation.isPending}
      />

      {mutation.isPending && (
        <ActivityIndicator style={styles.loader} size="large" />
      )}

      {mutation.isError && (
        <Text style={styles.errorText}>
          Fehler: {(mutation.error as Error).message}
        </Text>
      )}

      {mutation.isSuccess && mutation.data && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Deine Gerichte:</Text>
          {mutation.data.dishes.map((dish, idx) => (
            <View key={idx} style={styles.dishContainer}>
              <Text style={styles.dishName}>{dish.name}</Text>
              {dish.ingredients.map((ing, i) => (
                <View key={i} style={styles.ingredientRow}>
                  <Text style={styles.ingName}>{ing.name}:</Text>
                  <Text style={styles.ingValues}>
                    {ing.calories} kcal, {ing.protein} g Protein, {ing.carbs} g
                    Kohlenhydrate, {ing.fat} g Fett
                  </Text>
                </View>
              ))}
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 12,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: "#888",
    borderRadius: 6,
    padding: 8,
    minHeight: 100,
    textAlignVertical: "top",
    marginBottom: 6,
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    marginBottom: 8,
  },
  loader: {
    marginVertical: 12,
  },
  resultContainer: {
    marginTop: 24,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  dishContainer: {
    marginBottom: 16,
    padding: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
  },
  dishName: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  ingredientRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 2,
  },
  ingName: {
    fontWeight: "400",
  },
  ingValues: {
    fontStyle: "italic",
  },
});
