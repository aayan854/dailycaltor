"use client";

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { calculateBMI, BMIInputs } from '@/engines/nutrition/BMIEngine';
import { useTranslations } from 'next-intl';

export function BMICalculator() {
  const t = useTranslations('Calc');
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
          <CardTitle>{t('bmi.title')}</CardTitle>
          <CardDescription>{t('bmi.desc')}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>{t('weightKg')}</Label>
            <Input type="number" name="weightKg" value={inputs.weightKg || ''} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label>{t('heightCm')}</Label>
            <Input type="number" name="heightCm" value={inputs.heightCm || ''} onChange={handleChange} />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle>{t('results')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-4 bg-background rounded-lg shadow-sm border">
              <div className="text-sm text-muted-foreground mb-1">{t('bmi.bmi')}</div>
              <div className="text-4xl font-bold text-primary">{outputs.bmi > 0 ? outputs.bmi.toFixed(1) : '-'}</div>
            </div>
            <div className="p-4 bg-background rounded-lg shadow-sm border">
              <div className="text-sm text-muted-foreground mb-1">{t('bmi.category')}</div>
              <div className="text-xl font-bold mt-2">
                {outputs.category === 'Underweight' ? t('bmi.under') : 
                 outputs.category === 'Normal weight' ? t('bmi.normal') : 
                 outputs.category === 'Overweight' ? t('bmi.over') : 
                 outputs.category === 'Obese' ? t('bmi.obese') : '-'}
              </div>
            </div>
          </div>
          <div className="space-y-2 text-sm pt-4 border-t text-muted-foreground">
            <p>{t('bmi.info1')}</p>
            <p className="font-medium text-foreground">{t('bmi.info2')}</p>
            <ul className="list-disc pl-5">
              <li>{t('bmi.under')}: &lt; 18.5</li>
              <li>{t('bmi.normal')}: 18.5 - 24.9</li>
              <li>{t('bmi.over')}: 25 - 29.9</li>
              <li>{t('bmi.obese')}: &gt; 30</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
