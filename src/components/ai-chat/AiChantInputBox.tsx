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
import Recorder from "./Recorder";
import { useTranscription } from "@/hooks/transcription/useTranscription";

interface Props {
  onSend: (message: string) => void;
}

const AiChantInputBox = ({ onSend }: Props) => {
  const { colors } = useTheme();
  const { mutateAsync: transcribeAsync, isPending: isTranscribing } =
    useTranscription();

  const inputRef = useRef<TextInput>(null);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [inputValue, setInputValue] = React.useState<string>("");

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

  const handleSendVoice = async (uri: string) => {
    console.log("Sending voice message:", uri);
    try {
      const transcript = await transcribeAsync();
      console.log("Transcription result:", transcript);
      if (transcript) {
        setInputValue((transcript as string) ?? "");
      }
    } catch (error) {
      console.error("Error sending voice message:", error);
    } finally {
      setIsRecording(false);
      inputRef.current?.blur();
    }
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
          onStart={() => setIsRecording(true)}
          onFinish={(uri) => {
            handleSendVoice(uri);
          }}
          onCancel={() => setIsRecording(false)}
          loading={isTranscribing}
        />

        {!isRecording && (
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
