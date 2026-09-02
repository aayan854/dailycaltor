export interface FoodItem {
  id: string;
  name: string;
  localizedName?: Record<string, string>;
  country: string[]; // ISO codes where this is common
  category: string;
  servingSize: string;
  servingSizeGrams: number;
  
  // Macros (per 100g to standardise, or per serving size)
  // Let's use per 100g as the standard database format
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  
  // Micros (per 100g)
  calcium: number; // mg
  iron: number; // mg
  magnesium: number; // mg
  potassium: number; // mg
  sodium: number; // mg
  vitaminA: number; // mcg
  vitaminC: number; // mg
  vitaminD: number; // mcg
  vitaminE: number; // mg
  vitaminK: number; // mcg
  vitaminB12: number; // mcg
  folate: number; // mcg
}
