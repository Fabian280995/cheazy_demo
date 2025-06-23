import { CaloriesInput } from "@/components/nutrition/CaloriesInput";
import MacroHandler, {
  gramsToPercent,
  MacroType,
  percentToGrams,
} from "@/components/nutrition/MacroHandler";
import { AddButton } from "@/components/shared/AddButton";
import Card from "@/components/shared/Card";
import CardHeader from "@/components/shared/CardHeader";
import { useCreatePersonalGoal } from "@/hooks/personal-goals/useCreatePersonalGoal";
import { useUpdatePersonalGoal } from "@/hooks/personal-goals/useUpdatePersonalGoal";
import { useAuth } from "@/providers/auth";
import { useTheme } from "@/providers/theme";
import { NutritionGoal } from "@/types";
import { Octicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, Text, View } from "react-native";
import * as z from "zod/v4";

const TOLERANCE = 0.5;
const MACROS: MacroType[] = ["protein", "carbs", "fat"];

/* ---------------- Schema ---------------- */
const nutritionSchema = z
  .object({
    calories: z.int().min(0, { error: "Kalorien müssen positiv sein" }),
    protein: z.int().min(0, { error: "Protein muss positiv sein" }),
    carbs: z.int().min(0, { error: "Kohlenhydrate müssen positiv sein" }),
    fat: z.int().min(0, { error: "Fett muss positiv sein" }),
  })
  .check((ctx) => {
    const { calories, protein, carbs, fat } = ctx.value;
    const sum =
      gramsToPercent(protein, "protein", calories) +
      gramsToPercent(carbs, "carbs", calories) +
      gramsToPercent(fat, "fat", calories);
    if (Math.abs(sum - 100) > TOLERANCE) {
      ctx.issues.push({
        code: "custom",
        message: `Makros ergeben ${Math.round(sum)} % – muss 100 % sein`,
        path: ["protein"],
        input: ctx.value,
      });
    }
  });

type Schema = typeof nutritionSchema;
export type FormValues = z.output<Schema>;

type FormInput = z.input<Schema>;
type FormOutput = z.output<Schema>;

interface Props {
  initialData?: NutritionGoal;
}

