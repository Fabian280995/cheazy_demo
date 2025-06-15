import { View, Text } from "react-native";
import React from "react";
import SearchBar from "@/components/shared/Searchbar";
import FoodSearchResponseList from "./FoodSearchResponseList";
import { useSearchFoodIds } from "@/hooks/foods/useSearchFoodIds";

const FoodSearch = () => {
  const [query, setQuery] = React.useState("");
  const {
    data: results,
    mutate: search,
    isPending: isLoading,
    isError,
    error,
  } = useSearchFoodIds();

  const handleSearch = (searchQuery: string) => {
    if (searchQuery.trim() === "") {
      setQuery("");
      return;
    }
    search({ q: searchQuery });
  };

  return (
    <View style={{ flex: 1, marginTop: 16 }}>
      <SearchBar
        value={query}
        onChangeText={setQuery}
        onSearch={handleSearch}
        loading={isLoading}
        placeholder="Suche nach Lebensmitteln..."
      />
      {isError && (
        <Text style={{ color: "red", textAlign: "center", marginTop: 16 }}>
          {error instanceof Error
            ? error.message
            : "Ein Fehler ist aufgetreten"}
        </Text>
      )}
      <FoodSearchResponseList searchResponses={results ?? []} />
    </View>
  );
};

export default FoodSearch;
