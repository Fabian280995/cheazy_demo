import AiChantInputBox from "@/components/ai-chat/AiChantInputBox";
import { useTheme } from "@/providers/theme";
import { ChatMessage, ChatRole } from "@/types/ai-chat";
import { useRouter } from "expo-router";
import React from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const AiChat = () => {
  const [chatMessages, setChatMessages] = React.useState<ChatMessage[]>([]);
  const router = useRouter();
  const { colors } = useTheme();

  const handleMessageSend = (message: string) => {
    const newMessage: ChatMessage = {
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
        {chatMessages.length > 0 ? (
          <FlatList
            data={chatMessages}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) =>
              item.role === ChatRole.User ? (
                <View
                  style={{
                    flexDirection: "row",
                    marginVertical: 4,
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  <View
                    style={{
                      padding: 12,
                      backgroundColor: colors.foreground,
                      borderRadius: 16,
                      shadowColor: "#00000040",
                      shadowOffset: {
                        width: 0,
                        height: 2,
                      },
                      shadowOpacity: 0.25,
                      shadowRadius: 3.84,
                      elevation: 3,
                      marginLeft: 4,
                      marginRight: 4,
                      maxWidth: "80%",
                    }}
                  >
                    <Text style={{ color: colors.text }}>{item.content}</Text>
                  </View>
                  <View
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 32,
                      backgroundColor: colors.primary,
                      marginLeft: 8,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        color: colors.textForeground,
                        fontWeight: "bold",
                      }}
                    >
                      U
                    </Text>
                  </View>
                </View>
              ) : (
                <View>
                  <Text style={{ color: "#fff", marginVertical: 4 }}>
                    {item.role}: {item.content}
                  </Text>
                </View>
              )
            }
            contentContainerStyle={{ paddingBottom: 12 }}
            showsVerticalScrollIndicator={false}
            onEndReachedThreshold={0.5}
          />
        ) : (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text
              style={{
                color: "#fff",
                marginVertical: 4,
                fontSize: 16,
                fontWeight: "500",
              }}
            >
              Hey, wie kann ich dir helfen?
            </Text>
          </View>
        )}
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
