import { useTheme } from "@/providers/theme";
import { Recipe } from "@/types";
import React from "react";
import { TextInput, View } from "react-native";
import { QuantitySelect } from "../meal-slots/QuantitySelect";
import CardHeader from "../shared/CardHeader";

interface Props {
  recipe: Recipe;
  servings: number;
  onServingsChange: (newServings: number) => void;
}

const RecipeDetails = ({ recipe, servings, onServingsChange }: Props) => {
  const { colors } = useTheme();
  const [title, setTitle] = React.useState<string>(recipe.name);
  const [description, setDescription] = React.useState<string>(
    recipe.description ?? ""
  );

  React.useEffect(() => {
    setTitle(recipe.name);
    setDescription(recipe.description ?? "");
  }, [recipe]);

  return (
    <>
      <View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TextInput
            style={{
              fontWeight: "800",
              fontSize: 24,
              fontFamily: "Nunito",
              maxWidth: "80%",
            }}
            value={title}
            onChangeText={setTitle}
            placeholder="Rezeptname"
          />
        </View>

        <View style={{ gap: 4 }}>
          <TextInput
            multiline
            value={description}
            onChangeText={setDescription}
            placeholder="Keine Beschreibung verfügbar. Füge eine hinzu."
            style={{
              fontFamily: "Nunito",
              fontSize: 16,
              fontWeight: "500",
              color: colors.textLight,
            }}
          />
        </View>
      </View>

      <View>
        <CardHeader title="Portionen" size={20} />
        <QuantitySelect
          quantity={servings}
          onChangeQuantity={onServingsChange}
          step={1}
        />
      </View>
    </>
  );
};

export default RecipeDetails;
