import { CalendarProvider } from "@/providers/calendar";
import { Stack } from "expo-router";

export default function ProtectedLayout() {
  return (
    <CalendarProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="foods" />
        <Stack.Screen name="settings" />
        <Stack.Screen
          name="ai-chat"
          options={{
            presentation: "containedTransparentModal",
            animation: "fade",
          }}
        />
      </Stack>
    </CalendarProvider>
  );
}
