import { FoodCategoryId } from "@/constants/foodCategories";

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  success: string;
  warning: string;
  info: string;
  text: string;
  textForeground: string;
  textLight: string;
  background: string;
  foreground: string;
  icon: string;
  tabIconDefault: string;
  tabIconSelected: string;
  destructive: string;
  shadow: string;
  border: string;

  protein: string;
  carbs: string;
  fat: string;
}

export interface AppTheme {
  dark: boolean;
  colors: ThemeColors;
  categoryColors: CategoryColorsType;
}

export interface CategoryColorDefinition {
  background: string;
  foreground: string;
}

export type CategoryColorsType = Record<
  FoodCategoryId,
  CategoryColorDefinition
>;
