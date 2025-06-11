import { View, Text } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

const AiChat = () => {
  const router = useRouter();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
      }}
    >
      <Text>AiChat</Text>
    </View>
  );
};

export default AiChat;
