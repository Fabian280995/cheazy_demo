// components/ProgressBar.tsx
import React, { useEffect } from "react";
import { Text, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

type ProgressBarProps = {
  /** Aktueller Messwert (z. B. konsumierte Kalorien) */
  current: number;
  /** Linker Rand der Skala – default 0 */
  min?: number;
  /** Rechter Rand der Skala */
  max: number;
  /** Ziel-Korridor */
  targetMin: number;
  targetMax: number;
  /** Farbschema */
  colors: {
    barBackground: string;
    targetRange: string;
    inRange: string;
    normal: string;
    over: string;
  };
  /** Skalenbeschriftung anzeigen? (default = false) */
  showScaleLabels?: boolean;
  /** Textfarbe der Beschriftung (optional) */
  labelColor?: string;
  /** Transparenz des Overlays im „over“-Fall (0–1) */
  overlayOpacity?: number;
  height?: number; // Optional height prop for custom height
};

const ProgressBar: React.FC<ProgressBarProps> = ({
  current,
  min = 0,
  max,
  targetMin,
  targetMax,
  colors,
  showScaleLabels = false,
  labelColor,
  overlayOpacity = 0.35,
  height = 16,
}) => {
  const pct = (value: number) => interpolate(value, [min, max], [0, 100]);
  const currentPct = pct(current);
  const targetLeftPct = pct(targetMin);
  const targetRightPct = pct(targetMax);

  const isInRange = current >= targetMin && current <= targetMax;
  const isOver = current > targetMax;

  const textColor = labelColor ?? colors.normal;

  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withDelay(300, withTiming(currentPct, { duration: 800 }));
  }, [currentPct, progress]);

  const progressStyle = useAnimatedStyle(() => ({
    width: `${progress.value}%`,
  }));

  return (
    <View style={{ flex: 1 }}>
      {/* Balken */}
      <View
        style={{
          height: height,
          borderRadius: 16,
          backgroundColor: colors.barBackground,
          overflow: "hidden",
        }}
      >
        {/* Fortschritt */}
        <Animated.View
          style={[
            {
              height: "100%",
              backgroundColor: isOver
                ? colors.over
                : isInRange
                ? colors.inRange
                : colors.normal,
              zIndex: 1,
            },
            progressStyle,
          ]}
        />

        {/* Ziel-Korridor */}
        <View
          style={{
            position: "absolute",
            left: `${targetLeftPct}%`,
            width: `${targetRightPct - targetLeftPct}%`,
            height: "100%",
            borderRadius: 6,
            backgroundColor: colors.targetRange,
            opacity: isOver ? overlayOpacity : 1,
            zIndex: isOver ? 2 : 0,
            minWidth: 2,
          }}
        />
      </View>

      {/* optionale Skalenbeschriftung */}
      {showScaleLabels && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 4,
          }}
        >
          <Text
            style={{
              fontFamily: "Inter",
              fontSize: 14,
              fontWeight: "700",
              color: textColor,
            }}
          >
            {min}
          </Text>
          <Text
            style={{
              fontFamily: "Inter",
              fontSize: 14,
              fontWeight: "700",
              color: textColor,
            }}
          >
            {max}
          </Text>
        </View>
      )}
    </View>
  );
};

export default ProgressBar;
