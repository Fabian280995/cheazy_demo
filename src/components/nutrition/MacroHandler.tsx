import { useTheme } from "@/providers/theme";
import { Feather } from "@expo/vector-icons";
import React, { useCallback, useEffect, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  clamp,
  runOnJS,
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

interface Props {
  macro: MacroType;
  grams: number;
  percent: number;
  onPercentChange: (p: number) => void;
  onGramsChange: (g: number) => void;
  calories: number;
  isOver: boolean;
  locked: boolean;
  onToggleLock: () => void;
}

const BAR_H = 164;

const MacroHandler: React.FC<Props> = ({
  macro,
  grams,
  percent,
  onPercentChange,
  onGramsChange,
  calories,
  isOver,
  locked,
  onToggleLock,
}) => {
  const { colors } = useTheme();

  /* UI-thread values */
  const fill = useSharedValue(Math.min(percent, 100));
  const start = useSharedValue(0);

  /* local JS state */
  const [dispPercent, setDispPercent] = useState(percent);
  const [dispGrams, setDispGrams] = useState(grams);
  const [dragging, setDragging] = useState(false);

  const updateDisplay = useCallback(
    (pct: number) => {
      setDispPercent(Math.round(pct));
      setDispGrams(Math.round(percentToGrams(pct, macro, calories)));
    },
    [macro, calories]
  );

  const commitChange = useCallback(
    (pct: number) => {
      const clamped = Math.round(clamp(pct, 0, 100));
      onPercentChange(clamped);
      onGramsChange(Math.round(percentToGrams(clamped, macro, calories)));
    },
    [onPercentChange, onGramsChange, macro, calories]
  );

  /* drag gesture */
  const gesture = Gesture.Pan()
    .onStart(() => {
      start.value = fill.value;
      runOnJS(setDragging)(true);
    })
    .onUpdate((e) => {
      const next = clamp(start.value - (e.translationY / BAR_H) * 100, 0, 100);
      fill.value = next;
      runOnJS(updateDisplay)(next);
    })
    .onEnd(() => {
      runOnJS(commitChange)(fill.value);
      runOnJS(setDragging)(false);
    });

  /* sync external props */
  useEffect(() => {
    if (!dragging) {
      fill.value = withTiming(Math.min(percent, 100), { duration: 400 });
      setDispPercent(percent);
      setDispGrams(grams);
    }
  }, [percent, grams, dragging]);

  const rStyle = useAnimatedStyle(() => ({ height: `${fill.value}%` }));

  /* colors */
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

  return (
    <Pressable onPress={onToggleLock}>
      <View style={{ alignItems: "center", padding: 4 }}>
        {/* grams label */}
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

        {/* bar */}
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

        {/* percent input */}
        <View
          style={{ marginTop: 8, flexDirection: "row", alignItems: "center" }}
        >
          {locked ? (
            <Feather name="lock" size={16} color={colors.primary} />
          ) : (
            <Feather name="unlock" size={16} color={colors.textLight} />
          )}
          <TextInput
            value={shownPercent.toString()}
            onChangeText={(txt) => {
              const n = Number(txt);
              if (isNaN(n)) return;
              onPercentChange(clamp(n, 0, 100));
            }}
            keyboardType="numeric"
            style={{
              color: numColor,
              textAlign: "center",
              borderRadius: 16,
              fontSize: 16,
              fontWeight: "800",
              fontFamily: "Nunito",
              marginLeft: 4,
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
            %
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
    </Pressable>
  );
};

export default MacroHandler;
