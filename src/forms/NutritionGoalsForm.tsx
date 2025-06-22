import { CaloriesInput } from "@/components/nutrition/CaloriesInput";
import {
  gramsToPercent,
  MacroHandler,
  MacroType,
  percentToGrams,
} from "@/components/nutrition/MacroHandler";
import { AddButton } from "@/components/shared/AddButton";
import Card from "@/components/shared/Card";
import CardHeader from "@/components/shared/CardHeader";
import { useTheme } from "@/providers/theme";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, Switch, Text, View } from "react-native";
import { z } from "zod";

/**
 * ────────────────────────────────────────────────────────────────────────────────
 *  Validation Schema & Types
 * ────────────────────────────────────────────────────────────────────────────────
 */
const schema = z.object({
  calories: z.number().int().min(0, "Kalorien müssen positiv sein"),
  protein: z.number().int().min(0, "Protein muss positiv sein"),
  carbs: z.number().int().min(0, "Kohlenhydrate müssen positiv sein"),
  fat: z.number().int().min(0, "Fett muss positiv sein"),
});

export type FormValues = z.infer<typeof schema>;

const NutritionGoalsForm: React.FC = () => {
  const { colors } = useTheme();
  const router = useRouter();

  const { control, setValue, getValues, watch, handleSubmit, formState } =
    useForm<FormValues>({
      resolver: zodResolver(schema),
      defaultValues: {
        calories: 2500,
        protein: percentToGrams(30, "protein", 2500),
        carbs: percentToGrams(40, "carbs", 2500),
        fat: percentToGrams(30, "fat", 2500),
      },
    });

  const [macroUnit, setMacroUnit] = React.useState<"g" | "percent">("percent");
  const [macroPercents, setMacroPercents] = React.useState<
    Record<MacroType, number>
  >({
    protein: 0,
    carbs: 0,
    fat: 0,
  });

  /** set initial % from default grams */
  useEffect(() => {
    const c = getValues("calories");
    setMacroPercents({
      protein: Math.round(gramsToPercent(getValues("protein"), "protein", c)),
      carbs: Math.round(gramsToPercent(getValues("carbs"), "carbs", c)),
      fat: Math.round(gramsToPercent(getValues("fat"), "fat", c)),
    });
    // eslint‑disable‑next‑line react-hooks/exhaustive-deps
  }, []);

  const calories = watch("calories");

  /**
   * Sync grams ↔ % whenever % or total calories change (in %‑Modus)
   */
  useEffect(() => {
    if (macroUnit === "percent") {
      (Object.keys(macroPercents) as MacroType[]).forEach((m) => {
        setValue(m, Math.round(percentToGrams(macroPercents[m], m, calories)), {
          shouldDirty: true,
          shouldValidate: false,
        });
      });
    }
  }, [macroPercents, calories, macroUnit, setValue]);

  /**
   * Toggle Anzeigeeinheit
   */
  const toggleMacroUnit = () => {
    setMacroUnit((prev) => {
      const next = prev === "g" ? "percent" : "g";
      if (next === "percent") {
        const c = getValues("calories");
        setMacroPercents({
          protein: Math.round(
            gramsToPercent(getValues("protein"), "protein", c)
          ),
          carbs: Math.round(gramsToPercent(getValues("carbs"), "carbs", c)),
          fat: Math.round(gramsToPercent(getValues("fat"), "fat", c)),
        });
      }
      return next;
    });
  };

  /**
   *  Haupt‑Handler für Prozentänderungen – kapselt die "Deckel"‑Logik
   */
  const handlePercentChange = (macro: MacroType, next: number) => {
    setMacroPercents((prev) => {
      const otherSum = prev.protein + prev.carbs + prev.fat - prev[macro];
      const capped = Math.min(next, Math.max(0, 100 - otherSum));

      // sofort die korrespondierenden Grammwerte im RHF‐State anpassen
      setValue(macro, Math.round(percentToGrams(capped, macro, calories)), {
        shouldDirty: true,
        shouldValidate: false,
      });

      // haben wir gecappt? → falls ja, nichts weiter tun; der Input zeigt dann den alten Wert
      return { ...prev, [macro]: capped };
    });
  };

  /**
   * Summe für Warnungen
   */
  const totalPercent =
    macroPercents.protein + macroPercents.carbs + macroPercents.fat;
  const isOver100 = totalPercent > 100;

  return (
    <View>
      {/* Kalorien */}
      <CaloriesInput control={control} />

      {/* Makros */}
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
          {(["protein", "carbs", "fat"] as MacroType[]).map((m) => (
            <Controller
              key={m}
              control={control}
              name={m}
              render={({ field }) => (
                <MacroHandler
                  macro={m}
                  grams={field.value}
                  percent={macroPercents[m]}
                  onPercentChange={(p) => handlePercentChange(m, p)}
                  onGramsChange={field.onChange}
                  calories={calories}
                  macroUnit={macroUnit}
                  isOver={isOver100}
                />
              )}
            />
          ))}
        </View>

        {/* Einheit‑Switch */}
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

        {isOver100 && (
          <Text
            style={{
              marginTop: 12,
              color: colors.destructive,
              fontSize: 14,
              textAlign: "center",
              fontFamily: "Nunito",
              fontWeight: "800",
            }}
          >
            Die Summe aller Makros liegt über 100% der Kalorien!
          </Text>
        )}
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

export default NutritionGoalsForm;
