import { foodCategories } from "@/constants/foodCategories";
import { FC } from "react";

export type FoodCategoryId = (typeof foodCategories)[number]["id"];
export interface FoodCategory {
  id: string;
  name: string;
  description: string;
  backgroundColor: string;
  foregroundColor: string;
  icon: FC<{ size?: number; color?: string }>;
}
export type FoodItem = {
  id: string;
  name: string;
  description?: string;
  calories_per_100: number;
  protein_per_100: number;
  carbohydrates_per_100: number;
  fat_per_100: number;
  quantity: number;
  category: FoodCategoryId;
};
