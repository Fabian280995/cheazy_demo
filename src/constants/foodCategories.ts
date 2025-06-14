import Apple from "@/components/shared/icons/Apple";
import Avocado from "@/components/shared/icons/Avocado";
import Bread from "@/components/shared/icons/Bread";
import Broccoli from "@/components/shared/icons/Broccoli";
import Candy from "@/components/shared/icons/Candy";
import Chickenleg from "@/components/shared/icons/Chickenleg";
import DairyBottle from "@/components/shared/icons/DairyBottle";
import Seed from "@/components/shared/icons/Seed";
import { FC } from "react";

interface FoodCategory {
  id: string;
  name: string;
  description: string;
  backgroundColor: string;
  foregroundColor: string;
  icon: FC<{ size?: number; color?: string }>;
}

export const foodCategories: FoodCategory[] = [
  {
    id: "fruit",
    name: "Obst",
    description: "Frisches, getrocknetes oder verarbeitetes Obst",
    backgroundColor: "#FFF3E0",
    foregroundColor: "#E65100",
    icon: Apple,
  },
  {
    id: "vegetables",
    name: "Gemüse",
    description: "Frisches, tiefgekühltes oder gegartes Gemüse",
    backgroundColor: "#E8F5E9",
    foregroundColor: "#2E7D32",
    icon: Broccoli,
  },
  {
    id: "grains",
    name: "Getreide & Stärken",
    description: "Brot, Reis, Nudeln, Kartoffeln, Haferflocken, Mais etc.",
    backgroundColor: "#FFFDE7",
    foregroundColor: "#F9A825",
    icon: Bread,
  },
  {
    id: "plant-protein",
    name: "Proteine - Pflanzlich",
    description: "Hülsenfrüchte, Tofu, Tempeh, Seitan, Nüsse, Samen",
    backgroundColor: "#EDE7F6",
    foregroundColor: "#512DA8",
    icon: Seed,
  },
  {
    id: "animal-protein",
    name: "Proteine - Tierisch",
    description: "Fleisch, Fisch, Eier",
    backgroundColor: "#FBE9E7",
    foregroundColor: "#D84315",
    icon: Chickenleg,
  },
  {
    id: "dairy",
    name: "Milchprodukte",
    description: "Milch, Joghurt, Käse",
    backgroundColor: "#E3F2FD",
    foregroundColor: "#1565C0",
    icon: DairyBottle,
  },
  {
    id: "fats",
    name: "Fette & Öle",
    description: "Pflanzliche Öle, Butter, Avocado, fetthaltige Saucen",
    backgroundColor: "#FFF8E1",
    foregroundColor: "#FF6F00",
    icon: Avocado,
  },
  {
    id: "sweets",
    name: "Süßes & Snacks",
    description: "Süßigkeiten, Kuchen, Chips, Riegel etc.",
    backgroundColor: "#FCE4EC",
    foregroundColor: "#C2185B",
    icon: Candy,
  },
  {
    id: "drinks-zero",
    name: "Getränke - ohne Kalorien",
    description: "Wasser, ungesüßter Tee, schwarzer Kaffee",
    backgroundColor: "#ECEFF1",
    foregroundColor: "#37474F",
    icon: Apple, // Platzhalter
  },
  {
    id: "drinks-caloric",
    name: "Getränke - mit Kalorien",
    description: "Softdrinks, Säfte, Milchshakes, alkoholische Getränke",
    backgroundColor: "#F3E5F5",
    foregroundColor: "#6A1B9A",
    icon: Apple, // Platzhalter
  },
  {
    id: "fastfood",
    name: "Fertiggerichte & Fast Food",
    description: "Pizza, Burger, Tiefkühlgerichte, Convenience-Food",
    backgroundColor: "#F1F8E9",
    foregroundColor: "#689F38",
    icon: Apple, // Platzhalter
  },
  {
    id: "misc",
    name: "Sonstiges & Gewürze",
    description: "Salz, Pfeffer, Kräuter, Saucen, Supplements",
    backgroundColor: "#ECEFF1",
    foregroundColor: "#455A64",
    icon: Apple, // Platzhalter
  },
] as const;

export type FoodCategoryId = (typeof foodCategories)[number]["id"];
