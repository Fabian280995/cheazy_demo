import { useTheme } from "@/providers/theme";
import React, { useCallback, useEffect, useState } from "react";
import { Text, TextInput, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  runOnJS,
  clamp,
} from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

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

interface Props {
  macro: MacroType;
  grams: number;
  percent: number;
  onPercentChange: (p: number) => void;
  onGramsChange: (g: number) => void;
  calories: number;
  macroUnit?: "g" | "percent";
  isOver: boolean;
}

const BAR_H = 164; // muss mit Style matchen

export const MacroHandler: React.FC<Props> = ({
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

  /* ---------------------- UI-Thread values ---------------------- */
  const fill = useSharedValue(Math.min(percent, 100));
  const start = useSharedValue(0);

  /* ---------------------- Local visual state -------------------- */
  const [dispPercent, setDispPercent] = useState(percent);
  const [dispGrams, setDispGrams] = useState(grams);
  const [dragging, setDragging] = useState(false);

  /* ---------- helper that ONLY runs on the JS-thread ------------ */
  const updateDisplay = useCallback(
    (pct: number) => {
      setDispPercent(Math.round(pct));
      setDispGrams(Math.round(percentToGrams(pct, macro, calories)));
    },
    [macro, calories]
  );

  const commitChange = useCallback(
    (pct: number) => {
      onPercentChange(Math.round(pct));
      onGramsChange(Math.round(percentToGrams(pct, macro, calories)));
    },
    [onPercentChange, onGramsChange, macro, calories]
  );

  /* -------------------------- Gesture --------------------------- */
  const gesture = Gesture.Pan()
    .onStart(() => {
      start.value = fill.value;
      runOnJS(setDragging)(true);
    })
    .onUpdate((e) => {
      const next = clamp(start.value - (e.translationY / BAR_H) * 100, 0, 100); // :contentReference[oaicite:1]{index=1}
      fill.value = next;
      runOnJS(updateDisplay)(next); // nur UI-Feedback
    })
    .onEnd(() => {
      runOnJS(commitChange)(fill.value); // RHF + Validation erst jetzt
      runOnJS(setDragging)(false);
    });

  /* -------------------- external prop sync ---------------------- */
  useEffect(() => {
    if (!dragging) {
      fill.value = withTiming(Math.min(percent, 100), { duration: 400 }); // :contentReference[oaicite:2]{index=2}
      setDispPercent(percent);
      setDispGrams(grams);
    }
  }, [percent, grams, dragging]);

  const rStyle = useAnimatedStyle(() => ({ height: `${fill.value}%` }));

  /* ---------------------- Visual helpers ------------------------ */
  const barColor =
    macro === "protein"
      ? colors.protein
      : macro === "carbs"
      ? colors.carbs
      : colors.fat;
  const danger = colors.destructive;
  const numColor = isOver ? danger : colors.text;
  const unitColor = isOver ? danger : colors.textLight;

  const shownPercent = dragging ? dispPercent : percent;
  const shownGrams = dragging ? dispGrams : grams;
  const inputValue =
    macroUnit === "g" ? shownGrams.toString() : shownPercent.toString();

  /* -------------------------------------------------------------- */
  return (
    <View style={{ alignItems: "center" }}>
      {/* g-Label */}
      <Text
        style={{
          color: unitColor,
          fontSize: 14,
          fontWeight: "800",
          fontFamily: "Nunito",
          marginBottom: 4,
        }}
      >
        {shownGrams}g
      </Text>

      {/* Draggable bar */}
      <GestureDetector gesture={gesture}>
        <View
          style={{
            width: 64,
            height: BAR_H,
            backgroundColor: colors.background,
            borderRadius: 16,
            overflow: "hidden",
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
      </GestureDetector>

      {/* TextInput */}
      <View
        style={{ marginTop: 8, flexDirection: "row", alignItems: "center" }}
      >
        <TextInput
          value={inputValue}
          onChangeText={(txt) => {
            /* manuelle Eingabe → sofort persistieren */
            const n = Number(txt);
            if (isNaN(n)) return;
            if (macroUnit === "g") {
              onGramsChange(n < 0 ? 0 : n);
              onPercentChange(Math.round(gramsToPercent(n, macro, calories)));
            } else {
              onPercentChange(n < 0 ? 0 : n);
            }
          }}
          keyboardType="numeric"
          style={{
            color: numColor,
            textAlign: "center",
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
