import { View, Text } from "react-native";
import React from "react";
import SearchBar from "@/components/shared/Searchbar";

const FoodSearch = () => {
  const [query, setQuery] = React.useState("");

  const handleSearch = (searchQuery: string) => {
    // Handle the search logic here, e.g., fetch food items based on the query
    console.log("Searching for:", searchQuery);
  };

  return (
    <View style={{ flex: 1, marginTop: 16 }}>
      <SearchBar
        value={query}
        onChangeText={setQuery}
        onSearch={handleSearch}
      />
    </View>
  );
};

export default FoodSearch;
