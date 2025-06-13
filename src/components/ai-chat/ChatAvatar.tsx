import { useTheme } from "@/providers/theme";
import { Text, View } from "react-native";

export const ChatAvatar = ({ label, bg }: { label: string; bg: string }) => {
  const { colors } = useTheme();
  return (
    <View
      style={{
        width: 36,
        height: 36,
        borderRadius: 32,
        backgroundColor: bg,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: colors.textForeground, fontWeight: "bold" }}>
        {label}
      </Text>
    </View>
  );
};
