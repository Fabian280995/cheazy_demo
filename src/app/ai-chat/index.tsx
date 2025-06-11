import {
  View,
  Text,
  TouchableWithoutFeedback,
  Pressable,
  Animated,
  TextInput,
} from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const AiChat = () => {
  const router = useRouter();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "transparent",
      }}
    >
      <Pressable
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.2)",
        }}
        onPress={() => router.back()}
      />
      <View style={{ position: "relative", flex: 1 }}>
        <View
          style={{
            position: "absolute",
            bottom: 4,
            left: 12,
            right: 12,
            backgroundColor: "#fff",
            borderRadius: 16,
            height: 86,
            padding: 12,
          }}
        ></View>
      </View>
    </SafeAreaView>
  );
};

export default AiChat;
