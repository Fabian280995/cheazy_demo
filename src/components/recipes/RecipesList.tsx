import { View, Text } from "react-native";
import React from "react";
import { Recipe } from "@/types";

interface Props {
  recipes: Recipe[];
}

const RecipesList = ({ recipes }: Props) => {
  if (recipes.length === 0) {
    return (
      <View style={{ padding: 16 }}>
        <Text style={{ fontSize: 16, color: "gray" }}>No recipes found.</Text>
      </View>
    );
  }
  return (
    <View style={{ padding: 16 }}>
      {recipes.map((recipe) => (
        <View
          key={recipe.id}
          style={{
            marginBottom: 16,
            padding: 16,
            backgroundColor: "#f9f9f9",
            borderRadius: 8,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.2,
            shadowRadius: 1.41,
            elevation: 2,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            {recipe.name}
          </Text>
          <Text style={{ color: "gray", marginTop: 4 }}>
            {recipe.description}
          </Text>
        </View>
      ))}
    </View>
  );
};

export default RecipesList;
