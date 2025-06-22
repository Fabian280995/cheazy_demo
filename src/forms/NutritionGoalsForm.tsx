import { AddButton } from "@/components/shared/AddButton";
import Card from "@/components/shared/Card";
import CardHeader from "@/components/shared/CardHeader";
import { useTheme } from "@/providers/theme";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, Switch, Text, TextInput, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { z } from "zod";

/**
 * ────────────────────────────────────────────────────────────────────────────────
 *  Validation Schema & Types
 * ────────────────────────────────────────────────────────────────────────────────
 */
const schema = z
  .object({
    calories: z.number().int().min(0, "Kalorien müssen positiv sein"),
    protein: z.number().int().min(0, "Protein muss positiv sein"),
    carbs: z.number().int().min(0, "Kohlenhydrate müssen positiv sein"),
    fat: z.number().int().min(0, "Fett muss positiv sein"),
  })
  .superRefine((data, ctx) => {
    const kcalFromMacros = data.protein * 4 + data.carbs * 4 + data.fat * 9;
    const percent = Math.round(
      data.calories > 0 ? (kcalFromMacros / data.calories) * 100 : 0
    );

    console.log("Macro Validation", percent, data);

    if (percent > 100 || percent < 100) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Summe der Makros ergibt nicht 100 % der Kalorien",
      });
    }
  });

type MacroType = "protein" | "carbs" | "fat";
export type FormValues = z.infer<typeof schema>;

const KCAL_PER_GRAM: Record<MacroType, number> = {
  protein: 4,
  carbs: 4,
  fat: 9,
};

/**
 * Helper conversions
 */
const gramsToPercent = (
  grams: number,
  macro: MacroType,
  calories: number
): number =>
  calories > 0 ? ((grams * KCAL_PER_GRAM[macro]) / calories) * 100 : 0;

const percentToGrams = (
  percent: number,
  macro: MacroType,
  calories: number
): number =>
  calories > 0 ? ((percent / 100) * calories) / KCAL_PER_GRAM[macro] : 0;

/**
 * ────────────────────────────────────────────────────────────────────────────────
 *  Main Component
 * ────────────────────────────────────────────────────────────────────────────────
 */
