import { useFoodsInfiniteQuery } from "@/hooks/foods/useFoodsInfiniteQuery";
import { FoodModel, FoodSearchResponse } from "@/types";
import React from "react";
import { Button, Text, View } from "react-native";

interface Props {
  searchResponses: FoodSearchResponse[];
}

const FoodSearchResponseList: React.FC<Props> = ({ searchResponses }) => {
  console.log("FoodSearchResponseList", searchResponses);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useFoodsInfiniteQuery(searchResponses.map((h) => h.id) ?? [], 15);
  return (
    <View style={{ flex: 1 }}>
      {!data || data.pages.length === 0 ? (
        <Text style={{ textAlign: "center", marginTop: 16 }}>
          Keine Ergebnisse gefunden.
        </Text>
      ) : (
        data.pages.map((page: any, index) => (
          <View key={index}>
            {page.map((food: FoodModel) => (
              <View key={food.id} style={{ padding: 10 }}>
                <Text>{food.name}</Text>
                <Text>{food.description}</Text>
              </View>
            ))}
          </View>
        ))
      )}
      {hasNextPage && (
        <Button
          title="Mehr laden"
          onPress={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        />
      )}
    </View>
  );
};

export default FoodSearchResponseList;
