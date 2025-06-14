// CaloryRing.tsx  – Fix: initial value = progress
import React, { useEffect } from "react";
import Svg, { Circle } from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
} from "react-native-reanimated";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

type Props = {
  progress: number; // 0‒1
  size: number; // Außendurchmesser
  stroke: number; // Strichstärke
  trackColor: string; // z. B. colors.background + "33"
  progressColor: string; // z. B. colors.success
};

const CaloryRing: React.FC<Props> = ({
  progress,
  size,
  stroke,
  trackColor,
  progressColor,
}) => {
  const radius = (size - stroke) / 2;
  const circ = 2 * Math.PI * radius;

  const pct = useSharedValue(Math.min(progress, 1));
  useEffect(() => {
    pct.value = withTiming(Math.min(progress, 1), { duration: 800 });
  }, [progress]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: circ * (1 - pct.value),
  }));

  const rotate = `rotate(-90 ${size / 2} ${size / 2})`;

  return (
    <Svg width={size} height={size}>
      <Circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={trackColor}
        strokeWidth={stroke}
        strokeLinecap="butt"
        fill="none"
        transform={rotate}
      />
      {/* Progress */}
      <AnimatedCircle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={progressColor}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={`${circ} ${circ}`}
        animatedProps={animatedProps}
        fill="none"
        transform={rotate}
      />
    </Svg>
  );
};

export default CaloryRing;
