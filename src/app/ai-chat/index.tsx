import AiChantInputBox from "@/components/ai-chat/AiChantInputBox";
import ChatMessage from "@/components/ai-chat/ChatMessage";
import { useTheme } from "@/providers/theme";
import { ChatMessage as ChatMessageType, ChatRole } from "@/types/ai-chat";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AiChat = () => {
  const [chatMessages, setChatMessages] = React.useState<ChatMessageType[]>([
    {
      id: "0000-0000-0000-0000",
      chatId: "chat-1",
      role: ChatRole.Assistant,
      createdAt: new Date().toISOString(),
      type: "text",
      content: "Hallo! Wie kann ich dir helfen?",
    },
  ]);
  const router = useRouter();
  const { colors } = useTheme();

  const handleMessageSend = (message: string) => {
    const newMessage: ChatMessageType = {
      id: `${Date.now()}-${Math.random()}`,
      chatId: "chat-1",
      role: ChatRole.User,
      createdAt: new Date().toISOString(),
      type: "text",
      content: message,
    };
    setChatMessages((prev) => [...prev, newMessage]);
  };

  return (
    <SafeAreaView style={styles.flex}>
      <Pressable style={styles.overlay} onPress={() => router.back()} />

      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={12}
        style={styles.kav}
      >
        <View>
          <TouchableOpacity
            style={{
              width: 36,
              height: 36,
              zIndex: 10,
              borderRadius: 32,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: colors.foreground,
              shadowColor: "#00000040",
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 3,
            }}
            onPress={() => router.back()}
          >
            <Feather name="x" size={20} color={colors.text} />
          </TouchableOpacity>
        </View>
        {chatMessages.length > 0 ? (
          <FlatList
            data={chatMessages}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <ChatMessage chatmessage={item} />}
            contentContainerStyle={{ paddingBottom: 12 }}
            showsVerticalScrollIndicator={false}
            onEndReachedThreshold={0.5}
          />
        ) : null}
        <AiChantInputBox onSend={handleMessageSend} />
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
