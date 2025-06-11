// app/(tabs)/_layout.tsx
import { TabButton } from "@/components/navigation/TabButton";
import { useTheme } from "@/providers/theme";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { TabList, Tabs, TabSlot, TabTrigger } from "expo-router/ui";
import { Pressable, SafeAreaView, StyleSheet } from "react-native";

export default function TabLayout() {
  const router = useRouter();
  const { colors } = useTheme();
  return (
    <SafeAreaView style={styles.container}>
      <Tabs>
        <TabSlot />

        {/* Custom TabBar */}
        <TabList style={styles.tabBar}>
          <TabTrigger name="index" href="/" asChild>
            <TabButton icon="home">Home</TabButton>
          </TabTrigger>
          <TabTrigger name="journal" href="/journal" asChild>
            <TabButton icon="book">Journal</TabButton>
          </TabTrigger>
          <TabTrigger name="overview" href="/overview" asChild>
            <TabButton icon="list">Übersicht</TabButton>
          </TabTrigger>
          <Pressable
            onPress={() => router.push("/ai-chat")}
            style={({ pressed }) => [
              styles.aiButton,
              pressed && styles.buttonPressed,
            ]}
          >
            <LinearGradient
              colors={[colors.primary, colors.accent]}
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                borderRadius: 30,
              }}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            />
            <Feather name="zap" size={24} color={"#FFF"} />
          </Pressable>
        </TabList>
      </Tabs>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  tabBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 12,
    paddingHorizontal: 20,
    backgroundColor: "transparent",
  },
  aiButton: {
    width: 48,
    height: 48,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "auto",
  },
  buttonPressed: {
    opacity: 0.7,
  },
});
