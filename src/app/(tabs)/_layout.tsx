// app/(tabs)/_layout.tsx
import { TabButton } from "@/components/navigation/TabButton";
import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { TabList, Tabs, TabSlot, TabTrigger } from "expo-router/ui";
import { Pressable, SafeAreaView, StyleSheet, View } from "react-native";

export default function TabLayout() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <Tabs>
        <TabSlot />

        {/* Custom TabBar */}
        <TabList asChild>
          <View style={styles.tabBar}>
            <>
              <TabTrigger name="index" href="/" asChild>
                <TabButton icon="home">Home</TabButton>
              </TabTrigger>
              <TabTrigger name="journal" href="/journal" asChild>
                <TabButton icon="book">Journal</TabButton>
              </TabTrigger>
              <TabTrigger name="overview" href="/overview" asChild>
                <TabButton icon="th-list">Übersicht</TabButton>
              </TabTrigger>
            </>

            {/* AI Chat Toggle Button (always visible) */}
            <Pressable
              onPress={() => router.push("/ai-chat")}
              style={({ pressed }) => [
                styles.aiButton,
                pressed && styles.buttonPressed,
              ]}
            >
              <FontAwesome name="slack" size={24} color={"#FFF"} />
            </Pressable>
          </View>
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
    height: 80, // feste Höhe
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "transparent",
  },
  aiOverlay: {
    position: "absolute",
    bottom: 80,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: "rgba(255,255,255,0.9)",
    flexDirection: "row",
    alignItems: "center",
  },
  aiTextInput: {
    flex: 1,
    height: 40,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  audioButton: {
    padding: 8,
  },
  aiButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(200,200,200,0.2)",
  },
  aiButtonActive: {
    backgroundColor: "#FF6F61",
  },
  buttonPressed: {
    opacity: 0.7,
  },
});
