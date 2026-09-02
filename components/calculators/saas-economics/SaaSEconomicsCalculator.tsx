"use client";

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCurrency } from '@/components/providers/CurrencyProvider';
import { calculateSaaS, SaaSInputs } from '@/engines/business/SaaSEngine';

export function SaaSEconomicsCalculator() {
  const { formatAmount } = useCurrency();
  const [inputs, setInputs] = useState<SaaSInputs>({
    mrr: 50000,
    customers: 1000,
    newCustomers: 50,
    churnRate: 2.5,
    cac: 0,
    grossMargin: 85,
    monthlyOperatingCost: 15000,
    marketingCost: 5000
  });

  const outputs = useMemo(() => calculateSaaS(inputs), [inputs]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>SaaS Metrics</CardTitle>
          <CardDescription>Enter your subscription data</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Monthly Recurring Revenue (MRR)</Label>
              <Input type="number" name="mrr" value={inputs.mrr || ''} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label>Total Customers</Label>
              <Input type="number" name="customers" value={inputs.customers || ''} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label>New Customers (Monthly)</Label>
              <Input type="number" name="newCustomers" value={inputs.newCustomers || ''} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label>Customer Churn Rate (%)</Label>
              <Input type="number" name="churnRate" value={inputs.churnRate || ''} onChange={handleChange} step="0.1" />
            </div>
            <div className="space-y-2">
              <Label>Gross Margin (%)</Label>
              <Input type="number" name="grossMargin" value={inputs.grossMargin || ''} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label>Monthly Marketing Cost</Label>
              <Input type="number" name="marketingCost" value={inputs.marketingCost || ''} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label>CAC (Optional Override)</Label>
              <Input type="number" name="cac" value={inputs.cac || ''} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label>Other Operating Costs</Label>
              <Input type="number" name="monthlyOperatingCost" value={inputs.monthlyOperatingCost || ''} onChange={handleChange} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle>Unit Economics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-4 bg-background rounded-lg shadow-sm border">
              <div className="text-sm text-muted-foreground mb-1">LTV:CAC Ratio</div>
              <div className={`text-2xl font-bold ${outputs.ltvCacRatio >= 3 ? 'text-green-600' : 'text-yellow-600'}`}>
                {outputs.ltvCacRatio.toFixed(2)}x
              </div>
            </div>
            <div className="p-4 bg-background rounded-lg shadow-sm border">
              <div className="text-sm text-muted-foreground mb-1">Payback Period</div>
              <div className={`text-2xl font-bold ${outputs.paybackPeriod <= 12 ? 'text-green-600' : 'text-red-600'}`}>
                {outputs.paybackPeriod.toFixed(1)} mo
              </div>
            </div>
          </div>
          <div className="space-y-2 text-sm pt-4 border-t">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Annual Recurring Revenue (ARR)</span>
              <span className="font-medium text-primary">{formatAmount(outputs.arr)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Average Revenue Per User (ARPU)</span>
              <span className="font-medium">{formatAmount(outputs.arpu)} / mo</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Customer Acquisition Cost (CAC)</span>
              <span className="font-medium">{formatAmount(outputs.cac)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Lifetime Value (LTV)</span>
              <span className="font-medium">{formatAmount(outputs.ltv)}</span>
            </div>
            <div className="flex justify-between pt-2 border-t">
              <span className="text-muted-foreground">Monthly Burn</span>
              <span className={`font-semibold ${outputs.monthlyBurn > 0 ? 'text-red-600' : 'text-green-600'}`}>
                {outputs.monthlyBurn > 0 ? formatAmount(outputs.monthlyBurn) : "Profitable"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground font-semibold">Break-Even Customers</span>
              <span className="font-semibold text-primary">{Math.ceil(outputs.breakEvenCustomers)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
