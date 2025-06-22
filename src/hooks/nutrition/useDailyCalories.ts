// hooks/useDailyCaloriesMutation.ts
import { getDailyCalories } from "@/api/daily-calories";
import { useMutation } from "@tanstack/react-query";
// vollständiges Array

// ---------- Custom Hook -------------------------------------------------
export function useDailyCaloriesMutation() {
  return useMutation({
    mutationKey: ["daily-calories"],
    mutationFn: getDailyCalories,
    onError: (error) => {
      console.error("Error fetching daily calories:", error);
    },
    onSuccess: (data) => {
      console.log("Daily calories fetched successfully:", data);
    },
  });
}
