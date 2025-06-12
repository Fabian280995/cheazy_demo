import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { z } from "zod";

import FormButton from "@/components/forms/FormButton";
import FormInput from "@/components/forms/FormInput";
import { useSignInWithPassword } from "@/hooks/auth/useSignInWithPassword";

const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

const LoginForm = () => {
  const { mutateAsync: signInWithPassword } = useSignInWithPassword();

  const {
    control,
    handleSubmit,
    formState: { isDirty, isValid, isSubmitting },
    reset,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await signInWithPassword({ email: data.email, password: data.password });
      reset();
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <View style={styles.formContainer}>
      <FormInput<LoginFormValues>
        name="email"
        control={control}
        label="Email"
        iconName="mail"
        placeholder="maxmustermann@steuer.de"
        disabled={isSubmitting}
      />
      <FormInput<LoginFormValues>
        name="password"
        control={control}
        label="Passwort"
        iconName="lock"
        placeholder="Bitte gib dein Passwort ein"
        secureTextEntry
        disabled={isSubmitting}
        index={1}
        canDisableSecureTextEntry
      />

      <FormButton
        title="Anmelden"
        isLoading={isSubmitting}
        onPress={handleSubmit(onSubmit)}
        disabled={!isDirty || !isValid}
        style={styles.submitButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    gap: 14,
  },
  submitButton: {
    marginTop: 12,
  },
});

export default LoginForm;
