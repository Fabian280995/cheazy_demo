import { focusManager, onlineManager } from "@tanstack/react-query";
import * as Network from "expo-network";
import { useEffect } from "react";
import { AppStateStatus, Platform } from "react-native";

function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== "web") {
    focusManager.setFocused(status === "active");
  }
}

export const useOnlineManager = () => {
  useEffect(() => {
    onlineManager.setEventListener((setOnline) => {
      const eventSubscription = Network.addNetworkStateListener((state) => {
        setOnline(!!state.isConnected);
      });
      return eventSubscription.remove;
    });
  }, []);
};