const NutritionGoalsForm: React.FC = () => {
  const { colors } = useTheme();
  const router = useRouter();

  const { control, setValue, getValues, watch, handleSubmit, formState } =
    useForm<FormValues>({
      resolver: zodResolver(schema),
      defaultValues: {
        calories: 2000,
        protein: 150,
        carbs: 250,
        fat: 70,
      },
    });

  /**
   * ------------------------------------------------------
   *  Local UI / State
   * ------------------------------------------------------
   */
  const [macroUnit, setMacroUnit] = React.useState<"g" | "percent">("percent");

  // Persist the *target* percentages so grams can auto-update when calories change
  const [macroPercents, setMacroPercents] = React.useState<
    Record<MacroType, number>
  >({
    protein: 0,
    carbs: 0,
    fat: 0,
  });

  // Initialise percentages from default gram values once
  React.useEffect(() => {
    const cals = getValues("calories");
    setMacroPercents({
      protein: Math.round(
        gramsToPercent(getValues("protein"), "protein", cals)
      ),
      carbs: Math.round(gramsToPercent(getValues("carbs"), "carbs", cals)),
      fat: Math.round(gramsToPercent(getValues("fat"), "fat", cals)),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const calories = watch("calories");

  /**
   * Re-calculate grams whenever calories or the stored percentages change while
   * we are in *percent* mode. This keeps the absolute gram numbers in sync.
   */
  React.useEffect(() => {
    if (macroUnit === "percent") {
      (Object.keys(macroPercents) as MacroType[]).forEach((macro) => {
        const grams = Math.round(
          percentToGrams(macroPercents[macro], macro, calories)
        );
        setValue(macro, grams, { shouldDirty: true, shouldValidate: false });
      });
    }
  }, [calories, macroPercents, macroUnit, setValue]);

  /**
   * Toggle g ↔ %
   */
  const toggleMacroUnit = () => {
    setMacroUnit((prev) => {
      const next = prev === "g" ? "percent" : "g";
      // When entering percent mode, derive current percentages from stored grams
      if (next === "percent") {
        const cals = getValues("calories");
        setMacroPercents({
          protein: Math.round(
            gramsToPercent(getValues("protein"), "protein", cals)
          ),
          carbs: Math.round(gramsToPercent(getValues("carbs"), "carbs", cals)),
          fat: Math.round(gramsToPercent(getValues("fat"), "fat", cals)),
        });
      }
      return next;
    });
  };

  const handlePercentChange = (macro: MacroType, next: number) =>
    setMacroPercents(capPercent(macro, next));

  /**
   * Render
   */
  return (
    <View>
      {/* ───────────── Calories ───────────── */}
      <CaloriesInput control={control} />

      {/* ───────────── Macros ───────────── */}
      <Card style={{ marginTop: 16 }}>
        <CardHeader title="Makronährstoffe" />

        <View
          style={{
            flexDirection: "row",
            gap: 16,
            marginTop: 16,
            justifyContent: "space-evenly",
          }}
        >
          {/* Protein */}
          <Controller
            control={control}
            name="protein"
            render={({ field }) => (
              <MacroHandler
                macro="protein"
                grams={field.value}
                percent={macroPercents.protein}
                setPercent={(p) => handlePercentChange("protein", p)}
                onGramsChange={field.onChange}
                calories={calories}
                macroUnit={macroUnit}
                hasError={
                  formState.errors.protein !== undefined || !formState.isValid
                }
              />
            )}
          />
          {/* Carbs */}
          <Controller
            control={control}
            name="carbs"
            render={({ field }) => (
              <MacroHandler
                macro="carbs"
                grams={field.value}
                percent={macroPercents.carbs}
                setPercent={(p) => handlePercentChange("carbs", p)}
                onGramsChange={field.onChange}
                calories={calories}
                macroUnit={macroUnit}
                hasError={
                  formState.errors.carbs !== undefined || !formState.isValid
                }
              />
            )}
          />
          {/* Fat */}
          <Controller
            control={control}
            name="fat"
            render={({ field }) => (
              <MacroHandler
                macro="fat"
                grams={field.value}
                percent={macroPercents.fat}
                setPercent={(v) => handlePercentChange("fat", v)}
                onGramsChange={field.onChange}
                calories={calories}
                macroUnit={macroUnit}
                hasError={
                  formState.errors.fat !== undefined || !formState.isValid
                }
              />
            )}
          />
        </View>

        {/* ───────────── Toggle Switch ───────────── */}
        <Pressable
          onPress={toggleMacroUnit}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 16,
          }}
        >
          <Text
            style={{
              color: colors.text,
              fontSize: 16,
              fontWeight: "800",
              fontFamily: "Nunito",
            }}
          >
            Prozentual?
          </Text>
          <Switch
            value={macroUnit === "percent"}
            onValueChange={toggleMacroUnit}
            trackColor={{ false: colors.textLight, true: colors.primary }}
            thumbColor={colors.background}
          />
        </Pressable>
      </Card>

      <View style={{ marginTop: 16 }}>
        <AddButton
          label="Ziele speichern"
          onPress={handleSubmit((data) => {
            console.log("Gespeicherte Ziele:", data);
          })}
          disabled={!formState.isValid}
          loading={formState.isSubmitting}
        />
      </View>
    </View>
  );
};

/**
 * ────────────────────────────────────────────────────────────────────────────────
 *  Sub-Components
 * ────────────────────────────────────────────────────────────────────────────────
 */
const CaloriesInput: React.FC<{ control: any }> = ({ control }) => {
  const { colors } = useTheme();
  const caloryInputRef = React.useRef<TextInput>(null);
  return (
    <Pressable onPress={() => caloryInputRef.current?.focus()}>
      <Card>
        <Controller
          control={control}
          name="calories"
          render={({ field }) => (
            <CardHeader title="Kalorien">
              <TextInput
                ref={caloryInputRef}
                value={field.value.toString()}
                onChangeText={(text) => {
                  const numValue = Number(text);
                  field.onChange(
                    isNaN(numValue) || numValue < 0 ? 0 : numValue
                  );
                }}
                keyboardType="numeric"
                style={{
                  flex: 1,
                  color: colors.text,
                  paddingRight: 8,
                  minWidth: 100,
                  textAlign: "right",
                  fontSize: 16,
                  fontWeight: "800",
                  fontFamily: "Nunito",
                }}
              />
              <Text
                style={{
                  color: colors.textLight,
                  fontSize: 16,
                  fontWeight: "800",
                  fontFamily: "Nunito",
                }}
              >
                kcal
              </Text>
            </CardHeader>
          )}
        />
      </Card>
    </Pressable>
  );
};

interface MacroHandlerProps {
  macro: MacroType;
  grams: number;
  percent: number;
  setPercent: (p: number) => void;
  onGramsChange: (g: number) => void;
  calories: number;
  macroUnit: "g" | "percent";
  hasError?: boolean;
}

const MacroHandler: React.FC<MacroHandlerProps> = ({
  macro,
  grams,
  percent,
  setPercent,
  onGramsChange,
  calories,
  macroUnit,
  hasError = false,
}) => {
  const { colors } = useTheme();

  /**
   * Decide what the user *sees* in the TextInput
   */
  const displayValue =
    macroUnit === "g" ? grams.toString() : percent.toString();

  /**
   * Handle user edits
   */
  const handleChange = (text: string) => {
    const numeric = Number(text);
    if (isNaN(numeric)) return;

    if (macroUnit === "g") {
      // Update grams directly, re-compute percent for internal state
      onGramsChange(numeric < 0 ? 0 : numeric);
      setPercent(Math.round(gramsToPercent(numeric, macro, calories)));
    } else {
      // Update percent, convert to grams for form state
      setPercent(numeric < 0 ? 0 : numeric);
      const g = percentToGrams(numeric, macro, calories);
      onGramsChange(Math.round(g));
    }
  };

  const fillPercent = Math.min(
    macroUnit === "g" ? gramsToPercent(grams, macro, calories) : percent,
    100
  );

  const fill = useSharedValue(fillPercent);

  const numberColor = hasError ? colors.destructive : colors.text;
  const unitColor = hasError ? colors.textLight : colors.text;

  const barColor =
    macro === "protein"
      ? colors.protein
      : macro === "carbs"
      ? colors.carbs
      : colors.fat;

  useEffect(() => {
    fill.value = withTiming(fillPercent, { duration: 400 });
  }, [fillPercent]);

  const rStyle = useAnimatedStyle(() => ({
    height: `${fill.value}%`,
  }));

  return (
    <View style={{ alignItems: "center" }}>
      {/* ───────────── Actual grams over bar */}
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

      {/* ───────────── Bar */}
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

      {/* ───────────── Input & Unit */}
      <View
        style={{
          marginTop: 8,
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <TextInput
          value={displayValue}
          onChangeText={handleChange}
          keyboardType="numeric"
          style={{
            color: numberColor,
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

      {/* ───────────── Label */}
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

const capPercent =
  (macro: MacroType, next: number) => (prev: Record<MacroType, number>) => {
    const otherSum = prev.protein + prev.carbs + prev.fat - prev[macro];
    const capped = Math.min(next, Math.max(0, 100 - otherSum)); // verhindert > 100 %
    return { ...prev, [macro]: capped };
  };

export default NutritionGoalsForm;
