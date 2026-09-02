"use client";

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCurrency } from '@/components/providers/CurrencyProvider';
import { calculateCPA, CPAInputs } from '@/engines/business/CPAEngine';

export function CPACalculator() {
  const { formatAmount } = useCurrency();
  const [inputs, setInputs] = useState<CPAInputs & { clicks: number }>({
    adSpend: 1000,
    conversions: 50,
    revenue: 0,
    averageOrderValue: 100,
    profitMargin: 40,
    clicks: 1000
  });

  const outputs = useMemo(() => calculateCPA(inputs, inputs.clicks), [inputs]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Ad Campaign Inputs</CardTitle>
          <CardDescription>Enter your advertising metrics</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Total Ad Spend</Label>
            <Input type="number" name="adSpend" value={inputs.adSpend || ''} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label>Clicks (Optional)</Label>
            <Input type="number" name="clicks" value={inputs.clicks || ''} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label>Conversions (Purchases/Leads)</Label>
            <Input type="number" name="conversions" value={inputs.conversions || ''} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label>Average Order Value</Label>
            <Input type="number" name="averageOrderValue" value={inputs.averageOrderValue || ''} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label>Net Profit Margin (%)</Label>
            <Input type="number" name="profitMargin" value={inputs.profitMargin || ''} onChange={handleChange} />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle>Results</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-4 bg-background rounded-lg shadow-sm border">
              <div className="text-sm text-muted-foreground mb-1">CPA (Cost per Acquisition)</div>
              <div className="text-2xl font-bold text-primary">{formatAmount(outputs.cpa)}</div>
            </div>
            <div className="p-4 bg-background rounded-lg shadow-sm border">
              <div className="text-sm text-muted-foreground mb-1">ROAS</div>
              <div className="text-2xl font-bold text-green-600">{outputs.roas.toFixed(2)}x</div>
            </div>
          </div>
          <div className="space-y-2 text-sm pt-4 border-t">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Conversion Rate</span>
              <span className="font-medium">{outputs.conversionRate.toFixed(2)}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Revenue</span>
              <span className="font-medium">{formatAmount(outputs.totalRevenue)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Net Profit (After Ads)</span>
              <span className={`font-medium ${outputs.profitAfterAds >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {formatAmount(outputs.profitAfterAds)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
