import { useTheme } from "@/providers/theme";
import Animated, { FadeIn } from "react-native-reanimated";

const BAR_HEIGHT = 112;

export const VerticalNutriBar = ({
  progress,
  isCurrentDay,
}: {
  progress: number;
  isCurrentDay: boolean;
}) => {
  const { colors } = useTheme();

  return (
    <Animated.View
      entering={FadeIn.delay(300)}
      exiting={FadeIn.delay(200)}
      style={{
        width: 12,
        height: BAR_HEIGHT,
        backgroundColor: colors.foreground + "aa",
        borderRadius: 8,
        overflow: "hidden",
        marginBottom: 8,
      }}
    >
      <Animated.View
        style={{
          position: "absolute",
          height: progress * BAR_HEIGHT,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: 8,
          backgroundColor: isCurrentDay
            ? colors.success
            : colors.textLight + "88",
        }}
      />
    </Animated.View>
  );
};
