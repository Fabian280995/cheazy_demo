import MealSlot from "@/components/meals/MealSlot";
import { MEAL_SLOTS, mockEntries } from "@/constants/mealSlots";
import { useTheme } from "@/providers/theme";
import { MealSlotEntry as METype, MealSlotId } from "@/types";
import { groupEntriesBySlot } from "@/utils/meals";
import React from "react";
import { View } from "react-native";

interface Section {
  id: MealSlotId;
  title: string;
  data: METype[];
}

export default function DiaryScreen() {
  const { colors } = useTheme();
  const [sections, setSections] = React.useState<Section[]>([]);

  React.useEffect(() => {
    if (mockEntries.length === 0) {
      setSections([]);
      return;
    }
    const grouped = groupEntriesBySlot(mockEntries);
    const newSections: Section[] = MEAL_SLOTS.map((slot) => ({
      id: slot.id,
      title: slot.label,
      data: grouped[slot.id],
    }));
    setSections(newSections);
  }, []);

  return (
    <View style={{ flex: 1, gap: 16 }}>
      {sections.map((section) => (
        <MealSlot
          key={section.id}
          title={section.title}
          entries={section.data}
        />
      ))}
    </View>
  );
}
