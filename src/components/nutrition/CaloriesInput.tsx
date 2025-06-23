import Card from "@/components/shared/Card";
import CardHeader from "@/components/shared/CardHeader";
import { useTheme } from "@/providers/theme";
import { Ionicons, Octicons } from "@expo/vector-icons";
import React from "react";
import { Controller } from "react-hook-form";
import { Pressable, Text, TextInput } from "react-native";

export const CaloriesInput: React.FC<{ control: any }> = ({ control }) => {
  const { colors } = useTheme();
  const ref = React.useRef<TextInput>(null);
  return (
    <Pressable onPress={() => ref.current?.focus()}>
      <Card>
        <Controller
          control={control}
          name="calories"
          render={({ field }) => (
            <CardHeader
              title="Kalorien"
              Icon={() => (
                <Octicons name="flame" size={24} color={colors.text} />
              )}
            >
              <TextInput
                ref={ref}
                value={field.value.toString()}
                onChangeText={(txt) => {
                  const n = Number(txt);
                  field.onChange(isNaN(n) || n < 0 ? 0 : n);
                }}
                keyboardType="numeric"
                style={{
                  flex: 1,
                  color: colors.text,
                  paddingRight: 8,
                  minWidth: 100,
                  textAlign: "right",
                  fontSize: 16,
                  fontWeight: "800",
                  fontFamily: "Nunito",
                }}
              />
              <Text
                style={{
                  color: colors.textLight,
                  fontSize: 16,
                  fontWeight: "800",
                  fontFamily: "Nunito",
                }}
              >
                kcal
              </Text>
            </CardHeader>
          )}
        />
      </Card>
    </Pressable>
  );
};
