// components/ProgressBar.tsx
import React from "react";
import { Text, View } from "react-native";

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
  const targetLeftPct = ((targetMin - min) / (max - min)) * 100;
  const targetRightPct = ((targetMax - min) / (max - min)) * 100;
  const currentPct = ((current - min) / (max - min)) * 100;

  const isInRange = current >= targetMin && current <= targetMax;
  const isOver = current > targetMax;

  const textColor = labelColor ?? colors.normal;

  return (
    <View>
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
        <View
          style={{
            height: "100%",
            width: `${currentPct}%`,
            backgroundColor: isOver
              ? colors.over
              : isInRange
              ? colors.inRange
              : colors.normal,
            zIndex: 1,
          }}
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
