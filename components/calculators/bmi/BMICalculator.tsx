"use client";

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { calculateBMI, BMIInputs } from '@/engines/nutrition/BMIEngine';

export function BMICalculator() {
  const [inputs, setInputs] = useState<BMIInputs>({
    weightKg: 70,
    heightCm: 175
  });

  const outputs = useMemo(() => calculateBMI(inputs), [inputs]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Your Body Metrics</CardTitle>
          <CardDescription>Enter your weight and height to calculate BMI.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Weight (kg)</Label>
            <Input type="number" name="weightKg" value={inputs.weightKg || ''} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label>Height (cm)</Label>
            <Input type="number" name="heightCm" value={inputs.heightCm || ''} onChange={handleChange} />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle>Your Results</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-4 bg-background rounded-lg shadow-sm border">
              <div className="text-sm text-muted-foreground mb-1">Body Mass Index (BMI)</div>
              <div className="text-4xl font-bold text-primary">{outputs.bmi > 0 ? outputs.bmi.toFixed(1) : '-'}</div>
            </div>
            <div className="p-4 bg-background rounded-lg shadow-sm border">
              <div className="text-sm text-muted-foreground mb-1">Category</div>
              <div className="text-xl font-bold mt-2">{outputs.category}</div>
            </div>
          </div>
          <div className="space-y-2 text-sm pt-4 border-t text-muted-foreground">
            <p>BMI is a simple calculation using a person's height and weight. The formula is BMI = kg/m2 where kg is a person's weight in kilograms and m2 is their height in metres squared.</p>
            <p className="font-medium text-foreground">Standard Categories:</p>
            <ul className="list-disc pl-5">
              <li>Underweight: &lt; 18.5</li>
              <li>Normal weight: 18.5 - 24.9</li>
              <li>Overweight: 25 - 29.9</li>
              <li>Obese: &gt; 30</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
