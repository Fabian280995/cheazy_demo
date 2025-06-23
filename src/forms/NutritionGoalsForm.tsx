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
import { useCreatePersonalGoal } from "@/hooks/personal-goals/useCreatePersonalGoal";
import { useUpdatePersonalGoal } from "@/hooks/personal-goals/useUpdatePersonalGoal";
import { useAuth } from "@/providers/auth";
import { useTheme } from "@/providers/theme";
import { NutritionGoal } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useRouter } from "expo-router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, View } from "react-native";
import { z } from "zod";

const schema = z
  .object({
    calories: z.coerce.number().int().min(0, "Kalorien müssen positiv sein"),
    protein: z.coerce.number().int().min(0, "Protein muss positiv sein"),
    carbs: z.coerce.number().int().min(0, "Kohlenhydrate müssen positiv sein"),
    fat: z.coerce.number().int().min(0, "Fett muss positiv sein"),
  })
  .superRefine((data, ctx) => {
    const percentSum =
      gramsToPercent(data.protein, "protein", data.calories) +
      gramsToPercent(data.carbs, "carbs", data.calories) +
      gramsToPercent(data.fat, "fat", data.calories);

    if (percentSum > 100) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Die Summe aller Makros liegt bei ${Math.round(
          percentSum
        )}% und übersteigt damit 100 % der Kalorien`,
        path: ["protein"], // irgendein Feld, damit RHF die Fehlermeldung anzeigt
      });
    }
  });

export type FormValues = z.infer<typeof schema>;

interface Props {
  initialData?: NutritionGoal;
}

const NutritionGoalsForm = ({ initialData }: Props) => {
  const { colors } = useTheme();
  const router = useRouter();
  const { user } = useAuth();
  const { mutateAsync: create, isPending: creating } = useCreatePersonalGoal();
  const { mutateAsync: update, isPending: updating } = useUpdatePersonalGoal();

  const {
    control,
    setValue,
    getValues,
    watch,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      calories: initialData?.kcal || 2500,
      protein: initialData?.proteins_g || percentToGrams(30, "protein", 2500),
      carbs: initialData?.carbs_g || percentToGrams(40, "carbs", 2500),
      fat: initialData?.fats_g || percentToGrams(30, "fat", 2500),
    },
  });

  const onSubmit = async (data: FormValues) => {
    if (!user) {
      console.error("User is not authenticated");
      return;
    }

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

    router.back();
    return;
  };

  const [macroPercents, setMacroPercents] = useState<Record<MacroType, number>>(
    () => {
      const c = getValues("calories");
      return {
        protein: Math.round(gramsToPercent(getValues("protein"), "protein", c)),
        carbs: Math.round(gramsToPercent(getValues("carbs"), "carbs", c)),
        fat: Math.round(gramsToPercent(getValues("fat"), "fat", c)),
      };
    }
  );

  const calories = watch("calories");

  useEffect(() => {
    (Object.keys(macroPercents) as MacroType[]).forEach((m) => {
      setValue(m, Math.round(percentToGrams(macroPercents[m], m, calories)), {
        shouldDirty: true,
        shouldValidate: false,
      });
    });
  }, [macroPercents, calories, setValue]);

  const updatePercent = useCallback(
    (macro: MacroType, next: number) => {
      setMacroPercents((prev) => {
        const otherSum = prev.protein + prev.carbs + prev.fat - prev[macro];
        const capped = Math.min(next, Math.max(0, 100 - otherSum));

        setValue(macro, Math.round(percentToGrams(capped, macro, calories)), {
          shouldDirty: true,
          shouldValidate: true, // sofort neu validieren, weil wir jetzt ohne isOver100 arbeiten
        });

        return { ...prev, [macro]: capped };
      });
    },
    [calories, setValue]
  );

  const totalPercent = useMemo(
    () => macroPercents.protein + macroPercents.carbs + macroPercents.fat,
    [macroPercents]
  );
  const showPercentWarning = totalPercent > 100;

  return (
    <View>
      <CaloriesInput control={control} />

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
          {(["protein", "carbs", "fat"] as MacroType[]).map((macro) => (
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
            Die Summe aller Makros liegt über 100 % der Kalorien!
          </Text>
        )}
      </Card>

      {/* Speichern-Button */}
      <View style={{ marginTop: 16 }}>
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
