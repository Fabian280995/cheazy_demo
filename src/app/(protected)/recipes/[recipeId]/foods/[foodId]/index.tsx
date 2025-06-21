import HeaderIconButton from "@/components/screens/HeaderIconButton";
import { useHeaderOptions } from "@/hooks/navigation/useHeaderOptions";
import { useFood } from "@/providers/food";
import { useRecipe } from "@/providers/recipe";
import { useTheme } from "@/providers/theme";
import FoodDetailScreen from "@/screens/FoodDetailScreen";
import { Stack, useRouter } from "expo-router";
import React from "react";

const FoodDetail = () => {
  const { recipe } = useRecipe();
  const { food } = useFood();
  const router = useRouter();
  const { colors } = useTheme();
  const headerOptions = useHeaderOptions({
    title: "",
    largeTitle: false,
  });

  const [quantity, setQuantity] = React.useState<number>(100);

  const handleAddToRecipe = async () => {
    router.back();
  };

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
      <FoodDetailScreen food={food} quantity={quantity} />
    </>
  );
};

export default FoodDetail;
