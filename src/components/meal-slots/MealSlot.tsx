import { useDeleteMealEntry } from "@/hooks/meal-entries/useDeleteMealEntry";
import { useTheme } from "@/providers/theme";
import { MealSlotEntry as METype } from "@/types";
import { calcTotals } from "@/utils/meals";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";
import React from "react";
import { Text, TouchableOpacity } from "react-native";
import Animated, { LinearTransition } from "react-native-reanimated";
import CardHeader from "../shared/CardHeader";
import CardIcon from "../shared/CardIcon";
import AddEntryButton from "./AddEntryButton";
import MealSlotEntry from "./MealSlotEntry";
import MealSlotHeader from "./MealSlotHeader";

interface Props {
  id: string;
  title: string;
  entries: METype[];
}

const MealSlot = ({ id, title, entries }: Props) => {
  const bottomSheetRef = React.useRef<BottomSheetModal>(null);
  const { colors, categoryColors } = useTheme();
  const { mutateAsync: deleteMealEntry } = useDeleteMealEntry();
  const router = useRouter();

  const totals = React.useMemo(() => calcTotals(entries), [entries]);

  const handleAddEntryPress = () => {
    bottomSheetRef.current?.present();
  };

  const handleEntryPress = (entry: METype) => {
    if (entry.type === "food") {
      router.push(`/foods/${entry.entry.id}?mealEntryId=${entry.id}`);
    } else {
      router.push(`/recipes/${entry.entry.id}?mealEntryId=${entry.id}`);
    }
  };

  const handleEntryDelete = async (entryId: string) => {
    await deleteMealEntry(entryId);
  };

  return (
    <>
      <Animated.View layout={LinearTransition} key={id}>
        <MealSlotHeader title={title} totals={totals} isFirst />

        {entries.map((item) => {
          return (
            <MealSlotEntry
              key={item.id}
              entry={item}
              onPress={handleEntryPress}
              onDelete={handleEntryDelete}
            />
          );
        })}

        <AddEntryButton id={id} onPress={handleAddEntryPress} isLast />
      </Animated.View>

      <BottomSheetModal
        ref={bottomSheetRef}
        index={1}
        snapPoints={["30%"]}
        enablePanDownToClose
        backgroundStyle={{
          backgroundColor: colors.foreground,
        }}
        handleIndicatorStyle={{ backgroundColor: colors.textLight }}
        style={{
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          shadowColor: colors.shadow,
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 5,
        }}
        stackBehavior="replace"
      >
        <BottomSheetView style={{ paddingHorizontal: 16 }}>
          <CardHeader title="Eintrag hinzufügen" />
          <TouchableOpacity
            onPress={() => {
              bottomSheetRef.current?.close();
              setTimeout(() => {
                router.push(`/foods?mealSlotId=${id}`);
              }, 150);
            }}
            style={{
              paddingVertical: 4,
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
              marginTop: 8,
            }}
          >
            <CardIcon
              name="diamond"
              size={36}
              color={categoryColors.fastfood.foreground}
              bgColor={categoryColors.fastfood.background}
            />
            <Text
              style={{
                fontFamily: "Nunito",
                color: colors.text,
                fontWeight: "700",
                fontSize: 16,
              }}
            >
              Lebensmittel hinzufügen
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              bottomSheetRef.current?.dismiss();
              router.push(`/recipes?mealSlotId=${id}`);
            }}
            style={{
              paddingVertical: 4,
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
            }}
          >
            <CardIcon
              name="repo"
              size={36}
              color={categoryColors.dairy.foreground}
              bgColor={categoryColors.dairy.background}
            />
            <Text
              style={{
                fontFamily: "Nunito",
                color: colors.text,
                fontWeight: "700",
                fontSize: 16,
              }}
            >
              Rezept hinzufügen
            </Text>
          </TouchableOpacity>
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
};

export default MealSlot;
