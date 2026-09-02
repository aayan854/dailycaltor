"use client";

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  calculateNutritionGaps, 
  generateGeneralTargets, 
  UserProfile, 
  ConsumedFood 
} from '@/engines/nutrition/NutritionGapEngine';
import { foodDatabase } from '@/data/foods/db';
import { AlertCircle, Plus, Trash2 } from 'lucide-react';

export function NutritionGapScanner() {
  const [profile, setProfile] = useState<UserProfile>({
    age: 30,
    sex: 'female',
    activityLevel: 'moderate',
    weightKg: 65
  });

  const [consumedFoods, setConsumedFoods] = useState<ConsumedFood[]>([]);
  const [selectedFoodId, setSelectedFoodId] = useState<string>(foodDatabase[0].id);
  const [servings, setServings] = useState<number>(1);

  const targets = useMemo(() => generateGeneralTargets(profile), [profile]);
  const results = useMemo(() => calculateNutritionGaps(consumedFoods, targets), [consumedFoods, targets]);

  const addFood = () => {
    const food = foodDatabase.find(f => f.id === selectedFoodId);
    if (food) {
      setConsumedFoods(prev => [
        ...prev, 
        { food, grams: food.servingSizeGrams * servings }
      ]);
      setServings(1); // reset
    }
  };

  const removeFood = (index: number) => {
    setConsumedFoods(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-8">
      <div className="p-4 border-l-4 border-yellow-500 bg-yellow-500/10 text-sm text-yellow-800 dark:text-yellow-200 flex gap-3">
        <AlertCircle className="w-5 h-5 shrink-0" />
        <p>
          <strong>Nutrition Disclaimer:</strong> DailyCaltor provides general nutrition information for educational purposes only. 
          It is not medical advice, diagnosis or treatment. Nutrient estimates are approximate and should not replace advice from a qualified healthcare professional.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Profile</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Age</Label>
                <Input 
                  type="number" 
                  value={profile.age} 
                  onChange={(e) => setProfile(p => ({...p, age: parseInt(e.target.value) || 30}))} 
                />
              </div>
              <div className="space-y-2">
                <Label>Sex</Label>
                <select 
                  className="w-full h-9 px-3 rounded-md border border-input bg-background text-sm"
                  value={profile.sex}
                  onChange={(e) => setProfile(p => ({...p, sex: e.target.value as any}))}
                >
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Weight (kg)</Label>
                <Input 
                  type="number" 
                  value={profile.weightKg} 
                  onChange={(e) => setProfile(p => ({...p, weightKg: parseInt(e.target.value) || 65}))} 
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Foods Eaten Today</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <div className="flex-1 space-y-2">
                  <select 
                    className="w-full h-9 px-3 rounded-md border border-input bg-background text-sm"
                    value={selectedFoodId}
                    onChange={(e) => setSelectedFoodId(e.target.value)}
                  >
                    {foodDatabase.map(f => (
                      <option key={f.id} value={f.id}>{f.name} ({f.servingSize})</option>
                    ))}
                  </select>
                </div>
                <div className="w-24 space-y-2">
                  <Input 
                    type="number" 
                    value={servings}
                    onChange={(e) => setServings(parseFloat(e.target.value) || 1)}
                    step="0.5"
                    min="0.5"
                  />
                </div>
                <div className="pt-2">
                  <Button onClick={addFood} size="sm"><Plus className="w-4 h-4" /></Button>
                </div>
              </div>

              <div className="space-y-2 pt-4">
                {consumedFoods.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">No foods added yet.</p>
                ) : (
                  consumedFoods.map((cf, idx) => (
                    <div key={idx} className="flex justify-between items-center text-sm p-2 bg-muted/50 rounded border">
                      <span>{cf.food.name} ({(cf.grams).toFixed(0)}g)</span>
                      <Button variant="ghost" size="sm" onClick={() => removeFood(idx)} className="h-6 w-6 p-0 text-red-500">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle>Estimated Nutrient Status</CardTitle>
            <CardDescription>Compared to general reference targets</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-4 bg-background rounded-lg shadow-sm border">
                <div className="text-sm text-muted-foreground mb-1">Calories</div>
                <div className="text-2xl font-bold">
                  {results.totalEstimatedIntake.calories?.toFixed(0)} / {targets.calories.toFixed(0)}
                </div>
              </div>
              <div className="p-4 bg-background rounded-lg shadow-sm border">
                <div className="text-sm text-muted-foreground mb-1">Protein (g)</div>
                <div className="text-2xl font-bold">
                  {results.totalEstimatedIntake.protein?.toFixed(0)} / {targets.protein.toFixed(0)}
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <h4 className="font-medium text-sm">Micronutrients</h4>
              <div className="max-h-80 overflow-y-auto pr-2 space-y-2">
                {results.comparisons.filter(c => !['calories', 'protein', 'carbs', 'fat'].includes(c.name)).map(comp => (
                  <div key={comp.name} className="flex flex-col gap-1 text-sm border-b pb-2">
                    <div className="flex justify-between">
                      <span className="capitalize font-medium">{comp.name.replace(/([A-Z])/g, ' $1').trim()}</span>
                      <span>{comp.estimatedIntake.toFixed(1)} / {comp.referenceTarget.toFixed(1)}</span>
                    </div>
                    <div className="flex justify-between text-xs items-center">
                      <div className="w-full bg-secondary h-2 rounded-full overflow-hidden mr-4">
                        <div 
                          className={`h-full rounded-full ${comp.status === 'On Track' ? 'bg-green-500' : comp.status === 'Moderate Gap' ? 'bg-yellow-500' : 'bg-red-500'}`}
                          style={{ width: `${Math.min(comp.percentage, 100)}%` }}
                        />
                      </div>
                      <span className={`shrink-0 font-medium ${comp.status === 'On Track' ? 'text-green-600 dark:text-green-400' : comp.status === 'Moderate Gap' ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-600 dark:text-red-400'}`}>
                        {comp.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
