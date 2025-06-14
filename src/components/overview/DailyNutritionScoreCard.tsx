import { useTheme } from "@/providers/theme"; // Adjust the import path as necessary
import React from "react";
import { Text, View } from "react-native";
import Card from "../shared/Card";
import CardHeader from "../shared/CardHeader";
import CategoryIcon from "../shared/icons/CategoryIcon";
import ProgressBar from "../shared/ProgressBar";
import CardIcon from "../shared/CardIcon";

const DailyNutritionScoreCard = () => {
  const { colors, categoryColors } = useTheme();
  return (
    <Card>
      <CardHeader
        title="Nutrition Score"
        Icon={() => (
          <CardIcon
            name="pie-chart"
            color={colors.protein}
            bgColor={categoryColors.fastfood.background}
            gradient
          />
        )}
      />
      <View style={{ marginTop: 12, gap: 12 }}>
        <NutritionBar
          name="Carbohydrates"
          value={320}
          target={300}
          categoryColorProfile="carbs"
        />
        <NutritionBar
          name="Fats"
          value={70}
          target={80}
          categoryColorProfile="fat"
        />
        <NutritionBar
          name="Protein"
          value={75}
          target={180}
          categoryColorProfile="protein"
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
  categoryColorProfile: "protein" | "fat" | "carbs";
}) => {
  const { colors } = useTheme();

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
            fontWeight: "500",
          }}
        >
          {name}
        </Text>
        <Text
          style={{
            fontFamily: "Inter",
            color: colors.text,
            fontSize: 14,
            fontWeight: "700",
          }}
        >
          {value} / {target} g
        </Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text
          style={{
            fontFamily: "Nunito",
            color: value > targetMax ? colors.success : colors.text,
            fontSize: 16,
            fontWeight: "800",
            marginRight: 8,
            width: "14%",
          }}
        >
          {Math.round((value / target) * 100)}%
        </Text>
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
            inRange: colors[categoryColorProfile],
            normal: colors[categoryColorProfile],
            over: colors[categoryColorProfile],
          }}
          overlayOpacity={0.8}
        />
      </View>
    </View>
  );
};

export default DailyNutritionScoreCard;
