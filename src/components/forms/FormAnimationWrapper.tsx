import React, { PropsWithChildren } from "react";
import Animated, {
  FadeInDown,
  FadeOutDown,
  LinearTransition,
} from "react-native-reanimated";

const FormAnimationWrapper = ({
  children,
  delay = 200,
  duration = 200,
}: PropsWithChildren<{ delay?: number; duration?: number }>) => {
  return (
    <Animated.View
      entering={FadeInDown.delay(delay).duration(duration)}
      exiting={FadeOutDown.duration(100)}
      layout={LinearTransition}
    >
      {children}
    </Animated.View>
  );
};

export default FormAnimationWrapper;
