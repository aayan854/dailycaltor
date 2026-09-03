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
  const safeFoods = availableFoods.filter(f => !inputs.foodsToAvoid.includes(f.id));
  
  const proteins = safeFoods.filter(f => f.category === 'protein' || f.protein > 10);
  const carbs = safeFoods.filter(f => f.category === 'carbs' || f.carbs > 20);

  const caloriesPerMeal = inputs.targetCalories / inputs.mealsPerDay;
  const proteinPerMeal = inputs.targetProtein / inputs.mealsPerDay;

  const meals: Meal[] = [];
  const groceryMap = new Map<string, {name: string, totalGrams: number}>();
  
  let totalDailyCalories = 0;
  let totalDailyProtein = 0;

  for (let i = 0; i < inputs.mealsPerDay; i++) {
    const mealProteinFood = proteins[i % proteins.length] || safeFoods[0];
    const mealCarbFood = carbs[i % carbs.length] || safeFoods[1] || safeFoods[0];

    // Calculate grams of protein food needed to hit protein target
    // nutrient values are per 100g
    let proteinFoodGrams = (proteinPerMeal / Math.max(mealProteinFood.protein, 1)) * 100;
    const proteinFoodCalories = (proteinFoodGrams / 100) * mealProteinFood.calories;

    // Calculate remaining calories for carbs
    let remainingCalories = Math.max(0, caloriesPerMeal - proteinFoodCalories);
    let carbFoodGrams = (remainingCalories / Math.max(mealCarbFood.calories, 1)) * 100;

    const items = [
      { food: mealProteinFood, grams: proteinFoodGrams }
    ];

    if (carbFoodGrams > 10) {
      items.push({ food: mealCarbFood, grams: carbFoodGrams });
    }

    let mealCalories = items.reduce((sum, item) => sum + (item.grams / 100) * item.food.calories, 0);
    let mealProtein = items.reduce((sum, item) => sum + (item.grams / 100) * item.food.protein, 0);
    let mealCarbs = items.reduce((sum, item) => sum + (item.grams / 100) * item.food.carbs, 0);
    let mealFat = items.reduce((sum, item) => sum + (item.grams / 100) * item.food.fat, 0);

    meals.push({
      name: `Meal ${i + 1}`,
      items,
      totalCalories: mealCalories,
      totalProtein: mealProtein,
      totalCarbs: mealCarbs,
      totalFat: mealFat,
      estimatedCost: inputs.budget === 'low' ? '$' : '$$'
    });

    totalDailyCalories += mealCalories;
    totalDailyProtein += mealProtein;

    items.forEach(item => {
      const existing = groceryMap.get(item.food.id) || { name: item.food.name, totalGrams: 0 };
      existing.totalGrams += item.grams;
      groceryMap.set(item.food.id, existing);
    });
  }

  return {
    meals,
    totalDailyCalories,
    totalDailyProtein,
    groceryList: Array.from(groceryMap.entries()).map(([id, data]) => ({
      foodId: id,
      name: data.name,
      totalGrams: data.totalGrams
    }))
  };
}
