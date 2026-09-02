import { FoodItem } from './types';

// This is a minimal starter database. 
// Nutrient values are approximations for educational purposes per 100g.
export const foodDatabase: FoodItem[] = [
  {
    id: "f_chicken_breast",
    name: "Chicken Breast (Raw)",
    localizedName: {
      en: "Chicken Breast",
      "pt-br": "Peito de Frango",
      de: "Hähnchenbrust"
    },
    country: ["US", "BR", "DE"],
    category: "protein",
    servingSize: "1 medium breast",
    servingSizeGrams: 150,
    calories: 165,
    protein: 31,
    carbs: 0,
    fat: 3.6,
    fiber: 0,
    calcium: 15,
    iron: 1,
    magnesium: 29,
    potassium: 256,
    sodium: 74,
    vitaminA: 6,
    vitaminC: 0,
    vitaminD: 0.1,
    vitaminE: 0.3,
    vitaminK: 0,
    vitaminB12: 0.3,
    folate: 4
  },
  {
    id: "f_oatmeal",
    name: "Rolled Oats",
    localizedName: {
      en: "Rolled Oats",
      "pt-br": "Aveia em flocos",
      de: "Haferflocken"
    },
    country: ["US", "BR", "DE"],
    category: "carbs",
    servingSize: "1/2 cup dry",
    servingSizeGrams: 40,
    calories: 389,
    protein: 16.9,
    carbs: 66.3,
    fat: 6.9,
    fiber: 10.6,
    calcium: 54,
    iron: 4.7,
    magnesium: 177,
    potassium: 429,
    sodium: 2,
    vitaminA: 0,
    vitaminC: 0,
    vitaminD: 0,
    vitaminE: 0.4,
    vitaminK: 2,
    vitaminB12: 0,
    folate: 56
  },
  {
    id: "f_rice_white",
    name: "White Rice (Cooked)",
    localizedName: {
      en: "White Rice",
      "pt-br": "Arroz Branco",
      de: "Weißer Reis"
    },
    country: ["US", "BR", "DE", "IN", "JP"],
    category: "carbs",
    servingSize: "1 cup",
    servingSizeGrams: 158,
    calories: 130,
    protein: 2.7,
    carbs: 28,
    fat: 0.3,
    fiber: 0.4,
    calcium: 10,
    iron: 1.2,
    magnesium: 12,
    potassium: 35,
    sodium: 1,
    vitaminA: 0,
    vitaminC: 0,
    vitaminD: 0,
    vitaminE: 0,
    vitaminK: 0,
    vitaminB12: 0,
    folate: 58
  }
];
