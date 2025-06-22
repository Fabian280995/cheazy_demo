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

export const ListItemBase = ({
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
          backgroundColor: `${colors.foreground}cc`,
          overflow: "hidden",
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

interface ListItemProps extends BaseProps {}

export const ListItem: React.FC<PropsWithChildren<ListItemProps>> = ({
  children,
  isFirst,
  isLast,
  style,
}) => {
  return (
    <ListItemBase isFirst={isFirst} isLast={isLast}>
      <View style={[styles.innerContainer, style]}>{children}</View>
    </ListItemBase>
  );
};

interface PressableListItemProps extends BaseProps {
  onPress: () => void;
}

export const PressableListItem: React.FC<
  PropsWithChildren<PressableListItemProps>
> = ({ children, onPress, isFirst, isLast, style }) => {
  return (
    <ListItemBase isFirst={isFirst} isLast={isLast}>
      <TouchableOpacity
        onPress={onPress}
        style={[styles.innerContainer, style]}
      >
        {children}
      </TouchableOpacity>
    </ListItemBase>
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
    <ListItemBase isFirst={isFirst} isLast={isLast}>
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
        <Animated.View
          style={[
            {
              backgroundColor: colors.foreground,
            },
            styles.innerContainer,
            style,
            rStyle,
          ]}
        >
          {children}
        </Animated.View>
      </GestureDetector>
    </ListItemBase>
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
  innerContainer: {
    flex: 1,
    padding: 12,
  },
});
