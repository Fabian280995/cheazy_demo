import { foodCategories } from "@/constants/foodCategories"; // Pfad ggf. anpassen
import { useTheme } from "@/providers/theme";
import { FoodCategoryId } from "@/types";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { View } from "react-native";

interface CategoryIconProps {
  id: FoodCategoryId | null;
  size?: number;
  gradient?: boolean;
  colorfull?: boolean;
}

const CategoryIcon: React.FC<CategoryIconProps> = ({
  id,
  size = 36,
  gradient = false,
  colorfull = false,
}) => {
  const { colors } = useTheme();
  const category = foodCategories.find((cat) => cat.id === id);

  if (!category)
    return (
      <View
        style={{
          width: size,
          height: size,
          borderRadius: 16,
          backgroundColor: colors.icon,
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        {gradient && (
          <LinearGradient
            colors={[colors.icon, colors.text]}
            style={{
              position: "absolute",
              width: size,
              height: size,
              borderRadius: 16,
            }}
          />
        )}
        <Feather
          size={(size / 5) * 3}
          color={gradient ? colors.textForeground : colors.text}
        />
      </View>
    );

  const Icon = category.icon;
  const bgColor = colorfull ? category.backgroundColor : colors.background;
  const color = colorfull ? category.foregroundColor : colors.text;

  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: 16,
        backgroundColor: bgColor,
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      {gradient && (
        <LinearGradient
          colors={[bgColor, color]}
          style={{
            position: "absolute",
            width: size,
            height: size,
            borderRadius: 16,
          }}
        />
      )}
      <Icon
        size={(size / 5) * 3}
        color={gradient ? colors.textForeground : color}
      />
    </View>
  );
};

export default CategoryIcon;
