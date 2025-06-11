import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useEffect, useRef } from "react";
import Animated, { Easing, LinearTransition } from "react-native-reanimated";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "@/providers/theme";

const AiChantInputBox = () => {
  const { colors } = useTheme();
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <Animated.View
      layout={LinearTransition.duration(300).easing(Easing.out(Easing.quad))}
      style={[styles.card, { backgroundColor: colors.foreground }]}
    >
      <TextInput
        ref={inputRef}
        multiline
        placeholder="Type your message..."
        placeholderTextColor={colors.textLight}
        style={[styles.input, { color: colors.text }]}
      />

      {/* Action Row */}
      <View style={styles.row}>
        <TouchableOpacity style={styles.btn}>
          <Feather name="mic" size={20} color={colors.text} />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.btn,
            {
              backgroundColor: colors.border,
              paddingTop: 3,
              paddingRight: 2,
            },
          ]}
        >
          <Feather name="send" size={20} color={colors.text} />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

export default AiChantInputBox;

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 12,
  },
  input: {
    minHeight: 40,
    maxHeight: 120,
    padding: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 4,
    marginTop: 8,
  },
  btn: {
    height: 36,
    width: 36,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
  },
});
