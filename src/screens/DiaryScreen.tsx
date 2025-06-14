import MealSlotEntry from "@/components/meals/MealSlotEntry";
import { MEAL_SLOTS, mockEntries } from "@/constants/mealSlots";
import { useTheme } from "@/providers/theme";
import { MealSlotEntry as METype, MealSlotId } from "@/types";
import { groupEntriesBySlot } from "@/utils/meals";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

/* ---------- Typen ---------- */
interface Section {
  id: MealSlotId;
  title: string;
  data: METype[];
}

/* ---------- Component ---------- */
export default function DiaryScreen() {
  const { colors } = useTheme();
  const [sections, setSections] = React.useState<Section[]>([]);

  /* Gruppieren → Sections-State füllen */
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

  /* ---------- Render ---------- */
  return (
    <View>
      {sections.map((section) => (
        <View key={section.id} style={{ marginBottom: 24 }}>
          {/* Section-Header */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: colors.foreground,
              padding: 12,
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              borderBottomWidth: 1,
              borderBottomColor: colors.background,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                color: colors.text,
                fontFamily: "Nunito",
                fontWeight: "800",
              }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {section.title}
            </Text>

            <TouchableOpacity
              onPress={() => {
                // router.push(`/meals/${section.id}`);
              }}
              style={{
                padding: 6,
                borderRadius: 8,
                backgroundColor: colors.background,
              }}
            >
              <Feather name="plus" size={16} color={colors.icon} />
            </TouchableOpacity>
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

          {/* Abstand unter jeder Section */}
          <View style={{ height: 8 }} />
        </View>
      ))}
    </View>
  );
}
