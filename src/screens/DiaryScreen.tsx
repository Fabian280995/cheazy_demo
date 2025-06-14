import MealSlotEntry from "@/components/meals/MealSlotEntry";
import { MEAL_SLOTS, mockEntries } from "@/constants/mealSlots";
import { useTheme } from "@/providers/theme";
import { MealSlotEntry as METype, MealSlotId } from "@/types";
import { groupEntriesBySlot } from "@/utils/meals";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

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
        <View key={section.id}>
          {/* Section-Header */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: colors.foreground,
              paddingHorizontal: 12,
              paddingTop: 16,
              paddingBottom: 8,
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              borderBottomWidth: 1,
              borderBottomColor: colors.background,
            }}
          >
            <Text
              style={{
                fontFamily: "Nunito",
                color: colors.text,
                fontWeight: "800",
                fontSize: 16,
              }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {section.title}
            </Text>
            <Feather name="chevron-right" size={20} color={colors.text} />
          </View>

          {/* Section-Items */}
          {section.data.map((item, idx) => {
            const isLast = idx === section.data.length - 1;

            return (
              <MealSlotEntry
                key={`${item.date}-${item.mealSlot}-${item.entry.id}`}
                entry={item}
                isLast={isLast}
              />
            );
          })}
        </View>
      ))}
    </View>
  );
}
