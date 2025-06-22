// src/components/food/FoodSearchResponseList.tsx
import React, { useCallback, useMemo } from "react";
import {
  FlatList,
  Text,
  View,
  Button,
  Touchable,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "@/providers/theme";
import { useFoodsInfiniteQuery } from "@/hooks/foods/useFoodsInfiniteQuery";
import { FoodModel, FoodSearchResponse } from "@/types";
import { FoodCard } from "./FoodCard";
import { ListItem } from "../shared/list/ListItem";

interface Props {
  searchResponses: FoodSearchResponse[];
  onSelectFood?: (foodId: string) => void;
}

const FoodSearchResponseList: React.FC<Props> = ({
  searchResponses,
  onSelectFood,
}) => {
  const { colors } = useTheme();

  // IDs aus der Suche ziehen
  const ids = useMemo(
    () => searchResponses.map((h) => h.id),
    [searchResponses]
  );

  // Infinite-Query Hook
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useFoodsInfiniteQuery(ids, 15);

  // 1️⃣ Immer ein Array zurückgeben
  const flatData = useMemo<FoodModel[]>(() => {
    return (data?.pages.flat() ?? []) as FoodModel[];
  }, [data]);

  // Render-Funktion für FlatList
  const renderItem = useCallback(
    ({ item, index }: { item: FoodModel; index: number }) => {
      const isFirst = index === 0;
      const isLast = index === flatData.length - 1;
      return (
        <TouchableOpacity
          onPress={() => {
            if (onSelectFood) {
              onSelectFood(item.id);
            }
          }}
        >
          <ListItem isFirst={isFirst} isLast={isLast}>
            <FoodCard food={item} key={item.id} />
          </ListItem>
        </TouchableOpacity>
      );
    },
    [flatData]
  );

  // Key-Extractor
  const keyExtractor = (item: FoodModel) => item.id;

  // Footer mit korrekt typisiertem onPress
  const ListFooter = () =>
    hasNextPage ? (
      <View style={{ padding: 16 }}>
        <Button
          title={isFetchingNextPage ? "Lade mehr…" : "Mehr laden"}
          onPress={() => fetchNextPage()} // 2️⃣ onPress-Wrap
          disabled={isFetchingNextPage}
        />
      </View>
    ) : null;

  // Ladezustand
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text style={{ textAlign: "center", color: colors.text }}>
          Lade Ergebnisse…
        </Text>
      </View>
    );
  }

  // Kein Ergebnis
  if (flatData.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text
          style={{
            textAlign: "center",
            marginTop: 16,
            color: colors.text,
          }}
        >
          Keine Ergebnisse gefunden.
        </Text>
      </View>
    );
  }

  // FlatList mit Paging
  return (
    <FlatList
      data={flatData}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      contentContainerStyle={{
        paddingHorizontal: 12,
        paddingTop: 16,
        paddingBottom: 96,
      }}
      keyboardDismissMode="on-drag"
      onEndReached={() => {
        if (hasNextPage && !isFetchingNextPage) {
          fetchNextPage(); // 2️⃣ onPress-Wrap erneut
        }
      }}
      onEndReachedThreshold={0.5}
      ListFooterComponent={ListFooter}
    />
  );
};

export default FoodSearchResponseList;
