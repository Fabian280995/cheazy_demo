import Apple from "@/components/shared/icons/Apple";
import Avocado from "@/components/shared/icons/Avocado";
import Bread from "@/components/shared/icons/Bread";
import Broccoli from "@/components/shared/icons/Broccoli";
import Candy from "@/components/shared/icons/Candy";
import Chickenleg from "@/components/shared/icons/Chickenleg";
import DairyBottle from "@/components/shared/icons/DairyBottle";
import Seed from "@/components/shared/icons/Seed";

export const foodCategories = [
  /* Obst */
  {
    id: "fruit",
    name: "Obst",
    description: "Frisches, getrocknetes oder verarbeitetes Obst",
    backgroundColor: "#FFB385", // saftiges Apricot
    foregroundColor: "#D84315", // sattes Blutorange
    icon: Apple,
  },

  /* Gemüse */
  {
    id: "vegetables",
    name: "Gemüse",
    description: "Frisches, tiefgekühltes oder gegartes Gemüse",
    backgroundColor: "#8BCF9B", // Avocado-Midtone
    foregroundColor: "#1B5E20", // tiefer Blattgrün-Kontrast
    icon: Broccoli,
  },

  /* Getreide & Stärken */
  {
    id: "grains",
    name: "Getreide & Stärken",
    description: "Brot, Reis, Nudeln, Kartoffeln, Haferflocken, Mais etc.",
    backgroundColor: "#FFEA8A", // goldgelbe Cerealien-Basis
    foregroundColor: "#F9A825", // kerniges Korn-Ocker
    icon: Bread,
  },

  /* Proteine – pflanzlich */
  {
    id: "plant-protein",
    name: "Proteine – Pflanzlich",
    description: "Hülsenfrüchte, Tofu, Tempeh, Seitan, Nüsse, Samen",
    backgroundColor: "#C7B8F2", // pastelliger Lavendel
    foregroundColor: "#4527A0", // kräftiges Indigo
    icon: Seed,
  },

  /* Proteine – tierisch */
  {
    id: "animal-protein",
    name: "Proteine – Tierisch",
    description: "Fleisch, Fisch, Eier",
    backgroundColor: "#FFBCA6", // Lachsrosa
    foregroundColor: "#BF360C", // dunkles Rostrot
    icon: Chickenleg,
  },

  /* Milchprodukte */
  {
    id: "dairy",
    name: "Milchprodukte",
    description: "Milch, Joghurt, Käse",
    backgroundColor: "#A9D3FF", // cremiges Hellblau
    foregroundColor: "#0D47A1", // sattes Royal-Blue
    icon: DairyBottle,
  },

  /* Fette & Öle */
  {
    id: "fats",
    name: "Fette & Öle",
    description: "Pflanzliche Öle, Butter, Avocado, fetthaltige Saucen",
    backgroundColor: "#FFD36B", // helles Mango-Gelb
    foregroundColor: "#FF6F00", // kräftiges Kürbis-Orange
    icon: Avocado,
  },

  /* Süßes & Snacks */
  {
    id: "sweets",
    name: "Süßes & Snacks",
    description: "Süßigkeiten, Kuchen, Chips, Riegel etc.",
    backgroundColor: "#F7A6C4", // Zuckerwatte-Pink
    foregroundColor: "#AD1457", // tiefes Beeren-Pink
    icon: Candy,
  },

  /* Drinks – kalorienfrei */
  {
    id: "drinks-zero",
    name: "Getränke – ohne Kalorien",
    description: "Wasser, ungesüßter Tee, schwarzer Kaffee",
    backgroundColor: "#B0BEC5", // kühles Nebelgrau
    foregroundColor: "#263238", // Espresso-Anthrazit
    icon: Apple, // Platzhalter
  },

  /* Drinks – kalorienhaltig */
  {
    id: "drinks-caloric",
    name: "Getränke – mit Kalorien",
    description: "Softdrinks, Säfte, Milchshakes, alkoholische Getränke",
    backgroundColor: "#E4B7F2", // sanftes Flieder
    foregroundColor: "#6A1B9A", // volles Violett
    icon: Apple, // Platzhalter
  },

  /* Fast Food & Fertiggerichte */
  {
    id: "fastfood",
    name: "Fertiggerichte & Fast Food",
    description: "Pizza, Burger, Tiefkühlgerichte, Convenience-Food",
    backgroundColor: "#C7E8A0", // helles Salat-Grün
    foregroundColor: "#33691E", // dunkles Kräuter-Grün
    icon: Apple, // Platzhalter
  },

  /* Sonstiges & Gewürze */
  {
    id: "misc",
    name: "Sonstiges & Gewürze",
    description: "Salz, Pfeffer, Kräuter, Saucen, Supplements",
    backgroundColor: "#B0BEC5", // neutral-graue Basis
    foregroundColor: "#37474F", // Graphitgrau
    icon: Apple, // Platzhalter
  },
] as const;
