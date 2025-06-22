import { useMealSlotEntriesQuery } from "@/hooks/meal-entries/useMealSlotEntriesQuery";
import { useRefreshOnFocus } from "@/hooks/useRefreshOnFocus";
import { MealSlotEntry, NutritionTotals } from "@/types";
import { calcTotals } from "@/utils/meals";
import { createContext, useContext, useEffect, useState } from "react";

type MealEntriesContextType = {
  mealEntries: MealSlotEntry[];
  isLoading: boolean;
  dayTotals: NutritionTotals;
};

export const MealEntriesContext = createContext<MealEntriesContextType>(
  {} as MealEntriesContextType
);

interface MealEntriesProviderProps {
  date: Date;
}

export const MealEntriesProvider: React.FC<
  React.PropsWithChildren<MealEntriesProviderProps>
> = ({ children, date }) => {
  const [totals, setTotals] = useState<NutritionTotals>({
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
  });
  const {
    data: mealEntries,
    isLoading,
    refetch,
    isError,
    error,
  } = useMealSlotEntriesQuery(date);

  useRefreshOnFocus(refetch);

  if (isError) {
    console.error("Error fetching recipe:", error);
  }

  useEffect(() => {
    if (mealEntries) {
      setTotals(calcTotals(mealEntries));
    }
  }, [mealEntries]);

  return (
    <MealEntriesContext.Provider
      value={{ mealEntries: mealEntries ?? [], isLoading, dayTotals: totals }}
    >
      {children}
    </MealEntriesContext.Provider>
  );
};

export const useMealEntries = () => {
  const context = useContext(MealEntriesContext);
  if (!context) {
    throw new Error("useMealEntries must be used within a MealEntriesProvider");
  }
  return context;
};
