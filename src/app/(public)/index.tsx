import FormButton from "@/components/shared/forms/FormButton";
import ScreenWrapper from "@/components/screens/ScreenWrapper";
import { useTheme } from "@/providers/theme";
import { useRouter } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const Welcome = () => {
  const router = useRouter();
  const { colors } = useTheme();
  return (
    <ScreenWrapper
      style={{ flex: 1, paddingVertical: 24, paddingHorizontal: 12 }}
    >
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text
          style={{
            fontSize: 24,
            textAlign: "center",
            paddingTop: 36,
            fontWeight: "700",
          }}
        >
          Willkommen bei <Text style={{ color: colors.primary }}>chaezy</Text>
        </Text>
      </View>
      <View>
        <FormButton
          onPress={() => {
            router.push("/(public)/(auth)/signup");
          }}
          iconName="arrow-right"
          title="Los gehts!"
          iconEnd
          textStyle={{ fontSize: 16, fontWeight: "600" }}
        />
        <View
          style={{
            flexDirection: "row",
            marginTop: 12,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "400" }}>
            Ich habe bereits einen Account.
          </Text>
          <FormButton
            onPress={() => {
              router.push("/(public)/(auth)/signin");
            }}
            title="Anmelden"
            textStyle={{
              fontSize: 16,
              fontWeight: "400",
              color: colors.primary,
            }}
            style={{
              paddingVertical: 0,
              paddingHorizontal: 0,
              padding: 8,
              height: 32,
              margin: 0,
              marginLeft: 4,
            }}
            invertColors
            noBgColor
          />
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Welcome;
