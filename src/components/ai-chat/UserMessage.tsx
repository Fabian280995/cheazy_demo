import { useTheme } from "@/providers/theme";
import { TextMessage } from "@/types/ai-chat";
import { Text, View } from "react-native";
import { ChatAvatar } from "./ChatAvatar";

export const UserMessage = ({ message }: { message: TextMessage }) => {
  const { colors } = useTheme();
  return (
    <View
      style={{
        flexDirection: "row",
        marginVertical: 4,
        justifyContent: "flex-end",
      }}
    >
      <View
        style={{
          padding: 12,
          backgroundColor: colors.foreground,
          borderRadius: 16,
          shadowColor: "#00000040",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 3,
          marginHorizontal: 4,
          maxWidth: "80%",
        }}
      >
        <Text style={{ color: colors.text }}>{message.content}</Text>
      </View>
      <ChatAvatar label="U" bg={colors.primary} />
    </View>
  );
};
