import AuthContainer from "@/components/auth/AuthContainer";
import HeaderIconButton from "@/components/shared/screens/HeaderIconButton";
import { Stack, useRouter } from "expo-router";

export default function AuthLayout() {
  const router = useRouter();
  return (
    <AuthContainer>
      <Stack
        screenOptions={{
          headerShown: false,
          headerTitle: "",
          animation: "none",
        }}
      >
        <Stack.Screen name="signup" />
        <Stack.Screen name="signin" />
      </Stack>
    </AuthContainer>
  );
}
