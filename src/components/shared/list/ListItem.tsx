import { useTheme } from "@/providers/theme";
import { Feather } from "@expo/vector-icons";
import React, { PropsWithChildren, useCallback } from "react";
import {
  Alert,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  LinearTransition,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface BaseProps {
  isFirst?: boolean;
  isLast?: boolean;
  style?: ViewStyle;
}

export const ListItem = ({
  children,
  isFirst = false,
  isLast = false,
  style,
}: PropsWithChildren<BaseProps>) => {
  const { colors } = useTheme();
  return (
    <Animated.View
      layout={LinearTransition}
      style={[
        {
          paddingVertical: 12,
          paddingHorizontal: 12,
          backgroundColor: colors.foreground,
        },
        !isLast
          ? { borderBottomWidth: 1, borderBottomColor: colors.border }
          : {
              borderBottomWidth: 0,
              borderBottomLeftRadius: 16,
              borderBottomRightRadius: 16,
            },
        isFirst ? { borderTopLeftRadius: 16, borderTopRightRadius: 16 } : {},
        style,
      ]}
    >
      {children}
    </Animated.View>
  );
};

interface PressableListItemProps extends BaseProps {
  onPress: () => void;
}

export const PressableListItem: React.FC<
  PropsWithChildren<PressableListItemProps>
> = ({ children, onPress, isFirst, isLast, style }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <ListItem isFirst={isFirst} isLast={isLast} style={style}>
        {children}
      </ListItem>
    </TouchableOpacity>
  );
};

interface SwipeableListItemProps extends BaseProps {
  onPress?: () => void; // Replace 'any' with the actual type of 'entry'
  onDelete?: () => void; // Replace 'string' with the actual type of 'id'
}

const DELETE_WIDTH = 64;
const SWIPE_THRESHOLD = -DELETE_WIDTH * 0.6;

export const SwipeableListItem: React.FC<
  PropsWithChildren<SwipeableListItemProps>
> = ({ children, onPress, onDelete, isFirst, isLast, style }) => {
  const { colors } = useTheme();
  const translateX = useSharedValue(0);

  const reset = () => {
    translateX.value = withTiming(0);
  };

  const handleDelete = useCallback(() => {
    Alert.alert(
      "Eintrag entfernen?",
      "Möchtest du diesen Eintrag wirklich entfernen?",
      [
        { text: "Abbrechen", style: "cancel", onPress: () => reset() },
        {
          text: "Entfernen",
          style: "destructive",
          onPress: () => {
            if (onDelete) onDelete();
            reset();
          },
        },
      ]
    );
  }, [onDelete]);

  const pan = Gesture.Pan()
    .onUpdate((e) => {
      translateX.value = Math.min(0, e.translationX);
    })
    .onEnd(() => {
      if (translateX.value < SWIPE_THRESHOLD) {
        translateX.value = withTiming(-DELETE_WIDTH, {}, () => {
          runOnJS(handleDelete)();
        });
      } else {
        runOnJS(reset)();
      }
    });

  const tap = Gesture.Tap()
    .maxDuration(220)
    .onStart(() => {
      if (onPress) runOnJS(onPress)();
    });

  const gesture = Gesture.Exclusive(pan, tap);

  const rStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));
  return (
    <View>
      <View
        style={[
          styles.deleteBg,
          {
            backgroundColor: colors.destructive,
            borderTopRightRadius: isFirst ? 16 : 0,
            borderBottomRightRadius: isLast ? 16 : 0,
          },
        ]}
      >
        <Feather name="trash-2" size={24} color={colors.textForeground} />
      </View>

      <GestureDetector gesture={gesture}>
        <Animated.View style={rStyle}>
          <ListItem isFirst={isFirst} isLast={isLast} style={style}>
            {children}
          </ListItem>
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  deleteBg: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    width: DELETE_WIDTH,
  },
});
