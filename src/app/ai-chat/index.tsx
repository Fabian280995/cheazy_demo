import React, { useEffect, useRef } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import Animated, { Easing, LinearTransition } from "react-native-reanimated";
import { useRouter } from "expo-router";
import { useTheme } from "@/providers/theme";

const AiChat = () => {
  const inputRef = useRef<TextInput>(null);
  const router = useRouter();
  const { colors } = useTheme();

  /* Autofokus nach Mount */
  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <SafeAreaView style={styles.flex}>
      {/* Halbtransparenter Overlay zum Schließen */}
      <Pressable style={styles.overlay} onPress={() => router.back()} />

      {/* ===== Keyboard-Container ===== */}
      <KeyboardAvoidingView
        behavior="padding" /* eine Mechanik für iOS & Android */
        keyboardVerticalOffset={12} /* Safe-Area + kleiner Abstand   */
        style={styles.kav}
      >
        {/* ===== Animated Chat-Box ===== */}
        <Animated.View
          layout={LinearTransition.duration(200).easing(
            Easing.inOut(Easing.quad)
          )}
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
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AiChat;

/* ---------- Styles ---------- */
const styles = StyleSheet.create({
  flex: { flex: 1 },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.32)",
  },
  kav: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 12,
  },
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
