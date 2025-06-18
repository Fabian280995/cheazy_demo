import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  ScrollViewBase,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useGetFoodById } from "@/hooks/foods/useGetFoodById";
import { useTheme } from "@/providers/theme";
import { useHeaderOptions } from "@/hooks/navigation/useHeaderOptions";
import HeaderIconButton from "@/components/screens/HeaderIconButton";
import FoodDetailScreen from "@/screens/FoodDetailScreen";
import { FoodModel } from "@/types";

const FoodDetail = () => {
  const router = useRouter();
  const { colors } = useTheme();
  const headerOptions = useHeaderOptions({
    title: "",
    largeTitle: false,
  });
  const { id, mealEntryId } = useLocalSearchParams<{
    id: string;
    mealEntryId?: string;
  }>();
  const { data: food, isLoading } = useGetFoodById(id as string);

  return (
    <>
      <Stack.Screen
        options={{
          ...headerOptions,
          headerLeft: () => (
            <HeaderIconButton
              iconName="arrow-left"
              onPress={() => router.back()}
              color={colors.text}
              shadow
            />
          ),
        }}
      />
      {isLoading ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: colors.background,
          }}
        >
          <ActivityIndicator size="large" color={colors.secondary} />
        </View>
      ) : !food ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: colors.background,
          }}
        >
          <Text style={{ color: colors.text }}>
            Nahrungsmittel nicht gefunden.
          </Text>
        </View>
      ) : (
        <FoodDetailScreen
          food={food}
          onAddFood={(food: FoodModel) => {
            // Handle adding food to a meal or diary
            console.log("Add food:", food);
          }}
          addLabel="Zu Mahlzeit hinzufügen"
          initialEntryData={}
        />
      )}
    </>
  );
};

export default FoodDetail;
