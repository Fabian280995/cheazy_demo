// app/(tabs)/_layout.tsx
import { Tabs, TabList, TabTrigger, TabSlot } from "expo-router/ui";
import {
  SafeAreaView,
  View,
  Pressable,
  TextInput,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";

export default function TabsLayout() {
  const [aiMode, setAiMode] = useState(false);
  const [aiInput, setAiInput] = useState("");

  return (
    <Tabs>
      {/* Rendert den gerade aktiven Screen */}
      <TabSlot />

      <TabTrigger name="home">
        <Pressable style={styles.tabButton}>
          <FontAwesome name="home" size={24} />
        </Pressable>
      </TabTrigger>
      <TabTrigger name="journal">
        <Pressable style={styles.tabButton}>
          <FontAwesome name="book" size={24} />
        </Pressable>
      </TabTrigger>
      <TabTrigger name="overview">
        <Pressable style={styles.tabButton}>
          <FontAwesome name="th-list" size={24} />
        </Pressable>
      </TabTrigger>

      <TabList>
        <TabTrigger name="home" href="/" />
        <TabTrigger name="journal" href="/journal" />
        <TabTrigger name="overview" href="/overview" />
      </TabList>
    </Tabs>
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
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "transparent",
  },
  tabButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  aiButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#FF6F61",
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
});
