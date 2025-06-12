import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Text,
  ActivityIndicator,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { Feather } from "@expo/vector-icons";
import { useAudioRecorder, AudioModule, RecordingPresets } from "expo-audio";
import { useTheme } from "@/providers/theme";

export type RecordingState = "idle" | "recording" | "stopped";

interface Props {
  onStart?: () => void;
  onFinish: (uri: string) => void;
  onCancel?: () => void;
  loading?: boolean;
  disabled?: boolean;
}

export default function Recorder({
  onStart,
  onFinish,
  onCancel,
  loading = false,
  disabled = false,
}: Props) {
  const { colors } = useTheme();
  const recorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY); // :contentReference[oaicite:1]{index=1}
  const [state, setState] = useState<RecordingState>("idle");

  // Puls-Animation via Reanimated
  const pulse = useSharedValue(0);
  const pulseStyle = useAnimatedStyle(() => ({
    opacity: pulse.value,
    transform: [{ scale: 0.8 + 0.2 * pulse.value }],
  }));
  useEffect(() => {
    if (state === "recording") {
      pulse.value = withRepeat(
        withTiming(1, { duration: 500, easing: Easing.inOut(Easing.ease) }),
        -1,
        true
      );
    } else {
      pulse.value = 0;
    }
  }, [state]);

  const startRecording = async () => {
    try {
      // Audio-Modus konfigurieren
      await AudioModule.setAudioModeAsync({
        allowsRecording: true,
        playsInSilentMode: true,
        shouldPlayInBackground: false,
      }); // :contentReference[oaicite:2]{index=2}
      const { granted } = await AudioModule.requestRecordingPermissionsAsync();
      if (!granted) return Alert.alert("Mikrofonzugriff verweigert"); // :contentReference[oaicite:3]{index=3}

      await recorder.prepareToRecordAsync(); // :contentReference[oaicite:4]{index=4}
      recorder.record(); // :contentReference[oaicite:5]{index=5}
      setState("recording");
      onStart?.();
    } catch (error) {
      console.error("Recording failed:", error);
      Alert.alert("Aufnahme fehlgeschlagen", "Bitte versuche es erneut.");
    }
  };

  const stopRecording = async (keep: boolean) => {
    await recorder.stop(); // :contentReference[oaicite:6]{index=6}
    const { uri } = recorder;
    setState("stopped");
    if (keep && uri) {
      onFinish(uri);
    } else {
      onCancel?.();
    }
  };

  return (
    <View
      style={[styles.container, state === "recording" && { width: "100%" }]}
    >
      {(state === "idle" || state === "stopped") && (
        <TouchableOpacity
          style={[styles.micButton]}
          onPress={startRecording}
          accessibilityLabel="Start Recording"
          disabled={loading || disabled}
        >
          {loading ? (
            <ActivityIndicator size="small" color={colors.textLight} />
          ) : (
            <Feather name="mic" size={20} color={colors.text} />
          )}
        </TouchableOpacity>
      )}

      {state === "recording" && (
        <>
          <TouchableOpacity
            style={[styles.control, { backgroundColor: colors.border }]}
            onPress={() => stopRecording(false)}
            accessibilityLabel="Cancel Recording"
          >
            <Feather name="x" size={18} color={colors.text} />
          </TouchableOpacity>

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Animated.View
              style={[
                styles.pulseDot,
                pulseStyle,
                { backgroundColor: colors.destructive },
              ]}
            />
            <Text
              style={{
                color: colors.textLight,
                marginLeft: 8,
              }}
            >
              Ich höre zu...
            </Text>
          </View>

          <TouchableOpacity
            style={[styles.control, { backgroundColor: colors.text }]}
            onPress={() => stopRecording(true)}
            accessibilityLabel="Finish Recording"
          >
            <Feather name="check" size={18} color={colors.textForeground} />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  micButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  control: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  pulseDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
});
