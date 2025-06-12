import { Stack } from "expo-router";

export default function ProtectedLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="meals" />
      <Stack.Screen
        name="ai-chat"
        options={{
          presentation: "containedTransparentModal",
          animation: "fade",
        }}
      />
    </Stack>
  );
}
