import AiChantInputBox from "@/components/ai-chat/AiChantInputBox";
import ChatMessage from "@/components/ai-chat/ChatMessage";
import { useAiGenerateMealEntries } from "@/hooks/meals/useAiGenerateMealEntries";
import { useTheme } from "@/providers/theme";
import { ChatMessage as ChatMessageType, ChatRole } from "@/types/ai-chat";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const BOTTOM_PADDING = 32;

const AiChat = () => {
  const flatListRef = useRef<FlatList<ChatMessageType>>(null);
  const { mutateAsync: generateMealEntries, isPending: isGenerating } =
    useAiGenerateMealEntries();
  const [chatMessages, setChatMessages] = React.useState<ChatMessageType[]>([
    {
      id: "initial-message",
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

  const generateEntries = async () => {
    const messagesWithoutInitial = chatMessages.filter(
      (msg) => msg.id !== "initial-message"
    );

    const newPrompt = messagesWithoutInitial
      .map((msg) => {
        return `${msg.role === ChatRole.User ? "User" : "AI"}: ${msg.content}`;
      })
      .join("\n");

    console.log("Full prompt for AI:", newPrompt);

    // only get last 1000 tokens from newPrompt
    const maxTokens = 1000;
    const promptTokens = newPrompt.split(/\s+/);
    const truncatedPrompt =
      promptTokens.length > maxTokens
        ? promptTokens.slice(-maxTokens).join(" ")
        : newPrompt;

    console.log("Truncated prompt for AI:", truncatedPrompt);
    const aiResponse = await generateMealEntries({
      prompt: truncatedPrompt,
    });

    setChatMessages((prev) => [
      ...prev,
      {
        id: `${Date.now()}-${Math.random()}`,
        chatId: "chat-1",
        role: ChatRole.Assistant,
        createdAt: new Date().toISOString(),
        type: "assistant",
        content: aiResponse.answerText,
        attachments: aiResponse.entries,
        messageType: "text",
      },
    ]);
  };

  useEffect(() => {
    const lastMsg = chatMessages[chatMessages.length - 1];
    if (lastMsg?.role === ChatRole.User && !isGenerating) {
      generateEntries();
    }

    const timeout = setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);

    return () => clearTimeout(timeout);
  }, [chatMessages]);

  useEffect(() => {
    let timeout: number | null = null;
    if (isGenerating) {
      timeout = setTimeout(() => {
        setChatMessages((prev) => [
          ...prev,
          {
            id: `${Date.now()}-${Math.random()}`,
            chatId: "chat-1",
            role: ChatRole.Assistant,
            createdAt: new Date().toISOString(),
            type: "assistant",
            content: "Ich bin dabei, deine Anfrage zu bearbeiten...",
            attachments: [],
            messageType: "loading",
          },
        ]);
      }, 300);
    } else {
      setChatMessages((prev) =>
        prev.filter((msg: any) => msg.messageType !== "loading")
      );
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [isGenerating]);

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
            ref={flatListRef}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <ChatMessage chatmessage={item} />}
            contentContainerStyle={{
              paddingTop: 8,
            }}
            showsVerticalScrollIndicator={false}
            onEndReachedThreshold={0.5}
            ListFooterComponent={<View style={{ height: BOTTOM_PADDING }} />}
          />
        ) : null}
        <AiChantInputBox onSend={handleMessageSend} disabled={isGenerating} />
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
