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

export interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onSearch: (query: string) => void;

  loading?: boolean;
  disabled?: boolean;
  placeholder?: string;
  debounceDelay?: number;
  autoSearch?: boolean;
  style?: View["props"]["style"];
  inputStyle?: TextInput["props"]["style"];
  iconColor?: string;
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
  style,
  inputStyle,
  iconColor = "#888",
}) => {
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
    <View style={[styles.container, style]}>
      <TextInput
        style={[styles.input, inputStyle]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        editable={!disabled}
        returnKeyType="search"
        onSubmitEditing={triggerSearch}
      />

      {loading ? (
        <ActivityIndicator style={styles.spinner} />
      ) : (
        <TouchableOpacity onPress={triggerSearch} disabled={disabled}>
          <Ionicons name="search" size={20} color={iconColor} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: "#EFEFEF",
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  spinner: {
    marginLeft: 8,
  },
});

export default SearchBar;
