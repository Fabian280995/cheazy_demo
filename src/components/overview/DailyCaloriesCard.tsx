// components/DailyCaloriesCard.tsx
import { View, Text } from "react-native";
import React from "react";
import { useTheme } from "@/providers/theme";
import { Octicons } from "@expo/vector-icons";
import ProgressBar from "@/components/shared/ProgressBar";

const DailyCaloriesCard = () => {
  const { colors } = useTheme();

  const consumedCals = 2600;
  const goalCals = 3000;

  const deviationInPct = 0.05;
  const targetMin = goalCals * (1 - deviationInPct);
  const targetMax = goalCals * (1 + deviationInPct);

  // Balken­max dynamisch auf nächstes 500-Vielfaches
  const step = Math.max(consumedCals, targetMax) >= 5000 ? 1000 : 500;
  const progressBarRight =
    Math.ceil(Math.max(consumedCals, targetMax + 200) / step) * step;

  return (
    <View
      style={{
        padding: 12,
        borderRadius: 16,
        backgroundColor: colors.foreground,
      }}
    >
      {/* Header */}
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View
          style={{
            width: 36,
            height: 36,
            borderRadius: 16,
            backgroundColor: colors.accent,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Octicons name="flame" size={18} color={colors.textForeground} />
        </View>
        <Text
          style={{
            fontFamily: "Nunito",
            color: colors.text,
            fontWeight: "800",
            marginLeft: 8,
            fontSize: 16,
          }}
        >
          Daily Calories
        </Text>
      </View>

      {/* Content */}
      <View style={{ marginTop: 12, gap: 16 }}>
        {/* Zahlen */}
        <View>
          <Text
            style={{
              fontFamily: "Nunito",
              color: colors.text,
              fontSize: 24,
              fontWeight: "900",
            }}
          >
            {consumedCals} kcal
          </Text>
          <Text
            style={{
              fontFamily: "Inter",
              color: colors.textLight,
              fontSize: 16,
              fontWeight: "700",
            }}
          >
            Goal: {goalCals} kcal
          </Text>
        </View>

        {/* Ausgelagerte Fortschrittsleiste */}
        <ProgressBar
          current={consumedCals}
          min={0}
          max={progressBarRight}
          targetMin={targetMin}
          targetMax={targetMax}
          colors={{
            barBackground: colors.background,
            targetRange: colors.textLight,
            inRange: colors.success,
            normal: colors.accent,
            over: colors.destructive,
          }}
          showScaleLabels={true}
          labelColor={colors.textLight}
        />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 4,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: colors.textLight,
                borderRadius: 6,
                gap: 4,
                height: 18,
                width: 18,
              }}
            />
            <Text
              style={{
                fontFamily: "Inter",
                fontSize: 14,
                fontWeight: "700",
                color: colors.textLight,
                marginLeft: 4,
              }}
            >
              Target Range
            </Text>
          </View>
          <Text
            style={{
              fontFamily: "Inter",
              fontSize: 14,
              fontWeight: "700",
              color: colors.textLight,
            }}
          >
            {targetMin} - {targetMax} kcal
          </Text>
        </View>
      </View>
    </View>
  );
};

export default DailyCaloriesCard;
