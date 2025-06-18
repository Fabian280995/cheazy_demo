import { useTheme } from "@/providers/theme";
import { Feather } from "@expo/vector-icons";
import React, { useRef } from "react";
import { Pressable, TextInput, TouchableOpacity, View } from "react-native";

interface QuantitySelectProps {
  /** Aktuelle Menge in Gramm */
  quantity: number;
  /** Callback, wenn sich die Menge ändert */
  onChangeQuantity: (qty: number) => void;
}

export const QuantitySelect: React.FC<QuantitySelectProps> = ({
  quantity,
  onChangeQuantity,
}) => {
  const { colors } = useTheme();
  const inputRef = useRef<TextInput>(null);

  return (
    <View
      style={{
        flex: 1,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: colors.border,
        flexDirection: "row",
        alignItems: "center",
        height: 64,
        overflow: "hidden",
        backgroundColor: colors.foreground,
      }}
    >
      <TouchableOpacity
        onPress={() => onChangeQuantity(Math.max(quantity - 10, 0))}
        style={{
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          paddingLeft: 8,
          paddingRight: 4,
        }}
      >
        <Feather name="minus" size={16} color={colors.textLight} />
      </TouchableOpacity>
      <Pressable
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        onPress={() => inputRef.current?.focus()}
      >
        <TextInput
          ref={inputRef}
          style={{
            fontSize: 16,
            fontWeight: "bold",
            fontFamily: "Nunito",
            height: "100%",
            width: "100%",
            textAlign: "center",
            textAlignVertical: "center",
          }}
          keyboardType="numeric"
          value={quantity.toString()}
          onChangeText={(text) => {
            const num = parseInt(text, 10);
            onChangeQuantity(!isNaN(num) && num > 0 ? num : 0);
          }}
          maxLength={5}
          returnKeyType="done"
        />
      </Pressable>
      <TouchableOpacity
        onPress={() => onChangeQuantity(Math.min(quantity + 10, 99999))}
        style={{
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          paddingLeft: 4,
          paddingRight: 8,
        }}
      >
        <Feather name="plus" size={16} color={colors.textLight} />
      </TouchableOpacity>
    </View>
  );
};
