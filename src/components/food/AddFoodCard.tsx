import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Card from "@/components/shared/Card";
import CardHeader from "@/components/shared/CardHeader";
import CardIcon from "@/components/shared/CardIcon";
import { useTheme } from "@/providers/theme";
import { Feather } from "@expo/vector-icons";

interface Props {
  name: string;
  onAddFood: (food: any) => void;
  food: any;
  addLabel?: string;
  datetime?: Date;
  mealSlot?: { id: string; label: string };
  quantity?: number;
}

const AddFoodCard = ({
  name,
  onAddFood,
  food,
  addLabel,
  datetime = new Date(),
  mealSlot = { id: "Breakfast", label: "Frühstück" },
  quantity = 100,
}: Props) => {
  const { colors, categoryColors } = useTheme();
  return (
    <Card style={{ gap: 12 }}>
      <CardHeader title={addLabel || "Nahrungsmittel hinzufügen"} />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-evenly",
          gap: 8,
        }}
      >
        <View
          style={{
            flex: 1,
            borderRadius: 16,
            borderWidth: 1,
            borderColor: colors.border,
            alignItems: "center",
            justifyContent: "center",
            height: 64,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              fontFamily: "Nunito",
            }}
          >
            {datetime.toLocaleDateString("de-DE", {
              weekday: "long",
            })}
          </Text>
          <Text style={{ fontSize: 12, color: colors.textLight }}>
            {datetime.toLocaleDateString("de-DE", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            borderRadius: 16,
            borderWidth: 1,
            borderColor: colors.border,
            alignItems: "center",
            justifyContent: "center",
            height: 64,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              fontFamily: "Nunito",
            }}
          >
            {mealSlot ? mealSlot.label : "Frühstück"}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            borderRadius: 16,
            borderWidth: 1,
            borderColor: colors.border,
            alignItems: "center",
            justifyContent: "center",
            height: 64,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              fontFamily: "Nunito",
            }}
          >
            {quantity} g
          </Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => onAddFood(food)}
        style={{
          padding: 8,
          paddingHorizontal: 12,
          borderRadius: 16,
          flexDirection: "row",
          alignItems: "center",
          alignSelf: "flex-end",
          backgroundColor: colors.secondary,
        }}
      >
        <Feather name="plus" size={14} color={colors.textForeground} />
        <Text
          style={{
            fontFamily: "Nunito",
            fontSize: 12,
            fontWeight: "700",
            color: colors.textForeground,
            marginLeft: 4,
          }}
        >
          Hinzufügen
        </Text>
      </TouchableOpacity>
    </Card>
  );
};

export default AddFoodCard;
