// src/schemas/foodSchema.ts
import { z } from "zod";

/**
 * Input-Schema für das Frontend: die natürliche Beschreibung, was gegessen wurde.
 * Zum Beispiel: "Heute hatte ich ein Sandwich mit Käse und Schinken sowie einen Apfel."
 */
export const FoodInputSchema = z.object({
  description: z
    .string()
    .min(3, { message: "Bitte beschreibe, was du gegessen hast." })
    .max(500, { message: "Maximal 500 Zeichen erlaubt." }),
});

export type FoodInput = z.infer<typeof FoodInputSchema>;
