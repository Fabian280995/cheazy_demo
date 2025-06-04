import { focusManager } from "@tanstack/react-query";
import { useEffect } from "react";
import { AppState, Platform } from "react-native";

export function useAppState(onChange: any) {
  function onAppStateChange(status: any) {
    if (Platform.OS !== "web") {
      focusManager.setFocused(status === "active");
    }
  }
  useEffect(() => {
    const subscription = AppState.addEventListener("change", (status) => {
      if (status !== "active") {
        return;
      }
      onAppStateChange(status);
      subscription.remove();
    });
  }, [onChange]);
}
