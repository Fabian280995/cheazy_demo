import React from "react";
import { View, Text } from "react-native";
import NutritionBar from "@/components/nutrition/NutritionBar";
import CardHeader from "@/components/shared/CardHeader";
import { useTheme } from "@/providers/theme";

interface NutritionOverviewProps {
  calories: number;
  carbs: number;
  fat: number;
  protein: number;
  target: number;
}

export const NutritionOverview: React.FC<NutritionOverviewProps> = ({
  calories,
  carbs,
  fat,
  protein,
  target,
}) => {
  const { colors } = useTheme();
  return (
    <View style={{ gap: 8 }}>
      <CardHeader title="Nährwerte" size={20}>
        <Text
          style={{
            fontFamily: "Nunito",
            color: colors.text,
            fontSize: 20,
            fontWeight: "800",
          }}
        >
          {Math.round(calories)} kcal
        </Text>
      </CardHeader>
      <View style={{ gap: 12 }}>
        <NutritionBar
          name="Kohlenhydrate"
          value={carbs}
          target={target}
          categoryColorProfile="carbs"
          showTargetLabel={false}
          showTargetRange={false}
        />
        <NutritionBar
          name="Fette"
          value={fat}
          target={target}
          categoryColorProfile="fat"
          showTargetLabel={false}
          showTargetRange={false}
        />
        <NutritionBar
          name="Proteine"
          value={protein}
          target={target}
          categoryColorProfile="protein"
          showTargetLabel={false}
          showTargetRange={false}
        />
      </View>
    </View>
  );
};