/* --------------- Component --------------- */
const NutritionGoalsForm: React.FC<Props> = ({ initialData }) => {
  const { colors } = useTheme();
  const router = useRouter();
  const { user } = useAuth();
  const { mutateAsync: create } = useCreatePersonalGoal();
  const { mutateAsync: update } = useUpdatePersonalGoal();

  /* ---- RHF setup ---- */
  const {
    control,
    setValue,
    getValues,
    watch,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm<FormInput, any, FormOutput>({
    resolver: zodResolver(nutritionSchema),
    mode: "onChange",
    defaultValues: {
      calories: initialData?.kcal ?? 2500,
      protein: initialData?.proteins_g ?? percentToGrams(30, "protein", 2500),
      carbs: initialData?.carbs_g ?? percentToGrams(40, "carbs", 2500),
      fat: initialData?.fats_g ?? percentToGrams(30, "fat", 2500),
    },
  });

  /* ---- local state ---- */
  const [macroPercents, setMacroPercents] = useState<Record<MacroType, number>>(
    {
      protein: 30,
      carbs: 40,
      fat: 30,
    }
  );
  const [locked, setLocked] = useState<Record<MacroType, boolean>>({
    protein: false,
    carbs: false,
    fat: false,
  });

  const calories = watch("calories") as number;

  /* first mount: derive percents from grams */
  useEffect(() => {
    const c = getValues("calories");
    setMacroPercents({
      protein: Math.round(gramsToPercent(getValues("protein"), "protein", c)),
      carbs: Math.round(gramsToPercent(getValues("carbs"), "carbs", c)),
      fat: Math.round(gramsToPercent(getValues("fat"), "fat", c)),
    });
    // only once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* sync grams whenever percents OR calories change */
  useEffect(() => {
    MACROS.forEach((m) => {
      setValue(m, Math.round(percentToGrams(macroPercents[m], m, calories)), {
        shouldDirty: true,
        shouldValidate: true,
      });
    });
  }, [calories, macroPercents, setValue]);

  /* ---- helper callbacks ---- */
  const toggleLock = (macro: MacroType) =>
    setLocked((prev) => ({ ...prev, [macro]: !prev[macro] }));

  const updatePercent = useCallback(
    (macro: MacroType, next: number) => {
      setMacroPercents((prev) => {
        const updated = { ...prev, [macro]: next } as Record<MacroType, number>;
        const lockedSum = MACROS.filter((m) => locked[m] && m !== macro).reduce(
          (s, m) => s + updated[m],
          0
        );
        const freeMacros = MACROS.filter((m) => !locked[m] && m !== macro);
        const remaining = 100 - next - lockedSum;
        if (freeMacros.length === 0) return updated;
        const prevFreeSum = freeMacros.reduce((s, m) => s + prev[m], 0);
        freeMacros.forEach((m) => {
          updated[m] = Math.round(prev[m] * (remaining / (prevFreeSum || 1)));
        });
        return updated;
      });
    },
    [locked]
  );

  /* ---- submit ---- */
  const onSubmit = async (data: FormValues) => {
    if (!user) return;
    try {
      const initialDataIsToday = initialData
        ? format(new Date(initialData.started_at), "yyyy-MM-dd") ===
          format(new Date(), "yyyy-MM-dd")
        : false;
      if (initialData && initialDataIsToday) {
        await update({
          id: initialData.id,
          updates: {
            kcal: data.calories,
            proteins_g: data.protein,
            carbs_g: data.carbs,
            fats_g: data.fat,
          },
        });
      } else {
        await create({
          kcal: data.calories,
          proteins_g: data.protein,
          carbs_g: data.carbs,
          fats_g: data.fat,
          started_at: format(new Date(), "yyyy-MM-dd"),
          user_id: user.id,
        });
      }
    } finally {
      router.back();
    }
  };

  const sumPercent =
    macroPercents.protein + macroPercents.carbs + macroPercents.fat;
  const showPercentWarning = Math.abs(sumPercent - 100) > TOLERANCE;

  /* ------------ UI ------------ */
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={{ flex: 1, backgroundColor: colors.background }}
        contentContainerStyle={{ padding: 16 }}
        keyboardDismissMode="on-drag"
      >
        <CaloriesInput control={control} />
        <Card style={{ marginTop: 16 }}>
          <CardHeader
            title="Makronährstoffe"
            Icon={() => (
              <Octicons name="beaker" size={24} color={colors.text} />
            )}
          />
          <View
            style={{
              flexDirection: "row",
              gap: 16,
              marginTop: 16,
              justifyContent: "space-evenly",
            }}
          >
            {MACROS.map((macro) => (
              <Controller
                key={macro}
                control={control}
                name={macro}
                render={({ field }) => (
                  <MacroHandler
                    macro={macro}
                    grams={field.value}
                    percent={macroPercents[macro]}
                    onPercentChange={(p) => updatePercent(macro, p)}
                    onGramsChange={field.onChange}
                    calories={calories}
                    isOver={false}
                    locked={locked[macro]}
                    onToggleLock={() => toggleLock(macro)}
                  />
                )}
              />
            ))}
          </View>
          {showPercentWarning && (
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
              Die Summe aller Makros liegt bei {sumPercent.toFixed(1)} %!
            </Text>
          )}
        </Card>
      </ScrollView>
      <View style={{ position: "absolute", bottom: 16, left: 16, right: 16 }}>
        <AddButton
          label="Ziele speichern"
          onPress={handleSubmit(onSubmit)}
          loading={isSubmitting}
          disabled={!isValid || isSubmitting}
          showIcon={false}
        />
      </View>
    </View>
  );
};

export default NutritionGoalsForm;
