import MealSlot from "@/components/meal-slots/MealSlot";
import { MEAL_SLOTS } from "@/constants/mealSlots";
import { useMealSlotEntriesQuery } from "@/hooks/meal-entries/useMealSlotEntriesQuery";
import { useRefreshOnFocus } from "@/hooks/useRefreshOnFocus";
import { useCalendar } from "@/providers/calendar";
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

interface Props {}

export default function DiaryScreen({}: Props) {
  const { colors } = useTheme();
  const { currentDate } = useCalendar();
  const [sections, setSections] = React.useState<Section[]>([]);
  const {
    data: mealEntries,
    isLoading,
    refetch,
  } = useMealSlotEntriesQuery(currentDate);

  useRefreshOnFocus(refetch);

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
