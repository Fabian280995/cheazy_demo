import { useTheme } from "@/providers/theme"; // Adjust the import path as necessary
import React from "react";
import { Text, View } from "react-native";
import Card from "../shared/Card";
import CardHeader from "../shared/CardHeader";
import CategoryIcon from "../shared/icons/CategoryIcon";
import ProgressBar from "../shared/ProgressBar";

const DailyNutritionScoreCard = () => {
  return (
    <Card>
      <CardHeader
        title="Nutrition Score"
        Icon={() => <CategoryIcon id={"vegetables"} gradient colorfull />}
      />
      <View style={{ marginTop: 12, gap: 12 }}>
        <NutritionBar
          name="Protein"
          value={75}
          target={180}
          categoryColorProfile="dairy"
        />
        <NutritionBar
          name="Carbohydrates"
          value={320}
          target={300}
          categoryColorProfile="vegetables"
        />
        <NutritionBar
          name="Fats"
          value={70}
          target={80}
          categoryColorProfile="fats"
        />
      </View>
    </Card>
  );
};

const NutritionBar = ({
  name,
  value,
  target,
  deviation = 0,
  categoryColorProfile,
}: {
  name: string;
  value: number;
  target: number;
  deviation?: number;
  categoryColorProfile: "vegetables" | "fats" | "dairy";
}) => {
  const { colors, categoryColors } = useTheme();

  // Calculate the target range based on deviation
  const targetMin = target * (1 - deviation);
  const targetMax = target * (1 + deviation);
  const step = Math.max(value, targetMax) >= 5000 ? 1000 : 500;
  const progressBarRight =
    Math.ceil(Math.max(value, targetMax + 200) / step) * step;

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 2,
        }}
      >
        <Text
          style={{
            fontFamily: "Inter",
            color: colors.textLight,
            fontSize: 14,
            fontWeight: "700",
          }}
        >
          {name}
        </Text>
        <Text
          style={{
            fontFamily: "Inter",
            color: colors.textLight,
            fontSize: 14,
            fontWeight: "700",
          }}
        >
          {value} / {target} g
        </Text>
      </View>
      <ProgressBar
        height={10}
        current={value}
        min={0}
        max={progressBarRight}
        targetMin={targetMin}
        targetMax={targetMax}
        colors={{
          barBackground: colors.background,
          targetRange: colors.textLight,
          inRange: categoryColors[categoryColorProfile].background,
          normal: categoryColors[categoryColorProfile].background,
          over: categoryColors[categoryColorProfile].background,
        }}
        overlayOpacity={0.8}
      />
    </View>
  );
};

export default DailyNutritionScoreCard;
