// hooks/useDailyCaloriesMutation.ts
import { getDailyCalories } from "@/api/daily-calories";
import { useMutation } from "@tanstack/react-query";
// vollständiges Array

// ---------- Custom Hook -------------------------------------------------
export function useDailyCaloriesMutation(start: Date, end: Date) {
  return useMutation({
    mutationKey: ["daily-calories", start, end],
    mutationFn: () => getDailyCalories({ start, end }),
    onError: (error) => {
      console.error("Error fetching daily calories:", error);
    },
    onSuccess: (data) => {
      console.log("Daily calories fetched successfully:", data);
    },
  });
}
