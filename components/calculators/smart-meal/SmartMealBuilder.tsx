"use client";

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { generateMealPlan, MealPlanRequest } from '@/engines/nutrition/MealEngine';
import { foodDatabase } from '@/data/foods/db';

export function SmartMealBuilder() {
  const [inputs, setInputs] = useState<MealPlanRequest>({
    targetCalories: 2000,
    targetProtein: 150,
    mealsPerDay: 3,
    preferences: {
      excludeIds: [],
      onlyCategories: []
    }
  });

  const [plan, setPlan] = useState(() => generateMealPlan(inputs, foodDatabase));

  const handleGenerate = () => {
    setPlan(generateMealPlan(inputs, foodDatabase));
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Diet Targets</CardTitle>
          <CardDescription>Enter your daily macro goals</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Target Calories (kcal)</Label>
            <Input 
              type="number" 
              value={inputs.targetCalories} 
              onChange={e => setInputs(prev => ({...prev, targetCalories: parseInt(e.target.value) || 2000}))} 
            />
          </div>
          <div className="space-y-2">
            <Label>Target Protein (g)</Label>
            <Input 
              type="number" 
              value={inputs.targetProtein} 
              onChange={e => setInputs(prev => ({...prev, targetProtein: parseInt(e.target.value) || 150}))} 
            />
          </div>
          <div className="space-y-2">
            <Label>Meals Per Day</Label>
            <Input 
              type="number" 
              value={inputs.mealsPerDay} 
              onChange={e => setInputs(prev => ({...prev, mealsPerDay: parseInt(e.target.value) || 3}))} 
              min={1} max={6}
            />
          </div>
          <Button onClick={handleGenerate} className="w-full mt-4">Generate Meal Plan</Button>
        </CardContent>
      </Card>

      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle>Your Meal Plan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-4 bg-background rounded-lg shadow-sm border">
              <div className="text-sm text-muted-foreground mb-1">Total Calories</div>
              <div className="text-2xl font-bold">{plan.totalCalories.toFixed(0)}</div>
            </div>
            <div className="p-4 bg-background rounded-lg shadow-sm border">
              <div className="text-sm text-muted-foreground mb-1">Total Protein (g)</div>
              <div className="text-2xl font-bold text-primary">{plan.totalProtein.toFixed(0)}</div>
            </div>
          </div>
          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
            {plan.meals.map((meal, index) => (
              <div key={index} className="p-4 bg-background border rounded-lg space-y-2">
                <h4 className="font-semibold text-lg border-b pb-2">Meal {index + 1}</h4>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>{meal.totalCalories.toFixed(0)} kcal</span>
                  <span>{meal.totalProtein.toFixed(0)}g protein</span>
                </div>
                <ul className="text-sm space-y-1 mt-2">
                  {meal.foods.map((item, i) => (
                    <li key={i} className="flex justify-between items-center">
                      <span>• {item.food.name}</span>
                      <span className="font-medium">{item.grams.toFixed(0)}g</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
