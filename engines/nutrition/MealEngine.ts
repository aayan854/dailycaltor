import { FoodItem } from '../../data/foods/types';

export interface MealBuilderInputs {
  targetCalories: number;
  targetProtein: number; // grams
  mealsPerDay: number; // 3, 4, 5
  foodsToAvoid: string[];
  budget: 'low' | 'medium' | 'high';
}

export interface Meal {
  name: string;
  items: { food: FoodItem, grams: number }[];
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  estimatedCost: string; // $, $$, $$$
}

export interface MealPlanOutputs {
  meals: Meal[];
  totalDailyCalories: number;
  totalDailyProtein: number;
  groceryList: { foodId: string; name: string; totalGrams: number }[];
}

export function generateMealPlan(inputs: MealBuilderInputs, availableFoods: FoodItem[]): MealPlanOutputs {
  // In a real app, this would use an optimization algorithm (like a knapsack problem solver)
  // or call a dedicated API. Here, we build a stub for the architecture.
  
  // Filter foods
  const safeFoods = availableFoods.filter(f => !inputs.foodsToAvoid.includes(f.id));
  
  // Distribute calories evenly for simplicity
  const caloriesPerMeal = inputs.targetCalories / inputs.mealsPerDay;
  const proteinPerMeal = inputs.targetProtein / inputs.mealsPerDay;

  const meals: Meal[] = [];
  const groceryMap = new Map<string, {name: string, totalGrams: number}>();

  for (let i = 0; i < inputs.mealsPerDay; i++) {
    // Stub: just pick a random food that somewhat matches (In reality, use a smart heuristic)
    // For now, we just return empty meals to satisfy the interface.
    // The actual algorithm will be implemented later.
    meals.push({
      name: `Meal ${i + 1}`,
      items: [],
      totalCalories: 0, // Should be approx caloriesPerMeal
      totalProtein: 0,
      totalCarbs: 0,
      totalFat: 0,
      estimatedCost: inputs.budget === 'low' ? '$' : '$$'
    });
  }

  return {
    meals,
    totalDailyCalories: 0,
    totalDailyProtein: 0,
    groceryList: Array.from(groceryMap.entries()).map(([id, data]) => ({
      foodId: id,
      name: data.name,
      totalGrams: data.totalGrams
    }))
  };
}
