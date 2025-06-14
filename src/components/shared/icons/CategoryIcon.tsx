import { foodCategories, FoodCategoryId } from "@/constants/foodCategories"; // Pfad ggf. anpassen
import { useTheme } from "@/providers/theme";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { View } from "react-native";

interface CategoryIconProps {
  id: FoodCategoryId;
  size?: number;
  gradient?: boolean;
}

const CategoryIcon: React.FC<CategoryIconProps> = ({
  id,
  size = 36,
  gradient = false,
}) => {
  const { colors } = useTheme();
  const category = foodCategories.find((cat) => cat.id === id);

  if (!category) return null;

  const Icon = category.icon;

  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: 16,
        backgroundColor: category.backgroundColor,
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      {gradient && (
        <LinearGradient
          colors={[category.backgroundColor, category.foregroundColor]}
          style={{
            position: "absolute",
            width: size,
            height: size,
            borderRadius: 16,
          }}
        />
      )}
      <Icon
        size={(size / 4) * 3}
        color={gradient ? colors.textForeground : category.foregroundColor}
      />
    </View>
  );
};

export default CategoryIcon;
