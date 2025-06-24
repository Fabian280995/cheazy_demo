import { useAppState } from "@/hooks/useAppState";
import { useOnlineManager } from "@/hooks/useOnlineManager";
import { AuthProvider } from "@/providers/auth";
import { ThemeProvider } from "@/providers/theme";
import { pickFontAssets } from "@/utils/fonts";
import * as Inter from "@expo-google-fonts/inter";
import * as Nunito from "@expo-google-fonts/nunito";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import {
  focusManager,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { AppStateStatus, Platform } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

import ToasterProvider from "@/providers/toaster";
import * as Sentry from "@sentry/react-native";
Sentry.init({
  dsn: "https://8f9cd55f352a0d28ea448fa79e2621b0@o4509553020764160.ingest.de.sentry.io/4509553022861392",
  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,
  // Set tracesSampleRate to 1.0 to capture 100% of transactions for tracing.
  // We recommend adjusting this value in production.
  // Learn more at
  // https://docs.sentry.io/platforms/react-native/configuration/options/#traces-sample-rate
  tracesSampleRate: 1.0,
  // profilesSampleRate is relative to tracesSampleRate.
  // Here, we'll capture profiles for 100% of transactions.
  profilesSampleRate: 1.0,
});

SplashScreen.preventAutoHideAsync();

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

const fonts = {
  ...pickFontAssets(Inter, "Inter_"),
  ...pickFontAssets(Nunito, "Nunito_"),
};

function RootLayout() {
  const [loaded, error] = useFonts(fonts);

  useEffect(() => {
    if (error) throw error;
    if (loaded) SplashScreen.hideAsync();
  }, [error]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== "web") {
    focusManager.setFocused(status === "active");
  }
}

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 2 } },
});

function RootLayoutNav() {
  useOnlineManager();
  useAppState(onAppStateChange);

  return (
    <ThemeProvider>
      <GestureHandlerRootView>
        <BottomSheetModalProvider>
          <SafeAreaProvider>
            <ToasterProvider>
              <QueryClientProvider client={queryClient}>
                <AuthProvider>
                  <Stack screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="(public)" />
                    <Stack.Screen name="(protected)" />
                  </Stack>
                </AuthProvider>
              </QueryClientProvider>
            </ToasterProvider>
          </SafeAreaProvider>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}

export default Sentry.wrap(RootLayout);
