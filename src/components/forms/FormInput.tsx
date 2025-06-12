import { useTheme } from "@/providers/theme";
import React, { ComponentProps, JSX } from "react";
import { Control, FieldValues, Path, useController } from "react-hook-form";
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";
import FormError from "./FormError";
import FormLabel from "./FormLabel";
import FormAnimationWrapper from "./FormAnimationWrapper";
import { Feather } from "@expo/vector-icons";
import {
  FORM_ITEM_BORDER_RADIUS,
  FORM_ITEM_HEIGHT,
  FORM_ITEM_TEXT_SIZE,
} from "@/constants/forms";

interface FormInputProps<T extends FieldValues> {
  index?: number;
  name: Path<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  multiline?: boolean;
  secureTextEntry?: boolean;
  disabled?: boolean;
  iconName?: ComponentProps<typeof Feather>["name"];
  style?: TextInputProps["style"];
  inputProps?: Omit<
    TextInputProps,
    | "onChangeText"
    | "onBlur"
    | "value"
    | "placeholder"
    | "secureTextEntry"
    | "multiline"
    | "editable"
    | "numberOfLines"
    | "style"
  >;
  tintColor?: string;
  canDisableSecureTextEntry?: boolean;
}

/**
 * Generic controlled FormInput component using React Hook Form's useController.
 * Automatically handles focus styling, validation errors, and theming.
 */
function FormInput<T extends FieldValues>({
  index = 0,
  name,
  control,
  label,
  placeholder,
  multiline = false,
  secureTextEntry = false,
  disabled = false,
  style,
  inputProps,
  tintColor,
  iconName,
  canDisableSecureTextEntry,
}: FormInputProps<T>): JSX.Element {
  const { colors } = useTheme();
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({ name, control });
  const [isFocused, setIsFocused] = React.useState(false);
  const [isSecured, setIsSecured] = React.useState(secureTextEntry);

  const borderColor = isFocused
    ? tintColor
      ? tintColor
      : colors.primary
    : colors.foreground;

  const backgroundColor = colors.foreground;

  return (
    <FormAnimationWrapper delay={index * 50}>
      <View>
        {label && <FormLabel label={label} />}
        <View
          style={[
            styles.inputWrapper,
            {
              backgroundColor,
              borderColor,
            },
          ]}
        >
          {iconName && (
            <Feather
              name={iconName}
              size={20}
              color={
                isFocused ? tintColor || colors.secondary : colors.textLight
              }
              style={styles.icon}
            />
          )}
          <TextInput
            ref={ref}
            value={value as any}
            placeholder={placeholder}
            placeholderTextColor={colors.textLight}
            onChangeText={onChange}
            onBlur={() => {
              setIsFocused(false);
              onBlur();
            }}
            onFocus={() => setIsFocused(true)}
            multiline={multiline}
            secureTextEntry={isSecured}
            editable={!disabled}
            selectTextOnFocus={!disabled}
            numberOfLines={multiline ? 4 : 1}
            style={[
              styles.input,
              {
                color: colors.text,
                paddingLeft: iconName ? 0 : 16,
                paddingRight: canDisableSecureTextEntry ? 0 : 16,
              },
              disabled && { opacity: 0.5 },
              style || {},
            ]}
            {...inputProps}
          />
          {canDisableSecureTextEntry && value?.trim().length > 0 && (
            <TouchableOpacity
              onPress={() => setIsSecured((prev) => !prev)}
              style={[styles.icon]}
            >
              <Feather
                name={isSecured ? "eye-off" : "eye"}
                size={20}
                color={colors.textLight}
              />
            </TouchableOpacity>
          )}
        </View>
        {error && <FormError message={error.message || ""} />}
      </View>
    </FormAnimationWrapper>
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    borderWidth: 1,
    borderRadius: FORM_ITEM_BORDER_RADIUS,
    height: FORM_ITEM_HEIGHT,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    flex: 1,
    height: "100%",
    paddingVertical: 16,
    fontSize: FORM_ITEM_TEXT_SIZE,
  },
  icon: {
    padding: 14,
    alignContent: "center",
    justifyContent: "center",
  },
});

export default FormInput;
