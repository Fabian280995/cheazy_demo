import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import SearchBar from "@/components/shared/Searchbar";
import FoodSearchResponseList from "./FoodSearchResponseList";
import { useSearchFoodIds } from "@/hooks/foods/useSearchFoodIds";
import { useTheme } from "@/providers/theme";

const FoodSearch = () => {
  const { colors } = useTheme();
  const [query, setQuery] = React.useState("");
  const {
    data: results,
    mutateAsync: search,
    isPending: isLoading,
    isError,
    error,
  } = useSearchFoodIds();

  const handleSearch = async (searchQuery: string) => {
    if (searchQuery.trim() === "") {
      setQuery("");
      return;
    }
    await search({ q: searchQuery });
  };

  if (isError) {
    console.error("Error searching for foods:", error);
  }

  return (
    <View style={{ padding: 12, flex: 1 }}>
      <SearchBar
        value={query}
        onChangeText={setQuery}
        onSearch={handleSearch}
        loading={isLoading}
        placeholder="Suche nach Lebensmitteln..."
      />
      <View style={{ marginTop: 16 }}>
        {isLoading ? (
          <ActivityIndicator
            size="large"
            color={colors.secondary}
            style={{ marginTop: 16 }}
          />
        ) : query.trim() === "" ? (
          <Text style={{ textAlign: "center", marginTop: 16 }}>
            Bitte gib einen Suchbegriff ein.
          </Text>
        ) : (
          <FoodSearchResponseList searchResponses={results ?? []} />
        )}
      </View>
    </View>
  );
};

export default FoodSearch;
