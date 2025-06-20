import { View, Text, useWindowDimensions } from "react-native";
import React from "react";
import { useTheme } from "@/providers/theme";
import { Feather } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import DetailScreenHeader from "../screens/DetailScreenHeader";
import DetailScreenScroll from "../screens/DetailScreenScroll";

const RecipeDetails = () => {
  const { colors } = useTheme();
  const height = useWindowDimensions().height;
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        position: "relative",
      }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: colors.background,
        }}
      >
        {true && (
          <View
            style={{
              width: "100%",
              height: height / 3 + 32,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Feather name="camera" size={64} color={colors.textLight} />
          </View>
        )}
      </View>
      <DetailScreenScroll>
        <DetailScreenHeader title={"Recipe Name"} />
      </DetailScreenScroll>
    </View>
  );
};

export default RecipeDetails;
