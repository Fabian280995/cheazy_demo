import { useMealEntryQuery } from "@/hooks/meal-entries/useMealEntryQuery";
import { MeaLEntryModel } from "@/types";
import { createContext, useContext } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { useTheme } from "./theme";

type MealEntryContextType = {
  mealEntry: MeaLEntryModel;
};

const MealEntryContext = createContext<MealEntryContextType | undefined>(
  undefined
);

export const useMealEntry = (): MealEntryContextType => {
  const ctx = useContext(MealEntryContext);
  if (!ctx) throw new Error("useMealEntry must be inside MealEntryProvider");
  return ctx;
};

export const MealEntryProvider = ({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) => {
  const { colors } = useTheme();
  const { data: mealEntry, error, isLoading } = useMealEntryQuery(id);

  if (isLoading)
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={colors.secondary} />
      </View>
    );

  if (error) {
    console.error("Fehler beim Laden des Eintrags:", error);
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.background,
        }}
      >
        <Text style={{ color: colors.text }}>
          Fehler beim Laden des Eintrags
        </Text>
      </View>
    );
  }

  if (!mealEntry)
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.background,
        }}
      >
        <Text style={{ color: colors.text }}>
          Wir konnten den Eintrag nicht finden
        </Text>
      </View>
    );

  return (
    <MealEntryContext.Provider value={{ mealEntry }}>
      {children}
    </MealEntryContext.Provider>
  );
};
