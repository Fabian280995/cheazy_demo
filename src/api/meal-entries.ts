// aiGenerateMealEntries.ts
import { Alert } from "react-native";
import type { MealSlotEntry } from "@/types/meals";

const MAX_PROMPT_SIZE = 10 * 1024 * 1024;

const EDGE_FUNCTION_URL =
  process.env.EXPO_PUBLIC_SUPABASE_GENERATE_MEAL_ENTRIES_URL;
const TOKEN = process.env.EXPO_PUBLIC_SUPABASE_EDGE_FUNCTIONS_TOKEN;

export const aiGenerateMealEntries = async ({
  prompt,
  referenceDate,
}: {
  prompt: string;
  referenceDate?: string;
}): Promise<MealSlotEntry[]> => {
  console.log("Uploading prompt to Edge Function:", prompt.slice(0, 80));
  console.log("Edge Function URL:", EDGE_FUNCTION_URL);

  if (!EDGE_FUNCTION_URL) {
    console.error("Edge Function URL is not defined");
    throw new Error("Edge Function URL is not defined");
  }
  if (!TOKEN) {
    console.error("Edge-Function token is not defined");
    Alert.alert("Edge-Function token is not defined");
    throw new Error("Edge-Function token is not defined");
  }
  if (!prompt.trim()) {
    Alert.alert("Prompt must not be empty");
    throw new Error("Prompt must not be empty");
  }
  if (prompt.length > MAX_PROMPT_SIZE) {
    Alert.alert("Prompt is too large");
    throw new Error("Prompt is too large");
  }

  const formData = new FormData();
  formData.append("prompt", prompt);
  if (referenceDate) formData.append("referenceDate", referenceDate);

  const response = await fetch(EDGE_FUNCTION_URL, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  if (!response.ok) {
    throw new Error(
      `Meal-Entry generation failed: ${response.status} – ${response.statusText}`
    );
  }

  const json = (await response.json()) as unknown;
  if (!Array.isArray(json)) {
    console.error("Model returned non-array:", json);
    throw new Error("Model returned invalid JSON");
  }

  return json as MealSlotEntry[];
};
