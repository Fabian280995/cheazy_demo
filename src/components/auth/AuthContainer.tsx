import { useTheme } from "@/providers/theme";
import { usePathname, useRouter } from "expo-router";
import React, { ReactNode } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import HeaderIconButton from "@/components/screens/HeaderIconButton";
import ScreenWrapper from "../screens/ScreenWrapper";
import ThemedText from "../theme/ThemedText";
import ExternalAuthBtns from "./OAuthBtns";

const SwitchButton = ({
  isActive,
  onPress,
  label,
}: {
  isActive: boolean;
  onPress: () => void;
  label: string;
}) => {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        height: 48,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 100,
        backgroundColor: isActive ? colors.primary : colors.foreground,
      }}
      onPress={onPress}
    >
      <ThemedText bgColor={isActive ? colors.primary : colors.foreground}>
        {label}
      </ThemedText>
    </TouchableOpacity>
  );
};

const AuthContainer = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { colors } = useTheme();
  const pathname = usePathname();
  const isSignIn = pathname === "/signin";

  return (
    <ScreenWrapper
      style={{
        paddingHorizontal: 12,
        flex: 1,
      }}
    >
      <View>
        <HeaderIconButton
          onPress={() => router.dismissTo("/(public)")}
          iconName="chevron-left"
          color={colors.textForeground}
        />
      </View>
      <View style={{ flex: 1, paddingBottom: 64 }}>
        <View>
          <Text
            style={{
              fontSize: 24,
              textAlign: "center",
              color: colors.text,
              paddingTop: 36,
              fontWeight: "700",
            }}
          >
            {isSignIn ? "Schön, dass du wieder da bist!" : "Konto erstellen"}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: colors.foreground,
            borderRadius: 100,
            paddingVertical: 4,
            paddingHorizontal: 5,
            flexDirection: "row",
            marginTop: 24,
          }}
        >
          <SwitchButton
            isActive={isSignIn}
            onPress={() => {
              router.replace("/(public)/(auth)/signin");
            }}
            label="Anmelden"
          />
          <SwitchButton
            isActive={!isSignIn}
            onPress={() => {
              router.replace("/(public)/(auth)/signup");
            }}
            label="Registrieren"
          />
        </View>

        <View style={{ flex: 1 }}>{children}</View>

        <View style={styles.orContainer}>
          <Text style={[styles.orText, { color: colors.textForeground }]}>
            Oder
          </Text>
        </View>

        <ExternalAuthBtns />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  orContainer: {
    marginHorizontal: 12,
    alignItems: "center",
  },
  orText: {
    fontSize: 16,
  },
});

export default AuthContainer;
