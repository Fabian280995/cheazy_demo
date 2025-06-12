import RegisterForm from "@/components/auth/RegisterForm";
import { useTheme } from "@/providers/theme";
import React from "react";
import { StyleSheet, View } from "react-native";

const SignUpScreen = () => {
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
      <RegisterForm />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});

export default SignUpScreen;
