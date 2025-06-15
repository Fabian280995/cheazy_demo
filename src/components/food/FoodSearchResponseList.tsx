import { useFoodsInfiniteQuery } from "@/hooks/foods/useFoodsInfiniteQuery";
import { FoodModel, FoodSearchResponse } from "@/types";
import React from "react";
import { Button, Text, View } from "react-native";
import { FoodCard } from "./FoodCard";
import Card from "../shared/Card";
import { useTheme } from "@/providers/theme";

interface Props {
  searchResponses: FoodSearchResponse[];
}

const FoodSearchResponseList: React.FC<Props> = ({ searchResponses }) => {
  const { colors } = useTheme();
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useFoodsInfiniteQuery(searchResponses.map((h) => h.id) ?? [], 15);
  return (
    <View style={{ flex: 1 }}>
      {!data || (data.pages.length === 0 && !isLoading) ? (
        <Text style={{ textAlign: "center", marginTop: 16 }}>
          Keine Ergebnisse gefunden.
        </Text>
      ) : (
        <View style={{ backgroundColor: colors.foreground, borderRadius: 16 }}>
          {data.pages.map((page: any, index) => (
            <View key={index}>
              {page.map((food: FoodModel) => {
                const isLast =
                  index === data.pages.length - 1 &&
                  food === page[page.length - 1];
                return <FoodCard food={food} key={food.id} isLast={isLast} />;
              })}
            </View>
          ))}
        </View>
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
