// aiGenerateMealEntries.ts
import { Alert } from "react-native";
import type { AiResponse } from "@/types/ai-chat"; // ← NEUER Import!

const MAX_PROMPT_SIZE = 10 * 1024 * 1024; // 10 MiB

const EDGE_FUNCTION_URL =
  process.env.EXPO_PUBLIC_SUPABASE_GENERATE_MEAL_ENTRIES_URL;
const TOKEN = process.env.EXPO_PUBLIC_SUPABASE_EDGE_FUNCTIONS_TOKEN;

/**
 * Ruft die Edge-Function `generate_meal_entries` auf und liefert
 * eine KI-Antwort mit natürlichem Text, strukturierten Einträgen
 * und aggregierten Makros zurück.
 */
export const aiGenerateMealEntries = async ({
  prompt,
  referenceDate,
}: {
  prompt: string;
  referenceDate?: string;
}): Promise<AiResponse> => {
  console.log("Uploading prompt to Edge Function:", prompt.slice(0, 80));
  console.log("Edge Function URL:", EDGE_FUNCTION_URL);

  /* ---------- Basisschutz ---------- */
  if (!EDGE_FUNCTION_URL) throw new Error("Edge Function URL is not defined");
  if (!TOKEN) {
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

  /* ---------- Multipart-Body ---------- */
  const formData = new FormData();
  formData.append("prompt", prompt);
  if (referenceDate) formData.append("referenceDate", referenceDate);

  /* ---------- Request ---------- */
  const response = await fetch(EDGE_FUNCTION_URL, {
    method: "POST",
    body: formData,
    headers: { Authorization: `Bearer ${TOKEN}` }, // Content-Type NICHT setzen
  });

  if (!response.ok) {
    throw new Error(
      `Meal-Entry generation failed: ${response.status} – ${response.statusText}`
    );
  }

  /* ---------- Schema-Validierung ---------- */
  const json = (await response.json()) as unknown;

  // Minimaler Type-Guard für AiResponse
  const isAiResponse = (obj: any): obj is AiResponse =>
    obj &&
    typeof obj === "object" &&
    typeof obj.answerText === "string" &&
    Array.isArray(obj.entries);

  if (!isAiResponse(json)) {
    console.error("Model returned invalid AiResponse:", json);
    throw new Error("Model returned invalid JSON");
  }

  return json;
};
