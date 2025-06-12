import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Animated, { Easing, LinearTransition } from "react-native-reanimated";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "@/providers/theme";
import Recorder, { RecordingState } from "./Recorder";

interface Props {
  onSend: (message: string) => void;
}

const AiChantInputBox = ({ onSend }: Props) => {
  const [recordingState, setRecordingState] = useState<RecordingState>("idle");

  const [inputValue, setInputValue] = React.useState("");
  const { colors } = useTheme();
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 100);
    return () => clearTimeout(t);
  }, []);

  const handleSendBtnPress = () => {
    if (inputValue.trim() === "") return;

    onSend(inputValue.trim());
    setInputValue("");
    inputRef.current?.blur();
  };

  const handleSendVoice = (uri: string) => {
    console.log("Sending voice message:", uri);
    // if (uri && durationMs > 0) {
    //   onSend(`Voice message sent: ${uri} (${durationMs} ms)`);
    //   setInputValue("");
    //   inputRef.current?.blur();
    // } else {
    //   console.warn("No valid voice message to send");
    //   setRecordingState("idle");
    //   inputRef.current?.focus();
    // }
  };

  return (
    <Animated.View
      layout={LinearTransition.duration(300).easing(Easing.out(Easing.quad))}
      style={[styles.card, { backgroundColor: colors.foreground }]}
    >
      <TextInput
        ref={inputRef}
        multiline
        placeholder="Type your message..."
        placeholderTextColor={colors.textLight}
        style={[styles.input, { color: colors.text }]}
        value={inputValue}
        onChangeText={setInputValue}
      />

      <View style={styles.row}>
        <Recorder
          onStart={() => setRecordingState("recording")}
          onFinish={(uri) => {
            setRecordingState("stopped");
            handleSendVoice(uri);
          }}
          onCancel={() => setRecordingState("idle")}
        />

        {recordingState !== "recording" && (
          <TouchableOpacity
            style={[
              styles.btn,
              {
                backgroundColor: colors.border,
                paddingTop: 3,
                paddingRight: 2,
              },
            ]}
            onPress={handleSendBtnPress}
          >
            <Feather name="send" size={20} color={colors.text} />
          </TouchableOpacity>
        )}
      </View>
    </Animated.View>
  );
};

export default AiChantInputBox;

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 12,
  },
  input: {
    minHeight: 40,
    maxHeight: 120,
    padding: 8,
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 4,
    marginTop: 8,
  },
  btn: {
    height: 36,
    width: 36,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
  },
});
