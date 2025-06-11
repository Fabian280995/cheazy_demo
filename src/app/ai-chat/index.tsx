import AiChantInputBox from "@/components/ai-chat/AiChantInputBox";
import { useRouter } from "expo-router";
import React from "react";
import { KeyboardAvoidingView, Pressable, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AiChat = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.flex}>
      <Pressable style={styles.overlay} onPress={() => router.back()} />

      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={12}
        style={styles.kav}
      >
        <AiChantInputBox />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default AiChat;

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
});
