import MealSlot from "@/components/meals/MealSlot";
import { MEAL_SLOTS } from "@/constants/mealSlots";
import { useMealEntriesQuery } from "@/hooks/meal-entries/useMealEntriesQuery";
import { useTheme } from "@/providers/theme";
import { MealSlotEntry as METype, MealSlotId } from "@/types";
import { groupEntriesBySlot } from "@/utils/meals";
import React from "react";
import { ActivityIndicator, View } from "react-native";

interface Section {
  id: MealSlotId;
  title: string;
  data: METype[];
}

interface Props {
  id?: string;
}

export default function DiaryScreen({ id }: Props) {
  const { colors } = useTheme();
  const [sections, setSections] = React.useState<Section[]>([]);
  const { data: mealEntries, isLoading } = useMealEntriesQuery(id);

  React.useEffect(() => {
    const grouped = groupEntriesBySlot(mealEntries ?? []);

    const newSections: Section[] = MEAL_SLOTS.map((slot) => ({
      id: slot.id,
      title: slot.label,
      data: grouped[slot.id],
    }));
    setSections(newSections);
  }, [mealEntries]);

  return (
    <View style={{ flex: 1, gap: 16 }}>
      {isLoading && (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color={colors.secondary} />
        </View>
      )}
      {sections.map((section) => (
        <MealSlot
          key={section.id}
          id={section.id}
          title={section.title}
          entries={section.data}
        />
      ))}
    </View>
  );
}
