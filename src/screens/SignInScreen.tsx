import LoginForm from "@/components/auth/LoginForm";
import { useTheme } from "@/providers/theme";
import React from "react";
import { StyleSheet, View } from "react-native";

const SignInScreen = () => {
  const { colors } = useTheme();
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
        },
      ]}
    >
      <LoginForm />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});

export default SignInScreen;
