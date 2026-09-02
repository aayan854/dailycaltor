"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useCurrency } from '@/components/providers/CurrencyProvider';
import { calculateROAS, ROASInputs, ROASOutputs } from '@/engines/business/ROASEngine';
import { Share, Copy, RotateCcw } from 'lucide-react';

export function BreakEvenROASCalculator() {
  const { formatAmount } = useCurrency();
  const [inputs, setInputs] = useState<ROASInputs>({
    sellingPrice: 100,
    productCost: 30,
    shipping: 10,
    paymentFees: 3,
    otherVariableCosts: 0,
    targetProfitMargin: 20
  });

  const outputs = useMemo(() => calculateROAS(inputs), [inputs]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }));
  };

  const handleReset = () => {
    setInputs({
      sellingPrice: 0,
      productCost: 0,
      shipping: 0,
      paymentFees: 0,
      otherVariableCosts: 0,
      targetProfitMargin: 0
    });
  };

  if (!outputs) return null;

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <Card>
        <CardHeader>
          <CardTitle>Inputs</CardTitle>
          <CardDescription>Enter your costs and target margins</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="sellingPrice">Selling Price</Label>
            <Input type="number" id="sellingPrice" name="sellingPrice" value={inputs.sellingPrice || ''} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="productCost">Product Cost</Label>
            <Input type="number" id="productCost" name="productCost" value={inputs.productCost || ''} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="shipping">Shipping Cost</Label>
            <Input type="number" id="shipping" name="shipping" value={inputs.shipping || ''} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="paymentFees">Payment Fees</Label>
            <Input type="number" id="paymentFees" name="paymentFees" value={inputs.paymentFees || ''} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="otherVariableCosts">Other Variable Costs</Label>
            <Input type="number" id="otherVariableCosts" name="otherVariableCosts" value={inputs.otherVariableCosts || ''} onChange={handleChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="targetProfitMargin">Target Profit Margin (%)</Label>
            <Input type="number" id="targetProfitMargin" name="targetProfitMargin" value={inputs.targetProfitMargin || ''} onChange={handleChange} />
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle>Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-4 bg-background rounded-lg shadow-sm border">
                <div className="text-sm text-muted-foreground mb-1">Break-Even ROAS</div>
                <div className={`text-2xl font-bold ${outputs.breakEvenROAS > 0 ? 'text-primary' : 'text-red-600 dark:text-red-400'}`}>
                  {outputs.breakEvenROAS.toFixed(2)}x
                </div>
              </div>
              <div className="p-4 bg-background rounded-lg shadow-sm border">
                <div className="text-sm text-muted-foreground mb-1">Target ROAS</div>
                <div className={`text-2xl font-bold text-green-600 dark:text-green-400`}>
                  {outputs.targetROAS > 0 ? `${outputs.targetROAS.toFixed(2)}x` : 'N/A'}
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Max Allowable Ad Cost (CPA)</span>
                <span className="font-medium">{formatAmount(outputs.maximumAdSpend)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Contribution Margin</span>
                <span className="font-medium">{formatAmount(outputs.contributionMargin)}</span>
              </div>
            </div>

            <Separator />

            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={handleReset} className="flex-1">
                <RotateCcw className="w-4 h-4 mr-2" /> Reset
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
