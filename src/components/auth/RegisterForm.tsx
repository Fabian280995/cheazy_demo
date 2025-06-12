import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { z } from "zod";

import FormButton from "@/components/forms/FormButton";
import FormInput from "@/components/forms/FormInput";
import { useSignUp } from "@/hooks/auth/useSignUp";

// Schema now uses object-level superRefine for password match
const registerFormSchema = z
  .object({
    email: z.string().email({ message: "Bitte gültige E-Mail eingeben" }),
    password: z.string().min(6, { message: "Min. 6 Zeichen" }),
    confirmPassword: z.string().min(6, { message: "Min. 6 Zeichen" }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwörter stimmen nicht überein",
        path: ["confirmPassword"],
      });
    }
  });

type RegisterFormValues = z.infer<typeof registerFormSchema>;

const RegisterForm: React.FC = () => {
  const { mutateAsync: signUp } = useSignUp();

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid, isSubmitting },
    reset,
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      await signUp({ email: data.email, password: data.password });
      reset();
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <View style={styles.formContainer}>
      <FormInput<RegisterFormValues>
        name="email"
        label="E-Mail"
        iconName="mail"
        control={control}
        placeholder="E-Mail Adresse"
        disabled={isSubmitting}
        index={0}
      />

      <FormInput<RegisterFormValues>
        name="password"
        label="Passwort"
        iconName="lock"
        control={control}
        placeholder="Gib dein Passwort ein"
        secureTextEntry
        disabled={isSubmitting}
        index={1}
        canDisableSecureTextEntry
      />

      <FormInput<RegisterFormValues>
        name="confirmPassword"
        label="Passwort wiederholen"
        iconName="lock"
        control={control}
        placeholder="Bitte wiederhole dein Passwort"
        secureTextEntry
        disabled={isSubmitting}
        index={2}
        canDisableSecureTextEntry
      />

      <FormButton
        title="Registrieren"
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
  errorText: {
    fontSize: 14,
    textAlign: "center",
    marginTop: -12,
    marginBottom: 12,
  },
  submitButton: {
    marginTop: 12,
  },
});

export default RegisterForm;
