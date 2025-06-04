// src/hooks/useTrackFood.ts
import { useMutation } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { FoodInput } from "@/schemas/foodSchema";

interface TrackedFoodResponse {
  dishes: {
    name: string;
    ingredients: {
      name: string;
      calories: number;
      protein: number;
      carbs: number;
      fat: number;
    }[];
  }[];
}

// Mutation-Funktion, die die Edge Function proxyed
async function trackFood(input: FoodInput): Promise<TrackedFoodResponse> {
  // Wir rufen die Edge Function "ai-nutrition" auf:
  const res = await supabase.functions.invoke("ai-nutrition", {
    body: JSON.stringify({
      description: input.description,
      // Optional: userId, falls man die Daten in Supabase speichern will
      // userId: supabase.auth.user()?.id
    }),
  });

  if (res.error) {
    throw new Error(res.error.message);
  }
  // Supabase Functions liefert immer JSON zurück (status 200),
  // wir parsen daher einfach:
  return res.data as TrackedFoodResponse;
}

// Custom Hook für das Frontend:
export function useTrackFood() {
  return useMutation({ mutationFn: trackFood });
}
