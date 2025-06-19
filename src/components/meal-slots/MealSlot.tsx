import { ButtonSetting } from "@/lib/settings/ButtonSetting";
import { useTheme } from "@/providers/theme";
import { ISetting, MealSlotEntry as METype } from "@/types";
import { calcTotals } from "@/utils/meals";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import React from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import Animated, { LinearTransition } from "react-native-reanimated";
import SettingsBlock from "../settings/SettingsBlock";
import CardIcon from "../shared/CardIcon";
import MealSlotEntry from "./MealSlotEntry";
import CardHeader from "../shared/CardHeader";
import SettingsBlockWrapper from "../settings/SettingsBlockWrapper";
import SettingsListWrapper from "../settings/SettingsListWrapper";
import CategoryIcon from "../shared/icons/CategoryIcon";
import { Feather } from "@expo/vector-icons";
import { ca } from "zod/v4/locales";

interface Props {
  id: string;
  title: string;
  entries: METype[];
}

const MealSlot = ({ id, title, entries }: Props) => {
  const bottomSheetRef = React.useRef<BottomSheetModal>(null);
  const { colors, categoryColors } = useTheme();
  const router = useRouter();

  const totals = React.useMemo(() => calcTotals(entries), [entries]);
  const totalCalories = totals.calories.toFixed(0);

  const handleAddEntryPress = () => {
    bottomSheetRef.current?.present();
  };

  return (
    <>
      <Animated.View layout={LinearTransition} key={id}>
        <View
          style={{
            backgroundColor: colors.foreground,
            paddingHorizontal: 12,
            paddingVertical: 8,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            borderBottomWidth: 1,
            borderBottomColor: colors.background,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontFamily: "Nunito",
                color: colors.text,
                fontWeight: "900",
                fontSize: 16,
              }}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {title}
            </Text>
            <Text
              style={{
                fontFamily: "Inter",
                color: colors.primary,
                fontWeight: "700",
                fontSize: 16,
              }}
            >
              {totalCalories} kcal
            </Text>
          </View>
          <Text
            style={{ fontSize: 12, color: "gray", textAlign: "right" }}
            ellipsizeMode="tail"
          >
            {totals.fat.toFixed(0)}g Fett, {totals.carbs.toFixed(0)}g
            Kohlenhydrate, {totals.protein.toFixed(0)}g Eiweiß
          </Text>
        </View>

        {/* Section-Items */}
        {entries.map((item) => {
          return (
            <MealSlotEntry
              key={item.entry.id}
              entry={item}
              onPress={(entry) => {
                if (entry.type === "food") {
                  router.push(
                    `/foods/${entry.entry.id}?mealEntryId=${item.id}`
                  );
                } else {
                  // router.push(
                  //   `/recipes/${entry.entry.id}?mealEntryId=${item.id}`
                  // );
                  console.log(
                    "Recipe entries are not supported yet in MealSlotEntry"
                  );
                }
              }}
            />
          );
        })}

        <TouchableOpacity
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: colors.foreground,
            paddingHorizontal: 12,
            paddingVertical: 8,
            borderBottomLeftRadius: 16,
            borderBottomRightRadius: 16,
          }}
          onPress={handleAddEntryPress}
        >
          <CardIcon
            name="add"
            size={36}
            color={colors.textForeground}
            bgColor={colors.primary}
          />
          <Text
            style={{
              fontFamily: "Nunito",
              color: colors.text,
              fontWeight: "700",
              fontSize: 14,
              marginLeft: 8,
            }}
          >
            Eintrag hinzufügen
          </Text>
        </TouchableOpacity>
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
              name="restaurant-outline"
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
              // router.push(`/recipes?mealSlotId=${id}`);
            }}
            style={{
              paddingVertical: 4,
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
            }}
          >
            <CardIcon
              name="book-outline"
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
