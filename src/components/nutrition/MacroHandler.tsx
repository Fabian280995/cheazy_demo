import { useTheme } from "@/providers/theme";
import React, { useEffect } from "react";
import { Text, TextInput, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

export type MacroType = "protein" | "carbs" | "fat";

const KCAL_PER_GRAM: Record<MacroType, number> = {
  protein: 4,
  carbs: 4,
  fat: 9,
};

export const gramsToPercent = (g: number, m: MacroType, cal: number) =>
  cal > 0 ? ((g * KCAL_PER_GRAM[m]) / cal) * 100 : 0;

export const percentToGrams = (p: number, m: MacroType, cal: number) =>
  cal > 0 ? ((p / 100) * cal) / KCAL_PER_GRAM[m] : 0;

interface MacroHandlerProps {
  macro: MacroType;
  grams: number;
  percent: number;
  onPercentChange: (p: number) => void;
  onGramsChange: (g: number) => void;
  calories: number;
  macroUnit?: "g" | "percent";
  isOver: boolean;
}

export const MacroHandler: React.FC<MacroHandlerProps> = ({
  macro,
  grams,
  percent,
  onPercentChange,
  onGramsChange,
  calories,
  macroUnit = "percent",
  isOver,
}) => {
  const { colors } = useTheme();

  /** Farbe */
  const danger = colors.destructive ?? "#ff3b30";
  const numColor = isOver ? danger : colors.text;
  const unitColor = isOver ? danger : colors.textLight;

  /** Anzeige‑Wert */
  const display = macroUnit === "g" ? grams.toString() : percent.toString();

  /** Eingabe‑Handler */
  const handleChange = (txt: string) => {
    const n = Number(txt);
    if (isNaN(n)) return;

    if (macroUnit === "g") {
      onGramsChange(n < 0 ? 0 : n);
      const p = gramsToPercent(n, macro, calories);
      onPercentChange(Math.round(p));
    } else {
      onPercentChange(n < 0 ? 0 : n);
    }
  };

  /** Balken‑Animation */
  const fillTarget = Math.min(
    macroUnit === "g" ? gramsToPercent(grams, macro, calories) : percent,
    100
  );
  const fill = useSharedValue(fillTarget);
  useEffect(() => {
    fill.value = withTiming(fillTarget, { duration: 400 });
  }, [fillTarget]);
  const rStyle = useAnimatedStyle(() => ({ height: `${fill.value}%` }));

  const barColor =
    macro === "protein"
      ? colors.protein
      : macro === "carbs"
      ? colors.carbs
      : colors.fat;

  return (
    <View style={{ alignItems: "center" }}>
      <Text
        style={{
          color: unitColor,
          fontSize: 14,
          fontWeight: "800",
          fontFamily: "Nunito",
          marginBottom: 4,
        }}
      >
        {grams}g
      </Text>
      <View
        style={{
          width: 64,
          height: 164,
          backgroundColor: colors.background,
          borderRadius: 16,
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Animated.View
          style={[
            {
              width: "100%",
              position: "absolute",
              bottom: 0,
              backgroundColor: barColor,
            },
            rStyle,
          ]}
        />
      </View>
      <View
        style={{ marginTop: 8, flexDirection: "row", alignItems: "center" }}
      >
        <TextInput
          value={display}
          onChangeText={handleChange}
          keyboardType="numeric"
          style={{
            color: numColor,
            width: 60,
            textAlign: "center",
            padding: 4,
            borderRadius: 16,
            fontSize: 16,
            fontWeight: "800",
            fontFamily: "Nunito",
          }}
        />
        <Text
          style={{
            marginLeft: 4,
            color: unitColor,
            fontSize: 16,
            fontWeight: "800",
            fontFamily: "Nunito",
          }}
        >
          {macroUnit === "g" ? "g" : "%"}
        </Text>
      </View>
      <Text
        style={{
          color: colors.textLight,
          fontSize: 16,
          fontWeight: "800",
          fontFamily: "Nunito",
          textAlign: "center",
        }}
      >
        {macro === "protein"
          ? "Protein"
          : macro === "carbs"
          ? "Kohlenhydrate"
          : "Fett"}
      </Text>
    </View>
  );
};
