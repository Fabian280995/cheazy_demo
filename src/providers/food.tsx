import EntryNotFoundScreen from "@/components/shared/EntryNotFoundScreen";
import LoadingIndicator from "@/components/shared/LoadingIndicator";
import { useGetFoodById } from "@/hooks/foods/useGetFoodById";
import { FoodModel } from "@/types";
import { createContext, useContext } from "react";

type FoodContextType = {
  food: FoodModel;
};

export const FoodContext = createContext<FoodContextType>(
  {} as FoodContextType
);

interface FoodProviderProps {
  id: string;
}

export const FoodProvider: React.FC<
  React.PropsWithChildren<FoodProviderProps>
> = ({ children, id }) => {
  const {
    data: food,
    isLoading,
    isError,
    error,
  } = useGetFoodById(id as string);

  if (isError) {
    console.error("Error fetching recipe:", error);
    return <EntryNotFoundScreen title="Rezept nicht gefunden." />;
  }

  if (isLoading || !food) {
    return <LoadingIndicator />;
  }

  return (
    <FoodContext.Provider value={{ food }}>{children}</FoodContext.Provider>
  );
};

export const useFood = () => {
  const context = useContext(FoodContext);
  if (!context) {
    throw new Error("useFood must be used within a FoodProvider");
  }
  return context;
};
