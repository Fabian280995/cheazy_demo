import React from "react";
import { StyleSheet } from "react-native";
import Animated, { LinearTransition } from "react-native-reanimated";

const MealSlotEntryContainer = (
  props: React.PropsWithChildren<{
    // Define any additional props if needed
  }>
) => {
  return (
    <Animated.View layout={LinearTransition} style={styles.wrapper}>
      {props.children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    overflow: "hidden",
  },
});

export default MealSlotEntryContainer;
