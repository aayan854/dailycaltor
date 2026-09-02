import { FoodItem } from '../../data/foods/types';

export interface ConsumedFood {
  food: FoodItem;
  grams: number; // calculated from serving size * servings
}

export interface UserProfile {
  age: number;
  sex: 'male' | 'female' | 'other';
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
  weightKg?: number;
  heightCm?: number;
}

export interface DailyTargets {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  calcium: number;
  iron: number;
  magnesium: number;
  potassium: number;
  sodium: number;
  vitaminA: number;
  vitaminC: number;
  vitaminD: number;
  vitaminE: number;
  vitaminK: number;
  vitaminB12: number;
  folate: number;
}

export type NutrientStatus = 'On Track' | 'Moderate Gap' | 'Lower Than Reference' | 'Over Reference';

export interface NutrientComparison {
  name: keyof DailyTargets;
  estimatedIntake: number;
  referenceTarget: number;
  status: NutrientStatus;
  percentage: number;
}

export interface NutritionGapOutputs {
  totalEstimatedIntake: Partial<DailyTargets>;
  comparisons: NutrientComparison[];
  warnings: string[]; // E.g., "Estimated sodium is over reference."
}

// Very basic reference generator - for educational purposes only
export function generateGeneralTargets(profile: UserProfile): DailyTargets {
  // Basal calculations are purely educational
  const baseCalories = profile.sex === 'male' ? 2500 : 2000;
  
  return {
    calories: baseCalories,
    protein: profile.weightKg ? profile.weightKg * 0.8 : 50, // 0.8g per kg or default 50g
    carbs: (baseCalories * 0.5) / 4, // 50% from carbs
    fat: (baseCalories * 0.3) / 9, // 30% from fat
    fiber: 30, // g
    calcium: 1000, // mg
    iron: profile.sex === 'female' && profile.age >= 19 && profile.age <= 50 ? 18 : 8, // mg
    magnesium: profile.sex === 'male' ? 400 : 310, // mg
    potassium: 3400, // mg
    sodium: 2300, // mg (upper limit ideally)
    vitaminA: profile.sex === 'male' ? 900 : 700, // mcg
    vitaminC: profile.sex === 'male' ? 90 : 75, // mg
    vitaminD: 15, // mcg
    vitaminE: 15, // mg
    vitaminK: profile.sex === 'male' ? 120 : 90, // mcg
    vitaminB12: 2.4, // mcg
    folate: 400, // mcg
  };
}

export function calculateNutritionGaps(consumedFoods: ConsumedFood[], targets: DailyTargets): NutritionGapOutputs {
  // Aggregate nutrition
  const intake: Partial<DailyTargets> = {
    calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0,
    calcium: 0, iron: 0, magnesium: 0, potassium: 0, sodium: 0,
    vitaminA: 0, vitaminC: 0, vitaminD: 0, vitaminE: 0, vitaminK: 0,
    vitaminB12: 0, folate: 0
  };

  consumedFoods.forEach(cf => {
    const ratio = cf.grams / 100;
    (Object.keys(intake) as Array<keyof DailyTargets>).forEach(key => {
      intake[key]! += (cf.food[key] || 0) * ratio;
    });
  });

  const comparisons: NutrientComparison[] = [];
  const warnings: string[] = [];

  (Object.keys(targets) as Array<keyof DailyTargets>).forEach(key => {
    const val = intake[key] || 0;
    const target = targets[key];
    const percentage = (val / target) * 100;
    
    let status: NutrientStatus = 'On Track';
    
    // Special handling for sodium where higher is worse
    if (key === 'sodium') {
      if (percentage > 120) status = 'Over Reference';
      else if (percentage > 100) status = 'Moderate Gap';
      else status = 'On Track';
    } else {
      if (percentage < 50) status = 'Lower Than Reference';
      else if (percentage < 85) status = 'Moderate Gap';
      else if (percentage > 150 && key === 'calories') status = 'Over Reference'; // Arbitrary threshold
      else status = 'On Track';
    }

    comparisons.push({
      name: key,
      estimatedIntake: val,
      referenceTarget: target,
      status,
      percentage
    });
  });

  return {
    totalEstimatedIntake: intake,
    comparisons,
    warnings
  };
}
