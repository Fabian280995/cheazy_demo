// SearchBar.tsx
import React, { useEffect, useRef } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Card from "./Card";
import CardIcon from "./CardIcon";
import { useTheme } from "@/providers/theme";

export interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onSearch: (query: string) => void;

  loading?: boolean;
  disabled?: boolean;
  placeholder?: string;
  debounceDelay?: number;
  autoSearch?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  onSearch,
  loading = false,
  disabled = false,
  placeholder = "Suche …",
  debounceDelay = 500,
  autoSearch = true,
}) => {
  const { colors } = useTheme();
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!autoSearch || disabled) {
      return;
    }

    if (timer.current) clearTimeout(timer.current);

    timer.current = setTimeout(() => onSearch(value), debounceDelay);

    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [value, debounceDelay, onSearch, autoSearch, disabled]);

  const triggerSearch = () => {
    if (disabled) return;
    if (timer.current) clearTimeout(timer.current);
    onSearch(value);
  };

  return (
    <View
      style={{
        backgroundColor: colors.foreground,
        padding: 4,
        borderRadius: 16,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TextInput
          style={{
            fontFamily: "Inter",
            fontSize: 16,
            flex: 1,
            padding: 8,
            color: colors.text,
            paddingLeft: 12,
          }}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          editable={!disabled}
          returnKeyType="search"
          onSubmitEditing={triggerSearch}
          cursorColor={colors.secondary}
          placeholderTextColor={colors.textLight}
        />
        <View
          style={{
            marginLeft: 8,
            width: 40,
            height: 40,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {loading ? (
            <ActivityIndicator size={"small"} color={colors.secondary} />
          ) : (
            <TouchableOpacity onPress={triggerSearch} disabled={disabled}>
              <CardIcon
                name="search"
                size={40}
                color={colors.secondary}
                bgColor={colors.primary}
                gradient
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default SearchBar;
