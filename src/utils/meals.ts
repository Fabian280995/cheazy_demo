import { MEAL_SLOTS } from "@/constants/mealSlots";
import { MealSlotEntry, MealSlotId } from "@/types";

// Hilfsmapping: MealSlotId → sortOrder
const slotOrderMap: Record<MealSlotId, number> = MEAL_SLOTS.reduce(
  (acc, slot) => ({ ...acc, [slot.id]: slot.sortOrder }),
  {} as Record<MealSlotId, number>
);

// 1. Flaches, sortiertes Array
export function sortEntriesFlat(entries: MealSlotEntry[]): MealSlotEntry[] {
  return [...entries].sort(
    (a, b) => slotOrderMap[a.mealSlot] - slotOrderMap[b.mealSlot]
  );
}

// 2. Gruppiertes Objekt: { [slotId]: MealSlotEntry[] }
export function groupEntriesBySlot(
  entries: MealSlotEntry[]
): Record<MealSlotId, MealSlotEntry[]> {
  // Erst alle Gruppen initialisieren, damit auch leere Slots da sind
  const grouped: Record<MealSlotId, MealSlotEntry[]> = MEAL_SLOTS.reduce(
    (acc, slot) => ({ ...acc, [slot.id]: [] }),
    {} as Record<MealSlotId, MealSlotEntry[]>
  );

  entries.forEach((entry) => {
    grouped[entry.mealSlot].push(entry);
  });

  // Innerhalb jeder Gruppe optional nach Datum oder anderen Kriterien sortieren
  for (const slotId of Object.keys(grouped) as MealSlotId[]) {
    grouped[slotId].sort((a, b) => a.date.localeCompare(b.date));
  }

  return grouped;
}
