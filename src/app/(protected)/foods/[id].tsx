import { View, Text, ScrollView } from "react-native";
import React from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useGetFoodById } from "@/hooks/foods/useGetFoodById";
import { useTheme } from "@/providers/theme";
import { useHeaderOptions } from "@/hooks/navigation/useHeaderOptions";
import HeaderIconButton from "@/components/screens/HeaderIconButton";

const FoodDetail = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: food, isLoading } = useGetFoodById(id);
  const { colors } = useTheme();
  const headerOptions = useHeaderOptions({
    title: "",
    largeTitle: false,
  });
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!food) {
    return <Text>Food not found</Text>;
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
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
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", color: colors.text }}>
          {food.name}
        </Text>
        <Text style={{ marginTop: 8, color: colors.text }}>
          {food.description || "No description available."}
        </Text>
        <Text style={{ marginTop: 16, color: colors.text }}>
          Calories: {food.kcal_per_100} kcal
        </Text>
        <Text style={{ marginTop: 8, color: colors.text }}>
          Protein: {food.protein_g_per_100} g
        </Text>
        <Text style={{ marginTop: 8, color: colors.text }}>
          Carbohydrates: {food.carbs_g_per_100} g
        </Text>
        <Text style={{ marginTop: 8, color: colors.text }}>
          Fat: {food.fat_g_per_100} g
        </Text>
      </View>
    </ScrollView>
  );
};

export default FoodDetail;
